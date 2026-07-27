# Specialist Contract: agent.7f2dd382095753b9cd6f754faaa9fd41ec9f916a3aa841c4d6aa5fec1ff23f15

Compilation: `sha256:4071f52ea4d8eb81c53265668f2fecbbd8be123918ac860f96bd1ad4059c3828`
Blueprint: `sha256:3876140aa8becf234de4edd1569a9064c51f134e285c80b3daa674170fef5761`

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
  "id": "agent.7f2dd382095753b9cd6f754faaa9fd41ec9f916a3aa841c4d6aa5fec1ff23f15",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 3,
  "goalDigest": "sha256:ee3e1a99fc2542640deaeccac2bc6b2bd837c9da933144a67828a0adf5ba39b9",
  "candidateId": "team.78db9d90bf954c572f1cc69e77dbe85f8294308f54bc39c633909eb5bc0b57cc",
  "workUnitIds": [
    "review.impact-planner-rebound"
  ],
  "objectives": [
    {
      "workUnitId": "review.impact-planner-rebound",
      "objective": "Independently review the rebound package, current candidate, predecessor lineage, and verification evidence."
    }
  ],
  "modules": [
    {
      "id": "review.impact-planner-rebound",
      "action": "Recompute context identities, run the complete suite, inspect all acceptance boundaries, and report material findings before verdict.",
      "inputPorts": [
        {
          "name": "candidate",
          "artifactType": "ImpactPlannerReboundContract"
        }
      ],
      "outputPorts": [
        {
          "name": "handoff",
          "artifactType": "impact-rebound-review.md"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.fab1780533167118ec8ed511ca19837e69a7c0dc4f67876a2180941c670c3449"
  ],
  "contextUses": [
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/server.mjs"
    },
    {
      "sourceId": "context.app.05",
      "kind": "repository",
      "locator": "path:examples/impact-planner/src/app.js",
      "digest": "sha256:d223d0e29c3a84eeb79dc600e5df4cabccd184db0f50193237ca84a1f565327e",
      "bytes": 14039,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
      ],
      "readScope": "examples/impact-planner/test/graph.test.mjs"
    },
    {
      "sourceId": "context.app.14",
      "kind": "repository",
      "locator": "path:examples/impact-planner/test/integration.test.mjs",
      "digest": "sha256:aeef0c8a26f9ab6c87f41848bc84f369e1047e4ac1d502c20d1984b2802856e9",
      "bytes": 4266,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
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
        "review.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json"
    },
    {
      "sourceId": "context.predecessor",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/predecessor.json",
      "digest": "sha256:f660a5eac14abb432054bd3308060ec18ac623d054a3d64879faee604b3900de",
      "bytes": 1825,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "review.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/predecessor.json"
    },
    {
      "sourceId": "context.recovery-goal",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/goal.md",
      "digest": "sha256:60ad0a079af17e3fc45e81a8e157b70885f2bf379779fc3d762fc5b37a8b1ab1",
      "bytes": 2196,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "review.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/goal.md"
    },
    {
      "sourceId": "context.review-fix-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/review-raw-attempt-2.json",
      "digest": "sha256:7e334de2d4a3008b9675cde6f86f734d1631efe45010ed46427a1a138b428cb6",
      "bytes": 5056,
      "purposes": [
        "Verify the exact rebound package, current candidate, and predecessor evidence."
      ],
      "workUnitIds": [
        "review.impact-planner-rebound"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/review-raw-attempt-2.json"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.impact-planner.rebound"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/codec-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/interface-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/graph-recovery-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/integration-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/review-raw-attempt-2.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/goal.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/predecessor.json",
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
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/handoffs/review-raw-attempt-2.json",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/goal.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/predecessor.json",
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
      "requirementId": "evidence.context-rebind.review",
      "kind": "review",
      "duty": "review",
      "description": "Independently review all rebound context and predecessor identities.",
      "independentFromProducer": true
    },
    {
      "criterionId": "criterion.product-regression",
      "criterion": "The exact corrected Impact Planner remains functionally, securely, and accessibly complete without application changes.",
      "requirementId": "evidence.product-regression.review",
      "kind": "review",
      "duty": "review",
      "description": "Independently review product acceptance, security, accessibility, and evidence.",
      "independentFromProducer": true
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "impact-rebound-review.md"
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
  "contentDigest": "sha256:3876140aa8becf234de4edd1569a9064c51f134e285c80b3daa674170fef5761"
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
    "revision": 3,
    "digest": "sha256:ee3e1a99fc2542640deaeccac2bc6b2bd837c9da933144a67828a0adf5ba39b9"
  },
  "agent": {
    "id": "agent.7f2dd382095753b9cd6f754faaa9fd41ec9f916a3aa841c4d6aa5fec1ff23f15",
    "blueprintDigest": "sha256:3876140aa8becf234de4edd1569a9064c51f134e285c80b3daa674170fef5761"
  },
  "compilationDigest": "sha256:4071f52ea4d8eb81c53265668f2fecbbd8be123918ac860f96bd1ad4059c3828",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.impact-planner-rebound"
  ],
  "artifacts": [
    {
      "name": "impact-rebound-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.context-identity",
      "requirementId": "evidence.context-rebind.review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "impact-rebound-review.md"
    },
    {
      "criterionId": "criterion.product-regression",
      "requirementId": "evidence.product-regression.review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "impact-rebound-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
