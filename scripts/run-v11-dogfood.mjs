import { spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import {
  lstatSync,
  mkdirSync,
  readdirSync,
  realpathSync,
  renameSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  compileAgentBlueprints,
  parseJsonBuffer,
  renderSpecialistPackage,
  SPECIALIST_API_VERSION,
  SPECIALIST_LIMITS,
  verifySpecialistPackage,
} from "../dist/index.js";
import {
  inspectCanonicalArtifactPath,
  inspectRelativeArtifactPath,
  readContainedFileBytes,
  resolveProjectRoot,
} from "../dist/path.js";
import { containsHighConfidenceSecret } from "../dist/privacy.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const evidenceDirectory = "docs/specs/v11-specialist-compiler/evidence/dogfood";
const approvalFile = `${evidenceDirectory}/approval.json`;
const goalFile = `${evidenceDirectory}/goal-contract.json`;
const packageDirectory = `${evidenceDirectory}/package`;
const auditDirectory = `${evidenceDirectory}/prelaunch-audit`;
const auditApprovalFile = `${auditDirectory}/approval.json`;
const auditPackageDirectory = `${auditDirectory}/package`;
const prelaunchPackageVerificationReceiptFile = `${auditDirectory}/package-verification-receipt.json`;
const launchAuthorizationFile = `${evidenceDirectory}/launch-authorization.json`;
const prelaunchPackageVerificationReceiptVersion =
  "swecircuit/prelaunch-package-verification-receipt/v1alpha1";
const prelaunchAuditHandoffVersion = "swecircuit/prelaunch-audit-handoff/v1alpha1";
const prelaunchAuditBindUnitId = "audit.bind-candidate";
const prelaunchAuditReviewUnitId = "audit.review-candidate-compilation";
const digestPattern = /^sha256:[0-9a-f]{64}$/;
const gitObjectIdPattern = /^(?:[0-9a-f]{40}|[0-9a-f]{64})$/;
const unsupportedGitTransformAttributes = Object.freeze([
  "filter",
  "working-tree-encoding",
  "ident",
  "crlf",
]);
const approvalByteLimit = 512;
const launchAuthorizationByteLimit = 2_048;
const prelaunchPackageVerificationReceiptByteLimit = 16_384;
const prelaunchAuditHandoffByteLimit = SPECIALIST_LIMITS.inputBytes;
const approvalErrors = Object.freeze({
  missing: "approval missing: external approval.json is required for --check-evidence",
  malformed:
    "approval malformed: approval.json must be a closed object containing exactly valid compilationDigest and packageDigest values",
  stale: "approval stale: approval.json does not match the reconstructed candidate digests",
  failed: "approval failed: reconstructed package did not satisfy approval.json",
});

function fail(message) {
  throw new Error(`V11 dogfood: ${message}`);
}

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function hashGitObject(repositoryRoot, relativePath, bytes, applyFilters) {
  const args = ["hash-object", ...(applyFilters ? [`--path=${relativePath}`] : []), "--stdin"];
  const result = spawnSync("git", args, {
    cwd: repositoryRoot,
    encoding: "utf8",
    input: Buffer.from(bytes),
    maxBuffer: 1_024 * 1_024,
    windowsHide: true,
  });
  const objectId = result.stdout?.trim() ?? "";
  if (result.error !== undefined || result.status !== 0 || !gitObjectIdPattern.test(objectId)) {
    fail(`Git canonical-byte check failed for ${relativePath}`);
  }
  return objectId;
}

export function parseGitAttributes(relativePath, output) {
  const bytes = Buffer.from(output);
  if (bytes.byteLength === 0) {
    return Object.create(null);
  }

  const fields = bytes.toString("utf8").split("\0");
  if (fields.at(-1) !== "") {
    fail(`Git attribute check returned malformed records for ${relativePath}`);
  }
  fields.pop();
  if (fields.length % 3 !== 0) {
    fail(`Git attribute check returned malformed records for ${relativePath}`);
  }

  const attributes = Object.create(null);
  for (let offset = 0; offset < fields.length; offset += 3) {
    const [path, attributeName, value] = fields.slice(offset, offset + 3);
    if (
      path !== relativePath ||
      attributeName === undefined ||
      attributeName.length === 0 ||
      value === undefined ||
      value.length === 0 ||
      Object.hasOwn(attributes, attributeName)
    ) {
      fail(`Git attribute check returned malformed records for ${relativePath}`);
    }
    attributes[attributeName] = value;
  }
  return attributes;
}

function readGitAttributes(repositoryRoot, relativePath) {
  const result = spawnSync("git", ["check-attr", "-z", "--all", "--", relativePath], {
    cwd: repositoryRoot,
    encoding: null,
    maxBuffer: 1_024 * 1_024,
    windowsHide: true,
  });
  if (result.error !== undefined || result.status !== 0) {
    fail(`Git attribute check failed for ${relativePath}`);
  }
  return parseGitAttributes(relativePath, result.stdout ?? []);
}

function isCanonicalCrlf(bytes) {
  for (let index = 0; index < bytes.byteLength; index += 1) {
    const value = bytes[index];
    if (value === 0x0d && bytes[index + 1] !== 0x0a) {
      return false;
    }
    if (value === 0x0a && bytes[index - 1] !== 0x0d) {
      return false;
    }
  }
  return true;
}

export function verifyCheckoutCanonicalContext(
  relativePath,
  bytes,
  repositoryRoot = root,
  hashObject = hashGitObject,
  attributesForPath = readGitAttributes,
) {
  const attributes = attributesForPath(repositoryRoot, relativePath);
  if (unsupportedGitTransformAttributes.some((name) => Object.hasOwn(attributes, name))) {
    fail(
      `context is not checkout-canonical for ${relativePath}: unsupported Git transform is active`,
    );
  }

  if (!Object.hasOwn(attributes, "eol") || !["lf", "crlf"].includes(attributes.eol)) {
    fail(
      `context is not checkout-canonical for ${relativePath}: explicit eol=lf or eol=crlf is required`,
    );
  }

  const rawObjectId = hashObject(repositoryRoot, relativePath, bytes, false);
  const filteredObjectId = hashObject(repositoryRoot, relativePath, bytes, true);

  if (
    attributes.eol === "lf" &&
    rawObjectId === filteredObjectId &&
    !Buffer.from(bytes).includes(0x0d)
  ) {
    return;
  }
  if (attributes.eol === "crlf" && isCanonicalCrlf(bytes)) {
    return;
  }

  fail(
    `context is not checkout-canonical for ${relativePath}: Git checkout rules would change reviewed bytes`,
  );
}

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function parseRepositoryLocator(locator) {
  if (!locator.startsWith("path:")) {
    fail(`unsupported repository locator: ${locator}`);
  }
  const relativePath = locator.slice(5).split("#", 1)[0];
  if (relativePath === undefined || relativePath.length === 0) {
    fail(`empty repository locator: ${locator}`);
  }
  return relativePath;
}

function formatDiagnostics(diagnostics) {
  return diagnostics.map((diagnostic) => `${diagnostic.code}:${diagnostic.artifact}`).join(", ");
}

function isErrno(error, code) {
  return error instanceof Error && "code" in error && error.code === code;
}

function requireRepositoryRoot(repositoryRoot) {
  const resolvedRoot = resolveProjectRoot(repositoryRoot);
  if (resolvedRoot.root === null || resolvedRoot.realRoot === null) {
    fail(`repository root rejected: ${formatDiagnostics(resolvedRoot.diagnostics)}`);
  }
  return resolvedRoot;
}

function readFixedContainedBytes(resolvedRoot, candidate, byteLimit, optional = false) {
  const result = readContainedFileBytes(
    resolvedRoot.root,
    resolvedRoot.realRoot,
    candidate,
    "SC1001",
    byteLimit,
    "SC5001",
  );
  if (result.bytes !== null) {
    return result.bytes;
  }
  if (optional && result.diagnostics.length === 1 && result.diagnostics[0]?.code === "SC1001") {
    return null;
  }
  fail(`contained read rejected for ${candidate}: ${formatDiagnostics(result.diagnostics)}`);
}

export function readDogfoodControlJson(repositoryRoot, candidate, byteLimit, options = {}) {
  const resolvedRoot = requireRepositoryRoot(repositoryRoot);
  const bytes = readFixedContainedBytes(
    resolvedRoot,
    candidate,
    byteLimit,
    options.optional === true,
  );
  if (bytes === null) {
    return null;
  }
  const parsed = parseJsonBuffer(bytes, candidate, byteLimit);
  if (
    parsed.value === null ||
    parsed.diagnostics.some((diagnostic) => diagnostic.severity === "error")
  ) {
    fail(`strict JSON control rejected for ${candidate}: ${formatDiagnostics(parsed.diagnostics)}`);
  }
  return parsed.value;
}

function readRepositoryLocator(resolvedRoot, locator) {
  const relativePath = parseRepositoryLocator(locator);
  const result = readContainedFileBytes(
    resolvedRoot.root,
    resolvedRoot.realRoot,
    relativePath,
    "SC1001",
    SPECIALIST_LIMITS.contextSourceBytes,
    "SC5001",
  );
  if (result.bytes === null) {
    fail(`context read rejected for ${relativePath}: ${formatDiagnostics(result.diagnostics)}`);
  }
  return { relativePath, bytes: result.bytes };
}

export function readRepositoryContextFile(repositoryRoot, locator) {
  return readRepositoryLocator(requireRepositoryRoot(repositoryRoot), locator);
}

export function verifyDogfoodContext(goal, repositoryRoot = root) {
  const unsupported = goal.contextSources.find((source) => source.kind !== "repository");
  if (unsupported !== undefined) {
    fail(`unsupported context source kind for ${unsupported.id}: ${unsupported.kind}`);
  }

  const resolvedRoot = requireRepositoryRoot(repositoryRoot);
  const verified = [];
  for (const source of goal.contextSources) {
    const { relativePath, bytes } = readRepositoryLocator(resolvedRoot, source.locator);
    const actual = { bytes: bytes.byteLength, digest: digest(bytes) };
    if (actual.bytes !== source.bytes || actual.digest !== source.digest) {
      fail(
        `context mismatch for ${source.id} (${relativePath}): expected ${source.bytes}/${source.digest}, received ${actual.bytes}/${actual.digest}`,
      );
    }
    verifyCheckoutCanonicalContext(relativePath, bytes, repositoryRoot);
    verified.push({
      sourceId: source.id,
      path: relativePath,
      bytes: actual.bytes,
      digest: actual.digest,
    });
  }
  return verified.sort((left, right) => compareText(left.sourceId, right.sourceId));
}

function inspectSafeEvidencePath(resolvedRoot, candidate) {
  const pathDiagnostic = inspectRelativeArtifactPath(candidate);
  if (pathDiagnostic !== null) {
    fail(`unsafe fixed evidence path ${candidate}: ${pathDiagnostic}`);
  }

  const segments = candidate.split("/");
  let current = resolvedRoot.root;
  for (let index = 0; index < segments.length; index += 1) {
    current = join(current, segments[index]);
    let stats;
    try {
      stats = lstatSync(current);
    } catch (error) {
      if (isErrno(error, "ENOENT")) {
        return {
          absolutePath: resolve(resolvedRoot.root, ...segments),
          exists: false,
          stats: null,
        };
      }
      fail(`fixed evidence path unavailable ${candidate}: SC1001`);
    }

    if (stats.isSymbolicLink()) {
      fail(`unsafe fixed evidence path ${candidate}: SC1013`);
    }
    if (index < segments.length - 1 && !stats.isDirectory()) {
      fail(`unsafe fixed evidence parent ${candidate}: SC1015`);
    }

    let canonicalPath;
    try {
      canonicalPath = realpathSync.native(current);
    } catch {
      fail(`fixed evidence path unavailable ${candidate}: SC1001`);
    }
    const expectedCanonicalPath = resolve(resolvedRoot.realRoot, ...segments.slice(0, index + 1));
    const canonicalDiagnostic = inspectCanonicalArtifactPath(
      resolvedRoot.realRoot,
      expectedCanonicalPath,
      canonicalPath,
    );
    if (canonicalDiagnostic !== null) {
      fail(`unsafe fixed evidence path ${candidate}: ${canonicalDiagnostic}`);
    }

    if (index === segments.length - 1) {
      return { absolutePath: current, exists: true, stats };
    }
  }
  fail(`empty fixed evidence path: ${candidate}`);
}

function requireSafeEvidenceFile(resolvedRoot, candidate) {
  const state = inspectSafeEvidencePath(resolvedRoot, candidate);
  if (state.exists && !state.stats.isFile()) {
    fail(`fixed evidence path is not a regular file ${candidate}: SC1015`);
  }
  return state;
}

function requireSafeEvidenceDirectory(resolvedRoot, candidate) {
  const state = inspectSafeEvidencePath(resolvedRoot, candidate);
  if (state.exists && !state.stats.isDirectory()) {
    fail(`fixed evidence path is not a directory ${candidate}: SC1015`);
  }
  return state;
}

function parentCandidate(candidate) {
  const separator = candidate.lastIndexOf("/");
  return separator < 0 ? "" : candidate.slice(0, separator);
}

function ensureSafeEvidenceDirectory(resolvedRoot, candidate) {
  if (candidate.length === 0) {
    return;
  }
  const segments = candidate.split("/");
  for (let index = 0; index < segments.length; index += 1) {
    const currentCandidate = segments.slice(0, index + 1).join("/");
    const state = requireSafeEvidenceDirectory(resolvedRoot, currentCandidate);
    if (!state.exists) {
      mkdirSync(state.absolutePath);
      const created = requireSafeEvidenceDirectory(resolvedRoot, currentCandidate);
      if (!created.exists) {
        fail(`failed to create fixed evidence directory ${currentCandidate}`);
      }
    }
  }
}

function listSafeEvidenceFiles(resolvedRoot, directoryCandidate) {
  const directory = requireSafeEvidenceDirectory(resolvedRoot, directoryCandidate);
  if (!directory.exists) {
    return [];
  }

  const files = [];
  for (const name of readdirSync(directory.absolutePath).sort(compareText)) {
    const candidate = `${directoryCandidate}/${name}`;
    const state = inspectSafeEvidencePath(resolvedRoot, candidate);
    if (!state.exists) {
      fail(`fixed evidence entry disappeared: ${candidate}`);
    }
    if (state.stats.isDirectory()) {
      files.push(...listSafeEvidenceFiles(resolvedRoot, candidate));
    } else if (state.stats.isFile()) {
      files.push(candidate);
    } else {
      fail(`unsupported fixed evidence entry: ${candidate}`);
    }
  }
  return files;
}

function removeSafeEvidenceTree(resolvedRoot, candidate) {
  const state = inspectSafeEvidencePath(resolvedRoot, candidate);
  if (!state.exists) {
    return;
  }
  if (state.stats.isFile()) {
    unlinkSync(state.absolutePath);
    return;
  }
  if (!state.stats.isDirectory()) {
    fail(`unsupported fixed evidence cleanup entry: ${candidate}`);
  }

  for (const name of readdirSync(state.absolutePath).sort(compareText)) {
    removeSafeEvidenceTree(resolvedRoot, `${candidate}/${name}`);
  }
  const finalState = requireSafeEvidenceDirectory(resolvedRoot, candidate);
  if (!finalState.exists) {
    fail(`fixed evidence directory disappeared during cleanup: ${candidate}`);
  }
  rmdirSync(finalState.absolutePath);
}

function writeSafeEvidenceFile(resolvedRoot, candidate, content) {
  ensureSafeEvidenceDirectory(resolvedRoot, parentCandidate(candidate));
  requireSafeEvidenceFile(resolvedRoot, candidate);

  const temporaryCandidate = `${candidate}.tmp-${process.pid}-${randomUUID()}`;
  const temporary = requireSafeEvidenceFile(resolvedRoot, temporaryCandidate);
  if (temporary.exists) {
    fail(`temporary evidence collision: ${temporaryCandidate}`);
  }

  let temporaryCreated = false;
  try {
    writeFileSync(temporary.absolutePath, content, {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });
    temporaryCreated = true;
    const writtenTemporary = requireSafeEvidenceFile(resolvedRoot, temporaryCandidate);
    if (!writtenTemporary.exists) {
      fail(`temporary evidence disappeared: ${temporaryCandidate}`);
    }

    const currentTarget = requireSafeEvidenceFile(resolvedRoot, candidate);
    if (currentTarget.exists) {
      unlinkSync(currentTarget.absolutePath);
    }
    renameSync(writtenTemporary.absolutePath, currentTarget.absolutePath);
    temporaryCreated = false;

    const writtenTarget = requireSafeEvidenceFile(resolvedRoot, candidate);
    if (!writtenTarget.exists) {
      fail(`fixed evidence write failed: ${candidate}`);
    }
  } finally {
    if (temporaryCreated) {
      try {
        unlinkSync(temporary.absolutePath);
      } catch (error) {
        if (!isErrno(error, "ENOENT")) {
          fail(`temporary evidence cleanup failed: ${temporaryCandidate}`);
        }
      }
    }
  }
}

function proposals(goal) {
  return [
    {
      id: "candidate.specialized",
      groups: goal.workUnits.map((unit) => [unit.id]),
    },
    {
      id: "candidate.consolidated-reviews",
      groups: [
        ["prepare.candidate"],
        ["review.product-api", "review.algorithm-lifecycle", "review.security-trace"],
        ["verify.release-gates"],
        ["integrate.release"],
      ],
    },
  ];
}

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function compileCandidate(inputGoal, repositoryRoot = root, proposedCandidates = undefined) {
  const preflightResult = compileAgentBlueprints({
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal: inputGoal,
  });
  if (!preflightResult.ok || preflightResult.value === null) {
    fail(`preflight compilation failed: ${JSON.stringify(preflightResult.diagnostics)}`);
  }
  const goal = preflightResult.value.goal;
  const context = verifyDogfoodContext(goal, repositoryRoot);
  const compilationResult = compileAgentBlueprints({
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal,
    ...(proposedCandidates === undefined ? {} : { proposedCandidates }),
  });
  if (!compilationResult.ok || compilationResult.value === null) {
    fail(`compilation failed: ${JSON.stringify(compilationResult.diagnostics)}`);
  }
  const compilation = compilationResult.value;
  const packageResult = renderSpecialistPackage(compilation);
  if (!packageResult.ok || packageResult.value === null) {
    fail(`rendering failed: ${JSON.stringify(packageResult.diagnostics)}`);
  }
  return {
    compilation,
    context,
    renderedPackage: packageResult.value,
  };
}

function buildCandidate(repositoryRoot = root) {
  const inputGoal = readDogfoodControlJson(repositoryRoot, goalFile, SPECIALIST_LIMITS.inputBytes);
  return compileCandidate(inputGoal, repositoryRoot, proposals(inputGoal));
}

function readApproval(candidateFile, required, repositoryRoot = root) {
  const resolvedRoot = requireRepositoryRoot(repositoryRoot);
  const bytes = readFixedContainedBytes(resolvedRoot, candidateFile, approvalByteLimit, true);
  if (bytes === null) {
    if (required) {
      fail(approvalErrors.missing);
    }
    return null;
  }
  const parsed = parseJsonBuffer(bytes, candidateFile, approvalByteLimit);
  if (
    parsed.value === null ||
    parsed.diagnostics.some((diagnostic) => diagnostic.severity === "error")
  ) {
    fail(approvalErrors.malformed);
  }
  const value = parsed.value;
  if (
    !hasExactKeys(value, ["compilationDigest", "packageDigest"]) ||
    typeof value.compilationDigest !== "string" ||
    typeof value.packageDigest !== "string" ||
    !digestPattern.test(value.compilationDigest) ||
    !digestPattern.test(value.packageDigest)
  ) {
    fail(approvalErrors.malformed);
  }
  return {
    expectation: {
      compilationDigest: value.compilationDigest,
      packageDigest: value.packageDigest,
    },
    binding: {
      path: candidateFile,
      digest: digest(bytes),
      bytes: bytes.byteLength,
    },
  };
}

function approvalStatus(candidate, candidateFile, required, repositoryRoot = root) {
  const approval = readApproval(candidateFile, required, repositoryRoot);
  if (approval === null) {
    return { result: "pending", reason: "missing" };
  }
  if (
    approval.expectation.compilationDigest !== candidate.compilation.contentDigest ||
    approval.expectation.packageDigest !== candidate.renderedPackage.packageDigest
  ) {
    if (required) {
      fail(approvalErrors.stale);
    }
    return { result: "pending", reason: "stale" };
  }

  const verificationResult = verifySpecialistPackage(
    candidate.renderedPackage,
    approval.expectation,
  );
  if (!verificationResult.ok || verificationResult.value === null) {
    fail(approvalErrors.failed);
  }
  return {
    result: "pass",
    expectation: approval.expectation,
    binding: approval.binding,
  };
}

function hasExactKeys(value, keys) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length === keys.length &&
    keys.every((key) => Object.hasOwn(value, key))
  );
}

