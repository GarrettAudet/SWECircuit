import { containsControlCharacters } from "./text.js";
import type { Diagnostic, DiagnosticSeverity, ExitCode, OperationResult } from "./types.js";

type DiagnosticDefinition = Readonly<{
  rule: string;
  severity: DiagnosticSeverity;
  exitCode: ExitCode;
  message: string;
  hint?: string;
}>;

function definition(
  rule: string,
  severity: DiagnosticSeverity,
  exitCode: ExitCode,
  message: string,
  hint?: string,
): DiagnosticDefinition {
  return hint === undefined
    ? Object.freeze({ rule, severity, exitCode, message })
    : Object.freeze({ rule, severity, exitCode, message, hint });
}

const fix = "Correct the value at the indicated JSON Pointer.";

export const DIAGNOSTIC_DEFINITIONS = Object.freeze({
  SC0001: definition(
    "cli.usage",
    "error",
    3,
    "The requested operation or argument is invalid.",
    "Use a documented command and argument shape.",
  ),
  SC1001: definition(
    "io.safe-failure",
    "error",
    4,
    "The input could not be read safely.",
    "Check that the path exists and is readable, then retry.",
  ),
  SC1011: definition(
    "path.lexical-escape",
    "error",
    2,
    "The referenced path escapes the project root.",
    "Use a forward-slash repository-relative path below swecircuit/.",
  ),
  SC1012: definition(
    "path.forbidden-form",
    "error",
    2,
    "The referenced path uses a forbidden path form.",
    "Use a plain repository-relative path without URIs, drive prefixes, backslashes, device paths, or alternate streams.",
  ),
  SC1013: definition(
    "path.link-forbidden",
    "error",
    2,
    "The referenced path traverses a symbolic link or reparse point.",
    "Replace the link with a regular directory or file inside the project root.",
  ),
  SC1014: definition(
    "path.resolved-escape",
    "error",
    2,
    "The resolved path escapes the project root.",
    "Keep the resolved file physically inside the project root.",
  ),
  SC1015: definition(
    "path.not-regular-file",
    "error",
    2,
    "The referenced input is not a regular file.",
    "Reference a regular JSON file.",
  ),
  SC1101: definition(
    "parse.invalid-utf8",
    "error",
    2,
    "The input is not valid UTF-8.",
    "Encode the file as UTF-8 and retry.",
  ),
  SC1102: definition(
    "parse.json-syntax",
    "error",
    2,
    "The input is not strict JSON.",
    "Remove comments and trailing commas, and repair the JSON syntax.",
  ),
  SC1103: definition(
    "parse.duplicate-key",
    "error",
    2,
    "An object contains a duplicate property name.",
    "Keep exactly one value for each property.",
  ),
  SC1104: definition(
    "parse.numeric-domain",
    "error",
    2,
    "A number cannot be represented safely by the kernel.",
    "Use a finite number within the safe integer range when the value is integral.",
  ),
  SC1201: definition(
    "dispatch.api-version.required",
    "error",
    2,
    "apiVersion is required for dispatch.",
    "Set apiVersion to swecircuit/v1alpha1.",
  ),
  SC1202: definition(
    "dispatch.api-version.type",
    "error",
    2,
    "apiVersion must be a string.",
    "Set apiVersion to swecircuit/v1alpha1.",
  ),
  SC1203: definition(
    "dispatch.api-version.unsupported",
    "error",
    2,
    "The API version is not supported.",
    "Use a machine API version supported by this kernel.",
  ),
  SC1211: definition(
    "dispatch.kind.required",
    "error",
    2,
    "kind is required for dispatch.",
    "Set kind to one of the six supported artifact kinds.",
  ),
  SC1212: definition(
    "dispatch.kind.type",
    "error",
    2,
    "kind must be a string.",
    "Set kind to one of the six supported artifact kinds.",
  ),
  SC1213: definition(
    "dispatch.kind.unsupported",
    "error",
    2,
    "The artifact kind is not supported.",
    "Use Project, Module, Circuit, WorkPacket, RunEvent, or AdapterManifest.",
  ),
  SC1221: definition(
    "dispatch.event-version.required",
    "error",
    2,
    "eventTypeVersion is required for a run event.",
    "Set the supported event type version.",
  ),
  SC1222: definition(
    "dispatch.event-version.unsupported",
    "error",
    2,
    "The event type version is not supported.",
    "Use an event type version supported by this kernel.",
  ),
  SC1301: definition(
    "schema.required",
    "error",
    2,
    "A required property is missing.",
    "Add the required property at the indicated JSON Pointer.",
  ),
  SC1302: definition(
    "schema.type",
    "error",
    2,
    "A value has the wrong JSON type.",
    "Use the type required by the v1alpha1 schema.",
  ),
  SC1303: definition(
    "schema.additional-property",
    "error",
    2,
    "A property is not allowed by this schema.",
    "Remove the property or move the information into a documented field.",
  ),
  SC1304: definition(
    "schema.enum",
    "error",
    2,
    "A value is outside the allowed vocabulary.",
    "Use one of the values allowed by the v1alpha1 schema.",
  ),
  SC1305: definition(
    "schema.constraint",
    "error",
    2,
    "A value does not satisfy its schema constraint.",
    fix,
  ),
  SC1311: definition(
    "schema-registry.remote-ref",
    "error",
    2,
    "A schema reference is not package-owned.",
    "Use only package-owned v1alpha1 schema references.",
  ),
  SC1312: definition(
    "schema-registry.unknown-keyword",
    "error",
    2,
    "A schema uses an unsupported keyword.",
    "Use only strict Draft 2020-12 keywords supported by the package registry.",
  ),
  SC2001: definition(
    "reference.not-found",
    "error",
    2,
    "A referenced artifact or graph element was not found.",
    "Add the referenced declaration or correct the identifier.",
  ),
  SC2002: definition(
    "reference.kind-mismatch",
    "error",
    2,
    "A reference resolves to the wrong artifact kind.",
    "Reference an artifact of the required kind.",
  ),
  SC2003: definition(
    "reference.duplicate-identity",
    "error",
    2,
    "An identity is duplicated in a scope that requires uniqueness.",
    "Give each declaration a unique identifier.",
  ),
  SC2004: definition(
    "reference.port-not-found",
    "error",
    2,
    "A route references a module port that does not exist.",
    "Use a declared source output and target input port.",
  ),
  SC2101: definition(
    "graph.outcome-undeclared",
    "error",
    2,
    "A route uses an outcome its source module does not declare.",
    "Declare the outcome on the source module or correct the route.",
  ),
  SC2102: definition(
    "graph.unsafe-cycle",
    "error",
    2,
    "A route in a directed cycle is not bounded.",
    "Set maxTraversals on every route that participates in the cycle.",
  ),
  SC2103: definition(
    "graph.ambiguous-fan-in",
    "error",
    2,
    "A fan-in is missing, duplicated, or inconsistent with its inbound routes.",
    "Declare exactly one join whose sources match the inbound predecessors.",
  ),
  SC2104: definition(
    "graph.owner-required",
    "error",
    2,
    "A parallel work branch does not have complete ownership.",
    "Declare matching owner and workPacket fields and align them with the work packet owner.",
  ),
  SC2105: definition(
    "graph.stop-required",
    "error",
    2,
    "A required stop condition is missing.",
    "Declare at least one bounded stop condition.",
  ),
  SC2106: definition(
    "graph.transfer-type-mismatch",
    "error",
    2,
    "A route connects ports with different artifact types.",
    "Connect ports whose artifactType values match exactly.",
  ),
  SC2107: definition(
    "graph.fanout-invalid",
    "error",
    2,
    "A fan-out declaration does not match its routes, branches, or join.",
    "Align the fan-out with one route per branch and one explicit join.",
  ),
  SC2108: definition(
    "graph.structural-consistency",
    "error",
    2,
    "The circuit graph is structurally inconsistent.",
    "Correct duplicate, unreachable, or contradictory graph declarations.",
  ),
  SC3001: definition(
    "trace.sequence.duplicate",
    "error",
    2,
    "A trace sequence number is duplicated.",
    fix,
  ),
  SC3002: definition("trace.sequence.regression", "error", 2, "A trace sequence regresses.", fix),
  SC3003: definition(
    "trace.duplicate-event-id",
    "error",
    2,
    "A trace event identity is duplicated.",
    fix,
  ),
  SC3011: definition("trace.cause.not-found", "error", 2, "An event cause was not found.", fix),
  SC3012: definition("trace.cause.forward", "error", 2, "An event references a future cause.", fix),
  SC3013: definition(
    "trace.cause.cross-run",
    "error",
    2,
    "An event cause belongs to another run.",
    fix,
  ),
  SC3021: definition(
    "trace.illegal-transition",
    "error",
    2,
    "An attempt uses an illegal state transition.",
    fix,
  ),
  SC3022: definition(
    "trace.terminal-immutable",
    "error",
    2,
    "An event attempts to change a terminal attempt.",
    fix,
  ),
  SC3023: definition(
    "trace.retry.link-required",
    "error",
    2,
    "A retry is missing its prior-attempt link.",
    fix,
  ),
  SC3024: definition(
    "trace.retry.must-start-queued",
    "error",
    2,
    "A retry does not begin in queued state.",
    fix,
  ),
  SC3025: definition(
    "trace.event-not-allowed-in-state",
    "error",
    2,
    "The event is not allowed in the current attempt state.",
    fix,
  ),
  SC4001: definition(
    "permission.required",
    "error",
    2,
    "A required permission declaration is missing.",
    "Declare the required permission list explicitly, even when it is empty.",
  ),
  SC4002: definition(
    "permission.unknown",
    "error",
    2,
    "A permission kind or scope is not recognized.",
    "Use the closed v1alpha1 permission vocabulary and scope grammar.",
  ),
  SC4003: definition(
    "permission.exceeds-ceiling",
    "error",
    2,
    "A module permission requirement exceeds its work packet ceiling.",
    "Narrow the module requirement or explicitly widen the reviewed work packet ceiling.",
  ),
  SC4004: definition(
    "permission.self-grant-forbidden",
    "error",
    2,
    "An artifact attempts to grant or attest its own authority.",
    "Declare requirements or requested permissions only; authority is not granted by an artifact.",
  ),
  SC4101: definition(
    "privacy.secret-pattern",
    "warning",
    0,
    "A rendered value matched a high-confidence secret pattern.",
    "The value was suppressed; remove secrets before persistence.",
  ),
  SC4102: definition(
    "privacy.forbidden-content",
    "error",
    2,
    "The artifact contains a forbidden capture field.",
    "Store a bounded reference instead of prompts, chats, environments, command output, credentials, or evidence content.",
  ),
  SC4103: definition(
    "privacy.capture-class-unknown",
    "error",
    2,
    "The artifact declares an unknown capture class.",
    fix,
  ),
  SC5001: definition(
    "limit.artifact-bytes",
    "error",
    2,
    "The JSON artifact exceeds the byte limit.",
    "Reduce the artifact below 1 MiB.",
  ),
  SC5002: definition(
    "limit.depth",
    "error",
    2,
    "The JSON artifact exceeds the nesting-depth limit.",
    "Reduce nesting to at most 64 object or array levels.",
  ),
  SC5003: definition(
    "limit.reference-count",
    "error",
    2,
    "The project references too many artifacts.",
    "Reduce the project artifact list to at most 10,000 entries.",
  ),
  SC5004: definition(
    "limit.edge-count",
    "error",
    2,
    "The circuit contains too many routes.",
    "Reduce the circuit to at most 10,000 routes.",
  ),
  SC5005: definition(
    "limit.line-bytes",
    "error",
    2,
    "A JSONL event line exceeds the byte limit.",
    fix,
  ),
  SC5006: definition("limit.trace-bytes", "error", 2, "The trace exceeds the byte limit.", fix),
  SC5007: definition("limit.event-count", "error", 2, "The trace contains too many events.", fix),
  SC9001: definition(
    "internal.failure",
    "error",
    5,
    "The kernel encountered an unexpected internal failure.",
    "Retry with debug logging and report the stable reproduction.",
  ),
});

