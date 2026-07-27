# Specialist Contract: agent.fab1780533167118ec8ed511ca19837e69a7c0dc4f67876a2180941c670c3449

Compilation: `sha256:e30109cf039cbda24cd000f58168458bf26ac76834035758d385be37d51740ab`
Blueprint: `sha256:dcc5fec3ae5aa7a38b59e1539b22a9682756f567219052583f36a98ae4bcc9cb`

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
  "id": "agent.fab1780533167118ec8ed511ca19837e69a7c0dc4f67876a2180941c670c3449",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 5,
  "goalDigest": "sha256:a51c9f47ec54fecad9fd16ebe808c511fd82de4aebac865ebc521585ad286878",
  "candidateId": "team.78db9d90bf954c572f1cc69e77dbe85f8294308f54bc39c633909eb5bc0b57cc",
  "workUnitIds": [
    "verify.impact-planner-rebound"
  ],
  "objectives": [
    {
      "workUnitId": "verify.impact-planner-rebound",
      "objective": "Verify the fresh context bindings, exact predecessor handoffs, full suite, and bounded browser behavior."
    }
  ],
  "modules": [
    {
      "id": "verify.impact-planner-rebound",
      "action": "Check every declared digest and byte count, verify predecessor handoffs, run all tests and syntax checks, and inspect the critical localhost browser path.",
      "inputPorts": [
        {
          "name": "candidate",
          "artifactType": "ImpactPlannerReboundContract"
        }
      ],
      "outputPorts": [
        {
          "name": "handoff",
          "artifactType": "impact-rebound-verification.md"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.accessibility-fix-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/handoffs/fix-raw.json",
      "digest": "sha256:46c5cef76c3adfe88951424beccecc47538d675bc8fe00c32c531e9213da5574",
      "bytes": 1973,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/handoffs/fix-raw.json"
    },
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:AGENTS.md",
      "digest": "sha256:1cbe95ee56ea68da0e9a3dbddae0fc0120baf83c5594a91e8853d0c5bd5d569b",
      "bytes": 18686,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
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
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md"
    },
    {
      "sourceId": "context.app.01",
      "kind": "repository",
      "locator": "path:examples/impact-planner/README.md",
      "digest": "sha256:9f11734140d8bb0c20521f6714fc5ab22fb85a7a0121b9f499b3f455c8528450",
      "bytes": 494,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/README.md"
    },
    {
      "sourceId": "context.app.02",
      "kind": "repository",
      "locator": "path:examples/impact-planner/index.html",
      "digest": "sha256:6ba88bced09e9a58c9d05ca0c4f2f132d68174f112b80542154baa4756039a23",
      "bytes": 6598,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/index.html"
    },
    {
      "sourceId": "context.app.03",
      "kind": "repository",
      "locator": "path:examples/impact-planner/package.json",
      "digest": "sha256:f5f855bcd01bae085e13e5ece09a2d6d6e43ba0cf018ed596b607976c1439d69",
      "bytes": 540,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/package.json"
    },
    {
      "sourceId": "context.app.04",
      "kind": "repository",
      "locator": "path:examples/impact-planner/server.mjs",
      "digest": "sha256:807b379c04ef03e72abd98d9a96735c22b7b85908d7b59516d177156208a0aba",
      "bytes": 3522,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/server.mjs"
    },
    {
      "sourceId": "context.app.05",
      "kind": "repository",
      "locator": "path:examples/impact-planner/src/app.js",
      "digest": "sha256:dc35c8404e2958250a4b246514aad73588cb20af683265c032132583b12f729f",
      "bytes": 14040,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/src/app.js"
    },
    {
      "sourceId": "context.app.06",
      "kind": "repository",
      "locator": "path:examples/impact-planner/src/codec.js",
      "digest": "sha256:4a613cdeef1c82b0ade5929d2a66493dcb431f93d7d7749826fa0244510e5610",
      "bytes": 4475,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/src/codec.js"
    },
    {
      "sourceId": "context.app.07",
      "kind": "repository",
      "locator": "path:examples/impact-planner/src/graph.js",
      "digest": "sha256:60014b0c2b931de0e034201f59a0efdfa491e80e55c913c3b9628587def6fedc",
      "bytes": 11789,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/src/graph.js"
    },
    {
      "sourceId": "context.app.08",
      "kind": "repository",
      "locator": "path:examples/impact-planner/src/storage.js",
      "digest": "sha256:22bca8aa4139bcc3386b3e68f1fc94685cb88b304cf1cd78eec808e01b8e04e6",
      "bytes": 813,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/src/storage.js"
    },
    {
      "sourceId": "context.app.09",
      "kind": "repository",
      "locator": "path:examples/impact-planner/src/ui-policy.js",
      "digest": "sha256:4d3b000949c011c804cf798f8184523f52a4753264dab41a8125b8ba84ed06bb",
      "bytes": 730,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/src/ui-policy.js"
    },
    {
      "sourceId": "context.app.10",
      "kind": "repository",
      "locator": "path:examples/impact-planner/src/view.js",
      "digest": "sha256:48b13d7dcbf6d3d4edf4e2bc1d8a112bf277e904c096eba100a8ec446ca270d7",
      "bytes": 2828,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/src/view.js"
    },
    {
      "sourceId": "context.app.11",
      "kind": "repository",
      "locator": "path:examples/impact-planner/styles.css",
      "digest": "sha256:91977a2fdaaabe76c0fb6c7fd55ec9ddd8373318b1f443e648809d8d74587a5d",
      "bytes": 8111,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/styles.css"
    },
    {
      "sourceId": "context.app.12",
      "kind": "repository",
      "locator": "path:examples/impact-planner/test/codec.test.mjs",
      "digest": "sha256:554ad109e9dab07d4c753d001ee7babefde772993ffde9723a1484e186a8e03d",
      "bytes": 1799,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/test/codec.test.mjs"
    },
    {
      "sourceId": "context.app.13",
      "kind": "repository",
      "locator": "path:examples/impact-planner/test/graph.test.mjs",
      "digest": "sha256:0bf8b1dba85db54db618026b42b25d9e191289f99db0ab21975961f1986823bc",
      "bytes": 6098,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/test/graph.test.mjs"
    },
    {
      "sourceId": "context.app.14",
      "kind": "repository",
      "locator": "path:examples/impact-planner/test/integration.test.mjs",
      "digest": "sha256:26cf0fa7dc544838560b0c8f43292d9e28c3534dc4d1d51cb52b87ce10714b8f",
      "bytes": 4778,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/test/integration.test.mjs"
    },
    {
      "sourceId": "context.app.15",
      "kind": "repository",
      "locator": "path:examples/impact-planner/test/interface.test.mjs",
      "digest": "sha256:f1214d4792a64d06cb3c8f4d61689afc7ac64911906bfa9009fb759cbb457639",
      "bytes": 1659,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/test/interface.test.mjs"
    },
    {
      "sourceId": "context.app.16",
      "kind": "repository",
      "locator": "path:examples/impact-planner/test/server.test.mjs",
      "digest": "sha256:8e32fd366826e9627855dbf784ee8e374ed6c81666b75cb4e946f91cb8c911d8",
      "bytes": 2184,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/test/server.test.mjs"
    },
    {
      "sourceId": "context.app.17",
      "kind": "repository",
      "locator": "path:examples/impact-planner/test/storage.test.mjs",
      "digest": "sha256:8bb2d340e0313783d61ba9ec7283d11bb634a7cbf6d89208194cd2c3ce6de7db",
      "bytes": 1101,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/test/storage.test.mjs"
    },
    {
      "sourceId": "context.codec-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/codec-raw.json",
      "digest": "sha256:2843a8dd0a635fd55fc950273d7ce8e87821cfaa92ddd3145dde9f7f52f77a05",
      "bytes": 1521,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/codec-raw.json"
    },
    {
      "sourceId": "context.graph-recovery-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/graph-recovery-raw.json",
      "digest": "sha256:6ae0c6edf99d47584ba6ad12f7828b1ac7aeee3984fc387cecceadf999d5eb89",
      "bytes": 2255,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/graph-recovery-raw.json"
    },
    {
      "sourceId": "context.integration-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/integration-raw.json",
      "digest": "sha256:7b7aadc71bd083d27a900548179db2a025e3417a1eb304b330d3f07779d315db",
      "bytes": 3156,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/integration-raw.json"
    },
    {
      "sourceId": "context.interface-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json",
      "digest": "sha256:477a0219e170eeb9336bc81b6cb35a96c610fd555e5c06c93bfecb2a7878cf22",
      "bytes": 1911,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json"
    },
    {
      "sourceId": "context.predecessor",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r5/predecessor.json",
      "digest": "sha256:b8f0a061f0e7552c92af58b686ff7764b5a7b6ebc9c66f74348e5ceaa79198ea",
      "bytes": 1054,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r5/predecessor.json"
    },
    {
      "sourceId": "context.recovery-goal",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r5/goal.md",
      "digest": "sha256:4f8485ced2407b9152e18e7a0c34eb1fd03920b2e9122bb443de79412f534be8",
      "bytes": 1894,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r5/goal.md"
    },
    {
      "sourceId": "context.review-fix-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/handoffs/review-raw.json",
      "digest": "sha256:3096f002e23b9b59b2a0f7fce998b7fb542d566fffffc29917e282ab30d0dd3c",
      "bytes": 5668,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "verify.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/handoffs/review-raw.json"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "verify.impact-planner.rebound"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/codec-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/graph-recovery-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/integration-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/handoffs/review-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/handoffs/fix-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r5/goal.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r5/predecessor.json",
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
        "examples/impact-planner/test/storage.test.mjs"
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
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/graph-recovery-raw.json",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/integration-raw.json",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/handoffs/review-raw.json",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/handoffs/fix-raw.json",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r5/goal.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r5/predecessor.json",
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
          "examples/impact-planner/test/storage.test.mjs"
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
      "Do not install dependencies, modify files, mutate Git, merge, or update durable memory.",
      "Do not weaken or amend product, package, context, or handoff verification."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.context-identity",
      "criterion": "Every repository context item and predecessor handoff is bound to the exact current bytes and independently reviewed.",
      "requirementId": "evidence.context-rebind.verify",
      "kind": "test",
      "duty": "produce",
      "description": "Verify all repository context digests, byte counts, package identities, and predecessor handoffs.",
      "independentFromProducer": false
    },
    {
      "criterionId": "criterion.product-regression",
      "criterion": "The exact corrected Impact Planner remains functionally, securely, and accessibly complete without application changes.",
      "requirementId": "evidence.product-regression.verify",
      "kind": "test",
      "duty": "produce",
      "description": "Run the complete suite and bounded browser verification against the exact candidate.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "impact-rebound-verification.md"
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
    "Do not access the network or secrets or install dependencies.",
    "Do not modify application, test, workflow, evidence, memory, or Git files.",
    "Return non-pass for any identity mismatch, product regression, evidence gap, or material finding.",
    "Verify every delivered repository context against its declared raw digest and byte count before using it."
  ],
  "contentDigest": "sha256:dcc5fec3ae5aa7a38b59e1539b22a9682756f567219052583f36a98ae4bcc9cb"
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
    "revision": 5,
    "digest": "sha256:a51c9f47ec54fecad9fd16ebe808c511fd82de4aebac865ebc521585ad286878"
  },
  "agent": {
    "id": "agent.fab1780533167118ec8ed511ca19837e69a7c0dc4f67876a2180941c670c3449",
    "blueprintDigest": "sha256:dcc5fec3ae5aa7a38b59e1539b22a9682756f567219052583f36a98ae4bcc9cb"
  },
  "compilationDigest": "sha256:e30109cf039cbda24cd000f58168458bf26ac76834035758d385be37d51740ab",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "verify.impact-planner-rebound"
  ],
  "artifacts": [
    {
      "name": "impact-rebound-verification.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.context-identity",
      "requirementId": "evidence.context-rebind.verify",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "impact-rebound-verification.md"
    },
    {
      "criterionId": "criterion.product-regression",
      "requirementId": "evidence.product-regression.verify",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "impact-rebound-verification.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