function containsUnsafeHandoffCharacters(value, allowLineFeed) {
  for (const character of value) {
    const codePoint = character.codePointAt(0);
    if (
      codePoint !== undefined &&
      ((codePoint >= 0xd800 && codePoint <= 0xdfff) ||
        (codePoint <= 0x1f && !(allowLineFeed && codePoint === 0x0a)) ||
        (codePoint >= 0x7f && codePoint <= 0x9f) ||
        codePoint === 0x061c ||
        codePoint === 0x200e ||
        codePoint === 0x200f ||
        (codePoint >= 0x202a && codePoint <= 0x202e) ||
        (codePoint >= 0x2066 && codePoint <= 0x2069))
    ) {
      return true;
    }
  }
  return false;
}

function safeHandoffMetadataText(value, byteLimit = SPECIALIST_LIMITS.textBytes) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    Buffer.byteLength(value, "utf8") <= byteLimit &&
    !containsUnsafeHandoffCharacters(value, false) &&
    !containsHighConfidenceSecret(value)
  );
}

function safeHandoffArtifactText(value, byteLimit = prelaunchAuditHandoffByteLimit) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    Buffer.byteLength(value, "utf8") <= byteLimit &&
    !containsUnsafeHandoffCharacters(value, true) &&
    !containsHighConfidenceSecret(value)
  );
}

