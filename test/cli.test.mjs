import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { runCli } from "../dist/cli.js";
import { event, writeTrace } from "./helpers/trace-fixtures.mjs";

const CLI = fileURLToPath(new URL("../dist/cli.js", import.meta.url));

function withTempDirectory(callback) {
  const root = mkdtempSync(join(tmpdir(), "swecircuit-cli-"));
  try {
    return callback(root);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
}

function execute(args, cwd) {
  return spawnSync(process.execPath, [CLI, ...args], {
    cwd,
    encoding: "utf8",
    windowsHide: true,
  });
}

test("the internal CLI exposes one fixed help surface", () => {
  const result = execute(["--help"]);
  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  assert.equal(
    result.stdout,
    `Usage:
  node dist/cli.js init [--project PATH] [--project-id ID] [--json]
  node dist/cli.js validate [--project PATH] [--json]
  node dist/cli.js inspect --trace PATH [--project PATH] [--json]
  node dist/cli.js --help
`,
  );
});

test("init, validate, and inspect human output comes from library summaries", () => {
  withTempDirectory((root) => {
    const init = execute(["init", "--project", root]);
    assert.equal(init.status, 0, init.stderr);
    assert.match(init.stdout, /^Initialized [a-z0-9._-]+ at swecircuit\.json\.\n$/);
    assert.equal(init.stderr, "");

    const validate = execute(["validate", "--project", root]);
    assert.equal(validate.status, 0, validate.stderr);
    assert.match(validate.stdout, /^Validated [a-z0-9._-]+ \(0 artifacts\)\.\n$/);
    assert.equal(validate.stderr, "");

    const trace = writeTrace(root, [
      event({ id: "event-0", sequence: 0, type: "run.started" }),
      event({ id: "event-1", sequence: 1, type: "run.completed" }),
    ]);
    const inspect = execute(["inspect", "--project", root, "--trace", trace]);
    assert.equal(inspect.status, 0, inspect.stderr);
    assert.equal(inspect.stdout, `Inspected ${trace} (2 events, 1 runs).\n`);
    assert.equal(inspect.stderr, "");
  });
});

test("JSON mode writes exactly one operation result to stdout for success and failure", () => {
  withTempDirectory((root) => {
    const success = execute(["init", "--project", root, "--json"]);
    assert.equal(success.status, 0);
    assert.equal(success.stderr, "");
    assert.equal(success.stdout.endsWith("\n"), true);
    assert.equal(success.stdout.slice(0, -1).includes("\n"), false);
    const successResult = JSON.parse(success.stdout);
    assert.equal(successResult.ok, true);
    assert.equal(successResult.value.projectArtifact, "swecircuit.json");

    const failure = execute([
      "inspect",
      "--project",
      root,
      "--trace",
      "traces/missing.jsonl",
      "--json",
    ]);
    assert.equal(failure.status, 4);
    assert.equal(failure.stderr, "");
    const failureResult = JSON.parse(failure.stdout);
    assert.equal(failureResult.ok, false);
    assert.equal(failureResult.exitCode, 4);
    assert.deepEqual(
      failureResult.diagnostics.map(({ code }) => code),
      ["SC1001"],
    );
  });
});

test("human failures use stderr and never print a success summary", () => {
  withTempDirectory((root) => {
    const result = execute(["inspect", "--project", root, "--trace", "../escape.jsonl"]);
    assert.equal(result.status, 2);
    assert.equal(result.stdout, "");
    assert.match(result.stderr, /^SC1011 error /);
    assert.equal(result.stderr.includes(root), false);
  });
});

test("human warning results keep success on stdout and warnings on stderr", () => {
  withTempDirectory((root) => {
    const secret = `sk-${"a".repeat(24)}`;
    const trace = writeTrace(
      root,
      [
        event({
          id: "event-0",
          runId: secret,
          sequence: 0,
          type: "run.started",
        }),
      ],
      { relativePath: `traces/${secret}.jsonl` },
    );
    const result = execute(["inspect", "--project", root, "--trace", trace]);
    assert.equal(result.status, 0);
    assert.equal(result.stdout, "Inspected [suppressed] (1 events, 1 runs).\n");
    assert.match(result.stderr, /^SC4101 warning \[suppressed\]:/);
    assert.equal(`${result.stdout}${result.stderr}`.includes(secret), false);
  });
});

test("invalid commands and option shapes deterministically emit cli.usage", async (t) => {
  const cases = [
    ["missing command", []],
    ["unknown command", ["launch"]],
    ["unknown option", ["validate", "--unknown"]],
    ["duplicate option", ["validate", "--project", ".", "--project", "."]],
    ["extra positional", ["validate", "extra"]],
    ["inspect missing trace", ["inspect"]],
    ["trace on validate", ["validate", "--trace", "trace.jsonl"]],
    ["project id on validate", ["validate", "--project-id", "project"]],
    ["command help", ["validate", "--help"]],
  ];

  for (const [name, args] of cases) {
    await t.test(name, () => {
      const result = execute(args);
      assert.equal(result.status, 3);
      assert.equal(result.stdout, "");
      assert.match(result.stderr, /^SC0001 error /);
      assert.equal(result.stderr.includes("TypeError"), false);
    });
  }

  const json = execute(["validate", "--json", "--json"]);
  assert.equal(json.status, 3);
  assert.equal(json.stderr, "");
  assert.equal(JSON.parse(json.stdout).diagnostics[0].code, "SC0001");
});

test("unexpected operation throws become one sanitized internal failure", () => {
  let stdout = "";
  let stderr = "";
  const status = runCli(
    ["inspect", "--trace", "traces/run.jsonl", "--json"],
    {
      stdout(value) {
        stdout += value;
      },
      stderr(value) {
        stderr += value;
      },
    },
    {
      initializeProject() {
        throw new Error("secret stack");
      },
      validateProject() {
        throw new Error("secret stack");
      },
      inspectTrace() {
        throw new Error("secret stack");
      },
    },
  );

  assert.equal(status, 5);
  assert.equal(stderr, "");
  const result = JSON.parse(stdout);
  assert.deepEqual(
    result.diagnostics.map(({ code }) => code),
    ["SC9001"],
  );
  assert.equal(stdout.includes("secret stack"), false);
});

test("the CLI remains a renderer-only internal surface", () => {
  const source = readFileSync(new URL("../src/cli.ts", import.meta.url), "utf8");
  assert.doesNotMatch(
    source,
    /parseJsonBuffer|validateArtifactSchema|eventTypeVersion|SC30[0-9]{2}/,
  );

  const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(packageJson.bin, undefined);
  assert.equal(packageJson.private, true);
});
