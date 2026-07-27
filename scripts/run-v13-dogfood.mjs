import { createHash } from "node:crypto";
import {
  mkdir,
  readFile,
  writeFile,
} from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  SPECIALIST_API_VERSION,
  assessSpecialistHandoffs,
  compileAgentBlueprints,
  createSpecialistRunSession,
  inspectSpecialistRunSession,
  recordSpecialistRunHandoff,
  renderSpecialistPackage,
  restoreSpecialistRunSession,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../dist/index.js";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const FEATURE = "docs/specs/v13-dogfood-validation";
const EVIDENCE = `${FEATURE}/evidence/orchestration`;
const SPEC_PATH = `${FEATURE}/spec.md`;
const CONTRACT_PATH = `${FEATURE}/app-contract.md`;
const APPROVAL_PATH = `${EVIDENCE}/approval.json`;
const SESSION_PATH = `${EVIDENCE}/run/session.json`;
const INSPECTION_PATH = `${EVIDENCE}/run/inspection.json`;
const encoder = new TextEncoder();

const APP_FILES = Object.freeze({
  domain: [
    "examples/triage-board/src/model.js",
    "examples/triage-board/src/storage.js",
    "examples/triage-board/test/model.test.mjs",
    "examples/triage-board/test/storage.test.mjs",
  ],
  ui: [
    "examples/triage-board/index.html",
    "examples/triage-board/styles.css",
  ],
  integration: [
    "examples/triage-board/src/app.js",
    "examples/triage-board/package.json",
    "examples/triage-board/server.mjs",
    "examples/triage-board/README.md",
  ],
});

const HANDOFF_FILES = Object.freeze({
  "implement.domain": `${EVIDENCE}/handoffs/implement-domain.json`,
  "implement.ui": `${EVIDENCE}/handoffs/implement-ui.json`,
  "integrate.application": `${EVIDENCE}/handoffs/integrate-application.json`,
  "review.application": `${EVIDENCE}/handoffs/review-application.json`,
});

function fail(message) {
  throw new Error(message);
}

function rawDigest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireValue(label, result) {
  if (!result.ok || result.value === null) {
    fail(`${label}: ${JSON.stringify(result.diagnostics)}`);
  }
  return result.value;
}

function safeOutputPath(relativePath) {
  const absolute = resolve(ROOT, relativePath);
  const evidenceRoot = resolve(ROOT, EVIDENCE);
  if (absolute !== evidenceRoot && !absolute.startsWith(`${evidenceRoot}\\`)) {
    fail(`Generated path escaped the dogfood evidence root: ${relativePath}`);
  }
  return absolute;
}

async function writeGenerated(relativePath, bytes) {
  const absolute = safeOutputPath(relativePath);
  await mkdir(dirname(absolute), { recursive: true });
  await writeFile(absolute, bytes);
}

async function writeJson(relativePath, value) {
  await writeGenerated(relativePath, encoder.encode(`${JSON.stringify(value, null, 2)}\n`));
}

async function bindSource(id, path, description, allowedWorkUnits) {
  const bytes = new Uint8Array(await readFile(resolve(ROOT, path)));
  return {
    id,
    kind: "repository",
    locator: `path:${path}`,
    digest: rawDigest(bytes),
    bytes: bytes.byteLength,
    description,
    allowedWorkUnits,
    readScope: path,
  };
}

function criterion(id, description, requirement) {
  return {
    id,
    description,
    evidenceRequirements: [requirement],
  };
}

function requirement(id, kind, duty, description, independentFromProducer = false) {
  return {
    id,
    kind,
    duty,
    description,
    independentFromProducer,
  };
}

function moduleContract(id, action, inputType, outputType) {
  return {
    id,
    action,
    inputPorts: [{ name: "input", artifactType: inputType }],
    outputPorts: [{ name: "output", artifactType: outputType }],
  };
}

