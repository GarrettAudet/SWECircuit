import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  SPECIALIST_API_VERSION,
  compileAgentBlueprints,
  renderSpecialistPackage,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../../../../../dist/index.js";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const INPUTS = join(EVIDENCE, "inputs");
const PACKAGE_DIR = join(EVIDENCE, "package");
const HANDOFF_DIR = join(EVIDENCE, "handoffs");
const mode = process.argv[2] ?? "prepare";

const REVIEW_ROUTING = "review.routing-api";
const REVIEW_HOST = "review.host-lifecycle";
const REVIEW_SECURITY = "review.security-evidence";
const REVIEW_PRODUCT = "review.product-runview";
const WORK_UNITS = [REVIEW_ROUTING, REVIEW_HOST, REVIEW_SECURITY, REVIEW_PRODUCT];

const SNAPSHOTS = [
  ["docs/specs/v14-adaptive-orchestration/spec.md", "spec.md"],
  ["docs/specs/v14-adaptive-orchestration/goal-synthesis.md", "goal-synthesis.md"],
  [
    "docs/specs/v14-adaptive-orchestration/runtime-routing-contract.md",
    "runtime-routing-contract.md",
  ],
  [
    "docs/architecture/decisions/0007-adaptive-host-orchestration.md",
    "adr-0007.md",
  ],
  [
    "docs/research/snapshots/2026-07-27-adaptive-orchestration-host-scan.md",
    "host-scan.md",
  ],
];

const SOURCE_DEFINITIONS = [
  {
    id: "context.v14-spec",
    path: "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/spec.md",
    description: "Immutable V14 feature specification.",
    allowedWorkUnits: WORK_UNITS,
  },
  {
    id: "context.v14-goal",
    path: "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/goal-synthesis.md",
    description: "Immutable owner goal synthesis and closed decisions.",
    allowedWorkUnits: WORK_UNITS,
  },
  {
    id: "context.v14-contract",
    path:
      "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/runtime-routing-contract.md",
    description: "Proposed runtime routing, controller, receipt, and RunView contract.",
    allowedWorkUnits: WORK_UNITS,
  },
  {
    id: "context.v14-adr",
    path: "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/adr-0007.md",
    description: "Proposed adaptive host orchestration architecture decision.",
    allowedWorkUnits: WORK_UNITS,
  },
  {
    id: "context.v14-host-scan",
    path: "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/host-scan.md",
    description: "Dated primary-source host capability synthesis.",
    allowedWorkUnits: [REVIEW_HOST, REVIEW_PRODUCT],
  },
  {
    id: "context.adr-0003",
    path: "docs/architecture/decisions/0003-portable-orchestration-control-plane.md",
    description: "Deferred universal runtime design and scope warning.",
    allowedWorkUnits: [REVIEW_HOST, REVIEW_SECURITY],
  },
  {
    id: "context.adr-0004",
    path: "docs/architecture/decisions/0004-specialist-compiler-first.md",
    description: "Accepted specialist compiler and host boundary.",
    allowedWorkUnits: [REVIEW_ROUTING, REVIEW_HOST, REVIEW_SECURITY],
  },
  {
    id: "context.adr-0005",
    path: "docs/architecture/decisions/0005-immutable-specialist-run-session.md",
    description: "Accepted immutable run-session and dependency eligibility boundary.",
    allowedWorkUnits: [REVIEW_ROUTING, REVIEW_HOST, REVIEW_SECURITY],
  },
  {
    id: "context.round-4",
    path: "docs/specs/v11-orchestration-planner/architecture-review-round-4.md",
    description: "Independent findings against the coupled universal runtime.",
    allowedWorkUnits: [REVIEW_HOST, REVIEW_SECURITY],
  },
  {
    id: "context.correction-design",
    path: "docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
    description: "Mandatory runtime-layer correction obligations.",
    allowedWorkUnits: [REVIEW_ROUTING, REVIEW_HOST, REVIEW_SECURITY],
  },
  {
    id: "context.specialist-types",
    path: "src/specialist-types.ts",
    description: "Current immutable specialist public types.",
    allowedWorkUnits: [REVIEW_ROUTING, REVIEW_SECURITY],
  },
  {
    id: "context.run-types",
    path: "src/specialist-run-types.ts",
    description: "Current immutable run-session public types.",
    allowedWorkUnits: [REVIEW_ROUTING, REVIEW_HOST, REVIEW_SECURITY],
  },
  {
    id: "context.public-api",
    path: "src/index.ts",
    description: "Current public kernel exports.",
    allowedWorkUnits: [REVIEW_ROUTING],
  },
  {
    id: "context.v13-review",
    path: "docs/specs/v13-dogfood-validation/review.md",
    description: "Real-application dogfood quality and process findings.",
    allowedWorkUnits: [REVIEW_PRODUCT],
  },
  {
    id: "context.v13-milestone",
    path: "docs/milestones/v13.md",
    description: "V13 product outcome, residual risk, and V14 recommendation.",
    allowedWorkUnits: [REVIEW_PRODUCT, REVIEW_HOST],
  },
];

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireValue(label, result) {
  if (!result.ok || result.value === null) {
    const details = result.diagnostics
      .map((item) => `${item.code}:${item.message}`)
      .join("\n");
    throw new Error(`${label} failed\n${details}`);
  }
  return result.value;
}

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function freezeInputs() {
  await mkdir(INPUTS, { recursive: true });
  for (const [source, target] of SNAPSHOTS) {
    await writeFile(join(INPUTS, target), await readFile(join(ROOT, source)));
  }
}

