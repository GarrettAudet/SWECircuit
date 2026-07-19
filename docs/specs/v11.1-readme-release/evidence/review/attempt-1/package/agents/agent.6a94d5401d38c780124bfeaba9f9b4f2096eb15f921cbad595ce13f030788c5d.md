# Specialist Contract: agent.6a94d5401d38c780124bfeaba9f9b4f2096eb15f921cbad595ce13f030788c5d

Compilation: `sha256:834690f6c366371e2bd450d121d27be4f82964d98ee84e39b6e82da70c3ad511`
Blueprint: `sha256:9094d24d34ec1ba3774388bee3f474935c6dac58f42f6ad9b2a88b77009eb048`

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
  "id": "agent.6a94d5401d38c780124bfeaba9f9b4f2096eb15f921cbad595ce13f030788c5d",
  "goalId": "v11.1.readme-release-review",
  "goalRevision": 1,
  "goalDigest": "sha256:42a8b062d83c7b4da8a99c126156ca98726cb596756d0951289c59afdbcb56ed",
  "candidateId": "team.2077ab2a9679e183beebc81946f8640a8f31a8fa2ce3613775c5729d54195571",
  "workUnitIds": [
    "review.boundary"
  ],
  "objectives": [
    {
      "workUnitId": "review.boundary",
      "objective": "Audit the concise README and its checker rules against the normative V11 compiler and external-host boundary."
    }
  ],
  "modules": [
    {
      "id": "review.capability-boundary",
      "action": "Compare every public capability claim and negative regression with the normative contract; report contradictions or missing truth anchors.",
      "inputPorts": [
        {
          "name": "candidate",
          "artifactType": "FrozenPublicSurface"
        }
      ],
      "outputPorts": [
        {
          "name": "review",
          "artifactType": "ReviewEvidence"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.checker",
      "kind": "repository",
      "locator": "path:scripts/check-template.ps1",
      "digest": "sha256:647c1b67a2acbe85a1f739da627615ec88c8aa37325b0a3c10fb7819758bb2cc",
      "bytes": 77645,
      "purposes": [
        "Review the exact frozen public candidate."
      ],
      "workUnitIds": [
        "review.boundary"
      ],
      "readScope": "scripts/check-template.ps1"
    },
    {
      "sourceId": "context.checker-tests",
      "kind": "repository",
      "locator": "path:scripts/test-check-template.ps1",
      "digest": "sha256:632192e9fa0cb623f77d915a9f550d9c8fec3c079e0edb8ce3163c72a022f422",
      "bytes": 89769,
      "purposes": [
        "Review the exact frozen public candidate."
      ],
      "workUnitIds": [
        "review.boundary"
      ],
      "readScope": "scripts/test-check-template.ps1"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:ab2c0f09a38e5de51f14c6af1c912bbc37f5ec8c27bd589273202741c94297b9",
      "bytes": 36886,
      "purposes": [
        "Review the exact frozen public candidate."
      ],
      "workUnitIds": [
        "review.boundary"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:9fc34535ef595282377b1d3a60b9a82ad6870b55c0fe7ce954bc557e1db9a66e",
      "bytes": 2591,
      "purposes": [
        "Review the exact frozen public candidate."
      ],
      "workUnitIds": [
        "review.boundary"
      ],
      "readScope": "README.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "audit.public-contract"
    ],
    "scope": {
      "read": [
        "README.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "scripts/check-template.ps1",
        "scripts/test-check-template.ps1"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "README.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "scripts/check-template.ps1",
          "scripts/test-check-template.ps1"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not write files, access the network, launch another agent, or change the candidate."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.boundary-accuracy",
      "criterion": "The concise README and checker preserve the exact V11 core versus external-host capability boundary.",
      "requirementId": "evidence.boundary-review",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve an independent capability-boundary verdict.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "capability-boundary-review.json"
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
    "Do not modify repository files.",
    "Stop if a declared source is unavailable or does not match its bound digest."
  ],
  "contentDigest": "sha256:9094d24d34ec1ba3774388bee3f474935c6dac58f42f6ad9b2a88b77009eb048"
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
    "id": "v11.1.readme-release-review",
    "revision": 1,
    "digest": "sha256:42a8b062d83c7b4da8a99c126156ca98726cb596756d0951289c59afdbcb56ed"
  },
  "agent": {
    "id": "agent.6a94d5401d38c780124bfeaba9f9b4f2096eb15f921cbad595ce13f030788c5d",
    "blueprintDigest": "sha256:9094d24d34ec1ba3774388bee3f474935c6dac58f42f6ad9b2a88b77009eb048"
  },
  "compilationDigest": "sha256:834690f6c366371e2bd450d121d27be4f82964d98ee84e39b6e82da70c3ad511",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.boundary"
  ],
  "artifacts": [
    {
      "name": "capability-boundary-review.json",
      "mediaType": "application/json",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.boundary-accuracy",
      "requirementId": "evidence.boundary-review",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "capability-boundary-review.json"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
