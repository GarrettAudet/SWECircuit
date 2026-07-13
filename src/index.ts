import { Ajv2020 } from "ajv/dist/2020.js";
import { parseTree } from "jsonc-parser";

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
