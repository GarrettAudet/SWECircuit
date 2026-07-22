# Specialist Contract: agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8

Compilation: `sha256:4394f9bbc2be8871b1b04f1b3b8202b43928251bbd8b996cc9cdeb9d5c84c055`
Blueprint: `sha256:053c89d8d154d302dedd80894a8fce098de7ff3eb47920879f42b990db96c41e`

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
  "goalRevision": 41,
  "goalDigest": "sha256:473d720f288ea32e6901bfd259abc5f7b6e738c2e711ae3b6d21b3ca268d2020",
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
      "digest": "sha256:46039f3c3c78511addc1b752193e1b795faaf4c227eae752cf32a29f3c2f866a",
      "bytes": 850,
      "purposes": [
        "Verify formatting and lint coverage."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "biome.json"
    },
    {
      "sourceId": "context.changelog",
      "kind": "repository",
      "locator": "path:CHANGELOG.md",
      "digest": "sha256:ff6307186388d4435050863dd56b3ca5ffd4fab1ee8616f1666d1e2223b3b6f8",
      "bytes": 3512,
      "purposes": [
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
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
      "digest": "sha256:2847895078aa56d9e051f0b399b2e923cce3edc647c2d471c76034fd12159200",
      "bytes": 62973,
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
      "digest": "sha256:548b37682291ca3f93aedf44b15cd49fedfe3d655bcee39e73bcac797c65914c",
      "bytes": 44564,
      "purposes": [
        "Verify the offline packed-consumer gate."
      ],
      "workUnitIds": [
        "verify.release-gates"
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
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "CONTRIBUTING.md"
    },
    {
      "sourceId": "context.diagnostic-catalog",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/diagnostic-catalog.json",
      "digest": "sha256:ca09d174600a7841dcab90b15fe1d95bc9a24f72411704fbe794d2f52dec84a2",
      "bytes": 13307,
      "purposes": [
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "schemas/v1alpha1/diagnostic-catalog.json"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:src/diagnostics.ts",
      "digest": "sha256:3d27fe071994a2a87a59ecadc52a788a6aaf85737b46371f5622bf10c50aede6",
      "bytes": 25190,
      "purposes": [
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.dogfood-runner",
      "kind": "repository",
      "locator": "path:scripts/run-v11-dogfood.mjs",
      "digest": "sha256:0b9079f93dd8efc79a1fd920d621a71520649c7b5749deef306b5dffd645a19e",
      "bytes": 58302,
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
      "digest": "sha256:637f1c44d641a2752186aa5837ae11d57f97d394283e52b6801ebaf29dfb9284",
      "bytes": 43787,
      "purposes": [
        "Execute the host containment regression through the release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "test/v11-dogfood-runner.test.mjs"
    },
    {
      "sourceId": "context.first-run",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/run.mjs",
      "digest": "sha256:b7df4964b1d098b0c61872752af771c1d7ca53d39410b0a138718d7a66e97217",
      "bytes": 14201,
      "purposes": [
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "examples/specialist-compiler/run.mjs"
    },
    {
      "sourceId": "context.first-run-approval",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/approval.json",
      "digest": "sha256:f2e039165920c5b770347672ab0c74e3897430d3a6a008b9b0de044895578f52",
      "bytes": 972,
      "purposes": [
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "examples/specialist-compiler/approval.json"
    },
    {
      "sourceId": "context.first-run-readme",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/README.md",
      "digest": "sha256:58daa1e6d72297faa5189cd38946234fb263736734fb9034185bc7e7a942ee35",
      "bytes": 1122,
      "purposes": [
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "examples/specialist-compiler/README.md"
    },
    {
      "sourceId": "context.first-run-tests",
      "kind": "repository",
      "locator": "path:test/specialist-first-run.test.mjs",
      "digest": "sha256:7b62d8f1b6b7d64e183b308e6a2b55ea64a3a142f480a4fedc2f674b541c681b",
      "bytes": 8984,
      "purposes": [
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "test/specialist-first-run.test.mjs"
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
      "sourceId": "context.gitattributes",
      "kind": "repository",
      "locator": "path:.gitattributes",
      "digest": "sha256:d4bd3516bd21bddcf1877808dd72c76fb2ff724fa24d165a6c719618fe042953",
      "bytes": 501,
      "purposes": [
        "Authenticate the exact repository source-byte normalization policy."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": ".gitattributes"
    },
    {
      "sourceId": "context.handoff",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
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
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "schemas/v1alpha1/specialist-handoff.schema.json"
    },
    {
      "sourceId": "context.handoff-tests",
      "kind": "repository",
      "locator": "path:test/specialist-handoff.test.mjs",
      "digest": "sha256:41d25b24adb4062992012983b4eb99175f371929fb83e522f1723799b3e196af",
      "bytes": 10709,
      "purposes": [
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "test/specialist-handoff.test.mjs"
    },
    {
      "sourceId": "context.json-kernel-tests",
      "kind": "repository",
      "locator": "path:test/json-kernel.test.mjs",
      "digest": "sha256:8dd95ceeb4c5d64f7623b434f067667e4e552537e45705749eba6950c43b6b36",
      "bytes": 8321,
      "purposes": [
        "Run public diagnostic and strict JSON regressions in canonical gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "test/json-kernel.test.mjs"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:9c8e1e3bde18439a6199f0752b7dad1e69fdf713ffac33597d5119d1c26a67fa",
      "bytes": 4043,
      "purposes": [
        "Exercise this source through the canonical release gates."
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
      "digest": "sha256:90633af96b2afaa66dfaddd66e27f2e050dfd0ac5c052f8c1e2413d21db74d00",
      "bytes": 23434,
      "purposes": [
        "Verify installed TypeScript API use."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "scripts/fixtures/packed-consumer-host.ts"
    },
    {
      "sourceId": "context.project-validation-tests",
      "kind": "repository",
      "locator": "path:test/project-validation.test.mjs",
      "digest": "sha256:54cf6bddd932fec496f4d3291f06cdf0873f4b1c2f06d223bb3f1a41eaf3d711",
      "bytes": 18040,
      "purposes": [
        "Verify path-validation regression coverage."
      ],
      "workUnitIds": [
        "verify.release-gates"
      ],
      "readScope": "test/project-validation.test.mjs"
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
      "sourceId": "context.schema-readme",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/README.md",
      "digest": "sha256:e2bd5e0ca5123873d07fe5bdaff4181b38c34a6cbea0220ecb02e78a62f18223",
      "bytes": 20795,
      "purposes": [
        "Exercise this source through the canonical release gates."
      ],
      "workUnitIds": [
        "verify.release-gates"
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
      "digest": "sha256:c09b86f1e427a04aacdbc62f68d05bd61814b7e7744baeb76a4139f2a0ae0a34",
      "bytes": 22340,
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
      "digest": "sha256:5c6fb77dc0a817be6c137805088b408c32b01bc7fc81ccc3f2cd4874014cf424",
      "bytes": 78529,
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
      "digest": "sha256:33c057636bcf96949df1d1311fc8ddee5913370a2b4fdb8f57c99f6ae5e6e882",
      "bytes": 101000,
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
      "digest": "sha256:2b7443465ac1988f83d955c37e4b89c0dfdc15ba7ef57eec7bd7684970038233",
      "bytes": 12409,
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
        ".gitattributes",
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
        "examples/specialist-compiler/README.md",
        "examples/specialist-compiler/approval.json",
        "examples/specialist-compiler/run.mjs",
        "node_modules/**",
        "package-lock.json",
        "package.json",
        "schemas/**",
        "schemas/v1alpha1/README.md",
        "schemas/v1alpha1/common.schema.json",
        "schemas/v1alpha1/diagnostic-catalog.json",
        "schemas/v1alpha1/specialist-compiler.schema.json",
        "schemas/v1alpha1/specialist-handoff.schema.json",
        "scripts/**",
        "scripts/check-packed-consumer.mjs",
        "scripts/check-template.ps1",
        "scripts/fixtures/packed-consumer-host.ts",
        "scripts/run-v11-dogfood.mjs",
        "scripts/test-check-template.ps1",
        "src/**",
        "src/diagnostics.ts",
        "src/specialist-handoff.ts",
        "test/**",
        "test/fixtures/specialist-compiler/conflict-heavy.json",
        "test/fixtures/specialist-compiler/generic-role.json",
        "test/fixtures/specialist-compiler/genuinely-parallel.json",
        "test/fixtures/specialist-compiler/one-agent-optimal.json",
        "test/fixtures/specialist-compiler/over-split.json",
        "test/fixtures/specialist-compiler/under-split.json",
        "test/json-kernel.test.mjs",
        "test/project-validation.test.mjs",
        "test/specialist-compiler.test.mjs",
        "test/specialist-first-run.test.mjs",
        "test/specialist-handoff.test.mjs",
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
          ".gitattributes",
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
          "examples/specialist-compiler/README.md",
          "examples/specialist-compiler/approval.json",
          "examples/specialist-compiler/run.mjs",
          "node_modules/**",
          "package-lock.json",
          "package.json",
          "schemas/**",
          "schemas/v1alpha1/README.md",
          "schemas/v1alpha1/common.schema.json",
          "schemas/v1alpha1/diagnostic-catalog.json",
          "schemas/v1alpha1/specialist-compiler.schema.json",
          "schemas/v1alpha1/specialist-handoff.schema.json",
          "scripts/**",
          "scripts/check-packed-consumer.mjs",
          "scripts/check-template.ps1",
          "scripts/fixtures/packed-consumer-host.ts",
          "scripts/run-v11-dogfood.mjs",
          "scripts/test-check-template.ps1",
          "src/**",
          "src/diagnostics.ts",
          "src/specialist-handoff.ts",
          "test/**",
          "test/fixtures/specialist-compiler/conflict-heavy.json",
          "test/fixtures/specialist-compiler/generic-role.json",
          "test/fixtures/specialist-compiler/genuinely-parallel.json",
          "test/fixtures/specialist-compiler/one-agent-optimal.json",
          "test/fixtures/specialist-compiler/over-split.json",
          "test/fixtures/specialist-compiler/under-split.json",
          "test/json-kernel.test.mjs",
          "test/project-validation.test.mjs",
          "test/specialist-compiler.test.mjs",
          "test/specialist-first-run.test.mjs",
          "test/specialist-handoff.test.mjs",
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
      "criterion": "Read-only first-run with bounded closed approval parsing and a current retained approval, exact receipt-bound prelaunch authorization, strict public schema registry, both clean packed-consumer hosts, canonical verification, raw handoff assessment, integration replay, and source-linked release evidence are complete before owner approval.",
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
    "Before any canonical command, stop with FIX unless TEMP, TMP, and npm cache resolve inside the declared .local/npm-cache/** write authority and no child process inherits another temporary root.",
    "On Windows, stop with FIX unless the full negative checker matrix uses a verified short-path spelling that resolves to the same authorized .local/npm-cache target.",
    "Stop with FIX if any canonical gate fails or cannot be reproduced."
  ],
  "contentDigest": "sha256:053c89d8d154d302dedd80894a8fce098de7ff3eb47920879f42b990db96c41e"
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
  "destination": "v11.integration-owner",
  "goal": {
    "id": "v11.specialist-compiler.release",
    "revision": 41,
    "digest": "sha256:473d720f288ea32e6901bfd259abc5f7b6e738c2e711ae3b6d21b3ca268d2020"
  },
  "agent": {
    "id": "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
    "blueprintDigest": "sha256:053c89d8d154d302dedd80894a8fce098de7ff3eb47920879f42b990db96c41e"
  },
  "compilationDigest": "sha256:4394f9bbc2be8871b1b04f1b3b8202b43928251bbd8b996cc9cdeb9d5c84c055",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "verify.release-gates"
  ],
  "artifacts": [
    {
      "name": "release-gate-evidence.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.release",
      "requirementId": "evidence.release-gates",
      "kind": "test",
      "duty": "verify",
      "status": "pass",
      "artifact": "release-gate-evidence.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
