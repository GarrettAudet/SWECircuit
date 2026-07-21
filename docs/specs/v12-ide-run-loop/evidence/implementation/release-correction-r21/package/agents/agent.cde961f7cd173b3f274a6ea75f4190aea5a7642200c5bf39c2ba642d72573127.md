# Specialist Contract: agent.cde961f7cd173b3f274a6ea75f4190aea5a7642200c5bf39c2ba642d72573127

Compilation: `sha256:aac7f8e5f78c540bc1d3cf3286fc7f7ae834d446dce903382bf49636f260f407`
Blueprint: `sha256:22ca5ce6c7eeecae50dd4aeebbfecd4078b2d6ce644d1d7dd089c2bef6c0900b`

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
  "id": "agent.cde961f7cd173b3f274a6ea75f4190aea5a7642200c5bf39c2ba642d72573127",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 21,
  "goalDigest": "sha256:99b9d46e82b8d14c77ec06fbc4c7e2e724368eef269db92cd474f92ccf99445e",
  "candidateId": "team.29f48979e245af2f94c46e9c49f6ed5c79d88f14e8247f83af663ce92a83e780",
  "workUnitIds": [
    "fix.production-lifecycle-proof.r21"
  ],
  "objectives": [
    {
      "workUnitId": "fix.production-lifecycle-proof.r21",
      "objective": "Implement and verify the isolated production-entrypoint lifecycle regression and its exact negative routes without changing production bytes."
    }
  ],
  "modules": [
    {
      "id": "verification.production-release-lifecycle",
      "action": "Build a disposable exact Git candidate, invoke the real gate and release-review phases, compare raw outputs and receipts, drive real handoff verification, and prove cleanup.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "RejectedSyntheticRevision20Proof"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "ProductionLifecycleRevision21Proof"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:AGENTS.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.lockfile",
      "kind": "repository",
      "locator": "path:package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "package-lock.json"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2",
      "bytes": 3719,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.r20-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md",
      "digest": "sha256:28fe1d280a76185cd0ffe7abd9eb53cc397c7f6b60c78a2b9d8bfbea73cdf1db",
      "bytes": 1175,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md"
    },
    {
      "sourceId": "context.r20-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/correction-contract.md",
      "digest": "sha256:5d2c13a5e71645a8b9e53490d86f52a74e43d31e24cc3d3961fdb1652bf55cfb",
      "bytes": 7003,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.r20-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoffs/agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880-pass-attempt-1.json",
      "digest": "sha256:2d00b74b48e3057d370334a60162c4bad4c8c45959f60dca1672f2db03e5c13c",
      "bytes": 10353,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoffs/agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880-pass-attempt-1.json"
    },
    {
      "sourceId": "context.r20-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/package-envelope.json",
      "digest": "sha256:4c89982fe9a342be15a97951e6b25d30e44581300777aa884cf5a15dc51a8d16",
      "bytes": 130350,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/package-envelope.json"
    },
    {
      "sourceId": "context.r20-reproductions",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/integration-owner-reproductions.md",
      "digest": "sha256:6505a63c035e6a023e4ec0e2658e5af6269d34e877682d76fb1175e8e42d68ac",
      "bytes": 1779,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/integration-owner-reproductions.md"
    },
    {
      "sourceId": "context.r20-review-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/attempt-history.md",
      "digest": "sha256:93ad7851321af78560736fbb40c9a5019b4c786be4d79104520072b66b78501c",
      "bytes": 1284,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/attempt-history.md"
    },
    {
      "sourceId": "context.r20-review-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/inputs/review-contract.md",
      "digest": "sha256:52c691f0b9f6a1d1bfb801f60c45f4bf98a995d31793ce727928e70a7e63db95",
      "bytes": 2265,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/inputs/review-contract.md"
    },
    {
      "sourceId": "context.r20-review-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/handoffs/agent.d0ed1cc274e25cc8c853efd842f293a8155e40437347d904675cdc0caf83d889-fix-attempt-1.json",
      "digest": "sha256:c9799090bd054dca1cb299a39fc4e159dc2be6b7f70d27ec290e6d4c6b10c161",
      "bytes": 15245,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/handoffs/agent.d0ed1cc274e25cc8c853efd842f293a8155e40437347d904675cdc0caf83d889-fix-attempt-1.json"
    },
    {
      "sourceId": "context.r20-review-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/package-envelope.json",
      "digest": "sha256:9ae12fae5405eec7050d8b6a7f8c13d919c0ac9325bcf67a6462b58d25c079cf",
      "bytes": 111474,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/package-envelope.json"
    },
    {
      "sourceId": "context.r20-review-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/handoff-verification.json",
      "digest": "sha256:7fb46adc270b8770de52f019dd62fbd902966276e8346c0750d08c8602480d47",
      "bytes": 1322,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/handoff-verification.json"
    },
    {
      "sourceId": "context.r20-test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md",
      "digest": "sha256:6f1cae601ae51b01f0222434756deba518662ea701ff14ba1848598c89a98d6f",
      "bytes": 3689,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md"
    },
    {
      "sourceId": "context.r20-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json",
      "digest": "sha256:1fc164d225aa49f2d5192d9f3a35c05a7e31cc4297a7c8362a3fd096229b2c2d",
      "bytes": 1323,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json"
    },
    {
      "sourceId": "context.r21-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/inputs/correction-contract.md",
      "digest": "sha256:cf6c541d695071b58d9bb47297a3e01295abc259af2002466b6f846d3f05436e",
      "bytes": 3731,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.r21-test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/inputs/test-plan.md",
      "digest": "sha256:b599ab5fe3d1a0078a9168ee2cd13fd53c97b1bf8c412faca674927f371aea1f",
      "bytes": 1931,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/inputs/test-plan.md"
    },
    {
      "sourceId": "context.release-gate-parent",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-gate.test.mjs",
      "digest": "sha256:07733f1e6db96753a0a4c7a2d8e80a6978a43216d766a98d05a8147b074059e1",
      "bytes": 33983,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.release-review-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:962be0fe8055a62b4d8f4d38994c4a8560d880acf4b6b903a0d59e80eeb25dbd",
      "bytes": 122299,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-parent",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-review.mjs",
      "digest": "sha256:65f6e19e89d345b114219e24228327ca5f8803b2c51b3c47809ca1fc56a90e4e",
      "bytes": 83371,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "scripts/run-v12-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-review.test.mjs",
      "digest": "sha256:5a6fd60a28d2d5ea9bb7ad3c8cbf5ee8212e2da6eafa91d2cba9f002215613ab",
      "bytes": 47904,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "test/v12-release-review.test.mjs"
    },
    {
      "sourceId": "context.release-review-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.specialist-run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement the exact Revision 21 production-path behavioral proof while preserving all production bytes and prior evidence."
      ],
      "workUnitIds": [
        "fix.production-lifecycle-proof.r21"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/specialist-run-contract.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "test.release-evidence-lifecycle"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/handoffs/agent.d0ed1cc274e25cc8c853efd842f293a8155e40437347d904675cdc0caf83d889-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/inputs/review-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoffs/agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880-pass-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/integration-owner-reproductions.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "package-lock.json",
        "package.json",
        "scripts/run-v12-release-gate.mjs",
        "scripts/run-v12-release-review.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "write": [
        "test/helpers/v12-release-review-lifecycle.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "conflictZones": [
        "test/helpers/v12-release-review-lifecycle.mjs",
        "test/v12-release-review.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "AGENTS.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/handoffs/agent.d0ed1cc274e25cc8c853efd842f293a8155e40437347d904675cdc0caf83d889-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/inputs/review-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoffs/agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880-pass-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/integration-owner-reproductions.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "package-lock.json",
          "package.json",
          "scripts/run-v12-release-gate.mjs",
          "scripts/run-v12-release-review.mjs",
          "test/v12-release-gate.test.mjs",
          "test/v12-release-review.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "test/helpers/v12-release-review-lifecycle.mjs",
          "test/v12-release-review.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "git",
          "node",
          "npm",
          "powershell"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not edit production files or prior evidence, change dependencies or lockfile, mutate repository Git state, use network access, launch descendants, refresh V11, run a gate or R2 against the real repository, claim release readiness, or merge. Temporary isolated test repositories and their cleanup are allowed only outside the source repository."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.production-lifecycle-proof.r21",
      "criterion": "Actual copied production entrypoints complete and prove the isolated gate, compile, approve, verify, output, handoff, receipt, promotion, and negative-route lifecycle while every production source byte remains exact.",
      "requirementId": "evidence.fix.production-lifecycle-proof.r21",
      "kind": "test",
      "duty": "produce",
      "description": "Provide exact source identities, fixture commit and exception, raw shared-output comparisons, package pair, handoff fan-in, parent receipts, negative routes, focused checks, cleanup, and residual boundaries.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "production-lifecycle-proof-r21.md"
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
    "Do not change the six frozen production files, package metadata, lockfile, or any prior evidence.",
    "Do not claim V11 refresh, candidate release evidence, hosted CI, release readiness, or merge.",
    "Do not describe compiler-helper projections or regex checks as production lifecycle proof.",
    "Run every frozen check and return only the generated contract's closed SpecialistAgentHandoff JSON.",
    "Stop before editing if any declared context byte count or SHA-256 binding fails.",
    "The isolated fixture must remain outside the source repository, use no network, and be removed after execution even on failure.",
    "The positive test must invoke copied production gate, parent, harness phases, and verifier in separate real processes and compare actual raw outputs."
  ],
  "contentDigest": "sha256:22ca5ce6c7eeecae50dd4aeebbfecd4078b2d6ce644d1d7dd089c2bef6c0900b"
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
    "revision": 21,
    "digest": "sha256:99b9d46e82b8d14c77ec06fbc4c7e2e724368eef269db92cd474f92ccf99445e"
  },
  "agent": {
    "id": "agent.cde961f7cd173b3f274a6ea75f4190aea5a7642200c5bf39c2ba642d72573127",
    "blueprintDigest": "sha256:22ca5ce6c7eeecae50dd4aeebbfecd4078b2d6ce644d1d7dd089c2bef6c0900b"
  },
  "compilationDigest": "sha256:aac7f8e5f78c540bc1d3cf3286fc7f7ae834d446dce903382bf49636f260f407",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.production-lifecycle-proof.r21"
  ],
  "artifacts": [
    {
      "name": "production-lifecycle-proof-r21.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.production-lifecycle-proof.r21",
      "requirementId": "evidence.fix.production-lifecycle-proof.r21",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "production-lifecycle-proof-r21.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
