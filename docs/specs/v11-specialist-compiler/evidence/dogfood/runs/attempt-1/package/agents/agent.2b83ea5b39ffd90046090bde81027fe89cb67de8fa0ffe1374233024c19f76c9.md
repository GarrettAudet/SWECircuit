# Specialist Contract: agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9

Compilation: `sha256:32f615017d7f5b0f7648a6818420857c0ffb258aa6a721d94c685da08b8c6254`
Blueprint: `sha256:84b4fc3e7e200896aa423243acbf8bf096b9bdfd65b7712f5c33089dbb18f22a`

This is the exact provider-neutral task contract approved for this specialist. A host may translate it into runtime-specific instructions, but it must not widen authority, add work, omit evidence, or change the handoff.

## Operating Rules

1. Verify every delivered context item against its declared digest and byte count before using it.
2. Work only on the listed work units, Modules, scopes, capabilities, and permissions.
3. Respect agent dependencies and stop when a stop condition or undeclared decision is reached.
4. Produce every assigned evidence duty and every required handoff field.
5. Report assumptions, risks, failed attempts, and follow-up work; do not silently expand scope.

## Blueprint

```json
{
  "apiVersion": "swecircuit/specialist/v1alpha1",
  "kind": "AgentBlueprint",
  "id": "agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 1,
  "goalDigest": "sha256:325b614ef60ec1260576c8ac42a5d780a9d132cdac3f1a730f89c39619db76c5",
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
      "locator": "path:docs/memory/active-context.md",
      "digest": "sha256:295eda8f03f074083f3aada5ef75cf88f6a90be2e69b62cf55b383884bccc9f3",
      "bytes": 19388,
      "purposes": [
        "Promote source-linked durable learning."
      ],
      "workUnitIds": [
        "integrate.release"
      ],
      "readScope": "docs/memory/active-context.md"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:7bd0d06125648e32e26f7671b23e6cfffff640fdbcc903ce26e94298f76d1721",
      "bytes": 23352,
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
      "digest": "sha256:d1187705b49bcf3ba879ccb507c847e38927fd9794dd4e5670854083fea72b38",
      "bytes": 8137,
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
      "locator": "path:docs/specs/v11-specialist-compiler/spec.md",
      "digest": "sha256:2730c21ed7681b7d6d766cae72ff4159b2bf308d860a0dc45ea100044f02ecb0",
      "bytes": 8132,
      "purposes": [
        "Close acceptance criteria."
      ],
      "workUnitIds": [
        "integrate.release"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "integrate.release"
    ],
    "scope": {
      "read": [
        "README.md",
        "docs/memory/active-context.md",
        "docs/specs/v11-specialist-compiler/spec.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
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
          "docs/memory/active-context.md",
          "docs/specs/v11-specialist-compiler/spec.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/memory/**",
          "docs/milestones/v11.md",
          "docs/specs/v11-specialist-compiler/**"
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
      "criterion": "Canonical verification and source-linked release evidence are complete before owner approval.",
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
    "Stop if any independent review returns REVISE."
  ],
  "contentDigest": "sha256:84b4fc3e7e200896aa423243acbf8bf096b9bdfd65b7712f5c33089dbb18f22a"
}
```
