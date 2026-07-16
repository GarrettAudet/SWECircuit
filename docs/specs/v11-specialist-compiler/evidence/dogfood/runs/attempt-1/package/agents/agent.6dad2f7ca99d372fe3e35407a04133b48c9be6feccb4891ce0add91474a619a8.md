# Specialist Contract: agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8

Compilation: `sha256:32f615017d7f5b0f7648a6818420857c0ffb258aa6a721d94c685da08b8c6254`
Blueprint: `sha256:4a0136cbeedb1a7d459a3b0e01e673408407ef79be35e9fa0bbac5c5c7bb8685`

This is the exact provider-neutral task contract approved for this specialist. A host may translate it into runtime-specific instructions, but it must not widen authority, add work, omit evidence, or change the handoff.

## Operating Rules

1. Verify every delivered context item against its declared digest and byte count before using it.
2. Work only on the listed work units, Modules, scopes, capabilities, and permissions.
3. Respect agent dependencies and stop when a stop condition or undeclared decision is reached.
4. Produce every assigned evidence duty and every required handoff field.
5. Report assumptions, risks, failed attempts, and follow-up work; do not silently expand scope.

## Blueprint

```json
{
  "apiVersion": "swecircuit/specialist/v1alpha1",
  "kind": "AgentBlueprint",
  "id": "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 1,
  "goalDigest": "sha256:325b614ef60ec1260576c8ac42a5d780a9d132cdac3f1a730f89c39619db76c5",
  "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "workUnitIds": [
    "verify.release-gates"
  ],
  "objectives": [
    {
      "workUnitId": "verify.release-gates",
      "objective": "Independently verify the strict schema, specialist golden suite, full kernel gate, package dry run, installed consumer, and template checker evidence."
    }
  ],
  "modules": [
    {
      "id": "verify.release-gates",
      "action": "Re-run and inspect every canonical V11 release gate.",
      "inputPorts": [
        {
          "name": "candidate",
          "artifactType": "ReviewCandidate"
        }
      ],
      "outputPorts": [
        {
          "name": "evidence",
          "artifactType": "ReleaseGateEvidence"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730"
  ],
  "contextUses": [
    {
      "sourceId": "context.compiler-tests",
      "kind": "repository",
      "locator": "path:test/specialist-compiler.test.mjs",
      "digest": "sha256:75820747921e8e8765482f4f5f910e151483e11966511b54b52cb5104b0ff755",
      "bytes": 34973,
      "purposes": [
        "Verify the golden suite."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "test/specialist-compiler.test.mjs"
    },
    {
      "sourceId": "context.schema",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/specialist-compiler.schema.json",
      "digest": "sha256:43a52df03c9942915cebdd217a67a5baa686e233a917c37b2c306817db319279",
      "bytes": 14065,
      "purposes": [
        "Verify the packaged closed schema."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "schemas/v1alpha1/specialist-compiler.schema.json"
    },
    {
      "sourceId": "context.schema-tests",
      "kind": "repository",
      "locator": "path:test/specialist-schema.test.mjs",
      "digest": "sha256:310b39e4f49a46ceea078269f0fa9fc0e1003428b8f6504ea2e83130b2b38e84",
      "bytes": 8982,
      "purposes": [
        "Verify strict schema coverage."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "test/specialist-schema.test.mjs"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/spec.md",
      "digest": "sha256:2730c21ed7681b7d6d766cae72ff4159b2bf308d860a0dc45ea100044f02ecb0",
      "bytes": 8132,
      "purposes": [
        "Map gates to acceptance criteria."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "verify.release"
    ],
    "scope": {
      "read": [
        "docs/specs/v11-specialist-compiler/spec.md",
        "schemas/v1alpha1/specialist-compiler.schema.json",
        "test/specialist-compiler.test.mjs",
        "test/specialist-schema.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v11-specialist-compiler/spec.md",
          "schemas/v1alpha1/specialist-compiler.schema.json",
          "test/specialist-compiler.test.mjs",
          "test/specialist-schema.test.mjs"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access a network or provider.",
      "Do not execute or dispatch runtime agents from core.",
      "Do not merge or update durable memory before integration review.",
      "Do not widen reviewed filesystem authority."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.release",
      "criterion": "Canonical verification and source-linked release evidence are complete before owner approval.",
      "requirementId": "evidence.release-gates",
      "kind": "test",
      "duty": "verify",
      "description": "Independent canonical verification evidence.",
      "independentFromProducer": true
    }
  ],
  "handoff": {
    "destination": "v11.integration-owner",
    "artifacts": [
      "release-gate-evidence.md"
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
    "Stop with FIX if any canonical gate fails or cannot be reproduced."
  ],
  "contentDigest": "sha256:4a0136cbeedb1a7d459a3b0e01e673408407ef79be35e9fa0bbac5c5c7bb8685"
}
```
