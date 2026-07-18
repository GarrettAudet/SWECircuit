# Specialist Contract: agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64

Compilation: `sha256:f9a0de491c7b015257a34752d72b41a16bae964f5b5268fb973289be0beb3f7b`
Blueprint: `sha256:8998d4739c652743fa646ab00ff22b4434d6fb012c603f79be67fc3cc8dca595`

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
  "id": "agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64",
  "goalId": "v11.specialist-compiler.prelaunch-audit",
  "goalRevision": 16,
  "goalDigest": "sha256:b5e7b2e02b9889fda2a2d924731959287d94054370f43d85bcb97a9ae99be518",
  "candidateId": "team.357beba7ab91a91ad49896b7d31e2fb6c61d9277c3d50582a02bad331a809b12",
  "workUnitIds": [
    "audit.review-candidate-compilation"
  ],
  "objectives": [
    {
      "workUnitId": "audit.review-candidate-compilation",
      "objective": "Independently audit the exact candidate selection, authority, evidence coverage, schedule, digests, and rendered contracts."
    }
  ],
  "modules": [
    {
      "id": "audit.review-candidate-compilation",
      "action": "Reproduce and review the frozen candidate compilation and package before launch.",
      "inputPorts": [
        {
          "name": "binding",
          "artifactType": "CandidateAuditBinding"
        }
      ],
      "outputPorts": [
        {
          "name": "review",
          "artifactType": "CandidateCompilationReview"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6"
  ],
  "contextUses": [
    {
      "sourceId": "context.candidate-artifact.01",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
      "digest": "sha256:6f00e9b85a569147e8b20bff3d66be49ae7120e47e3d25fd06fd51eccceef8cd",
      "bytes": 226627,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json"
    },
    {
      "sourceId": "context.candidate-artifact.02",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972.md",
      "digest": "sha256:7bf26855fe514dc4c9ca39be6e5aee9e514241bd3167fda76ee570f9b88213f7",
      "bytes": 13788,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972.md"
    },
    {
      "sourceId": "context.candidate-artifact.03",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9.md",
      "digest": "sha256:f6c84458a9a1b185cb96e8c47a06f2f486c39db9351c62d09ef1e83479177f08",
      "bytes": 8556,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9.md"
    },
    {
      "sourceId": "context.candidate-artifact.04",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e.md",
      "digest": "sha256:ac307f814e47ed62f0b8454bdb04a51245edbd3eb6172e38af00b86b8f6c293c",
      "bytes": 11594,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e.md"
    },
    {
      "sourceId": "context.candidate-artifact.05",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8.md",
      "digest": "sha256:49ff98a856b3589f50309f2711661b7fbb0c9575d9ce6f90538579d5ccddcbbb",
      "bytes": 16842,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8.md"
    },
    {
      "sourceId": "context.candidate-artifact.06",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc.md",
      "digest": "sha256:9a622ba4dddd89d018802ee38549e78a0c6b7af868fb0a5ef16523ebe14515ea",
      "bytes": 23011,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc.md"
    },
    {
      "sourceId": "context.candidate-artifact.07",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730.md",
      "digest": "sha256:38c710b8beacee30f2fc98422cdc8ab25b6a389697ad333a1936a48cc7373420",
      "bytes": 24211,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730.md"
    },
    {
      "sourceId": "context.candidate-artifact.08",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/compilation.json",
      "digest": "sha256:6f00e9b85a569147e8b20bff3d66be49ae7120e47e3d25fd06fd51eccceef8cd",
      "bytes": 226627,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/compilation.json"
    },
    {
      "sourceId": "context.candidate-artifact.09",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/integration.md",
      "digest": "sha256:1ac8638faeb8ebfbcbeded004d18eff29f91707beed062fa03ad336673d11892",
      "bytes": 7342,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/integration.md"
    },
    {
      "sourceId": "context.candidate-artifact.10",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json",
      "digest": "sha256:6a07320f170329007b90d0693df7b92d0e5420678c559b35fe7181d96269c741",
      "bytes": 4202,
      "purposes": [
        "Authenticate the exact frozen candidate compilation and rendered package."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json"
    },
    {
      "sourceId": "context.canonical-json",
      "kind": "repository",
      "locator": "path:src/canonical-json.ts",
      "digest": "sha256:6dfb9cb7f7c5be5755b370b82c5230c9e4d3c3a350e6fe0fef3948b1b03d42ac",
      "bytes": 7405,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "src/specialist-compiler.ts"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:14474c461b8132d8fe388c30e9276e8ff88d0ae1875afdda3d1facc31eb2a84a",
      "bytes": 29822,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.compiler-tests",
      "kind": "repository",
      "locator": "path:test/specialist-compiler.test.mjs",
      "digest": "sha256:f2bbb7f580f574bee5ef586f2273c9a35441769b93224b6d791fd6ceac0b2994",
      "bytes": 53602,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.consumer-check",
      "kind": "repository",
      "locator": "path:scripts/check-packed-consumer.mjs",
      "digest": "sha256:2ce5aaf1cbfa6dbf848b73967eb8ce2a98c9e6c34d20eedb96c56f0dd1fde6d3",
      "bytes": 32206,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.dogfood-runner",
      "kind": "repository",
      "locator": "path:scripts/run-v11-dogfood.mjs",
      "digest": "sha256:827dfd4ef5c58216a260881b7ec371f1890327b18b922df16a264cc7cc56b3cc",
      "bytes": 39636,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "scripts/run-v11-dogfood.mjs"
    },
    {
      "sourceId": "context.dogfood-runner-tests",
      "kind": "repository",
      "locator": "path:test/v11-dogfood-runner.test.mjs",
      "digest": "sha256:e1b90e4260996a6fb3da7663d93fa413214f153f036f0d8ef5a7fa4013ca475c",
      "bytes": 21993,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "test/fixtures/specialist-compiler/under-split.json"
    },
    {
      "sourceId": "context.ide-kickoff",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:67edd4b5ffa3cbf35d2ece6a7066274107346dc45caa849747dfe1161d28d4e0",
      "bytes": 14605,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "src/model.ts"
    },
    {
      "sourceId": "context.packed-consumer-host",
      "kind": "repository",
      "locator": "path:scripts/fixtures/packed-consumer-host.ts",
      "digest": "sha256:b758ee12c42b95e001451d109bf124c8d9e928d51187a8a7219f982a1acdf5ab",
      "bytes": 13753,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "src/privacy.ts"
    },
    {
      "sourceId": "context.renderer",
      "kind": "repository",
      "locator": "path:src/specialist-render.ts",
      "digest": "sha256:1f9976bfe6770f45ed4c6b14d195a2c10d15a353d32d24719f9ef327770aa2c8",
      "bytes": 16637,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "src/text.ts"
    },
    {
      "sourceId": "context.two-phase-prelaunch-review",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
      "digest": "sha256:27b601c2d2d0496fad7c130a684f0068e68609940952f8564c0f9dacb05d7994",
      "bytes": 3620,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md"
    },
    {
      "sourceId": "context.types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:24d255360063fa157335d189fc4e0031795ba646dc44c316f93a0f3a7006fc52",
      "bytes": 12158,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "src/specialist-types.ts"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.candidate-compilation"
    ],
    "scope": {
      "read": [
        "docs/ide/specialist-agent-kickoff.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/compilation.json",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/integration.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
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
          "docs/ide/specialist-agent-kickoff.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/compilation.json",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/integration.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
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
          "node",
          "powershell",
          "rg"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access a network or provider.",
      "Do not approve or launch the candidate package.",
      "Do not modify repository files, candidate evidence, or durable memory.",
      "Do not widen candidate or audit authority."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.candidate-authority-package",
      "criterion": "The exact blueprints, authority, evidence coverage, handoffs, and rendered package preserve the reviewed goal.",
      "requirementId": "evidence.candidate-authority-review",
      "kind": "review",
      "duty": "review",
      "description": "Independent semantic review of candidate authority and package bindings.",
      "independentFromProducer": true
    },
    {
      "criterionId": "criterion.candidate-selection",
      "criterion": "The exact candidate search, selection, schedule, metrics, and digest claims are reproducible and accurate.",
      "requirementId": "evidence.candidate-selection-review",
      "kind": "review",
      "duty": "review",
      "description": "Independent semantic review of the selected candidate and search claims.",
      "independentFromProducer": true
    }
  ],
  "handoff": {
    "destination": "v11.integration-owner",
    "artifacts": [
      "candidate-compilation-review.md"
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
    "Stop with FIX if selection, authority, evidence, schedule, digest, or package claims differ.",
    "Stop with FIX if the exact candidate cannot be reconstructed from authenticated bytes."
  ],
  "contentDigest": "sha256:8998d4739c652743fa646ab00ff22b4434d6fb012c603f79be67fc3cc8dca595"
}
```
