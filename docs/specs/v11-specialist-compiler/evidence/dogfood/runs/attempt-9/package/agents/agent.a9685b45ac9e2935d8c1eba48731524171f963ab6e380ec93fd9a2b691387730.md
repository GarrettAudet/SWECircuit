# Specialist Contract: agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730

Compilation: `sha256:93deaeb96c0565c5e83c5d32037b88935462577c7ca7399fc8bf47e8b20156fe`
Blueprint: `sha256:7a906160c757fe0cb7c64b37c4c3cc39b333786d3c6ef1327be63c29c90bd891`

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
  "id": "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 9,
  "goalDigest": "sha256:96f2ecbff2a7ad8030af34e324e2180e89a3aa5ffa88cb83d30174201f615b50",
  "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "workUnitIds": [
    "prepare.candidate"
  ],
  "objectives": [
    {
      "workUnitId": "prepare.candidate",
      "objective": "Confirm the reviewed product, algorithm, and security sources match their declared content digests before independent review."
    }
  ],
  "modules": [
    {
      "id": "review.prepare",
      "action": "Bind one immutable review candidate to exact source evidence.",
      "inputPorts": [
        {
          "name": "sources",
          "artifactType": "CandidateSources"
        }
      ],
      "outputPorts": [
        {
          "name": "candidate",
          "artifactType": "ReviewCandidate"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.canonical-json",
      "kind": "repository",
      "locator": "path:src/canonical-json.ts",
      "digest": "sha256:6dfb9cb7f7c5be5755b370b82c5230c9e4d3c3a350e6fe0fef3948b1b03d42ac",
      "bytes": 7405,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/canonical-json.ts"
    },
    {
      "sourceId": "context.common-schema",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/common.schema.json",
      "digest": "sha256:d3cdcd5d8723477db18a77a2396c6ea475bbc0e1cca44f952a594cc55832e636",
      "bytes": 10709,
      "purposes": [
        "Bind the transitive shared schema before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "schemas/v1alpha1/common.schema.json"
    },
    {
      "sourceId": "context.compiler",
      "kind": "repository",
      "locator": "path:src/specialist-compiler.ts",
      "digest": "sha256:fb1b901a2bd8e398ab57f08b4f353b9d18c22075965f41b50a88ef169268f98c",
      "bytes": 65907,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/specialist-compiler.ts"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:928d1a3b2fb29b84e43007c5f34aef6cf55a78db48ede4bc9e019439083b4944",
      "bytes": 28113,
      "purposes": [
        "Bind the normative compiler contract."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.compiler-tests",
      "kind": "repository",
      "locator": "path:test/specialist-compiler.test.mjs",
      "digest": "sha256:16faca5532c6041a34cf37aeda21682c74a1ae00858168c2b994b73553367a45",
      "bytes": 53441,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/specialist-compiler.test.mjs"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:src/constants.ts",
      "digest": "sha256:c3526b49f3f1f54ce8db3dfb7af7dabe6944a02543b5702d08567c2a17cc466b",
      "bytes": 1883,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.consumer-check",
      "kind": "repository",
      "locator": "path:scripts/check-packed-consumer.mjs",
      "digest": "sha256:1e6d98ba03339ebaf43b15b5a36679a1bfaab6731579f63c5cf302c1fe8cd193",
      "bytes": 31775,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:src/diagnostics.ts",
      "digest": "sha256:3e9e250dbade0f9ba3275b50d21fe977df729eb9fbf203e8419ac3d9a2b5b25d",
      "bytes": 22284,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.dogfood-runner",
      "kind": "repository",
      "locator": "path:scripts/run-v11-dogfood.mjs",
      "digest": "sha256:7cf33e91313cbe791f003920d26334860dc3829033c7b4477b8ae361692cbe13",
      "bytes": 24889,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "scripts/run-v11-dogfood.mjs"
    },
    {
      "sourceId": "context.dogfood-runner-tests",
      "kind": "repository",
      "locator": "path:test/v11-dogfood-runner.test.mjs",
      "digest": "sha256:1d95a195b35f5788f931a0f4dade31db92b42600a678e9fa85137d7d4556b8fc",
      "bytes": 9995,
      "purposes": [
        "Bind the host containment regression before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/v11-dogfood-runner.test.mjs"
    },
    {
      "sourceId": "context.fixture.conflict-heavy",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/conflict-heavy.json",
      "digest": "sha256:27fe1679095f6d86017a388e6b83ee6922ec30ba0bd598a1d5c7c2aeaed94dee",
      "bytes": 6260,
      "purposes": [
        "Bind this exact golden fixture before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/fixtures/specialist-compiler/conflict-heavy.json"
    },
    {
      "sourceId": "context.fixture.generic-role",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/generic-role.json",
      "digest": "sha256:6801c238c2500f8fa8c4414de1cc3b88921d9c08e667692f49321187a9bef955",
      "bytes": 4420,
      "purposes": [
        "Bind this exact golden fixture before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/fixtures/specialist-compiler/generic-role.json"
    },
    {
      "sourceId": "context.fixture.genuinely-parallel",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/genuinely-parallel.json",
      "digest": "sha256:8119915f5b41d4eff112e52008f0d7a9a9e5c9f522c41d28419637ef0d290019",
      "bytes": 6260,
      "purposes": [
        "Bind this exact golden fixture before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/fixtures/specialist-compiler/genuinely-parallel.json"
    },
    {
      "sourceId": "context.fixture.one-agent-optimal",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/one-agent-optimal.json",
      "digest": "sha256:bebb10dc99b89660d672d0ce25de1ef09f951a0a76716b282a0c2945b2e36f67",
      "bytes": 6314,
      "purposes": [
        "Bind this exact golden fixture before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/fixtures/specialist-compiler/one-agent-optimal.json"
    },
    {
      "sourceId": "context.fixture.over-split",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/over-split.json",
      "digest": "sha256:a22160147debf2bf7361975a3b4900199d38059d6de3f596bec3e7fd1b9e3f1b",
      "bytes": 8159,
      "purposes": [
        "Bind this exact golden fixture before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/fixtures/specialist-compiler/over-split.json"
    },
    {
      "sourceId": "context.fixture.under-split",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/under-split.json",
      "digest": "sha256:3ef5d99ff5fd47f6ddf0b46d30effa513488d6806bb275ba598871e93a9c537c",
      "bytes": 6224,
      "purposes": [
        "Bind this exact golden fixture before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/fixtures/specialist-compiler/under-split.json"
    },
    {
      "sourceId": "context.ide-kickoff",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:5c6ef48f2e673f9277de6d60342ce4485a347fe543bd1afc7adc214cc5cf2943",
      "bytes": 13919,
      "purposes": [
        "Bind the corrected IDE handoff protocol before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.json",
      "kind": "repository",
      "locator": "path:src/json.ts",
      "digest": "sha256:a1f119ecb906ccf5d8397d2ce84e7b357ef5276df2ac448c99cc498d963c8a8a",
      "bytes": 4808,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/json.ts"
    },
    {
      "sourceId": "context.model",
      "kind": "repository",
      "locator": "path:src/model.ts",
      "digest": "sha256:c67bf6036ec16d40516bcf01a49e8714f82588e29a9c596b117dc73c36cf4b83",
      "bytes": 5961,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/model.ts"
    },
    {
      "sourceId": "context.packed-consumer-host",
      "kind": "repository",
      "locator": "path:scripts/fixtures/packed-consumer-host.ts",
      "digest": "sha256:623eec4040a539333a1ec1274e669c12ae81ffe7589b8cdb80b88124f0efbae2",
      "bytes": 13114,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "scripts/fixtures/packed-consumer-host.ts"
    },
    {
      "sourceId": "context.path",
      "kind": "repository",
      "locator": "path:src/path.ts",
      "digest": "sha256:fd7c8dbbb09f09f5f033cac64a3afaeb86fcc4c50bf38a7afc510f4f9606daa9",
      "bytes": 12676,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/path.ts"
    },
    {
      "sourceId": "context.permissions",
      "kind": "repository",
      "locator": "path:src/permissions.ts",
      "digest": "sha256:d6e39db2221715490b58ace95e87514f0a5c0a76a38225f02ccec15a37d74523",
      "bytes": 3484,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/permissions.ts"
    },
    {
      "sourceId": "context.privacy",
      "kind": "repository",
      "locator": "path:src/privacy.ts",
      "digest": "sha256:e6ffecf6135e7369913e51df78a522dcb3de3907d698f7f7cd2c1e7117ac972c",
      "bytes": 1047,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/privacy.ts"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:ab830bad7136b1da7adf69ab688243c8e3d0945efef43c343bb3459a5694fe71",
      "bytes": 8375,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/specialist-schema.test.mjs"
    },
    {
      "sourceId": "context.shared-types",
      "kind": "repository",
      "locator": "path:src/types.ts",
      "digest": "sha256:61877d77f8a1d5ab496491f1a462e74142572d4acac953958add18d9a62bee37",
      "bytes": 4140,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/types.ts"
    },
    {
      "sourceId": "context.snapshot",
      "kind": "repository",
      "locator": "path:src/snapshot.ts",
      "digest": "sha256:4def623274433afd49467c46aceae479115a881a13af3c6359f908772a19ca1e",
      "bytes": 5045,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/snapshot.ts"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
      "digest": "sha256:ff85f0f2b87c8e7f0d3ced2feb06f366d7e5c60d8ae3b580d09c9aa724a9f2e5",
      "bytes": 10082,
      "purposes": [
        "Bind the product acceptance contract."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md"
    },
    {
      "sourceId": "context.specialist-schema",
      "kind": "repository",
      "locator": "path:src/specialist-schema.ts",
      "digest": "sha256:e59a903d0fab9ba58de19032969107fe6d517526a153ce8e6bc081360b1a4799",
      "bytes": 2968,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/specialist-schema.ts"
    },
    {
      "sourceId": "context.text",
      "kind": "repository",
      "locator": "path:src/text.ts",
      "digest": "sha256:d6b14128b1c83bc05294f4d9486b912b0604a6f808cf849e0875d9b35e4d7374",
      "bytes": 275,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/text.ts"
    },
    {
      "sourceId": "context.types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:e50036eff63d6ea232a314e8447e99a767bce40fc0bb49ffcfd15b6c97c3a3bb",
      "bytes": 12070,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/specialist-types.ts"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "candidate.bind"
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
        "scripts/run-v11-dogfood.mjs",
        "src/canonical-json.ts",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/index.ts",
        "src/json.ts",
        "src/model.ts",
        "src/path.ts",
        "src/permissions.ts",
        "src/privacy.ts",
        "src/snapshot.ts",
        "src/specialist-compiler.ts",
        "src/specialist-render.ts",
        "src/specialist-schema.ts",
        "src/specialist-types.ts",
        "src/text.ts",
        "src/types.ts",
        "test/fixtures/specialist-compiler/conflict-heavy.json",
        "test/fixtures/specialist-compiler/generic-role.json",
        "test/fixtures/specialist-compiler/genuinely-parallel.json",
        "test/fixtures/specialist-compiler/one-agent-optimal.json",
        "test/fixtures/specialist-compiler/over-split.json",
        "test/fixtures/specialist-compiler/under-split.json",
        "test/specialist-compiler.test.mjs",
        "test/specialist-schema.test.mjs",
        "test/v11-dogfood-runner.test.mjs"
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
          "scripts/run-v11-dogfood.mjs",
          "src/canonical-json.ts",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/index.ts",
          "src/json.ts",
          "src/model.ts",
          "src/path.ts",
          "src/permissions.ts",
          "src/privacy.ts",
          "src/snapshot.ts",
          "src/specialist-compiler.ts",
          "src/specialist-render.ts",
          "src/specialist-schema.ts",
          "src/specialist-types.ts",
          "src/text.ts",
          "src/types.ts",
          "test/fixtures/specialist-compiler/conflict-heavy.json",
          "test/fixtures/specialist-compiler/generic-role.json",
          "test/fixtures/specialist-compiler/genuinely-parallel.json",
          "test/fixtures/specialist-compiler/one-agent-optimal.json",
          "test/fixtures/specialist-compiler/over-split.json",
          "test/fixtures/specialist-compiler/under-split.json",
          "test/specialist-compiler.test.mjs",
          "test/specialist-schema.test.mjs",
          "test/v11-dogfood-runner.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "powershell"
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
      "criterionId": "criterion.algorithm",
      "criterion": "Candidate construction, scheduling, selection, and digest semantics are deterministic and accurately claimed.",
      "requirementId": "evidence.algorithm-candidate",
      "kind": "digest",
      "duty": "produce",
      "description": "Content-addressed algorithm and test candidate sources.",
      "independentFromProducer": false
    },
    {
      "criterionId": "criterion.product-api",
      "criterion": "The V11 product and public API match the owner goal and remain IDE, model, and provider neutral.",
      "requirementId": "evidence.product-candidate",
      "kind": "digest",
      "duty": "produce",
      "description": "Content-addressed product and API candidate sources.",
      "independentFromProducer": false
    },
    {
      "criterionId": "criterion.security-trace",
      "criterion": "Authority, context, privacy, rendering, and trace bindings fail closed.",
      "requirementId": "evidence.security-candidate",
      "kind": "digest",
      "duty": "produce",
      "description": "Content-addressed security and trace candidate sources.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "v11.integration-owner",
    "artifacts": [
      "review-candidate-digests.json"
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
    "Stop if any declared source digest or byte count does not match."
  ],
  "contentDigest": "sha256:7a906160c757fe0cb7c64b37c4c3cc39b333786d3c6ef1327be63c29c90bd891"
}
```
