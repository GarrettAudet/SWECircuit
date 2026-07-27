import { spawnSync } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import {
  access,
  link,
  lstat,
  mkdir,
  mkdtemp,
  open,
  readFile,
  readdir,
  readlink,
  realpath,
  rm,
  unlink,
  writeFile,
} from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import {
  basename,
  delimiter,
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep,
} from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const SCRIPT_PATH = fileURLToPath(import.meta.url);
const PARENT_REPOSITORY_PATH = "scripts/run-v12-release-review.mjs";
const REVIEW_ROOT = "docs/specs/v12-ide-run-loop/evidence/release-review-r2";
const HARNESS_REPOSITORY_PATH = `${REVIEW_ROOT}/run-release-review.mjs`;
const VERIFIER_REPOSITORY_PATH = `${REVIEW_ROOT}/verify-release-review-handoffs.mjs`;
const GATE_EVIDENCE_ROOT = `${REVIEW_ROOT}/inputs/canonical-gates`;
const CANDIDATE_PATTERN = /^[0-9a-f]{40}$/;
const DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;
const RUNTIME_BINDING_DOMAIN = "swecircuit/release-review-runtime/v1alpha1";
const EFFECTIVE_ENVIRONMENT_DOMAIN =
  "swecircuit/release-review-effective-environment/v1alpha1";
const CLOSURE_DOMAIN = "swecircuit/release-review-closure/v1alpha1";
const MATERIALIZATION_DOMAIN = "swecircuit/release-gate/materialization/v1alpha1";
const INVOCATION_DOMAIN = "swecircuit/release-review-invocation/v1alpha1";
const WORKER_CONTEXT_ENV = "SWECIRCUIT_RELEASE_REVIEW_WORKER_CONTEXT";
const WORKER_TOKEN_ENV = "SWECIRCUIT_RELEASE_REVIEW_WORKER_TOKEN";
const CACHE_ENV = "SWECIRCUIT_RELEASE_REVIEW_NPM_CACHE";
const PARENT_DIGEST_ENV = "SWECIRCUIT_RELEASE_REVIEW_PARENT_DIGEST";
const STABLE_RECONSTRUCTION_DOMAIN =
  "swecircuit/release-review-stable-reconstruction/v1alpha1";
const PHASE_AUTHORITY_DOMAIN = "swecircuit/release-review-phase-authority/v1alpha1";
const PRIVATE_STATE_DOMAIN = "swecircuit/release-review-private-state/v1alpha1";
const EMPTY_FILE_DIGEST =
  "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
const PRIVATE_NPM_CONFIGURATION_POLICY = Object.freeze({
  apiVersion: "swecircuit/release-review-npm-configuration/v1alpha1",
  kind: "ReleaseReviewPrivateNpmConfigurationPolicy",
  userConfig: Object.freeze({ bytes: 0, digest: EMPTY_FILE_DIGEST }),
  globalConfig: Object.freeze({ bytes: 0, digest: EMPTY_FILE_DIGEST }),
  distinctPaths: "required-case-insensitively",
  containment: "operation-root-outside-repository-candidate-and-cache",
  links: "forbidden",
  hostConfiguration: "excluded-without-fallback",
  pathIdentity: "invocation-only-excluded-from-stable-runtime-binding",
  validation: "before-every-parent-spawn-and-by-candidate-worker",
});
const INVOCATION_TEMPORARY_PATH_POLICY =
  "external-host-bound-invocation-paths-excluded-from-stable-runtime-identity";
const PRIVATE_NPM_CONFIGURATION_STATES = new WeakMap();
const TOOL_NPM_CONFIGURATION = Symbol("release-review-private-npm-configuration");
const TOOL_NPM_INSPECTION = Symbol("release-review-private-npm-inspection");
const WINDOWS_CHILD_ENVIRONMENT_KEYS = Object.freeze([
  "LOGONSERVER",
  "SYSTEMDRIVE",
  "USERDOMAIN",
  "USERNAME",
]);
const DARWIN_CHILD_ENVIRONMENT_KEYS = Object.freeze(["__CF_USER_TEXT_ENCODING"]);
const STABLE_ENVIRONMENT_EXCLUSIONS = new Set([
  "TEMP",
  "TMP",
  "TMPDIR",
  ...WINDOWS_CHILD_ENVIRONMENT_KEYS,
  ...DARWIN_CHILD_ENVIRONMENT_KEYS,
]);
const CLOSED_NPM_ENVIRONMENT_KEYS = new Set([
  "npm_config_audit",
  "npm_config_cache",
  "npm_config_fund",
  "npm_config_globalconfig",
  "npm_config_ignore_scripts",
  "npm_config_offline",
  "npm_config_progress",
  "npm_config_update_notifier",
  "npm_config_userconfig",
]);
const MODES = new Set(["prepare", "compile", "approve", "verify", "paths"]);
const PHASE_PREFIXES = Object.freeze({
  prepare: Object.freeze(["prepare"]),
  compile: Object.freeze(["prepare", "compile"]),
  approve: Object.freeze(["prepare", "compile", "approve"]),
  verify: Object.freeze(["prepare", "compile", "approve", "verify"]),
  paths: Object.freeze(["paths"]),
});
const WINDOWS_RESERVED = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/iu;
const FORBIDDEN_PATH_TEXT =
  /[\u0000-\u001f\u007f-\u009f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/u;
const mode = process.argv[2];
const candidate = process.argv[3];
const phaseArguments = process.argv.slice(4);

function requireCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function compareOrdinal(left, right) {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function updateFrame(hash, bytes) {
  const value = Buffer.from(bytes);
  const length = Buffer.allocUnsafe(8);
  length.writeBigUInt64BE(BigInt(value.byteLength));
  hash.update(length);
  hash.update(value);
}

function domainDigest(domain, value) {
  const hash = createHash("sha256");
  updateFrame(hash, Buffer.from(domain, "utf8"));
  updateFrame(hash, Buffer.from(JSON.stringify(value), "utf8"));
  return `sha256:${hash.digest("hex")}`;
}

function effectiveEnvironmentBinding(environment) {
  requireCondition(
    environment && typeof environment === "object" && !Array.isArray(environment),
    "Effective worker environment must be an object.",
  );
  const aliases = new Set();
  const entries = Object.entries(environment).map(([name, value]) => {
    requireCondition(
      /^[A-Za-z_][A-Za-z0-9_]*$/u.test(name) && typeof value === "string",
      `Effective worker environment entry is invalid: ${String(name)}.`,
    );
    const alias = name.toLowerCase();
    requireCondition(
      !aliases.has(alias),
      `Effective worker environment contains a case-insensitive duplicate: ${name}.`,
    );
    aliases.add(alias);
    requireCondition(!value.includes("\0"), `Effective worker environment value contains NUL: ${name}.`);
    for (let index = 0; index < value.length; index += 1) {
      const codeUnit = value.charCodeAt(index);
      if (codeUnit >= 0xd800 && codeUnit <= 0xdbff) {
        const next = value.charCodeAt(index + 1);
        requireCondition(
          next >= 0xdc00 && next <= 0xdfff,
          `Effective worker environment value contains a lone surrogate: ${name}.`,
        );
        index += 1;
      } else {
        requireCondition(
          codeUnit < 0xdc00 || codeUnit > 0xdfff,
          `Effective worker environment value contains a lone surrogate: ${name}.`,
        );
      }
    }
    const bytes = Buffer.from(value, "utf8");
    return {
      name: name.toUpperCase(),
      valueBytes: bytes.byteLength,
      valueDigest: digest(bytes),
    };
  });
  entries.sort((left, right) => compareOrdinal(left.name, right.name));
  const identity = {
    apiVersion: "swecircuit/release-review-effective-environment/v1alpha1",
    kind: "ReleaseReviewEffectiveEnvironmentBinding",
    keyIdentity: "ascii-case-insensitive-uppercase",
    valueIdentity: "raw-utf8-sha256",
    entries,
  };
  return {
    ...identity,
    contentDigest: domainDigest(EFFECTIVE_ENVIRONMENT_DOMAIN, identity),
  };
}

function strictUtf8(bytes, label) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new Error(`${label} is not strict UTF-8.`);
  }
}

function scalarPathText(value, label) {
  requireCondition(typeof value === "string", `${label} must be a string.`);
  for (let index = 0; index < value.length; index += 1) {
    const codeUnit = value.charCodeAt(index);
    if (codeUnit >= 0xd800 && codeUnit <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      requireCondition(
        next >= 0xdc00 && next <= 0xdfff,
        `${label} contains a lone UTF-16 surrogate.`,
      );
      index += 1;
    } else {
      requireCondition(
        codeUnit < 0xdc00 || codeUnit > 0xdfff,
        `${label} contains a lone UTF-16 surrogate.`,
      );
    }
  }
  requireCondition(!FORBIDDEN_PATH_TEXT.test(value), `${label} contains forbidden control text.`);
  requireCondition(value === value.normalize("NFC"), `${label} must be NFC-normalized.`);
  return value;
}

function canonicalJson(value) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function parseCanonicalJson(bytes, label) {
  const text = strictUtf8(bytes, label);
  const value = JSON.parse(text);
  requireCondition(canonicalJson(value).equals(Buffer.from(bytes)), `${label} is not canonical JSON.`);
  return value;
}

function normalizedError(error) {
  if (!error) {
    return null;
  }
  const value = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  return value.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
}

function repositoryPath(path) {
  return relative(ROOT, path).replaceAll("\\", "/");
}

function absoluteRepositoryPath(path) {
  const target = resolve(ROOT, ...path.split("/"));
  requireCondition(isContainedPath(ROOT, target), `Repository path escapes root: ${path}.`);
  return target;
}

function isContainedPath(root, target) {
  const fromRoot = relative(resolve(root), resolve(target));
  return fromRoot === "" || (!isAbsolute(fromRoot) && fromRoot !== ".." && !fromRoot.startsWith(`..${sep}`));
}
function pathAlias(path, platform = process.platform) {
  const normalized = resolve(path).normalize("NFC");
  return platform === "win32" ? normalized.toLowerCase() : normalized;
}

function fileSystemIdentity(stats) {
  return {
    device: stats.dev.toString(),
    inode: stats.ino.toString(),
    mode: stats.mode.toString(),
    ctimeNanoseconds: stats.ctimeNs.toString(),
    birthtimeNanoseconds: stats.birthtimeNs.toString(),
  };
}

function inspectPrivateNpmConfigurationFile(path, label) {
  const stats = lstatSync(path, { bigint: true });
  requireCondition(
    stats.isFile() && !stats.isSymbolicLink() && stats.nlink === 1n,
    `${label} must be one plain, unlinked regular file.`,
  );
  const resolved = realpathSync(path);
  requireCondition(
    pathAlias(path) === pathAlias(resolved),
    `${label} must not resolve through a link or alias.`,
  );
  const bytes = readFileSync(path);
  requireCondition(
    bytes.byteLength === 0 && digest(bytes) === EMPTY_FILE_DIGEST,
    `${label} must contain exactly zero bytes.`,
  );
  return {
    path: resolve(path),
    realPath: resolved,
    bytes: bytes.byteLength,
    digest: digest(bytes),
    links: Number(stats.nlink),
    identity: fileSystemIdentity(stats),
  };
}

function validateClosedNpmEnvironment(environment, state) {
  requireCondition(
    environment && typeof environment === "object" && !Array.isArray(environment),
    "Closed npm environment must be an object.",
  );
  for (const key of Object.keys(environment)) {
    const normalized = key.toLowerCase();
    requireCondition(
      !normalized.startsWith("npm_config_") || CLOSED_NPM_ENVIRONMENT_KEYS.has(normalized),
      `Closed npm environment contains an undeclared npm setting: ${key}.`,
    );
  }
  requireCondition(
    suppliedValue(environment, "npm_config_cache") === state.cacheRoot &&
      suppliedValue(environment, "npm_config_offline") === "true" &&
      suppliedValue(environment, "npm_config_ignore_scripts") === "true" &&
      suppliedValue(environment, "npm_config_userconfig") === state.user.path &&
      suppliedValue(environment, "npm_config_globalconfig") === state.global.path &&
      suppliedValue(environment, "npm_config_audit") === "false" &&
      suppliedValue(environment, "npm_config_fund") === "false" &&
      suppliedValue(environment, "npm_config_update_notifier") === "false" &&
      suppliedValue(environment, "npm_config_progress") === "false",
    "Closed npm environment differs from its private configuration binding.",
  );
}

