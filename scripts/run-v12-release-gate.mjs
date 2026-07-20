import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { access, mkdir, open, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const EVIDENCE = join(
  ROOT,
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs",
);
const CANDIDATE_PATTERN = /^[0-9a-f]{40}$/;

const OUTPUTS = Object.freeze({
  stdout: join(EVIDENCE, "canonical-gate.stdout.log"),
  stderr: join(EVIDENCE, "canonical-gate.stderr.log"),
  receipt: join(EVIDENCE, "canonical-gate-receipt.json"),
});

const COMMAND =
  process.platform === "win32"
    ? Object.freeze({
        executable: "cmd.exe",
        arguments: Object.freeze(["/d", "/s", "/c", "npm.cmd run verify"]),
        canonical: "npm.cmd run verify",
      })
    : Object.freeze({
        executable: "npm",
        arguments: Object.freeze(["run", "verify"]),
        canonical: "npm run verify",
      });

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function repositoryPath(path) {
  return relative(ROOT, path).replaceAll("\\", "/");
}

function requireCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function runGit(args) {
  const result = spawnSync("git", args, {
    cwd: ROOT,
    encoding: null,
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.error) {
    throw result.error;
  }
  return result;
}

function inspectRepository() {
  const headResult = runGit(["rev-parse", "--verify", "HEAD"]);
  requireCondition(headResult.status === 0, "Unable to resolve repository HEAD.");
  const head = Buffer.from(headResult.stdout).toString("ascii").trim();
  requireCondition(CANDIDATE_PATTERN.test(head), "Repository HEAD is not a full commit ID.");

  const diffResult = runGit(["diff", "--quiet", "HEAD", "--"]);
  requireCondition(
    diffResult.status === 0 || diffResult.status === 1,
    "Unable to inspect tracked repository state.",
  );
  return {
    head,
    trackedState: diffResult.status === 0 ? "clean" : "dirty",
  };
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function fileBinding(path) {
  const bytes = await readFile(path);
  return {
    path: repositoryPath(path),
    mediaType: "application/octet-stream",
    bytes: bytes.byteLength,
    digest: digest(bytes),
  };
}

function normalizedError(error) {
  if (!error) {
    return null;
  }
  const text = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  return text.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
}

async function main() {
  const candidateCommit = process.argv[2];
  requireCondition(
    typeof candidateCommit === "string" && CANDIDATE_PATTERN.test(candidateCommit),
    "Usage: node scripts/run-v12-release-gate.mjs <exact-40-character-candidate-commit>",
  );

  const before = inspectRepository();
  requireCondition(
    before.head === candidateCommit,
    `Candidate checkpoint mismatch: HEAD is ${before.head}.`,
  );
  requireCondition(
    before.trackedState === "clean",
    "Refusing to run the candidate gate with tracked repository changes.",
  );

  await mkdir(EVIDENCE, { recursive: true });
  for (const path of Object.values(OUTPUTS)) {
    requireCondition(
      !(await pathExists(path)),
      `Immutable release-gate evidence already exists: ${repositoryPath(path)}.`,
    );
  }

  const stdoutHandle = await open(OUTPUTS.stdout, "wx");
  let stderrHandle;
  try {
    stderrHandle = await open(OUTPUTS.stderr, "wx");
  } catch (error) {
    await stdoutHandle.close();
    throw error;
  }

  let gateResult;
  try {
    gateResult = spawnSync(COMMAND.executable, [...COMMAND.arguments], {
      cwd: ROOT,
      encoding: null,
      stdio: ["ignore", stdoutHandle.fd, stderrHandle.fd],
      windowsHide: true,
    });
  } finally {
    await Promise.all([stdoutHandle.close(), stderrHandle.close()]);
  }

  let after = { head: null, trackedState: "unavailable" };
  let repositoryInspectionError = null;
  try {
    after = inspectRepository();
  } catch (error) {
    repositoryInspectionError = normalizedError(error);
  }

  const spawnError = normalizedError(gateResult.error);
  const passed =
    gateResult.status === 0 &&
    gateResult.signal === null &&
    spawnError === null &&
    repositoryInspectionError === null &&
    after.head === candidateCommit &&
    after.trackedState === "clean";

  const receipt = {
    apiVersion: "swecircuit/release-gate/v1alpha1",
    kind: "CanonicalGateReceipt",
    version: "V12",
    candidateCommit,
    repository: {
      headBefore: before.head,
      headAfter: after.head,
      trackedStateBefore: before.trackedState,
      trackedStateAfter: after.trackedState,
      inspectionError: repositoryInspectionError,
    },
    command: {
      executable: COMMAND.executable,
      arguments: [...COMMAND.arguments],
      canonical: COMMAND.canonical,
    },
    result: passed ? "pass" : "fail",
    exitCode: Number.isInteger(gateResult.status) ? gateResult.status : null,
    signal: typeof gateResult.signal === "string" ? gateResult.signal : null,
    spawnError,
    stdout: await fileBinding(OUTPUTS.stdout),
    stderr: await fileBinding(OUTPUTS.stderr),
  };

  await writeFile(OUTPUTS.receipt, `${JSON.stringify(receipt, null, 2)}\n`, {
    encoding: "utf8",
    flag: "wx",
  });
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: receipt.result,
        candidateCommit,
        command: receipt.command.canonical,
        receipt: repositoryPath(OUTPUTS.receipt),
        stdout: receipt.stdout,
        stderr: receipt.stderr,
      },
      null,
      2,
    )}\n`,
  );
  if (!passed) {
    process.exitCode = 2;
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
  process.exitCode = 1;
});
