# Specialist Contract: agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8

Compilation: `sha256:ec43b1976764681faca6e43dcdf34c85f9efced49afb97d4569be1cac75d9406`
Blueprint: `sha256:35a70da6a28992d0cfe6ea3d31c91d5184ea1aced6c188da0672ac26ec2040e5`

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
  "id": "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 20,
  "goalDigest": "sha256:e2498ab834075d74858b26ae8714f0d3394c2d8d56acd71231f5c75526f21a98",
  "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "workUnitIds": [
    "verify.release-gates"
  ],
  "objectives": [
    {
      "workUnitId": "verify.release-gates",
      "objective": "Independently verify the strict schema, specialist golden suite, authority-contained full kernel gate, package dry run, installed consumer, and template checker evidence."
    }
  ],
  "modules": [
    {
      "id": "verify.release-gates",
      "action": "Re-run and inspect every canonical V11 release gate with all temporary workspaces contained inside declared authority.",
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
      "sourceId": "context.biome",
      "kind": "repository",
      "locator": "path:biome.json",
      "digest": "sha256:ea4eb70aadd5e9fb08ff3fdbbcc654cf676fdc2ba791163ac856faa1791279bd",
      "bytes": 735,
      "purposes": [
        "Verify formatting and lint coverage."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "biome.json"
    },
    {
      "sourceId": "context.common-schema",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/common.schema.json",
      "digest": "sha256:d3cdcd5d8723477db18a77a2396c6ea475bbc0e1cca44f952a594cc55832e636",
      "bytes": 10709,
      "purposes": [
        "Verify the complete packaged schema closure."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "schemas/v1alpha1/common.schema.json"
    },
    {
      "sourceId": "context.compiler-tests",
      "kind": "repository",
      "locator": "path:test/specialist-compiler.test.mjs",
      "digest": "sha256:aaaf4fad943c6bf00ebd71019a8f68183008fc8332030619bc03eb90b9e93abc",
      "bytes": 58929,
      "purposes": [
        "Verify the golden suite."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "test/specialist-compiler.test.mjs"
    },
    {
      "sourceId": "context.consumer-check",
      "kind": "repository",
      "locator": "path:scripts/check-packed-consumer.mjs",
      "digest": "sha256:2ce5aaf1cbfa6dbf848b73967eb8ce2a98c9e6c34d20eedb96c56f0dd1fde6d3",
      "bytes": 32206,
      "purposes": [
        "Verify the offline packed-consumer gate."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.dogfood-runner",
      "kind": "repository",
      "locator": "path:scripts/run-v11-dogfood.mjs",
      "digest": "sha256:4123236663693f6d49eefb762cecc31622716ac56d89eeebc14adc1d9a7afcf3",
      "bytes": 57492,
      "purposes": [
        "Verify committed V11 dogfood evidence."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "scripts/run-v11-dogfood.mjs"
    },
    {
      "sourceId": "context.dogfood-runner-tests",
      "kind": "repository",
      "locator": "path:test/v11-dogfood-runner.test.mjs",
      "digest": "sha256:9f046866bb3fb712339d1881a48e5bd16452a9c77d1aedcfb64cc12949922dba",
      "bytes": 38410,
      "purposes": [
        "Execute the host containment regression through the release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
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
        "Execute the bound golden fixture through the release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
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
        "Execute the bound golden fixture through the release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
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
        "Execute the bound golden fixture through the release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
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
        "Execute the bound golden fixture through the release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
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
        "Execute the bound golden fixture through the release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
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
        "Execute the bound golden fixture through the release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "test/fixtures/specialist-compiler/under-split.json"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:3010600631a5b98f1e1cb77c3989d59c3c1b3ccc1ef995faeb1151aee838e54f",
      "bytes": 2183,
      "purposes": [
        "Resolve the canonical release commands."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.packed-consumer-host",
      "kind": "repository",
      "locator": "path:scripts/fixtures/packed-consumer-host.ts",
      "digest": "sha256:b758ee12c42b95e001451d109bf124c8d9e928d51187a8a7219f982a1acdf5ab",
      "bytes": 13753,
      "purposes": [
        "Verify installed TypeScript API use."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "scripts/fixtures/packed-consumer-host.ts"
    },
    {
      "sourceId": "context.schema",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/specialist-compiler.schema.json",
      "digest": "sha256:860cbe31f1b86676ea35df361e0d1b215aa92e8253bd5de266fded42fe6039cd",
      "bytes": 15392,
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
      "digest": "sha256:c1ea13907cd2efd3619d565bd71474ef808c53fc4c3b6213999dc48efbfd4f50",
      "bytes": 10218,
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
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
      "digest": "sha256:2af9814265717e8fb46193b880a6562b1a4a259607229342c60cd3fea9070757",
      "bytes": 12468,
      "purposes": [
        "Map gates to acceptance criteria."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md"
    },
    {
      "sourceId": "context.template-checker",
      "kind": "repository",
      "locator": "path:scripts/check-template.ps1",
      "digest": "sha256:b1409d0b5110d7226de69f42b6ae37c5bae24c8347f43e8a9e190179213b398a",
      "bytes": 77532,
      "purposes": [
        "Verify workflow artifact checks."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "scripts/check-template.ps1"
    },
    {
      "sourceId": "context.template-checker-tests",
      "kind": "repository",
      "locator": "path:scripts/test-check-template.ps1",
      "digest": "sha256:20bf8df6a84620dcc99faaffcfbb876b0d16b61f31074932342c2f353ed9747f",
      "bytes": 79833,
      "purposes": [
        "Verify checker regression coverage."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "scripts/test-check-template.ps1"
    },
    {
      "sourceId": "context.two-phase-prelaunch-review",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
      "digest": "sha256:58a4b035497f2ffdf20fe4d516c46e86bae3f878554321ae9443fb0bb6ef406e",
      "bytes": 11930,
      "purposes": [
        "Verify the two-phase dogfood host and committed evidence."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "verify.release"
    ],
    "scope": {
      "read": [
        ".git/**",
        ".github/**",
        "AGENTS.md",
        "CHANGELOG.md",
        "CONTRIBUTING.md",
        "LICENSE",
        "README.md",
        "SECURITY.md",
        "SUPPORT.md",
        "biome.json",
        "dist/**",
        "docs/**",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
        "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
        "node_modules/**",
        "package-lock.json",
        "package.json",
        "schemas/**",
        "schemas/v1alpha1/common.schema.json",
        "schemas/v1alpha1/specialist-compiler.schema.json",
        "scripts/**",
        "scripts/check-packed-consumer.mjs",
        "scripts/check-template.ps1",
        "scripts/fixtures/packed-consumer-host.ts",
        "scripts/run-v11-dogfood.mjs",
        "scripts/test-check-template.ps1",
        "src/**",
        "test/**",
        "test/fixtures/specialist-compiler/conflict-heavy.json",
        "test/fixtures/specialist-compiler/generic-role.json",
        "test/fixtures/specialist-compiler/genuinely-parallel.json",
        "test/fixtures/specialist-compiler/one-agent-optimal.json",
        "test/fixtures/specialist-compiler/over-split.json",
        "test/fixtures/specialist-compiler/under-split.json",
        "test/specialist-compiler.test.mjs",
        "test/specialist-schema.test.mjs",
        "test/v11-dogfood-runner.test.mjs",
        "tsconfig.json"
      ],
      "write": [
        ".local/npm-cache/**",
        "dist/**"
      ],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".git/**",
          ".github/**",
          "AGENTS.md",
          "CHANGELOG.md",
          "CONTRIBUTING.md",
          "LICENSE",
          "README.md",
          "SECURITY.md",
          "SUPPORT.md",
          "biome.json",
          "dist/**",
          "docs/**",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
          "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
          "node_modules/**",
          "package-lock.json",
          "package.json",
          "schemas/**",
          "schemas/v1alpha1/common.schema.json",
          "schemas/v1alpha1/specialist-compiler.schema.json",
          "scripts/**",
          "scripts/check-packed-consumer.mjs",
          "scripts/check-template.ps1",
          "scripts/fixtures/packed-consumer-host.ts",
          "scripts/run-v11-dogfood.mjs",
          "scripts/test-check-template.ps1",
          "src/**",
          "test/**",
          "test/fixtures/specialist-compiler/conflict-heavy.json",
          "test/fixtures/specialist-compiler/generic-role.json",
          "test/fixtures/specialist-compiler/genuinely-parallel.json",
          "test/fixtures/specialist-compiler/one-agent-optimal.json",
          "test/fixtures/specialist-compiler/over-split.json",
          "test/fixtures/specialist-compiler/under-split.json",
          "test/specialist-compiler.test.mjs",
          "test/specialist-schema.test.mjs",
          "test/v11-dogfood-runner.test.mjs",
          "tsconfig.json"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          ".local/npm-cache/**",
          "dist/**"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "git",
          "node",
          "npm.cmd",
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
    "Before any canonical command, stop with FIX unless TEMP, TMP, and npm cache resolve inside the declared .local/npm-cache/** write authority and no child process inherits another temporary root.",
    "On Windows, stop with FIX unless the full negative checker matrix uses a verified short-path spelling that resolves to the same authorized .local/npm-cache target.",
    "Stop with FIX if any canonical gate fails or cannot be reproduced."
  ],
  "contentDigest": "sha256:35a70da6a28992d0cfe6ea3d31c91d5184ea1aced6c188da0672ac26ec2040e5"
}
```
