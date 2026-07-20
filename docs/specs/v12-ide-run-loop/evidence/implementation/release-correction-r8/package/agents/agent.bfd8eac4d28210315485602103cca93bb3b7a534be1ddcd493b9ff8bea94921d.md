# Specialist Contract: agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d

Compilation: `sha256:526cb3c687c60ebc99fc1856b2d3ef7b017dfd14fd9772711669d59d34b18fef`
Blueprint: `sha256:19975ccdad35ac6506112366a046f1d3c373b560d6e9842f7df6fee73fdd4eaa`

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
  "id": "agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 8,
  "goalDigest": "sha256:6e589764ff44ebcfd59cddc3a6b64cb452084c301124bc8c3792aacc9977b098",
  "candidateId": "team.bdd681c5d3c5362f4a6952d9b240345a6f96d32757856a1402d08d53450f8913",
  "workUnitIds": [
    "fix.candidate-evidence-byte-integrity.r8"
  ],
  "objectives": [
    {
      "workUnitId": "fix.candidate-evidence-byte-integrity.r8",
      "objective": "Preserve canonical-gate stdout and stderr as exact raw bytes through Git staging, checkout, and R2 consumption."
    }
  ],
  "modules": [
    {
      "id": "correction.candidate-evidence-byte-integrity",
      "action": "Declare only legacy and candidate-addressed canonical gate logs binary in .gitattributes, then make the release wrapper and R2 preparation/revalidation fail closed unless Git reports text, diff, and merge unset for both raw paths while the receipt remains normal text.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "VersionableButAttributeAmbiguousGateEvidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "GitBytePreservingCandidateGateEvidence"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.failed-gate-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
      "digest": "sha256:4c636e486f36c22b74f12fdd4b4470eb9056f63f64eca05058ae6923976bb15c",
      "bytes": 1221,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.failed-gate-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
      "digest": "sha256:4381d1a9ce1c36beb8723eadfb3619288935b9d095de672c450121c23dc0dfad",
      "bytes": 11763,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.failed-gate-stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
      "digest": "sha256:afb6b266dd504cbf89d2cb55b6f9c5c6872fd5636acef8848e2105257aecef12",
      "bytes": 295768,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.gitattributes",
      "kind": "repository",
      "locator": "path:.gitattributes",
      "digest": "sha256:4b44dad78a39990f561a67e639a81058eaca0aee74f82c5d3ee682312e6673a3",
      "bytes": 105,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": ".gitattributes"
    },
    {
      "sourceId": "context.gitignore",
      "kind": "repository",
      "locator": "path:.gitignore",
      "digest": "sha256:790a8c26a42342f3b5143df2e56b9c43145c2faa5758f443b63cb52b85d9b8a8",
      "bytes": 732,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": ".gitignore"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:43414ace7e294a9a173ee78ab33baa5791959921f5da2a1c7b3b69d081938df2",
      "bytes": 2946,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-correction-r7-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json",
      "digest": "sha256:a8074ac4e6a476a42817be111dccd8cca67b43d3d93067a9ff2460989da2fa5a",
      "bytes": 641,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json"
    },
    {
      "sourceId": "context.release-correction-r7-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json",
      "digest": "sha256:1432e2c7a6f7384583d5dc27e155a7148621f6f4cbddd17c3b6bd18dd3991a32",
      "bytes": 5812,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json"
    },
    {
      "sourceId": "context.release-correction-r7-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json",
      "digest": "sha256:9788872c5ee79402dea890f36f36291eaf27c8b46f3d4f9802651f8176a15f73",
      "bytes": 98036,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json"
    },
    {
      "sourceId": "context.release-correction-r7-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json",
      "digest": "sha256:091169f4ca7592f8deb2b84b9930b5eb04361d3ffea3dd767b62ebddb809e53e",
      "bytes": 1306,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:0d10ab5d7717ab0324b47c2002c2dc4e5718126bdcea496354fb38e0e198f5d9",
      "bytes": 7631,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-review-r2-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:ca0c5b3e2648a40824cf9f03843a2bfbc11d668ec0b08212994617d2e27fd512",
      "bytes": 67996,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-r2-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:e30bbf7548d6481935d14db57630e4e5bdaa9aff2df56337b957d07acc83d2aa",
      "bytes": 6984,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/test-plan.md",
      "digest": "sha256:45db81d73288f31c6fff70092337b2ace8e38b476a0f11fafacff9c5e80462b8",
      "bytes": 2744,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/test-plan.md"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r8 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-byte-integrity.r8"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.candidate-evidence-byte-integrity"
    ],
    "scope": {
      "read": [
        ".gitattributes",
        ".gitignore",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-gate.mjs"
      ],
      "write": [
        ".gitattributes",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-gate.mjs"
      ],
      "conflictZones": [
        ".gitattributes",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-gate.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".gitattributes",
          ".gitignore",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "package.json",
          "scripts/run-v12-release-gate.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          ".gitattributes",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "scripts/run-v12-release-gate.mjs"
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
      "Do not use network access, change Git state, launch descendants, write outside the exact scope, or claim that core performs host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.candidate-evidence-byte-integrity.r8",
      "criterion": "Preserve canonical-gate stdout and stderr as exact raw bytes through Git staging, checkout, and R2 consumption.",
      "requirementId": "evidence.candidate-evidence-byte-integrity.r8",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate unchanged Candidate 1 bytes, prove exact binary attributes for legacy and synthetic candidate logs, prove unrelated logs and receipt JSON retain normal policy, prove worktree and staged raw bytes match receipt bindings, and provide fail-closed consumer, path-parity, syntax, format, and whitespace results.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "candidate-evidence-byte-integrity-correction-r8.md"
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
  "contentDigest": "sha256:19975ccdad35ac6506112366a046f1d3c373b560d6e9842f7df6fee73fdd4eaa"
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
    "revision": 8,
    "digest": "sha256:6e589764ff44ebcfd59cddc3a6b64cb452084c301124bc8c3792aacc9977b098"
  },
  "agent": {
    "id": "agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d",
    "blueprintDigest": "sha256:19975ccdad35ac6506112366a046f1d3c373b560d6e9842f7df6fee73fdd4eaa"
  },
  "compilationDigest": "sha256:526cb3c687c60ebc99fc1856b2d3ef7b017dfd14fd9772711669d59d34b18fef",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.candidate-evidence-byte-integrity.r8"
  ],
  "artifacts": [
    {
      "name": "candidate-evidence-byte-integrity-correction-r8.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.candidate-evidence-byte-integrity.r8",
      "requirementId": "evidence.candidate-evidence-byte-integrity.r8",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "candidate-evidence-byte-integrity-correction-r8.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