function workUnit({
  id,
  objective,
  weight,
  module,
  dependencies,
  capability,
  read,
  write,
  evidenceRequirementIds,
  handoffArtifact,
  processScopes = [],
}) {
  const permissions = [
    { kind: "filesystem.read", scopes: read },
    ...(write.length > 0 ? [{ kind: "filesystem.write", scopes: write }] : []),
    ...(processScopes.length > 0
      ? [{ kind: "process.spawn", scopes: processScopes }]
      : []),
  ];
  return {
    id,
    objective,
    weight,
    module,
    dependencies,
    requiredCapabilities: [capability],
    contextUses: [
      {
        sourceId: "context.v13-spec",
        purpose: "Implement or verify the exact accepted product behavior.",
      },
      {
        sourceId: "context.v13-app-contract",
        purpose: "Respect the approved module, schema, scope, and verification contract.",
      },
    ],
    scope: {
      read,
      write,
      conflictZones: [],
    },
    permissions,
    evidenceRequirementIds,
    handoffArtifacts: [handoffArtifact],
    stopConditions: [
      "Stop if the requested behavior conflicts with the bound product or application contract.",
      "Stop before reading, writing, installing, or executing anything outside declared authority.",
      "Return a non-pass workflow outcome when required evidence cannot be produced.",
    ],
  };
}

async function buildRequest() {
  const workUnitIds = [
    "implement.domain",
    "implement.ui",
    "integrate.application",
    "review.application",
  ];
  const allAppFiles = [
    ...APP_FILES.domain,
    ...APP_FILES.ui,
    ...APP_FILES.integration,
  ];
  const allWriteFiles = [
    ...allAppFiles,
    ...Object.values(HANDOFF_FILES),
  ];
  const contractRead = [SPEC_PATH, CONTRACT_PATH];
  const sources = await Promise.all([
    bindSource(
      "context.v13-spec",
      SPEC_PATH,
      "Closed V13 dogfood product specification.",
      workUnitIds,
    ),
    bindSource(
      "context.v13-app-contract",
      CONTRACT_PATH,
      "Owner-approved Triage Board application contract.",
      workUnitIds,
    ),
  ]);

  const acceptanceCriteria = [
    criterion(
      "criterion.domain",
      "Domain and persistence behavior is implemented with deterministic evidence.",
      requirement(
        "evidence.domain.produce",
        "test",
        "produce",
        "Produce domain and persistence implementation plus passing unit tests.",
      ),
    ),
    criterion(
      "criterion.ui",
      "The semantic responsive interface is implemented with inspectable evidence.",
      requirement(
        "evidence.ui.produce",
        "artifact",
        "produce",
        "Produce the semantic HTML and responsive CSS interface.",
      ),
    ),
    {
      id: "criterion.integrated-quality",
      description: "The integrated application is tested and independently reviewed.",
      evidenceRequirements: [
        requirement(
          "evidence.integration.produce",
          "test",
          "produce",
          "Produce the integrated controller, runnable example, and combined verification.",
        ),
        requirement(
          "evidence.integration.review",
          "review",
          "review",
          "Independently review the complete integrated application and execution evidence.",
          true,
        ),
      ],
    },
  ];

  const goal = {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "GoalContract",
    id: "v13.dogfood.triage-board",
    revision: 1,
    objective:
      "Build and independently verify the dependency-free Triage Board through a visible V12 IDE run.",
    integrationOwner: "codex.main",
    assumptions: [
      {
        id: "assumption.chromium-local-storage",
        statement: "A current Chromium browser and browser local storage are available.",
        rationale: "The bounded dogfood target is a local desktop application.",
      },
      {
        id: "assumption.external-host",
        statement:
          "The external host supplies native subagents and enforces the compiled boundaries.",
        rationale: "Runtime supply and enforcement remain outside the V12 kernel.",
      },
    ],
    unresolvedDecisions: [],
    acceptanceCriteria,
    contextSources: sources,
    authority: {
      allowedModules: [
        "dogfood.domain",
        "dogfood.ui",
        "dogfood.integration",
        "dogfood.review",
      ],
      allowedCapabilities: [
        "implement.javascript-domain",
        "design.accessible-operational-ui",
        "integrate.browser-application",
        "review.application-quality",
      ],
      permissionCeiling: [
        {
          kind: "filesystem.read",
          scopes: [...contractRead, ...allAppFiles].sort(),
        },
        {
          kind: "filesystem.write",
          scopes: [...allWriteFiles].sort(),
        },
        {
          kind: "process.spawn",
          scopes: ["node", "rg"],
        },
      ],
      forbiddenEffects: [
        "Do not access a network, secret, external service, or undeclared repository path.",
        "Do not install dependencies, mutate Git, merge, or update durable memory.",
        "Do not change the product specification or application contract.",
      ],
      maxAgents: 4,
      maxConcurrency: 2,
    },
    optimization: {
      agentStartupCost: 1,
      handoffCost: 1,
    },
    workUnits: [
      workUnit({
        id: "implement.domain",
        objective:
          "Implement the closed issue domain, storage boundary, and deterministic Node tests.",
        weight: 8,
        module: moduleContract(
          "dogfood.domain",
          "Implement validated pure issue operations and defensive persistence with deterministic tests.",
          "TriageBoardContract",
          "DomainImplementation",
        ),
        dependencies: [],
        capability: "implement.javascript-domain",
        read: contractRead,
        write: [...APP_FILES.domain, HANDOFF_FILES["implement.domain"]],
        evidenceRequirementIds: ["evidence.domain.produce"],
        handoffArtifact: "domain-evidence.md",
        processScopes: ["node"],
      }),
      workUnit({
        id: "implement.ui",
        objective:
          "Implement the semantic, responsive, accessible operational interface without application logic.",
        weight: 7,
        module: moduleContract(
          "dogfood.ui",
          "Create semantic HTML and restrained responsive CSS for the approved application states.",
          "TriageBoardContract",
          "PresentationImplementation",
        ),
        dependencies: [],
        capability: "design.accessible-operational-ui",
        read: contractRead,
        write: [...APP_FILES.ui, HANDOFF_FILES["implement.ui"]],
        evidenceRequirementIds: ["evidence.ui.produce"],
        handoffArtifact: "ui-evidence.md",
      }),
      workUnit({
        id: "integrate.application",
        objective:
          "Integrate the approved domain and presentation outputs into a runnable browser application.",
        weight: 5,
        module: moduleContract(
          "dogfood.integration",
          "Bind the browser controller, runnable metadata, persistence, and combined verification without modifying dependency outputs.",
          "DomainAndPresentationImplementation",
          "IntegratedTriageBoard",
        ),
        dependencies: ["implement.domain", "implement.ui"],
        capability: "integrate.browser-application",
        read: [...contractRead, ...APP_FILES.domain, ...APP_FILES.ui],
        write: [
          ...APP_FILES.integration,
          HANDOFF_FILES["integrate.application"],
        ],
        evidenceRequirementIds: ["evidence.integration.produce"],
        handoffArtifact: "integration-evidence.md",
        processScopes: ["node"],
      }),
      workUnit({
        id: "review.application",
        objective:
          "Independently review the complete application for correctness, accessibility, scope, and evidence gaps.",
        weight: 4,
        module: moduleContract(
          "dogfood.review",
          "Review the integrated application and test evidence without modifying producer outputs.",
          "IntegratedTriageBoard",
          "IndependentApplicationReview",
        ),
        dependencies: ["integrate.application"],
        capability: "review.application-quality",
        read: [...contractRead, ...allAppFiles],
        write: [HANDOFF_FILES["review.application"]],
        evidenceRequirementIds: ["evidence.integration.review"],
        handoffArtifact: "review-evidence.md",
        processScopes: ["node", "rg"],
      }),
    ],
  };

  return {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal,
    proposedCandidates: [
      {
        id: "candidate.v13.atomic-specialists",
        groups: workUnitIds.map((id) => [id]),
      },
    ],
  };
}