export type DiagnosticCode = keyof typeof DIAGNOSTIC_DEFINITIONS;

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function safeArtifact(artifact: string): string {
  const normalized = artifact.replaceAll(String.fromCharCode(92), "/");
  const segments = normalized.split("/");
  if (
    normalized === "." ||
    (normalized.length > 0 &&
      !normalized.startsWith("/") &&
      !normalized.includes("//") &&
      !normalized.includes(":") &&
      !segments.includes(".") &&
      !segments.includes("..") &&
      !containsControlCharacters(normalized))
  ) {
    return normalized;
  }
  return ".";
}

function decodePointerToken(token: string): string | null {
  let decoded = "";
  for (let index = 0; index < token.length; index += 1) {
    const character = token[index];
    if (character !== "~") {
      decoded += character;
      continue;
    }
    const escaped = token[index + 1];
    if (escaped === "0") {
      decoded += "~";
    } else if (escaped === "1") {
      decoded += "/";
    } else {
      return null;
    }
    index += 1;
  }
  return decoded;
}

function safePointer(pointer: string): string {
  if (pointer === "") {
    return "";
  }
  if (!pointer.startsWith("/")) {
    return "";
  }

  const safeTokens: string[] = [];
  for (const token of pointer.slice(1).split("/")) {
    const decoded = decodePointerToken(token);
    if (
      decoded === null ||
      decoded === "." ||
      decoded === ".." ||
      decoded.includes("/") ||
      decoded.includes(String.fromCharCode(92)) ||
      decoded.includes(":") ||
      containsControlCharacters(decoded)
    ) {
      break;
    }
    safeTokens.push(token);
  }
  return safeTokens.length === 0 ? "" : `/${safeTokens.join("/")}`;
}

