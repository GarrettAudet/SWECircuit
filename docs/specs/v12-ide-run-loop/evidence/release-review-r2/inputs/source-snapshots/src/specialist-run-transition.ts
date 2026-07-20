import { Buffer } from "node:buffer";
import { types as utilTypes } from "node:util";
import { boundedJsonUtf8ByteLength, digestCanonicalJson } from "./canonical-json.js";
import { SPECIALIST_RUN_LIMITS } from "./constants.js";
import { createDiagnostic, operationResult } from "./diagnostics.js";
import { snapshotJsonValue } from "./snapshot.js";
import { verifySpecialistHandoff } from "./specialist-handoff.js";
import { validateSpecialistRunSession } from "./specialist-run-session.js";
import type { SpecialistRunAcceptedHandoff, SpecialistRunSession } from "./specialist-run-types.js";
import type {
  AgentBlueprint,
  AgentBlueprintCompilation,
  SpecialistPackageExpectation,
} from "./specialist-types.js";
import type { Diagnostic, OperationResult } from "./types.js";

const HANDOFF_ARTIFACT = "specialist-handoff.json";
const RUN_HANDOFF_ARTIFACT = "specialist-run-handoff.json";
const SESSION_ARTIFACT = "specialist-run-session.json";
const SESSION_DIGEST_DOMAIN = "swecircuit/specialist-run/session/v1alpha1";

interface RawHandoffSnapshot {
  readonly bytes: Uint8Array | null;
  readonly limitExceeded: boolean;
}

function asCanonicalJson(value: unknown): Parameters<typeof digestCanonicalJson>[1] {
  return value as Parameters<typeof digestCanonicalJson>[1];
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function freezeJson<T>(value: T): T {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null) {
    throw new TypeError("Constructed specialist run transition is not bounded JSON.");
  }
  return snapshot.value as unknown as T;
}

function snapshotHandoffBytes(value: unknown): RawHandoffSnapshot {
  try {
    if (
      typeof value !== "object" ||
      value === null ||
      utilTypes.isProxy(value) ||
      !utilTypes.isUint8Array(value)
    ) {
      return Object.freeze({ bytes: null, limitExceeded: false });
    }
    const typed = value as Uint8Array;
    if (typed.byteLength > SPECIALIST_RUN_LIMITS.rawHandoffBytes) {
      return Object.freeze({ bytes: null, limitExceeded: true });
    }
    return Object.freeze({
      bytes: new Uint8Array(typed),
      limitExceeded: false,
    });
  } catch {
    return Object.freeze({ bytes: null, limitExceeded: false });
  }
}

function compilationFromSession(session: SpecialistRunSession): AgentBlueprintCompilation {
  const file = session.package.files.find((candidate) => candidate.path === "compilation.json");
  if (file === undefined) {
    throw new TypeError("Verified specialist package is missing compilation.json.");
  }
  return JSON.parse(file.content) as AgentBlueprintCompilation;
}

function dependencyClosure(
  compilation: AgentBlueprintCompilation,
  target: AgentBlueprint,
): readonly string[] {
  const byId = new Map(
    compilation.blueprints.map((blueprint) => [blueprint.id, blueprint] as const),
  );
  const pending = [...target.dependencies];
  const required = new Set<string>();
  while (pending.length > 0) {
    const agentId = pending.pop();
    if (agentId === undefined || required.has(agentId)) {
      continue;
    }
    const blueprint = byId.get(agentId);
    if (blueprint === undefined) {
      throw new TypeError("Verified blueprint dependency is missing.");
    }
    required.add(agentId);
    pending.push(...blueprint.dependencies);
  }
  return Object.freeze([...required].sort(compareText));
}

function sameRawBytes(row: SpecialistRunAcceptedHandoff, raw: Uint8Array): boolean {
  if (row.rawBytes !== raw.byteLength) {
    return false;
  }
  const prior = Buffer.from(row.rawBase64, "base64");
  return prior.equals(Buffer.from(raw.buffer, raw.byteOffset, raw.byteLength));
}