function safeHandoffMetadataTextList(value) {
  return (
    Array.isArray(value) &&
    value.length <= SPECIALIST_LIMITS.acceptanceCriteria &&
    value.every((entry) => safeHandoffMetadataText(entry))
  );
}

function sameTextList(left, right) {
  return (
    Array.isArray(left) &&
    Array.isArray(right) &&
    left.length === right.length &&
    left.every((entry, index) => entry === right[index])
  );
}

function prelaunchAuditBlueprint(auditCandidate, workUnitId, label) {
  const blueprints = auditCandidate?.compilation?.blueprints;
  if (!Array.isArray(blueprints)) {
    fail(`prelaunch audit ${label} identity unavailable`);
  }
  const matches = blueprints.filter(
    (blueprint) =>
      Array.isArray(blueprint.workUnitIds) && blueprint.workUnitIds.includes(workUnitId),
  );
  if (matches.length !== 1) {
    fail(`prelaunch audit ${label} identity unavailable`);
  }
  return matches[0];
}

function requireEvidenceDuties(blueprint, expectedRequirementIds, duty, label) {
  const actualRequirementIds = blueprint.evidenceDuties
    .map((candidateDuty) => candidateDuty.requirementId)
    .sort(compareText);
  if (
    blueprint.evidenceDuties.some((candidateDuty) => candidateDuty.duty !== duty) ||
    !sameTextList(actualRequirementIds, expectedRequirementIds)
  ) {
    fail(`prelaunch audit ${label} duties unavailable`);
  }
  return blueprint;
}

