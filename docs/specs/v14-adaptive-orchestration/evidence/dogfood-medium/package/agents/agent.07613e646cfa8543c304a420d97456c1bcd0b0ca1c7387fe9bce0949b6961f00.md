# Specialist Contract: agent.07613e646cfa8543c304a420d97456c1bcd0b0ca1c7387fe9bce0949b6961f00

Compilation: `sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9`
Blueprint: `sha256:38a4b7a0a353554a919890565157d1e9df46c4dd9e3167e2738facfbd70e5974`

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
  "id": "agent.07613e646cfa8543c304a420d97456c1bcd0b0ca1c7387fe9bce0949b6961f00",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 1,
  "goalDigest": "sha256:adf1218aaef8c78c4104719b2b6bd15473309e3586f8f360809255679501a35b",
  "candidateId": "team.ab364ab84deeff1ac9bc988bfeac517d1424b37a15be1aa865a7ad7a50bd9b03",
  "workUnitIds": [
    "implement.impact-codec-storage"
  ],
  "objectives": [
    {
      "workUnitId": "implement.impact-codec-storage",
      "objective": "Implement safe versioned workspace import, deterministic export, persistence, and adversarial tests."
    }
  ],
  "modules": [
    {
      "id": "implement.impact-codec-storage",
      "action": "Implement exact structural validation, byte and count limits, unsafe-key rejection, deterministic JSON, fail-safe storage, and tests.",
      "inputPorts": [
        {
          "name": "contract",
          "artifactType": "ImpactPlannerContract"
        }
      ],
      "outputPorts": [
        {
          "name": "handoff",
          "artifactType": "impact-codec-handoff.md"
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
        "implement.impact-codec-storage"
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
        "implement.impact-codec-storage"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md"
    },
    {
      "sourceId": "context.codec-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/src/storage.js",
      "digest": "sha256:336387b9336e285f6c0c30dec135f8fcc2123551ad88658197a51b71c91123bc",
      "bytes": 879,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "implement.impact-codec-storage"
      ],
      "readScope": "examples/release-board/src/storage.js"
    },
    {
      "sourceId": "context.codec-test-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/test/storage.test.mjs",
      "digest": "sha256:55e112505cc659bfcca0c2ef16e1a6d152edb2034097e664d45940164cbb3d3b",
      "bytes": 1445,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "implement.impact-codec-storage"
      ],
      "readScope": "examples/release-board/test/storage.test.mjs"
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
        "implement.impact-codec-storage"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "implement.safe-workspace-codec"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md",
        "examples/release-board/src/storage.js",
        "examples/release-board/test/storage.test.mjs"
      ],
      "write": [
        "examples/impact-planner/src/codec.js",
        "examples/impact-planner/src/storage.js",
        "examples/impact-planner/test/codec.test.mjs",
        "examples/impact-planner/test/storage.test.mjs"
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
          "examples/release-board/src/storage.js",
          "examples/release-board/test/storage.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "examples/impact-planner/src/codec.js",
          "examples/impact-planner/src/storage.js",
          "examples/impact-planner/test/codec.test.mjs",
          "examples/impact-planner/test/storage.test.mjs"
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
      "criterionId": "criterion.codec",
      "criterion": "Versioned import, export, and persistence reject unsafe input and preserve valid state.",
      "requirementId": "evidence.codec.produce",
      "kind": "test",
      "duty": "produce",
      "description": "Produce codec and storage modules with adversarial tests.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "impact-codec-handoff.md"
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
  "contentDigest": "sha256:38a4b7a0a353554a919890565157d1e9df46c4dd9e3167e2738facfbd70e5974"
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
    "id": "agent.07613e646cfa8543c304a420d97456c1bcd0b0ca1c7387fe9bce0949b6961f00",
    "blueprintDigest": "sha256:38a4b7a0a353554a919890565157d1e9df46c4dd9e3167e2738facfbd70e5974"
  },
  "compilationDigest": "sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "implement.impact-codec-storage"
  ],
  "artifacts": [
    {
      "name": "impact-codec-handoff.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.codec",
      "requirementId": "evidence.codec.produce",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "impact-codec-handoff.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
