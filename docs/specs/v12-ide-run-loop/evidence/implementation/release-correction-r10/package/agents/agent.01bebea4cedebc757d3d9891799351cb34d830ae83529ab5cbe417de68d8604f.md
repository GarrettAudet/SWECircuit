# Specialist Contract: agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f

Compilation: `sha256:383a9ee2d20773c8608f7da195f9e7ea5212838dc7d82f0865bc1cefd38e2400`
Blueprint: `sha256:1a13f8154a516a19881955976e4613d3a532718c661dd98fb582c5cac91e6831`

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
  "id": "agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 10,
  "goalDigest": "sha256:379e1b825343fdd4500a23b38f107c53256ae1031383b182f2b21795cabed8d7",
  "candidateId": "team.d4c7dbaebe0263c3b08ab6abb8cfb045c572f0f92053a9dc8c91608e1309b7f2",
  "workUnitIds": [
    "fix.release-review-lifecycle.r10"
  ],
  "objectives": [
    {
      "workUnitId": "fix.release-review-lifecycle.r10",
      "objective": "Give every candidate an immutable, self-contained R2 run while deriving reviewer sources and correction evidence from the exact candidate Git tree."
    }
  ],
  "modules": [
    {
      "id": "correction.release-review-lifecycle",
      "action": "Candidate-address every generated R2 artifact, authenticate harness and verifier candidate identity, replace fixed revision-1-through-8 policy with fail-closed candidate-tree lineage discovery and exact package/handoff verification, snapshot source bytes from Git blobs, and add focused lifecycle and adversarial regressions.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "SingleUseReviewRootAndHardcodedCorrectionChain"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "RepeatableCandidateBoundReleaseReview"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.candidate-three-retirement",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-3-retirement.md",
      "digest": "sha256:d4f8c06ffe5cad4d11d288e226d1983e8bf557ec722afac29cf0d682cb64be6f",
      "bytes": 1920,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-3-retirement.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:43414ace7e294a9a173ee78ab33baa5791959921f5da2a1c7b3b69d081938df2",
      "bytes": 2946,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-correction-r9-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json",
      "digest": "sha256:8745eaa9c90a9c7f8cfc01bc9f668810a31fee3a84281dcdea229d0a26d48da3",
      "bytes": 641,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json"
    },
    {
      "sourceId": "context.release-correction-r9-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json",
      "digest": "sha256:f36ddf35492244b21248fe96a5363f1c7222fb206a4fe11f5d213427c37a4956",
      "bytes": 4584,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json"
    },
    {
      "sourceId": "context.release-correction-r9-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json",
      "digest": "sha256:bd5da675c08f9a4691fe9ea5c211c65d876044ad302ba02d7021ba4ce1e7d30c",
      "bytes": 106478,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json"
    },
    {
      "sourceId": "context.release-correction-r9-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json",
      "digest": "sha256:edd2df13589f4b327ed303bb75992ea79f06d70f0ca1b53730bfa2cfb13e060c",
      "bytes": 1321,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:4358570c4375eb6ed5da902bd83220cfd042051cb96c4171734ea067dcfab4b6",
      "bytes": 20319,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-gate.test.mjs",
      "digest": "sha256:ff86bdfd6986498bd1944bdfedd15fd862beca1c90dd58c208b7ba0b2e92ff2a",
      "bytes": 6070,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.release-review-r2-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:5759c3dcbda018c2ef4dd9cf0f6e317b88ba6e214766a707230659a9d9d2a9f1",
      "bytes": 77356,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
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
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/test-plan.md",
      "digest": "sha256:719101c2d8f34c0538e5d87515176d432e47460407c70a2c4668bcbbd1c93f9c",
      "bytes": 3097,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/test-plan.md"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r10 contract."
      ],
      "workUnitIds": [
        "fix.release-review-lifecycle.r10"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.release-review-lifecycle"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-3-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-gate.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "write": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "conflictZones": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "test/v12-release-review.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-3-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "package.json",
          "scripts/run-v12-release-gate.mjs",
          "test/v12-release-gate.test.mjs",
          "test/v12-release-review.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
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
      "Do not use network access, change Git state, launch descendants, write outside the exact scope, or claim that core performs host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.release-review-lifecycle.r10",
      "criterion": "Give every candidate an immutable, self-contained R2 run while deriving reviewer sources and correction evidence from the exact candidate Git tree.",
      "requirementId": "evidence.release-review-lifecycle.r10",
      "kind": "review",
      "duty": "produce",
      "description": "Prove two candidate identities resolve to disjoint closed run roots; legacy Candidate 3 evidence remains byte-identical; malformed candidates, unsafe handoff paths, missing or non-contiguous correction revisions, substituted package or handoff bytes, and working-tree-only sources fail closed; exact candidate Git blobs become reviewer snapshots; revision 9 and revision 10 are included without a hardcoded terminal count; and focused syntax, format, lint, test, and diff checks pass.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "release-review-lifecycle-correction-r10.md"
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
  "contentDigest": "sha256:1a13f8154a516a19881955976e4613d3a532718c661dd98fb582c5cac91e6831"
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
    "revision": 10,
    "digest": "sha256:379e1b825343fdd4500a23b38f107c53256ae1031383b182f2b21795cabed8d7"
  },
  "agent": {
    "id": "agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f",
    "blueprintDigest": "sha256:1a13f8154a516a19881955976e4613d3a532718c661dd98fb582c5cac91e6831"
  },
  "compilationDigest": "sha256:383a9ee2d20773c8608f7da195f9e7ea5212838dc7d82f0865bc1cefd38e2400",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.release-review-lifecycle.r10"
  ],
  "artifacts": [
    {
      "name": "release-review-lifecycle-correction-r10.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.release-review-lifecycle.r10",
      "requirementId": "evidence.release-review-lifecycle.r10",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "release-review-lifecycle-correction-r10.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
