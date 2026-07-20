import { createHash } from "node:crypto";
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
const phase = process.argv[2] ?? "foundation";
const mode = process.argv[3] ?? "prepare";
const checkpoint = process.argv[4];
const PHASE_DIR = join(EVIDENCE, phase);
const INPUTS = join(PHASE_DIR, "inputs");
const PACKAGE_DIR = join(PHASE_DIR, "package");

const SNAPSHOTS = [
  {
    id: "context.v12-spec",
    source: "docs/specs/v12-ide-run-loop/spec.md",
    target: "spec.md",
    description: "Frozen V12 feature specification.",
  },
  {
    id: "context.run-contract",
    source: "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
    target: "specialist-run-contract.md",
    description: "Frozen normative Specialist Run contract.",
  },
  {
    id: "context.adr-0005",
    source: "docs/architecture/decisions/0005-immutable-specialist-run-session.md",
    target: "adr-0005.md",
    description: "Accepted immutable Specialist Run Session decision.",
  },
  {
    id: "context.test-plan",
    source: "docs/specs/v12-ide-run-loop/test-plan.md",
    target: "test-plan.md",
    description: "Frozen V12 verification obligations.",
  },
];

const REPOSITORY_SOURCES = {
  "context.specialist-types": [
    "src/specialist-types.ts",
    "Existing V11 compiler, package, and handoff types.",
  ],
  "context.specialist-handoff": [
    "src/specialist-handoff.ts",
    "Existing package-bound raw handoff and fan-in implementation.",
  ],
  "context.specialist-render": [
    "src/specialist-render.ts",
    "Existing rendered package verification and manifest resolution.",
  ],
  "context.canonical-json": [
    "src/canonical-json.ts",
    "Existing bounded canonical JSON and framed digest primitives.",
  ],
  "context.json-parser": [
    "src/json.ts",
    "Existing duplicate-aware bounded raw JSON parser.",
  ],
  "context.snapshot": [
    "src/snapshot.ts",
    "Existing defensive JSON snapshot and deep-freeze boundary.",
  ],
  "context.privacy": [
    "src/privacy.ts",
    "Existing high-confidence secret detection.",
  ],
  "context.text": [
    "src/text.ts",
    "Existing control-character and Unicode checks.",
  ],
  "context.model": ["src/model.ts", "Existing closed JSON model types."],
  "context.constants": ["src/constants.ts", "Existing public kernel constants and limits."],
  "context.diagnostics": [
    "src/diagnostics.ts",
    "Existing diagnostic registry and stable operation result helpers.",
  ],
  "context.index": ["src/index.ts", "Existing public package export surface."],
  "context.package": ["package.json", "Existing package scripts and export map."],
  "context.specialist-schema-code": [
    "src/specialist-schema.ts",
    "Existing Specialist Compiler schema validator pattern.",
  ],
  "context.specialist-schema-json": [
    "schemas/v1alpha1/specialist-compiler.schema.json",
    "Existing closed Specialist Compiler schema pattern.",
  ],
  "context.handoff-schema-code": [
    "src/specialist-handoff-schema.ts",
    "Existing Specialist Handoff schema validator pattern.",
  ],
  "context.handoff-schema-json": [
    "schemas/v1alpha1/specialist-handoff.schema.json",
    "Existing closed Specialist Handoff schema pattern.",
  ],
  "context.common-schema-json": [
    "schemas/v1alpha1/common.schema.json",
    "Existing shared schema definitions consumed by the V11 handoff validator.",
  ],
  "context.handoff-tests": [
    "test/specialist-handoff.test.mjs",
    "Existing adversarial package and handoff tests.",
  ],
  "context.compiler-tests": [
    "test/specialist-compiler.test.mjs",
    "Existing package construction and verification fixtures.",
  ],
  "context.packed-host": [
    "scripts/fixtures/packed-consumer-host.ts",
    "Installed-consumer TypeScript host fixture.",
  ],
  "context.packed-check": [
    "scripts/check-packed-consumer.mjs",
    "Installed-package export and runtime verification.",
  ],
  "context.schema-readme": [
    "schemas/v1alpha1/README.md",
    "Published schema catalog and semantics.",
  ],
  "context.diagnostic-catalog": [
    "schemas/v1alpha1/diagnostic-catalog.json",
    "Normative diagnostic catalog kept in parity with runtime definitions.",
  ],
  "context.ide-guide": [
    "docs/ide/specialist-agent-kickoff.md",
    "Current visible IDE specialist workflow.",
  ],
  "context.modules-readme": [
    "docs/modules/README.md",
    "Current module catalog guidance.",
  ],
  "context.readme": ["README.md", "Current concise public product surface."],
  "context.run-types": [
    "src/specialist-run-types.ts",
    "Frozen V12 run-session wire and public types.",
  ],
  "context.run-schema-code": [
    "src/specialist-run-schema.ts",
    "Frozen V12 run-session schema validator.",
  ],
  "context.run-schema-data": [
    "src/specialist-run-schema-data.ts",
    "Revision-2 package-owned V12 run schema data module.",
  ],
  "context.run-schema-json": [
    "schemas/v1alpha1/specialist-run.schema.json",
    "Frozen V12 run-session JSON Schema.",
  ],
  "context.run-session": [
    "src/specialist-run-session.ts",
    "Frozen V12 session creation, restoration, and validation foundation.",
  ],
  "context.run-transition": [
    "src/specialist-run-transition.ts",
    "V12 handoff transition implementation.",
  ],
  "context.run-inspection": [
    "src/specialist-run-inspection.ts",
    "V12 deterministic inspection implementation.",
  ],
  "context.transition-tests": [
    "test/specialist-run-transition.test.mjs",
    "Focused V12 transition tests.",
  ],
  "context.inspection-tests": [
    "test/specialist-run-inspection.test.mjs",
    "Focused V12 inspection tests.",
  ],
  "context.foundation-tests": [
    "test/specialist-run-foundation.test.mjs",
    "Focused V12 create, restore, identity, and boundary tests.",
  ],
  "context.schema-tests": [
    "test/specialist-run-schema.test.mjs",
    "Strict V12 schema and public export tests.",
  ],
  "context.run-tests": [
    "test/specialist-run.test.mjs",
    "Integrated V12 adversarial, permutation, restore, and resource tests.",
  ],
  "context.review-product": [
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
    "Exact product/API/IDE release-review FIX handoff.",
  ],
  "context.review-lifecycle": [
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
    "Exact lifecycle/correctness release-review FIX handoff.",
  ],
  "context.review-security": [
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
    "Exact security/trace/authority release-review FIX handoff.",
  ],
  "context.review-verification": [
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
    "Complete package-bound attempt-1 release-review routing report.",
  ],
  "context.review-harness": [
    "docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
    "Attempt-1 release-review compiler and approval harness.",
  ],
  "context.review-handoff-verifier": [
    "docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
    "Attempt-1 exact raw reviewer handoff verifier.",
  ],
  "context.verification-package": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
    "Approved V12 verification implementation package.",
  ],
  "context.verification-approval": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
    "Exact V12 verification package approval.",
  ],
  "context.verification-handoff-a": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
    "Exact raw V12 adversarial-verification handoff.",
  ],
  "context.verification-handoff-b": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
    "Exact raw V12 IDE-dogfood handoff.",
  ],
  "context.verification-report": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
    "Complete V12 verification implementation handoff report.",
  ],
  "context.v11-audit-approval": [
    "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
    "Exact current Audit-B approval bytes required for release replay.",
  ],
  "context.release-correction-package": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
    "Original owner-approved release-correction package whose downstream contract was retired.",
  ],
  "context.release-correction-approval": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
    "Exact owner approval for the original release-correction package.",
  ],
  "context.release-correction-aggregate-handoff": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
    "Verified upstream aggregate-resource PASS handoff that changed bound runtime sources.",
  ],
  "context.retired-runtime-contract": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package/agents/agent.b73ee06f2af37577c9726f116f1c4741a7012982796300e06e11bb243e93eefe.md",
    "Exact unlaunched runtime-purity contract retired after its source bindings became stale.",
  ],
  "context.release-correction-r2-package": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json",
    "Owner-approved revision-2 package that produced the verified split diagnosis.",
  ],
  "context.release-correction-r2-approval": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json",
    "Exact owner approval for the revision-2 package.",
  ],
  "context.release-correction-r2-handoff": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json",
    "Verified revision-2 SPLIT handoff with the bounded V11 first-use filesystem diagnosis.",
  ],
  "context.release-correction-r2-replan": [
    "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json",
    "Trace of the retired revision-1 contract and revision-2 replacement result.",
  ],
};

