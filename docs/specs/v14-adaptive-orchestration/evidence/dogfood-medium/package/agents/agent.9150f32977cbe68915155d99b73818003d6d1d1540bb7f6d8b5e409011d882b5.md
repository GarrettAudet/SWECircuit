# Specialist Contract: agent.9150f32977cbe68915155d99b73818003d6d1d1540bb7f6d8b5e409011d882b5

Compilation: `sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9`
Blueprint: `sha256:e26ba470db59115a43cac0bdf7dbdfed4130f857c48ae57339abbf26ae374622`

This is the exact provider-neutral task contract approved for this specialist. A host may translate it into runtime-specific instructions, but it must not widen authority, add work, omit evidence, or change the handoff.

## Operating Rules

1. Verify every delivered context item against its declared raw SHA-256 digest and byte count before using it.
2. Work only on the listed work units, Modules, scopes, capabilities, and permissions.
3. Respect agent dependencies and stop when a stop condition or undeclared decision is reached.
4. Produce every assigned evidence duty and every required handoff field.
5. Report assumptions, risks, failed attempts, and follow-up work; do not silently expand scope.

Manifest file digests use standard SHA-256 over the exact file bytes. Compilation, blueprint, manifest, and package identities are SWECircuit domain-separated digests and must be verified through the package verifier or another implementation of the published contract.

## Blueprint

```json
{
  "apiVersion": "swecircuit/specialist/v1alpha1",
  "kind": "AgentBlueprint",
  "id": "agent.9150f32977cbe68915155d99b73818003d6d1d1540bb7f6d8b5e409011d882b5",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 1,
  "goalDigest": "sha256:adf1218aaef8c78c4104719b2b6bd15473309e3586f8f360809255679501a35b",
  "candidateId": "team.ab364ab84deeff1ac9bc988bfeac517d1424b37a15be1aa865a7ad7a50bd9b03",
  "workUnitIds": [
    "implement.impact-graph"
  ],
  "objectives": [
    {
      "workUnitId": "implement.impact-graph",
      "objective": "Implement deterministic graph validation, immutable component transitions, transitive impact paths, and risk analysis."
    }
  ],
  "modules": [
    {
      "id": "implement.impact-graph",
      "action": "Implement the exact graph contract, cycle diagnostics, lexicographic shortest paths, risk formula, and exhaustive deterministic tests.",
      "inputPorts": [
        {
          "name": "contract",
          "artifactType": "ImpactPlannerContract"
        }
      ],
      "outputPorts": [
        {
          "name": "handoff",
          "artifactType": "impact-graph-handoff.md"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:AGENTS.md",
      "digest": "sha256:1cbe95ee56ea68da0e9a3dbddae0fc0120baf83c5594a91e8853d0c5bd5d569b",
      "bytes": 18686,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "implement.impact-graph"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.app-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
      "digest": "sha256:beed1bb15cce64e9bb1d585c20a6863b359d4fe1e886c1101f8a8c11251afe72",
      "bytes": 5191,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "implement.impact-graph"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md"
    },
    {
      "sourceId": "context.domain-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/src/model.js",
      "digest": "sha256:f46bfb3b973ec0e0bac324fbdf6d6ada07666c45be111d81a90d97dfa26b1196",
      "bytes": 4621,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "implement.impact-graph"
      ],
      "readScope": "examples/release-board/src/model.js"
    },
    {
      "sourceId": "context.domain-test-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/test/model.test.mjs",
      "digest": "sha256:541603f0aee9fd721b1b4bb69c55b661245bb3c744c42963dbd3f014d664b3f6",
      "bytes": 3529,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "implement.impact-graph"
      ],
      "readScope": "examples/release-board/test/model.test.mjs"
    },
    {
      "sourceId": "context.goal",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md",
      "digest": "sha256:b743d3a9730558f644e0469eb696c9ecda64cabbb9305c9dc9d58ee817f736f0",
      "bytes": 3209,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "implement.impact-graph"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "implement.impact-graph"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md",
        "examples/release-board/src/model.js",
        "examples/release-board/test/model.test.mjs"
      ],
      "write": [
        "examples/impact-planner/src/graph.js",
        "examples/impact-planner/test/graph.test.mjs"
      ],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "AGENTS.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md",
          "examples/release-board/src/model.js",
          "examples/release-board/test/model.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "examples/impact-planner/src/graph.js",
          "examples/impact-planner/test/graph.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "node"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access the network, secrets, external services, or undeclared repository paths.",
      "Do not install dependencies, mutate Git, merge, update milestones, or update durable memory.",
      "Do not widen a dependency, permission, runtime, skill, or evidence contract after approval."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.graph",
      "criterion": "Graph validation and impact analysis are immutable, deterministic, cycle-safe, and completely tested.",
      "requirementId": "evidence.graph.produce",
      "kind": "test",
      "duty": "produce",
      "description": "Produce the graph module and passing deterministic Node tests.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "impact-graph-handoff.md"
    ],
    "requiredFields": [
      "apiVersion",
      "kind",
      "outcome",
      "destination",
      "goal",
      "agent",
      "compilationDigest",
      "summary",
      "workUnitsCompleted",
      "artifacts",
      "evidence",
      "assumptions",
      "risks",
      "followUps"
    ]
  },
  "stopConditions": [
    "A dependent unit must not start until every required handoff verifies and assesses integration-ready.",
    "Do not install dependencies, access the network or secrets, mutate Git, merge, or update memory.",
    "Do not modify files outside the declared write scope.",
    "Return a non-pass outcome when required evidence cannot be produced.",
    "Stop if the closed product goal conflicts with the application contract."
  ],
  "contentDigest": "sha256:e26ba470db59115a43cac0bdf7dbdfed4130f857c48ae57339abbf26ae374622"
}
```

## Required Handoff Envelope

Return one strict UTF-8 JSON object with exactly the shape below. Replace the summary and artifact content, but do not add keys or substitute the blueprint evidence-duty shape.

- Artifact content is always a string, including for application/json.
- Evidence entries contain exactly criterionId, requirementId, kind, duty, status, and artifact.
- A pass must list every owned work unit, exact artifact name, and exact evidence duty. A non-pass outcome lists only work actually completed and preserves bounded failure evidence.
- If a stop condition explicitly requires a stricter custom envelope, the host must provide that closed schema; it must retain the standard goal, agent, compilation, artifact, evidence, and outcome bindings shown here.

```json
{
  "apiVersion": "swecircuit/specialist/v1alpha1",
  "kind": "SpecialistAgentHandoff",
  "outcome": "pass",
  "destination": "codex.main",
  "goal": {
    "id": "v14.dogfood.impact-planner",
    "revision": 1,
    "digest": "sha256:adf1218aaef8c78c4104719b2b6bd15473309e3586f8f360809255679501a35b"
  },
  "agent": {
    "id": "agent.9150f32977cbe68915155d99b73818003d6d1d1540bb7f6d8b5e409011d882b5",
    "blueprintDigest": "sha256:e26ba470db59115a43cac0bdf7dbdfed4130f857c48ae57339abbf26ae374622"
  },
  "compilationDigest": "sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "implement.impact-graph"
  ],
  "artifacts": [
    {
      "name": "impact-graph-handoff.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.graph",
      "requirementId": "evidence.graph.produce",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "impact-graph-handoff.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
