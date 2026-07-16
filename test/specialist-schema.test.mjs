import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { Ajv2020 } from "ajv/dist/2020.js";

const COMMON_SCHEMA_ID =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/common.schema.json";
const SPECIALIST_SCHEMA_ID =
  "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-compiler.schema.json";
const DIGEST = `sha256:${"0".repeat(64)}`;

async function readJson(url) {
  return JSON.parse(await readFile(url, "utf8"));
}

async function createRegistry() {
  const root = new URL("../schemas/v1alpha1/", import.meta.url);
  const common = await readJson(new URL("common.schema.json", root));
  const specialist = await readJson(new URL("specialist-compiler.schema.json", root));
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    validateFormats: false,
  });
  ajv.addSchema(common);
  ajv.addSchema(specialist);
  return { ajv, common, specialist };
}

function createGoalContract() {
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "GoalContract",
    id: "consumer.goal",
    revision: 1,
    objective: "Compile one provider-neutral specialist contract.",
    integrationOwner: "integration.owner",
    assumptions: [
      {
        id: "assumption.reviewed-context",
        statement: "The declared context digest was reviewed.",
        rationale: "The integration owner approved the exact source declaration.",
      },
    ],
    unresolvedDecisions: [
      {
        id: "decision.future-format",
        question: "Should a future version add another package format?",
        owner: "integration.owner",
        blocking: false,
        proceedRationale: "The current format satisfies this goal.",
      },
    ],
    acceptanceCriteria: [
      {
        id: "criterion.package",
        description: "The specialist package is compiled and rendered.",
        evidenceRequirements: [
          {
            id: "evidence.package",
            kind: "artifact",
            duty: "produce",
            description: "A digest-bound specialist package.",
            independentFromProducer: false,
          },
        ],
      },
    ],
    contextSources: [
      {
        id: "context.source",
        kind: "repository",
        locator: "path:src/specialist-compiler.ts",
        digest: DIGEST,
        bytes: 1024,
        description: "The repository compiler source.",
        allowedWorkUnits: ["compile.package"],
        readScope: "src/**",
      },
      {
        id: "context.contract",
        kind: "documentation",
        locator: "path:docs/specs/v11-specialist-compiler/spec.md",
        digest: DIGEST,
        bytes: 512,
        description: "The reviewed specialist contract.",
        allowedWorkUnits: ["compile.package"],
      },
    ],
    authority: {
      allowedModules: ["module.compile"],
      allowedCapabilities: ["specialist.compile"],
      permissionCeiling: [{ kind: "filesystem.read", scopes: ["src/**"] }],
      forbiddenEffects: ["Do not invoke providers or runtime executors."],
      maxAgents: 1,
      maxConcurrency: 1,
    },
    optimization: {
      agentStartupCost: 1,
      handoffCost: 1,
    },
    workUnits: [
      {
        id: "compile.package",
        objective: "Compile and render the specialist package.",
        weight: 3,
        module: {
          id: "module.compile",
          action: "Compile exact task demand into one specialist contract.",
          inputPorts: [{ name: "goal", artifactType: "GoalContract" }],
          outputPorts: [{ name: "package", artifactType: "SpecialistPackage" }],
        },
        dependencies: [],
        requiredCapabilities: ["specialist.compile"],
        contextUses: [
          { sourceId: "context.source", purpose: "Inspect the compiler boundary." },
          { sourceId: "context.contract", purpose: "Follow the reviewed contract." },
        ],
        scope: {
          read: ["src/**"],
          write: [],
          conflictZones: [],
        },
        permissions: [{ kind: "filesystem.read", scopes: ["src/**"] }],
        evidenceRequirementIds: ["evidence.package"],
        handoffArtifacts: ["specialist.package"],
        stopConditions: ["Stop if the declared authority is insufficient."],
      },
    ],
  };
}

function createCompilationRequest() {
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: createGoalContract(),
    proposedCandidates: [
      {
        id: "candidate.serial",
        groups: [["compile.package"]],
      },
    ],
  };
}

function collectObjectPaths(value, path = [], result = []) {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      collectObjectPaths(entry, [...path, index], result);
    });
    return result;
  }
  if (value !== null && typeof value === "object") {
    result.push(path);
    for (const [key, entry] of Object.entries(value)) {
      collectObjectPaths(entry, [...path, key], result);
    }
  }
  return result;
}

function valueAtPath(value, path) {
  return path.reduce((current, segment) => current[segment], value);
}

function collectRefs(value, result = []) {
  if (Array.isArray(value)) {
    value.forEach((entry) => {
      collectRefs(entry, result);
    });
    return result;
  }
  if (value !== null && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      if (key === "$ref") {
        result.push(entry);
      } else {
        collectRefs(entry, result);
      }
    }
  }
  return result;
}

