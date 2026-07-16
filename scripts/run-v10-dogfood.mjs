import { createHash } from "node:crypto";
import {
  existsSync,
  lstatSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createDeterministicTestExecutor, executeWorkPacket, inspectTrace } from "../dist/index.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const WORKSPACE_PREFIX = "swecircuit-v10-dogfood-";
const TRACE_RELATIVE = "docs/specs/v10-executor-adapter/evidence/v10-t006-execution-trace.jsonl";
const REPORT_RELATIVE = "docs/specs/v10-executor-adapter/evidence/v10-t006-observation.json";

class DogfoodFailure extends Error {
  constructor(code, message) {
    super(message);
    this.name = "DogfoodFailure";
    this.code = code;
  }
}

function requireCondition(condition, code, message) {
  if (!condition) {
    throw new DogfoodFailure(code, message);
  }
}

function samePath(left, right) {
  const normalizedLeft = resolve(left);
  const normalizedRight = resolve(right);
  return process.platform === "win32"
    ? normalizedLeft.toLowerCase() === normalizedRight.toLowerCase()
    : normalizedLeft === normalizedRight;
}

function digest(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function fixture(name) {
  return JSON.parse(readFileSync(join(ROOT, "test", "fixtures", "valid", `${name}.json`), "utf8"));
}

function workPacket() {
  const packet = fixture("work-packet");
  packet.metadata.id = "v10-architecture-review";
  packet.metadata.description = "A bounded review packet used to dogfood the V10 executor port.";
  packet.spec.goal = "Review the V10 executor architecture and return bounded evidence.";
  packet.spec.completionEvidence = [
    {
      id: "architecture_review",
      kind: "review",
      description: "The V10 architecture review reaches an explicit outcome.",
      required: true,
    },
  ];
  packet.spec.nonGoals = ["Invoke a provider.", "Modify source code.", "Merge the branch."];
  packet.spec.source = {
    featurePackage: "docs/specs/v10-executor-adapter",
    branch: "codex/v10-executor-adapter",
    baselineCommit: "2b7bef3",
  };
  packet.spec.scope = {
    include: ["docs/specs/v10-executor-adapter/**", "src/**"],
    exclude: ["dist/**"],
    conflictZones: ["src/execution.ts"],
  };
  packet.spec.role = {
    capability: "Independent architecture and security review.",
    owner: "architecture-reviewer",
  };
  packet.spec.dependencies = [];
  packet.spec.context = [
    {
      id: "v10_spec",
      kind: "artifact",
      ref: "path:docs/specs/v10-executor-adapter/spec.md",
      immutable: false,
    },
    {
      id: "v10_adr",
      kind: "artifact",
      ref: "path:docs/architecture/decisions/0002-bounded-executor-boundary.md",
      immutable: false,
    },
  ];
  packet.spec.authority = {
    allowedActions: ["Read the declared V10 docs and source.", "Return review evidence."],
    disallowedActions: ["Edit files.", "Spawn processes.", "Merge branches."],
    permissionCeiling: [
      {
        kind: "filesystem.read",
        scopes: ["docs/specs/v10-executor-adapter/**", "src/**"],
      },
    ],
  };
  packet.spec.verification = [
    {
      id: "architecture_review",
      kind: "review",
      description: "The V10 architecture review reaches an explicit outcome.",
      required: true,
    },
  ];
  packet.spec.handoff = {
    destination: "integration-owner",
    requiredFields: [
      "summary",
      "filesChanged",
      "verificationEvidence",
      "assumptions",
      "risks",
      "followUps",
    ],
  };
  packet.spec.stopConditions = [
    "The reviewed contract differs from the accepted ADR.",
    "The requested authority exceeds read-only review scope.",
  ];
  delete packet.spec.deadline;
  return packet;
}

function adapterManifest() {
  return {
    apiVersion: "swecircuit/v1alpha1",
    kind: "AdapterManifest",
    metadata: {
      id: "dogfood.review-executor",
      version: "1.0.0",
      description: "A deterministic review executor used for V10 dogfood evidence.",
    },
    spec: {
      adapterKind: "agent_runtime",
      compatibility: { apiVersions: ["swecircuit/v1alpha1"] },
      capabilities: ["launch_agent"],
      requestedPermissions: [
        {
          kind: "filesystem.read",
          scopes: ["docs/specs/v10-executor-adapter/**", "src/**"],
          reason: "Read only the bounded review context.",
        },
      ],
      inputKinds: ["WorkPacket"],
      outputKinds: [],
      behavior: {
        health: { mode: "passive" },
        timeout: { supported: true, maximumSeconds: 60 },
        cancellation: { supported: true, acknowledged: true },
        errors: { structured: true, retryableDeclared: false },
      },
      provenance: {
        source: "https://example.invalid/v10-dogfood-executor",
        maintainer: "SWECircuit V10 dogfood",
      },
    },
  };
}

function executionGrant(scopes) {
  return {
    id: "grant.v10-dogfood",
    issuer: "integration.owner",
    runId: "run.v10-dogfood",
    attemptId: "attempt.architecture-review",
    workPacket: "v10-architecture-review",
    executor: { id: "dogfood.review-executor", version: "1.0.0" },
    permissions: [{ kind: "filesystem.read", scopes }],
  };
}

function executionOptions(grant, executor) {
  return {
    workPacket: workPacket(),
    adapterManifest: adapterManifest(),
    grant,
    executor,
    runId: "run.v10-dogfood",
    attemptId: "attempt.architecture-review",
    correlationId: "v10-t006-dogfood",
    policy: {
      timeoutMs: 30_000,
      abortAcknowledgementMs: 1_000,
    },
  };
}

function captureWorkspaceIdentity(path) {
  const stats = lstatSync(path);
  const temporaryBase = realpathSync(tmpdir());
  const canonical = realpathSync(path);
  requireCondition(stats.isDirectory(), "DOGFOOD_OWNERSHIP", "Workspace is not a directory.");
  requireCondition(!stats.isSymbolicLink(), "DOGFOOD_OWNERSHIP", "Workspace is a link.");
  requireCondition(
    samePath(dirname(canonical), temporaryBase),
    "DOGFOOD_OWNERSHIP",
    "Workspace escaped the temporary base.",
  );
  requireCondition(
    basename(canonical).startsWith(WORKSPACE_PREFIX),
    "DOGFOOD_OWNERSHIP",
    "Workspace prefix is invalid.",
  );
  return { canonical, device: stats.dev, inode: stats.ino, temporaryBase };
}

function removeOwnedWorkspace(path, identity) {
  requireCondition(existsSync(path), "DOGFOOD_CLEANUP", "Owned workspace disappeared early.");
  const stats = lstatSync(path);
  requireCondition(stats.isDirectory(), "DOGFOOD_CLEANUP", "Workspace changed type.");
  requireCondition(!stats.isSymbolicLink(), "DOGFOOD_CLEANUP", "Workspace became a link.");
  requireCondition(stats.dev === identity.device, "DOGFOOD_CLEANUP", "Device changed.");
  requireCondition(stats.ino === identity.inode, "DOGFOOD_CLEANUP", "Identity changed.");
  requireCondition(
    samePath(realpathSync(path), identity.canonical),
    "DOGFOOD_CLEANUP",
    "Canonical workspace changed.",
  );
  requireCondition(
    samePath(dirname(identity.canonical), identity.temporaryBase),
    "DOGFOOD_CLEANUP",
    "Cleanup target escaped the temporary base.",
  );
  requireCondition(
    basename(identity.canonical).startsWith(WORKSPACE_PREFIX),
    "DOGFOOD_CLEANUP",
    "Cleanup prefix is invalid.",
  );
  rmSync(path, { recursive: true });
  requireCondition(!existsSync(path), "DOGFOOD_CLEANUP", "Owned workspace still exists.");
}

function assertCommittedEvidence(reportBody, traceBody) {
  const reportPath = join(ROOT, ...REPORT_RELATIVE.split("/"));
  const tracePath = join(ROOT, ...TRACE_RELATIVE.split("/"));
  requireCondition(existsSync(reportPath), "DOGFOOD_EVIDENCE", "Observation is missing.");
  requireCondition(existsSync(tracePath), "DOGFOOD_EVIDENCE", "Trace is missing.");
  requireCondition(
    readFileSync(reportPath, "utf8") === reportBody,
    "DOGFOOD_EVIDENCE",
    "Committed observation differs from the current dogfood run.",
  );
  requireCondition(
    readFileSync(tracePath, "utf8") === traceBody,
    "DOGFOOD_EVIDENCE",
    "Committed trace differs from the current dogfood run.",
  );
}

export async function runV10Dogfood({ checkEvidence = false, onWorkspaceCreated = () => {} } = {}) {
  let executorCalls = 0;
  const deterministic = createDeterministicTestExecutor({
    id: "dogfood.review-executor",
    version: "1.0.0",
    settlement: {
      state: "completed",
      workflow: { stage: "review", outcome: "pass" },
      evidence: [
        {
          id: "architecture_review",
          kind: "artifact",
          ref: "path:docs/specs/v10-executor-adapter/architecture-review.md",
        },
      ],
    },
  });
  const executor = Object.freeze({
    id: deterministic.id,
    version: deterministic.version,
    async execute(request) {
      executorCalls += 1;
      return deterministic.execute(request);
    },
  });

  const rejected = await executeWorkPacket(executionOptions(executionGrant(["src/**"]), executor));
  requireCondition(!rejected.ok, "DOGFOOD_PREFLIGHT", "Under-authorized work was accepted.");
  requireCondition(rejected.value === null, "DOGFOOD_PREFLIGHT", "Rejected work returned a value.");
  requireCondition(
    JSON.stringify(rejected.diagnostics.map((diagnostic) => diagnostic.code)) ===
      JSON.stringify(["SC4206"]),
    "DOGFOOD_PREFLIGHT",
    "Under-authorized work returned unexpected diagnostics.",
  );
  requireCondition(executorCalls === 0, "DOGFOOD_PREFLIGHT", "Rejected work invoked the executor.");

  const accepted = await executeWorkPacket(
    executionOptions(executionGrant(["docs/specs/v10-executor-adapter/**", "src/**"]), executor),
  );
  requireCondition(accepted.ok, "DOGFOOD_EXECUTION", "Corrected work did not execute.");
  requireCondition(
    accepted.value.disposition === "completed",
    "DOGFOOD_EXECUTION",
    "Corrected work did not complete.",
  );
  requireCondition(executorCalls === 1, "DOGFOOD_EXECUTION", "Executor call count is not one.");

  const traceBody = `${accepted.value.events.map((event) => JSON.stringify(event)).join("\n")}\n`;
  const temporaryBase = realpathSync(tmpdir());
  const workspace = mkdtempSync(join(temporaryBase, WORKSPACE_PREFIX));
  const identity = captureWorkspaceIdentity(workspace);
  let inspection;
  let runError;
  let cleanupError;

  try {
    onWorkspaceCreated(workspace);
    writeFileSync(join(workspace, "execution.jsonl"), traceBody, "utf8");
    inspection = inspectTrace({ project: workspace, trace: "execution.jsonl" });
    requireCondition(inspection.ok, "DOGFOOD_INSPECTION", "Returned journal was not inspectable.");
    requireCondition(
      inspection.value.eventCount === accepted.value.events.length,
      "DOGFOOD_INSPECTION",
      "Inspection event count disagrees.",
    );
    requireCondition(
      inspection.value.runs[0]?.attempts[0]?.state === "completed",
      "DOGFOOD_INSPECTION",
      "Inspection did not reconstruct a completed attempt.",
    );
  } catch (error) {
    runError = error;
  }

  try {
    removeOwnedWorkspace(workspace, identity);
  } catch (error) {
    cleanupError = error;
  }

  if (runError !== undefined) {
    throw runError;
  }
  if (cleanupError !== undefined) {
    throw cleanupError;
  }

  const report = {
    assertions: {
      cleanupConfirmed: !existsSync(workspace),
      correctedGrantInvokedOnce: executorCalls === 1,
      journalInspectable: inspection.ok,
      rejectedGrantInvokedZeroTimes: true,
    },
    evidence: {
      architectureReview: "docs/specs/v10-executor-adapter/architecture-review.md",
      featurePackage: "docs/specs/v10-executor-adapter",
    },
    execution: {
      disposition: accepted.value.disposition,
      eventCount: accepted.value.events.length,
      grantId: accepted.value.grant.id,
      terminalCode: accepted.value.terminalCode,
      workflow: accepted.value.workflow,
    },
    preflightControl: {
      correction: "Added the reviewed feature-package read scope to the invocation grant.",
      diagnosticCodes: rejected.diagnostics.map((diagnostic) => diagnostic.code),
      executorCallsAfterFailure: 0,
    },
    reportVersion: "1.0.0",
    result: "pass",
    runId: "v10-t006-executor-dogfood",
    runtimeBoundary: {
      durableTraceWriterUsed: false,
      mergeAuthorityUsed: false,
      providerCalls: 0,
      schedulerUsed: false,
      testExecutor: "deterministic-in-process",
    },
    trace: {
      digest: digest(traceBody),
      eventCount: inspection.value.eventCount,
      finalAttemptState: inspection.value.runs[0].attempts[0].state,
      path: TRACE_RELATIVE,
      runCompleted: inspection.value.runs[0].hasCompletedEvent,
    },
  };
  const reportBody = `${JSON.stringify(report, null, 2)}\n`;

  if (checkEvidence) {
    assertCommittedEvidence(reportBody, traceBody);
  }

  return Object.freeze({ report: Object.freeze(report), reportBody, traceBody });
}

const entry = process.argv[1];
if (entry !== undefined && samePath(entry, fileURLToPath(import.meta.url))) {
  const unknownArguments = process.argv
    .slice(2)
    .filter((argument) => argument !== "--check-evidence");
  if (unknownArguments.length > 0) {
    process.stderr.write("V10 dogfood run failed (DOGFOOD_USAGE).\n");
    process.exitCode = 1;
  } else {
    try {
      const result = await runV10Dogfood({
        checkEvidence: process.argv.includes("--check-evidence"),
      });
      process.stdout.write(`${JSON.stringify(result.report)}\n`);
    } catch (error) {
      const code = error instanceof DogfoodFailure ? error.code : "DOGFOOD_UNEXPECTED";
      process.stderr.write(`V10 dogfood run failed (${code}).\n`);
      process.exitCode = 1;
    }
  }
}
