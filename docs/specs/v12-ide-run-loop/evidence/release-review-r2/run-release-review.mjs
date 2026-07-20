import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  compileAgentBlueprints,
  renderSpecialistPackage,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../../../../../dist/index.js";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const INPUTS = join(EVIDENCE, "inputs");
const PACKAGE_DIR = join(EVIDENCE, "package");
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
const SNAPSHOT_ROOT =
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/source-snapshots";
const CANDIDATE_MANIFEST =
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/candidate.json";
const PRE_INTEGRATION_REVIEW =
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/pre-integration-review.md";
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
    id: "release-correction-r1",
    root: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction",
    goalRevision: 1,
    expectation: [
      "sha256:45fa97ffb1fdb7f95ae33203e9f727c0f66c27a1b2fa344f06a9569b165ae4c2",
      "sha256:0243a0cea075424c7c919a6af876b4f023f9e635234cf6ec07a0d7cb9543bf6c",
    ],
    packageAgentIds: [
      AGENTS.correctionR1Release,
      AGENTS.correctionR1Resource,
      AGENTS.correctionR1Retired,
      AGENTS.correctionR1Dogfood,
    ],
    handoffs: [
      expectedHandoff(
        AGENTS.correctionR1Release,
        "pass",
        5693,
        "sha256:3510b98137b0cd8746d5440f4254bcfed8c493f714a57539a705eb12012c12fd",
      ),
      expectedHandoff(
        AGENTS.correctionR1Resource,
        "pass",
        6718,
        "sha256:f74436e9e9a234cc8c41cba9a3b47ee84d8e0bff3ceba811252f008686c51677",
      ),
      expectedHandoff(
        AGENTS.correctionR1Dogfood,
        "pass",
        6667,
        "sha256:23bbdd75d90ee42595b5f22f1ba2c9ba9f608866b049285b027ae579225b2e4b",
      ),
    ],
    complete: false,
    ready: false,
    phase: "release-correction",
  }),
  evidenceSpec({
    id: "release-correction-r2",
    root: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2",
    goalRevision: 2,
    expectation: [
      "sha256:ce22dcd5bc7b96d7399fa792ab9ab35c0b10af9a0a4c437fd3d184dfe3eec672",
      "sha256:cff1fa3d5eaa668e962b212f8128018c3e4b2721404fa457ca73c79578011fcc",
    ],
    packageAgentIds: [AGENTS.correctionR2],
    handoffs: [
      expectedHandoff(
        AGENTS.correctionR2,
        "split",
        7254,
        "sha256:8db3fea6a6f47fba804f72d454660bafda7ab5d06691d729157e2f8f3aba66be",
      ),
    ],
    complete: true,
    ready: false,
  }),
  evidenceSpec({
    id: "release-correction-r3",
    root: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3",
    goalRevision: 3,
    expectation: [
      "sha256:ded9a26906a9a00a5f0b12dc3420e909a91e70ef9a3ee03905ac1676efb40638",
      "sha256:19c13189225b8bedd69b03edb2c4c3821aa9d8256e39209f5c10641527dc4d01",
    ],
    packageAgentIds: [AGENTS.correctionR3],
    handoffs: [
      expectedHandoff(
        AGENTS.correctionR3,
        "split",
        8095,
        "sha256:89ab112ce3df0a97f64db2994fc792238955b7007a7ce0310b4af39b4340d3df",
      ),
    ],
    complete: true,
    ready: false,
  }),
  evidenceSpec({
    id: "release-correction-r4",
    root: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4",
    goalRevision: 4,
    expectation: [
      "sha256:aa13bb1f6a8ff21658b718ccd46e6a5a26dacd8d1c9baa990b92e37161627660",
      "sha256:edaba251ee9b258474674225d38123df2772dfc42b7cd52e1d49dff8791f5065",
    ],
    packageAgentIds: [AGENTS.correctionR4],
    handoffs: [
      expectedHandoff(
        AGENTS.correctionR4,
        "pass",
        9058,
        "sha256:5afb33ee3c7f456ea0331d7d0735a0291cd69fb5d7a4c6c6d80982177d815090",
      ),
    ],
    complete: true,
    ready: true,
  }),
  evidenceSpec({
    id: "release-correction-r5",
    root: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5",
    goalRevision: 5,
    expectation: [
      "sha256:fd9c21ca81ddcef94bc1da50faf721238145a9807eae7860a34583c8512c9ff5",
      "sha256:c29570501b69f2b791d32890b48bb74d90091e649513d5915c636e1141518717",
    ],
    packageAgentIds: [AGENTS.correctionR5Dogfood, AGENTS.correctionR5ReleaseEvidence],
    handoffs: [
      expectedHandoff(AGENTS.correctionR5Dogfood, "pass"),
      expectedHandoff(AGENTS.correctionR5ReleaseEvidence, "pass"),
    ],
    complete: true,
    ready: true,
  }),
  evidenceSpec({
    id: "release-correction-r6",
    root: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6",
    goalRevision: 6,
    expectation: [
      "sha256:eaad4d35361dc41813b58a17aff340e757744ea32cfb1ae5b17a31b81230a998",
      "sha256:5acb302e44bb08f8626fb3773ba27acf5af5ae3f3d09d95beea1f2538a46826a",
    ],
    packageAgentIds: [AGENTS.correctionR6Gate, AGENTS.correctionR6Consumer],
    handoffs: [
      expectedHandoff(
        AGENTS.correctionR6Gate,
        "pass",
        5061,
        "sha256:3c95ca87255613bdcb96f0a894a03ce012c4d5662a3379230c07166e56fcf33b",
      ),
      expectedHandoff(
        AGENTS.correctionR6Consumer,
        "pass",
        5291,
        "sha256:939099add2852e3dfe14b307fc55e46c89b56a1dd0c735d15bf35e82f99a5a68",
      ),
    ],
    complete: true,
    ready: true,
  }),
  evidenceSpec({
    id: "release-correction-r7",
    root: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7",
    goalRevision: 7,
    expectation: [
      "sha256:e7f6a2d27f613ea1a898b781584039dff8704d88a940965814d45b04a5537920",
      "sha256:df3ed49a4d38fdbac275b82036dc4354d6b76bac3b2fa97dfbd385c3fdad85b8",
    ],
    packageAgentIds: [AGENTS.correctionR7EvidenceRetention],
    handoffs: [
      expectedHandoff(
        AGENTS.correctionR7EvidenceRetention,
        "pass",
        5812,
        "sha256:1432e2c7a6f7384583d5dc27e155a7148621f6f4cbddd17c3b6bd18dd3991a32",
      ),
    ],
    complete: true,
    ready: true,
  }),
  evidenceSpec({
    id: "release-correction-r8",
    root: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8",
    goalRevision: 8,
    expectation: [
      "sha256:526cb3c687c60ebc99fc1856b2d3ef7b017dfd14fd9772711669d59d34b18fef",
      "sha256:d655468c5e37171d5ef83af2299bf08291029e9c08751ef056c2d655f24cfb1d",
    ],
    packageAgentIds: [AGENTS.correctionR8ByteIntegrity],
    handoffs: [
      expectedHandoff(
        AGENTS.correctionR8ByteIntegrity,
        "pass",
        8035,
        "sha256:624577edaed5b154f3c4e90daff0dd06f17187c1fa4aa4128e75eb5914bb3df1",
      ),
    ],
    complete: true,
    ready: true,
  }),
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