function validatePrivateNpmConfiguration(configuration, options = {}) {
  const state = PRIVATE_NPM_CONFIGURATION_STATES.get(configuration);
  requireCondition(state !== undefined, "Private npm configuration is not production-owned.");
  const rootStats = lstatSync(state.operationRoot);
  requireCondition(
    rootStats.isDirectory() && !rootStats.isSymbolicLink(),
    "Private npm configuration operation root must remain one plain directory.",
  );
  requireCondition(
    pathAlias(realpathSync(state.operationRoot)) === pathAlias(state.operationRoot),
    "Private npm configuration operation root changed identity.",
  );
  requireRealpathDisjointRoots(ROOT, state.operationRoot, "Private npm configuration");
  requireRealpathDisjointRoots(
    state.cacheRoot,
    state.operationRoot,
    "Private npm configuration cache",
  );

  const user = inspectPrivateNpmConfigurationFile(state.user.path, "Private npm user config");
  const global = inspectPrivateNpmConfigurationFile(
    state.global.path,
    "Private npm global config",
  );
  requireCondition(
    pathAlias(user.path) !== pathAlias(global.path) &&
      pathAlias(user.realPath) !== pathAlias(global.realPath),
    "Private npm user and global configs must be distinct case-insensitively.",
  );
  for (const [label, actual, expected] of [
    ["user", user, state.user],
    ["global", global, state.global],
  ]) {
    requireCondition(
      pathAlias(dirname(actual.realPath)) === pathAlias(state.operationRoot) &&
        !isContainedPath(ROOT, actual.realPath) &&
        !isContainedPath(state.candidateRoot, actual.realPath) &&
        !isContainedPath(state.cacheRoot, actual.realPath),
      `Private npm ${label} config escaped its authorized operation boundary.`,
    );
    requireCondition(
      JSON.stringify(actual) === JSON.stringify(expected),
      `Private npm ${label} config was substituted after creation.`,
    );
  }
  if (options.environment !== undefined) {
    validateClosedNpmEnvironment(options.environment, state);
  }
  if (options.spawn !== undefined) {
    const spawn = options.spawn;
    const event = {
      ordinal: state.spawnValidations.length + 1,
      label: spawn.label,
      command: spawn.command,
      arguments: [...spawn.arguments],
      cwd: resolve(spawn.cwd),
    };
    state.spawnValidations.push({
      ...event,
      digest: digest(Buffer.from(JSON.stringify(event), "utf8")),
    });
  }
  return { user, global };
}

async function createPrivateNpmConfiguration(operationRoot, cache) {
  const operationRootPath = realpathSync(operationRoot);
  const operationStats = lstatSync(operationRoot);
  requireCondition(
    operationStats.isDirectory() &&
      !operationStats.isSymbolicLink() &&
      pathAlias(resolve(operationRoot)) === pathAlias(operationRootPath),
    "Private npm configuration requires one plain operation root.",
  );
  const cacheRoot = realpathSync(cache);
  const cacheStats = lstatSync(cacheRoot);
  requireCondition(
    cacheStats.isDirectory() && !cacheStats.isSymbolicLink(),
    "Private npm configuration requires one plain offline cache.",
  );
  requireRealpathDisjointRoots(ROOT, operationRootPath, "Private npm configuration");
  requireRealpathDisjointRoots(
    cacheRoot,
    operationRootPath,
    "Private npm configuration cache",
  );

  const userPath = join(operationRootPath, "npm-userconfig");
  const globalPath = join(operationRootPath, "npm-globalconfig");
  for (const path of [userPath, globalPath]) {
    const handle = await open(path, "wx", 0o600);
    await handle.close();
  }
  const user = inspectPrivateNpmConfigurationFile(userPath, "Private npm user config");
  const global = inspectPrivateNpmConfigurationFile(
    globalPath,
    "Private npm global config",
  );
  const configuration = Object.freeze({
    apiVersion: "swecircuit/release-review-npm-configuration/v1alpha1",
    kind: "ReleaseReviewPrivateNpmConfiguration",
    operationRoot: operationRootPath,
    userConfig: Object.freeze({ path: user.path, bytes: user.bytes, digest: user.digest }),
    globalConfig: Object.freeze({
      path: global.path,
      bytes: global.bytes,
      digest: global.digest,
    }),
  });
  PRIVATE_NPM_CONFIGURATION_STATES.set(configuration, {
    operationRoot: operationRootPath,
    candidateRoot: join(operationRootPath, "candidate"),
    cacheRoot,
    user,
    global,
    spawnValidations: [],
  });
  validatePrivateNpmConfiguration(configuration);
  return configuration;
}


function requireDisjointRoots(left, right, label = "Runtime materialization") {
  const leftRoot = resolve(left);
  const rightRoot = resolve(right);
  requireCondition(
    !isContainedPath(leftRoot, rightRoot) && !isContainedPath(rightRoot, leftRoot),
    `${label} must be outside repository ancestry.`,
  );
}

function requireRealpathDisjointRoots(left, right, label = "Runtime materialization") {
  const leftRoot = realpathSync(left);
  const rightRoot = realpathSync(right);
  requireCondition(
    !isContainedPath(leftRoot, rightRoot) && !isContainedPath(rightRoot, leftRoot),
    `${label} realpaths must be disjoint.`,
  );
  return { left: leftRoot, right: rightRoot };
}

function requireNoAncestorNodeModules(candidateRoot) {
  let current = dirname(realpathSync(candidateRoot));
  for (;;) {
    const supply = join(current, "node_modules");
    try {
      const stats = lstatSync(supply);
      requireCondition(
        false,
        `Candidate ancestor contains fallback package supply: ${supply} (${stats.isDirectory() ? "directory" : "entry"}).`,
      );
    } catch (error) {
      if (!error || typeof error !== "object" || error.code !== "ENOENT") {
        throw error;
      }
    }
    const parent = dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }
}

function safeTreePath(pathBytes) {
  const path = scalarPathText(strictUtf8(pathBytes, "Candidate tree path"), "Candidate tree path");
  requireCondition(
    path.length > 0 &&
      !isAbsolute(path) &&
      !path.includes("\\") &&
      !FORBIDDEN_PATH_TEXT.test(path),
    `Candidate tree contains an unsafe path: ${JSON.stringify(path)}.`,
  );
  const segments = path.split("/");
  for (const segment of segments) {
    requireCondition(
      segment.length > 0 &&
        segment !== "." &&
        segment !== ".." &&
        segment === segment.normalize("NFC") &&
        segment.toLowerCase() !== ".git" &&
        !/[<>:"|?*]/u.test(segment) &&
        !/[. ]$/u.test(segment) &&
        !WINDOWS_RESERVED.test(segment),
      `Candidate tree contains an unsafe cross-platform path: ${JSON.stringify(path)}.`,
    );
  }
  return { path, segments, alias: path.normalize("NFC").toLowerCase() };
}

function nulRecords(bytes, label) {
  const value = Buffer.from(bytes);
  requireCondition(value.byteLength === 0 || value.at(-1) === 0, `${label} is not NUL terminated.`);
  const records = [];
  let start = 0;
  for (let index = 0; index < value.byteLength; index += 1) {
    if (value[index] === 0) {
      records.push(value.subarray(start, index));
      start = index + 1;
    }
  }
  return records;
}

function pathEnvironmentValue(environment) {
  const supplies = Object.entries(environment).filter(([key]) => key.toLowerCase() === "path");
  requireCondition(supplies.length <= 1, "PATH must be supplied at most once, case-insensitively.");
  return supplies[0]?.[1] ?? "";
}

function plainFileRealPath(path, label) {
  const resolved = realpathSync(path);
  const stats = lstatSync(resolved);
  requireCondition(stats.isFile() && !stats.isSymbolicLink(), `${label} must be a plain regular file.`);
  return resolved;
}

function resolvePathExecutable(names, environment = process.env) {
  const directories = pathEnvironmentValue(environment).split(delimiter).filter(Boolean);
  for (const directory of directories) {
    for (const name of names) {
      const candidatePath = resolve(directory, name);
      try {
        return plainFileRealPath(candidatePath, name);
      } catch (error) {
        if (!error || typeof error !== "object" || !["ENOENT", "ENOTDIR"].includes(error.code)) {
          throw error;
        }
      }
    }
  }
  throw new Error(`Unable to resolve required host executable: ${names.join(" or ")}.`);
}

function suppliedValue(environment, key) {
  const values = Object.entries(environment)
    .filter(([name]) => name.toLowerCase() === key.toLowerCase())
    .map(([, value]) => value);
  requireCondition(values.length <= 1, `${key} must be supplied at most once, case-insensitively.`);
  return values[0];
}

function expectedParentDigest(environment = process.env) {
  const value = suppliedValue(environment, PARENT_DIGEST_ENV);
  requireCondition(
    typeof value === "string" && DIGEST_PATTERN.test(value),
    `${PARENT_DIGEST_ENV} must be an explicit lowercase SHA-256 digest.`,
  );
  return value;
}

function resolveNpmCli(nodeExecutable, environment = process.env) {
  const supplied = suppliedValue(environment, "npm_execpath");
  const candidates = [
    supplied,
    join(dirname(nodeExecutable), "node_modules", "npm", "bin", "npm-cli.js"),
  ].filter((value) => typeof value === "string" && value.length > 0);
  for (const path of candidates) {
    requireCondition(isAbsolute(path), "npm CLI supply must be absolute.");
    try {
      return plainFileRealPath(path, "npm CLI");
    } catch (error) {
      if (!error || typeof error !== "object" || !["ENOENT", "ENOTDIR"].includes(error.code)) {
        throw error;
      }
    }
  }
  const command = resolvePathExecutable(process.platform === "win32" ? ["npm.cmd"] : ["npm"]);
  if (command.endsWith(".js")) {
    return command;
  }
  const sibling = join(dirname(nodeExecutable), "node_modules", "npm", "bin", "npm-cli.js");
  return plainFileRealPath(sibling, "npm CLI");
}

function run(command, arguments_, options = {}) {
  const cwd = options.cwd ?? ROOT;
  requireCondition(
    options.environment && options.npmConfiguration,
    "Every release-review parent spawn requires its private npm configuration.",
  );
  validatePrivateNpmConfiguration(options.npmConfiguration, {
    environment: options.environment,
    spawn: {
      label: options.label ?? `${basename(command)} ${arguments_[0] ?? ""}`.trim(),
      command,
      arguments: arguments_,
      cwd,
    },
  });
  const result = spawnSync(command, arguments_, {
    cwd,
    encoding: null,
    env: options.environment,
    input: options.input,
    maxBuffer: options.maxBuffer ?? 268_435_456,
    windowsHide: true,
  });
  if (result.error) {
    throw result.error;
  }
  return result;
}

function requireRun(result, label) {
  requireCondition(
    result.status === 0 && result.signal === null,
    `${label} failed: ${strictUtf8(result.stderr ?? Buffer.alloc(0), `${label} stderr`).trim() || "unknown failure"}`,
  );
  return result;
}

function inheritedEnvironment(environment, platform = process.platform) {
  const allowed = [
    "APPDATA",
    "COMSPEC",
    "HOME",
    "HOMEDRIVE",
    "HOMEPATH",
    "LANG",
    "LC_ALL",
    "LOCALAPPDATA",
    "PROGRAMDATA",
    "SYSTEMROOT",
    "TEMP",
    "TMP",
    "TMPDIR",
    "USERPROFILE",
    "WINDIR",
  ];
  if (platform === "win32") {
    allowed.push(...WINDOWS_CHILD_ENVIRONMENT_KEYS);
  }
  if (platform === "darwin") {
    allowed.push(...DARWIN_CHILD_ENVIRONMENT_KEYS);
  }
  const output = {};
  for (const canonicalName of allowed) {
    const matches = Object.entries(environment).filter(
      ([name]) => name.toLowerCase() === canonicalName.toLowerCase(),
    );
    requireCondition(matches.length <= 1, `${canonicalName} is duplicated case-insensitively.`);
    if (matches.length === 1 && typeof matches[0][1] === "string") {
      output[canonicalName] = matches[0][1];
    }
  }
  return output;
}

function environmentPolicy(inherited) {
  const stableInherited = Object.fromEntries(
    Object.entries(inherited)
      .filter(([name]) => !STABLE_ENVIRONMENT_EXCLUSIONS.has(name))
      .sort(([a], [b]) => compareOrdinal(a, b)),
  );
  return {
    apiVersion: "swecircuit/release-review-environment/v1alpha1",
    inherited: stableInherited,
    invocationTemporaryPaths: INVOCATION_TEMPORARY_PATH_POLICY,
    workerEffectiveEnvironment: "complete-case-insensitive-key-and-value-digest",
    pathPolicy: "closed-tool-directories",
    nodeOptions: "removed",
    nodePath: "removed",
    npmNetwork: "offline",
    npmLifecycleScripts: "disabled",
    npmUserConfig: "operation-private-empty-file",
    npmGlobalConfig: "operation-private-empty-file",
    npmConfiguration: PRIVATE_NPM_CONFIGURATION_POLICY,
    npmAudit: "disabled",
    npmFunding: "disabled",
    gitConfiguration: "system-and-global-disabled",
    gitPrompt: "disabled",
    toolEvidence: "observed-entrypoint-bytes-and-version-only",
  };
}

function closedEnvironment(tools, cache, npmConfiguration, additions = {}) {
  validatePrivateNpmConfiguration(npmConfiguration);
  const state = PRIVATE_NPM_CONFIGURATION_STATES.get(npmConfiguration);
  requireCondition(
    pathAlias(realpathSync(cache)) === pathAlias(state.cacheRoot),
    "Closed npm environment received a different offline cache.",
  );
  const inherited = inheritedEnvironment(process.env);
  const environment = { ...inherited };
  const nullDevice = process.platform === "win32" ? "NUL" : "/dev/null";
  const pathDirectories = [...new Set([dirname(tools.node.path), dirname(tools.git.path)])];
  environment.PATH = pathDirectories.join(delimiter);
  environment.GIT_CONFIG_NOSYSTEM = "1";
  environment.GIT_CONFIG_GLOBAL = nullDevice;
  environment.GIT_TERMINAL_PROMPT = "0";
  environment.npm_config_cache = state.cacheRoot;
  environment.npm_config_offline = "true";
  environment.npm_config_ignore_scripts = "true";
  environment.npm_config_userconfig = state.user.path;
  environment.npm_config_globalconfig = state.global.path;
  environment.npm_config_audit = "false";
  environment.npm_config_fund = "false";
  environment.npm_config_update_notifier = "false";
  environment.npm_config_progress = "false";
  const closed = { ...environment, ...additions };
  validatePrivateNpmConfiguration(npmConfiguration, { environment: closed });
  return closed;
}

async function regularFileBinding(path, label, logicalPath = path) {
  const resolved = await realpath(path);
  const stats = await lstat(resolved);
  requireCondition(
    stats.isFile() && !stats.isSymbolicLink() && stats.nlink === 1,
    `${label} must be one plain, unlinked regular file.`,
  );
  const bytes = await readFile(resolved);
  return { path: logicalPath, bytes: bytes.byteLength, digest: digest(bytes) };
}

async function resolveHostTools(cache, npmConfiguration) {
  const nodePath = plainFileRealPath(process.execPath, "Node executable");
  const gitPath = resolvePathExecutable(process.platform === "win32" ? ["git.exe"] : ["git"]);
  const npmPath = resolveNpmCli(nodePath);
  const basic = {
    node: { path: nodePath, version: process.version },
    git: { path: gitPath },
    npm: { path: npmPath },
  };
  const environment = closedEnvironment(basic, cache, npmConfiguration);
  const runInspected = (command, arguments_, label) => {
    const result = requireRun(
      run(command, arguments_, {
        environment,
        npmConfiguration,
        label,
      }),
      label,
    );
    return {
      value: strictUtf8(result.stdout, `${label} stdout`).trim(),
      stdout: { bytes: result.stdout.byteLength, digest: digest(result.stdout) },
      stderr: { bytes: result.stderr.byteLength, digest: digest(result.stderr) },
    };
  };
  const gitInspection = runInspected(gitPath, ["--version"], "Git version inspection");
  const npmInspection = runInspected(
    nodePath,
    [npmPath, "--version"],
    "npm version inspection",
  );
  const npmUserConfig = runInspected(
    nodePath,
    [npmPath, "config", "get", "userconfig"],
    "npm userconfig inspection",
  );
  const npmGlobalConfig = runInspected(
    nodePath,
    [npmPath, "config", "get", "globalconfig"],
    "npm globalconfig inspection",
  );
  requireCondition(
    npmUserConfig.value === npmConfiguration.userConfig.path &&
      npmGlobalConfig.value === npmConfiguration.globalConfig.path,
    "npm did not report the exact private user and global config paths.",
  );
  const tools = {
    node: { ...(await regularFileBinding(nodePath, "Node executable")), version: process.version },
    git: { ...(await regularFileBinding(gitPath, "Git executable")), version: gitInspection.value },
    npm: { ...(await regularFileBinding(npmPath, "npm CLI")), version: npmInspection.value },
    cache,
  };
  Object.defineProperties(tools, {
    [TOOL_NPM_CONFIGURATION]: { value: npmConfiguration },
    [TOOL_NPM_INSPECTION]: {
      value: Object.freeze({
        version: npmInspection.value,
        versionOutput: Object.freeze({
          stdout: npmInspection.stdout,
          stderr: npmInspection.stderr,
        }),
        userConfig: Object.freeze({
          reportedPath: npmUserConfig.value,
          stdout: npmUserConfig.stdout,
          stderr: npmUserConfig.stderr,
        }),
        globalConfig: Object.freeze({
          reportedPath: npmGlobalConfig.value,
          stdout: npmGlobalConfig.stdout,
          stderr: npmGlobalConfig.stderr,
        }),
        hostConfigurationExcluded: true,
      }),
    },
  });
  return tools;
}

function privateNpmConfigurationEvidence(configuration, npmInspection) {
  const state = PRIVATE_NPM_CONFIGURATION_STATES.get(configuration);
  const validated = validatePrivateNpmConfiguration(configuration);
  requireCondition(
    npmInspection &&
      npmInspection.userConfig.reportedPath === validated.user.path &&
      npmInspection.globalConfig.reportedPath === validated.global.path &&
      npmInspection.hostConfigurationExcluded === true,
    "Private npm inspection evidence differs from the enforced configuration.",
  );
  requireCondition(
    state.spawnValidations.length > 0,
    "Private npm configuration has no pre-spawn validation evidence.",
  );
  return {
    apiVersion: "swecircuit/release-review-npm-configuration/v1alpha1",
    kind: "ReleaseReviewPrivateNpmConfigurationEvidence",
    policy: PRIVATE_NPM_CONFIGURATION_POLICY,
    operationRoot: state.operationRoot,
    userConfig: validated.user,
    globalConfig: validated.global,
    pathsDistinctCaseInsensitively: true,
    containedByExactOperationRoot: true,
    outsideRepositoryCandidateAndCache: true,
    hostConfigurationExcluded: true,
    npmInspection,
    preSpawnValidation: {
      everySpawnValidated: true,
      count: state.spawnValidations.length,
      events: state.spawnValidations.map((event) => ({ ...event })),
    },
  };
}

function gitResult(tools, arguments_, options = {}) {
  const npmConfiguration = options.npmConfiguration ?? tools[TOOL_NPM_CONFIGURATION];
  return run(tools.git.path, arguments_, {
    cwd: options.cwd ?? ROOT,
    environment:
      options.environment ?? closedEnvironment(tools, tools.cache, npmConfiguration),
    npmConfiguration,
    label: options.label ?? `Git ${arguments_.join(" ")}`,
    input: options.input,
  });
}

function gitOutput(tools, arguments_, options = {}) {
  return requireRun(gitResult(tools, arguments_, options), options.label ?? "Git command").stdout;
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
    requireCondition(!requested.has(expectedObjectId), "Git blob batch contains a duplicate request.");
    requested.add(expectedObjectId);

    const headerEnd = output.indexOf(10, cursor);
    requireCondition(headerEnd >= cursor, "Git blob batch output is missing a header terminator.");
    const headerBytes = output.subarray(cursor, headerEnd);
    requireCondition(
      headerBytes.every((byte) => byte <= 0x7f),
      "Git blob batch output contains a non-ASCII header.",
    );
    const header = headerBytes.toString("ascii");
    const match = /^([0-9a-f]{40}) blob (0|[1-9][0-9]*)$/.exec(header);
    requireCondition(match !== null, "Git blob batch output contains a malformed header.");
    requireCondition(match[1] === expectedObjectId, "Git blob batch returned an unexpected object.");
    const size = Number(match[2]);
    requireCondition(Number.isSafeInteger(size), "Git blob batch returned an unsafe object size.");
    const contentStart = headerEnd + 1;
    const contentEnd = contentStart + size;
    requireCondition(
      contentEnd < output.byteLength,
      "Git blob batch output is truncated before the object delimiter.",
    );
    requireCondition(output[contentEnd] === 10, "Git blob batch output has an invalid object delimiter.");
    blobs.set(expectedObjectId, Buffer.from(output.subarray(contentStart, contentEnd)));
    cursor = contentEnd + 1;
  }

  requireCondition(cursor === output.byteLength, "Git blob batch output contains trailing bytes.");
  return blobs;
}

