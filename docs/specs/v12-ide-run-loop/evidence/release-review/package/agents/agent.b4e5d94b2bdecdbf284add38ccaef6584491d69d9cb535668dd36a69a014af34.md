# Specialist Contract: agent.b4e5d94b2bdecdbf284add38ccaef6584491d69d9cb535668dd36a69a014af34

Compilation: `sha256:cd70618e14b23dfae4538c41b6709791238684192b5c000f4e577f0edd6b5fd3`
Blueprint: `sha256:c480f8e421ddac1a2e960174ea59b3185137835abcd5125f32e80eef518c2cd5`

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
  "id": "agent.b4e5d94b2bdecdbf284add38ccaef6584491d69d9cb535668dd36a69a014af34",
  "goalId": "v12.ide-run-loop.release-review",
  "goalRevision": 1,
  "goalDigest": "sha256:a62b75ffda9ec7460e81572548f2cf65665a7683be4c1b41a1f2e8cad1c19dfd",
  "candidateId": "team.c59afff49b8af248cdf6c9b5bcfbb94595856ddd6b4a84fd9331e0858a1505ec",
  "workUnitIds": [
    "review.security-trace-authority"
  ],
  "objectives": [
    {
      "workUnitId": "review.security-trace-authority",
      "objective": "Audit V12 security, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundary for release."
    }
  ],
  "modules": [
    {
      "id": "release-review.security-trace-authority",
      "action": "Attack digest substitution, malformed or stale sessions and handoffs, confused-deputy authority, unsafe controls, evidence provenance, V11 trust-root refresh, and any claim that pure core performs host effects.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenV12ReleaseCandidate"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "SecurityTraceAuthorityReleaseReview"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr",
      "kind": "repository",
      "locator": "path:docs/architecture/decisions/0005-immutable-specialist-run-session.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/architecture/decisions/0005-immutable-specialist-run-session.md"
    },
    {
      "sourceId": "context.adversarial-tests",
      "kind": "repository",
      "locator": "path:test/specialist-run.test.mjs",
      "digest": "sha256:46b886df83f4096339d557fcaf0bab4db31f25097a1048df7136aaf93d51b0ef",
      "bytes": 32721,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "test/specialist-run.test.mjs"
    },
    {
      "sourceId": "context.architecture",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
      "digest": "sha256:cbfc5691b997c7aac70e04376bde109f7b8b787a61672a4e3f0c401519417157",
      "bytes": 26018,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md"
    },
    {
      "sourceId": "context.candidate-manifest",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
      "digest": "sha256:af16ab6ce302a85451cd99198d9a8ab93c8b159c47d4a79345248d5c08759c3f",
      "bytes": 8162,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:src/constants.ts",
      "digest": "sha256:b7050ac085a3fcd7dad839e3fbe930ecbf49224d40a37f0a44dd15052bc06058",
      "bytes": 2571,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.debug-notes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/debug-notes.md",
      "digest": "sha256:6b23e256aba35b834105f7a0da2ab085560da8532b688436594dc58a33e4087f",
      "bytes": 11727,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/debug-notes.md"
    },
    {
      "sourceId": "context.diagnostic-catalog",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/diagnostic-catalog.json",
      "digest": "sha256:ca09d174600a7841dcab90b15fe1d95bc9a24f72411704fbe794d2f52dec84a2",
      "bytes": 13307,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
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
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
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
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "test/specialist-run-foundation.test.mjs"
    },
    {
      "sourceId": "context.handoff",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "src/specialist-handoff.ts"
    },
    {
      "sourceId": "context.ide-guide",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:9c321b526902503f845d96e9b20291f41c03a04d5df0098af33388815c03402c",
      "bytes": 22016,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/ide/specialist-agent-kickoff.md"
    },
    {
      "sourceId": "context.implementation-notes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/implementation-notes.md",
      "digest": "sha256:0458b4cfba87efb55027f2fc9123fae4c875f7742dd23383c3b3c781ea92d1c1",
      "bytes": 9911,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/implementation-notes.md"
    },
    {
      "sourceId": "context.index",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f",
      "bytes": 5447,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.inspection-tests",
      "kind": "repository",
      "locator": "path:test/specialist-run-inspection.test.mjs",
      "digest": "sha256:6dcec494c85a807ed5d48e6d710f6c3d83b2d70c453e00d100efb8983eab42f8",
      "bytes": 18218,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "test/specialist-run-inspection.test.mjs"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:7af49d3d12d0f27fd71f785f886d0adfe660e664274e3b12e46423e39b7ad11c",
      "bytes": 2847,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.render",
      "kind": "repository",
      "locator": "path:src/specialist-render.ts",
      "digest": "sha256:e8c2c73bf266b32ebee589497a5298435bb50f59e50d00d9d70ed3f65dc526e7",
      "bytes": 19184,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "src/specialist-render.ts"
    },
    {
      "sourceId": "context.review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/review.md",
      "digest": "sha256:88102e5df58f5cba462e51cebdfe7b859b046403725d8e4fec79f9f597604592",
      "bytes": 598,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/review.md"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:42f53ec000a3cfa69786b0895354ab1b9ab24322305b5ef9d7b33d9a46d13390",
      "bytes": 16223,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/specialist-run-contract.md"
    },
    {
      "sourceId": "context.run-inspection",
      "kind": "repository",
      "locator": "path:src/specialist-run-inspection.ts",
      "digest": "sha256:c20a875b521387aad12831a4508a1fff76371a76d53bc27740dfe527b16eb90e",
      "bytes": 14484,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "src/specialist-run-inspection.ts"
    },
    {
      "sourceId": "context.run-schema",
      "kind": "repository",
      "locator": "path:src/specialist-run-schema.ts",
      "digest": "sha256:705357ee174691f4e5b177f1a9d4ff3abf38adad46ce32264f9dd3f846b5dd23",
      "bytes": 3371,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
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
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
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
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
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
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
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
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "src/specialist-run-types.ts"
    },
    {
      "sourceId": "context.schema-guide",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/README.md",
      "digest": "sha256:e2bd5e0ca5123873d07fe5bdaff4181b38c34a6cbea0220ecb02e78a62f18223",
      "bytes": 20795,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "schemas/v1alpha1/README.md"
    },
    {
      "sourceId": "context.schema-tests",
      "kind": "repository",
      "locator": "path:test/specialist-run-schema.test.mjs",
      "digest": "sha256:71c15cd600444bcf4de98ba5e22f9cd26c77781afc3d58d62bc53fc1618d5491",
      "bytes": 12597,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "test/specialist-run-schema.test.mjs"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/spec.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/test-plan.md",
      "digest": "sha256:694b83cec4e8ef1c56111972d5ea398863071f23cdda9b18c0bddc7e3f0bda8d",
      "bytes": 1930,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/test-plan.md"
    },
    {
      "sourceId": "context.transition-tests",
      "kind": "repository",
      "locator": "path:test/specialist-run-transition.test.mjs",
      "digest": "sha256:bc140c1c1e02a02160c6a7b0ed8399b99dda99d418a6f6f9151039548eb39c28",
      "bytes": 9861,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "test/specialist-run-transition.test.mjs"
    },
    {
      "sourceId": "context.v11-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/approval.json",
      "digest": "sha256:0f75189a9c6ea5ba1c179cfdd2c5b1f13bd83364fb74303d3815e54ca82cdf64",
      "bytes": 195,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/approval.json"
    },
    {
      "sourceId": "context.v11-audit-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass-attempt-32.json",
      "digest": "sha256:8491f7964081601fc42a1bc1e3ad095c30fc3adf7999d827008939ef2d5444b2",
      "bytes": 11662,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass-attempt-32.json"
    },
    {
      "sourceId": "context.v11-compilation",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
      "digest": "sha256:d9fb530c753f9e8987f90198292c53b13d8b5235246a78e62344515e0b2c082a",
      "bytes": 313360,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json"
    },
    {
      "sourceId": "context.v11-goal",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json",
      "digest": "sha256:55d7d298be4d565ea07e971d33447531166e5d4b20d380044ac2295aa365db93",
      "bytes": 101219,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json"
    },
    {
      "sourceId": "context.v11-launch-authorization",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/launch-authorization.json",
      "digest": "sha256:cf50b7bf37035442aa7e20e02f2fcab8ff2e2f10b89779d6e49d4a698e74bffb",
      "bytes": 985,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/launch-authorization.json"
    },
    {
      "sourceId": "context.v11-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json",
      "digest": "sha256:ec3b6097f49dd779add089bdeb6aca817ad0cec99f6c64c7919b8bfed6b522d2",
      "bytes": 2255,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json"
    },
    {
      "sourceId": "context.v11-report",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/report.json",
      "digest": "sha256:4f3f99a452ae7901fef0f763269996f27e10470c958b217d1c89aef27e20d8e3",
      "bytes": 25696,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/report.json"
    },
    {
      "sourceId": "context.v12-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
      "digest": "sha256:985aac5600d600af68be12d6d8f258ce262a1f5ee0d0490d5e85c55dc0ebb103",
      "bytes": 1878,
      "purposes": [
        "Audit exact V12 identity, authority, evidence, trust-root, and host boundaries."
      ],
      "workUnitIds": [
        "review.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "audit.security-trace-authority"
    ],
    "scope": {
      "read": [
        "docs/architecture/decisions/0005-immutable-specialist-run-session.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/approval.json",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass-attempt-32.json",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/launch-authorization.json",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/report.json",
        "docs/specs/v12-ide-run-loop/debug-notes.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
        "docs/specs/v12-ide-run-loop/implementation-notes.md",
        "docs/specs/v12-ide-run-loop/review.md",
        "docs/specs/v12-ide-run-loop/spec.md",
        "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/test-plan.md",
        "docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
        "package.json",
        "schemas/v1alpha1/README.md",
        "schemas/v1alpha1/diagnostic-catalog.json",
        "schemas/v1alpha1/specialist-run.schema.json",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/index.ts",
        "src/specialist-handoff.ts",
        "src/specialist-render.ts",
        "src/specialist-run-inspection.ts",
        "src/specialist-run-schema.ts",
        "src/specialist-run-session.ts",
        "src/specialist-run-transition.ts",
        "src/specialist-run-types.ts",
        "test/specialist-run-foundation.test.mjs",
        "test/specialist-run-inspection.test.mjs",
        "test/specialist-run-schema.test.mjs",
        "test/specialist-run-transition.test.mjs",
        "test/specialist-run.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/architecture/decisions/0005-immutable-specialist-run-session.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/approval.json",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass-attempt-32.json",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/launch-authorization.json",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/report.json",
          "docs/specs/v12-ide-run-loop/debug-notes.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
          "docs/specs/v12-ide-run-loop/implementation-notes.md",
          "docs/specs/v12-ide-run-loop/review.md",
          "docs/specs/v12-ide-run-loop/spec.md",
          "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/test-plan.md",
          "docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
          "package.json",
          "schemas/v1alpha1/README.md",
          "schemas/v1alpha1/diagnostic-catalog.json",
          "schemas/v1alpha1/specialist-run.schema.json",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/index.ts",
          "src/specialist-handoff.ts",
          "src/specialist-render.ts",
          "src/specialist-run-inspection.ts",
          "src/specialist-run-schema.ts",
          "src/specialist-run-session.ts",
          "src/specialist-run-transition.ts",
          "src/specialist-run-types.ts",
          "test/specialist-run-foundation.test.mjs",
          "test/specialist-run-inspection.test.mjs",
          "test/specialist-run-schema.test.mjs",
          "test/specialist-run-transition.test.mjs",
          "test/specialist-run.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "git",
          "node",
          "npm"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not edit files, change Git state, access the network, launch descendants, repair findings, or claim that core performs external host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.review.security-trace-authority",
      "criterion": "Audit V12 security, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundary for release.",
      "requirementId": "evidence.security-trace-authority-release-review",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve the exact independent SecurityTraceAuthorityReleaseReview evidence.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "security-trace-authority-release-review.md"
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
    "Authenticate every declared source against its exact byte count and SHA-256 binding before review.",
    "Do not edit files, change Git state, access the network, launch descendants, or repair a finding.",
    "Report findings first with severity and exact file/line evidence; use pass only when this review domain is release-ready.",
    "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Use only local read-only inspection and bounded verification commands; report any command that changes tracked bytes as a failure."
  ],
  "contentDigest": "sha256:c480f8e421ddac1a2e960174ea59b3185137835abcd5125f32e80eef518c2cd5"
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
    "id": "v12.ide-run-loop.release-review",
    "revision": 1,
    "digest": "sha256:a62b75ffda9ec7460e81572548f2cf65665a7683be4c1b41a1f2e8cad1c19dfd"
  },
  "agent": {
    "id": "agent.b4e5d94b2bdecdbf284add38ccaef6584491d69d9cb535668dd36a69a014af34",
    "blueprintDigest": "sha256:c480f8e421ddac1a2e960174ea59b3185137835abcd5125f32e80eef518c2cd5"
  },
  "compilationDigest": "sha256:cd70618e14b23dfae4538c41b6709791238684192b5c000f4e577f0edd6b5fd3",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.security-trace-authority"
  ],
  "artifacts": [
    {
      "name": "security-trace-authority-release-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.security-trace-authority",
      "requirementId": "evidence.security-trace-authority-release-review",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "security-trace-authority-release-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
