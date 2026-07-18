# Specialist Contract: agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc

Compilation: `sha256:db47c3393dca0ede877bf07eecc89cd89cb7241f8380fb65f1ed8513221b2dd7`
Blueprint: `sha256:f96657c67267312938619581860f7136447d6c7f23b51d6f16752f648b7b2169`

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
  "id": "agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 27,
  "goalDigest": "sha256:a31aae035f02012b567cd6bfa502063884bf10d6a5f43c1073da190cd60887d4",
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
      "sourceId": "context.agents",
      "kind": "repository",
      "locator": "path:AGENTS.md",
      "digest": "sha256:29d8e0fec5f98f3a346903bea9ced87f81d5913aa51f75b065686df44c259868",
      "bytes": 16547,
      "purposes": [
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit domain-separated canonical digest construction."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit the transitive package-owned schema boundary."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Review privacy, authority, raw-boundary, and trace behavior."
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
      "digest": "sha256:c6462aae192a4df6d4de44e086c5e465b93c2354df3e153dfa8e9771e530a71b",
      "bytes": 36089,
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
      "digest": "sha256:2847895078aa56d9e051f0b399b2e923cce3edc647c2d471c76034fd12159200",
      "bytes": 62973,
      "purposes": [
        "Audit adversarial authority, privacy, and tamper coverage."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit installed-package verification behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.diagnostic-catalog",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/diagnostic-catalog.json",
      "digest": "sha256:816bc731f6f4fab8132430aded14d28a100fef3ab6e0d6f04f25bace2653ad3a",
      "bytes": 12641,
      "purposes": [
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.dogfood-runner",
      "kind": "repository",
      "locator": "path:scripts/run-v11-dogfood.mjs",
      "digest": "sha256:7531f31271b4992de449af47d15b5c250fac47836abca6c2db665a6771875eda",
      "bytes": 58524,
      "purposes": [
        "Audit external approval separation and evidence verification."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "scripts/run-v11-dogfood.mjs"
    },
    {
      "sourceId": "context.dogfood-runner-tests",
      "kind": "repository",
      "locator": "path:test/v11-dogfood-runner.test.mjs",
      "digest": "sha256:bbb524e5d5b07357b232cde1f5cca10c7c83924280c1da5c6e338b16e40f4f5d",
      "bytes": 41879,
      "purposes": [
        "Audit the direct external-link containment regression."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "examples/specialist-compiler/run.mjs"
    },
    {
      "sourceId": "context.first-run-approval",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/approval.json",
      "digest": "sha256:c23dd3304615b0e825cb0036bd3743474d3a6b813ddcd30cfaa5d3d92ae96987",
      "bytes": 972,
      "purposes": [
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "examples/specialist-compiler/approval.json"
    },
    {
      "sourceId": "context.first-run-tests",
      "kind": "repository",
      "locator": "path:test/specialist-first-run.test.mjs",
      "digest": "sha256:921d8c414d0f01bda1f71e6448bf5c3b9e2ccbcc537d274e313c7ed156db4284",
      "bytes": 3104,
      "purposes": [
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit fixture-driven authority and boundary coverage."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit fixture-driven authority and boundary coverage."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit fixture-driven authority and boundary coverage."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit fixture-driven authority and boundary coverage."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit fixture-driven authority and boundary coverage."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit fixture-driven authority and boundary coverage."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "test/fixtures/specialist-compiler/under-split.json"
    },
    {
      "sourceId": "context.handbook",
      "kind": "repository",
      "locator": "path:docs/ai/handbook.md",
      "digest": "sha256:35143da9a7abcb0172e7e56ea4d98dbab97885e75867b6f706e6c882d120ca5a",
      "bytes": 39158,
      "purposes": [
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "test/specialist-handoff.test.mjs"
    },
    {
      "sourceId": "context.ide-kickoff",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:2dafec3d5540f6e755db9df455a837e2ece839ed7dcf8bb7d09f553f10b4d1ff",
      "bytes": 17490,
      "purposes": [
        "Audit manifest-driven contract resolution and host trust boundaries."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit the public verification and compiler exports."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit strict package compilation parsing."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit public diagnostic scalar safety and secret suppression regressions."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit shared authority and JSON shapes."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "src/model.ts"
    },
    {
      "sourceId": "context.module-guide",
      "kind": "repository",
      "locator": "path:docs/modules/specialist-agent-compiler.md",
      "digest": "sha256:9666af180a394bd72e1277186735303d05138dc7a7d558ab6144000db8f2076b",
      "bytes": 16844,
      "purposes": [
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Authenticate the exact executed TypeScript host and its structured approval receipt."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit portable path-segment containment helpers."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit permission grammar and ceiling narrowing."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit secret rejection behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit relative and explicit path scalar rejection."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "test/project-validation.test.mjs"
    },
    {
      "sourceId": "context.renderer",
      "kind": "repository",
      "locator": "path:src/specialist-render.ts",
      "digest": "sha256:d6c531f48ea20e5b03b01d975ea3540bd3ac53925ad7fdd2408ba050ee87a1b9",
      "bytes": 19141,
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
      "digest": "sha256:860cbe31f1b86676ea35df361e0d1b215aa92e8253bd5de266fded42fe6039cd",
      "bytes": 15392,
      "purposes": [
        "Audit closed input boundaries."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "schemas/v1alpha1/specialist-compiler.schema.json"
    },
    {
      "sourceId": "context.schema-readme",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/README.md",
      "digest": "sha256:206d8cd286cad11c63551c8b43e427e174b40a80755b86694fc659092982cae3",
      "bytes": 18324,
      "purposes": [
        "Review privacy, authority, raw-boundary, and trace behavior."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit provider/runtime exclusion coverage."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit shared diagnostic and evidence contracts."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit hostile-input detachment and bounds."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "src/snapshot.ts"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
      "digest": "sha256:487582b09aa3f38be3832a56177778e69ee84a54d49ae06ff0b3597547760e7a",
      "bytes": 18871,
      "purposes": [
        "Review security acceptance and risks."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit closed schema dispatch."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "Audit control-character rejection."
      ],
      "workUnitIds": [
        "review.security-trace"
      ],
      "readScope": "src/text.ts"
    },
    {
      "sourceId": "context.two-phase-prelaunch-review",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
      "digest": "sha256:2b7443465ac1988f83d955c37e4b89c0dfdc15ba7ef57eec7bd7684970038233",
      "bytes": 12409,
      "purposes": [
        "Audit the explicit trust root, read-only authority, and launch-order boundary."
      ],
      "workUnitIds": [
        "review.security-trace"
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
        "AGENTS.md",
        "docs/ai/handbook.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/modules/specialist-agent-compiler.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
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
          "docs/ai/handbook.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/modules/specialist-agent-compiler.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
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
          "node",
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
      "criterionId": "criterion.security-trace",
      "criterion": "Authority, context, privacy, rendering, raw handoff, proxy and accessor, package, fan-in, and trace boundaries fail closed.",
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
    "Stop with REVISE if a blueprint can widen owner authority.",
    "Stop with REVISE if escaped or raw malformed Unicode reaches a launchable semantic handoff.",
    "Stop with REVISE if package tampering can retain the reviewed digest."
  ],
  "contentDigest": "sha256:f96657c67267312938619581860f7136447d6c7f23b51d6f16752f648b7b2169"
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
    "revision": 27,
    "digest": "sha256:a31aae035f02012b567cd6bfa502063884bf10d6a5f43c1073da190cd60887d4"
  },
  "agent": {
    "id": "agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc",
    "blueprintDigest": "sha256:f96657c67267312938619581860f7136447d6c7f23b51d6f16752f648b7b2169"
  },
  "compilationDigest": "sha256:db47c3393dca0ede877bf07eecc89cd89cb7241f8380fb65f1ed8513221b2dd7",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.security-trace"
  ],
  "artifacts": [
    {
      "name": "security-trace-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.security-trace",
      "requirementId": "evidence.security-review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "security-trace-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
