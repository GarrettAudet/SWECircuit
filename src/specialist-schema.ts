import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { ErrorObject, ValidateFunction } from "ajv";
import { Ajv2020 } from "ajv/dist/2020.js";
import { appendJsonPointer, createDiagnostic } from "./diagnostics.js";
import type { JsonValue } from "./model.js";
import type { Diagnostic } from "./types.js";

const SPECIALIST_SCHEMA_ID =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-compiler.schema.json";

interface SpecialistSchemaRegistry {
  readonly goal: ValidateFunction<unknown>;
  readonly request: ValidateFunction<unknown>;
}

let registry: SpecialistSchemaRegistry | undefined;

function readSchema(fileName: string): object {
  const url = new URL(`../schemas/v1alpha1/${fileName}`, import.meta.url);
  return JSON.parse(readFileSync(fileURLToPath(url), "utf8")) as object;
}

function specialistSchemaRegistry(): SpecialistSchemaRegistry {
  if (registry !== undefined) {
    return registry;
  }

  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    validateFormats: false,
  });
  ajv.addSchema(readSchema("common.schema.json"));
  ajv.addSchema(readSchema("specialist-compiler.schema.json"));

  const goal = ajv.compile({ $ref: `${SPECIALIST_SCHEMA_ID}#/$defs/goalContract` });
  const request = ajv.compile({ $ref: `${SPECIALIST_SCHEMA_ID}#/$defs/compilationRequest` });
  registry = Object.freeze({ goal, request });
  return registry;
}

function propertyPointer(error: ErrorObject): string {
  if (error.keyword === "required") {
    const missing = (error.params as { readonly missingProperty?: unknown }).missingProperty;
    return typeof missing === "string"
      ? appendJsonPointer(error.instancePath, missing)
      : error.instancePath;
  }
  if (error.keyword === "additionalProperties") {
    const additional = (error.params as { readonly additionalProperty?: unknown })
      .additionalProperty;
    return typeof additional === "string"
      ? appendJsonPointer(error.instancePath, additional)
      : error.instancePath;
  }
  return error.instancePath;
}

function diagnosticsFor(
  validate: ValidateFunction<unknown>,
  value: JsonValue,
  artifact: string,
): readonly Diagnostic[] {
  if (validate(value)) {
    return Object.freeze([]);
  }
  return Object.freeze(
    (validate.errors ?? []).map((error) =>
      createDiagnostic(
        error.keyword === "maxItems" || error.keyword === "maxLength" || error.keyword === "maximum"
          ? "SC4308"
          : "SC4301",
        artifact,
        propertyPointer(error),
      ),
    ),
  );
}

export function validateSpecialistGoalSchema(
  value: JsonValue,
  artifact: string,
): readonly Diagnostic[] {
  return diagnosticsFor(specialistSchemaRegistry().goal, value, artifact);
}

export function validateSpecialistRequestSchema(
  value: JsonValue,
  artifact: string,
): readonly Diagnostic[] {
  return diagnosticsFor(specialistSchemaRegistry().request, value, artifact);
}
