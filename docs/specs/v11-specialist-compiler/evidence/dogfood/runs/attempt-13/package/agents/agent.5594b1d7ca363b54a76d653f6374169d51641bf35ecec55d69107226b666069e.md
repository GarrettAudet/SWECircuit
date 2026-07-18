# Specialist Contract: agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e

Compilation: `sha256:e285fa743d83da8c340749e96daba48baaf5499ca08fea349d262e890314071b`
Blueprint: `sha256:923d969be91742a7fdc0d7f8c29897ce1410f890caba3f43cf6efb1b5868aa04`

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
  "goalRevision": 13,
  "goalDigest": "sha256:5a558108a12abb0a02fafe900fbb736a81e62605f3fb654f73fd5e4d4fdf718f",
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
      "sourceId": "context.common-schema",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/common.schema.json",
      "digest": "sha256:d3cdcd5d8723477db18a77a2396c6ea475bbc0e1cca44f952a594cc55832e636",
      "bytes": 10709,
      "purposes": [
        "Review the complete package-owned schema surface."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "schemas/v1alpha1/common.schema.json"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:928d1a3b2fb29b84e43007c5f34aef6cf55a78db48ede4bc9e019439083b4944",
      "bytes": 28113,
      "purposes": [
        "Review the human/core/host responsibility boundary."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.consumer-check",
      "kind": "repository",
      "locator": "path:scripts/check-packed-consumer.mjs",
      "digest": "sha256:dcfb0da5a49c05e1ffd8109bf29d58aa2b88a3eaa1dc1eadda5113d61c3b1e76",
      "bytes": 31988,
      "purposes": [
        "Review the executable installed-consumer trust boundary."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.ide-kickoff",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:5c6ef48f2e673f9277de6d60342ce4485a347fe543bd1afc7adc214cc5cf2943",
      "bytes": 13919,
      "purposes": [
        "Review the shortest user-visible compile-and-hand-off path."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/ide/specialist-agent-kickoff.md"
    },
    {
      "sourceId": "context.index",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:b146d7759988bff0a205228f46e39fe53cfe0f42fbe89dbad3a6f8ffdfcf716d",
      "bytes": 4169,
      "purposes": [
        "Review the exact public export inventory."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.packed-consumer-host",
      "kind": "repository",
      "locator": "path:scripts/fixtures/packed-consumer-host.ts",
      "digest": "sha256:d76cea2139ab09be2ee10355bb13933c0feb3180fbb8ebb983b8103102d73f79",
      "bytes": 13506,
      "purposes": [
        "Review installed TypeScript API use and permission-kind parity."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "scripts/fixtures/packed-consumer-host.ts"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:ab830bad7136b1da7adf69ab688243c8e3d0945efef43c343bb3459a5694fe71",
      "bytes": 8375,
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
      "digest": "sha256:4c0bd0928ca1cf121343d0083cb01db73d993b415ac1257f775bdb01ff7dcb5e",
      "bytes": 16073,
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
      "digest": "sha256:860cbe31f1b86676ea35df361e0d1b215aa92e8253bd5de266fded42fe6039cd",
      "bytes": 15392,
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
      "digest": "sha256:c1ea13907cd2efd3619d565bd71474ef808c53fc4c3b6213999dc48efbfd4f50",
      "bytes": 10218,
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
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
      "digest": "sha256:ff85f0f2b87c8e7f0d3ced2feb06f366d7e5c60d8ae3b580d09c9aa724a9f2e5",
      "bytes": 10082,
      "purposes": [
        "Review acceptance and owner fit."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md"
    },
    {
      "sourceId": "context.types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:e50036eff63d6ea232a314e8447e99a767bce40fc0bb49ffcfd15b6c97c3a3bb",
      "bytes": 12070,
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
        "docs/ide/specialist-agent-kickoff.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "schemas/v1alpha1/common.schema.json",
        "schemas/v1alpha1/specialist-compiler.schema.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/fixtures/packed-consumer-host.ts",
        "src/index.ts",
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
          "docs/ide/specialist-agent-kickoff.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "schemas/v1alpha1/common.schema.json",
          "schemas/v1alpha1/specialist-compiler.schema.json",
          "scripts/check-packed-consumer.mjs",
          "scripts/fixtures/packed-consumer-host.ts",
          "src/index.ts",
          "src/specialist-render.ts",
          "src/specialist-types.ts",
          "test/specialist-schema.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "powershell",
          "rg"
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
  "contentDigest": "sha256:923d969be91742a7fdc0d7f8c29897ce1410f890caba3f43cf6efb1b5868aa04"
}
```
