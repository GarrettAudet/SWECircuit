import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  readDogfoodControlJson,
  readRepositoryContextFile,
  verifyDogfoodContext,
  writeDogfoodEvidenceFiles,
} from "../scripts/run-v11-dogfood.mjs";

function withTempDirectory(callback) {
  const root = mkdtempSync(join(tmpdir(), "swecircuit-v11-dogfood-"));
  try {
    return callback(root);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
}

test("dogfood context reads accept regular files inside the repository root", () => {
  withTempDirectory((repositoryRoot) => {
    mkdirSync(join(repositoryRoot, "context"));
    writeFileSync(join(repositoryRoot, "context", "source.txt"), "trusted context\n", "utf8");

    const result = readRepositoryContextFile(repositoryRoot, "path:context/source.txt");

    assert.equal(result.relativePath, "context/source.txt");
    assert.equal(Buffer.from(result.bytes).toString("utf8"), "trusted context\n");
  });
});

test("dogfood context reads reject an in-root junction targeting an external directory", () => {
  withTempDirectory((sandbox) => {
    const repositoryRoot = join(sandbox, "repository");
    const externalRoot = join(sandbox, "external");
    mkdirSync(join(repositoryRoot, "context"), { recursive: true });
    mkdirSync(externalRoot);
    const externalFile = join(externalRoot, "secret.txt");
    writeFileSync(externalFile, "must remain outside the context boundary\n", "utf8");
    symlinkSync(
      externalRoot,
      join(repositoryRoot, "context", "linked"),
      process.platform === "win32" ? "junction" : "dir",
    );

    assert.throws(
      () => readRepositoryContextFile(repositoryRoot, "path:context/linked/secret.txt"),
      (error) => {
        assert.match(error.message, /context read rejected/);
        assert.match(error.message, /SC1013/);
        return true;
      },
    );
    assert.equal(readFileSync(externalFile, "utf8"), "must remain outside the context boundary\n");
  });
});

test("dogfood goal and approval controls reject duplicate JSON keys", () => {
  withTempDirectory((repositoryRoot) => {
    mkdirSync(join(repositoryRoot, "controls"));
    for (const name of ["goal-contract.json", "approval.json"]) {
      const candidate = `controls/${name}`;
      writeFileSync(
        join(repositoryRoot, "controls", name),
        '{"id":"first","id":"second"}\n',
        "utf8",
      );
      assert.throws(
        () => readDogfoodControlJson(repositoryRoot, candidate, 1_024),
        /strict JSON control rejected.*SC1103/,
      );
    }
  });
});

test("dogfood approval controls reject a parent junction instead of following it", () => {
  withTempDirectory((sandbox) => {
    const repositoryRoot = join(sandbox, "repository");
    const externalRoot = join(sandbox, "external");
    mkdirSync(join(repositoryRoot, "controls"), { recursive: true });
    mkdirSync(externalRoot);
    const externalApproval = join(externalRoot, "approval.json");
    const approvalText =
      '{"compilationDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","packageDigest":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"}\n';
    writeFileSync(externalApproval, approvalText, "utf8");
    symlinkSync(
      externalRoot,
      join(repositoryRoot, "controls", "linked"),
      process.platform === "win32" ? "junction" : "dir",
    );

    assert.throws(
      () => readDogfoodControlJson(repositoryRoot, "controls/linked/approval.json", 512),
      /contained read rejected.*SC1013/,
    );
    assert.equal(readFileSync(externalApproval, "utf8"), approvalText);
  });
});

test("dogfood evidence writes reject package-parent redirection before mutation", () => {
  withTempDirectory((sandbox) => {
    const repositoryRoot = join(sandbox, "repository");
    const externalRoot = join(sandbox, "external");
    mkdirSync(join(repositoryRoot, "evidence"), { recursive: true });
    mkdirSync(externalRoot);
    const externalMarker = join(externalRoot, "owner.txt");
    writeFileSync(externalMarker, "external owner\n", "utf8");
    symlinkSync(
      externalRoot,
      join(repositoryRoot, "evidence", "package"),
      process.platform === "win32" ? "junction" : "dir",
    );

    const files = new Map([
      ["evidence/compilation.json", "{}\n"],
      ["evidence/report.json", "{}\n"],
      ["evidence/package/output.txt", "must not be written\n"],
    ]);
    assert.throws(
      () => writeDogfoodEvidenceFiles(repositoryRoot, "evidence/package", files),
      /unsafe fixed evidence path.*SC1013/,
    );

    assert.equal(readFileSync(externalMarker, "utf8"), "external owner\n");
    assert.equal(existsSync(join(externalRoot, "output.txt")), false);
    assert.equal(existsSync(join(repositoryRoot, "evidence", "compilation.json")), false);
    assert.equal(existsSync(join(repositoryRoot, "evidence", "report.json")), false);
  });
});

test("dogfood context verification rejects unsupported source kinds", () => {
  withTempDirectory((repositoryRoot) => {
    assert.throws(
      () =>
        verifyDogfoodContext(
          {
            contextSources: [
              {
                id: "context.external",
                kind: "external",
                locator: "https://example.invalid/context",
              },
            ],
          },
          repositoryRoot,
        ),
      /unsupported context source kind for context\.external: external/,
    );
  });
});
