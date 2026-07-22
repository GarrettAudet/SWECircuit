import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { link, mkdir, mkdtemp, readFile, realpath, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { delimiter, join, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  executeTypeScript,
  resolveTypeScriptEntrypointBinding,
  TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY,
} from "../scripts/run-typescript.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const SENTINEL_SOURCE = (id) => `
import { appendFileSync } from "node:fs";
const marker = process.env.SWECIRCUIT_TYPESCRIPT_SENTINEL;
appendFileSync(marker, JSON.stringify({ id: ${JSON.stringify(id)}, args: process.argv.slice(2) }) + "\\n");
if (process.argv[2] === "--version") {
  process.stdout.write("Version ${id}-1.0.0\\n");
}
`;

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function withoutTypeScriptSupply(environment = process.env) {
  const result = { ...environment };
  for (const key of Object.keys(result)) {
    if (key.toLowerCase() === TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY.toLowerCase()) {
      Reflect.deleteProperty(result, key);
    }
  }
  return result;
}

async function sentinelCalls(path) {
  return (await readFile(path, "utf8"))
    .trim()
    .split(/\r?\n/u)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

test("declared TypeScript file defeats ambient and candidate-local command substitution", async () => {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-typescript-external-"));
  const projectRoot = join(root, "candidate");
  const externalRoot = join(root, "external");
  const ambientBin = join(root, "ambient-bin");
  const candidateBin = join(projectRoot, "node_modules", ".bin");
  const external = join(externalRoot, "tsc.mjs");
  const externalMarker = join(root, "external.log");

  try {
    await mkdir(externalRoot, { recursive: true });
    await mkdir(ambientBin, { recursive: true });
    await mkdir(candidateBin, { recursive: true });
    await writeFile(external, SENTINEL_SOURCE("external"));
    await writeFile(join(ambientBin, "tsc.mjs"), SENTINEL_SOURCE("ambient"));
    await writeFile(join(candidateBin, "tsc.mjs"), SENTINEL_SOURCE("candidate"));

    const environment = withoutTypeScriptSupply();
    environment[TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY] = external;
    environment.SWECIRCUIT_TYPESCRIPT_SENTINEL = externalMarker;
    environment.PATH = [candidateBin, ambientBin, environment.PATH ?? ""].join(delimiter);
    const execution = executeTypeScript(["--project", "sentinel.json"], {
      cwd: projectRoot,
      environment,
      projectRoot,
      stdio: "pipe",
    });

    assert.equal(execution.result.status, 0);
    assert.deepEqual(await sentinelCalls(externalMarker), [
      { id: "external", args: ["--version"] },
      { id: "external", args: ["--project", "sentinel.json"] },
    ]);
    const bytes = await readFile(external);
    assert.deepEqual(execution.receipt, {
      path: resolve(external),
      bytes: bytes.byteLength,
      digest: digest(bytes),
      nlink: 1,
      supplied: true,
      version: "Version external-1.0.0",
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("repository-local fallback executes the exact resolved file", async () => {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-typescript-fallback-"));
  const fallback = join(root, "node_modules", "typescript", "bin", "tsc");
  const conflictingBin = join(root, "node_modules", ".bin");
  const marker = join(root, "fallback.log");

  try {
    await mkdir(join(root, "node_modules", "typescript", "bin"), { recursive: true });
    await mkdir(conflictingBin, { recursive: true });
    await writeFile(fallback, SENTINEL_SOURCE("fallback"));
    await writeFile(join(conflictingBin, "tsc.mjs"), SENTINEL_SOURCE("conflict"));
    const environment = withoutTypeScriptSupply();
    environment.SWECIRCUIT_TYPESCRIPT_SENTINEL = marker;
    environment.PATH = [conflictingBin, environment.PATH ?? ""].join(delimiter);
    const execution = executeTypeScript(["--noEmit"], {
      cwd: root,
      environment,
      projectRoot: root,
      stdio: "pipe",
    });

    assert.equal(execution.result.status, 0);
    assert.equal(execution.receipt.supplied, false);
    assert.equal(execution.receipt.path, resolve(fallback));
    assert.deepEqual(await sentinelCalls(marker), [
      { id: "fallback", args: ["--version"] },
      { id: "fallback", args: ["--noEmit"] },
    ]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("repository fallback canonicalizes a linked dependency ancestor", async () => {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-typescript-linked-fallback-"));
  const projectRoot = join(root, "candidate");
  const dependencyRoot = join(root, "dependencies");
  const linkedNodeModules = join(projectRoot, "node_modules");
  const target = join(dependencyRoot, "typescript", "bin", "tsc");
  const fallback = join(linkedNodeModules, "typescript", "bin", "tsc");
  const marker = join(root, "fallback.log");

  try {
    await mkdir(projectRoot);
    await mkdir(join(dependencyRoot, "typescript", "bin"), { recursive: true });
    await writeFile(target, SENTINEL_SOURCE("linked-fallback"));
    await symlink(
      dependencyRoot,
      linkedNodeModules,
      process.platform === "win32" ? "junction" : "dir",
    );
    const environment = withoutTypeScriptSupply();
    environment.SWECIRCUIT_TYPESCRIPT_SENTINEL = marker;
    const execution = executeTypeScript(["--noEmit"], {
      cwd: projectRoot,
      environment,
      projectRoot,
      defaultEntrypoint: fallback,
      stdio: "pipe",
    });

    assert.equal(execution.result.status, 0);
    assert.equal(execution.receipt.supplied, false);
    assert.equal(execution.receipt.path, await realpath(target));
    assert.deepEqual(await sentinelCalls(marker), [
      { id: "linked-fallback", args: ["--version"] },
      { id: "linked-fallback", args: ["--noEmit"] },
    ]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("execution stops when version inspection mutates the bound file", async () => {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-typescript-mutation-"));
  const projectRoot = join(root, "candidate");
  const external = join(root, "tsc.mjs");
  const marker = join(root, "mutation.log");

  try {
    await mkdir(projectRoot);
    await writeFile(
      external,
      `${SENTINEL_SOURCE("mutating")}\nif (process.argv[2] === "--version") appendFileSync(process.argv[1], "\\n// mutation\\n");\n`,
    );
    const environment = withoutTypeScriptSupply();
    environment[TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY] = external;
    environment.SWECIRCUIT_TYPESCRIPT_SENTINEL = marker;

    assert.throws(
      () =>
        executeTypeScript(["--noEmit"], {
          cwd: projectRoot,
          environment,
          projectRoot,
          stdio: "pipe",
        }),
      /changed during version inspection/u,
    );
    assert.deepEqual(await sentinelCalls(marker), [{ id: "mutating", args: ["--version"] }]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
test("TypeScript binding rejects ambiguous, contained, and linked files", async () => {
  const root = await mkdtemp(join(tmpdir(), "swecircuit-typescript-reject-"));
  const projectRoot = join(root, "candidate");
  const externalRoot = join(root, "external");
  const external = join(externalRoot, "tsc.mjs");
  const candidate = join(projectRoot, "tsc.mjs");
  const finalLink = join(root, "final-link");
  const ancestorLink = join(root, "ancestor-link");
  const hardLink = join(root, "hard-link.mjs");
  const key = TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY;
  const resolveSupply = (environment, defaultEntrypoint = external) =>
    resolveTypeScriptEntrypointBinding({
      environment,
      projectRoot,
      defaultEntrypoint,
      outsidePolicy: "always",
      label: "Host TypeScript entrypoint supply",
    });

  try {
    await mkdir(projectRoot);
    await mkdir(externalRoot);
    await writeFile(external, SENTINEL_SOURCE("external"));
    await writeFile(candidate, SENTINEL_SOURCE("candidate"));
    await symlink(externalRoot, finalLink, process.platform === "win32" ? "junction" : "dir");
    await symlink(externalRoot, ancestorLink, process.platform === "win32" ? "junction" : "dir");

    assert.equal(resolveSupply({}).path, resolve(external));
    assert.throws(
      () => resolveSupply({ [key]: external, [key.toLowerCase()]: external }),
      /at most once/u,
    );
    assert.throws(() => resolveSupply({ [key]: "" }), /non-empty/u);
    assert.throws(() => resolveSupply({ [key]: "relative/tsc.mjs" }), /absolute/u);
    assert.throws(() => resolveSupply({ [key]: join(root, "missing.mjs") }), { code: "ENOENT" });
    assert.throws(() => resolveSupply({ [key]: externalRoot }), /plain regular file/u);
    assert.throws(() => resolveSupply({ [key]: finalLink }), /symbolic link or junction/u);
    assert.throws(
      () => resolveSupply({ [key]: join(ancestorLink, "tsc.mjs") }),
      /alias path components/u,
    );
    assert.throws(() => resolveSupply({ [key]: candidate }), /outside the candidate source/u);

    await link(external, hardLink);
    assert.throws(() => resolveSupply({ [key]: hardLink }), /exactly one filesystem link/u);
    assert.throws(() => resolveSupply({ [key]: external }), /exactly one filesystem link/u);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("package, release gate, and packed consumer share explicit TypeScript authority", async () => {
  const manifest = JSON.parse(await readFile(join(ROOT, "package.json"), "utf8"));
  const gate = await readFile(join(ROOT, "scripts", "run-v12-release-gate.mjs"), "utf8");
  const consumer = await readFile(join(ROOT, "scripts", "check-packed-consumer.mjs"), "utf8");

  assert.equal(manifest.scripts.build, "node scripts/run-typescript.mjs -p tsconfig.json");
  assert.equal(
    manifest.scripts.typecheck,
    "node scripts/run-typescript.mjs -p tsconfig.json --noEmit",
  );
  assert.equal(manifest.files.includes("scripts/run-typescript.mjs"), true);
  assert.match(gate, /resolveTypeScriptEntrypointBinding/u);
  assert.match(consumer, /resolveTypeScriptEntrypointBinding/u);
  assert.doesNotMatch(manifest.scripts.build, /(^|\s)tsc(\s|$)/u);
  assert.doesNotMatch(manifest.scripts.typecheck, /(^|\s)tsc(\s|$)/u);
});
