import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  access,
  mkdir,
  mkdtemp,
  open,
  readFile,
  readdir,
  rm,
  rmdir,
  writeFile,
} from "node:fs/promises";
import { delimiter, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const EVIDENCE = join(ROOT, "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs");
const CANDIDATE_PATTERN = /^[0-9a-f]{40}$/;
const MATERIALIZATION_DIGEST_DOMAIN = "swecircuit/release-gate/materialization/v1alpha1";
const GIT_CONTEXT_STRATEGY = "disposable-shared-object-git-context";

const CANDIDATE_EVIDENCE_ROOT = join(EVIDENCE, "canonical-gates");
const MATERIALIZATION_PARENT = join(ROOT, ".local", "v12-release-gate");

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

function candidateEvidencePaths(candidateCommit) {
  requireCondition(
    typeof candidateCommit === "string" && CANDIDATE_PATTERN.test(candidateCommit),
    "Candidate commit must be an exact 40-character lowercase commit ID.",
  );
  const root = join(CANDIDATE_EVIDENCE_ROOT, candidateCommit);
  return Object.freeze({
    receipt: join(root, "canonical-gate-receipt.json"),
    stdout: join(root, "canonical-gate.stdout.log"),
    stderr: join(root, "canonical-gate.stderr.log"),
  });
}

function runGit(args, options = {}) {
  const result = spawnSync("git", args, {
    cwd: options.cwd ?? ROOT,
    encoding: null,
    env: options.environment ?? process.env,
    maxBuffer: 128 * 1024 * 1024,
    windowsHide: true,
  });
  if (result.error) {
    throw result.error;
  }
  return result;
}

function sanitizedGitEnvironment() {
  const environment = { ...process.env };
  const repositoryKeys = new Set([
    "GIT_ALTERNATE_OBJECT_DIRECTORIES",
    "GIT_CEILING_DIRECTORIES",
    "GIT_COMMON_DIR",
    "GIT_DIR",
    "GIT_INDEX_FILE",
    "GIT_INTERNAL_SUPER_PREFIX",
    "GIT_OBJECT_DIRECTORY",
    "GIT_OPTIONAL_LOCKS",
    "GIT_PREFIX",
    "GIT_WORK_TREE",
  ]);
  for (const key of Object.keys(environment)) {
    const upper = key.toUpperCase();
    if (repositoryKeys.has(upper) || /^GIT_CONFIG_(?:COUNT|KEY_\d+|VALUE_\d+)$/u.test(upper)) {
      delete environment[key];
    }
  }
  environment.GIT_CONFIG_NOSYSTEM = "1";
  environment.GIT_CONFIG_GLOBAL = process.platform === "win32" ? "NUL" : "/dev/null";
  environment.GIT_TERMINAL_PROMPT = "0";
  return environment;
}

function strictUtf8(bytes, label) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new Error(label + " is not strict UTF-8.");
  }
}

function nulRecords(bytes, label) {
  const input = Buffer.from(bytes);
  requireCondition(input.byteLength === 0 || input.at(-1) === 0, label + " is not NUL terminated.");
  const records = [];
  let start = 0;
  for (let index = 0; index < input.byteLength; index += 1) {
    if (input[index] === 0) {
      records.push(input.subarray(start, index));
      start = index + 1;
    }
  }
  return records;
}

function safeTreePath(pathBytes) {
  const path = strictUtf8(pathBytes, "Candidate tree path");
  requireCondition(
    path.length > 0 &&
      !isAbsolute(path) &&
      // biome-ignore lint/suspicious/noControlCharactersInRegex: Candidate paths deliberately reject unsafe controls.
      !/[\u0000-\u001f\u007f]/u.test(path) &&
      !path.includes("\\"),
    "Candidate tree contains an unsafe path: " + JSON.stringify(path) + ".",
  );
  const segments = path.split("/");
  requireCondition(
    segments.every(
      (segment) =>
        segment.length > 0 &&
        segment !== "." &&
        segment !== ".." &&
        segment.toLowerCase() !== ".git",
    ),
    "Candidate tree contains an unsafe path: " + JSON.stringify(path) + ".",
  );
  return { path, segments };
}