function candidateBlobBytes(tools, objectIds, gitExecutor = gitOutput) {
  const uniqueObjectIds = [...new Set(objectIds)].sort(compareOrdinal);
  requireCondition(uniqueObjectIds.length > 0, "Candidate tree has no blobs.");
  const input = Buffer.from(`${uniqueObjectIds.join("\n")}\n`, "ascii");
  const output = gitExecutor(tools, ["cat-file", "--batch"], {
    input,
    label: "Git candidate blob batch",
  });
  return parseGitBlobBatch(uniqueObjectIds, output);
}

function candidateSource(tools, checkpoint, gitExecutor = gitOutput) {
  requireCondition(CANDIDATE_PATTERN.test(checkpoint), "Candidate must be an exact lowercase commit ID.");
  const commit = strictUtf8(
    gitExecutor(tools, ["rev-parse", "--verify", `${checkpoint}^{commit}`]),
    "Candidate commit",
  ).trim();
  requireCondition(commit === checkpoint, "Candidate commit identity mismatch.");
  const tree = strictUtf8(
    gitExecutor(tools, ["rev-parse", "--verify", `${checkpoint}^{tree}`]),
    "Candidate tree",
  ).trim();
  const records = nulRecords(
    gitExecutor(tools, ["ls-tree", "-rz", "--full-tree", checkpoint]),
    "Candidate tree listing",
  );
  const aliases = new Set();
  const entries = records.map((record) => {
    const tab = record.indexOf(9);
    requireCondition(tab > 0 && tab < record.byteLength - 1, "Candidate tree entry is malformed.");
    const match = /^(100644|100755) blob ([0-9a-f]{40})$/.exec(
      record.subarray(0, tab).toString("ascii"),
    );
    requireCondition(match !== null, "Candidate tree must contain only regular files.");
    const safe = safeTreePath(record.subarray(tab + 1));
    requireCondition(!aliases.has(safe.alias), `Candidate tree path alias collision: ${safe.path}.`);
    aliases.add(safe.alias);
    return { mode: match[1], objectId: match[2], ...safe };
  });
  entries.sort((left, right) => compareOrdinal(left.path, right.path));
  requireCondition(entries.length > 0, "Candidate tree is empty.");
  const blobs = candidateBlobBytes(
    tools,
    entries.map((entry) => entry.objectId),
    gitExecutor,
  );
  for (const entry of entries) {
    entry.bytes = Buffer.from(blobs.get(entry.objectId));
  }
  const hash = createHash("sha256");
  updateFrame(hash, Buffer.from(MATERIALIZATION_DOMAIN, "utf8"));
  let bytes = 0;
  for (const entry of entries) {
    bytes += entry.bytes.byteLength;
    updateFrame(hash, Buffer.from(entry.mode, "ascii"));
    updateFrame(hash, Buffer.from(entry.path, "utf8"));
    updateFrame(hash, entry.bytes);
  }
  return {
    commit,
    tree,
    entries,
    binding: {
      commit,
      tree,
      files: entries.length,
      bytes,
      digest: `sha256:${hash.digest("hex")}`,
    },
  };
}

function candidateFileBinding(source, path, mediaType = "text/javascript") {
  const entry = source.entries.find((item) => item.path === path);
  requireCondition(entry, `Candidate lacks required tooling blob: ${path}.`);
  return {
    path,
    mediaType,
    mode: entry.mode,
    objectId: entry.objectId,
    bytes: entry.bytes.byteLength,
    digest: digest(entry.bytes),
  };
}

async function authenticateLiveTooling(source, parentExpectation) {
  const bindings = {
    parent: candidateFileBinding(source, PARENT_REPOSITORY_PATH),
    harness: candidateFileBinding(source, HARNESS_REPOSITORY_PATH),
    verifier: candidateFileBinding(source, VERIFIER_REPOSITORY_PATH),
  };
  requireCondition(
    bindings.parent.digest === parentExpectation,
    "Externally declared parent digest does not match the candidate parent blob.",
  );
  for (const [name, binding] of Object.entries(bindings)) {
    const path = name === "parent" ? SCRIPT_PATH : absoluteRepositoryPath(binding.path);
    const bytes = await readFile(path);
    requireCondition(
      bytes.byteLength === binding.bytes && digest(bytes) === binding.digest,
      `Live ${name} bytes do not match candidate Git blob ${binding.path}.`,
    );
  }
  return bindings;
}

function inspectRepository(tools, checkpoint) {
  const head = strictUtf8(gitOutput(tools, ["rev-parse", "--verify", "HEAD"]), "Repository HEAD").trim();
  const diff = gitResult(tools, ["diff", "--quiet", "HEAD", "--"]);
  requireCondition(diff.status === 0 || diff.status === 1, "Unable to inspect tracked repository state.");
  requireCondition(head === checkpoint, `Candidate checkpoint mismatch: HEAD is ${head}.`);
  requireCondition(diff.status === 0, "Refusing release review with tracked repository changes.");
  return { head, trackedState: "clean" };
}

function materializedPath(root, entry) {
  const target = resolve(root, ...entry.segments);
  requireCondition(isContainedPath(root, target), `Candidate path escapes materialization: ${entry.path}.`);
  return target;
}

async function materializeCandidate(source, root) {
  await mkdir(root, { recursive: false });
  for (const entry of source.entries) {
    const target = materializedPath(root, entry);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, entry.bytes, {
      flag: "wx",
      mode: entry.mode === "100755" ? 0o755 : 0o644,
    });
  }
  const inspected = sourceInspection(
    source,
    await inspectCandidateFiles(root, source.entries),
  );
  requireCondition(
    JSON.stringify(inspected) === JSON.stringify(source.binding),
    "Candidate materialization does not match exact Git blobs.",
  );
}

