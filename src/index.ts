import { Ajv2020 } from "ajv/dist/2020.js";
import { parseTree } from "jsonc-parser";

export { API_VERSION, ARTIFACT_KINDS, LIMITS } from "./constants.js";
export {
  createDiagnostic,
  DIAGNOSTIC_DEFINITIONS,
  exitCodeForDiagnostics,
  sortAndDeduplicateDiagnostics,
} from "./diagnostics.js";
export { initializeProject } from "./initialize.js";
export { parseJsonBuffer } from "./json.js";
export { validateArtifactValue, validateProject } from "./validate.js";
export type {
  Diagnostic,
  DiagnosticSeverity,
  ExitCode,
  InitializeProjectOptions,
  OperationResult,
  ProjectInitializationSummary,
  ProjectValidationSummary,
  ValidateProjectOptions,
  ValidatedArtifactSummary,
} from "./types.js";

export const TOOLCHAIN = Object.freeze({
  apiVersion: "swecircuit/v1alpha1",
  parser: "jsonc-parser",
  runtime: "node",
  schemaDialect: "https://json-schema.org/draft/2020-12/schema",
  validator: "ajv",
});

export function createToolchainProbe(): Readonly<{
  duplicateKeysVisible: boolean;
  parsed: boolean;
  schemaValid: boolean;
}> {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const validate = ajv.compile({
    type: "object",
    properties: { ready: { const: true } },
    required: ["ready"],
    additionalProperties: false,
  });

  const duplicateTree = parseTree('{"ready":true,"ready":false}');
  const duplicateKeys =
    duplicateTree?.children?.filter(
      (property) => property.type === "property" && property.children?.[0]?.value === "ready",
    ).length ?? 0;

  return Object.freeze({
    duplicateKeysVisible: duplicateKeys === 2,
    parsed: parseTree('{"ready":true}') !== undefined,
    schemaValid: validate({ ready: true }),
  });
}