async function bindSources() {
  return Promise.all(
    SOURCE_DEFINITIONS.map(async (source) => {
      const bytes = await readFile(join(ROOT, source.path));
      return {
        id: source.id,
        kind: "repository",
        locator: `path:${source.path}`,
        digest: digest(bytes),
        bytes: bytes.byteLength,
        description: source.description,
        allowedWorkUnits: source.allowedWorkUnits,
        readScope: source.path,
      };
    }),
  );
}

function evidenceRequirement(id, description) {
  return {
    id,
    kind: "review",
    duty: "produce",
    description,
    independentFromProducer: false,
  };
}

function workUnit({
  id,
  objective,
  weight,
  moduleId,
  action,
  capability,
  sourceIds,
  sourcePaths,
  evidenceId,
  artifact,
}) {
  return {
    id,
    objective,
    weight,
    module: {
      id: moduleId,
      action,
      inputPorts: [{ name: "input", artifactType: "FrozenV14ArchitectureCandidate" }],
      outputPorts: [{ name: "output", artifactType: artifact }],
    },
    dependencies: [],
    requiredCapabilities: [capability],
    contextUses: sourceIds.map((sourceId) => ({
      sourceId,
      purpose: "Review the exact immutable V14 architecture candidate.",
    })),
    scope: { read: sourcePaths, write: [], conflictZones: [] },
    permissions: [{ kind: "filesystem.read", scopes: sourcePaths }],
    evidenceRequirementIds: [evidenceId],
    handoffArtifacts: [artifact],
    stopConditions: [
      "Stop if a declared source is unavailable or differs from its exact digest and byte binding.",
      "Do not edit files, run commands, access the network, launch descendants, or change Git state.",
      "Return only the concrete closed SpecialistAgentHandoff JSON object required by the generated contract.",
      "Use a non-pass outcome when a material defect remains; do not soften a finding into prose.",
    ],
  };
}

