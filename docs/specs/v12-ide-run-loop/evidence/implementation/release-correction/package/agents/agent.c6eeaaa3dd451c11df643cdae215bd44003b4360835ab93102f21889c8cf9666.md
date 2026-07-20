# Specialist Contract: agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666

Compilation: `sha256:45fa97ffb1fdb7f95ae33203e9f727c0f66c27a1b2fa344f06a9569b165ae4c2`
Blueprint: `sha256:a13b55a1f1516a9442639b821472fe16a6918850d4e0063ef84cb0df9aca27a1`

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
  "id": "agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 1,
  "goalDigest": "sha256:1bea0e225945a75a3afad84d628ef7b761d4985840c15c3d82a667e55bdd8388",
  "candidateId": "team.7f129b68e86f4588829f626a4ea14d4f204f16eee03d3a060c389b6433c475ed",
  "workUnitIds": [
    "fix.implementation-dogfood"
  ],
  "objectives": [
    {
      "workUnitId": "fix.implementation-dogfood",
      "objective": "Make canonical V12 dogfood operate on the exact release-correction implementation package and raw handoffs while preserving the existing synthetic API regression journey."
    }
  ],
  "modules": [
    {
      "id": "correction.implementation-dogfood",
      "action": "Extend the deterministic dogfood harness to load the approval-bound release-correction package through public V12 operations, derive contracts from its manifest, record exact raw handoffs, serialize/restore/reinspect, preserve an immutable integration snapshot, and report every AC8 friction metric without claiming host effects.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "VerifiedReleaseReviewFindings"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "ImplementationPackageDogfoodHarness"
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
        "fix.implementation-dogfood"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.ide-guide",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:9c321b526902503f845d96e9b20291f41c03a04d5df0098af33388815c03402c",
      "bytes": 22016,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.implementation-dogfood"
      ],
      "readScope": "docs/ide/specialist-agent-kickoff.md"
    },
    {
      "sourceId": "context.modules-readme",
      "kind": "repository",
      "locator": "path:docs/modules/README.md",
      "digest": "sha256:8293e0fd966ddf2eba089d8bfef2f328489851a789eacd251bbb9d96e58c49e5",
      "bytes": 2744,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.implementation-dogfood"
      ],
      "readScope": "docs/modules/README.md"
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
        "fix.implementation-dogfood"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:6870ce77e4a29a000ff8a8a170d968a735fb339cfac7d412b23080cfc61163dc",
      "bytes": 3101,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.implementation-dogfood"
      ],
      "readScope": "README.md"
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
        "fix.implementation-dogfood"
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
        "fix.implementation-dogfood"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json"
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
        "fix.implementation-dogfood"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.run-inspection",
      "kind": "repository",
      "locator": "path:src/specialist-run-inspection.ts",
      "digest": "sha256:c20a875b521387aad12831a4508a1fff76371a76d53bc27740dfe527b16eb90e",
      "bytes": 14484,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.implementation-dogfood"
      ],
      "readScope": "src/specialist-run-inspection.ts"
    },
    {
      "sourceId": "context.run-session",
      "kind": "repository",
      "locator": "path:src/specialist-run-session.ts",
      "digest": "sha256:0ae9bff6b1727c8e3a5540bb7714288592b93b31de0dc6721a84fd73a6e9a03e",
      "bytes": 18723,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.implementation-dogfood"
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
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.implementation-dogfood"
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
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.implementation-dogfood"
      ],
      "readScope": "src/specialist-run-types.ts"
    },
    {
      "sourceId": "context.specialist-handoff",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.implementation-dogfood"
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
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.implementation-dogfood"
      ],
      "readScope": "src/specialist-render.ts"
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
        "fix.implementation-dogfood"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/test-plan.md"
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
        "fix.implementation-dogfood"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/spec.md"
    },
    {
      "sourceId": "context.verification-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
      "digest": "sha256:e8b25ac1de45cee31aced60c4a811699d03b36121bb660d7e1c18a0f4c4c01a8",
      "bytes": 635,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.implementation-dogfood"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json"
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
        "fix.implementation-dogfood"
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
        "fix.implementation-dogfood"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json"
    },
    {
      "sourceId": "context.verification-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
      "digest": "sha256:74eefd84adae4a34c5220a9e1039d98f1b1fa651e7df3a3f8cfe27a338053777",
      "bytes": 137049,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction contract."
      ],
      "workUnitIds": [
        "fix.implementation-dogfood"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json"
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
        "fix.implementation-dogfood"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.implementation-dogfood"
    ],
    "scope": {
      "read": [
        "README.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/modules/README.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
        "package.json",
        "scripts/run-v12-dogfood.mjs",
        "src/specialist-handoff.ts",
        "src/specialist-render.ts",
        "src/specialist-run-inspection.ts",
        "src/specialist-run-session.ts",
        "src/specialist-run-transition.ts",
        "src/specialist-run-types.ts"
      ],
      "write": [
        "scripts/run-v12-dogfood.mjs"
      ],
      "conflictZones": [
        "scripts/run-v12-dogfood.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "README.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/modules/README.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
          "package.json",
          "scripts/run-v12-dogfood.mjs",
          "src/specialist-handoff.ts",
          "src/specialist-render.ts",
          "src/specialist-run-inspection.ts",
          "src/specialist-run-session.ts",
          "src/specialist-run-transition.ts",
          "src/specialist-run-types.ts"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "scripts/run-v12-dogfood.mjs"
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
      "criterionId": "criterion.fix.implementation-dogfood",
      "criterion": "Make canonical V12 dogfood operate on the exact release-correction implementation package and raw handoffs while preserving the existing synthetic API regression journey.",
      "requirementId": "evidence.implementation-dogfood",
      "kind": "review",
      "duty": "produce",
      "description": "Provide syntax and synthetic-regression evidence plus a finalization contract the integration owner can run only after the exact correction handoffs exist.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "implementation-dogfood-correction.md"
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
  "contentDigest": "sha256:a13b55a1f1516a9442639b821472fe16a6918850d4e0063ef84cb0df9aca27a1"
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
    "id": "agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666",
    "blueprintDigest": "sha256:a13b55a1f1516a9442639b821472fe16a6918850d4e0063ef84cb0df9aca27a1"
  },
  "compilationDigest": "sha256:45fa97ffb1fdb7f95ae33203e9f727c0f66c27a1b2fa344f06a9569b165ae4c2",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.implementation-dogfood"
  ],
  "artifacts": [
    {
      "name": "implementation-dogfood-correction.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.implementation-dogfood",
      "requirementId": "evidence.implementation-dogfood",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "implementation-dogfood-correction.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
