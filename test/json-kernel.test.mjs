import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  createDiagnostic,
  DIAGNOSTIC_DEFINITIONS,
  LIMITS,
  parseJsonBuffer,
  sortAndDeduplicateDiagnostics,
  validateArtifactValue,
} from "../dist/index.js";

const readJson = (relativePath) =>
  JSON.parse(readFileSync(new URL(relativePath, import.meta.url), "utf8"));

const codes = (result) => result.diagnostics.map((diagnostic) => diagnostic.code);

test("runtime diagnostic definitions exactly match the normative catalog", () => {
  const catalog = readJson("../schemas/v1alpha1/diagnostic-catalog.json");
  assert.deepEqual(Object.keys(DIAGNOSTIC_DEFINITIONS).sort(), [
    ...catalog.diagnostics.map((diagnostic) => diagnostic.code).sort(),
  ]);
  for (const diagnostic of catalog.diagnostics) {
    assert.equal(DIAGNOSTIC_DEFINITIONS[diagnostic.code].rule, diagnostic.rule);
    assert.equal(DIAGNOSTIC_DEFINITIONS[diagnostic.code].severity, diagnostic.severity);
    assert.equal(DIAGNOSTIC_DEFINITIONS[diagnostic.code].exitCode, diagnostic.exitClass);
  }
});

test("strict JSON parsing rejects invalid UTF-8, syntax extensions, duplicate keys, and unsafe numbers", () => {
  assert.deepEqual(codes(parseJsonBuffer(Uint8Array.from([0xc3, 0x28]), "input.json")), ["SC1101"]);
  assert.deepEqual(
    codes(parseJsonBuffer(Buffer.from('{"ready": true, // no\n}', "utf8"), "input.json")),
    ["SC1102"],
  );
  assert.deepEqual(codes(parseJsonBuffer(Buffer.from('{"ready": true,}', "utf8"), "input.json")), [
    "SC1102",
  ]);
  const duplicate = parseJsonBuffer(
    Buffer.from('{"apiVersion":"one","apiVersion":"two"}', "utf8"),
    "input.json",
  );
  assert.deepEqual(codes(duplicate), ["SC1103"]);
  assert.equal(duplicate.diagnostics[0].pointer, "");
  const duplicatePermission = parseJsonBuffer(
    Buffer.from(
      '{"spec":{"requiredPermissions":[{"kind":"filesystem.read","kind":"filesystem.write"}]}}',
      "utf8",
    ),
    "input.json",
  );
  assert.deepEqual(codes(duplicatePermission), ["SC1103"]);
  assert.equal(duplicatePermission.diagnostics[0].pointer, "/spec/requiredPermissions/0");
  assert.deepEqual(codes(parseJsonBuffer(Buffer.from('{"value":1e999}', "utf8"), "input.json")), [
    "SC1104",
  ]);
  assert.deepEqual(
    codes(parseJsonBuffer(Buffer.from('{"value":9007199254740992}', "utf8"), "input.json")),
    ["SC1104"],
  );
});

test("strict JSON parsing enforces artifact byte and depth ceilings before validation", () => {
  const exactBytes = Buffer.from(`{}${" ".repeat(LIMITS.artifactBytes - 2)}`);
  assert.deepEqual(codes(parseJsonBuffer(exactBytes, "exact.json")), []);
  assert.deepEqual(codes(parseJsonBuffer(Buffer.alloc(LIMITS.artifactBytes + 1), "large.json")), [
    "SC5001",
  ]);

  let exactDepth = 0;
  for (let index = 0; index < LIMITS.jsonDepth; index += 1) {
    exactDepth = { nested: exactDepth };
  }
  assert.deepEqual(
    codes(parseJsonBuffer(Buffer.from(JSON.stringify(exactDepth)), "exact-depth.json")),
    [],
  );

  let nested = 0;
  for (let index = 0; index < LIMITS.jsonDepth + 1; index += 1) {
    nested = { nested };
  }
  assert.deepEqual(codes(parseJsonBuffer(Buffer.from(JSON.stringify(nested)), "deep.json")), [
    "SC5002",
  ]);
  const adversarialDepth = `${"[".repeat(10_000)}0${"]".repeat(10_000)}`;
  assert.deepEqual(codes(parseJsonBuffer(Buffer.from(adversarialDepth), "very-deep.json")), [
    "SC5002",
  ]);
});

