import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  compileAgentBlueprints,
  renderSpecialistPackage,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../../../../../dist/index.js";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const INPUTS = join(EVIDENCE, "inputs");
const PACKAGE_DIR = join(EVIDENCE, "package");
const mode = process.argv[2] ?? "prepare";
const checkpoint = process.argv[3];

const BASELINE = "c2f974d2288fc510cb8388fbc8e6abe9fd5d9e8c";
const CANDIDATE_PATTERN = /^[0-9a-f]{40}$/;
const DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;
const SNAPSHOT_ROOT =
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/source-snapshots";
const CANDIDATE_MANIFEST =
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/candidate.json";
const PRE_INTEGRATION_REVIEW =
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/pre-integration-review.md";
const GATE_RECEIPT =
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json";
const GATE_STDOUT =
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log";
const GATE_STDERR =
  "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log";

const PRODUCT = "review.r2.product-api-ide";
const LIFECYCLE = "review.r2.lifecycle-correctness";
const SECURITY = "review.r2.security-trace-authority";
const ALL_REVIEWS = Object.freeze([PRODUCT, LIFECYCLE, SECURITY]);

function source(id, path, description, allowedWorkUnits, snapshotPath = null) {
  return { id, path, description, allowedWorkUnits, snapshotPath };
}

const STATIC_SOURCES = [
  source(
    "context.spec",
    "docs/specs/v12-ide-run-loop/spec.md",
    "V12 acceptance contract.",
    ALL_REVIEWS,
  ),
  source(
    "context.run-contract",
    "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
    "Normative Specialist Run contract.",
    ALL_REVIEWS,
  ),
  source(
    "context.adr",
    "docs/architecture/decisions/0005-immutable-specialist-run-session.md",
    "Accepted V12 architecture decision.",
    ALL_REVIEWS,
  ),
  source(
    "context.architecture",
    "docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
    "Integrated V12 implementation architecture.",
    ALL_REVIEWS,
  ),
  source(
    "context.test-plan",
    "docs/specs/v12-ide-run-loop/test-plan.md",
    "V12 verification and release plan.",
    ALL_REVIEWS,
  ),
  source(
    "context.implementation-notes",
    "docs/specs/v12-ide-run-loop/implementation-notes.md",
    "Integrated implementation and verification record.",
    ALL_REVIEWS,
  ),
  source(
    "context.debug-notes",
    "docs/specs/v12-ide-run-loop/debug-notes.md",
    "Preserved failures, diagnoses, and causal corrections.",
    ALL_REVIEWS,
  ),
  source(
    "context.pre-integration-review",
    "docs/specs/v12-ide-run-loop/review.md",
    "Immutable pre-integration release-review snapshot.",
    ALL_REVIEWS,
    PRE_INTEGRATION_REVIEW,
  ),
  source("context.readme", "README.md", "Concise public product surface.", [PRODUCT]),
  source(
    "context.package",
    "package.json",
    "Published package and export surface.",
    [PRODUCT, SECURITY],
  ),
  source(
    "context.index",
    "src/index.ts",
    "Public TypeScript exports.",
    [PRODUCT, SECURITY],
  ),
  source(
    "context.schema-guide",
    "schemas/v1alpha1/README.md",
    "Published schema semantics and host boundary.",
    [PRODUCT, SECURITY],
  ),
  source(
    "context.ide-guide",
    "docs/ide/specialist-agent-kickoff.md",
    "Visible IDE run-loop procedure.",
    [PRODUCT, SECURITY],
  ),
  source(
    "context.module-guide",
    "docs/modules/specialist-run-session.md",
    "Reusable Specialist Run module contract.",
    [PRODUCT],
  ),
  source(
    "context.modules-index",
    "docs/modules/README.md",
    "Module catalog integration.",
    [PRODUCT],
  ),
  source(
    "context.dogfood",
    "scripts/run-v12-dogfood.mjs",
    "Deterministic four-operation IDE journey.",
    [PRODUCT, LIFECYCLE],
  ),
  source(
    "context.release-gate-harness",
    "scripts/run-v12-release-gate.mjs",
    "Candidate-bound canonical-gate evidence wrapper.",
    ALL_REVIEWS,
  ),
  source(
    "context.review-r2-harness",
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
    "Immutable R2 release-review compiler and approval harness.",
    ALL_REVIEWS,
  ),
  source(
    "context.review-r2-handoff-verifier",
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
    "R2 exact raw reviewer handoff verifier.",
    ALL_REVIEWS,
  ),
  source(
    "context.consumer-check",
    "scripts/check-packed-consumer.mjs",
    "Clean installed-package compatibility gate.",
    [PRODUCT, LIFECYCLE],
  ),
  source(
    "context.consumer-host",
    "scripts/fixtures/packed-consumer-host.ts",
    "Public TypeScript consumer fixture.",
    [PRODUCT],
  ),
  source(
    "context.run-types",
    "src/specialist-run-types.ts",
    "Closed V12 public and wire types.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.run-schema",
    "src/specialist-run-schema.ts",
    "Strict effect-free run-session schema validator.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.run-schema-json",
    "schemas/v1alpha1/specialist-run.schema.json",
    "Published closed run-session JSON Schema.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.run-session",
    "src/specialist-run-session.ts",
    "Create and restore implementation.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.run-transition",
    "src/specialist-run-transition.ts",
    "Monotonic handoff transition implementation.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.run-inspection",
    "src/specialist-run-inspection.ts",
    "Deterministic package-DAG inspection implementation.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.constants",
    "src/constants.ts",
    "Public V12 limits and contract constants.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.diagnostics",
    "src/diagnostics.ts",
    "Stable runtime diagnostics.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.diagnostic-catalog",
    "schemas/v1alpha1/diagnostic-catalog.json",
    "Normative diagnostic catalog.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.handoff",
    "src/specialist-handoff.ts",
    "V11 exact raw handoff and fan-in verifier composed by V12.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.render",
    "src/specialist-render.ts",
    "V11 approved-package verification and manifest resolution.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.foundation-tests",
    "test/specialist-run-foundation.test.mjs",
    "V12 create, restore, identity, and boundary tests.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.transition-tests",
    "test/specialist-run-transition.test.mjs",
    "V12 transition, replay, and route tests.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.inspection-tests",
    "test/specialist-run-inspection.test.mjs",
    "V12 DAG inspection and readiness tests.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.schema-tests",
    "test/specialist-run-schema.test.mjs",
    "V12 strict schema, public export, and resource tests.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.adversarial-tests",
    "test/specialist-run.test.mjs",
    "Integrated adversarial, permutation, restore, and limit tests.",
    [LIFECYCLE, SECURITY],
  ),
  source(
    "context.v11-goal",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json",
    "Current V11 reviewed GoalContract.",
    [SECURITY],
  ),
  source(
    "context.v11-approval",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/approval.json",
    "Current Candidate-A approval binding.",
    [SECURITY],
  ),
  source(
    "context.v11-compilation",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
    "Current Candidate-A deterministic compilation.",
    [SECURITY],
  ),
  source(
    "context.v11-launch-authorization",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/launch-authorization.json",
    "Cross-package launch authorization.",
    [SECURITY],
  ),
  source(
    "context.v11-audit-receipt",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json",
    "Independent Audit-B package verification receipt.",
    [SECURITY],
  ),
  source(
    "context.v11-audit-approval",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
    "Exact owner-approved Audit-B digest pair bytes.",
    [SECURITY],
  ),
  source(
    "context.v11-audit-handoff",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass-attempt-32.json",
    "Exact independent semantic audit PASS handoff.",
    [SECURITY],
  ),
  source(
    "context.v11-report",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/report.json",
    "Current V11 dogfood report.",
    [SECURITY],
  ),
  source(
    "context.v12-verification-report",
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
    "Complete V12 verification-wave handoff gate.",
    ALL_REVIEWS,
  ),
  source(
    "context.v12-verification-handoff",
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
    "Exact raw V12 verification specialist PASS handoff.",
    ALL_REVIEWS,
  ),
  source(
    "context.v12-dogfood-handoff",
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
    "Exact raw V12 dogfood specialist PASS handoff.",
    ALL_REVIEWS,
  ),
  source(
    "context.review-r1-verification",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
    "Exact first release-review fan-in report.",
    ALL_REVIEWS,
  ),
  source(
    "context.review-r1-product-handoff",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
    "Exact raw first product/API/IDE review finding.",
    ALL_REVIEWS,
  ),
  source(
    "context.review-r1-lifecycle-handoff",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
    "Exact raw first lifecycle review finding.",
    ALL_REVIEWS,
  ),
  source(
    "context.review-r1-security-handoff",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
    "Exact raw first security/trace review finding.",
    ALL_REVIEWS,
  ),
];

