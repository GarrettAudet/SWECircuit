# Specialist Contract: agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05

Compilation: `sha256:472d6cfe1bef797bd17926d008f6a00b47f1640c5dcc37d0739c17113f710b5d`
Blueprint: `sha256:0807536309f43ba647b4511242b89c544c89e2b995ac046ff94ed786668043a3`

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
  "id": "agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 17,
  "goalDigest": "sha256:a77be22bde0d9bea66faf6c986162bd055d0a99529a9e3e895d7ee316e6275e3",
  "candidateId": "team.e7c885180b43fe0c4f2a26e7593309dc504f6cfd6155882e530d4b0ce26dc287",
  "workUnitIds": [
    "fix.candidate-runtime-trust.r17"
  ],
  "objectives": [
    {
      "workUnitId": "fix.candidate-runtime-trust.r17",
      "objective": "Implement and adversarially verify an authenticated exact-candidate runtime for every R2 compiler, package, and raw-handoff decision."
    }
  ],
  "modules": [
    {
      "id": "correction.candidate-runtime-trust",
      "action": "Authenticate the review bootstrap, materialize and bind candidate source and locked dependencies, build and bind generated modules, dynamically load only the private closure, and reconstruct the identity at every phase.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "UnboundReleaseReviewRuntime"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "CandidateBoundReleaseReviewRuntime"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/inputs/correction-contract.md",
      "digest": "sha256:be3992d29ca84154d7d49f5f0bbd8f4e33f3546a506d5bc306f2d65f0ee84147",
      "bytes": 3763,
      "purposes": [
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.ignore-policy",
      "kind": "repository",
      "locator": "path:.gitignore",
      "digest": "sha256:790a8c26a42342f3b5143df2e56b9c43145c2faa5758f443b63cb52b85d9b8a8",
      "bytes": 732,
      "purposes": [
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
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
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
      ],
      "readScope": "package-lock.json"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:63534d6bbc8b840de35cda3ad75f01f2da69f3798fdd85b9352506d13dba9368",
      "bytes": 2931,
      "purposes": [
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.predecessor-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json",
      "digest": "sha256:64e2b86a290900be5364f5ae060d78f9daee898b1e003a64b4a636531621212b",
      "bytes": 1497,
      "purposes": [
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json"
    },
    {
      "sourceId": "context.release-gate-harness",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
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
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
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
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
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
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
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
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
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
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
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
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f4f91a373dd7f8028ec5d592e89c75f0027245c3/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.retired-review-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/handoff-verification.json",
      "digest": "sha256:df68b1bbf19afd6aeeeea000daa0740565063a6a2092ee8e03a84c45890ba16b",
      "bytes": 2897,
      "purposes": [
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/handoff-verification.json"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
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
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
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
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
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
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/inputs/test-plan.md",
      "digest": "sha256:64275d9a8f9a09f51c84c5423ae29e143673257931fcd6c5d781db54fe106a98",
      "bytes": 2109,
      "purposes": [
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/inputs/test-plan.md"
    },
    {
      "sourceId": "context.typescript-config",
      "kind": "repository",
      "locator": "path:tsconfig.json",
      "digest": "sha256:962f5730cee225eec5a5c731835eca40fe39034d2ba253bb8ddc7237c0b04cc6",
      "bytes": 689,
      "purposes": [
        "Correct and verify the candidate-runtime trust defect within the frozen Revision 17 contract."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-trust.r17"
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
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-10-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f4f91a373dd7f8028ec5d592e89c75f0027245c3/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/handoff-verification.json",
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
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "conflictZones": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".gitignore",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-10-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f4f91a373dd7f8028ec5d592e89c75f0027245c3/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/handoff-verification.json",
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
      "Do not edit outside declared write scope, modify immutable evidence, alter core compiler or schema behavior, change package metadata, change Git state, use network access, launch descendants, run a candidate gate, prepare R2, claim release readiness, or merge."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.candidate-runtime-trust.r17",
      "criterion": "R2 prepare, compile, approve, and handoff verification execute no repository-live generated module and reconstruct one closed candidate-runtime identity before semantic decisions.",
      "requirementId": "evidence.fix.candidate-runtime-trust.r17",
      "kind": "test",
      "duty": "produce",
      "description": "Provide exact changed-file, trust-binding, mutation-test, focused-test, build, template-checker, formatter, linter, and diff evidence.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "candidate-runtime-trust-correction-r17.md"
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
    "Do not claim release readiness, hosted CI, merge, memory closeout, or external-host effects.",
    "Do not run candidate npm scripts or lifecycle hooks while constructing the review runtime.",
    "Edit only declared files and preserve every immutable candidate and correction artifact.",
    "Fail closed if exact source, dependency, generated closure, or cleanup safety cannot be established.",
    "Never import repository-live dist or resolve runtime dependencies outside the authenticated private supply.",
    "Return only the exact closed SpecialistAgentHandoff JSON object from the generated contract.",
    "Run every frozen focused check and report any failure truthfully.",
    "Stop before editing if any declared context byte count or SHA-256 binding fails."
  ],
  "contentDigest": "sha256:0807536309f43ba647b4511242b89c544c89e2b995ac046ff94ed786668043a3"
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
    "revision": 17,
    "digest": "sha256:a77be22bde0d9bea66faf6c986162bd055d0a99529a9e3e895d7ee316e6275e3"
  },
  "agent": {
    "id": "agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05",
    "blueprintDigest": "sha256:0807536309f43ba647b4511242b89c544c89e2b995ac046ff94ed786668043a3"
  },
  "compilationDigest": "sha256:472d6cfe1bef797bd17926d008f6a00b47f1640c5dcc37d0739c17113f710b5d",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.candidate-runtime-trust.r17"
  ],
  "artifacts": [
    {
      "name": "candidate-runtime-trust-correction-r17.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.candidate-runtime-trust.r17",
      "requirementId": "evidence.fix.candidate-runtime-trust.r17",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "candidate-runtime-trust-correction-r17.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