async function compileCurrent() {
  const request = await buildRequest();
  const compilation = requireValue(
    "compile V13 dogfood specialists",
    compileAgentBlueprints(request),
  );
  const specialistPackage = requireValue(
    "render V13 dogfood package",
    renderSpecialistPackage(compilation),
  );
  return {
    request,
    compilation,
    specialistPackage,
    expectation: {
      compilationDigest: compilation.contentDigest,
      packageDigest: specialistPackage.packageDigest,
    },
  };
}

async function writeCandidate(artifacts) {
  await writeJson(`${EVIDENCE}/candidate/request.json`, artifacts.request);
  await writeJson(`${EVIDENCE}/candidate/compilation.json`, artifacts.compilation);
  await writeJson(
    `${EVIDENCE}/candidate/package-envelope.json`,
    artifacts.specialistPackage,
  );
  for (const file of artifacts.specialistPackage.files) {
    await writeGenerated(
      `${EVIDENCE}/candidate/package/${file.path}`,
      encoder.encode(file.content),
    );
  }
  const blueprintByWorkUnit = Object.fromEntries(
    artifacts.compilation.blueprints.flatMap((blueprint) =>
      blueprint.workUnitIds.map((workUnitId) => [
        workUnitId,
        {
          agentId: blueprint.id,
          blueprintDigest: blueprint.contentDigest,
          contractFile:
            artifacts.specialistPackage.manifest.agents.find(
              (agent) => agent.agentId === blueprint.id,
            )?.contractFile ?? null,
          dependencies: blueprint.dependencies,
          handoffFile: HANDOFF_FILES[workUnitId],
        },
      ]),
    ),
  );
  await writeJson(`${EVIDENCE}/candidate/summary.json`, {
    goalId: artifacts.compilation.goal.id,
    goalRevision: artifacts.compilation.goal.revision,
    search: artifacts.compilation.search,
    serialBaseline: artifacts.compilation.serialBaseline,
    selected: artifacts.compilation.selected,
    selectionReason: artifacts.compilation.selectionReason,
    launchWaves: artifacts.compilation.launchWaves,
    blueprints: blueprintByWorkUnit,
    ...artifacts.expectation,
  });
  return blueprintByWorkUnit;
}

