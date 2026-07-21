import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { Ajv2020 } from "ajv/dist/2020.js";
import {
  assessSpecialistHandoffs,
  compileAgentBlueprints,
  createSpecialistRunSession,
  inspectSpecialistRunSession,
  recordSpecialistRunHandoff,
  renderSpecialistPackage,
  restoreSpecialistRunSession,
  SPECIALIST_RUN_API_VERSION,
  SPECIALIST_RUN_KINDS,
  SPECIALIST_RUN_LIMITS,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "swecircuit";

const schemaUrl = import.meta.resolve("swecircuit/schemas/specialist-run.schema.json");
const schema = JSON.parse(readFileSync(new URL(schemaUrl), "utf8"));
const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
  validateFormats: false,
});
const validate = ajv.compile(schema);
const digest = (character = "0") => `sha256:${character.repeat(64)}`;

function renderedFile(path, mediaType, content = "x") {
  return {
    path,
    mediaType,
    bytes: Buffer.byteLength(content),
    digest: digest("2"),
    content,
  };
}

function minimalPackage() {
  const manifest = {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistPackageManifest",
    goalId: "goal.schema",
    goalRevision: 1,
    fileDigestAlgorithm: "sha256",
    fileDigestScope: "raw-file-bytes",
    compilationDigest: digest("1"),
    selectedCandidateId: "candidate.schema",
    launchWaves: [{ start: 0, agentIds: ["agent.schema"] }],
    compilationFile: "compilation.json",
    compilationFileDigest: digest("2"),
    compilationFileBytes: 2,
    agents: [
      {
        agentId: "agent.schema",
        blueprintDigest: digest("3"),
        contractFile: "agents/agent.schema.md",
        contractDigest: digest("2"),
        contractBytes: 1,
      },
    ],
    integrationFile: "integration.md",
    integrationDigest: digest("2"),
    integrationBytes: 1,
    contentDigest: digest("4"),
  };
  return {
    compilationDigest: digest("1"),
    packageDigest: digest("5"),
    manifest,
    files: [
      renderedFile("agents/agent.schema.md", "text/markdown"),
      renderedFile("compilation.json", "application/json", "{}"),
      renderedFile("integration.md", "text/markdown"),
      renderedFile("manifest.json", "application/json", "{}"),
    ],
  };
}

function acceptedHandoff(index = 0, outcome = "pass") {
  return {
    agentId: `agent.${index}`,
    blueprintDigest: digest("3"),
    outcome,
    rawEncoding: "base64",
    rawBytes: 2,
    rawDigest: digest("6"),
    rawBase64: "e30=",
  };
}

function minimalSession() {
  return {
    apiVersion: "swecircuit/specialist-run/v1alpha1",
    kind: "SpecialistRunSession",
    goal: {
      id: "goal.schema",
      revision: 1,
      digest: digest("7"),
      integrationOwner: "codex.main",
    },
    compilationDigest: digest("1"),
    packageDigest: digest("5"),
    selectedCandidateId: "candidate.schema",
    package: minimalPackage(),
    acceptedHandoffs: [],
    contentDigest: digest("8"),
  };
}

function minimalInspection() {
  return {
    apiVersion: "swecircuit/specialist-run/v1alpha1",
    kind: "SpecialistRunInspection",
    goal: {
      id: "goal.schema",
      revision: 1,
      digest: digest("7"),
      integrationOwner: "codex.main",
    },
    compilationDigest: digest("1"),
    packageDigest: digest("5"),
    selectedCandidateId: "candidate.schema",
    sessionDigest: digest("8"),
    stage: "collecting",
    agents: [
      {
        agentId: "agent.schema",
        blueprintDigest: digest("3"),
        dependencies: [],
        status: "dependency_eligible",
        outcome: null,
        waitingForAgentIds: [],
        blockingRoutes: [],
      },
    ],
    dependencyEligibleContracts: [
      {
        agentId: "agent.schema",
        blueprintDigest: digest("3"),
        path: "agents/agent.schema.md",
        mediaType: "text/markdown",
        bytes: 1,
        digest: digest("2"),
        content: "x",
      },
    ],
    acceptedEvidence: [],
    routes: [],
    specialistOutcome: null,
    integrationReady: false,
    nextAction: {
      kind: "external_host.evaluate_dependency_eligible_contracts",
      actor: "external_host",
      agentIds: ["agent.schema"],
    },
    contentDigest: digest("9"),
  };
}

function assertSchemaAccepts(value, message) {
  assert.equal(validate(value), true, `${message}: ${JSON.stringify(validate.errors)}`);
}

