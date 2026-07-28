import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import {
  assessSpecialistHandoffs,
  inspectAdaptiveRunSession,
  renderAdaptiveRunView,
  restoreAdaptiveRunSession,
  verifyRuntimeAssignmentCompilation,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../dist/index.js";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const V14_EVIDENCE = join(
  ROOT,
  "docs",
  "specs",
  "v14-adaptive-orchestration",
  "evidence",
);
const npmCli = process.env.npm_execpath;

function requireValue(label, result) {
  if (!result.ok || result.value === null) {
    throw new Error(`${label}: ${JSON.stringify(result.diagnostics)}`);
  }
  return result.value;
}

function run(label, command, args, cwd = ROOT) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  assert.equal(result.error, undefined, `${label}: ${result.error?.message}`);
  assert.equal(result.status, 0, `${label} exited with ${result.status}.`);
}

function runNpm(label, args, cwd) {
  assert.ok(npmCli, `${label}: npm_execpath is unavailable.`);
  run(label, process.execPath, [npmCli, ...args], cwd);
}

async function readBytes(path) {
  return readFile(path);
}

async function readJson(path) {
  return JSON.parse((await readBytes(path)).toString("utf8"));
}

function sha256(bytes, prefix = true) {
  const value = createHash("sha256").update(bytes).digest("hex");
  return prefix ? `sha256:${value}` : value;
}

async function snapshotTree(root) {
  const rows = [];
  async function visit(directory) {
    const entries = (await readdir(directory, { withFileTypes: true })).sort((left, right) =>
      left.name.localeCompare(right.name),
    );
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(path);
        continue;
      }
      assert.equal(entry.isFile(), true, `unsupported evidence entry: ${path}`);
      const bytes = await readBytes(path);
      rows.push([
        relative(root, path).replaceAll("\\", "/"),
        { bytes: bytes.byteLength, digest: sha256(bytes) },
      ]);
    }
  }
  await visit(root);
  return Object.fromEntries(rows);
}

function runtimeExpectation(expectation) {
  return {
    compilationDigest: expectation.compilationDigest,
    packageDigest: expectation.packageDigest,
    policyDigest: expectation.policyDigest,
    calibrationDigest: expectation.calibrationDigest,
    inventoryDigest: expectation.inventoryDigest,
    assignmentDigest: expectation.assignmentDigest,
  };
}

async function verifyBinding(binding) {
  const bytes = await readBytes(join(ROOT, binding.path));
  assert.equal(sha256(bytes), binding.digest, `${binding.path} digest`);
  assert.equal(bytes.byteLength, binding.bytes, `${binding.path} byte count`);
}

