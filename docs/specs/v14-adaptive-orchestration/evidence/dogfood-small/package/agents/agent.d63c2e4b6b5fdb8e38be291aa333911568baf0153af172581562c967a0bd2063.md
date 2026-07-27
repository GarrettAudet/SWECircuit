# Specialist Contract: agent.d63c2e4b6b5fdb8e38be291aa333911568baf0153af172581562c967a0bd2063

Compilation: `sha256:f4f4e91fc1fc8ea2b4cf52256395fa4e15b109cc5ebd4f8bc690c408c4b5eb7e`
Blueprint: `sha256:c059ddece9a7b8b583f21b0b54c2a12a93d26a36225533f98c738fd5d6fb24e6`

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
  "id": "agent.d63c2e4b6b5fdb8e38be291aa333911568baf0153af172581562c967a0bd2063",
  "goalId": "v14.dogfood.release-board",
  "goalRevision": 1,
  "goalDigest": "sha256:17b787892abba5429003d87548bf40eb8715078f5636e55b46998d13cd959c0f",
  "candidateId": "team.c773f72cc9ded5b29f24db957e26f65e4f24ed5c56ec9c24e1ee89f7d5c6c13a",
  "workUnitIds": [
    "implement.release-board-domain"
  ],
  "objectives": [
    {
      "workUnitId": "implement.release-board-domain",
      "objective": "Implement pure immutable release-check operations, safe versioned serialization, and deterministic Node tests."
    }
  ],
  "modules": [
    {
      "id": "implement.release-board-domain",
      "action": "Implement the exact check shape, closed filters, readiness summary, immutable transitions, and fail-safe storage parsing.",
      "inputPorts": [
        {
          "name": "contract",
          "artifactType": "ReleaseBoardContract"
        }
      ],
      "outputPorts": [
        {
          "name": "implementation",
          "artifactType": "release-board-domain-handoff.md"
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
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-domain"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.app-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md",
      "digest": "sha256:557460d42eea3249124db49071128638fc28a6039c8b9208cf5427419ee58a50",
      "bytes": 2437,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-domain"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md"
    },
    {
      "sourceId": "context.domain-pattern",
      "kind": "repository",
      "locator": "path:examples/triage-board/src/model.js",
      "digest": "sha256:f9f7bb99b2ba27ef64bd28d88b4465c2852a4aeb6a7e0a8b7375222843fac59f",
      "bytes": 8237,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-domain"
      ],
      "readScope": "examples/triage-board/src/model.js"
    },
    {
      "sourceId": "context.domain-test-pattern",
      "kind": "repository",
      "locator": "path:examples/triage-board/test/model.test.mjs",
      "digest": "sha256:fcd4b3cbf7603b03d703fe4b3dc55f657189fd48ce76b4ee834feb35492a3b46",
      "bytes": 5487,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-domain"
      ],
      "readScope": "examples/triage-board/test/model.test.mjs"
    },
    {
      "sourceId": "context.goal",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md",
      "digest": "sha256:d92824a12e2f47dfcd441c6711bef71330a8fe2e5e39bb6c75b274e2fe610777",
      "bytes": 1610,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-domain"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md"
    },
    {
      "sourceId": "context.storage-pattern",
      "kind": "repository",
      "locator": "path:examples/triage-board/src/storage.js",
      "digest": "sha256:948a6758beea65b6f5a4f0c42a786b5f4e147d63478f146bd6f14635376634a8",
      "bytes": 769,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-domain"
      ],
      "readScope": "examples/triage-board/src/storage.js"
    },
    {
      "sourceId": "context.storage-test-pattern",
      "kind": "repository",
      "locator": "path:examples/triage-board/test/storage.test.mjs",
      "digest": "sha256:a57a8e6d4093e38baa1fbad34868639934dc79351380ef910a85faf0c1a80c59",
      "bytes": 1789,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-domain"
      ],
      "readScope": "examples/triage-board/test/storage.test.mjs"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "implement.release-board-domain"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md",
        "examples/triage-board/src/model.js",
        "examples/triage-board/src/storage.js",
        "examples/triage-board/test/model.test.mjs",
        "examples/triage-board/test/storage.test.mjs"
      ],
      "write": [
        "examples/release-board/src/model.js",
        "examples/release-board/src/storage.js",
        "examples/release-board/test/model.test.mjs",
        "examples/release-board/test/storage.test.mjs"
      ],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "AGENTS.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md",
          "examples/triage-board/src/model.js",
          "examples/triage-board/src/storage.js",
          "examples/triage-board/test/model.test.mjs",
          "examples/triage-board/test/storage.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "examples/release-board/src/model.js",
          "examples/release-board/src/storage.js",
          "examples/release-board/test/model.test.mjs",
          "examples/release-board/test/storage.test.mjs"
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
      "Do not install dependencies, mutate Git, launch descendants, integrate, merge, or update memory."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.domain",
      "criterion": "Pure immutable domain and versioned storage operations satisfy the closed check, filter, summary, and invalid-data contract.",
      "requirementId": "evidence.domain.tests",
      "kind": "test",
      "duty": "produce",
      "description": "Produce passing deterministic Node tests with the domain and storage modules.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "release-board-domain-handoff.md"
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
    "Do not access the network, install dependencies, mutate Git, merge, or update memory.",
    "Do not claim browser behavior that was not observed.",
    "Do not modify files outside the declared write scope.",
    "Return non-pass when the assigned artifact cannot be produced and verified.",
    "Stop if the product goal conflicts with the application contract."
  ],
  "contentDigest": "sha256:c059ddece9a7b8b583f21b0b54c2a12a93d26a36225533f98c738fd5d6fb24e6"
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
    "id": "v14.dogfood.release-board",
    "revision": 1,
    "digest": "sha256:17b787892abba5429003d87548bf40eb8715078f5636e55b46998d13cd959c0f"
  },
  "agent": {
    "id": "agent.d63c2e4b6b5fdb8e38be291aa333911568baf0153af172581562c967a0bd2063",
    "blueprintDigest": "sha256:c059ddece9a7b8b583f21b0b54c2a12a93d26a36225533f98c738fd5d6fb24e6"
  },
  "compilationDigest": "sha256:f4f4e91fc1fc8ea2b4cf52256395fa4e15b109cc5ebd4f8bc690c408c4b5eb7e",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "implement.release-board-domain"
  ],
  "artifacts": [
    {
      "name": "release-board-domain-handoff.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.domain",
      "requirementId": "evidence.domain.tests",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "release-board-domain-handoff.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
