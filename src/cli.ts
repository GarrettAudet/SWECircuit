import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { createDiagnostic, operationResult } from "./diagnostics.js";
import { initializeProject } from "./initialize.js";
import { inspectTrace } from "./trace.js";
import type {
  Diagnostic,
  InitializeProjectOptions,
  InspectTraceOptions,
  OperationResult,
  ProjectInitializationSummary,
  ProjectValidationSummary,
  TraceInspectionSummary,
  ValidateProjectOptions,
} from "./types.js";
import { validateProject } from "./validate.js";

const HELP = `Usage:
  node dist/cli.js init [--project PATH] [--project-id ID] [--json]
  node dist/cli.js validate [--project PATH] [--json]
  node dist/cli.js inspect --trace PATH [--project PATH] [--json]
  node dist/cli.js --help
`;

type Command = "init" | "validate" | "inspect";
type CliValue = ProjectInitializationSummary | ProjectValidationSummary | TraceInspectionSummary;
type ParsedValue = string | boolean | (string | boolean)[] | undefined;

interface ParsedValues extends Readonly<Record<string, ParsedValue>> {
  readonly project?: ParsedValue;
  readonly trace?: ParsedValue;
  readonly json?: ParsedValue;
  readonly help?: ParsedValue;
  readonly "project-id"?: ParsedValue;
}

interface ParsedToken {
  readonly kind: string;
  readonly name?: string;
}

export interface CliIo {
  readonly stdout: (text: string) => void;
  readonly stderr: (text: string) => void;
}

export interface CliOperations {
  readonly initializeProject: (
    options?: InitializeProjectOptions,
  ) => OperationResult<ProjectInitializationSummary>;
  readonly validateProject: (
    options?: ValidateProjectOptions,
  ) => OperationResult<ProjectValidationSummary>;
  readonly inspectTrace: (options: InspectTraceOptions) => OperationResult<TraceInspectionSummary>;
}

const DEFAULT_IO: CliIo = Object.freeze({
  stdout(text: string): void {
    process.stdout.write(text);
  },
  stderr(text: string): void {
    process.stderr.write(text);
  },
});

const DEFAULT_OPERATIONS: CliOperations = Object.freeze({
  initializeProject,
  validateProject,
  inspectTrace,
});

function usageResult(): OperationResult<CliValue> {
  return operationResult<CliValue>([createDiagnostic("SC0001", ".")], null);
}

function internalFailureResult(): OperationResult<CliValue> {
  return operationResult<CliValue>([createDiagnostic("SC9001", ".")], null);
}

function diagnosticLine(diagnostic: Diagnostic): string {
  const location =
    diagnostic.pointer.length === 0
      ? diagnostic.artifact
      : `${diagnostic.artifact}#${diagnostic.pointer}`;
  const hint = diagnostic.hint === undefined ? "" : ` Hint: ${diagnostic.hint}`;
  return `${diagnostic.code} ${diagnostic.severity} ${location}: ${diagnostic.message}${hint}\n`;
}

function humanSuccess(command: Command, value: CliValue): string {
  switch (command) {
    case "init": {
      const summary = value as ProjectInitializationSummary;
      return `Initialized ${summary.projectId} at ${summary.projectArtifact}.\n`;
    }
    case "validate": {
      const summary = value as ProjectValidationSummary;
      return `Validated ${summary.projectId} (${summary.artifacts.length} artifacts).\n`;
    }
    case "inspect": {
      const summary = value as TraceInspectionSummary;
      return `Inspected ${summary.traceArtifact} (${summary.eventCount} events, ${summary.runs.length} runs).\n`;
    }
  }
}

function renderResult(
  command: Command | null,
  result: OperationResult<CliValue>,
  json: boolean,
  io: CliIo,
): number {
  if (json) {
    io.stdout(`${JSON.stringify(result)}\n`);
    return result.exitCode;
  }

  if (result.ok && command !== null && result.value !== null) {
    io.stdout(humanSuccess(command, result.value));
  }
  for (const diagnostic of result.diagnostics) {
    io.stderr(diagnosticLine(diagnostic));
  }
  return result.exitCode;
}