async function readApproval(expectation) {
  let approval;
  try {
    approval = JSON.parse(await readFile(resolve(ROOT, APPROVAL_PATH), "utf8"));
  } catch (error) {
    fail(`Approval is missing or invalid: ${error instanceof Error ? error.message : error}`);
  }
  const keys = Object.keys(approval).sort();
  const expectedKeys = [
    "apiVersion",
    "approvedBy",
    "compilationDigest",
    "decision",
    "kind",
    "packageDigest",
  ].sort();
  if (
    keys.length !== expectedKeys.length ||
    !keys.every((key, index) => key === expectedKeys[index]) ||
    approval.apiVersion !== "swecircuit/dogfood-approval/v1alpha1" ||
    approval.kind !== "DogfoodPackageApproval" ||
    approval.approvedBy !== "integration-owner" ||
    approval.decision !== "approve" ||
    approval.compilationDigest !== expectation.compilationDigest ||
    approval.packageDigest !== expectation.packageDigest
  ) {
    fail("Approval does not bind the exact current compilation and package.");
  }
  return approval;
}

async function verifiedCurrent() {
  const artifacts = await compileCurrent();
  await readApproval(artifacts.expectation);
  const specialistPackage = requireValue(
    "verify approved V13 dogfood package",
    verifySpecialistPackage(artifacts.specialistPackage, artifacts.expectation),
  );
  return { ...artifacts, specialistPackage };
}

async function readSession(expectation) {
  const raw = new Uint8Array(await readFile(resolve(ROOT, SESSION_PATH)));
  return requireValue(
    "restore V13 dogfood run session",
    restoreSpecialistRunSession(raw, expectation),
  );
}

async function persistInspection(session, expectation, label) {
  const inspection = requireValue(
    "inspect V13 dogfood run session",
    inspectSpecialistRunSession(session, expectation),
  );
  await writeJson(INSPECTION_PATH, inspection);
  await writeJson(`${EVIDENCE}/run/inspections/${label}.json`, inspection);
  return inspection;
}

async function commandCompile() {
  const artifacts = await compileCurrent();
  const blueprints = await writeCandidate(artifacts);
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "candidate_compiled",
        search: artifacts.compilation.search,
        serialBaseline: artifacts.compilation.serialBaseline.metrics,
        selected: artifacts.compilation.selected,
        selectionReason: artifacts.compilation.selectionReason,
        launchWaves: artifacts.compilation.launchWaves,
        blueprints,
        ...artifacts.expectation,
        next: `Review candidate/summary.json and create ${APPROVAL_PATH}.`,
      },
      null,
      2,
    )}\n`,
  );
}

async function commandStart() {
  const artifacts = await verifiedCurrent();
  await writeCandidate(artifacts);
  const session = requireValue(
    "create V13 dogfood run session",
    createSpecialistRunSession(artifacts.specialistPackage, artifacts.expectation),
  );
  await writeJson(SESSION_PATH, session);
  await writeJson(`${EVIDENCE}/run/sessions/000-initial.json`, session);
  const inspection = await persistInspection(session, artifacts.expectation, "000-initial");
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "run_started",
        stage: inspection.stage,
        nextAction: inspection.nextAction,
        eligibleContracts: inspection.dependencyEligibleContracts.map((contract) => ({
          agentId: contract.agentId,
          blueprintDigest: contract.blueprintDigest,
          path: contract.path,
          digest: contract.digest,
          bytes: contract.bytes,
        })),
        sessionDigest: session.contentDigest,
      },
      null,
      2,
    )}\n`,
  );
}

