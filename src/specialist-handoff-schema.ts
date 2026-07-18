import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { ErrorObject, ValidateFunction } from "ajv";
import { Ajv2020 } from "ajv/dist/2020.js";
import { appendJsonPointer, createDiagnostic } from "./diagnostics.js";
import type { JsonValue } from "./model.js";
import type { Diagnostic } from "./types.js";

const HANDOFF_SCHEMA_ID =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-handoff.schema.json";

let validator: ValidateFunction<unknown> | undefined;

function readSchema(fileName: string): object {
  const url = new URL(`../schemas/v1alpha1/${fileName}`, import.meta.url);
  return JSON.parse(readFileSync(fileURLToPath(url), "utf8")) as object;
}

function handoffValidator(): ValidateFunction<unknown> {
  if (validator !== undefined) {
    return validator;
  }
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    validateFormats: false,
  });
  ajv.addSchema(readSchema("common.schema.json"));
  ajv.addSchema(readSchema("specialist-handoff.schema.json"));
  const compiled = ajv.getSchema(HANDOFF_SCHEMA_ID);
  if (compiled === undefined) {
    throw new TypeError("Specialist handoff schema did not compile.");
  }
  validator = compiled;
  return compiled;
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

export function validateSpecialistHandoffSchema(
  value: JsonValue,
  artifact: string,
): readonly Diagnostic[] {
  const validate = handoffValidator();
  if (validate(value)) {
    return Object.freeze([]);
  }
  return Object.freeze(
    (validate.errors ?? []).map((error) =>
      createDiagnostic(
        error.keyword === "maxItems" || error.keyword === "maxLength" || error.keyword === "maximum"
          ? "SC4308"
          : "SC4310",
        artifact,
        propertyPointer(error),
      ),
    ),
  );
}
