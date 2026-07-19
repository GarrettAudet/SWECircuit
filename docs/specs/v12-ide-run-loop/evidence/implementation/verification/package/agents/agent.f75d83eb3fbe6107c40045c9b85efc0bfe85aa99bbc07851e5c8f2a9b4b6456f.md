# Specialist Contract: agent.f75d83eb3fbe6107c40045c9b85efc0bfe85aa99bbc07851e5c8f2a9b4b6456f

Compilation: `sha256:b719fd06f811091968c14ed8ff531ed5cd9df22d90d050e76c355dd542a1aed6`
Blueprint: `sha256:fb82dbe4b27bc72be8b80c1afb95f34c00a2e44b17e65520a39ebf53c5c4fe2a`

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
  "id": "agent.f75d83eb3fbe6107c40045c9b85efc0bfe85aa99bbc07851e5c8f2a9b4b6456f",
  "goalId": "v12.ide-run-loop.implementation.verification",
  "goalRevision": 1,
  "goalDigest": "sha256:6c5ae1648b5607731fa81fa1f5dc4c1df5ccb745b298ba85e6c120ddc2961ff9",
  "candidateId": "team.6a7ba2420f0ed3561663f0d08c4112baccd686d80f20cccb823cf6e7e067c454",
  "workUnitIds": [
    "dogfood.ide-run-loop"
  ],
  "objectives": [
    {
      "workUnitId": "dogfood.ide-run-loop",
      "objective": "Make the four-operation IDE journey visible and dogfoodable without hiding external host responsibilities."
    }
  ],
  "modules": [
    {
      "id": "dogfood.ide-run-loop",
      "action": "Add a deterministic V12 dogfood script and concise module/IDE guidance that shows goal review, package approval, dependency eligibility, exact fan-in, routing, and separate integration closeout.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenRunReleaseCandidate"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IdeRunLoopDogfood"
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
        "dogfood.ide-run-loop"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.ide-guide",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:8ceec4c3478b9f2adc7000893705f41b09b153d9747637884ac07e46b416eaf3",
      "bytes": 17565,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "dogfood.ide-run-loop"
      ],
      "readScope": "docs/ide/specialist-agent-kickoff.md"
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
        "dogfood.ide-run-loop"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.modules-readme",
      "kind": "repository",
      "locator": "path:docs/modules/README.md",
      "digest": "sha256:1dd8bdeddafe09d2b32d3e573a7184406e72570b1922659e7703bbd28a389716",
      "bytes": 2542,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "dogfood.ide-run-loop"
      ],
      "readScope": "docs/modules/README.md"
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
        "dogfood.ide-run-loop"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:6870ce77e4a29a000ff8a8a170d968a735fb339cfac7d412b23080cfc61163dc",
      "bytes": 3101,
      "purposes": [
        "Implement or verify the exact frozen V12 verification contract."
      ],
      "workUnitIds": [
        "dogfood.ide-run-loop"
      ],
      "readScope": "README.md"
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
        "dogfood.ide-run-loop"
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
        "dogfood.ide-run-loop"
      ],
      "readScope": "src/specialist-run-inspection.ts"
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
        "dogfood.ide-run-loop"
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
        "dogfood.ide-run-loop"
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
        "dogfood.ide-run-loop"
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
        "dogfood.ide-run-loop"
      ],
      "readScope": "src/specialist-run-types.ts"
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
        "dogfood.ide-run-loop"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md"
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
        "dogfood.ide-run-loop"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "document.dogfood-ide-run-loop"
    ],
    "scope": {
      "read": [
        "README.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/modules/README.md",
        "docs/modules/specialist-run-session.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md",
        "package.json",
        "schemas/v1alpha1/specialist-run.schema.json",
        "scripts/run-v12-dogfood.mjs",
        "src/index.ts",
        "src/specialist-run-inspection.ts",
        "src/specialist-run-session.ts",
        "src/specialist-run-transition.ts",
        "src/specialist-run-types.ts"
      ],
      "write": [
        "docs/ide/specialist-agent-kickoff.md",
        "docs/modules/README.md",
        "docs/modules/specialist-run-session.md",
        "scripts/run-v12-dogfood.mjs"
      ],
      "conflictZones": [
        "docs/ide/specialist-agent-kickoff.md",
        "docs/modules/README.md",
        "docs/modules/specialist-run-session.md",
        "scripts/run-v12-dogfood.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "README.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/modules/README.md",
          "docs/modules/specialist-run-session.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md",
          "package.json",
          "schemas/v1alpha1/specialist-run.schema.json",
          "scripts/run-v12-dogfood.mjs",
          "src/index.ts",
          "src/specialist-run-inspection.ts",
          "src/specialist-run-session.ts",
          "src/specialist-run-transition.ts",
          "src/specialist-run-types.ts"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/ide/specialist-agent-kickoff.md",
          "docs/modules/README.md",
          "docs/modules/specialist-run-session.md",
          "scripts/run-v12-dogfood.mjs"
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
      "criterionId": "criterion.dogfood.ide-run-loop",
      "criterion": "Make the four-operation IDE journey visible and dogfoodable without hiding external host responsibilities.",
      "requirementId": "evidence.ide-dogfood",
      "kind": "review",
      "duty": "produce",
      "description": "Provide a replayable IDE journey and measured host-boundary evidence for AC7 and AC8.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "ide-run-loop-dogfood.md"
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
  "contentDigest": "sha256:fb82dbe4b27bc72be8b80c1afb95f34c00a2e44b17e65520a39ebf53c5c4fe2a"
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
    "id": "agent.f75d83eb3fbe6107c40045c9b85efc0bfe85aa99bbc07851e5c8f2a9b4b6456f",
    "blueprintDigest": "sha256:fb82dbe4b27bc72be8b80c1afb95f34c00a2e44b17e65520a39ebf53c5c4fe2a"
  },
  "compilationDigest": "sha256:b719fd06f811091968c14ed8ff531ed5cd9df22d90d050e76c355dd542a1aed6",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "dogfood.ide-run-loop"
  ],
  "artifacts": [
    {
      "name": "ide-run-loop-dogfood.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.dogfood.ide-run-loop",
      "requirementId": "evidence.ide-dogfood",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "ide-run-loop-dogfood.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
