import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  compileAgentBlueprints,
  renderSpecialistPackage,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../../../../../dist/index.js";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REVIEW_ROOT = "docs/specs/v12-ide-run-loop/evidence/release-review-r2";
const HARNESS_REPOSITORY_PATH = `${REVIEW_ROOT}/run-release-review.mjs`;
const VERIFIER_REPOSITORY_PATH = `${REVIEW_ROOT}/verify-release-review-handoffs.mjs`;
const mode = process.argv[2] ?? "prepare";
const checkpoint = process.argv[3];

const BASELINE = "c2f974d2288fc510cb8388fbc8e6abe9fd5d9e8c";
const CANDIDATE_PATTERN = /^[0-9a-f]{40}$/;
const DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;
const MATERIALIZATION_DIGEST_DOMAIN = "swecircuit/release-gate/materialization/v1alpha1";
const REQUIRED_SECURITY_CAUSAL_SOURCES = Object.freeze([
  ".gitattributes",
  ".gitignore",
  "src/specialist-handoff-schema-data.ts",
  "src/specialist-handoff-schema.ts",
  "src/specialist-schema-data.ts",
  "src/specialist-schema.ts",
]);

const GATE_EVIDENCE_ROOT =
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates";
const V11_LAUNCH_AUTHORIZATION =
  "docs/specs/v11-specialist-compiler/evidence/dogfood/launch-authorization.json";
const V11_HANDOFF_ROOT =
  "docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/";

const PRODUCT = "review.r2.product-api-ide";
const LIFECYCLE = "review.r2.lifecycle-correctness";
const SECURITY = "review.r2.security-trace-authority";
const ALL_REVIEWS = Object.freeze([PRODUCT, LIFECYCLE, SECURITY]);
const CORRECTION_GOAL = "v12.ide-run-loop.implementation.release-correction";
const MINIMUM_CORRECTION_REVISION = 10;

const AGENTS = Object.freeze({
  correctionR1Release:
    "agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664",
  correctionR1Resource:
    "agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50",
  correctionR1Retired:
    "agent.b73ee06f2af37577c9726f116f1c4741a7012982796300e06e11bb243e93eefe",
  correctionR1Dogfood:
    "agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666",
  correctionR2:
    "agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe",
  correctionR3:
    "agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d",
  correctionR4:
    "agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba",
  correctionR5Dogfood:
    "agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5",
  correctionR5ReleaseEvidence:
    "agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73",
  correctionR6Gate:
    "agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985",
  correctionR6Consumer:
    "agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e",
  correctionR7EvidenceRetention:
    "agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c",
  correctionR8ByteIntegrity:
    "agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d",
  verification:
    "agent.96f004a9e6e206746893d3c06b2068f94f0d918574adcaf935bd1ac50ab3f5f4",
  verificationDogfood:
    "agent.f75d83eb3fbe6107c40045c9b85efc0bfe85aa99bbc07851e5c8f2a9b4b6456f",
  reviewLifecycle:
    "agent.05a41e9299905b099d84cec047f01dea6bd6662f418e8d0280b8c5463d7968bd",
  reviewProduct:
    "agent.30201e58e8e1ff0a39a7ce80868e2a9ed86703849286b41ef59dcf22c875ed04",
  reviewSecurity:
    "agent.b4e5d94b2bdecdbf284add38ccaef6584491d69d9cb535668dd36a69a014af34",
});

function expectedHandoff(agentId, outcome, rawBytes = null, rawDigest = null, file = null) {
  return Object.freeze({ file: file ?? `${agentId}.json`, agentId, outcome, rawBytes, rawDigest });
}

function evidenceSpec({
  id,
  root,
  goalId = CORRECTION_GOAL,
  goalRevision,
  expectation,
  packageAgentIds,
  handoffs,
  complete,
  ready,
  reportKind = "ImplementationPhaseHandoffVerification",
  phase = id,
  readinessField = "phaseReady",
}) {
  return Object.freeze({
    id,
    root,
    goalId,
    goalRevision,
    expectation: Object.freeze({
      compilationDigest: expectation[0],
      packageDigest: expectation[1],
    }),
    packageAgentIds: Object.freeze([...packageAgentIds]),
    handoffs: Object.freeze([...handoffs]),
    complete,
    ready,
    reportKind,
    phase,
    readinessField,
  });
}

const PRIMARY_EVIDENCE_SPECS = Object.freeze([
  evidenceSpec({
    id: "implementation-verification",
    root: "docs/specs/v12-ide-run-loop/evidence/implementation/verification",
    goalId: "v12.ide-run-loop.implementation.verification",
    goalRevision: 1,
    expectation: [
      "sha256:b719fd06f811091968c14ed8ff531ed5cd9df22d90d050e76c355dd542a1aed6",
      "sha256:56117917b1f230336e4a08c92283a785d488b9dd77e4fe32c9e0f261f5e5c5fa",
    ],
    packageAgentIds: [AGENTS.verification, AGENTS.verificationDogfood],
    handoffs: [
      expectedHandoff(
        AGENTS.verification,
        "pass",
        4356,
        "sha256:d2b3ea9c077345fecc78f504a5e376207c367706b9685da4485509fc5c048137",
        "verification-pass.json",
      ),
      expectedHandoff(
        AGENTS.verificationDogfood,
        "pass",
        6031,
        "sha256:1357ace5bbffef6194e17a43e12edcedd32aa29cc9967cdabd40aa21a004a4d2",
        "dogfood-pass.json",
      ),
    ],
    complete: true,
    ready: true,
    phase: "verification",
  }),
  evidenceSpec({
    id: "release-review-r1",
    root: "docs/specs/v12-ide-run-loop/evidence/release-review",
    goalId: "v12.ide-run-loop.release-review",
    goalRevision: 1,
    expectation: [
      "sha256:cd70618e14b23dfae4538c41b6709791238684192b5c000f4e577f0edd6b5fd3",
      "sha256:7a809141af324cdea7028fb07ee6ca6cb79daccfbdf319e2fd8b2c1346a007ee",
    ],
    packageAgentIds: [AGENTS.reviewLifecycle, AGENTS.reviewProduct, AGENTS.reviewSecurity],
    handoffs: [
      expectedHandoff(
        AGENTS.reviewLifecycle,
        "fix",
        5649,
        "sha256:13e1b510607a4c23223b59a0190e3e490be3e95fc94e56dba45cd5e4bf3bdc84",
        "lifecycle-correctness-fix-attempt-1.json",
      ),
      expectedHandoff(
        AGENTS.reviewProduct,
        "fix",
        5819,
        "sha256:7fb4caf2142208d0735d17bc75610098e671113f1c7a1047cc29bb62ce0e2a26",
        "product-api-ide-fix-attempt-1.json",
      ),
      expectedHandoff(
        AGENTS.reviewSecurity,
        "fix",
        7259,
        "sha256:605a4e7065e1c4af2b3114129e919a810e430b584e31c718c0d78fa02fa027b7",
        "security-trace-authority-fix-attempt-1.json",
      ),
    ],
    complete: true,
    ready: false,
    reportKind: "ReleaseReviewHandoffVerification",
    phase: null,
    readinessField: "releaseReady",
  }),
]);

function source(id, path, description, allowedWorkUnits, snapshotPath = null) {
  return { id, path, description, allowedWorkUnits, snapshotPath };
}

