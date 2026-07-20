import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
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
  bytes: 3101,
  digest: "sha256:6870ce77e4a29a000ff8a8a170d968a735fb339cfac7d412b23080cfc61163dc",
});
const SYNTHETIC_APPROVED_EXPECTATION = Object.freeze({
  compilationDigest: "sha256:da35488617408938ddfb63b181768037841276a0e3cd2ba40b04444d97155a37",
  packageDigest: "sha256:0d201fc9b733a725a5fd3578607b0fc95eca203409c89dc22d4591e2059e5b07",
});
const RELEASE_CORRECTION_ROOT =
  "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction";
const RELEASE_CORRECTION_PACKAGE_ROOT = RELEASE_CORRECTION_ROOT + "/package";
const RELEASE_CORRECTION_HANDOFF_ROOT = RELEASE_CORRECTION_ROOT + "/handoffs";
const RELEASE_CORRECTION_EXPECTATION = Object.freeze({
  compilationDigest: "sha256:45fa97ffb1fdb7f95ae33203e9f727c0f66c27a1b2fa344f06a9569b165ae4c2",
  packageDigest: "sha256:0243a0cea075424c7c919a6af876b4f023f9e635234cf6ec07a0d7cb9543bf6c",
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
    call("record", recordSpecialistRunHandoff, session, SYNTHETIC_APPROVED_EXPECTATION, dependentRaw),
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

function repositoryUrl(relativePath) {
  return new URL("../" + relativePath, import.meta.url);
}

async function listRelativeFiles(directoryUrl, prefix = "") {
  const entries = await readdir(directoryUrl, { withFileTypes: true });
  entries.sort((left, right) => compareText(left.name, right.name));
  const paths = [];
  for (const entry of entries) {
    const relativePath = prefix === "" ? entry.name : prefix + "/" + entry.name;
    if (entry.isDirectory()) {
      paths.push(
        ...(await listRelativeFiles(new URL(entry.name + "/", directoryUrl), relativePath)),
      );
      continue;
    }
    assert.equal(entry.isFile(), true, "package contains a non-file entry: " + relativePath);
    paths.push(relativePath);
  }
  return paths;
}

function releaseCorrectionHandoffContracts(manifest) {
  return manifest.agents.map((agent) => ({
    agentId: agent.agentId,
    blueprintDigest: agent.blueprintDigest,
    contractPath: agent.contractFile,
    rawHandoffPath: RELEASE_CORRECTION_HANDOFF_ROOT + "/" + agent.agentId + ".json",
    mediaType: "application/json",
    requiredOutcome: "pass",
  }));
}

function buildReleaseCorrectionFinalizationContract(manifest) {
  return {
    command: "node scripts/run-v12-dogfood.mjs --check-evidence",
    prerequisite: "Every exact approval-bound correction handoff must exist before finalization.",
    approvedPackage: { ...RELEASE_CORRECTION_EXPECTATION },
    rawContentContract: "strict UTF-8 JSON with LF only and no BOM, TAB, CR, or unsafe controls",
    handoffs: releaseCorrectionHandoffContracts(manifest),
  };
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
    /[\u0000-\u0009\u000b-\u001f\u007f-\u009f]/u.test(content),
    false,
    label + ": unsafe control character",
  );
  return content;
}

async function loadReleaseCorrectionPackage(supportCalls) {
  const packageRootUrl = repositoryUrl(RELEASE_CORRECTION_PACKAGE_ROOT + "/");
  const compilationBytes = new Uint8Array(
    await readFile(new URL("compilation.json", packageRootUrl)),
  );
  const compilationContent = assertNormalizedLfUtf8(
    "release-correction compilation",
    compilationBytes,
  );
  const compilation = JSON.parse(compilationContent);

  supportCalls.renderPackage += 1;
  const renderedPackage = expectOk(
    "render release-correction package",
    renderSpecialistPackage(compilation),
  );
  assert.equal(
    renderedPackage.compilationDigest,
    RELEASE_CORRECTION_EXPECTATION.compilationDigest,
  );
  assert.equal(renderedPackage.packageDigest, RELEASE_CORRECTION_EXPECTATION.packageDigest);

  supportCalls.verifyPackage += 1;
  const specialistPackage = expectOk(
    "verify release-correction package against owner approval",
    verifySpecialistPackage(renderedPackage, RELEASE_CORRECTION_EXPECTATION),
  );

  const diskPaths = await listRelativeFiles(packageRootUrl);
  assert.deepEqual(
    diskPaths,
    specialistPackage.files.map((file) => file.path),
    "release-correction package file set mismatch",
  );
  const fileBindings = [];
  for (const file of specialistPackage.files) {
    const rawBytes = new Uint8Array(await readFile(new URL(file.path, packageRootUrl)));
    assert.equal(rawBytes.byteLength, file.bytes, file.path + ": byte count mismatch");
    assert.equal(rawDigest(rawBytes), file.digest, file.path + ": raw digest mismatch");
    assert.equal(
      assertNormalizedLfUtf8(file.path, rawBytes),
      file.content,
      file.path + ": rendered content mismatch",
    );
    fileBindings.push({
      path: file.path,
      mediaType: file.mediaType,
      bytes: file.bytes,
      digest: file.digest,
    });
  }

  assert.equal(specialistPackage.manifest.agents.length, compilation.blueprints.length);
  for (const manifestAgent of specialistPackage.manifest.agents) {
    const blueprint = compilation.blueprints.find(
      (candidate) => candidate.id === manifestAgent.agentId,
    );
    assert.notEqual(blueprint, undefined, "manifest agent is absent from compilation");
    assert.equal(manifestAgent.blueprintDigest, blueprint.contentDigest);
  }

  return { compilation, specialistPackage, fileBindings };
}

class ExactCorrectionHandoffsPendingError extends Error {
  constructor(finalizationContract, missingPaths) {
    super("WAITING_FOR_EXACT_CORRECTION_HANDOFFS: " + missingPaths.join(", "));
    this.name = "ExactCorrectionHandoffsPendingError";
    this.code = "WAITING_FOR_EXACT_CORRECTION_HANDOFFS";
    this.finalizationContract = finalizationContract;
    this.missingPaths = Object.freeze([...missingPaths]);
  }
}

async function loadReleaseCorrectionHandoffs(specialistPackage, supportCalls) {
  const finalizationContract = buildReleaseCorrectionFinalizationContract(
    specialistPackage.manifest,
  );
  const delivered = new Map();
  const missingPaths = [];
  for (const binding of finalizationContract.handoffs) {
    try {
      delivered.set(
        binding.rawHandoffPath,
        new Uint8Array(await readFile(repositoryUrl(binding.rawHandoffPath))),
      );
    } catch (error) {
      if (error !== null && typeof error === "object" && error.code === "ENOENT") {
        missingPaths.push(binding.rawHandoffPath);
        continue;
      }
      throw error;
    }
  }
  if (missingPaths.length > 0) {
    throw new ExactCorrectionHandoffsPendingError(finalizationContract, missingPaths);
  }

  const handoffs = [];
  for (const binding of finalizationContract.handoffs) {
    const rawBytes = delivered.get(binding.rawHandoffPath);
    assert.notEqual(rawBytes, undefined, binding.rawHandoffPath + ": missing delivered bytes");
    assertNormalizedLfUtf8(binding.rawHandoffPath, rawBytes);
    supportCalls.verifyHandoff += 1;
    const verified = expectOk(
      "verify exact correction handoff " + binding.agentId,
      verifySpecialistHandoff(
        specialistPackage,
        RELEASE_CORRECTION_EXPECTATION,
        rawBytes,
      ),
    );
    assert.equal(verified.handoff.agent.id, binding.agentId);
    assert.equal(verified.handoff.agent.blueprintDigest, binding.blueprintDigest);
    assert.equal(verified.handoff.outcome, binding.requiredOutcome);
    assert.equal(verified.rawBytes, rawBytes.byteLength);
    assert.equal(verified.rawDigest, rawDigest(rawBytes));
    handoffs.push({
      ...binding,
      rawBytes: new Uint8Array(rawBytes),
      bytes: verified.rawBytes,
      rawDigest: verified.rawDigest,
      semanticDigest: verified.semanticDigest,
    });
  }
  return { finalizationContract, handoffs };
}

function manifestResolvedContracts(inspection, manifest) {
  const eligibleByAgent = new Map(
    inspection.dependencyEligibleContracts.map((contract) => [contract.agentId, contract]),
  );
  assert.equal(
    eligibleByAgent.size,
    manifest.agents.length,
    "every release-correction contract must be dependency-eligible",
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
  const supportCalls = { renderPackage: 0, verifyPackage: 0, verifyHandoff: 0 };
  const call = (operation, fn, ...args) => {
    coreCalls[operation] += 1;
    return fn(...args);
  };
  const loaded = await loadReleaseCorrectionPackage(supportCalls);
  const { compilation, specialistPackage, fileBindings } = loaded;
  assert.deepEqual(compilation.goal.unresolvedDecisions, []);

  const handoffInput = await loadReleaseCorrectionHandoffs(
    specialistPackage,
    supportCalls,
  );
  const handoffByAgent = new Map(
    handoffInput.handoffs.map((handoff) => [handoff.agentId, handoff]),
  );

  let session = expectOk(
    "create release-correction run session",
    call(
      "create",
      createSpecialistRunSession,
      specialistPackage,
      RELEASE_CORRECTION_EXPECTATION,
    ),
  );
  let inspection = expectOk(
    "inspect release-correction initial session",
    call(
      "inspect",
      inspectSpecialistRunSession,
      session,
      RELEASE_CORRECTION_EXPECTATION,
    ),
  );
  const contracts = manifestResolvedContracts(inspection, specialistPackage.manifest);
  const remainingAgentIds = new Set(contracts.map((contract) => contract.agentId));
  const recordOrder = [];

  while (remainingAgentIds.size > 0) {
    const eligibleAgentIds = inspection.dependencyEligibleContracts
      .map((contract) => contract.agentId)
      .filter((agentId) => remainingAgentIds.has(agentId))
      .sort(compareText);
    assert.ok(
      eligibleAgentIds.length > 0,
      "release-correction handoffs are blocked by an unresolved dependency",
    );
    for (const agentId of eligibleAgentIds) {
      const handoff = handoffByAgent.get(agentId);
      assert.notEqual(handoff, undefined, "eligible agent is missing its exact raw handoff");
      session = expectOk(
        "record release-correction handoff " + agentId,
        call(
          "record",
          recordSpecialistRunHandoff,
          session,
          RELEASE_CORRECTION_EXPECTATION,
          handoff.rawBytes,
        ),
      );
      remainingAgentIds.delete(agentId);
      recordOrder.push(agentId);
      inspection = expectOk(
        "inspect release-correction session after " + agentId,
        call(
          "inspect",
          inspectSpecialistRunSession,
          session,
          RELEASE_CORRECTION_EXPECTATION,
        ),
      );
    }
  }

  assert.equal(inspection.stage, "integration_ready");
  assert.equal(inspection.specialistOutcome, "pass");
  assert.equal(inspection.integrationReady, true);
  assert.equal(inspection.routes.length, 0);
  assert.deepEqual(
    inspection.acceptedEvidence.map((entry) => entry.agentId),
    contracts.map((contract) => contract.agentId).sort(compareText),
  );

  const { snapshot, restoredBytes } = createImmutableIntegrationSnapshot(session);
  const restoredSession = expectOk(
    "restore release-correction integration snapshot",
    call(
      "restore",
      restoreSpecialistRunSession,
      restoredBytes,
      RELEASE_CORRECTION_EXPECTATION,
    ),
  );
  const restoredInspection = expectOk(
    "reinspect restored release-correction session",
    call(
      "inspect",
      inspectSpecialistRunSession,
      restoredSession,
      RELEASE_CORRECTION_EXPECTATION,
    ),
  );
  const resumeEquality = {
    sessionDigestEqual: restoredSession.contentDigest === session.contentDigest,
    canonicalSessionEqual: JSON.stringify(restoredSession) === JSON.stringify(session),
    inspectionDigestEqual: restoredInspection.contentDigest === inspection.contentDigest,
    canonicalInspectionEqual:
      JSON.stringify(restoredInspection) === JSON.stringify(inspection),
  };
  assert.deepEqual(resumeEquality, {
    sessionDigestEqual: true,
    canonicalSessionEqual: true,
    inspectionDigestEqual: true,
    canonicalInspectionEqual: true,
  });

  const closeout = integrationOwnerCloseout(restoredInspection);
  const totalCoreCalls = Object.values(coreCalls).reduce((sum, count) => sum + count, 0);
  const packageFileBytes = fileBindings.reduce((sum, file) => sum + file.bytes, 0);
  const rawHandoffBytes = handoffInput.handoffs.reduce(
    (sum, handoff) => sum + handoff.bytes,
    0,
  );

  return {
    journey: "v12-release-correction-implementation-package",
    status: "pass",
    packageApproval: {
      actor: "external_owner",
      expectationSource: "owner_pinned_release_correction_pair",
      ...RELEASE_CORRECTION_EXPECTATION,
      verified: true,
    },
    packageAuthentication: {
      files: fileBindings,
      fileCount: fileBindings.length,
      rawFileBytes: packageFileBytes,
    },
    manifestResolvedContracts: contracts,
    exactRawHandoffs: handoffInput.handoffs.map((handoff) => ({
      agentId: handoff.agentId,
      blueprintDigest: handoff.blueprintDigest,
      path: handoff.rawHandoffPath,
      mediaType: handoff.mediaType,
      outcome: handoff.requiredOutcome,
      bytes: handoff.bytes,
      rawDigest: handoff.rawDigest,
      semanticDigest: handoff.semanticDigest,
    })),
    recordOrder,
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
    friction: {
      blockingQuestions: {
        count: 0,
        unresolvedDecisions: compilation.goal.unresolvedDecisions.length,
      },
      approvalPrompts: {
        count: 0,
        approvedDigestPairsConsumed: 1,
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
        packageFileBytesAuthenticated: packageFileBytes,
        rawHandoffBytesAuthenticated: rawHandoffBytes,
        resumeSessionBytesReverified: snapshot.bytes,
        resumeAcceptedHandoffBytesReinspected: rawHandoffBytes,
      },
      resumeEquality,
      persistenceSteps: {
        count: 3,
        steps: [
          "serialize caller-owned session bytes",
          "preserve immutable base64 snapshot with exact byte and digest binding",
          "restore and reinspect from the preserved snapshot",
        ],
      },
      adapterOnlyTranslation: {
        count: 0,
        providerOrModelFieldsAdded: 0,
        hostRuntimeStateFieldsAdded: 0,
      },
    },
    finalizationContract: {
      status: "completed",
      ...handoffInput.finalizationContract,
    },
    hostBoundary: {
      coreEffects: "none",
      fixtureHostPerformed: [
        "read and authenticate the approval-bound package files",
        "read and preserve exact raw correction handoffs",
        "serialize, preserve, restore, and reinspect the immutable integration snapshot",
      ],
      stillExternal: [
        "approval freshness and actor authentication",
        "runtime supply and agent launch",
        "permission enforcement and workspace isolation",
        "durable persistence and update serialization",
        "repository integration, canonical verification, independent review, merge, and memory",
      ],
    },
  };
}
const args = process.argv.slice(2);
assert.ok(
  args.length === 0 ||
    (args.length === 1 &&
      (args[0] === "--check-evidence" || args[0] === "--synthetic-only")),
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
let waitingForHandoffs = false;
if (args[0] === "--check-evidence") {
  try {
    implementationPackageDogfood = await runReleaseCorrectionJourney();
  } catch (error) {
    if (!(error instanceof ExactCorrectionHandoffsPendingError)) {
      throw error;
    }
    waitingForHandoffs = true;
    implementationPackageDogfood = {
      journey: "v12-release-correction-implementation-package",
      status: "waiting_for_exact_raw_handoffs",
      missingPaths: error.missingPaths,
      finalizationContract: error.finalizationContract,
    };
  }
} else {
  const supportCalls = { renderPackage: 0, verifyPackage: 0, verifyHandoff: 0 };
  const loaded = await loadReleaseCorrectionPackage(supportCalls);
  implementationPackageDogfood = {
    journey: "v12-release-correction-implementation-package",
    status: "not_run_synthetic_only",
    packageApproval: {
      ...RELEASE_CORRECTION_EXPECTATION,
      verified: true,
    },
    packageAuthentication: {
      files: loaded.fileBindings,
      fileCount: loaded.fileBindings.length,
    },
    supportingPublicCalls: supportCalls,
    finalizationContract: buildReleaseCorrectionFinalizationContract(
      loaded.specialistPackage.manifest,
    ),
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
if (waitingForHandoffs) {
  process.exitCode = 2;
}