const FOUNDATION_WRITES = [
  "schemas/v1alpha1/specialist-run.schema.json",
  "src/constants.ts",
  "src/diagnostics.ts",
  "src/specialist-run-schema.ts",
  "src/specialist-run-session.ts",
  "src/specialist-run-types.ts",
];

const FOUNDATION_FIX_WRITES = [
  "src/specialist-run-session.ts",
  "test/specialist-run-foundation.test.mjs",
];

const TRANSITION_WRITES = [
  "src/specialist-run-transition.ts",
  "test/specialist-run-transition.test.mjs",
];

const INSPECTION_WRITES = [
  "src/specialist-run-inspection.ts",
  "test/specialist-run-inspection.test.mjs",
];

const PUBLIC_WRITES = [
  "package.json",
  "schemas/v1alpha1/diagnostic-catalog.json",
  "schemas/v1alpha1/README.md",
  "scripts/check-packed-consumer.mjs",
  "scripts/fixtures/packed-consumer-host.ts",
  "src/index.ts",
];

const VERIFICATION_WRITES = [
  "test/specialist-run-schema.test.mjs",
  "test/specialist-run.test.mjs",
];

const DOGFOOD_WRITES = [
  "docs/ide/specialist-agent-kickoff.md",
  "docs/modules/README.md",
  "docs/modules/specialist-run-session.md",
  "scripts/run-v12-dogfood.mjs",
];

const RELEASE_PURITY_WRITES = [
  "src/specialist-run-inspection.ts",
  "src/specialist-run-schema-data.ts",
  "src/specialist-run-schema.ts",
  "test/specialist-run-foundation.test.mjs",
  "test/specialist-run-inspection.test.mjs",
];

const RELEASE_PURITY_R3_WRITES = [
  ...RELEASE_PURITY_WRITES,
  "src/specialist-handoff-schema-data.ts",
  "src/specialist-handoff-schema.ts",
];

const RELEASE_RESOURCE_WRITES = [
  "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
  "src/constants.ts",
  "test/specialist-run-schema.test.mjs",
  "test/specialist-run.test.mjs",
];

const RELEASE_DOGFOOD_WRITES = ["scripts/run-v12-dogfood.mjs"];

const RELEASE_EVIDENCE_WRITES = [
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
  "scripts/run-v12-release-gate.mjs",
];