const STATIC_SOURCES = [
  source(
    "context.gitattributes",
    ".gitattributes",
    "Candidate Git attribute policy governing canonical evidence byte preservation.",
    [SECURITY],
  ),
  source(
    "context.gitignore",
    ".gitignore",
    "Candidate ignore policy governing canonical evidence retention and scratch isolation.",
    [SECURITY],
  ),
  source(
    "context.spec",
    "docs/specs/v12-ide-run-loop/spec.md",
    "V12 acceptance contract.",
    ALL_REVIEWS,
  ),
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
    "Integrated V12 implementation architecture.",
    ALL_REVIEWS,
  ),
  source(
    "context.test-plan",
    "docs/specs/v12-ide-run-loop/test-plan.md",
    "V12 verification and release plan.",
    ALL_REVIEWS,
  ),
  source(
    "context.implementation-notes",
    "docs/specs/v12-ide-run-loop/implementation-notes.md",
    "Integrated implementation and verification record.",
    ALL_REVIEWS,
  ),
  source(
    "context.debug-notes",
    "docs/specs/v12-ide-run-loop/debug-notes.md",
    "Preserved failures, diagnoses, and causal corrections.",
    ALL_REVIEWS,
  ),
  source(
    "context.pre-integration-review",
    "docs/specs/v12-ide-run-loop/review.md",
    "Immutable pre-integration release-review snapshot.",
    ALL_REVIEWS,
    "pre-integration-review.md",
  ),
  source("context.readme", "README.md", "Concise public product surface.", [PRODUCT]),
  source(
    "context.package",
    "package.json",
    "Published package and export surface.",
    [PRODUCT, SECURITY],
  ),
  source(
    "context.specialist-compiler-schema-json",
    "schemas/v1alpha1/specialist-compiler.schema.json",
    "Published closed V11 specialist compiler schema.",
    [SECURITY],
  ),
  source(
    "context.specialist-handoff-schema-json",
    "schemas/v1alpha1/specialist-handoff.schema.json",
    "Published closed V11 specialist handoff schema.",
    [SECURITY],
  ),
  source(
    "context.specialist-handoff-schema-source",
    "src/specialist-handoff-schema-data.ts",
    "Embedded V11 specialist handoff schema source.",
    [SECURITY],
  ),
  source(
    "context.specialist-handoff-schema-validator",
    "src/specialist-handoff-schema.ts",
    "Strict V11 specialist handoff schema loader and validator.",
    [SECURITY],
  ),
  source(
    "context.specialist-compiler-schema-source",
    "src/specialist-schema-data.ts",
    "Embedded V11 specialist compiler schema source.",
    [SECURITY],
  ),
  source(
    "context.specialist-compiler-schema-validator",
    "src/specialist-schema.ts",
    "Strict V11 specialist compiler schema loader and validator.",
    [SECURITY],
  ),
  source(
    "context.index",
    "src/index.ts",
    "Public TypeScript exports.",
    [PRODUCT, SECURITY],
  ),
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
    "Reusable Specialist Run module contract.",
    [PRODUCT],
  ),
  source(
    "context.modules-index",
    "docs/modules/README.md",
    "Module catalog integration.",
    [PRODUCT],
  ),
  source(
    "context.dogfood",
    "scripts/run-v12-dogfood.mjs",
    "Deterministic four-operation IDE journey.",
    [PRODUCT, LIFECYCLE],
  ),
  source(
    "context.release-gate-harness",
    "scripts/run-v12-release-gate.mjs",
    "Candidate-bound canonical-gate evidence wrapper.",
    ALL_REVIEWS,
  ),
  source(
    "context.release-gate-tests",
    "test/v12-release-gate.test.mjs",
    "Candidate-materialization and R2 security-context regressions.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.release-review-r2-tests",
    "test/v12-release-review.test.mjs",
    "Candidate-addressed R2 lifecycle and adversarial regressions.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.review-r2-harness",
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
    "Immutable R2 release-review compiler and approval harness.",
    ALL_REVIEWS,
  ),
  source(
    "context.review-r2-handoff-verifier",
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
    "R2 exact raw reviewer handoff verifier.",
    ALL_REVIEWS,
  ),
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
  source(
    "context.run-types",
    "src/specialist-run-types.ts",
    "Closed V12 public and wire types.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.run-schema",
    "src/specialist-run-schema.ts",
    "Strict effect-free run-session schema validator.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.run-schema-json",
    "schemas/v1alpha1/specialist-run.schema.json",
    "Published closed run-session JSON Schema.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.run-session",
    "src/specialist-run-session.ts",
    "Create and restore implementation.",
    [LIFECYCLE, SECURITY],
  ),
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
  source(
    "context.constants",
    "src/constants.ts",
    "Public V12 limits and contract constants.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.diagnostics",
    "src/diagnostics.ts",
    "Stable runtime diagnostics.",
    [LIFECYCLE, SECURITY],
  ),
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
    "V12 strict schema, public export, and resource tests.",
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
    "Current V11 reviewed GoalContract.",
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
    V11_LAUNCH_AUTHORIZATION,
    "Cross-package launch authorization.",
    [SECURITY],
  ),
  source(
    "context.v11-audit-receipt",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json",
    "Independent Audit-B package verification receipt.",
    [SECURITY],
  ),
  source(
    "context.v11-audit-approval",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
    "Exact owner-approved Audit-B digest pair bytes.",
    [SECURITY],
  ),
  source(
    "context.v11-report",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/report.json",
    "Current V11 dogfood report.",
    [SECURITY],
  ),
  source(
    "context.v12-verification-report",
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
    "Complete V12 verification-wave handoff gate.",
    ALL_REVIEWS,
  ),
  source(
    "context.v12-verification-handoff",
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
    "Exact raw V12 verification specialist PASS handoff.",
    ALL_REVIEWS,
  ),
  source(
    "context.v12-dogfood-handoff",
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
    "Exact raw V12 dogfood specialist PASS handoff.",
    ALL_REVIEWS,
  ),
  source(
    "context.review-r1-verification",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
    "Exact first release-review fan-in report.",
    ALL_REVIEWS,
  ),
  source(
    "context.review-r1-product-handoff",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
    "Exact raw first product/API/IDE review finding.",
    ALL_REVIEWS,
  ),
  source(
    "context.review-r1-lifecycle-handoff",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
    "Exact raw first lifecycle review finding.",
    ALL_REVIEWS,
  ),
  source(
    "context.review-r1-security-handoff",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
    "Exact raw first security/trace review finding.",
    ALL_REVIEWS,
  ),
  source(
    "context.canonical-gate-attempt-1-receipt",
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
    "Immutable failed canonical-gate receipt for retired candidate 989e6ea.",
    ALL_REVIEWS,
  ),
  source(
    "context.canonical-gate-attempt-1-stdout",
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
    "Exact raw stdout from retired candidate 989e6ea's failed canonical gate.",
    ALL_REVIEWS,
  ),
  source(
    "context.canonical-gate-attempt-1-stderr",
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
    "Exact raw stderr from retired candidate 989e6ea's failed canonical gate.",
    ALL_REVIEWS,
  ),
];

const CORRECTION_ROOT_PREFIX =
  "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction";

const FIXED_DYNAMIC_ROOTS = Object.freeze([
  {
    path: "docs/specs/v12-ide-run-loop/evidence/implementation/verification",
    description: "Exact V12 implementation verification package and raw evidence.",
    allowedWorkUnits: ALL_REVIEWS,
  },
  {
    path: "docs/specs/v12-ide-run-loop/evidence/release-review",
    description: "Exact first release-review package and raw findings.",
    allowedWorkUnits: ALL_REVIEWS,
  },
  {
    path: "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit",
    description: "Exact V11 Audit-B package, approval, receipt, and semantic evidence.",
    allowedWorkUnits: [SECURITY],
  },
]);
function compareOrdinal(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function candidateRunPaths(candidate) {
  requireCondition(
    typeof candidate === "string" && CANDIDATE_PATTERN.test(candidate),
    "Candidate commit must be an exact 40-character lowercase commit ID.",
  );
  const root = `${REVIEW_ROOT}/runs/${candidate}`;
  const inputs = `${root}/inputs`;
  return Object.freeze({
    root,
    inputs,
    snapshotRoot: `${inputs}/source-snapshots`,
    candidateManifest: `${inputs}/candidate.json`,
    preIntegrationReview: `${inputs}/pre-integration-review.md`,
    request: `${root}/request.json`,
    phaseMetadata: `${root}/phase-metadata.json`,
    packageDir: `${root}/package`,
    packageEnvelope: `${root}/package-envelope.json`,
    compilationSummary: `${root}/compilation-summary.json`,
    approval: `${root}/approval.json`,
    handoffs: `${root}/handoffs`,
    handoffVerification: `${root}/handoff-verification.json`,
  });
}
function gateEvidencePaths(candidate) {
  requireCondition(
    typeof candidate === "string" && CANDIDATE_PATTERN.test(candidate),
    "Candidate commit must be an exact 40-character lowercase commit ID.",
  );
  const root = `${GATE_EVIDENCE_ROOT}/${candidate}`;
  return Object.freeze({
    receipt: `${root}/canonical-gate-receipt.json`,
    stdout: `${root}/canonical-gate.stdout.log`,
    stderr: `${root}/canonical-gate.stderr.log`,
  });
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

function absolute(path) {
  return join(ROOT, ...path.split("/"));
}

function snapshotPath(entry, paths) {
  return entry.snapshotPath === null
    ? `${paths.snapshotRoot}/${entry.path}`
    : `${paths.inputs}/${entry.snapshotPath}`;
}

function assertExactKeys(value, expected, label) {
  requireCondition(
    value !== null && typeof value === "object" && !Array.isArray(value),
    `${label} must be an object.`,
  );
  const actual = Object.keys(value);
  requireCondition(
    actual.length === expected.length &&
      actual.every((key, index) => key === expected[index]),
    `${label} is not closed or is not canonical.`,
  );
}

function decodeUtf8(bytes, label) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new Error(`${label} is not strict UTF-8.`);
  }
}


function parseCanonicalJson(bytes, label) {
  const text = decodeUtf8(bytes, label);
  const value = JSON.parse(text);
  requireCondition(
    `${JSON.stringify(value, null, 2)}\n` === text,
    `${label} is not canonical JSON with normalized LF.`,
  );
  return { bytes: Buffer.from(bytes), value };
}

async function readCanonicalJson(path) {
  return parseCanonicalJson(await readFile(absolute(path)), path);
}

function readCandidateCanonicalJson(candidateTree, path) {
  return parseCanonicalJson(candidateTree.file(path).bytes, path);
}

async function writeImmutable(path, bytes) {
  const output = absolute(path);
  await mkdir(dirname(output), { recursive: true });
  try {
    const existing = await readFile(output);
    requireCondition(existing.equals(bytes), `Immutable output differs: ${path}.`);
  } catch (error) {
    if (!error || typeof error !== "object" || error.code !== "ENOENT") {
      throw error;
    }
    await writeFile(output, bytes, { flag: "wx" });
  }
}

