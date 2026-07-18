# Specialist Contract: agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9

Compilation: `sha256:cac4d6f9c7702a5b3018f1a66df63a96f55805e0ddfde174a0f7db0048f12df3`
Blueprint: `sha256:383ab060f0bf365b89557d1d45abb5180af1f5c57989386fe6dddfc6456c9b63`

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
  "goalRevision": 18,
  "goalDigest": "sha256:fadc64ad55b831df748f1848aa703c75685181e486cce67f4deedd506bc221f8",
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
      "digest": "sha256:fab0169f31dfc820f057cb0d370e4668f16c6f42ec80bdec8c2dce955af44d11",
      "bytes": 21902,
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
      "digest": "sha256:721e85301737c8db3f13bae28ec19c807678ba77c77892cf119d754400c54d19",
      "bytes": 29978,
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
      "digest": "sha256:c53ca438b43b9b03a2ca8c55712fc26c586ab2fdf2a4ba78fdd6e3ead622ebd8",
      "bytes": 8525,
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
      "digest": "sha256:e1a959109fbabd72fac87c6349d46e4d0d69122d9f52cd4ded25009e25f966e2",
      "bytes": 12138,
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
      "digest": "sha256:54bf4610f9229765f89f437000de67dd8785989d305c70ddcb0160a65dc89839",
      "bytes": 6907,
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
    "Stop if any independent review returns REVISE.",
    "Stop unless the separate prelaunch audit is approval-bound, verified, and PASS before candidate launch approval."
  ],
  "contentDigest": "sha256:383ab060f0bf365b89557d1d45abb5180af1f5c57989386fe6dddfc6456c9b63"
}
```
