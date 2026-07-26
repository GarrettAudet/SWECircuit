import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, realpathSync } from "node:fs";
import {
  access,
  link,
  lstat,
  mkdir,
  mkdtemp,
  open,
  readdir,
  readFile,
  readlink,
  realpath,
  rm,
  rmdir,
  writeFile,
} from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { delimiter, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY } from "./run-typescript.mjs";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const EVIDENCE = join(ROOT, "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs");
const CANDIDATE_PATTERN = /^[0-9a-f]{40}$/;
const MATERIALIZATION_DIGEST_DOMAIN = "swecircuit/release-gate/materialization/v1alpha1";
const CANDIDATE_LOCK_DIGEST_DOMAIN = "swecircuit/release-gate/candidate-lock/v1alpha1";
const CANDIDATE_DEPENDENCY_DIGEST_DOMAIN =
  "swecircuit/release-gate/candidate-dependencies/v1alpha1";
const GIT_CONTEXT_STRATEGY = "disposable-shared-object-git-context";

const CANDIDATE_EVIDENCE_ROOT = join(EVIDENCE, "canonical-gates");
// Exact release verification nests this layout, so keep private Windows paths bounded.
const SCRATCH_LAYOUT = Object.freeze({
  namespace: "swg",
  parent: "w",
  runtime: "r",
  temp: "t",
});
const MATERIALIZATION_BASE = join(realpathSync.native(tmpdir()), SCRATCH_LAYOUT.namespace);
const MATERIALIZATION_PARENT = join(MATERIALIZATION_BASE, SCRATCH_LAYOUT.parent);
const MATERIALIZATION_FROM_ROOT = relative(resolve(ROOT), resolve(MATERIALIZATION_PARENT));
requireCondition(
  isAbsolute(MATERIALIZATION_FROM_ROOT) ||
    MATERIALIZATION_FROM_ROOT === ".." ||
    MATERIALIZATION_FROM_ROOT.startsWith(`..${sep}`),
  "Release-gate scratch root must remain outside the source repository.",
);
const GENERATED_BUILD_DIRECTORY = "dist";
const CANDIDATE_DEPENDENCY_DIRECTORY = "node_modules";
const DEFAULT_HOST_NPM_CACHE = join(ROOT, ".local", "npm-cache");

function optionalEnvironmentValue(name, environment = process.env) {
  const matches = Object.entries(environment).filter(
    ([key]) => key.toLowerCase() === name.toLowerCase(),
  );
  requireCondition(
    matches.every(([, value]) => typeof value === "string") &&
      new Set(matches.map(([, value]) => value)).size <= 1,
    `${name} has ambiguous case-insensitive values.`,
  );
  return matches.length > 0 ? matches[0][1] : null;
}

function plainResolvedFile(path, label) {
  requireCondition(typeof path === "string" && path.length > 0, `${label} path is missing.`);
  const resolved = realpathSync.native(path);
  const stats = lstatSync(resolved);
  requireCondition(
    stats.isFile() && !stats.isSymbolicLink(),
    `${label} must resolve to a plain regular file.`,
  );
  return resolved;
}

function resolveHostExecutable(names, label) {
  const pathValue = optionalEnvironmentValue("PATH");
  requireCondition(pathValue !== null, `${label} cannot be resolved without PATH.`);
  for (const rawDirectory of pathValue.split(delimiter)) {
    const directory = rawDirectory.trim().replace(/^"(.*)"$/u, "$1");
    if (directory.length === 0) {
      continue;
    }
    for (const name of names) {
      const candidate = resolve(directory, name);
      if (existsSync(candidate)) {
        return plainResolvedFile(candidate, label);
      }
    }
  }
  throw new Error(`${label} was not found on PATH.`);
}

function resolveHostCommandSupply(names, label) {
  const pathValue = optionalEnvironmentValue("PATH");
  requireCondition(pathValue !== null, `${label} cannot be resolved without PATH.`);
  for (const rawDirectory of pathValue.split(delimiter)) {
    const directory = rawDirectory.trim().replace(/^"(.*)"$/u, "$1");
    if (directory.length === 0) {
      continue;
    }
    for (const name of names) {
      const commandPath = resolve(directory, name);
      if (existsSync(commandPath)) {
        return Object.freeze({
          commandPath,
          targetPath: plainResolvedFile(commandPath, label),
        });
      }
    }
  }
  throw new Error(`${label} was not found on PATH.`);
}

const HOST_NODE_PATH = plainResolvedFile(process.execPath, "Host Node executable");
const HOST_GIT_PATH = resolveHostExecutable(
  process.platform === "win32" ? ["git.exe"] : ["git"],
  "Host Git executable",
);
const HOST_NPM_SUPPLY = resolveHostCommandSupply(
  process.platform === "win32" ? ["npm.cmd"] : ["npm"],
  "Host npm executable",
);
const HOST_NPM_COMMAND_PATH = HOST_NPM_SUPPLY.commandPath;
const HOST_NPM_PATH = HOST_NPM_SUPPLY.targetPath;
const HOST_NPM_CLI_PATH =
  process.platform === "win32"
    ? plainResolvedFile(
        join(dirname(HOST_NPM_COMMAND_PATH), "node_modules", "npm", "bin", "npm-cli.js"),
        "Host npm CLI",
      )
    : HOST_NPM_PATH;
const HOST_SHELL_PATH =
  process.platform === "win32"
    ? plainResolvedFile(
        optionalEnvironmentValue("COMSPEC") ??
          join(optionalEnvironmentValue("SYSTEMROOT") ?? "C:\\Windows", "System32", "cmd.exe"),
        "Host command shell",
      )
    : plainResolvedFile("/bin/sh", "Host command shell");

const CANDIDATE_DEPENDENCY_INSTALL_ARGUMENTS = Object.freeze([
  "ci",
  "--offline",
  "--ignore-scripts",
  "--no-audit",
  "--no-fund",
  "--cache",
]);
const CANDIDATE_DEPENDENCY_INSTALL_COMMAND =
  "npm ci --offline --ignore-scripts --no-audit --no-fund";