function candidateTree(candidateCommit) {
  const commitResult = runGit(["rev-parse", "--verify", candidateCommit + "^{commit}"]);
  requireCondition(commitResult.status === 0, "Unable to resolve candidate commit.");
  requireCondition(
    Buffer.from(commitResult.stdout).toString("ascii").trim() === candidateCommit,
    "Candidate commit did not resolve to its exact identity.",
  );

  const treeResult = runGit(["rev-parse", "--verify", candidateCommit + "^{tree}"]);
  requireCondition(treeResult.status === 0, "Unable to resolve candidate tree.");
  const tree = Buffer.from(treeResult.stdout).toString("ascii").trim();
  requireCondition(CANDIDATE_PATTERN.test(tree), "Candidate tree is not a full object ID.");

  const listingResult = runGit(["ls-tree", "-rz", "--full-tree", candidateCommit]);
  requireCondition(listingResult.status === 0, "Unable to enumerate candidate tree.");
  const entries = nulRecords(listingResult.stdout, "Candidate tree listing").map((record) => {
    const tab = record.indexOf(9);
    requireCondition(tab > 0 && tab < record.byteLength - 1, "Candidate tree entry is malformed.");
    const header = record.subarray(0, tab).toString("ascii");
    const match = /^(100644|100755) blob ([0-9a-f]{40})$/.exec(header);
    requireCondition(match !== null, "Candidate tree must contain only regular committed files.");
    const pathBytes = Buffer.from(record.subarray(tab + 1));
    return { mode: match[1], objectId: match[2], pathBytes, ...safeTreePath(pathBytes) };
  });
  entries.sort((left, right) => Buffer.compare(left.pathBytes, right.pathBytes));
  const seen = new Set();
  for (const entry of entries) {
    const key = process.platform === "win32" ? entry.path.toLowerCase() : entry.path;
    requireCondition(!seen.has(key), "Candidate tree path is not unique: " + entry.path + ".");
    seen.add(key);
  }
  requireCondition(entries.length > 0, "Candidate tree is empty.");
  return { tree, entries };
}

function readGitBlob(objectId) {
  const result = runGit(["cat-file", "blob", objectId]);
  requireCondition(result.status === 0, "Unable to read candidate blob " + objectId + ".");
  return Buffer.from(result.stdout);
}

function updateFramed(hash, bytes) {
  const value = Buffer.from(bytes);
  const size = Buffer.allocUnsafe(8);
  size.writeBigUInt64BE(BigInt(value.byteLength));
  hash.update(size);
  hash.update(value);
}

function createMaterializationDigest() {
  const hash = createHash("sha256");
  updateFramed(hash, Buffer.from(MATERIALIZATION_DIGEST_DOMAIN, "utf8"));
  return hash;
}

function updateMaterializationDigest(hash, entry, bytes) {
  updateFramed(hash, Buffer.from(entry.mode, "ascii"));
  updateFramed(hash, entry.pathBytes);
  updateFramed(hash, bytes);
}

function finishMaterializationDigest(hash) {
  return "sha256:" + hash.digest("hex");
}

function materializedPath(root, entry) {
  const path = resolve(root, ...entry.segments);
  requireCondition(
    path.startsWith(resolve(root) + sep),
    "Candidate tree path escapes materialization: " + entry.path + ".",
  );
  return path;
}

async function inspectMaterialization(root, entries) {
  const hash = createMaterializationDigest();
  let bytes = 0;
  for (const entry of entries) {
    const content = await readFile(materializedPath(root, entry));
    bytes += content.byteLength;
    updateMaterializationDigest(hash, entry, content);
  }
  return {
    files: entries.length,
    bytes,
    digest: finishMaterializationDigest(hash),
  };
}

