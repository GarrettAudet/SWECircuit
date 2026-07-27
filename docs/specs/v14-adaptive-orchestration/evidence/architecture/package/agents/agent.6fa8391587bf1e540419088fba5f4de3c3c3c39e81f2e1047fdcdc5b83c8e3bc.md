# Specialist Contract: agent.6fa8391587bf1e540419088fba5f4de3c3c3c39e81f2e1047fdcdc5b83c8e3bc

Compilation: `sha256:2af08a1285008a1dacf199674fd8bc80f891c92e65b222d57fd2191873726a5a`
Blueprint: `sha256:74b45aea98e9d08aa636a59536b8ae130af680ee8613f6db788404740af2184e`

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
  "id": "agent.6fa8391587bf1e540419088fba5f4de3c3c3c39e81f2e1047fdcdc5b83c8e3bc",
  "goalId": "v14.adaptive-orchestration.architecture",
  "goalRevision": 1,
  "goalDigest": "sha256:ada24d46e7f20e173f4b7d486ea995818795f00a3f758f8a8ddeb36c727a666c",
  "candidateId": "team.b99dfd1ff53d4e9ce9dc73381e0ea4641f00bdf736d32b566dd53c2fa3ed3df6",
  "workUnitIds": [
    "review.routing-api"
  ],
  "objectives": [
    {
      "workUnitId": "review.routing-api",
      "objective": "Audit the deterministic demand, inventory, filter, comparator, override, digest, schema, and public API design for implementability and closed semantics."
    }
  ],
  "modules": [
    {
      "id": "review.runtime-routing-api",
      "action": "Trace every proposed type and operation, identify ambiguity or non-determinism, test comparator and identity logic mentally, and return prioritized contract corrections.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenV14ArchitectureCandidate"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "routing-api-review.md"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0004",
      "kind": "repository",
      "locator": "path:docs/architecture/decisions/0004-specialist-compiler-first.md",
      "digest": "sha256:f8f62c11f4b408a1eeac32597f08dd214fffa53ccf155c921045c0ab911ac654",
      "bytes": 7732,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.routing-api"
      ],
      "readScope": "docs/architecture/decisions/0004-specialist-compiler-first.md"
    },
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/architecture/decisions/0005-immutable-specialist-run-session.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.routing-api"
      ],
      "readScope": "docs/architecture/decisions/0005-immutable-specialist-run-session.md"
    },
    {
      "sourceId": "context.correction-design",
      "kind": "repository",
      "locator": "path:docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
      "digest": "sha256:89d962f6b1a67911cee1c9b0f0c8dfca676f90aaa123a810e30858615b1ed91d",
      "bytes": 4159,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.routing-api"
      ],
      "readScope": "docs/specs/v11-orchestration-planner/revision-5-correction-design.md"
    },
    {
      "sourceId": "context.public-api",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f",
      "bytes": 5447,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.routing-api"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.run-types",
      "kind": "repository",
      "locator": "path:src/specialist-run-types.ts",
      "digest": "sha256:01c54b2fc3244f875a4c04e8624d570953e08a6ce1cbbadb8e766117e270a74c",
      "bytes": 4222,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.routing-api"
      ],
      "readScope": "src/specialist-run-types.ts"
    },
    {
      "sourceId": "context.specialist-types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:f0f1384cdef06972e54800d6fd2c57f08b8ebe8a8703b9178e6c3fa78f53e934",
      "bytes": 16047,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.routing-api"
      ],
      "readScope": "src/specialist-types.ts"
    },
    {
      "sourceId": "context.v14-adr",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/adr-0007.md",
      "digest": "sha256:2cf9fc58b30cea609e9ef7717a99d16e06ff082b8bb85629c2378931c9f7c73d",
      "bytes": 5862,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.routing-api"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/adr-0007.md"
    },
    {
      "sourceId": "context.v14-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/runtime-routing-contract.md",
      "digest": "sha256:03c1bea8757076ca798f6d18a9354e95f64393b9cef3a906c37979e3072da714",
      "bytes": 5309,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.routing-api"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/runtime-routing-contract.md"
    },
    {
      "sourceId": "context.v14-goal",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/goal-synthesis.md",
      "digest": "sha256:1c3e161883ee7b0f998db6ef2a0d564d5d146879c69b8bd5b4dbf9569b34bdd2",
      "bytes": 1888,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.routing-api"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/goal-synthesis.md"
    },
    {
      "sourceId": "context.v14-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/spec.md",
      "digest": "sha256:fcf5d094f1494b6bd4edd7c5ce7ad8c2a8671f2533daae716aac6c39dedd1478",
      "bytes": 7229,
      "purposes": [
        "Review the exact immutable V14 architecture candidate."
      ],
      "workUnitIds": [
        "review.routing-api"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "audit.deterministic-public-api"
    ],
    "scope": {
      "read": [
        "docs/architecture/decisions/0004-specialist-compiler-first.md",
        "docs/architecture/decisions/0005-immutable-specialist-run-session.md",
        "docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
        "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/adr-0007.md",
        "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/goal-synthesis.md",
        "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/runtime-routing-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/spec.md",
        "src/index.ts",
        "src/specialist-run-types.ts",
        "src/specialist-types.ts"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/architecture/decisions/0004-specialist-compiler-first.md",
          "docs/architecture/decisions/0005-immutable-specialist-run-session.md",
          "docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
          "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/adr-0007.md",
          "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/goal-synthesis.md",
          "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/runtime-routing-contract.md",
          "docs/specs/v14-adaptive-orchestration/evidence/architecture/inputs/spec.md",
          "src/index.ts",
          "src/specialist-run-types.ts",
          "src/specialist-types.ts"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not write files, run commands, access the network, launch descendants, change Git state, or claim host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.routing-api",
      "criterion": "Runtime demand, inventory, filtering, scoring, override, identity, and public API semantics are deterministic and implementable.",
      "requirementId": "evidence.routing-api",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve the exact routing and public API architecture review.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "routing-api-review.md"
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
    "Do not edit files, run commands, access the network, launch descendants, or change Git state.",
    "Return only the concrete closed SpecialistAgentHandoff JSON object required by the generated contract.",
    "Stop if a declared source is unavailable or differs from its exact digest and byte binding.",
    "Use a non-pass outcome when a material defect remains; do not soften a finding into prose."
  ],
  "contentDigest": "sha256:74b45aea98e9d08aa636a59536b8ae130af680ee8613f6db788404740af2184e"
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
    "id": "v14.adaptive-orchestration.architecture",
    "revision": 1,
    "digest": "sha256:ada24d46e7f20e173f4b7d486ea995818795f00a3f758f8a8ddeb36c727a666c"
  },
  "agent": {
    "id": "agent.6fa8391587bf1e540419088fba5f4de3c3c3c39e81f2e1047fdcdc5b83c8e3bc",
    "blueprintDigest": "sha256:74b45aea98e9d08aa636a59536b8ae130af680ee8613f6db788404740af2184e"
  },
  "compilationDigest": "sha256:2af08a1285008a1dacf199674fd8bc80f891c92e65b222d57fd2191873726a5a",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.routing-api"
  ],
  "artifacts": [
    {
      "name": "routing-api-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.routing-api",
      "requirementId": "evidence.routing-api",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "routing-api-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
