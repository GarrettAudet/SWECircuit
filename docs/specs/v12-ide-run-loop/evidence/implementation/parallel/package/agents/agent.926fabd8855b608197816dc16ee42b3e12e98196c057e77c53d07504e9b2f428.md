# Specialist Contract: agent.926fabd8855b608197816dc16ee42b3e12e98196c057e77c53d07504e9b2f428

Compilation: `sha256:7384e593d56913a2059673fb2c10e7778aa56627a7e98754cd0913f9c5ecf065`
Blueprint: `sha256:5ae8e3fb034a80b517d87d61da758bfc7a07bf8290804a536bcf5447465511a6`

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
  "id": "agent.926fabd8855b608197816dc16ee42b3e12e98196c057e77c53d07504e9b2f428",
  "goalId": "v12.ide-run-loop.implementation.parallel",
  "goalRevision": 1,
  "goalDigest": "sha256:03dd37de45d9b35c3221188aa4730f35590fb91dcedb2b7503b5e5628c502222",
  "candidateId": "team.1211b491d3b076f55d1087a63ddf95c56084772491426cb56e49b8f9d2180cef",
  "workUnitIds": [
    "implement.handoff-transition"
  ],
  "objectives": [
    {
      "workUnitId": "implement.handoff-transition",
      "objective": "Implement monotonic handoff recording, exact replay, conflict rejection, dependency gates, terminal non-pass routing, and unchanged-state failure."
    }
  ],
  "modules": [
    {
      "id": "implementation.run-handoff-transition",
      "action": "Compose V11 handoff verification with the frozen session validator and add the complete transition matrix for AC3 and AC4.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "VerifiedRunSessionFoundation"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "RunHandoffTransition"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.canonical-json",
      "kind": "repository",
      "locator": "path:src/canonical-json.ts",
      "digest": "sha256:6dfb9cb7f7c5be5755b370b82c5230c9e4d3c3a350e6fe0fef3948b1b03d42ac",
      "bytes": 7405,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "src/canonical-json.ts"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:src/constants.ts",
      "digest": "sha256:b7050ac085a3fcd7dad839e3fbe930ecbf49224d40a37f0a44dd15052bc06058",
      "bytes": 2571,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
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
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.handoff-tests",
      "kind": "repository",
      "locator": "path:test/specialist-handoff.test.mjs",
      "digest": "sha256:41d25b24adb4062992012983b4eb99175f371929fb83e522f1723799b3e196af",
      "bytes": 10709,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "test/specialist-handoff.test.mjs"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/specialist-run-contract.md",
      "digest": "sha256:42f53ec000a3cfa69786b0895354ab1b9ab24322305b5ef9d7b33d9a46d13390",
      "bytes": 16223,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.run-schema-code",
      "kind": "repository",
      "locator": "path:src/specialist-run-schema.ts",
      "digest": "sha256:705357ee174691f4e5b177f1a9d4ff3abf38adad46ce32264f9dd3f846b5dd23",
      "bytes": 3371,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "src/specialist-run-schema.ts"
    },
    {
      "sourceId": "context.run-schema-json",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/specialist-run.schema.json",
      "digest": "sha256:8949156f35ab5c4e9efcc86c5509b6a0fb137ced45a0c4c6da3648621797bba5",
      "bytes": 17405,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "schemas/v1alpha1/specialist-run.schema.json"
    },
    {
      "sourceId": "context.run-session",
      "kind": "repository",
      "locator": "path:src/specialist-run-session.ts",
      "digest": "sha256:0ae9bff6b1727c8e3a5540bb7714288592b93b31de0dc6721a84fd73a6e9a03e",
      "bytes": 18723,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "src/specialist-run-session.ts"
    },
    {
      "sourceId": "context.run-types",
      "kind": "repository",
      "locator": "path:src/specialist-run-types.ts",
      "digest": "sha256:01c54b2fc3244f875a4c04e8624d570953e08a6ce1cbbadb8e766117e270a74c",
      "bytes": 4222,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "src/specialist-run-types.ts"
    },
    {
      "sourceId": "context.snapshot",
      "kind": "repository",
      "locator": "path:src/snapshot.ts",
      "digest": "sha256:4def623274433afd49467c46aceae479115a881a13af3c6359f908772a19ca1e",
      "bytes": 5045,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "src/snapshot.ts"
    },
    {
      "sourceId": "context.specialist-handoff",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "src/specialist-handoff.ts"
    },
    {
      "sourceId": "context.specialist-types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:f0f1384cdef06972e54800d6fd2c57f08b8ebe8a8703b9178e6c3fa78f53e934",
      "bytes": 16047,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "src/specialist-types.ts"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/test-plan.md",
      "digest": "sha256:acbb09315f1e22a61a08b549ff7ba4142d61e9c04c859cf2e991690492caf3f3",
      "bytes": 1867,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/test-plan.md"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 parallel contract."
      ],
      "workUnitIds": [
        "implement.handoff-transition"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "implement.monotonic-transition"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/test-plan.md",
        "schemas/v1alpha1/specialist-run.schema.json",
        "src/canonical-json.ts",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/snapshot.ts",
        "src/specialist-handoff.ts",
        "src/specialist-run-schema.ts",
        "src/specialist-run-session.ts",
        "src/specialist-run-transition.ts",
        "src/specialist-run-types.ts",
        "src/specialist-types.ts",
        "test/specialist-handoff.test.mjs",
        "test/specialist-run-transition.test.mjs"
      ],
      "write": [
        "src/specialist-run-transition.ts",
        "test/specialist-run-transition.test.mjs"
      ],
      "conflictZones": [
        "src/specialist-run-transition.ts",
        "test/specialist-run-transition.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/parallel/inputs/test-plan.md",
          "schemas/v1alpha1/specialist-run.schema.json",
          "src/canonical-json.ts",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/snapshot.ts",
          "src/specialist-handoff.ts",
          "src/specialist-run-schema.ts",
          "src/specialist-run-session.ts",
          "src/specialist-run-transition.ts",
          "src/specialist-run-types.ts",
          "src/specialist-types.ts",
          "test/specialist-handoff.test.mjs",
          "test/specialist-run-transition.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "src/specialist-run-transition.ts",
          "test/specialist-run-transition.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "node",
          "npm",
          "powershell"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not use network access, change Git state, launch descendants, write outside the exact scope, or claim that core performs host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.implement.handoff-transition",
      "criterion": "Implement monotonic handoff recording, exact replay, conflict rejection, dependency gates, terminal non-pass routing, and unchanged-state failure.",
      "requirementId": "evidence.transition-implementation",
      "kind": "review",
      "duty": "produce",
      "description": "Provide transition, replay, routing, diagnostic precedence, and immutability evidence for AC3 and AC4.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "handoff-transition-implementation.md"
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
    "If native apply_patch fails before mutation because of the host sandbox, an exact precondition-hash-guarded PowerShell write is allowed within the declared write scope; verify the resulting file bytes immediately.",
    "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Run only local focused verification allowed by the contract and report every failing command truthfully.",
    "Stop if any declared source is unavailable or fails its exact digest and byte binding.",
    "Write only the exact declared write scope; do not change Git state, use the network, launch descendants, or widen the public contract."
  ],
  "contentDigest": "sha256:5ae8e3fb034a80b517d87d61da758bfc7a07bf8290804a536bcf5447465511a6"
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
    "id": "v12.ide-run-loop.implementation.parallel",
    "revision": 1,
    "digest": "sha256:03dd37de45d9b35c3221188aa4730f35590fb91dcedb2b7503b5e5628c502222"
  },
  "agent": {
    "id": "agent.926fabd8855b608197816dc16ee42b3e12e98196c057e77c53d07504e9b2f428",
    "blueprintDigest": "sha256:5ae8e3fb034a80b517d87d61da758bfc7a07bf8290804a536bcf5447465511a6"
  },
  "compilationDigest": "sha256:7384e593d56913a2059673fb2c10e7778aa56627a7e98754cd0913f9c5ecf065",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "implement.handoff-transition"
  ],
  "artifacts": [
    {
      "name": "handoff-transition-implementation.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.implement.handoff-transition",
      "requirementId": "evidence.transition-implementation",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "handoff-transition-implementation.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
