# Specialist Contract: agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880

Compilation: `sha256:54cc2d2d71a36f35e41b76fb4da28301ca73b3e154dcf683456a510d52e6546d`
Blueprint: `sha256:80246c82d4f48fcb459d639920986008a9e6291178fb916994795b360f7206df`

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
  "id": "agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 20,
  "goalDigest": "sha256:97e7bc05737d098b6f9e48723562e058218d3c36d0ea35095d74d18f582e8f97",
  "candidateId": "team.0d4198308a44bec5947a2119702a917b59781e01fa925c3537e79452995e09ea",
  "workUnitIds": [
    "fix.stable-reconstruction-authority.r20"
  ],
  "objectives": [
    {
      "workUnitId": "fix.stable-reconstruction-authority.r20",
      "objective": "Implement stable reconstruction identity, phase-scoped authority, true cross-invocation package tests, truthful approval labeling, Unicode path closure, and repository-disjoint cache validation."
    }
  ],
  "modules": [
    {
      "id": "correction.stable-reconstruction-authority",
      "action": "Separate stable package inputs from per-phase authority, enforce exact path/cache boundaries, and prove the complete compile-to-verify identity lifecycle behaviorally.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "RejectedRevision19ReleaseReviewProtocol"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "StableRevision20ReleaseReviewProtocol"
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
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.ignore-policy",
      "kind": "repository",
      "locator": "path:.gitignore",
      "digest": "sha256:790a8c26a42342f3b5143df2e56b9c43145c2faa5758f443b63cb52b85d9b8a8",
      "bytes": 732,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": ".gitignore"
    },
    {
      "sourceId": "context.independent-review-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/attempt-history.md",
      "digest": "sha256:65869e2755d0aecca872cfbf7db240f3e80a73941d79cf8a755cc858d4aaefc4",
      "bytes": 1671,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/attempt-history.md"
    },
    {
      "sourceId": "context.independent-review-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoffs/agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2-fix-attempt-1.json",
      "digest": "sha256:3e9b1b368f22be254a5835f667be23d19c58f0e3509aec490c0f5e878e69bb41",
      "bytes": 14245,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoffs/agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2-fix-attempt-1.json"
    },
    {
      "sourceId": "context.independent-review-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/package-envelope.json",
      "digest": "sha256:d1a353153617653c72a6d5edfcd655585504b527ea2a337fff289d8be0b7699f",
      "bytes": 90220,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/package-envelope.json"
    },
    {
      "sourceId": "context.independent-review-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoff-verification.json",
      "digest": "sha256:671360cccf1c7857416151d69e42a0c8505941691a543583fa285549cdcaa997",
      "bytes": 1322,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoff-verification.json"
    },
    {
      "sourceId": "context.integration-owner-reproductions",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/integration-owner-reproductions.md",
      "digest": "sha256:6505a63c035e6a023e4ec0e2658e5af6269d34e877682d76fb1175e8e42d68ac",
      "bytes": 1779,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/integration-owner-reproductions.md"
    },
    {
      "sourceId": "context.lockfile",
      "kind": "repository",
      "locator": "path:package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "package-lock.json"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:15124893f7d12f21b75681ef7b8744509860d3490c378014e9d5f63b0bb01d54",
      "bytes": 3609,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-gate-parent",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-gate.test.mjs",
      "digest": "sha256:31f323f50669a6cb0799c4b9bd32d71652dee14540ae91857cfde8c7ab1774cf",
      "bytes": 33280,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.release-review-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:6a2b0e28509b01255967b50a437eec9b761dab4cff6b18cd7644a51ff46420bc",
      "bytes": 117689,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-parent",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-review.mjs",
      "digest": "sha256:69d9888dd7d8584b5da1efe532f91ccf9e69d18d5b088055271c14e3d390664c",
      "bytes": 76900,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "scripts/run-v12-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-review.test.mjs",
      "digest": "sha256:10db954205fe53999baad30c401c8cdf3f659104b3f2c6ac3323ac83f6cb33fd",
      "bytes": 31450,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "test/v12-release-review.test.mjs"
    },
    {
      "sourceId": "context.release-review-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:dcd0fef854738bc163ac8c0c6213de8a63479d3edc8fc4ca22be2dc9f1d9f39b",
      "bytes": 27087,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.revision-nineteen-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md",
      "digest": "sha256:94e0a131ab1bc9a347e8ef6eb693501edda9b17b11ce16a336e622be9a74aec4",
      "bytes": 2623,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md"
    },
    {
      "sourceId": "context.revision-nineteen-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md",
      "digest": "sha256:d54ecc1b6e2f6b3079ea133a90066fa0a8b88e9f3a08c47924ec14eb1a3d55f1",
      "bytes": 8193,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.revision-nineteen-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json",
      "digest": "sha256:ee8665855792db9c241afadff4b300ad55bf71d25f6e930933d18b0931bba894",
      "bytes": 5918,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json"
    },
    {
      "sourceId": "context.revision-nineteen-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/package-envelope.json",
      "digest": "sha256:572c54f6e3f86d28c5f4986442e3629907d3056f51e3751b2b09c4b000e78d57",
      "bytes": 114039,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/package-envelope.json"
    },
    {
      "sourceId": "context.revision-nineteen-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json",
      "digest": "sha256:8c9e469f10f719394b086fa74d172fdfd2a2c40afdd3d0855df7a22589a47125",
      "bytes": 1322,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json"
    },
    {
      "sourceId": "context.revision-twenty-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/correction-contract.md",
      "digest": "sha256:5d2c13a5e71645a8b9e53490d86f52a74e43d31e24cc3d3961fdb1652bf55cfb",
      "bytes": 7003,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.revision-twenty-test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md",
      "digest": "sha256:6f1cae601ae51b01f0222434756deba518662ea701ff14ba1848598c89a98d6f",
      "bytes": 3689,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/specialist-run-contract.md"
    },
    {
      "sourceId": "context.schema-runtime",
      "kind": "repository",
      "locator": "path:src/schema.ts",
      "digest": "sha256:ca9fa3d90ba27bea2de8f095b083a8d729bbed93a64aa14988c47c4c20ca6c63",
      "bytes": 6873,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "src/schema.ts"
    },
    {
      "sourceId": "context.specialist-entrypoint",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f",
      "bytes": 5447,
      "purposes": [
        "Implement and behaviorally verify Revision 20 from exact source, producer evidence, independent findings, and integration-owner reproductions."
      ],
      "workUnitIds": [
        "fix.stable-reconstruction-authority.r20"
      ],
      "readScope": "src/index.ts"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.release-evidence-identity"
    ],
    "scope": {
      "read": [
        ".gitignore",
        "AGENTS.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoffs/agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/integration-owner-reproductions.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "package-lock.json",
        "package.json",
        "scripts/run-v12-release-gate.mjs",
        "scripts/run-v12-release-review.mjs",
        "src/index.ts",
        "src/schema.ts",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "write": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-review.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "conflictZones": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-review.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".gitignore",
          "AGENTS.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoffs/agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/integration-owner-reproductions.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "package-lock.json",
          "package.json",
          "scripts/run-v12-release-gate.mjs",
          "scripts/run-v12-release-review.mjs",
          "src/index.ts",
          "src/schema.ts",
          "test/v12-release-gate.test.mjs",
          "test/v12-release-review.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "package.json",
          "scripts/run-v12-release-review.mjs",
          "test/v12-release-gate.test.mjs",
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
      "Do not edit outside the six-file scope, mutate prior evidence, change dependencies or lockfile, change compiler or schemas, mutate Git state, use network access, run lifecycle scripts, launch descendants, refresh V11, run a candidate gate or R2 phase, claim release readiness, or merge."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.stable-reconstruction-authority.r20",
      "criterion": "One stable package pair survives fresh compile, approve, and verify reconstruction; phase authority remains separately bound; Unicode and cache overlaps fail closed; prior trust controls remain intact.",
      "requirementId": "evidence.fix.stable-reconstruction-authority.r20",
      "kind": "test",
      "duty": "produce",
      "description": "Provide exact six-file identity, stable/authority digest evidence, cross-invocation success and negative cases, Unicode/cache adversarial results, focused checks, and residual host boundaries.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "stable-reconstruction-authority-correction-r20.md"
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
    "A compile pair must survive fresh approve and verify reconstruction under exact positive and negative behavioral tests.",
    "Do not claim authenticated owner identity, host isolation, cache provenance, release readiness, hosted CI, merge, or external runtime effects.",
    "Do not feed owner expectations, raw handoffs, or their digests into candidate manifest, request, compilation, package, prepare output, or compile output identity.",
    "Edit only the six declared files and preserve every prior evidence artifact.",
    "Reject non-scalar/control path text and cache/repository realpath overlap before filesystem or cache-using process access.",
    "Run every frozen check and return only the generated contract's closed SpecialistAgentHandoff JSON.",
    "Stop before editing if any declared context byte count or SHA-256 binding fails."
  ],
  "contentDigest": "sha256:80246c82d4f48fcb459d639920986008a9e6291178fb916994795b360f7206df"
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
    "revision": 20,
    "digest": "sha256:97e7bc05737d098b6f9e48723562e058218d3c36d0ea35095d74d18f582e8f97"
  },
  "agent": {
    "id": "agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880",
    "blueprintDigest": "sha256:80246c82d4f48fcb459d639920986008a9e6291178fb916994795b360f7206df"
  },
  "compilationDigest": "sha256:54cc2d2d71a36f35e41b76fb4da28301ca73b3e154dcf683456a510d52e6546d",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.stable-reconstruction-authority.r20"
  ],
  "artifacts": [
    {
      "name": "stable-reconstruction-authority-correction-r20.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.stable-reconstruction-authority.r20",
      "requirementId": "evidence.fix.stable-reconstruction-authority.r20",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "stable-reconstruction-authority-correction-r20.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
