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
const decoder = new TextDecoder("utf-8", { fatal: true });
const SOURCE_BINDING = Object.freeze({
  sourceId: "context.readme",
  path: "README.md",
  bytes: 3843,
  digest: "sha256:d37b90c342a1a46a2b9c374ae660c998d2c63d047267fc72c865b68d0bb3a9fc",
});
const SYNTHETIC_APPROVED_EXPECTATION = Object.freeze({
  compilationDigest: "sha256:fa99e8a16cf253d4218576ae98ae55f2413bae7b1f94973bb7b61bf124877523",
  packageDigest: "sha256:cbbc76d492b9dcb11136665555d24060d0ec26616eb7b28b0ebc402b2de000bb",
});
const RELEASE_CORRECTION_GOAL_ID = "v12.ide-run-loop.implementation.release-correction";
const RELEASE_CORRECTION_BASE = "docs/specs/v12-ide-run-loop/evidence/implementation";
const REVISION_CHAIN = Object.freeze([
  {
    revision: 1,
    root: RELEASE_CORRECTION_BASE + "/release-correction",
    expectation: {
      compilationDigest: "sha256:45fa97ffb1fdb7f95ae33203e9f727c0f66c27a1b2fa344f06a9569b165ae4c2",
      packageDigest: "sha256:0243a0cea075424c7c919a6af876b4f023f9e635234cf6ec07a0d7cb9543bf6c",
    },
    approval: {
      bytes: 641,
      digest: "sha256:dc177cddfeae16dcefe456581fcaed2e072a8fa84b4ad67204146062d4995ef2",
    },
    packageEnvelope: {
      bytes: 313118,
      digest: "sha256:3db78ce7e72fb6554df199d1ee3d9f8f6f88a2d9a0c15b5395b7fd3ed2bd82bd",
    },
    verificationReport: {
      bytes: 2767,
      digest: "sha256:b33cc6312e2db6481ae9d634607a952a67c3fb09a2c6f42b40a0f7338251dd1e",
    },
    handoffs: [
      {
        agentId: "agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664",
        bytes: 5693,
        digest: "sha256:3510b98137b0cd8746d5440f4254bcfed8c493f714a57539a705eb12012c12fd",
        outcome: "pass",
      },
      {
        agentId: "agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50",
        bytes: 6718,
        digest: "sha256:f74436e9e9a234cc8c41cba9a3b47ee84d8e0bff3ceba811252f008686c51677",
        outcome: "pass",
      },
      {
        agentId: "agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666",
        bytes: 6667,
        digest: "sha256:23bbdd75d90ee42595b5f22f1ba2c9ba9f608866b049285b027ae579225b2e4b",
        outcome: "pass",
      },
    ],
    phaseReady: false,
  },
  {
    revision: 2,
    root: RELEASE_CORRECTION_BASE + "/release-correction-r2",
    expectation: {
      compilationDigest: "sha256:ce22dcd5bc7b96d7399fa792ab9ab35c0b10af9a0a4c437fd3d184dfe3eec672",
      packageDigest: "sha256:cff1fa3d5eaa668e962b212f8128018c3e4b2721404fa457ca73c79578011fcc",
    },
    approval: {
      bytes: 641,
      digest: "sha256:52f1a755dc039240fcfbbb4679382504f1470758a21df41007e1d67e8b4d138b",
    },
    packageEnvelope: {
      bytes: 126914,
      digest: "sha256:b0ac5ef2c1131207ccee6a43ade45fd750307f1ab763c7b74d0308d3fe9960fd",
    },
    verificationReport: {
      bytes: 1308,
      digest: "sha256:cc0fe31e1f2b4dfb903667056b83fffb5402afc6f4f8bf4a727c4178abae5afb",
    },
    handoffs: [
      {
        agentId: "agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe",
        bytes: 7254,
        digest: "sha256:8db3fea6a6f47fba804f72d454660bafda7ab5d06691d729157e2f8f3aba66be",
        outcome: "split",
      },
    ],
    phaseReady: false,
  },
  {
    revision: 3,
    root: RELEASE_CORRECTION_BASE + "/release-correction-r3",
    expectation: {
      compilationDigest: "sha256:ded9a26906a9a00a5f0b12dc3420e909a91e70ef9a3ee03905ac1676efb40638",
      packageDigest: "sha256:19c13189225b8bedd69b03edb2c4c3821aa9d8256e39209f5c10641527dc4d01",
    },
    approval: {
      bytes: 641,
      digest: "sha256:615cc4bd3965a7344a53485a35c58bcada2217609760388d2a729beda4c574cc",
    },
    packageEnvelope: {
      bytes: 141194,
      digest: "sha256:26bf421f81127ecfe85f31b6d044a2a3accbaca788ab378a90e2db4733a887a6",
    },
    verificationReport: {
      bytes: 1308,
      digest: "sha256:93ea426aadd18f7ff5b68bc779b247b2c68ab8c476fcd969941eb3b18332e3c1",
    },
    handoffs: [
      {
        agentId: "agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d",
        bytes: 8095,
        digest: "sha256:89ab112ce3df0a97f64db2994fc792238955b7007a7ce0310b4af39b4340d3df",
        outcome: "split",
      },
    ],
    phaseReady: false,
  },
  {
    revision: 4,
    root: RELEASE_CORRECTION_BASE + "/release-correction-r4",
    expectation: {
      compilationDigest: "sha256:aa13bb1f6a8ff21658b718ccd46e6a5a26dacd8d1c9baa990b92e37161627660",
      packageDigest: "sha256:edaba251ee9b258474674225d38123df2772dfc42b7cd52e1d49dff8791f5065",
    },
    approval: {
      bytes: 641,
      digest: "sha256:eab4c5b000fc984a662ba1870506243b6f3bdc56db01d4596bfedc5d208db26e",
    },
    packageEnvelope: {
      bytes: 156278,
      digest: "sha256:c34764e2e121af4634cb4aaaa6a46a13584a6b2999bb5650cc17f5ce944ddaa4",
    },
    verificationReport: {
      bytes: 1306,
      digest: "sha256:4679cd6145a4afa16adcd7e395a0cf7cfa7fd770cc2c0e328fcdf9189e71e06f",
    },
    handoffs: [
      {
        agentId: "agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba",
        bytes: 9058,
        digest: "sha256:5afb33ee3c7f456ea0331d7d0735a0291cd69fb5d7a4c6c6d80982177d815090",
        outcome: "pass",
      },
    ],
    phaseReady: true,
  },
]);
const REPLAN_CHAIN = Object.freeze([
  {
    fromRevision: 1,
    toRevision: 2,
    route: "redesign",
    binding: {
      path: RELEASE_CORRECTION_BASE + "/release-correction-r2/replan.json",
      bytes: 3795,
      digest: "sha256:73fcd5841f739c4f353355ddba6b412d68c3b2d8233ccc371ef2de9a2477d282",
    },
  },
  {
    fromRevision: 2,
    toRevision: 3,
    route: "split",
    binding: {
      path: RELEASE_CORRECTION_BASE + "/release-correction-r3/replan.json",
      bytes: 2807,
      digest: "sha256:67eac872b0d88bbade9af9afda268178f57077b0abdc4f605444ead1da6c186c",
    },
  },
  {
    fromRevision: 3,
    toRevision: 4,
    route: "split",
    binding: {
      path: RELEASE_CORRECTION_BASE + "/release-correction-r4/replan.json",
      bytes: 2701,
      digest: "sha256:64376261a673ebc7ec29222ee90569097915879521d8ea062a36a9d156e8b34d",
    },
  },
]);
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
    verifySpecialistHandoff(specialistPackage, SYNTHETIC_APPROVED_EXPECTATION, preserved),
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
  assert.equal(renderedPackage.compilationDigest, SYNTHETIC_APPROVED_EXPECTATION.compilationDigest);
  assert.equal(renderedPackage.packageDigest, SYNTHETIC_APPROVED_EXPECTATION.packageDigest);
  const specialistPackage = expectOk(
    "verify package against external approval",
    verifySpecialistPackage(renderedPackage, SYNTHETIC_APPROVED_EXPECTATION),
  );

  const roots = compilation.blueprints
    .filter((blueprint) => blueprint.dependencies.length === 0)
    .sort((left, right) => compareText(left.id, right.id));
  const dependent = compilation.blueprints.find((blueprint) => blueprint.dependencies.length === 2);
  assert.equal(roots.length, 2);
  assert.notEqual(dependent, undefined);

  let session = expectOk(
    "create run session",
    call("create", createSpecialistRunSession, specialistPackage, SYNTHETIC_APPROVED_EXPECTATION),
  );
  const initialInspection = expectOk(
    "inspect initial session",
    call("inspect", inspectSpecialistRunSession, session, SYNTHETIC_APPROVED_EXPECTATION),
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
    SYNTHETIC_APPROVED_EXPECTATION,
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
      call("record", recordSpecialistRunHandoff, session, SYNTHETIC_APPROVED_EXPECTATION, raw),
    );
    dependencyInspection = expectOk(
      "inspect after " + root.id,
      call("inspect", inspectSpecialistRunSession, session, SYNTHETIC_APPROVED_EXPECTATION),
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
      SYNTHETIC_APPROVED_EXPECTATION,
      dependent.id,
      rootRawHandoffs,
    ),
  );
  assert.equal(dependencyAssessment.integrationReady, true);

  const rawSessionBytes = encoder.encode(JSON.stringify(session));
  const restoredSession = expectOk(
    "restore source-preserving session",
    call("restore", restoreSpecialistRunSession, rawSessionBytes, SYNTHETIC_APPROVED_EXPECTATION),
  );
  assert.equal(restoredSession.contentDigest, session.contentDigest);
  const restoredInspection = expectOk(
    "inspect restored session",
    call("inspect", inspectSpecialistRunSession, restoredSession, SYNTHETIC_APPROVED_EXPECTATION),
  );
  assert.equal(restoredInspection.contentDigest, dependencyInspection.contentDigest);
  assertEligible(restoredInspection, [dependent.id]);

  session = expectOk(
    "record " + dependent.id,
    call(
      "record",
      recordSpecialistRunHandoff,
      restoredSession,
      SYNTHETIC_APPROVED_EXPECTATION,
      dependentRaw,
    ),
  );
  const finalInspection = expectOk(
    "inspect complete fan-in",
    call("inspect", inspectSpecialistRunSession, session, SYNTHETIC_APPROVED_EXPECTATION),
  );
  const replayedSession = expectOk(
    "record byte-identical replay",
    call(
      "record",
      recordSpecialistRunHandoff,
      session,
      SYNTHETIC_APPROVED_EXPECTATION,
      dependentRaw,
    ),
  );
  assert.equal(replayedSession.contentDigest, session.contentDigest);
  const closeout = integrationOwnerCloseout(finalInspection);

  let routedSession = expectOk(
    "create terminal-route session",
    call("create", createSpecialistRunSession, specialistPackage, SYNTHETIC_APPROVED_EXPECTATION),
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
      SYNTHETIC_APPROVED_EXPECTATION,
      routedRaw,
    ),
  );
  const routedInspection = expectOk(
    "inspect terminal route",
    call("inspect", inspectSpecialistRunSession, routedSession, SYNTHETIC_APPROVED_EXPECTATION),
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
    SYNTHETIC_APPROVED_EXPECTATION,
    rootRawHandoffs[1],
  );
  const postRouteCode = expectDiagnostic("reject settlement after route", postRoute, "SC4405");

  return {
    journey: "v12-four-operation-ide-run-loop",
    packageApproval: {
      actor: "external_owner",
      expectationSource: "independently_pinned_fixture",
      ...SYNTHETIC_APPROVED_EXPECTATION,
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
      inspectionDigestStable:
        restoredInspection.contentDigest === dependencyInspection.contentDigest,
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

function repositoryUrl(relativePath) {
  return new URL("../" + relativePath, import.meta.url);
}

function assertNormalizedLfUtf8(label, rawBytes) {
  const content = decoder.decode(rawBytes);
  assert.equal(
    Buffer.from(content, "utf8").equals(Buffer.from(rawBytes)),
    true,
    label + ": UTF-8 bytes do not round-trip exactly",
  );
  assert.equal(content.includes("\r"), false, label + ": CR is not allowed");
  assert.equal(content.includes("\t"), false, label + ": TAB is not allowed");
  assert.equal(
    [...content].some((character) => {
      const code = character.charCodeAt(0);
      return code <= 9 || (code >= 11 && code <= 31) || (code >= 127 && code <= 159);
    }),
    false,
    label + ": unsafe control character",
  );
  return content;
}

async function readAuthenticatedJson(binding, label) {
  const rawBytes = new Uint8Array(await readFile(repositoryUrl(binding.path)));
  assert.equal(rawBytes.byteLength, binding.bytes, label + ": byte count mismatch");
  assert.equal(rawDigest(rawBytes), binding.digest, label + ": raw digest mismatch");
  const content = assertNormalizedLfUtf8(label, rawBytes);
  return {
    value: JSON.parse(content),
    rawBytes,
    authentication: {
      path: binding.path,
      mediaType: "application/json",
      bytes: rawBytes.byteLength,
      rawDigest: rawDigest(rawBytes),
      authenticated: true,
    },
  };
}

function packageCompilation(specialistPackage) {
  const compilationFile = specialistPackage.files.find((file) => file.path === "compilation.json");
  assert.notEqual(compilationFile, undefined, "verified package lacks compilation.json");
  return JSON.parse(compilationFile.content);
}

function sortedAgentIds(entries) {
  return entries.map((entry) => entry.agentId).sort(compareText);
}

async function loadReleaseCorrectionRevision(definition, supportCalls) {
  const approvalInput = await readAuthenticatedJson(
    {
      path: definition.root + "/approval.json",
      ...definition.approval,
    },
    "revision " + definition.revision + " approval",
  );
  const approval = approvalInput.value;
  assert.equal(approval.goalId, RELEASE_CORRECTION_GOAL_ID);
  assert.equal(approval.goalRevision, definition.revision);
  assert.deepEqual(approval.expectation, definition.expectation);

  const packageInput = await readAuthenticatedJson(
    {
      path: definition.root + "/package-envelope.json",
      ...definition.packageEnvelope,
    },
    "revision " + definition.revision + " package envelope",
  );
  supportCalls.verifyPackage += 1;
  const specialistPackage = expectOk(
    "verify revision " + definition.revision + " package against external approval",
    verifySpecialistPackage(packageInput.value, definition.expectation),
  );
  assert.equal(specialistPackage.compilationDigest, definition.expectation.compilationDigest);
  assert.equal(specialistPackage.packageDigest, definition.expectation.packageDigest);

  const compilation = packageCompilation(specialistPackage);
  assert.equal(compilation.goal.id, RELEASE_CORRECTION_GOAL_ID);
  assert.equal(compilation.goal.revision, definition.revision);
  assert.deepEqual(compilation.goal.unresolvedDecisions, []);

  const reportInput = await readAuthenticatedJson(
    {
      path: definition.root + "/handoff-verification.json",
      ...definition.verificationReport,
    },
    "revision " + definition.revision + " handoff verification report",
  );
  const report = reportInput.value;
  assert.equal(report.compilationDigest, definition.expectation.compilationDigest);
  assert.equal(report.packageDigest, definition.expectation.packageDigest);

  const manifestAgentIds = sortedAgentIds(specialistPackage.manifest.agents);
  const deliveredAgentIds = sortedAgentIds(definition.handoffs);
  assert.deepEqual(report.expectedAgentIds, manifestAgentIds);
  assert.deepEqual(report.receivedAgentIds, deliveredAgentIds);
  assert.equal(report.verifiedHandoffs.length, definition.handoffs.length);
  assert.equal(report.complete, deliveredAgentIds.length === manifestAgentIds.length);
  assert.equal(report.phaseReady, definition.phaseReady);
  assert.equal(
    report.phaseReady,
    report.complete && definition.handoffs.every((handoff) => handoff.outcome === "pass"),
  );

  const handoffs = [];
  for (const binding of definition.handoffs) {
    const manifestAgent = specialistPackage.manifest.agents.find(
      (agent) => agent.agentId === binding.agentId,
    );
    assert.notEqual(
      manifestAgent,
      undefined,
      "revision " + definition.revision + " handoff agent is absent from manifest",
    );
    const handoffInput = await readAuthenticatedJson(
      {
        path: definition.root + "/handoffs/" + binding.agentId + ".json",
        bytes: binding.bytes,
        digest: binding.digest,
      },
      "revision " + definition.revision + " handoff " + binding.agentId,
    );
    supportCalls.verifyHandoff += 1;
    const verified = expectOk(
      "verify revision " + definition.revision + " handoff " + binding.agentId,
      verifySpecialistHandoff(specialistPackage, definition.expectation, handoffInput.rawBytes),
    );
    assert.equal(verified.handoff.agent.id, binding.agentId);
    assert.equal(verified.handoff.agent.blueprintDigest, manifestAgent.blueprintDigest);
    assert.equal(verified.handoff.outcome, binding.outcome);
    assert.equal(verified.rawBytes, binding.bytes);
    assert.equal(verified.rawDigest, binding.digest);

    const reportBinding = report.verifiedHandoffs.find(
      (entry) => entry.agentId === binding.agentId,
    );
    assert.notEqual(reportBinding, undefined, "verified handoff is absent from report");
    assert.equal(reportBinding.file, binding.agentId + ".json");
    assert.equal(reportBinding.outcome, verified.handoff.outcome);
    assert.equal(reportBinding.rawBytes, verified.rawBytes);
    assert.equal(reportBinding.rawDigest, verified.rawDigest);
    assert.equal(reportBinding.semanticDigest, verified.semanticDigest);
    assert.equal(reportBinding.contentDigest, verified.contentDigest);

    handoffs.push({
      agentId: binding.agentId,
      blueprintDigest: verified.handoff.agent.blueprintDigest,
      path: handoffInput.authentication.path,
      mediaType: handoffInput.authentication.mediaType,
      outcome: verified.handoff.outcome,
      bytes: verified.rawBytes,
      rawDigest: verified.rawDigest,
      semanticDigest: verified.semanticDigest,
      contentDigest: verified.contentDigest,
      rawBytes: new Uint8Array(handoffInput.rawBytes),
    });
  }

  return {
    definition,
    approval: approvalInput.authentication,
    packageEnvelope: packageInput.authentication,
    verificationReport: reportInput.authentication,
    specialistPackage,
    compilation,
    report,
    handoffs,
    missingAgentIds: manifestAgentIds.filter((agentId) => !deliveredAgentIds.includes(agentId)),
    packageFiles: specialistPackage.files.map((file) => ({
      path: file.path,
      mediaType: file.mediaType,
      bytes: file.bytes,
      digest: file.digest,
    })),
  };
}

async function authenticateReplanChain(revisions) {
  const byRevision = new Map(revisions.map((revision) => [revision.definition.revision, revision]));
  const replans = [];
  const retiredContracts = [];
  const changedBindings = [];
  const scopeAdditions = [];
  let preventedUnsafeLaunches = 0;
  let cachePrimingShortcutsRejected = 0;
  let additionalApprovalPrompts = 0;

  for (const transition of REPLAN_CHAIN) {
    const from = byRevision.get(transition.fromRevision);
    const to = byRevision.get(transition.toRevision);
    assert.notEqual(from, undefined, "missing replan source revision");
    assert.notEqual(to, undefined, "missing replan target revision");

    const input = await readAuthenticatedJson(
      transition.binding,
      "revision " + transition.fromRevision + " to " + transition.toRevision + " replan",
    );
    const replan = input.value;
    assert.equal(replan.kind, "SpecialistContractReplan");
    assert.equal(replan.goal.id, RELEASE_CORRECTION_GOAL_ID);
    assert.equal(replan.goal.fromRevision, transition.fromRevision);
    assert.equal(replan.goal.toRevision, transition.toRevision);
    assert.equal(replan.route, transition.route);

    const triggerHandoff = from.handoffs.find(
      (handoff) => handoff.agentId === replan.trigger.agentId,
    );
    assert.notEqual(triggerHandoff, undefined, "replan trigger handoff was not authenticated");
    assert.equal(replan.trigger.handoffPath, triggerHandoff.path);
    assert.equal(replan.trigger.handoffBytes, triggerHandoff.bytes);
    assert.equal(replan.trigger.handoffDigest, triggerHandoff.rawDigest);
    assert.equal(replan.trigger.outcome, triggerHandoff.outcome);

    assert.equal(
      replan.replacementContract.compilationDigest,
      to.definition.expectation.compilationDigest,
    );
    assert.equal(replan.replacementContract.packageDigest, to.definition.expectation.packageDigest);
    const replacementAgent = to.specialistPackage.manifest.agents.find(
      (agent) => agent.agentId === replan.replacementContract.agentId,
    );
    assert.notEqual(replacementAgent, undefined, "replacement agent is absent from package");
    assert.equal(replan.replacementContract.blueprintDigest, replacementAgent.blueprintDigest);
    assert.equal(
      replan.replacementContract.contractPath,
      to.definition.root + "/package/" + replacementAgent.contractFile,
    );
    const replacementHandoff = to.handoffs.find(
      (handoff) => handoff.agentId === replacementAgent.agentId,
    );
    assert.notEqual(replacementHandoff, undefined, "replacement handoff was not authenticated");
    assert.equal(replan.replacementContract.handoffPath, replacementHandoff.path);
    assert.equal(replan.replacementContract.handoffBytes, replacementHandoff.bytes);
    assert.equal(replan.replacementContract.handoffDigest, replacementHandoff.rawDigest);
    assert.equal(replan.replacementContract.outcome, replacementHandoff.outcome);

    if (replan.retiredContract !== undefined) {
      const retiredAgent = from.specialistPackage.manifest.agents.find(
        (agent) => agent.agentId === replan.retiredContract.agentId,
      );
      assert.notEqual(retiredAgent, undefined, "retired agent is absent from source package");
      assert.equal(replan.retiredContract.blueprintDigest, retiredAgent.blueprintDigest);
      assert.equal(replan.retiredContract.launched, false);
      assert.equal(replan.retiredContract.handoff, null);
      assert.equal(
        from.handoffs.some((handoff) => handoff.agentId === retiredAgent.agentId),
        false,
      );
      retiredContracts.push({
        revision: transition.fromRevision,
        compilationDigest: replan.retiredContract.compilationDigest,
        packageDigest: replan.retiredContract.packageDigest,
        agentId: replan.retiredContract.agentId,
        blueprintDigest: replan.retiredContract.blueprintDigest,
        contractPath: replan.retiredContract.contractPath,
        launched: replan.retiredContract.launched,
        outcome: null,
        reason: replan.retiredContract.reason,
      });
    } else {
      const retiredAgent = from.specialistPackage.manifest.agents.find(
        (agent) => agent.agentId === triggerHandoff.agentId,
      );
      assert.notEqual(retiredAgent, undefined, "routed agent is absent from source package");
      retiredContracts.push({
        revision: transition.fromRevision,
        compilationDigest: from.definition.expectation.compilationDigest,
        packageDigest: from.definition.expectation.packageDigest,
        agentId: retiredAgent.agentId,
        blueprintDigest: retiredAgent.blueprintDigest,
        contractPath: from.definition.root + "/package/" + retiredAgent.contractFile,
        launched: true,
        outcome: triggerHandoff.outcome,
        reason: replan.trigger.cause,
      });
    }

    for (const binding of replan.changedBindings ?? []) {
      changedBindings.push({
        replan: transition.fromRevision + "->" + transition.toRevision,
        ...binding,
      });
    }
    for (const path of replan.newlyAuthorizedPaths ?? []) {
      scopeAdditions.push({
        replan: transition.fromRevision + "->" + transition.toRevision,
        path,
      });
    }
    preventedUnsafeLaunches += replan.friction.unsafeLaunchesPrevented ?? 0;
    cachePrimingShortcutsRejected += replan.friction.cachePrimingShortcutsRejected ?? 0;
    additionalApprovalPrompts += replan.friction.additionalApprovalPrompts;

    replans.push({
      fromRevision: transition.fromRevision,
      toRevision: transition.toRevision,
      route: replan.route,
      checkpoint: replan.checkpoint,
      authentication: input.authentication,
      trigger: {
        agentId: triggerHandoff.agentId,
        path: triggerHandoff.path,
        outcome: triggerHandoff.outcome,
        bytes: triggerHandoff.bytes,
        rawDigest: triggerHandoff.rawDigest,
        cause: replan.trigger.cause ?? null,
      },
      replacement: {
        agentId: replacementAgent.agentId,
        blueprintDigest: replacementAgent.blueprintDigest,
        compilationDigest: to.definition.expectation.compilationDigest,
        packageDigest: to.definition.expectation.packageDigest,
        outcome: replacementHandoff.outcome,
      },
    });
  }

  assert.equal(replans.length, 3);
  assert.equal(retiredContracts.length, 3);
  assert.equal(scopeAdditions.length, 4);
  assert.equal(preventedUnsafeLaunches, 1);
  assert.equal(cachePrimingShortcutsRejected, 2);
  assert.equal(additionalApprovalPrompts, 0);

  return {
    replans,
    retiredContracts,
    changedBindings,
    scopeAdditions,
    preventedUnsafeLaunches,
    cachePrimingShortcutsRejected,
    additionalApprovalPrompts,
  };
}

function manifestResolvedContracts(inspection, manifest) {
  const eligibleByAgent = new Map(
    inspection.dependencyEligibleContracts.map((contract) => [contract.agentId, contract]),
  );
  assert.equal(
    eligibleByAgent.size,
    manifest.agents.length,
    "every revision-4 contract must be dependency-eligible",
  );
  return manifest.agents.map((manifestAgent) => {
    const contract = eligibleByAgent.get(manifestAgent.agentId);
    assert.notEqual(contract, undefined, "manifest contract was not resolved by inspection");
    assert.equal(contract.blueprintDigest, manifestAgent.blueprintDigest);
    assert.equal(contract.path, manifestAgent.contractFile);
    assert.equal(contract.mediaType, "text/markdown");
    assert.equal(contract.bytes, manifestAgent.contractBytes);
    assert.equal(contract.digest, manifestAgent.contractDigest);
    return {
      agentId: contract.agentId,
      blueprintDigest: contract.blueprintDigest,
      path: contract.path,
      mediaType: contract.mediaType,
      bytes: contract.bytes,
      digest: contract.digest,
    };
  });
}

function createImmutableIntegrationSnapshot(session) {
  const rawBytes = encoder.encode(JSON.stringify(session));
  const snapshot = Object.freeze({
    mediaType: "application/json",
    rawEncoding: "base64",
    bytes: rawBytes.byteLength,
    rawDigest: rawDigest(rawBytes),
    sessionDigest: session.contentDigest,
    rawBase64: Buffer.from(rawBytes).toString("base64"),
  });
  assert.equal(Object.isFrozen(snapshot), true);
  const restoredBytes = new Uint8Array(Buffer.from(snapshot.rawBase64, "base64"));
  assert.equal(restoredBytes.byteLength, snapshot.bytes);
  assert.equal(rawDigest(restoredBytes), snapshot.rawDigest);
  assert.equal(Buffer.from(restoredBytes).toString("base64"), snapshot.rawBase64);
  return { snapshot, restoredBytes };
}

async function runReleaseCorrectionJourney() {
  const coreCalls = { create: 0, restore: 0, inspect: 0, record: 0 };
  const supportCalls = { verifyPackage: 0, verifyHandoff: 0 };
  const call = (operation, fn, ...args) => {
    coreCalls[operation] += 1;
    return fn(...args);
  };

  const revisions = [];
  for (const definition of REVISION_CHAIN) {
    revisions.push(await loadReleaseCorrectionRevision(definition, supportCalls));
  }
  const revisionChain = await authenticateReplanChain(revisions);
  const revision4 = revisions.find((revision) => revision.definition.revision === 4);
  assert.notEqual(revision4, undefined);
  assert.equal(revision4.handoffs.length, 1);
  const revision4Handoff = revision4.handoffs[0];

  let session = expectOk(
    "create revision-4 run session",
    call(
      "create",
      createSpecialistRunSession,
      revision4.specialistPackage,
      revision4.definition.expectation,
    ),
  );
  const initialInspection = expectOk(
    "inspect revision-4 initial session",
    call("inspect", inspectSpecialistRunSession, session, revision4.definition.expectation),
  );
  assert.equal(initialInspection.stage, "collecting");
  const contracts = manifestResolvedContracts(
    initialInspection,
    revision4.specialistPackage.manifest,
  );
  assert.deepEqual(
    contracts.map((contract) => contract.agentId),
    [revision4Handoff.agentId],
  );

  session = expectOk(
    "record exact revision-4 pass handoff",
    call(
      "record",
      recordSpecialistRunHandoff,
      session,
      revision4.definition.expectation,
      revision4Handoff.rawBytes,
    ),
  );
  const recordedInspection = expectOk(
    "inspect completed revision-4 session",
    call("inspect", inspectSpecialistRunSession, session, revision4.definition.expectation),
  );
  assert.equal(recordedInspection.stage, "integration_ready");
  assert.equal(recordedInspection.specialistOutcome, "pass");
  assert.equal(recordedInspection.integrationReady, true);
  assert.equal(recordedInspection.routes.length, 0);

  const { snapshot, restoredBytes } = createImmutableIntegrationSnapshot(session);
  const restoredSession = expectOk(
    "restore revision-4 integration snapshot",
    call("restore", restoreSpecialistRunSession, restoredBytes, revision4.definition.expectation),
  );
  const restoredInspection = expectOk(
    "reinspect restored revision-4 session",
    call("inspect", inspectSpecialistRunSession, restoredSession, revision4.definition.expectation),
  );
  const resumeEquality = {
    sessionDigestEqual: restoredSession.contentDigest === session.contentDigest,
    canonicalSessionEqual: JSON.stringify(restoredSession) === JSON.stringify(session),
    inspectionDigestEqual: restoredInspection.contentDigest === recordedInspection.contentDigest,
    canonicalInspectionEqual:
      JSON.stringify(restoredInspection) === JSON.stringify(recordedInspection),
  };
  assert.deepEqual(resumeEquality, {
    sessionDigestEqual: true,
    canonicalSessionEqual: true,
    inspectionDigestEqual: true,
    canonicalInspectionEqual: true,
  });

  const closeout = integrationOwnerCloseout(restoredInspection);
  const totalCoreCalls = Object.values(coreCalls).reduce((sum, count) => sum + count, 0);
  const packageEnvelopeBytes = revisions.reduce(
    (sum, revision) => sum + revision.packageEnvelope.bytes,
    0,
  );
  const packageFileBytes = revisions.reduce(
    (sum, revision) =>
      sum + revision.packageFiles.reduce((fileSum, file) => fileSum + file.bytes, 0),
    0,
  );
  const rawHandoffBytes = revisions.reduce(
    (sum, revision) =>
      sum + revision.handoffs.reduce((handoffSum, handoff) => handoffSum + handoff.bytes, 0),
    0,
  );
  const replanBytes = revisionChain.replans.reduce(
    (sum, replan) => sum + replan.authentication.bytes,
    0,
  );

  return {
    journey: "v12-release-correction-revision-chain",
    status: "pass",
    successfulRevision: 4,
    revisionAuthentication: revisions.map((revision) => ({
      revision: revision.definition.revision,
      expectationSource: "authenticated_external_approval",
      compilationDigest: revision.definition.expectation.compilationDigest,
      packageDigest: revision.definition.expectation.packageDigest,
      approval: revision.approval,
      packageEnvelope: revision.packageEnvelope,
      packageFileCount: revision.packageFiles.length,
      packageFiles: revision.packageFiles,
      handoffVerificationReport: revision.verificationReport,
      expectedAgentIds: revision.report.expectedAgentIds,
      receivedAgentIds: revision.report.receivedAgentIds,
      missingAgentIds: revision.missingAgentIds,
      complete: revision.report.complete,
      phaseReady: revision.report.phaseReady,
      exactRawHandoffs: revision.handoffs.map((handoff) => ({
        agentId: handoff.agentId,
        blueprintDigest: handoff.blueprintDigest,
        path: handoff.path,
        mediaType: handoff.mediaType,
        outcome: handoff.outcome,
        bytes: handoff.bytes,
        rawDigest: handoff.rawDigest,
        semanticDigest: handoff.semanticDigest,
        contentDigest: handoff.contentDigest,
      })),
    })),
    revisionChain: {
      replans: revisionChain.replans,
      retiredContracts: revisionChain.retiredContracts,
      changedBindings: revisionChain.changedBindings,
      scopeAdditions: revisionChain.scopeAdditions,
      preventedUnsafeLaunches: revisionChain.preventedUnsafeLaunches,
      cachePrimingShortcutsRejected: revisionChain.cachePrimingShortcutsRejected,
      terminalOutcomes: [
        { revision: 1, outcome: "replanned_after_three_pass_handoffs" },
        { revision: 2, outcome: "split" },
        { revision: 3, outcome: "split" },
        { revision: 4, outcome: "pass" },
      ],
    },
    revision4Session: {
      manifestResolvedContracts: contracts,
      recordOrder: [revision4Handoff.agentId],
      operations: {
        surface: ["create", "restore", "inspect", "record"],
        calls: coreCalls,
        total: totalCoreCalls,
        supportingPublicCalls: supportCalls,
      },
      integratedVerification: {
        acceptedAgentIds: restoredInspection.acceptedEvidence.map((entry) => entry.agentId),
        specialistOutcome: restoredInspection.specialistOutcome,
        integrationReady: restoredInspection.integrationReady,
        nextActor: restoredInspection.nextAction.actor,
        repositoryIntegrationAndVerification: "external_not_claimed",
        closeout,
      },
      immutableIntegrationSnapshot: snapshot,
    },
    friction: {
      blockingQuestions: {
        count: 0,
        unresolvedDecisions: revision4.compilation.goal.unresolvedDecisions.length,
      },
      approvalPrompts: {
        count: revisionChain.additionalApprovalPrompts,
        approvedDigestPairsConsumed: revisions.length,
        approvalRemainsExternal: true,
      },
      coreCalls: {
        count: totalCoreCalls,
        calls: coreCalls,
      },
      manualContractLookups: {
        count: 0,
        contractsDerivedFromManifest: contracts.length,
      },
      rejectedTransitions: {
        implementationPackageCount: 0,
        revisionNonPassRoutes: 2,
        syntheticRegressionCount: 2,
        syntheticDiagnostics: ["SC4404", "SC4405"],
      },
      serializedSessionSize: {
        bytes: snapshot.bytes,
        rawDigest: snapshot.rawDigest,
      },
      reverificationCost: {
        explicitPackageVerificationCalls: supportCalls.verifyPackage,
        explicitRawHandoffVerificationCalls: supportCalls.verifyHandoff,
        publicRunOperationCalls: totalCoreCalls,
        packageEnvelopeBytesAuthenticated: packageEnvelopeBytes,
        packageFileBytesReconstructed: packageFileBytes,
        rawHandoffBytesAuthenticated: rawHandoffBytes,
        replanBytesAuthenticated: replanBytes,
        resumeSessionBytesReverified: snapshot.bytes,
        resumeAcceptedHandoffBytesReinspected: revision4Handoff.bytes,
      },
      resumeEquality,
      persistenceSteps: {
        count: 3,
        steps: [
          "serialize caller-owned revision-4 session bytes",
          "preserve immutable base64 snapshot with exact byte and digest binding",
          "restore and reinspect from the preserved snapshot",
        ],
      },
      adapterOnlyTranslation: {
        count: 0,
        providerOrModelFieldsAdded: 0,
        hostRuntimeStateFieldsAdded: 0,
      },
      revisionChainExpansion: {
        replans: revisionChain.replans.length,
        retiredContracts: revisionChain.retiredContracts.length,
        changedBindings: revisionChain.changedBindings.length,
        scopePathsAdded: revisionChain.scopeAdditions.length,
        preventedUnsafeLaunches: revisionChain.preventedUnsafeLaunches,
        cachePrimingShortcutsRejected: revisionChain.cachePrimingShortcutsRejected,
      },
    },
    hostBoundary: {
      coreEffects: "none",
      coreHostEffectsClaimed: false,
      runtimeOrDescendantLaunchEffectsPerformed: false,
      localEvidenceHarnessPerformed: [
        "authenticate exact external approval, package-envelope, report, handoff, and replan bytes",
        "submit the exact revision-4 pass handoff to pure run-session operations",
        "serialize, preserve, restore, and reinspect the caller-owned revision-4 session",
      ],
      stillExternal: [
        "approval freshness and actor authentication",
        "runtime supply and agent launch",
        "permission enforcement and workspace isolation",
        "duplicate live-work prevention and update serialization",
        "durable persistence and uncertain-effect recovery",
        "repository integration, canonical verification, independent review, merge, and memory",
      ],
    },
  };
}

const args = process.argv.slice(2);
assert.ok(
  args.length === 0 ||
    (args.length === 1 && (args[0] === "--check-evidence" || args[0] === "--synthetic-only")),
  "usage: node scripts/run-v12-dogfood.mjs [--check-evidence|--synthetic-only]",
);

const first = await runJourney();
const second = await runJourney();
assert.equal(JSON.stringify(second), JSON.stringify(first), "dogfood replay diverged");
assert.deepEqual(first.operations.calls, { create: 2, restore: 1, inspect: 6, record: 7 });
assert.equal(first.acceptedFanIn.length, 3);
assert.equal(first.integrationOwnerCloseout.focusedJourneyVerification, "pass");

const syntheticRegression = {
  ...first,
  deterministicReplay: {
    runs: 2,
    byteIdenticalReport: true,
    evidenceCheckRequested: args[0] === "--check-evidence",
  },
};

let implementationPackageDogfood;
if (args[0] === "--synthetic-only") {
  implementationPackageDogfood = {
    journey: "v12-release-correction-revision-chain",
    status: "not_run_synthetic_only",
  };
} else {
  const implementationFirst = await runReleaseCorrectionJourney();
  const implementationSecond = await runReleaseCorrectionJourney();
  assert.equal(
    JSON.stringify(implementationSecond),
    JSON.stringify(implementationFirst),
    "revision-chain dogfood replay diverged",
  );
  assert.equal(implementationFirst.revisionAuthentication.length, 4);
  assert.deepEqual(
    implementationFirst.revisionAuthentication.map((revision) =>
      revision.exactRawHandoffs.map((handoff) => handoff.outcome),
    ),
    [["pass", "pass", "pass"], ["split"], ["split"], ["pass"]],
  );
  assert.deepEqual(implementationFirst.revision4Session.operations.calls, {
    create: 1,
    restore: 1,
    inspect: 3,
    record: 1,
  });
  assert.deepEqual(implementationFirst.revision4Session.operations.supportingPublicCalls, {
    verifyPackage: 4,
    verifyHandoff: 6,
  });
  assert.deepEqual(implementationFirst.friction.revisionChainExpansion, {
    replans: 3,
    retiredContracts: 3,
    changedBindings: 2,
    scopePathsAdded: 4,
    preventedUnsafeLaunches: 1,
    cachePrimingShortcutsRejected: 2,
  });
  implementationPackageDogfood = {
    ...implementationFirst,
    deterministicReplay: {
      runs: 2,
      byteIdenticalReport: true,
      evidenceCheckRequested: args[0] === "--check-evidence",
    },
  };
}

console.log(
  JSON.stringify(
    {
      syntheticRegression,
      implementationPackageDogfood,
    },
    null,
    2,
  ),
);
