import type { ErrorObject, ValidateFunction } from "ajv";
import { Ajv2020 } from "ajv/dist/2020.js";
import { ADAPTIVE_RUN_SCHEMA_SOURCE } from "./adaptive-run-schema-data.js";
import type { JsonValue } from "./model.js";
import { RUNTIME_ROUTING_SCHEMA_SOURCE } from "./runtime-routing-schema-data.js";
import { SPECIALIST_RUN_SCHEMA_SOURCE } from "./specialist-run-schema-data.js";

const ADAPTIVE_RUN_SCHEMA_ID =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/adaptive-run.schema.json";

export interface AdaptiveRunSchemaIssue {
  readonly pointer: string;
  readonly limit: boolean;
}

interface AdaptiveRunSchemaRegistry {
  readonly root: ValidateFunction<unknown>;
  readonly expectation: ValidateFunction<unknown>;
  readonly launchCommand: ValidateFunction<unknown>;
  readonly event: ValidateFunction<unknown>;
  readonly session: ValidateFunction<unknown>;
}

let registry: AdaptiveRunSchemaRegistry | undefined;

function schemaRegistry(): AdaptiveRunSchemaRegistry {
  if (registry !== undefined) {
    return registry;
  }
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    validateFormats: false,
  });
  ajv.addSchema(JSON.parse(RUNTIME_ROUTING_SCHEMA_SOURCE) as object);
  ajv.addSchema(JSON.parse(SPECIALIST_RUN_SCHEMA_SOURCE) as object);
  ajv.addSchema(JSON.parse(ADAPTIVE_RUN_SCHEMA_SOURCE) as object);
  const root = ajv.getSchema(ADAPTIVE_RUN_SCHEMA_ID);
  if (root === undefined) {
    throw new TypeError("Adaptive run schema did not compile.");
  }
  registry = Object.freeze({
    root,
    expectation: ajv.compile({ $ref: `${ADAPTIVE_RUN_SCHEMA_ID}#/$defs/expectation` }),
    launchCommand: ajv.compile({ $ref: `${ADAPTIVE_RUN_SCHEMA_ID}#/$defs/launchCommand` }),
    event: ajv.compile({ $ref: `${ADAPTIVE_RUN_SCHEMA_ID}#/$defs/event` }),
    session: ajv.compile({ $ref: `${ADAPTIVE_RUN_SCHEMA_ID}#/$defs/session` }),
  });
  return registry;
}

function propertyPointer(error: ErrorObject): string {
  if (error.keyword === "required") {
    const property = (error.params as { readonly missingProperty?: unknown }).missingProperty;
    return typeof property === "string" ? `${error.instancePath}/${property}` : error.instancePath;
  }
  if (error.keyword === "additionalProperties") {
    const property = (error.params as { readonly additionalProperty?: unknown }).additionalProperty;
    return typeof property === "string" ? `${error.instancePath}/${property}` : error.instancePath;
  }
  return error.instancePath;
}

function issues(
  validate: ValidateFunction<unknown>,
  value: JsonValue,
): readonly AdaptiveRunSchemaIssue[] {
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

export function validateAdaptiveRunSchema(value: JsonValue): readonly AdaptiveRunSchemaIssue[] {
  return issues(schemaRegistry().root, value);
}

export function validateAdaptiveRunExpectationSchema(
  value: JsonValue,
): readonly AdaptiveRunSchemaIssue[] {
  return issues(schemaRegistry().expectation, value);
}

export function validateHostLaunchCommandSchema(
  value: JsonValue,
): readonly AdaptiveRunSchemaIssue[] {
  return issues(schemaRegistry().launchCommand, value);
}

export function validateAdaptiveHostEventSchema(
  value: JsonValue,
): readonly AdaptiveRunSchemaIssue[] {
  return issues(schemaRegistry().event, value);
}

export function validateAdaptiveRunSessionSchema(
  value: JsonValue,
): readonly AdaptiveRunSchemaIssue[] {
  return issues(schemaRegistry().session, value);
}