const CONFIGS = {
  foundation: {
    objective:
      "Implement the source-preserving Specialist Run foundation exactly as frozen in ADR 0005 and the V12 normative contract.",
    maxAgents: 1,
    maxConcurrency: 1,
    sourceIds: [
      "context.v12-spec",
      "context.run-contract",
      "context.adr-0005",
      "context.test-plan",
      "context.specialist-types",
      "context.specialist-handoff",
      "context.specialist-render",
      "context.canonical-json",
      "context.json-parser",
      "context.snapshot",
      "context.privacy",
      "context.text",
      "context.model",
      "context.constants",
      "context.diagnostics",
      "context.specialist-schema-code",
      "context.specialist-schema-json",
      "context.handoff-schema-code",
      "context.handoff-schema-json",
      "context.handoff-tests",
      "context.compiler-tests",
      "context.package",
    ],
    workUnits: [
      {
        id: "implement.foundation",
        objective:
          "Add the closed types, schema, limits, diagnostics, defensive validator, create operation, and raw restore operation for SpecialistRunSession.",
        weight: 13,
        moduleId: "implementation.run-session-foundation",
        action:
          "Implement only the frozen wire contract and create/restore semantics by composing V11 package, parser, snapshot, privacy, and digest primitives; add focused foundation coverage without widening host claims.",
        inputType: "FrozenSpecialistRunContract",
        outputType: "RunSessionFoundation",
        capability: "implement.source-preserving-session",
        evidenceId: "evidence.foundation-implementation",
        evidenceDescription:
          "Provide focused build and foundation conformance evidence mapped to AC1 and AC6.",
        artifact: "foundation-implementation.md",
        writes: FOUNDATION_WRITES,
      },
    ],
  },
  parallel: {
    objective:
      "Implement exact Specialist Run handoff transitions and deterministic inspection in parallel over the frozen foundation.",
    maxAgents: 2,
    maxConcurrency: 2,
    processScopes: ["node", "npm", "powershell"],
    allowHashGuardedFallback: true,
    sourceIds: [
      "context.v12-spec",
      "context.run-contract",
      "context.adr-0005",
      "context.test-plan",
      "context.specialist-types",
      "context.specialist-handoff",
      "context.specialist-render",
      "context.canonical-json",
      "context.snapshot",
      "context.constants",
      "context.diagnostics",
      "context.run-types",
      "context.run-schema-code",
      "context.run-schema-json",
      "context.run-session",
      "context.handoff-tests",
      "context.compiler-tests",
    ],
    workUnits: [
      {
        id: "implement.handoff-transition",
        objective:
          "Implement monotonic handoff recording, exact replay, conflict rejection, dependency gates, terminal non-pass routing, and unchanged-state failure.",
        weight: 7,
        moduleId: "implementation.run-handoff-transition",
        action:
          "Compose V11 handoff verification with the frozen session validator and add the complete transition matrix for AC3 and AC4.",
        inputType: "VerifiedRunSessionFoundation",
        outputType: "RunHandoffTransition",
        capability: "implement.monotonic-transition",
        evidenceId: "evidence.transition-implementation",
        evidenceDescription:
          "Provide transition, replay, routing, diagnostic precedence, and immutability evidence for AC3 and AC4.",
        artifact: "handoff-transition-implementation.md",
        writes: TRANSITION_WRITES,
        sourceIds: [
          "context.v12-spec",
          "context.run-contract",
          "context.adr-0005",
          "context.test-plan",
          "context.specialist-types",
          "context.specialist-handoff",
          "context.canonical-json",
          "context.snapshot",
          "context.constants",
          "context.diagnostics",
          "context.run-types",
          "context.run-schema-code",
          "context.run-schema-json",
          "context.run-session",
          "context.handoff-tests",
        ],
      },
      {
        id: "implement.session-inspection",
        objective:
          "Implement every-agent status, manifest-resolved dependency eligibility, accepted evidence, routes, complete-roster readiness, and closed next actions.",
        weight: 7,
        moduleId: "implementation.run-session-inspection",
        action:
          "Derive the closed inspection from the frozen package DAG and accepted handoffs, add DAG and differential readiness coverage, and preserve the external-host boundary for AC2 and AC5.",
        inputType: "VerifiedRunSessionFoundation",
        outputType: "RunSessionInspection",
        capability: "implement.deterministic-inspection",
        evidenceId: "evidence.inspection-implementation",
        evidenceDescription:
          "Provide DAG status, manifest resolution, evidence binding, and complete-roster readiness evidence for AC2 and AC5.",
        artifact: "session-inspection-implementation.md",
        writes: INSPECTION_WRITES,
        sourceIds: [
          "context.v12-spec",
          "context.run-contract",
          "context.adr-0005",
          "context.test-plan",
          "context.specialist-types",
          "context.specialist-handoff",
          "context.specialist-render",
          "context.canonical-json",
          "context.snapshot",
          "context.constants",
          "context.diagnostics",
          "context.run-types",
          "context.run-schema-code",
          "context.run-schema-json",
          "context.run-session",
          "context.compiler-tests",
        ],
      },
    ],
  },
  public: {
    objective:
      "Integrate the accepted Specialist Run implementation into the additive public package surface without changing V11 identities.",
    maxAgents: 1,
    maxConcurrency: 1,
    processScopes: ["node", "npm", "powershell"],
    allowHashGuardedFallback: true,
    sourceIds: [
      "context.v12-spec",
      "context.run-contract",
      "context.adr-0005",
      "context.test-plan",
      "context.constants",
      "context.diagnostics",
      "context.index",
      "context.package",
      "context.schema-readme",
      "context.diagnostic-catalog",
      "context.packed-host",
      "context.packed-check",
      "context.run-types",
      "context.run-schema-code",
      "context.run-schema-json",
      "context.run-session",
      "context.run-transition",
      "context.run-inspection",
      "context.transition-tests",
      "context.inspection-tests",
    ],
    workUnits: [
      {
        id: "integrate.public-surface",
        objective:
          "Export the four operations, constants, and closed types; publish the schema path; and prove clean installed-consumer use.",
        weight: 6,
        moduleId: "integration.run-public-surface",
        action:
          "Update only the additive export, package, schema catalog, and packed-consumer surfaces; retain every V11 export and add the V12 dogfood command without implementing host effects.",
        inputType: "VerifiedRunImplementation",
        outputType: "IntegratedRunPublicSurface",
        capability: "integrate.public-package-surface",
        evidenceId: "evidence.public-integration",
        evidenceDescription:
          "Provide declaration, schema export, packed-consumer, and V11 compatibility evidence for AC6 and AC9.",
        artifact: "public-surface-integration.md",
        writes: PUBLIC_WRITES,
      },
    ],
  },
  verification: {
    objective:
      "Complete independent V12 adversarial verification and the visible IDE dogfood surface over the frozen public candidate.",
    maxAgents: 2,
    maxConcurrency: 2,
    processScopes: ["node", "npm", "powershell"],
    allowHashGuardedFallback: true,
    sourceIds: [
      "context.v12-spec",
      "context.run-contract",
      "context.adr-0005",
      "context.test-plan",
      "context.package",
      "context.index",
      "context.specialist-handoff",
      "context.specialist-render",
      "context.run-types",
      "context.run-schema-code",
      "context.run-schema-json",
      "context.run-session",
      "context.run-transition",
      "context.run-inspection",
      "context.transition-tests",
      "context.inspection-tests",
      "context.handoff-tests",
      "context.compiler-tests",
      "context.packed-host",
      "context.packed-check",
      "context.ide-guide",
      "context.modules-readme",
      "context.readme",
    ],
    workUnits: [
      {
        id: "verify.run-session",
        objective:
          "Independently attack the complete V12 contract, schema, transitions, inspection, limits, authority boundary, and public surface.",
        weight: 9,
        moduleId: "verification.run-session",
        action:
          "Add adversarial, boundary, permutation, fresh-process, differential, public-export, and compatibility tests without repairing production code.",
        inputType: "FrozenRunReleaseCandidate",
        outputType: "RunSessionVerification",
        capability: "verify.adversarial-run-session",
        evidenceId: "evidence.run-verification",
        evidenceDescription:
          "Provide independent negative, boundary, lifecycle, schema, and package-consumer evidence for AC1-AC6 and AC9.",
        artifact: "run-session-verification.md",
        writes: VERIFICATION_WRITES,
        sourceIds: [
          "context.v12-spec",
          "context.run-contract",
          "context.adr-0005",
          "context.test-plan",
          "context.package",
          "context.index",
          "context.specialist-handoff",
          "context.specialist-render",
          "context.run-types",
          "context.run-schema-code",
          "context.run-schema-json",
          "context.run-session",
          "context.run-transition",
          "context.run-inspection",
          "context.transition-tests",
          "context.inspection-tests",
          "context.handoff-tests",
          "context.compiler-tests",
          "context.packed-host",
          "context.packed-check",
        ],
      },
      {
        id: "dogfood.ide-run-loop",
        objective:
          "Make the four-operation IDE journey visible and dogfoodable without hiding external host responsibilities.",
        weight: 6,
        moduleId: "dogfood.ide-run-loop",
        action:
          "Add a deterministic V12 dogfood script and concise module/IDE guidance that shows goal review, package approval, dependency eligibility, exact fan-in, routing, and separate integration closeout.",
        inputType: "FrozenRunReleaseCandidate",
        outputType: "IdeRunLoopDogfood",
        capability: "document.dogfood-ide-run-loop",
        evidenceId: "evidence.ide-dogfood",
        evidenceDescription:
          "Provide a replayable IDE journey and measured host-boundary evidence for AC7 and AC8.",
        artifact: "ide-run-loop-dogfood.md",
        writes: DOGFOOD_WRITES,
        sourceIds: [
          "context.v12-spec",
          "context.run-contract",
          "context.adr-0005",
          "context.test-plan",
          "context.package",
          "context.index",
          "context.run-types",
          "context.run-schema-json",
          "context.run-session",
          "context.run-transition",
          "context.run-inspection",
          "context.ide-guide",
          "context.modules-readme",
          "context.readme",
        ],
      },
    ],
  },
};

