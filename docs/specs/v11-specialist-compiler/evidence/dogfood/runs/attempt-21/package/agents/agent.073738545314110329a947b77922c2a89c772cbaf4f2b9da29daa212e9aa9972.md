# Specialist Contract: agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972

Compilation: `sha256:d8ebaaa5e5fd1fe5b6c575c5b53d64b4d495ce5007c987e9189c53614a401266`
Blueprint: `sha256:e29a63bf697e232c12b86ba82f519c625866c2b87180e97a8771b084088814ff`

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
  "id": "agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 21,
  "goalDigest": "sha256:05c3174711638ecf7f6015aac8dd333f5813afed11fd24a8c72875d3c1776ef6",
  "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "workUnitIds": [
    "review.algorithm-lifecycle"
  ],
  "objectives": [
    {
      "workUnitId": "review.algorithm-lifecycle",
      "objective": "Independently determine whether the generic compiler implementation and evidence make construction, scheduling, selection, and digest semantics deterministic, bounded, and honestly described. The separate prelaunch audit reviews this package's exact compilation."
    }
  ],
  "modules": [
    {
      "id": "review.algorithm-lifecycle",
      "action": "Review generic candidate generation, hard gates, metrics, comparator, scheduling, reproducibility, and lifecycle boundaries without claiming self-review of this exact compilation.",
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
      "digest": "sha256:835fde0cca15c7bb8d081d2556a4cbe1ff011ea7b4f5649f8b065391092973d6",
      "bytes": 65900,
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
      "digest": "sha256:721e85301737c8db3f13bae28ec19c807678ba77c77892cf119d754400c54d19",
      "bytes": 29978,
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
      "digest": "sha256:aaaf4fad943c6bf00ebd71019a8f68183008fc8332030619bc03eb90b9e93abc",
      "bytes": 58929,
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
      "digest": "sha256:6f1f2eeeb40d708c1a41ae0e064b0d89cd179272b60ee91ee5b5e8ee8874a6ae",
      "bytes": 12953,
      "purposes": [
        "Review algorithm acceptance claims."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md"
    },
    {
      "sourceId": "context.two-phase-prelaunch-review",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
      "digest": "sha256:58a4b035497f2ffdf20fe4d516c46e86bae3f878554321ae9443fb0bb6ef406e",
      "bytes": 11930,
      "purposes": [
        "Separate generic compiler review from the exact candidate compilation audit."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md"
    },
    {
      "sourceId": "context.types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:24d255360063fa157335d189fc4e0031795ba646dc44c316f93a0f3a7006fc52",
      "bytes": 12158,
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
        "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
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
          "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
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
    "Do not claim to audit this package's own complete compilation; that duty belongs to the separate prelaunch audit.",
    "Stop with REVISE if bounded search is represented as a global optimum.",
    "Stop with REVISE if selection can change under logical input permutation."
  ],
  "contentDigest": "sha256:e29a63bf697e232c12b86ba82f519c625866c2b87180e97a8771b084088814ff"
}
```
