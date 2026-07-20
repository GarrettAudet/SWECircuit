# Specialist Contract: agent.30201e58e8e1ff0a39a7ce80868e2a9ed86703849286b41ef59dcf22c875ed04

Compilation: `sha256:cd70618e14b23dfae4538c41b6709791238684192b5c000f4e577f0edd6b5fd3`
Blueprint: `sha256:c755c5e5e1474d06fe6bbae940fcc67a27dfc0b7f0be2181670f09816a2bf80f`

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
  "id": "agent.30201e58e8e1ff0a39a7ce80868e2a9ed86703849286b41ef59dcf22c875ed04",
  "goalId": "v12.ide-run-loop.release-review",
  "goalRevision": 1,
  "goalDigest": "sha256:a62b75ffda9ec7460e81572548f2cf65665a7683be4c1b41a1f2e8cad1c19dfd",
  "candidateId": "team.c59afff49b8af248cdf6c9b5bcfbb94595856ddd6b4a84fd9331e0858a1505ec",
  "workUnitIds": [
    "review.product-api-ide"
  ],
  "objectives": [
    {
      "workUnitId": "review.product-api-ide",
      "objective": "Audit whether V12 presents one accurate, simple, IDE-neutral path from an approved package through visible specialist work to verified integration handoff."
    }
  ],
  "modules": [
    {
      "id": "release-review.product-api-ide",
      "action": "Review product truth, public API shape, schema publication, installed-consumer behavior, IDE guidance, module composition, and dogfood claims against AC1-AC9; reject ambiguity or host-effect overclaim.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenV12ReleaseCandidate"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "ProductApiIdeReleaseReview"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr",
      "kind": "repository",
      "locator": "path:docs/architecture/decisions/0005-immutable-specialist-run-session.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "docs/architecture/decisions/0005-immutable-specialist-run-session.md"
    },
    {
      "sourceId": "context.architecture",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
      "digest": "sha256:cbfc5691b997c7aac70e04376bde109f7b8b787a61672a4e3f0c401519417157",
      "bytes": 26018,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md"
    },
    {
      "sourceId": "context.candidate-manifest",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
      "digest": "sha256:af16ab6ce302a85451cd99198d9a8ab93c8b159c47d4a79345248d5c08759c3f",
      "bytes": 8162,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json"
    },
    {
      "sourceId": "context.consumer-check",
      "kind": "repository",
      "locator": "path:scripts/check-packed-consumer.mjs",
      "digest": "sha256:6dfb5a5f25b8533d2b7c7fd736f78a8611deaf22fdc0c060e5749e96cf10ea0e",
      "bytes": 43244,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.consumer-host",
      "kind": "repository",
      "locator": "path:scripts/fixtures/packed-consumer-host.ts",
      "digest": "sha256:90633af96b2afaa66dfaddd66e27f2e050dfd0ac5c052f8c1e2413d21db74d00",
      "bytes": 23434,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "scripts/fixtures/packed-consumer-host.ts"
    },
    {
      "sourceId": "context.dogfood",
      "kind": "repository",
      "locator": "path:scripts/run-v12-dogfood.mjs",
      "digest": "sha256:61bab56f5dbba096b4cb87d07ce34dd09a561f08575243f2cc8d4c786ea7ce39",
      "bytes": 17905,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "scripts/run-v12-dogfood.mjs"
    },
    {
      "sourceId": "context.ide-guide",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:9c321b526902503f845d96e9b20291f41c03a04d5df0098af33388815c03402c",
      "bytes": 22016,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "docs/ide/specialist-agent-kickoff.md"
    },
    {
      "sourceId": "context.implementation-notes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/implementation-notes.md",
      "digest": "sha256:0458b4cfba87efb55027f2fc9123fae4c875f7742dd23383c3b3c781ea92d1c1",
      "bytes": 9911,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/implementation-notes.md"
    },
    {
      "sourceId": "context.index",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f",
      "bytes": 5447,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.module-guide",
      "kind": "repository",
      "locator": "path:docs/modules/specialist-run-session.md",
      "digest": "sha256:862548641f8846bc471fa11c6a2d3a95e664a74db6382337638dd3588692df43",
      "bytes": 4205,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "docs/modules/specialist-run-session.md"
    },
    {
      "sourceId": "context.modules-index",
      "kind": "repository",
      "locator": "path:docs/modules/README.md",
      "digest": "sha256:8293e0fd966ddf2eba089d8bfef2f328489851a789eacd251bbb9d96e58c49e5",
      "bytes": 2744,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
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
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
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
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "README.md"
    },
    {
      "sourceId": "context.review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/review.md",
      "digest": "sha256:88102e5df58f5cba462e51cebdfe7b859b046403725d8e4fec79f9f597604592",
      "bytes": 598,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/review.md"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:42f53ec000a3cfa69786b0895354ab1b9ab24322305b5ef9d7b33d9a46d13390",
      "bytes": 16223,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/specialist-run-contract.md"
    },
    {
      "sourceId": "context.schema-guide",
      "kind": "repository",
      "locator": "path:schemas/v1alpha1/README.md",
      "digest": "sha256:e2bd5e0ca5123873d07fe5bdaff4181b38c34a6cbea0220ecb02e78a62f18223",
      "bytes": 20795,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "schemas/v1alpha1/README.md"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/spec.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/test-plan.md",
      "digest": "sha256:694b83cec4e8ef1c56111972d5ea398863071f23cdda9b18c0bddc7e3f0bda8d",
      "bytes": 1930,
      "purposes": [
        "Audit the exact V12 product, public API, IDE, and usability surface."
      ],
      "workUnitIds": [
        "review.product-api-ide"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/test-plan.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "audit.product-api-ide-truth"
    ],
    "scope": {
      "read": [
        "README.md",
        "docs/architecture/decisions/0005-immutable-specialist-run-session.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/modules/README.md",
        "docs/modules/specialist-run-session.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
        "docs/specs/v12-ide-run-loop/implementation-notes.md",
        "docs/specs/v12-ide-run-loop/review.md",
        "docs/specs/v12-ide-run-loop/spec.md",
        "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/test-plan.md",
        "docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
        "package.json",
        "schemas/v1alpha1/README.md",
        "scripts/check-packed-consumer.mjs",
        "scripts/fixtures/packed-consumer-host.ts",
        "scripts/run-v12-dogfood.mjs",
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
          "docs/architecture/decisions/0005-immutable-specialist-run-session.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/modules/README.md",
          "docs/modules/specialist-run-session.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
          "docs/specs/v12-ide-run-loop/implementation-notes.md",
          "docs/specs/v12-ide-run-loop/review.md",
          "docs/specs/v12-ide-run-loop/spec.md",
          "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/test-plan.md",
          "docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
          "package.json",
          "schemas/v1alpha1/README.md",
          "scripts/check-packed-consumer.mjs",
          "scripts/fixtures/packed-consumer-host.ts",
          "scripts/run-v12-dogfood.mjs",
          "src/index.ts"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "git",
          "node",
          "npm"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not edit files, change Git state, access the network, launch descendants, repair findings, or claim that core performs external host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.review.product-api-ide",
      "criterion": "Audit whether V12 presents one accurate, simple, IDE-neutral path from an approved package through visible specialist work to verified integration handoff.",
      "requirementId": "evidence.product-api-ide-release-review",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve the exact independent ProductApiIdeReleaseReview evidence.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "product-api-ide-release-review.md"
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
    "Authenticate every declared source against its exact byte count and SHA-256 binding before review.",
    "Do not edit files, change Git state, access the network, launch descendants, or repair a finding.",
    "Report findings first with severity and exact file/line evidence; use pass only when this review domain is release-ready.",
    "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Use only local read-only inspection and bounded verification commands; report any command that changes tracked bytes as a failure."
  ],
  "contentDigest": "sha256:c755c5e5e1474d06fe6bbae940fcc67a27dfc0b7f0be2181670f09816a2bf80f"
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
    "id": "v12.ide-run-loop.release-review",
    "revision": 1,
    "digest": "sha256:a62b75ffda9ec7460e81572548f2cf65665a7683be4c1b41a1f2e8cad1c19dfd"
  },
  "agent": {
    "id": "agent.30201e58e8e1ff0a39a7ce80868e2a9ed86703849286b41ef59dcf22c875ed04",
    "blueprintDigest": "sha256:c755c5e5e1474d06fe6bbae940fcc67a27dfc0b7f0be2181670f09816a2bf80f"
  },
  "compilationDigest": "sha256:cd70618e14b23dfae4538c41b6709791238684192b5c000f4e577f0edd6b5fd3",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.product-api-ide"
  ],
  "artifacts": [
    {
      "name": "product-api-ide-release-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.product-api-ide",
      "requirementId": "evidence.product-api-ide-release-review",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "product-api-ide-release-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
