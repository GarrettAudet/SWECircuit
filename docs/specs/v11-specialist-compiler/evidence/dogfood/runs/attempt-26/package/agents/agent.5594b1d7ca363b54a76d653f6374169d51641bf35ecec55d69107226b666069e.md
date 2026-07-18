# Specialist Contract: agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e

Compilation: `sha256:f3658ec182621f9a3485915cd260046d70e7fb1dcd84770f5b03ed3c9d05bb8e`
Blueprint: `sha256:51ce736bb9a514adf6422388b93b09bd917b692821f8096abade40abedadbb72`

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
  "id": "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 26,
  "goalDigest": "sha256:927ecd8724e33c6257faac80c1f6c7b1723d9967ca57296197dc1ad69555fda9",
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
      "sourceId": "context.agents",
      "kind": "repository",
      "locator": "path:AGENTS.md",
      "digest": "sha256:e1a90a94f89b97ce50da635e8e41d4a9a9bf05c76a591877bb4dba868afa3996",
      "bytes": 16355,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.changelog",
      "kind": "repository",
      "locator": "path:CHANGELOG.md",
      "digest": "sha256:ff6307186388d4435050863dd56b3ca5ffd4fab1ee8616f1666d1e2223b3b6f8",
      "bytes": 3512,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "CHANGELOG.md"
    },
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
      "sourceId": "context.compiler",
      "kind": "repository",
      "locator": "path:src/specialist-compiler.ts",
      "digest": "sha256:2a39a85745de2124464744c9635144e4e878cbea2f2b584ded25adb946798da7",
      "bytes": 69522,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/specialist-compiler.ts"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:fe201b40b816b9b70c6527034d2ef5469419762669ae2384c26249bef656db9a",
      "bytes": 35199,
      "purposes": [
        "Review the human/core/host responsibility boundary."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:src/constants.ts",
      "digest": "sha256:f00156e582cafaea19f6db6f55e042422c488b660483f5fccee1d6b1988cee6f",
      "bytes": 2088,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.consumer-check",
      "kind": "repository",
      "locator": "path:scripts/check-packed-consumer.mjs",
      "digest": "sha256:475573010964cbb5bdcb310bedcade5c9b48b94cefbfcff112cee04e78dc596e",
      "bytes": 36221,
      "purposes": [
        "Review the executable installed-consumer trust boundary."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.contributing",
      "kind": "repository",
      "locator": "path:CONTRIBUTING.md",
      "digest": "sha256:1e5703e5a85e5ac005b418b1a6499afc06e5f44f9fe0fde3ff64a9b52f2f0a6c",
      "bytes": 2258,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "CONTRIBUTING.md"
    },
    {
      "sourceId": "context.diagnostic-catalog",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/diagnostic-catalog.json",
      "digest": "sha256:816bc731f6f4fab8132430aded14d28a100fef3ab6e0d6f04f25bace2653ad3a",
      "bytes": 12641,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "schemas/v1alpha1/diagnostic-catalog.json"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:src/diagnostics.ts",
      "digest": "sha256:570e2d2349f6e466999f7a8d9c15b0f82342afa4ccd1042729c282e66c4a7f14",
      "bytes": 23891,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.first-run",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/run.mjs",
      "digest": "sha256:03b92fd422336af5aa7b1e94ce667768189afa1e2528818bc6b603133461f047",
      "bytes": 11706,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "examples/specialist-compiler/run.mjs"
    },
    {
      "sourceId": "context.first-run-approval",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/approval.json",
      "digest": "sha256:957e7f53213f1f10ace634e2fa2da0597dfdd7254d32a2212f0a2fac2a6f4091",
      "bytes": 972,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "examples/specialist-compiler/approval.json"
    },
    {
      "sourceId": "context.first-run-readme",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/README.md",
      "digest": "sha256:a8a78bfaa9ddcf6a03febcb425079854205ec8251cef91073e5ca68539d38d7b",
      "bytes": 833,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "examples/specialist-compiler/README.md"
    },
    {
      "sourceId": "context.first-run-tests",
      "kind": "repository",
      "locator": "path:test/specialist-first-run.test.mjs",
      "digest": "sha256:921d8c414d0f01bda1f71e6448bf5c3b9e2ccbcc537d274e313c7ed156db4284",
      "bytes": 3104,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "test/specialist-first-run.test.mjs"
    },
    {
      "sourceId": "context.handbook",
      "kind": "repository",
      "locator": "path:docs/ai/handbook.md",
      "digest": "sha256:e0a795da89ab43ea3fed1197ae8e85c0e643735cfd20d49e67728cdfaa639477",
      "bytes": 38968,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/ai/handbook.md"
    },
    {
      "sourceId": "context.handoff",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:33d5b1f8744f3686775d501920b1353d686a5c59399f9ac03623279dabd7f8bc",
      "bytes": 17644,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/specialist-handoff.ts"
    },
    {
      "sourceId": "context.handoff-schema",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/specialist-handoff.schema.json",
      "digest": "sha256:afade2b11be6db71a17aa35841d292b99e05c6a4c157505c3b649a3f145aa4e9",
      "bytes": 4287,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "schemas/v1alpha1/specialist-handoff.schema.json"
    },
    {
      "sourceId": "context.handoff-schema-loader",
      "kind": "repository",
      "locator": "path:src/specialist-handoff-schema.ts",
      "digest": "sha256:b48779dc0b5e29124e9b689e11613bd850e4a33cf9f65eca8d3a051865ce5911",
      "bytes": 2421,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/specialist-handoff-schema.ts"
    },
    {
      "sourceId": "context.handoff-tests",
      "kind": "repository",
      "locator": "path:test/specialist-handoff.test.mjs",
      "digest": "sha256:b830ad3e4f65e41480d19ab0bed8fd679e4a398443bc513a2bc7833e74dd24de",
      "bytes": 9598,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "test/specialist-handoff.test.mjs"
    },
    {
      "sourceId": "context.ide-kickoff",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:d0652a46d03127b0477b2f7dd91a81eb27bdd6aee753792888ec0f6f9c080159",
      "bytes": 17155,
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
      "digest": "sha256:dfa16eda45276f9caf5f59e12b2a20c5c0650a153b84d04510e0feac754b672b",
      "bytes": 4688,
      "purposes": [
        "Review the exact public export inventory."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.module-guide",
      "kind": "repository",
      "locator": "path:docs/modules/specialist-agent-compiler.md",
      "digest": "sha256:4fec62ef4ec859d3a91c621dbac55bb65f34ecabc8f1dbb138b9a5e0ee8b12bf",
      "bytes": 16563,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/modules/specialist-agent-compiler.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:566dba6c0e46e358eba8fb6aab70b70903c7078896126503a2612e63b5d42e81",
      "bytes": 2472,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.packed-consumer-host",
      "kind": "repository",
      "locator": "path:scripts/fixtures/packed-consumer-host.ts",
      "digest": "sha256:d98aa4151e8149c4bcd06923e236c99e3eea7bd7b4cdb322569219c54beecc3f",
      "bytes": 18231,
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
      "digest": "sha256:bc164b251bfd2c79be1c6bd6a1906e8172d49135b43f3cc48bdb60295abeccb4",
      "bytes": 7487,
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
      "digest": "sha256:1f9976bfe6770f45ed4c6b14d195a2c10d15a353d32d24719f9ef327770aa2c8",
      "bytes": 16637,
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
      "sourceId": "context.schema-readme",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/README.md",
      "digest": "sha256:cc590ae0c4feeceaa3a522b02dda4ab71da53f33aac60a2fe467c297b3119b7e",
      "bytes": 18124,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "schemas/v1alpha1/README.md"
    },
    {
      "sourceId": "context.schema-tests",
      "kind": "repository",
      "locator": "path:test/specialist-schema.test.mjs",
      "digest": "sha256:a3e7cae50268ffa4b396d7053a3d4acc87ff901a6efb1e77f32671a3811caa15",
      "bytes": 12729,
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
      "digest": "sha256:8643c1a4d6f7d4907b2e74c13b19330d04d51c5705ebbba11241031d00ff28f1",
      "bytes": 17832,
      "purposes": [
        "Review acceptance and owner fit."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md"
    },
    {
      "sourceId": "context.two-phase-prelaunch-review",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
      "digest": "sha256:2b7443465ac1988f83d955c37e4b89c0dfdc15ba7ef57eec7bd7684970038233",
      "bytes": 12409,
      "purposes": [
        "Review whether the conditional audit flow remains understandable and usable."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md"
    },
    {
      "sourceId": "context.types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:f0f1384cdef06972e54800d6fd2c57f08b8ebe8a8703b9178e6c3fa78f53e934",
      "bytes": 16047,
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
        "AGENTS.md",
        "CHANGELOG.md",
        "CONTRIBUTING.md",
        "README.md",
        "docs/ai/handbook.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/modules/specialist-agent-compiler.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
        "examples/specialist-compiler/README.md",
        "examples/specialist-compiler/approval.json",
        "examples/specialist-compiler/run.mjs",
        "package.json",
        "schemas/v1alpha1/README.md",
        "schemas/v1alpha1/common.schema.json",
        "schemas/v1alpha1/diagnostic-catalog.json",
        "schemas/v1alpha1/specialist-compiler.schema.json",
        "schemas/v1alpha1/specialist-handoff.schema.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/fixtures/packed-consumer-host.ts",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/index.ts",
        "src/specialist-compiler.ts",
        "src/specialist-handoff-schema.ts",
        "src/specialist-handoff.ts",
        "src/specialist-render.ts",
        "src/specialist-types.ts",
        "test/specialist-first-run.test.mjs",
        "test/specialist-handoff.test.mjs",
        "test/specialist-schema.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "AGENTS.md",
          "CHANGELOG.md",
          "CONTRIBUTING.md",
          "README.md",
          "docs/ai/handbook.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/modules/specialist-agent-compiler.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
          "examples/specialist-compiler/README.md",
          "examples/specialist-compiler/approval.json",
          "examples/specialist-compiler/run.mjs",
          "package.json",
          "schemas/v1alpha1/README.md",
          "schemas/v1alpha1/common.schema.json",
          "schemas/v1alpha1/diagnostic-catalog.json",
          "schemas/v1alpha1/specialist-compiler.schema.json",
          "schemas/v1alpha1/specialist-handoff.schema.json",
          "scripts/check-packed-consumer.mjs",
          "scripts/fixtures/packed-consumer-host.ts",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/index.ts",
          "src/specialist-compiler.ts",
          "src/specialist-handoff-schema.ts",
          "src/specialist-handoff.ts",
          "src/specialist-render.ts",
          "src/specialist-types.ts",
          "test/specialist-first-run.test.mjs",
          "test/specialist-handoff.test.mjs",
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
      "criterion": "The V11 public compiler, candidate-analysis, package, handoff, fan-in, first-run, and IDE APIs match the owner goal and remain IDE, model, provider, and runtime neutral.",
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
    "Stop with REVISE if a generic role can substitute for exact task demand.",
    "Stop with REVISE if the public contract requires a provider or runtime."
  ],
  "contentDigest": "sha256:51ce736bb9a514adf6422388b93b09bd917b692821f8096abade40abedadbb72"
}
```
