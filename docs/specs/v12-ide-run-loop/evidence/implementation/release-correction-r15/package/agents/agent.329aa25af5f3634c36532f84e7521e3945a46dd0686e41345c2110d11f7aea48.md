# Specialist Contract: agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48

Compilation: `sha256:857c536099f5fd9d01b0981593bef6f2e8b40eba774db7fae21c501e3bd3e83f`
Blueprint: `sha256:fefa3e7beecc2fdb107caaf44b9a2adf3b51e1e64a06b76bf1ee5469360ecd81`

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
  "id": "agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 15,
  "goalDigest": "sha256:02f029571c9666185dc15250a85beb77b090f9a34dec69a818a059f26ef97a5d",
  "candidateId": "team.d5b34c0f752993afbbc2e27f904dd3fa1d9629bbdfaeaef86ee65f82cca6f22c",
  "workUnitIds": [
    "fix.r2-correction-context-bound.r15"
  ],
  "objectives": [
    {
      "workUnitId": "fix.r2-correction-context-bound.r15",
      "objective": "Implement and verify bounded, primary-evidence-preserving correction context selection for candidate-bound R2."
    }
  ],
  "modules": [
    {
      "id": "correction.r2-context-bound",
      "action": "Classify correction navigation duplicates, exclude only those paths during reviewer source collection, expose a narrow test seam, and compile the resulting current-candidate request under unchanged limits.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "OverLimitCorrectionReviewContext"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "BoundedPrimaryEvidenceReviewContext"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.candidate-eight-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0482bf3783e085c6cef3111d63003daa5197eca8/canonical-gate-receipt.json",
      "digest": "sha256:aa93e516387afc029ff21ba5d8e4f31cc0787e15ef181c38b1714acdf7c2c76e",
      "bytes": 2295,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0482bf3783e085c6cef3111d63003daa5197eca8/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.candidate-eight-r2-failure",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/0482bf3783e085c6cef3111d63003daa5197eca8/compilation-failure.json",
      "digest": "sha256:61f284ddf626fe2f1c28fe5c7467a4708f6d81ca8d27ff575f63bab22d05738a",
      "bytes": 1655,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/0482bf3783e085c6cef3111d63003daa5197eca8/compilation-failure.json"
    },
    {
      "sourceId": "context.candidate-eight-r2-request",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/0482bf3783e085c6cef3111d63003daa5197eca8/request.json",
      "digest": "sha256:0bd67935d891c31fa06731256f20e296693829696185f72f660a8a7cada03636",
      "bytes": 889037,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/0482bf3783e085c6cef3111d63003daa5197eca8/request.json"
    },
    {
      "sourceId": "context.candidate-eight-retirement",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-8-retirement.md",
      "digest": "sha256:40417d13aa6904d0bd8d72e805893fb0ddaff0c269763e53720300af7bf14bd1",
      "bytes": 1830,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-8-retirement.md"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:ab2c0f09a38e5de51f14c6af1c912bbc37f5ec8c27bd589273202741c94297b9",
      "bytes": 36886,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:src/constants.ts",
      "digest": "sha256:2fded9c023b41dc58ad7b8471d9b3f7dbc5b4566c6fecbb6008829c1c5000b6a",
      "bytes": 2570,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/inputs/correction-contract.md",
      "digest": "sha256:75a0432222baaa818ddff3502ef944beeb2b7be134f9d0eedf41476304ae4576",
      "bytes": 2251,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:63534d6bbc8b840de35cda3ad75f01f2da69f3798fdd85b9352506d13dba9368",
      "bytes": 2931,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-gate.test.mjs",
      "digest": "sha256:681df384c0080e097426274fe66c6c5f440ed82601f0f55baa1cac84e23d0e64",
      "bytes": 16402,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.release-review-r2-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:bfcba840a52b92a622628a0b071a9c1c18731540f7d5b877a40fcf675bf1c495",
      "bytes": 86125,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.revision-fourteen-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json",
      "digest": "sha256:f2dafdb21cf960295ea4d0e1390a60ca5962089037bd2a8bd79a080a270e807e",
      "bytes": 1307,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json"
    },
    {
      "sourceId": "context.specialist-compiler",
      "kind": "repository",
      "locator": "path:src/specialist-compiler.ts",
      "digest": "sha256:2a39a85745de2124464744c9635144e4e878cbea2f2b584ded25adb946798da7",
      "bytes": 69522,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "src/specialist-compiler.ts"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/inputs/test-plan.md",
      "digest": "sha256:9b7b2fe950a1a813a5cabb3392e250c39e36f6d43bf5760c844940cf7a9fda03",
      "bytes": 1245,
      "purposes": [
        "Implement and verify the exact bounded R2 correction-context selector against Candidate 8 failure evidence."
      ],
      "workUnitIds": [
        "fix.r2-correction-context-bound.r15"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/inputs/test-plan.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.r2-correction-context-bound"
    ],
    "scope": {
      "read": [
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-8-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0482bf3783e085c6cef3111d63003daa5197eca8/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/0482bf3783e085c6cef3111d63003daa5197eca8/compilation-failure.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/0482bf3783e085c6cef3111d63003daa5197eca8/request.json",
        "package.json",
        "src/constants.ts",
        "src/specialist-compiler.ts",
        "test/v12-release-gate.test.mjs"
      ],
      "write": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "test/v12-release-gate.test.mjs"
      ],
      "conflictZones": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "test/v12-release-gate.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-8-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0482bf3783e085c6cef3111d63003daa5197eca8/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/0482bf3783e085c6cef3111d63003daa5197eca8/compilation-failure.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/0482bf3783e085c6cef3111d63003daa5197eca8/request.json",
          "package.json",
          "src/constants.ts",
          "src/specialist-compiler.ts",
          "test/v12-release-gate.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "test/v12-release-gate.test.mjs"
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
      "Do not edit outside the two declared files, change Git state, use network access, launch descendants, alter evidence, widen compiler limits, or prepare/compile R2 again for Candidate 8."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.r2-correction-context-bound.r15",
      "criterion": "Candidate-bound R2 compiles within closed context and scope limits while every authoritative correction and security-causal evidence class remains directly reviewable.",
      "requirementId": "evidence.r2-correction-context-bound.r15",
      "kind": "test",
      "duty": "produce",
      "description": "Prove Candidate 8 failure reproduction, correction-root-specific duplicate exclusion, retained primary evidence, bounded counts, successful three-reviewer compilation, full focused tests, and formatter/linter conformance.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "r2-correction-context-bound-r15.md"
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
    "Do not remove package envelopes, approvals, raw handoffs, handoff-verification reports, replans, security-causal sources, gate evidence, or non-navigation evidence.",
    "If native apply_patch fails before mutation, use only an exact precondition-hash-guarded write and verify resulting bytes immediately.",
    "Return only the exact closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Run every focused command in the frozen test plan and report failures truthfully.",
    "Stop if any declared source fails its exact raw digest and byte binding.",
    "Write only the two declared source files; do not alter evidence, Git state, limits, or Candidate 8 outputs."
  ],
  "contentDigest": "sha256:fefa3e7beecc2fdb107caaf44b9a2adf3b51e1e64a06b76bf1ee5469360ecd81"
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
    "revision": 15,
    "digest": "sha256:02f029571c9666185dc15250a85beb77b090f9a34dec69a818a059f26ef97a5d"
  },
  "agent": {
    "id": "agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48",
    "blueprintDigest": "sha256:fefa3e7beecc2fdb107caaf44b9a2adf3b51e1e64a06b76bf1ee5469360ecd81"
  },
  "compilationDigest": "sha256:857c536099f5fd9d01b0981593bef6f2e8b40eba774db7fae21c501e3bd3e83f",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.r2-correction-context-bound.r15"
  ],
  "artifacts": [
    {
      "name": "r2-correction-context-bound-r15.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.r2-correction-context-bound.r15",
      "requirementId": "evidence.r2-correction-context-bound.r15",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "r2-correction-context-bound-r15.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
