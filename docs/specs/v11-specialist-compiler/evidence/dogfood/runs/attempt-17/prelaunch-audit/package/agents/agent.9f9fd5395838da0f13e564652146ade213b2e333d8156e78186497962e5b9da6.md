# Specialist Contract: agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6

Compilation: `sha256:a832ba62027737d4ea804d64e47fbd3cd53b78c4756524586d147dca0a0722ff`
Blueprint: `sha256:c3695a34a27da4fcd8632b734e1007d4b911625db2566950d4b27b85cf498b9c`

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
  "id": "agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6",
  "goalId": "v11.specialist-compiler.prelaunch-audit",
  "goalRevision": 17,
  "goalDigest": "sha256:d6e6cd00d9e1edb28215c40dedb4dc0b76b3247832ac93c0c6f7aa223d9e149a",
  "candidateId": "team.357beba7ab91a91ad49896b7d31e2fb6c61d9277c3d50582a02bad331a809b12",
  "workUnitIds": [
    "audit.bind-candidate"
  ],
  "objectives": [
    {
      "workUnitId": "audit.bind-candidate",
      "objective": "Bind the complete candidate compilation and rendered package to immutable review evidence."
    }
  ],
  "modules": [
    {
      "id": "audit.bind-candidate",
      "action": "Authenticate every candidate artifact before semantic review.",
      "inputPorts": [
        {
          "name": "candidate",
          "artifactType": "RenderedSpecialistPackage"
        }
      ],
      "outputPorts": [
        {
          "name": "binding",
          "artifactType": "CandidateAuditBinding"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.candidate-artifact.01",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
      "digest": "sha256:e2e0056aed5dc7723b2ffa885830b44d3de8ead9716e9504edb2b6cb5ef2b7f0",
      "bytes": 226627,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.bind-candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json"
    },
    {
      "sourceId": "context.candidate-artifact.02",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972.md",
      "digest": "sha256:c3567fc6e972a2ab2c9fb78315a377b72aadee8a2a659f3bc1d5f3e87069a389",
      "bytes": 13788,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.bind-candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972.md"
    },
    {
      "sourceId": "context.candidate-artifact.03",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9.md",
      "digest": "sha256:7b73d70bf9a604e3b90ecca0281ed989b26ab87d9da242b0f081e41600de597f",
      "bytes": 8556,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.bind-candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9.md"
    },
    {
      "sourceId": "context.candidate-artifact.04",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e.md",
      "digest": "sha256:a230e1ea33b5645bccde5431e0fb7fb0ac07eb6b0e6eea03867e75ffd93d7789",
      "bytes": 11594,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.bind-candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e.md"
    },
    {
      "sourceId": "context.candidate-artifact.05",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8.md",
      "digest": "sha256:3d52cbd2a62be8a53bb6eb2c6c4e70bc6c59cdbc69dc2822448332ff67f3e6ea",
      "bytes": 16842,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.bind-candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8.md"
    },
    {
      "sourceId": "context.candidate-artifact.06",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc.md",
      "digest": "sha256:e6f5b3b34503068cb6f94d879f54fb6ce172b849437e7bc540b33511eae7fc4e",
      "bytes": 23011,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.bind-candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc.md"
    },
    {
      "sourceId": "context.candidate-artifact.07",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730.md",
      "digest": "sha256:d427a4acafa250a9a2275d8cb5c14795239b545ce250f50b1dbd67635784f24e",
      "bytes": 24211,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.bind-candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730.md"
    },
    {
      "sourceId": "context.candidate-artifact.08",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/compilation.json",
      "digest": "sha256:e2e0056aed5dc7723b2ffa885830b44d3de8ead9716e9504edb2b6cb5ef2b7f0",
      "bytes": 226627,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.bind-candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/compilation.json"
    },
    {
      "sourceId": "context.candidate-artifact.09",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/integration.md",
      "digest": "sha256:ce23d8fcf1bddbe3c48b24dbd6c9f3282f56a7a6b2ff469b42c55ff56516fb4c",
      "bytes": 7342,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.bind-candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/integration.md"
    },
    {
      "sourceId": "context.candidate-artifact.10",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json",
      "digest": "sha256:e1f1b2676fe08c1f8cd52c40ab948a8c05045316b7bd1e161d279d6624e355ab",
      "bytes": 4202,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.bind-candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "candidate.bind"
    ],
    "scope": {
      "read": [
        "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/compilation.json",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/integration.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/compilation.json",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/integration.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access a network or provider.",
      "Do not approve or launch the candidate package.",
      "Do not modify repository files, candidate evidence, or durable memory.",
      "Do not widen candidate or audit authority."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.candidate-authority-package",
      "criterion": "The exact blueprints, authority, evidence coverage, handoffs, and rendered package preserve the reviewed goal.",
      "requirementId": "evidence.candidate-authority-binding",
      "kind": "digest",
      "duty": "produce",
      "description": "Exact candidate authority and rendered contracts bound for review.",
      "independentFromProducer": false
    },
    {
      "criterionId": "criterion.candidate-selection",
      "criterion": "The exact candidate search, selection, schedule, metrics, and digest claims are reproducible and accurate.",
      "requirementId": "evidence.candidate-selection-binding",
      "kind": "digest",
      "duty": "produce",
      "description": "Exact candidate compilation and package bytes bound for review.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "v11.integration-owner",
    "artifacts": [
      "candidate-audit-binding.json"
    ],
    "requiredFields": [
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
    "Stop if any candidate artifact is absent or differs from its declared bytes or digest."
  ],
  "contentDigest": "sha256:c3695a34a27da4fcd8632b734e1007d4b911625db2566950d4b27b85cf498b9c"
}
```