async function inspectExactMaterialization(root, entries) {
  const expectedFiles = entries.map((entry) => entry.path);
  const expectedDirectories = new Set([""]);
  for (const entry of entries) {
    for (let length = 1; length < entry.segments.length; length += 1) {
      expectedDirectories.add(entry.segments.slice(0, length).join("/"));
    }
  }

  const actualFiles = [];
  async function visit(directory, repositoryDirectory) {
    const children = await readdir(directory, { withFileTypes: true });
    for (const child of children) {
      const repositoryPath = repositoryDirectory
        ? repositoryDirectory + "/" + child.name
        : child.name;
      const path = join(directory, child.name);
      if (child.isDirectory()) {
        requireCondition(
          expectedDirectories.has(repositoryPath),
          "Candidate materialization contains an unexpected directory: " + repositoryPath + ".",
        );
        await visit(path, repositoryPath);
      } else {
        requireCondition(
          child.isFile(),
          "Candidate materialization contains a non-regular entry: " + repositoryPath + ".",
        );
        actualFiles.push(repositoryPath);
      }
    }
  }
  await visit(root, "");
  actualFiles.sort((left, right) => Buffer.compare(Buffer.from(left), Buffer.from(right)));
  requireCondition(
    actualFiles.length === expectedFiles.length &&
      actualFiles.every((path, index) => path === expectedFiles[index]),
    "Candidate materialization contains files outside the committed Git tree.",
  );
  return inspectMaterialization(root, entries);
}

async function removeMaterialization(root) {
  requireCondition(
    dirname(root) === MATERIALIZATION_PARENT &&
      root.startsWith(MATERIALIZATION_PARENT + sep + "candidate-"),
    "Refusing to remove an unexpected materialization path.",
  );
  await rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  try {
    await rmdir(MATERIALIZATION_PARENT);
  } catch (error) {
    if (
      !error ||
      typeof error !== "object" ||
      (error.code !== "ENOENT" && error.code !== "ENOTEMPTY" && error.code !== "EEXIST")
    ) {
      throw error;
    }
  }
}

async function materializeCandidateSource(candidateCommit) {
  const { tree, entries } = candidateTree(candidateCommit);
  await mkdir(MATERIALIZATION_PARENT, { recursive: true });
  const root = await mkdtemp(join(MATERIALIZATION_PARENT, "candidate-"));
  const hash = createMaterializationDigest();
  let bytes = 0;
  try {
    for (const entry of entries) {
      const content = readGitBlob(entry.objectId);
      const target = materializedPath(root, entry);
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, content, {
        flag: "wx",
        mode: entry.mode === "100755" ? 0o755 : 0o644,
      });
      bytes += content.byteLength;
      updateMaterializationDigest(hash, entry, content);
    }
    const source = {
      commit: candidateCommit,
      tree,
      files: entries.length,
      bytes,
      digest: finishMaterializationDigest(hash),
    };
    const inspected = await inspectExactMaterialization(root, entries);
    requireCondition(
      inspected.files === source.files &&
        inspected.bytes === source.bytes &&
        inspected.digest === source.digest,
      "Candidate materialization does not match committed source bytes.",
    );
    return { root, entries, source };
  } catch (error) {
    await removeMaterialization(root);
    throw error;
  }
}

function requireGitSuccess(result, label) {
  requireCondition(
    result.status === 0 && result.signal === null,
    `${label} failed: ${
      Buffer.from(result.stderr ?? [])
        .toString("utf8")
        .trim() || "unknown Git failure"
    }`,
  );
}

function candidateGitEnvironment(root, worktree) {
  return {
    ...sanitizedGitEnvironment(),
    GIT_CEILING_DIRECTORIES: MATERIALIZATION_PARENT,
    GIT_DIR: root,
    GIT_INDEX_FILE: join(root, "candidate.index"),
    GIT_OPTIONAL_LOCKS: "0",
    GIT_WORK_TREE: worktree,
  };
}