async function writeImmutableJson(path, value) {
  await writeImmutable(path, Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8"));
}

function dynamicSourceId(path) {
  return `context.snapshot.${createHash("sha256").update(path).digest("hex").slice(0, 24)}`;
}

function correctionRevisionFromPath(path) {
  if (path === CORRECTION_ROOT_PREFIX || path.startsWith(`${CORRECTION_ROOT_PREFIX}/`)) {
    return { revision: 1, root: CORRECTION_ROOT_PREFIX };
  }
  const prefix = `${CORRECTION_ROOT_PREFIX}-r`;
  if (!path.startsWith(prefix)) {
    return null;
  }
  const remainder = path.slice(prefix.length);
  const slash = remainder.indexOf("/");
  const token = slash === -1 ? remainder : remainder.slice(0, slash);
  requireCondition(
    /^[1-9][0-9]*$/u.test(token),
    `Malformed correction revision directory in candidate tree: ${path}.`,
  );
  const revision = Number(token);
  requireCondition(
    Number.isSafeInteger(revision) && revision > 1,
    `Invalid or duplicate correction revision directory in candidate tree: ${path}.`,
  );
  return { revision, root: `${prefix}${token}` };
}

function discoverCorrectionEvidenceSpecs(candidateTreeOrPaths) {
  const paths = Array.isArray(candidateTreeOrPaths)
    ? candidateTreeOrPaths
    : candidateTreeOrPaths.paths;
  requireCondition(Array.isArray(paths), "Candidate tree paths are unavailable.");
  const roots = new Map();
  for (const path of paths) {
    const parsed = correctionRevisionFromPath(path);
    if (parsed === null) {
      continue;
    }
    const prior = roots.get(parsed.revision);
    requireCondition(
      prior === undefined || prior === parsed.root,
      `Candidate tree contains duplicate correction revision ${parsed.revision}.`,
    );
    roots.set(parsed.revision, parsed.root);
  }
  requireCondition(roots.size > 0 && roots.has(1), "Correction revision 1 is missing.");
  const revisions = [...roots.keys()].sort((left, right) => left - right);
  for (let index = 0; index < revisions.length; index += 1) {
    requireCondition(
      revisions[index] === index + 1,
      `Correction revision sequence is not contiguous from revision 1: missing revision ${index + 1}.`,
    );
  }
  requireCondition(
    revisions.at(-1) >= MINIMUM_CORRECTION_REVISION,
    `Correction evidence stops before required revision ${MINIMUM_CORRECTION_REVISION}.`,
  );
  return revisions.map((revision) => {
    const root = roots.get(revision);
    return Object.freeze({
      id: `release-correction-r${revision}`,
      root,
      goalId: CORRECTION_GOAL,
      goalRevision: revision,
      reportKind: "ImplementationPhaseHandoffVerification",
      phase: revision === 1 ? "release-correction" : `release-correction-r${revision}`,
      readinessField: "phaseReady",
    });
  });
}

function candidateDynamicRoots(candidateTree) {
  return [
    ...discoverCorrectionEvidenceSpecs(candidateTree).map((spec) => ({
      path: spec.root,
      description: `Exact V12 release-correction revision ${spec.goalRevision} package, handoffs, replans, and primary evidence.`,
      allowedWorkUnits: ALL_REVIEWS,
    })),
    ...FIXED_DYNAMIC_ROOTS,
  ];
}

function collectSourceSpecs(candidateTree) {
  const byPath = new Map(STATIC_SOURCES.map((entry) => [entry.path, entry]));
  const launchAuthorization = readCandidateCanonicalJson(
    candidateTree,
    V11_LAUNCH_AUTHORIZATION,
  ).value;
  const currentAuditHandoff = launchAuthorization?.handoff?.path;
  requireCondition(
    typeof currentAuditHandoff === "string" &&
      currentAuditHandoff.startsWith(V11_HANDOFF_ROOT) &&
      currentAuditHandoff.endsWith(".json"),
    "Current V11 launch authorization has an unsafe audit handoff path.",
  );
  byPath.set(
    currentAuditHandoff,
    source(
      "context.v11-audit-handoff",
      currentAuditHandoff,
      "Exact independent semantic audit PASS handoff bound by the current launch authorization.",
      [SECURITY],
    ),
  );

  for (const root of candidateDynamicRoots(candidateTree)) {
    const paths = candidateTree.list(root.path);
    requireCondition(paths.length > 0, `Candidate tree lacks required evidence root: ${root.path}.`);
    for (const path of paths) {
      if (path.includes("/package/")) {
        continue;
      }
      if (!byPath.has(path)) {
        byPath.set(
          path,
          source(dynamicSourceId(path), path, root.description, root.allowedWorkUnits),
        );
      }
    }
  }

  for (const path of candidateTree.paths) {
    if (path.startsWith("src/specialist-run") && !byPath.has(path)) {
      byPath.set(
        path,
        source(
          dynamicSourceId(path),
          path,
          "Complete V12 Specialist Run implementation source.",
          [LIFECYCLE, SECURITY],
        ),
      );
    }
    if (path.startsWith("test/specialist-run") && !byPath.has(path)) {
      byPath.set(
        path,
        source(
          dynamicSourceId(path),
          path,
          "Complete V12 Specialist Run verification source.",
          [LIFECYCLE, SECURITY],
        ),
      );
    }
  }

  for (const entry of byPath.values()) {
    requireCondition(
      candidateTree.has(entry.path),
      `Reviewer source is not committed in candidate ${candidateTree.commit}: ${entry.path}.`,
    );
  }
  return [...byPath.values()].sort((left, right) => compareOrdinal(left.path, right.path));
}
function gitOutput(args) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: null,
    maxBuffer: 134_217_728,
  });
}

function gitNulRecords(bytes, label) {
  const input = Buffer.from(bytes);
  requireCondition(
    input.byteLength === 0 || input.at(-1) === 0,
    `${label} is not NUL terminated.`,
  );
  const records = [];
  let start = 0;
  for (let index = 0; index < input.byteLength; index += 1) {
    if (input[index] === 0) {
      records.push(input.subarray(start, index));
      start = index + 1;
    }
  }
  return records;
}

function updateGateFrame(hash, bytes) {
  const value = Buffer.from(bytes);
  const size = Buffer.allocUnsafe(8);
  size.writeBigUInt64BE(BigInt(value.byteLength));
  hash.update(size);
  hash.update(value);
}

const CANDIDATE_TREE_CACHE = new Map();

function createCandidateTreeView(commit, tree, entries, sourceBinding) {
  const byPath = new Map(entries.map((entry) => [entry.path, entry]));
  const paths = Object.freeze(entries.map((entry) => entry.path));
  return Object.freeze({
    commit,
    tree,
    source: Object.freeze({ ...sourceBinding }),
    paths,
    has(path) {
      return byPath.has(path);
    },
    list(root) {
      const prefix = `${root}/`;
      return paths.filter((path) => path.startsWith(prefix));
    },
    file(path) {
      const entry = byPath.get(path);
      requireCondition(
        entry !== undefined,
        `Candidate ${commit} does not contain required Git blob: ${path}.`,
      );
      return {
        mode: entry.mode,
        objectId: entry.objectId,
        path: entry.path,
        bytes: Buffer.from(entry.bytes),
      };
    },
  });
}

function loadCandidateTree(candidate) {
  requireCondition(
    typeof candidate === "string" && CANDIDATE_PATTERN.test(candidate),
    "Candidate commit must be an exact 40-character lowercase commit ID.",
  );
  const cached = CANDIDATE_TREE_CACHE.get(candidate);
  if (cached !== undefined) {
    return cached;
  }

  const commit = Buffer.from(
    gitOutput(["rev-parse", "--verify", `${candidate}^{commit}`]),
  )
    .toString("ascii")
    .trim();
  requireCondition(commit === candidate, "Candidate commit identity mismatch.");

  const tree = Buffer.from(gitOutput(["rev-parse", "--verify", `${candidate}^{tree}`]))
    .toString("ascii")
    .trim();
  requireCondition(CANDIDATE_PATTERN.test(tree), "Candidate tree identity is invalid.");

  const entries = gitNulRecords(
    gitOutput(["ls-tree", "-rz", "--full-tree", candidate]),
    "Candidate tree listing",
  ).map((record) => {
    const tab = record.indexOf(9);
    requireCondition(tab > 0 && tab < record.byteLength - 1, "Candidate tree entry is malformed.");
    const match = /^(100644|100755) blob ([0-9a-f]{40})$/.exec(
      record.subarray(0, tab).toString("ascii"),
    );
    requireCondition(
      match !== null,
      "Candidate tree must contain only regular committed files.",
    );
    const pathBytes = Buffer.from(record.subarray(tab + 1));
    const path = decodeUtf8(pathBytes, "Candidate tree path");
    requireCondition(
      path.length > 0 &&
        !path.startsWith("/") &&
        !/^[A-Za-z]:/u.test(path) &&
        // biome-ignore lint/suspicious/noControlCharactersInRegex: the candidate boundary must reject unsafe path controls.
        !/[\u0000-\u001f\u007f]/u.test(path) &&
        !path.includes("\\") &&
        path
          .split("/")
          .every(
            (segment) =>
              segment.length > 0 &&
              segment !== "." &&
              segment !== ".." &&
              segment.toLowerCase() !== ".git",
          ),
      `Candidate tree contains an unsafe path: ${JSON.stringify(path)}.`,
    );
    return {
      mode: match[1],
      objectId: match[2],
      path,
      pathBytes,
      bytes: Buffer.from(gitOutput(["cat-file", "blob", match[2]])),
    };
  });
  entries.sort((left, right) => Buffer.compare(left.pathBytes, right.pathBytes));

  const seen = new Set();
  const hash = createHash("sha256");
  updateGateFrame(hash, Buffer.from(MATERIALIZATION_DIGEST_DOMAIN, "utf8"));
  let totalBytes = 0;
  for (const entry of entries) {
    const key = process.platform === "win32" ? entry.path.toLowerCase() : entry.path;
    requireCondition(!seen.has(key), `Candidate tree path is not unique: ${entry.path}.`);
    seen.add(key);
    totalBytes += entry.bytes.byteLength;
    updateGateFrame(hash, Buffer.from(entry.mode, "ascii"));
    updateGateFrame(hash, entry.pathBytes);
    updateGateFrame(hash, entry.bytes);
  }
  requireCondition(entries.length > 0, "Candidate tree is empty.");
  const candidateTree = createCandidateTreeView(commit, tree, entries, {
    commit,
    tree,
    files: entries.length,
    bytes: totalBytes,
    digest: `sha256:${hash.digest("hex")}`,
  });
  CANDIDATE_TREE_CACHE.set(candidate, candidateTree);
  return candidateTree;
}

