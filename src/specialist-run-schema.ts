import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { ErrorObject, ValidateFunction } from "ajv";
import { Ajv2020 } from "ajv/dist/2020.js";
import { appendJsonPointer, createDiagnostic } from "./diagnostics.js";
import type { JsonValue } from "./model.js";
import type { Diagnostic } from "./types.js";

const SPECIALIST_RUN_SCHEMA_ID =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-run.schema.json";

interface SpecialistRunSchemaRegistry {
  readonly root: ValidateFunction<unknown>;
  readonly session: ValidateFunction<unknown>;
  readonly inspection: ValidateFunction<unknown>;
}

let registry: SpecialistRunSchemaRegistry | undefined;

function readSchema(fileName: string): object {
  const url = new URL(`../schemas/v1alpha1/${fileName}`, import.meta.url);
  return JSON.parse(readFileSync(fileURLToPath(url), "utf8")) as object;
}

function specialistRunSchemaRegistry(): SpecialistRunSchemaRegistry {
  if (registry !== undefined) {
    return registry;
  }

  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    validateFormats: false,
  });
  ajv.addSchema(readSchema("specialist-run.schema.json"));
  const root = ajv.getSchema(SPECIALIST_RUN_SCHEMA_ID);
  if (root === undefined) {
    throw new TypeError("Specialist run schema did not compile.");
  }
  const session = ajv.compile({
    $ref: `${SPECIALIST_RUN_SCHEMA_ID}#/$defs/session`,
  });
  const inspection = ajv.compile({
    $ref: `${SPECIALIST_RUN_SCHEMA_ID}#/$defs/inspection`,
  });
  registry = Object.freeze({ root, session, inspection });
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
          ? "SC4402"
          : "SC4401",
        artifact,
        propertyPointer(error),
      ),
    ),
  );
}

export function validateSpecialistRunSchema(
  value: JsonValue,
  artifact: string,
): readonly Diagnostic[] {
  return diagnosticsFor(specialistRunSchemaRegistry().root, value, artifact);
}

export function validateSpecialistRunSessionSchema(
  value: JsonValue,
  artifact: string,
): readonly Diagnostic[] {
  return diagnosticsFor(specialistRunSchemaRegistry().session, value, artifact);
}

export function validateSpecialistRunInspectionSchema(
  value: JsonValue,
  artifact: string,
): readonly Diagnostic[] {
  return diagnosticsFor(specialistRunSchemaRegistry().inspection, value, artifact);
}
