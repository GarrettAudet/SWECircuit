# V11 Candidate Preparation Handoff: Attempt 16

Agent thread: `019f6c1d-de22-7281-bdab-8ac454534e0e`.

## Raw Handoff

```json
{
  "summary": {
    "outcome": "pass",
    "destination": "v11.integration-owner",
    "agentId": "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730",
    "goalId": "v11.specialist-compiler.release",
    "goalRevision": 16,
    "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
    "workUnit": "prepare.candidate",
    "module": "review.prepare",
    "requiredCapability": "candidate.bind",
    "compilationDigest": "sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb",
    "blueprintDigest": "sha256:0d6a6eea2e18b1ebbea0f5d261c8bd404ad219b67ac6c67402f0e634be0099b5",
    "packageDigest": "sha256:0cd3d9b30c48631d03d529cbd5ce4285be166f382b9c6d84a3591f91d0d91ea1",
    "statement": "The exact owner-approved package passed trusted verification, and all 35 declared candidate context files matched their contract-declared raw byte counts and SHA-256 digests on initial retrieval and final freshness recheck.",
    "failedAttempts": [],
    "authorityUsed": {
      "filesystemRead": "Only the 35 declared specialist context sources were read after the identity gate.",
      "filesystemWrite": [],
      "processSpawn": ["powershell"],
      "networkAccess": false
    },
    "effects": {
      "repositoryWrites": 0,
      "runtimeAgentsDispatched": false,
      "mergePerformed": false,
      "durableMemoryUpdated": false
    }
  },
  "workUnitsCompleted": [
    "prepare.candidate"
  ],
  "artifacts": [
    {
      "name": "review-candidate-digests.json",
      "mediaType": "application/json",
      "delivery": "inline",
      "content": {
        "digestAlgorithm": "SHA-256",
        "digestScope": "exact raw file bytes",
        "packagePreflight": {
          "result": "pass",
          "executionBoundary": "Completed before specialist work. Specialist execution after the identity gate used only the contract-authorized PowerShell process.",
          "contract": {
            "path": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730.md",
            "expectedBytes": 24211,
            "actualBytes": 24211,
            "expectedDigest": "sha256:38c710b8beacee30f2fc98422cdc8ab25b6a389697ad333a1936a48cc7373420",
            "actualDigest": "sha256:38c710b8beacee30f2fc98422cdc8ab25b6a389697ad333a1936a48cc7373420",
            "status": "match"
          },
          "manifest": {
            "path": "docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json",
            "expectedCompilationDigest": "sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb",
            "actualCompilationDigest": "sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb",
            "status": "match"
          },
          "packageVerification": {
            "trustedInterface": "dist/index.js::verifySpecialistPackage",
            "expectedCompilationDigest": "sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb",
            "verifiedCompilationDigest": "sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb",
            "expectedPackageDigest": "sha256:0cd3d9b30c48631d03d529cbd5ce4285be166f382b9c6d84a3591f91d0d91ea1",
            "verifiedPackageDigest": "sha256:0cd3d9b30c48631d03d529cbd5ce4285be166f382b9c6d84a3591f91d0d91ea1",
            "declaredFileCount": 9,
            "actualFileCount": 9,
            "fileSetMatch": true,
            "diagnostics": [],
            "status": "pass",
            "files": [
              {"path":"agents/agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972.md","bytes":13788,"digest":"sha256:7bf26855fe514dc4c9ca39be6e5aee9e514241bd3167fda76ee570f9b88213f7"},
              {"path":"agents/agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9.md","bytes":8556,"digest":"sha256:f6c84458a9a1b185cb96e8c47a06f2f486c39db9351c62d09ef1e83479177f08"},
              {"path":"agents/agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e.md","bytes":11594,"digest":"sha256:ac307f814e47ed62f0b8454bdb04a51245edbd3eb6172e38af00b86b8f6c293c"},
              {"path":"agents/agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8.md","bytes":16842,"digest":"sha256:49ff98a856b3589f50309f2711661b7fbb0c9575d9ce6f90538579d5ccddcbbb"},
              {"path":"agents/agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc.md","bytes":23011,"digest":"sha256:9a622ba4dddd89d018802ee38549e78a0c6b7af868fb0a5ef16523ebe14515ea"},
              {"path":"agents/agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730.md","bytes":24211,"digest":"sha256:38c710b8beacee30f2fc98422cdc8ab25b6a389697ad333a1936a48cc7373420"},
              {"path":"compilation.json","bytes":226627,"digest":"sha256:6f00e9b85a569147e8b20bff3d66be49ae7120e47e3d25fd06fd51eccceef8cd"},
              {"path":"integration.md","bytes":7342,"digest":"sha256:1ac8638faeb8ebfbcbeded004d18eff29f91707beed062fa03ad336673d11892"},
              {"path":"manifest.json","bytes":4202,"digest":"sha256:6a07320f170329007b90d0693df7b92d0e5420678c559b35fe7181d96269c741"}
            ]
          }
        },
        "candidateSourceSet": {
          "result": "pass",
          "sourceCount": 35,
          "initialVerificationCount": 35,
          "freshnessRecheckCount": 35,
          "mismatches": 0,
          "strictUtf8All": true,
          "bindingSemantics": "Each listed byte count and digest is both the contract-declared value and the independently observed value from the same exact raw bytes.",
          "bindings": [
            {"sourceId":"context.canonical-json","path":"src/canonical-json.ts","bytes":7405,"digest":"sha256:6dfb9cb7f7c5be5755b370b82c5230c9e4d3c3a350e6fe0fef3948b1b03d42ac"},
            {"sourceId":"context.common-schema","path":"schemas/v1alpha1/common.schema.json","bytes":10709,"digest":"sha256:d3cdcd5d8723477db18a77a2396c6ea475bbc0e1cca44f952a594cc55832e636"},
            {"sourceId":"context.compiler","path":"src/specialist-compiler.ts","bytes":65907,"digest":"sha256:fb1b901a2bd8e398ab57f08b4f353b9d18c22075965f41b50a88ef169268f98c"},
            {"sourceId":"context.compiler-contract","path":"docs/specs/v11-specialist-compiler/specialist-compiler-contract.md","bytes":29822,"digest":"sha256:14474c461b8132d8fe388c30e9276e8ff88d0ae1875afdda3d1facc31eb2a84a"},
            {"sourceId":"context.compiler-tests","path":"test/specialist-compiler.test.mjs","bytes":53602,"digest":"sha256:f2bbb7f580f574bee5ef586f2273c9a35441769b93224b6d791fd6ceac0b2994"},
            {"sourceId":"context.constants","path":"src/constants.ts","bytes":1883,"digest":"sha256:c3526b49f3f1f54ce8db3dfb7af7dabe6944a02543b5702d08567c2a17cc466b"},
            {"sourceId":"context.consumer-check","path":"scripts/check-packed-consumer.mjs","bytes":32206,"digest":"sha256:2ce5aaf1cbfa6dbf848b73967eb8ce2a98c9e6c34d20eedb96c56f0dd1fde6d3"},
            {"sourceId":"context.diagnostics","path":"src/diagnostics.ts","bytes":22284,"digest":"sha256:3e9e250dbade0f9ba3275b50d21fe977df729eb9fbf203e8419ac3d9a2b5b25d"},
            {"sourceId":"context.dogfood-runner","path":"scripts/run-v11-dogfood.mjs","bytes":39636,"digest":"sha256:827dfd4ef5c58216a260881b7ec371f1890327b18b922df16a264cc7cc56b3cc"},
            {"sourceId":"context.dogfood-runner-tests","path":"test/v11-dogfood-runner.test.mjs","bytes":21993,"digest":"sha256:e1b90e4260996a6fb3da7663d93fa413214f153f036f0d8ef5a7fa4013ca475c"},
            {"sourceId":"context.fixture.conflict-heavy","path":"test/fixtures/specialist-compiler/conflict-heavy.json","bytes":6260,"digest":"sha256:27fe1679095f6d86017a388e6b83ee6922ec30ba0bd598a1d5c7c2aeaed94dee"},
            {"sourceId":"context.fixture.generic-role","path":"test/fixtures/specialist-compiler/generic-role.json","bytes":4420,"digest":"sha256:6801c238c2500f8fa8c4414de1cc3b88921d9c08e667692f49321187a9bef955"},
            {"sourceId":"context.fixture.genuinely-parallel","path":"test/fixtures/specialist-compiler/genuinely-parallel.json","bytes":6260,"digest":"sha256:8119915f5b41d4eff112e52008f0d7a9a9e5c9f522c41d28419637ef0d290019"},
            {"sourceId":"context.fixture.one-agent-optimal","path":"test/fixtures/specialist-compiler/one-agent-optimal.json","bytes":6314,"digest":"sha256:bebb10dc99b89660d672d0ce25de1ef09f951a0a76716b282a0c2945b2e36f67"},
            {"sourceId":"context.fixture.over-split","path":"test/fixtures/specialist-compiler/over-split.json","bytes":8159,"digest":"sha256:a22160147debf2bf7361975a3b4900199d38059d6de3f596bec3e7fd1b9e3f1b"},
            {"sourceId":"context.fixture.under-split","path":"test/fixtures/specialist-compiler/under-split.json","bytes":6224,"digest":"sha256:3ef5d99ff5fd47f6ddf0b46d30effa513488d6806bb275ba598871e93a9c537c"},
            {"sourceId":"context.ide-kickoff","path":"docs/ide/specialist-agent-kickoff.md","bytes":14605,"digest":"sha256:67edd4b5ffa3cbf35d2ece6a7066274107346dc45caa849747dfe1161d28d4e0"},
            {"sourceId":"context.index","path":"src/index.ts","bytes":4169,"digest":"sha256:b146d7759988bff0a205228f46e39fe53cfe0f42fbe89dbad3a6f8ffdfcf716d"},
            {"sourceId":"context.json","path":"src/json.ts","bytes":4808,"digest":"sha256:a1f119ecb906ccf5d8397d2ce84e7b357ef5276df2ac448c99cc498d963c8a8a"},
            {"sourceId":"context.model","path":"src/model.ts","bytes":5961,"digest":"sha256:c67bf6036ec16d40516bcf01a49e8714f82588e29a9c596b117dc73c36cf4b83"},
            {"sourceId":"context.packed-consumer-host","path":"scripts/fixtures/packed-consumer-host.ts","bytes":13753,"digest":"sha256:b758ee12c42b95e001451d109bf124c8d9e928d51187a8a7219f982a1acdf5ab"},
            {"sourceId":"context.path","path":"src/path.ts","bytes":12676,"digest":"sha256:fd7c8dbbb09f09f5f033cac64a3afaeb86fcc4c50bf38a7afc510f4f9606daa9"},
            {"sourceId":"context.permissions","path":"src/permissions.ts","bytes":3484,"digest":"sha256:d6e39db2221715490b58ace95e87514f0a5c0a76a38225f02ccec15a37d74523"},
            {"sourceId":"context.privacy","path":"src/privacy.ts","bytes":1047,"digest":"sha256:e6ffecf6135e7369913e51df78a522dcb3de3907d698f7f7cd2c1e7117ac972c"},
            {"sourceId":"context.readme","path":"README.md","bytes":8525,"digest":"sha256:c53ca438b43b9b03a2ca8c55712fc26c586ab2fdf2a4ba78fdd6e3ead622ebd8"},
            {"sourceId":"context.renderer","path":"src/specialist-render.ts","bytes":16637,"digest":"sha256:1f9976bfe6770f45ed4c6b14d195a2c10d15a353d32d24719f9ef327770aa2c8"},
            {"sourceId":"context.schema","path":"schemas/v1alpha1/specialist-compiler.schema.json","bytes":15392,"digest":"sha256:860cbe31f1b86676ea35df361e0d1b215aa92e8253bd5de266fded42fe6039cd"},
            {"sourceId":"context.schema-tests","path":"test/specialist-schema.test.mjs","bytes":10218,"digest":"sha256:c1ea13907cd2efd3619d565bd71474ef808c53fc4c3b6213999dc48efbfd4f50"},
            {"sourceId":"context.shared-types","path":"src/types.ts","bytes":4140,"digest":"sha256:61877d77f8a1d5ab496491f1a462e74142572d4acac953958add18d9a62bee37"},
            {"sourceId":"context.snapshot","path":"src/snapshot.ts","bytes":5045,"digest":"sha256:4def623274433afd49467c46aceae479115a881a13af3c6359f908772a19ca1e"},
            {"sourceId":"context.spec","path":"docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md","bytes":10082,"digest":"sha256:ff85f0f2b87c8e7f0d3ced2feb06f366d7e5c60d8ae3b580d09c9aa724a9f2e5"},
            {"sourceId":"context.specialist-schema","path":"src/specialist-schema.ts","bytes":2968,"digest":"sha256:e59a903d0fab9ba58de19032969107fe6d517526a153ce8e6bc081360b1a4799"},
            {"sourceId":"context.text","path":"src/text.ts","bytes":275,"digest":"sha256:d6b14128b1c83bc05294f4d9486b912b0604a6f808cf849e0875d9b35e4d7374"},
            {"sourceId":"context.two-phase-prelaunch-review","path":"docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md","bytes":3620,"digest":"sha256:27b601c2d2d0496fad7c130a684f0068e68609940952f8564c0f9dacb05d7994"},
            {"sourceId":"context.types","path":"src/specialist-types.ts","bytes":12158,"digest":"sha256:24d255360063fa157335d189fc4e0031795ba646dc44c316f93a0f3a7006fc52"}
          ]
        },
        "evidenceDutyBindings": [
          {"requirementId":"evidence.algorithm-candidate","artifactPointer":"#/candidateSourceSet/bindings","sourceCount":35},
          {"requirementId":"evidence.product-candidate","artifactPointer":"#/candidateSourceSet/bindings","sourceCount":35},
          {"requirementId":"evidence.security-candidate","artifactPointer":"#/candidateSourceSet/bindings","sourceCount":35}
        ]
      }
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.algorithm",
      "criterion": "Candidate construction, scheduling, selection, and digest semantics are deterministic and accurately claimed.",
      "requirementId": "evidence.algorithm-candidate",
      "kind": "digest",
      "duty": "produce",
      "independentFromProducer": false,
      "status": "produced",
      "description": "Content-addressed algorithm and test candidate sources.",
      "artifact": "review-candidate-digests.json",
      "artifactPointer": "#/candidateSourceSet/bindings",
      "verifiedSourceCount": 35
    },
    {
      "criterionId": "criterion.product-api",
      "criterion": "The V11 product and public API match the owner goal and remain IDE, model, and provider neutral.",
      "requirementId": "evidence.product-candidate",
      "kind": "digest",
      "duty": "produce",
      "independentFromProducer": false,
      "status": "produced",
      "description": "Content-addressed product and API candidate sources.",
      "artifact": "review-candidate-digests.json",
      "artifactPointer": "#/candidateSourceSet/bindings",
      "verifiedSourceCount": 35
    },
    {
      "criterionId": "criterion.security-trace",
      "criterion": "Authority, context, privacy, rendering, and trace bindings fail closed.",
      "requirementId": "evidence.security-candidate",
      "kind": "digest",
      "duty": "produce",
      "independentFromProducer": false,
      "status": "produced",
      "description": "Content-addressed security and trace candidate sources.",
      "artifact": "review-candidate-digests.json",
      "artifactPointer": "#/candidateSourceSet/bindings",
      "verifiedSourceCount": 35
    }
  ],
  "assumptions": [],
  "risks": [
    "This preparation PASS proves exact byte identity only. It does not establish a substantive product, algorithm, security, or release-acceptance verdict.",
    "The shared repository is not frozen by this read-only unit. Any later source mutation must be rejected by downstream reviewers or integration unless the bytes still match these bindings exactly."
  ],
  "followUps": [
    "The integration owner must preserve this complete raw handoff verbatim as review-candidate-digests.json.",
    "Independent review units must verify their delivered contexts against these exact bindings before reviewing the product/API, algorithm/lifecycle, or security/trace criteria.",
    "Any source, compilation, contract, manifest, or package mismatch requires BLOCK and a new candidate revision, recompilation, rerendering, verification, and owner approval."
  ]
}
```

