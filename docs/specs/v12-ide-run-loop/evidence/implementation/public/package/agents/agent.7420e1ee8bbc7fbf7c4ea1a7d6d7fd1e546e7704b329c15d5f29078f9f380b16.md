# Specialist Contract: agent.7420e1ee8bbc7fbf7c4ea1a7d6d7fd1e546e7704b329c15d5f29078f9f380b16

Compilation: `sha256:e0f60f3dc69bfbcc8b0d6b37c5fc048b39d5d1ccae123849961ee5f2548646cb`
Blueprint: `sha256:e485f54685142b60e94004ecd9e35bb33da7d969967a666252674e7e25fc8a78`

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
  "id": "agent.7420e1ee8bbc7fbf7c4ea1a7d6d7fd1e546e7704b329c15d5f29078f9f380b16",
  "goalId": "v12.ide-run-loop.implementation.public",
  "goalRevision": 1,
  "goalDigest": "sha256:02a26ec0d800ab1e9d0d11f73b9deb3f62b5388cfbb979e4a8ae63c8ebcd7378",
  "candidateId": "team.1188e52efea8241e53a452397083ee7f0a9c6b48f3d4034833a96f5621a828e7",
  "workUnitIds": [
    "integrate.public-surface"
  ],
  "objectives": [
    {
      "workUnitId": "integrate.public-surface",
      "objective": "Export the four operations, constants, and closed types; publish the schema path; and prove clean installed-consumer use."
    }
  ],
  "modules": [
    {
      "id": "integration.run-public-surface",
      "action": "Update only the additive export, package, schema catalog, and packed-consumer surfaces; retain every V11 export and add the V12 dogfood command without implementing host effects.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "VerifiedRunImplementation"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IntegratedRunPublicSurface"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:src/constants.ts",
      "digest": "sha256:b7050ac085a3fcd7dad839e3fbe930ecbf49224d40a37f0a44dd15052bc06058",
      "bytes": 2571,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.diagnostic-catalog",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/diagnostic-catalog.json",
      "digest": "sha256:816bc731f6f4fab8132430aded14d28a100fef3ab6e0d6f04f25bace2653ad3a",
      "bytes": 12641,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "schemas/v1alpha1/diagnostic-catalog.json"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:src/diagnostics.ts",
      "digest": "sha256:3d27fe071994a2a87a59ecadc52a788a6aaf85737b46371f5622bf10c50aede6",
      "bytes": 25190,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.index",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dfa16eda45276f9caf5f59e12b2a20c5c0650a153b84d04510e0feac754b672b",
      "bytes": 4688,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
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
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "test/specialist-run-inspection.test.mjs"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:52acc84e561245f27afe26af16c000ce5d1e121b5649c4e70c2d03ec140c7be7",
      "bytes": 2549,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.packed-check",
      "kind": "repository",
      "locator": "path:scripts/check-packed-consumer.mjs",
      "digest": "sha256:dccdb91dbd30beb5961595c301545a3979e274e54ec73c751d16431cdf5cd8eb",
      "bytes": 37768,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.packed-host",
      "kind": "repository",
      "locator": "path:scripts/fixtures/packed-consumer-host.ts",
      "digest": "sha256:9911410ebb6c7d1ee9904dbfa9c70adbac5213c7b3fbc3ee4d782f8bd57e89e7",
      "bytes": 18435,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "scripts/fixtures/packed-consumer-host.ts"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/specialist-run-contract.md",
      "digest": "sha256:42f53ec000a3cfa69786b0895354ab1b9ab24322305b5ef9d7b33d9a46d13390",
      "bytes": 16223,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.run-inspection",
      "kind": "repository",
      "locator": "path:src/specialist-run-inspection.ts",
      "digest": "sha256:c20a875b521387aad12831a4508a1fff76371a76d53bc27740dfe527b16eb90e",
      "bytes": 14484,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
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
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
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
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
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
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
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
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
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
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "src/specialist-run-types.ts"
    },
    {
      "sourceId": "context.schema-readme",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/README.md",
      "digest": "sha256:02a965b0c98dfeb522086339866d1b62340802b1cbccafdbf97b261120a96b41",
      "bytes": 18724,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "schemas/v1alpha1/README.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/test-plan.md",
      "digest": "sha256:acbb09315f1e22a61a08b549ff7ba4142d61e9c04c859cf2e991690492caf3f3",
      "bytes": 1867,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/test-plan.md"
    },
    {
      "sourceId": "context.transition-tests",
      "kind": "repository",
      "locator": "path:test/specialist-run-transition.test.mjs",
      "digest": "sha256:bc140c1c1e02a02160c6a7b0ed8399b99dda99d418a6f6f9151039548eb39c28",
      "bytes": 9861,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "test/specialist-run-transition.test.mjs"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 public contract."
      ],
      "workUnitIds": [
        "integrate.public-surface"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "integrate.public-package-surface"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/test-plan.md",
        "package.json",
        "schemas/v1alpha1/README.md",
        "schemas/v1alpha1/diagnostic-catalog.json",
        "schemas/v1alpha1/specialist-run.schema.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/fixtures/packed-consumer-host.ts",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/index.ts",
        "src/specialist-run-inspection.ts",
        "src/specialist-run-schema.ts",
        "src/specialist-run-session.ts",
        "src/specialist-run-transition.ts",
        "src/specialist-run-types.ts",
        "test/specialist-run-inspection.test.mjs",
        "test/specialist-run-transition.test.mjs"
      ],
      "write": [
        "package.json",
        "schemas/v1alpha1/README.md",
        "schemas/v1alpha1/diagnostic-catalog.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/fixtures/packed-consumer-host.ts",
        "src/index.ts"
      ],
      "conflictZones": [
        "package.json",
        "schemas/v1alpha1/README.md",
        "schemas/v1alpha1/diagnostic-catalog.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/fixtures/packed-consumer-host.ts",
        "src/index.ts"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/public/inputs/test-plan.md",
          "package.json",
          "schemas/v1alpha1/README.md",
          "schemas/v1alpha1/diagnostic-catalog.json",
          "schemas/v1alpha1/specialist-run.schema.json",
          "scripts/check-packed-consumer.mjs",
          "scripts/fixtures/packed-consumer-host.ts",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/index.ts",
          "src/specialist-run-inspection.ts",
          "src/specialist-run-schema.ts",
          "src/specialist-run-session.ts",
          "src/specialist-run-transition.ts",
          "src/specialist-run-types.ts",
          "test/specialist-run-inspection.test.mjs",
          "test/specialist-run-transition.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "package.json",
          "schemas/v1alpha1/README.md",
          "schemas/v1alpha1/diagnostic-catalog.json",
          "scripts/check-packed-consumer.mjs",
          "scripts/fixtures/packed-consumer-host.ts",
          "src/index.ts"
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
      "criterionId": "criterion.integrate.public-surface",
      "criterion": "Export the four operations, constants, and closed types; publish the schema path; and prove clean installed-consumer use.",
      "requirementId": "evidence.public-integration",
      "kind": "review",
      "duty": "produce",
      "description": "Provide declaration, schema export, packed-consumer, and V11 compatibility evidence for AC6 and AC9.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "public-surface-integration.md"
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
  "contentDigest": "sha256:e485f54685142b60e94004ecd9e35bb33da7d969967a666252674e7e25fc8a78"
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
    "id": "v12.ide-run-loop.implementation.public",
    "revision": 1,
    "digest": "sha256:02a26ec0d800ab1e9d0d11f73b9deb3f62b5388cfbb979e4a8ae63c8ebcd7378"
  },
  "agent": {
    "id": "agent.7420e1ee8bbc7fbf7c4ea1a7d6d7fd1e546e7704b329c15d5f29078f9f380b16",
    "blueprintDigest": "sha256:e485f54685142b60e94004ecd9e35bb33da7d969967a666252674e7e25fc8a78"
  },
  "compilationDigest": "sha256:e0f60f3dc69bfbcc8b0d6b37c5fc048b39d5d1ccae123849961ee5f2548646cb",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "integrate.public-surface"
  ],
  "artifacts": [
    {
      "name": "public-surface-integration.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.integrate.public-surface",
      "requirementId": "evidence.public-integration",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "public-surface-integration.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
