import assert from "node:assert/strict";
import {
  copyFileSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CLI = join(ROOT, "dist", "cli.js");
const EXAMPLE = join(ROOT, "examples", "minimal");
const EXAMPLE_TRACE = join(EXAMPLE, "traces", "example.jsonl");

function execute(args) {
  return spawnSync(process.execPath, [CLI, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    windowsHide: true,
  });
}

function snapshotTree(root) {
  const entries = [];

  function visit(directory, prefix = "") {
    for (const name of readdirSync(directory).sort()) {
      const absolutePath = join(directory, name);
      const relativePath = prefix === "" ? name : `${prefix}/${name}`;
      const stats = lstatSync(absolutePath);
      if (stats.isDirectory()) {
        entries.push({ kind: "directory", path: `${relativePath}/` });
        visit(absolutePath, relativePath);
      } else if (stats.isFile()) {
        entries.push({
          bytes: readFileSync(absolutePath).toString("base64"),
          kind: "file",
          path: relativePath,
        });
      } else {
        throw new Error(`Unsupported quick-start example entry: ${relativePath}`);
      }
    }
  }

  visit(root);
  return entries;
}

test("the documented source-checkout example is repeatable and read-only", () => {
  const readme = readFileSync(join(ROOT, "README.md"), "utf8");
  for (const command of [
    "node dist/cli.js validate --project examples/minimal",
    "node dist/cli.js inspect --project examples/minimal --trace traces/example.jsonl",
  ]) {
    assert.equal(readme.includes(command), true, `README missing: ${command}`);
  }

  const before = snapshotTree(EXAMPLE);
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const validation = execute(["validate", "--project", "examples/minimal"]);
    assert.equal(validation.status, 0, validation.stderr);
    assert.equal(validation.stdout, "Validated example-project (0 artifacts).\n");
    assert.equal(validation.stderr, "");

    const inspection = execute([
      "inspect",
      "--project",
      "examples/minimal",
      "--trace",
      "traces/example.jsonl",
    ]);
    assert.equal(inspection.status, 0, inspection.stderr);
    assert.equal(inspection.stdout, "Inspected traces/example.jsonl (2 events, 1 runs).\n");
    assert.equal(inspection.stderr, "");
  }
  assert.deepEqual(snapshotTree(EXAMPLE), before);
});

test("the documented initialization grammar works in a temporary project", () => {
  const parent = mkdtempSync(join(tmpdir(), "swecircuit-quick-start-"));
  const project = join(parent, "project");
  mkdirSync(project);

  try {
    const initialized = execute(["init", "--project", project, "--project-id", "quick-start"]);
    assert.equal(initialized.status, 0, initialized.stderr);
    assert.equal(initialized.stdout, "Initialized quick-start at swecircuit.json.\n");
    assert.equal(initialized.stderr, "");

    const validation = execute(["validate", "--project", project]);
    assert.equal(validation.status, 0, validation.stderr);
    assert.equal(validation.stdout, "Validated quick-start (0 artifacts).\n");

    const traceDirectory = join(project, "traces");
    mkdirSync(traceDirectory);
    copyFileSync(EXAMPLE_TRACE, join(traceDirectory, "example.jsonl"));
    const inspection = execute([
      "inspect",
      "--project",
      project,
      "--trace",
      "traces/example.jsonl",
    ]);
    assert.equal(inspection.status, 0, inspection.stderr);
    assert.equal(inspection.stdout, "Inspected traces/example.jsonl (2 events, 1 runs).\n");

    const repeated = execute(["init", "--project", project, "--project-id", "quick-start"]);
    assert.equal(repeated.status, 4);
    assert.equal(repeated.stdout, "");
    assert.match(repeated.stderr, /^SC1021 error /);
  } finally {
    rmSync(parent, { force: true, recursive: true });
  }
});

test("the quick start remains a private source-checkout interface", () => {
  const packageJson = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
  assert.equal(packageJson.private, true);
  assert.equal(packageJson.bin, undefined);

  const readme = readFileSync(join(ROOT, "README.md"), "utf8");
  assert.doesNotMatch(readme, /\bnpx\s+swecircuit\b/i);
  assert.doesNotMatch(readme, /\bnpm\s+install(?:\s+-g)?\s+swecircuit\b/i);
});