const DYNAMIC_ROOTS = [
  {
    path: "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction",
    description: "Exact V12 release-correction package, handoffs, and primary evidence.",
    allowedWorkUnits: ALL_REVIEWS,
  },
  {
    path: "docs/specs/v12-ide-run-loop/evidence/implementation/verification",
    description: "Exact V12 implementation verification package and raw evidence.",
    allowedWorkUnits: ALL_REVIEWS,
  },
  {
    path: "docs/specs/v12-ide-run-loop/evidence/release-review",
    description: "Exact first release-review package and raw findings.",
    allowedWorkUnits: ALL_REVIEWS,
  },
  {
    path: "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit",
    description: "Exact V11 Audit-B package, approval, receipt, and semantic evidence.",
    allowedWorkUnits: [SECURITY],
  },
];

function compareOrdinal(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function requireValue(result, stage) {
  if (!result.ok || result.value === null) {
    const diagnostics = result.diagnostics
      .map((item) => `${item.code}:${item.message}`)
      .join("\n");
    throw new Error(`${stage} failed\n${diagnostics}`);
  }
  return result.value;
}

function absolute(path) {
  return join(ROOT, ...path.split("/"));
}

function snapshotPath(entry) {
  return entry.snapshotPath ?? `${SNAPSHOT_ROOT}/${entry.path}`;
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
    `${label} is not closed or is not canonical.`,
  );
}

