import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export function event({
  id,
  runId = "run-001",
  sequence,
  type,
  correlationId = "feature-001",
  actor = "integration-owner",
  causationId,
  links,
  ...payload
}) {
  return {
    apiVersion: "swecircuit/v1alpha1",
    kind: "RunEvent",
    metadata: { id },
    spec: {
      type,
      eventTypeVersion: "1.0.0",
      runId,
      sequence,
      correlationId,
      actor,
      ...(causationId === undefined ? {} : { causationId }),
      ...(links === undefined ? {} : { links }),
      ...payload,
    },
  };
}

export function stateEvent({
  id,
  runId,
  sequence,
  attemptId,
  number,
  workPacket,
  state,
  retryOf,
  deadline,
  terminalCode,
  ...options
}) {
  return event({
    id,
    runId,
    sequence,
    type: "attempt.state",
    ...options,
    attempt: {
      id: attemptId,
      number,
      workPacket,
      state,
      ...(retryOf === undefined ? {} : { retryOf }),
      ...(deadline === undefined ? {} : { deadline }),
      ...(terminalCode === undefined ? {} : { terminalCode }),
    },
  });
}

export function writeTrace(
  root,
  events,
  { relativePath = "traces/run.jsonl", newline = "\n", finalNewline = true } = {},
) {
  const target = join(root, ...relativePath.split("/"));
  mkdirSync(dirname(target), { recursive: true });
  const body = events.map((entry) => JSON.stringify(entry)).join(newline);
  writeFileSync(target, finalNewline && events.length > 0 ? `${body}${newline}` : body, "utf8");
  return relativePath;
}
