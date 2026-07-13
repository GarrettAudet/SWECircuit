import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { ErrorObject, ValidateFunction } from "ajv";
import { Ajv2020 } from "ajv/dist/2020.js";
import { API_VERSION, ARTIFACT_KINDS, type ArtifactKind, isArtifactKind } from "./constants.js";
import { appendJsonPointer, createDiagnostic, type DiagnosticCode } from "./diagnostics.js";
import type { JsonObject, JsonValue } from "./model.js";
import type { Diagnostic } from "./types.js";

const SCHEMA_FILES = Object.freeze({
  AdapterManifest: "adapter-manifest.schema.json",
  Circuit: "circuit.schema.json",
  Module: "module.schema.json",
  Project: "project.schema.json",
  RunEvent: "run-event.schema.json",
  WorkPacket: "work-packet.schema.json",
} satisfies Readonly<Record<ArtifactKind, string>>);

const PERMISSION_LIST_FIELDS = new Set([
  "permissionCeiling",
  "requestedPermissions",
  "requiredPermissions",
]);
const SELF_GRANT_FIELDS = new Set([
  "attested",
  "effectivePermissions",
  "grantedPermissions",
  "permissionGrants",
  "trusted",
  "verified",
]);
const FORBIDDEN_CONTENT_FIELDS = new Set([
  "chat",
  "chats",
  "commandOutput",
  "conversation",
  "conversations",
  "credential",
  "credentials",
  "environment",
  "environmentDump",
  "evidenceContent",
  "inlineConfig",
  "prompt",
  "prompts",
  "secret",
  "secrets",
]);

interface SchemaRegistry {
  readonly validators: Readonly<Record<ArtifactKind, ValidateFunction<unknown>>>;
}

export interface DispatchResult {
  readonly kind: ArtifactKind | null;
  readonly diagnostics: readonly Diagnostic[];
}

let registry: SchemaRegistry | undefined;

function isObject(value: JsonValue): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function property(object: JsonObject, key: string): JsonValue | undefined {
  return object[key];
}

function readSchema(fileName: string): object {
  const url = new URL(`../schemas/v1alpha1/${fileName}`, import.meta.url);
  return JSON.parse(readFileSync(fileURLToPath(url), "utf8")) as object;
}

function schemaRegistry(): SchemaRegistry {
  if (registry !== undefined) {
    return registry;
  }

  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    validateFormats: false,
  });
  ajv.addSchema(readSchema("common.schema.json"));

  const validators = {} as Record<ArtifactKind, ValidateFunction<unknown>>;
  for (const kind of ARTIFACT_KINDS) {
    validators[kind] = ajv.compile(readSchema(SCHEMA_FILES[kind]));
  }
  registry = Object.freeze({ validators: Object.freeze(validators) });
  return registry;
}

function dispatchField(
  object: JsonObject,
  property: "apiVersion" | "kind",
  artifact: string,
): readonly Diagnostic[] {
  const pointer = `/${property}`;
  const value = object[property];
  if (value === undefined) {
    return Object.freeze([
      createDiagnostic(property === "apiVersion" ? "SC1201" : "SC1211", artifact, pointer),
    ]);
  }
  if (typeof value !== "string") {
    return Object.freeze([
      createDiagnostic(property === "apiVersion" ? "SC1202" : "SC1212", artifact, pointer),
    ]);
  }
  if (property === "apiVersion" && value !== API_VERSION) {
    return Object.freeze([createDiagnostic("SC1203", artifact, pointer)]);
  }
  if (property === "kind" && !isArtifactKind(value)) {
    return Object.freeze([createDiagnostic("SC1213", artifact, pointer)]);
  }
  return Object.freeze([]);
}

export function dispatchArtifact(value: JsonValue, artifact: string): DispatchResult {
  const object: JsonObject = isObject(value) ? value : {};
  const diagnostics = [
    ...dispatchField(object, "apiVersion", artifact),
    ...dispatchField(object, "kind", artifact),
  ];
  const rawKind = property(object, "kind");
  return Object.freeze({
    kind:
      diagnostics.length === 0 && typeof rawKind === "string" && isArtifactKind(rawKind)
        ? rawKind
        : null,
    diagnostics: Object.freeze(diagnostics),
  });
}

function propertyPointer(error: ErrorObject): string {
  if (error.keyword === "required") {
    const missing = (error.params as { readonly missingProperty?: unknown }).missingProperty;
    return typeof missing === "string"
      ? appendJsonPointer(error.instancePath, missing)
      : error.instancePath;
  }
  if (error.keyword === "additionalProperties") {
    return error.instancePath;
  }
  return error.instancePath;
}

function schemaCode(error: ErrorObject): DiagnosticCode {
  const params = error.params as {
    readonly additionalProperty?: unknown;
    readonly missingProperty?: unknown;
  };
  const property =
    typeof params.additionalProperty === "string"
      ? params.additionalProperty
      : typeof params.missingProperty === "string"
        ? params.missingProperty
        : null;

  if (property !== null && FORBIDDEN_CONTENT_FIELDS.has(property)) {
    return "SC4102";
  }
  if (property !== null && SELF_GRANT_FIELDS.has(property)) {
    return "SC4004";
  }
  if (error.keyword === "required" && property !== null && PERMISSION_LIST_FIELDS.has(property)) {
    return "SC4001";
  }
  if (error.keyword === "required" && property === "stopConditions") {
    return "SC2105";
  }
  if (
    (error.keyword === "enum" || error.keyword === "const") &&
    /\/(?:requiredPermissions|permissionCeiling|requestedPermissions)\/[0-9]+\/kind$/.test(
      error.instancePath,
    )
  ) {
    return "SC4002";
  }

  switch (error.keyword) {
    case "required":
      return "SC1301";
    case "type":
      return "SC1302";
    case "additionalProperties":
      return "SC1303";
    case "const":
    case "enum":
      return "SC1304";
    default:
      return "SC1305";
  }
}

export function validateArtifactSchema(
  value: JsonValue,
  kind: ArtifactKind,
  artifact: string,
): readonly Diagnostic[] {
  const validate = schemaRegistry().validators[kind];
  if (validate(value)) {
    return Object.freeze([]);
  }
  return Object.freeze(
    (validate.errors ?? []).map((error) =>
      createDiagnostic(schemaCode(error), artifact, propertyPointer(error)),
    ),
  );
}
