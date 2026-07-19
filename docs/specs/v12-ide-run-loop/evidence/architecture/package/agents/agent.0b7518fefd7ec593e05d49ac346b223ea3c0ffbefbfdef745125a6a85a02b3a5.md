# Specialist Contract: agent.0b7518fefd7ec593e05d49ac346b223ea3c0ffbefbfdef745125a6a85a02b3a5

Compilation: `sha256:662a7ca9303d3d347dbbe32835b3f2635b37f22ef8b051214a9e5924cb3f6415`
Blueprint: `sha256:12a6287d940d22dfde9669e97403f5d498fb1f35dbbc4f54efd31f88ed4a2f28`

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
  "id": "agent.0b7518fefd7ec593e05d49ac346b223ea3c0ffbefbfdef745125a6a85a02b3a5",
  "goalId": "v12.ide-run-loop.architecture",
  "goalRevision": 1,
  "goalDigest": "sha256:2fad6a458f7b7e8060a5967c8edc60ae7c05ffd4b5cb97512e998ea227215d2f",
  "candidateId": "team.00b2c4ec308f683d52e273ce7d5a575365ac2c2d378e85ac40b63b320c7ac71f",
  "workUnitIds": [
    "analyze.product-run-loop"
  ],
  "objectives": [
    {
      "workUnitId": "analyze.product-run-loop",
      "objective": "Define the smallest V12 behavior and one-message IDE experience that makes an approved V11 specialist package usable without hiding host responsibilities."
    }
  ],
  "modules": [
    {
      "id": "review.product-run-loop",
      "action": "Trace the developer and IDE journey, identify indispensable artifacts and decisions, reject ceremony, and return testable product/API recommendations mapped to AC1-AC9.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenV12Intent"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "ProductRunLoopReview"
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
        "analyze.product-run-loop"
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
        "analyze.product-run-loop"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
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
        "analyze.product-run-loop"
      ],
      "readScope": "docs/ai/handbook.md"
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
        "analyze.product-run-loop"
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
        "analyze.product-run-loop"
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
        "analyze.product-run-loop"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:6870ce77e4a29a000ff8a8a170d968a735fb339cfac7d412b23080cfc61163dc",
      "bytes": 3101,
      "purposes": [
        "Inspect the exact frozen V12 architecture input."
      ],
      "workUnitIds": [
        "analyze.product-run-loop"
      ],
      "readScope": "README.md"
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
        "analyze.product-run-loop"
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
        "analyze.product-run-loop"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "analyze.ide-product-flow"
    ],
    "scope": {
      "read": [
        "README.md",
        "docs/ai/handbook.md",
        "docs/architecture/decisions/0004-specialist-compiler-first.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md",
        "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md",
        "package.json",
        "src/index.ts"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "README.md",
          "docs/ai/handbook.md",
          "docs/architecture/decisions/0004-specialist-compiler-first.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md",
          "docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md",
          "package.json",
          "src/index.ts"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not write files, run tests, access the network, launch descendants, change Git state, or claim that core performs host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.product-run-loop",
      "criterion": "The design gives an IDE one clear path from an approved package to visible launch, fan-in, integration, and closeout instructions.",
      "requirementId": "evidence.product-run-loop-review",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve the exact product and IDE usability review.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "product-run-loop-review.md"
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
  "contentDigest": "sha256:12a6287d940d22dfde9669e97403f5d498fb1f35dbbc4f54efd31f88ed4a2f28"
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
    "id": "agent.0b7518fefd7ec593e05d49ac346b223ea3c0ffbefbfdef745125a6a85a02b3a5",
    "blueprintDigest": "sha256:12a6287d940d22dfde9669e97403f5d498fb1f35dbbc4f54efd31f88ed4a2f28"
  },
  "compilationDigest": "sha256:662a7ca9303d3d347dbbe32835b3f2635b37f22ef8b051214a9e5924cb3f6415",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "analyze.product-run-loop"
  ],
  "artifacts": [
    {
      "name": "product-run-loop-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.product-run-loop",
      "requirementId": "evidence.product-run-loop-review",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "product-run-loop-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