function candidateTreeWithOverrides(candidateTree, overrides = {}, omittedPaths = []) {
  const overrideMap = new Map(Object.entries(overrides));
  const omitted = new Set(omittedPaths);
  const paths = Object.freeze(candidateTree.paths.filter((path) => !omitted.has(path)));
  return Object.freeze({
    ...candidateTree,
    paths,
    has(path) {
      return !omitted.has(path) && candidateTree.has(path);
    },
    list(root) {
      const prefix = `${root}/`;
      return paths.filter((path) => path.startsWith(prefix));
    },
    file(path) {
      requireCondition(!omitted.has(path), `Candidate tree omits test path: ${path}.`);
      const entry = candidateTree.file(path);
      return overrideMap.has(path)
        ? { ...entry, bytes: Buffer.from(overrideMap.get(path)) }
        : entry;
    },
  });
}

function candidateSourceBinding(candidate) {
  return loadCandidateTree(candidate).source;
}

function candidateFileBinding(candidateTree, path, mediaType) {
  const file = candidateTree.file(path);
  return {
    path,
    mediaType,
    mode: file.mode,
    objectId: file.objectId,
    bytes: file.bytes.byteLength,
    digest: digest(file.bytes),
  };
}

function authenticateToolBytes(candidateTree, path, actualBytes, label) {
  const expected = candidateFileBinding(candidateTree, path, "text/javascript");
  requireCondition(
    Buffer.from(actualBytes).equals(candidateTree.file(path).bytes),
    `${label} bytes do not match candidate ${candidateTree.commit}: ${path}.`,
  );
  return expected;
}

async function authenticateReviewTooling(candidateTree) {
  const harness = authenticateToolBytes(
    candidateTree,
    HARNESS_REPOSITORY_PATH,
    await readFile(SCRIPT_PATH),
    "Release-review harness",
  );
  const verifier = authenticateToolBytes(
    candidateTree,
    VERIFIER_REPOSITORY_PATH,
    await readFile(absolute(VERIFIER_REPOSITORY_PATH)),
    "Release-review handoff verifier",
  );
  return { candidateCommit: candidateTree.commit, harness, verifier };
}
function inspectEvidenceAttributes(candidate, path) {
  const fields = Buffer.from(
    gitOutput([
      "check-attr",
      `--source=${candidate}`,
      "-z",
      "text",
      "diff",
      "merge",
      "--",
      path,
    ]),
  )
    .toString("utf8")
    .split("\0");
  requireCondition(
    fields.length === 10 && fields.at(-1) === "",
    `Git returned malformed attributes for required canonical-gate evidence: ${path}.`,
  );
  const attributes = {};
  for (let index = 0; index < fields.length - 1; index += 3) {
    requireCondition(
      fields[index] === path &&
        ["text", "diff", "merge"].includes(fields[index + 1]) &&
        attributes[fields[index + 1]] === undefined,
      `Git returned unexpected attributes for required canonical-gate evidence: ${path}.`,
    );
    attributes[fields[index + 1]] = fields[index + 2];
  }
  return attributes;
}

function requireBytePreservingEvidencePaths(candidate, paths) {
  for (const path of [paths.stdout, paths.stderr]) {
    const attributes = inspectEvidenceAttributes(candidate, path);
    requireCondition(
      attributes.text === "unset" && attributes.diff === "unset" && attributes.merge === "unset",
      `Required canonical-gate raw evidence is not binary in candidate ${candidate}: ${path}.`,
    );
  }

  const receiptAttributes = inspectEvidenceAttributes(candidate, paths.receipt);
  requireCondition(
    receiptAttributes.text === "auto" &&
      receiptAttributes.diff === "unspecified" &&
      receiptAttributes.merge === "unspecified",
    `Required canonical-gate receipt does not retain normal text policy in candidate ${candidate}: ${paths.receipt}.`,
  );
}

function requireVersionableEvidencePaths(paths, candidateTree) {
  for (const path of Object.values(paths)) {
    requireCondition(
      candidateTree.has(path),
      `Required canonical-gate evidence is not committed in candidate ${candidateTree.commit}: ${path}.`,
    );
  }
}

function requireNoWorkingTreeOnlySources(paths, untrackedPaths) {
  const allowedPrefix = `${paths.root}/`;
  for (const path of untrackedPaths) {
    requireCondition(
      path.startsWith(allowedPrefix),
      `Working-tree-only source is outside the candidate run root: ${path}.`,
    );
  }
}

async function verifyCheckpoint(candidate, paths) {
  const head = Buffer.from(gitOutput(["rev-parse", "HEAD"])).toString("ascii").trim();
  requireCondition(head === candidate, `Candidate checkpoint mismatch: HEAD is ${head}.`);
  try {
    gitOutput(["diff", "--quiet", "HEAD", "--"]);
  } catch {
    throw new Error("Tracked repository state differs from candidate HEAD.");
  }

  const untracked = gitNulRecords(
    gitOutput(["ls-files", "--others", "--exclude-standard", "-z"]),
    "Untracked repository path listing",
  ).map((pathBytes) => decodeUtf8(pathBytes, "Untracked repository path"));
  requireNoWorkingTreeOnlySources(paths, untracked);
}

function validateBoundCandidateFile(value, expectedPath, label, candidateTree) {
  assertExactKeys(value, ["path", "mediaType", "bytes", "digest"], label);
  requireCondition(value.path === expectedPath, `${label} path mismatch.`);
  requireCondition(
    value.mediaType === "application/octet-stream",
    `${label} media type mismatch.`,
  );
  requireCondition(Number.isSafeInteger(value.bytes) && value.bytes >= 0, `${label} byte count invalid.`);
  requireCondition(DIGEST_PATTERN.test(value.digest), `${label} digest invalid.`);
  const bytes = candidateTree.file(expectedPath).bytes;
  requireCondition(
    bytes.byteLength === value.bytes && digest(bytes) === value.digest,
    `${label} raw candidate-blob binding mismatch.`,
  );
}

async function validateGateReceipt(candidate, candidateTree = loadCandidateTree(candidate)) {
  const paths = gateEvidencePaths(candidate);
  requireVersionableEvidencePaths(paths, candidateTree);
  requireBytePreservingEvidencePaths(candidate, paths);
  const parsed = readCandidateCanonicalJson(candidateTree, paths.receipt);
  const receipt = parsed.value;
  assertExactKeys(
    receipt,
    [
      "apiVersion",
      "kind",
      "version",
      "candidateCommit",
      "repository",
      "candidateSource",
      "materialization",
      "command",
      "result",
      "exitCode",
      "signal",
      "spawnError",
      "stdout",
      "stderr",
    ],
    "canonical-gate receipt",
  );
  requireCondition(
    receipt.apiVersion === "swecircuit/release-gate/v1alpha1" &&
      receipt.kind === "CanonicalGateReceipt" &&
      receipt.version === "V12",
    "Canonical-gate receipt identity mismatch.",
  );
  requireCondition(receipt.candidateCommit === candidate, "Canonical-gate candidate mismatch.");
  assertExactKeys(
    receipt.repository,
    [
      "headBefore",
      "headAfter",
      "trackedStateBefore",
      "trackedStateAfter",
      "inspectionError",
    ],
    "canonical-gate repository binding",
  );
  requireCondition(
    receipt.repository.headBefore === candidate &&
      receipt.repository.headAfter === candidate &&
      receipt.repository.trackedStateBefore === "clean" &&
      receipt.repository.trackedStateAfter === "clean" &&
      receipt.repository.inspectionError === null,
    "Canonical gate did not preserve the exact clean candidate.",
  );

  const expectedCandidateSource = candidateSourceBinding(candidate);
  assertExactKeys(
    receipt.candidateSource,
    ["commit", "tree", "files", "bytes", "digest"],
    "canonical-gate candidate source binding",
  );
  requireCondition(
    JSON.stringify(receipt.candidateSource) === JSON.stringify(expectedCandidateSource),
    "Canonical-gate candidate source binding does not match the committed Git tree.",
  );
  assertExactKeys(
    receipt.materialization,
    [
      "strategy",
      "files",
      "bytes",
      "digestBefore",
      "digestAfter",
      "inspectionError",
      "cleanupError",
    ],
    "canonical-gate materialization binding",
  );
  requireCondition(
    receipt.materialization.strategy === "exact-git-blob-materialization" &&
      receipt.materialization.files === expectedCandidateSource.files &&
      receipt.materialization.bytes === expectedCandidateSource.bytes &&
      receipt.materialization.digestBefore === expectedCandidateSource.digest &&
      receipt.materialization.digestAfter === expectedCandidateSource.digest &&
      receipt.materialization.inspectionError === null &&
      receipt.materialization.cleanupError === null,
    "Canonical gate did not use and preserve an authenticated candidate materialization.",
  );
  assertExactKeys(
    receipt.command,
    ["executable", "arguments", "canonical"],
    "canonical-gate command",
  );
  const windowsCommand =
    receipt.command.executable === "cmd.exe" &&
    JSON.stringify(receipt.command.arguments) ===
      JSON.stringify(["/d", "/s", "/c", "npm.cmd run verify"]) &&
    receipt.command.canonical === "npm.cmd run verify";
  const portableCommand =
    receipt.command.executable === "npm" &&
    JSON.stringify(receipt.command.arguments) === JSON.stringify(["run", "verify"]) &&
    receipt.command.canonical === "npm run verify";
  requireCondition(windowsCommand || portableCommand, "Canonical-gate command mismatch.");
  requireCondition(
    receipt.result === "pass" &&
      receipt.exitCode === 0 &&
      receipt.signal === null &&
      receipt.spawnError === null,
    "Canonical gate did not pass cleanly.",
  );
  validateBoundCandidateFile(receipt.stdout, paths.stdout, "canonical-gate stdout", candidateTree);
  validateBoundCandidateFile(receipt.stderr, paths.stderr, "canonical-gate stderr", candidateTree);
  return {
    paths,
    receipt,
    receiptBinding: {
      path: paths.receipt,
      mediaType: "application/json",
      bytes: parsed.bytes.byteLength,
      digest: digest(parsed.bytes),
    },
  };
}