function decodeUtf8(bytes, label) {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new Error(`${label} is not strict UTF-8.`);
  }
}

async function readJson(path) {
  const bytes = await readFile(absolute(path));
  return JSON.parse(decodeUtf8(bytes, path));
}

async function readCanonicalJson(path) {
  const bytes = await readFile(absolute(path));
  const text = decodeUtf8(bytes, path);
  const value = JSON.parse(text);
  requireCondition(
    `${JSON.stringify(value, null, 2)}\n` === text,
    `${path} is not canonical JSON with normalized LF.`,
  );
  return { bytes, value };
}

async function writeImmutable(path, bytes) {
  const output = absolute(path);
  await mkdir(dirname(output), { recursive: true });
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

async function writeImmutableJson(path, value) {
  await writeImmutable(path, Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8"));
}

async function walkFiles(root) {
  const output = [];
  async function visit(path) {
    const entries = await readdir(absolute(path), { withFileTypes: true });
    entries.sort((left, right) => compareOrdinal(left.name, right.name));
    for (const entry of entries) {
      const child = `${path}/${entry.name}`;
      if (entry.isDirectory()) {
        await visit(child);
      } else if (entry.isFile()) {
        output.push(child);
      }
    }
  }
  await visit(root);
  return output;
}

function dynamicSourceId(path) {
  return `context.snapshot.${createHash("sha256").update(path).digest("hex").slice(0, 24)}`;
}

async function collectSourceSpecs() {
  const byPath = new Map(STATIC_SOURCES.map((entry) => [entry.path, entry]));
  for (const root of DYNAMIC_ROOTS) {
    for (const path of await walkFiles(root.path)) {
      if (path.includes("/package/")) {
        continue;
      }
      if (!byPath.has(path)) {
        byPath.set(
          path,
          source(dynamicSourceId(path), path, root.description, root.allowedWorkUnits),
        );
      }
    }
  }

  for (const path of await walkFiles("src")) {
    if (path.startsWith("src/specialist-run") && !byPath.has(path)) {
      byPath.set(
        path,
        source(
          dynamicSourceId(path),
          path,
          "Complete V12 Specialist Run implementation source.",
          [LIFECYCLE, SECURITY],
        ),
      );
    }
  }
  for (const path of await walkFiles("test")) {
    if (path.startsWith("test/specialist-run") && !byPath.has(path)) {
      byPath.set(
        path,
        source(
          dynamicSourceId(path),
          path,
          "Complete V12 Specialist Run verification source.",
          [LIFECYCLE, SECURITY],
        ),
      );
    }
  }
  return [...byPath.values()].sort((left, right) => compareOrdinal(left.path, right.path));
}

function gitOutput(args) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: null,
    maxBuffer: 134_217_728,
  });
}

async function verifyCheckpoint(candidate, sources) {
  const head = Buffer.from(gitOutput(["rev-parse", "HEAD"])).toString("ascii").trim();
  requireCondition(head === candidate, `Candidate checkpoint mismatch: HEAD is ${head}.`);
  try {
    gitOutput(["diff", "--quiet", "HEAD", "--"]);
  } catch {
    throw new Error("Tracked repository state differs from candidate HEAD.");
  }

  for (const entry of sources) {
    const disk = await readFile(absolute(entry.path));
    let committed;
    try {
      committed = Buffer.from(gitOutput(["show", `${candidate}:${entry.path}`]));
    } catch {
      throw new Error(`Reviewer source is not committed in candidate ${candidate}: ${entry.path}.`);
    }
    requireCondition(
      disk.equals(committed),
      `Reviewer source differs from candidate ${candidate}: ${entry.path}.`,
    );
  }
}

async function binding(path, mediaType) {
  const bytes = await readFile(absolute(path));
  return { path, mediaType, bytes: bytes.byteLength, digest: digest(bytes) };
}

async function validateBoundFile(value, expectedPath, label) {
  assertExactKeys(value, ["path", "mediaType", "bytes", "digest"], label);
  requireCondition(value.path === expectedPath, `${label} path mismatch.`);
  requireCondition(
    value.mediaType === "application/octet-stream",
    `${label} media type mismatch.`,
  );
  requireCondition(Number.isSafeInteger(value.bytes) && value.bytes >= 0, `${label} byte count invalid.`);
  requireCondition(DIGEST_PATTERN.test(value.digest), `${label} digest invalid.`);
  const actual = await binding(expectedPath, "application/octet-stream");
  requireCondition(
    actual.bytes === value.bytes && actual.digest === value.digest,
    `${label} raw byte binding mismatch.`,
  );
}