function assertSchemaRejects(value, keyword, message) {
  assert.equal(validate(value), false, message);
  assert.ok(
    (validate.errors ?? []).some((error) => error.keyword === keyword),
    `${message}: ${JSON.stringify(validate.errors)}`,
  );
}

test("public run constants, operations, schema export, and V11 compatibility are exact", () => {
  assert.equal(SPECIALIST_RUN_API_VERSION, "swecircuit/specialist-run/v1alpha1");
  assert.deepEqual([...SPECIALIST_RUN_KINDS], ["SpecialistRunSession", "SpecialistRunInspection"]);
  assert.deepEqual(SPECIALIST_RUN_LIMITS, {
    rawSessionInputBytes: 67_108_864,
    canonicalSessionBytes: 134_217_728,
    acceptedHandoffs: 16,
    rawHandoffBytes: 1_048_576,
    rawHandoffBase64Chars: 1_398_104,
    canonicalInspectionBytes: 67_108_864,
  });
  assert.equal(Object.isFrozen(SPECIALIST_RUN_KINDS), true);
  assert.equal(Object.isFrozen(SPECIALIST_RUN_LIMITS), true);

  for (const [name, operation] of [
    ["createSpecialistRunSession", createSpecialistRunSession],
    ["restoreSpecialistRunSession", restoreSpecialistRunSession],
    ["inspectSpecialistRunSession", inspectSpecialistRunSession],
    ["recordSpecialistRunHandoff", recordSpecialistRunHandoff],
    ["compileAgentBlueprints", compileAgentBlueprints],
    ["renderSpecialistPackage", renderSpecialistPackage],
    ["verifySpecialistPackage", verifySpecialistPackage],
    ["verifySpecialistHandoff", verifySpecialistHandoff],
    ["assessSpecialistHandoffs", assessSpecialistHandoffs],
  ]) {
    assert.equal(typeof operation, "function", `${name} is not publicly exported`);
  }

  assert.equal(
    fileURLToPath(schemaUrl)
      .replaceAll("\\", "/")
      .endsWith("/schemas/v1alpha1/specialist-run.schema.json"),
    true,
  );
  assert.equal(
    schema.$id,
    "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-run.schema.json",
  );

  const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(
    packageJson.exports["./schemas/specialist-run.schema.json"],
    "./schemas/v1alpha1/specialist-run.schema.json",
  );

  const indexSource = readFileSync(new URL("../src/index.ts", import.meta.url), "utf8");
  const declarationNames = [
    "SpecialistRunAcceptedEvidence",
    "SpecialistRunAcceptedHandoff",
    "SpecialistRunAgentStatus",
    "SpecialistRunAgentStatusKind",
    "SpecialistRunApiVersion",
    "SpecialistRunEligibleContract",
    "SpecialistRunEvidenceBinding",
    "SpecialistRunGoalBinding",
    "SpecialistRunInspection",
    "SpecialistRunNextAction",
    "SpecialistRunRoute",
    "SpecialistRunSession",
    "SpecialistRunStage",
  ];
  for (const name of declarationNames) {
    assert.match(indexSource, new RegExp(`\\b${name}\\b`), `${name} is missing from index.ts`);
  }

  const packedChecker = readFileSync(
    new URL("../scripts/check-packed-consumer.mjs", import.meta.url),
    "utf8",
  );
  const packedHost = readFileSync(
    new URL("../scripts/fixtures/packed-consumer-host.ts", import.meta.url),
    "utf8",
  );
  for (const name of [
    "createSpecialistRunSession",
    "restoreSpecialistRunSession",
    "inspectSpecialistRunSession",
    "recordSpecialistRunHandoff",
    ...declarationNames,
  ]) {
    assert.equal(
      packedChecker.includes(name) || packedHost.includes(name),
      true,
      `${name} is absent from packed-consumer coverage`,
    );
  }
});