function inspectCandidateGitContext(context) {
  const options = { cwd: context.worktree, environment: context.environment };
  const headResult = runGit(["rev-parse", "--verify", "HEAD"], options);
  requireGitSuccess(headResult, "Candidate Git HEAD inspection");
  const head = Buffer.from(headResult.stdout).toString("ascii").trim();
  requireCondition(CANDIDATE_PATTERN.test(head), "Candidate Git HEAD is not a full object ID.");

  const statusResult = runGit(["status", "--porcelain=v1", "--untracked-files=all"], options);
  requireGitSuccess(statusResult, "Candidate Git status inspection");
  return {
    head,
    trackedState: Buffer.from(statusResult.stdout).byteLength === 0 ? "clean" : "dirty",
  };
}

async function removeCandidateGitContext(root) {
  requireCondition(
    dirname(root) === MATERIALIZATION_PARENT &&
      root.startsWith(`${MATERIALIZATION_PARENT}${sep}git-`),
    "Refusing to remove an unexpected candidate Git context path.",
  );
  await rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  try {
    await rmdir(MATERIALIZATION_PARENT);
  } catch (error) {
    if (
      !error ||
      typeof error !== "object" ||
      (error.code !== "ENOENT" && error.code !== "ENOTEMPTY" && error.code !== "EEXIST")
    ) {
      throw error;
    }
  }
}

async function createCandidateGitContext(candidateCommit, worktree) {
  const sourceResult = runGit(["rev-parse", "--path-format=absolute", "--git-common-dir"]);
  requireGitSuccess(sourceResult, "Source Git common-directory inspection");
  const source = strictUtf8(sourceResult.stdout, "Source Git common directory").trim();
  requireCondition(isAbsolute(source), "Source Git common directory is not absolute.");

  await mkdir(MATERIALIZATION_PARENT, { recursive: true });
  const root = await mkdtemp(join(MATERIALIZATION_PARENT, "git-"));
  const baseEnvironment = sanitizedGitEnvironment();
  try {
    const cloneResult = runGit(["clone", "--bare", "--shared", "--quiet", "--", source, root], {
      environment: baseEnvironment,
    });
    requireGitSuccess(cloneResult, "Disposable candidate Git clone");

    const environment = candidateGitEnvironment(root, worktree);
    const setupEnvironment = { ...environment };
    delete setupEnvironment.GIT_OPTIONAL_LOCKS;
    const options = { cwd: worktree, environment: setupEnvironment };
    for (const [label, args] of [
      ["Candidate Git non-bare configuration", ["config", "core.bare", "false"]],
      ["Candidate Git reference binding", ["update-ref", "refs/heads/candidate", candidateCommit]],
      ["Candidate Git HEAD binding", ["symbolic-ref", "HEAD", "refs/heads/candidate"]],
      ["Candidate Git index binding", ["read-tree", candidateCommit]],
    ]) {
      requireGitSuccess(runGit(args, options), label);
    }

    const context = { root, worktree, environment };
    const before = inspectCandidateGitContext(context);
    requireCondition(
      before.head === candidateCommit && before.trackedState === "clean",
      "Disposable candidate Git context does not match the exact materialized candidate.",
    );
    return { ...context, before };
  } catch (error) {
    await removeCandidateGitContext(root);
    throw error;
  }
}

function commandEnvironment(gitContext) {
  const environment = { ...gitContext.environment };
  const pathKey = Object.keys(environment).find((key) => key.toLowerCase() === "path") ?? "PATH";
  environment[pathKey] =
    join(ROOT, "node_modules", ".bin") + delimiter + (environment[pathKey] ?? "");
  return environment;
}

