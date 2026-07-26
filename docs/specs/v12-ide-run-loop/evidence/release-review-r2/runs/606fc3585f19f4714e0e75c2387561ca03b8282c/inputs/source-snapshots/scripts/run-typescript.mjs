import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstatSync, readFileSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
export const TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY = "SWECIRCUIT_TYPESCRIPT_ENTRYPOINT";

function requireCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function pathIdentity(path) {
  const identity = resolve(path);
  return process.platform === "win32" ? identity.toLowerCase() : identity;
}

function isOutsideRoot(root, path) {
  const fromRoot = relative(realpathSync(root), path);
  return isAbsolute(fromRoot) || fromRoot === ".." || fromRoot.startsWith(`..${sep}`);
}

function authenticateBinding(binding, phase) {
  const stats = lstatSync(binding.path);
  requireCondition(!stats.isSymbolicLink(), `TypeScript binding changed ${phase}.`);
  requireCondition(stats.isFile(), `TypeScript binding changed ${phase}.`);
  requireCondition(
    stats.nlink === binding.nlink && stats.nlink === 1,
    `TypeScript binding changed ${phase}.`,
  );
  requireCondition(
    pathIdentity(realpathSync(binding.path)) === pathIdentity(binding.path),
    `TypeScript binding changed ${phase}.`,
  );
  const bytes = readFileSync(binding.path);
  requireCondition(
    bytes.byteLength === binding.bytes && digest(bytes) === binding.digest,
    `TypeScript binding changed ${phase}.`,
  );
}
export function resolveTypeScriptEntrypointBinding(options = {}) {
  const environment = options.environment ?? process.env;
  const projectRoot = options.projectRoot ?? ROOT;
  const defaultEntrypoint =
    options.defaultEntrypoint ?? join(projectRoot, "node_modules", "typescript", "bin", "tsc");
  const outsidePolicy = options.outsidePolicy ?? "supplied";
  const label = options.label ?? "TypeScript entrypoint";
  requireCondition(
    environment !== null && typeof environment === "object",
    `${label} environment must be an object.`,
  );
  requireCondition(
    outsidePolicy === "supplied" || outsidePolicy === "always" || outsidePolicy === "never",
    `${label} outside policy is invalid.`,
  );

  const supplies = Object.entries(environment)
    .filter(([key]) => key.toLowerCase() === TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY.toLowerCase())
    .map(([, value]) => value);
  requireCondition(
    supplies.length <= 1,
    `${TYPESCRIPT_ENTRYPOINT_ENVIRONMENT_KEY} must be supplied at most once, case-insensitively.`,
  );

  const supplied = supplies.length === 1;
  const value = supplied ? supplies[0] : defaultEntrypoint;
  requireCondition(typeof value === "string" && value.length > 0, `${label} must be non-empty.`);
  requireCondition(isAbsolute(value), `${label} must be absolute.`);

  const selectedStats = lstatSync(value);
  requireCondition(
    !selectedStats.isSymbolicLink(),
    `${label} must not be a symbolic link or junction.`,
  );
  const canonicalPath = realpathSync(value);
  if (supplied) {
    requireCondition(
      pathIdentity(value) === pathIdentity(canonicalPath),
      `${label} must not traverse symbolic-link, junction, or alias path components.`,
    );
  }
  const stats = lstatSync(canonicalPath);
  requireCondition(
    !stats.isSymbolicLink(),
    `${label} target must not be a symbolic link or junction.`,
  );
  requireCondition(stats.isFile(), `${label} must be a plain regular file.`);
  requireCondition(stats.nlink === 1, `${label} must have exactly one filesystem link.`);

  if (outsidePolicy === "always" || (outsidePolicy === "supplied" && supplied)) {
    requireCondition(
      isOutsideRoot(projectRoot, canonicalPath),
      `${label} must resolve outside the candidate source.`,
    );
  }

  const bytes = readFileSync(canonicalPath);
  return Object.freeze({
    path: canonicalPath,
    bytes: bytes.byteLength,
    digest: digest(bytes),
    nlink: stats.nlink,
    supplied,
  });
}

export function observeTypeScriptVersion(binding, options = {}) {
  authenticateBinding(binding, "before version inspection");
  const result = spawnSync(process.execPath, [binding.path, "--version"], {
    cwd: options.cwd ?? ROOT,
    env: options.environment ?? process.env,
    encoding: "utf8",
    windowsHide: true,
  });
  authenticateBinding(binding, "during version inspection");
  requireCondition(
    result.error === undefined,
    `TypeScript version inspection failed: ${result.error}`,
  );
  requireCondition(result.signal === null, "TypeScript version inspection was terminated.");
  requireCondition(result.status === 0, `TypeScript version inspection failed: ${result.stderr}`);
  const version = result.stdout.trim();
  requireCondition(
    /^Version\s+\S+/u.test(version),
    "TypeScript returned an invalid version string.",
  );
  return version;
}

export function executeTypeScript(arguments_, options = {}) {
  requireCondition(
    Array.isArray(arguments_) && arguments_.every((argument) => typeof argument === "string"),
    "TypeScript arguments must be strings.",
  );
  const environment = options.environment ?? process.env;
  const cwd = options.cwd ?? ROOT;
  const binding =
    options.binding ??
    resolveTypeScriptEntrypointBinding({
      environment,
      projectRoot: options.projectRoot ?? ROOT,
      defaultEntrypoint: options.defaultEntrypoint,
      outsidePolicy: options.outsidePolicy,
      label: options.label,
    });
  const version = observeTypeScriptVersion(binding, { cwd, environment });
  const receipt = Object.freeze({
    path: binding.path,
    bytes: binding.bytes,
    digest: binding.digest,
    nlink: binding.nlink,
    supplied: binding.supplied,
    version,
  });
  options.onBinding?.(receipt);

  authenticateBinding(binding, "before compilation");
  const result = spawnSync(process.execPath, [binding.path, ...arguments_], {
    cwd,
    env: environment,
    stdio: options.stdio ?? "inherit",
    encoding: options.encoding,
    windowsHide: true,
  });
  authenticateBinding(binding, "after compilation");
  requireCondition(result.error === undefined, `TypeScript execution failed: ${result.error}`);
  return { binding, receipt, result };
}

function main() {
  const execution = executeTypeScript(process.argv.slice(2), {
    onBinding(receipt) {
      process.stdout.write(`SWECIRCUIT_TYPESCRIPT_BINDING ${JSON.stringify(receipt)}\n`);
    },
  });
  if (execution.result.signal !== null) {
    process.stderr.write(`TypeScript was terminated by ${execution.result.signal}.\n`);
    process.exitCode = 1;
    return;
  }
  process.exitCode = execution.result.status ?? 1;
}

if (
  typeof process.argv[1] === "string" &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
    process.exitCode = 1;
  }
}