async function validateGateReceipt(candidate) {
  const parsed = await readCanonicalJson(GATE_RECEIPT);
  const receipt = parsed.value;
  assertExactKeys(
    receipt,
    [
      "apiVersion",
      "kind",
      "version",
      "candidateCommit",
      "repository",
      "command",
      "result",
      "exitCode",
      "signal",
      "spawnError",
      "stdout",
      "stderr",
    ],
    "canonical-gate receipt",
  );
  requireCondition(
    receipt.apiVersion === "swecircuit/release-gate/v1alpha1" &&
      receipt.kind === "CanonicalGateReceipt" &&
      receipt.version === "V12",
    "Canonical-gate receipt identity mismatch.",
  );
  requireCondition(receipt.candidateCommit === candidate, "Canonical-gate candidate mismatch.");
  assertExactKeys(
    receipt.repository,
    [
      "headBefore",
      "headAfter",
      "trackedStateBefore",
      "trackedStateAfter",
      "inspectionError",
    ],
    "canonical-gate repository binding",
  );
  requireCondition(
    receipt.repository.headBefore === candidate &&
      receipt.repository.headAfter === candidate &&
      receipt.repository.trackedStateBefore === "clean" &&
      receipt.repository.trackedStateAfter === "clean" &&
      receipt.repository.inspectionError === null,
    "Canonical gate did not preserve the exact clean candidate.",
  );
  assertExactKeys(
    receipt.command,
    ["executable", "arguments", "canonical"],
    "canonical-gate command",
  );
  const windowsCommand =
    receipt.command.executable === "cmd.exe" &&
    JSON.stringify(receipt.command.arguments) ===
      JSON.stringify(["/d", "/s", "/c", "npm.cmd run verify"]) &&
    receipt.command.canonical === "npm.cmd run verify";
  const portableCommand =
    receipt.command.executable === "npm" &&
    JSON.stringify(receipt.command.arguments) === JSON.stringify(["run", "verify"]) &&
    receipt.command.canonical === "npm run verify";
  requireCondition(windowsCommand || portableCommand, "Canonical-gate command mismatch.");
  requireCondition(
    receipt.result === "pass" &&
      receipt.exitCode === 0 &&
      receipt.signal === null &&
      receipt.spawnError === null,
    "Canonical gate did not pass cleanly.",
  );
  await validateBoundFile(receipt.stdout, GATE_STDOUT, "canonical-gate stdout");
  await validateBoundFile(receipt.stderr, GATE_STDERR, "canonical-gate stderr");
  return {
    receipt,
    receiptBinding: {
      path: GATE_RECEIPT,
      mediaType: "application/json",
      bytes: parsed.bytes.byteLength,
      digest: digest(parsed.bytes),
    },
  };
}

async function verifyEvidenceSet(id, root, requirePass) {
  const packagePath = `${root}/package-envelope.json`;
  const approvalPath = `${root}/approval.json`;
  const reportPath = `${root}/handoff-verification.json`;
  const specialistPackage = await readJson(packagePath);
  const approval = await readJson(approvalPath);
  const report = await readJson(reportPath);
  requireCondition(
    approval && typeof approval === "object" && approval.expectation,
    `${id} approval lacks an expectation.`,
  );
  requireValue(
    verifySpecialistPackage(specialistPackage, approval.expectation),
    `${id} package verification`,
  );
  requireCondition(
    report.compilationDigest === approval.expectation.compilationDigest &&
      report.packageDigest === approval.expectation.packageDigest &&
      Array.isArray(report.verifiedHandoffs),
    `${id} handoff-verification report does not bind the approved package.`,
  );

  const handoffRoot = `${root}/handoffs`;
  const selectedFiles = report.verifiedHandoffs.map((entry) => entry.file);
  requireCondition(
    selectedFiles.every(
      (file) =>
        typeof file === "string" &&
        /^[A-Za-z0-9._-]+\.json$/.test(file) &&
        file !== "." &&
        file !== "..",
    ) && new Set(selectedFiles).size === selectedFiles.length,
    `${id} handoff-verification report contains unsafe or duplicate files.`,
  );
  const handoffPaths = selectedFiles
    .map((file) => `${handoffRoot}/${file}`)
    .sort(compareOrdinal);
  const verified = [];
  for (const path of handoffPaths) {
    const raw = await readFile(absolute(path));
    const value = requireValue(
      verifySpecialistHandoff(specialistPackage, approval.expectation, raw),
      `${id} raw handoff verification for ${path}`,
    );
    verified.push({
      path,
      agentId: value.handoff.agent.id,
      outcome: value.handoff.outcome,
      bytes: value.rawBytes,
      digest: value.rawDigest,
    });
  }
  for (const entry of verified) {
    const reported = report.verifiedHandoffs.find(
      (candidate) => candidate.file === entry.path.slice(handoffRoot.length + 1),
    );
    requireCondition(
      reported &&
        reported.agentId === entry.agentId &&
        reported.outcome === entry.outcome &&
        reported.rawBytes === entry.bytes &&
        reported.rawDigest === entry.digest,
      `${id} handoff-verification row does not match raw evidence: ${entry.path}.`,
    );
  }
  verified.sort((left, right) => compareOrdinal(left.agentId, right.agentId));
  const expectedAgentIds = specialistPackage.manifest.agents
    .map((entry) => entry.agentId)
    .sort(compareOrdinal);
  const receivedAgentIds = verified.map((entry) => entry.agentId);
  requireCondition(
    new Set(receivedAgentIds).size === receivedAgentIds.length &&
      expectedAgentIds.length === receivedAgentIds.length &&
      expectedAgentIds.every((agentId, index) => agentId === receivedAgentIds[index]),
    `${id} does not contain one exact raw handoff for every approved agent.`,
  );
  if (requirePass) {
    requireCondition(
      verified.every((entry) => entry.outcome === "pass"),
      `${id} contains a verified non-pass route.`,
    );
  }
  return {
    id,
    compilationDigest: approval.expectation.compilationDigest,
    packageDigest: approval.expectation.packageDigest,
    packagePath,
    approvalPath,
    reportPath,
    requirePass,
    rawHandoffs: verified,
  };
}

