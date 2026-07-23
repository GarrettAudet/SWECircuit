# Specialist Contract: agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64

Compilation: `sha256:ec7a601571d54c5138b380367b974db39663820aa0b6103406374608c3160249`
Blueprint: `sha256:0efd9b7da138e0f848dfd98cc1b7f9b50d70f426a63ef70816841532abf9b4f5`

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
  "goalRevision": 44,
  "goalDigest": "sha256:06991ca1ab68fc85d750e9350d17c33fb3f1922855b739a9438caefb52c54baf",
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
        },
        {
          "name": "verification-receipt",
          "artifactType": "PrelaunchPackageVerificationReceipt"
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
      "sourceId": "context.agents",
      "kind": "repository",
      "locator": "path:AGENTS.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.candidate-artifact.01",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
      "digest": "sha256:f1585556e14c39a7717c2bbe25ab310a1fe6af3233a420313add2317662a5c44",
      "bytes": 319458,
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
      "digest": "sha256:c0a1d3876e7834d14579df89e43544842b819fef162fbb5bbb7cbd6cf4c6c330",
      "bytes": 19439,
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
      "digest": "sha256:2569d6f34165bcd7de01438ba51660110c51feb4ca22e4656818173eb8870e8e",
      "bytes": 11692,
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
      "digest": "sha256:4e7d12cd5d9d55e4ab88cce23d21305770beb71d8bb2715fb509f0ad20c19a99",
      "bytes": 24270,
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
      "digest": "sha256:1f0bfcfc0a7d72d342dd162b57e74e0bc8b8dfd350468db6f401e3f566891d07",
      "bytes": 27801,
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
      "digest": "sha256:3b4272581af32920d3bd850db0f3f6c44a63a5d76aa76f9aad7d06e94eb47f5a",
      "bytes": 34301,
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
      "digest": "sha256:7b7e7a0cca25c0c6c60ddb52e00ef90617da67d6b2766398ea83a594b59dcaa0",
      "bytes": 37516,
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
      "digest": "sha256:f1585556e14c39a7717c2bbe25ab310a1fe6af3233a420313add2317662a5c44",
      "bytes": 319458,
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
      "digest": "sha256:cd39db8dc6857e0a2bf2ee0b5a613709d646300e547716618d8bb21bc7b321bb",
      "bytes": 8161,
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
      "digest": "sha256:3b576ebb0949b0c9c2f1e5ff685a826202594170cdfe16d3cd5dcddf9102ad04",
      "bytes": 4203,
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
      "digest": "sha256:2a39a85745de2124464744c9635144e4e878cbea2f2b584ded25adb946798da7",
      "bytes": 69522,
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
      "digest": "sha256:ab2c0f09a38e5de51f14c6af1c912bbc37f5ec8c27bd589273202741c94297b9",
      "bytes": 36886,
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
      "digest": "sha256:2847895078aa56d9e051f0b399b2e923cce3edc647c2d471c76034fd12159200",
      "bytes": 62973,
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
      "digest": "sha256:2fded9c023b41dc58ad7b8471d9b3f7dbc5b4566c6fecbb6008829c1c5000b6a",
      "bytes": 2570,
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
      "digest": "sha256:48d5ff057865f8c599e6a17055787ca21946f9624a09495abb3e451b43b13099",
      "bytes": 45585,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.diagnostic-catalog",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/diagnostic-catalog.json",
      "digest": "sha256:ca09d174600a7841dcab90b15fe1d95bc9a24f72411704fbe794d2f52dec84a2",
      "bytes": 13307,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
      "digest": "sha256:0b9079f93dd8efc79a1fd920d621a71520649c7b5749deef306b5dffd645a19e",
      "bytes": 58302,
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
      "digest": "sha256:637f1c44d641a2752186aa5837ae11d57f97d394283e52b6801ebaf29dfb9284",
      "bytes": 43787,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "examples/specialist-compiler/approval.json"
    },
    {
      "sourceId": "context.first-run-tests",
      "kind": "repository",
      "locator": "path:test/specialist-first-run.test.mjs",
      "digest": "sha256:7b62d8f1b6b7d64e183b308e6a2b55ea64a3a142f480a4fedc2f674b541c681b",
      "bytes": 8984,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
      "sourceId": "context.gitattributes",
      "kind": "repository",
      "locator": "path:.gitattributes",
      "digest": "sha256:4626d1e064ae446e63b50a072443b874a9619c012ac283d7903d03cd028b53a3",
      "bytes": 1283,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": ".gitattributes"
    },
    {
      "sourceId": "context.handbook",
      "kind": "repository",
      "locator": "path:docs/ai/handbook.md",
      "digest": "sha256:a75adc0a5bda7ee618a8eeec983614bb53d5941be6f75212c2da88b4710f6dd4",
      "bytes": 39728,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/ai/handbook.md"
    },
    {
      "sourceId": "context.handoff",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "schemas/v1alpha1/specialist-handoff.schema.json"
    },
    {
      "sourceId": "context.handoff-schema-loader",
      "kind": "repository",
      "locator": "path:src/specialist-handoff-schema.ts",
      "digest": "sha256:b46e29306e5605092f8923a427fdad431b0d8e4d84d8693af90bdb2c275aa581",
      "bytes": 2275,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "src/specialist-handoff-schema.ts"
    },
    {
      "sourceId": "context.handoff-tests",
      "kind": "repository",
      "locator": "path:test/specialist-handoff.test.mjs",
      "digest": "sha256:41d25b24adb4062992012983b4eb99175f371929fb83e522f1723799b3e196af",
      "bytes": 10709,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "test/specialist-handoff.test.mjs"
    },
    {
      "sourceId": "context.ide-kickoff",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:9c321b526902503f845d96e9b20291f41c03a04d5df0098af33388815c03402c",
      "bytes": 22016,
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
      "digest": "sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f",
      "bytes": 5447,
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
      "sourceId": "context.json-kernel-tests",
      "kind": "repository",
      "locator": "path:test/json-kernel.test.mjs",
      "digest": "sha256:8dd95ceeb4c5d64f7623b434f067667e4e552537e45705749eba6950c43b6b36",
      "bytes": 8321,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "src/model.ts"
    },
    {
      "sourceId": "context.module-guide",
      "kind": "repository",
      "locator": "path:docs/modules/specialist-agent-compiler.md",
      "digest": "sha256:741bed2ad50483a935a2009719fe14e13ce794d5e7dc15575da947260c0ea5da",
      "bytes": 17016,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "docs/modules/specialist-agent-compiler.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:9c8e1e3bde18439a6199f0752b7dad1e69fdf713ffac33597d5119d1c26a67fa",
      "bytes": 4043,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
      "digest": "sha256:7b2bc97a119e56e2c33d47bae11c48215be75365dc0d7c0c26d804b520580792",
      "bytes": 12803,
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
      "sourceId": "context.project-validation-tests",
      "kind": "repository",
      "locator": "path:test/project-validation.test.mjs",
      "digest": "sha256:54cf6bddd932fec496f4d3291f06cdf0873f4b1c2f06d223bb3f1a41eaf3d711",
      "bytes": 18040,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
      ],
      "readScope": "test/project-validation.test.mjs"
    },
    {
      "sourceId": "context.renderer",
      "kind": "repository",
      "locator": "path:src/specialist-render.ts",
      "digest": "sha256:e8c2c73bf266b32ebee589497a5298435bb50f59e50d00d9d70ed3f65dc526e7",
      "bytes": 19184,
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
      "sourceId": "context.schema-readme",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/README.md",
      "digest": "sha256:e2bd5e0ca5123873d07fe5bdaff4181b38c34a6cbea0220ecb02e78a62f18223",
      "bytes": 20795,
      "purposes": [
        "Audit the candidate against its declared compiler, contract, and test evidence."
      ],
      "workUnitIds": [
        "audit.review-candidate-compilation"
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
      "digest": "sha256:c09b86f1e427a04aacdbc62f68d05bd61814b7e7744baeb76a4139f2a0ae0a34",
      "bytes": 22340,
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
      "digest": "sha256:b651ab211e2551f1df678c7616713ba5c5729a47b1d463c82e3ca95dece349bc",
      "bytes": 2815,
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
      "digest": "sha256:7aaf03f50e16bc4917112e560dfd65f3e00a818df07cdca5310128a24e9d8644",
      "bytes": 985,
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
      "digest": "sha256:2b7443465ac1988f83d955c37e4b89c0dfdc15ba7ef57eec7bd7684970038233",
      "bytes": 12409,
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
      "digest": "sha256:f0f1384cdef06972e54800d6fd2c57f08b8ebe8a8703b9178e6c3fa78f53e934",
      "bytes": 16047,
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
        ".gitattributes",
        "AGENTS.md",
        "docs/ai/handbook.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/modules/specialist-agent-compiler.md",
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
          ".gitattributes",
          "AGENTS.md",
          "docs/ai/handbook.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/modules/specialist-agent-compiler.md",
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
    "Stop with FIX if selection, authority, evidence, schedule, digest, or package claims differ.",
    "Stop with FIX if the exact candidate cannot be reconstructed from authenticated bytes.",
    "Stop with FIX if the host-delivered PrelaunchPackageVerificationReceipt is absent, non-PASS, malformed, or binds different Candidate A or Audit B identities.",
    "Stop with FIX unless the raw result is a closed swecircuit/prelaunch-audit-handoff/v1alpha1 PrelaunchAuditHandoff JSON object that satisfies the standard agent and compilation handoff fields, binds this goal, reviewer blueprint, Candidate A and Audit B digest pairs, both review duties, and a pass outcome."
  ],
  "contentDigest": "sha256:0efd9b7da138e0f848dfd98cc1b7f9b50d70f426a63ef70816841532abf9b4f5"
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
    "id": "v11.specialist-compiler.prelaunch-audit",
    "revision": 44,
    "digest": "sha256:06991ca1ab68fc85d750e9350d17c33fb3f1922855b739a9438caefb52c54baf"
  },
  "agent": {
    "id": "agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64",
    "blueprintDigest": "sha256:0efd9b7da138e0f848dfd98cc1b7f9b50d70f426a63ef70816841532abf9b4f5"
  },
  "compilationDigest": "sha256:ec7a601571d54c5138b380367b974db39663820aa0b6103406374608c3160249",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "audit.review-candidate-compilation"
  ],
  "artifacts": [
    {
      "name": "candidate-compilation-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.candidate-authority-package",
      "requirementId": "evidence.candidate-authority-review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "candidate-compilation-review.md"
    },
    {
      "criterionId": "criterion.candidate-selection",
      "requirementId": "evidence.candidate-selection-review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "candidate-compilation-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