CONFIGS["foundation-r2"] = {
  ...CONFIGS.foundation,
  goalPhase: "foundation",
  goalRevision: 2,
  processScopes: ["node", "npm", "powershell"],
  allowHashGuardedFallback: true,
};

CONFIGS["foundation-r3"] = {
  objective:
    "Correct the Foundation Revision-2 decoded raw-handoff boundary classification and add durable focused regression coverage without changing the frozen public or wire contract.",
  goalPhase: "foundation",
  goalRevision: 3,
  maxAgents: 1,
  maxConcurrency: 1,
  processScopes: ["node", "npm", "powershell"],
  allowHashGuardedFallback: true,
  sourceIds: [
    "context.v12-spec",
    "context.run-contract",
    "context.adr-0005",
    "context.test-plan",
    "context.specialist-types",
    "context.specialist-handoff",
    "context.specialist-render",
    "context.canonical-json",
    "context.json-parser",
    "context.snapshot",
    "context.privacy",
    "context.text",
    "context.model",
    "context.constants",
    "context.diagnostics",
    "context.run-types",
    "context.run-schema-code",
    "context.run-schema-json",
    "context.run-session",
    "context.handoff-tests",
    "context.compiler-tests",
  ],
  workUnits: [
    {
      id: "fix.foundation-resource-classification",
      objective:
        "Return SC4402 when canonical base64 at the character ceiling decodes beyond rawHandoffBytes, retain SC4401 for malformed base64, and lock both cases with a focused persistent test.",
      weight: 3,
      moduleId: "diagnosis.run-session-foundation",
      action:
        "Apply the smallest causal correction to decoded-base64 classification and add a real-package regression test; preserve every other create and restore semantic and do not add transition, inspection, or public exports.",
      inputType: "VerifiedFoundationBoundaryFailure",
      outputType: "CorrectedRunSessionFoundation",
      capability: "diagnose.resource-boundary-classification",
      evidenceId: "evidence.foundation-boundary-correction",
      evidenceDescription:
        "Provide focused regression, typecheck, and compatibility evidence for the exact decoded-byte boundary defect.",
      artifact: "foundation-boundary-correction.md",
      writes: FOUNDATION_FIX_WRITES,
    },
  ],
};

