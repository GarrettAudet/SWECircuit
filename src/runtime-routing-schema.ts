import type { ErrorObject, ValidateFunction } from "ajv";
import { Ajv2020 } from "ajv/dist/2020.js";
import { appendJsonPointer } from "./diagnostics.js";
import type { JsonValue } from "./model.js";
import { RUNTIME_ROUTING_SCHEMA_SOURCE } from "./runtime-routing-schema-data.js";

const RUNTIME_ROUTING_SCHEMA_ID =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/runtime-routing.schema.json";

export interface RuntimeRoutingSchemaIssue {
  readonly pointer: string;
  readonly limit: boolean;
}

interface RuntimeRoutingSchemaRegistry {
  readonly request: ValidateFunction<unknown>;
  readonly compilation: ValidateFunction<unknown>;
  readonly override: ValidateFunction<unknown>;
  readonly expectation: ValidateFunction<unknown>;
}

let registry: RuntimeRoutingSchemaRegistry | undefined;

function runtimeRoutingSchemaRegistry(): RuntimeRoutingSchemaRegistry {
  if (registry !== undefined) {
    return registry;
  }
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    validateFormats: false,
  });
  ajv.addSchema(JSON.parse(RUNTIME_ROUTING_SCHEMA_SOURCE) as object);
  registry = Object.freeze({
    request: ajv.compile({ $ref: `${RUNTIME_ROUTING_SCHEMA_ID}#/$defs/request` }),
    compilation: ajv.compile({ $ref: `${RUNTIME_ROUTING_SCHEMA_ID}#/$defs/compilation` }),
    override: ajv.compile({ $ref: `${RUNTIME_ROUTING_SCHEMA_ID}#/$defs/override` }),
    expectation: ajv.compile({ $ref: `${RUNTIME_ROUTING_SCHEMA_ID}#/$defs/expectation` }),
  });
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

function issuesFor(
  validate: ValidateFunction<unknown>,
  value: JsonValue,
): readonly RuntimeRoutingSchemaIssue[] {
  if (validate(value)) {
    return Object.freeze([]);
  }
  return Object.freeze(
    (validate.errors ?? []).map((error) =>
      Object.freeze({
        pointer: propertyPointer(error),
        limit:
          error.keyword === "maxItems" ||
          error.keyword === "maxLength" ||
          error.keyword === "maximum",
      }),
    ),
  );
}

export function validateRuntimeRoutingRequestSchema(
  value: JsonValue,
): readonly RuntimeRoutingSchemaIssue[] {
  return issuesFor(runtimeRoutingSchemaRegistry().request, value);
}

export function validateRuntimeAssignmentCompilationSchema(
  value: JsonValue,
): readonly RuntimeRoutingSchemaIssue[] {
  return issuesFor(runtimeRoutingSchemaRegistry().compilation, value);
}

export function validateRuntimeAssignmentOverrideSchema(
  value: JsonValue,
): readonly RuntimeRoutingSchemaIssue[] {
  return issuesFor(runtimeRoutingSchemaRegistry().override, value);
}

export function validateRuntimeAssignmentExpectationSchema(
  value: JsonValue,
): readonly RuntimeRoutingSchemaIssue[] {
  return issuesFor(runtimeRoutingSchemaRegistry().expectation, value);
}
