# Specialist Contract: agent.8f24670b544882730a1763ac030531997dba8400a9cc3c767eceeb1f7a96212d

Compilation: `sha256:6df1f8efc8d938b61f12c2fc6ce82bb5ded3ef10d34476a1c87f8fa63fd3dc79`
Blueprint: `sha256:3eb52fd79c29dbbdb7c4be36032403e368995093449e1a8be039f74b8546e9e3`

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
  "id": "agent.8f24670b544882730a1763ac030531997dba8400a9cc3c767eceeb1f7a96212d",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 22,
  "goalDigest": "sha256:b0e20d588634908c85e3c9891d4500670f95cc65a21bbc9d93f751e665d5bc29",
  "candidateId": "team.cc9f6fc9a3e86ee9f84d8f5f96532acb1d689f36614c7c8dd12b37dc50953860",
  "workUnitIds": [
    "fix.provenance-npm-config.r22"
  ],
  "objectives": [
    {
      "workUnitId": "fix.provenance-npm-config.r22",
      "objective": "Implement and verify reconstructable source provenance plus production-owned private npm configuration across parent, harness, receipts, and lifecycle tests."
    }
  ],
  "modules": [
    {
      "id": "release-review.closed-npm-config",
      "action": "Authenticate immutable pre-edit source, create and validate distinct operation-contained npm configs, remove the masking adapter, and prove the real lifecycle and cleanup.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "BlockedRevision21AndNpm11Reproduction"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "ProvenanceBoundClosedNpmLifecycleProof"
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
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.pre-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/scripts/run-v12-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.pre-gate-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/v12-release-gate.test.mjs",
      "digest": "sha256:07733f1e6db96753a0a4c7a2d8e80a6978a43216d766a98d05a8147b074059e1",
      "bytes": 33983,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.pre-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:962be0fe8055a62b4d8f4d38994c4a8560d880acf4b6b903a0d59e80eeb25dbd",
      "bytes": 122299,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.pre-lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/helpers/v12-release-review-lifecycle.mjs",
      "digest": "sha256:56f5ecc17bd19a0647fb8b835a62e7e5dc28644a16046f4fd9f213970240abde",
      "bytes": 49557,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/helpers/v12-release-review-lifecycle.mjs"
    },
    {
      "sourceId": "context.pre-lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/package-lock.json"
    },
    {
      "sourceId": "context.pre-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/package.json",
      "digest": "sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2",
      "bytes": 3719,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/package.json"
    },
    {
      "sourceId": "context.pre-parent",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/scripts/run-v12-release-review.mjs",
      "digest": "sha256:65f6e19e89d345b114219e24228327ca5f8803b2c51b3c47809ca1fc56a90e4e",
      "bytes": 83371,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/scripts/run-v12-release-review.mjs"
    },
    {
      "sourceId": "context.pre-review-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/v12-release-review.test.mjs",
      "digest": "sha256:2903c1b6d7a41f5d9af7c62146155941392b2645f205eee003c9ae0730ce9fcb",
      "bytes": 42687,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/v12-release-review.test.mjs"
    },
    {
      "sourceId": "context.pre-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.r21-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-attempt-history.md",
      "digest": "sha256:dad5a3055ee56d6295a151274e21c3d5170efd3d30f03e7ed75ca0c0b16c5577",
      "bytes": 2014,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-attempt-history.md"
    },
    {
      "sourceId": "context.r21-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-block-handoff.json",
      "digest": "sha256:0224243c4325b298fb04d6af870f14d70e2b0fa95a5549906e809d5b386155c9",
      "bytes": 14865,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-block-handoff.json"
    },
    {
      "sourceId": "context.r21-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-handoff-verification.json",
      "digest": "sha256:6fbe4c128f305ef0fbd2d76ed01bf049a9d9a74a142e169907d65542fd1f8040",
      "bytes": 1326,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-handoff-verification.json"
    },
    {
      "sourceId": "context.r22-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/correction-contract.md",
      "digest": "sha256:e21440b34ded2ee1cf1454aee5d003eeeca888a65382356a1f75cf92b7ab9530",
      "bytes": 4598,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.r22-reproductions",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/integration-owner-reproductions.md",
      "digest": "sha256:481d79b780504b74971ce4e28f0f8aefd9fbe7c253e346995344c2c3eedff467",
      "bytes": 1621,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/integration-owner-reproductions.md"
    },
    {
      "sourceId": "context.r22-test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/test-plan.md",
      "digest": "sha256:0673e28bfb4c68823daec68bd192d3587bb8f4e47b093fad5e4e3d595cf03992",
      "bytes": 2428,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/test-plan.md"
    },
    {
      "sourceId": "context.specialist-run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement and verify the exact Revision 22 provenance and closed npm configuration contract."
      ],
      "workUnitIds": [
        "fix.provenance-npm-config.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/specialist-run-contract.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "implement.release-review-trust"
    ],
    "scope": {
      "read": [
        ".local/npm-cache/**",
        "AGENTS.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-block-handoff.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/integration-owner-reproductions.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/scripts/run-v12-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/scripts/run-v12-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/helpers/v12-release-review-lifecycle.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/v12-release-gate.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/v12-release-review.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "scripts/run-v12-release-review.mjs",
        "test/helpers/v12-release-review-lifecycle.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "write": [
        ".local/v12-release-gate/**",
        "dist/**",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-review.mjs",
        "test/helpers/v12-release-review-lifecycle.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "conflictZones": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-review.mjs",
        "test/helpers/v12-release-review-lifecycle.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".local/npm-cache/**",
          "AGENTS.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-block-handoff.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/evidence/r21-handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/integration-owner-reproductions.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/scripts/run-v12-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/scripts/run-v12-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/helpers/v12-release-review-lifecycle.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/v12-release-gate.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/pre-edit/test/v12-release-review.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "scripts/run-v12-release-review.mjs",
          "test/helpers/v12-release-review-lifecycle.mjs",
          "test/v12-release-gate.test.mjs",
          "test/v12-release-review.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          ".local/v12-release-gate/**",
          "dist/**",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "scripts/run-v12-release-review.mjs",
          "test/helpers/v12-release-review-lifecycle.mjs",
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
      "Do not edit immutable snapshots, frozen gate or verifier source, package metadata, lockfile, or prior evidence; mutate Git state; use network access; launch descendants; refresh V11; run release phases against the real repository; claim release readiness; or merge."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.provenance-npm-config.r22",
      "criterion": "Every producer input reconstructs, npm 11 runs only with two authenticated private empty config files, host npm configuration stays excluded, and the complete copied-production lifecycle remains exact.",
      "requirementId": "evidence.fix.provenance-npm-config.r22",
      "kind": "test",
      "duty": "produce",
      "description": "Provide exact snapshot and output identities, private config evidence, npm 11 inspection, fixture lifecycle, package pair, handoff fan-in, receipts, negative routes, commands, and cleanup.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "provenance-npm-config-proof-r22.md"
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
    "Do not include invocation-specific temporary config paths in the stable runtime identity.",
    "Do not restore host npm configuration or retain the Revision 21 adapter.",
    "Keep every fixture and config file outside the source repository and remove it on both pass and failure.",
    "Reject config aliasing, substitution, links, non-empty bytes, missing files, and out-of-operation-root paths before npm spawn.",
    "Run every required command and return only the generated closed SpecialistAgentHandoff JSON.",
    "Stop before editing unless every immutable input and corresponding live pre-edit source matches exactly.",
    "The positive test must invoke the copied production gate, parents, harness phases, and verifier in separate real processes."
  ],
  "contentDigest": "sha256:3eb52fd79c29dbbdb7c4be36032403e368995093449e1a8be039f74b8546e9e3"
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
    "revision": 22,
    "digest": "sha256:b0e20d588634908c85e3c9891d4500670f95cc65a21bbc9d93f751e665d5bc29"
  },
  "agent": {
    "id": "agent.8f24670b544882730a1763ac030531997dba8400a9cc3c767eceeb1f7a96212d",
    "blueprintDigest": "sha256:3eb52fd79c29dbbdb7c4be36032403e368995093449e1a8be039f74b8546e9e3"
  },
  "compilationDigest": "sha256:6df1f8efc8d938b61f12c2fc6ce82bb5ded3ef10d34476a1c87f8fa63fd3dc79",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.provenance-npm-config.r22"
  ],
  "artifacts": [
    {
      "name": "provenance-npm-config-proof-r22.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.provenance-npm-config.r22",
      "requirementId": "evidence.fix.provenance-npm-config.r22",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "provenance-npm-config-proof-r22.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
