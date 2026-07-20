# Specialist Contract: agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664

Compilation: `sha256:45fa97ffb1fdb7f95ae33203e9f727c0f66c27a1b2fa344f06a9569b165ae4c2`
Blueprint: `sha256:a1bd224f72e44059217e2df9379f2201b348d52cb7cf6dc5796e85e08db3aef6`

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
  "id": "agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 1,
  "goalDigest": "sha256:1bea0e225945a75a3afad84d628ef7b761d4985840c15c3d82a667e55bdd8388",
  "candidateId": "team.7f129b68e86f4588829f626a4ea14d4f204f16eee03d3a060c389b6433c475ed",
  "workUnitIds": [
    "fix.release-evidence"
  ],
  "objectives": [
    {
      "workUnitId": "fix.release-evidence",
      "objective": "Create the immutable candidate-bound canonical-gate receipt and second release-review harness with source snapshots and complete primary evidence."
    }
  ],
  "modules": [
    {
      "id": "correction.release-evidence",
      "action": "Add a local gate wrapper that preserves exact stdout/stderr bytes and a closed candidate receipt; revise the next review harness to bind an immutable pre-integration review snapshot, raw V12 handoffs, Audit-B approval bytes, gate log and receipt, and all exact reviewer sources before compilation and approval.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "VerifiedReleaseReviewFindings"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "ImmutableReleaseEvidenceHarness"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:7af49d3d12d0f27fd71f785f886d0adfe660e664274e3b12e46423e39b7ad11c",
      "bytes": 2847,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.review-handoff-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
      "digest": "sha256:8e910cf4d124f0611c23f4d6dfe3cc053d7a2ee826fcacca3f287cbce0459e8a",
      "bytes": 3044,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.review-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
      "digest": "sha256:fbce408c5009e88fa08ff33dd1a5ed5d8e9fe949afc6058fa90b5f6f01d595cd",
      "bytes": 24102,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs"
    },
    {
      "sourceId": "context.review-lifecycle",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
      "digest": "sha256:13e1b510607a4c23223b59a0190e3e490be3e95fc94e56dba45cd5e4bf3bdc84",
      "bytes": 5649,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-product",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
      "digest": "sha256:7fb4caf2142208d0735d17bc75610098e671113f1c7a1047cc29bb62ce0e2a26",
      "bytes": 5819,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-security",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
      "digest": "sha256:605a4e7065e1c4af2b3114129e919a810e430b584e31c718c0d78fa02fa027b7",
      "bytes": 7259,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
      "digest": "sha256:8e4f69aae43ae919b3ac71f3055ac80f9bcb30cec936629b64b6f142c3169d42",
      "bytes": 2558,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/specialist-run-contract.md",
      "digest": "sha256:42f53ec000a3cfa69786b0895354ab1b9ab24322305b5ef9d7b33d9a46d13390",
      "bytes": 16223,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/test-plan.md",
      "digest": "sha256:2dc1648ba64fec0573806bea455559a3ac4c678e50f60b99933a4529784fbea4",
      "bytes": 1998,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/test-plan.md"
    },
    {
      "sourceId": "context.v11-audit-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
      "digest": "sha256:9ececde079abbfdc6a37809714047c3a26f4966e2830582e2c53abdd638d9c9d",
      "bytes": 195,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/spec.md"
    },
    {
      "sourceId": "context.verification-handoff-a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
      "digest": "sha256:d2b3ea9c077345fecc78f504a5e376207c367706b9685da4485509fc5c048137",
      "bytes": 4356,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json"
    },
    {
      "sourceId": "context.verification-handoff-b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
      "digest": "sha256:1357ace5bbffef6194e17a43e12edcedd32aa29cc9967cdabd40aa21a004a4d2",
      "bytes": 6031,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json"
    },
    {
      "sourceId": "context.verification-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
      "digest": "sha256:985aac5600d600af68be12d6d8f258ce262a1f5ee0d0490d5e85c55dc0ebb103",
      "bytes": 1878,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.release-evidence"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.release-evidence"
    ],
    "scope": {
      "read": [
        "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-gate.mjs"
      ],
      "write": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "scripts/run-v12-release-gate.mjs"
      ],
      "conflictZones": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "scripts/run-v12-release-gate.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
          "package.json",
          "scripts/run-v12-release-gate.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "scripts/run-v12-release-gate.mjs"
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
      "criterionId": "criterion.fix.release-evidence",
      "criterion": "Create the immutable candidate-bound canonical-gate receipt and second release-review harness with source snapshots and complete primary evidence.",
      "requirementId": "evidence.release-evidence",
      "kind": "review",
      "duty": "produce",
      "description": "Provide script syntax, closed receipt validation, immutable snapshot behavior, primary-source context coverage, and no-summary-only release claim evidence.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "release-evidence-correction.md"
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
  "contentDigest": "sha256:a1bd224f72e44059217e2df9379f2201b348d52cb7cf6dc5796e85e08db3aef6"
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
    "revision": 1,
    "digest": "sha256:1bea0e225945a75a3afad84d628ef7b761d4985840c15c3d82a667e55bdd8388"
  },
  "agent": {
    "id": "agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664",
    "blueprintDigest": "sha256:a1bd224f72e44059217e2df9379f2201b348d52cb7cf6dc5796e85e08db3aef6"
  },
  "compilationDigest": "sha256:45fa97ffb1fdb7f95ae33203e9f727c0f66c27a1b2fa344f06a9569b165ae4c2",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.release-evidence"
  ],
  "artifacts": [
    {
      "name": "release-evidence-correction.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.release-evidence",
      "requirementId": "evidence.release-evidence",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "release-evidence-correction.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