async function verifyPrimaryEvidenceSets() {
  return [
    await verifyEvidenceSet(
      "release-correction",
      "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction",
      true,
    ),
    await verifyEvidenceSet(
      "implementation-verification",
      "docs/specs/v12-ide-run-loop/evidence/implementation/verification",
      true,
    ),
    await verifyEvidenceSet(
      "release-review-r1",
      "docs/specs/v12-ide-run-loop/evidence/release-review",
      false,
    ),
  ];
}

async function materializeSnapshots(sources) {
  const rows = [];
  for (const entry of sources) {
    const bytes = await readFile(absolute(entry.path));
    const target = snapshotPath(entry);
    await writeImmutable(target, bytes);
    rows.push({
      contextId: entry.id,
      originalPath: entry.path,
      snapshotPath: target,
      description: entry.description,
      allowedWorkUnits: entry.allowedWorkUnits,
      bytes: bytes.byteLength,
      digest: digest(bytes),
    });
  }
  return rows;
}

function contextSource(row) {
  return {
    id: row.contextId,
    kind: "repository",
    locator: `path:${row.snapshotPath}`,
    digest: row.digest,
    bytes: row.bytes,
    description: `${row.description} Original candidate path: ${row.originalPath}`,
    allowedWorkUnits: row.allowedWorkUnits,
    readScope: row.snapshotPath,
  };
}

async function directContext(id, path, description, allowedWorkUnits) {
  const bytes = await readFile(absolute(path));
  return {
    id,
    kind: "repository",
    locator: `path:${path}`,
    digest: digest(bytes),
    bytes: bytes.byteLength,
    description,
    allowedWorkUnits,
    readScope: path,
  };
}

function reviewedSourceByPath(rows, path) {
  const row = rows.find((entry) => entry.originalPath === path);
  requireCondition(row, `Required primary source was not snapshotted: ${path}.`);
  return row;
}

function assertPrimaryCoverage(contextSources, rows, evidenceSets) {
  const scopes = new Set(contextSources.map((entry) => entry.readScope));
  for (const path of [
    CANDIDATE_MANIFEST,
    PRE_INTEGRATION_REVIEW,
    GATE_RECEIPT,
    GATE_STDOUT,
    GATE_STDERR,
  ]) {
    requireCondition(scopes.has(path), `Missing direct release context: ${path}.`);
  }

  const requiredRawPaths = [
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
    "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
    "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
  ];
  for (const set of evidenceSets) {
    requiredRawPaths.push(set.packagePath, set.approvalPath, set.reportPath);
    requiredRawPaths.push(...set.rawHandoffs.map((entry) => entry.path));
  }
  for (const path of new Set(requiredRawPaths)) {
    const row = reviewedSourceByPath(rows, path);
    requireCondition(
      scopes.has(row.snapshotPath),
      `Primary evidence is summary-only or absent from reviewer context: ${path}.`,
    );
  }
}

function reviewDefinitions() {
  return [
    {
      id: PRODUCT,
      objective:
        "Audit whether corrected V12 presents one accurate, simple, IDE-neutral path from an approved package through visible specialist work to verified integration handoff.",
      moduleId: "release-review-r2.product-api-ide",
      action:
        "Review product truth, public API shape, schema publication, installed-consumer behavior, IDE guidance, implementation-bound dogfood evidence, and release-stage truth against AC1-AC9.",
      outputType: "ProductApiIdeReleaseReviewR2",
      capability: "audit.r2.product-api-ide-truth",
      evidenceId: "evidence.r2.product-api-ide-release-review",
      artifact: "product-api-ide-release-review-r2.md",
    },
    {
      id: LIFECYCLE,
      objective:
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability.",
      moduleId: "release-review-r2.lifecycle-correctness",
      action:
        "Trace all four operations and every route; inspect canonical ordering, aggregate limits, replay, restoration, tests, dogfood, and the exact canonical-gate evidence without repairing production.",
      outputType: "LifecycleCorrectnessReleaseReviewR2",
      capability: "audit.r2.lifecycle-correctness-recovery",
      evidenceId: "evidence.r2.lifecycle-correctness-release-review",
      artifact: "lifecycle-correctness-release-review-r2.md",
    },
    {
      id: SECURITY,
      objective:
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries.",
      moduleId: "release-review-r2.security-trace-authority",
      action:
        "Attack schema-loading effects, digest substitution, stale sessions and handoffs, authority confusion, unsafe controls, snapshot provenance, raw primary evidence, Audit-B approval binding, and canonical-gate receipt closure.",
      outputType: "SecurityTraceAuthorityReleaseReviewR2",
      capability: "audit.r2.security-trace-authority",
      evidenceId: "evidence.r2.security-trace-authority-release-review",
      artifact: "security-trace-authority-release-review-r2.md",
    },
  ];
}