const COMMAND = Object.freeze({
  executable: HOST_NODE_PATH,
  arguments: Object.freeze([HOST_NPM_CLI_PATH, "run", "verify"]),
  canonical: "node npm-cli.js run verify",
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

function resolveHostNpmCache(environment) {
  const supplies = Object.entries(environment)
    .filter(([key]) => key.toLowerCase() === "npm_config_cache")
    .map(([, value]) => value);
  if (supplies.length === 0) {
    return DEFAULT_HOST_NPM_CACHE;
  }
  requireCondition(
    supplies.every((value) => typeof value === "string" && value.length > 0),
    "Host npm cache supply must be non-empty.",
  );
  const resolved = new Set(supplies.map((value) => resolve(ROOT, value)));
  requireCondition(resolved.size === 1, "Host npm cache supplies must resolve identically.");
  return [...resolved][0];
}

const HOST_NPM_CACHE = resolveHostNpmCache(process.env);

function candidateDependencyInstallCommand() {
  const arguments_ = [...CANDIDATE_DEPENDENCY_INSTALL_ARGUMENTS, HOST_NPM_CACHE];
  return {
    executable: HOST_NODE_PATH,
    arguments: [HOST_NPM_CLI_PATH, ...arguments_],
    canonical: CANDIDATE_DEPENDENCY_INSTALL_COMMAND,
  };
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

function candidateEvidenceRoot(outputs) {
  const root = dirname(outputs.receipt);
  requireCondition(
    dirname(root) === CANDIDATE_EVIDENCE_ROOT,
    "Candidate evidence root escapes the canonical evidence directory.",
  );
  return root;
}

async function removeCandidateEvidenceSlot(outputs) {
  const root = candidateEvidenceRoot(outputs);
  await rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
}

async function reserveCandidateEvidenceSlot(outputs) {
  const root = candidateEvidenceRoot(outputs);
  await mkdir(CANDIDATE_EVIDENCE_ROOT, { recursive: true });
  try {
    await mkdir(root);
  } catch (error) {
    if (error && typeof error === "object" && error.code === "EEXIST") {
      throw new Error(
        `Immutable release-gate evidence slot already exists: ${repositoryPath(root)}.`,
      );
    }
    throw error;
  }
  try {
    await writeFile(outputs.stdout, Buffer.alloc(0), { flag: "wx" });
    await writeFile(outputs.stderr, Buffer.alloc(0), { flag: "wx" });
  } catch (error) {
    await removeCandidateEvidenceSlot(outputs);
    throw error;
  }
  return root;
}

function candidateReceiptPendingPath(outputs) {
  return join(candidateEvidenceRoot(outputs), ".canonical-gate-receipt.pending");
}

async function publishCandidateReceipt(outputs, bytes) {
  requireCondition(Buffer.isBuffer(bytes), "Candidate receipt publication requires exact bytes.");
  const pending = candidateReceiptPendingPath(outputs);
  let handle;
  try {
    handle = await open(pending, "wx");
    await handle.writeFile(bytes);
    await handle.sync();
    await handle.close();
    handle = undefined;
    await link(pending, outputs.receipt);
  } finally {
    if (handle !== undefined) {
      await handle.close();
    }
    await rm(pending, { force: true });
  }
}

function runGit(args, options = {}) {
  const result = spawnSync(HOST_GIT_PATH, args, {
    cwd: options.cwd ?? ROOT,
    encoding: null,
    env: options.environment ?? sanitizedGitEnvironment(),
    input: options.input,
    maxBuffer: 128 * 1024 * 1024,
    windowsHide: true,
  });
  if (result.error) {
    throw result.error;
  }
  return result;
}

function closedPath(candidateRoot = null) {
  return [
    candidateRoot === null ? null : join(candidateRoot, CANDIDATE_DEPENDENCY_DIRECTORY, ".bin"),
    dirname(HOST_NPM_COMMAND_PATH),
    dirname(HOST_NODE_PATH),
    dirname(HOST_GIT_PATH),
    dirname(HOST_SHELL_PATH),
  ]
    .filter((value) => value !== null)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(delimiter);
}

function closedBaseEnvironment() {
  const environment = {
    HOME: MATERIALIZATION_PARENT,
    LANG: "C",
    LC_ALL: "C",
    NO_COLOR: "1",
    PATH: closedPath(),
    TEMP: MATERIALIZATION_PARENT,
    TMP: MATERIALIZATION_PARENT,
    TMPDIR: MATERIALIZATION_PARENT,
  };
  if (process.platform === "win32") {
    environment.APPDATA = MATERIALIZATION_PARENT;
    environment.COMSPEC = HOST_SHELL_PATH;
    environment.LOCALAPPDATA = MATERIALIZATION_PARENT;
    environment.PATHEXT = ".COM;.EXE;.BAT;.CMD";
    environment.SYSTEMROOT = optionalEnvironmentValue("SYSTEMROOT") ?? "C:\\Windows";
    environment.USERPROFILE = MATERIALIZATION_PARENT;
    environment.WINDIR = optionalEnvironmentValue("WINDIR") ?? environment.SYSTEMROOT;
  }
  return environment;
}

function sanitizedGitEnvironment() {
  const environment = closedBaseEnvironment();
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

function candidateTree(candidateCommit, gitRunner = runGit) {
  const commitResult = gitRunner(["rev-parse", "--verify", candidateCommit + "^{commit}"]);
  requireCondition(commitResult.status === 0, "Unable to resolve candidate commit.");
  requireCondition(
    Buffer.from(commitResult.stdout).toString("ascii").trim() === candidateCommit,
    "Candidate commit did not resolve to its exact identity.",
  );

  const treeResult = gitRunner(["rev-parse", "--verify", candidateCommit + "^{tree}"]);
  requireCondition(treeResult.status === 0, "Unable to resolve candidate tree.");
  const tree = Buffer.from(treeResult.stdout).toString("ascii").trim();
  requireCondition(CANDIDATE_PATTERN.test(tree), "Candidate tree is not a full object ID.");

  const listingResult = gitRunner(["ls-tree", "-rz", "--full-tree", candidateCommit]);
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

function parseGitBlobBatch(objectIds, output) {
  requireCondition(Array.isArray(objectIds) && objectIds.length > 0, "Git blob batch is empty.");
  requireCondition(Buffer.isBuffer(output), "Git blob batch output must be raw bytes.");
  const requested = new Set();
  const blobs = new Map();
  let cursor = 0;

  for (const expectedObjectId of objectIds) {
    requireCondition(
      typeof expectedObjectId === "string" && CANDIDATE_PATTERN.test(expectedObjectId),
      "Git blob batch contains an invalid requested object ID.",
    );
    requireCondition(
      !requested.has(expectedObjectId),
      "Git blob batch contains a duplicate request.",
    );
    requested.add(expectedObjectId);

    const headerEnd = output.indexOf(10, cursor);
    requireCondition(headerEnd >= cursor, "Git blob batch output is missing a header terminator.");
    const headerBytes = output.subarray(cursor, headerEnd);
    requireCondition(
      headerBytes.every((byte) => byte <= 0x7f),
      "Git blob batch output contains a non-ASCII header.",
    );
    const match = /^([0-9a-f]{40}) blob (0|[1-9][0-9]*)$/.exec(headerBytes.toString("ascii"));
    requireCondition(match !== null, "Git blob batch output contains a malformed header.");
    requireCondition(
      match[1] === expectedObjectId,
      "Git blob batch returned an unexpected object.",
    );
    const size = Number(match[2]);
    requireCondition(Number.isSafeInteger(size), "Git blob batch returned an unsafe object size.");
    const contentStart = headerEnd + 1;
    const contentEnd = contentStart + size;
    requireCondition(
      contentEnd < output.byteLength,
      "Git blob batch output is truncated before the object delimiter.",
    );
    requireCondition(
      output[contentEnd] === 10,
      "Git blob batch output has an invalid object delimiter.",
    );
    blobs.set(expectedObjectId, Buffer.from(output.subarray(contentStart, contentEnd)));
    cursor = contentEnd + 1;
  }

  requireCondition(cursor === output.byteLength, "Git blob batch output contains trailing bytes.");
  return blobs;
}

function candidateBlobBytes(objectIds, gitRunner = runGit) {
  const uniqueObjectIds = [...new Set(objectIds)].sort();
  requireCondition(uniqueObjectIds.length > 0, "Candidate tree has no blobs.");
  const result = gitRunner(["cat-file", "--batch"], {
    input: Buffer.from(uniqueObjectIds.join("\n") + "\n", "ascii"),
  });
  requireCondition(result.status === 0, "Unable to read candidate blob batch.");
  return parseGitBlobBatch(uniqueObjectIds, Buffer.from(result.stdout));
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

function isContainedPath(root, path) {
  const fromRoot = relative(resolve(root), resolve(path));
  return (
    fromRoot === "" ||
    (!isAbsolute(fromRoot) && fromRoot !== ".." && !fromRoot.startsWith(`..${sep}`))
  );
}

function detectRuntimeLibc(platform = process.platform, report = null) {
  if (platform !== "linux") {
    return null;
  }
  const runtimeReport = report ?? process.report?.getReport?.();
  const glibcVersion = runtimeReport?.header?.glibcVersionRuntime;
  if (typeof glibcVersion === "string" && glibcVersion.length > 0) {
    return "glibc";
  }
  if (
    Array.isArray(runtimeReport?.sharedObjects) &&
    runtimeReport.sharedObjects.some((path) => /(?:^|[/\\])(?:ld-)?musl|libc\.musl/iu.test(path))
  ) {
    return "musl";
  }
  throw new Error("Unable to determine the Linux runtime libc.");
}

function runtimeIdentity(platform = process.platform, architecture = process.arch, report = null) {
  return Object.freeze({
    platform,
    architecture,
    libc: detectRuntimeLibc(platform, report),
  });
}

function packageApplies(
  entry,
  platform = process.platform,
  architecture = process.arch,
  libc = detectRuntimeLibc(platform),
) {
  const matches = (rules, value) => {
    if (!Array.isArray(rules) || rules.length === 0) {
      return true;
    }
    const denied = rules.filter((item) => item.startsWith("!")).map((item) => item.slice(1));
    if (denied.includes(value)) {
      return false;
    }
    const allowed = rules.filter((item) => !item.startsWith("!"));
    return allowed.length === 0 || allowed.includes(value);
  };
  return (
    matches(entry.os, platform) && matches(entry.cpu, architecture) && matches(entry.libc, libc)
  );
}

function runtimeAncestorSupplyPaths(root) {
  const paths = [];
  let current = dirname(resolve(root));
  for (;;) {
    paths.push(join(current, CANDIDATE_DEPENDENCY_DIRECTORY));
    const parent = dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }
  return paths;
}

async function inspectRuntimeAncestorSupply(root) {
  const candidateRoot = await realpath(root);
  const checkedPaths = runtimeAncestorSupplyPaths(candidateRoot);
  for (const path of checkedPaths) {
    try {
      const stats = await lstat(path);
      return {
        checkedPaths,
        absent: false,
        found: {
          path,
          kind: stats.isDirectory()
            ? "directory"
            : stats.isSymbolicLink()
              ? "symbolic-link"
              : "entry",
        },
      };
    } catch (error) {
      if (!error || typeof error !== "object" || error.code !== "ENOENT") {
        throw error;
      }
    }
  }
  return { checkedPaths, absent: true, found: null };
}

function candidateDependencyRoot(root, entries) {
  requireCondition(
    !entries.some(
      (entry) =>
        entry.path === CANDIDATE_DEPENDENCY_DIRECTORY ||
        entry.path.startsWith(`${CANDIDATE_DEPENDENCY_DIRECTORY}/`),
    ),
    `Candidate source unexpectedly owns ${CANDIDATE_DEPENDENCY_DIRECTORY}.`,
  );
  const dependencyRoot = resolve(root, CANDIDATE_DEPENDENCY_DIRECTORY);
  requireCondition(
    dirname(dependencyRoot) === resolve(root),
    "Candidate dependency root escapes the materialization.",
  );
  return dependencyRoot;
}

function candidateFileBinding(path, bytes) {
  return {
    path,
    bytes: bytes.byteLength,
    digest: digest(bytes),
  };
}

function inlineBytesBinding(bytes) {
  const value = Buffer.from(bytes);
  return {
    mediaType: "application/octet-stream",
    encoding: "base64",
    bytes: value.byteLength,
    digest: digest(value),
    data: value.toString("base64"),
  };
}

function validateCandidateLockSupply(lockBytes, runtime = runtimeIdentity()) {
  const lock = JSON.parse(strictUtf8(lockBytes, "package-lock.json"));
  requireCondition(
    Number.isInteger(lock.lockfileVersion) && lock.lockfileVersion >= 2 && lock.packages,
    "Exact candidate lockfile lacks a supported packages inventory.",
  );
  const { platform, architecture, libc } = runtime;
  const packages = [];
  for (const [path, entry] of Object.entries(lock.packages)) {
    if (path === "") {
      continue;
    }
    requireCondition(
      path.startsWith(`${CANDIDATE_DEPENDENCY_DIRECTORY}/`),
      `Locked package path is not registry-owned: ${path}.`,
    );
    safeTreePath(Buffer.from(path, "utf8"));
    requireCondition(
      entry && typeof entry === "object" && entry.link !== true,
      `Locked package is linked: ${path}.`,
    );
    requireCondition(
      typeof entry.resolved === "string",
      `Locked package lacks registry URL: ${path}.`,
    );
    const resolvedUrl = new URL(entry.resolved);
    requireCondition(
      resolvedUrl.protocol === "https:" &&
        resolvedUrl.hostname === "registry.npmjs.org" &&
        resolvedUrl.pathname.endsWith(".tgz"),
      `Locked package uses non-registry supply: ${path}.`,
    );
    requireCondition(
      typeof entry.integrity === "string" &&
        /^sha(?:256|384|512)-[A-Za-z0-9+/]+={0,2}$/u.test(entry.integrity),
      `Locked package lacks valid SRI: ${path}.`,
    );
    requireCondition(
      typeof entry.version === "string" && entry.version.length > 0,
      `Locked package lacks version: ${path}.`,
    );
    packages.push({
      path,
      version: entry.version,
      resolved: entry.resolved,
      integrity: entry.integrity,
      optional: entry.optional === true,
      applies: packageApplies(entry, platform, architecture, libc),
    });
  }
  packages.sort((left, right) =>
    Buffer.compare(Buffer.from(left.path, "utf8"), Buffer.from(right.path, "utf8")),
  );
  requireCondition(packages.length > 0, "Exact candidate lockfile has no package supply.");
  const hash = createHash("sha256");
  updateFramed(hash, Buffer.from(CANDIDATE_LOCK_DIGEST_DOMAIN, "utf8"));
  for (const entry of packages) {
    updateFramed(hash, Buffer.from(JSON.stringify(entry), "utf8"));
  }
  return {
    receipt: {
      path: "package-lock.json",
      bytes: lockBytes.byteLength,
      digest: digest(lockBytes),
      lockfileVersion: lock.lockfileVersion,
      packages: packages.length,
      platform,
      architecture,
      libc,
      inventoryDigest: `sha256:${hash.digest("hex")}`,
    },
    entries: packages,
  };
}

async function inspectCandidateDependencyClosure(root) {
  const rootReal = await realpath(root);
  const rootStats = await lstat(rootReal);
  requireCondition(
    rootStats.isDirectory() && !rootStats.isSymbolicLink(),
    "Candidate dependency root must be a plain directory.",
  );

  const records = [];
  let files = 0;
  let directories = 0;
  let links = 0;
  let bytes = 0;
  async function visit(directory, logicalDirectory) {
    const children = await readdir(directory, { withFileTypes: true });
    children.sort((left, right) =>
      Buffer.compare(Buffer.from(left.name, "utf8"), Buffer.from(right.name, "utf8")),
    );
    for (const child of children) {
      const logicalPath = logicalDirectory ? `${logicalDirectory}/${child.name}` : child.name;
      const path = join(directory, child.name);
      const stats = await lstat(path);
      if (stats.isSymbolicLink()) {
        const targetReal = await realpath(path);
        requireCondition(
          isContainedPath(rootReal, targetReal),
          `Candidate dependency link escapes its root: ${logicalPath}.`,
        );
        records.push({
          kind: "link",
          path: logicalPath,
          target: (await readlink(path)).replaceAll("\\", "/"),
        });
        links += 1;
      } else if (stats.isDirectory()) {
        const directoryReal = await realpath(path);
        requireCondition(
          isContainedPath(rootReal, directoryReal),
          `Candidate dependency directory escapes its root: ${logicalPath}.`,
        );
        records.push({ kind: "directory", path: logicalPath });
        directories += 1;
        await visit(path, logicalPath);
      } else {
        requireCondition(
          stats.isFile() && stats.nlink === 1,
          `Candidate dependency closure contains a non-regular or hard-linked file: ${logicalPath}.`,
        );
        const fileReal = await realpath(path);
        requireCondition(
          isContainedPath(rootReal, fileReal),
          `Candidate dependency file escapes its root: ${logicalPath}.`,
        );
        const content = await readFile(path);
        records.push({
          kind: "file",
          path: logicalPath,
          bytes: content.byteLength,
          digest: digest(content),
        });
        files += 1;
        bytes += content.byteLength;
      }
    }
  }
  await visit(rootReal, "");
  const hash = createHash("sha256");
  updateFramed(hash, Buffer.from(CANDIDATE_DEPENDENCY_DIGEST_DOMAIN, "utf8"));
  for (const record of records) {
    updateFramed(hash, Buffer.from(JSON.stringify(record), "utf8"));
  }
  return {
    files,
    directories,
    links,
    bytes,
    digest: `sha256:${hash.digest("hex")}`,
  };
}

async function validateInstalledCandidateDependencies(root, lockSupply, packageBytes) {
  const packageJson = JSON.parse(strictUtf8(packageBytes, "package.json"));
  for (const entry of lockSupply.entries) {
    const packageRoot = resolve(root, ...entry.path.split("/"));
    if (!entry.optional || entry.applies) {
      const manifest = JSON.parse(await readFile(join(packageRoot, "package.json"), "utf8"));
      requireCondition(
        manifest.version === entry.version,
        `Installed candidate package version mismatch: ${entry.path}.`,
      );
    }
  }
  const dependencyRoot = join(root, CANDIDATE_DEPENDENCY_DIRECTORY);
  const privateRequire = createRequire(join(root, "package.json"));
  const directDependencies = [];
  for (const dependency of Object.keys(packageJson.dependencies ?? {}).sort()) {
    const resolvedDependency = await realpath(privateRequire.resolve(dependency));
    requireCondition(
      isContainedPath(dependencyRoot, resolvedDependency),
      `Bare dependency resolved outside candidate-private node_modules: ${dependency}.`,
    );
    directDependencies.push({
      name: dependency,
      path: relative(dependencyRoot, resolvedDependency).replaceAll("\\", "/"),
    });
  }
  const expectedTypeScript = await realpath(join(dependencyRoot, "typescript", "bin", "tsc"));
  requireCondition(
    isContainedPath(dependencyRoot, expectedTypeScript),
    "TypeScript does not resolve from candidate-private exact-lock dependencies.",
  );
  return { directDependencies, typeScriptEntrypoint: expectedTypeScript };
}

async function installCandidateDependencies(
  root,
  entries,
  environment,
  runtime = runtimeIdentity(),
) {
  const dependencyRoot = candidateDependencyRoot(root, entries);
  requireCondition(
    !(await pathExists(dependencyRoot)),
    "Candidate dependency supply appeared before exact-lock installation.",
  );
  const packageBytes = await readFile(join(root, "package.json"));
  const lockBytes = await readFile(join(root, "package-lock.json"));
  const lockSupply = validateCandidateLockSupply(lockBytes, runtime);
  const ancestorSupplyBefore = await inspectRuntimeAncestorSupply(root);
  const command = candidateDependencyInstallCommand();
  const common = {
    strategy: "candidate-private-exact-lock-offline-npm-ci",
    root: dependencyRoot,
    path: CANDIDATE_DEPENDENCY_DIRECTORY,
    initialState: "absent",
    packageManifest: candidateFileBinding("package.json", packageBytes),
    lock: lockSupply.receipt,
    command,
    ancestorSupplyBefore,
  };
  if (!ancestorSupplyBefore.absent) {
    return {
      ...common,
      ready: false,
      setupError: `Candidate runtime ancestor contains fallback package supply: ${ancestorSupplyBefore.found.path}.`,
      result: { attempted: false, exitCode: null, signal: null, spawnError: null },
      stdout: inlineBytesBinding(Buffer.alloc(0)),
      stderr: inlineBytesBinding(Buffer.alloc(0)),
      directDependenciesContained: false,
      directDependencies: [],
      typeScriptEntrypoint: null,
      closure: null,
    };
  }

  const result = spawnSync(command.executable, [...command.arguments], {
    cwd: root,
    encoding: null,
    env: environment,
    maxBuffer: 128 * 1024 * 1024,
    windowsHide: true,
  });
  const spawnError = normalizedError(result.error);
  const installationPassed = result.status === 0 && result.signal === null && spawnError === null;
  const evidence = {
    ...common,
    result: {
      attempted: true,
      exitCode: Number.isInteger(result.status) ? result.status : null,
      signal: typeof result.signal === "string" ? result.signal : null,
      spawnError,
    },
    stdout: inlineBytesBinding(result.stdout ?? Buffer.alloc(0)),
    stderr: inlineBytesBinding(result.stderr ?? Buffer.alloc(0)),
  };
  if (!installationPassed) {
    const detail =
      Buffer.from(result.stderr ?? Buffer.alloc(0))
        .toString("utf8")
        .trim() ||
      spawnError ||
      "unknown failure";
    return {
      ...evidence,
      ready: false,
      setupError: `Candidate dependency installation failed: ${detail}`,
      directDependenciesContained: false,
      directDependencies: [],
      typeScriptEntrypoint: null,
      closure: null,
    };
  }

  try {
    const installed = await validateInstalledCandidateDependencies(root, lockSupply, packageBytes);
    const dependencyRootReal = await realpath(dependencyRoot);
    const closure = await inspectCandidateDependencyClosure(dependencyRootReal);
    requireCondition(closure.files > 0, "Candidate dependency closure is empty.");
    return {
      ...evidence,
      ready: true,
      setupError: null,
      root: dependencyRootReal,
      directDependenciesContained: true,
      directDependencies: installed.directDependencies,
      typeScriptEntrypoint: installed.typeScriptEntrypoint,
      closure,
    };
  } catch (error) {
    return {
      ...evidence,
      ready: false,
      setupError: normalizedError(error),
      directDependenciesContained: false,
      directDependencies: [],
      typeScriptEntrypoint: null,
      closure: null,
    };
  }
}

async function removeCandidateDependencies(root, entries) {
  const dependencyRoot = candidateDependencyRoot(root, entries);
  try {
    const stats = await lstat(dependencyRoot);
    requireCondition(
      stats.isDirectory() && !stats.isSymbolicLink(),
      "Candidate dependency root is not a plain directory.",
    );
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
  await rm(dependencyRoot, { recursive: true, force: false, maxRetries: 3, retryDelay: 100 });
  return true;
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

function isEmptyDirectoryError(error) {
  return (
    error &&
    typeof error === "object" &&
    (error.code === "ENOENT" || error.code === "ENOTEMPTY" || error.code === "EEXIST")
  );
}

async function pruneEmptyDirectory(path) {
  try {
    await rmdir(path);
  } catch (error) {
    if (!isEmptyDirectoryError(error)) {
      throw error;
    }
  }
}

async function pruneMaterializationParents() {
  await pruneEmptyDirectory(MATERIALIZATION_PARENT);
  await pruneEmptyDirectory(dirname(MATERIALIZATION_PARENT));
}

async function requireRegularGeneratedTree(root) {
  const stats = await lstat(root);
  requireCondition(
    stats.isDirectory() && !stats.isSymbolicLink(),
    `Generated build output is not a plain directory: ${GENERATED_BUILD_DIRECTORY}.`,
  );
  for (const child of await readdir(root, { withFileTypes: true })) {
    const path = join(root, child.name);
    const childStats = await lstat(path);
    requireCondition(
      !childStats.isSymbolicLink() && (childStats.isDirectory() || childStats.isFile()),
      `Generated build output contains a non-regular entry: ${child.name}.`,
    );
    if (childStats.isDirectory()) {
      await requireRegularGeneratedTree(path);
    }
  }
}

async function removeGeneratedBuildOutput(root, entries) {
  requireCondition(
    !entries.some(
      (entry) =>
        entry.path === GENERATED_BUILD_DIRECTORY ||
        entry.path.startsWith(`${GENERATED_BUILD_DIRECTORY}/`),
    ),
    `Candidate source unexpectedly owns ${GENERATED_BUILD_DIRECTORY}.`,
  );
  const generatedRoot = resolve(root, GENERATED_BUILD_DIRECTORY);
  requireCondition(
    dirname(generatedRoot) === resolve(root),
    "Generated build output is outside the candidate materialization.",
  );
  try {
    await requireRegularGeneratedTree(generatedRoot);
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
  await rm(generatedRoot, { recursive: true, force: false, maxRetries: 3, retryDelay: 100 });
  return true;
}

async function removeMaterialization(root) {
  requireCondition(
    dirname(root) === MATERIALIZATION_PARENT &&
      root.startsWith(MATERIALIZATION_PARENT + sep + "candidate-"),
    "Refusing to remove an unexpected materialization path.",
  );
  await rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  await pruneMaterializationParents();
}

async function materializeCandidateSource(candidateCommit, options = {}) {
  const gitRunner = options.gitRunner ?? runGit;
  const { tree, entries } = candidateTree(candidateCommit, gitRunner);
  const blobs = candidateBlobBytes(
    entries.map((entry) => entry.objectId),
    gitRunner,
  );
  await mkdir(MATERIALIZATION_PARENT, { recursive: true });
  const root = await mkdtemp(join(MATERIALIZATION_PARENT, "candidate-"));
  const hash = createMaterializationDigest();
  let bytes = 0;
  try {
    for (const entry of entries) {
      const content = Buffer.from(blobs.get(entry.objectId));
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
  const longPathsResult = runGit(["config", "--bool", "--get", "core.longpaths"], options);
  requireGitSuccess(longPathsResult, "Candidate Git long-path configuration inspection");
  requireCondition(
    strictUtf8(longPathsResult.stdout, "Candidate Git long-path configuration").trim() === "true",
    "Candidate Git context lacks long-path support.",
  );
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
  await pruneMaterializationParents();
}

async function createPrivateRuntime(root) {
  const runtimeRoot = join(root, SCRATCH_LAYOUT.runtime);
  const home = join(runtimeRoot, "home");
  const temp = join(runtimeRoot, SCRATCH_LAYOUT.temp);
  const appData = join(runtimeRoot, "appdata");
  const localAppData = join(runtimeRoot, "localappdata");
  await Promise.all([
    mkdir(home, { recursive: true }),
    mkdir(temp, { recursive: true }),
    mkdir(appData, { recursive: true }),
    mkdir(localAppData, { recursive: true }),
  ]);
  const userConfig = join(runtimeRoot, "npm-userconfig");
  const globalConfig = join(runtimeRoot, "npm-globalconfig");
  await Promise.all([
    writeFile(userConfig, Buffer.alloc(0), { flag: "wx" }),
    writeFile(globalConfig, Buffer.alloc(0), { flag: "wx" }),
  ]);
  return { root: runtimeRoot, home, temp, appData, localAppData, userConfig, globalConfig };
}

async function createCandidateGitContext(candidateCommit, worktree, options = {}) {
  const sourceGitRunner = options.sourceGitRunner ?? runGit;
  const sourceResult = sourceGitRunner(["rev-parse", "--path-format=absolute", "--git-common-dir"]);
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
      ["Candidate Git long-path configuration", ["config", "core.longpaths", "true"]],
      ["Candidate Git reference binding", ["update-ref", "refs/heads/candidate", candidateCommit]],
      ["Candidate Git HEAD binding", ["symbolic-ref", "HEAD", "refs/heads/candidate"]],
      ["Candidate Git index binding", ["read-tree", candidateCommit]],
    ]) {
      requireGitSuccess(runGit(args, options), label);
    }

    const runtime = await createPrivateRuntime(root);
    const context = { root, worktree, environment, runtime };
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

function validatePrivateRuntime(gitContext) {
  const runtime = gitContext.runtime;
  requireCondition(
    runtime.root.startsWith(`${resolve(gitContext.root)}${sep}`),
    "Private runtime escapes the candidate Git context.",
  );
  for (const path of [runtime.home, runtime.temp, runtime.appData, runtime.localAppData]) {
    const stats = lstatSync(path);
    requireCondition(
      stats.isDirectory() && !stats.isSymbolicLink(),
      "Private runtime directory is not plain.",
    );
  }
  for (const path of [runtime.userConfig, runtime.globalConfig]) {
    const stats = lstatSync(path);
    requireCondition(
      stats.isFile() && !stats.isSymbolicLink() && stats.nlink === 1 && stats.size === 0,
      "Private npm configuration is not one empty unlinked file.",
    );
  }
}

function commandEnvironment(gitContext) {
  validatePrivateRuntime(gitContext);
  const environment = { ...gitContext.environment };
  const runtime = gitContext.runtime;
  environment.HOME = runtime.home;
  environment.PATH = closedPath(gitContext.worktree);
  environment.TEMP = runtime.temp;
  environment.TMP = runtime.temp;
  environment.TMPDIR = runtime.temp;
  if (process.platform === "win32") {
    environment.APPDATA = runtime.appData;
    environment.LOCALAPPDATA = runtime.localAppData;
    environment.USERPROFILE = runtime.home;
  }

  const cacheFromWorktree = relative(resolve(gitContext.worktree), HOST_NPM_CACHE);
  requireCondition(
    isAbsolute(cacheFromWorktree) ||
      cacheFromWorktree === ".." ||
      cacheFromWorktree.startsWith(`..${sep}`),
    "Host-owned npm cache must remain outside the candidate materialization.",
  );
  Object.assign(environment, {
    npm_config_audit: "false",
    npm_config_cache: HOST_NPM_CACHE,
    npm_config_color: "false",
    npm_config_fund: "false",
    npm_config_globalconfig: runtime.globalConfig,
    npm_config_ignore_scripts: "true",
    npm_config_loglevel: "notice",
    npm_config_offline: "true",
    npm_config_progress: "false",
    npm_config_script_shell: HOST_SHELL_PATH,
    npm_config_update_notifier: "false",
    npm_config_userconfig: runtime.userConfig,
    npm_config_yes: "true",
  });

  return Object.fromEntries(
    Object.entries(environment).sort(([left], [right]) =>
      Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8")),
    ),
  );
}

async function authorityFileBinding(path, label) {
  const resolved = await realpath(path);
  const stats = await lstat(resolved);
  requireCondition(
    stats.isFile() && !stats.isSymbolicLink(),
    `${label} must be a plain regular file.`,
  );
  const bytes = await readFile(resolved);
  return {
    path: resolved,
    bytes: bytes.byteLength,
    digest: digest(bytes),
    nlink: stats.nlink,
  };
}

async function commandAuthorityFileBinding(commandPath, label) {
  const commandStats = await lstat(commandPath);
  requireCondition(
    commandStats.isFile() || commandStats.isSymbolicLink(),
    `${label} command must be a regular file or symbolic link.`,
  );
  const commandType = commandStats.isSymbolicLink() ? "symbolic-link" : "regular-file";
  const commandLink = commandStats.isSymbolicLink() ? await readlink(commandPath) : null;
  const target = await authorityFileBinding(commandPath, label);
  requireCondition(target.path === HOST_NPM_PATH, `${label} target changed.`);
  return {
    ...target,
    commandPath,
    commandType,
    commandLink,
  };
}

function requireToolVersion(result, label) {
  requireCondition(
    result.status === 0 && result.signal === null && !result.error,
    `${label} version inspection failed.`,
  );
  return strictUtf8(result.stdout, `${label} version stdout`).trim();
}

async function inspectToolchain(environment) {
  const typeScriptPath = await realpath(
    join(environment.GIT_WORK_TREE, CANDIDATE_DEPENDENCY_DIRECTORY, "typescript", "bin", "tsc"),
  );
  const candidateDependencyRoot = join(environment.GIT_WORK_TREE, CANDIDATE_DEPENDENCY_DIRECTORY);
  requireCondition(
    isContainedPath(candidateDependencyRoot, typeScriptPath),
    "TypeScript toolchain escaped candidate-private dependencies.",
  );
  const npmVersionResult = spawnSync(HOST_NODE_PATH, [HOST_NPM_CLI_PATH, "--version"], {
    encoding: null,
    env: environment,
    windowsHide: true,
  });
  const gitVersionResult = spawnSync(HOST_GIT_PATH, ["--version"], {
    encoding: null,
    env: environment,
    windowsHide: true,
  });
  const typeScriptVersionResult = spawnSync(HOST_NODE_PATH, [typeScriptPath, "--version"], {
    encoding: null,
    env: environment,
    windowsHide: true,
  });
  return {
    node: {
      ...(await authorityFileBinding(HOST_NODE_PATH, "Host Node executable")),
      version: process.version,
    },
    npmLauncher: {
      ...(await commandAuthorityFileBinding(HOST_NPM_COMMAND_PATH, "Host npm launcher")),
      version: requireToolVersion(npmVersionResult, "Host npm"),
    },
    npmCli: await authorityFileBinding(HOST_NPM_CLI_PATH, "Host npm CLI"),
    git: {
      ...(await authorityFileBinding(HOST_GIT_PATH, "Host Git executable")),
      version: requireToolVersion(gitVersionResult, "Host Git"),
    },
    shell: await authorityFileBinding(HOST_SHELL_PATH, "Host command shell"),
    typescript: {
      ...(await authorityFileBinding(typeScriptPath, "Candidate TypeScript entrypoint")),
      version: requireToolVersion(typeScriptVersionResult, "Candidate TypeScript"),
    },
  };
}

async function executionEnvironmentBinding(environment, runtime) {
  const userConfig = await authorityFileBinding(runtime.userConfig, "Private npm user config");
  const globalConfig = await authorityFileBinding(
    runtime.globalConfig,
    "Private npm global config",
  );
  requireCondition(
    userConfig.bytes === 0 && globalConfig.bytes === 0,
    "Private npm configuration must remain empty.",
  );
  const cacheReal = await realpath(HOST_NPM_CACHE);
  const cacheStats = await lstat(cacheReal);
  requireCondition(
    cacheStats.isDirectory() && !cacheStats.isSymbolicLink(),
    "Host npm cache must be a plain directory.",
  );
  return {
    apiVersion: "swecircuit/release-gate-environment/v1alpha1",
    effective: environment,
    policy: {
      allowlist: "exact-effective-map",
      gitConfiguration: "system-and-global-disabled",
      gitPrompt: "disabled",
      nodeOptions: "absent",
      nodePath: "absent",
      npmNetwork: "offline",
      npmLifecycleScripts: "disabled",
      npmUserConfig: "operation-private-empty-file",
      npmGlobalConfig: "operation-private-empty-file",
      pathPolicy: "closed-tool-directories",
      temporaryPaths: "operation-private",
    },
    npm: {
      cache: {
        path: cacheReal,
        provisioning: "external-host-untrusted-content-offline-only",
      },
      userConfig,
      globalConfig,
    },
  };
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

function renderError(error) {
  if (
    !(error instanceof AggregateError) &&
    !(error instanceof Error && error.cause !== undefined)
  ) {
    const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
    return message.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
  }
  const lines = [];
  const seen = new Set();
  const visit = (value, locator) => {
    if (value && typeof value === "object") {
      if (seen.has(value)) {
        lines.push(`${locator}: [circular error]`);
        return;
      }
      seen.add(value);
    }
    lines.push(`${locator}: ${normalizedError(value) ?? "Unknown error"}`);
    if (value instanceof AggregateError) {
      [...value.errors].forEach((nested, index) => {
        visit(nested, `${locator}.errors[${index}]`);
      });
    }
    if (value instanceof Error && value.cause !== undefined) {
      visit(value.cause, `${locator}.cause`);
    }
  };
  visit(error, "error");
  return lines.join("\n");
}

async function cleanupFailedCandidatePreparation(outputs, materialization, gitContext) {
  const operations = [() => removeCandidateEvidenceSlot(outputs)];
  if (materialization !== undefined) {
    operations.push(() => removeMaterialization(materialization.root));
  }
  if (gitContext !== undefined) {
    operations.push(() => removeCandidateGitContext(gitContext.root));
  }
  const failures = [];
  for (const operation of operations) {
    try {
      await operation();
    } catch (error) {
      failures.push(error);
    }
  }
  if (failures.length > 0) {
    throw new AggregateError(failures, "Candidate preparation cleanup failed.");
  }
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

  await reserveCandidateEvidenceSlot(outputs);
  let materialization;
  let gitContext;
  let runtime;
  try {
    materialization = await materializeCandidateSource(candidateCommit);
    gitContext = await createCandidateGitContext(candidateCommit, materialization.root);
    runtime = runtimeIdentity();
  } catch (error) {
    try {
      await cleanupFailedCandidatePreparation(outputs, materialization, gitContext);
    } catch (cleanupError) {
      throw new AggregateError(
        [error, cleanupError],
        "Candidate preparation and owned-resource cleanup failed.",
      );
    }
    throw error;
  }

  let gateResult = {
    status: null,
    signal: null,
    error: new Error("Canonical verification command did not execute."),
  };
  let environmentBinding = null;
  let toolchainBefore = null;
  let toolchainAfter = null;
  let toolchainInspectionError = null;
  let candidateDependencies = null;
  let candidateDependenciesAfter = null;
  let candidateDependencyInspectionError = null;
  let candidateDependencyCleanupAttempted = false;
  let candidateDependencyRemoved = false;
  let candidateDependencyAbsentAfter = null;
  let candidateDependencyCleanupError = null;
  let candidateAncestorSupplyAfter = null;
  let candidateAncestorSupplyInspectionError = null;
  let materializationDigestAfter = null;
  let materializationInspectionError = null;
  let materializationCleanupError = null;
  let gitContextAfter = { head: null, trackedState: "unavailable" };
  let gitContextInspectionError = null;
  let gitContextCleanupError = null;
  let operationError = null;
  try {
    try {
      const environment = commandEnvironment(gitContext);
      environmentBinding = await executionEnvironmentBinding(environment, gitContext.runtime);
      candidateDependencies = await installCandidateDependencies(
        materialization.root,
        materialization.entries,
        environment,
        runtime,
      );

      if (candidateDependencies.ready) {
        toolchainBefore = await inspectToolchain(environment);
        const stdoutHandle = await open(outputs.stdout, "r+");
        let stderrHandle;
        try {
          stderrHandle = await open(outputs.stderr, "r+");
        } catch (error) {
          await stdoutHandle.close();
          throw error;
        }
        try {
          gateResult = spawnSync(COMMAND.executable, [...COMMAND.arguments], {
            cwd: materialization.root,
            encoding: null,
            env: environment,
            stdio: ["ignore", stdoutHandle.fd, stderrHandle.fd],
            windowsHide: true,
          });
        } finally {
          await Promise.all([stdoutHandle.close(), stderrHandle.close()]);
        }
        try {
          toolchainAfter = await inspectToolchain(environment);
        } catch (error) {
          toolchainInspectionError = normalizedError(error);
        }
      } else {
        gateResult = {
          status: null,
          signal: null,
          error: new Error(candidateDependencies.setupError),
        };
      }
    } catch (error) {
      operationError = normalizedError(error);
      gateResult = {
        status: null,
        signal: null,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }

    try {
      const dependencyRoot = candidateDependencyRoot(materialization.root, materialization.entries);
      if (await pathExists(dependencyRoot)) {
        candidateDependenciesAfter = await inspectCandidateDependencyClosure(dependencyRoot);
      }
    } catch (error) {
      candidateDependencyInspectionError = normalizedError(error);
    }
    try {
      candidateDependencyCleanupAttempted = true;
      candidateDependencyRemoved = await removeCandidateDependencies(
        materialization.root,
        materialization.entries,
      );
      candidateDependencyAbsentAfter = !(await pathExists(
        candidateDependencyRoot(materialization.root, materialization.entries),
      ));
    } catch (error) {
      candidateDependencyCleanupError = normalizedError(error);
    }
    try {
      candidateAncestorSupplyAfter = await inspectRuntimeAncestorSupply(materialization.root);
    } catch (error) {
      candidateAncestorSupplyInspectionError = normalizedError(error);
    }
    try {
      await removeGeneratedBuildOutput(materialization.root, materialization.entries);
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
  const ancestorSupplyPreserved =
    candidateDependencies?.ancestorSupplyBefore?.absent === true &&
    candidateAncestorSupplyAfter?.absent === true &&
    JSON.stringify(candidateDependencies.ancestorSupplyBefore.checkedPaths) ===
      JSON.stringify(candidateAncestorSupplyAfter.checkedPaths) &&
    candidateAncestorSupplyInspectionError === null;
  const passed =
    gateResult.status === 0 &&
    gateResult.signal === null &&
    spawnError === null &&
    operationError === null &&
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
    gitContextCleanupError === null &&
    environmentBinding !== null &&
    toolchainBefore !== null &&
    JSON.stringify(toolchainBefore) === JSON.stringify(toolchainAfter) &&
    toolchainInspectionError === null &&
    candidateDependencies?.ready === true &&
    candidateDependencies.setupError === null &&
    candidateDependencies.lock.platform === runtime.platform &&
    candidateDependencies.lock.architecture === runtime.architecture &&
    candidateDependencies.lock.libc === runtime.libc &&
    candidateDependenciesAfter !== null &&
    JSON.stringify(candidateDependencies.closure) === JSON.stringify(candidateDependenciesAfter) &&
    candidateDependencyInspectionError === null &&
    candidateDependencyCleanupAttempted &&
    candidateDependencyRemoved &&
    candidateDependencyAbsentAfter === true &&
    candidateDependencyCleanupError === null &&
    ancestorSupplyPreserved;

  let receipt;
  try {
    receipt = {
      apiVersion: "swecircuit/release-gate/v1alpha4",
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
      executionAuthority: {
        environment: environmentBinding,
        runtime,
        toolchain: {
          before: toolchainBefore,
          after: toolchainAfter,
          inspectionError: toolchainInspectionError,
        },
        candidateDependencies: {
          strategy: candidateDependencies?.strategy ?? null,
          ready: candidateDependencies?.ready ?? false,
          setupError:
            candidateDependencies === null
              ? "Candidate dependency setup unavailable."
              : candidateDependencies.setupError,
          root: candidateDependencies?.root ?? null,
          path: candidateDependencies?.path ?? null,
          initialState: candidateDependencies?.initialState ?? null,
          packageManifest: candidateDependencies?.packageManifest ?? null,
          lock: candidateDependencies?.lock ?? null,
          command: candidateDependencies?.command ?? null,
          result: candidateDependencies?.result ?? null,
          stdout: candidateDependencies?.stdout ?? null,
          stderr: candidateDependencies?.stderr ?? null,
          directDependenciesContained: candidateDependencies?.directDependenciesContained ?? false,
          directDependencies: candidateDependencies?.directDependencies ?? [],
          typeScriptEntrypoint: candidateDependencies?.typeScriptEntrypoint ?? null,
          ancestorSupply: {
            before: candidateDependencies?.ancestorSupplyBefore ?? null,
            after: candidateAncestorSupplyAfter,
            inspectionError: candidateAncestorSupplyInspectionError,
          },
          closure: {
            before: candidateDependencies?.closure ?? null,
            after: candidateDependenciesAfter,
            inspectionError: candidateDependencyInspectionError,
          },
          cleanup: {
            attempted: candidateDependencyCleanupAttempted,
            removed: candidateDependencyRemoved,
            absentAfter: candidateDependencyAbsentAfter,
            error: candidateDependencyCleanupError,
          },
        },
      },
      operationError,
      result: passed ? "pass" : "fail",
      exitCode: Number.isInteger(gateResult.status) ? gateResult.status : null,
      signal: typeof gateResult.signal === "string" ? gateResult.signal : null,
      spawnError,
      stdout: await fileBinding(outputs.stdout),
      stderr: await fileBinding(outputs.stderr),
    };

    await publishCandidateReceipt(
      outputs,
      Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`, "utf8"),
    );
  } catch (error) {
    await removeCandidateEvidenceSlot(outputs);
    throw error;
  }
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
        executionAuthority: receipt.executionAuthority,
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
  candidateBlobBytes,
  candidateDependencyInstallCommand,
  candidateEvidencePaths,
  candidateReceiptPendingPath,
  candidateTree,
  canonicalCommand: COMMAND,
  cleanupFailedCandidatePreparation,
  closedPath,
  commandEnvironment,
  createCandidateGitContext,
  detectRuntimeLibc,
  executionEnvironmentBinding,
  hostGitPath: HOST_GIT_PATH,
  hostNodePath: HOST_NODE_PATH,
  hostNpmCache: HOST_NPM_CACHE,
  hostNpmCliPath: HOST_NPM_CLI_PATH,
  hostNpmCommandPath: HOST_NPM_COMMAND_PATH,
  hostNpmPath: HOST_NPM_PATH,
  hostShellPath: HOST_SHELL_PATH,
  inspectCandidateDependencyClosure,
  inspectCandidateGitContext,
  inspectExactMaterialization,
  inspectMaterialization,
  inspectRuntimeAncestorSupply,
  inspectToolchain,
  installCandidateDependencies,
  materializationBase: MATERIALIZATION_BASE,
  materializationLayout: SCRATCH_LAYOUT,
  materializationParent: MATERIALIZATION_PARENT,
  materializeCandidateSource,
  packageApplies,
  parseGitBlobBatch,
  publishCandidateReceipt,
  pruneEmptyDirectory,
  removeCandidateEvidenceSlot,
  removeCandidateGitContext,
  removeCandidateDependencies,
  removeGeneratedBuildOutput,
  removeMaterialization,
  renderError,
  reserveCandidateEvidenceSlot,
  runtimeAncestorSupplyPaths,
  runtimeIdentity,
  typeScriptEntrypointEnvironmentKey: TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY,
  validateCandidateLockSupply,
});

if (
  typeof process.argv[1] === "string" &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    process.stderr.write(`${renderError(error)}\n`);
    process.exitCode = 1;
  });
}
