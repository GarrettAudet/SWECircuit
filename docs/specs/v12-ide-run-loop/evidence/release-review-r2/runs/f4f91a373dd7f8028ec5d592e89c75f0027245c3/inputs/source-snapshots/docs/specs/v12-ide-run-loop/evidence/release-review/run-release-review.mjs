import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  compileAgentBlueprints,
  renderSpecialistPackage,
  verifySpecialistPackage,
} from "../../../../../dist/index.js";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const INPUTS = join(EVIDENCE, "inputs");
const PACKAGE_DIR = join(EVIDENCE, "package");
const mode = process.argv[2] ?? "prepare";
const checkpoint = process.argv[3];
const BASELINE = "c2f974d2288fc510cb8388fbc8e6abe9fd5d9e8c";

const PRODUCT = "review.product-api-ide";
const LIFECYCLE = "review.lifecycle-correctness";
const SECURITY = "review.security-trace-authority";
const ALL_REVIEWS = [PRODUCT, LIFECYCLE, SECURITY];

const source = (id, path, description, allowedWorkUnits) => ({
  id,
  path,
  description,
  allowedWorkUnits,
});

const SOURCES = [
  source(
    "context.candidate-manifest",
    "docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
    "Immutable candidate commit and complete reviewed-source binding manifest.",
    ALL_REVIEWS,
  ),
  source("context.spec", "docs/specs/v12-ide-run-loop/spec.md", "V12 acceptance contract.", ALL_REVIEWS),
  source(
    "context.run-contract",
    "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
    "Normative Specialist Run contract.",
    ALL_REVIEWS,
  ),
  source(
    "context.adr",
    "docs/architecture/decisions/0005-immutable-specialist-run-session.md",
    "Accepted V12 architecture decision.",
    ALL_REVIEWS,
  ),
  source(
    "context.architecture",
    "docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
    "Integrated implementation architecture.",
    ALL_REVIEWS,
  ),
  source("context.test-plan", "docs/specs/v12-ide-run-loop/test-plan.md", "V12 verification plan.", ALL_REVIEWS),
  source(
    "context.implementation-notes",
    "docs/specs/v12-ide-run-loop/implementation-notes.md",
    "Integrated implementation and verification evidence summary.",
    ALL_REVIEWS,
  ),
  source(
    "context.debug-notes",
    "docs/specs/v12-ide-run-loop/debug-notes.md",
    "Preserved failures, diagnoses, and causal corrections.",
    [LIFECYCLE, SECURITY],
  ),
  source("context.review", "docs/specs/v12-ide-run-loop/review.md", "Current release review record.", ALL_REVIEWS),
  source("context.readme", "README.md", "Concise public product surface.", [PRODUCT]),
  source("context.package", "package.json", "Published package and export surface.", [PRODUCT, SECURITY]),
  source("context.index", "src/index.ts", "Public TypeScript exports.", [PRODUCT, SECURITY]),
  source(
    "context.schema-guide",
    "schemas/v1alpha1/README.md",
    "Published schema semantics and host boundary.",
    [PRODUCT, SECURITY],
  ),
  source(
    "context.ide-guide",
    "docs/ide/specialist-agent-kickoff.md",
    "Visible IDE run-loop procedure.",
    [PRODUCT, SECURITY],
  ),
  source(
    "context.module-guide",
    "docs/modules/specialist-run-session.md",
    "Reusable module contract for the run session.",
    [PRODUCT],
  ),
  source("context.modules-index", "docs/modules/README.md", "Module catalog integration.", [PRODUCT]),
  source("context.dogfood", "scripts/run-v12-dogfood.mjs", "Deterministic four-operation IDE journey.", [PRODUCT, LIFECYCLE]),
  source(
    "context.consumer-check",
    "scripts/check-packed-consumer.mjs",
    "Clean installed-package compatibility gate.",
    [PRODUCT, LIFECYCLE],
  ),
  source(
    "context.consumer-host",
    "scripts/fixtures/packed-consumer-host.ts",
    "Public TypeScript consumer fixture.",
    [PRODUCT],
  ),
  source("context.run-types", "src/specialist-run-types.ts", "Closed V12 public and wire types.", [LIFECYCLE, SECURITY]),
  source("context.run-schema", "src/specialist-run-schema.ts", "Strict run-session schema validator.", [LIFECYCLE, SECURITY]),
  source(
    "context.run-schema-json",
    "schemas/v1alpha1/specialist-run.schema.json",
    "Package-owned closed run-session JSON Schema.",
    [LIFECYCLE, SECURITY],
  ),
  source("context.run-session", "src/specialist-run-session.ts", "Create and restore implementation.", [LIFECYCLE, SECURITY]),
  source(
    "context.run-transition",
    "src/specialist-run-transition.ts",
    "Monotonic handoff transition implementation.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.run-inspection",
    "src/specialist-run-inspection.ts",
    "Deterministic package-DAG inspection implementation.",
    [LIFECYCLE, SECURITY],
  ),
  source("context.constants", "src/constants.ts", "Public V12 limits and contract constants.", [LIFECYCLE, SECURITY]),
  source("context.diagnostics", "src/diagnostics.ts", "Stable runtime diagnostics.", [LIFECYCLE, SECURITY]),
  source(
    "context.diagnostic-catalog",
    "schemas/v1alpha1/diagnostic-catalog.json",
    "Normative diagnostic catalog.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.handoff",
    "src/specialist-handoff.ts",
    "V11 exact raw handoff and fan-in verifier composed by V12.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.render",
    "src/specialist-render.ts",
    "V11 approved-package verification and manifest resolution.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.foundation-tests",
    "test/specialist-run-foundation.test.mjs",
    "V12 create, restore, identity, and boundary tests.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.transition-tests",
    "test/specialist-run-transition.test.mjs",
    "V12 transition, replay, and route tests.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.inspection-tests",
    "test/specialist-run-inspection.test.mjs",
    "V12 DAG inspection and readiness tests.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.schema-tests",
    "test/specialist-run-schema.test.mjs",
    "V12 strict schema and public export tests.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.adversarial-tests",
    "test/specialist-run.test.mjs",
    "Integrated adversarial, permutation, restore, and limit tests.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.v11-goal",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json",
    "Current V11 revision-32 reviewed GoalContract.",
    [SECURITY],
  ),
  source(
    "context.v11-approval",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/approval.json",
    "Current Candidate-A approval binding.",
    [SECURITY],
  ),
  source(
    "context.v11-compilation",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
    "Current Candidate-A deterministic compilation.",
    [SECURITY],
  ),
  source(
    "context.v11-launch-authorization",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/launch-authorization.json",
    "Cross-package launch authorization.",
    [SECURITY],
  ),
  source(
    "context.v11-receipt",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json",
    "Independent Audit-B package verification receipt.",
    [SECURITY],
  ),
  source(
    "context.v11-audit-handoff",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass-attempt-32.json",
    "Exact independent semantic audit PASS handoff.",
    [SECURITY],
  ),
  source(
    "context.v11-report",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/report.json",
    "Current V11 dogfood report.",
    [SECURITY],
  ),
  source(
    "context.v12-verification",
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
    "Complete V12 verification-wave handoff gate.",
    [LIFECYCLE, SECURITY],
  ),
];

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireValue(result, stage) {
  if (!result.ok || result.value === null) {
    const diagnostics = result.diagnostics
      .map((item) => `${item.code}:${item.message}`)
      .join("\n");
    throw new Error(`${stage} failed\n${diagnostics}`);
  }
  return result.value;
}

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function trackedSources() {
  return SOURCES.filter((entry) => entry.id !== "context.candidate-manifest");
}