function reviewUnit(definition, contextSources) {
  const selectedSources = contextSources.filter((entry) =>
    entry.allowedWorkUnits.includes(definition.id),
  );
  const paths = selectedSources.map((entry) => entry.readScope).sort(compareOrdinal);
  return {
    id: definition.id,
    objective: definition.objective,
    weight: 8,
    module: {
      id: definition.moduleId,
      action: definition.action,
      inputPorts: [{ name: "input", artifactType: "FrozenV12ReleaseCandidateR2" }],
      outputPorts: [{ name: "output", artifactType: definition.outputType }],
    },
    dependencies: [],
    requiredCapabilities: [definition.capability],
    contextUses: selectedSources.map((entry) => ({
      sourceId: entry.id,
      purpose: definition.objective,
    })),
    scope: { read: paths, write: [], conflictZones: [] },
    permissions: [
      { kind: "filesystem.read", scopes: paths },
      { kind: "process.spawn", scopes: ["git", "node", "npm"] },
    ],
    evidenceRequirementIds: [definition.evidenceId],
    handoffArtifacts: [definition.artifact],
    stopConditions: [
      "Authenticate every declared immutable source against its exact byte count and SHA-256 binding before review.",
      "Do not edit files, change Git state, access the network, launch descendants, or repair a finding.",
      "Treat exact raw gate logs, raw handoffs, approval bytes, and source snapshots as primary evidence; summaries are navigation only.",
      "Report findings first with severity and exact snapshot/original-path evidence; use pass only when this review domain is release-ready.",
      "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    ],
  };
}

function requestFor(contextSources, candidate) {
  const definitions = reviewDefinitions();
  const allPaths = contextSources.map((entry) => entry.readScope).sort(compareOrdinal);
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "GoalContract",
      id: "v12.ide-run-loop.release-review-r2",
      revision: 1,
      objective: `Independently determine whether corrected exact V12 candidate ${candidate} is release-ready across product truth, lifecycle correctness, and security/trace authority.`,
      integrationOwner: "codex.main",
      assumptions: [
        {
          id: "assumption.exact-candidate-snapshots",
          statement: `Every tracked reviewer source is byte-identical to candidate ${candidate} and is reviewed only through its immutable R2 snapshot.`,
          rationale:
            "The harness authenticates each Git blob, writes snapshots once, and rechecks every snapshot before compilation and approval.",
        },
        {
          id: "assumption.canonical-gate-primary-evidence",
          statement:
            "The canonical gate passed for the exact clean candidate and its raw stdout, raw stderr, and closed receipt are direct reviewer sources.",
          rationale:
            "The release-gate wrapper binds exact output bytes, command, exit status, pre/post HEAD, and tracked cleanliness without a timestamp or summary-only claim.",
        },
        {
          id: "assumption.external-host-boundary",
          statement:
            "V12 core creates, restores, inspects, and records immutable evidence sessions but does not launch, persist, schedule, integrate, merge, or mutate memory.",
          rationale: "The review judges the provider-neutral reducer, while all host effects remain external.",
        },
        {
          id: "assumption.external-producer",
          statement:
            "The correction producer and integration owner are external to these three read-only review work units.",
          rationale:
            "Immutable candidate snapshots, approved correction handoffs, and direct primary evidence form the producer boundary.",
        },
      ],
      unresolvedDecisions: [],
      acceptanceCriteria: definitions.map((definition) => ({
        id: `criterion.${definition.id}`,
        description: definition.objective,
        evidenceRequirements: [
          {
            id: definition.evidenceId,
            kind: "review",
            duty: "produce",
            description: `Preserve the exact independent ${definition.outputType} evidence.`,
            independentFromProducer: false,
          },
        ],
      })),
      contextSources,
      authority: {
        allowedModules: definitions.map((entry) => entry.moduleId).sort(compareOrdinal),
        allowedCapabilities: definitions
          .map((entry) => entry.capability)
          .sort(compareOrdinal),
        permissionCeiling: [
          { kind: "filesystem.read", scopes: allPaths },
          { kind: "process.spawn", scopes: ["git", "node", "npm"] },
        ],
        forbiddenEffects: [
          "Do not edit files, change Git state, access the network, launch descendants, repair findings, or claim that core performs external host effects.",
        ],
        maxAgents: 3,
        maxConcurrency: 3,
      },
      optimization: { agentStartupCost: 1, handoffCost: 1 },
      workUnits: definitions.map((definition) => reviewUnit(definition, contextSources)),
    },
  };
}

