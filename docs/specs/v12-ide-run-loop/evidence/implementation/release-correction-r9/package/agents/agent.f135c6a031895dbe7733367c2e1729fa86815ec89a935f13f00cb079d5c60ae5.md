# Specialist Contract: agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5

Compilation: `sha256:ca0488cd362c3757183da85238001ff1e14e9dee702bf58af27347684a4cdc6d`
Blueprint: `sha256:2f8c267ce00799d1224eb91b4071fd7f834411cedc4845cacc09a727b4c17c34`

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
  "id": "agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 9,
  "goalDigest": "sha256:20e576ae7355d0d211e821d54cb92384ff955d4fb04f6c2e514db70df0cf2cf1",
  "candidateId": "team.59b948ad11fb237a562e51576c451f14544a12a7a9ee91e63f9d26c778f74b36",
  "workUnitIds": [
    "fix.release-proof-closure.r9"
  ],
  "objectives": [
    {
      "workUnitId": "fix.release-proof-closure.r9",
      "objective": "Prove the canonical command used only exact committed candidate source bytes and give R2 every primary source required to audit the causal gate and schema corrections."
    }
  ],
  "modules": [
    {
      "id": "correction.release-proof-closure",
      "action": "Materialize and authenticate the exact candidate Git tree before running the canonical command, close and validate the stronger receipt in R2, bind the six omitted security sources, and add focused adversarial regression coverage.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "TrackedOnlyCandidateGateAndIncompleteReviewContext"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "CommittedSourceGateAndSourceCompleteReviewContext"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.candidate-three-gate-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/4ad12367cc0b36ea460ceabc48e5a41ca662e3df/canonical-gate-receipt.json",
      "digest": "sha256:cea0b22bca0bd5d6b98f6a679d5439ac39c1ff15d0b9e3334cd7d96a02a43023",
      "bytes": 1335,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/4ad12367cc0b36ea460ceabc48e5a41ca662e3df/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.candidate-three-product-review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/handoffs/agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627.json",
      "digest": "sha256:3541eaf47cb61457b09dacc16e5c91dbda419a006472a427e3777c6eadb9ce5e",
      "bytes": 6206,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/handoffs/agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627.json"
    },
    {
      "sourceId": "context.gitattributes",
      "kind": "repository",
      "locator": "path:.gitattributes",
      "digest": "sha256:33be9cf5ffcd64e0027b3e11e453d4ae9ec527c665c39afeaf30c3058b7bef37",
      "bytes": 521,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
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
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": ".gitignore"
    },
    {
      "sourceId": "context.handoff-schema-code",
      "kind": "repository",
      "locator": "path:src/specialist-handoff-schema.ts",
      "digest": "sha256:b46e29306e5605092f8923a427fdad431b0d8e4d84d8693af90bdb2c275aa581",
      "bytes": 2275,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "src/specialist-handoff-schema.ts"
    },
    {
      "sourceId": "context.handoff-schema-data",
      "kind": "repository",
      "locator": "path:src/specialist-handoff-schema-data.ts",
      "digest": "sha256:83f9df80b8d48e8ca4bbf2b92cad5b701b3b723aa8b5843d3adb829267c8603c",
      "bytes": 15109,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "src/specialist-handoff-schema-data.ts"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:43414ace7e294a9a173ee78ab33baa5791959921f5da2a1c7b3b69d081938df2",
      "bytes": 2946,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-correction-r8-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json",
      "digest": "sha256:790bfbf9106963bbe22d4360d688ffbf6b0e608284099117fb3d37c8c99ef290",
      "bytes": 641,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json"
    },
    {
      "sourceId": "context.release-correction-r8-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json",
      "digest": "sha256:624577edaed5b154f3c4e90daff0dd06f17187c1fa4aa4128e75eb5914bb3df1",
      "bytes": 8035,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json"
    },
    {
      "sourceId": "context.release-correction-r8-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json",
      "digest": "sha256:8e5a9aae80688d577a554b460040adddb6c8b3988795ca72e97954109426a48c",
      "bytes": 96462,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json"
    },
    {
      "sourceId": "context.release-correction-r8-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json",
      "digest": "sha256:c82903b980ba72b47eadbd54e6c760040bd9f19525326428a4c108599dee95d0",
      "bytes": 1306,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:7e2a341e06794d5ec954cdde22bd6bc686cb677ec5fdddc295c0cb9b5c073f84",
      "bytes": 9624,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-review-r2-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:4102825ca3440dde7211886cd8e0b000bd864779fa8da3372b7283b7da677dcf",
      "bytes": 70358,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
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
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.specialist-schema-code",
      "kind": "repository",
      "locator": "path:src/specialist-schema.ts",
      "digest": "sha256:b651ab211e2551f1df678c7616713ba5c5729a47b1d463c82e3ca95dece349bc",
      "bytes": 2815,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "src/specialist-schema.ts"
    },
    {
      "sourceId": "context.specialist-schema-data",
      "kind": "repository",
      "locator": "path:src/specialist-schema-data.ts",
      "digest": "sha256:1a126dc80a649a26eb984b39c3f33798fe76b957237a73f0800766eef2d10c55",
      "bytes": 26215,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "src/specialist-schema-data.ts"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/test-plan.md",
      "digest": "sha256:719101c2d8f34c0538e5d87515176d432e47460407c70a2c4668bcbbd1c93f9c",
      "bytes": 3097,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/test-plan.md"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r9 contract."
      ],
      "workUnitIds": [
        "fix.release-proof-closure.r9"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.release-proof-closure"
    ],
    "scope": {
      "read": [
        ".gitattributes",
        ".gitignore",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/handoffs/agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/4ad12367cc0b36ea460ceabc48e5a41ca662e3df/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-gate.mjs",
        "src/specialist-handoff-schema-data.ts",
        "src/specialist-handoff-schema.ts",
        "src/specialist-schema-data.ts",
        "src/specialist-schema.ts",
        "test/v12-release-gate.test.mjs"
      ],
      "write": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-gate.mjs",
        "test/v12-release-gate.test.mjs"
      ],
      "conflictZones": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-gate.mjs",
        "test/v12-release-gate.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".gitattributes",
          ".gitignore",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/handoffs/agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/4ad12367cc0b36ea460ceabc48e5a41ca662e3df/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "package.json",
          "scripts/run-v12-release-gate.mjs",
          "src/specialist-handoff-schema-data.ts",
          "src/specialist-handoff-schema.ts",
          "src/specialist-schema-data.ts",
          "src/specialist-schema.ts",
          "test/v12-release-gate.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "scripts/run-v12-release-gate.mjs",
          "test/v12-release-gate.test.mjs"
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
      "criterionId": "criterion.fix.release-proof-closure.r9",
      "criterion": "Prove the canonical command used only exact committed candidate source bytes and give R2 every primary source required to audit the causal gate and schema corrections.",
      "requirementId": "evidence.release-proof-closure.r9",
      "kind": "review",
      "duty": "produce",
      "description": "Prove an untracked source or test cannot influence the canonical command, bind candidate commit/tree/materialization identity and exact gate outputs, prove R2 includes all six security-critical candidate snapshots, and report focused syntax, format, test, and fail-closed results.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "release-proof-closure-correction-r9.md"
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
  "contentDigest": "sha256:2f8c267ce00799d1224eb91b4071fd7f834411cedc4845cacc09a727b4c17c34"
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
    "revision": 9,
    "digest": "sha256:20e576ae7355d0d211e821d54cb92384ff955d4fb04f6c2e514db70df0cf2cf1"
  },
  "agent": {
    "id": "agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5",
    "blueprintDigest": "sha256:2f8c267ce00799d1224eb91b4071fd7f834411cedc4845cacc09a727b4c17c34"
  },
  "compilationDigest": "sha256:ca0488cd362c3757183da85238001ff1e14e9dee702bf58af27347684a4cdc6d",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.release-proof-closure.r9"
  ],
  "artifacts": [
    {
      "name": "release-proof-closure-correction-r9.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.release-proof-closure.r9",
      "requirementId": "evidence.release-proof-closure.r9",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "release-proof-closure-correction-r9.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