async function inspectCandidateFiles(root, entries) {
  const hash = createHash("sha256");
  updateFrame(hash, Buffer.from(MATERIALIZATION_DOMAIN, "utf8"));
  let bytes = 0;
  for (const entry of entries) {
    const target = materializedPath(root, entry);
    const stats = await lstat(target);
    requireCondition(
      stats.isFile() && !stats.isSymbolicLink() && stats.nlink === 1,
      `Candidate materialization is not a plain file: ${entry.path}.`,
    );
    const resolved = await realpath(target);
    requireCondition(isContainedPath(await realpath(root), resolved), `Candidate realpath escapes: ${entry.path}.`);
    if (process.platform !== "win32") {
      const executable = (stats.mode & 0o111) !== 0;
      requireCondition(
        executable === (entry.mode === "100755"),
        `Candidate materialization mode changed: ${entry.path}.`,
      );
    }
    const content = await readFile(target);
    requireCondition(content.equals(entry.bytes), `Candidate materialization changed: ${entry.path}.`);
    bytes += content.byteLength;
    updateFrame(hash, Buffer.from(entry.mode, "ascii"));
    updateFrame(hash, Buffer.from(entry.path, "utf8"));
    updateFrame(hash, content);
  }
  return {
    commit: candidate,
    tree: null,
    files: entries.length,
    bytes,
    digest: `sha256:${hash.digest("hex")}`,
  };
}

function sourceInspection(source, inspected) {
  return { ...inspected, commit: source.commit, tree: source.tree };
}