function inspectEvidenceAttributes(path) {
  const repositoryRelativePath = repositoryPath(path);
  const result = runGit([
    "check-attr",
    "-z",
    "text",
    "diff",
    "merge",
    "--",
    repositoryRelativePath,
  ]);
  requireCondition(
    result.status === 0,
    `Unable to inspect Git attributes for required release-gate evidence: ${repositoryRelativePath}.`,
  );

  const fields = Buffer.from(result.stdout).toString("utf8").split("\0");
  requireCondition(
    fields.length === 10 && fields.at(-1) === "",
    `Git returned malformed attributes for required release-gate evidence: ${repositoryRelativePath}.`,
  );
  const attributes = {};
  for (let index = 0; index < fields.length - 1; index += 3) {
    requireCondition(
      fields[index] === repositoryRelativePath &&
        ["text", "diff", "merge"].includes(fields[index + 1]) &&
        attributes[fields[index + 1]] === undefined,
      `Git returned unexpected attributes for required release-gate evidence: ${repositoryRelativePath}.`,
    );
    attributes[fields[index + 1]] = fields[index + 2];
  }
  return attributes;
}

function requireBytePreservingEvidencePaths(paths) {
  for (const path of [paths.stdout, paths.stderr]) {
    const repositoryRelativePath = repositoryPath(path);
    const attributes = inspectEvidenceAttributes(path);
    requireCondition(
      attributes.text === "unset" && attributes.diff === "unset" && attributes.merge === "unset",
      `Required release-gate raw evidence is not binary in Git: ${repositoryRelativePath}.`,
    );
  }

  const receiptPath = repositoryPath(paths.receipt);
  const receiptAttributes = inspectEvidenceAttributes(paths.receipt);
  requireCondition(
    receiptAttributes.text === "auto" &&
      receiptAttributes.diff === "unspecified" &&
      receiptAttributes.merge === "unspecified",
    `Required release-gate receipt does not retain normal text policy in Git: ${receiptPath}.`,
  );
}