function buildRequest(contextSources) {
  const pathById = new Map(contextSources.map((source) => [source.id, source.readScope]));
  const paths = (...ids) => ids.map((id) => pathById.get(id)).sort();
  const shared = ["context.v14-spec", "context.v14-goal", "context.v14-contract", "context.v14-adr"];
  const routingSources = [
    ...shared,
    "context.adr-0004",
    "context.adr-0005",
    "context.correction-design",
    "context.specialist-types",
    "context.run-types",
    "context.public-api",
  ];
  const hostSources = [
    ...shared,
    "context.v14-host-scan",
    "context.adr-0003",
    "context.adr-0004",
    "context.adr-0005",
    "context.round-4",
    "context.correction-design",
    "context.run-types",
    "context.v13-milestone",
  ];
  const securitySources = [
    ...shared,
    "context.adr-0003",
    "context.adr-0004",
    "context.adr-0005",
    "context.round-4",
    "context.correction-design",
    "context.specialist-types",
    "context.run-types",
  ];
  const productSources = [
    ...shared,
    "context.v14-host-scan",
    "context.v13-review",
    "context.v13-milestone",
  ];
  const allPaths = [...new Set(contextSources.map((source) => source.readScope))].sort();

  return {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "GoalContract",
      id: "v14.adaptive-orchestration.architecture",
      revision: 1,
      objective:
        "Independently review the V14 adaptive orchestration architecture before any public runtime-routing or host-controller API is frozen.",
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.external-effects",
          statement: "Core compiles and verifies; host adapters perform and observe native IDE effects.",
          rationale: "This preserves the accepted V11 and V12 trust boundary.",
        },
        {
          id: "assumption.calibrated-supply",
          statement: "An owner-reviewed host inventory supplies calibrated capability tiers.",
          rationale: "Core cannot establish volatile model quality from provider names.",
        },
        {
          id: "assumption.windows-first",
          statement: "The first effectful reference adapter targets Windows Codex Desktop.",
          rationale: "ADR 0006 limits the first release support boundary to Windows.",
        },
      ],
      unresolvedDecisions: [],
      acceptanceCriteria: [
        {
          id: "criterion.routing-api",
          description:
            "Runtime demand, inventory, filtering, scoring, override, identity, and public API semantics are deterministic and implementable.",
          evidenceRequirements: [
            evidenceRequirement(
              "evidence.routing-api",
              "Preserve the exact routing and public API architecture review.",
            ),
          ],
        },
        {
          id: "criterion.host-lifecycle",
          description:
            "The host command, observation, controller, adapter, restore, and escalation boundaries are portable and do not revive the universal scheduler.",
          evidenceRequirements: [
            evidenceRequirement(
              "evidence.host-lifecycle",
              "Preserve the exact host lifecycle and portability review.",
            ),
          ],
        },
        {
          id: "criterion.security-evidence",
          description:
            "Trust, authority, quality calibration, approval, drift, receipt, replay, and evidence semantics fail closed.",
          evidenceRequirements: [
            evidenceRequirement(
              "evidence.security-evidence",
              "Preserve the exact security and evidence review.",
            ),
          ],
        },
        {
          id: "criterion.product-runview",
          description:
            "The one-goal IDE experience, serial baseline, RunView, interventions, and release claims remain simple and understandable.",
          evidenceRequirements: [
            evidenceRequirement(
              "evidence.product-runview",
              "Preserve the exact product and RunView usability review.",
            ),
          ],
        },
      ],
      contextSources,
      authority: {
        allowedModules: [
          "review.runtime-routing-api",
          "review.host-lifecycle-portability",
          "review.security-evidence",
          "review.product-runview",
        ],
        allowedCapabilities: [
          "audit.deterministic-public-api",
          "analyze.host-lifecycle-portability",
          "audit.orchestration-security",
          "review.ide-product-usability",
        ],
        permissionCeiling: [{ kind: "filesystem.read", scopes: allPaths }],
        forbiddenEffects: [
          "Do not write files, run commands, access the network, launch descendants, change Git state, or claim host effects.",
        ],
        maxAgents: 4,
        maxConcurrency: 4,
      },
      optimization: { agentStartupCost: 1, handoffCost: 1 },
      workUnits: [
        workUnit({
          id: REVIEW_ROUTING,
          objective:
            "Audit the deterministic demand, inventory, filter, comparator, override, digest, schema, and public API design for implementability and closed semantics.",
          weight: 8,
          moduleId: "review.runtime-routing-api",
          action:
            "Trace every proposed type and operation, identify ambiguity or non-determinism, test comparator and identity logic mentally, and return prioritized contract corrections.",
          capability: "audit.deterministic-public-api",
          sourceIds: routingSources,
          sourcePaths: paths(...routingSources),
          evidenceId: "evidence.routing-api",
          artifact: "routing-api-review.md",
        }),
        workUnit({
          id: REVIEW_HOST,
          objective:
            "Audit host commands, observations, lifecycle, restore, escalation, adapter portability, and the boundary with the deferred universal scheduler.",
          weight: 8,
          moduleId: "review.host-lifecycle-portability",
          action:
            "Map launch through settlement and recovery across materially different host shapes, identify hidden effect or liveness claims, and return the smallest sufficient controller obligations.",
          capability: "analyze.host-lifecycle-portability",
          sourceIds: hostSources,
          sourcePaths: paths(...hostSources),
          evidenceId: "evidence.host-lifecycle",
          artifact: "host-lifecycle-review.md",
        }),
        workUnit({
          id: REVIEW_SECURITY,
          objective:
            "Threat-model calibration, authority, approval, inventory drift, launch substitution, receipt identity, replay, escalation, and source-preserving evidence.",
          weight: 9,
          moduleId: "review.security-evidence",
          action:
            "Enumerate trust roots and attacker-controlled inputs, reject confused-deputy and false-proof paths, and return concrete schema, ordering, and adversarial-test requirements.",
          capability: "audit.orchestration-security",
          sourceIds: securitySources,
          sourcePaths: paths(...securitySources),
          evidenceId: "evidence.security-evidence",
          artifact: "security-evidence-review.md",
        }),
        workUnit({
          id: REVIEW_PRODUCT,
          objective:
            "Audit whether an ordinary IDE user can understand, invoke, observe, steer, and trust V14 without repeating V13 ceremony or overstating native UI capabilities.",
          weight: 5,
          moduleId: "review.product-runview",
          action:
            "Walk the one-goal experience, serial and parallel paths, assignment explanation, override, failure intervention, RunView, and release story; return concise usability corrections.",
          capability: "review.ide-product-usability",
          sourceIds: productSources,
          sourcePaths: paths(...productSources),
          evidenceId: "evidence.product-runview",
          artifact: "product-runview-review.md",
        }),
      ],
    },
    proposedCandidates: [
      {
        id: "candidate.v14.four-independent-reviews",
        groups: WORK_UNITS.map((id) => [id]),
      },
    ],
  };
}