async function inspectClosure(root, options = {}) {
  const label = options.label ?? "closure";
  const allowSymlinks = options.allowSymlinks === true;
  const rootStats = await lstat(root);
  requireCondition(rootStats.isDirectory() && !rootStats.isSymbolicLink(), `${label} root is not a plain directory.`);
  const rootReal = await realpath(root);
  const records = [];
  let files = 0;
  let directories = 0;
  let links = 0;
  let bytes = 0;
  async function visit(directory, prefix) {
    const children = await readdir(directory, { withFileTypes: true });
    children.sort((left, right) => compareOrdinal(left.name, right.name));
    for (const child of children) {
      const relativePath = prefix ? `${prefix}/${child.name}` : child.name;
      const path = join(directory, child.name);
      const stats = await lstat(path);
      if (stats.isSymbolicLink()) {
        requireCondition(allowSymlinks, `${label} contains a symbolic link: ${relativePath}.`);
        const targetReal = await realpath(path);
        requireCondition(isContainedPath(rootReal, targetReal), `${label} link escapes closure: ${relativePath}.`);
        const target = (await readlink(path)).replaceAll("\\", "/");
        records.push({ kind: "link", path: relativePath, target });
        links += 1;
      } else if (stats.isDirectory()) {
        const directoryReal = await realpath(path);
        requireCondition(isContainedPath(rootReal, directoryReal), `${label} directory escapes closure: ${relativePath}.`);
        records.push({ kind: "directory", path: relativePath });
        directories += 1;
        await visit(path, relativePath);
      } else {
        requireCondition(
          stats.isFile() && stats.nlink === 1,
          `${label} contains a non-regular or hard-linked file: ${relativePath}.`,
        );
        const fileReal = await realpath(path);
        requireCondition(isContainedPath(rootReal, fileReal), `${label} file escapes closure: ${relativePath}.`);
        const content = await readFile(path);
        records.push({ kind: "file", path: relativePath, bytes: content.byteLength, digest: digest(content) });
        files += 1;
        bytes += content.byteLength;
      }
    }
  }
  await visit(root, "");
  return {
    files,
    directories,
    links,
    bytes,
    digest: domainDigest(CLOSURE_DOMAIN, records),
  };
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

function packageRuntimeIdentity(platform = process.platform, architecture = process.arch, report = null) {
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

function validateLockSupply(lockBytes, runtime = packageRuntimeIdentity()) {
  const lock = JSON.parse(strictUtf8(lockBytes, "package-lock.json"));
  requireCondition(
    Number.isInteger(lock.lockfileVersion) && lock.lockfileVersion >= 2 && lock.packages,
    "Exact lockfile lacks a supported packages inventory.",
  );
  const { platform, architecture, libc } = runtime;
  const packages = [];
  for (const [path, entry] of Object.entries(lock.packages)) {
    if (path === "") {
      continue;
    }
    requireCondition(path.startsWith("node_modules/"), `Locked package path is not registry-owned: ${path}.`);
    safeTreePath(Buffer.from(path, "utf8"));
    requireCondition(entry && typeof entry === "object" && entry.link !== true, `Locked package is linked: ${path}.`);
    requireCondition(typeof entry.resolved === "string", `Locked package lacks registry URL: ${path}.`);
    const resolved = new URL(entry.resolved);
    requireCondition(
      resolved.protocol === "https:" && resolved.hostname === "registry.npmjs.org" && resolved.pathname.endsWith(".tgz"),
      `Locked package uses non-registry supply: ${path}.`,
    );
    requireCondition(
      typeof entry.integrity === "string" && /^sha(?:256|384|512)-[A-Za-z0-9+/]+={0,2}$/u.test(entry.integrity),
      `Locked package lacks valid SRI: ${path}.`,
    );
    requireCondition(typeof entry.version === "string" && entry.version.length > 0, `Locked package lacks version: ${path}.`);
    packages.push({
      path,
      version: entry.version,
      resolved: entry.resolved,
      integrity: entry.integrity,
      optional: entry.optional === true,
      applies: packageApplies(entry, platform, architecture, libc),
    });
  }
  packages.sort((left, right) => compareOrdinal(left.path, right.path));
  requireCondition(packages.length > 0, "Exact lockfile has no installed package supply.");
  return {
    lockfileVersion: lock.lockfileVersion,
    packages: packages.length,
    digest: domainDigest("swecircuit/release-review-lock-supply/v1alpha1", packages),
    entries: packages,
  };
}

async function validateInstalledSupply(root, lockSupply, packageBytes) {
  const packageJson = JSON.parse(strictUtf8(packageBytes, "package.json"));
  for (const entry of lockSupply.entries) {
    const packageRoot = resolve(root, ...entry.path.split("/"));
    if (!entry.optional || entry.applies) {
      const manifest = JSON.parse(await readFile(join(packageRoot, "package.json"), "utf8"));
      requireCondition(manifest.version === entry.version, `Installed package version mismatch: ${entry.path}.`);
    }
  }
  const privateRequire = createRequire(join(root, "package.json"));
  for (const dependency of Object.keys(packageJson.dependencies ?? {}).sort(compareOrdinal)) {
    const resolved = await realpath(privateRequire.resolve(dependency));
    requireCondition(
      isContainedPath(join(root, "node_modules"), resolved),
      `Bare dependency resolved outside private node_modules: ${dependency}.`,
    );
  }
}

function validateCacheLocation(cache, protectedRoots = [ROOT]) {
  const cacheReal = realpathSync(cache);
  for (const protectedRoot of protectedRoots) {
    requireRealpathDisjointRoots(
      cacheReal,
      protectedRoot,
      `Offline cache and protected root ${protectedRoot}`,
    );
  }
  return cacheReal;
}

function cachePath(environment = process.env) {
  const supplied = suppliedValue(environment, CACHE_ENV);
  requireCondition(
    typeof supplied === "string" && supplied.length > 0,
    `${CACHE_ENV} must be an explicit absolute path.`,
  );
  const value = scalarPathText(supplied, CACHE_ENV);
  requireCondition(isAbsolute(value), `${CACHE_ENV} must be an explicit absolute path.`);
  const resolved = realpathSync(value);
  const stats = lstatSync(resolved);
  requireCondition(
    stats.isDirectory() && !stats.isSymbolicLink(),
    "Offline npm cache must resolve to one plain directory.",
  );
  return validateCacheLocation(resolved);
}

async function installExactSupply(root, tools, cache, lockSupply, packageBytes) {
  const cacheStats = await lstat(cache);
  requireCondition(cacheStats.isDirectory() && !cacheStats.isSymbolicLink(), "Offline npm cache must be a plain directory.");
  requireRealpathDisjointRoots(root, cache, "Offline npm cache");
  const npmConfiguration = tools[TOOL_NPM_CONFIGURATION];
  const environment = closedEnvironment(tools, cache, npmConfiguration);
  const result = run(
    tools.node.path,
    [tools.npm.path, "ci", "--offline", "--ignore-scripts", "--no-audit", "--no-fund", "--cache", cache],
    {
      cwd: root,
      environment,
      npmConfiguration,
      label: "Offline exact-lock npm install",
    },
  );
  requireRun(result, "Offline exact-lock npm install");
  await validateInstalledSupply(root, lockSupply, packageBytes);
  return {
    command: "npm ci --offline --ignore-scripts --no-audit --no-fund",
    stdout: { bytes: result.stdout.byteLength, digest: digest(result.stdout) },
    stderr: { bytes: result.stderr.byteLength, digest: digest(result.stderr) },
    closure: await inspectClosure(join(root, "node_modules"), {
      label: "Installed dependency supply",
      allowSymlinks: true,
    }),
  };
}

async function buildCandidate(root, tools, cache) {
  const entrypoint = join(root, "node_modules", "typescript", "bin", "tsc");
  const binding = await regularFileBinding(entrypoint, "Candidate TypeScript entrypoint", "node_modules/typescript/bin/tsc");
  const manifest = JSON.parse(await readFile(join(root, "node_modules", "typescript", "package.json"), "utf8"));
  const result = run(tools.node.path, [entrypoint, "-p", "tsconfig.json"], {
    cwd: root,
    environment: closedEnvironment(tools, cache, tools[TOOL_NPM_CONFIGURATION]),
    npmConfiguration: tools[TOOL_NPM_CONFIGURATION],
    label: "Candidate-private TypeScript build",
  });
  requireRun(result, "Candidate-private TypeScript build");
  const generated = await inspectClosure(join(root, "dist"), {
    label: "Generated runtime",
    allowSymlinks: false,
  });
  await regularFileBinding(join(root, "dist", "index.js"), "Generated runtime entrypoint", "dist/index.js");
  return {
    typescript: { ...binding, version: manifest.version },
    generated: { entrypoint: "dist/index.js", ...generated },
    stdout: { bytes: result.stdout.byteLength, digest: digest(result.stdout) },
    stderr: { bytes: result.stderr.byteLength, digest: digest(result.stderr) },
  };
}

function runtimeIdentity({
  source,
  tooling,
  lockfile,
  lockSupply,
  installed,
  tools,
  typescript,
  generated,
  policy,
  declarations,
}) {
  return {
    apiVersion: "swecircuit/release-review-runtime/v1alpha1",
    kind: "ReleaseReviewRuntimeBinding",
    candidateCommit: source.commit,
    candidateSource: source.binding,
    tooling,
    lockedSupply: {
      lockfile,
      lockfileVersion: lockSupply.lockfileVersion,
      packages: lockSupply.packages,
      supplyDigest: lockSupply.digest,
      installed,
    },
    toolchain: { node: tools.node, npm: tools.npm, git: tools.git, typescript },
    platform: { platform: process.platform, architecture: process.arch },
    environmentPolicy: policy,
    externalDeclarations: declarations,
    generatedRuntime: generated,
  };
}

function createRuntimeBinding(identity) {
  return { ...identity, runtimeBindingDigest: domainDigest(RUNTIME_BINDING_DOMAIN, identity) };
}

function verifyRuntimeBinding(binding) {
  requireCondition(binding && typeof binding === "object" && !Array.isArray(binding), "Runtime binding must be an object.");
  const keys = [
    "apiVersion",
    "kind",
    "candidateCommit",
    "candidateSource",
    "tooling",
    "lockedSupply",
    "toolchain",
    "platform",
    "environmentPolicy",
    "externalDeclarations",
    "generatedRuntime",
    "runtimeBindingDigest",
  ];
  requireCondition(
    Object.keys(binding).length === keys.length && Object.keys(binding).every((key, index) => key === keys[index]),
    "Runtime binding is not closed and canonical.",
  );
  const identity = Object.fromEntries(keys.slice(0, -1).map((key) => [key, binding[key]]));
  requireCondition(
    DIGEST_PATTERN.test(binding.runtimeBindingDigest) &&
      binding.runtimeBindingDigest === domainDigest(RUNTIME_BINDING_DOMAIN, identity),
    "Runtime binding digest mismatch.",
  );
  return binding.runtimeBindingDigest;
}

function candidateRunPaths(checkpoint) {
  requireCondition(CANDIDATE_PATTERN.test(checkpoint), "Candidate must be an exact lowercase commit ID.");
  const root = `${REVIEW_ROOT}/runs/${checkpoint}`;
  const inputs = `${root}/inputs`;
  return Object.freeze({
    root,
    inputs,
    runtimeBinding: `${inputs}/runtime-binding.json`,
    snapshotRoot: `${inputs}/s`,
    gateEvidenceRoot: `${inputs}/canonical-gate`,
    gateReceiptSnapshot: `${inputs}/canonical-gate/canonical-gate-receipt.json`,
    gateStdoutSnapshot: `${inputs}/canonical-gate/canonical-gate.stdout.log`,
    gateStderrSnapshot: `${inputs}/canonical-gate/canonical-gate.stderr.log`,
    candidateManifest: `${inputs}/candidate.json`,
    preIntegrationReview: `${inputs}/pre-integration-review.md`,
    request: `${root}/request.json`,
    phaseMetadata: `${root}/phase-metadata.json`,
    packageDir: `${root}/package`,
    packageEnvelope: `${root}/package-envelope.json`,
    compilationSummary: `${root}/compilation-summary.json`,
    approval: `${root}/approval.json`,
    handoffs: `${root}/handoffs`,
    handoffVerification: `${root}/handoff-verification.json`,
    parentExecutions: `${root}/parent-executions`,
  });
}

function gatePaths(checkpoint) {
  const root = `${GATE_EVIDENCE_ROOT}/${checkpoint}`;
  return {
    receipt: `${root}/canonical-gate-receipt.json`,
    stdout: `${root}/canonical-gate.stdout.log`,
    stderr: `${root}/canonical-gate.stderr.log`,
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

async function listRegularFiles(root, logicalRoot) {
  if (!(await pathExists(root))) {
    return [];
  }
  const rootStats = await lstat(root);
  requireCondition(rootStats.isDirectory() && !rootStats.isSymbolicLink(), `Seed root is unsafe: ${logicalRoot}.`);
  const files = [];
  async function visit(directory, prefix) {
    const children = await readdir(directory, { withFileTypes: true });
    children.sort((left, right) => compareOrdinal(left.name, right.name));
    for (const child of children) {
      const local = prefix ? `${prefix}/${child.name}` : child.name;
      const logical = `${logicalRoot}/${local}`;
      safeTreePath(Buffer.from(logical, "utf8"));
      const path = join(directory, child.name);
      const stats = await lstat(path);
      if (stats.isDirectory() && !stats.isSymbolicLink()) {
        await visit(path, local);
      } else {
        requireCondition(
          stats.isFile() && !stats.isSymbolicLink() && stats.nlink === 1,
          `Seed input is not a plain regular file: ${logical}.`,
        );
        files.push({ logical, bytes: await readFile(path) });
      }
    }
  }
  await visit(root, "");
  return files;
}

async function writePrivate(root, logical, bytes) {
  const target = resolve(root, ...logical.split("/"));
  requireCondition(isContainedPath(root, target), `Private path escapes materialization: ${logical}.`);
  await mkdir(dirname(target), { recursive: true });
  try {
    const existing = await readFile(target);
    requireCondition(existing.equals(bytes), `Seed input conflicts with candidate bytes: ${logical}.`);
  } catch (error) {
    if (!error || typeof error !== "object" || error.code !== "ENOENT") {
      throw error;
    }
    await writeFile(target, bytes, { flag: "wx" });
  }
}

function safeHandoffArgument(value) {
  const path = scalarPathText(value, "Handoff path");
  const segments = path.split("/");
  requireCondition(
    segments.length === 2 &&
      segments[0] === "handoffs" &&
      segments[1].endsWith(".json") &&
      segments[1].length > ".json".length,
    `Unsafe handoff argument: ${String(path)}.`,
  );
  const safe = safeTreePath(Buffer.from(path, "utf8"));
  requireCondition(safe.path === path, "Validated handoff path changed before resolution.");
  return safe;
}

function parsePhaseInputs(requestedMode, arguments_) {
  requireCondition(MODES.has(requestedMode), "Unknown release-review phase.");
  if (requestedMode === "paths") {
    requireCondition(arguments_.length === 0, "paths accepts no positional inputs.");
    return { gateReceiptDigest: null, ownerExpectation: null, handoffs: [] };
  }
  const expectedLength = requestedMode === "approve" ? 3 : requestedMode === "verify" ? null : 1;
  if (expectedLength !== null) {
    requireCondition(
      arguments_.length === expectedLength,
      `${requestedMode} received the wrong number of positional inputs.`,
    );
  } else {
    requireCondition(
      arguments_.length >= 5 && (arguments_.length - 3) % 2 === 0,
      "verify requires a gate digest, owner digest pair, and one or more handoff path/digest pairs.",
    );
  }
  const gateReceiptDigest = arguments_[0];
  requireCondition(DIGEST_PATTERN.test(gateReceiptDigest), "Canonical-gate receipt digest is invalid.");
  const ownerExpectation =
    requestedMode === "approve" || requestedMode === "verify"
      ? { compilationDigest: arguments_[1], packageDigest: arguments_[2] }
      : null;
  if (ownerExpectation) {
    requireCondition(
      DIGEST_PATTERN.test(ownerExpectation.compilationDigest) &&
        DIGEST_PATTERN.test(ownerExpectation.packageDigest),
      "Owner-reviewed compilation/package digest pair is invalid.",
    );
  }
  const handoffs = [];
  if (requestedMode === "verify") {
    const aliases = new Set();
    for (let index = 3; index < arguments_.length; index += 2) {
      const safe = safeHandoffArgument(arguments_[index]);
      const rawDigest = arguments_[index + 1];
      requireCondition(DIGEST_PATTERN.test(rawDigest), `Raw handoff digest is invalid: ${safe.path}.`);
      requireCondition(!aliases.has(safe.alias), `Duplicate raw handoff alias supplied: ${safe.path}.`);
      aliases.add(safe.alias);
      handoffs.push({ path: safe.path, rawDigest });
    }
  }
  return { gateReceiptDigest, ownerExpectation, handoffs };
}

async function readBoundExternalFile(logicalPath, mediaType, expectedDigest = null) {
  safeTreePath(Buffer.from(logicalPath, "utf8"));
  const path = absoluteRepositoryPath(logicalPath);
  const stats = await lstat(path);
  requireCondition(
    stats.isFile() && !stats.isSymbolicLink() && stats.nlink === 1,
    `External input is not one plain file: ${logicalPath}.`,
  );
  const rootReal = await realpath(ROOT);
  const fileReal = await realpath(path);
  requireCondition(isContainedPath(rootReal, fileReal), `External input realpath escapes: ${logicalPath}.`);
  const bytes = await readFile(path);
  const binding = {
    path: logicalPath,
    mediaType,
    bytes: bytes.byteLength,
    digest: digest(bytes),
  };
  if (expectedDigest !== null) {
    requireCondition(binding.digest === expectedDigest, `External input digest mismatch: ${logicalPath}.`);
  }
  return { ...binding, content: Buffer.from(bytes) };
}

function declaredExternalInputPaths(specification, paths, checkpoint) {
  const canonicalGate =
    specification.gateReceiptDigest === null
      ? null
      : [
          {
            path: gatePaths(checkpoint).receipt,
            mediaType: "application/json",
            expectedDigest: specification.gateReceiptDigest,
          },
          {
            path: gatePaths(checkpoint).stdout,
            mediaType: "application/octet-stream",
            expectedDigest: null,
          },
          {
            path: gatePaths(checkpoint).stderr,
            mediaType: "application/octet-stream",
            expectedDigest: null,
          },
        ];
  const handoffs = specification.handoffs.map((entry) => ({
    requestedPath: entry.path,
    path: `${paths.root}/${entry.path}`,
    mediaType: "application/json",
    expectedDigest: entry.rawDigest,
  }));
  return { canonicalGate, handoffs };
}

function createStableReconstructionBinding(expectedParentDigest, cache, canonicalGate) {
  requireCondition(DIGEST_PATTERN.test(expectedParentDigest), "Stable reconstruction parent digest is invalid.");
  requireCondition(isAbsolute(cache), "Stable reconstruction cache path must be absolute.");
  const binding = {
    apiVersion: "swecircuit/release-review-stable-reconstruction/v1alpha1",
    kind: "ReleaseReviewStableReconstruction",
    expectedParentDigest,
    offlineCache: {
      path: cache,
      provisioning: "external-host-untrusted-content-offline-only",
    },
    canonicalGate,
    externalHostBoundary:
      "The external host declares the parent digest, provisions the offline cache, preserves canonical-gate bytes, and enforces process isolation; the repository records and revalidates those declarations without authenticating their provenance.",
  };
  return {
    binding,
    digest: domainDigest(STABLE_RECONSTRUCTION_DOMAIN, binding),
  };
}

function createPhaseAuthorityBinding(phase, ownerExpectation = null, handoffs = []) {
  requireCondition(PHASE_PREFIXES[phase] !== undefined, `Unknown authority phase: ${phase}.`);
  const ownerRequired = phase === "approve" || phase === "verify";
  requireCondition(
    ownerRequired === (ownerExpectation !== null),
    `Phase ${phase} has invalid owner authority.`,
  );
  if (ownerExpectation !== null) {
    requireCondition(
      DIGEST_PATTERN.test(ownerExpectation.compilationDigest) &&
        DIGEST_PATTERN.test(ownerExpectation.packageDigest),
      `Phase ${phase} owner authority is invalid.`,
    );
  }
  requireCondition(
    Array.isArray(handoffs) && (phase === "verify" ? handoffs.length > 0 : handoffs.length === 0),
    `Phase ${phase} has invalid raw-handoff authority.`,
  );
  const aliases = new Set();
  for (const handoff of handoffs) {
    const safe = safeHandoffArgument(handoff.requestedPath);
    requireCondition(safe.path === handoff.requestedPath, "Phase authority changed a handoff path.");
    requireCondition(!aliases.has(safe.alias), `Duplicate phase-authority handoff alias: ${safe.path}.`);
    aliases.add(safe.alias);
    requireCondition(
      DIGEST_PATTERN.test(handoff.digest) &&
        Number.isSafeInteger(handoff.bytes) &&
        handoff.bytes >= 0,
      `Phase authority handoff binding is invalid: ${safe.path}.`,
    );
  }
  const binding = {
    apiVersion: "swecircuit/release-review-phase-authority/v1alpha1",
    kind: "ReleaseReviewPhaseAuthority",
    phase,
    ownerExpectation,
    handoffs,
  };
  return { binding, digest: domainDigest(PHASE_AUTHORITY_DOMAIN, binding) };
}

async function captureStableReconstructionInputs(
  specification,
  checkpoint,
  parentExpectation,
  cache,
) {
  const files = [];
  const declared = declaredExternalInputPaths(
    specification,
    candidateRunPaths(checkpoint),
    checkpoint,
  );
  let canonicalGate = null;
  if (declared.canonicalGate !== null) {
    const captured = [];
    for (const input of declared.canonicalGate) {
      captured.push(await readBoundExternalFile(input.path, input.mediaType, input.expectedDigest));
    }
    files.push(...captured);
    canonicalGate = {
      expectedReceiptDigest: specification.gateReceiptDigest,
      files: captured.map(({ content: _content, ...binding }) => binding),
    };
  }
  return {
    ...createStableReconstructionBinding(
      parentExpectation,
      cache,
      canonicalGate,
    ),
    files,
  };
}

async function captureRequestedAuthority(specification, paths, checkpoint, requestedMode) {
  const declared = declaredExternalInputPaths(specification, paths, checkpoint);
  const files = [];
  const handoffs = [];
  for (const requested of declared.handoffs) {
    const file = await readBoundExternalFile(
      requested.path,
      requested.mediaType,
      requested.expectedDigest,
    );
    files.push(file);
    handoffs.push({
      requestedPath: requested.requestedPath,
      ...Object.fromEntries(Object.entries(file).filter(([key]) => key !== "content")),
    });
  }
  return {
    ...createPhaseAuthorityBinding(requestedMode, specification.ownerExpectation, handoffs),
    files,
  };
}

function authorityForChildPhase(phase, requestedAuthority) {
  const ownerExpectation =
    phase === "approve" || phase === "verify"
      ? requestedAuthority.binding.ownerExpectation
      : null;
  const handoffs = phase === "verify" ? requestedAuthority.binding.handoffs : [];
  return {
    ...createPhaseAuthorityBinding(phase, ownerExpectation, handoffs),
    files: phase === "verify" ? requestedAuthority.files : [],
  };
}

async function materializeInputFiles(candidateRoot, inputSet) {
  for (const file of inputSet.files) {
    await writePrivate(candidateRoot, file.path, file.content);
  }
}

async function verifyInputFiles(candidateRoot, inputSet, label) {
  for (const file of inputSet.files) {
    const bytes = await readFile(resolve(candidateRoot, ...file.path.split("/")));
    requireCondition(
      bytes.byteLength === file.bytes && digest(bytes) === file.digest,
      `${label} changed during private execution: ${file.path}.`,
    );
  }
  return inputSet.files.map(({ content: _content, ...binding }) => binding);
}
async function treeInventory(root) {
  const inventory = new Map();
  async function visit(directory, prefix) {
    const children = await readdir(directory, { withFileTypes: true });
    children.sort((left, right) => compareOrdinal(left.name, right.name));
    for (const child of children) {
      const local = prefix ? `${prefix}/${child.name}` : child.name;
      const path = join(directory, child.name);
      const stats = await lstat(path);
      const kind = stats.isSymbolicLink() ? "link" : stats.isDirectory() ? "directory" : stats.isFile() ? "file" : "other";
      requireCondition(kind !== "other", `Private tree contains unsupported entry: ${local}.`);
      inventory.set(local, kind);
      if (kind === "directory") {
        await visit(path, local);
      }
    }
  }
  await visit(root, "");
  return inventory;
}

async function detailedTreeInventory(root) {
  const rootReal = await realpath(root);
  const aliases = new Set();
  const records = new Map();
  async function visit(directory, prefix) {
    const children = await readdir(directory, { withFileTypes: true });
    children.sort((left, right) => compareOrdinal(left.name, right.name));
    for (const child of children) {
      const local = prefix ? `${prefix}/${child.name}` : child.name;
      const safe = safeTreePath(Buffer.from(local, "utf8"));
      requireCondition(!aliases.has(safe.alias), `Private tree path alias collision: ${local}.`);
      aliases.add(safe.alias);
      const path = join(directory, child.name);
      const stats = await lstat(path);
      if (stats.isSymbolicLink()) {
        const targetReal = await realpath(path);
        requireCondition(isContainedPath(rootReal, targetReal), `Private tree link escapes: ${local}.`);
        records.set(local, {
          kind: "link",
          target: (await readlink(path)).replaceAll("\\", "/"),
        });
      } else if (stats.isDirectory()) {
        const directoryReal = await realpath(path);
        requireCondition(isContainedPath(rootReal, directoryReal), `Private tree directory escapes: ${local}.`);
        records.set(local, { kind: "directory" });
        await visit(path, local);
      } else {
        requireCondition(
          stats.isFile() && stats.nlink === 1,
          `Private tree contains a non-regular or hard-linked file: ${local}.`,
        );
        const fileReal = await realpath(path);
        requireCondition(isContainedPath(rootReal, fileReal), `Private tree file escapes: ${local}.`);
        const bytes = await readFile(path);
        records.set(local, {
          kind: "file",
          bytes: bytes.byteLength,
          digest: digest(bytes),
        });
      }
    }
  }
  await visit(root, "");
  return records;
}

function addExpectedPath(expected, path, binding) {
  safeTreePath(Buffer.from(path, "utf8"));
  expected.set(path, binding);
  const segments = path.split("/");
  for (let index = 1; index < segments.length; index += 1) {
    const directory = segments.slice(0, index).join("/");
    const prior = expected.get(directory);
    requireCondition(
      prior === undefined || prior.kind === "directory",
      `Expected private path conflicts with a file: ${directory}.`,
    );
    expected.set(directory, { kind: "directory" });
  }
}

function closurePath(path, root) {
  return path === root || path.startsWith(`${root}/`);
}

async function inspectClosedPrivateState({
  candidateRoot,
  source,
  installed = null,
  generated = null,
  runtimeBindingFile = null,
  stableReconstruction = null,
  phaseAuthority = null,
  phaseOutputs = [],
}) {
  const inspectedSource = sourceInspection(source, await inspectCandidateFiles(candidateRoot, source.entries));
  requireCondition(JSON.stringify(inspectedSource) === JSON.stringify(source.binding), "Candidate source closure changed.");

  if (installed !== null) {
    const installedAfter = await inspectClosure(join(candidateRoot, "node_modules"), {
      label: "Installed dependency supply",
      allowSymlinks: true,
    });
    requireCondition(JSON.stringify(installedAfter) === JSON.stringify(installed), "Installed dependency supply changed.");
  }
  if (generated !== null) {
    const generatedAfter = await inspectClosure(join(candidateRoot, "dist"), {
      label: "Generated runtime",
      allowSymlinks: false,
    });
    const { entrypoint: _entrypoint, ...generatedClosure } = generated;
    requireCondition(JSON.stringify(generatedAfter) === JSON.stringify(generatedClosure), "Generated runtime changed.");
  }

  const expected = new Map();
  for (const entry of source.entries) {
    addExpectedPath(expected, entry.path, {
      kind: "file",
      bytes: entry.bytes.byteLength,
      digest: digest(entry.bytes),
    });
  }
  if (runtimeBindingFile !== null) {
    addExpectedPath(expected, runtimeBindingFile.path, {
      kind: "file",
      bytes: runtimeBindingFile.bytes,
      digest: runtimeBindingFile.digest,
    });
  }
  for (const inputSet of [stableReconstruction, phaseAuthority]) {
    for (const file of inputSet?.files ?? []) {
      addExpectedPath(expected, file.path, {
        kind: "file",
        bytes: file.bytes,
        digest: file.digest,
      });
    }
  }
  for (const output of phaseOutputs) {
    addExpectedPath(expected, output.path, {
      kind: "file",
      bytes: output.bytes.byteLength,
      digest: digest(output.bytes),
    });
  }

  const actual = await detailedTreeInventory(candidateRoot);
  for (const [path, binding] of actual) {
    if (
      (installed !== null && closurePath(path, "node_modules")) ||
      (generated !== null && closurePath(path, "dist"))
    ) {
      continue;
    }
    const expectedBinding = expected.get(path);
    requireCondition(expectedBinding !== undefined, `Private tree contains undeclared state: ${path}.`);
    requireCondition(
      JSON.stringify(binding) === JSON.stringify(expectedBinding),
      `Private tree binding changed: ${path}.`,
    );
  }
  for (const [path, binding] of expected) {
    if (
      (installed !== null && closurePath(path, "node_modules")) ||
      (generated !== null && closurePath(path, "dist"))
    ) {
      continue;
    }
    requireCondition(
      JSON.stringify(actual.get(path)) === JSON.stringify(binding),
      `Private tree is missing declared state: ${path}.`,
    );
  }
  if (installed === null) {
    requireCondition(!actual.has("node_modules"), "Private dependency supply appeared before installation.");
  }
  if (generated === null) {
    requireCondition(!actual.has("dist"), "Generated runtime appeared before the authenticated build.");
  }

  const records = [...actual.entries()].map(([path, binding]) => ({ path, ...binding }));
  return {
    candidateSource: inspectedSource,
    entries: records.length,
    digest: domainDigest(PRIVATE_STATE_DOMAIN, records),
  };
}

function allowedOutputPrefixes(requestedMode, paths) {
  if (requestedMode === "prepare") {
    return [paths.snapshotRoot, paths.gateEvidenceRoot];
  }
  if (requestedMode === "compile") {
    return [paths.packageDir];
  }
  return [];
}

function allowedOutputFiles(requestedMode, paths) {
  const common = [paths.runtimeBinding];
  if (requestedMode === "prepare") {
    return new Set([
      ...common,
      paths.candidateManifest,
      paths.preIntegrationReview,
      paths.request,
      paths.phaseMetadata,
    ]);
  }
  if (requestedMode === "compile") {
    return new Set([...common, paths.packageEnvelope, paths.compilationSummary]);
  }
  if (requestedMode === "approve") {
    return new Set([...common, paths.approval]);
  }
  if (requestedMode === "verify") {
    return new Set([...common, paths.handoffVerification]);
  }
  return new Set(common);
}

function isAllowedOutputFile(path, requestedMode, paths) {
  return (
    allowedOutputFiles(requestedMode, paths).has(path) ||
    allowedOutputPrefixes(requestedMode, paths).some((prefix) => path.startsWith(`${prefix}/`))
  );
}

function assertOutputDelta(before, after, requestedMode, paths) {
  for (const [path, kind] of before) {
    requireCondition(after.get(path) === kind, `Candidate removed or changed private entry type: ${path}.`);
  }
  for (const [path, kind] of after) {
    if (before.has(path)) {
      continue;
    }
    if (kind === "directory") {
      requireCondition(
        path === paths.root ||
          path === paths.inputs ||
          isContainedPath(paths.root.replaceAll("/", sep), path.replaceAll("/", sep)) ||
          allowedOutputPrefixes(requestedMode, paths).some(
            (prefix) => prefix === path || prefix.startsWith(`${path}/`) || path.startsWith(`${prefix}/`),
          ),
        `Candidate created an unexpected directory: ${path}.`,
      );
    } else {
      requireCondition(kind === "file" && isAllowedOutputFile(path, requestedMode, paths), `Candidate created an unexpected output: ${path}.`);
    }
  }
}

async function collectPhaseOutputs(candidateRoot, requestedMode, paths) {
  const files = await listRegularFiles(resolve(candidateRoot, ...paths.root.split("/")), paths.root);
  const outputs = files
    .filter((entry) => isAllowedOutputFile(entry.logical, requestedMode, paths))
    .map((entry) => ({ path: entry.logical, bytes: entry.bytes }));
  const outputPaths = new Set(outputs.map((entry) => entry.path));
  for (const required of allowedOutputFiles(requestedMode, paths)) {
    requireCondition(outputPaths.has(required), `Candidate did not produce required phase output: ${required}.`);
  }
  if (requestedMode === "prepare") {
    requireCondition(outputs.some((entry) => entry.path.startsWith(`${paths.snapshotRoot}/`)), "Prepare produced no source snapshots.");
  }
  if (requestedMode === "compile") {
    requireCondition(outputs.some((entry) => entry.path.startsWith(`${paths.packageDir}/`)), "Compile produced no package files.");
  }
  outputs.sort((left, right) => compareOrdinal(left.path, right.path));
  return outputs;
}

async function createGitContext(operationRoot, candidateRoot, checkpoint, tools, cache) {
  const npmConfiguration = tools[TOOL_NPM_CONFIGURATION];
  const base = closedEnvironment(tools, cache, npmConfiguration);
  const common = strictUtf8(
    gitOutput(tools, ["rev-parse", "--path-format=absolute", "--git-common-dir"], { environment: base }),
    "Source Git common directory",
  ).trim();
  requireCondition(isAbsolute(common), "Source Git common directory is not absolute.");
  const gitRoot = join(operationRoot, "git");
  requireRun(
    run(tools.git.path, ["clone", "--bare", "--shared", "--quiet", "--", common, gitRoot], {
      environment: base,
      npmConfiguration,
      label: "Disposable Git clone",
    }),
    "Disposable Git clone",
  );
  const environment = closedEnvironment(tools, cache, npmConfiguration, {
    GIT_CEILING_DIRECTORIES: operationRoot,
    GIT_DIR: gitRoot,
    GIT_INDEX_FILE: join(gitRoot, "candidate.index"),
    GIT_OPTIONAL_LOCKS: "0",
    GIT_WORK_TREE: candidateRoot,
  });
  const setup = { ...environment };
  delete setup.GIT_OPTIONAL_LOCKS;
  for (const [label, arguments_] of [
    ["Git non-bare configuration", ["config", "core.bare", "false"]],
    ["Git long-path configuration", ["config", "core.longpaths", "true"]],
    ["Git candidate ref", ["update-ref", "refs/heads/candidate", checkpoint]],
    ["Git candidate HEAD", ["symbolic-ref", "HEAD", "refs/heads/candidate"]],
    ["Git candidate index", ["read-tree", checkpoint]],
  ]) {
    requireRun(
      run(tools.git.path, arguments_, {
        cwd: candidateRoot,
        environment: setup,
        npmConfiguration,
        label,
      }),
      label,
    );
  }
  inspectGitContext({ root: gitRoot, worktree: candidateRoot, environment, tools }, checkpoint);
  return { root: gitRoot, worktree: candidateRoot, environment, tools };
}

function parseGitChangedPaths(output, label) {
  const aliases = new Set();
  const paths = nulRecords(output, label).map((record) => {
    const safe = safeTreePath(record);
    requireCondition(!aliases.has(safe.alias), `${label} contains a duplicate path.`);
    aliases.add(safe.alias);
    return safe.path;
  });
  paths.sort(compareOrdinal);
  return paths;
}

function gitTrackedStatePaths(context) {
  const inspect = (arguments_, label) =>
    parseGitChangedPaths(
      gitOutput(context.tools, arguments_, {
        cwd: context.worktree,
        environment: context.environment,
        label,
      }),
      label,
    );
  return {
    combined: inspect(
      ["diff", "--no-ext-diff", "--no-textconv", "--name-only", "-z", "HEAD", "--"],
      "Disposable Git combined changed paths",
    ),
    index: inspect(
      ["diff", "--no-ext-diff", "--no-textconv", "--name-only", "-z", "--cached", "HEAD", "--"],
      "Disposable Git index changed paths",
    ),
    worktree: inspect(
      ["diff", "--no-ext-diff", "--no-textconv", "--name-only", "-z", "--"],
      "Disposable Git worktree changed paths",
    ),
  };
}

function inspectGitContext(context, checkpoint) {
  const longPaths = strictUtf8(
    gitOutput(context.tools, ["config", "--bool", "--get", "core.longpaths"], {
      cwd: context.worktree,
      environment: context.environment,
    }),
    "Disposable Git long-path configuration",
  ).trim();
  const head = strictUtf8(
    gitOutput(context.tools, ["rev-parse", "--verify", "HEAD"], {
      cwd: context.worktree,
      environment: context.environment,
    }),
    "Disposable Git HEAD",
  ).trim();
  const diff = gitResult(
    context.tools,
    ["diff", "--no-ext-diff", "--no-textconv", "--quiet", "HEAD", "--"],
    {
      cwd: context.worktree,
      environment: context.environment,
    },
  );
  requireCondition(longPaths === "true", "Disposable Git context lacks long-path support.");
  requireCondition(head === checkpoint, "Disposable Git context changed candidate HEAD.");
  requireCondition(
    diff.signal === null && (diff.status === 0 || diff.status === 1),
    `Disposable Git tracked-state inspection failed: status=${JSON.stringify(diff.status)}, signal=${JSON.stringify(diff.signal)}, stderr=${JSON.stringify(strictUtf8(diff.stderr, "Disposable Git diff stderr").trim())}.`,
  );
  if (diff.status === 1) {
    requireCondition(
      false,
      `Disposable Git context changed tracked candidate state: ${JSON.stringify(gitTrackedStatePaths(context))}.`,
    );
  }
  return { head, trackedState: "clean" };
}

async function writeRuntimeBinding(candidateRoot, paths, binding) {
  verifyRuntimeBinding(binding);
  const bytes = canonicalJson(binding);
  await writePrivate(candidateRoot, paths.runtimeBinding, bytes);
  return { path: paths.runtimeBinding, bytes: bytes.byteLength, digest: digest(bytes) };
}

function invocationDigest(
  requestedMode,
  checkpoint,
  runtimeBindingDigest,
  stableReconstructionDigest,
  phaseAuthorities,
) {
  const requestedAuthority = phaseAuthorities.at(-1);
  return domainDigest(INVOCATION_DOMAIN, {
    requestedMode,
    candidateCommit: checkpoint,
    runtimeBindingDigest,
    stableReconstructionDigest,
    requestedPhaseAuthorityDigest: requestedAuthority.digest,
    childPhaseAuthorities: phaseAuthorities.map((entry) => ({
      phase: entry.binding.phase,
      digest: entry.digest,
    })),
  });
}

async function writeWorkerContext({
  operationRoot,
  candidateRoot,
  requestedMode,
  phase,
  phaseIndex,
  phaseCount,
  checkpoint,
  binding,
  invocation,
  role,
  stableReconstruction,
  phaseAuthority,
  workerBaseEnvironment,
}) {
  const token = randomBytes(32).toString("hex");
  const path = join(operationRoot, `worker-context-${phaseIndex}-${phase}.json`);
  const environment = {
    ...workerBaseEnvironment,
    [WORKER_CONTEXT_ENV]: path,
    [WORKER_TOKEN_ENV]: token,
  };
  const effectiveEnvironment = effectiveEnvironmentBinding(environment);
  const context = {
    apiVersion: "swecircuit/release-review-worker/v1alpha1",
    kind: "ReleaseReviewWorkerContext",
    role,
    mode: phase,
    requestedMode,
    phaseIndex,
    phaseCount,
    candidateCommit: checkpoint,
    materializationRoot: candidateRoot,
    runtimeBindingPath: resolve(candidateRoot, ...candidateRunPaths(checkpoint).runtimeBinding.split("/")),
    runtimeBindingDigest: binding.runtimeBindingDigest,
    stableReconstruction: stableReconstruction.binding,
    stableReconstructionDigest: stableReconstruction.digest,
    phaseAuthority: phaseAuthority.binding,
    phaseAuthorityDigest: phaseAuthority.digest,
    invocationDigest: invocation,
    tokenDigest: digest(Buffer.from(token, "utf8")),
    effectiveEnvironment,
  };
  await writeFile(path, canonicalJson(context), { flag: "wx" });
  return { path, token, context, environment, effectiveEnvironment };
}
async function verifyProtectedState({
  candidateRoot,
  source,
  installed,
  generated,
  runtimeBindingFile,
  stableReconstruction,
  phaseAuthority,
  phaseOutputs,
  tools,
}) {
  const privateState = await inspectClosedPrivateState({
    candidateRoot,
    source,
    installed,
    generated,
    runtimeBindingFile,
    stableReconstruction,
    phaseAuthority,
    phaseOutputs,
  });
  const verifiedStableReconstruction = await verifyInputFiles(
    candidateRoot,
    stableReconstruction,
    "Stable reconstruction input",
  );
  const verifiedPhaseAuthority = await verifyInputFiles(
    candidateRoot,
    phaseAuthority,
    "Phase-authority input",
  );
  const toolsAfter = {
    node: { ...(await regularFileBinding(tools.node.path, "Node executable")), version: tools.node.version },
    git: { ...(await regularFileBinding(tools.git.path, "Git executable")), version: tools.git.version },
    npm: { ...(await regularFileBinding(tools.npm.path, "npm CLI")), version: tools.npm.version },
    cache: tools.cache,
  };
  requireCondition(JSON.stringify(toolsAfter) === JSON.stringify(tools), "Host toolchain bytes changed during child execution.");
  return {
    privateState,
    stableReconstruction: verifiedStableReconstruction,
    phaseAuthority: verifiedPhaseAuthority,
    tools: toolsAfter,
  };
}

async function stageOutputs(operationRoot, outputs) {
  const stageRoot = join(operationRoot, "stage");
  await mkdir(stageRoot, { recursive: false });
  const staged = [];
  for (const output of outputs) {
    const path = resolve(stageRoot, ...output.path.split("/"));
    requireCondition(isContainedPath(stageRoot, path), `Staged output escapes root: ${output.path}.`);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, output.bytes, { flag: "wx" });
    const verified = await readFile(path);
    requireCondition(verified.equals(output.bytes), `Staged output changed: ${output.path}.`);
    staged.push({ path: output.path, bytes: Buffer.from(verified) });
  }
  return staged;
}

async function inspectPromotionTarget(repositoryRoot, logicalPath, bytes) {
  safeTreePath(Buffer.from(logicalPath, "utf8"));
  const rootReal = await realpath(repositoryRoot);
  const rootStats = await lstat(repositoryRoot);
  requireCondition(
    rootStats.isDirectory() && !rootStats.isSymbolicLink(),
    "Promotion root must be one plain directory.",
  );
  const target = resolve(rootReal, ...logicalPath.split("/"));
  requireCondition(isContainedPath(rootReal, target), `Promotion path escapes repository root: ${logicalPath}.`);

  const segments = logicalPath.split("/");
  let current = rootReal;
  for (const segment of segments.slice(0, -1)) {
    current = join(current, segment);
    try {
      const stats = await lstat(current);
      requireCondition(
        stats.isDirectory() && !stats.isSymbolicLink(),
        `Promotion ancestor is linked or not a directory: ${logicalPath}.`,
      );
      const currentReal = await realpath(current);
      requireCondition(
        isContainedPath(rootReal, currentReal) && currentReal === current,
        `Promotion ancestor has a realpath alias: ${logicalPath}.`,
      );
    } catch (error) {
      if (error && typeof error === "object" && error.code === "ENOENT") {
        break;
      }
      throw error;
    }
  }

  try {
    const stats = await lstat(target);
    requireCondition(
      stats.isFile() && !stats.isSymbolicLink() && stats.nlink === 1,
      `Promotion target is linked or not one regular file: ${logicalPath}.`,
    );
    const targetReal = await realpath(target);
    requireCondition(
      isContainedPath(rootReal, targetReal) && targetReal === target,
      `Promotion target has a realpath alias: ${logicalPath}.`,
    );
    const existing = await readFile(target);
    requireCondition(existing.equals(bytes), `Immutable live output differs: ${logicalPath}.`);
    return {
      path: logicalPath,
      target,
      bytes: Buffer.from(bytes),
      binding: {
        path: logicalPath,
        bytes: bytes.byteLength,
        digest: digest(bytes),
        disposition: "verified-existing",
      },
    };
  } catch (error) {
    if (!error || typeof error !== "object" || error.code !== "ENOENT") {
      throw error;
    }
    return {
      path: logicalPath,
      target,
      bytes: Buffer.from(bytes),
      binding: {
        path: logicalPath,
        bytes: bytes.byteLength,
        digest: digest(bytes),
        disposition: "created",
      },
    };
  }
}

async function preflightPromotionEntriesAtRoot(repositoryRoot, entries) {
  const seen = new Set();
  const plans = [];
  for (const entry of entries) {
    requireCondition(!seen.has(entry.path), `Duplicate promotion path: ${entry.path}.`);
    seen.add(entry.path);
    plans.push(await inspectPromotionTarget(repositoryRoot, entry.path, entry.bytes));
  }
  plans.sort((left, right) => compareOrdinal(left.path, right.path));
  return plans;
}

async function preflightPromotionSetAtRoot(repositoryRoot, entries, completionReceiptPath) {
  const plans = await preflightPromotionEntriesAtRoot(repositoryRoot, entries);
  const receiptIndex = plans.findIndex((entry) => entry.path === completionReceiptPath);
  requireCondition(receiptIndex >= 0, "Promotion set lacks its completion receipt.");
  requireCondition(
    plans.filter((entry) => entry.path === completionReceiptPath).length === 1,
    "Promotion set has an ambiguous completion receipt.",
  );
  const [receipt] = plans.splice(receiptIndex, 1);
  plans.push(receipt);
  return { repositoryRoot: await realpath(repositoryRoot), completionReceiptPath, plans };
}

async function promotePreflightedEntry(repositoryRoot, plan) {
  const refreshed = await inspectPromotionTarget(repositoryRoot, plan.path, plan.bytes);
  requireCondition(
    JSON.stringify(refreshed.binding) === JSON.stringify(plan.binding),
    `Promotion target changed after full-set preflight: ${plan.path}.`,
  );
  if (plan.binding.disposition === "verified-existing") {
    return plan.binding;
  }

  await mkdir(dirname(plan.target), { recursive: true });
  await inspectPromotionTarget(repositoryRoot, plan.path, plan.bytes);
  const temporary = join(
    dirname(plan.target),
    `.${basename(plan.target)}.${plan.binding.digest.slice(7, 23)}.tmp`,
  );
  let handle;
  try {
    handle = await open(temporary, "wx");
    await handle.writeFile(plan.bytes);
    await handle.sync();
    await handle.close();
    handle = undefined;
    await link(temporary, plan.target);
  } finally {
    if (handle) {
      await handle.close().catch(() => {});
    }
    await unlink(temporary).catch((error) => {
      if (!error || typeof error !== "object" || error.code !== "ENOENT") {
        throw error;
      }
    });
  }
  const verified = await inspectPromotionTarget(repositoryRoot, plan.path, plan.bytes);
  requireCondition(
    verified.binding.disposition === "verified-existing",
    `Promoted output did not become one immutable file: ${plan.path}.`,
  );
  return plan.binding;
}

async function promotePreflightedSetAtRoot(preflight, options = {}) {
  const promoted = [];
  const outputPlans = preflight.plans.slice(0, -1);
  const receiptPlan = preflight.plans.at(-1);
  requireCondition(
    receiptPlan?.path === preflight.completionReceiptPath,
    "Completion receipt is not the final promotion entry.",
  );
  for (const plan of outputPlans) {
    promoted.push(await promotePreflightedEntry(preflight.repositoryRoot, plan));
    if (options.failAfterOutputs === promoted.length) {
      throw new Error("Injected promotion failure before completion receipt.");
    }
  }
  for (const plan of outputPlans) {
    await inspectPromotionTarget(preflight.repositoryRoot, plan.path, plan.bytes);
  }
  const receipt = await promotePreflightedEntry(preflight.repositoryRoot, receiptPlan);
  for (const plan of preflight.plans) {
    await inspectPromotionTarget(preflight.repositoryRoot, plan.path, plan.bytes);
  }
  return { outputs: promoted, receipt };
}

async function atomicPromoteBytesAtRoot(repositoryRoot, logicalPath, bytes) {
  const [plan] = await preflightPromotionEntriesAtRoot(repositoryRoot, [
    { path: logicalPath, bytes },
  ]);
  return promotePreflightedEntry(await realpath(repositoryRoot), plan);
}

async function removeOperationRoot(operationRoot) {
  const canonicalRoot = await realpath(operationRoot);
  const parent = await realpath(resolve(tmpdir()));
  const stats = await lstat(operationRoot);
  requireCondition(
    stats.isDirectory() &&
      !stats.isSymbolicLink() &&
      pathAlias(dirname(canonicalRoot)) === pathAlias(parent) &&
      basename(canonicalRoot).startsWith("swr2-"),
    "Refusing to remove an unexpected operation root.",
  );
  await rm(canonicalRoot, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  requireCondition(!(await pathExists(canonicalRoot)), "Operation root cleanup failed.");
}

function receiptPath(paths, requestedMode, invocation) {
  return `${paths.parentExecutions}/${requestedMode}-${invocation.slice(7, 31)}.json`;
}

async function execute() {
  requireCondition(
    MODES.has(mode),
    "Usage: run-v12-release-review.mjs <paths|prepare|compile|approve|verify> <candidate> [closed phase inputs].",
  );
  requireCondition(
    typeof candidate === "string" && CANDIDATE_PATTERN.test(candidate),
    "Candidate must be an exact 40-character lowercase commit ID.",
  );
  const inputSpecification = parsePhaseInputs(mode, phaseArguments);
  const parentExpectation = expectedParentDigest();
  const cache = cachePath();
  const paths = candidateRunPaths(candidate);
  let operationRoot = null;
  let operationRemoved = false;
  let executionError = null;

  try {
    operationRoot = await mkdtemp(join(resolve(tmpdir()), "swr2-"));
    operationRoot = await realpath(operationRoot);
    requireRealpathDisjointRoots(ROOT, operationRoot);
    validateCacheLocation(cache, [ROOT, operationRoot]);
    const npmConfiguration = await createPrivateNpmConfiguration(operationRoot, cache);
    const tools = await resolveHostTools(cache, npmConfiguration);
    const beforeRepository = inspectRepository(tools, candidate);
    const source = candidateSource(tools, candidate);
    const tooling = await authenticateLiveTooling(source, parentExpectation);
    const candidateRootPath = join(operationRoot, "candidate");
    await materializeCandidate(source, candidateRootPath);
    const candidateRoot = await realpath(candidateRootPath);
    requireRealpathDisjointRoots(ROOT, candidateRoot);
    requireNoAncestorNodeModules(candidateRoot);
    const materializedState = await inspectClosedPrivateState({ candidateRoot, source });

    const packageBytes = source.entries.find((entry) => entry.path === "package.json")?.bytes;
    const lockBytes = source.entries.find((entry) => entry.path === "package-lock.json")?.bytes;
    requireCondition(packageBytes && lockBytes, "Candidate package or lockfile is missing.");
    const lockSupply = validateLockSupply(lockBytes);
    const installation = await installExactSupply(candidateRoot, tools, cache, lockSupply, packageBytes);
    const installedState = await inspectClosedPrivateState({
      candidateRoot,
      source,
      installed: installation.closure,
    });

    const build = await buildCandidate(candidateRoot, tools, cache);
    const builtState = await inspectClosedPrivateState({
      candidateRoot,
      source,
      installed: installation.closure,
      generated: build.generated,
    });

    const stableReconstruction = await captureStableReconstructionInputs(
      inputSpecification,
      candidate,
      parentExpectation,
      cache,
    );
    const requestedAuthority = await captureRequestedAuthority(
      inputSpecification,
      paths,
      candidate,
      mode,
    );
    await materializeInputFiles(candidateRoot, stableReconstruction);
    const phases = PHASE_PREFIXES[mode];
    const phaseAuthorities = phases.map((phase) =>
      authorityForChildPhase(phase, requestedAuthority),
    );
    const policy = environmentPolicy(inheritedEnvironment(process.env));
    const declarations = {
      stableReconstructionDigest: stableReconstruction.digest,
      executableTrust: "external-host-observed-entrypoint-bytes-only",
      hostileProcessIsolation: "external-host",
    };
    const identity = runtimeIdentity({
      source,
      tooling,
      lockfile: { path: "package-lock.json", bytes: lockBytes.byteLength, digest: digest(lockBytes) },
      lockSupply,
      installed: installation.closure,
      tools,
      typescript: build.typescript,
      generated: build.generated,
      policy,
      declarations,
    });
    const binding = createRuntimeBinding(identity);
    const runtimeBindingFile = await writeRuntimeBinding(candidateRoot, paths, binding);
    const invocation = invocationDigest(
      mode,
      candidate,
      binding.runtimeBindingDigest,
      stableReconstruction.digest,
      phaseAuthorities,
    );
    const gitContext = await createGitContext(operationRoot, candidateRoot, candidate, tools, cache);
    const phaseOutputMap = new Map();
    const childRoster = [];
    const protectedBoundaries = [];
    let routedNonPass = false;
    let finalChildOutput = null;

    const sealedState = await verifyProtectedState({
      candidateRoot,
      source,
      installed: installation.closure,
      generated: build.generated,
      runtimeBindingFile,
      stableReconstruction,
      phaseAuthority: phaseAuthorities[0],
      phaseOutputs: [],
      tools,
    });
    protectedBoundaries.push({ boundary: "pre-first-child", privateState: sealedState.privateState });

    for (let phaseIndex = 0; phaseIndex < phases.length; phaseIndex += 1) {
      const phase = phases[phaseIndex];
      const role = phase === "verify" ? "verifier" : "harness";
      const phaseAuthority = phaseAuthorities[phaseIndex];
      await materializeInputFiles(candidateRoot, phaseAuthority);
      const phaseOutputsBefore = [...phaseOutputMap.values()];
      requireNoAncestorNodeModules(candidateRoot);
      const protectedBefore = await verifyProtectedState({
        candidateRoot,
        source,
        installed: installation.closure,
        generated: build.generated,
        runtimeBindingFile,
        stableReconstruction,
        phaseAuthority,
        phaseOutputs: phaseOutputsBefore,
        tools,
      });
      const inventoryBefore = await treeInventory(candidateRoot);
      const worker = await writeWorkerContext({
        operationRoot,
        candidateRoot,
        requestedMode: mode,
        phase,
        phaseIndex,
        phaseCount: phases.length,
        checkpoint: candidate,
        binding,
        invocation,
        role,
        stableReconstruction,
        phaseAuthority,
        workerBaseEnvironment: gitContext.environment,
      });
      const childEnvironment = worker.environment;
      const entrypoint = resolve(
        candidateRoot,
        ...(role === "verifier" ? VERIFIER_REPOSITORY_PATH : HARNESS_REPOSITORY_PATH).split("/"),
      );
      const childArguments =
        role === "verifier"
          ? [entrypoint, candidate, ...inputSpecification.handoffs.map((entry) => entry.path)]
          : [entrypoint, phase, candidate];
      const childResult = run(tools.node.path, childArguments, {
        cwd: candidateRoot,
        environment: childEnvironment,
        npmConfiguration: tools[TOOL_NPM_CONFIGURATION],
        label: `Candidate ${phase} child`,
      });
      const phaseRoutedNonPass =
        phase === "verify" && childResult.status === 2 && childResult.signal === null;
      requireCondition(
        (childResult.status === 0 || phaseRoutedNonPass) && childResult.signal === null,
        `Candidate ${phase} child failed before verified routing: ${
          strictUtf8(childResult.stderr, "Candidate child stderr").trim() || "unknown failure"
        }`,
      );
      const childOutput = parseCanonicalJson(childResult.stdout, `Candidate ${phase} child stdout`);
      requireCondition(
        childOutput.runtimeBindingDigest === binding.runtimeBindingDigest &&
          childOutput.stableReconstructionDigest === stableReconstruction.digest &&
          childOutput.phaseAuthorityDigest === phaseAuthority.digest,
        `Candidate ${phase} child did not expose the exact runtime and authority bindings.`,
      );
      if (phase === "verify") {
        requireCondition(
          phaseRoutedNonPass === (childOutput.releaseReady === false),
          "Verifier exit route and releaseReady result disagree.",
        );
      }

      requireNoAncestorNodeModules(candidateRoot);
      const inventoryAfter = await treeInventory(candidateRoot);
      assertOutputDelta(inventoryBefore, inventoryAfter, phase, paths);
      const currentOutputs = await collectPhaseOutputs(candidateRoot, phase, paths);
      for (const output of currentOutputs) {
        const prior = phaseOutputMap.get(output.path);
        requireCondition(
          prior === undefined || prior.bytes.equals(output.bytes),
          `A later phase changed an earlier private output: ${output.path}.`,
        );
        phaseOutputMap.set(output.path, { path: output.path, bytes: Buffer.from(output.bytes) });
      }
      const phaseOutputsAfter = [...phaseOutputMap.values()].sort((left, right) =>
        compareOrdinal(left.path, right.path),
      );
      const protectedAfter = await verifyProtectedState({
        candidateRoot,
        source,
        installed: installation.closure,
        generated: build.generated,
        runtimeBindingFile,
        stableReconstruction,
        phaseAuthority,
        phaseOutputs: phaseOutputsAfter,
        tools,
      });
      const gitAfter = inspectGitContext(gitContext, candidate);
      const childBinding = {
        role,
        phase,
        phaseIndex,
        phaseAuthorityDigest: phaseAuthority.digest,
        processIdentity: domainDigest("swecircuit/release-review-child/v1alpha1", {
          role,
          phase,
          phaseIndex,
          requestedMode: mode,
          candidateCommit: candidate,
          runtimeBindingDigest: binding.runtimeBindingDigest,
          stableReconstructionDigest: stableReconstruction.digest,
          phaseAuthorityDigest: phaseAuthority.digest,
          invocationDigest: invocation,
          effectiveEnvironmentDigest: worker.effectiveEnvironment.contentDigest,
        }),
        entrypoint: role === "verifier" ? tooling.verifier : tooling.harness,
        freshProcess: true,
        effectiveEnvironment: worker.effectiveEnvironment,
        exitCode: childResult.status,
        signal: childResult.signal,
        stdout: { bytes: childResult.stdout.byteLength, digest: digest(childResult.stdout) },
        stderr: { bytes: childResult.stderr.byteLength, digest: digest(childResult.stderr) },
        outputs: currentOutputs.map((entry) => ({
          path: entry.path,
          bytes: entry.bytes.byteLength,
          digest: digest(entry.bytes),
        })),
        gitContext: gitAfter,
      };
      childRoster.push(childBinding);
      protectedBoundaries.push({
        boundary: `phase-${phaseIndex}-${phase}`,
        before: protectedBefore.privateState,
        after: protectedAfter.privateState,
      });
      routedNonPass = phaseRoutedNonPass;
      finalChildOutput = childOutput;
    }

    const outputs = [...phaseOutputMap.values()].sort((left, right) =>
      compareOrdinal(left.path, right.path),
    );
    const staged = await stageOutputs(operationRoot, outputs);
    const outputBindings = staged.map((entry) => ({
      path: entry.path,
      bytes: entry.bytes.byteLength,
      digest: digest(entry.bytes),
    }));
    const afterRepository = inspectRepository(tools, candidate);
    const npmConfigurationEvidence = privateNpmConfigurationEvidence(
      npmConfiguration,
      tools[TOOL_NPM_INSPECTION],
    );
    const outputPlans = await preflightPromotionEntriesAtRoot(ROOT, staged);
    const plannedPromotions = outputPlans.map((entry) => ({
      path: entry.binding.path,
      bytes: entry.binding.bytes,
      digest: entry.binding.digest,
      disposition: "immutable-exact",
    }));
    const receiptLogicalPath = receiptPath(paths, mode, invocation);
    const receipt = {
      apiVersion: "swecircuit/release-review-parent/v1alpha1",
      kind: "ReleaseReviewParentExecutionReceipt",
      phase: mode,
      phasePrefix: phases,
      candidateCommit: candidate,
      runtimeBindingDigest: binding.runtimeBindingDigest,
      stableReconstructionDigest: stableReconstruction.digest,
      requestedPhaseAuthorityDigest: requestedAuthority.digest,
      invocationDigest: invocation,
      repository: { before: beforeRepository, after: afterRepository },
      stableReconstruction: stableReconstruction.binding,
      requestedPhaseAuthority: requestedAuthority.binding,
      childPhaseAuthorities: phaseAuthorities.map((entry) => ({
        phase: entry.binding.phase,
        digest: entry.digest,
      })),
      offlineInstall: {
        command: installation.command,
        lockfile: identity.lockedSupply.lockfile,
        supplyDigest: lockSupply.digest,
        installed: installation.closure,
      },
      privateNpmConfiguration: npmConfigurationEvidence,
      preparationBoundaries: {
        materialized: materializedState,
        installed: installedState,
        built: builtState,
      },
      freshChildRoster: childRoster,
      protectedClosures: protectedBoundaries,
      staging: { strategy: "private-materialization-then-memory", outputs: outputBindings },
      cleanup: {
        candidateMaterializationRemoved: true,
        disposableGitContextRemoved: true,
        privateNpmConfigurationFilesRemoved: true,
        operationRootRemoved: true,
      },
      promotion: {
        strategy: "full-set-preflight-immutable-files-receipt-last",
        outputs: plannedPromotions,
        completionReceipt: receiptLogicalPath,
      },
      externalHostTrust:
        "The repository parent does not authenticate malicious parent code, cache provenance, executables, the operating system, or hostile same-user processes; those remain host responsibilities.",
      result: routedNonPass ? "route" : "pass",
    };
    const receiptBytes = canonicalJson(receipt);
    const fullPreflight = await preflightPromotionSetAtRoot(
      ROOT,
      [...staged, { path: receiptLogicalPath, bytes: receiptBytes }],
      receiptLogicalPath,
    );

    await removeOperationRoot(operationRoot);
    operationRemoved = true;
    const promotion = await promotePreflightedSetAtRoot(fullPreflight);
    const summary = {
      outcome: routedNonPass ? "route" : "pass",
      phase: mode,
      candidateCommit: candidate,
      runtimeBindingDigest: binding.runtimeBindingDigest,
      stableReconstructionDigest: stableReconstruction.digest,
      phaseAuthorityDigest: requestedAuthority.digest,
      parentExecutionReceipt: promotion.receipt,
      child: finalChildOutput,
    };
    process.stdout.write(canonicalJson(summary));
    if (routedNonPass) {
      process.exitCode = 2;
    }
  } catch (error) {
    executionError = error;
    throw error;
  } finally {
    if (operationRoot !== null && !operationRemoved) {
      try {
        await removeOperationRoot(operationRoot);
      } catch (cleanupError) {
        if (executionError !== null) {
          throw new AggregateError(
            [executionError, cleanupError],
            "Release-review execution and operation-root cleanup both failed.",
          );
        }
        throw cleanupError;
      }
    }
  }
}

export const RELEASE_REVIEW_PARENT_TEST_HOOKS = Object.freeze({
  EMPTY_FILE_DIGEST,
  PRIVATE_NPM_CONFIGURATION_POLICY,
  PHASE_PREFIXES,
  assertOutputDelta,
  atomicPromoteBytesAtRoot,
  cachePath,
  candidateBlobBytes,
  candidateRunPaths,
  candidateSource,
  createPrivateNpmConfiguration,
  closedEnvironment,
  createPhaseAuthorityBinding,
  createRuntimeBinding,
  createStableReconstructionBinding,
  detectRuntimeLibc,
  declaredExternalInputPaths,
  effectiveEnvironmentBinding,
  environmentPolicy,
  expectedParentDigest,
  inspectClosedPrivateState,
  inspectClosure,
  inheritedEnvironment,
  privateNpmConfigurationEvidence,
  removeOperationRoot,
  isAllowedOutputFile,
  parsePhaseInputs,
  parseGitBlobBatch,
  parseGitChangedPaths,
  packageApplies,
  pathAlias,
  preflightPromotionEntriesAtRoot,
  preflightPromotionSetAtRoot,
  promotePreflightedSetAtRoot,
  resolveNpmCli,
  packageRuntimeIdentity,
  runWithPrivateNpmConfiguration: run,
  requireDisjointRoots,
  requireNoAncestorNodeModules,
  requireRealpathDisjointRoots,
  safeHandoffArgument,
  safeTreePath,
  scalarPathText,
  validatePrivateNpmConfiguration,
  validateCacheLocation,
  validateLockSupply,
  verifyRuntimeBinding,
});

if (process.argv[1] && resolve(process.argv[1]) === resolve(SCRIPT_PATH)) {
  execute().catch((error) => {
    process.stderr.write(`${normalizedError(error) ?? "Unknown error"}\n`);
    process.exitCode = 1;
  });
}
