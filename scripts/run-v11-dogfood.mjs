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

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const evidenceDirectory = "docs/specs/v11-specialist-compiler/evidence/dogfood";
const approvalFile = `${evidenceDirectory}/approval.json`;
const goalFile = `${evidenceDirectory}/goal-contract.json`;
const packageDirectory = `${evidenceDirectory}/package`;
const digestPattern = /^sha256:[0-9a-f]{64}$/;
const approvalByteLimit = 512;
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

function buildCandidate(repositoryRoot = root) {
  const inputGoal = readDogfoodControlJson(repositoryRoot, goalFile, SPECIALIST_LIMITS.inputBytes);
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
    proposedCandidates: proposals(goal),
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

function readApproval(required, repositoryRoot = root) {
  const value = readDogfoodControlJson(repositoryRoot, approvalFile, approvalByteLimit, {
    optional: true,
  });
  if (value === null) {
    if (required) {
      fail(approvalErrors.missing);
    }
    return null;
  }
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    Object.keys(value).length !== 2 ||
    !Object.hasOwn(value, "compilationDigest") ||
    !Object.hasOwn(value, "packageDigest") ||
    typeof value.compilationDigest !== "string" ||
    typeof value.packageDigest !== "string" ||
    !digestPattern.test(value.compilationDigest) ||
    !digestPattern.test(value.packageDigest)
  ) {
    fail(approvalErrors.malformed);
  }
  return {
    compilationDigest: value.compilationDigest,
    packageDigest: value.packageDigest,
  };
}

function approvalStatus(candidate, required) {
  const approval = readApproval(required);
  if (approval === null) {
    return { result: "pending", reason: "missing" };
  }
  if (
    approval.compilationDigest !== candidate.compilation.contentDigest ||
    approval.packageDigest !== candidate.renderedPackage.packageDigest
  ) {
    if (required) {
      fail(approvalErrors.stale);
    }
    return { result: "pending", reason: "stale" };
  }

  const verificationResult = verifySpecialistPackage(candidate.renderedPackage, approval);
  if (!verificationResult.ok || verificationResult.value === null) {
    fail(approvalErrors.failed);
  }
  return { result: "pass" };
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

function expectedFiles(evidence) {
  const files = new Map();
  addExpectedFile(files, `${evidenceDirectory}/compilation.json`, json(evidence.compilation));
  addExpectedFile(files, `${evidenceDirectory}/report.json`, json(evidence.report));
  for (const file of evidence.renderedPackage.files) {
    const pathDiagnostic = inspectRelativeArtifactPath(file.path);
    if (pathDiagnostic !== null) {
      fail(`unsafe rendered package path ${file.path}: ${pathDiagnostic}`);
    }
    addExpectedFile(files, `${packageDirectory}/${file.path}`, file.content);
  }
  return files;
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

function writeEvidence(evidence) {
  writeDogfoodEvidenceFiles(root, packageDirectory, expectedFiles(evidence));
}

function checkEvidence(evidence) {
  checkDogfoodEvidenceFiles(root, packageDirectory, expectedFiles(evidence));
}

export function runV11Dogfood(args) {
  if (args.length !== 1 || !["--write-evidence", "--check-evidence"].includes(args[0])) {
    fail("usage: node scripts/run-v11-dogfood.mjs --write-evidence|--check-evidence");
  }

  const candidate = buildCandidate();
  const approval = approvalStatus(candidate, args[0] === "--check-evidence");
  const evidence = buildEvidence(candidate, approval);
  if (args[0] === "--write-evidence") {
    writeEvidence(evidence);
  } else {
    checkEvidence(evidence);
  }

  const summary = {
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
  process.stdout.write(`${JSON.stringify(summary)}\n`);
  return summary;
}

const entryPath = process.argv[1];
if (entryPath !== undefined && pathToFileURL(resolve(entryPath)).href === import.meta.url) {
  runV11Dogfood(process.argv.slice(2));
}
