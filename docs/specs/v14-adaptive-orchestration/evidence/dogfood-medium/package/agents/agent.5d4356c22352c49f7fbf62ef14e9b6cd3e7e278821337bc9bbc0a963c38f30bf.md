# Specialist Contract: agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf

Compilation: `sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9`
Blueprint: `sha256:8e7b39fbd6667a60028635127fd5deb7bda962a93510853235e830acfbd523c1`

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
  "id": "agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 1,
  "goalDigest": "sha256:adf1218aaef8c78c4104719b2b6bd15473309e3586f8f360809255679501a35b",
  "candidateId": "team.ab364ab84deeff1ac9bc988bfeac517d1424b37a15be1aa865a7ad7a50bd9b03",
  "workUnitIds": [
    "review.impact-planner"
  ],
  "objectives": [
    {
      "workUnitId": "review.impact-planner",
      "objective": "Independently review the exact integrated Impact Planner and all producer evidence without editing it."
    }
  ],
  "modules": [
    {
      "id": "review.impact-planner",
      "action": "Run the complete suite and inspect graph, codec, storage, accessibility, browser, security, integration, and evidence behavior; report findings first.",
      "inputPorts": [
        {
          "name": "contract",
          "artifactType": "ImpactPlannerContract"
        }
      ],
      "outputPorts": [
        {
          "name": "handoff",
          "artifactType": "impact-planner-review.md"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a"
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
        "review.impact-planner"
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
        "review.impact-planner"
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
        "review.impact-planner"
      ],
      "readScope": "examples/release-board/src/app.js"
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
        "review.impact-planner"
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
        "review.impact-planner"
      ],
      "readScope": "examples/release-board/test/storage.test.mjs"
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
        "review.impact-planner"
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
        "review.impact-planner"
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
        "review.impact-planner"
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
        "review.impact-planner"
      ],
      "readScope": "examples/release-board/test/integration.test.mjs"
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
        "review.impact-planner"
      ],
      "readScope": "examples/release-board/index.html"
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
        "review.impact-planner"
      ],
      "readScope": "examples/release-board/server.mjs"
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
        "review.impact-planner"
      ],
      "readScope": "examples/release-board/styles.css"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.impact-planner"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md",
        "examples/impact-planner/README.md",
        "examples/impact-planner/index.html",
        "examples/impact-planner/package.json",
        "examples/impact-planner/server.mjs",
        "examples/impact-planner/src/app.js",
        "examples/impact-planner/src/codec.js",
        "examples/impact-planner/src/graph.js",
        "examples/impact-planner/src/storage.js",
        "examples/impact-planner/src/ui-policy.js",
        "examples/impact-planner/src/view.js",
        "examples/impact-planner/styles.css",
        "examples/impact-planner/test/codec.test.mjs",
        "examples/impact-planner/test/graph.test.mjs",
        "examples/impact-planner/test/integration.test.mjs",
        "examples/impact-planner/test/interface.test.mjs",
        "examples/impact-planner/test/server.test.mjs",
        "examples/impact-planner/test/storage.test.mjs",
        "examples/release-board/index.html",
        "examples/release-board/server.mjs",
        "examples/release-board/src/app.js",
        "examples/release-board/src/model.js",
        "examples/release-board/src/storage.js",
        "examples/release-board/styles.css",
        "examples/release-board/test/integration.test.mjs",
        "examples/release-board/test/model.test.mjs",
        "examples/release-board/test/storage.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "AGENTS.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/goal.md",
          "examples/impact-planner/README.md",
          "examples/impact-planner/index.html",
          "examples/impact-planner/package.json",
          "examples/impact-planner/server.mjs",
          "examples/impact-planner/src/app.js",
          "examples/impact-planner/src/codec.js",
          "examples/impact-planner/src/graph.js",
          "examples/impact-planner/src/storage.js",
          "examples/impact-planner/src/ui-policy.js",
          "examples/impact-planner/src/view.js",
          "examples/impact-planner/styles.css",
          "examples/impact-planner/test/codec.test.mjs",
          "examples/impact-planner/test/graph.test.mjs",
          "examples/impact-planner/test/integration.test.mjs",
          "examples/impact-planner/test/interface.test.mjs",
          "examples/impact-planner/test/server.test.mjs",
          "examples/impact-planner/test/storage.test.mjs",
          "examples/release-board/index.html",
          "examples/release-board/server.mjs",
          "examples/release-board/src/app.js",
          "examples/release-board/src/model.js",
          "examples/release-board/src/storage.js",
          "examples/release-board/styles.css",
          "examples/release-board/test/integration.test.mjs",
          "examples/release-board/test/model.test.mjs",
          "examples/release-board/test/storage.test.mjs"
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
      "criterionId": "criterion.codec",
      "criterion": "Versioned import, export, and persistence reject unsafe input and preserve valid state.",
      "requirementId": "evidence.codec.review",
      "kind": "review",
      "duty": "review",
      "description": "Independently review structural validation, byte limits, unsafe keys, and storage failure handling.",
      "independentFromProducer": true
    },
    {
      "criterionId": "criterion.graph",
      "criterion": "Graph validation and impact analysis are immutable, deterministic, cycle-safe, and completely tested.",
      "requirementId": "evidence.graph.review",
      "kind": "review",
      "duty": "review",
      "description": "Independently review graph correctness, determinism, edge cases, and tests.",
      "independentFromProducer": true
    },
    {
      "criterionId": "criterion.integration",
      "criterion": "Verified producer outputs integrate into one offline application with browser-observable acceptance behavior.",
      "requirementId": "evidence.integration.review",
      "kind": "review",
      "duty": "review",
      "description": "Independently review the complete application, test evidence, host boundary, and acceptance alignment.",
      "independentFromProducer": true
    },
    {
      "criterionId": "criterion.interface",
      "criterion": "The static interface and view projection are semantic, keyboard-operable, responsive, and integration-ready.",
      "requirementId": "evidence.interface.review",
      "kind": "review",
      "duty": "review",
      "description": "Independently review accessibility, responsive constraints, integration hooks, and rendering behavior.",
      "independentFromProducer": true
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "impact-planner-review.md"
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
  "contentDigest": "sha256:8e7b39fbd6667a60028635127fd5deb7bda962a93510853235e830acfbd523c1"
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
    "id": "agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf",
    "blueprintDigest": "sha256:8e7b39fbd6667a60028635127fd5deb7bda962a93510853235e830acfbd523c1"
  },
  "compilationDigest": "sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.impact-planner"
  ],
  "artifacts": [
    {
      "name": "impact-planner-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.codec",
      "requirementId": "evidence.codec.review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "impact-planner-review.md"
    },
    {
      "criterionId": "criterion.graph",
      "requirementId": "evidence.graph.review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "impact-planner-review.md"
    },
    {
      "criterionId": "criterion.integration",
      "requirementId": "evidence.integration.review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "impact-planner-review.md"
    },
    {
      "criterionId": "criterion.interface",
      "requirementId": "evidence.interface.review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "impact-planner-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
