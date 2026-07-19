# Specialist Contract: agent.855d25082db5af8f0d0049f54e53a11038d1ec56264f34e10e2097425f895486

Compilation: `sha256:662a7ca9303d3d347dbbe32835b3f2635b37f22ef8b051214a9e5924cb3f6415`
Blueprint: `sha256:fcb9a6a04f0ce2e5f524daa38ac817a5332534ce23a737ca5d66217dcd0ee06b`

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
  "id": "agent.855d25082db5af8f0d0049f54e53a11038d1ec56264f34e10e2097425f895486",
  "goalId": "v12.ide-run-loop.architecture",
  "goalRevision": 1,
  "goalDigest": "sha256:2fad6a458f7b7e8060a5967c8edc60ae7c05ffd4b5cb97512e998ea227215d2f",
  "candidateId": "team.00b2c4ec308f683d52e273ce7d5a575365ac2c2d378e85ac40b63b320c7ac71f",
  "workUnitIds": [
    "analyze.lifecycle-recovery"
  ],
  "objectives": [
    {
      "workUnitId": "analyze.lifecycle-recovery",
      "objective": "Design a deterministic monotonic session lifecycle over the fixed V11 package DAG and separate it rigorously from the deferred universal scheduler."
    }
  ],
  "modules": [
    {
      "id": "review.lifecycle-recovery",
      "action": "Map states, transitions, non-pass routes, dependency readiness, serialization, replay, and failure boundaries against every relevant Round-4 correction; identify mandatory versus deferred behavior.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenV12Intent"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "LifecycleRecoveryReview"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0003",
      "kind": "repository",
      "locator": "path:docs/architecture/decisions/0003-portable-orchestration-control-plane.md",
      "digest": "sha256:eec8606ebe84bd4cacd4bd5db1952ba2b536e067f9dc78b521ab38d3a526472f",
      "bytes": 19559,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.lifecycle-recovery"
      ],
      "readScope": "docs/architecture/decisions/0003-portable-orchestration-control-plane.md"
    },
    {
      "sourceId": "context.adr-0004",
      "kind": "repository",
      "locator": "path:docs/architecture/decisions/0004-specialist-compiler-first.md",
      "digest": "sha256:f8f62c11f4b408a1eeac32597f08dd214fffa53ccf155c921045c0ab911ac654",
      "bytes": 7732,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.lifecycle-recovery"
      ],
      "readScope": "docs/architecture/decisions/0004-specialist-compiler-first.md"
    },
    {
      "sourceId": "context.correction-design",
      "kind": "repository",
      "locator": "path:docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
      "digest": "sha256:89d962f6b1a67911cee1c9b0f0c8dfca676f90aaa123a810e30858615b1ed91d",
      "bytes": 4159,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.lifecycle-recovery"
      ],
      "readScope": "docs/specs/v11-orchestration-planner/revision-5-correction-design.md"
    },
    {
      "sourceId": "context.executor-boundary",
      "kind": "repository",
      "locator": "path:docs/framework/executor-boundary.md",
      "digest": "sha256:93c9c44febfbe2f422def110e20349b711f7fe072731e3fcdda115c7fa867454",
      "bytes": 5644,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.lifecycle-recovery"
      ],
      "readScope": "docs/framework/executor-boundary.md"
    },
    {
      "sourceId": "context.handbook",
      "kind": "repository",
      "locator": "path:docs/ai/handbook.md",
      "digest": "sha256:a75adc0a5bda7ee618a8eeec983614bb53d5941be6f75212c2da88b4710f6dd4",
      "bytes": 39728,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.lifecycle-recovery"
      ],
      "readScope": "docs/ai/handbook.md"
    },
    {
      "sourceId": "context.handoff-implementation",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.lifecycle-recovery"
      ],
      "readScope": "src/specialist-handoff.ts"
    },
    {
      "sourceId": "context.round-4",
      "kind": "repository",
      "locator": "path:docs/specs/v11-orchestration-planner/architecture-review-round-4.md",
      "digest": "sha256:4a56f0e52a9f3f05339a1d1677868888242a007d159854f3683baeca54d1969d",
      "bytes": 12182,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.lifecycle-recovery"
      ],
      "readScope": "docs/specs/v11-orchestration-planner/architecture-review-round-4.md"
    },
    {
      "sourceId": "context.v12-goal-synthesis",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md",
      "digest": "sha256:ecb7ee7725a8e86b46b91c6802f90e7b60a8b7c949b06a650c5c6f433f733a8e",
      "bytes": 3943,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.lifecycle-recovery"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md",
      "digest": "sha256:669126e41e8a219c39c7ebd15c6d93e19206f124faf8fbef67b2124b8153d258",
      "bytes": 5069,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.lifecycle-recovery"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "analyze.monotonic-lifecycle"
    ],
    "scope": {
      "read": [
        "docs/ai/handbook.md",
        "docs/architecture/decisions/0003-portable-orchestration-control-plane.md",
        "docs/architecture/decisions/0004-specialist-compiler-first.md",
        "docs/framework/executor-boundary.md",
        "docs/specs/v11-orchestration-planner/architecture-review-round-4.md",
        "docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
        "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md",
        "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md",
        "src/specialist-handoff.ts"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/ai/handbook.md",
          "docs/architecture/decisions/0003-portable-orchestration-control-plane.md",
          "docs/architecture/decisions/0004-specialist-compiler-first.md",
          "docs/framework/executor-boundary.md",
          "docs/specs/v11-orchestration-planner/architecture-review-round-4.md",
          "docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
          "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md",
          "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md",
          "src/specialist-handoff.ts"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not write files, run tests, access the network, launch descendants, change Git state, or claim that core performs host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.lifecycle-recovery",
      "criterion": "The design has deterministic monotonic state, explicit outcomes, safe dependency readiness, and a bounded relationship to deferred runtime corrections.",
      "requirementId": "evidence.lifecycle-recovery-review",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve the exact lifecycle and recovery review.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "lifecycle-recovery-review.md"
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
    "Do not edit files, run tests, access the network, launch descendants, or change Git state.",
    "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Stop if any declared source is unavailable or fails its exact digest and byte binding."
  ],
  "contentDigest": "sha256:fcb9a6a04f0ce2e5f524daa38ac817a5332534ce23a737ca5d66217dcd0ee06b"
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
    "id": "v12.ide-run-loop.architecture",
    "revision": 1,
    "digest": "sha256:2fad6a458f7b7e8060a5967c8edc60ae7c05ffd4b5cb97512e998ea227215d2f"
  },
  "agent": {
    "id": "agent.855d25082db5af8f0d0049f54e53a11038d1ec56264f34e10e2097425f895486",
    "blueprintDigest": "sha256:fcb9a6a04f0ce2e5f524daa38ac817a5332534ce23a737ca5d66217dcd0ee06b"
  },
  "compilationDigest": "sha256:662a7ca9303d3d347dbbe32835b3f2635b37f22ef8b051214a9e5924cb3f6415",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "analyze.lifecycle-recovery"
  ],
  "artifacts": [
    {
      "name": "lifecycle-recovery-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.lifecycle-recovery",
      "requirementId": "evidence.lifecycle-recovery-review",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "lifecycle-recovery-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