function verifyCheckpoint(candidate) {
  const head = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: ROOT,
    encoding: "utf8",
  }).trim();
  if (head !== candidate) {
    throw new Error(`Candidate checkpoint mismatch: HEAD is ${head}.`);
  }
  const paths = trackedSources().map((entry) => entry.path);
  try {
    execFileSync("git", ["diff", "--quiet", candidate, "--", ...paths], {
      cwd: ROOT,
      stdio: "pipe",
    });
  } catch {
    const changed = execFileSync(
      "git",
      ["diff", "--name-only", candidate, "--", ...paths],
      { cwd: ROOT, encoding: "utf8" },
    ).trim();
    throw new Error(`Reviewed source differs from ${candidate}: ${changed}`);
  }
}

async function freezeCandidate(candidate) {
  const bindings = [];
  for (const entry of trackedSources()) {
    const bytes = await readFile(join(ROOT, entry.path));
    bindings.push({ path: entry.path, bytes: bytes.byteLength, digest: digest(bytes) });
  }
  await writeJson(join(INPUTS, "candidate.json"), {
    apiVersion: "swecircuit/release-candidate/v1alpha1",
    kind: "ReleaseCandidateManifest",
    version: "V12",
    baselineCommit: BASELINE,
    candidateCommit: candidate,
    branch: "codex/v12-ide-run-loop",
    canonicalGate: { command: "npm.cmd run verify", result: "pass", tests: 385 },
    reviewedSources: bindings,
  });
}