CONFIGS["release-correction"] = {
  objective:
    "Correct every causal V12 release-review attempt-1 finding without adding provider runtime behavior or widening the four-operation public contract.",
  goalRevision: 1,
  maxAgents: 4,
  maxConcurrency: 4,
  processScopes: ["node", "npm", "powershell"],
  allowHashGuardedFallback: true,
  sourceIds: [
    "context.v12-spec",
    "context.run-contract",
    "context.adr-0005",
    "context.test-plan",
    "context.specialist-types",
    "context.specialist-handoff",
    "context.specialist-render",
    "context.canonical-json",
    "context.json-parser",
    "context.snapshot",
    "context.privacy",
    "context.text",
    "context.model",
    "context.constants",
    "context.diagnostics",
    "context.package",
    "context.run-types",
    "context.run-schema-code",
    "context.run-schema-json",
    "context.run-session",
    "context.run-transition",
    "context.run-inspection",
    "context.foundation-tests",
    "context.transition-tests",
    "context.inspection-tests",
    "context.schema-tests",
    "context.run-tests",
    "context.ide-guide",
    "context.modules-readme",
    "context.readme",
    "context.review-product",
    "context.review-lifecycle",
    "context.review-security",
    "context.review-verification",
    "context.review-harness",
    "context.review-handoff-verifier",
    "context.verification-package",
    "context.verification-approval",
    "context.verification-handoff-a",
    "context.verification-handoff-b",
    "context.verification-report",
    "context.v11-audit-approval",
  ],
  workUnits: [
    {
      id: "fix.runtime-purity-ordering",
      objective:
        "Remove first-use filesystem schema loading from all four run operations, order accepted evidence by requirement identity, and lock both corrections with causal tests.",
      weight: 8,
      moduleId: "correction.runtime-purity-ordering",
      action:
        "Bundle immutable package-owned schema data into TypeScript without changing the exported schema subpath; compose it with the existing strict Ajv validator, add a fresh-process no-filesystem-read proof for create/restore/inspect/record, sort evidence by requirementId before the complete tuple, and add counterordered IDs.",
      inputType: "VerifiedReleaseReviewFindings",
      outputType: "PureOrderedRunOperations",
      capability: "fix.runtime-purity-ordering",
      evidenceId: "evidence.runtime-purity-ordering",
      evidenceDescription:
        "Provide exact source parity, no-filesystem-effect, counterordered identity, focused test, typecheck, and build evidence.",
      artifact: "runtime-purity-ordering-correction.md",
      writes: RELEASE_PURITY_WRITES,
      sourceIds: [
        "context.v12-spec",
        "context.run-contract",
        "context.adr-0005",
        "context.test-plan",
        "context.specialist-handoff",
        "context.specialist-render",
        "context.canonical-json",
        "context.json-parser",
        "context.snapshot",
        "context.privacy",
        "context.text",
        "context.model",
        "context.constants",
        "context.diagnostics",
        "context.run-types",
        "context.run-schema-code",
        "context.run-schema-json",
        "context.run-session",
        "context.run-transition",
        "context.run-inspection",
        "context.foundation-tests",
        "context.transition-tests",
        "context.inspection-tests",
        "context.review-lifecycle",
        "context.review-security",
      ],
    },
    {
      id: "fix.aggregate-resource-proof",
      objective:
        "Close the normative aggregate resource proof with a real 16-agent package and 16 maximum valid handoffs, or make the smallest reviewed contract correction for any provably unreachable aggregate ceiling.",
      weight: 8,
      moduleId: "correction.aggregate-resource-proof",
      action:
        "Construct the complete valid aggregate, exercise record/restore/inspect convergence and every published boundary, distinguish raw attacker limits from conservative aggregate safeguards, and change constants or Resource Proof wording only when constituent ceilings prove exact at-limit reachability impossible.",
      inputType: "VerifiedReleaseReviewFindings",
      outputType: "ReachableAggregateResourceProof",
      capability: "fix.aggregate-resource-proof",
      evidenceId: "evidence.aggregate-resource-proof",
      evidenceDescription:
        "Provide the 16-agent maximum-handoff fixture, boundary calculations, at-limit/over-limit evidence where reachable, focused tests, and rationale for any reviewed contract correction.",
      artifact: "aggregate-resource-proof-correction.md",
      writes: RELEASE_RESOURCE_WRITES,
      sourceIds: [
        "context.v12-spec",
        "context.run-contract",
        "context.adr-0005",
        "context.test-plan",
        "context.specialist-types",
        "context.specialist-handoff",
        "context.specialist-render",
        "context.canonical-json",
        "context.constants",
        "context.diagnostics",
        "context.run-types",
        "context.run-schema-json",
        "context.run-session",
        "context.run-transition",
        "context.run-inspection",
        "context.schema-tests",
        "context.run-tests",
        "context.review-lifecycle",
        "context.review-security",
      ],
    },
    {
      id: "fix.implementation-dogfood",
      objective:
        "Make canonical V12 dogfood operate on the exact release-correction implementation package and raw handoffs while preserving the existing synthetic API regression journey.",
      weight: 6,
      moduleId: "correction.implementation-dogfood",
      action:
        "Extend the deterministic dogfood harness to load the approval-bound release-correction package through public V12 operations, derive contracts from its manifest, record exact raw handoffs, serialize/restore/reinspect, preserve an immutable integration snapshot, and report every AC8 friction metric without claiming host effects.",
      inputType: "VerifiedReleaseReviewFindings",
      outputType: "ImplementationPackageDogfoodHarness",
      capability: "fix.implementation-dogfood",
      evidenceId: "evidence.implementation-dogfood",
      evidenceDescription:
        "Provide syntax and synthetic-regression evidence plus a finalization contract the integration owner can run only after the exact correction handoffs exist.",
      artifact: "implementation-dogfood-correction.md",
      writes: RELEASE_DOGFOOD_WRITES,
      sourceIds: [
        "context.v12-spec",
        "context.run-contract",
        "context.adr-0005",
        "context.test-plan",
        "context.package",
        "context.specialist-handoff",
        "context.specialist-render",
        "context.run-types",
        "context.run-session",
        "context.run-transition",
        "context.run-inspection",
        "context.ide-guide",
        "context.modules-readme",
        "context.readme",
        "context.verification-package",
        "context.verification-approval",
        "context.verification-handoff-a",
        "context.verification-handoff-b",
        "context.verification-report",
        "context.review-product",
        "context.review-security",
      ],
    },
    {
      id: "fix.release-evidence",
      objective:
        "Create the immutable candidate-bound canonical-gate receipt and second release-review harness with source snapshots and complete primary evidence.",
      weight: 6,
      moduleId: "correction.release-evidence",
      action:
        "Add a local gate wrapper that preserves exact stdout/stderr bytes and a closed candidate receipt; revise the next review harness to bind an immutable pre-integration review snapshot, raw V12 handoffs, Audit-B approval bytes, gate log and receipt, and all exact reviewer sources before compilation and approval.",
      inputType: "VerifiedReleaseReviewFindings",
      outputType: "ImmutableReleaseEvidenceHarness",
      capability: "fix.release-evidence",
      evidenceId: "evidence.release-evidence",
      evidenceDescription:
        "Provide script syntax, closed receipt validation, immutable snapshot behavior, primary-source context coverage, and no-summary-only release claim evidence.",
      artifact: "release-evidence-correction.md",
      writes: RELEASE_EVIDENCE_WRITES,
      sourceIds: [
        "context.v12-spec",
        "context.run-contract",
        "context.adr-0005",
        "context.test-plan",
        "context.package",
        "context.review-harness",
        "context.review-handoff-verifier",
        "context.review-product",
        "context.review-lifecycle",
        "context.review-security",
        "context.review-verification",
        "context.verification-handoff-a",
        "context.verification-handoff-b",
        "context.verification-report",
        "context.v11-audit-approval",
      ],
    },
  ],
};

