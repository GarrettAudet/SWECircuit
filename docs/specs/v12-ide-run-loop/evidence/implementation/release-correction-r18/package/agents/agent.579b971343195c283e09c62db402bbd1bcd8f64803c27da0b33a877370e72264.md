# Specialist Contract: agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264

Compilation: `sha256:bc3ae4a8e7acbb24f2eb3d628413390c4e9b71da0b3e8030e8117a7935af4755`
Blueprint: `sha256:afed29d3600ff495c391ef3753a01e07a39d6c006ccd2a84bd515c3d59dc4f81`

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
  "id": "agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 18,
  "goalDigest": "sha256:d61decb70b1196e1310d18d1e0d930456b6f001b34ae8c8316f50c2a67024dd4",
  "candidateId": "team.141ef9a41506c241e0cf24465fd86dcf92672bb7922d7f4ea9efea7ff08bc0ba",
  "workUnitIds": [
    "fix.parent-bootstrap-trust.r18"
  ],
  "objectives": [
    {
      "workUnitId": "fix.parent-bootstrap-trust.r18",
      "objective": "Implement and adversarially verify the complete parent/child candidate-runtime trust boundary and immutable output-promotion protocol."
    }
  ],
  "modules": [
    {
      "id": "correction.parent-bootstrap-trust",
      "action": "Bind exact candidate tooling, install exact locked supply offline outside repository ancestry, build and bind generated runtime, execute one fresh child, reverify protected closures, clean, and atomically promote only allowed evidence.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "UntrustedReleaseReviewExecution"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "ParentVerifiedReleaseReviewExecution"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:AGENTS.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/correction-contract.md",
      "digest": "sha256:d20c7cc53583d3b2942fd283fc56f7365512b58031ae927ea409bb2409d444a3",
      "bytes": 5839,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.ignore-policy",
      "kind": "repository",
      "locator": "path:.gitignore",
      "digest": "sha256:790a8c26a42342f3b5143df2e56b9c43145c2faa5758f443b63cb52b85d9b8a8",
      "bytes": 732,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": ".gitignore"
    },
    {
      "sourceId": "context.lockfile",
      "kind": "repository",
      "locator": "path:package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "package-lock.json"
    },
    {
      "sourceId": "context.offline-probe",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/offline-cache-probe.md",
      "digest": "sha256:1dd90d0ff1f8f11c739870708133284a1520ce1ad1e3de6929ddd71a92b6d5a3",
      "bytes": 1582,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/offline-cache-probe.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:63534d6bbc8b840de35cda3ad75f01f2da69f3798fdd85b9352506d13dba9368",
      "bytes": 2931,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-gate-harness",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-gate.test.mjs",
      "digest": "sha256:9842abebe89689e3465579d662e70ea541722236d64b986bce222d4ce9996c47",
      "bytes": 22072,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.release-review-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:f019b39dc555afd3663519fb427cf73c9eee2b14cc9b5e769b5a1ebc733ffc7e",
      "bytes": 86706,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-review.test.mjs",
      "digest": "sha256:1abb654e346f0a6f98aa2fbab69901e0a0f8a5eebef9c9fecfa98375fe38f6e3",
      "bytes": 12922,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "test/v12-release-review.test.mjs"
    },
    {
      "sourceId": "context.release-review-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:9daa5bc7fde24a8d70d7e68cb8faed7327f9ae4f0b3ed180f00cb8facb48d9ae",
      "bytes": 11990,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.retired-candidate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-10-retirement.md",
      "digest": "sha256:3e9cd206b82b5670ec1f454e0fbb1ea352f7d8a78666b1ac8abf0a1a4cb0e2a4",
      "bytes": 2543,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-10-retirement.md"
    },
    {
      "sourceId": "context.retired-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f4f91a373dd7f8028ec5d592e89c75f0027245c3/canonical-gate-receipt.json",
      "digest": "sha256:9d07c1eaa9bf0a22cfbc5c0d33e6fd60cf340a84d7da238d7cb9b21df8f8c65a",
      "bytes": 2295,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f4f91a373dd7f8028ec5d592e89c75f0027245c3/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.revision-seventeen-audit",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/independent-architecture-audit.md",
      "digest": "sha256:82725d4372ca647223a6163bf71bab638d9543b90fcab53c68e5009ab342ea49",
      "bytes": 2096,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/independent-architecture-audit.md"
    },
    {
      "sourceId": "context.revision-seventeen-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoffs/agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05-redesign-attempt-1.json",
      "digest": "sha256:79227fedf63534c9a71eabd6679c0b08fdcdb6bc94a49965d76c60975a996cb5",
      "bytes": 3206,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoffs/agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05-redesign-attempt-1.json"
    },
    {
      "sourceId": "context.revision-seventeen-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/package-envelope.json",
      "digest": "sha256:cc6b9500228bd532e3f8558a607cc911b97ecb4d823d27579f039303b125bebf",
      "bytes": 101579,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/package-envelope.json"
    },
    {
      "sourceId": "context.revision-seventeen-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoff-verification.json",
      "digest": "sha256:ae5e7dc88346662c2c028064e83190ffe4d2fa3c23f61b69837c65b7d222eece",
      "bytes": 1361,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoff-verification.json"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/specialist-run-contract.md"
    },
    {
      "sourceId": "context.schema-runtime",
      "kind": "repository",
      "locator": "path:src/schema.ts",
      "digest": "sha256:ca9fa3d90ba27bea2de8f095b083a8d729bbed93a64aa14988c47c4c20ca6c63",
      "bytes": 6873,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "src/schema.ts"
    },
    {
      "sourceId": "context.security-finding",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/handoffs/agent.1e522d86b809d360e459b4afd630c2311033a972b455c615c7eca8bf09b3942d.json",
      "digest": "sha256:37689ff82d725692c6dfb843cead2bec81e22c074d4e784e635d19d00557dc7f",
      "bytes": 6572,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/handoffs/agent.1e522d86b809d360e459b4afd630c2311033a972b455c615c7eca8bf09b3942d.json"
    },
    {
      "sourceId": "context.specialist-entrypoint",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f",
      "bytes": 5447,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/test-plan.md",
      "digest": "sha256:cae44118e1155805e2b2ea54eeba9537ee45cb2ed8d51f4489455bb0c68a4c3e",
      "bytes": 3421,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/test-plan.md"
    },
    {
      "sourceId": "context.typescript",
      "kind": "repository",
      "locator": "path:tsconfig.json",
      "digest": "sha256:962f5730cee225eec5a5c731835eca40fe39034d2ba253bb8ddc7237c0b04cc6",
      "bytes": 689,
      "purposes": [
        "Implement and verify the Revision 18 parent-bootstrap trust boundary from frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.parent-bootstrap-trust.r18"
      ],
      "readScope": "tsconfig.json"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.release-evidence-trust"
    ],
    "scope": {
      "read": [
        ".gitignore",
        "AGENTS.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoffs/agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05-redesign-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/independent-architecture-audit.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/offline-cache-probe.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-10-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f4f91a373dd7f8028ec5d592e89c75f0027245c3/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/handoffs/agent.1e522d86b809d360e459b4afd630c2311033a972b455c615c7eca8bf09b3942d.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "package-lock.json",
        "package.json",
        "scripts/run-v12-release-gate.mjs",
        "src/index.ts",
        "src/schema.ts",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs",
        "tsconfig.json"
      ],
      "write": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-review.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "conflictZones": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-review.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".gitignore",
          "AGENTS.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoffs/agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05-redesign-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/independent-architecture-audit.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/offline-cache-probe.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-10-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f4f91a373dd7f8028ec5d592e89c75f0027245c3/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/handoffs/agent.1e522d86b809d360e459b4afd630c2311033a972b455c615c7eca8bf09b3942d.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "package-lock.json",
          "package.json",
          "scripts/run-v12-release-gate.mjs",
          "src/index.ts",
          "src/schema.ts",
          "test/v12-release-gate.test.mjs",
          "test/v12-release-review.test.mjs",
          "tsconfig.json"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "package.json",
          "scripts/run-v12-release-review.mjs",
          "test/v12-release-gate.test.mjs",
          "test/v12-release-review.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "git",
          "node",
          "npm",
          "powershell"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not edit outside declared write scope, modify immutable evidence, change core compiler or schema behavior, change dependencies or lockfile, change Git state, use network access, run lifecycle scripts, launch descendants, run a candidate gate, prepare R2 against a release candidate, claim release readiness, or merge."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.parent-bootstrap-trust.r18",
      "criterion": "Every R2 semantic output is attributable to one parent-verified exact candidate runtime, protected closures remain unchanged, and no evidence reaches the live repository before successful cleanup and promotion checks.",
      "requirementId": "evidence.fix.parent-bootstrap-trust.r18",
      "kind": "test",
      "duty": "produce",
      "description": "Provide exact changed-file, bootstrap identity, offline-lock, runtime-binding, fresh-child, mutation, staging, cleanup, focused-test, full-check, and diff evidence.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "parent-bootstrap-trust-correction-r18.md"
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
    "Do not claim hostile-process isolation, release readiness, hosted CI, merge, memory closeout, or external-host effects.",
    "Edit only declared files and preserve every immutable candidate and correction artifact.",
    "Fail closed if materialization, lock integrity, dependency isolation, runtime identity, staging, post-run verification, or cleanup cannot be proven.",
    "Return only the exact closed SpecialistAgentHandoff JSON object from the generated contract.",
    "Run every frozen check and report failures truthfully.",
    "Stop before editing if any declared context byte count or SHA-256 binding fails.",
    "The parent must never import candidate runtime modules or execute a live candidate worker.",
    "The release phase must never enable network access or run package lifecycle hooks."
  ],
  "contentDigest": "sha256:afed29d3600ff495c391ef3753a01e07a39d6c006ccd2a84bd515c3d59dc4f81"
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
    "id": "v12.ide-run-loop.implementation.release-correction",
    "revision": 18,
    "digest": "sha256:d61decb70b1196e1310d18d1e0d930456b6f001b34ae8c8316f50c2a67024dd4"
  },
  "agent": {
    "id": "agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264",
    "blueprintDigest": "sha256:afed29d3600ff495c391ef3753a01e07a39d6c006ccd2a84bd515c3d59dc4f81"
  },
  "compilationDigest": "sha256:bc3ae4a8e7acbb24f2eb3d628413390c4e9b71da0b3e8030e8117a7935af4755",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.parent-bootstrap-trust.r18"
  ],
  "artifacts": [
    {
      "name": "parent-bootstrap-trust-correction-r18.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.parent-bootstrap-trust.r18",
      "requirementId": "evidence.fix.parent-bootstrap-trust.r18",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "parent-bootstrap-trust-correction-r18.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