test("dispatch fails closed with stable version and kind diagnostics", () => {
  const missing = validateArtifactValue({});
  assert.equal(missing.ok, false);
  assert.equal(missing.exitCode, 2);
  assert.deepEqual(codes(missing), ["SC1201", "SC1211"]);
  assert.deepEqual(
    missing.diagnostics.map((diagnostic) => diagnostic.pointer),
    ["/apiVersion", "/kind"],
  );

  const unsupported = validateArtifactValue({ apiVersion: "other/v1", kind: "Rail" });
  assert.deepEqual(codes(unsupported), ["SC1203", "SC1213"]);

  const wrongTypes = validateArtifactValue({ apiVersion: 1, kind: [] });
  assert.deepEqual(codes(wrongTypes), ["SC1202", "SC1212"]);
});

test("schema failures normalize permission, privacy, and stop-condition policy", () => {
  const validModule = readJson("fixtures/valid/module.json");

  const forbidden = structuredClone(validModule);
  forbidden.prompt = "do not persist this";
  assert.deepEqual(codes(validateArtifactValue(forbidden)), ["SC4102"]);

  const selfGrant = structuredClone(validModule);
  selfGrant.trusted = true;
  assert.deepEqual(codes(validateArtifactValue(selfGrant)), ["SC4004"]);

  const missingPermissions = structuredClone(validModule);
  delete missingPermissions.spec.requiredPermissions;
  assert.deepEqual(codes(validateArtifactValue(missingPermissions)), ["SC4001"]);

  const missingStop = structuredClone(validModule);
  delete missingStop.spec.stopConditions;
  assert.deepEqual(codes(validateArtifactValue(missingStop)), ["SC2105"]);

  const unknownPermission = structuredClone(validModule);
  unknownPermission.spec.requiredPermissions[0].kind = "filesystem.admin";
  assert.ok(codes(validateArtifactValue(unknownPermission)).includes("SC4002"));
});

test("diagnostics are sanitized, deduplicated, and sorted deterministically", () => {
  const diagnostics = sortAndDeduplicateDiagnostics([
    createDiagnostic("SC2001", "z.json", "/b"),
    createDiagnostic("SC1301", "a.json", "/z"),
    createDiagnostic("SC1301", "a.json", "/z"),
    createDiagnostic("SC1012", "C:\\Users\\secret\\input.json", "/a"),
    createDiagnostic("SC1012", `bad${String.fromCharCode(1)}name.json`, "/a"),
  ]);
  assert.deepEqual(
    diagnostics.map(({ artifact, pointer, code }) => ({ artifact, pointer, code })),
    [
      { artifact: ".", pointer: "/a", code: "SC1012" },
      { artifact: "a.json", pointer: "/z", code: "SC1301" },
      { artifact: "z.json", pointer: "/b", code: "SC2001" },
    ],
  );
  assert.equal(JSON.stringify(diagnostics).includes("Users"), false);
  assert.equal(
    createDiagnostic("SC1012", "safe.json", `/C:${String.fromCharCode(92)}Users`).pointer,
    "",
  );
  assert.equal(
    createDiagnostic("SC1012", "safe.json", `/bad${String.fromCharCode(1)}`).pointer,
    "",
  );
  assert.equal(
    createDiagnostic("SC1012", "safe.json", "/spec/~1Users~1alice~1secret").pointer,
    "/spec",
  );
  assert.equal(createDiagnostic("SC1012", "safe.json", "/spec/~2invalid/tail").pointer, "/spec");
  assert.equal(createDiagnostic("SC1012", "safe.json", "/safe/~0token").pointer, "/safe/~0token");
});