function buildSuccessor(
  session: SpecialistRunSession,
  row: SpecialistRunAcceptedHandoff,
): SpecialistRunSession | null {
  const acceptedHandoffs = Object.freeze(
    [...session.acceptedHandoffs, row].sort((left, right) =>
      compareText(left.agentId, right.agentId),
    ),
  );
  const base = {
    apiVersion: session.apiVersion,
    kind: session.kind,
    goal: session.goal,
    compilationDigest: session.compilationDigest,
    packageDigest: session.packageDigest,
    selectedCandidateId: session.selectedCandidateId,
    package: session.package,
    acceptedHandoffs,
  } as const;
  const successor = {
    ...base,
    contentDigest: digestCanonicalJson(SESSION_DIGEST_DOMAIN, asCanonicalJson(base)),
  } as const;
  if (
    boundedJsonUtf8ByteLength(
      asCanonicalJson(successor),
      SPECIALIST_RUN_LIMITS.canonicalSessionBytes,
    ) === null
  ) {
    return null;
  }
  return freezeJson(successor as SpecialistRunSession);
}

function failedTransition(
  diagnostics: readonly Diagnostic[],
  code: "SC4402" | "SC4403" | "SC4404" | "SC4405",
  artifact: string,
): OperationResult<SpecialistRunSession> {
  return operationResult<SpecialistRunSession>(
    [...diagnostics, createDiagnostic(code, artifact)],
    null,
  );
}

export function recordSpecialistRunHandoff(
  input: unknown,
  expectation: SpecialistPackageExpectation | unknown,
  rawHandoffBytes: unknown,
): OperationResult<SpecialistRunSession> {
  try {
    const validated = validateSpecialistRunSession(input, expectation);
    if (!validated.ok || validated.value === null) {
      return operationResult<SpecialistRunSession>(validated.diagnostics, null);
    }
    const session = validated.value;

    const rawSnapshot = snapshotHandoffBytes(rawHandoffBytes);
    if (rawSnapshot.bytes === null) {
      return operationResult<SpecialistRunSession>(
        [
          ...validated.diagnostics,
          createDiagnostic(rawSnapshot.limitExceeded ? "SC4308" : "SC4310", HANDOFF_ARTIFACT),
        ],
        null,
      );
    }
    const raw = rawSnapshot.bytes;

    const verified = verifySpecialistHandoff(session.package, expectation, raw);
    const diagnostics = [...validated.diagnostics, ...verified.diagnostics];
    if (!verified.ok || verified.value === null) {
      return operationResult<SpecialistRunSession>(diagnostics, null);
    }
    const handoff = verified.value;
    const agentId = handoff.handoff.agent.id;
    const existing = session.acceptedHandoffs.find((row) => row.agentId === agentId);

    if (existing !== undefined && sameRawBytes(existing, raw)) {
      return operationResult(diagnostics, session);
    }
    if (existing !== undefined) {
      return failedTransition(diagnostics, "SC4403", RUN_HANDOFF_ARTIFACT);
    }
    if (session.acceptedHandoffs.some((row) => row.outcome !== "pass")) {
      return failedTransition(diagnostics, "SC4405", RUN_HANDOFF_ARTIFACT);
    }

    const compilation = compilationFromSession(session);
    const blueprint = compilation.blueprints.find((candidate) => candidate.id === agentId);
    if (blueprint === undefined) {
      throw new TypeError("Verified specialist handoff has no blueprint.");
    }
    const acceptedByAgent = new Map(
      session.acceptedHandoffs.map((row) => [row.agentId, row] as const),
    );
    if (
      dependencyClosure(compilation, blueprint).some(
        (dependencyId) => acceptedByAgent.get(dependencyId)?.outcome !== "pass",
      )
    ) {
      return failedTransition(diagnostics, "SC4404", RUN_HANDOFF_ARTIFACT);
    }

    const row = Object.freeze({
      agentId,
      blueprintDigest: handoff.handoff.agent.blueprintDigest,
      outcome: handoff.handoff.outcome,
      rawEncoding: "base64",
      rawBytes: handoff.rawBytes,
      rawDigest: handoff.rawDigest,
      rawBase64: Buffer.from(raw).toString("base64"),
    } as const satisfies SpecialistRunAcceptedHandoff);
    const successor = buildSuccessor(session, row);
    if (successor === null) {
      return failedTransition(diagnostics, "SC4402", SESSION_ARTIFACT);
    }
    return operationResult(diagnostics, successor);
  } catch {
    return operationResult<SpecialistRunSession>(
      [createDiagnostic("SC9001", RUN_HANDOFF_ARTIFACT)],
      null,
    );
  }
}