function prelaunchAuditBindBlueprint(auditCandidate) {
  return requireEvidenceDuties(
    prelaunchAuditBlueprint(auditCandidate, prelaunchAuditBindUnitId, "binder"),
    ["evidence.candidate-authority-binding", "evidence.candidate-selection-binding"],
    "produce",
    "binder",
  );
}

function prelaunchAuditReviewBlueprint(auditCandidate) {
  return requireEvidenceDuties(
    prelaunchAuditBlueprint(auditCandidate, prelaunchAuditReviewUnitId, "reviewer"),
    ["evidence.candidate-authority-review", "evidence.candidate-selection-review"],
    "review",
    "reviewer",
  );
}

function prelaunchAuditAgentBinding(auditCandidate, blueprint, label) {
  const agents = auditCandidate?.renderedPackage?.manifest?.agents;
  if (!Array.isArray(agents)) {
    fail(`prelaunch audit ${label} package binding unavailable`);
  }
  const matches = agents.filter((binding) => binding.agentId === blueprint.id);
  if (matches.length !== 1) {
    fail(`prelaunch audit ${label} package binding unavailable`);
  }
  const binding = matches[0];
  if (
    binding.blueprintDigest !== blueprint.contentDigest ||
    typeof binding.contractFile !== "string" ||
    inspectRelativeArtifactPath(binding.contractFile) !== null ||
    typeof binding.contractDigest !== "string" ||
    !digestPattern.test(binding.contractDigest) ||
    !Number.isSafeInteger(binding.contractBytes) ||
    binding.contractBytes < 1
  ) {
    fail(`prelaunch audit ${label} package binding unavailable`);
  }
  return {
    agentId: binding.agentId,
    blueprintDigest: binding.blueprintDigest,
    contractFile: binding.contractFile,
    contractDigest: binding.contractDigest,
    contractBytes: binding.contractBytes,
  };
}

function verifyPackagePair(candidate, expectation, label) {
  const verification = verifySpecialistPackage(candidate.renderedPackage, expectation);
  if (!verification.ok || verification.value === null) {
    fail(`${label} package verification failed`);
  }
}

export function buildPrelaunchPackageVerificationReceipt(candidate, auditCandidate, auditApproval) {
  const candidateExpectation = {
    compilationDigest: candidate.compilation.contentDigest,
    packageDigest: candidate.renderedPackage.packageDigest,
  };
  const auditExpectation = {
    compilationDigest: auditCandidate.compilation.contentDigest,
    packageDigest: auditCandidate.renderedPackage.packageDigest,
  };

  if (
    !["pass", "pending"].includes(auditApproval.result) ||
    (auditApproval.result === "pass" &&
      (!hasExactKeys(auditApproval.expectation, ["compilationDigest", "packageDigest"]) ||
        !hasExactKeys(auditApproval.binding, ["path", "digest", "bytes"]) ||
        auditApproval.expectation.compilationDigest !== auditExpectation.compilationDigest ||
        auditApproval.expectation.packageDigest !== auditExpectation.packageDigest ||
        auditApproval.binding.path !== auditApprovalFile ||
        typeof auditApproval.binding.digest !== "string" ||
        !digestPattern.test(auditApproval.binding.digest) ||
        !Number.isSafeInteger(auditApproval.binding.bytes) ||
        auditApproval.binding.bytes < 1 ||
        auditApproval.binding.bytes > approvalByteLimit))
  ) {
    fail("prelaunch audit approval receipt unavailable");
  }

  const binder = prelaunchAuditBindBlueprint(auditCandidate);
  const reviewer = prelaunchAuditReviewBlueprint(auditCandidate);
  return {
    apiVersion: prelaunchPackageVerificationReceiptVersion,
    kind: "PrelaunchPackageVerificationReceipt",
    outcome: auditApproval.result,
    verifier: {
      operation: "verifySpecialistPackage",
      specialistApiVersion: SPECIALIST_API_VERSION,
    },
    candidate: {
      ...candidateExpectation,
      verificationOutcome: "pass",
    },
    prelaunchAudit: {
      ...auditExpectation,
      verificationOutcome: "pass",
      approvalOutcome: auditApproval.result,
    },
    auditApproval: auditApproval.result === "pass" ? auditApproval.binding : null,
    candidateLaunchApproved: false,
    binder: prelaunchAuditAgentBinding(auditCandidate, binder, "binder"),
    reviewer: prelaunchAuditAgentBinding(auditCandidate, reviewer, "reviewer"),
    launchWaves: auditCandidate.renderedPackage.manifest.launchWaves.map((wave) => ({
      start: wave.start,
      agentIds: [...wave.agentIds],
    })),
  };
}

function validatePrelaunchPackageVerificationReceipt(
  receipt,
  candidate,
  auditCandidate,
  repositoryRoot,
  authorizationOutcome,
) {
  const approval = readApproval(auditApprovalFile, true, repositoryRoot);
  if (
    approval === null ||
    approval.expectation.compilationDigest !== auditCandidate.compilation.contentDigest ||
    approval.expectation.packageDigest !== auditCandidate.renderedPackage.packageDigest
  ) {
    fail("launch authorization verification receipt stale");
  }
  const expected = buildPrelaunchPackageVerificationReceipt(candidate, auditCandidate, {
    result: "pass",
    expectation: approval.expectation,
    binding: approval.binding,
  });
  if (
    receipt === null ||
    typeof receipt !== "object" ||
    Array.isArray(receipt) ||
    receipt.apiVersion !== prelaunchPackageVerificationReceiptVersion ||
    receipt.kind !== "PrelaunchPackageVerificationReceipt" ||
    receipt.outcome !== "pass" ||
    authorizationOutcome !== receipt.outcome ||
    JSON.stringify(receipt) !== JSON.stringify(expected)
  ) {
    fail("launch authorization verification receipt malformed or stale");
  }
}