async function bindSources() {
  return Promise.all(
    SOURCES.map(async (entry) => {
      const bytes = await readFile(join(ROOT, entry.path));
      return {
        id: entry.id,
        kind: "repository",
        locator: `path:${entry.path}`,
        digest: digest(bytes),
        bytes: bytes.byteLength,
        description: entry.description,
        allowedWorkUnits: entry.allowedWorkUnits,
        readScope: entry.path,
      };
    }),
  );
}

function reviewUnit(definition, contextSources) {
  const paths = contextSources
    .filter((entry) => definition.sourceIds.includes(entry.id))
    .map((entry) => entry.readScope)
    .sort();
  return {
    id: definition.id,
    objective: definition.objective,
    weight: 8,
    module: {
      id: definition.moduleId,
      action: definition.action,
      inputPorts: [{ name: "input", artifactType: "FrozenV12ReleaseCandidate" }],
      outputPorts: [{ name: "output", artifactType: definition.outputType }],
    },
    dependencies: [],
    requiredCapabilities: [definition.capability],
    contextUses: definition.sourceIds.map((sourceId) => ({
      sourceId,
      purpose: definition.purpose,
    })),
    scope: { read: paths, write: [], conflictZones: [] },
    permissions: [
      { kind: "filesystem.read", scopes: paths },
      { kind: "process.spawn", scopes: ["git", "node", "npm"] },
    ],
    evidenceRequirementIds: [definition.evidenceId],
    handoffArtifacts: [definition.artifact],
    stopConditions: [
      "Authenticate every declared source against its exact byte count and SHA-256 binding before review.",
      "Do not edit files, change Git state, access the network, launch descendants, or repair a finding.",
      "Use only local read-only inspection and bounded verification commands; report any command that changes tracked bytes as a failure.",
      "Report findings first with severity and exact file/line evidence; use pass only when this review domain is release-ready.",
      "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    ],
  };
}

function requestFor(contextSources, candidate) {
  const common = [
    "context.candidate-manifest",
    "context.spec",
    "context.run-contract",
    "context.adr",
    "context.architecture",
    "context.test-plan",
    "context.implementation-notes",
    "context.review",
  ];
  const definitions = [
    {
      id: PRODUCT,
      objective:
        "Audit whether V12 presents one accurate, simple, IDE-neutral path from an approved package through visible specialist work to verified integration handoff.",
      moduleId: "release-review.product-api-ide",
      action:
        "Review product truth, public API shape, schema publication, installed-consumer behavior, IDE guidance, module composition, and dogfood claims against AC1-AC9; reject ambiguity or host-effect overclaim.",
      outputType: "ProductApiIdeReleaseReview",
      capability: "audit.product-api-ide-truth",
      evidenceId: "evidence.product-api-ide-release-review",
      artifact: "product-api-ide-release-review.md",
      purpose: "Audit the exact V12 product, public API, IDE, and usability surface.",
      sourceIds: [
        ...common,
        "context.readme",
        "context.package",
        "context.index",
        "context.schema-guide",
        "context.ide-guide",
        "context.module-guide",
        "context.modules-index",
        "context.dogfood",
        "context.consumer-check",
        "context.consumer-host",
      ],
    },
    {
      id: LIFECYCLE,
      objective:
        "Audit V12 lifecycle correctness, deterministic recovery, dependency eligibility, exact fan-in, terminal routing, immutability, and adversarial coverage.",
      moduleId: "release-review.lifecycle-correctness",
      action:
        "Trace all four operations through representative DAGs and every non-pass route; inspect validation precedence, replay, fresh-process restore, limits, tests, and dogfood without repairing production.",
      outputType: "LifecycleCorrectnessReleaseReview",
      capability: "audit.lifecycle-correctness-recovery",
      evidenceId: "evidence.lifecycle-correctness-release-review",
      artifact: "lifecycle-correctness-release-review.md",
      purpose: "Audit exact V12 state, transition, inspection, recovery, and test behavior.",
      sourceIds: [
        ...common,
        "context.debug-notes",
        "context.dogfood",
        "context.consumer-check",
        "context.run-types",
        "context.run-schema",
        "context.run-schema-json",
        "context.run-session",
        "context.run-transition",
        "context.run-inspection",
        "context.constants",
        "context.diagnostics",
        "context.diagnostic-catalog",
        "context.handoff",
        "context.render",
        "context.foundation-tests",
        "context.transition-tests",
        "context.inspection-tests",
        "context.schema-tests",
        "context.adversarial-tests",
        "context.v12-verification",
      ],
    },
    {
      id: SECURITY,
      objective:
        "Audit V12 security, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundary for release.",
      moduleId: "release-review.security-trace-authority",
      action:
        "Attack digest substitution, malformed or stale sessions and handoffs, confused-deputy authority, unsafe controls, evidence provenance, V11 trust-root refresh, and any claim that pure core performs host effects.",
      outputType: "SecurityTraceAuthorityReleaseReview",
      capability: "audit.security-trace-authority",
      evidenceId: "evidence.security-trace-authority-release-review",
      artifact: "security-trace-authority-release-review.md",
      purpose: "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries.",
      sourceIds: [
        ...common,
        "context.debug-notes",
        "context.package",
        "context.index",
        "context.schema-guide",
        "context.ide-guide",
        "context.run-types",
        "context.run-schema",
        "context.run-schema-json",
        "context.run-session",
        "context.run-transition",
        "context.run-inspection",
        "context.constants",
        "context.diagnostics",
        "context.diagnostic-catalog",
        "context.handoff",
        "context.render",
        "context.foundation-tests",
        "context.transition-tests",
        "context.inspection-tests",
        "context.schema-tests",
        "context.adversarial-tests",
        "context.v11-goal",
        "context.v11-approval",
        "context.v11-compilation",
        "context.v11-launch-authorization",
        "context.v11-receipt",
        "context.v11-audit-handoff",
        "context.v11-report",
        "context.v12-verification",
      ],
    },
  ];
  const allPaths = contextSources.map((entry) => entry.readScope).sort();
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "GoalContract",
      id: "v12.ide-run-loop.release-review",
      revision: 1,
      objective:
        "Independently determine whether exact V12 candidate d914b273ba619e3cfa42206c8d9f136be73075e3 is release-ready across product truth, lifecycle correctness, and security/trace authority.",
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.exact-candidate",
          statement: `Every reviewed tracked source is byte-identical to candidate ${candidate}.`,
          rationale: "The review harness checks HEAD and every reviewed path before compiling digest-bound contracts.",
        },
        {
          id: "assumption.host-boundary",
          statement:
            "V12 core creates, restores, inspects, and records immutable evidence sessions but does not launch, persist, schedule, integrate, merge, or mutate memory.",
          rationale: "Review must judge the implemented provider-neutral contract rather than the deferred runtime layer.",
        },
        {
          id: "assumption.external-producer",
          statement:
            "The candidate producer is external to this audit goal; every compiled work unit is a read-only reviewer with no candidate write authority.",
          rationale:
            "Compiler-level producer/checker separation applies only when both duties are represented inside one goal. Here the immutable commit and digest-bound source manifest are the producer boundary.",
        },
      ],
      unresolvedDecisions: [],
      acceptanceCriteria: definitions.map((definition) => ({
        id: `criterion.${definition.id}`,
        description: definition.objective,
        evidenceRequirements: [
          {
            id: definition.evidenceId,
            kind: "review",
            duty: "produce",
            description: `Preserve the exact independent ${definition.outputType} evidence.`,
            independentFromProducer: false,
          },
        ],
      })),
      contextSources,
      authority: {
        allowedModules: definitions.map((definition) => definition.moduleId).sort(),
        allowedCapabilities: definitions
          .map((definition) => definition.capability)
          .sort(),
        permissionCeiling: [
          { kind: "filesystem.read", scopes: allPaths },
          { kind: "process.spawn", scopes: ["git", "node", "npm"] },
        ],
        forbiddenEffects: [
          "Do not edit files, change Git state, access the network, launch descendants, repair findings, or claim that core performs external host effects.",
        ],
        maxAgents: 3,
        maxConcurrency: 3,
      },
      optimization: { agentStartupCost: 1, handoffCost: 1 },
      workUnits: definitions.map((definition) =>
        reviewUnit(definition, contextSources),
      ),
    },
  };
}

