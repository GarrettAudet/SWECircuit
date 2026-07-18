import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative, sep } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SCRIPT = fileURLToPath(new URL("../examples/specialist-compiler/run.mjs", import.meta.url));
const APPROVAL = fileURLToPath(
  new URL("../examples/specialist-compiler/approval.json", import.meta.url),
);
const LOCAL_TEMP_ROOT = join(ROOT, ".local", "npm-cache");
const OBSERVED_FILES = [
  SCRIPT,
  APPROVAL,
  fileURLToPath(new URL("../examples/specialist-compiler/README.md", import.meta.url)),
  fileURLToPath(new URL("../src/index.ts", import.meta.url)),
  fileURLToPath(
    new URL(
      "../docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      import.meta.url,
    ),
  ),
];

function run(arguments_) {
  return spawnSync(process.execPath, [SCRIPT, ...arguments_], {
    cwd: ROOT,
    encoding: "utf8",
  });
}

function approval() {
  return JSON.parse(readFileSync(APPROVAL, "utf8"));
}

function writeApproval(directory, value, name = "approval.json") {
  const path = join(directory, name);
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  return path;
}

function repositoryPath(path) {
  return relative(ROOT, path).split(sep).join("/");
}

function assertRejected(result, message) {
  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.equal(result.stderr, `Example failed: ${message}\n`);
}

function snapshot() {
  return OBSERVED_FILES.map((path) => ({
    path,
    content: readFileSync(path),
  }));
}

function assertSnapshotEqual(before, after) {
  assert.equal(after.length, before.length);
  for (const [index, expected] of before.entries()) {
    const actual = after[index];
    assert.equal(actual.path, expected.path);
    assert.deepEqual(actual.content, expected.content, expected.path);
  }
}

test("first-run specialist example is deterministic, approval-bound, and read-only", () => {
  const before = snapshot();
  const first = run([]);
  const second = run([]);
  const after = snapshot();

  assert.equal(first.status, 0, first.stderr);
  assert.equal(first.stderr, "");
  assert.equal(second.status, 0, second.stderr);
  assert.equal(second.stderr, "");
  assert.equal(second.stdout, first.stdout);
  assert.equal(
    first.stdout,
    [
      "SWECircuit specialist compiler",
      "Context: 2/2 repository sources verified",
      "Search: exact | 2 candidate teams evaluated",
      "Baseline: 1 agent | makespan 9",
      "Selected: 2 specialists | makespan 6",
      "Decision: lower projectedMakespan (6 < 9)",
      "Package: 5 files | approval-bound verification PASS",
      "Runtime: not invoked; 0 agents executed",
      "",
    ].join("\n"),
  );
  assertSnapshotEqual(before, after);
});

test("first-run specialist example rejects a stale source approval before compilation", () => {
  const temporary = mkdtempSync(join(tmpdir(), "swecircuit-example-"));
  try {
    const staleApproval = approval();
    staleApproval.sources[0].bytes += 1;
    const stale = writeApproval(temporary, staleApproval);

    const result = run(["--approval", stale]);

    assertRejected(result, "Context source mismatch.");
  } finally {
    rmSync(temporary, { force: true, recursive: true });
  }
});

test("first-run approval parsing is bounded, strict UTF-8, and duplicate-aware", () => {
  const temporary = mkdtempSync(join(tmpdir(), "swecircuit-example-parser-"));
  try {
    const valid = readFileSync(APPROVAL, "utf8");
    const cases = [
      [
        "duplicate.json",
        valid.replace(
          '"kind": "SpecialistExampleApproval",',
          '"kind": "first",\n  "kind": "SpecialistExampleApproval",',
        ),
      ],
      ["invalid-utf8.json", Buffer.from([0xc3, 0x28])],
      ["oversized.json", Buffer.alloc(16_385, 0x20)],
    ];
    for (const [name, content] of cases) {
      const path = join(temporary, name);
      writeFileSync(path, content);
      assertRejected(run(["--approval", path]), "Approval file is not readable strict JSON.");
    }
  } finally {
    rmSync(temporary, { force: true, recursive: true });
  }
});