async function preparedContexts(rows, candidateManifest) {
  const contexts = rows.map(contextSource);
  contexts.push(
    await directContext(
      "context.candidate-manifest",
      CANDIDATE_MANIFEST,
      "Closed candidate, gate, snapshot, and primary-evidence binding manifest.",
      ALL_REVIEWS,
    ),
    await directContext(
      "context.canonical-gate-receipt",
      GATE_RECEIPT,
      "Closed exact-candidate canonical-gate receipt.",
      ALL_REVIEWS,
    ),
    await directContext(
      "context.canonical-gate-stdout",
      GATE_STDOUT,
      "Exact raw canonical-gate stdout bytes.",
      ALL_REVIEWS,
    ),
    await directContext(
      "context.canonical-gate-stderr",
      GATE_STDERR,
      "Exact raw canonical-gate stderr bytes.",
      ALL_REVIEWS,
    ),
  );
  requireCondition(
    candidateManifest.reviewedSources.length === rows.length,
    "Candidate manifest source count mismatch.",
  );
  return contexts.sort((left, right) => compareOrdinal(left.id, right.id));
}

async function prepare() {
  requireCondition(
    typeof checkpoint === "string" && CANDIDATE_PATTERN.test(checkpoint),
    "prepare requires the exact 40-character candidate commit.",
  );
  const sources = await collectSourceSpecs();
  await verifyCheckpoint(checkpoint, sources);
  const gate = await validateGateReceipt(checkpoint);
  const evidenceSets = await verifyPrimaryEvidenceSets();
  const rows = await materializeSnapshots(sources);
  const preIntegration = reviewedSourceByPath(
    rows,
    "docs/specs/v12-ide-run-loop/review.md",
  );
  const candidateManifest = {
    apiVersion: "swecircuit/release-candidate/v1alpha1",
    kind: "ReleaseCandidateManifest",
    version: "V12",
    baselineCommit: BASELINE,
    candidateCommit: checkpoint,
    branch: "codex/v12-ide-run-loop",
    canonicalGate: {
      receipt: gate.receiptBinding,
      stdout: gate.receipt.stdout,
      stderr: gate.receipt.stderr,
      command: gate.receipt.command.canonical,
      result: gate.receipt.result,
    },
    preIntegrationReview: {
      originalPath: preIntegration.originalPath,
      snapshotPath: preIntegration.snapshotPath,
      bytes: preIntegration.bytes,
      digest: preIntegration.digest,
    },
    verifiedEvidenceSets: evidenceSets,
    reviewedSources: rows,
  };
  await writeImmutableJson(CANDIDATE_MANIFEST, candidateManifest);
  const contextSources = await preparedContexts(rows, candidateManifest);
  assertPrimaryCoverage(contextSources, rows, evidenceSets);
  const request = requestFor(contextSources, checkpoint);
  await writeImmutableJson(
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/request.json",
    request,
  );
  await writeImmutableJson(
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/phase-metadata.json",
    {
      phase: "release-review-r2",
      checkpoint,
      goalId: request.goal.id,
      goalRevision: request.goal.revision,
      canonicalGateReceipt: gate.receiptBinding,
      sourceSnapshots: rows.length,
      primaryEvidenceSets: evidenceSets.map((entry) => entry.id),
      runtimeInvoked: false,
    },
  );
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        stage: "release-review-r2-prepared",
        checkpoint,
        contextSources: contextSources.length,
        sourceSnapshots: rows.length,
        primaryRawHandoffs: evidenceSets.reduce(
          (total, entry) => total + entry.rawHandoffs.length,
          0,
        ),
        workUnits: request.goal.workUnits.map((entry) => entry.id),
      },
      null,
      2,
    )}\n`,
  );
}

async function validatePreparedInputs() {
  const parsedManifest = await readCanonicalJson(CANDIDATE_MANIFEST);
  const manifest = parsedManifest.value;
  assertExactKeys(
    manifest,
    [
      "apiVersion",
      "kind",
      "version",
      "baselineCommit",
      "candidateCommit",
      "branch",
      "canonicalGate",
      "preIntegrationReview",
      "verifiedEvidenceSets",
      "reviewedSources",
    ],
    "candidate manifest",
  );
  requireCondition(
    manifest.apiVersion === "swecircuit/release-candidate/v1alpha1" &&
      manifest.kind === "ReleaseCandidateManifest" &&
      manifest.version === "V12" &&
      CANDIDATE_PATTERN.test(manifest.candidateCommit),
    "Prepared candidate manifest identity mismatch.",
  );

  const sources = await collectSourceSpecs();
  await verifyCheckpoint(manifest.candidateCommit, sources);
  const gate = await validateGateReceipt(manifest.candidateCommit);
  const evidenceSets = await verifyPrimaryEvidenceSets();
  requireCondition(
    JSON.stringify(manifest.verifiedEvidenceSets) === JSON.stringify(evidenceSets),
    "Prepared primary-evidence verification changed.",
  );
  requireCondition(
    JSON.stringify(manifest.canonicalGate) ===
      JSON.stringify({
        receipt: gate.receiptBinding,
        stdout: gate.receipt.stdout,
        stderr: gate.receipt.stderr,
        command: gate.receipt.command.canonical,
        result: gate.receipt.result,
      }),
    "Prepared canonical-gate binding changed.",
  );
  requireCondition(
    manifest.reviewedSources.length === sources.length,
    "Prepared reviewer source set changed.",
  );

  const sourceByPath = new Map(sources.map((entry) => [entry.path, entry]));
  for (const row of manifest.reviewedSources) {
    assertExactKeys(
      row,
      [
        "contextId",
        "originalPath",
        "snapshotPath",
        "description",
        "allowedWorkUnits",
        "bytes",
        "digest",
      ],
      `reviewed source ${String(row.originalPath)}`,
    );
    const entry = sourceByPath.get(row.originalPath);
    requireCondition(entry, `Unknown prepared reviewer source: ${row.originalPath}.`);
    requireCondition(
      row.contextId === entry.id &&
        row.snapshotPath === snapshotPath(entry) &&
        row.description === entry.description &&
        JSON.stringify(row.allowedWorkUnits) === JSON.stringify(entry.allowedWorkUnits),
      `Prepared reviewer source metadata changed: ${row.originalPath}.`,
    );
    const bytes = await readFile(absolute(row.snapshotPath));
    requireCondition(
      bytes.byteLength === row.bytes && digest(bytes) === row.digest,
      `Prepared reviewer snapshot changed: ${row.snapshotPath}.`,
    );
  }

  const requestPath = "docs/specs/v12-ide-run-loop/evidence/release-review-r2/request.json";
  const request = (await readCanonicalJson(requestPath)).value;
  const contextSources = request.goal?.contextSources;
  requireCondition(Array.isArray(contextSources), "Prepared request lacks context sources.");
  for (const context of contextSources) {
    const bytes = await readFile(absolute(context.readScope));
    requireCondition(
      bytes.byteLength === context.bytes && digest(bytes) === context.digest,
      `Prepared context source changed: ${context.readScope}.`,
    );
  }
  assertPrimaryCoverage(contextSources, manifest.reviewedSources, evidenceSets);
  return { manifest, request };
}

async function compile() {
  const { manifest, request } = await validatePreparedInputs();
  const compilation = requireValue(
    compileAgentBlueprints(request),
    "Release-review-r2 compilation",
  );
  const specialistPackage = requireValue(
    renderSpecialistPackage(compilation),
    "Release-review-r2 package rendering",
  );
  const expectation = {
    compilationDigest: specialistPackage.compilationDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    verifySpecialistPackage(specialistPackage, expectation),
    "Post-render release-review-r2 package verification",
  );
  for (const file of specialistPackage.files) {
    await writeImmutable(
      `docs/specs/v12-ide-run-loop/evidence/release-review-r2/package/${file.path}`,
      Buffer.from(file.content, "utf8"),
    );
  }
  await writeImmutableJson(
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/package-envelope.json",
    specialistPackage,
  );
  const summary = {
    goalId: compilation.goal.id,
    goalRevision: compilation.goal.revision,
    candidateCommit: manifest.candidateCommit,
    search: compilation.search,
    serialBaseline: compilation.serialBaseline,
    selected: compilation.selected,
    selectionReason: compilation.selectionReason,
    retainedAlternatives: compilation.alternatives,
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
    launchWaves: specialistPackage.manifest.launchWaves,
    agents: compilation.blueprints.map((blueprint) => ({
      id: blueprint.id,
      digest: blueprint.contentDigest,
      workUnitIds: blueprint.workUnitIds,
      dependencyAgentIds: blueprint.dependencies,
      contractFile: specialistPackage.manifest.agents.find(
        (agent) => agent.agentId === blueprint.id,
      )?.contractFile,
    })),
    packageSelfVerified: true,
    ownerApproved: false,
    runtimeInvoked: false,
  };
  await writeImmutableJson(
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/compilation-summary.json",
    summary,
  );
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

async function approve() {
  const { manifest, request } = await validatePreparedInputs();
  const specialistPackage = (
    await readCanonicalJson(
      "docs/specs/v12-ide-run-loop/evidence/release-review-r2/package-envelope.json",
    )
  ).value;
  const expectation = {
    compilationDigest: specialistPackage.compilationDigest,
    packageDigest: specialistPackage.packageDigest,
  };
  requireValue(
    verifySpecialistPackage(specialistPackage, expectation),
    "Owner approval-bound release-review-r2 package verification",
  );
  const approval = {
    apiVersion: "swecircuit/review-approval/v1alpha1",
    kind: "SpecialistReviewApproval",
    goalId: request.goal.id,
    goalRevision: request.goal.revision,
    candidateCommit: manifest.candidateCommit,
    approvedBy: "repository-owner-via-integration-owner",
    approvalBasis:
      "The owner reviewed this exact corrected candidate, immutable source snapshots, primary evidence, three task-shaped read-only contracts, authority, and compilation/package digest pair before launch.",
    expectation,
  };
  await writeImmutableJson(
    "docs/specs/v12-ide-run-loop/evidence/release-review-r2/approval.json",
    approval,
  );
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        stage: "release-review-r2-package-approved",
        candidateCommit: manifest.candidateCommit,
        ...expectation,
      },
      null,
      2,
    )}\n`,
  );
}

async function main() {
  if (mode === "prepare") {
    await prepare();
  } else if (mode === "compile") {
    await compile();
  } else if (mode === "approve") {
    await approve();
  } else {
    throw new Error(`Unknown mode: ${mode}.`);
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
  process.exitCode = 1;
});
