import assert from "node:assert/strict";
import test from "node:test";

import { createToolchainProbe, TOOLCHAIN } from "../dist/index.js";

test("TypeScript ESM output loads with the approved production dependencies", () => {
  assert.deepEqual(createToolchainProbe(), {
    duplicateKeysVisible: true,
    parsed: true,
    schemaValid: true,
  });
  assert.equal(TOOLCHAIN.apiVersion, "swecircuit/v1alpha1");
});