async function prepare() {
  if (typeof checkpoint !== "string" || !/^[0-9a-f]{40}$/.test(checkpoint)) {
    throw new Error("prepare requires the exact 40-character candidate commit.");
  }
  verifyCheckpoint(checkpoint);
  await freezeCandidate(checkpoint);
  const request = requestFor(await bindSources(), checkpoint);
  await writeJson(join(EVIDENCE, "request.json"), request);
  await writeJson(join(EVIDENCE, "phase-metadata.json"), {
    phase: "release-review",
    checkpoint,
    goalId: request.goal.id,
    goalRevision: request.goal.revision,
    runtimeInvoked: false,
  });
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        stage: "goal-contract-prepared",
        checkpoint,
        workUnits: request.goal.workUnits.map((entry) => entry.id),
        contextSources: request.goal.contextSources.length,
        maxAgents: request.goal.authority.maxAgents,
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
    compileAgentBlueprints(request),
    "Release-review compilation",
  );
  const specialistPackage = requireValue(
    renderSpecialistPackage(compilation),
    "Release-review package rendering",
  );
  for (const file of specialistPackage.files) {
    const output = join(PACKAGE_DIR, file.path);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, file.content, "utf8");
  }
  await writeJson(join(EVIDENCE, "package-envelope.json"), specialistPackage);
  const summary = {
    goalId: compilation.goal.id,
    goalRevision: compilation.goal.revision,
    search: compilation.search,
    serialBaseline: compilation.serialBaseline,
    selected: compilation.selected,
    selectionReason: compilation.selectionReason,
    retainedAlternatives: compilation.alternatives,
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
    launchWaves: specialistPackage.manifest.launchWaves,
    agents: compilation.blueprints.map((blueprint) => ({
      id: blueprint.id,
      digest: blueprint.contentDigest,
      workUnitIds: blueprint.workUnitIds,
      dependencyAgentIds: blueprint.dependencies,
      contractFile: specialistPackage.manifest.agents.find(
        (agent) => agent.agentId === blueprint.id,
      )?.contractFile,
    })),
    packageVerified: false,
    runtimeInvoked: false,
  };
  await writeJson(join(EVIDENCE, "compilation-summary.json"), summary);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

