import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { lstatSync, readFileSync, readlinkSync, realpathSync } from "node:fs";
import {
  lstat,
  mkdir,
  readFile,
  readdir,
  readlink,
  realpath,
  writeFile,
} from "node:fs/promises";
import { basename, delimiter, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REVIEW_ROOT = "docs/specs/v12-ide-run-loop/evidence/release-review-r2";
const PARENT_REPOSITORY_PATH = "scripts/run-v12-release-review.mjs";
const HARNESS_REPOSITORY_PATH = `${REVIEW_ROOT}/run-release-review.mjs`;
const VERIFIER_REPOSITORY_PATH = `${REVIEW_ROOT}/verify-release-review-handoffs.mjs`;
const WORKER_CONTEXT_ENV = "SWECIRCUIT_RELEASE_REVIEW_WORKER_CONTEXT";
const WORKER_TOKEN_ENV = "SWECIRCUIT_RELEASE_REVIEW_WORKER_TOKEN";
const EMPTY_FILE_DIGEST =
  "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
const PRIVATE_NPM_CONFIGURATION_POLICY = Object.freeze({
  apiVersion: "swecircuit/release-review-npm-configuration/v1alpha1",
  kind: "ReleaseReviewPrivateNpmConfigurationPolicy",
  userConfig: Object.freeze({ bytes: 0, digest: EMPTY_FILE_DIGEST }),
  globalConfig: Object.freeze({ bytes: 0, digest: EMPTY_FILE_DIGEST }),
  distinctPaths: "required-case-insensitively",
  containment: "operation-root-outside-repository-candidate-and-cache",
  links: "forbidden",
  hostConfiguration: "excluded-without-fallback",
  pathIdentity: "invocation-only-excluded-from-stable-runtime-binding",
  validation: "before-every-parent-spawn-and-by-candidate-worker",
});
const INVOCATION_TEMPORARY_PATH_POLICY =
  "external-host-bound-invocation-paths-excluded-from-stable-runtime-identity";
const CLOSED_NPM_ENVIRONMENT_KEYS = new Set([
  "npm_config_audit",
  "npm_config_cache",
  "npm_config_fund",
  "npm_config_globalconfig",
  "npm_config_ignore_scripts",
  "npm_config_offline",
  "npm_config_progress",
  "npm_config_update_notifier",
  "npm_config_userconfig",
]);
const RUNTIME_BINDING_DOMAIN = "swecircuit/release-review-runtime/v1alpha1";
const EFFECTIVE_ENVIRONMENT_DOMAIN =
  "swecircuit/release-review-effective-environment/v1alpha1";
const CLOSURE_DOMAIN = "swecircuit/release-review-closure/v1alpha1";
const STABLE_RECONSTRUCTION_DOMAIN =
  "swecircuit/release-review-stable-reconstruction/v1alpha1";
const PHASE_AUTHORITY_DOMAIN = "swecircuit/release-review-phase-authority/v1alpha1";
const PHASE_PREFIXES = Object.freeze({
  prepare: Object.freeze(["prepare"]),
  compile: Object.freeze(["prepare", "compile"]),
  approve: Object.freeze(["prepare", "compile", "approve"]),
  verify: Object.freeze(["prepare", "compile", "approve", "verify"]),
  paths: Object.freeze(["paths"]),
});
const mode = process.argv[2] ?? "prepare";
const checkpoint = process.argv[3];

let activeWorker = null;
let specialistRuntime = null;

const BASELINE = "c2f974d2288fc510cb8388fbc8e6abe9fd5d9e8c";
const CANDIDATE_PATTERN = /^[0-9a-f]{40}$/;
const DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;
const WINDOWS_RESERVED = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/iu;
const FORBIDDEN_PATH_TEXT =
  /[\u0000-\u001f\u007f-\u009f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/u;
const MATERIALIZATION_DIGEST_DOMAIN = "swecircuit/release-gate/materialization/v1alpha1";
const CANDIDATE_LOCK_DIGEST_DOMAIN = "swecircuit/release-gate/candidate-lock/v1alpha1";
const GIT_CONTEXT_STRATEGY = "disposable-shared-object-git-context";
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
    "context.release-review-parent",
    PARENT_REPOSITORY_PATH,
    "Authority-bearing release-review parent, environment constructor, and worker launcher.",
    [SECURITY],
  ),
  source(
    "context.release-gate-tests",
    "test/v12-release-gate.test.mjs",
    "Candidate-materialization and R2 security-context regressions.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.enclosing-candidate-git-probe",
    "test/fixtures/v12-enclosing-candidate-git-probe.mjs",
    "Blob-only nested-candidate Git authority and cleanup probe.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.typescript-binding-runner",
    "scripts/run-typescript.mjs",
    "Exact host TypeScript entrypoint resolution and identity boundary.",
    [SECURITY],
  ),
  source(
    "context.git-blob-loader-fixture",
    "test/helpers/git-blob-loader-fixture.mjs",
    "Primary Git blob loading and adversarial batch fixture.",
    [SECURITY],
  ),
  source(
    "context.release-review-lifecycle-helper",
    "test/helpers/v12-release-review-lifecycle.mjs",
    "Copied-production release lifecycle and host-supply verification helper.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.release-review-lifecycle-test",
    "test/lifecycle/v12-release-review-lifecycle.test.mjs",
    "Outer exact-candidate lifecycle, Git-authority, timeout, and cleanup contract.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.host-cache-supply-child",
    "test/fixtures/v12-host-cache-supply-child.mjs",
    "Host cache isolation adversarial child fixture.",
    [SECURITY],
  ),
  source(
    "context.git-environment-boundary-child",
    "test/fixtures/v12-git-environment-boundary-child.mjs",
    "Closed Git environment adversarial child fixture.",
    [SECURITY],
  ),
  source(
    "context.worker-environment-boundary-child",
    "test/fixtures/v12-worker-environment-boundary-child.mjs",
    "Fresh-process complete worker-environment authority probe.",
    [SECURITY],
  ),
  source(
    "context.git-blob-loader-environment-child",
    "test/fixtures/git-blob-loader-environment-child.mjs",
    "Git blob loader environment adversarial child fixture.",
    [SECURITY],
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
const CORRECTION_NAVIGATION_FILES = Object.freeze([
  "compilation-summary.json",
  "phase-metadata.json",
  "request.json",
]);
const CORRECTION_PACKAGE_MARKERS = Object.freeze([
  "approval.json",
  "handoff-verification.json",
  "package-envelope.json",
]);

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

function scalarPathText(value, label) {
  requireCondition(typeof value === "string", `${label} must be a string.`);
  for (let index = 0; index < value.length; index += 1) {
    const codeUnit = value.charCodeAt(index);
    if (codeUnit >= 0xd800 && codeUnit <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      requireCondition(
        next >= 0xdc00 && next <= 0xdfff,
        `${label} contains a lone UTF-16 surrogate.`,
      );
      index += 1;
    } else {
      requireCondition(
        codeUnit < 0xdc00 || codeUnit > 0xdfff,
        `${label} contains a lone UTF-16 surrogate.`,
      );
    }
  }
  requireCondition(!FORBIDDEN_PATH_TEXT.test(value), `${label} contains forbidden control text.`);
  requireCondition(value === value.normalize("NFC"), `${label} must be NFC-normalized.`);
  return value;
}

function compareUtf8Ordinal(left, right) {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function updateRuntimeFrame(hash, bytes) {
  const value = Buffer.from(bytes);
  const length = Buffer.allocUnsafe(8);
  length.writeBigUInt64BE(BigInt(value.byteLength));
  hash.update(length);
  hash.update(value);
}

function runtimeDomainDigest(domain, value) {
  const hash = createHash("sha256");
  updateRuntimeFrame(hash, Buffer.from(domain, "utf8"));
  updateRuntimeFrame(hash, Buffer.from(JSON.stringify(value), "utf8"));
  return `sha256:${hash.digest("hex")}`;
}

function effectiveEnvironmentBinding(environment) {
  requireCondition(
    environment && typeof environment === "object" && !Array.isArray(environment),
    "Effective worker environment must be an object.",
  );
  const aliases = new Set();
  const entries = Object.entries(environment).map(([name, value]) => {
    requireCondition(
      /^[A-Za-z_][A-Za-z0-9_]*$/u.test(name) && typeof value === "string",
      `Effective worker environment entry is invalid: ${String(name)}.`,
    );
    const alias = name.toLowerCase();
    requireCondition(
      !aliases.has(alias),
      `Effective worker environment contains a case-insensitive duplicate: ${name}.`,
    );
    aliases.add(alias);
    requireCondition(!value.includes("\0"), `Effective worker environment value contains NUL: ${name}.`);
    for (let index = 0; index < value.length; index += 1) {
      const codeUnit = value.charCodeAt(index);
      if (codeUnit >= 0xd800 && codeUnit <= 0xdbff) {
        const next = value.charCodeAt(index + 1);
        requireCondition(
          next >= 0xdc00 && next <= 0xdfff,
          `Effective worker environment value contains a lone surrogate: ${name}.`,
        );
        index += 1;
      } else {
        requireCondition(
          codeUnit < 0xdc00 || codeUnit > 0xdfff,
          `Effective worker environment value contains a lone surrogate: ${name}.`,
        );
      }
    }
    const bytes = Buffer.from(value, "utf8");
    return {
      name: name.toUpperCase(),
      valueBytes: bytes.byteLength,
      valueDigest: digest(bytes),
    };
  });
  entries.sort((left, right) => compareUtf8Ordinal(left.name, right.name));
  const identity = {
    apiVersion: "swecircuit/release-review-effective-environment/v1alpha1",
    kind: "ReleaseReviewEffectiveEnvironmentBinding",
    keyIdentity: "ascii-case-insensitive-uppercase",
    valueIdentity: "raw-utf8-sha256",
    entries,
  };
  return {
    ...identity,
    contentDigest: runtimeDomainDigest(EFFECTIVE_ENVIRONMENT_DOMAIN, identity),
  };
}

function validateEffectiveWorkerEnvironment(expected, environment = process.env) {
  assertExactKeys(
    expected,
    [
      "apiVersion",
      "kind",
      "keyIdentity",
      "valueIdentity",
      "entries",
      "contentDigest",
    ],
    "effective worker environment binding",
  );
  const actual = effectiveEnvironmentBinding(environment);
  requireCondition(
    JSON.stringify(actual) === JSON.stringify(expected),
    "Candidate worker effective environment mismatch.",
  );
  return actual;
}

function isContainedPath(root, target) {
  const fromRoot = relative(resolve(root), resolve(target));
  return (
    fromRoot === "" ||
    (!isAbsolute(fromRoot) && fromRoot !== ".." && !fromRoot.startsWith(`..${sep}`))
  );
}

function environmentSupply(key, environment = process.env) {
  const values = Object.entries(environment)
    .filter(([name]) => name.toLowerCase() === key.toLowerCase())
    .map(([, value]) => value);
  requireCondition(values.length <= 1, `${key} must be supplied at most once.`);
  return values[0];
}

function inheritedRuntimeEnvironment(environment = process.env) {
  const allowed = [
    "APPDATA",
    "COMSPEC",
    "HOME",
    "HOMEDRIVE",
    "HOMEPATH",
    "LANG",
    "LC_ALL",
    "LOCALAPPDATA",
    "PROGRAMDATA",
    "SYSTEMROOT",
    "USERPROFILE",
    "WINDIR",
  ];
  const inherited = {};
  for (const canonicalName of allowed) {
    const matches = Object.entries(environment).filter(
      ([name]) => name.toLowerCase() === canonicalName.toLowerCase(),
    );
    requireCondition(matches.length <= 1, `${canonicalName} is duplicated.`);
    if (matches.length === 1 && typeof matches[0][1] === "string") {
      inherited[canonicalName] = matches[0][1];
    }
  }
  return Object.fromEntries(
    Object.entries(inherited).sort(([left], [right]) =>
      compareUtf8Ordinal(left, right),
    ),
  );
}

async function workerFileBinding(path, logicalPath = path) {
  const resolvedPath = await realpath(path);
  const stats = await lstat(resolvedPath);
  requireCondition(
    stats.isFile() && !stats.isSymbolicLink() && stats.nlink === 1,
    `Worker trust input is not one plain file: ${logicalPath}.`,
  );
  const bytes = await readFile(resolvedPath);
  return { path: logicalPath, bytes: bytes.byteLength, digest: digest(bytes) };
}

function pathAlias(path) {
  return resolve(path).normalize("NFC").toLowerCase();
}

async function validateWorkerPrivateNpmConfiguration({
  candidateRoot,
  cacheRoot,
  environment,
  environmentPolicy,
}) {
  requireCondition(
    environment && typeof environment === "object" && !Array.isArray(environment),
    "Candidate worker private npm environment must be an object.",
  );
  requireCondition(
    environmentPolicy?.npmUserConfig === "operation-private-empty-file" &&
      environmentPolicy?.npmGlobalConfig === "operation-private-empty-file" &&
      JSON.stringify(environmentPolicy?.npmConfiguration) ===
        JSON.stringify(PRIVATE_NPM_CONFIGURATION_POLICY),
    "Candidate worker runtime lacks the exact private npm configuration policy.",
  );
  for (const key of Object.keys(environment)) {
    const normalized = key.toLowerCase();
    requireCondition(
      !normalized.startsWith("npm_config_") || CLOSED_NPM_ENVIRONMENT_KEYS.has(normalized),
      `Candidate worker inherited an undeclared npm setting: ${key}.`,
    );
  }

  const candidate = await realpath(candidateRoot);
  const operationRoot = await realpath(dirname(candidate));
  const operationStats = await lstat(operationRoot);
  const cache = await realpath(cacheRoot);
  requireCondition(
    operationStats.isDirectory() &&
      !operationStats.isSymbolicLink() &&
      !isContainedPath(candidate, operationRoot) &&
      !isContainedPath(operationRoot, cache) &&
      !isContainedPath(cache, operationRoot),
    "Candidate worker private npm roots are not disjoint plain directories.",
  );

  const userPath = scalarPathText(
    environmentSupply("npm_config_userconfig", environment),
    "Candidate worker npm userconfig",
  );
  const globalPath = scalarPathText(
    environmentSupply("npm_config_globalconfig", environment),
    "Candidate worker npm globalconfig",
  );
  requireCondition(
    isAbsolute(userPath) &&
      isAbsolute(globalPath) &&
      pathAlias(userPath) !== pathAlias(globalPath),
    "Candidate worker npm config paths must be distinct absolute paths.",
  );

  const inspect = async (path, expectedName, label) => {
    requireCondition(
      basename(path) === expectedName,
      `${label} has an unexpected operation-private name.`,
    );
    const stats = await lstat(path);
    requireCondition(
      stats.isFile() && !stats.isSymbolicLink() && stats.nlink === 1,
      `${label} must be one plain, unlinked regular file.`,
    );
    const realPath = await realpath(path);
    requireCondition(
      pathAlias(path) === pathAlias(realPath) &&
        pathAlias(dirname(realPath)) === pathAlias(operationRoot) &&
        !isContainedPath(candidate, realPath) &&
        !isContainedPath(cache, realPath),
      `${label} is outside the exact private npm operation boundary.`,
    );
    const bytes = await readFile(path);
    requireCondition(
      bytes.byteLength === 0 && digest(bytes) === EMPTY_FILE_DIGEST,
      `${label} must contain exactly zero bytes.`,
    );
    return {
      path: resolve(path),
      realPath,
      bytes: bytes.byteLength,
      digest: digest(bytes),
      links: stats.nlink,
    };
  };
  const userConfig = await inspect(
    userPath,
    "npm-userconfig",
    "Candidate worker npm user config",
  );
  const globalConfig = await inspect(
    globalPath,
    "npm-globalconfig",
    "Candidate worker npm global config",
  );
  requireCondition(
    pathAlias(userConfig.realPath) !== pathAlias(globalConfig.realPath) &&
      environmentSupply("npm_config_cache", environment) === cache &&
      environmentSupply("npm_config_offline", environment) === "true" &&
      environmentSupply("npm_config_ignore_scripts", environment) === "true" &&
      environmentSupply("npm_config_audit", environment) === "false" &&
      environmentSupply("npm_config_fund", environment) === "false" &&
      environmentSupply("npm_config_update_notifier", environment) === "false" &&
      environmentSupply("npm_config_progress", environment) === "false",
    "Candidate worker npm environment differs from its private file policy.",
  );
  return {
    policy: PRIVATE_NPM_CONFIGURATION_POLICY,
    operationRoot,
    userConfig,
    globalConfig,
    pathsDistinctCaseInsensitively: true,
    containedByExactOperationRoot: true,
    outsideCandidateAndCache: true,
    hostConfigurationExcluded: true,
  };
}

async function inspectRuntimeClosure(root, label, allowSymlinks) {
  const rootStats = await lstat(root);
  requireCondition(
    rootStats.isDirectory() && !rootStats.isSymbolicLink(),
    `${label} root is not a plain directory.`,
  );
  const rootReal = await realpath(root);
  const records = [];
  let files = 0;
  let directories = 0;
  let links = 0;
  let bytes = 0;

  async function visit(directory, prefix) {
    const children = await readdir(directory, { withFileTypes: true });
    children.sort((left, right) => compareUtf8Ordinal(left.name, right.name));
    for (const child of children) {
      const relativePath = prefix ? `${prefix}/${child.name}` : child.name;
      const path = join(directory, child.name);
      const stats = await lstat(path);
      if (stats.isSymbolicLink()) {
        requireCondition(
          allowSymlinks,
          `${label} contains a symbolic link: ${relativePath}.`,
        );
        const targetReal = await realpath(path);
        requireCondition(
          isContainedPath(rootReal, targetReal),
          `${label} link escapes closure: ${relativePath}.`,
        );
        const target = (await readlink(path)).replaceAll("\\", "/");
        records.push({ kind: "link", path: relativePath, target });
        links += 1;
      } else if (stats.isDirectory()) {
        const directoryReal = await realpath(path);
        requireCondition(
          isContainedPath(rootReal, directoryReal),
          `${label} directory escapes closure: ${relativePath}.`,
        );
        records.push({ kind: "directory", path: relativePath });
        directories += 1;
        await visit(path, relativePath);
      } else {
        requireCondition(
          stats.isFile() && stats.nlink === 1,
          `${label} contains a non-regular or hard-linked file: ${relativePath}.`,
        );
        const fileReal = await realpath(path);
        requireCondition(
          isContainedPath(rootReal, fileReal),
          `${label} file escapes closure: ${relativePath}.`,
        );
        const content = await readFile(path);
        records.push({
          kind: "file",
          path: relativePath,
          bytes: content.byteLength,
          digest: digest(content),
        });
        files += 1;
        bytes += content.byteLength;
      }
    }
  }

  await visit(root, "");
  return {
    files,
    directories,
    links,
    bytes,
    digest: runtimeDomainDigest(CLOSURE_DOMAIN, records),
  };
}

function verifyClosedRuntimeBinding(binding) {
  const keys = [
    "apiVersion",
    "kind",
    "candidateCommit",
    "candidateSource",
    "tooling",
    "lockedSupply",
    "toolchain",
    "platform",
    "environmentPolicy",
    "externalDeclarations",
    "generatedRuntime",
    "runtimeBindingDigest",
  ];
  assertExactKeys(binding, keys, "runtime binding");
  const identity = Object.fromEntries(keys.slice(0, -1).map((key) => [key, binding[key]]));
  requireCondition(
    DIGEST_PATTERN.test(binding.runtimeBindingDigest) &&
      binding.runtimeBindingDigest ===
        runtimeDomainDigest(RUNTIME_BINDING_DOMAIN, identity),
    "Runtime binding digest mismatch.",
  );
}

function validateInputFileBinding(value, label) {
  assertExactKeys(value, ["path", "mediaType", "bytes", "digest"], label);
  requireCondition(
    scalarPathText(value.path, `${label} path`).length > 0 &&
      typeof value.mediaType === "string" &&
      Number.isSafeInteger(value.bytes) &&
      value.bytes >= 0 &&
      DIGEST_PATTERN.test(value.digest),
    `${label} is invalid.`,
  );
}

function safeAuthorityHandoffPath(value, label) {
  const path = scalarPathText(value, label);
  const segments = path.split("/");
  requireCondition(
    segments.length === 2 &&
      segments[0] === "handoffs" &&
      segments[1].length > ".json".length &&
      segments[1].endsWith(".json") &&
      !segments[1].includes("\\") &&
      !/[<>:"|?*]/u.test(segments[1]) &&
      !/[. ]$/u.test(segments[1]) &&
      !WINDOWS_RESERVED.test(segments[1]),
    `${label} is unsafe: ${String(path)}.`,
  );
  return { path, alias: path.toLowerCase() };
}

function validateStableReconstruction(value, expectedDigest) {
  assertExactKeys(
    value,
    [
      "apiVersion",
      "kind",
      "expectedParentDigest",
      "offlineCache",
      "canonicalGate",
      "externalHostBoundary",
    ],
    "worker stable reconstruction",
  );
  requireCondition(
    value.apiVersion === "swecircuit/release-review-stable-reconstruction/v1alpha1" &&
      value.kind === "ReleaseReviewStableReconstruction" &&
      DIGEST_PATTERN.test(value.expectedParentDigest) &&
      typeof value.externalHostBoundary === "string" &&
      value.externalHostBoundary.length > 0,
    "Worker stable-reconstruction identity mismatch.",
  );
  assertExactKeys(value.offlineCache, ["path", "provisioning"], "offline-cache declaration");
  requireCondition(
    isAbsolute(scalarPathText(value.offlineCache.path, "Offline-cache path")) &&
      value.offlineCache.provisioning === "external-host-untrusted-content-offline-only",
    "Offline-cache declaration mismatch.",
  );
  if (value.canonicalGate !== null) {
    assertExactKeys(
      value.canonicalGate,
      ["expectedReceiptDigest", "files"],
      "canonical-gate stable inputs",
    );
    requireCondition(
      DIGEST_PATTERN.test(value.canonicalGate.expectedReceiptDigest) &&
        Array.isArray(value.canonicalGate.files) &&
        value.canonicalGate.files.length === 3,
      "Canonical-gate stable inputs are incomplete.",
    );
    value.canonicalGate.files.forEach((file, index) =>
      validateInputFileBinding(file, `canonical-gate stable file ${index}`),
    );
    requireCondition(
      value.canonicalGate.files[0].digest === value.canonicalGate.expectedReceiptDigest,
      "Canonical-gate receipt does not match the explicit host digest.",
    );
  }
  requireCondition(
    runtimeDomainDigest(STABLE_RECONSTRUCTION_DOMAIN, value) === expectedDigest,
    "Worker stable-reconstruction digest mismatch.",
  );
  return value;
}

function validatePhaseAuthority(value, expectedDigest, expectedPhase) {
  assertExactKeys(
    value,
    ["apiVersion", "kind", "phase", "ownerExpectation", "handoffs"],
    "worker phase authority",
  );
  requireCondition(
    value.apiVersion === "swecircuit/release-review-phase-authority/v1alpha1" &&
      value.kind === "ReleaseReviewPhaseAuthority" &&
      value.phase === expectedPhase,
    "Worker phase-authority identity mismatch.",
  );
  const ownerRequired = expectedPhase === "approve" || expectedPhase === "verify";
  requireCondition(
    ownerRequired === (value.ownerExpectation !== null),
    "Worker phase owner authority mismatch.",
  );
  if (value.ownerExpectation !== null) {
    assertExactKeys(
      value.ownerExpectation,
      ["compilationDigest", "packageDigest"],
      "phase owner expectation",
    );
    requireCondition(
      DIGEST_PATTERN.test(value.ownerExpectation.compilationDigest) &&
        DIGEST_PATTERN.test(value.ownerExpectation.packageDigest),
      "Phase owner expectation is invalid.",
    );
  }
  requireCondition(
    Array.isArray(value.handoffs) &&
      (expectedPhase === "verify" ? value.handoffs.length > 0 : value.handoffs.length === 0),
    "Worker phase handoff authority mismatch.",
  );
  const aliases = new Set();
  for (const handoff of value.handoffs) {
    assertExactKeys(
      handoff,
      ["requestedPath", "path", "mediaType", "bytes", "digest"],
      "raw handoff phase authority",
    );
    const safe = safeAuthorityHandoffPath(handoff.requestedPath, "Raw handoff request path");
    requireCondition(!aliases.has(safe.alias), `Duplicate raw handoff alias: ${safe.path}.`);
    aliases.add(safe.alias);
    validateInputFileBinding(
      {
        path: handoff.path,
        mediaType: handoff.mediaType,
        bytes: handoff.bytes,
        digest: handoff.digest,
      },
      "raw handoff phase file",
    );
    requireCondition(
      handoff.path.endsWith(`/${safe.path}`) && handoff.mediaType === "application/json",
      `Raw handoff phase binding differs from its validated path: ${safe.path}.`,
    );
  }
  requireCondition(
    runtimeDomainDigest(PHASE_AUTHORITY_DOMAIN, value) === expectedDigest,
    "Worker phase-authority digest mismatch.",
  );
  return value;
}

async function validateWorkerInputFiles(stableReconstruction, phaseAuthority) {
  const files = [
    ...(stableReconstruction.canonicalGate?.files ?? []),
    ...phaseAuthority.handoffs.map(({ requestedPath: _requestedPath, ...file }) => file),
  ];
  for (const file of files) {
    const actual = await workerFileBinding(absolute(file.path), file.path);
    requireCondition(
      actual.bytes === file.bytes && actual.digest === file.digest,
      `Worker bound input changed: ${file.path}.`,
    );
  }
}
async function requireNoRuntimeAncestorSupply(root) {
  let current = dirname(await realpath(root));
  for (;;) {
    const supply = join(current, "node_modules");
    try {
      const stats = await lstat(supply);
      requireCondition(
        false,
        `Candidate runtime ancestor contains fallback package supply: ${supply} (${stats.isDirectory() ? "directory" : "entry"}).`,
      );
    } catch (error) {
      if (!error || typeof error !== "object" || error.code !== "ENOENT") {
        throw error;
      }
    }
    const parent = dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }
}

async function validateCandidateWorkerContext(
  expectedRole,
  expectedMode,
  expectedCandidate,
  executingScript = SCRIPT_PATH,
) {
  requireCondition(
    expectedRole === "harness" || expectedRole === "verifier",
    "Unknown candidate worker role.",
  );
  const contextPath = environmentSupply(WORKER_CONTEXT_ENV);
  const token = environmentSupply(WORKER_TOKEN_ENV);
  requireCondition(
    typeof contextPath === "string" && isAbsolute(contextPath),
    "Candidate worker requires an absolute parent context.",
  );
  requireCondition(
    typeof token === "string" && /^[0-9a-f]{64}$/u.test(token),
    "Candidate worker requires a parent invocation token.",
  );
  const contextStats = await lstat(contextPath);
  requireCondition(
    contextStats.isFile() && !contextStats.isSymbolicLink() && contextStats.nlink === 1,
    "Parent worker context is not one plain file.",
  );
  const context = parseCanonicalJson(await readFile(contextPath), "parent worker context").value;
  assertExactKeys(
    context,
    [
      "apiVersion",
      "kind",
      "role",
      "mode",
      "requestedMode",
      "phaseIndex",
      "phaseCount",
      "candidateCommit",
      "materializationRoot",
      "runtimeBindingPath",
      "runtimeBindingDigest",
      "stableReconstruction",
      "stableReconstructionDigest",
      "phaseAuthority",
      "phaseAuthorityDigest",
      "invocationDigest",
      "tokenDigest",
      "effectiveEnvironment",
    ],
    "parent worker context",
  );
  const phases = PHASE_PREFIXES[context.requestedMode];
  requireCondition(
    context.apiVersion === "swecircuit/release-review-worker/v1alpha1" &&
      context.kind === "ReleaseReviewWorkerContext" &&
      context.role === expectedRole &&
      context.mode === expectedMode &&
      Array.isArray(phases) &&
      Number.isSafeInteger(context.phaseIndex) &&
      context.phaseIndex >= 0 &&
      context.phaseIndex < phases.length &&
      context.phaseCount === phases.length &&
      phases[context.phaseIndex] === expectedMode &&
      context.candidateCommit === expectedCandidate &&
      DIGEST_PATTERN.test(context.stableReconstructionDigest) &&
      DIGEST_PATTERN.test(context.phaseAuthorityDigest) &&
      DIGEST_PATTERN.test(context.invocationDigest) &&
      context.tokenDigest === digest(Buffer.from(token, "utf8")),
    "Parent worker context identity mismatch.",
  );
  const effectiveEnvironment = validateEffectiveWorkerEnvironment(
    context.effectiveEnvironment,
  );
  validateStableReconstruction(
    context.stableReconstruction,
    context.stableReconstructionDigest,
  );
  validatePhaseAuthority(
    context.phaseAuthority,
    context.phaseAuthorityDigest,
    expectedMode,
  );
  requireCondition(
    (context.requestedMode === "paths") ===
      (context.stableReconstruction.canonicalGate === null),
    "Stable reconstruction does not match the requested phase prefix.",
  );
  requireCondition(
    (await realpath(context.materializationRoot)) === (await realpath(ROOT)),
    "Candidate worker is outside its parent materialization.",
  );
  requireCondition(
    isContainedPath(ROOT, context.runtimeBindingPath),
    "Runtime-binding input is outside the candidate materialization.",
  );
  await requireNoRuntimeAncestorSupply(ROOT);

  const runtimeBindingBytes = await readFile(context.runtimeBindingPath);
  const binding = parseCanonicalJson(runtimeBindingBytes, "runtime binding").value;
  verifyClosedRuntimeBinding(binding);
  requireCondition(
    binding.candidateCommit === expectedCandidate &&
      binding.runtimeBindingDigest === context.runtimeBindingDigest &&
      binding.platform.platform === process.platform &&
      binding.platform.architecture === process.arch &&
      binding.externalDeclarations.stableReconstructionDigest ===
        context.stableReconstructionDigest,
    "Candidate worker runtime identity mismatch.",
  );

  const expectedRuntimePath = absolute(
    candidateRunPaths(expectedCandidate).runtimeBinding,
  );
  requireCondition(
    (await realpath(context.runtimeBindingPath)) === (await realpath(expectedRuntimePath)),
    "Candidate worker received the wrong runtime-binding path.",
  );

  for (const [name, tooling] of Object.entries(binding.tooling)) {
    const actual = await workerFileBinding(absolute(tooling.path), tooling.path);
    requireCondition(
      actual.bytes === tooling.bytes && actual.digest === tooling.digest,
      `Candidate ${name} tooling bytes changed.`,
    );
  }
  const expectedTool =
    expectedRole === "verifier" ? binding.tooling.verifier : binding.tooling.harness;
  requireCondition(
    (await realpath(executingScript)) === (await realpath(absolute(expectedTool.path))),
    "Candidate worker entrypoint does not match its bound Git blob.",
  );

  for (const name of ["node", "npm", "git"]) {
    const expected = binding.toolchain[name];
    const actual = await workerFileBinding(expected.path);
    requireCondition(
      actual.bytes === expected.bytes && actual.digest === expected.digest,
      `Bound ${name} tool bytes changed.`,
    );
  }
  requireCondition(
    (await realpath(process.execPath)) === (await realpath(binding.toolchain.node.path)) &&
      process.version === binding.toolchain.node.version,
    "Candidate child Node identity mismatch.",
  );
  const typeScript = await workerFileBinding(
    absolute(binding.toolchain.typescript.path),
    binding.toolchain.typescript.path,
  );
  requireCondition(
    typeScript.bytes === binding.toolchain.typescript.bytes &&
      typeScript.digest === binding.toolchain.typescript.digest,
    "Candidate TypeScript entrypoint changed.",
  );

  const forbidden = new Set(["node_options", "node_path"]);
  for (const key of Object.keys(process.env)) {
    requireCondition(
      !forbidden.has(key.toLowerCase()),
      `Forbidden candidate worker environment key: ${key}.`,
    );
  }
  const npmConfiguration = await validateWorkerPrivateNpmConfiguration({
    candidateRoot: ROOT,
    cacheRoot: context.stableReconstruction.offlineCache.path,
    environment: process.env,
    environmentPolicy: binding.environmentPolicy,
  });
  requireCondition(
    process.env.GIT_CONFIG_NOSYSTEM === "1" &&
      process.env.GIT_TERMINAL_PROMPT === "0" &&
      binding.environmentPolicy.invocationTemporaryPaths ===
        INVOCATION_TEMPORARY_PATH_POLICY &&
      binding.environmentPolicy.workerEffectiveEnvironment ===
        "complete-case-insensitive-key-and-value-digest" &&
      JSON.stringify(binding.environmentPolicy.inherited) ===
        JSON.stringify(inheritedRuntimeEnvironment()),
    "Candidate worker environment policy mismatch.",
  );

  await validateWorkerInputFiles(
    context.stableReconstruction,
    context.phaseAuthority,
  );
  activeWorker = { context, binding, npmConfiguration, effectiveEnvironment };
  const candidateTree = loadCandidateTree(expectedCandidate);
  requireCondition(
    JSON.stringify(candidateTree.source) === JSON.stringify(binding.candidateSource),
    "Candidate source closure does not match runtime binding.",
  );
  const installed = await inspectRuntimeClosure(
    join(ROOT, "node_modules"),
    "Installed dependency supply",
    true,
  );
  requireCondition(
    JSON.stringify(installed) === JSON.stringify(binding.lockedSupply.installed),
    "Installed dependency closure does not match runtime binding.",
  );
  const generated = await inspectRuntimeClosure(
    join(ROOT, "dist"),
    "Generated runtime",
    false,
  );
  const { entrypoint: _entrypoint, ...expectedGenerated } =
    binding.generatedRuntime;
  requireCondition(
    JSON.stringify(generated) === JSON.stringify(expectedGenerated),
    "Generated runtime closure does not match runtime binding.",
  );
  await requireNoRuntimeAncestorSupply(ROOT);
  return { context, binding, effectiveEnvironment };
}

async function initializeCandidateWorker(
  expectedRole,
  expectedMode,
  expectedCandidate,
  executingScript = SCRIPT_PATH,
  runtimeRequired = true,
) {
  const validated = await validateCandidateWorkerContext(
    expectedRole,
    expectedMode,
    expectedCandidate,
    executingScript,
  );
  if (runtimeRequired) {
    specialistRuntime = await import(
      `${pathToFileURL(absolute(validated.binding.generatedRuntime.entrypoint)).href}?${validated.binding.runtimeBindingDigest}`
    );
    for (const name of [
      "compileAgentBlueprints",
      "renderSpecialistPackage",
      "verifySpecialistHandoff",
      "verifySpecialistPackage",
    ]) {
      requireCondition(
        typeof specialistRuntime[name] === "function",
        `Candidate runtime lacks required export: ${name}.`,
      );
    }
  }
  return { ...validated, specialistRuntime };
}

function installSpecialistRuntimeForTests(runtime) {
  requireCondition(
    activeWorker === null &&
      runtime &&
      ["compileAgentBlueprints", "renderSpecialistPackage", "verifySpecialistHandoff", "verifySpecialistPackage"].every(
        (name) => typeof runtime[name] === "function",
      ),
    "Invalid explicit specialist test runtime.",
  );
  specialistRuntime = runtime;
}

function runtimeFunction(name) {
  requireCondition(
    specialistRuntime && typeof specialistRuntime[name] === "function",
    `Specialist runtime was not authenticated before ${name}.`,
  );
  return specialistRuntime[name];
}

function compileAgentBlueprints(...arguments_) {
  return runtimeFunction("compileAgentBlueprints")(...arguments_);
}

function renderSpecialistPackage(...arguments_) {
  return runtimeFunction("renderSpecialistPackage")(...arguments_);
}

function verifySpecialistHandoff(...arguments_) {
  return runtimeFunction("verifySpecialistHandoff")(...arguments_);
}

function verifySpecialistPackage(...arguments_) {
  return runtimeFunction("verifySpecialistPackage")(...arguments_);
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
    gateEvidenceRoot: `${inputs}/canonical-gate`,
    gateReceiptSnapshot: `${inputs}/canonical-gate/canonical-gate-receipt.json`,
    gateStdoutSnapshot: `${inputs}/canonical-gate/canonical-gate.stdout.log`,
    gateStderrSnapshot: `${inputs}/canonical-gate/canonical-gate.stderr.log`,
    runtimeBinding: `${inputs}/runtime-binding.json`,
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
    parentExecutions: `${root}/parent-executions`,
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

function isCorrectionNavigationDuplicate(path) {
  const correction = correctionRevisionFromPath(path);
  if (correction === null || path === correction.root) {
    return false;
  }
  const relativePath = path.slice(correction.root.length + 1);
  return (
    relativePath.startsWith("inputs/") ||
    CORRECTION_NAVIGATION_FILES.includes(relativePath)
  );
}

function discoverCorrectionEvidenceSpecs(candidateTreeOrPaths) {
  const paths = Array.isArray(candidateTreeOrPaths)
    ? candidateTreeOrPaths
    : candidateTreeOrPaths.paths;
  requireCondition(Array.isArray(paths), "Candidate tree paths are unavailable.");
  const discovered = new Map();
  for (const path of paths) {
    const parsed = correctionRevisionFromPath(path);
    if (parsed === null) {
      continue;
    }
    const prior = discovered.get(parsed.revision);
    requireCondition(
      prior === undefined || prior.root === parsed.root,
      `Candidate tree contains duplicate correction revision ${parsed.revision}.`,
    );
    const record = prior ?? { root: parsed.root, markers: new Set() };
    if (path.startsWith(`${parsed.root}/`)) {
      const relativePath = path.slice(parsed.root.length + 1);
      if (CORRECTION_PACKAGE_MARKERS.includes(relativePath)) {
        record.markers.add(relativePath);
      }
    }
    discovered.set(parsed.revision, record);
  }
  const roots = new Map();
  for (const [revision, record] of discovered) {
    if (record.markers.size === 0) {
      continue;
    }
    requireCondition(
      record.markers.size === CORRECTION_PACKAGE_MARKERS.length,
      `Correction revision ${revision} has an incomplete package marker set.`,
    );
    roots.set(revision, record.root);
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
      if (path.includes("/package/") || isCorrectionNavigationDuplicate(path)) {
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
function gitOutput(args, options = {}) {
  return execFileSync(activeWorker?.binding.toolchain.git.path ?? "git", args, {
    cwd: ROOT,
    encoding: null,
    env: activeWorker ? process.env : undefined,
    input: options.input,
    maxBuffer: 134_217_728,
  });
}

function gitResult(args) {
  const result = spawnSync(activeWorker?.binding.toolchain.git.path ?? "git", args, {
    cwd: ROOT,
    encoding: null,
    env: activeWorker ? process.env : undefined,
    maxBuffer: 134_217_728,
    windowsHide: true,
  });
  if (result.error) {
    throw result.error;
  }
  return result;
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

function parseGitBlobBatch(objectIds, output) {
  requireCondition(Array.isArray(objectIds) && objectIds.length > 0, "Git blob batch is empty.");
  requireCondition(Buffer.isBuffer(output), "Git blob batch output must be raw bytes.");
  const requested = new Set();
  const blobs = new Map();
  let cursor = 0;

  for (const expectedObjectId of objectIds) {
    requireCondition(
      typeof expectedObjectId === "string" && CANDIDATE_PATTERN.test(expectedObjectId),
      "Git blob batch contains an invalid requested object ID.",
    );
    requireCondition(!requested.has(expectedObjectId), "Git blob batch contains a duplicate request.");
    requested.add(expectedObjectId);

    const headerEnd = output.indexOf(10, cursor);
    requireCondition(headerEnd >= cursor, "Git blob batch output is missing a header terminator.");
    const headerBytes = output.subarray(cursor, headerEnd);
    requireCondition(
      headerBytes.every((byte) => byte <= 0x7f),
      "Git blob batch output contains a non-ASCII header.",
    );
    const match = /^([0-9a-f]{40}) blob (0|[1-9][0-9]*)$/.exec(headerBytes.toString("ascii"));
    requireCondition(match !== null, "Git blob batch output contains a malformed header.");
    requireCondition(match[1] === expectedObjectId, "Git blob batch returned an unexpected object.");
    const size = Number(match[2]);
    requireCondition(Number.isSafeInteger(size), "Git blob batch returned an unsafe object size.");
    const contentStart = headerEnd + 1;
    const contentEnd = contentStart + size;
    requireCondition(
      contentEnd < output.byteLength,
      "Git blob batch output is truncated before the object delimiter.",
    );
    requireCondition(output[contentEnd] === 10, "Git blob batch output has an invalid object delimiter.");
    blobs.set(expectedObjectId, Buffer.from(output.subarray(contentStart, contentEnd)));
    cursor = contentEnd + 1;
  }

  requireCondition(cursor === output.byteLength, "Git blob batch output contains trailing bytes.");
  return blobs;
}

function candidateBlobBytes(objectIds, gitExecutor = gitOutput) {
  const uniqueObjectIds = [...new Set(objectIds)].sort(compareOrdinal);
  requireCondition(uniqueObjectIds.length > 0, "Candidate tree has no blobs.");
  const output = gitExecutor(["cat-file", "--batch"], {
    input: Buffer.from(`${uniqueObjectIds.join("\n")}\n`, "ascii"),
  });
  return parseGitBlobBatch(uniqueObjectIds, output);
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

function loadCandidateTree(candidate, gitExecutor = gitOutput) {
  requireCondition(
    typeof candidate === "string" && CANDIDATE_PATTERN.test(candidate),
    "Candidate commit must be an exact 40-character lowercase commit ID.",
  );
  const cached = gitExecutor === gitOutput ? CANDIDATE_TREE_CACHE.get(candidate) : undefined;
  if (cached !== undefined) {
    return cached;
  }

  const commit = Buffer.from(
    gitExecutor(["rev-parse", "--verify", `${candidate}^{commit}`]),
  )
    .toString("ascii")
    .trim();
  requireCondition(commit === candidate, "Candidate commit identity mismatch.");

  const tree = Buffer.from(gitExecutor(["rev-parse", "--verify", `${candidate}^{tree}`]))
    .toString("ascii")
    .trim();
  requireCondition(CANDIDATE_PATTERN.test(tree), "Candidate tree identity is invalid.");

  const entries = gitNulRecords(
    gitExecutor(["ls-tree", "-rz", "--full-tree", candidate]),
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
    };
  });
  entries.sort((left, right) => Buffer.compare(left.pathBytes, right.pathBytes));
  requireCondition(entries.length > 0, "Candidate tree is empty.");
  const blobs = candidateBlobBytes(
    entries.map((entry) => entry.objectId),
    gitExecutor,
  );
  for (const entry of entries) {
    entry.bytes = Buffer.from(blobs.get(entry.objectId));
  }

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
  const candidateTree = createCandidateTreeView(commit, tree, entries, {
    commit,
    tree,
    files: entries.length,
    bytes: totalBytes,
    digest: `sha256:${hash.digest("hex")}`,
  });
  if (gitExecutor === gitOutput) {
    CANDIDATE_TREE_CACHE.set(candidate, candidateTree);
  }
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
  const parent = authenticateToolBytes(
    candidateTree,
    PARENT_REPOSITORY_PATH,
    await readFile(absolute(PARENT_REPOSITORY_PATH)),
    "Release-review parent",
  );
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
  return { candidateCommit: candidateTree.commit, parent, harness, verifier };
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

function requireVersionableEvidencePaths(paths) {
  for (const path of Object.values(paths)) {
    const result = gitResult(["check-ignore", "--quiet", "--no-index", "--", path]);
    requireCondition(
      result.status === 0 || result.status === 1,
      `Unable to inspect Git ignore policy for canonical-gate evidence: ${path}.`,
    );
    requireCondition(
      result.status === 1,
      `Required canonical-gate evidence is ignored by Git: ${path}.`,
    );
  }
}

function requireNoWorkingTreeOnlySources(paths, gatePaths, untrackedPaths) {
  const allowedPrefix = `${paths.root}/`;
  const allowedGatePaths = new Set(Object.values(gatePaths));
  for (const path of untrackedPaths) {
    requireCondition(
      path.startsWith(allowedPrefix) || allowedGatePaths.has(path),
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
  requireNoWorkingTreeOnlySources(paths, gateEvidencePaths(candidate), untracked);
}

function validateBoundExternalFile(value, expectedPath, label, bytes) {
  assertExactKeys(value, ["path", "mediaType", "bytes", "digest"], label);
  requireCondition(value.path === expectedPath, `${label} path mismatch.`);
  requireCondition(
    value.mediaType === "application/octet-stream",
    `${label} media type mismatch.`,
  );
  requireCondition(Number.isSafeInteger(value.bytes) && value.bytes >= 0, `${label} byte count invalid.`);
  requireCondition(DIGEST_PATTERN.test(value.digest), `${label} digest invalid.`);
  requireCondition(
    bytes.byteLength === value.bytes && digest(bytes) === value.digest,
    `${label} raw external-evidence binding mismatch.`,
  );
}

function externalEvidenceBinding(originalPath, snapshotPath, mediaType, bytes) {
  return {
    originalPath,
    snapshotPath,
    mediaType,
    bytes: bytes.byteLength,
    digest: digest(bytes),
  };
}

function capturedGateEvidencePaths(paths) {
  return Object.freeze({
    receipt: paths.gateReceiptSnapshot,
    stdout: paths.gateStdoutSnapshot,
    stderr: paths.gateStderrSnapshot,
  });
}

function validateAuthorityFileBinding(value, label, versioned = false) {
  assertExactKeys(
    value,
    versioned ? ["path", "bytes", "digest", "nlink", "version"] : ["path", "bytes", "digest", "nlink"],
    label,
  );
  requireCondition(
    typeof value.path === "string" && isAbsolute(value.path),
    `${label} path is not absolute.`,
  );
  requireCondition(
    Number.isSafeInteger(value.bytes) && value.bytes >= 0,
    `${label} byte count is invalid.`,
  );
  requireCondition(DIGEST_PATTERN.test(value.digest), `${label} digest is invalid.`);
  requireCondition(
    Number.isSafeInteger(value.nlink) && value.nlink >= 1,
    `${label} link count is invalid.`,
  );
  if (versioned) {
    requireCondition(
      typeof value.version === "string" && value.version.length > 0,
      `${label} version is invalid.`,
    );
  }
}

function validateNpmLauncherBinding(value, label) {
  assertExactKeys(
    value,
    [
      "path",
      "bytes",
      "digest",
      "nlink",
      "commandPath",
      "commandType",
      "commandLink",
      "version",
    ],
    label,
  );
  validateAuthorityFileBinding(
    {
      path: value.path,
      bytes: value.bytes,
      digest: value.digest,
      nlink: value.nlink,
      version: value.version,
    },
    label,
    true,
  );
  requireCondition(isAbsolute(value.commandPath), `${label} command path is not absolute.`);
  const commandStats = lstatSync(value.commandPath);
  const commandType = commandStats.isSymbolicLink() ? "symbolic-link" : "regular-file";
  const commandLink = commandStats.isSymbolicLink() ? readlinkSync(value.commandPath) : null;
  const targetPath = realpathSync.native(value.commandPath);
  const targetBytes = readFileSync(targetPath);
  requireCondition(
    (commandStats.isFile() || commandStats.isSymbolicLink()) &&
      value.commandType === commandType &&
      value.commandLink === commandLink &&
      value.path === targetPath &&
      value.bytes === targetBytes.byteLength &&
      value.digest === digest(targetBytes),
    `${label} command-to-target binding changed.`,
  );
}

function validateToolchainSnapshot(value, label) {
  assertExactKeys(
    value,
    ["node", "npmLauncher", "npmCli", "git", "shell", "typescript"],
    label,
  );
  validateAuthorityFileBinding(value.node, `${label} Node`, true);
  validateNpmLauncherBinding(value.npmLauncher, `${label} npm launcher`);
  validateAuthorityFileBinding(value.npmCli, `${label} npm CLI`);
  validateAuthorityFileBinding(value.git, `${label} Git`, true);
  validateAuthorityFileBinding(value.shell, `${label} shell`);
  validateAuthorityFileBinding(value.typescript, `${label} TypeScript`, true);
}

function validateInlineBytesBinding(value, label) {
  assertExactKeys(
    value,
    ["mediaType", "encoding", "bytes", "digest", "data"],
    label,
  );
  requireCondition(
    value.mediaType === "application/octet-stream" && value.encoding === "base64",
    `${label} encoding is invalid.`,
  );
  requireCondition(
    Number.isSafeInteger(value.bytes) && value.bytes >= 0 && DIGEST_PATTERN.test(value.digest),
    `${label} identity is invalid.`,
  );
  requireCondition(
    typeof value.data === "string" &&
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(value.data),
    `${label} data is not canonical base64.`,
  );
  const bytes = Buffer.from(value.data, "base64");
  requireCondition(
    bytes.toString("base64") === value.data &&
      bytes.byteLength === value.bytes &&
      digest(bytes) === value.digest,
    `${label} raw-byte binding mismatch.`,
  );
}

function detectReleaseReviewLibc(platform = process.platform, report = null) {
  if (platform !== "linux") {
    return null;
  }
  const runtimeReport = report ?? process.report?.getReport?.();
  const glibcVersion = runtimeReport?.header?.glibcVersionRuntime;
  if (typeof glibcVersion === "string" && glibcVersion.length > 0) {
    return "glibc";
  }
  if (
    Array.isArray(runtimeReport?.sharedObjects) &&
    runtimeReport.sharedObjects.some((path) => /(?:^|[/\\])(?:ld-)?musl|libc\.musl/iu.test(path))
  ) {
    return "musl";
  }
  throw new Error("Unable to determine the release-review Linux runtime libc.");
}

function releaseReviewRuntimeIdentity(
  platform = process.platform,
  architecture = process.arch,
  report = null,
) {
  return Object.freeze({
    platform,
    architecture,
    libc: detectReleaseReviewLibc(platform, report),
  });
}

function packageAppliesForReceipt(entry, platform, architecture, libc) {
  const matches = (rules, value) => {
    if (!Array.isArray(rules) || rules.length === 0) {
      return true;
    }
    const denied = rules.filter((item) => item.startsWith("!")).map((item) => item.slice(1));
    if (denied.includes(value)) {
      return false;
    }
    const allowed = rules.filter((item) => !item.startsWith("!"));
    return allowed.length === 0 || allowed.includes(value);
  };
  return (
    matches(entry.os, platform) &&
    matches(entry.cpu, architecture) &&
    matches(entry.libc, libc)
  );
}

function expectedCandidateLockReceipt(candidateTree, platform, architecture, libc) {
  const lockFile = candidateTree.file("package-lock.json");
  const lock = JSON.parse(decodeUtf8(lockFile.bytes, "candidate package-lock.json"));
  requireCondition(
    Number.isInteger(lock.lockfileVersion) && lock.lockfileVersion >= 2 && lock.packages,
    "Candidate lockfile lacks a supported packages inventory.",
  );
  const packages = [];
  for (const [path, entry] of Object.entries(lock.packages)) {
    if (path === "") {
      continue;
    }
    requireCondition(
      path.startsWith("node_modules/") &&
        entry &&
        typeof entry === "object" &&
        entry.link !== true &&
        typeof entry.version === "string" &&
        typeof entry.resolved === "string" &&
        typeof entry.integrity === "string",
      `Candidate lock package is invalid: ${path}.`,
    );
    const resolvedUrl = new URL(entry.resolved);
    requireCondition(
      resolvedUrl.protocol === "https:" &&
        resolvedUrl.hostname === "registry.npmjs.org" &&
        resolvedUrl.pathname.endsWith(".tgz") &&
        /^sha(?:256|384|512)-[A-Za-z0-9+/]+={0,2}$/u.test(entry.integrity),
      `Candidate lock package authority is invalid: ${path}.`,
    );
    packages.push({
      path,
      version: entry.version,
      resolved: entry.resolved,
      integrity: entry.integrity,
      optional: entry.optional === true,
      applies: packageAppliesForReceipt(entry, platform, architecture, libc),
    });
  }
  packages.sort((left, right) => compareUtf8Ordinal(left.path, right.path));
  const hash = createHash("sha256");
  updateGateFrame(hash, Buffer.from(CANDIDATE_LOCK_DIGEST_DOMAIN, "utf8"));
  for (const entry of packages) {
    updateGateFrame(hash, Buffer.from(JSON.stringify(entry), "utf8"));
  }
  return {
    path: "package-lock.json",
    bytes: lockFile.bytes.byteLength,
    digest: digest(lockFile.bytes),
    lockfileVersion: lock.lockfileVersion,
    packages: packages.length,
    platform,
    architecture,
    libc,
    inventoryDigest: `sha256:${hash.digest("hex")}`,
  };
}

function validateDependencyClosure(value, label) {
  assertExactKeys(
    value,
    ["files", "directories", "links", "bytes", "digest"],
    label,
  );
  requireCondition(
    Number.isSafeInteger(value.files) &&
      value.files > 0 &&
      Number.isSafeInteger(value.directories) &&
      value.directories > 0 &&
      Number.isSafeInteger(value.links) &&
      value.links >= 0 &&
      Number.isSafeInteger(value.bytes) &&
      value.bytes > 0 &&
      DIGEST_PATTERN.test(value.digest),
    `${label} is invalid.`,
  );
}

function runtimeAncestorSupplyPaths(root) {
  const paths = [];
  let current = dirname(resolve(root));
  for (;;) {
    paths.push(join(current, "node_modules"));
    const parent = dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }
  return paths;
}

function validateRuntimeAncestorSnapshot(value, expectedPaths, label) {
  assertExactKeys(value, ["checkedPaths", "absent", "found"], label);
  assertExactStringArray(value.checkedPaths, expectedPaths, `${label} checked paths`);
  requireCondition(
    value.absent === true && value.found === null,
    `${label} retained fallback package supply.`,
  );
}

function validateCandidateDependencies(value, candidateTree, environment, toolchain, runtime) {
  assertExactKeys(
    value,
    [
      "strategy",
      "ready",
      "setupError",
      "root",
      "path",
      "initialState",
      "packageManifest",
      "lock",
      "command",
      "result",
      "stdout",
      "stderr",
      "directDependenciesContained",
      "directDependencies",
      "typeScriptEntrypoint",
      "ancestorSupply",
      "closure",
      "cleanup",
    ],
    "canonical-gate candidate dependency authority",
  );
  const expectedDependencyRoot = join(environment.effective.GIT_WORK_TREE, "node_modules");
  const expectedTypeScriptEntrypoint = join(
    expectedDependencyRoot,
    "typescript",
    "bin",
    "tsc",
  );
  requireCondition(
    value.strategy === "candidate-private-exact-lock-offline-npm-ci" &&
      value.ready === true &&
      value.setupError === null &&
      value.root === expectedDependencyRoot &&
      value.path === "node_modules" &&
      value.initialState === "absent" &&
      value.directDependenciesContained === true &&
      value.typeScriptEntrypoint === expectedTypeScriptEntrypoint &&
      toolchain.before.typescript.path === expectedTypeScriptEntrypoint &&
      toolchain.after.typescript.path === expectedTypeScriptEntrypoint,
    "Canonical-gate candidate dependency policy is invalid.",
  );

  const manifest = candidateTree.file("package.json");
  const manifestValue = JSON.parse(decodeUtf8(manifest.bytes, "candidate package.json"));
  assertExactKeys(
    value.packageManifest,
    ["path", "bytes", "digest"],
    "canonical-gate package manifest binding",
  );
  requireCondition(
    value.packageManifest.path === "package.json" &&
      value.packageManifest.bytes === manifest.bytes.byteLength &&
      value.packageManifest.digest === digest(manifest.bytes),
    "Canonical-gate package manifest binding mismatch.",
  );
  assertExactKeys(
    value.lock,
    [
      "path",
      "bytes",
      "digest",
      "lockfileVersion",
      "packages",
      "platform",
      "architecture",
      "libc",
      "inventoryDigest",
    ],
    "canonical-gate candidate lock binding",
  );
  requireCondition(
    JSON.stringify(value.lock) ===
      JSON.stringify(
        expectedCandidateLockReceipt(
          candidateTree,
          runtime.platform,
          runtime.architecture,
          runtime.libc,
        ),
      ),
    "Canonical-gate candidate lock binding does not match the independent review runtime.",
  );
  const lockValue = JSON.parse(
    decodeUtf8(candidateTree.file("package-lock.json").bytes, "candidate package-lock.json"),
  );
  const expectedTypeScriptVersion = lockValue.packages?.["node_modules/typescript"]?.version;
  requireCondition(
    typeof expectedTypeScriptVersion === "string" &&
      toolchain.before.typescript.version === `Version ${expectedTypeScriptVersion}` &&
      toolchain.after.typescript.version === `Version ${expectedTypeScriptVersion}`,
    "Canonical-gate TypeScript version does not match the exact candidate lock.",
  );

  assertExactKeys(
    value.command,
    ["executable", "arguments", "canonical"],
    "canonical-gate dependency install command",
  );
  const installArguments = [
    "ci",
    "--offline",
    "--ignore-scripts",
    "--no-audit",
    "--no-fund",
    "--cache",
    environment.npm.cache.path,
  ];
  const authenticatedInstallCommand =
    value.command.executable === toolchain.before.node.path &&
    JSON.stringify(value.command.arguments) ===
      JSON.stringify([toolchain.before.npmCli.path, ...installArguments]);
  requireCondition(
    authenticatedInstallCommand &&
      value.command.canonical ===
        "npm ci --offline --ignore-scripts --no-audit --no-fund",
    "Canonical-gate dependency install command mismatch.",
  );
  assertExactKeys(
    value.result,
    ["attempted", "exitCode", "signal", "spawnError"],
    "canonical-gate dependency install result",
  );
  requireCondition(
    value.result.attempted === true &&
      value.result.exitCode === 0 &&
      value.result.signal === null &&
      value.result.spawnError === null,
    "Canonical-gate dependency installation did not pass.",
  );
  validateInlineBytesBinding(value.stdout, "canonical-gate dependency install stdout");
  validateInlineBytesBinding(value.stderr, "canonical-gate dependency install stderr");
  requireCondition(
    Array.isArray(value.directDependencies) &&
      value.directDependencies.length ===
        Object.keys(manifestValue.dependencies ?? {}).length,
    "Canonical-gate direct dependency evidence is incomplete.",
  );
  const directDependencyNames = [];
  for (const entry of value.directDependencies) {
    assertExactKeys(entry, ["name", "path"], "canonical-gate direct dependency");
    requireCondition(
      typeof entry.name === "string" &&
        typeof entry.path === "string" &&
        entry.path.length > 0 &&
        !isAbsolute(entry.path) &&
        entry.path !== ".." &&
        !entry.path.startsWith("../") &&
        !entry.path.includes("\\"),
      "Canonical-gate direct dependency path is invalid.",
    );
    directDependencyNames.push(entry.name);
  }
  requireCondition(
    JSON.stringify(directDependencyNames) ===
      JSON.stringify(Object.keys(manifestValue.dependencies ?? {}).sort(compareOrdinal)),
    "Canonical-gate direct dependency names mismatch.",
  );

  assertExactKeys(
    value.ancestorSupply,
    ["before", "after", "inspectionError"],
    "canonical-gate ancestor package supply",
  );
  const expectedAncestorPaths = runtimeAncestorSupplyPaths(environment.effective.GIT_WORK_TREE);
  validateRuntimeAncestorSnapshot(
    value.ancestorSupply.before,
    expectedAncestorPaths,
    "canonical-gate ancestor package supply before",
  );
  validateRuntimeAncestorSnapshot(
    value.ancestorSupply.after,
    expectedAncestorPaths,
    "canonical-gate ancestor package supply after",
  );
  requireCondition(
    value.ancestorSupply.inspectionError === null,
    "Canonical-gate ancestor package supply inspection failed.",
  );

  assertExactKeys(
    value.closure,
    ["before", "after", "inspectionError"],
    "canonical-gate candidate dependency closure",
  );
  validateDependencyClosure(
    value.closure.before,
    "canonical-gate candidate dependency closure before",
  );
  validateDependencyClosure(
    value.closure.after,
    "canonical-gate candidate dependency closure after",
  );
  requireCondition(
    JSON.stringify(value.closure.before) === JSON.stringify(value.closure.after) &&
      value.closure.inspectionError === null,
    "Canonical-gate candidate dependency closure changed.",
  );
  assertExactKeys(
    value.cleanup,
    ["attempted", "removed", "absentAfter", "error"],
    "canonical-gate candidate dependency cleanup",
  );
  requireCondition(
    value.cleanup.attempted === true &&
      value.cleanup.removed === true &&
      value.cleanup.absentAfter === true &&
      value.cleanup.error === null,
    "Canonical-gate candidate dependency cleanup failed.",
  );
}

function validateExecutionAuthority(value, command, candidateTree) {
  assertExactKeys(
    value,
    ["environment", "runtime", "toolchain", "candidateDependencies"],
    "canonical-gate execution authority",
  );
  const independentRuntime = releaseReviewRuntimeIdentity();
  assertExactKeys(
    value.runtime,
    ["platform", "architecture", "libc"],
    "canonical-gate runtime authority",
  );
  requireCondition(
    JSON.stringify(value.runtime) === JSON.stringify(independentRuntime),
    "Canonical-gate runtime differs from the independent same-host review runtime.",
  );
  assertExactKeys(
    value.environment,
    ["apiVersion", "effective", "policy", "npm"],
    "canonical-gate environment authority",
  );
  requireCondition(
    value.environment.apiVersion === "swecircuit/release-gate-environment/v1alpha1",
    "Canonical-gate environment authority version mismatch.",
  );
  assertExactKeys(
    value.environment.policy,
    [
      "allowlist",
      "gitConfiguration",
      "gitPrompt",
      "nodeOptions",
      "nodePath",
      "npmNetwork",
      "npmLifecycleScripts",
      "npmUserConfig",
      "npmGlobalConfig",
      "pathPolicy",
      "temporaryPaths",
    ],
    "canonical-gate environment policy",
  );
  requireCondition(
    value.environment.policy.allowlist === "exact-effective-map" &&
      value.environment.policy.gitConfiguration === "system-and-global-disabled" &&
      value.environment.policy.gitPrompt === "disabled" &&
      value.environment.policy.nodeOptions === "absent" &&
      value.environment.policy.nodePath === "absent" &&
      value.environment.policy.npmNetwork === "offline" &&
      value.environment.policy.npmLifecycleScripts === "disabled" &&
      value.environment.policy.npmUserConfig === "operation-private-empty-file" &&
      value.environment.policy.npmGlobalConfig === "operation-private-empty-file" &&
      value.environment.policy.pathPolicy === "closed-tool-directories" &&
      value.environment.policy.temporaryPaths === "operation-private",
    "Canonical-gate environment policy is not closed.",
  );

  assertExactKeys(
    value.environment.npm,
    ["cache", "userConfig", "globalConfig"],
    "canonical-gate npm authority",
  );
  assertExactKeys(
    value.environment.npm.cache,
    ["path", "provisioning"],
    "canonical-gate npm cache authority",
  );
  requireCondition(
    typeof value.environment.npm.cache.path === "string" &&
      isAbsolute(value.environment.npm.cache.path) &&
      value.environment.npm.cache.provisioning ===
        "external-host-untrusted-content-offline-only",
    "Canonical-gate npm cache authority is invalid.",
  );
  validateAuthorityFileBinding(
    value.environment.npm.userConfig,
    "canonical-gate npm user config",
  );
  validateAuthorityFileBinding(
    value.environment.npm.globalConfig,
    "canonical-gate npm global config",
  );
  requireCondition(
    value.environment.npm.userConfig.bytes === 0 &&
      value.environment.npm.userConfig.digest === EMPTY_FILE_DIGEST &&
      value.environment.npm.userConfig.nlink === 1 &&
      value.environment.npm.globalConfig.bytes === 0 &&
      value.environment.npm.globalConfig.digest === EMPTY_FILE_DIGEST &&
      value.environment.npm.globalConfig.nlink === 1,
    "Canonical-gate npm configuration is not two empty unlinked files.",
  );

  assertExactKeys(
    value.toolchain,
    ["before", "after", "inspectionError"],
    "canonical-gate toolchain authority",
  );
  validateToolchainSnapshot(value.toolchain.before, "canonical-gate toolchain before");
  validateToolchainSnapshot(value.toolchain.after, "canonical-gate toolchain after");
  validateCandidateDependencies(
    value.candidateDependencies,
    candidateTree,
    value.environment,
    value.toolchain,
    independentRuntime,
  );
  requireCondition(
    JSON.stringify(value.toolchain.before) === JSON.stringify(value.toolchain.after) &&
      value.toolchain.inspectionError === null,
    "Canonical-gate toolchain changed during execution.",
  );

  const effective = value.environment.effective;
  requireCondition(
    effective !== null && typeof effective === "object" && !Array.isArray(effective),
    "Canonical-gate effective environment is invalid.",
  );
  const baseKeys = [
    "GIT_CEILING_DIRECTORIES",
    "GIT_CONFIG_GLOBAL",
    "GIT_CONFIG_NOSYSTEM",
    "GIT_DIR",
    "GIT_INDEX_FILE",
    "GIT_OPTIONAL_LOCKS",
    "GIT_TERMINAL_PROMPT",
    "GIT_WORK_TREE",
    "HOME",
    "LANG",
    "LC_ALL",
    "NO_COLOR",
    "PATH",
    "TEMP",
    "TMP",
    "TMPDIR",
    "npm_config_audit",
    "npm_config_cache",
    "npm_config_color",
    "npm_config_fund",
    "npm_config_globalconfig",
    "npm_config_ignore_scripts",
    "npm_config_loglevel",
    "npm_config_offline",
    "npm_config_progress",
    "npm_config_script_shell",
    "npm_config_update_notifier",
    "npm_config_userconfig",
    "npm_config_yes",
  ];
  const windowsKeys = [
    "APPDATA",
    "COMSPEC",
    "LOCALAPPDATA",
    "PATHEXT",
    "SYSTEMROOT",
    "USERPROFILE",
    "WINDIR",
  ];
  const isWindowsReceipt = Object.hasOwn(effective, "COMSPEC");
  const expectedKeys = [...baseKeys, ...(isWindowsReceipt ? windowsKeys : [])].sort(compareOrdinal);
  assertExactStringArray(Object.keys(effective), expectedKeys, "canonical-gate effective environment keys");
  requireCondition(
    Object.values(effective).every(
      (entry) => typeof entry === "string" && !/[\u0000-\u001f\u007f]/u.test(entry),
    ),
    "Canonical-gate effective environment contains an unsafe value.",
  );
  requireCondition(
    !Object.hasOwn(effective, "NODE_OPTIONS") &&
      !Object.hasOwn(effective, "NODE_PATH") &&
      !Object.hasOwn(effective, "npm_config_registry") &&
      effective.GIT_CONFIG_NOSYSTEM === "1" &&
      effective.GIT_TERMINAL_PROMPT === "0" &&
      effective.npm_config_offline === "true" &&
      effective.npm_config_ignore_scripts === "true",
    "Canonical-gate effective environment retained undeclared authority.",
  );
  const boundSupplyChecks = {
    npmCache: effective.npm_config_cache === value.environment.npm.cache.path,
    npmUserConfig: effective.npm_config_userconfig === value.environment.npm.userConfig.path,
    npmGlobalConfig:
      effective.npm_config_globalconfig === value.environment.npm.globalConfig.path,
    npmScriptShell: effective.npm_config_script_shell === value.toolchain.before.shell.path,
  };
  const mismatchedSupplies = Object.entries(boundSupplyChecks)
    .filter(([, matches]) => !matches)
    .map(([name]) => name);
  requireCondition(
    mismatchedSupplies.length === 0,
    `Canonical-gate effective environment does not match its bound supplies: ${mismatchedSupplies.join(", ")}.`,
  );
  const expectedPath = [
    join(effective.GIT_WORK_TREE, "node_modules", ".bin"),
    dirname(value.toolchain.before.npmLauncher.commandPath),
    dirname(value.toolchain.before.node.path),
    dirname(value.toolchain.before.git.path),
    dirname(value.toolchain.before.shell.path),
  ]
    .filter((entry, index, entries) => entries.indexOf(entry) === index)
    .join(delimiter);
  requireCondition(effective.PATH === expectedPath, "Canonical-gate PATH is not closed.");

  const authenticatedCommand =
    command.executable === value.toolchain.before.node.path &&
    JSON.stringify(command.arguments) ===
      JSON.stringify([value.toolchain.before.npmCli.path, "run", "verify"]) &&
    command.canonical === "node npm-cli.js run verify";
  requireCondition(authenticatedCommand, "Canonical-gate command mismatch.");
}

async function validateGateReceipt(
  candidate,
  candidateTree = loadCandidateTree(candidate),
  readPaths = gateEvidencePaths(candidate),
  expectedReceiptDigest = null,
) {
  const originalPaths = gateEvidencePaths(candidate);
  requireVersionableEvidencePaths(originalPaths);
  requireBytePreservingEvidencePaths(candidate, originalPaths);
  for (const path of Object.values(originalPaths)) {
    requireCondition(
      !candidateTree.has(path),
      `Post-commit canonical-gate evidence must not masquerade as candidate source: ${path}.`,
    );
  }
  const parsed = await readCanonicalJson(readPaths.receipt);
  if (expectedReceiptDigest !== null) {
    requireCondition(
      DIGEST_PATTERN.test(expectedReceiptDigest) &&
        digest(parsed.bytes) === expectedReceiptDigest,
      "Canonical-gate receipt differs from the explicit host digest.",
    );
  }
  const stdoutBytes = await readFile(absolute(readPaths.stdout));
  const stderrBytes = await readFile(absolute(readPaths.stderr));
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
      "gitContext",
      "command",
      "executionAuthority",
      "operationError",
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
    receipt.apiVersion === "swecircuit/release-gate/v1alpha4" &&
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
    receipt.gitContext,
    [
      "strategy",
      "headBefore",
      "headAfter",
      "trackedStateBefore",
      "trackedStateAfter",
      "inspectionError",
      "cleanupError",
    ],
    "canonical-gate Git context binding",
  );
  requireCondition(
    receipt.gitContext.strategy === GIT_CONTEXT_STRATEGY &&
      receipt.gitContext.headBefore === candidate &&
      receipt.gitContext.headAfter === candidate &&
      receipt.gitContext.trackedStateBefore === "clean" &&
      receipt.gitContext.trackedStateAfter === "clean" &&
      receipt.gitContext.inspectionError === null &&
      receipt.gitContext.cleanupError === null,
    "Canonical gate did not preserve a clean disposable candidate Git context.",
  );
  assertExactKeys(
    receipt.command,
    ["executable", "arguments", "canonical"],
    "canonical-gate command",
  );
  validateExecutionAuthority(receipt.executionAuthority, receipt.command, candidateTree);
  requireCondition(
    receipt.operationError === null &&
      receipt.result === "pass" &&
      receipt.exitCode === 0 &&
      receipt.signal === null &&
      receipt.spawnError === null,
    "Canonical gate did not pass cleanly.",
  );
  validateBoundExternalFile(
    receipt.stdout,
    originalPaths.stdout,
    "canonical-gate stdout",
    stdoutBytes,
  );
  validateBoundExternalFile(
    receipt.stderr,
    originalPaths.stderr,
    "canonical-gate stderr",
    stderrBytes,
  );
  return {
    paths: originalPaths,
    readPaths,
    receipt,
    receiptBytes: parsed.bytes,
    stdoutBytes,
    stderrBytes,
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

function safeHandoffFile(value, label) {
  const file = scalarPathText(value, label);
  requireCondition(
    file.length > 5 &&
      file.endsWith(".json") &&
      !file.includes("/") &&
      !file.includes("\\") &&
      file !== "." &&
      file !== ".." &&
      !/[<>:"|?*]/u.test(file) &&
      !/[. ]$/u.test(file) &&
      !WINDOWS_RESERVED.test(file),
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
    const fileAlias = file.toLowerCase();
    requireCondition(!seenFiles.has(fileAlias), `${spec.id} reports duplicate handoff alias: ${file}.`);
    seenFiles.add(fileAlias);
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

async function currentRuntimeBinding(paths) {
  const bytes = await readFile(absolute(paths.runtimeBinding));
  const value = parseCanonicalJson(bytes, paths.runtimeBinding).value;
  verifyClosedRuntimeBinding(value);
  requireCondition(
    activeWorker &&
      value.runtimeBindingDigest === activeWorker.binding.runtimeBindingDigest,
    "Runtime-binding input differs from the authenticated child runtime.",
  );
  return {
    path: paths.runtimeBinding,
    bytes: bytes.byteLength,
    digest: digest(bytes),
  };
}

function gateEvidenceBindings(gate, paths) {
  return {
    receipt: externalEvidenceBinding(
      gate.paths.receipt,
      paths.gateReceiptSnapshot,
      "application/json",
      gate.receiptBytes,
    ),
    stdout: externalEvidenceBinding(
      gate.paths.stdout,
      paths.gateStdoutSnapshot,
      "text/plain; charset=utf-8",
      gate.stdoutBytes,
    ),
    stderr: externalEvidenceBinding(
      gate.paths.stderr,
      paths.gateStderrSnapshot,
      "text/plain; charset=utf-8",
      gate.stderrBytes,
    ),
  };
}

async function materializeGateEvidence(gate, paths) {
  await writeImmutable(paths.gateReceiptSnapshot, gate.receiptBytes);
  await writeImmutable(paths.gateStdoutSnapshot, gate.stdoutBytes);
  await writeImmutable(paths.gateStderrSnapshot, gate.stderrBytes);
  return gateEvidenceBindings(gate, paths);
}

function reviewedSourceByPath(rows, path) {
  const row = rows.find((entry) => entry.originalPath === path);
  requireCondition(row, `Required primary source was not snapshotted: ${path}.`);
  return row;
}

function assertPrimaryCoverage(
  contextSources,
  rows,
  evidenceSets,
  correctionLineage,
  capturedGatePaths,
  paths,
) {
  const scopes = new Set(contextSources.map((entry) => entry.readScope));
  for (const path of [
    paths.runtimeBinding,
    paths.candidateManifest,
    paths.preIntegrationReview,
    capturedGatePaths.receipt,
    capturedGatePaths.stdout,
    capturedGatePaths.stderr,
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
            "The canonical gate passed from an authenticated materialization and disposable Git context for the exact committed candidate tree; immutable copies of its raw stdout, raw stderr, and closed receipt are direct reviewer sources.",
          rationale:
            "The release-gate wrapper binds the candidate source and disposable Git identity, then the review harness captures the necessarily post-commit outputs outside the candidate and binds both their original and immutable snapshot paths to exact bytes.",
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
  paths,
) {
  const contexts = rows.map(contextSource);
  const gatePaths = capturedGateEvidencePaths(paths);
  contexts.push(
    await directContext(
      "context.runtime-binding",
      paths.runtimeBinding,
      "Parent-verified exact candidate runtime, offline supply, toolchain, environment, and generated-closure binding.",
      ALL_REVIEWS,
    ),
    await directContext(
      "context.candidate-manifest",
      paths.candidateManifest,
      "Closed candidate, gate, tooling, snapshot, and primary-evidence binding manifest.",
      ALL_REVIEWS,
    ),
    await directContext(
      "context.canonical-gate-receipt",
      gatePaths.receipt,
      "Immutable copy of the closed exact-candidate canonical-gate receipt.",
      ALL_REVIEWS,
    ),
    await directContext(
      "context.canonical-gate-stdout",
      gatePaths.stdout,
      "Immutable copy of the exact raw canonical-gate stdout bytes.",
      ALL_REVIEWS,
    ),
    await directContext(
      "context.canonical-gate-stderr",
      gatePaths.stderr,
      "Immutable copy of the exact raw canonical-gate stderr bytes.",
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
  const runtimeBinding = await currentRuntimeBinding(paths);
  const runtimeBindingDigest = activeWorker.binding.runtimeBindingDigest;
  const stableReconstructionDigest = activeWorker.context.stableReconstructionDigest;
  const reviewTooling = await authenticateReviewTooling(candidateTree);
  const sources = collectSourceSpecs(candidateTree);
  const gateDeclaration = activeWorker?.context.stableReconstruction.canonicalGate;
  requireCondition(gateDeclaration !== null, "prepare lacks its explicit canonical-gate input.");
  const gate = await validateGateReceipt(
    checkpoint,
    candidateTree,
    gateEvidencePaths(checkpoint),
    gateDeclaration.expectedReceiptDigest,
  );
  const gateEvidence = await materializeGateEvidence(gate, paths);
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
    runtimeBindingDigest,
    stableReconstructionDigest,
    runtimeBinding,
    reviewTooling,
    canonicalGate: {
      receipt: gateEvidence.receipt,
      candidateSource: gate.receipt.candidateSource,
      materialization: gate.receipt.materialization,
      gitContext: gate.receipt.gitContext,
      stdout: gateEvidence.stdout,
      stderr: gateEvidence.stderr,
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
  const contextSources = await preparedContexts(rows, candidateManifest, paths);
  assertPrimaryCoverage(
    contextSources,
    rows,
    evidenceSets,
    correctionLineage,
    capturedGateEvidencePaths(paths),
    paths,
  );
  const request = requestFor(contextSources, checkpoint);
  await writeImmutableJson(paths.request, request);
  await writeImmutableJson(paths.phaseMetadata, {
    phase: "release-review-r2",
    checkpoint,
    runRoot: paths.root,
    runtimeBindingDigest,
    stableReconstructionDigest,
    runtimeBinding,
    goalId: request.goal.id,
    goalRevision: request.goal.revision,
    reviewTooling,
    canonicalGateReceipt: gateEvidence.receipt,
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
        runtimeBindingDigest,
        stableReconstructionDigest,
        phaseAuthorityDigest: activeWorker.context.phaseAuthorityDigest,
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
  const runtimeBinding = await currentRuntimeBinding(paths);
  const runtimeBindingDigest = activeWorker.binding.runtimeBindingDigest;
  const stableReconstructionDigest = activeWorker.context.stableReconstructionDigest;
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
      "runtimeBindingDigest",
      "stableReconstructionDigest",
      "runtimeBinding",
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
      manifest.runtimeBindingDigest === runtimeBindingDigest &&
      manifest.stableReconstructionDigest === stableReconstructionDigest &&
      JSON.stringify(manifest.runtimeBinding) === JSON.stringify(runtimeBinding) &&
      JSON.stringify(manifest.reviewTooling) === JSON.stringify(reviewTooling),
    "Prepared candidate manifest identity or tooling binding mismatch.",
  );

  const sources = collectSourceSpecs(candidateTree);
  const gateDeclaration = activeWorker?.context.stableReconstruction.canonicalGate;
  requireCondition(gateDeclaration !== null, "prepared validation lacks its explicit canonical-gate input.");
  const gate = await validateGateReceipt(
    candidate,
    candidateTree,
    capturedGateEvidencePaths(paths),
    gateDeclaration.expectedReceiptDigest,
  );
  const gateEvidence = gateEvidenceBindings(gate, paths);
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
        receipt: gateEvidence.receipt,
        candidateSource: gate.receipt.candidateSource,
        materialization: gate.receipt.materialization,
        gitContext: gate.receipt.gitContext,
        stdout: gateEvidence.stdout,
        stderr: gateEvidence.stderr,
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
    capturedGateEvidencePaths(paths),
    paths,
  );
  return {
    manifest,
    request,
    paths,
    candidateTree,
    runtimeBinding,
    runtimeBindingDigest,
    stableReconstructionDigest,
    reviewTooling,
  };
}

function currentOwnerExpectation(required = true) {
  const expectation = activeWorker?.context.phaseAuthority.ownerExpectation ?? null;
  if (required) {
    requireCondition(expectation !== null, "This phase requires the explicit owner-reviewed digest pair.");
  }
  return expectation;
}

function expectedPhaseAuthority(phase, ownerExpectation = null, handoffs = []) {
  const binding = {
    apiVersion: "swecircuit/release-review-phase-authority/v1alpha1",
    kind: "ReleaseReviewPhaseAuthority",
    phase,
    ownerExpectation,
    handoffs,
  };
  const digest = runtimeDomainDigest(PHASE_AUTHORITY_DOMAIN, binding);
  validatePhaseAuthority(binding, digest, phase);
  return { binding, digest };
}

async function listPackageFilesAtRoot(root) {
  const rootStats = await lstat(root);
  requireCondition(
    rootStats.isDirectory() && !rootStats.isSymbolicLink(),
    "Materialized specialist package root is not one plain directory.",
  );
  const rootReal = await realpath(root);
  const files = [];
  async function visit(directory, prefix) {
    const children = await readdir(directory, { withFileTypes: true });
    children.sort((left, right) => compareUtf8Ordinal(left.name, right.name));
    for (const child of children) {
      const local = prefix ? `${prefix}/${child.name}` : child.name;
      const path = join(directory, child.name);
      const stats = await lstat(path);
      if (stats.isDirectory() && !stats.isSymbolicLink()) {
        requireCondition(
          isContainedPath(rootReal, await realpath(path)),
          `Materialized package directory escapes: ${local}.`,
        );
        await visit(path, local);
      } else {
        requireCondition(
          stats.isFile() && !stats.isSymbolicLink() && stats.nlink === 1,
          `Materialized package entry is linked or not one file: ${local}.`,
        );
        requireCondition(
          isContainedPath(rootReal, await realpath(path)),
          `Materialized package file escapes: ${local}.`,
        );
        files.push({ path: local, bytes: await readFile(path) });
      }
    }
  }
  await visit(root, "");
  files.sort((left, right) => compareUtf8Ordinal(left.path, right.path));
  return files;
}

async function listMaterializedPackageFiles(packageRoot) {
  return listPackageFilesAtRoot(absolute(packageRoot));
}

function assertOwnerPackageExpectation(reconstructed, ownerExpectation) {
  const reconstructedExpectation = {
    compilationDigest: reconstructed.compilationDigest,
    packageDigest: reconstructed.packageDigest,
  };
  requireCondition(
    JSON.stringify(reconstructedExpectation) === JSON.stringify(ownerExpectation),
    "Explicit owner digest pair differs from the privately reconstructed package.",
  );
  return reconstructedExpectation;
}

function assertPackageFileSet(actual, reconstructed) {
  const expected = reconstructed.files
    .map((file) => ({ path: file.path, bytes: Buffer.from(file.content, "utf8") }))
    .sort((left, right) => compareUtf8Ordinal(left.path, right.path));
  requireCondition(actual.length === expected.length, "Materialized package file roster mismatch.");
  for (let index = 0; index < expected.length; index += 1) {
    requireCondition(
      actual[index].path === expected[index].path &&
        actual[index].bytes.equals(expected[index].bytes),
      `Materialized package file differs from reconstruction: ${expected[index].path}.`,
    );
  }
  return expected.map((entry) => ({
    path: entry.path,
    bytes: entry.bytes.byteLength,
    digest: digest(entry.bytes),
  }));
}

async function verifyMaterializedSpecialistPackage(paths, reconstructed) {
  const envelope = await readCanonicalJson(paths.packageEnvelope);
  requireCondition(
    envelope.bytes.equals(Buffer.from(`${JSON.stringify(reconstructed, null, 2)}\n`, "utf8")),
    "Materialized package envelope differs from private reconstruction.",
  );
  const actual = await listMaterializedPackageFiles(paths.packageDir);
  assertPackageFileSet(actual, reconstructed);
  return envelope.value;
}

async function validateCompiledInputs(candidate, ownerExpectation = null) {
  const prepared = await validatePreparedInputs(candidate);
  const compilation = requireValue(
    compileAgentBlueprints(prepared.request),
    "Private release-review-r2 recompilation",
  );
  const reconstructed = requireValue(
    renderSpecialistPackage(compilation),
    "Private release-review-r2 package reconstruction",
  );
  const selfExpectation = {
    compilationDigest: reconstructed.compilationDigest,
    packageDigest: reconstructed.packageDigest,
  };
  requireValue(
    verifySpecialistPackage(reconstructed, selfExpectation),
    "Privately reconstructed release-review-r2 package verification",
  );
  if (ownerExpectation !== null) {
    assertOwnerPackageExpectation(reconstructed, ownerExpectation);
    requireValue(
      verifySpecialistPackage(reconstructed, ownerExpectation),
      "Explicit owner-bound release-review-r2 package verification",
    );
  }
  const materialized = await verifyMaterializedSpecialistPackage(prepared.paths, reconstructed);
  requireCondition(
    JSON.stringify(materialized) === JSON.stringify(reconstructed),
    "Materialized package value differs from private reconstruction.",
  );
  const compilationSummary = (
    await readCanonicalJson(prepared.paths.compilationSummary)
  ).value;
  requireCondition(
    compilationSummary.candidateCommit === candidate &&
      compilationSummary.runtimeBindingDigest === prepared.runtimeBindingDigest &&
      compilationSummary.stableReconstructionDigest === prepared.stableReconstructionDigest &&
      compilationSummary.compilationDigest === reconstructed.compilationDigest &&
      compilationSummary.packageDigest === reconstructed.packageDigest,
    "Compilation summary differs from private reconstruction.",
  );
  return { ...prepared, compilation, specialistPackage: reconstructed, compilationSummary };
}

async function validateApprovedInputs(candidate, ownerExpectation = currentOwnerExpectation()) {
  const compiled = await validateCompiledInputs(candidate, ownerExpectation);
  const approval = (await readCanonicalJson(compiled.paths.approval)).value;
  assertExactKeys(
    approval,
    [
      "apiVersion",
      "kind",
      "goalId",
      "goalRevision",
      "candidateCommit",
      "runtimeBindingDigest",
      "stableReconstructionDigest",
      "phaseAuthorityDigest",
      "approvedBy",
      "approvalBasis",
      "expectation",
    ],
    "release-review-r2 approval",
  );
  assertExactKeys(
    approval.expectation,
    ["compilationDigest", "packageDigest"],
    "release-review-r2 approval expectation",
  );
  const approvalAuthority = expectedPhaseAuthority("approve", ownerExpectation);
  requireCondition(
    approval.apiVersion === "swecircuit/review-approval/v1alpha1" &&
      approval.kind === "SpecialistReviewApproval" &&
      approval.goalId === compiled.request.goal.id &&
      approval.goalRevision === compiled.request.goal.revision &&
      approval.candidateCommit === candidate &&
      approval.runtimeBindingDigest === compiled.runtimeBindingDigest &&
      approval.stableReconstructionDigest === compiled.stableReconstructionDigest &&
      approval.phaseAuthorityDigest === approvalAuthority.digest &&
      approval.approvedBy === "external-host-declared-owner-pair" &&
      typeof approval.approvalBasis === "string" &&
      approval.approvalBasis.length > 0 &&
      JSON.stringify(approval.expectation) === JSON.stringify(ownerExpectation),
    "Approval differs from the explicit owner pair or private reconstruction.",
  );
  requireValue(
    verifySpecialistPackage(compiled.specialistPackage, ownerExpectation),
    "Approved private package verification",
  );
  return { ...compiled, approval, approvalAuthority };
}

async function compile() {
  const { manifest, request, paths, runtimeBindingDigest } =
    await validatePreparedInputs(checkpoint);
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
    runtimeBindingDigest,
    stableReconstructionDigest: activeWorker.context.stableReconstructionDigest,
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
  process.stdout.write(
    `${JSON.stringify(
      {
        ...summary,
        phaseAuthorityDigest: activeWorker.context.phaseAuthorityDigest,
      },
      null,
      2,
    )}\n`,
  );
}

async function approve() {
  const expectation = currentOwnerExpectation();
  const {
    manifest,
    request,
    paths,
    runtimeBindingDigest,
    stableReconstructionDigest,
    specialistPackage,
  } = await validateCompiledInputs(checkpoint, expectation);
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
    runtimeBindingDigest,
    stableReconstructionDigest,
    phaseAuthorityDigest: activeWorker.context.phaseAuthorityDigest,
    approvedBy: "external-host-declared-owner-pair",
    approvalBasis:
      "The external host declared this exact compilation/package pair; the candidate reconstructed and compared the complete package envelope and every package file before recording the declaration.",
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
        runtimeBindingDigest,
        stableReconstructionDigest,
        phaseAuthorityDigest: activeWorker.context.phaseAuthorityDigest,
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
  requireVersionableEvidencePaths(gatePaths);
  requireBytePreservingEvidencePaths(checkpoint, gatePaths);
  process.stdout.write(
    `${JSON.stringify(
      {
        candidateCommit: checkpoint,
        runtimeBindingDigest: activeWorker.binding.runtimeBindingDigest,
        stableReconstructionDigest: activeWorker.context.stableReconstructionDigest,
        phaseAuthorityDigest: activeWorker.context.phaseAuthorityDigest,
        run: paths,
        canonicalGate: gatePaths,
        canonicalGateCapture: capturedGateEvidencePaths(paths),
      },
      null,
      2,
    )}\n`,
  );
}

async function main() {
  await initializeCandidateWorker(
    "harness",
    mode,
    checkpoint,
    SCRIPT_PATH,
    mode !== "paths",
  );
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
  EMPTY_FILE_DIGEST,
  PRIVATE_NPM_CONFIGURATION_POLICY,
  REVIEW_ROOT,
  detectReleaseReviewLibc,
  releaseReviewRuntimeIdentity,
  PARENT_REPOSITORY_PATH,
  assertOwnerPackageExpectation,
  assertPackageFileSet,
  HARNESS_REPOSITORY_PATH,
  VERIFIER_REPOSITORY_PATH,
  candidateBlobBytes,
  candidateRunPaths,
  capturedGateEvidencePaths,
  gateEvidencePaths,
  externalEvidenceBinding,
  gateEvidenceBindings,
  loadCandidateTree,
  parseGitBlobBatch,
  candidateTreeWithOverrides,
  discoverCorrectionEvidenceSpecs,
  effectiveEnvironmentBinding,
  isCorrectionNavigationDuplicate,
  collectSourceSpecs,
  requestFor,
  validateGateReceipt,
  verifyEvidenceSet,
  reviewedSourceMaterialization,
  authenticateToolBytes,
  authenticateReviewTooling,
  initializeCandidateWorker,
  installSpecialistRuntimeForTests,
  listMaterializedPackageFiles,
  listPackageFilesAtRoot,
  requireNoWorkingTreeOnlySources,
  requireNoRuntimeAncestorSupply,
  expectedPhaseAuthority,
  safeAuthorityHandoffPath,
  scalarPathText,
  validateApprovedInputs,
  validateCompiledInputs,
  validateEffectiveWorkerEnvironment,
  validatePhaseAuthority,
  validateStableReconstruction,
  validateWorkerPrivateNpmConfiguration,
  verifyCheckpoint,
  verifyMaterializedSpecialistPackage,
});

if (process.argv[1] && resolve(process.argv[1]) === resolve(SCRIPT_PATH)) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
    process.exitCode = 1;
  });
}
