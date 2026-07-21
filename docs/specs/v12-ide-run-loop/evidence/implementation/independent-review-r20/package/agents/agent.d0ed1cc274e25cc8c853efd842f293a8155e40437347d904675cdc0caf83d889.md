# Specialist Contract: agent.d0ed1cc274e25cc8c853efd842f293a8155e40437347d904675cdc0caf83d889

Compilation: `sha256:92c57726650787cdbf9af9dba9a2ee5c189df6939c6c299510b9c621ab99970f`
Blueprint: `sha256:963f1c246e72e2a9939060267f1995c2103ba92d498fd0f38f9934ee0428663d`

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
  "id": "agent.d0ed1cc274e25cc8c853efd842f293a8155e40437347d904675cdc0caf83d889",
  "goalId": "v12.ide-run-loop.review.stable-reconstruction-authority-r20",
  "goalRevision": 1,
  "goalDigest": "sha256:c4957b26083807d33befae78b06268ab4db0b6c1013b98511c488b3f5d94a71d",
  "candidateId": "team.bca21c918ae34dfd54d014b2201209c1c4a884fdcd1f98fae5ccb654ea4b89a2",
  "workUnitIds": [
    "review.stable-reconstruction-authority.r20"
  ],
  "objectives": [
    {
      "workUnitId": "review.stable-reconstruction-authority.r20",
      "objective": "Authenticate and independently audit exact Revision 20 against the closed review contract and search for new trust-boundary or test-quality defects."
    }
  ],
  "modules": [
    {
      "id": "review.stable-reconstruction-authority",
      "action": "Trace stable identity, phase authority, evidence capture, process boundaries, package closure, promotion, Unicode, cache confinement, and adversarial coverage before returning an independent verdict.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "PackageVerifiedRevision20Implementation"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision20TrustVerdict"
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
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2",
      "bytes": 3719,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.r19-independent-review-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/attempt-history.md",
      "digest": "sha256:65869e2755d0aecca872cfbf7db240f3e80a73941d79cf8a755cc858d4aaefc4",
      "bytes": 1671,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/attempt-history.md"
    },
    {
      "sourceId": "context.r19-independent-review-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoffs/agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2-fix-attempt-1.json",
      "digest": "sha256:3e9b1b368f22be254a5835f667be23d19c58f0e3509aec490c0f5e878e69bb41",
      "bytes": 14245,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoffs/agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2-fix-attempt-1.json"
    },
    {
      "sourceId": "context.r19-independent-review-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoff-verification.json",
      "digest": "sha256:671360cccf1c7857416151d69e42a0c8505941691a543583fa285549cdcaa997",
      "bytes": 1322,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoff-verification.json"
    },
    {
      "sourceId": "context.r20-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/approval.json",
      "digest": "sha256:4e37387f137db57d1eff391916d0d54793a9d2b320dd17f91352002ca6680ade",
      "bytes": 649,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/approval.json"
    },
    {
      "sourceId": "context.r20-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md",
      "digest": "sha256:28fe1d280a76185cd0ffe7abd9eb53cc397c7f6b60c78a2b9d8bfbea73cdf1db",
      "bytes": 1175,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md"
    },
    {
      "sourceId": "context.r20-correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/correction-contract.md",
      "digest": "sha256:5d2c13a5e71645a8b9e53490d86f52a74e43d31e24cc3d3961fdb1652bf55cfb",
      "bytes": 7003,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
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
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoffs/agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880-pass-attempt-1.json"
    },
    {
      "sourceId": "context.r20-handoff-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json",
      "digest": "sha256:1fc164d225aa49f2d5192d9f3a35c05a7e31cc4297a7c8362a3fd096229b2c2d",
      "bytes": 1323,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json"
    },
    {
      "sourceId": "context.r20-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/package-envelope.json",
      "digest": "sha256:4c89982fe9a342be15a97951e6b25d30e44581300777aa884cf5a15dc51a8d16",
      "bytes": 130350,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
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
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/integration-owner-reproductions.md"
    },
    {
      "sourceId": "context.r20-test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md",
      "digest": "sha256:6f1cae601ae51b01f0222434756deba518662ea701ff14ba1848598c89a98d6f",
      "bytes": 3689,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md"
    },
    {
      "sourceId": "context.release-gate-parent",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
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
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
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
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
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
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
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
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
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
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/inputs/review-contract.md",
      "digest": "sha256:52c691f0b9f6a1d1bfb801f60c45f4bf98a995d31793ce727928e70a7e63db95",
      "bytes": 2265,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/inputs/review-contract.md"
    },
    {
      "sourceId": "context.specialist-run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Independently authenticate and audit exact Revision 20 source, tests, producer evidence, and rejected Revision 19 findings."
      ],
      "workUnitIds": [
        "review.stable-reconstruction-authority.r20"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/specialist-run-contract.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoffs/agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/inputs/review-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoffs/agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880-pass-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/integration-owner-reproductions.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "package.json",
        "scripts/run-v12-release-gate.mjs",
        "scripts/run-v12-release-review.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "AGENTS.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/handoffs/agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r20/inputs/review-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoffs/agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880-pass-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/integration-owner-reproductions.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "package.json",
          "scripts/run-v12-release-gate.mjs",
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
          "powershell",
          "rg"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not edit files, install packages, mutate Git state, use network access, launch descendants, refresh V11, run a candidate gate or R2 phase, claim release readiness, approve merge, or alter prior evidence."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.review.stable-reconstruction-authority.r20",
      "criterion": "Exact Revision 20 closes every declared defect, preserves valid Revision 19 controls, proves one package across fresh phase authority, and introduces no release-blocking trust or test-quality finding.",
      "requirementId": "evidence.review.stable-reconstruction-authority.r20",
      "kind": "review",
      "duty": "produce",
      "description": "Provide exact source authentication, disposition of every required review point, new-bypass analysis, test-quality analysis, residual host boundaries, and a concrete pass or correction route.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-revision-20-trust-review.md"
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
    "Do not claim release readiness, hosted CI, merge approval, host isolation, cache provenance, or authenticated human identity.",
    "Remain read-only; report every defect without changing reviewed source or evidence.",
    "Resolve every closed review-contract point and search for new bypasses before returning pass.",
    "Return only the exact closed SpecialistAgentHandoff JSON object from the generated contract.",
    "Stop before semantic review if any declared context byte count or SHA-256 binding fails.",
    "Treat producer tests and handoff as evidence only, never as the semantic verdict."
  ],
  "contentDigest": "sha256:963f1c246e72e2a9939060267f1995c2103ba92d498fd0f38f9934ee0428663d"
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
    "id": "v12.ide-run-loop.review.stable-reconstruction-authority-r20",
    "revision": 1,
    "digest": "sha256:c4957b26083807d33befae78b06268ab4db0b6c1013b98511c488b3f5d94a71d"
  },
  "agent": {
    "id": "agent.d0ed1cc274e25cc8c853efd842f293a8155e40437347d904675cdc0caf83d889",
    "blueprintDigest": "sha256:963f1c246e72e2a9939060267f1995c2103ba92d498fd0f38f9934ee0428663d"
  },
  "compilationDigest": "sha256:92c57726650787cdbf9af9dba9a2ee5c189df6939c6c299510b9c621ab99970f",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.stable-reconstruction-authority.r20"
  ],
  "artifacts": [
    {
      "name": "independent-revision-20-trust-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.stable-reconstruction-authority.r20",
      "requirementId": "evidence.review.stable-reconstruction-authority.r20",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-revision-20-trust-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