test("the strict schema accepts both canonical roots and closes every nested object", () => {
  const session = minimalSession();
  const inspection = minimalInspection();
  assertSchemaAccepts(session, "minimal session");
  assertSchemaAccepts(inspection, "minimal inspection");

  const mutations = [
    (value) => {
      value.provider = "external";
    },
    (value) => {
      value.goal.model = "model-id";
    },
    (value) => {
      value.package.executor = "host";
    },
    (value) => {
      value.package.manifest.callback = "callback";
    },
    (value) => {
      value.package.files[0].timestamp = "now";
    },
    (value) => {
      value.acceptedHandoffs = [acceptedHandoff()];
      value.acceptedHandoffs[0].credential = "secret";
    },
  ];
  for (const [index, mutate] of mutations.entries()) {
    const candidate = structuredClone(session);
    mutate(candidate);
    assertSchemaRejects(candidate, "additionalProperties", `closed session mutation ${index}`);
  }

  const inspectionMutations = [
    (value) => {
      value.scheduler = "core";
    },
    (value) => {
      value.agents[0].running = true;
    },
    (value) => {
      value.dependencyEligibleContracts[0].workspace = "host";
    },
    (value) => {
      value.nextAction.retry = true;
    },
  ];
  for (const [index, mutate] of inspectionMutations.entries()) {
    const candidate = structuredClone(inspection);
    mutate(candidate);
    assertSchemaRejects(candidate, "additionalProperties", `closed inspection mutation ${index}`);
  }

  assert.deepEqual(Object.keys(schema.$defs.session.properties), [
    "apiVersion",
    "kind",
    "goal",
    "compilationDigest",
    "packageDigest",
    "selectedCandidateId",
    "package",
    "acceptedHandoffs",
    "contentDigest",
  ]);
  assert.deepEqual(Object.keys(schema.$defs.acceptedHandoff.properties), [
    "agentId",
    "blueprintDigest",
    "outcome",
    "rawEncoding",
    "rawBytes",
    "rawDigest",
    "rawBase64",
  ]);
});

test("schema boundaries and every workflow route remain exact", () => {
  const session = minimalSession();
  session.acceptedHandoffs = Array.from({ length: 16 }, (_, index) => acceptedHandoff(index));
  assertSchemaAccepts(session, "16 accepted handoffs");

  const tooManyHandoffs = structuredClone(session);
  tooManyHandoffs.acceptedHandoffs.push(acceptedHandoff(16));
  assertSchemaRejects(tooManyHandoffs, "maxItems", "17 accepted handoffs");

  const maximumRaw = structuredClone(session);
  maximumRaw.acceptedHandoffs[0].rawBytes = 1_048_576;
  maximumRaw.acceptedHandoffs[0].rawBase64 = `${"A".repeat(1_398_102)}==`;
  assert.equal(maximumRaw.acceptedHandoffs[0].rawBase64.length, 1_398_104);
  assertSchemaAccepts(maximumRaw, "maximum raw handoff and base64 expansion");

  const rawOver = structuredClone(maximumRaw);
  rawOver.acceptedHandoffs[0].rawBytes = 1_048_577;
  assertSchemaRejects(rawOver, "maximum", "raw handoff one byte over");

  const base64Over = structuredClone(maximumRaw);
  base64Over.acceptedHandoffs[0].rawBase64 += "AAAA";
  assertSchemaRejects(base64Over, "maxLength", "base64 one quantum over");

  const inspection = minimalInspection();
  inspection.agents = Array.from({ length: 16 }, (_, index) => ({
    ...structuredClone(inspection.agents[0]),
    agentId: `agent.${index}`,
  }));
  assertSchemaAccepts(inspection, "16 inspection agent rows");
  const tooManyAgents = structuredClone(inspection);
  tooManyAgents.agents.push({
    ...structuredClone(inspection.agents[0]),
    agentId: "agent.16",
  });
  assertSchemaRejects(tooManyAgents, "maxItems", "17 inspection agent rows");

  for (const outcome of [
    "pass",
    "fix",
    "diagnose",
    "clarify",
    "redesign",
    "split",
    "block",
    "learn",
  ]) {
    const candidate = minimalSession();
    candidate.acceptedHandoffs = [acceptedHandoff(0, outcome)];
    assertSchemaAccepts(candidate, `${outcome} accepted handoff`);
  }

  for (const outcome of ["fix", "diagnose", "clarify", "redesign", "split", "block", "learn"]) {
    const routed = minimalInspection();
    routed.stage = "routed";
    routed.routes = [{ agentId: "agent.schema", outcome }];
    routed.specialistOutcome = outcome;
    routed.dependencyEligibleContracts = [];
    routed.nextAction = {
      kind: "integration_owner.route_specialist_outcome",
      actor: "integration_owner",
      integrationOwner: "codex.main",
      routes: [{ agentId: "agent.schema", outcome }],
    };
    assertSchemaAccepts(routed, `${outcome} route`);
  }

  const passRoute = minimalInspection();
  passRoute.routes = [{ agentId: "agent.schema", outcome: "pass" }];
  assertSchemaRejects(passRoute, "enum", "pass cannot be a route");
});