function assertExactStringArray(actual, expected, label) {
  requireCondition(Array.isArray(actual), `${label} must be an array.`);
  requireCondition(
    actual.length === expected.length &&
      actual.every((value, index) => value === expected[index]),
    `${label} mismatch.`,
  );
}

function expectedReportKeys(spec) {
  const prefix = ["apiVersion", "kind"];
  if (spec.phase !== null) {
    prefix.push("phase");
  }
  return [
    ...prefix,
    "compilationDigest",
    "packageDigest",
    "expectedAgentIds",
    "receivedAgentIds",
    "complete",
    "verifiedHandoffs",
    spec.readinessField,
    "note",
  ];
}

function safeHandoffFile(file, label) {
  requireCondition(
    typeof file === "string" &&
      file.length > 5 &&
      file.endsWith(".json") &&
      !file.includes("/") &&
      !file.includes("\\") &&
      file !== "." &&
      file !== ".." &&
      // biome-ignore lint/suspicious/noControlCharactersInRegex: raw handoff paths reject every unsafe control.
      !/[\u0000-\u001f\u007f]/u.test(file),
    `${label} is an unsafe raw handoff file: ${String(file)}.`,
  );
  return file;
}

function exactCandidateBinding(candidateTree, path, mediaType) {
  const file = candidateTree.file(path);
  return {
    path,
    mediaType,
    bytes: file.bytes.byteLength,
    digest: digest(file.bytes),
  };
}

async function verifyEvidenceSet(candidateTree, spec) {
  const packagePath = `${spec.root}/package-envelope.json`;
  const approvalPath = `${spec.root}/approval.json`;
  const reportPath = `${spec.root}/handoff-verification.json`;
  const specialistPackage = readCandidateCanonicalJson(candidateTree, packagePath).value;
  const approvalParsed = readCandidateCanonicalJson(candidateTree, approvalPath);
  const reportParsed = readCandidateCanonicalJson(candidateTree, reportPath);
  const approval = approvalParsed.value;
  const report = reportParsed.value;

  assertExactKeys(
    approval,
    [
      "apiVersion",
      "kind",
      "goalId",
      "goalRevision",
      "approvedBy",
      "approvalBasis",
      "expectation",
    ],
    `${spec.id} approval`,
  );
  assertExactKeys(
    approval.expectation,
    ["compilationDigest", "packageDigest"],
    `${spec.id} package expectation`,
  );
  requireCondition(
    approval.apiVersion === "swecircuit/review-approval/v1alpha1" &&
      approval.kind === "SpecialistReviewApproval" &&
      approval.goalId === spec.goalId &&
      approval.goalRevision === spec.goalRevision &&
      typeof approval.approvedBy === "string" &&
      approval.approvedBy.length > 0 &&
      typeof approval.approvalBasis === "string" &&
      approval.approvalBasis.length > 0 &&
      DIGEST_PATTERN.test(approval.expectation.compilationDigest) &&
      DIGEST_PATTERN.test(approval.expectation.packageDigest),
    `${spec.id} approval identity or expectation is invalid.`,
  );
  if (spec.expectation !== undefined) {
    requireCondition(
      JSON.stringify(approval.expectation) === JSON.stringify(spec.expectation),
      `${spec.id} approval does not bind the frozen package expectation.`,
    );
  }
  const expectation = approval.expectation;
  requireValue(
    verifySpecialistPackage(specialistPackage, expectation),
    `${spec.id} package verification`,
  );

  const expectedAgentIds = specialistPackage.manifest.agents
    .map((entry) => entry.agentId)
    .sort(compareOrdinal);
  requireCondition(
    specialistPackage.manifest.goalId === spec.goalId &&
      specialistPackage.manifest.goalRevision === spec.goalRevision,
    `${spec.id} package goal binding mismatch.`,
  );
  if (spec.packageAgentIds !== undefined) {
    assertExactStringArray(
      expectedAgentIds,
      [...spec.packageAgentIds].sort(compareOrdinal),
      `${spec.id} approved package roster`,
    );
  }

  assertExactKeys(report, expectedReportKeys(spec), `${spec.id} handoff report`);
  requireCondition(
    report.apiVersion === "swecircuit/run-evidence/v1alpha1" &&
      report.kind === spec.reportKind &&
      (spec.phase === null || report.phase === spec.phase) &&
      report.compilationDigest === expectation.compilationDigest &&
      report.packageDigest === expectation.packageDigest,
    `${spec.id} handoff report identity mismatch.`,
  );
  assertExactStringArray(
    report.expectedAgentIds,
    expectedAgentIds,
    `${spec.id} reported package roster`,
  );
  requireCondition(
    Array.isArray(report.verifiedHandoffs),
    `${spec.id} handoff report lacks a verified handoff roster.`,
  );

  const expectedHandoffs = spec.handoffs === undefined
    ? null
    : new Map(spec.handoffs.map((entry) => [entry.file, entry]));
  if (expectedHandoffs !== null) {
    assertExactStringArray(
      report.verifiedHandoffs.map((entry) => entry.file).sort(compareOrdinal),
      [...expectedHandoffs.keys()].sort(compareOrdinal),
      `${spec.id} reported handoff files`,
    );
  }

  const verified = [];
  const seenFiles = new Set();
  const seenAgents = new Set();
  for (const reported of report.verifiedHandoffs) {
    assertExactKeys(
      reported,
      [
        "file",
        "agentId",
        "outcome",
        "rawBytes",
        "rawDigest",
        "semanticDigest",
        "contentDigest",
      ],
      `${spec.id} reported handoff row`,
    );
    const file = safeHandoffFile(reported.file, `${spec.id} reported handoff`);
    requireCondition(!seenFiles.has(file), `${spec.id} reports duplicate handoff file: ${file}.`);
    seenFiles.add(file);
    const path = `${spec.root}/handoffs/${file}`;
    const raw = candidateTree.file(path).bytes;
    const value = requireValue(
      verifySpecialistHandoff(specialistPackage, expectation, raw),
      `${spec.id} raw handoff verification for ${path}`,
    );
    requireCondition(
      !seenAgents.has(value.handoff.agent.id),
      `${spec.id} contains duplicate handoffs for agent ${value.handoff.agent.id}.`,
    );
    seenAgents.add(value.handoff.agent.id);
    requireCondition(
      reported.agentId === value.handoff.agent.id &&
        reported.outcome === value.handoff.outcome &&
        reported.rawBytes === value.rawBytes &&
        reported.rawDigest === value.rawDigest &&
        reported.semanticDigest === value.semanticDigest &&
        reported.contentDigest === value.contentDigest,
      `${spec.id} handoff report row does not match raw candidate evidence: ${path}.`,
    );

    const expected = expectedHandoffs?.get(file);
    if (expected !== undefined) {
      requireCondition(
        value.handoff.agent.id === expected.agentId &&
          value.handoff.outcome === expected.outcome &&
          (expected.rawBytes === null || value.rawBytes === expected.rawBytes) &&
          (expected.rawDigest === null || value.rawDigest === expected.rawDigest),
        `${spec.id} contains an unexpected frozen handoff identity or outcome: ${path}.`,
      );
    }
    verified.push({
      path,
      file,
      agentId: value.handoff.agent.id,
      outcome: value.handoff.outcome,
      bytes: value.rawBytes,
      digest: value.rawDigest,
      semanticDigest: value.semanticDigest,
      contentDigest: value.contentDigest,
    });
  }

  verified.sort((left, right) => compareOrdinal(left.agentId, right.agentId));
  const receivedAgentIds = verified.map((entry) => entry.agentId);
  assertExactStringArray(
    report.receivedAgentIds,
    receivedAgentIds,
    `${spec.id} received roster`,
  );
  const complete =
    expectedAgentIds.length === receivedAgentIds.length &&
    expectedAgentIds.every((agentId, index) => agentId === receivedAgentIds[index]);
  const ready = complete && verified.every((entry) => entry.outcome === "pass");
  requireCondition(
    report.complete === complete &&
      report[spec.readinessField] === ready &&
      typeof report.note === "string" &&
      report.note.length > 0,
    `${spec.id} completion or readiness outcome mismatch.`,
  );
  if (spec.complete !== undefined) {
    requireCondition(
      complete === spec.complete && ready === spec.ready,
      `${spec.id} frozen completion or readiness changed.`,
    );
  }

  const missingAgentIds = expectedAgentIds.filter(
    (agentId) => !receivedAgentIds.includes(agentId),
  );
  return {
    id: spec.id,
    root: spec.root,
    goalRevision: spec.goalRevision,
    compilationDigest: expectation.compilationDigest,
    packageDigest: expectation.packageDigest,
    packagePath,
    packageBinding: exactCandidateBinding(candidateTree, packagePath, "application/json"),
    approvalPath,
    approvalBinding: exactCandidateBinding(candidateTree, approvalPath, "application/json"),
    reportPath,
    reportBinding: exactCandidateBinding(candidateTree, reportPath, "application/json"),
    expectedAgentIds,
    receivedAgentIds,
    missingAgentIds,
    complete,
    ready,
    rawHandoffs: verified,
  };
}

