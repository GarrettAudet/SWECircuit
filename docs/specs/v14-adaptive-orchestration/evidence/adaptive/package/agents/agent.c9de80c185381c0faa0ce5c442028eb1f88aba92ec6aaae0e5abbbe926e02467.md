# Specialist Contract: agent.c9de80c185381c0faa0ce5c442028eb1f88aba92ec6aaae0e5abbbe926e02467

Compilation: `sha256:05bd6bb76d8c7d0f9a3df274a7294ac3615026cb211f76bd24a21d45f6b4d3c8`
Blueprint: `sha256:aa14fe5aa8df0e90e4c124bd44e9fb1b89655a3d285f6af624930be18d6e3be8`

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
  "id": "agent.c9de80c185381c0faa0ce5c442028eb1f88aba92ec6aaae0e5abbbe926e02467",
  "goalId": "v14.adaptive-orchestration.adaptive-wave",
  "goalRevision": 1,
  "goalDigest": "sha256:c9de077db1b183e98d8333b2318c64b223c05ba44533de5e36c11d6c8d9e24f9",
  "candidateId": "team.cbe7b6efbbd0a2b36f01330f4b4b258f8b15faf9392f8107f593560756afb4c6",
  "workUnitIds": [
    "author.adaptive-tests"
  ],
  "objectives": [
    {
      "workUnitId": "author.adaptive-tests",
      "objective": "Author independent executable tests for the complete adaptive controller, host protocol, restore behavior, RunView, redaction, schema, and packed public surface."
    }
  ],
  "modules": [
    {
      "id": "author.adaptive-tests",
      "action": "Derive tests from Revision 2 without inspecting producer workspaces; syntax-check now and leave execution to the successor integration verifier.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "V14Revision2Contract"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "adaptive-test-contract.md"
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
      "digest": "sha256:29d3f446dd83e508c7c77430560242406e930874d5b13f360afcdc67d035a1c6",
      "bytes": 3046,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:src/diagnostics.ts",
      "digest": "sha256:f5817dc70d945562511c743925b460ca44ad2862324273aaabe322a882379fcb",
      "bytes": 27787,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.index",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:f59c25992681c7b31caad21dfcf5766f74b4902425271f6b55f774a424c66e01",
      "bytes": 6578,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.routing",
      "kind": "repository",
      "locator": "path:src/runtime-routing.ts",
      "digest": "sha256:f127bc11d711153e2eee3de535a80fa968631533b4f9884a9e9730eae15c0a81",
      "bytes": 44497,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "src/runtime-routing.ts"
    },
    {
      "sourceId": "context.routing-fixture",
      "kind": "repository",
      "locator": "path:test/helpers/runtime-routing-fixture.mjs",
      "digest": "sha256:d87bf470955a39edb64c0a5345074ea9d3eee4577a9c79aff55ec18ba8428da2",
      "bytes": 11149,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "test/helpers/runtime-routing-fixture.mjs"
    },
    {
      "sourceId": "context.routing-types",
      "kind": "repository",
      "locator": "path:src/runtime-routing-types.ts",
      "digest": "sha256:24bfc6ccc987fffcfad25bd4a1581c1ce2a4e0dcb6fabce09be98d0b31247f84",
      "bytes": 10268,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "src/runtime-routing-types.ts"
    },
    {
      "sourceId": "context.v12-fixture",
      "kind": "repository",
      "locator": "path:test/helpers/specialist-run-fixture.mjs",
      "digest": "sha256:2bad9cd515d3c170588799f3eaf4db65b1c257dc8eca58982200653eb3dd1d87",
      "bytes": 9645,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "test/helpers/specialist-run-fixture.mjs"
    },
    {
      "sourceId": "context.v12-inspection",
      "kind": "repository",
      "locator": "path:src/specialist-run-inspection.ts",
      "digest": "sha256:83d46b99d0bd553e36566aa5551b14c945b6177122c2c73f69e41ad6367f30ac",
      "bytes": 14484,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "src/specialist-run-inspection.ts"
    },
    {
      "sourceId": "context.v12-schema",
      "kind": "repository",
      "locator": "path:src/specialist-run-schema.ts",
      "digest": "sha256:db55d52355ec661a12e8e5c50981af0658ad1f9ef678f1c729882fa70024691d",
      "bytes": 3180,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "src/specialist-run-schema.ts"
    },
    {
      "sourceId": "context.v12-session",
      "kind": "repository",
      "locator": "path:src/specialist-run-session.ts",
      "digest": "sha256:2a763993ef0d190ff81b8b234081d3dcd8c470faaa3a6c8ae76da114ecb43367",
      "bytes": 19225,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "src/specialist-run-session.ts"
    },
    {
      "sourceId": "context.v12-transition",
      "kind": "repository",
      "locator": "path:src/specialist-run-transition.ts",
      "digest": "sha256:64916178302c40741eb53780e42f74af3cba7c886956851a55d6b4582d0cc6c7",
      "bytes": 8015,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "src/specialist-run-transition.ts"
    },
    {
      "sourceId": "context.v12-types",
      "kind": "repository",
      "locator": "path:src/specialist-run-types.ts",
      "digest": "sha256:01c54b2fc3244f875a4c04e8624d570953e08a6ce1cbbadb8e766117e270a74c",
      "bytes": 4222,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "src/specialist-run-types.ts"
    },
    {
      "sourceId": "context.v14-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
      "digest": "sha256:bf8538b746a1b4c10ef3e2ee3528311cf3b9659cc6e450f2e93ba8887cd39b6a",
      "bytes": 39536,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md"
    },
    {
      "sourceId": "context.v14-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/spec.md",
      "digest": "sha256:fcf5d094f1494b6bd4edd7c5ce7ad8c2a8671f2533daae716aac6c39dedd1478",
      "bytes": 7229,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/spec.md"
    },
    {
      "sourceId": "context.v14-test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/test-plan.md",
      "digest": "sha256:39021cf79aa086cd6c63ae922253b0d56579c522f2c0cb0c9e89a92d8a0500d8",
      "bytes": 2687,
      "purposes": [
        "Produce one disjoint V14 adaptive orchestration module."
      ],
      "workUnitIds": [
        "author.adaptive-tests"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/test-plan.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "author.adaptive-contract-tests"
    ],
    "scope": {
      "read": [
        "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
        "docs/specs/v14-adaptive-orchestration/spec.md",
        "docs/specs/v14-adaptive-orchestration/test-plan.md",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/index.ts",
        "src/runtime-routing-types.ts",
        "src/runtime-routing.ts",
        "src/specialist-run-inspection.ts",
        "src/specialist-run-schema.ts",
        "src/specialist-run-session.ts",
        "src/specialist-run-transition.ts",
        "src/specialist-run-types.ts",
        "test/helpers/runtime-routing-fixture.mjs",
        "test/helpers/specialist-run-fixture.mjs"
      ],
      "write": [
        "test/adaptive-run-schema.test.mjs",
        "test/adaptive-run.test.mjs",
        "test/helpers/adaptive-run-fixture.mjs"
      ],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
          "docs/specs/v14-adaptive-orchestration/spec.md",
          "docs/specs/v14-adaptive-orchestration/test-plan.md",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/index.ts",
          "src/runtime-routing-types.ts",
          "src/runtime-routing.ts",
          "src/specialist-run-inspection.ts",
          "src/specialist-run-schema.ts",
          "src/specialist-run-session.ts",
          "src/specialist-run-transition.ts",
          "src/specialist-run-types.ts",
          "test/helpers/runtime-routing-fixture.mjs",
          "test/helpers/specialist-run-fixture.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "test/adaptive-run-schema.test.mjs",
          "test/adaptive-run.test.mjs",
          "test/helpers/adaptive-run-fixture.mjs"
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
      "Do not install dependencies, mutate Git, launch native agents, enforce permissions, integrate, merge, or update memory."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.adaptive-tests",
      "criterion": "An independently authored suite defines lifecycle, restart, event-chain, redaction, RunView, and public-schema expectations before integration.",
      "requirementId": "evidence.adaptive-tests.produce",
      "kind": "test",
      "duty": "produce",
      "description": "Produce the independent executable adaptive and RunView test contract.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "adaptive-test-contract.md"
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
    "Do not access the network, install dependencies, mutate Git, merge, or update memory.",
    "Do not claim a host effect from a kernel-generated value.",
    "Do not modify files outside the declared write scope.",
    "Return non-pass when the assigned artifact cannot be produced from the verified inputs.",
    "Stop if the normative V14 contract conflicts with V11 compilation or V12 immutable-session behavior."
  ],
  "contentDigest": "sha256:aa14fe5aa8df0e90e4c124bd44e9fb1b89655a3d285f6af624930be18d6e3be8"
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
    "id": "v14.adaptive-orchestration.adaptive-wave",
    "revision": 1,
    "digest": "sha256:c9de077db1b183e98d8333b2318c64b223c05ba44533de5e36c11d6c8d9e24f9"
  },
  "agent": {
    "id": "agent.c9de80c185381c0faa0ce5c442028eb1f88aba92ec6aaae0e5abbbe926e02467",
    "blueprintDigest": "sha256:aa14fe5aa8df0e90e4c124bd44e9fb1b89655a3d285f6af624930be18d6e3be8"
  },
  "compilationDigest": "sha256:05bd6bb76d8c7d0f9a3df274a7294ac3615026cb211f76bd24a21d45f6b4d3c8",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "author.adaptive-tests"
  ],
  "artifacts": [
    {
      "name": "adaptive-test-contract.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.adaptive-tests",
      "requirementId": "evidence.adaptive-tests.produce",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "adaptive-test-contract.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
