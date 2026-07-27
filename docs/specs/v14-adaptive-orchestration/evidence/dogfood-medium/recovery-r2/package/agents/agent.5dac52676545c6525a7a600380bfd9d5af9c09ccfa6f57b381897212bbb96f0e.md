# Specialist Contract: agent.5dac52676545c6525a7a600380bfd9d5af9c09ccfa6f57b381897212bbb96f0e

Compilation: `sha256:8843d3af923c5fc16327ab9face168bc4f175314ab778ee71cd6d8e520567880`
Blueprint: `sha256:1b12710386ad0bea720de6fe7a3cdc16e21130b3cd5a5220ff4e5896be627a7a`

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
  "id": "agent.5dac52676545c6525a7a600380bfd9d5af9c09ccfa6f57b381897212bbb96f0e",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 2,
  "goalDigest": "sha256:ecc1544e5cc171885048880de632fed64d8de5e786b63f6334b3a4c4ea412144",
  "candidateId": "team.eb0acfad4810198a1e55eceed8c8370599a1ed10cc8c30f67be9ff7c81ba1d79",
  "workUnitIds": [
    "fix.impact-graph"
  ],
  "objectives": [
    {
      "workUnitId": "fix.impact-graph",
      "objective": "Apply the exact causal graph validation correction and prove all graph tests pass."
    }
  ],
  "modules": [
    {
      "id": "fix.impact-graph",
      "action": "Return accumulated top-level exact-key errors before canonical validation; preserve all tests and rerun the scoped suite.",
      "inputPorts": [
        {
          "name": "successor",
          "artifactType": "ImpactPlannerRecoveryContract"
        }
      ],
      "outputPorts": [
        {
          "name": "handoff",
          "artifactType": "impact-graph-recovery-handoff.md"
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
        "Correct, integrate, or independently review the exact successor run."
      ],
      "workUnitIds": [
        "fix.impact-graph"
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
        "fix.impact-graph"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md"
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
        "fix.impact-graph"
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
        "fix.impact-graph"
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
        "fix.impact-graph"
      ],
      "readScope": "examples/impact-planner/test/graph.test.mjs"
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
        "fix.impact-graph"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/predecessor.json"
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
        "fix.impact-graph"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/goal.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "repair.impact-graph-evidence"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/graph-raw-attempt-2.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/goal.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/predecessor.json",
        "examples/impact-planner/src/graph.js",
        "examples/impact-planner/test/graph.test.mjs"
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
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/handoffs/graph-raw-attempt-2.json",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/goal.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r2/predecessor.json",
          "examples/impact-planner/src/graph.js",
          "examples/impact-planner/test/graph.test.mjs"
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
      "Do not modify predecessor codec or interface outputs."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.graph-recovery",
      "criterion": "The smallest graph correction closes unknown-key validation and all scoped graph tests pass.",
      "requirementId": "evidence.graph-recovery.produce",
      "kind": "test",
      "duty": "produce",
      "description": "Apply and verify the causal graph correction without weakening regression coverage.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "impact-graph-recovery-handoff.md"
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
  "contentDigest": "sha256:1b12710386ad0bea720de6fe7a3cdc16e21130b3cd5a5220ff4e5896be627a7a"
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
    "id": "agent.5dac52676545c6525a7a600380bfd9d5af9c09ccfa6f57b381897212bbb96f0e",
    "blueprintDigest": "sha256:1b12710386ad0bea720de6fe7a3cdc16e21130b3cd5a5220ff4e5896be627a7a"
  },
  "compilationDigest": "sha256:8843d3af923c5fc16327ab9face168bc4f175314ab778ee71cd6d8e520567880",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.impact-graph"
  ],
  "artifacts": [
    {
      "name": "impact-graph-recovery-handoff.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.graph-recovery",
      "requirementId": "evidence.graph-recovery.produce",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "impact-graph-recovery-handoff.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
