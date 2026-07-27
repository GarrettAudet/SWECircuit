# Specialist Contract: agent.38e222c902c45d5719849945570fcf6ca6f293434f31bcb0722fba0fb6c3d975

Compilation: `sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9`
Blueprint: `sha256:776c871f6a04c47ea2a7a737d4e9bc214af672b74849cc504a11b4e9cc5c661c`

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
  "id": "agent.38e222c902c45d5719849945570fcf6ca6f293434f31bcb0722fba0fb6c3d975",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 1,
  "goalDigest": "sha256:adf1218aaef8c78c4104719b2b6bd15473309e3586f8f360809255679501a35b",
  "candidateId": "team.ab364ab84deeff1ac9bc988bfeac517d1424b37a15be1aa865a7ad7a50bd9b03",
  "workUnitIds": [
    "implement.impact-interface"
  ],
  "objectives": [
    {
      "workUnitId": "implement.impact-interface",
      "objective": "Implement the complete semantic Impact Planner shell, responsive styling, DOM projection helpers, and static tests."
    }
  ],
  "modules": [
    {
      "id": "implement.impact-interface",
      "action": "Implement every stable integration hook and render function while preserving keyboard, focus, error, responsive, and reduced-motion requirements.",
      "inputPorts": [
        {
          "name": "contract",
          "artifactType": "ImpactPlannerContract"
        }
      ],
      "outputPorts": [
        {
          "name": "handoff",
          "artifactType": "impact-interface-handoff.md"
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
        "implement.impact-interface"
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
        "implement.impact-interface"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md"
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
        "implement.impact-interface"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md"
    },
    {
      "sourceId": "context.interface-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/index.html",
      "digest": "sha256:9f77c3eaddae6f76b88d44f72a4f6700778d1ab107f94a5c09718e1dc6c697b4",
      "bytes": 6150,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "implement.impact-interface"
      ],
      "readScope": "examples/release-board/index.html"
    },
    {
      "sourceId": "context.style-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/styles.css",
      "digest": "sha256:34d389557986ae708bc9b90521b812822ce0e1901a8aa6828bb572a2bb3fd8ac",
      "bytes": 9567,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "implement.impact-interface"
      ],
      "readScope": "examples/release-board/styles.css"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "implement.accessible-impact-interface"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md",
        "examples/release-board/index.html",
        "examples/release-board/styles.css"
      ],
      "write": [
        "examples/impact-planner/index.html",
        "examples/impact-planner/src/view.js",
        "examples/impact-planner/styles.css",
        "examples/impact-planner/test/interface.test.mjs"
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
          "examples/release-board/index.html",
          "examples/release-board/styles.css"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "examples/impact-planner/index.html",
          "examples/impact-planner/src/view.js",
          "examples/impact-planner/styles.css",
          "examples/impact-planner/test/interface.test.mjs"
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
      "criterionId": "criterion.interface",
      "criterion": "The static interface and view projection are semantic, keyboard-operable, responsive, and integration-ready.",
      "requirementId": "evidence.interface.produce",
      "kind": "test",
      "duty": "produce",
      "description": "Produce the complete interface, view projection, and static contract tests.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "impact-interface-handoff.md"
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
  "contentDigest": "sha256:776c871f6a04c47ea2a7a737d4e9bc214af672b74849cc504a11b4e9cc5c661c"
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
    "id": "agent.38e222c902c45d5719849945570fcf6ca6f293434f31bcb0722fba0fb6c3d975",
    "blueprintDigest": "sha256:776c871f6a04c47ea2a7a737d4e9bc214af672b74849cc504a11b4e9cc5c661c"
  },
  "compilationDigest": "sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "implement.impact-interface"
  ],
  "artifacts": [
    {
      "name": "impact-interface-handoff.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.interface",
      "requirementId": "evidence.interface.produce",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "impact-interface-handoff.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