CONFIGS["release-correction-r2"] = {
  objective:
    "Complete the remaining V12 runtime-purity and evidence-ordering correction after a verified upstream resource change invalidated the original source-bound specialist contract.",
  goalPhase: "release-correction",
  goalRevision: 2,
  maxAgents: 1,
  maxConcurrency: 1,
  processScopes: ["node", "npm", "powershell"],
  allowHashGuardedFallback: true,
  assumptions: [
    {
      id: "assumption.source-bound-replan",
      statement:
        "The original runtime-purity specialist contract is retired and must not launch because verified upstream work changed its bound run contract and constants sources.",
      rationale:
        "A source-bound contract cannot authenticate or safely act on bytes that differ from its approved package; revision 2 recompiles the remaining work against the exact integrated sources.",
    },
  ],
  sourceIds: [
    "context.v12-spec",
    "context.run-contract",
    "context.adr-0005",
    "context.test-plan",
    "context.specialist-handoff",
    "context.specialist-render",
    "context.canonical-json",
    "context.json-parser",
    "context.snapshot",
    "context.privacy",
    "context.text",
    "context.model",
    "context.constants",
    "context.diagnostics",
    "context.run-types",
    "context.run-schema-code",
    "context.run-schema-json",
    "context.run-session",
    "context.run-transition",
    "context.run-inspection",
    "context.foundation-tests",
    "context.transition-tests",
    "context.inspection-tests",
    "context.review-lifecycle",
    "context.review-security",
    "context.release-correction-package",
    "context.release-correction-approval",
    "context.release-correction-aggregate-handoff",
    "context.retired-runtime-contract",
  ],
  workUnits: [
    {
      id: "fix.runtime-purity-ordering.r2",
      objective:
        "Remove first-use filesystem schema loading from all four run operations, order accepted evidence by requirement identity, and lock both corrections with causal tests against the integrated resource limits.",
      weight: 8,
      moduleId: "correction.runtime-purity-ordering",
      action:
        "Authenticate the retired contract and upstream PASS evidence, then bundle immutable package-owned schema data into TypeScript without changing the exported schema subpath; compose it with the existing strict Ajv validator, add a fresh-process no-filesystem-read proof for create/restore/inspect/record, sort evidence by requirementId before the complete tuple, and add counterordered IDs.",
      inputType: "VerifiedSourceBoundReplan",
      outputType: "PureOrderedRunOperations",
      capability: "fix.runtime-purity-ordering",
      evidenceId: "evidence.runtime-purity-ordering.r2",
      evidenceDescription:
        "Provide retired-contract authentication, exact source parity, no-filesystem-effect, counterordered identity, focused test, typecheck, and build evidence.",
      artifact: "runtime-purity-ordering-correction-r2.md",
      writes: RELEASE_PURITY_WRITES,
    },
  ],
};

