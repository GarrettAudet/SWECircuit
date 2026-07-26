import assert from "node:assert/strict";
import { rm } from "node:fs/promises";

import {
  createGitBlobLoaderFixture,
  observeFixtureChildEnvironment,
} from "../helpers/git-blob-loader-fixture.mjs";

const expectedGitKeys = ["GIT_CONFIG_GLOBAL", "GIT_CONFIG_NOSYSTEM", "GIT_TERMINAL_PROMPT"];
const childEnvironment = observeFixtureChildEnvironment();
const childGitKeys = Object.keys(childEnvironment)
  .filter((key) => key.toUpperCase().startsWith("GIT_"))
  .sort();
assert.deepEqual(childGitKeys, expectedGitKeys);
assert.equal(childEnvironment.SWECIRCUIT_ENVIRONMENT_SENTINEL, "preserved");

const fixture = await createGitBlobLoaderFixture();
try {
  assert.deepEqual(
    fixture.revisions.map(({ files }) => files),
    [3, 35],
  );
  for (const revision of fixture.revisions) {
    assert.match(revision.commit, /^[0-9a-f]{40}$/u);
  }
  process.stdout.write(
    `${JSON.stringify({
      childGitKeys,
      sentinel: childEnvironment.SWECIRCUIT_ENVIRONMENT_SENTINEL,
      revisions: fixture.revisions,
    })}\n`,
  );
} finally {
  await rm(fixture.root, { recursive: true, force: true });
}
