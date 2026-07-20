# Specialist Contract: agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe

Compilation: `sha256:ce22dcd5bc7b96d7399fa792ab9ab35c0b10af9a0a4c437fd3d184dfe3eec672`
Blueprint: `sha256:bbad5e70232c83f513fb2d9efb4bd9bc209b224d7ed3b1e79cec9b2bffadd869`

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
  "id": "agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 2,
  "goalDigest": "sha256:d17ae81e2e75f50f687074349c590ab932022961b3f708240294ae5c72f59ddf",
  "candidateId": "team.4c92669eb680ad05be5bd3c5feef150f1a5fdde8d315201e095ba7fe28db9144",
  "workUnitIds": [
    "fix.runtime-purity-ordering.r2"
  ],
  "objectives": [
    {
      "workUnitId": "fix.runtime-purity-ordering.r2",
      "objective": "Remove first-use filesystem schema loading from all four run operations, order accepted evidence by requirement identity, and lock both corrections with causal tests against the integrated resource limits."
    }
  ],
  "modules": [
    {
      "id": "correction.runtime-purity-ordering",
      "action": "Authenticate the retired contract and upstream PASS evidence, then bundle immutable package-owned schema data into TypeScript without changing the exported schema subpath; compose it with the existing strict Ajv validator, add a fresh-process no-filesystem-read proof for create/restore/inspect/record, sort evidence by requirementId before the complete tuple, and add counterordered IDs.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "VerifiedSourceBoundReplan"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "PureOrderedRunOperations"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.canonical-json",
      "kind": "repository",
      "locator": "path:src/canonical-json.ts",
      "digest": "sha256:6dfb9cb7f7c5be5755b370b82c5230c9e4d3c3a350e6fe0fef3948b1b03d42ac",
      "bytes": 7405,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/canonical-json.ts"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:src/constants.ts",
      "digest": "sha256:2fded9c023b41dc58ad7b8471d9b3f7dbc5b4566c6fecbb6008829c1c5000b6a",
      "bytes": 2570,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:src/diagnostics.ts",
      "digest": "sha256:3d27fe071994a2a87a59ecadc52a788a6aaf85737b46371f5622bf10c50aede6",
      "bytes": 25190,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.foundation-tests",
      "kind": "repository",
      "locator": "path:test/specialist-run-foundation.test.mjs",
      "digest": "sha256:345b99d02442e0f7f1d9bdf79f4251c3c849753b785c73ff14d5dfcfcabb211e",
      "bytes": 3270,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "test/specialist-run-foundation.test.mjs"
    },
    {
      "sourceId": "context.inspection-tests",
      "kind": "repository",
      "locator": "path:test/specialist-run-inspection.test.mjs",
      "digest": "sha256:6dcec494c85a807ed5d48e6d710f6c3d83b2d70c453e00d100efb8983eab42f8",
      "bytes": 18218,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "test/specialist-run-inspection.test.mjs"
    },
    {
      "sourceId": "context.json-parser",
      "kind": "repository",
      "locator": "path:src/json.ts",
      "digest": "sha256:a1f119ecb906ccf5d8397d2ce84e7b357ef5276df2ac448c99cc498d963c8a8a",
      "bytes": 4808,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
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
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/model.ts"
    },
    {
      "sourceId": "context.privacy",
      "kind": "repository",
      "locator": "path:src/privacy.ts",
      "digest": "sha256:e6ffecf6135e7369913e51df78a522dcb3de3907d698f7f7cd2c1e7117ac972c",
      "bytes": 1047,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/privacy.ts"
    },
    {
      "sourceId": "context.release-correction-aggregate-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
      "digest": "sha256:f74436e9e9a234cc8c41cba9a3b47ee84d8e0bff3ceba811252f008686c51677",
      "bytes": 6718,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json"
    },
    {
      "sourceId": "context.release-correction-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
      "digest": "sha256:dc177cddfeae16dcefe456581fcaed2e072a8fa84b4ad67204146062d4995ef2",
      "bytes": 641,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json"
    },
    {
      "sourceId": "context.release-correction-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
      "digest": "sha256:3db78ce7e72fb6554df199d1ee3d9f8f6f88a2d9a0c15b5395b7fd3ed2bd82bd",
      "bytes": 313118,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json"
    },
    {
      "sourceId": "context.retired-runtime-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package/agents/agent.b73ee06f2af37577c9726f116f1c4741a7012982796300e06e11bb243e93eefe.md",
      "digest": "sha256:5919cdb5e05d15ffcc5ddf8a70f6b2f4b62485d5595e282bf191776be9669df6",
      "bytes": 23524,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package/agents/agent.b73ee06f2af37577c9726f116f1c4741a7012982796300e06e11bb243e93eefe.md"
    },
    {
      "sourceId": "context.review-lifecycle",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
      "digest": "sha256:13e1b510607a4c23223b59a0190e3e490be3e95fc94e56dba45cd5e4bf3bdc84",
      "bytes": 5649,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-security",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
      "digest": "sha256:605a4e7065e1c4af2b3114129e919a810e430b584e31c718c0d78fa02fa027b7",
      "bytes": 7259,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.run-inspection",
      "kind": "repository",
      "locator": "path:src/specialist-run-inspection.ts",
      "digest": "sha256:c20a875b521387aad12831a4508a1fff76371a76d53bc27740dfe527b16eb90e",
      "bytes": 14484,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/specialist-run-inspection.ts"
    },
    {
      "sourceId": "context.run-schema-code",
      "kind": "repository",
      "locator": "path:src/specialist-run-schema.ts",
      "digest": "sha256:705357ee174691f4e5b177f1a9d4ff3abf38adad46ce32264f9dd3f846b5dd23",
      "bytes": 3371,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/specialist-run-schema.ts"
    },
    {
      "sourceId": "context.run-schema-json",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/specialist-run.schema.json",
      "digest": "sha256:8949156f35ab5c4e9efcc86c5509b6a0fb137ced45a0c4c6da3648621797bba5",
      "bytes": 17405,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "schemas/v1alpha1/specialist-run.schema.json"
    },
    {
      "sourceId": "context.run-session",
      "kind": "repository",
      "locator": "path:src/specialist-run-session.ts",
      "digest": "sha256:0ae9bff6b1727c8e3a5540bb7714288592b93b31de0dc6721a84fd73a6e9a03e",
      "bytes": 18723,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/specialist-run-session.ts"
    },
    {
      "sourceId": "context.run-transition",
      "kind": "repository",
      "locator": "path:src/specialist-run-transition.ts",
      "digest": "sha256:64916178302c40741eb53780e42f74af3cba7c886956851a55d6b4582d0cc6c7",
      "bytes": 8015,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/specialist-run-transition.ts"
    },
    {
      "sourceId": "context.run-types",
      "kind": "repository",
      "locator": "path:src/specialist-run-types.ts",
      "digest": "sha256:01c54b2fc3244f875a4c04e8624d570953e08a6ce1cbbadb8e766117e270a74c",
      "bytes": 4222,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/specialist-run-types.ts"
    },
    {
      "sourceId": "context.snapshot",
      "kind": "repository",
      "locator": "path:src/snapshot.ts",
      "digest": "sha256:4def623274433afd49467c46aceae479115a881a13af3c6359f908772a19ca1e",
      "bytes": 5045,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/snapshot.ts"
    },
    {
      "sourceId": "context.specialist-handoff",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/specialist-handoff.ts"
    },
    {
      "sourceId": "context.specialist-render",
      "kind": "repository",
      "locator": "path:src/specialist-render.ts",
      "digest": "sha256:e8c2c73bf266b32ebee589497a5298435bb50f59e50d00d9d70ed3f65dc526e7",
      "bytes": 19184,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/specialist-render.ts"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/test-plan.md",
      "digest": "sha256:2dc1648ba64fec0573806bea455559a3ac4c678e50f60b99933a4529784fbea4",
      "bytes": 1998,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/test-plan.md"
    },
    {
      "sourceId": "context.text",
      "kind": "repository",
      "locator": "path:src/text.ts",
      "digest": "sha256:7aaf03f50e16bc4917112e560dfd65f3e00a818df07cdca5310128a24e9d8644",
      "bytes": 985,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "src/text.ts"
    },
    {
      "sourceId": "context.transition-tests",
      "kind": "repository",
      "locator": "path:test/specialist-run-transition.test.mjs",
      "digest": "sha256:bc140c1c1e02a02160c6a7b0ed8399b99dda99d418a6f6f9151039548eb39c28",
      "bytes": 9861,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "test/specialist-run-transition.test.mjs"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r2 contract."
      ],
      "workUnitIds": [
        "fix.runtime-purity-ordering.r2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.runtime-purity-ordering"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package/agents/agent.b73ee06f2af37577c9726f116f1c4741a7012982796300e06e11bb243e93eefe.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
        "schemas/v1alpha1/specialist-run.schema.json",
        "src/canonical-json.ts",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/json.ts",
        "src/model.ts",
        "src/privacy.ts",
        "src/snapshot.ts",
        "src/specialist-handoff.ts",
        "src/specialist-render.ts",
        "src/specialist-run-inspection.ts",
        "src/specialist-run-schema-data.ts",
        "src/specialist-run-schema.ts",
        "src/specialist-run-session.ts",
        "src/specialist-run-transition.ts",
        "src/specialist-run-types.ts",
        "src/text.ts",
        "test/specialist-run-foundation.test.mjs",
        "test/specialist-run-inspection.test.mjs",
        "test/specialist-run-transition.test.mjs"
      ],
      "write": [
        "src/specialist-run-inspection.ts",
        "src/specialist-run-schema-data.ts",
        "src/specialist-run-schema.ts",
        "test/specialist-run-foundation.test.mjs",
        "test/specialist-run-inspection.test.mjs"
      ],
      "conflictZones": [
        "src/specialist-run-inspection.ts",
        "src/specialist-run-schema-data.ts",
        "src/specialist-run-schema.ts",
        "test/specialist-run-foundation.test.mjs",
        "test/specialist-run-inspection.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package/agents/agent.b73ee06f2af37577c9726f116f1c4741a7012982796300e06e11bb243e93eefe.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
          "schemas/v1alpha1/specialist-run.schema.json",
          "src/canonical-json.ts",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/json.ts",
          "src/model.ts",
          "src/privacy.ts",
          "src/snapshot.ts",
          "src/specialist-handoff.ts",
          "src/specialist-render.ts",
          "src/specialist-run-inspection.ts",
          "src/specialist-run-schema-data.ts",
          "src/specialist-run-schema.ts",
          "src/specialist-run-session.ts",
          "src/specialist-run-transition.ts",
          "src/specialist-run-types.ts",
          "src/text.ts",
          "test/specialist-run-foundation.test.mjs",
          "test/specialist-run-inspection.test.mjs",
          "test/specialist-run-transition.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "src/specialist-run-inspection.ts",
          "src/specialist-run-schema-data.ts",
          "src/specialist-run-schema.ts",
          "test/specialist-run-foundation.test.mjs",
          "test/specialist-run-inspection.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "node",
          "npm",
          "powershell"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not use network access, change Git state, launch descendants, write outside the exact scope, or claim that core performs host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.runtime-purity-ordering.r2",
      "criterion": "Remove first-use filesystem schema loading from all four run operations, order accepted evidence by requirement identity, and lock both corrections with causal tests against the integrated resource limits.",
      "requirementId": "evidence.runtime-purity-ordering.r2",
      "kind": "review",
      "duty": "produce",
      "description": "Provide retired-contract authentication, exact source parity, no-filesystem-effect, counterordered identity, focused test, typecheck, and build evidence.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "runtime-purity-ordering-correction-r2.md"
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
    "If native apply_patch fails before mutation because of the host sandbox, an exact precondition-hash-guarded PowerShell write is allowed within the declared write scope; verify the resulting file bytes immediately.",
    "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Run only local focused verification allowed by the contract and report every failing command truthfully.",
    "Stop if any declared source is unavailable or fails its exact digest and byte binding.",
    "Write only the exact declared write scope; do not change Git state, use the network, launch descendants, or widen the public contract."
  ],
  "contentDigest": "sha256:bbad5e70232c83f513fb2d9efb4bd9bc209b224d7ed3b1e79cec9b2bffadd869"
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
  "destination": "codex.main",
  "goal": {
    "id": "v12.ide-run-loop.implementation.release-correction",
    "revision": 2,
    "digest": "sha256:d17ae81e2e75f50f687074349c590ab932022961b3f708240294ae5c72f59ddf"
  },
  "agent": {
    "id": "agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe",
    "blueprintDigest": "sha256:bbad5e70232c83f513fb2d9efb4bd9bc209b224d7ed3b1e79cec9b2bffadd869"
  },
  "compilationDigest": "sha256:ce22dcd5bc7b96d7399fa792ab9ab35c0b10af9a0a4c437fd3d184dfe3eec672",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.runtime-purity-ordering.r2"
  ],
  "artifacts": [
    {
      "name": "runtime-purity-ordering-correction-r2.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.runtime-purity-ordering.r2",
      "requirementId": "evidence.runtime-purity-ordering.r2",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "runtime-purity-ordering-correction-r2.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