CONFIGS["release-correction-r3"] = {
  objective:
    "Complete V12 first-use runtime purity after revision 2 proved that record reaches the unchanged V11 handoff schema loader outside its prior authority.",
  goalPhase: "release-correction",
  goalRevision: 3,
  maxAgents: 1,
  maxConcurrency: 1,
  processScopes: ["node", "npm", "powershell"],
  allowHashGuardedFallback: true,
  assumptions: [
    {
      id: "assumption.split-scope-expansion",
      statement:
        "Revision 2 is a verified split: its partial V12 corrections are preserved, and revision 3 adds only the causally proven V11 handoff schema loader to authority.",
      rationale:
        "The unprimed four-operation regression reached exactly one out-of-scope read of common.schema.json from recordSpecialistRunHandoff; priming the validator would hide the defect.",
    },
  ],
  sourceIds: [
    "context.v12-spec",
    "context.run-contract",
    "context.adr-0005",
    "context.test-plan",
    "context.specialist-handoff",
    "context.specialist-render",
    "context.canonical-json",
    "context.json-parser",
    "context.snapshot",
    "context.privacy",
    "context.text",
    "context.model",
    "context.constants",
    "context.diagnostics",
    "context.run-types",
    "context.run-schema-code",
    "context.run-schema-data",
    "context.run-schema-json",
    "context.run-session",
    "context.run-transition",
    "context.run-inspection",
    "context.handoff-schema-code",
    "context.handoff-schema-json",
    "context.common-schema-json",
    "context.foundation-tests",
    "context.transition-tests",
    "context.inspection-tests",
    "context.handoff-tests",
    "context.review-lifecycle",
    "context.review-security",
    "context.release-correction-r2-package",
    "context.release-correction-r2-approval",
    "context.release-correction-r2-handoff",
    "context.release-correction-r2-replan",
  ],
  workUnits: [
    {
      id: "fix.runtime-purity-ordering.r3",
      objective:
        "Make create, restore, inspect, and record perform zero filesystem reads on their first unprimed invocation while preserving the revision-2 requirement-primary ordering correction.",
      weight: 8,
      moduleId: "correction.runtime-purity-ordering",
      action:
        "Authenticate the revision-2 split, preserve its V12 schema-data and ordering changes, bundle exact common and Specialist Handoff schema source bytes into a package-owned TypeScript data module, remove V11 handoff-validator filesystem loading, and make the existing unprimed four-operation and counterordered regressions pass without cache priming.",
      inputType: "VerifiedRuntimePuritySplit",
      outputType: "PureOrderedRunOperations",
      capability: "fix.runtime-purity-ordering",
      evidenceId: "evidence.runtime-purity-ordering.r3",
      evidenceDescription:
        "Provide package and split authentication, exact parity for all bundled schemas, an unprimed zero-filesystem-read proof for all four operations, counterordered identity evidence, focused tests, typecheck, build, and resulting-byte bindings.",
      artifact: "runtime-purity-ordering-correction-r3.md",
      writes: RELEASE_PURITY_R3_WRITES,
    },
  ],
};

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

async function freezeInputs() {
  await mkdir(INPUTS, { recursive: true });
  for (const snapshot of SNAPSHOTS) {
    await writeFile(
      join(INPUTS, snapshot.target),
      await readFile(join(ROOT, snapshot.source)),
    );
  }
}

function sourceDefinitions(config) {
  const snapshotSources = SNAPSHOTS.map((snapshot) => ({
    id: snapshot.id,
    path: `docs/specs/v12-ide-run-loop/evidence/implementation/${phase}/inputs/${snapshot.target}`,
    description: snapshot.description,
  }));
  const repositorySources = config.sourceIds
    .filter((sourceId) => !SNAPSHOTS.some((snapshot) => snapshot.id === sourceId))
    .map((sourceId) => {
      const definition = REPOSITORY_SOURCES[sourceId];
      if (definition === undefined) {
        throw new Error(`Unknown source ID for ${phase}: ${sourceId}`);
      }
      return {
        id: sourceId,
        path: definition[0],
        description: definition[1],
      };
    });
  return [...snapshotSources, ...repositorySources].filter((source) =>
    config.sourceIds.includes(source.id),
  );
}

async function bindSources(config) {
  return Promise.all(
    sourceDefinitions(config).map(async (source) => {
      const bytes = await readFile(join(ROOT, source.path));
      const allowedWorkUnits = config.workUnits
        .filter((workUnit) =>
          (workUnit.sourceIds ?? config.sourceIds).includes(source.id),
        )
        .map((workUnit) => workUnit.id);
      return {
        id: source.id,
        kind: "repository",
        locator: `path:${source.path}`,
        digest: digest(bytes),
        bytes: bytes.byteLength,
        description: source.description,
        allowedWorkUnits,
        readScope: source.path,
      };
    }),
  );
}

function uses(sourceIds) {
  return sourceIds.map((sourceId) => ({
    sourceId,
    purpose: `Implement or verify the exact frozen V12 ${phase} contract.`,
  }));
}