async function commandInspect() {
  const artifacts = await verifiedCurrent();
  const session = await readSession(artifacts.expectation);
  const inspection = await persistInspection(
    session,
    artifacts.expectation,
    `inspect-${session.acceptedHandoffs.length.toString().padStart(3, "0")}`,
  );
  process.stdout.write(`${JSON.stringify(inspection, null, 2)}\n`);
}

async function commandAssess(workUnitId) {
  const artifacts = await verifiedCurrent();
  const session = await readSession(artifacts.expectation);
  const blueprint = artifacts.compilation.blueprints.find((candidate) =>
    candidate.workUnitIds.includes(workUnitId),
  );
  if (blueprint === undefined) {
    fail(`Unknown work unit for assessment: ${workUnitId}`);
  }
  const rawHandoffs = session.acceptedHandoffs.map(
    (accepted) => new Uint8Array(Buffer.from(accepted.rawBase64, "base64")),
  );
  const assessment = requireValue(
    `assess dependencies for ${workUnitId}`,
    assessSpecialistHandoffs(
      artifacts.specialistPackage,
      artifacts.expectation,
      blueprint.id,
      rawHandoffs,
    ),
  );
  await writeJson(`${EVIDENCE}/run/assessments/${workUnitId}.json`, assessment);
  process.stdout.write(`${JSON.stringify(assessment, null, 2)}\n`);
}

async function commandRecord(handoffPath) {
  if (handoffPath === undefined) {
    fail("record requires a repository-relative raw handoff path.");
  }
  const artifacts = await verifiedCurrent();
  const session = await readSession(artifacts.expectation);
  const absoluteHandoff = resolve(ROOT, handoffPath);
  const rawHandoff = new Uint8Array(await readFile(absoluteHandoff));
  const verified = requireValue(
    `verify exact raw handoff ${handoffPath}`,
    verifySpecialistHandoff(
      artifacts.specialistPackage,
      artifacts.expectation,
      rawHandoff,
    ),
  );
  const successor = requireValue(
    `record exact raw handoff ${handoffPath}`,
    recordSpecialistRunHandoff(
      session,
      artifacts.expectation,
      rawHandoff,
    ),
  );
  const ordinal = successor.acceptedHandoffs.length.toString().padStart(3, "0");
  await writeGenerated(
    `${EVIDENCE}/run/accepted/${ordinal}-${verified.handoff.agent.id}.json`,
    rawHandoff,
  );
  await writeJson(SESSION_PATH, successor);
  await writeJson(
    `${EVIDENCE}/run/sessions/${ordinal}-${verified.handoff.agent.id}.json`,
    successor,
  );
  const inspection = await persistInspection(
    successor,
    artifacts.expectation,
    `${ordinal}-${verified.handoff.agent.id}`,
  );
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "handoff_recorded",
        agentId: verified.handoff.agent.id,
        workflowOutcome: verified.handoff.outcome,
        rawBytes: verified.rawBytes,
        rawDigest: verified.rawDigest,
        sessionDigest: successor.contentDigest,
        stage: inspection.stage,
        nextAction: inspection.nextAction,
        eligibleAgentIds: inspection.dependencyEligibleContracts.map(
          (contract) => contract.agentId,
        ),
        integrationReady: inspection.integrationReady,
      },
      null,
      2,
    )}\n`,
  );
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  switch (command) {
    case "compile":
      await commandCompile();
      break;
    case "start":
      await commandStart();
      break;
    case "inspect":
      await commandInspect();
      break;
    case "assess":
      await commandAssess(args[0]);
      break;
    case "record":
      await commandRecord(args[0]);
      break;
    default:
      fail("Usage: run-v13-dogfood.mjs <compile|start|inspect|assess|record> [value]");
  }
}

try {
  await main();
} catch (error) {
  const message = error instanceof Error ? error.message : "Unexpected V13 dogfood failure.";
  process.stderr.write(`V13 dogfood failed: ${message}\n`);
  process.exitCode = 1;
}
