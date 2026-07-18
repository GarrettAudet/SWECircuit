# Specialist Contract: agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972

Compilation: `sha256:93deaeb96c0565c5e83c5d32037b88935462577c7ca7399fc8bf47e8b20156fe`
Blueprint: `sha256:8604a6dbf6d6ad7eb37611e3ec7bc7350499cf9c86ab9a383abb72bae4733d85`

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
  "id": "agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 9,
  "goalDigest": "sha256:96f2ecbff2a7ad8030af34e324e2180e89a3aa5ffa88cb83d30174201f615b50",
  "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "workUnitIds": [
    "review.algorithm-lifecycle"
  ],
  "objectives": [
    {
      "workUnitId": "review.algorithm-lifecycle",
      "objective": "Independently determine whether construction, scheduling, selection, and digest semantics are deterministic, bounded, and honestly described."
    }
  ],
  "modules": [
    {
      "id": "review.algorithm-lifecycle",
      "action": "Review candidate generation, hard gates, metrics, comparator, scheduling, and reproducibility.",
      "inputPorts": [
        {
          "name": "candidate",
          "artifactType": "ReviewCandidate"
        }
      ],
      "outputPorts": [
        {
          "name": "review",
          "artifactType": "AlgorithmReview"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730"
  ],
  "contextUses": [
    {
      "sourceId": "context.canonical-json",
      "kind": "repository",
      "locator": "path:src/canonical-json.ts",
      "digest": "sha256:6dfb9cb7f7c5be5755b370b82c5230c9e4d3c3a350e6fe0fef3948b1b03d42ac",
      "bytes": 7405,
      "purposes": [
        "Audit canonical identity and digest construction."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "src/canonical-json.ts"
    },
    {
      "sourceId": "context.compiler",
      "kind": "repository",
      "locator": "path:src/specialist-compiler.ts",
      "digest": "sha256:fb1b901a2bd8e398ab57f08b4f353b9d18c22075965f41b50a88ef169268f98c",
      "bytes": 65907,
      "purposes": [
        "Audit candidate analysis and selection."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "src/specialist-compiler.ts"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:928d1a3b2fb29b84e43007c5f34aef6cf55a78db48ede4bc9e019439083b4944",
      "bytes": 28113,
      "purposes": [
        "Review the normative search and objective contract."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.compiler-tests",
      "kind": "repository",
      "locator": "path:test/specialist-compiler.test.mjs",
      "digest": "sha256:16faca5532c6041a34cf37aeda21682c74a1ae00858168c2b994b73553367a45",
      "bytes": 53441,
      "purposes": [
        "Audit golden, exact-count, bounded, and permutation evidence."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "test/specialist-compiler.test.mjs"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:src/constants.ts",
      "digest": "sha256:c3526b49f3f1f54ce8db3dfb7af7dabe6944a02543b5702d08567c2a17cc466b",
      "bytes": 1883,
      "purposes": [
        "Audit exact and bounded search limits."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.fixture.conflict-heavy",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/conflict-heavy.json",
      "digest": "sha256:27fe1679095f6d86017a388e6b83ee6922ec30ba0bd598a1d5c7c2aeaed94dee",
      "bytes": 6260,
      "purposes": [
        "Audit the expected optimization outcome for this golden fixture."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "test/fixtures/specialist-compiler/conflict-heavy.json"
    },
    {
      "sourceId": "context.fixture.generic-role",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/generic-role.json",
      "digest": "sha256:6801c238c2500f8fa8c4414de1cc3b88921d9c08e667692f49321187a9bef955",
      "bytes": 4420,
      "purposes": [
        "Audit the expected optimization outcome for this golden fixture."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "test/fixtures/specialist-compiler/generic-role.json"
    },
    {
      "sourceId": "context.fixture.genuinely-parallel",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/genuinely-parallel.json",
      "digest": "sha256:8119915f5b41d4eff112e52008f0d7a9a9e5c9f522c41d28419637ef0d290019",
      "bytes": 6260,
      "purposes": [
        "Audit the expected optimization outcome for this golden fixture."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "test/fixtures/specialist-compiler/genuinely-parallel.json"
    },
    {
      "sourceId": "context.fixture.one-agent-optimal",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/one-agent-optimal.json",
      "digest": "sha256:bebb10dc99b89660d672d0ce25de1ef09f951a0a76716b282a0c2945b2e36f67",
      "bytes": 6314,
      "purposes": [
        "Audit the expected optimization outcome for this golden fixture."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "test/fixtures/specialist-compiler/one-agent-optimal.json"
    },
    {
      "sourceId": "context.fixture.over-split",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/over-split.json",
      "digest": "sha256:a22160147debf2bf7361975a3b4900199d38059d6de3f596bec3e7fd1b9e3f1b",
      "bytes": 8159,
      "purposes": [
        "Audit the expected optimization outcome for this golden fixture."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "test/fixtures/specialist-compiler/over-split.json"
    },
    {
      "sourceId": "context.fixture.under-split",
      "kind": "repository",
      "locator": "path:test/fixtures/specialist-compiler/under-split.json",
      "digest": "sha256:3ef5d99ff5fd47f6ddf0b46d30effa513488d6806bb275ba598871e93a9c537c",
      "bytes": 6224,
      "purposes": [
        "Audit the expected optimization outcome for this golden fixture."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "test/fixtures/specialist-compiler/under-split.json"
    },
    {
      "sourceId": "context.snapshot",
      "kind": "repository",
      "locator": "path:src/snapshot.ts",
      "digest": "sha256:4def623274433afd49467c46aceae479115a881a13af3c6359f908772a19ca1e",
      "bytes": 5045,
      "purposes": [
        "Audit immutable normalized input semantics."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "src/snapshot.ts"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
      "digest": "sha256:ff85f0f2b87c8e7f0d3ced2feb06f366d7e5c60d8ae3b580d09c9aa724a9f2e5",
      "bytes": 10082,
      "purposes": [
        "Review algorithm acceptance claims."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md"
    },
    {
      "sourceId": "context.types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:e50036eff63d6ea232a314e8447e99a767bce40fc0bb49ffcfd15b6c97c3a3bb",
      "bytes": 12070,
      "purposes": [
        "Review metric and evaluation output types."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "src/specialist-types.ts"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.algorithm-lifecycle"
    ],
    "scope": {
      "read": [
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "src/canonical-json.ts",
        "src/constants.ts",
        "src/snapshot.ts",
        "src/specialist-compiler.ts",
        "src/specialist-types.ts",
        "test/fixtures/specialist-compiler/conflict-heavy.json",
        "test/fixtures/specialist-compiler/generic-role.json",
        "test/fixtures/specialist-compiler/genuinely-parallel.json",
        "test/fixtures/specialist-compiler/one-agent-optimal.json",
        "test/fixtures/specialist-compiler/over-split.json",
        "test/fixtures/specialist-compiler/under-split.json",
        "test/specialist-compiler.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "src/canonical-json.ts",
          "src/constants.ts",
          "src/snapshot.ts",
          "src/specialist-compiler.ts",
          "src/specialist-types.ts",
          "test/fixtures/specialist-compiler/conflict-heavy.json",
          "test/fixtures/specialist-compiler/generic-role.json",
          "test/fixtures/specialist-compiler/genuinely-parallel.json",
          "test/fixtures/specialist-compiler/one-agent-optimal.json",
          "test/fixtures/specialist-compiler/over-split.json",
          "test/fixtures/specialist-compiler/under-split.json",
          "test/specialist-compiler.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "node",
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
      "criterionId": "criterion.algorithm",
      "criterion": "Candidate construction, scheduling, selection, and digest semantics are deterministic and accurately claimed.",
      "requirementId": "evidence.algorithm-review",
      "kind": "review",
      "duty": "review",
      "description": "Independent algorithm and lifecycle acceptance review.",
      "independentFromProducer": true
    }
  ],
  "handoff": {
    "destination": "v11.integration-owner",
    "artifacts": [
      "algorithm-lifecycle-review.md"
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
    "Stop with REVISE if bounded search is represented as a global optimum.",
    "Stop with REVISE if selection can change under logical input permutation."
  ],
  "contentDigest": "sha256:8604a6dbf6d6ad7eb37611e3ec7bc7350499cf9c86ab9a383abb72bae4733d85"
}
```
