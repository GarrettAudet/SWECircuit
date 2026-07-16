# Specialist Contract: agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9

Compilation: `sha256:20adea92233a3d6a6d5a852e940a959f37e0b570333999dd784b450d0509687d`
Blueprint: `sha256:2b3c1e568b668689798096c38ec8aed280a127eaa787a2b69d2b369ddd323fce`

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
  "goalRevision": 5,
  "goalDigest": "sha256:0d098540ff1eade68b0b80f0101cad16c6128d23d1a81003adfafb81cdbce309",
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
      "digest": "sha256:295eda8f03f074083f3aada5ef75cf88f6a90be2e69b62cf55b383884bccc9f3",
      "bytes": 19388,
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
      "digest": "sha256:271ff17024526abfc8c245eaccfe9c0de13580871d707585b64eec545dad29ef",
      "bytes": 28115,
      "purposes": [
        "Preserve the final compiler boundary."
      ],
      "workUnitIds": [
        "integrate.release"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.integration-spec-snapshot",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
      "digest": "sha256:97d0d32e878a6ff2147a211177f56ad0efae2a3b55caf385dfc9dcbad231e44c",
      "bytes": 10083,
      "purposes": [
        "Close acceptance criteria against immutable pre-integration input."
      ],
      "workUnitIds": [
        "integrate.release"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:6f1efb201296e2efc4a840e6f89cb140ba6479b992cc3e6e825d81095dc4e194",
      "bytes": 8376,
      "purposes": [
        "Keep public status accurate."
      ],
      "workUnitIds": [
        "integrate.release"
      ],
      "readScope": "README.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "integrate.release"
    ],
    "scope": {
      "read": [
        "README.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/active-context-before-integration.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
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
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/active-context-before-integration.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
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
  "contentDigest": "sha256:2b3c1e568b668689798096c38ec8aed280a127eaa787a2b69d2b369ddd323fce"
}
```
