# Specialist Contract: agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf

Compilation: `sha256:8843d3af923c5fc16327ab9face168bc4f175314ab778ee71cd6d8e520567880`
Blueprint: `sha256:83986bc64bf4d8db91d5133e3e9e4b08c306fcfcb15a682020bf41ca0ca4a1cb`

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
  "goalRevision": 2,
  "goalDigest": "sha256:ecc1544e5cc171885048880de632fed64d8de5e786b63f6334b3a4c4ea412144",
  "candidateId": "team.eb0acfad4810198a1e55eceed8c8370599a1ed10cc8c30f67be9ff7c81ba1d79",
  "workUnitIds": [
    "review.impact-planner"
  ],
  "objectives": [
    {
      "workUnitId": "review.impact-planner",
      "objective": "Independently review the exact successor implementation and all recovery evidence."
    }
  ],
  "modules": [
    {
      "id": "review.impact-planner",
      "action": "Run the complete suite, inspect every acceptance boundary and predecessor binding, and report material findings before verdict.",
      "inputPorts": [
        {
          "name": "successor",
          "artifactType": "ImpactPlannerRecoveryContract"
        }
      ],
      "outputPorts": [
        {
          "name": "handoff",
          "artifactType": "impact-successor-review.md"
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
        "Correct, integrate, or independently review the exact successor run."
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
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "review.impact-planner"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md"
    },
    {
      "sourceId": "context.codec-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/codec-raw.json",
      "digest": "sha256:2843a8dd0a635fd55fc950273d7ce8e87821cfaa92ddd3145dde9f7f52f77a05",
      "bytes": 1521,
      "purposes": [
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "review.impact-planner"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/codec-raw.json"
    },
    {
      "sourceId": "context.graph-fix-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/graph-raw-attempt-2.json",
      "digest": "sha256:44f46604659d16de5cfc003f8afd88aafb91c6166292d93970fd1a5b82391094",
      "bytes": 1709,
      "purposes": [
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "review.impact-planner"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/graph-raw-attempt-2.json"
    },
    {
      "sourceId": "context.graph-source",
      "kind": "repository",
      "locator": "path:examples/impact-planner/src/graph.js",
      "digest": "sha256:4b0b88f4b4620e72ac102c36867fd90a3eb71086b4140360774f02698984b091",
      "bytes": 11768,
      "purposes": [
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "review.impact-planner"
      ],
      "readScope": "examples/impact-planner/src/graph.js"
    },
    {
      "sourceId": "context.graph-tests",
      "kind": "repository",
      "locator": "path:examples/impact-planner/test/graph.test.mjs",
      "digest": "sha256:0bf8b1dba85db54db618026b42b25d9e191289f99db0ab21975961f1986823bc",
      "bytes": 6098,
      "purposes": [
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "review.impact-planner"
      ],
      "readScope": "examples/impact-planner/test/graph.test.mjs"
    },
    {
      "sourceId": "context.interface-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json",
      "digest": "sha256:477a0219e170eeb9336bc81b6cb35a96c610fd555e5c06c93bfecb2a7878cf22",
      "bytes": 1911,
      "purposes": [
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "review.impact-planner"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json"
    },
    {
      "sourceId": "context.predecessor",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/predecessor.json",
      "digest": "sha256:d04408228509314f89ded3da1cbeaba79ca51b2c206de60294fcc1aa2eef4a8b",
      "bytes": 1555,
      "purposes": [
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "review.impact-planner"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/predecessor.json"
    },
    {
      "sourceId": "context.release-app-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/src/app.js",
      "digest": "sha256:aa57eafe2939a90b88e052f0dd33a900a0e30efb3aa4dc41678a92d736968ab8",
      "bytes": 8835,
      "purposes": [
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "review.impact-planner"
      ],
      "readScope": "examples/release-board/src/app.js"
    },
    {
      "sourceId": "context.release-server-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/server.mjs",
      "digest": "sha256:8290ac09821974a595117e911fd4aadcdc3e38ad8e97909c65b807d6505088f9",
      "bytes": 3269,
      "purposes": [
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "review.impact-planner"
      ],
      "readScope": "examples/release-board/server.mjs"
    },
    {
      "sourceId": "context.release-test-pattern",
      "kind": "repository",
      "locator": "path:examples/release-board/test/integration.test.mjs",
      "digest": "sha256:7ab311070e33237d6b014d88f7bbcb8a74bacf66b962f12a7c975f30d1e047e0",
      "bytes": 2502,
      "purposes": [
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "review.impact-planner"
      ],
      "readScope": "examples/release-board/test/integration.test.mjs"
    },
    {
      "sourceId": "context.successor-goal",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/goal.md",
      "digest": "sha256:2372b790622913c8fe27999412bf8e1435d034c9255bd7e7f7d4f4b39d253f8e",
      "bytes": 1988,
      "purposes": [
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "review.impact-planner"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/goal.md"
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
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/codec-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/graph-raw-attempt-2.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/goal.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/predecessor.json",
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
        "examples/release-board/server.mjs",
        "examples/release-board/src/app.js",
        "examples/release-board/test/integration.test.mjs"
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
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/codec-raw.json",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/graph-raw-attempt-2.json",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/goal.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/predecessor.json",
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
          "examples/release-board/server.mjs",
          "examples/release-board/src/app.js",
          "examples/release-board/test/integration.test.mjs"
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
      "Do not modify predecessor codec or interface outputs."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.graph-recovery",
      "criterion": "The smallest graph correction closes unknown-key validation and all scoped graph tests pass.",
      "requirementId": "evidence.graph-recovery.review",
      "kind": "review",
      "duty": "review",
      "description": "Independently review the graph correction and complete graph suite.",
      "independentFromProducer": true
    },
    {
      "criterionId": "criterion.successor-integration",
      "criterion": "Exact predecessor pass outputs and corrected graph output integrate into the complete offline application.",
      "requirementId": "evidence.successor-integration.review",
      "kind": "review",
      "duty": "review",
      "description": "Independently review acceptance, security, accessibility, integration, and evidence.",
      "independentFromProducer": true
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "impact-successor-review.md"
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
    "A dependent unit starts only after exact transitive handoff assessment is integration-ready.",
    "Do not access the network or secrets, install dependencies, mutate Git, merge, or update memory.",
    "Do not modify files outside the declared write scope.",
    "Do not widen or reinterpret the original product contract.",
    "Return non-pass when required evidence cannot be produced.",
    "Use the smallest causal correction and preserve the failing regression assertion."
  ],
  "contentDigest": "sha256:83986bc64bf4d8db91d5133e3e9e4b08c306fcfcb15a682020bf41ca0ca4a1cb"
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
    "revision": 2,
    "digest": "sha256:ecc1544e5cc171885048880de632fed64d8de5e786b63f6334b3a4c4ea412144"
  },
  "agent": {
    "id": "agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf",
    "blueprintDigest": "sha256:83986bc64bf4d8db91d5133e3e9e4b08c306fcfcb15a682020bf41ca0ca4a1cb"
  },
  "compilationDigest": "sha256:8843d3af923c5fc16327ab9face168bc4f175314ab778ee71cd6d8e520567880",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.impact-planner"
  ],
  "artifacts": [
    {
      "name": "impact-successor-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.graph-recovery",
      "requirementId": "evidence.graph-recovery.review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "impact-successor-review.md"
    },
    {
      "criterionId": "criterion.successor-integration",
      "requirementId": "evidence.successor-integration.review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "impact-successor-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