function validatePrelaunchAuditHandoff(handoff, candidate, auditCandidate, authorizationOutcome) {
  const malformed = () => fail("launch authorization handoff malformed");
  const topLevelKeys = [
    "apiVersion",
    "kind",
    "outcome",
    "destination",
    "goal",
    "reviewer",
    "candidate",
    "prelaunchAudit",
    "summary",
    "workUnitsCompleted",
    "artifacts",
    "evidence",
    "assumptions",
    "risks",
    "followUps",
  ];
  if (
    !hasExactKeys(handoff, topLevelKeys) ||
    !hasExactKeys(handoff.goal, ["id", "revision", "digest"]) ||
    !hasExactKeys(handoff.reviewer, ["agentId", "blueprintDigest"]) ||
    !hasExactKeys(handoff.candidate, ["compilationDigest", "packageDigest"]) ||
    !hasExactKeys(handoff.prelaunchAudit, ["compilationDigest", "packageDigest"]) ||
    handoff.apiVersion !== prelaunchAuditHandoffVersion ||
    handoff.kind !== "PrelaunchAuditHandoff" ||
    typeof handoff.outcome !== "string" ||
    !safeHandoffMetadataText(handoff.destination) ||
    !safeHandoffMetadataText(handoff.goal.id) ||
    !Number.isSafeInteger(handoff.goal.revision) ||
    handoff.goal.revision < 1 ||
    !digestPattern.test(handoff.goal.digest) ||
    !safeHandoffMetadataText(handoff.reviewer.agentId) ||
    !digestPattern.test(handoff.reviewer.blueprintDigest) ||
    !digestPattern.test(handoff.candidate.compilationDigest) ||
    !digestPattern.test(handoff.candidate.packageDigest) ||
    !digestPattern.test(handoff.prelaunchAudit.compilationDigest) ||
    !digestPattern.test(handoff.prelaunchAudit.packageDigest) ||
    !safeHandoffMetadataText(handoff.summary) ||
    !safeHandoffMetadataTextList(handoff.assumptions) ||
    !safeHandoffMetadataTextList(handoff.risks) ||
    !safeHandoffMetadataTextList(handoff.followUps) ||
    !Array.isArray(handoff.workUnitsCompleted) ||
    !Array.isArray(handoff.artifacts) ||
    !Array.isArray(handoff.evidence)
  ) {
    malformed();
  }
  if (handoff.outcome !== "pass" || authorizationOutcome !== handoff.outcome) {
    fail("launch authorization handoff did not pass");
  }

  const reviewer = prelaunchAuditReviewBlueprint(auditCandidate);
  if (
    handoff.goal.id !== auditCandidate.compilation.goal.id ||
    handoff.goal.revision !== auditCandidate.compilation.goal.revision ||
    handoff.goal.digest !== auditCandidate.compilation.goalDigest ||
    handoff.reviewer.agentId !== reviewer.id ||
    handoff.reviewer.blueprintDigest !== reviewer.contentDigest ||
    handoff.destination !== reviewer.handoff.destination ||
    handoff.candidate.compilationDigest !== candidate.compilation.contentDigest ||
    handoff.candidate.packageDigest !== candidate.renderedPackage.packageDigest ||
    handoff.prelaunchAudit.compilationDigest !== auditCandidate.compilation.contentDigest ||
    handoff.prelaunchAudit.packageDigest !== auditCandidate.renderedPackage.packageDigest
  ) {
    fail("launch authorization handoff stale");
  }
  if (!sameTextList(handoff.workUnitsCompleted, reviewer.workUnitIds)) {
    malformed();
  }

  if (handoff.artifacts.length !== reviewer.handoff.artifacts.length) {
    malformed();
  }
  for (const [index, artifact] of handoff.artifacts.entries()) {
    if (
      !hasExactKeys(artifact, ["name", "mediaType", "content"]) ||
      artifact.name !== reviewer.handoff.artifacts[index] ||
      artifact.mediaType !== "text/markdown" ||
      !safeHandoffArtifactText(artifact.content)
    ) {
      malformed();
    }
  }

  if (handoff.evidence.length !== reviewer.evidenceDuties.length) {
    malformed();
  }
  const evidenceByRequirement = new Map();
  for (const evidence of handoff.evidence) {
    if (
      !hasExactKeys(evidence, [
        "criterionId",
        "requirementId",
        "kind",
        "duty",
        "status",
        "artifact",
      ]) ||
      evidence.status !== "pass" ||
      !reviewer.handoff.artifacts.includes(evidence.artifact) ||
      evidenceByRequirement.has(evidence.requirementId)
    ) {
      malformed();
    }
    evidenceByRequirement.set(evidence.requirementId, evidence);
  }
  for (const duty of reviewer.evidenceDuties) {
    const evidence = evidenceByRequirement.get(duty.requirementId);
    if (
      evidence === undefined ||
      evidence.criterionId !== duty.criterionId ||
      evidence.kind !== duty.kind ||
      evidence.duty !== duty.duty
    ) {
      malformed();
    }
  }
}

export function verifyLaunchAuthorization(
  candidate,
  auditCandidate,
  repositoryRoot = root,
  candidateFile = launchAuthorizationFile,
) {
  const value = readDogfoodControlJson(repositoryRoot, candidateFile, launchAuthorizationByteLimit);
  const malformed = () => fail("launch authorization malformed");
  if (!hasExactKeys(value, ["candidate", "prelaunchAudit", "verificationReceipt", "handoff"])) {
    malformed();
  }
  if (
    !hasExactKeys(value.candidate, ["compilationDigest", "packageDigest"]) ||
    !hasExactKeys(value.prelaunchAudit, ["compilationDigest", "packageDigest"]) ||
    !hasExactKeys(value.verificationReceipt, ["path", "digest", "bytes", "outcome"]) ||
    !hasExactKeys(value.handoff, ["path", "digest", "bytes", "outcome"])
  ) {
    malformed();
  }

  const digestValues = [
    value.candidate.compilationDigest,
    value.candidate.packageDigest,
    value.prelaunchAudit.compilationDigest,
    value.prelaunchAudit.packageDigest,
    value.verificationReceipt.digest,
    value.handoff.digest,
  ];
  if (
    digestValues.some((entry) => typeof entry !== "string" || !digestPattern.test(entry)) ||
    value.verificationReceipt.path !== prelaunchPackageVerificationReceiptFile ||
    !Number.isSafeInteger(value.verificationReceipt.bytes) ||
    value.verificationReceipt.bytes < 1 ||
    value.verificationReceipt.bytes > prelaunchPackageVerificationReceiptByteLimit ||
    value.verificationReceipt.outcome !== "pass" ||
    typeof value.handoff.path !== "string" ||
    !Number.isSafeInteger(value.handoff.bytes) ||
    value.handoff.bytes < 1 ||
    value.handoff.bytes > prelaunchAuditHandoffByteLimit ||
    value.handoff.outcome !== "pass"
  ) {
    malformed();
  }

  if (
    value.candidate.compilationDigest !== candidate.compilation.contentDigest ||
    value.candidate.packageDigest !== candidate.renderedPackage.packageDigest ||
    value.prelaunchAudit.compilationDigest !== auditCandidate.compilation.contentDigest ||
    value.prelaunchAudit.packageDigest !== auditCandidate.renderedPackage.packageDigest
  ) {
    fail("launch authorization stale");
  }

  const handoffPrefix = `${evidenceDirectory}/handoffs/`;
  if (
    !safeHandoffMetadataText(value.handoff.path) ||
    !value.handoff.path.startsWith(handoffPrefix) ||
    inspectRelativeArtifactPath(value.handoff.path) !== null
  ) {
    malformed();
  }

  const resolvedRoot = requireRepositoryRoot(repositoryRoot);
  const receiptBytes = readFixedContainedBytes(
    resolvedRoot,
    value.verificationReceipt.path,
    prelaunchPackageVerificationReceiptByteLimit,
  );
  if (
    receiptBytes.byteLength !== value.verificationReceipt.bytes ||
    digest(receiptBytes) !== value.verificationReceipt.digest
  ) {
    fail("launch authorization verification receipt mismatch");
  }
  const parsedReceipt = parseJsonBuffer(
    receiptBytes,
    value.verificationReceipt.path,
    prelaunchPackageVerificationReceiptByteLimit,
  );
  if (
    parsedReceipt.value === null ||
    parsedReceipt.diagnostics.some((diagnostic) => diagnostic.severity === "error")
  ) {
    fail("launch authorization verification receipt malformed");
  }
  validatePrelaunchPackageVerificationReceipt(
    parsedReceipt.value,
    candidate,
    auditCandidate,
    repositoryRoot,
    value.verificationReceipt.outcome,
  );

  const handoffBytes = readFixedContainedBytes(
    resolvedRoot,
    value.handoff.path,
    prelaunchAuditHandoffByteLimit,
  );
  if (
    handoffBytes.byteLength !== value.handoff.bytes ||
    digest(handoffBytes) !== value.handoff.digest
  ) {
    fail("launch authorization handoff mismatch");
  }
  const parsedHandoff = parseJsonBuffer(
    handoffBytes,
    value.handoff.path,
    prelaunchAuditHandoffByteLimit,
  );
  if (
    parsedHandoff.value === null ||
    parsedHandoff.diagnostics.some((diagnostic) => diagnostic.severity === "error")
  ) {
    fail("launch authorization handoff malformed");
  }
  validatePrelaunchAuditHandoff(
    parsedHandoff.value,
    candidate,
    auditCandidate,
    value.handoff.outcome,
  );
  return value;
}

