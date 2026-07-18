# Specialist Contract: agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972

Compilation: `sha256:db47c3393dca0ede877bf07eecc89cd89cb7241f8380fb65f1ed8513221b2dd7`
Blueprint: `sha256:15d1a37eadd41004aab6ebce629cc6646406c76f04721c171752460b4b8129c1`

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
  "goalRevision": 27,
  "goalDigest": "sha256:a31aae035f02012b567cd6bfa502063884bf10d6a5f43c1073da190cd60887d4",
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
      "digest": "sha256:2a39a85745de2124464744c9635144e4e878cbea2f2b584ded25adb946798da7",
      "bytes": 69522,
      "purposes": [
        "Review deterministic candidate, lifecycle, and dependency behavior."
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
      "digest": "sha256:c6462aae192a4df6d4de44e086c5e465b93c2354df3e153dfa8e9771e530a71b",
      "bytes": 36089,
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
      "digest": "sha256:2847895078aa56d9e051f0b399b2e923cce3edc647c2d471c76034fd12159200",
      "bytes": 62973,
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
      "digest": "sha256:f00156e582cafaea19f6db6f55e042422c488b660483f5fccee1d6b1988cee6f",
      "bytes": 2088,
      "purposes": [
        "Review deterministic candidate, lifecycle, and dependency behavior."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.first-run",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/run.mjs",
      "digest": "sha256:03b92fd422336af5aa7b1e94ce667768189afa1e2528818bc6b603133461f047",
      "bytes": 11706,
      "purposes": [
        "Review deterministic candidate, lifecycle, and dependency behavior."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "examples/specialist-compiler/run.mjs"
    },
    {
      "sourceId": "context.first-run-tests",
      "kind": "repository",
      "locator": "path:test/specialist-first-run.test.mjs",
      "digest": "sha256:921d8c414d0f01bda1f71e6448bf5c3b9e2ccbcc537d274e313c7ed156db4284",
      "bytes": 3104,
      "purposes": [
        "Review deterministic candidate, lifecycle, and dependency behavior."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "test/specialist-first-run.test.mjs"
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
      "sourceId": "context.handoff",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:33d5b1f8744f3686775d501920b1353d686a5c59399f9ac03623279dabd7f8bc",
      "bytes": 17644,
      "purposes": [
        "Review deterministic candidate, lifecycle, and dependency behavior."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "src/specialist-handoff.ts"
    },
    {
      "sourceId": "context.handoff-tests",
      "kind": "repository",
      "locator": "path:test/specialist-handoff.test.mjs",
      "digest": "sha256:b830ad3e4f65e41480d19ab0bed8fd679e4a398443bc513a2bc7833e74dd24de",
      "bytes": 9598,
      "purposes": [
        "Review deterministic candidate, lifecycle, and dependency behavior."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "test/specialist-handoff.test.mjs"
    },
    {
      "sourceId": "context.module-guide",
      "kind": "repository",
      "locator": "path:docs/modules/specialist-agent-compiler.md",
      "digest": "sha256:9666af180a394bd72e1277186735303d05138dc7a7d558ab6144000db8f2076b",
      "bytes": 16844,
      "purposes": [
        "Review deterministic candidate, lifecycle, and dependency behavior."
      ],
      "workUnitIds": [
        "review.algorithm-lifecycle"
      ],
      "readScope": "docs/modules/specialist-agent-compiler.md"
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
      "digest": "sha256:487582b09aa3f38be3832a56177778e69ee84a54d49ae06ff0b3597547760e7a",
      "bytes": 18871,
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
      "digest": "sha256:2b7443465ac1988f83d955c37e4b89c0dfdc15ba7ef57eec7bd7684970038233",
      "bytes": 12409,
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
      "digest": "sha256:f0f1384cdef06972e54800d6fd2c57f08b8ebe8a8703b9178e6c3fa78f53e934",
      "bytes": 16047,
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
        "docs/modules/specialist-agent-compiler.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
        "examples/specialist-compiler/run.mjs",
        "src/canonical-json.ts",
        "src/constants.ts",
        "src/snapshot.ts",
        "src/specialist-compiler.ts",
        "src/specialist-handoff.ts",
        "src/specialist-types.ts",
        "test/fixtures/specialist-compiler/conflict-heavy.json",
        "test/fixtures/specialist-compiler/generic-role.json",
        "test/fixtures/specialist-compiler/genuinely-parallel.json",
        "test/fixtures/specialist-compiler/one-agent-optimal.json",
        "test/fixtures/specialist-compiler/over-split.json",
        "test/fixtures/specialist-compiler/under-split.json",
        "test/specialist-compiler.test.mjs",
        "test/specialist-first-run.test.mjs",
        "test/specialist-handoff.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/modules/specialist-agent-compiler.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
          "examples/specialist-compiler/run.mjs",
          "src/canonical-json.ts",
          "src/constants.ts",
          "src/snapshot.ts",
          "src/specialist-compiler.ts",
          "src/specialist-handoff.ts",
          "src/specialist-types.ts",
          "test/fixtures/specialist-compiler/conflict-heavy.json",
          "test/fixtures/specialist-compiler/generic-role.json",
          "test/fixtures/specialist-compiler/genuinely-parallel.json",
          "test/fixtures/specialist-compiler/one-agent-optimal.json",
          "test/fixtures/specialist-compiler/over-split.json",
          "test/fixtures/specialist-compiler/under-split.json",
          "test/specialist-compiler.test.mjs",
          "test/specialist-first-run.test.mjs",
          "test/specialist-handoff.test.mjs"
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
      "criterion": "Candidate construction and analysis, scheduling, selection, handoff identity, dependency closure, and digest semantics are deterministic and accurately claimed.",
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
    "Do not claim to audit this package's own complete compilation; that duty belongs to the separate prelaunch audit.",
    "Stop with REVISE if bounded search is represented as a global optimum.",
    "Stop with REVISE if selection can change under logical input permutation."
  ],
  "contentDigest": "sha256:15d1a37eadd41004aab6ebce629cc6646406c76f04721c171752460b4b8129c1"
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
    "revision": 27,
    "digest": "sha256:a31aae035f02012b567cd6bfa502063884bf10d6a5f43c1073da190cd60887d4"
  },
  "agent": {
    "id": "agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972",
    "blueprintDigest": "sha256:15d1a37eadd41004aab6ebce629cc6646406c76f04721c171752460b4b8129c1"
  },
  "compilationDigest": "sha256:db47c3393dca0ede877bf07eecc89cd89cb7241f8380fb65f1ed8513221b2dd7",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.algorithm-lifecycle"
  ],
  "artifacts": [
    {
      "name": "algorithm-lifecycle-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.algorithm",
      "requirementId": "evidence.algorithm-review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "algorithm-lifecycle-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