function requireVersionableEvidencePaths(paths) {
  for (const path of Object.values(paths)) {
    const repositoryRelativePath = repositoryPath(path);
    const result = runGit(["check-ignore", "--quiet", "--no-index", "--", repositoryRelativePath]);
    requireCondition(
      result.status === 0 || result.status === 1,
      `Unable to inspect Git ignore policy for required release-gate evidence: ${repositoryRelativePath}.`,
    );
    requireCondition(
      result.status === 1,
      `Required release-gate evidence is ignored by Git: ${repositoryRelativePath}.`,
    );
  }
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
  const pathOnly = process.argv[2] === "paths";
  const candidateCommit = pathOnly ? process.argv[3] : process.argv[2];
  requireCondition(
    typeof candidateCommit === "string" && CANDIDATE_PATTERN.test(candidateCommit),
    "Usage: node scripts/run-v12-release-gate.mjs [paths] <exact-40-character-candidate-commit>",
  );
  const outputs = candidateEvidencePaths(candidateCommit);
  requireVersionableEvidencePaths(outputs);
  requireBytePreservingEvidencePaths(outputs);

  if (pathOnly) {
    process.stdout.write(
      `${JSON.stringify(
        {
          candidateCommit,
          receipt: repositoryPath(outputs.receipt),
          stdout: repositoryPath(outputs.stdout),
          stderr: repositoryPath(outputs.stderr),
        },
        null,
        2,
      )}\n`,
    );
    return;
  }

  const before = inspectRepository();
  requireCondition(
    before.head === candidateCommit,
    `Candidate checkpoint mismatch: HEAD is ${before.head}.`,
  );
  requireCondition(
    before.trackedState === "clean",
    "Refusing to run the candidate gate with tracked repository changes.",
  );

  await mkdir(dirname(outputs.receipt), { recursive: true });
  for (const path of Object.values(outputs)) {
    requireCondition(
      !(await pathExists(path)),
      `Immutable release-gate evidence already exists: ${repositoryPath(path)}.`,
    );
  }

  const materialization = await materializeCandidateSource(candidateCommit);
  let gitContext;
  try {
    gitContext = await createCandidateGitContext(candidateCommit, materialization.root);
  } catch (error) {
    await removeMaterialization(materialization.root);
    throw error;
  }
  let gateResult;
  let materializationDigestAfter = null;
  let materializationInspectionError = null;
  let materializationCleanupError = null;
  let gitContextAfter = { head: null, trackedState: "unavailable" };
  let gitContextInspectionError = null;
  let gitContextCleanupError = null;
  try {
    const stdoutHandle = await open(outputs.stdout, "wx");
    let stderrHandle;
    try {
      stderrHandle = await open(outputs.stderr, "wx");
    } catch (error) {
      await stdoutHandle.close();
      throw error;
    }

    try {
      gateResult = spawnSync(COMMAND.executable, [...COMMAND.arguments], {
        cwd: materialization.root,
        encoding: null,
        env: commandEnvironment(gitContext),
        stdio: ["ignore", stdoutHandle.fd, stderrHandle.fd],
        windowsHide: true,
      });
    } finally {
      await Promise.all([stdoutHandle.close(), stderrHandle.close()]);
    }

    try {
      materializationDigestAfter = (
        await inspectExactMaterialization(materialization.root, materialization.entries)
      ).digest;
    } catch (error) {
      materializationInspectionError = normalizedError(error);
    }
    try {
      gitContextAfter = inspectCandidateGitContext(gitContext);
    } catch (error) {
      gitContextInspectionError = normalizedError(error);
    }
  } finally {
    try {
      await removeCandidateGitContext(gitContext.root);
    } catch (error) {
      gitContextCleanupError = normalizedError(error);
    }
    try {
      await removeMaterialization(materialization.root);
    } catch (error) {
      materializationCleanupError = normalizedError(error);
    }
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
    after.trackedState === "clean" &&
    materializationDigestAfter === materialization.source.digest &&
    materializationInspectionError === null &&
    materializationCleanupError === null &&
    gitContext.before.head === candidateCommit &&
    gitContext.before.trackedState === "clean" &&
    gitContextAfter.head === candidateCommit &&
    gitContextAfter.trackedState === "clean" &&
    gitContextInspectionError === null &&
    gitContextCleanupError === null;

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
    candidateSource: materialization.source,
    materialization: {
      strategy: "exact-git-blob-materialization",
      files: materialization.source.files,
      bytes: materialization.source.bytes,
      digestBefore: materialization.source.digest,
      digestAfter: materializationDigestAfter,
      inspectionError: materializationInspectionError,
      cleanupError: materializationCleanupError,
    },
    gitContext: {
      strategy: GIT_CONTEXT_STRATEGY,
      headBefore: gitContext.before.head,
      headAfter: gitContextAfter.head,
      trackedStateBefore: gitContext.before.trackedState,
      trackedStateAfter: gitContextAfter.trackedState,
      inspectionError: gitContextInspectionError,
      cleanupError: gitContextCleanupError,
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
    stdout: await fileBinding(outputs.stdout),
    stderr: await fileBinding(outputs.stderr),
  };

  await writeFile(outputs.receipt, `${JSON.stringify(receipt, null, 2)}\n`, {
    encoding: "utf8",
    flag: "wx",
  });
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: receipt.result,
        candidateCommit,
        command: receipt.command.canonical,
        receipt: repositoryPath(outputs.receipt),
        candidateSource: receipt.candidateSource,
        materialization: receipt.materialization,
        gitContext: receipt.gitContext,
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

export const RELEASE_GATE_TEST_HOOKS = Object.freeze({
  commandEnvironment,
  createCandidateGitContext,
  inspectCandidateGitContext,
  inspectExactMaterialization,
  inspectMaterialization,
  materializeCandidateSource,
  removeCandidateGitContext,
  removeMaterialization,
});

if (
  typeof process.argv[1] === "string" &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
    process.exitCode = 1;
  });
}
