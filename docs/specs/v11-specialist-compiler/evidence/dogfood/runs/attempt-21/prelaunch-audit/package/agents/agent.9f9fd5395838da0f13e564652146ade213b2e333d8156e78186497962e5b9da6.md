# Specialist Contract: agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6

Compilation: `sha256:56436e40b2aa999dce21672ec59056cde96f2e5bf08bea9c16fb9302f213694c`
Blueprint: `sha256:fca4710fa97fc929375872a9489def53000b1e8427043060c0c443eaa4ee331d`

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
  "goalRevision": 21,
  "goalDigest": "sha256:ac274cd96351bbd23a2aacc94cc73ac534258d3c4f208fed30bce2f06199031c",
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
        },
        {
          "name": "verification-receipt",
          "artifactType": "PrelaunchPackageVerificationReceipt"
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
      "digest": "sha256:3e6487abf7914e80b78be50d29a7f4e310b7710149500f7bb4d12af15f744f22",
      "bytes": 232074,
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
      "digest": "sha256:2a8981a081752919bdc8e56bba16680844f517c0c0a4545c2ef34f0f5d5d4db7",
      "bytes": 13789,
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
      "digest": "sha256:b4a3596000d0e5e0929b75dd242270cfc381244c55f413984c9c052f5818f712",
      "bytes": 8557,
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
      "digest": "sha256:05b96f6e02e560aa5c3e5d291794602d87e40174c47e70dc0a531f192386b425",
      "bytes": 11595,
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
      "digest": "sha256:0f487cf0881b64098a2a2d3d8268b3880754bab696d9aacce81ce17c12c52bf8",
      "bytes": 17857,
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
      "digest": "sha256:8b94ec31d3eb4c8056d79e122a0c197a04f1e9ee410a0843402106bdfd51ba08",
      "bytes": 23675,
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
      "digest": "sha256:764cde62cda0045dc9cb79c3ba5aecded61802e941d5bc763ef4944cf43008d4",
      "bytes": 24780,
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
      "digest": "sha256:3e6487abf7914e80b78be50d29a7f4e310b7710149500f7bb4d12af15f744f22",
      "bytes": 232074,
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
      "digest": "sha256:b7fc3618d1ab6dd9dbdd22768f1bfd37544664b9cde1acea2ce01d70eb4f0b35",
      "bytes": 7782,
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
      "digest": "sha256:79862f3f53adf2c63bfcb046b234ac39c2076e03cc99c50bd21e1f8176333dbb",
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
      "description": "Exact candidate authority, rendered contracts, and host package-verification receipt bound for review.",
      "independentFromProducer": false
    },
    {
      "criterionId": "criterion.candidate-selection",
      "criterion": "The exact candidate search, selection, schedule, metrics, and digest claims are reproducible and accurate.",
      "requirementId": "evidence.candidate-selection-binding",
      "kind": "digest",
      "duty": "produce",
      "description": "Exact candidate compilation and package bytes plus the host package-verification receipt bound for review.",
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
    "Stop if any candidate artifact is absent or differs from its declared bytes or digest.",
    "Stop if the host-delivered PrelaunchPackageVerificationReceipt is absent, non-PASS, malformed, or binds different Candidate A or Audit B identities."
  ],
  "contentDigest": "sha256:fca4710fa97fc929375872a9489def53000b1e8427043060c0c443eaa4ee331d"
}
```
