import { createHash } from "node:crypto";
import { lstat, readFile, realpath, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const SCRIPT_PATH = fileURLToPath(import.meta.url);
const HARNESS_REPOSITORY_PATH =
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs";
const WORKER_CONTEXT_ENV = "SWECIRCUIT_RELEASE_REVIEW_WORKER_CONTEXT";
const WORKER_TOKEN_ENV = "SWECIRCUIT_RELEASE_REVIEW_WORKER_TOKEN";
const RUNTIME_BINDING_DOMAIN = "swecircuit/release-review-runtime/v1alpha1";
const EFFECTIVE_ENVIRONMENT_DOMAIN =
  "swecircuit/release-review-effective-environment/v1alpha1";
const STABLE_RECONSTRUCTION_DOMAIN =
  "swecircuit/release-review-stable-reconstruction/v1alpha1";
const PHASE_AUTHORITY_DOMAIN = "swecircuit/release-review-phase-authority/v1alpha1";
const REVIEW_ROOT = "docs/specs/v12-ide-run-loop/evidence/release-review-r2";
const WINDOWS_RESERVED = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/iu;
const FORBIDDEN_PATH_TEXT =
  /[\u0000-\u001f\u007f-\u009f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/u;
const [candidate, ...handoffPaths] = process.argv.slice(2);

let RELEASE_REVIEW_TEST_HOOKS = null;
let specialistRuntime = null;
let runtimeBindingDigest = null;
const CANDIDATE_PATTERN = /^[0-9a-f]{40}$/;
const EXPECTED_GOAL_ID = "v12.ide-run-loop.release-review-r2";
const EXPECTED_GOAL_REVISION = 1;
const EXPECTED_WORK_UNIT_IDS = Object.freeze([
  "review.r2.lifecycle-correctness",
  "review.r2.product-api-ide",
  "review.r2.security-trace-authority",
]);

function requireValue(result, stage) {
  if (!result.ok || result.value === null) {
    const diagnostics = result.diagnostics
      .map((item) => `${item.code}:${item.pointer}`)
      .join(",");
    throw new Error(`${stage} failed: ${diagnostics}`);
  }
  return result.value;
}

function requireCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
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

function compareOrdinal(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function updateRuntimeFrame(hash, bytes) {
  const value = Buffer.from(bytes);
  const length = Buffer.allocUnsafe(8);
  length.writeBigUInt64BE(BigInt(value.byteLength));
  hash.update(length);
  hash.update(value);
}

function runtimeDomainDigest(domain, value) {
  const hash = createHash("sha256");
  updateRuntimeFrame(hash, Buffer.from(domain, "utf8"));
  updateRuntimeFrame(hash, Buffer.from(JSON.stringify(value), "utf8"));
  return `sha256:${hash.digest("hex")}`;
}

function compareUtf8Ordinal(left, right) {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
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
    requireCondition(
      !value.includes("\0"),
      `Effective worker environment value contains NUL: ${name}.`,
    );
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
  entries.sort((left, right) => compareUtf8Ordinal(left.name, right.name));
  const identity = {
    apiVersion: "swecircuit/release-review-effective-environment/v1alpha1",
    kind: "ReleaseReviewEffectiveEnvironmentBinding",
    keyIdentity: "ascii-case-insensitive-uppercase",
    valueIdentity: "raw-utf8-sha256",
    entries,
  };
  return {
    ...identity,
    contentDigest: runtimeDomainDigest(EFFECTIVE_ENVIRONMENT_DOMAIN, identity),
  };
}

function validateEffectiveWorkerEnvironment(expected, environment = process.env) {
  assertExactKeys(
    expected,
    [
      "apiVersion",
      "kind",
      "keyIdentity",
      "valueIdentity",
      "entries",
      "contentDigest",
    ],
    "effective worker environment binding",
  );
  const actual = effectiveEnvironmentBinding(environment);
  requireCondition(
    JSON.stringify(actual) === JSON.stringify(expected),
    "Candidate worker effective environment mismatch.",
  );
  return actual;
}

function isContainedPath(root, target) {
  const fromRoot = relative(resolve(root), resolve(target));
  return (
    fromRoot === "" ||
    (!isAbsolute(fromRoot) && fromRoot !== ".." && !fromRoot.startsWith(`..${sep}`))
  );
}

function environmentSupply(key) {
  const values = Object.entries(process.env)
    .filter(([name]) => name.toLowerCase() === key.toLowerCase())
    .map(([, value]) => value);
  requireCondition(values.length <= 1, `${key} must be supplied at most once.`);
  return values[0];
}

function validateInputFileBinding(value, label) {
  assertExactKeys(value, ["path", "mediaType", "bytes", "digest"], label);
  requireCondition(
    scalarPathText(value.path, `${label} path`).length > 0 &&
      typeof value.mediaType === "string" &&
      Number.isSafeInteger(value.bytes) &&
      value.bytes >= 0 &&
      /^sha256:[0-9a-f]{64}$/u.test(value.digest),
    `${label} is invalid.`,
  );
}

function safeAuthorityHandoffPath(value, label) {
  const path = scalarPathText(value, label);
  const segments = path.split("/");
  requireCondition(
    segments.length === 2 &&
      segments[0] === "handoffs" &&
      segments[1].length > ".json".length &&
      segments[1].endsWith(".json") &&
      !segments[1].includes("\\") &&
      !/[<>:"|?*]/u.test(segments[1]) &&
      !/[. ]$/u.test(segments[1]) &&
      !WINDOWS_RESERVED.test(segments[1]),
    `${label} is unsafe: ${String(path)}.`,
  );
  return { path, alias: path.toLowerCase() };
}

function validateVerifierStableReconstruction(value, expectedDigest) {
  assertExactKeys(
    value,
    [
      "apiVersion",
      "kind",
      "expectedParentDigest",
      "offlineCache",
      "canonicalGate",
      "externalHostBoundary",
    ],
    "verifier stable reconstruction",
  );
  requireCondition(
    value.apiVersion === "swecircuit/release-review-stable-reconstruction/v1alpha1" &&
      value.kind === "ReleaseReviewStableReconstruction" &&
      /^sha256:[0-9a-f]{64}$/u.test(value.expectedParentDigest) &&
      typeof value.externalHostBoundary === "string" &&
      value.externalHostBoundary.length > 0,
    "Verifier stable-reconstruction identity mismatch.",
  );
  assertExactKeys(value.offlineCache, ["path", "provisioning"], "offline-cache declaration");
  requireCondition(
    isAbsolute(scalarPathText(value.offlineCache.path, "Verifier offline-cache path")) &&
      value.offlineCache.provisioning === "external-host-untrusted-content-offline-only",
    "Verifier offline-cache declaration mismatch.",
  );
  assertExactKeys(
    value.canonicalGate,
    ["expectedReceiptDigest", "files"],
    "canonical-gate stable inputs",
  );
  requireCondition(
    /^sha256:[0-9a-f]{64}$/u.test(value.canonicalGate.expectedReceiptDigest) &&
      Array.isArray(value.canonicalGate.files) &&
      value.canonicalGate.files.length === 3,
    "Verifier canonical-gate inputs are incomplete.",
  );
  value.canonicalGate.files.forEach((file, index) =>
    validateInputFileBinding(file, `canonical-gate stable file ${index}`),
  );
  requireCondition(
    value.canonicalGate.files[0].digest === value.canonicalGate.expectedReceiptDigest,
    "Verifier canonical-gate receipt differs from its explicit digest.",
  );
  requireCondition(
    runtimeDomainDigest(STABLE_RECONSTRUCTION_DOMAIN, value) === expectedDigest,
    "Verifier stable-reconstruction digest mismatch.",
  );
  return value;
}

function validateVerifierPhaseAuthority(value, expectedDigest) {
  assertExactKeys(
    value,
    ["apiVersion", "kind", "phase", "ownerExpectation", "handoffs"],
    "verifier phase authority",
  );
  requireCondition(
    value.apiVersion === "swecircuit/release-review-phase-authority/v1alpha1" &&
      value.kind === "ReleaseReviewPhaseAuthority" &&
      value.phase === "verify",
    "Verifier phase-authority identity mismatch.",
  );
  assertExactKeys(
    value.ownerExpectation,
    ["compilationDigest", "packageDigest"],
    "verifier owner expectation",
  );
  requireCondition(
    /^sha256:[0-9a-f]{64}$/u.test(value.ownerExpectation.compilationDigest) &&
      /^sha256:[0-9a-f]{64}$/u.test(value.ownerExpectation.packageDigest),
    "Verifier owner expectation is invalid.",
  );
  requireCondition(
    Array.isArray(value.handoffs) && value.handoffs.length > 0,
    "Verifier requires raw handoff authority.",
  );
  const aliases = new Set();
  for (const handoff of value.handoffs) {
    assertExactKeys(
      handoff,
      ["requestedPath", "path", "mediaType", "bytes", "digest"],
      "raw handoff phase authority",
    );
    const safe = safeAuthorityHandoffPath(handoff.requestedPath, "Raw handoff request path");
    requireCondition(!aliases.has(safe.alias), `Duplicate raw handoff alias: ${safe.path}.`);
    aliases.add(safe.alias);
    validateInputFileBinding(
      {
        path: handoff.path,
        mediaType: handoff.mediaType,
        bytes: handoff.bytes,
        digest: handoff.digest,
      },
      "raw handoff phase file",
    );
    requireCondition(
      handoff.path.endsWith(`/${safe.path}`) && handoff.mediaType === "application/json",
      `Raw handoff phase binding differs from its validated path: ${safe.path}.`,
    );
  }
  requireCondition(
    runtimeDomainDigest(PHASE_AUTHORITY_DOMAIN, value) === expectedDigest,
    "Verifier phase-authority digest mismatch.",
  );
  return value;
}

async function verifyBoundInputFiles(stableReconstruction, phaseAuthority) {
  const files = [
    ...stableReconstruction.canonicalGate.files,
    ...phaseAuthority.handoffs.map(({ requestedPath: _requestedPath, ...file }) => file),
  ];
  for (const file of files) {
    const path = absolute(file.path);
    const stats = await lstat(path);
    requireCondition(
      stats.isFile() && !stats.isSymbolicLink() && stats.nlink === 1,
      `Verifier bound input is not one plain file: ${file.path}.`,
    );
    requireCondition(
      isContainedPath(ROOT, await realpath(path)),
      `Verifier bound input escapes the private candidate: ${file.path}.`,
    );
    const bytes = await readFile(path);
    requireCondition(
      bytes.byteLength === file.bytes && digest(bytes) === file.digest,
      `Verifier bound input changed before runtime import: ${file.path}.`,
    );
  }
}
async function requireNoRuntimeAncestorSupply(root) {
  let current = dirname(await realpath(root));
  for (;;) {
    const supply = join(current, "node_modules");
    try {
      const stats = await lstat(supply);
      requireCondition(
        false,
        `Verifier ancestor contains fallback package supply: ${supply} (${stats.isDirectory() ? "directory" : "entry"}).`,
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

async function bootstrapCandidateVerifier() {
  const contextPath = environmentSupply(WORKER_CONTEXT_ENV);
  const token = environmentSupply(WORKER_TOKEN_ENV);
  requireCondition(
    typeof contextPath === "string" && isAbsolute(contextPath),
    "Candidate verifier requires an absolute parent context.",
  );
  requireCondition(
    typeof token === "string" && /^[0-9a-f]{64}$/u.test(token),
    "Candidate verifier requires a parent invocation token.",
  );
  const contextStats = await lstat(contextPath);
  requireCondition(
    contextStats.isFile() &&
      !contextStats.isSymbolicLink() &&
      contextStats.nlink === 1,
    "Parent verifier context is not one plain file.",
  );
  const context = decodeCanonicalJson(
    await readFile(contextPath),
    "parent verifier context",
  ).value;
  assertExactKeys(
    context,
    [
      "apiVersion",
      "kind",
      "role",
      "mode",
      "requestedMode",
      "phaseIndex",
      "phaseCount",
      "candidateCommit",
      "materializationRoot",
      "runtimeBindingPath",
      "runtimeBindingDigest",
      "stableReconstruction",
      "stableReconstructionDigest",
      "phaseAuthority",
      "phaseAuthorityDigest",
      "invocationDigest",
      "tokenDigest",
      "effectiveEnvironment",
    ],
    "parent verifier context",
  );
  requireCondition(
    context.apiVersion === "swecircuit/release-review-worker/v1alpha1" &&
      context.kind === "ReleaseReviewWorkerContext" &&
      context.role === "verifier" &&
      context.mode === "verify" &&
      context.requestedMode === "verify" &&
      context.phaseIndex === 3 &&
      context.phaseCount === 4 &&
      context.candidateCommit === candidate &&
      /^sha256:[0-9a-f]{64}$/u.test(context.stableReconstructionDigest) &&
      /^sha256:[0-9a-f]{64}$/u.test(context.phaseAuthorityDigest) &&
      /^sha256:[0-9a-f]{64}$/u.test(context.invocationDigest) &&
      context.tokenDigest === digest(Buffer.from(token, "utf8")),
    "Parent verifier context identity mismatch.",
  );
  const effectiveEnvironment = validateEffectiveWorkerEnvironment(
    context.effectiveEnvironment,
  );
  validateVerifierStableReconstruction(
    context.stableReconstruction,
    context.stableReconstructionDigest,
  );
  validateVerifierPhaseAuthority(
    context.phaseAuthority,
    context.phaseAuthorityDigest,
  );
  requireCondition(
    (await realpath(context.materializationRoot)) === (await realpath(ROOT)) &&
      isContainedPath(ROOT, context.runtimeBindingPath),
    "Candidate verifier is outside its parent materialization.",
  );
  await requireNoRuntimeAncestorSupply(ROOT);

  const bindingBytes = await readFile(context.runtimeBindingPath);
  const binding = decodeCanonicalJson(bindingBytes, "runtime binding").value;
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
  assertExactKeys(binding, keys, "runtime binding");
  const identity = Object.fromEntries(
    keys.slice(0, -1).map((key) => [key, binding[key]]),
  );
  requireCondition(
    binding.candidateCommit === candidate &&
      binding.runtimeBindingDigest === context.runtimeBindingDigest &&
      binding.externalDeclarations.stableReconstructionDigest ===
        context.stableReconstructionDigest &&
      binding.environmentPolicy &&
      binding.environmentPolicy.workerEffectiveEnvironment ===
        "complete-case-insensitive-key-and-value-digest" &&
      binding.runtimeBindingDigest ===
        runtimeDomainDigest(RUNTIME_BINDING_DOMAIN, identity),
    "Verifier runtime-binding identity mismatch.",
  );

  for (const [name, tooling] of Object.entries(binding.tooling)) {
    const bytes = await readFile(absolute(tooling.path));
    requireCondition(
      bytes.byteLength === tooling.bytes && digest(bytes) === tooling.digest,
      `Candidate ${name} tooling bytes changed before verifier import.`,
    );
  }
  requireCondition(
    (await realpath(SCRIPT_PATH)) ===
      (await realpath(absolute(binding.tooling.verifier.path))),
    "Verifier entrypoint does not match its bound candidate blob.",
  );
  const harnessPath = absolute(HARNESS_REPOSITORY_PATH);
  requireCondition(
    (await realpath(harnessPath)) ===
      (await realpath(absolute(binding.tooling.harness.path))),
    "Harness path does not match its bound candidate blob.",
  );

  await verifyBoundInputFiles(
    context.stableReconstruction,
    context.phaseAuthority,
  );
  await requireNoRuntimeAncestorSupply(ROOT);
  const harnessModule = await import(
    `${pathToFileURL(harnessPath).href}?${binding.runtimeBindingDigest}`
  );
  requireCondition(
    harnessModule.RELEASE_REVIEW_TEST_HOOKS &&
      typeof harnessModule.RELEASE_REVIEW_TEST_HOOKS.initializeCandidateWorker ===
        "function",
    "Authenticated candidate harness lacks worker initialization.",
  );
  const initialized =
    await harnessModule.RELEASE_REVIEW_TEST_HOOKS.initializeCandidateWorker(
      "verifier",
      "verify",
      candidate,
      SCRIPT_PATH,
      true,
    );
  requireCondition(
    initialized.binding.runtimeBindingDigest === binding.runtimeBindingDigest &&
      initialized.effectiveEnvironment &&
      initialized.effectiveEnvironment.contentDigest ===
        effectiveEnvironment.contentDigest &&
      JSON.stringify(initialized.effectiveEnvironment) ===
        JSON.stringify(effectiveEnvironment) &&
      initialized.specialistRuntime,
    "Authenticated harness returned a different verifier runtime.",
  );
  RELEASE_REVIEW_TEST_HOOKS = harnessModule.RELEASE_REVIEW_TEST_HOOKS;
  specialistRuntime = initialized.specialistRuntime;
  runtimeBindingDigest = binding.runtimeBindingDigest;
  return {
    binding,
    bindingBytes: Buffer.from(bindingBytes),
    context,
    stableReconstruction: context.stableReconstruction,
    stableReconstructionDigest: context.stableReconstructionDigest,
    phaseAuthority: context.phaseAuthority,
    phaseAuthorityDigest: context.phaseAuthorityDigest,
    effectiveEnvironment,
  };
}

function runtimeFunction(name) {
  requireCondition(
    specialistRuntime && typeof specialistRuntime[name] === "function",
    `Specialist runtime was not authenticated before ${name}.`,
  );
  return specialistRuntime[name];
}

function verifySpecialistHandoff(...arguments_) {
  return runtimeFunction("verifySpecialistHandoff")(...arguments_);
}

function verifySpecialistPackage(...arguments_) {
  return runtimeFunction("verifySpecialistPackage")(...arguments_);
}

function absolute(path) {
  return join(ROOT, ...path.split("/"));
}

function assertExactKeys(value, expected, label) {
  requireCondition(
    value !== null && typeof value === "object" && !Array.isArray(value),
    `${label} must be an object.`,
  );
  const actual = Object.keys(value);
  requireCondition(
    actual.length === expected.length &&
      actual.every((key, index) => key === expected[index]),
    `${label} is not closed or canonical.`,
  );
}

function assertExactStringArray(actual, expected, label) {
  requireCondition(
    Array.isArray(actual) &&
      actual.length === expected.length &&
      actual.every((value, index) => value === expected[index]),
    `${label} mismatch.`,
  );
}

function decodeCanonicalJson(bytes, label) {
  const snapshot = Buffer.from(bytes);
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(snapshot);
  } catch {
    throw new Error(`${label} is not strict UTF-8.`);
  }
  const value = JSON.parse(text);
  requireCondition(
    `${JSON.stringify(value, null, 2)}\n` === text,
    `${label} is not canonical JSON with normalized LF.`,
  );
  return { bytes: snapshot, value };
}

async function readCanonicalJson(path) {
  return decodeCanonicalJson(await readFile(absolute(path)), path);
}

function expectedPackageAgentIds(
  specialistPackage,
  candidateCommit,
  runPaths,
  candidateManifestBinding,
  runtimeBindingFile,
) {
  const compilationFiles = specialistPackage.files.filter(
    (file) => file.path === "compilation.json",
  );
  requireCondition(
    compilationFiles.length === 1,
    "Approved release-review-r2 package has an unexpected compilation-file roster.",
  );
  const compilation = decodeCanonicalJson(
    Buffer.from(compilationFiles[0].content, "utf8"),
    "approved release-review-r2 compilation",
  ).value;
  requireCondition(
    compilation.goal?.id === EXPECTED_GOAL_ID &&
      compilation.goal.revision === EXPECTED_GOAL_REVISION &&
      compilation.goal.objective.includes(candidateCommit) &&
      Array.isArray(compilation.goal.workUnits) &&
      Array.isArray(compilation.goal.contextSources) &&
      Array.isArray(compilation.blueprints),
    "Approved release-review-r2 package goal binding mismatch.",
  );
  const candidateContext = compilation.goal.contextSources.find(
    (entry) => entry.id === "context.candidate-manifest",
  );
  requireCondition(
    candidateContext?.locator === `path:${runPaths.candidateManifest}` &&
      candidateContext.readScope === runPaths.candidateManifest &&
      candidateContext.bytes === candidateManifestBinding.bytes.byteLength &&
      candidateContext.digest === digest(candidateManifestBinding.bytes),
    "Approved release-review-r2 package is not bound to these exact candidate manifest bytes.",
  );
  const runtimeContext = compilation.goal.contextSources.find(
    (entry) => entry.id === "context.runtime-binding",
  );
  requireCondition(
    runtimeContext?.locator === `path:${runPaths.runtimeBinding}` &&
      runtimeContext.readScope === runPaths.runtimeBinding &&
      runtimeContext.bytes === runtimeBindingFile.bytes &&
      runtimeContext.digest === runtimeBindingFile.digest,
    "Approved release-review-r2 package is not bound to the exact runtime-binding bytes.",
  );

  const requestedWorkUnitIds = compilation.goal.workUnits
    .map((unit) => unit.id)
    .sort(compareOrdinal);
  assertExactStringArray(
    requestedWorkUnitIds,
    EXPECTED_WORK_UNIT_IDS,
    "Approved release-review-r2 request roster",
  );

  const blueprintWorkUnitIds = [];
  for (const blueprint of compilation.blueprints) {
    requireCondition(
      Array.isArray(blueprint.workUnitIds) &&
        blueprint.workUnitIds.length === 1 &&
        Array.isArray(blueprint.dependencies) &&
        blueprint.dependencies.length === 0,
      `Unexpected release-review-r2 blueprint shape: ${String(blueprint.id)}.`,
    );
    blueprintWorkUnitIds.push(blueprint.workUnitIds[0]);
  }
  blueprintWorkUnitIds.sort(compareOrdinal);
  assertExactStringArray(
    blueprintWorkUnitIds,
    EXPECTED_WORK_UNIT_IDS,
    "Approved release-review-r2 blueprint roster",
  );

  const blueprintAgentIds = compilation.blueprints
    .map((blueprint) => blueprint.id)
    .sort(compareOrdinal);
  const manifestAgentIds = specialistPackage.manifest.agents
    .map((agent) => agent.agentId)
    .sort(compareOrdinal);
  assertExactStringArray(
    manifestAgentIds,
    blueprintAgentIds,
    "Approved release-review-r2 manifest roster",
  );
  return manifestAgentIds;
}

function safeHandoffPath(value, runPaths) {
  const safe = safeAuthorityHandoffPath(value, "Handoff path");
  const file = safe.path.slice("handoffs/".length);
  return {
    file,
    path: `${runPaths.handoffs}/${file}`,
    alias: safe.alias,
  };
}

async function writeImmutableJson(path, value) {
  const bytes = Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8");
  const output = absolute(path);
  try {
    const existing = await readFile(output);
    requireCondition(existing.equals(bytes), `Immutable output differs: ${path}.`);
  } catch (error) {
    if (!error || typeof error !== "object" || error.code !== "ENOENT") {
      throw error;
    }
    await writeFile(output, bytes, { flag: "wx" });
  }
}

async function main() {
  requireCondition(
    typeof candidate === "string" &&
      CANDIDATE_PATTERN.test(candidate) &&
      handoffPaths.length > 0,
    "Usage: verify-release-review-handoffs.mjs <candidate> handoffs/<raw-handoff.json> [handoffs/<raw-handoff.json>...]",
  );
  const argumentRunPaths = {
    handoffs: `${REVIEW_ROOT}/runs/${candidate}/handoffs`,
  };
  const validatedHandoffs = handoffPaths.map((path) =>
    safeHandoffPath(path, argumentRunPaths),
  );
  requireCondition(
    new Set(validatedHandoffs.map((entry) => entry.alias)).size ===
      validatedHandoffs.length,
    "Duplicate raw handoff alias supplied.",
  );

  const runtime = await bootstrapCandidateVerifier();
  assertExactStringArray(
    handoffPaths,
    runtime.phaseAuthority.handoffs.map((entry) => entry.requestedPath),
    "Explicit raw handoff roster",
  );
  const runPaths = RELEASE_REVIEW_TEST_HOOKS.candidateRunPaths(candidate);
  const candidateTree = RELEASE_REVIEW_TEST_HOOKS.loadCandidateTree(candidate);
  await RELEASE_REVIEW_TEST_HOOKS.verifyCheckpoint(candidate, runPaths);
  const reviewTooling =
    await RELEASE_REVIEW_TEST_HOOKS.authenticateReviewTooling(candidateTree);
  const candidateManifestBinding = await readCanonicalJson(runPaths.candidateManifest);
  const candidateManifest = candidateManifestBinding.value;
  assertExactKeys(
    candidateManifest,
    [
      "apiVersion",
      "kind",
      "version",
      "baselineCommit",
      "candidateCommit",
      "branch",
      "runRoot",
      "runtimeBindingDigest",
      "stableReconstructionDigest",
      "runtimeBinding",
      "reviewTooling",
      "canonicalGate",
      "preIntegrationReview",
      "verifiedEvidenceSets",
      "correctionLineage",
      "reviewedSources",
    ],
    "candidate manifest",
  );
  requireCondition(
    candidateManifest.apiVersion === "swecircuit/release-candidate/v1alpha1" &&
      candidateManifest.kind === "ReleaseCandidateManifest" &&
      candidateManifest.candidateCommit === candidate &&
      candidateManifest.runRoot === runPaths.root &&
      candidateManifest.runtimeBindingDigest === runtimeBindingDigest &&
      candidateManifest.stableReconstructionDigest === runtime.stableReconstructionDigest &&
      candidateManifest.runtimeBinding.path === runPaths.runtimeBinding &&
      candidateManifest.runtimeBinding.bytes === runtime.bindingBytes.byteLength &&
      candidateManifest.runtimeBinding.digest === digest(runtime.bindingBytes) &&
      JSON.stringify(candidateManifest.reviewTooling) === JSON.stringify(reviewTooling),
    "Candidate manifest does not bind this exact candidate and verifier identity.",
  );

  const runtimeBindingFile = {
    path: runPaths.runtimeBinding,
    bytes: runtime.bindingBytes.byteLength,
    digest: digest(runtime.bindingBytes),
  };
  const phaseMetadata = (await readCanonicalJson(runPaths.phaseMetadata)).value;
  const compilationSummary = (
    await readCanonicalJson(runPaths.compilationSummary)
  ).value;
  requireCondition(
    phaseMetadata.checkpoint === candidate &&
      phaseMetadata.runtimeBindingDigest === runtimeBindingDigest &&
      phaseMetadata.stableReconstructionDigest === runtime.stableReconstructionDigest &&
      JSON.stringify(phaseMetadata.runtimeBinding) ===
        JSON.stringify(runtimeBindingFile) &&
      compilationSummary.candidateCommit === candidate &&
      compilationSummary.runtimeBindingDigest === runtimeBindingDigest &&
      compilationSummary.stableReconstructionDigest === runtime.stableReconstructionDigest,
    "Prepared or compiled runtime-binding evidence changed.",
  );

  const reconstructed =
    await RELEASE_REVIEW_TEST_HOOKS.validateApprovedInputs(
      candidate,
      runtime.phaseAuthority.ownerExpectation,
    );
  const specialistPackage = reconstructed.specialistPackage;
  const approval = reconstructed.approval;
  assertExactKeys(
    approval,
    [
      "apiVersion",
      "kind",
      "goalId",
      "goalRevision",
      "candidateCommit",
      "runtimeBindingDigest",
      "stableReconstructionDigest",
      "phaseAuthorityDigest",
      "approvedBy",
      "approvalBasis",
      "expectation",
    ],
    "release-review-r2 approval",
  );
  assertExactKeys(
    approval.expectation,
    ["compilationDigest", "packageDigest"],
    "release-review-r2 approval expectation",
  );
  requireCondition(
    approval.apiVersion === "swecircuit/review-approval/v1alpha1" &&
      approval.kind === "SpecialistReviewApproval" &&
      approval.goalId === EXPECTED_GOAL_ID &&
      approval.goalRevision === EXPECTED_GOAL_REVISION &&
      approval.candidateCommit === candidate &&
      approval.runtimeBindingDigest === runtimeBindingDigest &&
      approval.stableReconstructionDigest === runtime.stableReconstructionDigest &&
      approval.phaseAuthorityDigest === reconstructed.approvalAuthority.digest &&
      approval.approvedBy === "external-host-declared-owner-pair" &&
      JSON.stringify(approval.expectation) ===
        JSON.stringify(runtime.phaseAuthority.ownerExpectation) &&
      compilationSummary.compilationDigest ===
        runtime.phaseAuthority.ownerExpectation.compilationDigest &&
      compilationSummary.packageDigest ===
        runtime.phaseAuthority.ownerExpectation.packageDigest,
    "Release-review-r2 approval is not candidate-bound.",
  );
  requireValue(
    verifySpecialistPackage(specialistPackage, approval.expectation),
    "Approval-bound release-review-r2 package verification",
  );

  const expectedAgentIds = expectedPackageAgentIds(
    specialistPackage,
    candidate,
    runPaths,
    candidateManifestBinding,
    runtimeBindingFile,
  );
  const verified = [];
  const seenAgentIds = new Set();
  for (let index = 0; index < handoffPaths.length; index += 1) {
    const handoffPath = handoffPaths[index];
    const resolved = validatedHandoffs[index];
    requireCondition(
      resolved.path === `${runPaths.handoffs}/${resolved.file}`,
      `Validated raw handoff path changed before resolution: ${handoffPath}.`,
    );
    const external = runtime.phaseAuthority.handoffs.find(
      (entry) => entry.requestedPath === handoffPath,
    );
    requireCondition(
      external && external.path === resolved.path,
      `Raw handoff path differs from its phase-authority binding: ${handoffPath}.`,
    );
    const raw = await readFile(absolute(resolved.path));
    requireCondition(
      raw.byteLength === external.bytes && digest(raw) === external.digest,
      `Raw handoff differs from its explicit host digest: ${handoffPath}.`,
    );
    const value = requireValue(
      verifySpecialistHandoff(specialistPackage, approval.expectation, raw),
      `${handoffPath} verification`,
    );
    requireCondition(
      !seenAgentIds.has(value.handoff.agent.id),
      `Duplicate reviewer handoff supplied for agent ${value.handoff.agent.id}.`,
    );
    seenAgentIds.add(value.handoff.agent.id);
    verified.push({
      file: resolved.file,
      agentId: value.handoff.agent.id,
      outcome: value.handoff.outcome,
      rawBytes: value.rawBytes,
      rawDigest: value.rawDigest,
      semanticDigest: value.semanticDigest,
      contentDigest: value.contentDigest,
    });
  }

  verified.sort((left, right) => compareOrdinal(left.agentId, right.agentId));
  const receivedAgentIds = verified.map((entry) => entry.agentId);
  const complete =
    expectedAgentIds.length === receivedAgentIds.length &&
    expectedAgentIds.every((agentId, index) => agentId === receivedAgentIds[index]);
  const releaseReady = complete && verified.every((entry) => entry.outcome === "pass");
  const report = {
    apiVersion: "swecircuit/run-evidence/v1alpha1",
    kind: "ReleaseReviewHandoffVerification",
    phase: "release-review-r2",
    candidateCommit: candidate,
    runRoot: runPaths.root,
    runtimeBindingDigest,
    stableReconstructionDigest: runtime.stableReconstructionDigest,
    phaseAuthorityDigest: runtime.phaseAuthorityDigest,
    compilationDigest: approval.expectation.compilationDigest,
    packageDigest: approval.expectation.packageDigest,
    expectedAgentIds,
    receivedAgentIds,
    complete,
    verifiedHandoffs: verified,
    releaseReady,
    note:
      "Every exact raw reviewer handoff was verified against this candidate's external-host-declared R2 package pair. A verified non-pass remains a workflow route and cannot authorize release.",
  };
  await writeImmutableJson(runPaths.handoffVerification, report);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!releaseReady) {
    process.exitCode = 2;
  }
}

export const RELEASE_REVIEW_HANDOFF_TEST_HOOKS = Object.freeze({
  decodeCanonicalJson,
  effectiveEnvironmentBinding,
  expectedPackageAgentIds,
  safeAuthorityHandoffPath,
  safeHandoffPath,
  scalarPathText,
  validateEffectiveWorkerEnvironment,
  validateVerifierPhaseAuthority,
  validateVerifierStableReconstruction,
});

if (process.argv[1] && resolve(process.argv[1]) === resolve(SCRIPT_PATH)) {
  main().catch((error) => {
    process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
    process.exitCode = 1;
  });
}
