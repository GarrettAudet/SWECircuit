# Specialist Contract: agent.77cbd4624df552772df28ea44ecbcef421c0247e4dfcf21196b2870559246d8d

Compilation: `sha256:2af08a1285008a1dacf199674fd8bc80f891c92e65b222d57fd2191873726a5a`
Blueprint: `sha256:ed9a77a6ced61a8f38f1aaef8df3c38a76200220f1319a552c93875456c30d75`

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
  "id": "agent.77cbd4624df552772df28ea44ecbcef421c0247e4dfcf21196b2870559246d8d",
  "goalId": "v14.adaptive-orchestration.architecture",
  "goalRevision": 1,
  "goalDigest": "sha256:ada24d46e7f20e173f4b7d486ea995818795f00a3f758f8a8ddeb36c727a666c",
  "candidateId": "team.b99dfd1ff53d4e9ce9dc73381e0ea4641f00bdf736d32b566dd53c2fa3ed3df6",
  "workUnitIds": [
    "review.product-runview"
  ],
  "objectives": [
    {
      "workUnitId": "review.product-runview",
      "objective": "Audit whether an ordinary IDE user can understand, invoke, observe, steer, and trust V14 without repeating V13 ceremony or overstating native UI capabilities."
    }
  ],
  "modules": [
    {
      "id": "review.product-runview",
      "action": "Walk the one-goal experience, serial and parallel paths, assignment explanation, override, failure intervention, RunView, and release story; return concise usability corrections.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenV14ArchitectureCandidate"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "product-runview-review.md"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.v13-milestone",
      "kind": "repository",
      "locator": "path:docs/milestones/v13.md",
      "digest": "sha256:580de2495e685021571af196859b572c1d59ecc8668fd6c0a5594a7b77d87e24",
      "bytes": 3693,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.product-runview"
      ],
      "readScope": "docs/milestones/v13.md"
    },
    {
      "sourceId": "context.v13-review",
      "kind": "repository",
      "locator": "path:docs/specs/v13-dogfood-validation/review.md",
      "digest": "sha256:02f0b2bec10209319937de9b212257e27f272ccf18405fcd351d0dde57f6e79a",
      "bytes": 2052,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.product-runview"
      ],
      "readScope": "docs/specs/v13-dogfood-validation/review.md"
    },
    {
      "sourceId": "context.v14-adr",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/adr-0007.md",
      "digest": "sha256:2cf9fc58b30cea609e9ef7717a99d16e06ff082b8bb85629c2378931c9f7c73d",
      "bytes": 5862,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.product-runview"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/adr-0007.md"
    },
    {
      "sourceId": "context.v14-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/runtime-routing-contract.md",
      "digest": "sha256:03c1bea8757076ca798f6d18a9354e95f64393b9cef3a906c37979e3072da714",
      "bytes": 5309,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.product-runview"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/runtime-routing-contract.md"
    },
    {
      "sourceId": "context.v14-goal",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/goal-synthesis.md",
      "digest": "sha256:1c3e161883ee7b0f998db6ef2a0d564d5d146879c69b8bd5b4dbf9569b34bdd2",
      "bytes": 1888,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.product-runview"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/goal-synthesis.md"
    },
    {
      "sourceId": "context.v14-host-scan",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/host-scan.md",
      "digest": "sha256:867b77b3920f0936e458a41ce693712da65495deaa45665f26e461a4c15050f0",
      "bytes": 6636,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.product-runview"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/host-scan.md"
    },
    {
      "sourceId": "context.v14-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/spec.md",
      "digest": "sha256:fcf5d094f1494b6bd4edd7c5ce7ad8c2a8671f2533daae716aac6c39dedd1478",
      "bytes": 7229,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.product-runview"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.ide-product-usability"
    ],
    "scope": {
      "read": [
        "docs/milestones/v13.md",
        "docs/specs/v13-dogfood-validation/review.md",
        "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/adr-0007.md",
        "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/goal-synthesis.md",
        "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/host-scan.md",
        "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/runtime-routing-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/spec.md"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/milestones/v13.md",
          "docs/specs/v13-dogfood-validation/review.md",
          "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/adr-0007.md",
          "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/goal-synthesis.md",
          "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/host-scan.md",
          "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/runtime-routing-contract.md",
          "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/spec.md"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not write files, run commands, access the network, launch descendants, change Git state, or claim host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.product-runview",
      "criterion": "The one-goal IDE experience, serial baseline, RunView, interventions, and release claims remain simple and understandable.",
      "requirementId": "evidence.product-runview",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve the exact product and RunView usability review.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "product-runview-review.md"
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
    "Do not edit files, run commands, access the network, launch descendants, or change Git state.",
    "Return only the concrete closed SpecialistAgentHandoff JSON object required by the generated contract.",
    "Stop if a declared source is unavailable or differs from its exact digest and byte binding.",
    "Use a non-pass outcome when a material defect remains; do not soften a finding into prose."
  ],
  "contentDigest": "sha256:ed9a77a6ced61a8f38f1aaef8df3c38a76200220f1319a552c93875456c30d75"
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
    "id": "v14.adaptive-orchestration.architecture",
    "revision": 1,
    "digest": "sha256:ada24d46e7f20e173f4b7d486ea995818795f00a3f758f8a8ddeb36c727a666c"
  },
  "agent": {
    "id": "agent.77cbd4624df552772df28ea44ecbcef421c0247e4dfcf21196b2870559246d8d",
    "blueprintDigest": "sha256:ed9a77a6ced61a8f38f1aaef8df3c38a76200220f1319a552c93875456c30d75"
  },
  "compilationDigest": "sha256:2af08a1285008a1dacf199674fd8bc80f891c92e65b222d57fd2191873726a5a",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.product-runview"
  ],
  "artifacts": [
    {
      "name": "product-runview-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.product-runview",
      "requirementId": "evidence.product-runview",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "product-runview-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
