# Specialist Contract: agent.7873619e962938bde0ffb1ee68100343c480344ee324413e6b6194035253fe2f

Compilation: `sha256:662a7ca9303d3d347dbbe32835b3f2635b37f22ef8b051214a9e5924cb3f6415`
Blueprint: `sha256:911a57f8c3af23c56739ed04483b63c36351c4f4f63b2fdc68b691ab06582bd9`

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
  "id": "agent.7873619e962938bde0ffb1ee68100343c480344ee324413e6b6194035253fe2f",
  "goalId": "v12.ide-run-loop.architecture",
  "goalRevision": 1,
  "goalDigest": "sha256:2fad6a458f7b7e8060a5967c8edc60ae7c05ffd4b5cb97512e998ea227215d2f",
  "candidateId": "team.00b2c4ec308f683d52e273ce7d5a575365ac2c2d378e85ac40b63b320c7ac71f",
  "workUnitIds": [
    "analyze.authority-portability"
  ],
  "objectives": [
    {
      "workUnitId": "analyze.authority-portability",
      "objective": "Audit the proposed V12 layer for exact identity, least authority, immutable caller persistence, security, public API truth, and IDE/provider portability."
    }
  ],
  "modules": [
    {
      "id": "review.authority-portability",
      "action": "Define trust inputs and outputs, reject confused-deputy and stale-evidence paths, enumerate forbidden host claims, and return concrete schema/API/test obligations mapped to AC1-AC9.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenV12Intent"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "AuthorityPortabilityReview"
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
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.authority-portability"
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
        "analyze.authority-portability"
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
        "analyze.authority-portability"
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
        "analyze.authority-portability"
      ],
      "readScope": "docs/framework/executor-boundary.md"
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
        "analyze.authority-portability"
      ],
      "readScope": "src/specialist-handoff.ts"
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
        "analyze.authority-portability"
      ],
      "readScope": "docs/ide/specialist-agent-kickoff.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:52acc84e561245f27afe26af16c000ce5d1e121b5649c4e70c2d03ec140c7be7",
      "bytes": 2549,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.authority-portability"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.public-api",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dfa16eda45276f9caf5f59e12b2a20c5c0650a153b84d04510e0feac754b672b",
      "bytes": 4688,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.authority-portability"
      ],
      "readScope": "src/index.ts"
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
        "analyze.authority-portability"
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
        "analyze.authority-portability"
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
        "analyze.authority-portability"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "audit.authority-portability"
    ],
    "scope": {
      "read": [
        "docs/architecture/decisions/0004-specialist-compiler-first.md",
        "docs/framework/executor-boundary.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/specs/v11-orchestration-planner/architecture-review-round-4.md",
        "docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md",
        "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md",
        "package.json",
        "src/index.ts",
        "src/specialist-handoff.ts"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/architecture/decisions/0004-specialist-compiler-first.md",
          "docs/framework/executor-boundary.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/specs/v11-orchestration-planner/architecture-review-round-4.md",
          "docs/specs/v11-orchestration-planner/revision-5-correction-design.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md",
          "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md",
          "package.json",
          "src/index.ts",
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
      "criterionId": "criterion.authority-portability",
      "criterion": "The design preserves exact package and handoff identity, least authority, caller persistence, and IDE/provider neutrality without claiming runtime effects.",
      "requirementId": "evidence.authority-portability-review",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve the exact authority, security, and portability review.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "authority-portability-review.md"
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
  "contentDigest": "sha256:911a57f8c3af23c56739ed04483b63c36351c4f4f63b2fdc68b691ab06582bd9"
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
    "id": "agent.7873619e962938bde0ffb1ee68100343c480344ee324413e6b6194035253fe2f",
    "blueprintDigest": "sha256:911a57f8c3af23c56739ed04483b63c36351c4f4f63b2fdc68b691ab06582bd9"
  },
  "compilationDigest": "sha256:662a7ca9303d3d347dbbe32835b3f2635b37f22ef8b051214a9e5924cb3f6415",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "analyze.authority-portability"
  ],
  "artifacts": [
    {
      "name": "authority-portability-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.authority-portability",
      "requirementId": "evidence.authority-portability-review",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "authority-portability-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
