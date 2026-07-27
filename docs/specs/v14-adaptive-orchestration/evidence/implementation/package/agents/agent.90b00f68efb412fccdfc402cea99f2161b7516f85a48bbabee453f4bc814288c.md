# Specialist Contract: agent.90b00f68efb412fccdfc402cea99f2161b7516f85a48bbabee453f4bc814288c

Compilation: `sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614`
Blueprint: `sha256:3f96a365a04460cb754034e9f30e8ab80f8b814a163c9444003d366da9125149`

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
  "id": "agent.90b00f68efb412fccdfc402cea99f2161b7516f85a48bbabee453f4bc814288c",
  "goalId": "v14.adaptive-orchestration.vertical-slice",
  "goalRevision": 1,
  "goalDigest": "sha256:3d6f58596ed4a07b75469a13e4ef0c8088f85ac51b7d02fda27cd026b8155c9a",
  "candidateId": "team.43ca2714bb81573a11b7ed5e7b3d63c128bae774b17bb174483986576bebee67",
  "workUnitIds": [
    "test.runtime-routing"
  ],
  "objectives": [
    {
      "workUnitId": "test.runtime-routing",
      "objective": "Create independent executable fixtures and tests for the V14 runtime-routing contract before seeing the producer implementation."
    }
  ],
  "modules": [
    {
      "id": "test.runtime-routing",
      "action": "Test demand coverage, every hard gate, full-vector independence, exact and bounded search claims, comparator order, determinism under permutations, overrides, malformed inputs, limits, and packed public usability assumptions.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "V14Revision2Contract"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "runtime-routing-test-evidence.md"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:src/constants.ts",
      "digest": "sha256:2fded9c023b41dc58ad7b8471d9b3f7dbc5b4566c6fecbb6008829c1c5000b6a",
      "bytes": 2570,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "test.runtime-routing"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:src/diagnostics.ts",
      "digest": "sha256:3d27fe071994a2a87a59ecadc52a788a6aaf85737b46371f5622bf10c50aede6",
      "bytes": 25190,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "test.runtime-routing"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.index",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f",
      "bytes": 5447,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "test.runtime-routing"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.run-fixture",
      "kind": "repository",
      "locator": "path:test/helpers/specialist-run-fixture.mjs",
      "digest": "sha256:2bad9cd515d3c170588799f3eaf4db65b1c257dc8eca58982200653eb3dd1d87",
      "bytes": 9645,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "test.runtime-routing"
      ],
      "readScope": "test/helpers/specialist-run-fixture.mjs"
    },
    {
      "sourceId": "context.specialist-types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:f0f1384cdef06972e54800d6fd2c57f08b8ebe8a8703b9178e6c3fa78f53e934",
      "bytes": 16047,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "test.runtime-routing"
      ],
      "readScope": "src/specialist-types.ts"
    },
    {
      "sourceId": "context.test-pattern",
      "kind": "repository",
      "locator": "path:test/specialist-compiler.test.mjs",
      "digest": "sha256:2847895078aa56d9e051f0b399b2e923cce3edc647c2d471c76034fd12159200",
      "bytes": 62973,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "test.runtime-routing"
      ],
      "readScope": "test/specialist-compiler.test.mjs"
    },
    {
      "sourceId": "context.v14-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
      "digest": "sha256:bf8538b746a1b4c10ef3e2ee3528311cf3b9659cc6e450f2e93ba8887cd39b6a",
      "bytes": 39536,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "test.runtime-routing"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md"
    },
    {
      "sourceId": "context.v14-r1",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/architecture/r1-review-summary.md",
      "digest": "sha256:41df682065baa9ed9f3bba30d5947fcc6a8329664adb905e480d998f2ebfcd02",
      "bytes": 3384,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "test.runtime-routing"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/architecture/r1-review-summary.md"
    },
    {
      "sourceId": "context.v14-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/spec.md",
      "digest": "sha256:fcf5d094f1494b6bd4edd7c5ce7ad8c2a8671f2533daae716aac6c39dedd1478",
      "bytes": 7229,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "test.runtime-routing"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "verify.runtime-routing-contract"
    ],
    "scope": {
      "read": [
        "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/architecture/r1-review-summary.md",
        "docs/specs/v14-adaptive-orchestration/spec.md",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/index.ts",
        "src/specialist-types.ts",
        "test/helpers/specialist-run-fixture.mjs",
        "test/specialist-compiler.test.mjs"
      ],
      "write": [
        "test/helpers/runtime-routing-fixture.mjs",
        "test/runtime-routing-schema.test.mjs",
        "test/runtime-routing.test.mjs"
      ],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
          "docs/specs/v14-adaptive-orchestration/evidence/architecture/r1-review-summary.md",
          "docs/specs/v14-adaptive-orchestration/spec.md",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/index.ts",
          "src/specialist-types.ts",
          "test/helpers/specialist-run-fixture.mjs",
          "test/specialist-compiler.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "test/helpers/runtime-routing-fixture.mjs",
          "test/runtime-routing-schema.test.mjs",
          "test/runtime-routing.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "node",
          "npm.cmd",
          "rg"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access the network, secrets, external services, or undeclared repository paths.",
      "Do not install dependencies, mutate Git, merge, update milestones, or update durable memory."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.routing",
      "criterion": "The kernel deterministically derives demand, filters profile/effort rows, and selects a globally feasible least-cost assignment vector.",
      "requirementId": "evidence.routing.verify",
      "kind": "test",
      "duty": "verify",
      "description": "Independently verify deterministic selection, hard gates, bounded search, and overrides.",
      "independentFromProducer": true
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "runtime-routing-test-evidence.md"
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
    "Do not install dependencies, access the network, mutate Git, merge, or update memory.",
    "Do not modify files outside the declared write scope.",
    "Return a non-pass outcome when required verification cannot be completed.",
    "Stop if the normative V14 contract conflicts with the existing V11 or V12 public boundary."
  ],
  "contentDigest": "sha256:3f96a365a04460cb754034e9f30e8ab80f8b814a163c9444003d366da9125149"
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
    "id": "v14.adaptive-orchestration.vertical-slice",
    "revision": 1,
    "digest": "sha256:3d6f58596ed4a07b75469a13e4ef0c8088f85ac51b7d02fda27cd026b8155c9a"
  },
  "agent": {
    "id": "agent.90b00f68efb412fccdfc402cea99f2161b7516f85a48bbabee453f4bc814288c",
    "blueprintDigest": "sha256:3f96a365a04460cb754034e9f30e8ab80f8b814a163c9444003d366da9125149"
  },
  "compilationDigest": "sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "test.runtime-routing"
  ],
  "artifacts": [
    {
      "name": "runtime-routing-test-evidence.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.routing",
      "requirementId": "evidence.routing.verify",
      "kind": "test",
      "duty": "verify",
      "status": "pass",
      "artifact": "runtime-routing-test-evidence.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