function verifyCorrectionReplans(candidateTree, correctionSets) {
  const byRevision = new Map(
    correctionSets.map((entry) => [entry.goalRevision, entry]),
  );
  const replans = [];
  for (const replacement of correctionSets) {
    if (replacement.goalRevision === 1) {
      continue;
    }
    const path = `${replacement.root}/replan.json`;
    if (!candidateTree.has(path)) {
      continue;
    }
    const parsed = readCandidateCanonicalJson(candidateTree, path);
    const replan = parsed.value;
    const prior = byRevision.get(replacement.goalRevision - 1);
    requireCondition(
      replan.apiVersion === "swecircuit/run-evidence/v1alpha1" &&
        replan.kind === "SpecialistContractReplan" &&
        replan.goal?.id === CORRECTION_GOAL &&
        replan.goal.fromRevision === replacement.goalRevision - 1 &&
        replan.goal.toRevision === replacement.goalRevision &&
        typeof replan.route === "string" &&
        prior !== undefined,
      `Correction replan identity mismatch: ${path}.`,
    );
    const trigger = prior.rawHandoffs.find(
      (entry) => entry.agentId === replan.trigger?.agentId,
    );
    const replacementHandoff = replacement.rawHandoffs.find(
      (entry) => entry.agentId === replan.replacementContract?.agentId,
    );
    requireCondition(
      trigger !== undefined &&
        replan.trigger.handoffPath === trigger.path &&
        replan.trigger.handoffBytes === trigger.bytes &&
        replan.trigger.handoffDigest === trigger.digest &&
        replan.trigger.outcome === trigger.outcome,
      `Correction replan trigger mismatch: ${path}.`,
    );
    requireCondition(
      replacementHandoff !== undefined &&
        replan.replacementContract.compilationDigest === replacement.compilationDigest &&
        replan.replacementContract.packageDigest === replacement.packageDigest &&
        replan.replacementContract.handoffPath === replacementHandoff.path &&
        replan.replacementContract.handoffBytes === replacementHandoff.bytes &&
        replan.replacementContract.handoffDigest === replacementHandoff.digest &&
        replan.replacementContract.outcome === replacementHandoff.outcome &&
        replan.replacementContract.approved === true &&
        replan.replacementContract.launched === true &&
        replan.replacementContract.completed ===
          (replacementHandoff.outcome === "pass"),
      `Correction replacement contract mismatch: ${path}.`,
    );
    if (replan.retiredContract !== null && replan.retiredContract !== undefined) {
      requireCondition(
        prior.missingAgentIds.length === 1 &&
          replan.retiredContract.compilationDigest === prior.compilationDigest &&
          replan.retiredContract.packageDigest === prior.packageDigest &&
          replan.retiredContract.agentId === prior.missingAgentIds[0] &&
          replan.retiredContract.launched === false &&
          replan.retiredContract.handoff === null,
        `Correction retired contract mismatch: ${path}.`,
      );
    }
    replans.push({
      path,
      bytes: parsed.bytes.byteLength,
      digest: digest(parsed.bytes),
      fromRevision: replacement.goalRevision - 1,
      toRevision: replacement.goalRevision,
      route: replan.route,
      triggerAgentId: trigger.agentId,
      triggerOutcome: trigger.outcome,
      retiredAgentId: replan.retiredContract?.agentId ?? null,
      replacementAgentId: replacementHandoff.agentId,
      replacementOutcome: replacementHandoff.outcome,
    });
  }
  return replans;
}

function verifyCorrectionLineage(candidateTree, evidenceSets, correctionSpecs) {
  const correctionSets = evidenceSets
    .filter((entry) => entry.id.startsWith("release-correction-r"))
    .sort((left, right) => left.goalRevision - right.goalRevision);
  requireCondition(
    correctionSets.length === correctionSpecs.length &&
      correctionSets.every((entry, index) => entry.goalRevision === index + 1),
    "Correction evidence does not contain one contiguous verified sequence from revision 1.",
  );
  return {
    goalId: CORRECTION_GOAL,
    revisions: correctionSets.map((entry) => ({
      revision: entry.goalRevision,
      compilationDigest: entry.compilationDigest,
      packageDigest: entry.packageDigest,
      expectedAgentIds: entry.expectedAgentIds,
      receivedAgentIds: entry.receivedAgentIds,
      missingAgentIds: entry.missingAgentIds,
      complete: entry.complete,
      ready: entry.ready,
      outcomes: entry.rawHandoffs.map((handoff) => ({
        agentId: handoff.agentId,
        outcome: handoff.outcome,
        path: handoff.path,
        bytes: handoff.bytes,
        digest: handoff.digest,
      })),
    })),
    replans: verifyCorrectionReplans(candidateTree, correctionSets),
  };
}

async function verifyPrimaryEvidenceSets(candidateTree) {
  const correctionSpecs = discoverCorrectionEvidenceSpecs(candidateTree);
  const evidenceSets = [];
  for (const spec of [...correctionSpecs, ...PRIMARY_EVIDENCE_SPECS]) {
    evidenceSets.push(await verifyEvidenceSet(candidateTree, spec));
  }
  return {
    evidenceSets,
    correctionLineage: verifyCorrectionLineage(
      candidateTree,
      evidenceSets,
      correctionSpecs,
    ),
  };
}
function reviewedSourceMaterialization(entry, candidateTree, paths) {
  const file = candidateTree.file(entry.path);
  const target = snapshotPath(entry, paths);
  return {
    bytes: file.bytes,
    row: {
      contextId: entry.id,
      originalPath: entry.path,
      candidateMode: file.mode,
      candidateObjectId: file.objectId,
      snapshotPath: target,
      description: entry.description,
      allowedWorkUnits: entry.allowedWorkUnits,
      bytes: file.bytes.byteLength,
      digest: digest(file.bytes),
    },
  };
}

async function materializeSnapshots(sources, candidateTree, paths) {
  const rows = [];
  for (const entry of sources) {
    const materialization = reviewedSourceMaterialization(entry, candidateTree, paths);
    await writeImmutable(materialization.row.snapshotPath, materialization.bytes);
    rows.push(materialization.row);
  }
  return rows;
}
function contextSource(row) {
  return {
    id: row.contextId,
    kind: "repository",
    locator: `path:${row.snapshotPath}`,
    digest: row.digest,
    bytes: row.bytes,
    description: `${row.description} Original candidate path: ${row.originalPath}`,
    allowedWorkUnits: row.allowedWorkUnits,
    readScope: row.snapshotPath,
  };
}

async function directContext(id, path, description, allowedWorkUnits) {
  const bytes = await readFile(absolute(path));
  return {
    id,
    kind: "repository",
    locator: `path:${path}`,
    digest: digest(bytes),
    bytes: bytes.byteLength,
    description,
    allowedWorkUnits,
    readScope: path,
  };
}

function directCandidateContext(
  candidateTree,
  id,
  path,
  description,
  allowedWorkUnits,
) {
  const bytes = candidateTree.file(path).bytes;
  return {
    id,
    kind: "repository",
    locator: `path:${path}`,
    digest: digest(bytes),
    bytes: bytes.byteLength,
    description,
    allowedWorkUnits,
    readScope: path,
  };
}

function reviewedSourceByPath(rows, path) {
  const row = rows.find((entry) => entry.originalPath === path);
  requireCondition(row, `Required primary source was not snapshotted: ${path}.`);
  return row;
}

function assertPrimaryCoverage(contextSources, rows, evidenceSets, correctionLineage, gatePaths, paths) {
  const scopes = new Set(contextSources.map((entry) => entry.readScope));
  for (const path of [
    paths.candidateManifest,
    paths.preIntegrationReview,
    gatePaths.receipt,
    gatePaths.stdout,
    gatePaths.stderr,
  ]) {
    requireCondition(scopes.has(path), `Missing direct release context: ${path}.`);
  }

  const requiredRawPaths = [
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
  ];
  for (const set of evidenceSets) {
    requiredRawPaths.push(set.packagePath, set.approvalPath, set.reportPath);
    requiredRawPaths.push(...set.rawHandoffs.map((entry) => entry.path));
  }
  requiredRawPaths.push(...correctionLineage.replans.map((entry) => entry.path));
  for (const path of new Set(requiredRawPaths)) {
    const row = reviewedSourceByPath(rows, path);
    requireCondition(
      scopes.has(row.snapshotPath),
      `Primary evidence is summary-only or absent from reviewer context: ${path}.`,
    );
  }

  for (const path of REQUIRED_SECURITY_CAUSAL_SOURCES) {
    const row = reviewedSourceByPath(rows, path);
    requireCondition(
      row.allowedWorkUnits.includes(SECURITY) && scopes.has(row.snapshotPath),
      `Security reviewer lacks a required causal source: ${path}.`,
    );
  }
}

