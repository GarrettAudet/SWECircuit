import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export function projectArtifact(artifacts = [], defaultCircuit) {
  const spec = { artifacts };
  if (defaultCircuit !== undefined) {
    spec.defaultCircuit = defaultCircuit;
  }
  return {
    apiVersion: "swecircuit/v1alpha1",
    kind: "Project",
    metadata: { id: "fixture-project" },
    spec,
  };
}

export function moduleArtifact({
  id,
  input,
  output,
  outcomes = ["pass", "fix"],
  permissions = [],
}) {
  return {
    apiVersion: "swecircuit/v1alpha1",
    kind: "Module",
    metadata: { id, version: "0.1.0" },
    spec: {
      input,
      action: { type: "transform", description: `Execute the ${id} fixture action.` },
      output,
      gate: {
        condition: "The fixture action produced its required output.",
        evidence: ["fixture_evidence"],
        failureOutcomes: outcomes.filter((outcome) => outcome !== "pass"),
      },
      outcomes,
      evidence: [
        {
          id: "fixture_evidence",
          kind: "test",
          description: "Fixture verification evidence exists.",
          required: true,
        },
      ],
      requiredPermissions: permissions,
      compatibility: { apiVersions: ["swecircuit/v1alpha1"] },
      stopConditions: ["The bounded fixture action cannot complete."],
    },
  };
}

export function workPacketArtifact({ id, owner, permissionCeiling }) {
  return {
    apiVersion: "swecircuit/v1alpha1",
    kind: "WorkPacket",
    metadata: { id },
    spec: {
      goal: `Complete the ${id} implementation slice.`,
      completionEvidence: [
        {
          id: `${id}_tests`,
          kind: "test",
          description: "The scoped tests pass.",
          required: true,
        },
      ],
      nonGoals: ["Merge the integration branch."],
      source: {
        featurePackage: "docs/specs/v9-devrail-kernel",
        branch: "codex/v9-devrail-kernel",
        baselineCommit: "9932371",
      },
      scope: {
        include: [`src/${id}/**`],
        exclude: [],
        conflictZones: ["src/shared/contracts.ts"],
      },
      role: { capability: `${id} implementation`, owner },
      dependencies: [],
      context: [
        {
          id: "feature_spec",
          kind: "artifact",
          ref: "path:docs/specs/v9-devrail-kernel/spec.md",
        },
      ],
      authority: {
        allowedActions: ["Edit scoped files."],
        disallowedActions: ["Merge branches."],
        permissionCeiling,
      },
      verification: [
        {
          id: `${id}_tests`,
          kind: "test",
          description: "The scoped tests pass.",
          required: true,
        },
      ],
      handoff: {
        destination: "integration-owner",
        requiredFields: ["summary", "filesChanged", "verificationEvidence", "risks"],
      },
      stopConditions: ["The work must leave its declared scope."],
    },
  };
}

function port(name, artifactType) {
  return { name, artifactType, required: true };
}

export function parallelProjectBundle() {
  const frontendPermissions = [
    { kind: "filesystem.read", scopes: ["src/frontend/**"] },
    { kind: "filesystem.write", scopes: ["src/frontend/**"] },
  ];
  const backendPermissions = [
    { kind: "filesystem.read", scopes: ["src/backend/**"] },
    { kind: "filesystem.write", scopes: ["src/backend/**"] },
  ];
  const artifacts = {
    "swecircuit/modules/plan.json": moduleArtifact({
      id: "plan",
      input: [port("goal", "Goal")],
      output: [port("frontend_packet", "WorkPacket"), port("backend_packet", "WorkPacket")],
      outcomes: ["pass", "split", "fix"],
    }),
    "swecircuit/modules/implement-frontend.json": moduleArtifact({
      id: "implement-frontend",
      input: [port("work_packet", "WorkPacket")],
      output: [port("change", "Change")],
      permissions: frontendPermissions,
    }),
    "swecircuit/modules/implement-backend.json": moduleArtifact({
      id: "implement-backend",
      input: [port("work_packet", "WorkPacket")],
      output: [port("change", "Change")],
      permissions: backendPermissions,
    }),
    "swecircuit/modules/integrate.json": moduleArtifact({
      id: "integrate",
      input: [port("frontend_change", "Change"), port("backend_change", "Change")],
      output: [port("integrated_change", "Change")],
    }),
    "swecircuit/modules/memory.json": moduleArtifact({
      id: "memory",
      input: [port("artifact", "Change")],
      output: [port("memory_entry", "MemoryEntry")],
    }),
    "swecircuit/work-packets/frontend.json": workPacketArtifact({
      id: "frontend",
      owner: "frontend-agent",
      permissionCeiling: frontendPermissions,
    }),
    "swecircuit/work-packets/backend.json": workPacketArtifact({
      id: "backend",
      owner: "backend-agent",
      permissionCeiling: backendPermissions,
    }),
    "swecircuit/circuits/parallel-feature.json": {
      apiVersion: "swecircuit/v1alpha1",
      kind: "Circuit",
      metadata: { id: "parallel-feature", version: "0.1.0" },
      spec: {
        entry: "route",
        nodes: [
          { id: "route", module: "plan" },
          {
            id: "frontend",
            module: "implement-frontend",
            owner: "frontend-agent",
            workPacket: "frontend",
          },
          {
            id: "backend",
            module: "implement-backend",
            owner: "backend-agent",
            workPacket: "backend",
          },
          { id: "integrate", module: "integrate" },
          { id: "memory", module: "memory" },
        ],
        routes: [
          {
            from: "route",
            outcome: "split",
            to: "frontend",
            transfers: [{ output: "frontend_packet", input: "work_packet" }],
          },
          {
            from: "route",
            outcome: "split",
            to: "backend",
            transfers: [{ output: "backend_packet", input: "work_packet" }],
          },
          {
            from: "frontend",
            outcome: "pass",
            to: "integrate",
            transfers: [{ output: "change", input: "frontend_change" }],
          },
          {
            from: "backend",
            outcome: "pass",
            to: "integrate",
            transfers: [{ output: "change", input: "backend_change" }],
          },
          {
            from: "integrate",
            outcome: "pass",
            to: "memory",
            transfers: [{ output: "integrated_change", input: "artifact" }],
          },
        ],
        exits: ["memory"],
        joins: [
          {
            node: "integrate",
            sources: ["frontend", "backend"],
            strategy: "all",
            owner: "integration-owner",
          },
        ],
        fanOuts: [
          {
            from: "route",
            outcome: "split",
            branches: ["frontend", "backend"],
            join: "integrate",
            integrationOwner: "integration-owner",
          },
        ],
        stopConditions: ["A bounded branch cannot complete."],
        verification: [
          {
            id: "integrated_tests",
            kind: "test",
            description: "The integrated fixture passes.",
            required: true,
          },
        ],
        compatibility: { apiVersions: ["swecircuit/v1alpha1"] },
      },
    },
  };
  return {
    project: projectArtifact(Object.keys(artifacts), "parallel-feature"),
    artifacts,
  };
}

export function writeJson(root, relativePath, value) {
  const target = join(root, ...relativePath.split("/"));
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function writeBundle(root, bundle) {
  writeJson(root, "swecircuit.json", bundle.project);
  for (const [relativePath, artifact] of Object.entries(bundle.artifacts)) {
    writeJson(root, relativePath, artifact);
  }
}