async function verifyDogfood({
  label,
  evidenceRoot,
  acceptedHandoffs,
  dependentFanIn = [],
}) {
  const [
    specialistPackage,
    compilation,
    summary,
    assignment,
    expectation,
    rawSession,
    storedInspection,
    storedRunView,
  ] = await Promise.all([
    readJson(join(evidenceRoot, "package-envelope.json")),
    readJson(join(evidenceRoot, "compilation.json")),
    readJson(join(evidenceRoot, "team-summary.json")),
    readJson(join(evidenceRoot, "routing", "compilation.json")),
    readJson(join(evidenceRoot, "run", "expectation.json")),
    readBytes(join(evidenceRoot, "run", "session.json")),
    readJson(join(evidenceRoot, "run", "inspection.json")),
    readJson(join(evidenceRoot, "run", "run-view.json")),
  ]);

  const packageExpectation = summary.expectation;
  requireValue(
    `${label} package`,
    verifySpecialistPackage(specialistPackage, packageExpectation),
  );
  assert.equal(compilation.contentDigest, packageExpectation.compilationDigest);
  assert.equal(specialistPackage.packageDigest, packageExpectation.packageDigest);
  requireValue(
    `${label} runtime assignment`,
    verifyRuntimeAssignmentCompilation(
      assignment,
      runtimeExpectation(expectation),
    ),
  );

  const session = requireValue(
    `${label} adaptive session`,
    restoreAdaptiveRunSession(rawSession, expectation),
  );
  const inspection = requireValue(
    `${label} adaptive inspection`,
    inspectAdaptiveRunSession(session, expectation),
  );
  const runView = requireValue(
    `${label} RunView`,
    renderAdaptiveRunView(inspection, inspection.contentDigest),
  );
  assert.deepEqual(inspection, storedInspection, `${label} inspection replay`);
  assert.deepEqual(runView, storedRunView, `${label} RunView replay`);
  assert.equal(inspection.integrationReady, true, `${label} integration gate`);
  assert.ok(
    inspection.routes.length > 0 &&
      inspection.routes.every((route) => route.outcome === "pass"),
    `${label} must terminate with only pass routes`,
  );

  const rawByName = new Map();
  for (const name of acceptedHandoffs) {
    const raw = await readBytes(join(evidenceRoot, "handoffs", name));
    const verified = requireValue(
      `${label} handoff ${name}`,
      verifySpecialistHandoff(specialistPackage, packageExpectation, raw),
    );
    assert.equal(verified.handoff.outcome, "pass", `${label} ${name} outcome`);
    rawByName.set(name, raw);
  }

  for (const fanIn of dependentFanIn) {
    const assessment = requireValue(
      `${label} dependency fan-in ${fanIn.targetAgentId}`,
      assessSpecialistHandoffs(
        specialistPackage,
        packageExpectation,
        fanIn.targetAgentId,
        fanIn.handoffs.map((name) => rawByName.get(name)),
      ),
    );
    assert.equal(
      assessment.integrationReady,
      true,
      `${label} dependency fan-in readiness`,
    );
  }

  return {
    assignmentDigest: assignment.contentDigest,
    compilationDigest: compilation.contentDigest,
    integrationReady: inspection.integrationReady,
    packageDigest: specialistPackage.packageDigest,
    runViewDigest: runView.contentDigest,
    sessionDigest: session.contentDigest,
  };
}

async function verifySmallEvidence(evidenceRoot) {
  const [integration, browserQa, attestation] = await Promise.all([
    readJson(join(evidenceRoot, "integration-record.json")),
    readJson(join(evidenceRoot, "browser", "qa-result.json")),
    readJson(join(evidenceRoot, "release-alpha-attestation.json")),
  ]);
  const runViewJson = await readBytes(join(ROOT, integration.sourceFanIn.runViewJsonPath));
  const runViewMarkdown = await readBytes(
    join(ROOT, integration.sourceFanIn.runViewMarkdownPath),
  );
  const browserEvidence = await readBytes(
    join(ROOT, integration.integratedArtifact.browserEvidence),
  );
  assert.equal(
    sha256(runViewJson, false),
    integration.sourceFanIn.runViewJsonSha256,
  );
  assert.equal(
    sha256(runViewMarkdown, false),
    integration.sourceFanIn.runViewMarkdownSha256,
  );
  assert.equal(
    sha256(browserEvidence, false),
    integration.integratedArtifact.browserEvidenceSha256,
  );
  assert.ok(browserQa.assertions.every((item) => item.status === "pass"));
  assert.equal(browserQa.console.warnings, 0);
  assert.equal(browserQa.console.errors, 0);
  for (const source of browserQa.sourceFiles) {
    assert.equal(
      sha256(await readBytes(join(ROOT, source.path)), false),
      source.sha256,
      source.path,
    );
  }
  for (const screenshot of browserQa.screenshots) {
    assert.equal(
      sha256(await readBytes(join(ROOT, screenshot.path)), false),
      screenshot.sha256,
      screenshot.path,
    );
  }
  assert.equal(attestation.smallWindowsAlphaUsable, true);
  assert.equal(
    sha256(
      await readBytes(join(ROOT, attestation.integrationRecord.path)),
      false,
    ),
    attestation.integrationRecord.sha256,
  );
  assert.equal(
    sha256(
      await readBytes(join(ROOT, attestation.independentReview.path)),
      false,
    ),
    attestation.independentReview.sha256,
  );
}