export function createDiagnostic(code: DiagnosticCode, artifact: string, pointer = ""): Diagnostic {
  const definitionValue = DIAGNOSTIC_DEFINITIONS[code];
  const base = {
    code,
    severity: definitionValue.severity,
    artifact: safeArtifact(artifact),
    pointer: safePointer(pointer),
    rule: definitionValue.rule,
    message: definitionValue.message,
  } as const;

  return definitionValue.hint === undefined
    ? Object.freeze(base)
    : Object.freeze({ ...base, hint: definitionValue.hint });
}

export function sortAndDeduplicateDiagnostics(
  diagnostics: readonly Diagnostic[],
): readonly Diagnostic[] {
  const unique = new Map<string, Diagnostic>();
  for (const diagnostic of diagnostics) {
    const key = `${diagnostic.artifact}\u0000${diagnostic.pointer}\u0000${diagnostic.code}`;
    if (!unique.has(key)) {
      unique.set(key, diagnostic);
    }
  }

  return Object.freeze(
    [...unique.values()].sort(
      (left, right) =>
        compareText(left.artifact, right.artifact) ||
        compareText(left.pointer, right.pointer) ||
        compareText(left.code, right.code),
    ),
  );
}

export function exitCodeForDiagnostics(diagnostics: readonly Diagnostic[]): ExitCode {
  let result: ExitCode = 0;
  for (const diagnostic of diagnostics) {
    const candidate = DIAGNOSTIC_DEFINITIONS[diagnostic.code as DiagnosticCode]?.exitCode ?? 5;
    if (candidate === 5 || (candidate === 4 && result !== 5)) {
      result = candidate;
    } else if (candidate === 3 && result !== 5 && result !== 4) {
      result = 3;
    } else if (candidate === 2 && result === 0) {
      result = 2;
    }
  }
  return result;
}

export function operationResult<T>(
  diagnostics: readonly Diagnostic[],
  value: T | null,
): OperationResult<T> {
  const normalized = sortAndDeduplicateDiagnostics(diagnostics);
  const exitCode = exitCodeForDiagnostics(normalized);
  return Object.freeze({
    ok: exitCode === 0,
    exitCode,
    diagnostics: normalized,
    value: exitCode === 0 ? value : null,
  });
}

export function escapeJsonPointer(segment: string): string {
  return segment.replaceAll("~", "~0").replaceAll("/", "~1");
}

export function appendJsonPointer(pointer: string, segment: string | number): string {
  return `${pointer}/${escapeJsonPointer(String(segment))}`;
}