function unit(config, definition, pathBySourceId) {
  const sourceIds = definition.sourceIds ?? config.sourceIds;
  const sourcePaths = sourceIds.map((sourceId) => {
    const path = pathBySourceId.get(sourceId);
    if (path === undefined) {
      throw new Error(`Missing bound source for ${definition.id}: ${sourceId}`);
    }
    return path;
  });
  const read = [...new Set([...sourcePaths, ...definition.writes])].sort();
  const write = [...definition.writes].sort();
  const processScopes = config.processScopes ?? ["node", "npm"];
  const editFallback = config.allowHashGuardedFallback
    ? "If native apply_patch fails before mutation because of the host sandbox, an exact precondition-hash-guarded PowerShell write is allowed within the declared write scope; verify the resulting file bytes immediately."
    : "Use native apply_patch for manual file edits.";
  return {
    id: definition.id,
    objective: definition.objective,
    weight: definition.weight,
    module: {
      id: definition.moduleId,
      action: definition.action,
      inputPorts: [{ name: "input", artifactType: definition.inputType }],
      outputPorts: [{ name: "output", artifactType: definition.outputType }],
    },
    dependencies: [],
    requiredCapabilities: [definition.capability],
    contextUses: uses(sourceIds),
    scope: { read, write, conflictZones: write },
    permissions: [
      { kind: "filesystem.read", scopes: read },
      { kind: "filesystem.write", scopes: write },
      { kind: "process.spawn", scopes: processScopes },
    ],
    evidenceRequirementIds: [definition.evidenceId],
    handoffArtifacts: [definition.artifact],
    stopConditions: [
      "Stop if any declared source is unavailable or fails its exact digest and byte binding.",
      "Write only the exact declared write scope; do not change Git state, use the network, launch descendants, or widen the public contract.",
      editFallback,
      "Run only local focused verification allowed by the contract and report every failing command truthfully.",
      "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    ],
  };
}

function requestFor(config, contextSources) {
  const sourcePaths = contextSources.map((source) => source.readScope).sort();
  const pathBySourceId = new Map(
    contextSources.map((source) => [source.id, source.readScope]),
  );
  const allWrites = [...new Set(config.workUnits.flatMap((workUnit) => workUnit.writes))].sort();
  const allowedModules = config.workUnits.map((workUnit) => workUnit.moduleId).sort();
  const allowedCapabilities = config.workUnits
    .map((workUnit) => workUnit.capability)
    .sort();
  const processScopes = config.processScopes ?? ["node", "npm"];
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "GoalContract",
      id: `v12.ide-run-loop.implementation.${config.goalPhase ?? phase}`,
      revision: config.goalRevision ?? 1,
      objective: config.objective,
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.architecture-frozen",
          statement: "ADR 0005 and the Specialist Run contract are the complete implementation authority.",
          rationale: "Architecture fan-in passed and no blocking decision remains.",
        },
        {
          id: "assumption.host-effects-external",
          statement: "All runtime, persistence, Git, merge, and memory effects remain external to core.",
          rationale: "V12 is a pure evidence session, not the deferred universal scheduler.",
        },
        ...(config.allowHashGuardedFallback
          ? [
              {
                id: "assumption.host-edit-fallback",
                statement:
                  "After native apply_patch fails before mutation, the host may perform an exact precondition-hash-guarded PowerShell write inside the approved scope.",
                rationale:
                  "Foundation Revision 1 proved the temporary worktree patch helper is unavailable while bounded escalated PowerShell writes remain auditable and fail closed.",
              },
            ]
          : []),
        ...(config.assumptions ?? []),
      ],
      unresolvedDecisions: [],
      acceptanceCriteria: config.workUnits.map((workUnit) => ({
        id: `criterion.${workUnit.id}`,
        description: workUnit.objective,
        evidenceRequirements: [
          {
            id: workUnit.evidenceId,
            kind: workUnit.id.startsWith("verify.") ? "test" : "review",
            duty: "produce",
            description: workUnit.evidenceDescription,
            independentFromProducer: false,
          },
        ],
      })),
      contextSources,
      authority: {
        allowedModules,
        allowedCapabilities,
        permissionCeiling: [
          { kind: "filesystem.read", scopes: [...new Set([...sourcePaths, ...allWrites])].sort() },
          { kind: "filesystem.write", scopes: allWrites },
          { kind: "process.spawn", scopes: processScopes },
        ],
        forbiddenEffects: [
          "Do not use network access, change Git state, launch descendants, write outside the exact scope, or claim that core performs host effects.",
        ],
        maxAgents: config.maxAgents,
        maxConcurrency: config.maxConcurrency,
      },
      optimization: { agentStartupCost: 1, handoffCost: 1 },
      workUnits: config.workUnits.map((workUnit) =>
        unit(config, workUnit, pathBySourceId),
      ),
    },
  };
}

async function prepare() {
  if (typeof checkpoint !== "string" || !/^[0-9a-f]{40}$/.test(checkpoint)) {
    throw new Error("prepare requires the exact 40-character Git checkpoint.");
  }
  const config = CONFIGS[phase];
  if (config === undefined) {
    throw new Error(`Unknown implementation phase: ${phase}`);
  }
  await freezeInputs();
  const request = requestFor(config, await bindSources(config));
  await writeJson(join(PHASE_DIR, "request.json"), request);
  await writeJson(join(PHASE_DIR, "phase-metadata.json"), {
    phase,
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
        phase,
        checkpoint,
        goalId: request.goal.id,
        criteria: request.goal.acceptanceCriteria.length,
        workUnits: request.goal.workUnits.map((workUnit) => workUnit.id),
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
  const request = JSON.parse(
    await readFile(join(PHASE_DIR, "request.json"), "utf8"),
  );
  const compilation = requireValue(
    compileAgentBlueprints(request),
    `${phase} compilation`,
  );
  const specialistPackage = requireValue(
    renderSpecialistPackage(compilation),
    `${phase} package rendering`,
  );
  await mkdir(PACKAGE_DIR, { recursive: true });
  for (const file of specialistPackage.files) {
    const output = join(PACKAGE_DIR, file.path);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, file.content, "utf8");
  }
  await writeJson(join(PHASE_DIR, "package-envelope.json"), specialistPackage);
  const summary = {
    phase,
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
  await writeJson(join(PHASE_DIR, "compilation-summary.json"), summary);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

async function approve() {
  const request = JSON.parse(
    await readFile(join(PHASE_DIR, "request.json"), "utf8"),
  );
  const specialistPackage = JSON.parse(
    await readFile(join(PHASE_DIR, "package-envelope.json"), "utf8"),
  );
  if (
    typeof specialistPackage.compilationDigest !== "string" ||
    typeof specialistPackage.packageDigest !== "string"
  ) {
    throw new Error("Rendered package envelope is missing its digest pair.");
  }
  const expectation = {
    compilationDigest: specialistPackage.compilationDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  await writeJson(join(PHASE_DIR, "approval.json"), {
    apiVersion: "swecircuit/review-approval/v1alpha1",
    kind: "SpecialistReviewApproval",
    goalId: request.goal.id,
    goalRevision: request.goal.revision,
    approvedBy: "repository-owner-via-main-agent",
    approvalBasis:
      "The owner authorized V12 implementation and the integration owner reviewed this exact phase contract, deterministic roster, authority, and digest pair before launch.",
    expectation,
  });
  requireValue(
    verifySpecialistPackage(specialistPackage, expectation),
    `approval-bound ${phase} package verification`,
  );
  const summaryPath = join(PHASE_DIR, "compilation-summary.json");
  const summary = JSON.parse(await readFile(summaryPath, "utf8"));
  summary.packageVerified = true;
  await writeJson(summaryPath, summary);
  process.stdout.write(
    `${JSON.stringify(
      { outcome: "pass", stage: "package-approved", phase, ...expectation },
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
} else {
  throw new Error(`Unknown mode: ${mode}`);
}