function optionWasRepeated(tokens: readonly ParsedToken[]): boolean {
  const seen = new Set<string>();
  for (const token of tokens) {
    if (token.kind !== "option" || token.name === undefined) {
      continue;
    }
    if (seen.has(token.name)) {
      return true;
    }
    seen.add(token.name);
  }
  return false;
}

function invoke(
  command: Command,
  values: ParsedValues,
  operations: CliOperations,
): OperationResult<CliValue> {
  switch (command) {
    case "init":
      return operations.initializeProject({
        ...(typeof values.project === "string" ? { project: values.project } : {}),
        ...(typeof values["project-id"] === "string" ? { projectId: values["project-id"] } : {}),
      });
    case "validate":
      return operations.validateProject({
        ...(typeof values.project === "string" ? { project: values.project } : {}),
      });
    case "inspect":
      return operations.inspectTrace({
        ...(typeof values.project === "string" ? { project: values.project } : {}),
        trace: values.trace as string,
      });
  }
}

function allowedOption(command: Command, name: string): boolean {
  if (name === "json" || name === "project") {
    return true;
  }
  if (command === "init") {
    return name === "project-id";
  }
  if (command === "inspect") {
    return name === "trace";
  }
  return false;
}

export function runCli(
  args: readonly string[],
  io: CliIo = DEFAULT_IO,
  operations: CliOperations = DEFAULT_OPERATIONS,
): number {
  const jsonRequested = args.includes("--json");
  let values: ParsedValues;
  let positionals: readonly string[];
  let tokens: readonly ParsedToken[];

  try {
    const parsed = parseArgs({
      args: [...args],
      allowPositionals: true,
      strict: true,
      tokens: true,
      options: {
        project: { type: "string" },
        "project-id": { type: "string" },
        trace: { type: "string" },
        json: { type: "boolean" },
        help: { type: "boolean" },
      },
    });
    values = parsed.values as ParsedValues;
    positionals = parsed.positionals;
    tokens = parsed.tokens ?? [];
  } catch {
    return renderResult(null, usageResult(), jsonRequested, io);
  }

  const optionNames = tokens
    .filter((token) => token.kind === "option" && token.name !== undefined)
    .map((token) => token.name as string);
  const helpRequested = values.help === true;
  if (
    helpRequested &&
    positionals.length === 0 &&
    optionNames.length === 1 &&
    optionNames[0] === "help"
  ) {
    io.stdout(HELP);
    return 0;
  }

  const rawCommand = positionals[0];
  if (
    positionals.length !== 1 ||
    (rawCommand !== "init" && rawCommand !== "validate" && rawCommand !== "inspect") ||
    helpRequested ||
    optionWasRepeated(tokens)
  ) {
    return renderResult(null, usageResult(), jsonRequested, io);
  }
  const command: Command = rawCommand;

  if (optionNames.some((name) => !allowedOption(command, name))) {
    return renderResult(null, usageResult(), jsonRequested, io);
  }
  if (
    (command === "inspect" && (typeof values.trace !== "string" || values.trace.length === 0)) ||
    (command !== "inspect" && values.trace !== undefined)
  ) {
    return renderResult(null, usageResult(), jsonRequested, io);
  }

  let result: OperationResult<CliValue>;
  try {
    result = invoke(command, values, operations);
  } catch {
    result = internalFailureResult();
  }
  if (result.ok && result.value === null) {
    result = internalFailureResult();
  }
  return renderResult(command, result, jsonRequested, io);
}

function isMainModule(): boolean {
  const entry = process.argv[1];
  return entry !== undefined && resolve(entry) === fileURLToPath(import.meta.url);
}

if (isMainModule()) {
  process.exitCode = runCli(process.argv.slice(2));
}