test("first-run approval objects reject unknown fields at every boundary", () => {
  const temporary = mkdtempSync(join(tmpdir(), "swecircuit-example-shape-"));
  try {
    const mutations = [
      (value) => {
        value.unknown = true;
      },
      (value) => {
        value.sources[0].unknown = true;
      },
      (value) => {
        value.expectation.unknown = true;
      },
    ];
    for (const [index, mutate] of mutations.entries()) {
      const value = approval();
      mutate(value);
      const path = writeApproval(temporary, value, `unknown-${index}.json`);
      assertRejected(
        run(["--approval", path]),
        "Approval file does not match the closed example contract.",
      );
    }
  } finally {
    rmSync(temporary, { force: true, recursive: true });
  }
});

test("first-run source paths reject unsafe, non-scalar, and secret-bearing forms before I/O", () => {
  const temporary = mkdtempSync(join(tmpdir(), "swecircuit-example-path-"));
  try {
    const candidates = [
      "",
      ".",
      "./src/index.ts",
      "src//index.ts",
      "../outside.txt",
      "src\\index.ts",
      "C:/outside.txt",
      "src/index.ts:stream",
      "src/index?.ts",
      `src/${String.fromCharCode(1)}index.ts`,
      `src/${String.fromCharCode(0x202e)}index.ts`,
      `src/${String.fromCharCode(0xd800)}index.ts`,
      "secrets/sk-abcdefghijklmnopqrstuvwx.txt",
    ];
    for (const [index, candidate] of candidates.entries()) {
      const value = approval();
      value.sources[0].path = candidate;
      const path = writeApproval(temporary, value, `path-${index}.json`);
      const result = run(["--approval", path, "--derive-approval"]);
      assertRejected(result, "Approval contains an unsafe repository source path.");
      if (index >= 9) {
        assert.equal(result.stderr.includes(candidate), false, `candidate ${index}`);
      }
    }
  } finally {
    rmSync(temporary, { force: true, recursive: true });
  }
});

test("first-run source reads reject directories and external junction targets", () => {
  mkdirSync(LOCAL_TEMP_ROOT, { recursive: true });
  const repositorySandbox = mkdtempSync(join(LOCAL_TEMP_ROOT, "first-run-boundary-"));
  const external = mkdtempSync(join(tmpdir(), "swecircuit-example-external-"));
  const approvals = mkdtempSync(join(tmpdir(), "swecircuit-example-boundary-"));
  try {
    const directoryApproval = approval();
    directoryApproval.sources[0].path = repositoryPath(repositorySandbox);
    assertRejected(
      run([
        "--approval",
        writeApproval(approvals, directoryApproval, "directory.json"),
        "--derive-approval",
      ]),
      "Approval source cannot be read from the repository boundary.",
    );

    const externalFile = join(external, "outside.txt");
    writeFileSync(externalFile, "outside repository boundary\n", "utf8");
    const link = join(repositorySandbox, "linked");
    symlinkSync(external, link, process.platform === "win32" ? "junction" : "dir");
    const junctionApproval = approval();
    junctionApproval.sources[0].path = repositoryPath(join(link, "outside.txt"));
    assertRejected(
      run([
        "--approval",
        writeApproval(approvals, junctionApproval, "junction.json"),
        "--derive-approval",
      ]),
      "Approval source cannot be read from the repository boundary.",
    );
    assert.equal(readFileSync(externalFile, "utf8"), "outside repository boundary\n");
  } finally {
    rmSync(repositorySandbox, { force: true, recursive: true });
    rmSync(external, { force: true, recursive: true });
    rmSync(approvals, { force: true, recursive: true });
  }
});

test("first-run rejects secret-bearing approval paths without echoing them", () => {
  const secret = "sk-abcdefghijklmnopqrstuvwx";
  const temporary = mkdtempSync(join(tmpdir(), `swecircuit-${secret}-`));
  try {
    const path = writeApproval(temporary, approval());
    const result = run(["--approval", path]);
    assertRejected(result, "Approval path is unsafe.");
    assert.equal(result.stderr.includes(secret), false);
  } finally {
    rmSync(temporary, { force: true, recursive: true });
  }
});
