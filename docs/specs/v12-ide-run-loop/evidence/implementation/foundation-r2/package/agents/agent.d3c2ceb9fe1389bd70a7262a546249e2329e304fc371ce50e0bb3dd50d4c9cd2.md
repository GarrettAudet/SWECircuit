# Specialist Contract: agent.d3c2ceb9fe1389bd70a7262a546249e2329e304fc371ce50e0bb3dd50d4c9cd2

Compilation: `sha256:3c76ddb9c2c25b510d7f6d36f701f7271db941f019d3615946afa58d2207b435`
Blueprint: `sha256:afd64d674b9af78d18ba159f7a06d5872e963dbab20c30345d941d904a86698f`

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
  "id": "agent.d3c2ceb9fe1389bd70a7262a546249e2329e304fc371ce50e0bb3dd50d4c9cd2",
  "goalId": "v12.ide-run-loop.implementation.foundation",
  "goalRevision": 2,
  "goalDigest": "sha256:f7a90f4d881625468a194ac61744e6f643aa56f41eb550c6a7b1e83157ab496d",
  "candidateId": "team.a4691fd24da0db98c4eb8a284182fb6445282dc26ab0cf093b9066e6a00fd7a8",
  "workUnitIds": [
    "implement.foundation"
  ],
  "objectives": [
    {
      "workUnitId": "implement.foundation",
      "objective": "Add the closed types, schema, limits, diagnostics, defensive validator, create operation, and raw restore operation for SpecialistRunSession."
    }
  ],
  "modules": [
    {
      "id": "implementation.run-session-foundation",
      "action": "Implement only the frozen wire contract and create/restore semantics by composing V11 package, parser, snapshot, privacy, and digest primitives; add focused foundation coverage without widening host claims.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenSpecialistRunContract"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "RunSessionFoundation"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.canonical-json",
      "kind": "repository",
      "locator": "path:src/canonical-json.ts",
      "digest": "sha256:6dfb9cb7f7c5be5755b370b82c5230c9e4d3c3a350e6fe0fef3948b1b03d42ac",
      "bytes": 7405,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "src/canonical-json.ts"
    },
    {
      "sourceId": "context.compiler-tests",
      "kind": "repository",
      "locator": "path:test/specialist-compiler.test.mjs",
      "digest": "sha256:2847895078aa56d9e051f0b399b2e923cce3edc647c2d471c76034fd12159200",
      "bytes": 62973,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
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
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:src/diagnostics.ts",
      "digest": "sha256:570e2d2349f6e466999f7a8d9c15b0f82342afa4ccd1042729c282e66c4a7f14",
      "bytes": 23891,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.handoff-schema-code",
      "kind": "repository",
      "locator": "path:src/specialist-handoff-schema.ts",
      "digest": "sha256:b48779dc0b5e29124e9b689e11613bd850e4a33cf9f65eca8d3a051865ce5911",
      "bytes": 2421,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "src/specialist-handoff-schema.ts"
    },
    {
      "sourceId": "context.handoff-schema-json",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/specialist-handoff.schema.json",
      "digest": "sha256:afade2b11be6db71a17aa35841d292b99e05c6a4c157505c3b649a3f145aa4e9",
      "bytes": 4287,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "schemas/v1alpha1/specialist-handoff.schema.json"
    },
    {
      "sourceId": "context.handoff-tests",
      "kind": "repository",
      "locator": "path:test/specialist-handoff.test.mjs",
      "digest": "sha256:41d25b24adb4062992012983b4eb99175f371929fb83e522f1723799b3e196af",
      "bytes": 10709,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "test/specialist-handoff.test.mjs"
    },
    {
      "sourceId": "context.json-parser",
      "kind": "repository",
      "locator": "path:src/json.ts",
      "digest": "sha256:a1f119ecb906ccf5d8397d2ce84e7b357ef5276df2ac448c99cc498d963c8a8a",
      "bytes": 4808,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "src/json.ts"
    },
    {
      "sourceId": "context.model",
      "kind": "repository",
      "locator": "path:src/model.ts",
      "digest": "sha256:c67bf6036ec16d40516bcf01a49e8714f82588e29a9c596b117dc73c36cf4b83",
      "bytes": 5961,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "src/model.ts"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:52acc84e561245f27afe26af16c000ce5d1e121b5649c4e70c2d03ec140c7be7",
      "bytes": 2549,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.privacy",
      "kind": "repository",
      "locator": "path:src/privacy.ts",
      "digest": "sha256:e6ffecf6135e7369913e51df78a522dcb3de3907d698f7f7cd2c1e7117ac972c",
      "bytes": 1047,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "src/privacy.ts"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/specialist-run-contract.md",
      "digest": "sha256:42f53ec000a3cfa69786b0895354ab1b9ab24322305b5ef9d7b33d9a46d13390",
      "bytes": 16223,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.snapshot",
      "kind": "repository",
      "locator": "path:src/snapshot.ts",
      "digest": "sha256:4def623274433afd49467c46aceae479115a881a13af3c6359f908772a19ca1e",
      "bytes": 5045,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
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
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
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
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "src/specialist-render.ts"
    },
    {
      "sourceId": "context.specialist-schema-code",
      "kind": "repository",
      "locator": "path:src/specialist-schema.ts",
      "digest": "sha256:e59a903d0fab9ba58de19032969107fe6d517526a153ce8e6bc081360b1a4799",
      "bytes": 2968,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "src/specialist-schema.ts"
    },
    {
      "sourceId": "context.specialist-schema-json",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/specialist-compiler.schema.json",
      "digest": "sha256:860cbe31f1b86676ea35df361e0d1b215aa92e8253bd5de266fded42fe6039cd",
      "bytes": 15392,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "schemas/v1alpha1/specialist-compiler.schema.json"
    },
    {
      "sourceId": "context.specialist-types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:f0f1384cdef06972e54800d6fd2c57f08b8ebe8a8703b9178e6c3fa78f53e934",
      "bytes": 16047,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "src/specialist-types.ts"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/test-plan.md",
      "digest": "sha256:acbb09315f1e22a61a08b549ff7ba4142d61e9c04c859cf2e991690492caf3f3",
      "bytes": 1867,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/test-plan.md"
    },
    {
      "sourceId": "context.text",
      "kind": "repository",
      "locator": "path:src/text.ts",
      "digest": "sha256:7aaf03f50e16bc4917112e560dfd65f3e00a818df07cdca5310128a24e9d8644",
      "bytes": 985,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "src/text.ts"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 foundation-r2 contract."
      ],
      "workUnitIds": [
        "implement.foundation"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "implement.source-preserving-session"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/test-plan.md",
        "package.json",
        "schemas/v1alpha1/specialist-compiler.schema.json",
        "schemas/v1alpha1/specialist-handoff.schema.json",
        "schemas/v1alpha1/specialist-run.schema.json",
        "src/canonical-json.ts",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/json.ts",
        "src/model.ts",
        "src/privacy.ts",
        "src/snapshot.ts",
        "src/specialist-handoff-schema.ts",
        "src/specialist-handoff.ts",
        "src/specialist-render.ts",
        "src/specialist-run-schema.ts",
        "src/specialist-run-session.ts",
        "src/specialist-run-types.ts",
        "src/specialist-schema.ts",
        "src/specialist-types.ts",
        "src/text.ts",
        "test/specialist-compiler.test.mjs",
        "test/specialist-handoff.test.mjs"
      ],
      "write": [
        "schemas/v1alpha1/specialist-run.schema.json",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/specialist-run-schema.ts",
        "src/specialist-run-session.ts",
        "src/specialist-run-types.ts"
      ],
      "conflictZones": [
        "schemas/v1alpha1/specialist-run.schema.json",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/specialist-run-schema.ts",
        "src/specialist-run-session.ts",
        "src/specialist-run-types.ts"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/foundation-r2/inputs/test-plan.md",
          "package.json",
          "schemas/v1alpha1/specialist-compiler.schema.json",
          "schemas/v1alpha1/specialist-handoff.schema.json",
          "schemas/v1alpha1/specialist-run.schema.json",
          "src/canonical-json.ts",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/json.ts",
          "src/model.ts",
          "src/privacy.ts",
          "src/snapshot.ts",
          "src/specialist-handoff-schema.ts",
          "src/specialist-handoff.ts",
          "src/specialist-render.ts",
          "src/specialist-run-schema.ts",
          "src/specialist-run-session.ts",
          "src/specialist-run-types.ts",
          "src/specialist-schema.ts",
          "src/specialist-types.ts",
          "src/text.ts",
          "test/specialist-compiler.test.mjs",
          "test/specialist-handoff.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "schemas/v1alpha1/specialist-run.schema.json",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/specialist-run-schema.ts",
          "src/specialist-run-session.ts",
          "src/specialist-run-types.ts"
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
      "criterionId": "criterion.implement.foundation",
      "criterion": "Add the closed types, schema, limits, diagnostics, defensive validator, create operation, and raw restore operation for SpecialistRunSession.",
      "requirementId": "evidence.foundation-implementation",
      "kind": "review",
      "duty": "produce",
      "description": "Provide focused build and foundation conformance evidence mapped to AC1 and AC6.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "foundation-implementation.md"
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
  "contentDigest": "sha256:afd64d674b9af78d18ba159f7a06d5872e963dbab20c30345d941d904a86698f"
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
    "id": "v12.ide-run-loop.implementation.foundation",
    "revision": 2,
    "digest": "sha256:f7a90f4d881625468a194ac61744e6f643aa56f41eb550c6a7b1e83157ab496d"
  },
  "agent": {
    "id": "agent.d3c2ceb9fe1389bd70a7262a546249e2329e304fc371ce50e0bb3dd50d4c9cd2",
    "blueprintDigest": "sha256:afd64d674b9af78d18ba159f7a06d5872e963dbab20c30345d941d904a86698f"
  },
  "compilationDigest": "sha256:3c76ddb9c2c25b510d7f6d36f701f7271db941f019d3615946afa58d2207b435",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "implement.foundation"
  ],
  "artifacts": [
    {
      "name": "foundation-implementation.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.implement.foundation",
      "requirementId": "evidence.foundation-implementation",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "foundation-implementation.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
