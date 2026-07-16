# Specialist Contract: agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e

Compilation: `sha256:32f615017d7f5b0f7648a6818420857c0ffb258aa6a721d94c685da08b8c6254`
Blueprint: `sha256:522782f4d3ba626c9385413600e31f9de29fd40114b74b5fbf62cb67d3092a04`

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
  "id": "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 1,
  "goalDigest": "sha256:325b614ef60ec1260576c8ac42a5d780a9d132cdac3f1a730f89c39619db76c5",
  "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "workUnitIds": [
    "review.product-api"
  ],
  "objectives": [
    {
      "workUnitId": "review.product-api",
      "objective": "Independently determine whether V11 solves the owner goal with a clear, minimal, IDE-agnostic public contract."
    }
  ],
  "modules": [
    {
      "id": "review.product-api",
      "action": "Review product fit, public API closure, usability, and claimed boundaries.",
      "inputPorts": [
        {
          "name": "candidate",
          "artifactType": "ReviewCandidate"
        }
      ],
      "outputPorts": [
        {
          "name": "review",
          "artifactType": "ProductApiReview"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730"
  ],
  "contextUses": [
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:7bd0d06125648e32e26f7671b23e6cfffff640fdbcc903ce26e94298f76d1721",
      "bytes": 23352,
      "purposes": [
        "Review the human/core/host responsibility boundary."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:d1187705b49bcf3ba879ccb507c847e38927fd9794dd4e5670854083fea72b38",
      "bytes": 8137,
      "purposes": [
        "Review public positioning and clarity."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "README.md"
    },
    {
      "sourceId": "context.renderer",
      "kind": "repository",
      "locator": "path:src/specialist-render.ts",
      "digest": "sha256:b950f457c675b5b8c908ec972dc0111adef0bbea4ceeda1931b1a47da1f5ecb2",
      "bytes": 9270,
      "purposes": [
        "Review the portable launch package."
      ],
      "workUnitIds": [
        "review.product-api"
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
        "Review the closed provider-neutral input."
      ],
      "workUnitIds": [
        "review.product-api"
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
        "Review installed and provider-neutral schema evidence."
      ],
      "workUnitIds": [
        "review.product-api"
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
        "Review acceptance and owner fit."
      ],
      "workUnitIds": [
        "review.product-api"
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
        "Review the additive public type surface."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/specialist-types.ts"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.product-api"
    ],
    "scope": {
      "read": [
        "README.md",
        "docs/specs/v11-specialist-compiler/spec.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "schemas/v1alpha1/specialist-compiler.schema.json",
        "src/specialist-render.ts",
        "src/specialist-types.ts",
        "test/specialist-schema.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "README.md",
          "docs/specs/v11-specialist-compiler/spec.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "schemas/v1alpha1/specialist-compiler.schema.json",
          "src/specialist-render.ts",
          "src/specialist-types.ts",
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
      "criterionId": "criterion.product-api",
      "criterion": "The V11 product and public API match the owner goal and remain IDE, model, and provider neutral.",
      "requirementId": "evidence.product-review",
      "kind": "review",
      "duty": "review",
      "description": "Independent product and API acceptance review.",
      "independentFromProducer": true
    }
  ],
  "handoff": {
    "destination": "v11.integration-owner",
    "artifacts": [
      "product-api-review.md"
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
    "Stop with REVISE if a generic role can substitute for exact task demand.",
    "Stop with REVISE if the public contract requires a provider or runtime."
  ],
  "contentDigest": "sha256:522782f4d3ba626c9385413600e31f9de29fd40114b74b5fbf62cb67d3092a04"
}
```