function reviewDefinitions() {
  return [
    {
      id: PRODUCT,
      objective:
        "Audit whether corrected V12 presents one accurate, simple, IDE-neutral path from an approved package through visible specialist work to verified integration handoff.",
      moduleId: "release-review-r2.product-api-ide",
      action:
        "Review product truth, public API shape, schema publication, installed-consumer behavior, IDE guidance, implementation-bound dogfood evidence, and release-stage truth against AC1-AC9.",
      outputType: "ProductApiIdeReleaseReviewR2",
      capability: "audit.r2.product-api-ide-truth",
      evidenceId: "evidence.r2.product-api-ide-release-review",
      artifact: "product-api-ide-release-review-r2.md",
    },
    {
      id: LIFECYCLE,
      objective:
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability.",
      moduleId: "release-review-r2.lifecycle-correctness",
      action:
        "Trace all four operations and every route; inspect canonical ordering, aggregate limits, replay, restoration, tests, dogfood, and the exact canonical-gate evidence without repairing production.",
      outputType: "LifecycleCorrectnessReleaseReviewR2",
      capability: "audit.r2.lifecycle-correctness-recovery",
      evidenceId: "evidence.r2.lifecycle-correctness-release-review",
      artifact: "lifecycle-correctness-release-review-r2.md",
    },
    {
      id: SECURITY,
      objective:
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries.",
      moduleId: "release-review-r2.security-trace-authority",
      action:
        "Attack schema-loading effects, digest substitution, stale sessions and handoffs, authority confusion, unsafe controls, snapshot provenance, raw primary evidence, Audit-B approval binding, and canonical-gate receipt closure.",
      outputType: "SecurityTraceAuthorityReleaseReviewR2",
      capability: "audit.r2.security-trace-authority",
      evidenceId: "evidence.r2.security-trace-authority-release-review",
      artifact: "security-trace-authority-release-review-r2.md",
    },
  ];
}

function reviewUnit(definition, contextSources) {
  const selectedSources = contextSources.filter((entry) =>
    entry.allowedWorkUnits.includes(definition.id),
  );
  const paths = selectedSources.map((entry) => entry.readScope).sort(compareOrdinal);
  return {
    id: definition.id,
    objective: definition.objective,
    weight: 8,
    module: {
      id: definition.moduleId,
      action: definition.action,
      inputPorts: [{ name: "input", artifactType: "FrozenV12ReleaseCandidateR2" }],
      outputPorts: [{ name: "output", artifactType: definition.outputType }],
    },
    dependencies: [],
    requiredCapabilities: [definition.capability],
    contextUses: selectedSources.map((entry) => ({
      sourceId: entry.id,
      purpose: definition.objective,
    })),
    scope: { read: paths, write: [], conflictZones: [] },
    permissions: [
      { kind: "filesystem.read", scopes: paths },
      { kind: "process.spawn", scopes: ["git", "node", "npm"] },
    ],
    evidenceRequirementIds: [definition.evidenceId],
    handoffArtifacts: [definition.artifact],
    stopConditions: [
      "Authenticate every declared immutable source against its exact byte count and SHA-256 binding before review.",
      "Do not edit files, change Git state, access the network, launch descendants, or repair a finding.",
      "Treat exact raw gate logs, raw handoffs, approval bytes, and source snapshots as primary evidence; summaries are navigation only.",
      "Report findings first with severity and exact snapshot/original-path evidence; use pass only when this review domain is release-ready.",
      "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    ],
  };
}

function requestFor(contextSources, candidate) {
  const definitions = reviewDefinitions();
  const allPaths = contextSources.map((entry) => entry.readScope).sort(compareOrdinal);
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "GoalContract",
      id: "v12.ide-run-loop.release-review-r2",
      revision: 1,
      objective: `Independently determine whether corrected exact V12 candidate ${candidate} is release-ready across product truth, lifecycle correctness, and security/trace authority.`,
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.exact-candidate-snapshots",
          statement: `Every tracked reviewer source is byte-identical to candidate ${candidate} and is reviewed only through its immutable R2 snapshot.`,
          rationale:
            "The harness authenticates each Git blob, writes snapshots once, and rechecks every snapshot before compilation and approval.",
        },
        {
          id: "assumption.canonical-gate-primary-evidence",
          statement:
            "The canonical gate passed from an authenticated materialization of the exact committed candidate tree, and its raw stdout, raw stderr, and closed receipt are direct reviewer sources.",
          rationale:
            "The release-gate wrapper binds the commit, tree, file count, byte count, source digest, pre/post materialization digest, cleanup, exact output bytes, command, exit status, and pre/post HEAD without a timestamp or summary-only claim.",
        },
        {
          id: "assumption.external-host-boundary",
          statement:
            "V12 core creates, restores, inspects, and records immutable evidence sessions but does not launch, persist, schedule, integrate, merge, or mutate memory.",
          rationale: "The review judges the provider-neutral reducer, while all host effects remain external.",
        },
        {
          id: "assumption.external-producer",
          statement:
            "The correction producer and integration owner are external to these three read-only review work units.",
          rationale:
            "Immutable candidate snapshots, approved correction handoffs, and direct primary evidence form the producer boundary.",
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
        allowedModules: definitions.map((entry) => entry.moduleId).sort(compareOrdinal),
        allowedCapabilities: definitions
          .map((entry) => entry.capability)
          .sort(compareOrdinal),
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
      workUnits: definitions.map((definition) => reviewUnit(definition, contextSources)),
    },
  };
}

async function preparedContexts(
  rows,
  candidateManifest,
  gatePaths,
  paths,
  candidateTree,
) {
  const contexts = rows.map(contextSource);
  contexts.push(
    await directContext(
      "context.candidate-manifest",
      paths.candidateManifest,
      "Closed candidate, gate, tooling, snapshot, and primary-evidence binding manifest.",
      ALL_REVIEWS,
    ),
    directCandidateContext(
      candidateTree,
      "context.canonical-gate-receipt",
      gatePaths.receipt,
      "Closed exact-candidate canonical-gate receipt.",
      ALL_REVIEWS,
    ),
    directCandidateContext(
      candidateTree,
      "context.canonical-gate-stdout",
      gatePaths.stdout,
      "Exact raw canonical-gate stdout bytes.",
      ALL_REVIEWS,
    ),
    directCandidateContext(
      candidateTree,
      "context.canonical-gate-stderr",
      gatePaths.stderr,
      "Exact raw canonical-gate stderr bytes.",
      ALL_REVIEWS,
    ),
  );
  requireCondition(
    candidateManifest.reviewedSources.length === rows.length,
    "Candidate manifest source count mismatch.",
  );
  return contexts.sort((left, right) => compareOrdinal(left.id, right.id));
}

