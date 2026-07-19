# Specialist Contract: agent.84c3e9a0333410efd25ecb0960a09d92e2d1010784fb24f0ffeecd81c8fc9145

Compilation: `sha256:662a7ca9303d3d347dbbe32835b3f2635b37f22ef8b051214a9e5924cb3f6415`
Blueprint: `sha256:5f466ef8bbb3dfe36f9d52a2c47326af7233f9950ede16fb93f27bf35719c7c4`

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
  "id": "agent.84c3e9a0333410efd25ecb0960a09d92e2d1010784fb24f0ffeecd81c8fc9145",
  "goalId": "v12.ide-run-loop.architecture",
  "goalRevision": 1,
  "goalDigest": "sha256:2fad6a458f7b7e8060a5967c8edc60ae7c05ffd4b5cb97512e998ea227215d2f",
  "candidateId": "team.00b2c4ec308f683d52e273ce7d5a575365ac2c2d378e85ac40b63b320c7ac71f",
  "workUnitIds": [
    "integrate.architecture"
  ],
  "objectives": [
    {
      "workUnitId": "integrate.architecture",
      "objective": "Synthesize the three verified reviews into one bounded implementation-ready V12 architecture and work decomposition."
    }
  ],
  "modules": [
    {
      "id": "architecture.synthesize-run-loop",
      "action": "Reconcile product, lifecycle, and authority evidence; produce exact operation boundaries, state and routing model, artifact flow, deferred list, acceptance mapping, implementation units, and stop conditions.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "VerifiedArchitectureReviews"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "RunLoopArchitectureDecision"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.0b7518fefd7ec593e05d49ac346b223ea3c0ffbefbfdef745125a6a85a02b3a5",
    "agent.7873619e962938bde0ffb1ee68100343c480344ee324413e6b6194035253fe2f",
    "agent.855d25082db5af8f0d0049f54e53a11038d1ec56264f34e10e2097425f895486"
  ],
  "contextUses": [
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
        "integrate.architecture"
      ],
      "readScope": "docs/architecture/decisions/0004-specialist-compiler-first.md"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:ab2c0f09a38e5de51f14c6af1c912bbc37f5ec8c27bd589273202741c94297b9",
      "bytes": 36886,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "integrate.architecture"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
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
        "integrate.architecture"
      ],
      "readScope": "docs/specs/v11-orchestration-planner/revision-5-correction-design.md"
    },
    {
      "sourceId": "context.ide-kickoff",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:8ceec4c3478b9f2adc7000893705f41b09b153d9747637884ac07e46b416eaf3",
      "bytes": 17565,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "integrate.architecture"
      ],
      "readScope": "docs/ide/specialist-agent-kickoff.md"
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
        "integrate.architecture"
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
        "integrate.architecture"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "synthesize.run-loop-architecture"
    ],
    "scope": {
      "read": [
        "docs/architecture/decisions/0004-specialist-compiler-first.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md",
        "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/architecture/decisions/0004-specialist-compiler-first.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md",
          "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not write files, run tests, access the network, launch descendants, change Git state, or claim that core performs host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.integrated-architecture",
      "criterion": "One implementation-ready decision maps operations, state, routes, tests, deferred behavior, and work units to V12 AC1-AC9.",
      "requirementId": "evidence.integrated-architecture",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve the integrated architecture decision brief.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "v12-run-loop-architecture.md"
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
  "contentDigest": "sha256:5f466ef8bbb3dfe36f9d52a2c47326af7233f9950ede16fb93f27bf35719c7c4"
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
    "id": "agent.84c3e9a0333410efd25ecb0960a09d92e2d1010784fb24f0ffeecd81c8fc9145",
    "blueprintDigest": "sha256:5f466ef8bbb3dfe36f9d52a2c47326af7233f9950ede16fb93f27bf35719c7c4"
  },
  "compilationDigest": "sha256:662a7ca9303d3d347dbbe32835b3f2635b37f22ef8b051214a9e5924cb3f6415",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "integrate.architecture"
  ],
  "artifacts": [
    {
      "name": "v12-run-loop-architecture.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.integrated-architecture",
      "requirementId": "evidence.integrated-architecture",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "v12-run-loop-architecture.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
