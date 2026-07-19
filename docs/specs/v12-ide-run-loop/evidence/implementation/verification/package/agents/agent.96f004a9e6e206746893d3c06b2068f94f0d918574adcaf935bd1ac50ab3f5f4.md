# Specialist Contract: agent.96f004a9e6e206746893d3c06b2068f94f0d918574adcaf935bd1ac50ab3f5f4

Compilation: `sha256:b719fd06f811091968c14ed8ff531ed5cd9df22d90d050e76c355dd542a1aed6`
Blueprint: `sha256:6c9dadb14ab7c5c3cf7ae1db73178027e912d929b39a8243cbca13fd18ba0cb8`

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
  "id": "agent.96f004a9e6e206746893d3c06b2068f94f0d918574adcaf935bd1ac50ab3f5f4",
  "goalId": "v12.ide-run-loop.implementation.verification",
  "goalRevision": 1,
  "goalDigest": "sha256:6c5ae1648b5607731fa81fa1f5dc4c1df5ccb745b298ba85e6c120ddc2961ff9",
  "candidateId": "team.6a7ba2420f0ed3561663f0d08c4112baccd686d80f20cccb823cf6e7e067c454",
  "workUnitIds": [
    "verify.run-session"
  ],
  "objectives": [
    {
      "workUnitId": "verify.run-session",
      "objective": "Independently attack the complete V12 contract, schema, transitions, inspection, limits, authority boundary, and public surface."
    }
  ],
  "modules": [
    {
      "id": "verification.run-session",
      "action": "Add adversarial, boundary, permutation, fresh-process, differential, public-export, and compatibility tests without repairing production code.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenRunReleaseCandidate"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "RunSessionVerification"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.compiler-tests",
      "kind": "repository",
      "locator": "path:test/specialist-compiler.test.mjs",
      "digest": "sha256:2847895078aa56d9e051f0b399b2e923cce3edc647c2d471c76034fd12159200",
      "bytes": 62973,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "test/specialist-compiler.test.mjs"
    },
    {
      "sourceId": "context.handoff-tests",
      "kind": "repository",
      "locator": "path:test/specialist-handoff.test.mjs",
      "digest": "sha256:41d25b24adb4062992012983b4eb99175f371929fb83e522f1723799b3e196af",
      "bytes": 10709,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "test/specialist-handoff.test.mjs"
    },
    {
      "sourceId": "context.index",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f",
      "bytes": 5447,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.inspection-tests",
      "kind": "repository",
      "locator": "path:test/specialist-run-inspection.test.mjs",
      "digest": "sha256:6dcec494c85a807ed5d48e6d710f6c3d83b2d70c453e00d100efb8983eab42f8",
      "bytes": 18218,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "test/specialist-run-inspection.test.mjs"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:7af49d3d12d0f27fd71f785f886d0adfe660e664274e3b12e46423e39b7ad11c",
      "bytes": 2847,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.packed-check",
      "kind": "repository",
      "locator": "path:scripts/check-packed-consumer.mjs",
      "digest": "sha256:6dfb5a5f25b8533d2b7c7fd736f78a8611deaf22fdc0c060e5749e96cf10ea0e",
      "bytes": 43244,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.packed-host",
      "kind": "repository",
      "locator": "path:scripts/fixtures/packed-consumer-host.ts",
      "digest": "sha256:90633af96b2afaa66dfaddd66e27f2e050dfd0ac5c052f8c1e2413d21db74d00",
      "bytes": 23434,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "scripts/fixtures/packed-consumer-host.ts"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md",
      "digest": "sha256:42f53ec000a3cfa69786b0895354ab1b9ab24322305b5ef9d7b33d9a46d13390",
      "bytes": 16223,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.run-inspection",
      "kind": "repository",
      "locator": "path:src/specialist-run-inspection.ts",
      "digest": "sha256:c20a875b521387aad12831a4508a1fff76371a76d53bc27740dfe527b16eb90e",
      "bytes": 14484,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "src/specialist-run-inspection.ts"
    },
    {
      "sourceId": "context.run-schema-code",
      "kind": "repository",
      "locator": "path:src/specialist-run-schema.ts",
      "digest": "sha256:705357ee174691f4e5b177f1a9d4ff3abf38adad46ce32264f9dd3f846b5dd23",
      "bytes": 3371,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
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
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
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
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "src/specialist-run-session.ts"
    },
    {
      "sourceId": "context.run-transition",
      "kind": "repository",
      "locator": "path:src/specialist-run-transition.ts",
      "digest": "sha256:64916178302c40741eb53780e42f74af3cba7c886956851a55d6b4582d0cc6c7",
      "bytes": 8015,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "src/specialist-run-transition.ts"
    },
    {
      "sourceId": "context.run-types",
      "kind": "repository",
      "locator": "path:src/specialist-run-types.ts",
      "digest": "sha256:01c54b2fc3244f875a4c04e8624d570953e08a6ce1cbbadb8e766117e270a74c",
      "bytes": 4222,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "src/specialist-run-types.ts"
    },
    {
      "sourceId": "context.specialist-handoff",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "src/specialist-handoff.ts"
    },
    {
      "sourceId": "context.specialist-render",
      "kind": "repository",
      "locator": "path:src/specialist-render.ts",
      "digest": "sha256:e8c2c73bf266b32ebee589497a5298435bb50f59e50d00d9d70ed3f65dc526e7",
      "bytes": 19184,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "src/specialist-render.ts"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md",
      "digest": "sha256:acbb09315f1e22a61a08b549ff7ba4142d61e9c04c859cf2e991690492caf3f3",
      "bytes": 1867,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md"
    },
    {
      "sourceId": "context.transition-tests",
      "kind": "repository",
      "locator": "path:test/specialist-run-transition.test.mjs",
      "digest": "sha256:bc140c1c1e02a02160c6a7b0ed8399b99dda99d418a6f6f9151039548eb39c28",
      "bytes": 9861,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "test/specialist-run-transition.test.mjs"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "verify.run-session"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "verify.adversarial-run-session"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md",
        "package.json",
        "schemas/v1alpha1/specialist-run.schema.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/fixtures/packed-consumer-host.ts",
        "src/index.ts",
        "src/specialist-handoff.ts",
        "src/specialist-render.ts",
        "src/specialist-run-inspection.ts",
        "src/specialist-run-schema.ts",
        "src/specialist-run-session.ts",
        "src/specialist-run-transition.ts",
        "src/specialist-run-types.ts",
        "test/specialist-compiler.test.mjs",
        "test/specialist-handoff.test.mjs",
        "test/specialist-run-inspection.test.mjs",
        "test/specialist-run-schema.test.mjs",
        "test/specialist-run-transition.test.mjs",
        "test/specialist-run.test.mjs"
      ],
      "write": [
        "test/specialist-run-schema.test.mjs",
        "test/specialist-run.test.mjs"
      ],
      "conflictZones": [
        "test/specialist-run-schema.test.mjs",
        "test/specialist-run.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md",
          "package.json",
          "schemas/v1alpha1/specialist-run.schema.json",
          "scripts/check-packed-consumer.mjs",
          "scripts/fixtures/packed-consumer-host.ts",
          "src/index.ts",
          "src/specialist-handoff.ts",
          "src/specialist-render.ts",
          "src/specialist-run-inspection.ts",
          "src/specialist-run-schema.ts",
          "src/specialist-run-session.ts",
          "src/specialist-run-transition.ts",
          "src/specialist-run-types.ts",
          "test/specialist-compiler.test.mjs",
          "test/specialist-handoff.test.mjs",
          "test/specialist-run-inspection.test.mjs",
          "test/specialist-run-schema.test.mjs",
          "test/specialist-run-transition.test.mjs",
          "test/specialist-run.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "test/specialist-run-schema.test.mjs",
          "test/specialist-run.test.mjs"
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
      "criterionId": "criterion.verify.run-session",
      "criterion": "Independently attack the complete V12 contract, schema, transitions, inspection, limits, authority boundary, and public surface.",
      "requirementId": "evidence.run-verification",
      "kind": "test",
      "duty": "produce",
      "description": "Provide independent negative, boundary, lifecycle, schema, and package-consumer evidence for AC1-AC6 and AC9.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "run-session-verification.md"
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
  "contentDigest": "sha256:6c9dadb14ab7c5c3cf7ae1db73178027e912d929b39a8243cbca13fd18ba0cb8"
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
    "id": "v12.ide-run-loop.implementation.verification",
    "revision": 1,
    "digest": "sha256:6c5ae1648b5607731fa81fa1f5dc4c1df5ccb745b298ba85e6c120ddc2961ff9"
  },
  "agent": {
    "id": "agent.96f004a9e6e206746893d3c06b2068f94f0d918574adcaf935bd1ac50ab3f5f4",
    "blueprintDigest": "sha256:6c9dadb14ab7c5c3cf7ae1db73178027e912d929b39a8243cbca13fd18ba0cb8"
  },
  "compilationDigest": "sha256:b719fd06f811091968c14ed8ff531ed5cd9df22d90d050e76c355dd542a1aed6",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "verify.run-session"
  ],
  "artifacts": [
    {
      "name": "run-session-verification.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.verify.run-session",
      "requirementId": "evidence.run-verification",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "run-session-verification.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
