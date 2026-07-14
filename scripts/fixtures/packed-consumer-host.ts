import {
  executeWorkPacket,
  type ExecuteWorkPacketOptions,
  type ExecutionGrant,
  type ExecutionGrantPermission,
  type ExecutionSummary,
  type WorkPacketExecutor,
  type WorkPacketExecutorRequest,
  type WorkPacketExecutorSettlement,
} from "swecircuit";

const settlement = {
  state: "completed",
} satisfies WorkPacketExecutorSettlement;

const permissions = [
  { kind: "filesystem.read", scopes: ["src/**"] },
] satisfies readonly ExecutionGrantPermission[];

const executionGrant = {
  id: "grant.consumer",
  issuer: "integration.owner",
  runId: "run.consumer",
  attemptId: "attempt.consumer",
  workPacket: "consumer-packet",
  executor: { id: "consumer.executor", version: "1.0.0" },
  permissions,
} satisfies ExecutionGrant;

class ConsumerExecutor implements WorkPacketExecutor {
  readonly id = "consumer.executor";
  readonly version = "1.0.0";

  async execute(
    _request: WorkPacketExecutorRequest,
  ): Promise<WorkPacketExecutorSettlement> {
    return settlement;
  }
}

const options = {
  workPacket: {},
  adapterManifest: {},
  grant: executionGrant,
  executor: new ConsumerExecutor(),
  runId: "run.consumer",
  attemptId: "attempt.consumer",
  correlationId: "consumer-check",
  policy: {
    timeoutMs: 1_000,
    abortAcknowledgementMs: 100,
  },
} satisfies ExecuteWorkPacketOptions;

function summarize(summary: ExecutionSummary): string {
  switch (summary.disposition) {
    case "completed": {
      const terminalCode: "success" = summary.terminalCode;
      return terminalCode;
    }
    case "failed":
      return `${summary.failureCode}:${summary.terminalCode}`;
    case "cancelled":
      return summary.abortCause === "caller"
        ? summary.terminalCode satisfies "cancelled_by_user"
        : summary.terminalCode satisfies "cancelled_by_policy";
    case "timed_out": {
      const terminalCode: "deadline_exceeded" = summary.terminalCode;
      return terminalCode;
    }
    case "abort_unconfirmed": {
      const state: "running" = summary.state;
      return `${state}:${summary.abortCause}`;
    }
    default: {
      const unreachable: never = summary;
      return unreachable;
    }
  }
}

const result = await executeWorkPacket(options);
if (!result.ok || result.value === null) {
  void result.diagnostics;
} else {
  void summarize(result.value);
}