test("the specialist schema and every definition compile in strict Ajv 2020 mode", async () => {
  const { ajv, common, specialist } = await createRegistry();

  assert.equal(common.$id, COMMON_SCHEMA_ID);
  assert.equal(specialist.$id, SPECIALIST_SCHEMA_ID);
  assert.equal(typeof ajv.getSchema(SPECIALIST_SCHEMA_ID), "function");
  for (const definition of Object.keys(specialist.$defs)) {
    assert.doesNotThrow(
      () => ajv.compile({ $ref: `${SPECIALIST_SCHEMA_ID}#/$defs/${definition}` }),
      definition,
    );
  }
});

test("the specialist schema accepts its two canonical closed input kinds", async () => {
  const { ajv } = await createRegistry();
  const validateRoot = ajv.getSchema(SPECIALIST_SCHEMA_ID);
  const validateGoal = ajv.compile({ $ref: `${SPECIALIST_SCHEMA_ID}#/$defs/goalContract` });
  const validateRequest = ajv.compile({
    $ref: `${SPECIALIST_SCHEMA_ID}#/$defs/compilationRequest`,
  });
  const goal = createGoalContract();
  const request = createCompilationRequest();

  assert.equal(validateRoot(goal), true, JSON.stringify(validateRoot.errors, null, 2));
  assert.equal(validateRoot(request), true, JSON.stringify(validateRoot.errors, null, 2));
  assert.equal(validateGoal(goal), true, JSON.stringify(validateGoal.errors, null, 2));
  assert.equal(validateRequest(request), true, JSON.stringify(validateRequest.errors, null, 2));
});

test("every concrete specialist input object boundary rejects provider-shaped fields", async () => {
  const { ajv } = await createRegistry();
  const validate = ajv.compile({
    $ref: `${SPECIALIST_SCHEMA_ID}#/$defs/compilationRequest`,
  });
  const request = createCompilationRequest();

  for (const path of collectObjectPaths(request)) {
    const candidate = structuredClone(request);
    valueAtPath(candidate, path).provider = "not.allowed";
    assert.equal(validate(candidate), false, `provider was allowed at /${path.join("/")}`);
    assert.equal(
      validate.errors.some((error) => error.keyword === "additionalProperties"),
      true,
      `no closed-property diagnostic was reported at /${path.join("/")}`,
    );
  }
});

test("role and runtime supply cannot enter goal, request, work, or proposal contracts", async () => {
  const { ajv } = await createRegistry();
  const validate = ajv.compile({
    $ref: `${SPECIALIST_SCHEMA_ID}#/$defs/compilationRequest`,
  });
  const targets = [[], ["goal"], ["goal", "workUnits", 0], ["proposedCandidates", 0]];
  const forbiddenFields = [
    "role",
    "provider",
    "model",
    "prompt",
    "executor",
    "credential",
    "grant",
    "runtimeProfile",
  ];

  for (const path of targets) {
    for (const field of forbiddenFields) {
      const candidate = createCompilationRequest();
      valueAtPath(candidate, path)[field] = "not.allowed";
      assert.equal(validate(candidate), false, `${field} was allowed at /${path.join("/")}`);
    }
  }
});

test("repository context requires readScope and external context forbids it", async () => {
  const { ajv } = await createRegistry();
  const validate = ajv.compile({ $ref: `${SPECIALIST_SCHEMA_ID}#/$defs/goalContract` });

  const missingRepositoryScope = createGoalContract();
  delete missingRepositoryScope.contextSources[0].readScope;
  assert.equal(validate(missingRepositoryScope), false);

  const externalScope = createGoalContract();
  externalScope.contextSources[1].readScope = "docs/**";
  assert.equal(validate(externalScope), false);
});

test("permission kinds are the exact provider-neutral schema set", async () => {
  const { ajv, specialist } = await createRegistry();
  const expectedKinds = [
    "filesystem.read",
    "filesystem.write",
    "network.connect",
    "process.spawn",
    "secrets.read",
  ];
  assert.deepEqual(specialist.$defs.permission.properties.kind.enum, expectedKinds);

  const validate = ajv.compile({ $ref: `${SPECIALIST_SCHEMA_ID}#/$defs/goalContract` });
  const invalid = createGoalContract();
  invalid.authority.permissionCeiling[0].kind = "provider.invoke";
  assert.equal(validate(invalid), false);
  assert.equal(
    validate.errors.some((error) => error.instancePath.endsWith("/kind")),
    true,
  );
});
test("specialist references stay inside package-owned v1alpha1 schemas", async () => {
  const { specialist } = await createRegistry();
  const references = collectRefs(specialist);

  assert.equal(references.length > 0, true);
  for (const reference of references) {
    assert.equal(
      reference.startsWith("#/") || reference.startsWith(`${COMMON_SCHEMA_ID}#/$defs/`),
      true,
      `non-package schema reference: ${reference}`,
    );
  }
});
