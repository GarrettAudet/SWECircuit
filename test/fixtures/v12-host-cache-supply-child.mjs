import assert from "node:assert/strict";
import { access, readFile, realpath } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [gatePath, lifecyclePath, destination, checkoutLocalCache] = process.argv.slice(2);

assert.ok(gatePath, "release-gate module path is required");
assert.ok(lifecyclePath, "lifecycle module path is required");
assert.ok(destination, "cache destination is required");
assert.ok(checkoutLocalCache, "checkout-local cache path is required");

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

assert.equal(
  await pathExists(checkoutLocalCache),
  false,
  "isolated checkout-local npm cache must be absent before module import",
);

const gate = await import(pathToFileURL(gatePath).href);
const lifecycle = await import(pathToFileURL(lifecyclePath).href);
const dependencyEnvironmentKey = gate.RELEASE_GATE_TEST_HOOKS.hostDependencyRootEnvironmentKey;
assert.equal(
  resolve(gate.RELEASE_GATE_TEST_HOOKS.hostDependencyRoot),
  resolve(process.env[dependencyEnvironmentKey]),
);
assert.equal(
  resolve(gate.RELEASE_GATE_TEST_HOOKS.hostNpmCache),
  resolve(process.env.npm_config_cache),
);
const evidence =
  await lifecycle.V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS.copyHostNpmCacheSupply(destination);
const configuredSource = await realpath(process.env.npm_config_cache);
assert.equal(evidence.source, configuredSource);
assert.equal(
  await pathExists(checkoutLocalCache),
  false,
  "cache copy must not create or consume the isolated checkout-local cache",
);

process.stdout.write(
  `${JSON.stringify({
    configuredSource,
    gateSource: gate.RELEASE_GATE_TEST_HOOKS.hostNpmCache,
    dependencySource: await realpath(gate.RELEASE_GATE_TEST_HOOKS.hostDependencyRoot),
    evidence,
    checkoutLocalCacheAbsent: true,
    sentinel: (await readFile(resolve(destination, "sentinel.txt"))).toString("base64"),
  })}\n`,
);