const CORRECTION_REPLAN_SPECS = Object.freeze([
  {
    path: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json",
    bytes: 3795,
    digest: "sha256:73fcd5841f739c4f353355ddba6b412d68c3b2d8233ccc371ef2de9a2477d282",
    fromRevision: 1,
    toRevision: 2,
    route: "redesign",
    triggerAgentId: AGENTS.correctionR1Resource,
    retiredAgentId: AGENTS.correctionR1Retired,
    replacementAgentId: AGENTS.correctionR2,
  },
  {
    path: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json",
    bytes: 2807,
    digest: "sha256:67eac872b0d88bbade9af9afda268178f57077b0abdc4f605444ead1da6c186c",
    fromRevision: 2,
    toRevision: 3,
    route: "split",
    triggerAgentId: AGENTS.correctionR2,
    retiredAgentId: null,
    replacementAgentId: AGENTS.correctionR3,
  },
  {
    path: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json",
    bytes: 2701,
    digest: "sha256:64376261a673ebc7ec29222ee90569097915879521d8ea062a36a9d156e8b34d",
    fromRevision: 3,
    toRevision: 4,
    route: "split",
    triggerAgentId: AGENTS.correctionR3,
    retiredAgentId: null,
    replacementAgentId: AGENTS.correctionR4,
  },
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
    PRE_INTEGRATION_REVIEW,
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

const DYNAMIC_ROOTS = [
  {
    path: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction",
    description: "Exact V12 release-correction package, handoffs, and primary evidence.",
    allowedWorkUnits: ALL_REVIEWS,
  },
  ...[2, 3, 4, 5, 6, 7, 8].map((revision) => ({
    path: `docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r${revision}`,
    description: `Exact V12 release-correction revision ${revision} package, handoffs, replans, and primary evidence.`,
    allowedWorkUnits: ALL_REVIEWS,
  })),
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
];

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

function snapshotPath(entry) {
  return entry.snapshotPath ?? `${SNAPSHOT_ROOT}/${entry.path}`;
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


async function readCanonicalJson(path) {
  const bytes = await readFile(absolute(path));
  const text = decodeUtf8(bytes, path);
  const value = JSON.parse(text);
  requireCondition(
    `${JSON.stringify(value, null, 2)}\n` === text,
    `${path} is not canonical JSON with normalized LF.`,
  );
  return { bytes, value };
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

async function walkFiles(root) {
  const output = [];
  async function visit(path) {
    const entries = await readdir(absolute(path), { withFileTypes: true });
    entries.sort((left, right) => compareOrdinal(left.name, right.name));
    for (const entry of entries) {
      const child = `${path}/${entry.name}`;
      if (entry.isDirectory()) {
        await visit(child);
      } else if (entry.isFile()) {
        output.push(child);
      }
    }
  }
  await visit(root);
  return output;
}

function dynamicSourceId(path) {
  return `context.snapshot.${createHash("sha256").update(path).digest("hex").slice(0, 24)}`;
}

async function collectSourceSpecs() {
  const byPath = new Map(STATIC_SOURCES.map((entry) => [entry.path, entry]));
  const launchAuthorization = (await readCanonicalJson(V11_LAUNCH_AUTHORIZATION)).value;
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
  for (const root of DYNAMIC_ROOTS) {
    for (const path of await walkFiles(root.path)) {
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

  for (const path of await walkFiles("src")) {
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
  }
  for (const path of await walkFiles("test")) {
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

function candidateSourceBinding(candidate) {
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
    return { mode: match[1], objectId: match[2], path, pathBytes };
  });
  entries.sort((left, right) => Buffer.compare(left.pathBytes, right.pathBytes));
  const seen = new Set();
  const hash = createHash("sha256");
  updateGateFrame(hash, Buffer.from(MATERIALIZATION_DIGEST_DOMAIN, "utf8"));
  let bytes = 0;
  for (const entry of entries) {
    const key = process.platform === "win32" ? entry.path.toLowerCase() : entry.path;
    requireCondition(!seen.has(key), `Candidate tree path is not unique: ${entry.path}.`);
    seen.add(key);
    const content = Buffer.from(gitOutput(["cat-file", "blob", entry.objectId]));
    bytes += content.byteLength;
    updateGateFrame(hash, Buffer.from(entry.mode, "ascii"));
    updateGateFrame(hash, entry.pathBytes);
    updateGateFrame(hash, content);
  }
  requireCondition(entries.length > 0, "Candidate tree is empty.");
  return {
    commit,
    tree,
    files: entries.length,
    bytes,
    digest: `sha256:${hash.digest("hex")}`,
  };
}

function inspectEvidenceAttributes(path) {
  const fields = Buffer.from(
    gitOutput(["check-attr", "-z", "text", "diff", "merge", "--", path]),
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

function requireBytePreservingEvidencePaths(paths) {
  for (const path of [paths.stdout, paths.stderr]) {
    const attributes = inspectEvidenceAttributes(path);
    requireCondition(
      attributes.text === "unset" && attributes.diff === "unset" && attributes.merge === "unset",
      `Required canonical-gate raw evidence is not binary in Git: ${path}.`,
    );
  }

  const receiptAttributes = inspectEvidenceAttributes(paths.receipt);
  requireCondition(
    receiptAttributes.text === "auto" &&
      receiptAttributes.diff === "unspecified" &&
      receiptAttributes.merge === "unspecified",
    `Required canonical-gate receipt does not retain normal text policy in Git: ${paths.receipt}.`,
  );
}

function requireVersionableEvidencePaths(paths) {
  for (const path of Object.values(paths)) {
    const result = spawnSync("git", ["check-ignore", "--quiet", "--no-index", "--", path], {
      cwd: ROOT,
      encoding: null,
      maxBuffer: 134_217_728,
    });
    if (result.error) {
      throw result.error;
    }
    requireCondition(
      result.status === 0 || result.status === 1,
      `Unable to inspect Git ignore policy for required canonical-gate evidence: ${path}.`,
    );
    requireCondition(
      result.status === 1,
      `Required canonical-gate evidence is ignored by Git: ${path}.`,
    );
  }
}

async function verifyCheckpoint(candidate, sources) {
  const head = Buffer.from(gitOutput(["rev-parse", "HEAD"])).toString("ascii").trim();
  requireCondition(head === candidate, `Candidate checkpoint mismatch: HEAD is ${head}.`);
  try {
    gitOutput(["diff", "--quiet", "HEAD", "--"]);
  } catch {
    throw new Error("Tracked repository state differs from candidate HEAD.");
  }

  for (const entry of sources) {
    const disk = await readFile(absolute(entry.path));
    let committed;
    try {
      committed = Buffer.from(gitOutput(["show", `${candidate}:${entry.path}`]));
    } catch {
      throw new Error(`Reviewer source is not committed in candidate ${candidate}: ${entry.path}.`);
    }
    requireCondition(
      disk.equals(committed),
      `Reviewer source differs from candidate ${candidate}: ${entry.path}.`,
    );
  }
}

async function binding(path, mediaType) {
  const bytes = await readFile(absolute(path));
  return { path, mediaType, bytes: bytes.byteLength, digest: digest(bytes) };
}

async function validateBoundFile(value, expectedPath, label) {
  assertExactKeys(value, ["path", "mediaType", "bytes", "digest"], label);
  requireCondition(value.path === expectedPath, `${label} path mismatch.`);
  requireCondition(
    value.mediaType === "application/octet-stream",
    `${label} media type mismatch.`,
  );
  requireCondition(Number.isSafeInteger(value.bytes) && value.bytes >= 0, `${label} byte count invalid.`);
  requireCondition(DIGEST_PATTERN.test(value.digest), `${label} digest invalid.`);
  const actual = await binding(expectedPath, "application/octet-stream");
  requireCondition(
    actual.bytes === value.bytes && actual.digest === value.digest,
    `${label} raw byte binding mismatch.`,
  );
}

async function validateGateReceipt(candidate) {
  const paths = gateEvidencePaths(candidate);
  requireVersionableEvidencePaths(paths);
  requireBytePreservingEvidencePaths(paths);
  const parsed = await readCanonicalJson(paths.receipt);
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
  await validateBoundFile(receipt.stdout, paths.stdout, "canonical-gate stdout");
  await validateBoundFile(receipt.stderr, paths.stderr, "canonical-gate stderr");
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

async function verifyEvidenceSet(spec) {
  const packagePath = `${spec.root}/package-envelope.json`;
  const approvalPath = `${spec.root}/approval.json`;
  const reportPath = `${spec.root}/handoff-verification.json`;
  const specialistPackage = (await readCanonicalJson(packagePath)).value;
  const approval = (await readCanonicalJson(approvalPath)).value;
  const report = (await readCanonicalJson(reportPath)).value;

  requireCondition(
    approval &&
      typeof approval === "object" &&
      JSON.stringify(approval.expectation) === JSON.stringify(spec.expectation),
    `${spec.id} approval does not bind the frozen package expectation.`,
  );
  requireValue(
    verifySpecialistPackage(specialistPackage, spec.expectation),
    `${spec.id} package verification`,
  );

  const expectedAgentIds = [...spec.packageAgentIds].sort(compareOrdinal);
  const packageAgentIds = specialistPackage.manifest.agents
    .map((entry) => entry.agentId)
    .sort(compareOrdinal);
  requireCondition(
    specialistPackage.manifest.goalId === spec.goalId &&
      specialistPackage.manifest.goalRevision === spec.goalRevision,
    `${spec.id} package goal binding mismatch.`,
  );
  assertExactStringArray(
    packageAgentIds,
    expectedAgentIds,
    `${spec.id} approved package roster`,
  );

  assertExactKeys(report, expectedReportKeys(spec), `${spec.id} handoff report`);
  requireCondition(
    report.apiVersion === "swecircuit/run-evidence/v1alpha1" &&
      report.kind === spec.reportKind &&
      (spec.phase === null || report.phase === spec.phase) &&
      report.compilationDigest === spec.expectation.compilationDigest &&
      report.packageDigest === spec.expectation.packageDigest,
    `${spec.id} handoff report identity mismatch.`,
  );
  assertExactStringArray(
    report.expectedAgentIds,
    expectedAgentIds,
    `${spec.id} reported package roster`,
  );

  const expectedHandoffs = [...spec.handoffs].sort((left, right) =>
    compareOrdinal(left.agentId, right.agentId),
  );
  const expectedFiles = expectedHandoffs.map((entry) => entry.file).sort(compareOrdinal);
  const expectedReceivedAgentIds = expectedHandoffs.map((entry) => entry.agentId);
  const handoffRoot = `${spec.root}/handoffs`;

  requireCondition(
    Array.isArray(report.verifiedHandoffs) &&
      report.verifiedHandoffs.length === expectedHandoffs.length,
    `${spec.id} handoff report roster length mismatch.`,
  );
  const reportFiles = report.verifiedHandoffs
    .map((entry) => entry.file)
    .sort(compareOrdinal);
  assertExactStringArray(reportFiles, expectedFiles, `${spec.id} reported handoff files`);

  const verified = [];
  for (const expectedHandoff of expectedHandoffs) {
    const path = `${handoffRoot}/${expectedHandoff.file}`;
    const raw = await readFile(absolute(path));
    const value = requireValue(
      verifySpecialistHandoff(specialistPackage, spec.expectation, raw),
      `${spec.id} raw handoff verification for ${path}`,
    );
    requireCondition(
      value.handoff.agent.id === expectedHandoff.agentId &&
        value.handoff.outcome === expectedHandoff.outcome &&
        (expectedHandoff.rawBytes === null || value.rawBytes === expectedHandoff.rawBytes) &&
        (expectedHandoff.rawDigest === null ||
          value.rawDigest === expectedHandoff.rawDigest),
      `${spec.id} contains an unexpected handoff identity or outcome: ${path}.`,
    );

    const reported = report.verifiedHandoffs.find(
      (candidate) => candidate.file === expectedHandoff.file,
    );
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
      `${spec.id} report row for ${expectedHandoff.file}`,
    );
    requireCondition(
      reported.agentId === value.handoff.agent.id &&
        reported.outcome === value.handoff.outcome &&
        reported.rawBytes === value.rawBytes &&
        reported.rawDigest === value.rawDigest &&
        reported.semanticDigest === value.semanticDigest &&
        reported.contentDigest === value.contentDigest,
      `${spec.id} handoff report row does not match raw evidence: ${path}.`,
    );
    verified.push({
      path,
      file: expectedHandoff.file,
      agentId: value.handoff.agent.id,
      outcome: value.handoff.outcome,
      bytes: value.rawBytes,
      digest: value.rawDigest,
    });
  }

  verified.sort((left, right) => compareOrdinal(left.agentId, right.agentId));
  assertExactStringArray(
    report.receivedAgentIds,
    expectedReceivedAgentIds,
    `${spec.id} received roster`,
  );
  requireCondition(
    report.complete === spec.complete &&
      report[spec.readinessField] === spec.ready &&
      typeof report.note === "string" &&
      report.note.length > 0,
    `${spec.id} completion or readiness outcome mismatch.`,
  );
  const missingAgentIds = expectedAgentIds.filter(
    (agentId) => !expectedReceivedAgentIds.includes(agentId),
  );
  requireCondition(
    spec.complete === (missingAgentIds.length === 0),
    `${spec.id} declared completeness does not match its exact roster.`,
  );

  return {
    id: spec.id,
    goalRevision: spec.goalRevision,
    compilationDigest: spec.expectation.compilationDigest,
    packageDigest: spec.expectation.packageDigest,
    packagePath,
    approvalPath,
    reportPath,
    expectedAgentIds,
    receivedAgentIds: expectedReceivedAgentIds,
    missingAgentIds,
    complete: spec.complete,
    ready: spec.ready,
    rawHandoffs: verified,
  };
}

async function verifyCorrectionLineage(evidenceSets) {
  const correctionSets = evidenceSets
    .filter((entry) => entry.id.startsWith("release-correction-r"))
    .sort((left, right) => left.goalRevision - right.goalRevision);
  requireCondition(
    correctionSets.length === 8 &&
      correctionSets.every((entry, index) => entry.goalRevision === index + 1),
    "Correction evidence does not contain the exact revision-1 through revision-8 chain.",
  );

  const byRevision = new Map(
    correctionSets.map((entry) => [entry.goalRevision, entry]),
  );
  const replans = [];
  for (const spec of CORRECTION_REPLAN_SPECS) {
    const parsed = await readCanonicalJson(spec.path);
    requireCondition(
      parsed.bytes.byteLength === spec.bytes && digest(parsed.bytes) === spec.digest,
      `Correction replan raw binding mismatch: ${spec.path}.`,
    );
    const replan = parsed.value;
    requireCondition(
      replan.apiVersion === "swecircuit/run-evidence/v1alpha1" &&
        replan.kind === "SpecialistContractReplan" &&
        replan.goal?.id === CORRECTION_GOAL &&
        replan.goal.fromRevision === spec.fromRevision &&
        replan.goal.toRevision === spec.toRevision &&
        replan.route === spec.route,
      `Correction replan identity mismatch: ${spec.path}.`,
    );

    const prior = byRevision.get(spec.fromRevision);
    const replacement = byRevision.get(spec.toRevision);
    requireCondition(prior && replacement, `Correction replan has an unknown revision: ${spec.path}.`);
    const trigger = prior.rawHandoffs.find(
      (entry) => entry.agentId === spec.triggerAgentId,
    );
    const replacementHandoff = replacement.rawHandoffs.find(
      (entry) => entry.agentId === spec.replacementAgentId,
    );
    requireCondition(
      trigger &&
        replacementHandoff &&
        replan.trigger?.agentId === trigger.agentId &&
        replan.trigger.handoffPath === trigger.path &&
        replan.trigger.handoffBytes === trigger.bytes &&
        replan.trigger.handoffDigest === trigger.digest &&
        replan.trigger.outcome === trigger.outcome,
      `Correction replan trigger mismatch: ${spec.path}.`,
    );
    requireCondition(
      replan.replacementContract?.compilationDigest === replacement.compilationDigest &&
        replan.replacementContract.packageDigest === replacement.packageDigest &&
        replan.replacementContract.agentId === replacementHandoff.agentId &&
        replan.replacementContract.handoffPath === replacementHandoff.path &&
        replan.replacementContract.handoffBytes === replacementHandoff.bytes &&
        replan.replacementContract.handoffDigest === replacementHandoff.digest &&
        replan.replacementContract.outcome === replacementHandoff.outcome &&
        replan.replacementContract.approved === true &&
        replan.replacementContract.launched === true &&
        replan.replacementContract.completed ===
          (replacementHandoff.outcome === "pass"),
      `Correction replacement contract mismatch: ${spec.path}.`,
    );
    if (spec.retiredAgentId !== null) {
      requireCondition(
        prior.missingAgentIds.length === 1 &&
          prior.missingAgentIds[0] === spec.retiredAgentId &&
          replan.retiredContract?.compilationDigest === prior.compilationDigest &&
          replan.retiredContract.packageDigest === prior.packageDigest &&
          replan.retiredContract.agentId === spec.retiredAgentId &&
          replan.retiredContract.launched === false &&
          replan.retiredContract.handoff === null,
        `Correction retired contract mismatch: ${spec.path}.`,
      );
    }

    replans.push({
      path: spec.path,
      bytes: spec.bytes,
      digest: spec.digest,
      fromRevision: spec.fromRevision,
      toRevision: spec.toRevision,
      route: spec.route,
      triggerAgentId: trigger.agentId,
      triggerOutcome: trigger.outcome,
      retiredAgentId: spec.retiredAgentId,
      replacementAgentId: replacementHandoff.agentId,
      replacementOutcome: replacementHandoff.outcome,
    });
  }

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
    replans,
  };
}

async function verifyPrimaryEvidenceSets() {
  const evidenceSets = [];
  for (const spec of PRIMARY_EVIDENCE_SPECS) {
    evidenceSets.push(await verifyEvidenceSet(spec));
  }
  return {
    evidenceSets,
    correctionLineage: await verifyCorrectionLineage(evidenceSets),
  };
}

async function materializeSnapshots(sources) {
  const rows = [];
  for (const entry of sources) {
    const bytes = await readFile(absolute(entry.path));
    const target = snapshotPath(entry);
    await writeImmutable(target, bytes);
    rows.push({
      contextId: entry.id,
      originalPath: entry.path,
      snapshotPath: target,
      description: entry.description,
      allowedWorkUnits: entry.allowedWorkUnits,
      bytes: bytes.byteLength,
      digest: digest(bytes),
    });
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

function reviewedSourceByPath(rows, path) {
  const row = rows.find((entry) => entry.originalPath === path);
  requireCondition(row, `Required primary source was not snapshotted: ${path}.`);
  return row;
}

function assertPrimaryCoverage(contextSources, rows, evidenceSets, correctionLineage, gatePaths) {
  const scopes = new Set(contextSources.map((entry) => entry.readScope));
  for (const path of [
    CANDIDATE_MANIFEST,
    PRE_INTEGRATION_REVIEW,
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

async function preparedContexts(rows, candidateManifest, gatePaths) {
  const contexts = rows.map(contextSource);
  contexts.push(
    await directContext(
      "context.candidate-manifest",
      CANDIDATE_MANIFEST,
      "Closed candidate, gate, snapshot, and primary-evidence binding manifest.",
      ALL_REVIEWS,
    ),
    await directContext(
      "context.canonical-gate-receipt",
      gatePaths.receipt,
      "Closed exact-candidate canonical-gate receipt.",
      ALL_REVIEWS,
    ),
    await directContext(
      "context.canonical-gate-stdout",
      gatePaths.stdout,
      "Exact raw canonical-gate stdout bytes.",
      ALL_REVIEWS,
    ),
    await directContext(
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
  const sources = await collectSourceSpecs();
  await verifyCheckpoint(checkpoint, sources);
  const gate = await validateGateReceipt(checkpoint);
  const { evidenceSets, correctionLineage } = await verifyPrimaryEvidenceSets();
  const rows = await materializeSnapshots(sources);
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
      snapshotPath: preIntegration.snapshotPath,
      bytes: preIntegration.bytes,
      digest: preIntegration.digest,
    },
    verifiedEvidenceSets: evidenceSets,
    correctionLineage,
    reviewedSources: rows,
  };
  await writeImmutableJson(CANDIDATE_MANIFEST, candidateManifest);
  const contextSources = await preparedContexts(rows, candidateManifest, gate.paths);
  assertPrimaryCoverage(contextSources, rows, evidenceSets, correctionLineage, gate.paths);
  const request = requestFor(contextSources, checkpoint);
  await writeImmutableJson(
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/request.json",
    request,
  );
  await writeImmutableJson(
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/phase-metadata.json",
    {
      phase: "release-review-r2",
      checkpoint,
      goalId: request.goal.id,
      goalRevision: request.goal.revision,
      canonicalGateReceipt: gate.receiptBinding,
      sourceSnapshots: rows.length,
      primaryEvidenceSets: evidenceSets.map((entry) => entry.id),
      correctionReplans: correctionLineage.replans.map((entry) => entry.path),
      runtimeInvoked: false,
    },
  );
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        stage: "release-review-r2-prepared",
        checkpoint,
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

async function validatePreparedInputs() {
  const parsedManifest = await readCanonicalJson(CANDIDATE_MANIFEST);
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
      CANDIDATE_PATTERN.test(manifest.candidateCommit),
    "Prepared candidate manifest identity mismatch.",
  );

  const sources = await collectSourceSpecs();
  await verifyCheckpoint(manifest.candidateCommit, sources);
  const gate = await validateGateReceipt(manifest.candidateCommit);
  const { evidenceSets, correctionLineage } = await verifyPrimaryEvidenceSets();
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
    requireCondition(
      row.contextId === entry.id &&
        row.snapshotPath === snapshotPath(entry) &&
        row.description === entry.description &&
        JSON.stringify(row.allowedWorkUnits) === JSON.stringify(entry.allowedWorkUnits),
      `Prepared reviewer source metadata changed: ${row.originalPath}.`,
    );
    const bytes = await readFile(absolute(row.snapshotPath));
    requireCondition(
      bytes.byteLength === row.bytes && digest(bytes) === row.digest,
      `Prepared reviewer snapshot changed: ${row.snapshotPath}.`,
    );
  }

  const requestPath = "docs/specs/v12-ide-run-loop/evidence/release-review-r2/request.json";
  const request = (await readCanonicalJson(requestPath)).value;
  const contextSources = request.goal?.contextSources;
  requireCondition(Array.isArray(contextSources), "Prepared request lacks context sources.");
  for (const context of contextSources) {
    const bytes = await readFile(absolute(context.readScope));
    requireCondition(
      bytes.byteLength === context.bytes && digest(bytes) === context.digest,
      `Prepared context source changed: ${context.readScope}.`,
    );
  }
  assertPrimaryCoverage(
    contextSources,
    manifest.reviewedSources,
    evidenceSets,
    correctionLineage,
    gate.paths,
  );
  return { manifest, request };
}

async function compile() {
  const { manifest, request } = await validatePreparedInputs();
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
      `docs/specs/v12-ide-run-loop/evidence/release-review-r2/package/${file.path}`,
      Buffer.from(file.content, "utf8"),
    );
  }
  await writeImmutableJson(
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/package-envelope.json",
    specialistPackage,
  );
  const summary = {
    goalId: compilation.goal.id,
    goalRevision: compilation.goal.revision,
    candidateCommit: manifest.candidateCommit,
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
  await writeImmutableJson(
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/compilation-summary.json",
    summary,
  );
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

async function approve() {
  const { manifest, request } = await validatePreparedInputs();
  const specialistPackage = (
    await readCanonicalJson(
      "docs/specs/v12-ide-run-loop/evidence/release-review-r2/package-envelope.json",
    )
  ).value;
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
  await writeImmutableJson(
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/approval.json",
    approval,
  );
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        stage: "release-review-r2-package-approved",
        candidateCommit: manifest.candidateCommit,
        ...expectation,
      },
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
    const paths = gateEvidencePaths(checkpoint);
    requireVersionableEvidencePaths(paths);
    requireBytePreservingEvidencePaths(paths);
    process.stdout.write(`${JSON.stringify({ candidateCommit: checkpoint, ...paths }, null, 2)}\n`);
  } else {
    throw new Error(`Unknown mode: ${mode}.`);
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
  process.exitCode = 1;
});