async function verifyMediumEvidence(evidenceRoot) {
  const [packageReceipt, hostReceipt] = await Promise.all([
    readJson(join(evidenceRoot, "receipts", "package-verification.json")),
    readJson(join(evidenceRoot, "receipts", "host-repair-verification.json")),
  ]);
  assert.equal(packageReceipt.outcome, "pass");
  await verifyBinding(packageReceipt.packageEnvelope);
  await verifyBinding(packageReceipt.manifest);
  assert.equal(hostReceipt.outcome, "pass");
  assert.equal(
    sha256(await readBytes(join(ROOT, "examples", "impact-planner", "styles.css"))),
    hostReceipt.candidate.stylesDigest,
  );
  assert.equal(
    sha256(
      await readBytes(
        join(ROOT, "examples", "impact-planner", "test", "integration.test.mjs"),
      ),
    ),
    hostReceipt.candidate.integrationTestDigest,
  );
  assert.equal(hostReceipt.automated.tests.failed, 0);
  assert.equal(hostReceipt.browser.desktop.paddingClickToggledControl, true);
  assert.equal(hostReceipt.browser.desktop.labelHeight, 44);
  assert.equal(hostReceipt.browser.mobile.labelHeight, 44);
  assert.equal(hostReceipt.browser.mobile.horizontalOverflow, 0);
  assert.deepEqual(hostReceipt.browser.consoleWarningsOrErrors, []);
}

async function verifyNativeHighRiskEvidence(evidenceRoot, report) {
  const [
    specialistPackage,
    baseAssignment,
    authorization,
    authorizationBytes,
    receipt,
    prompt,
    context,
    rawHandoff,
  ] = await Promise.all([
    readJson(join(evidenceRoot, "package-envelope.json")),
    readJson(join(evidenceRoot, "routing", "base-assignment.json")),
    readJson(join(evidenceRoot, "real-host", "launch-authorization.json")),
    readBytes(join(evidenceRoot, "real-host", "launch-authorization.json")),
    readJson(join(evidenceRoot, "real-host", "host-receipt.json")),
    readBytes(join(evidenceRoot, "real-host", "launch-prompt.txt")),
    readBytes(join(evidenceRoot, "untrusted-deployment-note.txt")),
    readBytes(join(evidenceRoot, "real-host", "specialist-handoff.json")),
  ]);
  assert.equal(authorization.candidateLaunchApproved, true);
  assert.equal(authorization.contract.compilationDigest, specialistPackage.compilationDigest);
  assert.equal(authorization.contract.packageDigest, specialistPackage.packageDigest);
  assert.equal(authorization.contract.assignmentDigest, baseAssignment.contentDigest);
  assert.equal(authorization.runtime.profileId, baseAssignment.selected.rows[0].profileId);
  assert.equal(authorization.runtime.effortId, baseAssignment.selected.rows[0].effortId);
  assert.equal(authorization.prompt.bytes, prompt.byteLength);
  assert.equal(authorization.prompt.digest, sha256(prompt));
  assert.equal(authorization.context.bytes, context.byteLength);
  assert.equal(authorization.context.digest, sha256(context));
  assert.equal(receipt.authorization.bytes, authorizationBytes.byteLength);
  assert.equal(receipt.authorization.digest, sha256(authorizationBytes));
  assert.equal(receipt.approvedContract.assignmentDigest, baseAssignment.contentDigest);
  assert.equal(receipt.result.rawBytes, rawHandoff.byteLength);
  assert.equal(receipt.result.rawDigest, sha256(rawHandoff));

  const verified = requireValue(
    "real native high-risk handoff",
    verifySpecialistHandoff(
      specialistPackage,
      {
        compilationDigest: specialistPackage.compilationDigest,
        packageDigest: specialistPackage.packageDigest,
      },
      rawHandoff,
    ),
  );
  assert.equal(verified.handoff.outcome, "pass");
  assert.equal(verified.contentDigest, receipt.result.verifiedHandoffDigest);
  assert.equal(verified.semanticDigest, receipt.result.semanticDigest);
  assert.equal(report.nativeHostRun.handoff.rawDigest, verified.rawDigest);
  assert.equal(report.nativeHostRun.handoff.verifiedHandoffDigest, verified.contentDigest);
  assert.equal(
    report.nativeHostRun.truth.permissionEnforcement,
    "not_independently_observed",
  );
  return {
    authorizationDigest: sha256(authorizationBytes),
    handoffDigest: verified.rawDigest,
    nativeHandle: receipt.host.nativeHandle,
    verifiedHandoffDigest: verified.contentDigest,
  };
}
async function verifyHighRiskEvidence(evidenceRoot) {
  const runner = join(evidenceRoot, "run-high-risk-dogfood.mjs");
  const reportPath = join(evidenceRoot, "report.json");
  const before = await snapshotTree(evidenceRoot);
  run("high-risk dogfood replay 1", process.execPath, [runner]);
  const first = await readBytes(reportPath);
  assert.deepEqual(
    await snapshotTree(evidenceRoot),
    before,
    "high-risk replay 1 changed committed evidence bytes",
  );
  run("high-risk dogfood replay 2", process.execPath, [runner]);
  const second = await readBytes(reportPath);
  assert.deepEqual(
    await snapshotTree(evidenceRoot),
    before,
    "high-risk replay 2 changed committed evidence bytes",
  );
  assert.equal(sha256(first), sha256(second), "high-risk replay determinism");

  const report = JSON.parse(second.toString("utf8"));
  assert.equal(report.outcome, "pass");
  assert.equal(report.unsafeCompilation.rejected, true);
  assert.deepEqual(
    report.unsafeCompilation.diagnostics.map((item) => item.code),
    ["SC4303", "SC4303"],
  );
  assert.equal(report.routing.search.mode, "exact");
  assert.equal(report.routing.leastCostSelection.profileId, "profile.codex.sol");
  assert.equal(report.routing.leastCostSelection.effortId, "effort.high");
  assert.deepEqual(report.routing.rejectedWeakOverride.diagnosticCodes, ["SC4508"]);
  assert.equal(report.deniedRun.evidenceClass, "deterministic_adversarial_replay");
  assert.equal(report.deniedRun.integrationReady, false);
  assert.equal(report.deniedRun.routes[0]?.outcome, "block");
  assert.equal(report.deniedRun.steeringEvents, 1);
  assert.equal(
    report.successorRun.evidenceClass,
    "real_native_handoff_replayed_through_kernel",
  );
  assert.equal(report.successorRun.integrationReady, true);
  assert.equal(report.successorRun.routes[0]?.outcome, "pass");
  assert.equal(report.tamperCheck.rejected, true);
  assert.deepEqual(report.tamperCheck.diagnosticCodes, ["SC4311"]);
  const nativeHost = await verifyNativeHighRiskEvidence(evidenceRoot, report);
  return {
    nativeHost,
    reportDigest: sha256(second),
    successorRunViewDigest: report.successorRun.runViewDigest,
    successorSessionDigest: report.successorRun.sessionDigest,
  };
}

