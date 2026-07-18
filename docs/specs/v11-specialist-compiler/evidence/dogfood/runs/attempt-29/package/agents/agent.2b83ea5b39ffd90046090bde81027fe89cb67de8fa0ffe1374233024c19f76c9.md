# Specialist Contract: agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9

Compilation: `sha256:10cc520eb9c4f277876e76cd82908baa3cfcc01e1b84d5ae7c16d910b88075da`
Blueprint: `sha256:1cc8178fc0026240f4984845b133b987cdb124a57da7f1a8db63b9e4709cef3f`

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
  "id": "agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 29,
  "goalDigest": "sha256:286beb788fb2b99cd823858b6104792f5e7c00850e57e5488f80b05c5f2ee72b",
  "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "workUnitIds": [
    "integrate.release"
  ],
  "objectives": [
    {
      "workUnitId": "integrate.release",
      "objective": "Integrate independent handoffs, update traceable V11 artifacts and memory, and prepare the milestone without merging."
    }
  ],
  "modules": [
    {
      "id": "integrate.release",
      "action": "Resolve review findings and assemble source-linked owner approval evidence.",
      "inputPorts": [
        {
          "name": "reviews",
          "artifactType": "IndependentReviews"
        },
        {
          "name": "verification",
          "artifactType": "ReleaseGateEvidence"
        }
      ],
      "outputPorts": [
        {
          "name": "milestone",
          "artifactType": "VersionMilestone"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972",
    "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
    "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
    "agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc"
  ],
  "contextUses": [
    {
      "sourceId": "context.active-memory",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/active-context-before-integration.md",
      "digest": "sha256:b4c43dd636058a66b46dea186195cbef3f98ce4e28d273aa2bc5934017219579",
      "bytes": 34799,
      "purposes": [
        "Promote source-linked durable learning."
      ],
      "workUnitIds": [
        "integrate.release"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/active-context-before-integration.md"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:813d53058e1c3bde7b1c434d1868375560f4802a3bb484b1a460685954759ef9",
      "bytes": 36449,
      "purposes": [
        "Preserve the final compiler boundary."
      ],
      "workUnitIds": [
        "integrate.release"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:bc164b251bfd2c79be1c6bd6a1906e8172d49135b43f3cc48bdb60295abeccb4",
      "bytes": 7487,
      "purposes": [
        "Keep public status accurate."
      ],
      "workUnitIds": [
        "integrate.release"
      ],
      "readScope": "README.md"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
      "digest": "sha256:1447f0653a846eb6fabf2ffa15ac309f8006bebed0238b912186544de513002e",
      "bytes": 21237,
      "purposes": [
        "Close acceptance criteria against immutable pre-integration input."
      ],
      "workUnitIds": [
        "integrate.release"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md"
    },
    {
      "sourceId": "context.two-phase-prelaunch-review",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
      "digest": "sha256:2b7443465ac1988f83d955c37e4b89c0dfdc15ba7ef57eec7bd7684970038233",
      "bytes": 12409,
      "purposes": [
        "Require independent prelaunch audit PASS before candidate integration."
      ],
      "workUnitIds": [
        "integrate.release"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "integrate.release"
    ],
    "scope": {
      "read": [
        "README.md",
        "docs/memory/**",
        "docs/milestones/v11.md",
        "docs/specs/v11-specialist-compiler/**",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/active-context-before-integration.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md"
      ],
      "write": [
        "docs/memory/**",
        "docs/milestones/v11.md",
        "docs/specs/v11-specialist-compiler/**"
      ],
      "conflictZones": [
        "v11.release-artifacts"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "README.md",
          "docs/memory/**",
          "docs/milestones/v11.md",
          "docs/specs/v11-specialist-compiler/**",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/active-context-before-integration.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/memory/**",
          "docs/milestones/v11.md",
          "docs/specs/v11-specialist-compiler/**"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "git",
          "powershell",
          "rg"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access a network or provider.",
      "Do not execute or dispatch runtime agents from core.",
      "Do not merge or update durable memory before integration review.",
      "Do not widen reviewed filesystem authority."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.release",
      "criterion": "Read-only first-run with a current retained approval, strict public schema registry, both clean packed-consumer hosts, canonical verification, raw handoff assessment, integration replay, and source-linked release evidence are complete before owner approval.",
      "requirementId": "evidence.release-record",
      "kind": "artifact",
      "duty": "produce",
      "description": "Integrated V11 review, memory, and milestone artifacts.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "v11.integration-owner",
    "artifacts": [
      "history-ledger-entry",
      "review.md",
      "v11-milestone.md"
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
    "Stop before merge; owner approval remains mandatory.",
    "Stop if any independent review returns REVISE.",
    "Stop unless the separate prelaunch audit is approval-bound, verified, and PASS before candidate launch approval."
  ],
  "contentDigest": "sha256:1cc8178fc0026240f4984845b133b987cdb124a57da7f1a8db63b9e4709cef3f"
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
  "destination": "v11.integration-owner",
  "goal": {
    "id": "v11.specialist-compiler.release",
    "revision": 29,
    "digest": "sha256:286beb788fb2b99cd823858b6104792f5e7c00850e57e5488f80b05c5f2ee72b"
  },
  "agent": {
    "id": "agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9",
    "blueprintDigest": "sha256:1cc8178fc0026240f4984845b133b987cdb124a57da7f1a8db63b9e4709cef3f"
  },
  "compilationDigest": "sha256:10cc520eb9c4f277876e76cd82908baa3cfcc01e1b84d5ae7c16d910b88075da",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "integrate.release"
  ],
  "artifacts": [
    {
      "name": "history-ledger-entry",
      "mediaType": "text/plain",
      "content": "Replace with the complete artifact content."
    },
    {
      "name": "review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    },
    {
      "name": "v11-milestone.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.release",
      "requirementId": "evidence.release-record",
      "kind": "artifact",
      "duty": "produce",
      "status": "pass",
      "artifact": "history-ledger-entry"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