function buildEvidence(candidate, approval) {
  const { compilation, context, renderedPackage } = candidate;
  const report = {
    reportVersion: "1.0.0",
    result: approval.result,
    goalId: compilation.goal.id,
    goalRevision: compilation.goal.revision,
    assumptions: compilation.goal.assumptions,
    unresolvedDecisions: compilation.goal.unresolvedDecisions,
    contextVerification: {
      result: "pass",
      verifiedSources: context,
    },
    compilationDigest: compilation.contentDigest,
    search: compilation.search,
    serialBaseline: {
      id: compilation.serialBaseline.id,
      eligible: compilation.serialBaseline.eligible,
      rejectionCodes: compilation.serialBaseline.rejectionCodes,
      metrics: compilation.serialBaseline.metrics,
    },
    selectionReason: compilation.selectionReason,
    selected: {
      id: compilation.selected.id,
      partition: compilation.selected.partition,
      metrics: compilation.selected.metrics,
    },
    proposalEvaluations: compilation.proposalEvaluations.map((evaluation) => ({
      id: evaluation.id,
      proposalIds: evaluation.proposalIds,
      eligible: evaluation.eligible,
      rejectionCodes: evaluation.rejectionCodes,
      metrics: evaluation.metrics,
    })),
    launchWaves: compilation.launchWaves,
    blueprintAssignments: compilation.blueprints.map((blueprint) => ({
      agentId: blueprint.id,
      blueprintDigest: blueprint.contentDigest,
      workUnitIds: blueprint.workUnitIds,
      dependencies: blueprint.dependencies,
      requiredCapabilities: blueprint.authority.requiredCapabilities,
    })),
    package: {
      verification: {
        result: approval.result,
        expectationFile: "approval.json",
        ...(approval.reason === undefined ? {} : { pendingReason: approval.reason }),
      },
      packageDigest: renderedPackage.packageDigest,
      manifestDigest: renderedPackage.manifest.contentDigest,
      files: renderedPackage.files.map((file) => ({
        path: file.path,
        bytes: file.bytes,
        digest: file.digest,
      })),
    },
  };
  return { approval, compilation, renderedPackage, report };
}

function addExpectedFile(files, candidate, content) {
  if (files.has(candidate)) {
    fail(`duplicate fixed evidence path: ${candidate}`);
  }
  files.set(candidate, content);
}

function expectedFiles(
  evidence,
  {
    baseDirectory = evidenceDirectory,
    ownedPackageDirectory = packageDirectory,
    goal,
    additionalFiles = new Map(),
  } = {},
) {
  const files = new Map();
  if (goal !== undefined) {
    addExpectedFile(files, `${baseDirectory}/goal-contract.json`, json(goal));
  }
  addExpectedFile(files, `${baseDirectory}/compilation.json`, json(evidence.compilation));
  addExpectedFile(files, `${baseDirectory}/report.json`, json(evidence.report));
  for (const file of evidence.renderedPackage.files) {
    const pathDiagnostic = inspectRelativeArtifactPath(file.path);
    if (pathDiagnostic !== null) {
      fail(`unsafe rendered package path ${file.path}: ${pathDiagnostic}`);
    }
    addExpectedFile(files, `${ownedPackageDirectory}/${file.path}`, file.content);
  }
  for (const [candidate, content] of additionalFiles) {
    addExpectedFile(files, candidate, content);
  }
  return files;
}

function uniqueText(values) {
  return [...new Set(values)].sort(compareText);
}

function candidateAuditArtifacts(files) {
  const packagePrefix = `${packageDirectory}/`;
  const compilationPath = `${evidenceDirectory}/compilation.json`;
  return sortedEvidenceEntries(files).filter(
    ([candidate]) => candidate === compilationPath || candidate.startsWith(packagePrefix),
  );
}

