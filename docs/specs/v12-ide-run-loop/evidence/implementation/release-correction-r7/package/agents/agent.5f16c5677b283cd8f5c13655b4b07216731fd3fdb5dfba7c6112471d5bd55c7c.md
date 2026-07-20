# Specialist Contract: agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c

Compilation: `sha256:e7f6a2d27f613ea1a898b781584039dff8704d88a940965814d45b04a5537920`
Blueprint: `sha256:374f0c75a2a31a2d0fb7aa2462c8e30573b1bd64a91909a9daf0191d95b3e5cd`

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
  "id": "agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 7,
  "goalDigest": "sha256:4513970fcccbc4be4173c848fd72bf4b76a4ee52ccc4ae739105d2ffcc30248b",
  "candidateId": "team.95637f6ac2bb74c533055e0666c20a7824db48103f5998e8831bdfedc23284e9",
  "workUnitIds": [
    "fix.candidate-evidence-retention.r7"
  ],
  "objectives": [
    {
      "workUnitId": "fix.candidate-evidence-retention.r7",
      "objective": "Preserve exact canonical-gate raw evidence in Git without weakening the repository's general log-ignore policy."
    }
  ],
  "modules": [
    {
      "id": "correction.candidate-evidence-retention",
      "action": "Add the narrowest durable ignore-policy exception for canonical-gate stdout and stderr evidence, then make the release-gate wrapper and R2 preparation/revalidation reject any required evidence path that Git still classifies as ignored.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "IgnoredCanonicalGateEvidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "VersionableCandidateBoundGateEvidence"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.failed-gate-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
      "digest": "sha256:4c636e486f36c22b74f12fdd4b4470eb9056f63f64eca05058ae6923976bb15c",
      "bytes": 1221,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
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
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
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
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.gitignore",
      "kind": "repository",
      "locator": "path:.gitignore",
      "digest": "sha256:ad4ce9d55303f62f262e18b7e47710d9e43049625c704cbaa46cbb4487bbc8d8",
      "bytes": 340,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
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
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-correction-r6-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json",
      "digest": "sha256:b0a48bde829f601ec4d11abeb5c0f54dcb7123182d2c1fbdb405fc251b28a27c",
      "bytes": 641,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json"
    },
    {
      "sourceId": "context.release-correction-r6-consumer-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json",
      "digest": "sha256:939099add2852e3dfe14b307fc55e46c89b56a1dd0c735d15bf35e82f99a5a68",
      "bytes": 5291,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json"
    },
    {
      "sourceId": "context.release-correction-r6-gate-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json",
      "digest": "sha256:3c95ca87255613bdcb96f0a894a03ce012c4d5662a3379230c07166e56fcf33b",
      "bytes": 5061,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json"
    },
    {
      "sourceId": "context.release-correction-r6-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json",
      "digest": "sha256:08fba946e7d8fd47b112322a4f8ea954922d230de6d2b9fac234bdd297f6540f",
      "bytes": 152251,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json"
    },
    {
      "sourceId": "context.release-correction-r6-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json",
      "digest": "sha256:3d3a406acd342a7c32d22e7cd3a92a0c7db89d74af50d9d394da9a93830c76fb",
      "bytes": 1998,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:552d8a11ed3f05156b935e9f461083ac9e1f00897bc797a0d3fe7c7a7d25822b",
      "bytes": 6999,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-review-r2-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:b41e59d7cf5d905a088c7445f7ede71019be8a15aa17273fe216a60af8fc149c",
      "bytes": 66496,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
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
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/test-plan.md",
      "digest": "sha256:ffa2102cbcf6d145d4f5b0ddbc26b9b02f86433a22b4b99b9f5cb084f605d7ec",
      "bytes": 2506,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/test-plan.md"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r7 contract."
      ],
      "workUnitIds": [
        "fix.candidate-evidence-retention.r7"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.candidate-evidence-retention"
    ],
    "scope": {
      "read": [
        ".gitignore",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-gate.mjs"
      ],
      "write": [
        ".gitignore",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-gate.mjs"
      ],
      "conflictZones": [
        ".gitignore",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-gate.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".gitignore",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/inputs/test-plan.md",
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
          ".gitignore",
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
      "criterionId": "criterion.fix.candidate-evidence-retention.r7",
      "criterion": "Preserve exact canonical-gate raw evidence in Git without weakening the repository's general log-ignore policy.",
      "requirementId": "evidence.candidate-evidence-retention.r7",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate unchanged candidate-1 bytes, prove legacy and synthetic candidate-addressed canonical logs are not ignored while unrelated logs remain ignored, prove wrapper/R2 path parity and fail-closed behavior, and provide syntax, format, and focused regression results.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "candidate-evidence-retention-correction-r7.md"
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
  "contentDigest": "sha256:374f0c75a2a31a2d0fb7aa2462c8e30573b1bd64a91909a9daf0191d95b3e5cd"
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
    "revision": 7,
    "digest": "sha256:4513970fcccbc4be4173c848fd72bf4b76a4ee52ccc4ae739105d2ffcc30248b"
  },
  "agent": {
    "id": "agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c",
    "blueprintDigest": "sha256:374f0c75a2a31a2d0fb7aa2462c8e30573b1bd64a91909a9daf0191d95b3e5cd"
  },
  "compilationDigest": "sha256:e7f6a2d27f613ea1a898b781584039dff8704d88a940965814d45b04a5537920",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.candidate-evidence-retention.r7"
  ],
  "artifacts": [
    {
      "name": "candidate-evidence-retention-correction-r7.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.candidate-evidence-retention.r7",
      "requirementId": "evidence.candidate-evidence-retention.r7",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "candidate-evidence-retention-correction-r7.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
