import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import {
  SPECIALIST_API_VERSION,
  assessSpecialistHandoffs,
  compileAgentBlueprints,
  createSpecialistRunSession,
  inspectSpecialistRunSession,
  recordSpecialistRunHandoff,
  renderSpecialistPackage,
  restoreSpecialistRunSession,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "../dist/index.js";

const encoder = new TextEncoder();
const SOURCE_BINDING = Object.freeze({
  sourceId: "context.readme",
  path: "README.md",
  bytes: 3101,
  digest: "sha256:6870ce77e4a29a000ff8a8a170d968a735fb339cfac7d412b23080cfc61163dc",
});
const APPROVED_EXPECTATION = Object.freeze({
  compilationDigest: "sha256:da35488617408938ddfb63b181768037841276a0e3cd2ba40b04444d97155a37",
  packageDigest: "sha256:0d201fc9b733a725a5fd3578607b0fc95eca203409c89dc22d4591e2059e5b07",
});
const WORK_UNIT_IDS = Object.freeze(["root.left", "root.right", "fanin.close"]);

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function rawDigest(bytes) {
  return "sha256:" + createHash("sha256").update(bytes).digest("hex");
}

function expectOk(label, result) {
  assert.equal(result.ok, true, label + ": " + JSON.stringify(result.diagnostics));
  assert.notEqual(result.value, null, label + ": missing value");
  return result.value;
}

function expectDiagnostic(label, result, code) {
  assert.equal(result.ok, false, label + ": expected " + code);
  assert.equal(result.value, null, label + ": failure returned a value");
  assert.ok(
    result.diagnostics.some((diagnostic) => diagnostic.code === code),
    label + ": missing " + code + ": " + JSON.stringify(result.diagnostics),
  );
  return code;
}

function buildGoal() {
  const acceptanceCriteria = WORK_UNIT_IDS.map((id) => ({
    id: "criterion." + id,
    description: "Complete " + id + ".",
    evidenceRequirements: [
      {
        id: "evidence." + id,
        kind: "review",
        duty: "produce",
        description: "Produce " + id + " evidence.",
        independentFromProducer: false,
      },
    ],
  }));
  const workUnit = (id, dependencies, weight) => ({
    id,
    objective: "Complete " + id + ".",
    weight,
    module: {
      id: "dogfood." + id,
      action: "Perform " + id + ".",
      inputPorts: [{ name: "input", artifactType: "DogfoodInput" }],
      outputPorts: [{ name: "output", artifactType: "DogfoodOutput" }],
    },
    dependencies,
    contextUses: [
      {
        sourceId: SOURCE_BINDING.sourceId,
        purpose: "Authenticate deterministic context.",
      },
    ],
    requiredCapabilities: ["dogfood.run"],
    scope: {
      read: [SOURCE_BINDING.path],
      write: [],
      conflictZones: [],
    },
    permissions: [{ kind: "filesystem.read", scopes: [SOURCE_BINDING.path] }],
    evidenceRequirementIds: ["evidence." + id],
    handoffArtifacts: [id + ".md"],
    stopConditions: ["Stop on context mismatch."],
  });

  return {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "GoalContract",
    id: "dogfood.v12",
    revision: 1,
    objective: "Exercise the specialist run session.",
    acceptanceCriteria,
    contextSources: [
      {
        id: SOURCE_BINDING.sourceId,
        kind: "repository",
        locator: "path:" + SOURCE_BINDING.path,
        digest: SOURCE_BINDING.digest,
        bytes: SOURCE_BINDING.bytes,
        description: "Bound dogfood context.",
        allowedWorkUnits: WORK_UNIT_IDS,
        readScope: SOURCE_BINDING.path,
      },
    ],
    workUnits: [
      workUnit("root.left", [], 10),
      workUnit("root.right", [], 10),
      workUnit("fanin.close", ["root.left", "root.right"], 2),
    ],
    authority: {
      allowedCapabilities: ["dogfood.run"],
      allowedModules: WORK_UNIT_IDS.map((id) => "dogfood." + id),
      forbiddenEffects: ["No host effects."],
      maxAgents: 3,
      maxConcurrency: 2,
      permissionCeiling: [{ kind: "filesystem.read", scopes: [SOURCE_BINDING.path] }],
    },
    integrationOwner: "integration.owner",
    optimization: { agentStartupCost: 1, handoffCost: 1 },
    assumptions: [],
    unresolvedDecisions: [],
  };
}

function buildRawHandoff(compilation, blueprint, outcome) {
  assert.equal(blueprint.handoff.artifacts.length, 1);
  const artifactName = blueprint.handoff.artifacts[0];
  const passed = outcome === "pass";
  const content = passed
    ? "# " +
      blueprint.workUnitIds[0] +
      "\n\nOutcome: pass\nEvidence: deterministic V12 run-loop dogfood.\n"
    : "# " +
      blueprint.workUnitIds[0] +
      " route\n\nOutcome: " +
      outcome +
      "\nReason: bounded correction required.\n";
  return encoder.encode(
    JSON.stringify({
      apiVersion: SPECIALIST_API_VERSION,
      kind: "SpecialistAgentHandoff",
      outcome,
      destination: blueprint.handoff.destination,
      goal: {
        id: compilation.goal.id,
        revision: compilation.goal.revision,
        digest: compilation.goalDigest,
      },
      agent: {
        id: blueprint.id,
        blueprintDigest: blueprint.contentDigest,
      },
      compilationDigest: compilation.contentDigest,
      summary: passed
        ? "Completed " + blueprint.workUnitIds.join(", ") + " with deterministic evidence."
        : "Stopped " + blueprint.workUnitIds.join(", ") + " with route " + outcome + ".",
      workUnitsCompleted: passed ? [...blueprint.workUnitIds] : [],
      artifacts: [{ name: artifactName, mediaType: "text/markdown", content }],
      evidence: blueprint.evidenceDuties.map((entry) => ({
        criterionId: entry.criterionId,
        requirementId: entry.requirementId,
        kind: entry.kind,
        duty: entry.duty,
        status: outcome,
        artifact: artifactName,
      })),
      assumptions: [],
      risks: [],
      followUps: [],
    }),
  );
}

async function authenticateDeclaredContext() {
  const bytes = new Uint8Array(await readFile(new URL("../README.md", import.meta.url)));
  const digest = rawDigest(bytes);
  assert.equal(bytes.byteLength, SOURCE_BINDING.bytes, "external host context byte mismatch");
  assert.equal(digest, SOURCE_BINDING.digest, "external host context digest mismatch");
  return {
    actor: "external_host",
    sourceId: SOURCE_BINDING.sourceId,
    bytes: bytes.byteLength,
    digest,
    authenticated: true,
  };
}

function preserveAndVerifyRawHandoff(specialistPackage, rawBytes) {
  const preserved = new Uint8Array(rawBytes);
  const verified = expectOk(
    "verify exact raw handoff",
    verifySpecialistHandoff(specialistPackage, APPROVED_EXPECTATION, preserved),
  );
  assert.equal(verified.rawBytes, preserved.byteLength);
  assert.equal(verified.rawDigest, rawDigest(preserved));
  return preserved;
}

function assertEligible(inspection, expectedAgentIds) {
  assert.deepEqual(
    inspection.dependencyEligibleContracts.map((contract) => contract.agentId),
    [...expectedAgentIds].sort(compareText),
  );
  for (const contract of inspection.dependencyEligibleContracts) {
    const binding = inspection.agents.find((agent) => agent.agentId === contract.agentId);
    assert.equal(binding?.blueprintDigest, contract.blueprintDigest);
    assert.equal(contract.mediaType, "text/markdown");
    assert.ok(contract.path.startsWith("agents/"));
  }
}

function integrationOwnerCloseout(inspection) {
  assert.equal(inspection.stage, "integration_ready");
  assert.equal(inspection.specialistOutcome, "pass");
  assert.equal(inspection.integrationReady, true);
  assert.equal(inspection.nextAction.actor, "integration_owner");
  assert.equal(inspection.nextAction.kind, "integration_owner.integrate_and_verify");
  return {
    separateFromCore: true,
    actor: inspection.nextAction.actor,
    integrationOwner: inspection.nextAction.integrationOwner,
    trigger: "complete_verified_specialist_fan_in",
    focusedJourneyVerification: "pass",
    independentReview: "required_outside_this_producer",
    milestone: "external_stage_required",
    merge: "not_performed",
    memoryUpdate: "not_performed",
  };
}

async function runJourney() {
  const operationCalls = { create: 0, restore: 0, inspect: 0, record: 0 };
  const call = (operation, fn, ...args) => {
    operationCalls[operation] += 1;
    return fn(...args);
  };
  const contextAuthentication = await authenticateDeclaredContext();
  const compilation = expectOk(
    "compile deterministic dogfood goal",
    compileAgentBlueprints({
      apiVersion: SPECIALIST_API_VERSION,
      kind: "SpecialistCompilationRequest",
      goal: buildGoal(),
    }),
  );
  assert.equal(compilation.search.mode, "exact");
  assert.equal(compilation.search.claim, "exhaustive_partition_search_fixed_scheduler");
  assert.equal(compilation.blueprints.length, 3);
  assert.equal(compilation.selected.metrics.handoffCount, 2);

  const renderedPackage = expectOk(
    "render deterministic package",
    renderSpecialistPackage(compilation),
  );
  assert.equal(renderedPackage.compilationDigest, APPROVED_EXPECTATION.compilationDigest);
  assert.equal(renderedPackage.packageDigest, APPROVED_EXPECTATION.packageDigest);
  const specialistPackage = expectOk(
    "verify package against external approval",
    verifySpecialistPackage(renderedPackage, APPROVED_EXPECTATION),
  );

  const roots = compilation.blueprints
    .filter((blueprint) => blueprint.dependencies.length === 0)
    .sort((left, right) => compareText(left.id, right.id));
  const dependent = compilation.blueprints.find((blueprint) => blueprint.dependencies.length === 2);
  assert.equal(roots.length, 2);
  assert.notEqual(dependent, undefined);

  let session = expectOk(
    "create run session",
    call("create", createSpecialistRunSession, specialistPackage, APPROVED_EXPECTATION),
  );
  const initialInspection = expectOk(
    "inspect initial session",
    call("inspect", inspectSpecialistRunSession, session, APPROVED_EXPECTATION),
  );
  assert.equal(initialInspection.stage, "collecting");
  assertEligible(
    initialInspection,
    roots.map((blueprint) => blueprint.id),
  );

  const dependentRaw = preserveAndVerifyRawHandoff(
    specialistPackage,
    buildRawHandoff(compilation, dependent, "pass"),
  );
  const premature = call(
    "record",
    recordSpecialistRunHandoff,
    session,
    APPROVED_EXPECTATION,
    dependentRaw,
  );
  const prematureCode = expectDiagnostic("reject premature dependent", premature, "SC4404");
  assert.equal(session.acceptedHandoffs.length, 0);

  const rootRawHandoffs = [];
  const collectionTimeline = [
    {
      stage: initialInspection.stage,
      eligibleAgentIds: initialInspection.nextAction.agentIds,
      acceptedAgentIds: [],
    },
  ];
  let dependencyInspection = initialInspection;
  for (const root of roots) {
    const raw = preserveAndVerifyRawHandoff(
      specialistPackage,
      buildRawHandoff(compilation, root, "pass"),
    );
    rootRawHandoffs.push(raw);
    session = expectOk(
      "record " + root.id,
      call("record", recordSpecialistRunHandoff, session, APPROVED_EXPECTATION, raw),
    );
    dependencyInspection = expectOk(
      "inspect after " + root.id,
      call("inspect", inspectSpecialistRunSession, session, APPROVED_EXPECTATION),
    );
    collectionTimeline.push({
      stage: dependencyInspection.stage,
      eligibleAgentIds: dependencyInspection.nextAction.agentIds,
      acceptedAgentIds: dependencyInspection.acceptedEvidence.map((entry) => entry.agentId),
    });
  }

  assertEligible(dependencyInspection, [dependent.id]);
  const dependencyAssessment = expectOk(
    "assess exact raw dependency fan-in",
    assessSpecialistHandoffs(
      specialistPackage,
      APPROVED_EXPECTATION,
      dependent.id,
      rootRawHandoffs,
    ),
  );
  assert.equal(dependencyAssessment.integrationReady, true);

  const rawSessionBytes = encoder.encode(JSON.stringify(session));
  const restoredSession = expectOk(
    "restore source-preserving session",
    call("restore", restoreSpecialistRunSession, rawSessionBytes, APPROVED_EXPECTATION),
  );
  assert.equal(restoredSession.contentDigest, session.contentDigest);
  const restoredInspection = expectOk(
    "inspect restored session",
    call("inspect", inspectSpecialistRunSession, restoredSession, APPROVED_EXPECTATION),
  );
  assert.equal(restoredInspection.contentDigest, dependencyInspection.contentDigest);
  assertEligible(restoredInspection, [dependent.id]);

  session = expectOk(
    "record " + dependent.id,
    call(
      "record",
      recordSpecialistRunHandoff,
      restoredSession,
      APPROVED_EXPECTATION,
      dependentRaw,
    ),
  );
  const finalInspection = expectOk(
    "inspect complete fan-in",
    call("inspect", inspectSpecialistRunSession, session, APPROVED_EXPECTATION),
  );
  const replayedSession = expectOk(
    "record byte-identical replay",
    call("record", recordSpecialistRunHandoff, session, APPROVED_EXPECTATION, dependentRaw),
  );
  assert.equal(replayedSession.contentDigest, session.contentDigest);
  const closeout = integrationOwnerCloseout(finalInspection);

  let routedSession = expectOk(
    "create terminal-route session",
    call("create", createSpecialistRunSession, specialistPackage, APPROVED_EXPECTATION),
  );
  const routedRaw = preserveAndVerifyRawHandoff(
    specialistPackage,
    buildRawHandoff(compilation, roots[0], "fix"),
  );
  routedSession = expectOk(
    "record verified fix route",
    call(
      "record",
      recordSpecialistRunHandoff,
      routedSession,
      APPROVED_EXPECTATION,
      routedRaw,
    ),
  );
  const routedInspection = expectOk(
    "inspect terminal route",
    call("inspect", inspectSpecialistRunSession, routedSession, APPROVED_EXPECTATION),
  );
  assert.equal(routedInspection.stage, "routed");
  assert.equal(routedInspection.specialistOutcome, "fix");
  assert.equal(routedInspection.integrationReady, false);
  assert.equal(routedInspection.dependencyEligibleContracts.length, 0);
  assert.equal(routedInspection.nextAction.actor, "integration_owner");
  const postRoute = call(
    "record",
    recordSpecialistRunHandoff,
    routedSession,
    APPROVED_EXPECTATION,
    rootRawHandoffs[1],
  );
  const postRouteCode = expectDiagnostic("reject settlement after route", postRoute, "SC4405");

  return {
    journey: "v12-four-operation-ide-run-loop",
    packageApproval: {
      actor: "external_owner",
      expectationSource: "independently_pinned_fixture",
      ...APPROVED_EXPECTATION,
      verified: true,
    },
    compilation: {
      searchMode: compilation.search.mode,
      searchClaim: compilation.search.claim,
      serialAgentCount: compilation.serialBaseline.metrics.agentCount,
      selectedAgentCount: compilation.selected.metrics.agentCount,
      selectedPartition: compilation.selected.partition,
      handoffCount: compilation.selected.metrics.handoffCount,
    },
    contextAuthentication,
    operations: {
      surface: ["create", "restore", "inspect", "record"],
      calls: operationCalls,
    },
    dependencyEligibility: {
      initialEligibleAgentIds: initialInspection.nextAction.agentIds,
      prematureDiagnostic: prematureCode,
      dependentAgentId: dependent.id,
      dependentContractPath: dependencyInspection.dependencyEligibleContracts[0].path,
      exactRawFanInReady: dependencyAssessment.integrationReady,
      timeline: collectionTimeline,
    },
    replay: {
      rawSessionBytes: rawSessionBytes.byteLength,
      restoredSessionDigest: restoredSession.contentDigest,
      inspectionDigestStable: restoredInspection.contentDigest === dependencyInspection.contentDigest,
      byteIdenticalHandoffIdempotent: replayedSession.contentDigest === session.contentDigest,
    },
    acceptedFanIn: finalInspection.acceptedEvidence.map((entry) => ({
      agentId: entry.agentId,
      outcome: entry.outcome,
      rawBytes: entry.rawBytes,
      rawDigest: entry.rawDigest,
      semanticDigest: entry.semanticDigest,
    })),
    terminalRoute: {
      agentId: routedInspection.routes[0].agentId,
      outcome: routedInspection.routes[0].outcome,
      stage: routedInspection.stage,
      integrationReady: routedInspection.integrationReady,
      nextActor: routedInspection.nextAction.actor,
      postRouteDiagnostic: postRouteCode,
    },
    integrationOwnerCloseout: closeout,
    hostBoundary: {
      coreEffects: "none",
      fixtureHostPerformed: [
        "external two-digest package verification",
        "declared context byte authentication",
        "exact raw handoff preservation and submission",
        "caller-owned raw session serialization and restore",
      ],
      stillExternal: [
        "approval freshness and actor authentication",
        "runtime supply and agent launch",
        "permission enforcement and workspace isolation",
        "duplicate live-work prevention and update serialization",
        "durable persistence and uncertain-effect recovery",
        "integration, full repository verification, independent review, milestone, merge, and memory",
      ],
    },
  };
}

const args = process.argv.slice(2);
assert.ok(
  args.length === 0 || (args.length === 1 && args[0] === "--check-evidence"),
  "usage: node scripts/run-v12-dogfood.mjs [--check-evidence]",
);

const first = await runJourney();
const second = await runJourney();
assert.equal(JSON.stringify(second), JSON.stringify(first), "dogfood replay diverged");
assert.deepEqual(first.operations.calls, { create: 2, restore: 1, inspect: 6, record: 7 });
assert.equal(first.acceptedFanIn.length, 3);
assert.equal(first.integrationOwnerCloseout.focusedJourneyVerification, "pass");

console.log(
  JSON.stringify(
    {
      ...first,
      deterministicReplay: {
        runs: 2,
        byteIdenticalReport: true,
        evidenceCheckRequested: args[0] === "--check-evidence",
      },
    },
    null,
    2,
  ),
);