export function buildPrelaunchAuditGoal(candidate, candidateFiles) {
  const artifacts = candidateAuditArtifacts(candidateFiles);
  const expectedArtifactCount = candidate.renderedPackage.files.length + 1;
  if (artifacts.length !== expectedArtifactCount) {
    fail(
      `prelaunch audit requires ${expectedArtifactCount} immutable candidate artifacts; received ${artifacts.length}`,
    );
  }

  const bindUnitId = prelaunchAuditBindUnitId;
  const reviewUnitId = "audit.review-candidate-compilation";
  const artifactContexts = artifacts.map(([candidatePath, content], index) => {
    const bytes = Buffer.from(content, "utf8");
    return {
      id: `context.candidate-artifact.${String(index + 1).padStart(2, "0")}`,
      kind: "repository",
      locator: `path:${candidatePath}`,
      digest: digest(bytes),
      bytes: bytes.byteLength,
      description: `Immutable candidate artifact: ${candidatePath}.`,
      allowedWorkUnits: [bindUnitId, reviewUnitId],
      readScope: candidatePath,
    };
  });

  const sourceContexts = candidate.compilation.goal.contextSources
    .filter(
      (source) =>
        source.allowedWorkUnits.includes("review.algorithm-lifecycle") ||
        source.allowedWorkUnits.includes("review.security-trace"),
    )
    .map((source) => {
      if (source.kind !== "repository") {
        fail(`prelaunch audit cannot authenticate non-repository context ${source.id}`);
      }
      return { ...source, allowedWorkUnits: [reviewUnitId] };
    });

  const artifactScopes = artifactContexts.map((source) => source.readScope);
  const reviewScopes = uniqueText([
    ...artifactScopes,
    ...sourceContexts.map((source) => source.readScope),
  ]);
  const artifactUses = artifactContexts.map((source) => ({
    sourceId: source.id,
    purpose: "Authenticate the exact frozen candidate compilation and rendered package.",
  }));
  const sourceUses = sourceContexts.map((source) => ({
    sourceId: source.id,
    purpose: "Audit the candidate against its declared compiler, contract, and test evidence.",
  }));

  return {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "GoalContract",
    id: "v11.specialist-compiler.prelaunch-audit",
    revision: candidate.compilation.goal.revision,
    objective: `Independently audit candidate ${candidate.compilation.contentDigest} and package ${candidate.renderedPackage.packageDigest} before launch approval.`,
    integrationOwner: "v11.integration-owner",
    assumptions: [
      {
        id: "assumption.audit-is-trust-root",
        statement:
          "The owner reviews and separately approves this small read-only audit package; it does not recursively review itself.",
        rationale: "A finite assurance protocol requires an explicit human-approved trust root.",
      },
      {
        id: "assumption.candidate-is-immutable",
        statement:
          "Every candidate compilation and package file is authenticated by exact bytes and digest before audit.",
        rationale: "Any candidate change must invalidate this audit compilation and package.",
      },
      {
        id: "assumption.host-enforces-audit-boundary",
        statement:
          "The external host enforces the audit package's read-only authority and launch ordering.",
        rationale: "V11 compiles and verifies contracts but performs no runtime enforcement.",
      },
      {
        id: "assumption.host-delivers-verification-receipt",
        statement:
          "The host delivers an immutable package-verification receipt as runtime input after reconstructing Candidate A and approval-verifying Audit B.",
        rationale:
          "Audit B cannot digest-bind its own final package without self-reference; the external receipt makes the trusted host boundary explicit.",
      },
    ],
    unresolvedDecisions: [],
    acceptanceCriteria: [
      {
        id: "criterion.candidate-selection",
        description:
          "The exact candidate search, selection, schedule, metrics, and digest claims are reproducible and accurate.",
        evidenceRequirements: [
          {
            id: "evidence.candidate-selection-binding",
            kind: "digest",
            duty: "produce",
            description:
              "Exact candidate compilation and package bytes plus the host package-verification receipt bound for review.",
            independentFromProducer: false,
          },
          {
            id: "evidence.candidate-selection-review",
            kind: "review",
            duty: "review",
            description: "Independent semantic review of the selected candidate and search claims.",
            independentFromProducer: true,
          },
        ],
      },
      {
        id: "criterion.candidate-authority-package",
        description:
          "The exact blueprints, authority, evidence coverage, handoffs, and rendered package preserve the reviewed goal.",
        evidenceRequirements: [
          {
            id: "evidence.candidate-authority-binding",
            kind: "digest",
            duty: "produce",
            description:
              "Exact candidate authority, rendered contracts, and host package-verification receipt bound for review.",
            independentFromProducer: false,
          },
          {
            id: "evidence.candidate-authority-review",
            kind: "review",
            duty: "review",
            description: "Independent semantic review of candidate authority and package bindings.",
            independentFromProducer: true,
          },
        ],
      },
    ],
    contextSources: [...artifactContexts, ...sourceContexts],
    authority: {
      allowedModules: ["audit.bind-candidate", "audit.review-candidate-compilation"],
      allowedCapabilities: ["candidate.bind", "review.candidate-compilation"],
      permissionCeiling: [
        { kind: "filesystem.read", scopes: reviewScopes },
        { kind: "process.spawn", scopes: ["node", "powershell", "rg"] },
      ],
      forbiddenEffects: [
        "Do not approve or launch the candidate package.",
        "Do not access a network or provider.",
        "Do not modify repository files, candidate evidence, or durable memory.",
        "Do not widen candidate or audit authority.",
      ],
      maxAgents: 2,
      maxConcurrency: 1,
    },
    optimization: { agentStartupCost: 2, handoffCost: 1 },
    workUnits: [
      {
        id: bindUnitId,
        objective:
          "Bind the complete candidate compilation and rendered package to immutable review evidence.",
        weight: 1,
        module: {
          id: "audit.bind-candidate",
          action: "Authenticate every candidate artifact before semantic review.",
          inputPorts: [
            { name: "candidate", artifactType: "RenderedSpecialistPackage" },
            { name: "verification-receipt", artifactType: "PrelaunchPackageVerificationReceipt" },
          ],
          outputPorts: [{ name: "binding", artifactType: "CandidateAuditBinding" }],
        },
        dependencies: [],
        requiredCapabilities: ["candidate.bind"],
        contextUses: artifactUses,
        scope: { read: artifactScopes, write: [], conflictZones: [] },
        permissions: [{ kind: "filesystem.read", scopes: artifactScopes }],
        evidenceRequirementIds: [
          "evidence.candidate-selection-binding",
          "evidence.candidate-authority-binding",
        ],
        handoffArtifacts: ["candidate-audit-binding.json"],
        stopConditions: [
          "Stop if any candidate artifact is absent or differs from its declared bytes or digest.",
          "Stop if the host-delivered PrelaunchPackageVerificationReceipt is absent, non-PASS, malformed, or binds different Candidate A or Audit B identities.",
        ],
      },
      {
        id: reviewUnitId,
        objective:
          "Independently audit the exact candidate selection, authority, evidence coverage, schedule, digests, and rendered contracts.",
        weight: 10,
        module: {
          id: "audit.review-candidate-compilation",
          action:
            "Reproduce and review the frozen candidate compilation and package before launch.",
          inputPorts: [
            { name: "binding", artifactType: "CandidateAuditBinding" },
            { name: "verification-receipt", artifactType: "PrelaunchPackageVerificationReceipt" },
          ],
          outputPorts: [{ name: "review", artifactType: "CandidateCompilationReview" }],
        },
        dependencies: [bindUnitId],
        requiredCapabilities: ["review.candidate-compilation"],
        contextUses: [...artifactUses, ...sourceUses],
        scope: { read: reviewScopes, write: [], conflictZones: [] },
        permissions: [
          { kind: "filesystem.read", scopes: reviewScopes },
          { kind: "process.spawn", scopes: ["node", "powershell", "rg"] },
        ],
        evidenceRequirementIds: [
          "evidence.candidate-selection-review",
          "evidence.candidate-authority-review",
        ],
        handoffArtifacts: ["candidate-compilation-review.md"],
        stopConditions: [
          "Stop with FIX if the host-delivered PrelaunchPackageVerificationReceipt is absent, non-PASS, malformed, or binds different Candidate A or Audit B identities.",
          "Stop with FIX if the exact candidate cannot be reconstructed from authenticated bytes.",
          "Stop with FIX if selection, authority, evidence, schedule, digest, or package claims differ.",
          `Stop with FIX unless the raw result is a closed ${prelaunchAuditHandoffVersion} PrelaunchAuditHandoff JSON object that binds this goal, reviewer blueprint, Candidate A and Audit B digest pairs, both review duties, and a pass outcome.`,
        ],
      },
    ],
  };
}

function buildPrelaunchAuditCandidate(candidate, candidateFiles, repositoryRoot = root) {
  const goal = buildPrelaunchAuditGoal(candidate, candidateFiles);
  return compileCandidate(goal, repositoryRoot);
}

function sortedEvidenceEntries(files) {
  return [...files.entries()].sort(([left], [right]) => compareText(left, right));
}

