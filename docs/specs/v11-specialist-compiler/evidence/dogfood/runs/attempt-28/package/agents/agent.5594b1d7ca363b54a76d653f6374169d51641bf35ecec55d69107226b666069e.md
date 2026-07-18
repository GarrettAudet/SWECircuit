# Specialist Contract: agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e

Compilation: `sha256:18e40b2586375f0b7004fe088b7b2ebc2f0bd607dec27963c1b68c7ee719df7c`
Blueprint: `sha256:b8ac51fa53bcc19e3d7e6ad9219181dd2b81fddfb9dfdf7690f18ef555431bf1`

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
  "id": "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 28,
  "goalDigest": "sha256:4f3992c10ba085705bb6e68dbee411ea982fddf360276bdb64682526acaa0c52",
  "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "workUnitIds": [
    "review.product-api"
  ],
  "objectives": [
    {
      "workUnitId": "review.product-api",
      "objective": "Independently determine whether V11 solves the owner goal with a clear, minimal, IDE-agnostic public contract."
    }
  ],
  "modules": [
    {
      "id": "review.product-api",
      "action": "Review product fit, public API closure, usability, and claimed boundaries.",
      "inputPorts": [
        {
          "name": "candidate",
          "artifactType": "ReviewCandidate"
        }
      ],
      "outputPorts": [
        {
          "name": "review",
          "artifactType": "ProductApiReview"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730"
  ],
  "contextUses": [
    {
      "sourceId": "context.agents",
      "kind": "repository",
      "locator": "path:AGENTS.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.changelog",
      "kind": "repository",
      "locator": "path:CHANGELOG.md",
      "digest": "sha256:ff6307186388d4435050863dd56b3ca5ffd4fab1ee8616f1666d1e2223b3b6f8",
      "bytes": 3512,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "CHANGELOG.md"
    },
    {
      "sourceId": "context.common-schema",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/common.schema.json",
      "digest": "sha256:d3cdcd5d8723477db18a77a2396c6ea475bbc0e1cca44f952a594cc55832e636",
      "bytes": 10709,
      "purposes": [
        "Review the complete package-owned schema surface."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "schemas/v1alpha1/common.schema.json"
    },
    {
      "sourceId": "context.compiler",
      "kind": "repository",
      "locator": "path:src/specialist-compiler.ts",
      "digest": "sha256:2a39a85745de2124464744c9635144e4e878cbea2f2b584ded25adb946798da7",
      "bytes": 69522,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/specialist-compiler.ts"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:813d53058e1c3bde7b1c434d1868375560f4802a3bb484b1a460685954759ef9",
      "bytes": 36449,
      "purposes": [
        "Review the human/core/host responsibility boundary."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:src/constants.ts",
      "digest": "sha256:f00156e582cafaea19f6db6f55e042422c488b660483f5fccee1d6b1988cee6f",
      "bytes": 2088,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.consumer-check",
      "kind": "repository",
      "locator": "path:scripts/check-packed-consumer.mjs",
      "digest": "sha256:dccdb91dbd30beb5961595c301545a3979e274e54ec73c751d16431cdf5cd8eb",
      "bytes": 37768,
      "purposes": [
        "Review the executable installed-consumer trust boundary."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.contributing",
      "kind": "repository",
      "locator": "path:CONTRIBUTING.md",
      "digest": "sha256:1e5703e5a85e5ac005b418b1a6499afc06e5f44f9fe0fde3ff64a9b52f2f0a6c",
      "bytes": 2258,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "CONTRIBUTING.md"
    },
    {
      "sourceId": "context.diagnostic-catalog",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/diagnostic-catalog.json",
      "digest": "sha256:816bc731f6f4fab8132430aded14d28a100fef3ab6e0d6f04f25bace2653ad3a",
      "bytes": 12641,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "schemas/v1alpha1/diagnostic-catalog.json"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:src/diagnostics.ts",
      "digest": "sha256:570e2d2349f6e466999f7a8d9c15b0f82342afa4ccd1042729c282e66c4a7f14",
      "bytes": 23891,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.first-run",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/run.mjs",
      "digest": "sha256:03b92fd422336af5aa7b1e94ce667768189afa1e2528818bc6b603133461f047",
      "bytes": 11706,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "examples/specialist-compiler/run.mjs"
    },
    {
      "sourceId": "context.first-run-approval",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/approval.json",
      "digest": "sha256:c23dd3304615b0e825cb0036bd3743474d3a6b813ddcd30cfaa5d3d92ae96987",
      "bytes": 972,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "examples/specialist-compiler/approval.json"
    },
    {
      "sourceId": "context.first-run-readme",
      "kind": "repository",
      "locator": "path:examples/specialist-compiler/README.md",
      "digest": "sha256:a8a78bfaa9ddcf6a03febcb425079854205ec8251cef91073e5ca68539d38d7b",
      "bytes": 833,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "examples/specialist-compiler/README.md"
    },
    {
      "sourceId": "context.first-run-tests",
      "kind": "repository",
      "locator": "path:test/specialist-first-run.test.mjs",
      "digest": "sha256:921d8c414d0f01bda1f71e6448bf5c3b9e2ccbcc537d274e313c7ed156db4284",
      "bytes": 3104,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "test/specialist-first-run.test.mjs"
    },
    {
      "sourceId": "context.handbook",
      "kind": "repository",
      "locator": "path:docs/ai/handbook.md",
      "digest": "sha256:003a81b5afe94865c96a45b5b0a67427b3eeb8b9cfdfef3e35f65be54da40874",
      "bytes": 39301,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/ai/handbook.md"
    },
    {
      "sourceId": "context.handoff",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/specialist-handoff.ts"
    },
    {
      "sourceId": "context.handoff-schema",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/specialist-handoff.schema.json",
      "digest": "sha256:afade2b11be6db71a17aa35841d292b99e05c6a4c157505c3b649a3f145aa4e9",
      "bytes": 4287,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "schemas/v1alpha1/specialist-handoff.schema.json"
    },
    {
      "sourceId": "context.handoff-schema-loader",
      "kind": "repository",
      "locator": "path:src/specialist-handoff-schema.ts",
      "digest": "sha256:b48779dc0b5e29124e9b689e11613bd850e4a33cf9f65eca8d3a051865ce5911",
      "bytes": 2421,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/specialist-handoff-schema.ts"
    },
    {
      "sourceId": "context.handoff-tests",
      "kind": "repository",
      "locator": "path:test/specialist-handoff.test.mjs",
      "digest": "sha256:41d25b24adb4062992012983b4eb99175f371929fb83e522f1723799b3e196af",
      "bytes": 10709,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "test/specialist-handoff.test.mjs"
    },
    {
      "sourceId": "context.ide-kickoff",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:8ceec4c3478b9f2adc7000893705f41b09b153d9747637884ac07e46b416eaf3",
      "bytes": 17565,
      "purposes": [
        "Review the shortest user-visible compile-and-hand-off path."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/ide/specialist-agent-kickoff.md"
    },
    {
      "sourceId": "context.index",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dfa16eda45276f9caf5f59e12b2a20c5c0650a153b84d04510e0feac754b672b",
      "bytes": 4688,
      "purposes": [
        "Review the exact public export inventory."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.module-guide",
      "kind": "repository",
      "locator": "path:docs/modules/specialist-agent-compiler.md",
      "digest": "sha256:741bed2ad50483a935a2009719fe14e13ce794d5e7dc15575da947260c0ea5da",
      "bytes": 17016,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/modules/specialist-agent-compiler.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:52acc84e561245f27afe26af16c000ce5d1e121b5649c4e70c2d03ec140c7be7",
      "bytes": 2549,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.packed-consumer-host",
      "kind": "repository",
      "locator": "path:scripts/fixtures/packed-consumer-host.ts",
      "digest": "sha256:9911410ebb6c7d1ee9904dbfa9c70adbac5213c7b3fbc3ee4d782f8bd57e89e7",
      "bytes": 18435,
      "purposes": [
        "Review installed TypeScript API use and permission-kind parity."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "scripts/fixtures/packed-consumer-host.ts"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:bc164b251bfd2c79be1c6bd6a1906e8172d49135b43f3cc48bdb60295abeccb4",
      "bytes": 7487,
      "purposes": [
        "Review public positioning and clarity."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "README.md"
    },
    {
      "sourceId": "context.renderer",
      "kind": "repository",
      "locator": "path:src/specialist-render.ts",
      "digest": "sha256:e8c2c73bf266b32ebee589497a5298435bb50f59e50d00d9d70ed3f65dc526e7",
      "bytes": 19184,
      "purposes": [
        "Review the portable launch package."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/specialist-render.ts"
    },
    {
      "sourceId": "context.schema",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/specialist-compiler.schema.json",
      "digest": "sha256:860cbe31f1b86676ea35df361e0d1b215aa92e8253bd5de266fded42fe6039cd",
      "bytes": 15392,
      "purposes": [
        "Review the closed provider-neutral input."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "schemas/v1alpha1/specialist-compiler.schema.json"
    },
    {
      "sourceId": "context.schema-readme",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/README.md",
      "digest": "sha256:02a965b0c98dfeb522086339866d1b62340802b1cbccafdbf97b261120a96b41",
      "bytes": 18724,
      "purposes": [
        "Review the public product and API contract."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "schemas/v1alpha1/README.md"
    },
    {
      "sourceId": "context.schema-tests",
      "kind": "repository",
      "locator": "path:test/specialist-schema.test.mjs",
      "digest": "sha256:a3e7cae50268ffa4b396d7053a3d4acc87ff901a6efb1e77f32671a3811caa15",
      "bytes": 12729,
      "purposes": [
        "Review installed and provider-neutral schema evidence."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "test/specialist-schema.test.mjs"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
      "digest": "sha256:0da700163db0f683c0f686e48788cdeb4648870091f8d7e1b460125b3afc2b32",
      "bytes": 20613,
      "purposes": [
        "Review acceptance and owner fit."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md"
    },
    {
      "sourceId": "context.two-phase-prelaunch-review",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
      "digest": "sha256:2b7443465ac1988f83d955c37e4b89c0dfdc15ba7ef57eec7bd7684970038233",
      "bytes": 12409,
      "purposes": [
        "Review whether the conditional audit flow remains understandable and usable."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md"
    },
    {
      "sourceId": "context.types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:f0f1384cdef06972e54800d6fd2c57f08b8ebe8a8703b9178e6c3fa78f53e934",
      "bytes": 16047,
      "purposes": [
        "Review the additive public type surface."
      ],
      "workUnitIds": [
        "review.product-api"
      ],
      "readScope": "src/specialist-types.ts"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.product-api"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "CHANGELOG.md",
        "CONTRIBUTING.md",
        "README.md",
        "docs/ai/handbook.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/modules/specialist-agent-compiler.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
        "examples/specialist-compiler/README.md",
        "examples/specialist-compiler/approval.json",
        "examples/specialist-compiler/run.mjs",
        "package.json",
        "schemas/v1alpha1/README.md",
        "schemas/v1alpha1/common.schema.json",
        "schemas/v1alpha1/diagnostic-catalog.json",
        "schemas/v1alpha1/specialist-compiler.schema.json",
        "schemas/v1alpha1/specialist-handoff.schema.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/fixtures/packed-consumer-host.ts",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/index.ts",
        "src/specialist-compiler.ts",
        "src/specialist-handoff-schema.ts",
        "src/specialist-handoff.ts",
        "src/specialist-render.ts",
        "src/specialist-types.ts",
        "test/specialist-first-run.test.mjs",
        "test/specialist-handoff.test.mjs",
        "test/specialist-schema.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "AGENTS.md",
          "CHANGELOG.md",
          "CONTRIBUTING.md",
          "README.md",
          "docs/ai/handbook.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/modules/specialist-agent-compiler.md",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
          "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
          "examples/specialist-compiler/README.md",
          "examples/specialist-compiler/approval.json",
          "examples/specialist-compiler/run.mjs",
          "package.json",
          "schemas/v1alpha1/README.md",
          "schemas/v1alpha1/common.schema.json",
          "schemas/v1alpha1/diagnostic-catalog.json",
          "schemas/v1alpha1/specialist-compiler.schema.json",
          "schemas/v1alpha1/specialist-handoff.schema.json",
          "scripts/check-packed-consumer.mjs",
          "scripts/fixtures/packed-consumer-host.ts",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/index.ts",
          "src/specialist-compiler.ts",
          "src/specialist-handoff-schema.ts",
          "src/specialist-handoff.ts",
          "src/specialist-render.ts",
          "src/specialist-types.ts",
          "test/specialist-first-run.test.mjs",
          "test/specialist-handoff.test.mjs",
          "test/specialist-schema.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "powershell",
          "rg"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access a network or provider.",
      "Do not execute or dispatch runtime agents from core.",
      "Do not merge or update durable memory before integration review.",
      "Do not widen reviewed filesystem authority."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.product-api",
      "criterion": "The V11 public compiler, candidate-analysis, package, handoff, fan-in, first-run, IDE, and exported schema APIs match the owner goal and remain IDE, model, provider, runtime, private-path, and network neutral.",
      "requirementId": "evidence.product-review",
      "kind": "review",
      "duty": "review",
      "description": "Independent product and API acceptance review.",
      "independentFromProducer": true
    }
  ],
  "handoff": {
    "destination": "v11.integration-owner",
    "artifacts": [
      "product-api-review.md"
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
    "Stop with REVISE if a generic role can substitute for exact task demand.",
    "Stop with REVISE if the public contract requires a provider or runtime."
  ],
  "contentDigest": "sha256:b8ac51fa53bcc19e3d7e6ad9219181dd2b81fddfb9dfdf7690f18ef555431bf1"
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
  "destination": "v11.integration-owner",
  "goal": {
    "id": "v11.specialist-compiler.release",
    "revision": 28,
    "digest": "sha256:4f3992c10ba085705bb6e68dbee411ea982fddf360276bdb64682526acaa0c52"
  },
  "agent": {
    "id": "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
    "blueprintDigest": "sha256:b8ac51fa53bcc19e3d7e6ad9219181dd2b81fddfb9dfdf7690f18ef555431bf1"
  },
  "compilationDigest": "sha256:18e40b2586375f0b7004fe088b7b2ebc2f0bd607dec27963c1b68c7ee719df7c",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.product-api"
  ],
  "artifacts": [
    {
      "name": "product-api-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.product-api",
      "requirementId": "evidence.product-review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "product-api-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
