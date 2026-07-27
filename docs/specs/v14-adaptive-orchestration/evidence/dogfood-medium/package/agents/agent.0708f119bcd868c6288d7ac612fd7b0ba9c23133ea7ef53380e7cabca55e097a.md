# Specialist Contract: agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a

Compilation: `sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9`
Blueprint: `sha256:38a4d264698e6726b0ee5c478736ba0e24f23c4755a027f157a7703eabe8eb92`

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
  "id": "agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 1,
  "goalDigest": "sha256:adf1218aaef8c78c4104719b2b6bd15473309e3586f8f360809255679501a35b",
  "candidateId": "team.ab364ab84deeff1ac9bc988bfeac517d1424b37a15be1aa865a7ad7a50bd9b03",
  "workUnitIds": [
    "integrate.impact-planner"
  ],
  "objectives": [
    {
      "workUnitId": "integrate.impact-planner",
      "objective": "Integrate the three verified producer modules into the complete offline application and observe its primary browser workflow."
    }
  ],
  "modules": [
    {
      "id": "integrate.impact-planner",
      "action": "Consume exact verified dependency handoffs, wire state and events, implement the local server and integration tests, then use the delivered browser skill for a bounded smoke observation.",
      "inputPorts": [
        {
          "name": "contract",
          "artifactType": "ImpactPlannerContract"
        }
      ],
      "outputPorts": [
        {
          "name": "handoff",
          "artifactType": "impact-integration-handoff.md"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.07613e646cfa8543c304a420d97456c1bcd0b0ca1c7387fe9bce0949b6961f00",
    "agent.38e222c902c45d5719849945570fcf6ca6f293434f31bcb0722fba0fb6c3d975",
    "agent.9150f32977cbe68915155d99b73818003d6d1d1540bb7f6d8b5e409011d882b5"
  ],
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
        "integrate.impact-planner"
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
        "integrate.impact-planner"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md"
    },
    {
      "sourceId": "context.app-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/src/app.js",
      "digest": "sha256:aa57eafe2939a90b88e052f0dd33a900a0e30efb3aa4dc41678a92d736968ab8",
      "bytes": 8835,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "integrate.impact-planner"
      ],
      "readScope": "examples/release-board/src/app.js"
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
        "integrate.impact-planner"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md"
    },
    {
      "sourceId": "context.integration-test-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/test/integration.test.mjs",
      "digest": "sha256:7ab311070e33237d6b014d88f7bbcb8a74bacf66b962f12a7c975f30d1e047e0",
      "bytes": 2502,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "integrate.impact-planner"
      ],
      "readScope": "examples/release-board/test/integration.test.mjs"
    },
    {
      "sourceId": "context.server-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/server.mjs",
      "digest": "sha256:8290ac09821974a595117e911fd4aadcdc3e38ad8e97909c65b807d6505088f9",
      "bytes": 3269,
      "purposes": [
        "Produce, integrate, or independently review the closed Impact Planner module."
      ],
      "workUnitIds": [
        "integrate.impact-planner"
      ],
      "readScope": "examples/release-board/server.mjs"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "integrate.impact-planner"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md",
        "examples/impact-planner/index.html",
        "examples/impact-planner/src/codec.js",
        "examples/impact-planner/src/graph.js",
        "examples/impact-planner/src/storage.js",
        "examples/impact-planner/src/view.js",
        "examples/impact-planner/styles.css",
        "examples/impact-planner/test/codec.test.mjs",
        "examples/impact-planner/test/graph.test.mjs",
        "examples/impact-planner/test/interface.test.mjs",
        "examples/impact-planner/test/storage.test.mjs",
        "examples/release-board/server.mjs",
        "examples/release-board/src/app.js",
        "examples/release-board/test/integration.test.mjs"
      ],
      "write": [
        "examples/impact-planner/README.md",
        "examples/impact-planner/package.json",
        "examples/impact-planner/server.mjs",
        "examples/impact-planner/src/app.js",
        "examples/impact-planner/src/ui-policy.js",
        "examples/impact-planner/test/integration.test.mjs",
        "examples/impact-planner/test/server.test.mjs"
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
          "examples/impact-planner/index.html",
          "examples/impact-planner/src/codec.js",
          "examples/impact-planner/src/graph.js",
          "examples/impact-planner/src/storage.js",
          "examples/impact-planner/src/view.js",
          "examples/impact-planner/styles.css",
          "examples/impact-planner/test/codec.test.mjs",
          "examples/impact-planner/test/graph.test.mjs",
          "examples/impact-planner/test/interface.test.mjs",
          "examples/impact-planner/test/storage.test.mjs",
          "examples/release-board/server.mjs",
          "examples/release-board/src/app.js",
          "examples/release-board/test/integration.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "examples/impact-planner/README.md",
          "examples/impact-planner/package.json",
          "examples/impact-planner/server.mjs",
          "examples/impact-planner/src/app.js",
          "examples/impact-planner/src/ui-policy.js",
          "examples/impact-planner/test/integration.test.mjs",
          "examples/impact-planner/test/server.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "node",
          "npm.cmd",
          "rg"
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
      "criterionId": "criterion.integration",
      "criterion": "Verified producer outputs integrate into one offline application with browser-observable acceptance behavior.",
      "requirementId": "evidence.integration.produce",
      "kind": "test",
      "duty": "produce",
      "description": "Integrate all producer modules and provide passing integration and server tests plus browser observations.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "impact-integration-handoff.md"
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
    "Stop if the closed product goal conflicts with the application contract.",
    "Stop if the host cannot deliver required skills: skill.browser.control-in-app-browser."
  ],
  "contentDigest": "sha256:38a4d264698e6726b0ee5c478736ba0e24f23c4755a027f157a7703eabe8eb92"
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
    "id": "agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a",
    "blueprintDigest": "sha256:38a4d264698e6726b0ee5c478736ba0e24f23c4755a027f157a7703eabe8eb92"
  },
  "compilationDigest": "sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "integrate.impact-planner"
  ],
  "artifacts": [
    {
      "name": "impact-integration-handoff.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.integration",
      "requirementId": "evidence.integration.produce",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "impact-integration-handoff.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
