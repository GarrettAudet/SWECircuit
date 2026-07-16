# Specialist Contract: agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc

Compilation: `sha256:32f615017d7f5b0f7648a6818420857c0ffb258aa6a721d94c685da08b8c6254`
Blueprint: `sha256:f628ab7888ebae74a9211e8c9ba0dcfd496d73d6e0e0a4decebc44084684ea9c`

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
  "id": "agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 1,
  "goalDigest": "sha256:325b614ef60ec1260576c8ac42a5d780a9d132cdac3f1a730f89c39619db76c5",
  "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "workUnitIds": [
    "review.security-trace"
  ],
  "objectives": [
    {
      "workUnitId": "review.security-trace",
      "objective": "Independently determine whether authority, context, privacy, rendering, and trace bindings fail closed without claiming host enforcement."
    }
  ],
  "modules": [
    {
      "id": "review.security-trace",
      "action": "Review schema closure, semantic authority, privacy, canonical digests, rendering containment, and host boundaries.",
      "inputPorts": [
        {
          "name": "candidate",
          "artifactType": "ReviewCandidate"
        }
      ],
      "outputPorts": [
        {
          "name": "review",
          "artifactType": "SecurityTraceReview"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730"
  ],
  "contextUses": [
    {
      "sourceId": "context.compiler",
      "kind": "repository",
      "locator": "path:src/specialist-compiler.ts",
      "digest": "sha256:2a44dda724b76f60a4853f9992d118831c75b20951dfd115728e8faf07506f80",
      "bytes": 61724,
      "purposes": [
        "Audit fail-closed validation and digests."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "src/specialist-compiler.ts"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:7bd0d06125648e32e26f7671b23e6cfffff640fdbcc903ce26e94298f76d1721",
      "bytes": 23352,
      "purposes": [
        "Review trust and external-host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.compiler-tests",
      "kind": "repository",
      "locator": "path:test/specialist-compiler.test.mjs",
      "digest": "sha256:75820747921e8e8765482f4f5f910e151483e11966511b54b52cb5104b0ff755",
      "bytes": 34973,
      "purposes": [
        "Audit adversarial authority, privacy, and tamper coverage."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "test/specialist-compiler.test.mjs"
    },
    {
      "sourceId": "context.renderer",
      "kind": "repository",
      "locator": "path:src/specialist-render.ts",
      "digest": "sha256:b950f457c675b5b8c908ec972dc0111adef0bbea4ceeda1931b1a47da1f5ecb2",
      "bytes": 9270,
      "purposes": [
        "Audit tamper checks and payload bindings."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "src/specialist-render.ts"
    },
    {
      "sourceId": "context.schema",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/specialist-compiler.schema.json",
      "digest": "sha256:43a52df03c9942915cebdd217a67a5baa686e233a917c37b2c306817db319279",
      "bytes": 14065,
      "purposes": [
        "Audit closed input boundaries."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit provider/runtime exclusion coverage."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Review security acceptance and risks."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/spec.md"
    },
    {
      "sourceId": "context.types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:a88200856211a4df7e6cbdbfa5d61a5e01f4ab461283465ec5ff597b04bdc4ff",
      "bytes": 10330,
      "purposes": [
        "Review authority and trace-bearing types."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "src/specialist-types.ts"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.security-trace"
    ],
    "scope": {
      "read": [
        "docs/specs/v11-specialist-compiler/spec.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "schemas/v1alpha1/specialist-compiler.schema.json",
        "src/specialist-compiler.ts",
        "src/specialist-render.ts",
        "src/specialist-types.ts",
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
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "schemas/v1alpha1/specialist-compiler.schema.json",
          "src/specialist-compiler.ts",
          "src/specialist-render.ts",
          "src/specialist-types.ts",
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
      "criterionId": "criterion.security-trace",
      "criterion": "Authority, context, privacy, rendering, and trace bindings fail closed.",
      "requirementId": "evidence.security-review",
      "kind": "review",
      "duty": "review",
      "description": "Independent security and trace acceptance review.",
      "independentFromProducer": true
    }
  ],
  "handoff": {
    "destination": "v11.integration-owner",
    "artifacts": [
      "security-trace-review.md"
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
    "Stop with REVISE if a blueprint can widen owner authority.",
    "Stop with REVISE if package tampering can retain the reviewed digest."
  ],
  "contentDigest": "sha256:f628ab7888ebae74a9211e8c9ba0dcfd496d73d6e0e0a4decebc44084684ea9c"
}
```
