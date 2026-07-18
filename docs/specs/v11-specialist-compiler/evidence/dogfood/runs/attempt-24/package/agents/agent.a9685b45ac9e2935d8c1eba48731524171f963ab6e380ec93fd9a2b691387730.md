# Specialist Contract: agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730

Compilation: `sha256:05fd18cc50e06f872cb9f1a4229970206c2a27383ad8d7f64024f7f7f9d5c9c8`
Blueprint: `sha256:9b496ccf79a5584fc6b53995550e1201c7926423a7f2b2b7d68163f3c8d2cf10`

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
  "id": "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 24,
  "goalDigest": "sha256:5d011337cc8585a0043150c5318d7415a2f31a9e28112701dec5a0d6cf2fd1f2",
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
      "sourceId": "context.agents",
      "kind": "repository",
      "locator": "path:AGENTS.md",
      "digest": "sha256:e1a90a94f89b97ce50da635e8e41d4a9a9bf05c76a591877bb4dba868afa3996",
      "bytes": 16355,
      "purposes": [
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "AGENTS.md"
    },
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
      "sourceId": "context.changelog",
      "kind": "repository",
      "locator": "path:CHANGELOG.md",
      "digest": "sha256:ff6307186388d4435050863dd56b3ca5ffd4fab1ee8616f1666d1e2223b3b6f8",
      "bytes": 3512,
      "purposes": [
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
      "digest": "sha256:2a39a85745de2124464744c9635144e4e878cbea2f2b584ded25adb946798da7",
      "bytes": 69522,
      "purposes": [
        "Bind this exact revision-24 source before independent review."
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
      "digest": "sha256:fe201b40b816b9b70c6527034d2ef5469419762669ae2384c26249bef656db9a",
      "bytes": 35199,
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
      "digest": "sha256:94d1cafb879b78b9e55a20b2425963a34b822e6caf31b48e90001ca8a2f78dcd",
      "bytes": 61814,
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
      "digest": "sha256:f00156e582cafaea19f6db6f55e042422c488b660483f5fccee1d6b1988cee6f",
      "bytes": 2088,
      "purposes": [
        "Bind this exact revision-24 source before independent review."
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
      "digest": "sha256:475573010964cbb5bdcb310bedcade5c9b48b94cefbfcff112cee04e78dc596e",
      "bytes": 36221,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact revision-24 source before independent review."
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
      "digest": "sha256:4e2fda1e112234838057a7bb473687e3125bc369ab210aab99bc449340dd6d51",
      "bytes": 58018,
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
      "digest": "sha256:ed77ade3f6a6295ce86a880237b76e541d5cd44085d1e7a9a6aa1acf30346d65",
      "bytes": 41700,
      "purposes": [
        "Bind the host containment regression before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/v11-dogfood-runner.test.mjs"
    },
    {
      "sourceId": "context.first-run",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/run.mjs",
      "digest": "sha256:03b92fd422336af5aa7b1e94ce667768189afa1e2528818bc6b603133461f047",
      "bytes": 11706,
      "purposes": [
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
      "sourceId": "context.handbook",
      "kind": "repository",
      "locator": "path:docs/ai/handbook.md",
      "digest": "sha256:e0a795da89ab43ea3fed1197ae8e85c0e643735cfd20d49e67728cdfaa639477",
      "bytes": 38968,
      "purposes": [
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
      "digest": "sha256:dfa16eda45276f9caf5f59e12b2a20c5c0650a153b84d04510e0feac754b672b",
      "bytes": 4688,
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
      "sourceId": "context.json-kernel-tests",
      "kind": "repository",
      "locator": "path:test/json-kernel.test.mjs",
      "digest": "sha256:8dd95ceeb4c5d64f7623b434f067667e4e552537e45705749eba6950c43b6b36",
      "bytes": 8321,
      "purposes": [
        "Bind public diagnostic and strict JSON regressions before review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/json-kernel.test.mjs"
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
      "sourceId": "context.module-guide",
      "kind": "repository",
      "locator": "path:docs/modules/specialist-agent-compiler.md",
      "digest": "sha256:4fec62ef4ec859d3a91c621dbac55bb65f34ecabc8f1dbb138b9a5e0ee8b12bf",
      "bytes": 16563,
      "purposes": [
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
      "digest": "sha256:7b2bc97a119e56e2c33d47bae11c48215be75365dc0d7c0c26d804b520580792",
      "bytes": 12803,
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
      "sourceId": "context.project-validation-tests",
      "kind": "repository",
      "locator": "path:test/project-validation.test.mjs",
      "digest": "sha256:54cf6bddd932fec496f4d3291f06cdf0873f4b1c2f06d223bb3f1a41eaf3d711",
      "bytes": 18040,
      "purposes": [
        "Bind path-validation regressions with the exact candidate."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "test/project-validation.test.mjs"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:8ea8aee7464632d386b80a2a7e51cc3273ac0e5da7dd34a689bf05fcf58d909a",
      "bytes": 6909,
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
      "digest": "sha256:1f9976bfe6770f45ed4c6b14d195a2c10d15a353d32d24719f9ef327770aa2c8",
      "bytes": 16637,
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
      "sourceId": "context.schema-readme",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/README.md",
      "digest": "sha256:cc590ae0c4feeceaa3a522b02dda4ab71da53f33aac60a2fe467c297b3119b7e",
      "bytes": 18124,
      "purposes": [
        "Bind this exact revision-24 source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
      "digest": "sha256:665d7dc3ca80393d6772613b25a5064de084e68704abc90645834f68d0c5ca31",
      "bytes": 16407,
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
      "digest": "sha256:7aaf03f50e16bc4917112e560dfd65f3e00a818df07cdca5310128a24e9d8644",
      "bytes": 985,
      "purposes": [
        "Bind this exact candidate source before independent review."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "src/text.ts"
    },
    {
      "sourceId": "context.two-phase-prelaunch-review",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
      "digest": "sha256:58a4b035497f2ffdf20fe4d516c46e86bae3f878554321ae9443fb0bb6ef406e",
      "bytes": 11930,
      "purposes": [
        "Bind the two-phase prelaunch protocol with the release candidate."
      ],
      "workUnitIds": [
        "prepare.candidate"
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
        "src/specialist-handoff-schema.ts",
        "src/specialist-handoff.ts",
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
        "test/json-kernel.test.mjs",
        "test/project-validation.test.mjs",
        "test/specialist-compiler.test.mjs",
        "test/specialist-first-run.test.mjs",
        "test/specialist-handoff.test.mjs",
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
          "src/specialist-handoff-schema.ts",
          "src/specialist-handoff.ts",
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
          "test/json-kernel.test.mjs",
          "test/project-validation.test.mjs",
          "test/specialist-compiler.test.mjs",
          "test/specialist-first-run.test.mjs",
          "test/specialist-handoff.test.mjs",
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
      "criterion": "Candidate construction and analysis, scheduling, selection, handoff identity, dependency closure, and digest semantics are deterministic and accurately claimed.",
      "requirementId": "evidence.algorithm-candidate",
      "kind": "digest",
      "duty": "produce",
      "description": "Content-addressed algorithm and test candidate sources.",
      "independentFromProducer": false
    },
    {
      "criterionId": "criterion.product-api",
      "criterion": "The V11 public compiler, candidate-analysis, package, handoff, fan-in, first-run, and IDE APIs match the owner goal and remain IDE, model, provider, and runtime neutral.",
      "requirementId": "evidence.product-candidate",
      "kind": "digest",
      "duty": "produce",
      "description": "Content-addressed product and API candidate sources.",
      "independentFromProducer": false
    },
    {
      "criterionId": "criterion.security-trace",
      "criterion": "Authority, context, privacy, rendering, raw handoff, proxy and accessor, package, fan-in, and trace boundaries fail closed.",
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
    "Stop if any declared source digest or byte count does not match."
  ],
  "contentDigest": "sha256:9b496ccf79a5584fc6b53995550e1201c7926423a7f2b2b7d68163f3c8d2cf10"
}
```