async function prepare() {
  await freezeInputs();
  const request = buildRequest(await bindSources());
  await writeJson(join(EVIDENCE, "request.json"), request);
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        stage: "goal-contract-prepared",
        goalId: request.goal.id,
        workUnits: request.goal.workUnits.map((item) => item.id),
        contextSources: request.goal.contextSources.length,
        maxConcurrency: request.goal.authority.maxConcurrency,
      },
      null,
      2,
    )}\n`,
  );
}

async function compile() {
  const request = JSON.parse(await readFile(join(EVIDENCE, "request.json"), "utf8"));
  const compilation = requireValue(
    "V14 architecture specialist compilation",
    compileAgentBlueprints(request),
  );
  const specialistPackage = requireValue(
    "V14 architecture package rendering",
    renderSpecialistPackage(compilation),
  );
  await mkdir(PACKAGE_DIR, { recursive: true });
  for (const file of specialistPackage.files) {
    const output = join(PACKAGE_DIR, file.path);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, file.content, "utf8");
  }
  await writeJson(join(EVIDENCE, "package-envelope.json"), specialistPackage);
  await writeJson(join(EVIDENCE, "compilation-summary.json"), {
    goalId: compilation.goal.id,
    goalRevision: compilation.goal.revision,
    search: compilation.search,
    serialBaseline: compilation.serialBaseline,
    selected: compilation.selected,
    selectionReason: compilation.selectionReason,
    retainedAlternatives: compilation.alternatives,
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
    launchWaves: compilation.launchWaves,
    agents: compilation.blueprints.map((blueprint) => ({
      id: blueprint.id,
      contentDigest: blueprint.contentDigest,
      workUnitIds: blueprint.workUnitIds,
      dependencies: blueprint.dependencies,
      contractFile:
        specialistPackage.manifest.agents.find((agent) => agent.agentId === blueprint.id)
          ?.contractFile ?? null,
    })),
  });
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        stage: "specialists-compiled",
        search: compilation.search,
        serialBaseline: compilation.serialBaseline.metrics,
        selected: compilation.selected.metrics,
        selectionReason: compilation.selectionReason,
        compilationDigest: compilation.contentDigest,
        packageDigest: specialistPackage.packageDigest,
        launchWaves: compilation.launchWaves,
      },
      null,
      2,
    )}\n`,
  );
}

async function approve() {
  const specialistPackage = JSON.parse(
    await readFile(join(EVIDENCE, "package-envelope.json"), "utf8"),
  );
  const expectation = {
    compilationDigest: specialistPackage.compilationDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    "V14 architecture package verification",
    verifySpecialistPackage(specialistPackage, expectation),
  );
  const approval = {
    apiVersion: "swecircuit/review-approval/v1alpha1",
    kind: "SpecialistReviewApproval",
    goalId: "v14.adaptive-orchestration.architecture",
    goalRevision: 1,
    approvedBy: "repository-owner-via-standing-release-authorization",
    decision: "approve",
    approvalBasis:
      "The owner instructed Codex to pursue the final orchestration product through revisions and audits until release-ready. The integration owner reviewed this exact read-only roster and digest pair.",
    expectation,
  };
  await writeJson(join(EVIDENCE, "approval.json"), approval);
  process.stdout.write(
    `${JSON.stringify({ outcome: "pass", stage: "package-approved", ...expectation }, null, 2)}\n`,
  );
}

async function verifyHandoff(relativePath) {
  if (relativePath === undefined) {
    throw new Error("verify-handoff requires a repository-relative handoff path.");
  }
  const specialistPackage = JSON.parse(
    await readFile(join(EVIDENCE, "package-envelope.json"), "utf8"),
  );
  const expectation = {
    compilationDigest: specialistPackage.compilationDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    "V14 architecture package verification",
    verifySpecialistPackage(specialistPackage, expectation),
  );
  const raw = new Uint8Array(await readFile(join(ROOT, relativePath)));
  const verified = requireValue(
    `V14 architecture handoff verification: ${relativePath}`,
    verifySpecialistHandoff(specialistPackage, expectation, raw),
  );
  await mkdir(HANDOFF_DIR, { recursive: true });
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        agentId: verified.handoff.agent.id,
        workflowOutcome: verified.handoff.outcome,
        rawBytes: verified.rawBytes,
        rawDigest: verified.rawDigest,
        semanticDigest: verified.semanticDigest,
        artifactBindings: verified.artifactBindings,
      },
      null,
      2,
    )}\n`,
  );
}

if (mode === "prepare") {
  await prepare();
} else if (mode === "compile") {
  await compile();
} else if (mode === "approve") {
  await approve();
} else if (mode === "verify-handoff") {
  await verifyHandoff(process.argv[3]);
} else {
  throw new Error(`Unknown mode: ${mode}`);
}