async function main() {
  runNpm("release-board tests", ["test"], join(ROOT, "examples", "release-board"));
  runNpm(
    "release-board syntax",
    ["run", "check"],
    join(ROOT, "examples", "release-board"),
  );
  runNpm("impact-planner tests", ["test"], join(ROOT, "examples", "impact-planner"));
  runNpm(
    "impact-planner syntax",
    ["run", "check"],
    join(ROOT, "examples", "impact-planner"),
  );

  const smallRoot = join(V14_EVIDENCE, "dogfood-small");
  const mediumRoot = join(
    V14_EVIDENCE,
    "dogfood-medium",
    "recovery-r6",
  );
  const small = await verifyDogfood({
    label: "small dogfood",
    evidenceRoot: smallRoot,
    acceptedHandoffs: ["domain-raw.json", "interface-raw-attempt-2.json"],
  });
  await verifySmallEvidence(smallRoot);

  const mediumCompilation = await readJson(join(mediumRoot, "compilation.json"));
  const dependent = mediumCompilation.blueprints.find(
    (blueprint) => blueprint.dependencies.length > 0,
  );
  assert.ok(dependent, "medium dogfood must include dependency fan-in");
  const medium = await verifyDogfood({
    label: "medium dogfood",
    evidenceRoot: mediumRoot,
    acceptedHandoffs: ["verification-raw.json", "review-raw.json"],
    dependentFanIn: [
      {
        targetAgentId: dependent.id,
        handoffs: ["verification-raw.json"],
      },
    ],
  });
  await verifyMediumEvidence(mediumRoot);

  const highRisk = await verifyHighRiskEvidence(
    join(V14_EVIDENCE, "dogfood-high-risk"),
  );
  process.stdout.write(
    `${JSON.stringify(
      {
        outcome: "pass",
        gate: "v14-windows-release",
        small,
        medium,
        highRisk,
      },
      null,
      2,
    )}\n`,
  );
}

await main();