export function writeDogfoodEvidenceFiles(repositoryRoot, ownedPackageDirectory, files) {
  const resolvedRoot = requireRepositoryRoot(repositoryRoot);
  const entries = sortedEvidenceEntries(files);

  for (const [candidate, content] of entries) {
    if (typeof candidate !== "string" || typeof content !== "string") {
      fail("fixed evidence entries must map relative paths to text");
    }
    requireSafeEvidenceFile(resolvedRoot, candidate);
  }
  requireSafeEvidenceDirectory(resolvedRoot, ownedPackageDirectory);
  listSafeEvidenceFiles(resolvedRoot, ownedPackageDirectory);

  removeSafeEvidenceTree(resolvedRoot, ownedPackageDirectory);
  for (const [candidate, content] of entries) {
    writeSafeEvidenceFile(resolvedRoot, candidate, content);
  }
}

export function checkDogfoodEvidenceFiles(repositoryRoot, ownedPackageDirectory, files) {
  const resolvedRoot = requireRepositoryRoot(repositoryRoot);
  const entries = sortedEvidenceEntries(files);

  for (const [candidate, content] of entries) {
    if (typeof candidate !== "string" || typeof content !== "string") {
      fail("fixed evidence entries must map relative paths to text");
    }
    const expectedBytes = Buffer.from(content, "utf8");
    const result = readContainedFileBytes(
      resolvedRoot.root,
      resolvedRoot.realRoot,
      candidate,
      "SC1001",
      expectedBytes.byteLength,
      "SC5001",
    );
    if (result.bytes === null) {
      fail(
        `committed evidence read rejected for ${candidate}: ${formatDiagnostics(result.diagnostics)}`,
      );
    }
    if (!Buffer.from(result.bytes).equals(expectedBytes)) {
      fail(`committed evidence differs: ${candidate}`);
    }
  }

  const packagePrefix = `${ownedPackageDirectory}/`;
  const expectedPackageFiles = new Set(
    entries
      .map(([candidate]) => candidate)
      .filter((candidate) => candidate.startsWith(packagePrefix)),
  );
  const actualPackageFiles = listSafeEvidenceFiles(resolvedRoot, ownedPackageDirectory);
  if (
    actualPackageFiles.length !== expectedPackageFiles.size ||
    actualPackageFiles.some((candidate) => !expectedPackageFiles.has(candidate))
  ) {
    fail("committed package contains missing or stale files");
  }
}

function writeEvidence(evidence, options = {}) {
  const ownedPackageDirectory = options.ownedPackageDirectory ?? packageDirectory;
  writeDogfoodEvidenceFiles(root, ownedPackageDirectory, expectedFiles(evidence, options));
}

function checkEvidence(evidence, options = {}) {
  const ownedPackageDirectory = options.ownedPackageDirectory ?? packageDirectory;
  checkDogfoodEvidenceFiles(root, ownedPackageDirectory, expectedFiles(evidence, options));
}

function compilationSummary(evidence) {
  return {
    result: evidence.approval.result,
    compilationDigest: evidence.compilation.contentDigest,
    packageDigest: evidence.renderedPackage.packageDigest,
    selectedAgents: evidence.compilation.blueprints.length,
    projectedMakespan: evidence.compilation.selected.metrics?.projectedMakespan ?? null,
    serialEligible: evidence.compilation.serialBaseline.eligible,
    serialProjectedMakespan: evidence.compilation.serialBaseline.metrics?.projectedMakespan ?? null,
    searchMode: evidence.compilation.search.mode,
    evaluatedCandidates: evidence.compilation.search.evaluatedCandidates,
  };
}

export function runV11Dogfood(args) {
  const modes = ["--write-evidence", "--check-prelaunch-audit", "--check-evidence"];
  if (args.length !== 1 || !modes.includes(args[0])) {
    fail(
      "usage: node scripts/run-v11-dogfood.mjs --write-evidence|--check-prelaunch-audit|--check-evidence",
    );
  }

  const mode = args[0];
  const checking = mode !== "--write-evidence";
  const candidate = buildCandidate();
  const candidateApproval = approvalStatus(candidate, approvalFile, mode === "--check-evidence");
  const candidateEvidence = buildEvidence(candidate, candidateApproval);
  const candidateFiles = expectedFiles(candidateEvidence);
  if (checking) {
    checkEvidence(candidateEvidence);
  } else {
    writeEvidence(candidateEvidence);
  }

  const auditCandidate = buildPrelaunchAuditCandidate(candidate, candidateFiles);
  const auditApproval = approvalStatus(auditCandidate, auditApprovalFile, checking);
  verifyPackagePair(
    candidate,
    {
      compilationDigest: candidate.compilation.contentDigest,
      packageDigest: candidate.renderedPackage.packageDigest,
    },
    "candidate",
  );
  verifyPackagePair(
    auditCandidate,
    auditApproval.result === "pass"
      ? auditApproval.expectation
      : {
          compilationDigest: auditCandidate.compilation.contentDigest,
          packageDigest: auditCandidate.renderedPackage.packageDigest,
        },
    "prelaunch audit",
  );
  const packageVerificationReceipt = buildPrelaunchPackageVerificationReceipt(
    candidate,
    auditCandidate,
    auditApproval,
  );
  const packageVerificationReceiptContent = json(packageVerificationReceipt);
  const packageVerificationReceiptBinding = {
    path: prelaunchPackageVerificationReceiptFile,
    digest: digest(Buffer.from(packageVerificationReceiptContent, "utf8")),
    bytes: Buffer.byteLength(packageVerificationReceiptContent, "utf8"),
    outcome: packageVerificationReceipt.outcome,
  };
  const auditEvidence = buildEvidence(auditCandidate, auditApproval);
  const auditOptions = {
    baseDirectory: auditDirectory,
    ownedPackageDirectory: auditPackageDirectory,
    goal: auditCandidate.compilation.goal,
    additionalFiles: new Map([
      [prelaunchPackageVerificationReceiptFile, packageVerificationReceiptContent],
    ]),
  };
  if (checking) {
    checkEvidence(auditEvidence, auditOptions);
  } else {
    writeEvidence(auditEvidence, auditOptions);
  }

  const launchAuthorization =
    mode === "--check-evidence" ? verifyLaunchAuthorization(candidate, auditCandidate) : null;
  const candidateSummary = compilationSummary(candidateEvidence);
  const auditSummary = compilationSummary(auditEvidence);
  const launchAuthorizationSummary = {
    result: launchAuthorization === null ? "pending" : "pass",
  };
  const packageVerificationReceiptSummary = {
    result: packageVerificationReceipt.outcome,
    ...packageVerificationReceiptBinding,
  };
  const summary = {
    result:
      mode === "--check-prelaunch-audit"
        ? packageVerificationReceiptSummary.result
        : candidateSummary.result === "pass" &&
            auditSummary.result === "pass" &&
            packageVerificationReceiptSummary.result === "pass" &&
            launchAuthorizationSummary.result === "pass"
          ? "pass"
          : "pending",
    candidate: candidateSummary,
    prelaunchAudit: auditSummary,
    packageVerificationReceipt: packageVerificationReceiptSummary,
    launchAuthorization: launchAuthorizationSummary,
  };
  process.stdout.write(`${JSON.stringify(summary)}\n`);
  return summary;
}

const entryPath = process.argv[1];
if (entryPath !== undefined && pathToFileURL(resolve(entryPath)).href === import.meta.url) {
  runV11Dogfood(process.argv.slice(2));
}