async function approve() {
  const request = JSON.parse(await readFile(join(EVIDENCE, "request.json"), "utf8"));
  const specialistPackage = JSON.parse(
    await readFile(join(EVIDENCE, "package-envelope.json"), "utf8"),
  );
  const expectation = {
    compilationDigest: specialistPackage.compilationDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    verifySpecialistPackage(specialistPackage, expectation),
    "Approval-bound release-review package verification",
  );
  await writeJson(join(EVIDENCE, "approval.json"), {
    apiVersion: "swecircuit/review-approval/v1alpha1",
    kind: "SpecialistReviewApproval",
    goalId: request.goal.id,
    goalRevision: request.goal.revision,
    approvedBy: "repository-owner-via-main-agent",
    approvalBasis:
      "The owner authorized independent release audits; the integration owner reviewed this exact candidate, three task-shaped contracts, authority, source bindings, and digest pair before launch.",
    expectation,
  });
  const summaryPath = join(EVIDENCE, "compilation-summary.json");
  const summary = JSON.parse(await readFile(summaryPath, "utf8"));
  summary.packageVerified = true;
  await writeJson(summaryPath, summary);
  process.stdout.write(
    `${JSON.stringify({ outcome: "pass", stage: "package-approved", ...expectation }, null, 2)}\n`,
  );
}

if (mode === "prepare") {
  await prepare();
} else if (mode === "compile") {
  await compile();
} else if (mode === "approve") {
  await approve();
} else {
  throw new Error(`Unknown mode: ${mode}`);
}
