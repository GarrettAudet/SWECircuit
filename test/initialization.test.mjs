import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { initializeProject, validateProject } from "../dist/index.js";
import { initializeProjectWithHooks } from "../dist/initialize.js";

const require = createRequire(import.meta.url);
const childProcess = require("node:child_process");

const CHECKPOINTS = Object.freeze([
  "beforeCatalogCreate",
  "afterCatalogCreate",
  "beforeModulesCreate",
  "afterModulesCreate",
  "beforeCircuitsCreate",
  "afterCircuitsCreate",
  "beforeManifestOpen",
  "afterManifestOpen",
  "afterManifestWrite",
  "afterManifestFsync",
  "beforeValidation",
  "afterValidation",
  "beforeManifestClose",
]);

const PRE_CAPTURE_CHECKPOINTS = Object.freeze([
  ["afterCatalogCreateBeforeCapture", "swecircuit"],
  ["afterModulesCreateBeforeCapture", "swecircuit/modules"],
  ["afterCircuitsCreateBeforeCapture", "swecircuit/circuits"],
  ["afterManifestOpenBeforeCapture", "swecircuit.json"],
]);

const diagnosticCodes = (result) => result.diagnostics.map((diagnostic) => diagnostic.code);

function withTempDirectory(callback) {
  const root = mkdtempSync(join(tmpdir(), "swecircuit-init-"));
  try {
    return callback(root);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
}

async function withTempDirectoryAsync(callback) {
  const root = mkdtempSync(join(tmpdir(), "swecircuit-init-"));
  try {
    return await callback(root);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
}

function initializedProjectId(root) {
  const result = initializeProject({ project: root });
  assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
  return result.value.projectId;
}

async function waitForPath(pathValue) {
  const deadline = Date.now() + 10_000;
  while (!existsSync(pathValue)) {
    if (Date.now() >= deadline) {
      throw new Error(`Timed out waiting for ${pathValue}`);
    }
    await delay(10);
  }
}

function runRaceWorker(root, startPath, readyPath) {
  const workerPath = fileURLToPath(
    new URL("./helpers/initialize-race-worker.mjs", import.meta.url),
  );
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn(process.execPath, [workerPath, root, startPath, readyPath], {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Initialization race worker exited ${code}: ${stderr}`));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (error) {
        reject(new Error(`Invalid race worker output: ${stdout}\n${String(error)}`));
      }
    });
  });
}

function installForbiddenIoTraps() {
  const child = require("node:child_process");
  const dns = require("node:dns");
  const http = require("node:http");
  const https = require("node:https");
  const net = require("node:net");
  const tls = require("node:tls");
  const forbidden = () => {
    throw new Error("network and subprocess APIs are forbidden");
  };
  const targets = [
    [http, "get"],
    [http, "request"],
    [https, "get"],
    [https, "request"],
    [net, "connect"],
    [net, "createConnection"],
    [tls, "connect"],
    [dns, "lookup"],
    [dns, "resolve"],
    [dns.promises, "lookup"],
    [dns.promises, "resolve"],
    [child, "spawn"],
    [child, "spawnSync"],
    [child, "exec"],
    [child, "execSync"],
    [child, "execFile"],
    [child, "execFileSync"],
    [child, "fork"],
  ];
  const originals = targets.map(([target, key]) => [target, key, target[key]]);
  const originalFetch = globalThis.fetch;
  for (const [target, key] of targets) {
    target[key] = forbidden;
  }
  globalThis.fetch = forbidden;

  return () => {
    for (const [target, key, original] of originals) {
      target[key] = original;
    }
    globalThis.fetch = originalFetch;
  };
}

test("initialization creates the smallest valid project with frozen bytes", () => {
  withTempDirectory((parent) => {
    const root = join(parent, "My New App");
    mkdirSync(root);
    writeFileSync(join(root, "README.md"), "existing repository file\n", "utf8");

    const result = initializeProject({ project: root });

    assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
    assert.equal(result.value.projectId, "my-new-app");
    assert.deepEqual(result.value.created, [
      "swecircuit.json",
      "swecircuit",
      "swecircuit/modules",
      "swecircuit/circuits",
    ]);
    const expectedManifest = [
      "{",
      '  "apiVersion": "swecircuit/v1alpha1",',
      '  "kind": "Project",',
      '  "metadata": {',
      '    "id": "my-new-app"',
      "  },",
      '  "spec": {',
      '    "artifacts": []',
      "  }",
      "}",
      "",
    ].join("\n");
    assert.deepEqual(
      readFileSync(join(root, "swecircuit.json")),
      Buffer.from(expectedManifest, "utf8"),
    );
    assert.equal(existsSync(join(root, "swecircuit", "modules")), true);
    assert.equal(existsSync(join(root, "swecircuit", "circuits")), true);
    assert.equal(existsSync(join(root, "swecircuit", "work-packets")), false);
    assert.equal(readFileSync(join(root, "README.md"), "utf8"), "existing repository file\n");
    assert.equal(validateProject({ project: root }).ok, true);
    assert.deepEqual(result.value.validation, validateProject({ project: root }).value);
  });
});

test("an explicit project ID wins and initialization never discovers an ancestor", () => {
  withTempDirectory((parent) => {
    const parentManifest = join(parent, "swecircuit.json");
    writeFileSync(parentManifest, "parent evidence\n", "utf8");
    const child = join(parent, "child");
    mkdirSync(child);

    const result = initializeProject({ project: child, projectId: "custom.project" });
    assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
    assert.equal(result.value.projectId, "custom.project");
    assert.equal(readFileSync(parentManifest, "utf8"), "parent evidence\n");
    assert.equal(existsSync(join(child, "swecircuit.json")), true);
  });
});

test("default project ID transformation is exact across edge cases", () => {
  withTempDirectory((parent) => {
    const cases = [
      ["123 Cafe App", "project-123-cafe-app"],
      ["Projet Caf\u00e9", "projet-cafe"],
      ["___My---App___", "my-app"],
      ["Project \u0141\u00f3d\u017a", "project-odz"],
      ["\u5de5\u4f5c\u6d41", "project"],
    ];
    for (const [directory, expected] of cases) {
      const root = join(parent, directory);
      mkdirSync(root);
      assert.equal(initializedProjectId(root), expected);
    }

    const longName = `a${"b".repeat(150)}`;
    const long = join(parent, longName);
    mkdirSync(long);
    const result = initializeProject({ project: long });
    assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
    assert.equal(result.value.projectId.length, 128);
    assert.match(result.value.projectId, /^[a-z][a-z0-9.-]{0,127}$/);
  });
});

test("invalid explicit IDs fail before creating owned paths", () => {
  withTempDirectory((root) => {
    const invalid = initializeProject({ project: root, projectId: "Not Valid" });
    assert.deepEqual(diagnosticCodes(invalid), ["SC1305"]);
    assert.equal(invalid.diagnostics[0].pointer, "/metadata/id");
    assert.equal(existsSync(join(root, "swecircuit.json")), false);
    assert.equal(existsSync(join(root, "swecircuit")), false);

    const wrongType = initializeProject({ project: root, projectId: 42 });
    assert.deepEqual(diagnosticCodes(wrongType), ["SC0001"]);
    assert.equal(wrongType.exitCode, 3);
  });
});

test("repeated initialization reports every owned collision without changing output", () => {
  withTempDirectory((root) => {
    const first = initializeProject({ project: root, projectId: "stable-project" });
    assert.equal(first.ok, true);
    const manifest = readFileSync(join(root, "swecircuit.json"));

    const second = initializeProject({ project: root, projectId: "different-project" });
    assert.deepEqual(diagnosticCodes(second), ["SC1021", "SC1021"]);
    assert.equal(second.exitCode, 4);
    assert.deepEqual(
      second.diagnostics.map((diagnostic) => diagnostic.artifact),
      ["swecircuit", "swecircuit.json"],
    );
    assert.deepEqual(readFileSync(join(root, "swecircuit.json")), manifest);
    assert.equal(validateProject({ project: root }).value.projectId, "stable-project");
  });
});

test("manifest collisions preserve exact bytes and do not create a catalog", () => {
  withTempDirectory((root) => {
    const manifestPath = join(root, "swecircuit.json");
    const existing = Buffer.from("existing manifest evidence\n", "utf8");
    writeFileSync(manifestPath, existing);

    const result = initializeProject({ project: root });
    assert.deepEqual(diagnosticCodes(result), ["SC1021"]);
    assert.equal(result.exitCode, 4);
    assert.equal(result.diagnostics[0].artifact, "swecircuit.json");
    assert.deepEqual(readFileSync(manifestPath), existing);
    assert.equal(existsSync(join(root, "swecircuit")), false);
  });
});

test("catalog collisions preserve existing content and do not create a manifest", () => {
  withTempDirectory((root) => {
    const catalog = join(root, "swecircuit");
    mkdirSync(catalog);
    const marker = join(catalog, "owner.txt");
    writeFileSync(marker, "do not remove\n", "utf8");

    const result = initializeProject({ project: root });
    assert.deepEqual(diagnosticCodes(result), ["SC1021"]);
    assert.equal(result.exitCode, 4);
    assert.equal(result.diagnostics[0].artifact, "swecircuit");
    assert.equal(readFileSync(marker, "utf8"), "do not remove\n");
    assert.equal(existsSync(join(root, "swecircuit.json")), false);
  });
});

test("a linked catalog is a collision and its target is never changed", () => {
  withTempDirectory((parent) => {
    const root = join(parent, "project");
    const external = join(parent, "external");
    mkdirSync(root);
    mkdirSync(external);
    const marker = join(external, "owner.txt");
    writeFileSync(marker, "external evidence\n", "utf8");
    symlinkSync(
      external,
      join(root, "swecircuit"),
      process.platform === "win32" ? "junction" : "dir",
    );

    const result = initializeProject({ project: root });
    assert.deepEqual(diagnosticCodes(result), ["SC1021"]);
    assert.equal(readFileSync(marker, "utf8"), "external evidence\n");
    assert.equal(existsSync(join(root, "swecircuit.json")), false);
  });
});

test("invalid and missing target roots fail without creating paths", () => {
  withTempDirectory((parent) => {
    const missing = join(parent, "missing");
    const missingResult = initializeProject({ project: missing });
    assert.deepEqual(diagnosticCodes(missingResult), ["SC1001"]);
    assert.equal(missingResult.exitCode, 4);
    assert.equal(existsSync(missing), false);

    const file = join(parent, "file-target");
    writeFileSync(file, "not a directory\n", "utf8");
    assert.deepEqual(diagnosticCodes(initializeProject({ project: file })), ["SC1001"]);

    assert.deepEqual(diagnosticCodes(initializeProject({ project: "file:///remote" })), ["SC1012"]);
  });
});

test("every initialization checkpoint fails closed and rolls back owned entries", async (t) => {
  for (const checkpoint of CHECKPOINTS) {
    await t.test(checkpoint, () => {
      withTempDirectory((root) => {
        const marker = join(root, "owner.txt");
        writeFileSync(marker, "repository evidence\n", "utf8");

        const result = initializeProjectWithHooks(
          { project: root, projectId: "fault-test" },
          {
            checkpoint(current) {
              if (current === checkpoint) {
                throw new Error(`injected fault at ${checkpoint}`);
              }
            },
          },
        );

        assert.deepEqual(diagnosticCodes(result), ["SC1001"]);
        assert.equal(result.exitCode, 4);
        assert.equal(readFileSync(marker, "utf8"), "repository evidence\n");
        assert.equal(existsSync(join(root, "swecircuit.json")), false);
        assert.equal(existsSync(join(root, "swecircuit")), false);
      });
    });
  }
});

test("successful creations that fail before identity capture are preserved and reported", async (t) => {
  for (const [checkpoint, artifact] of PRE_CAPTURE_CHECKPOINTS) {
    await t.test(checkpoint, () => {
      withTempDirectory((root) => {
        const result = initializeProjectWithHooks(
          { project: root, projectId: "capture-fault" },
          {
            checkpoint(current) {
              if (current === checkpoint) {
                throw new Error(`injected pre-capture fault at ${checkpoint}`);
              }
            },
          },
        );

        assert.deepEqual(new Set(diagnosticCodes(result)), new Set(["SC1001", "SC1022"]));
        assert.equal(result.exitCode, 4);
        assert.equal(existsSync(join(root, ...artifact.split("/"))), true);
      });
    });
  }
});
test("non-empty rollback targets survive with an explicit cleanup diagnostic", () => {
  withTempDirectory((root) => {
    const sentinel = join(root, "swecircuit", "modules", "foreign.txt");
    const result = initializeProjectWithHooks(
      { project: root },
      {
        checkpoint(current) {
          if (current === "afterModulesCreate") {
            writeFileSync(sentinel, "foreign content\n", "utf8");
            throw new Error("stop after foreign content appears");
          }
        },
      },
    );

    assert.deepEqual(new Set(diagnosticCodes(result)), new Set(["SC1001", "SC1022"]));
    assert.equal(result.exitCode, 4);
    assert.equal(readFileSync(sentinel, "utf8"), "foreign content\n");
    assert.equal(existsSync(join(root, "swecircuit.json")), false);
    assert.equal(existsSync(join(root, "swecircuit", "circuits")), false);
  });
});

test("identity-changed rollback targets and displaced entries are preserved", () => {
  withTempDirectory((root) => {
    const modules = join(root, "swecircuit", "modules");
    const displaced = join(root, "swecircuit", "modules-created-by-attempt");
    const sentinel = join(modules, "foreign.txt");
    const result = initializeProjectWithHooks(
      { project: root },
      {
        checkpoint(current) {
          if (current === "afterModulesCreate") {
            renameSync(modules, displaced);
            mkdirSync(modules);
            writeFileSync(sentinel, "replacement identity\n", "utf8");
            throw new Error("stop after identity replacement");
          }
        },
      },
    );

    assert.deepEqual(new Set(diagnosticCodes(result)), new Set(["SC1001", "SC1022"]));
    assert.equal(readFileSync(sentinel, "utf8"), "replacement identity\n");
    assert.equal(existsSync(displaced), true);
    assert.equal(existsSync(join(root, "swecircuit.json")), false);
  });
});

test("two coordinated processes produce exactly one initialized project", async () => {
  await withTempDirectoryAsync(async (parent) => {
    const root = join(parent, "project");
    mkdirSync(root);
    const start = join(parent, "start");
    const readyA = join(parent, "ready-a");
    const readyB = join(parent, "ready-b");
    const workerA = runRaceWorker(root, start, readyA);
    const workerB = runRaceWorker(root, start, readyB);

    await Promise.all([waitForPath(readyA), waitForPath(readyB)]);
    writeFileSync(start, "go\n", "utf8");
    const results = await Promise.all([workerA, workerB]);
    const winners = results.filter((result) => result.ok);
    const losers = results.filter((result) => !result.ok);

    assert.equal(winners.length, 1, JSON.stringify(results, null, 2));
    assert.equal(losers.length, 1, JSON.stringify(results, null, 2));
    assert.equal(losers[0].exitCode, 4);
    assert.ok(losers[0].diagnostics.length >= 1);
    assert.ok(losers[0].diagnostics.every((diagnostic) => diagnostic.code === "SC1021"));
    const validation = validateProject({ project: root });
    assert.equal(validation.ok, true, JSON.stringify(validation.diagnostics, null, 2));
    assert.equal(validation.value.projectId, "project");
  });
});

test("initialization and generated-project validation stay offline and process-free", () => {
  withTempDirectory((root) => {
    const restore = installForbiddenIoTraps();
    try {
      const initialized = initializeProject({ project: root });
      assert.equal(initialized.ok, true, JSON.stringify(initialized.diagnostics, null, 2));
      const validated = validateProject({ project: root });
      assert.equal(validated.ok, true, JSON.stringify(validated.diagnostics, null, 2));
    } finally {
      restore();
    }
  });
});

test("initializer source has no network, process, or adapter execution surface", () => {
  const source = readFileSync(new URL("../src/initialize.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /node:(?:http|https|net|tls|dns|child_process)/);
  assert.doesNotMatch(source, /\b(?:fetch|spawn|exec|adapter)\s*\(/i);
});