async function prepare() {
  requireCondition(
    typeof checkpoint === "string" && CANDIDATE_PATTERN.test(checkpoint),
    "prepare requires the exact 40-character candidate commit.",
  );
  const paths = candidateRunPaths(checkpoint);
  const candidateTree = loadCandidateTree(checkpoint);
  await verifyCheckpoint(checkpoint, paths);
  const reviewTooling = await authenticateReviewTooling(candidateTree);
  const sources = collectSourceSpecs(candidateTree);
  const gate = await validateGateReceipt(checkpoint, candidateTree);
  const { evidenceSets, correctionLineage } =
    await verifyPrimaryEvidenceSets(candidateTree);
  const rows = await materializeSnapshots(sources, candidateTree, paths);
  const preIntegration = reviewedSourceByPath(
    rows,
    "docs/specs/v12-ide-run-loop/review.md",
  );
  const candidateManifest = {
    apiVersion: "swecircuit/release-candidate/v1alpha1",
    kind: "ReleaseCandidateManifest",
    version: "V12",
    baselineCommit: BASELINE,
    candidateCommit: checkpoint,
    branch: "codex/v12-ide-run-loop",
    runRoot: paths.root,
    reviewTooling,
    canonicalGate: {
      receipt: gate.receiptBinding,
      candidateSource: gate.receipt.candidateSource,
      materialization: gate.receipt.materialization,
      stdout: gate.receipt.stdout,
      stderr: gate.receipt.stderr,
      command: gate.receipt.command.canonical,
      result: gate.receipt.result,
    },
    preIntegrationReview: {
      originalPath: preIntegration.originalPath,
      candidateMode: preIntegration.candidateMode,
      candidateObjectId: preIntegration.candidateObjectId,
      snapshotPath: preIntegration.snapshotPath,
      bytes: preIntegration.bytes,
      digest: preIntegration.digest,
    },
    verifiedEvidenceSets: evidenceSets,
    correctionLineage,
    reviewedSources: rows,
  };
  await writeImmutableJson(paths.candidateManifest, candidateManifest);
  const contextSources = await preparedContexts(
    rows,
    candidateManifest,
    gate.paths,
    paths,
    candidateTree,
  );
  assertPrimaryCoverage(
    contextSources,
    rows,
    evidenceSets,
    correctionLineage,
    gate.paths,
    paths,
  );
  const request = requestFor(contextSources, checkpoint);
  await writeImmutableJson(paths.request, request);
  await writeImmutableJson(paths.phaseMetadata, {
    phase: "release-review-r2",
    checkpoint,
    runRoot: paths.root,
    goalId: request.goal.id,
    goalRevision: request.goal.revision,
    reviewTooling,
    canonicalGateReceipt: gate.receiptBinding,
    sourceSnapshots: rows.length,
    primaryEvidenceSets: evidenceSets.map((entry) => entry.id),
    correctionRevisions: correctionLineage.revisions.map((entry) => entry.revision),
    correctionReplans: correctionLineage.replans.map((entry) => entry.path),
    runtimeInvoked: false,
  });
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        stage: "release-review-r2-prepared",
        checkpoint,
        runRoot: paths.root,
        contextSources: contextSources.length,
        sourceSnapshots: rows.length,
        primaryRawHandoffs: evidenceSets.reduce(
          (total, entry) => total + entry.rawHandoffs.length,
          0,
        ),
        correctionRevisions: correctionLineage.revisions.length,
        correctionReplans: correctionLineage.replans.length,
        workUnits: request.goal.workUnits.map((entry) => entry.id),
      },
      null,
      2,
    )}\n`,
  );
}

async function validatePreparedInputs(candidate) {
  const paths = candidateRunPaths(candidate);
  const candidateTree = loadCandidateTree(candidate);
  await verifyCheckpoint(candidate, paths);
  const reviewTooling = await authenticateReviewTooling(candidateTree);
  const parsedManifest = await readCanonicalJson(paths.candidateManifest);
  const manifest = parsedManifest.value;
  assertExactKeys(
    manifest,
    [
      "apiVersion",
      "kind",
      "version",
      "baselineCommit",
      "candidateCommit",
      "branch",
      "runRoot",
      "reviewTooling",
      "canonicalGate",
      "preIntegrationReview",
      "verifiedEvidenceSets",
      "correctionLineage",
      "reviewedSources",
    ],
    "candidate manifest",
  );
  requireCondition(
    manifest.apiVersion === "swecircuit/release-candidate/v1alpha1" &&
      manifest.kind === "ReleaseCandidateManifest" &&
      manifest.version === "V12" &&
      manifest.candidateCommit === candidate &&
      manifest.runRoot === paths.root &&
      JSON.stringify(manifest.reviewTooling) === JSON.stringify(reviewTooling),
    "Prepared candidate manifest identity or tooling binding mismatch.",
  );

  const sources = collectSourceSpecs(candidateTree);
  const gate = await validateGateReceipt(candidate, candidateTree);
  const { evidenceSets, correctionLineage } =
    await verifyPrimaryEvidenceSets(candidateTree);
  requireCondition(
    JSON.stringify(manifest.verifiedEvidenceSets) === JSON.stringify(evidenceSets) &&
      JSON.stringify(manifest.correctionLineage) === JSON.stringify(correctionLineage),
    "Prepared primary-evidence verification or correction lineage changed.",
  );
  requireCondition(
    JSON.stringify(manifest.canonicalGate) ===
      JSON.stringify({
        receipt: gate.receiptBinding,
        candidateSource: gate.receipt.candidateSource,
        materialization: gate.receipt.materialization,
        stdout: gate.receipt.stdout,
        stderr: gate.receipt.stderr,
        command: gate.receipt.command.canonical,
        result: gate.receipt.result,
      }),
    "Prepared canonical-gate binding changed.",
  );
  requireCondition(
    manifest.reviewedSources.length === sources.length,
    "Prepared reviewer source set changed.",
  );

  const sourceByPath = new Map(sources.map((entry) => [entry.path, entry]));
  for (const row of manifest.reviewedSources) {
    assertExactKeys(
      row,
      [
        "contextId",
        "originalPath",
        "candidateMode",
        "candidateObjectId",
        "snapshotPath",
        "description",
        "allowedWorkUnits",
        "bytes",
        "digest",
      ],
      `reviewed source ${String(row.originalPath)}`,
    );
    const entry = sourceByPath.get(row.originalPath);
    requireCondition(entry, `Unknown prepared reviewer source: ${row.originalPath}.`);
    const expected = reviewedSourceMaterialization(entry, candidateTree, paths).row;
    requireCondition(
      JSON.stringify(row) === JSON.stringify(expected),
      `Prepared reviewer source metadata changed: ${row.originalPath}.`,
    );
    const snapshotBytes = await readFile(absolute(row.snapshotPath));
    const candidateBytes = candidateTree.file(row.originalPath).bytes;
    requireCondition(
      snapshotBytes.equals(candidateBytes) &&
        snapshotBytes.byteLength === row.bytes &&
        digest(snapshotBytes) === row.digest,
      `Prepared reviewer snapshot changed or differs from its candidate Git blob: ${row.snapshotPath}.`,
    );
  }

  const request = (await readCanonicalJson(paths.request)).value;
  const contextSources = request.goal?.contextSources;
  requireCondition(Array.isArray(contextSources), "Prepared request lacks context sources.");
  for (const context of contextSources) {
    const contextBytes = await readFile(absolute(context.readScope));
    requireCondition(
      contextBytes.byteLength === context.bytes && digest(contextBytes) === context.digest,
      `Prepared context source changed: ${context.readScope}.`,
    );
  }
  assertPrimaryCoverage(
    contextSources,
    manifest.reviewedSources,
    evidenceSets,
    correctionLineage,
    gate.paths,
    paths,
  );
  return { manifest, request, paths, candidateTree, reviewTooling };
}

async function compile() {
  const { manifest, request, paths } = await validatePreparedInputs(checkpoint);
  const compilation = requireValue(
    compileAgentBlueprints(request),
    "Release-review-r2 compilation",
  );
  const specialistPackage = requireValue(
    renderSpecialistPackage(compilation),
    "Release-review-r2 package rendering",
  );
  const expectation = {
    compilationDigest: specialistPackage.compilationDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    verifySpecialistPackage(specialistPackage, expectation),
    "Post-render release-review-r2 package verification",
  );
  for (const file of specialistPackage.files) {
    await writeImmutable(
      `${paths.packageDir}/${file.path}`,
      Buffer.from(file.content, "utf8"),
    );
  }
  await writeImmutableJson(paths.packageEnvelope, specialistPackage);
  const summary = {
    goalId: compilation.goal.id,
    goalRevision: compilation.goal.revision,
    candidateCommit: manifest.candidateCommit,
    runRoot: paths.root,
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
    packageSelfVerified: true,
    ownerApproved: false,
    runtimeInvoked: false,
  };
  await writeImmutableJson(paths.compilationSummary, summary);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

async function approve() {
  const { manifest, request, paths } = await validatePreparedInputs(checkpoint);
  const specialistPackage = (await readCanonicalJson(paths.packageEnvelope)).value;
  const expectation = {
    compilationDigest: specialistPackage.compilationDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    verifySpecialistPackage(specialistPackage, expectation),
    "Owner approval-bound release-review-r2 package verification",
  );
  const approval = {
    apiVersion: "swecircuit/review-approval/v1alpha1",
    kind: "SpecialistReviewApproval",
    goalId: request.goal.id,
    goalRevision: request.goal.revision,
    candidateCommit: manifest.candidateCommit,
    approvedBy: "repository-owner-via-integration-owner",
    approvalBasis:
      "The owner reviewed this exact corrected candidate, immutable source snapshots, primary evidence, three task-shaped read-only contracts, authority, and compilation/package digest pair before launch.",
    expectation,
  };
  await writeImmutableJson(paths.approval, approval);
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        stage: "release-review-r2-package-approved",
        candidateCommit: manifest.candidateCommit,
        runRoot: paths.root,
        ...expectation,
      },
      null,
      2,
    )}\n`,
  );
}

async function pathsMode() {
  const paths = candidateRunPaths(checkpoint);
  const candidateTree = loadCandidateTree(checkpoint);
  await authenticateReviewTooling(candidateTree);
  const gatePaths = gateEvidencePaths(checkpoint);
  requireVersionableEvidencePaths(gatePaths, candidateTree);
  requireBytePreservingEvidencePaths(checkpoint, gatePaths);
  process.stdout.write(
    `${JSON.stringify(
      { candidateCommit: checkpoint, run: paths, canonicalGate: gatePaths },
      null,
      2,
    )}\n`,
  );
}

async function main() {
  if (mode === "prepare") {
    await prepare();
  } else if (mode === "compile") {
    await compile();
  } else if (mode === "approve") {
    await approve();
  } else if (mode === "paths") {
    await pathsMode();
  } else {
    throw new Error(`Unknown mode: ${mode}.`);
  }
}

export const RELEASE_REVIEW_TEST_HOOKS = Object.freeze({
  REVIEW_ROOT,
  HARNESS_REPOSITORY_PATH,
  VERIFIER_REPOSITORY_PATH,
  candidateRunPaths,
  gateEvidencePaths,
  loadCandidateTree,
  candidateTreeWithOverrides,
  discoverCorrectionEvidenceSpecs,
  collectSourceSpecs,
  verifyEvidenceSet,
  reviewedSourceMaterialization,
  authenticateToolBytes,
  authenticateReviewTooling,
  requireNoWorkingTreeOnlySources,
  verifyCheckpoint,
});

if (process.argv[1] && resolve(process.argv[1]) === resolve(SCRIPT_PATH)) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
    process.exitCode = 1;
  });
}
