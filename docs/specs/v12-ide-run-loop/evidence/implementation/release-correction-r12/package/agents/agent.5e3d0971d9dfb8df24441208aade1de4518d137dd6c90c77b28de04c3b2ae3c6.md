# Specialist Contract: agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6

Compilation: `sha256:a22663c51b5477531f8dc8a08e17841cf52d7aa837507cc672dcae5f1ca8eb48`
Blueprint: `sha256:fc9e263283ea524dbe0f33cbca2e9b45ab0c29d734b980d91537fa10280535c5`

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
  "id": "agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 12,
  "goalDigest": "sha256:b697a255fbf77554e41847f958d401aa23ca5bb4035c0c4ee1e4c19a8f8ed822",
  "candidateId": "team.7fc42093732183df6e09291e3ab97e5296ece22fcc2cb10717a261ae95bd2c84",
  "workUnitIds": [
    "fix.candidate-runtime-purity.r12"
  ],
  "objectives": [
    {
      "workUnitId": "fix.candidate-runtime-purity.r12",
      "objective": "Keep npm and test runtime state outside the exact candidate source tree while preserving strict before/after materialization identity."
    }
  ],
  "modules": [
    {
      "id": "correction.candidate-runtime-purity",
      "action": "Supply a host-owned npm cache outside the materialization, make pack and consumer checks honor that supply, close test-owned temporary parents with bounded non-recursive cleanup, preserve unrelated state, and retain strict exact-tree inspection.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "CandidateVerificationWithRepositoryLocalRuntimeState"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "SourcePureCandidateVerification"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.candidate-five-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate-receipt.json",
      "digest": "sha256:04e345f11a8438a39c90cc1b321310dee788540b593f67745680489e54a82888",
      "bytes": 2297,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.candidate-five-retirement",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-5-retirement.md",
      "digest": "sha256:8fd8c152ae3ccc095b1b536ffa95fc3fc6b0b7ca089fdeff35e68036d7660ad6",
      "bytes": 1424,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-5-retirement.md"
    },
    {
      "sourceId": "context.candidate-five-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate.stderr.log",
      "digest": "sha256:35285e52d38e282e91a03bce89c2f2600aac1d42279310d9f32dfdf56ee4a646",
      "bytes": 21096,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.candidate-five-stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate.stdout.log",
      "digest": "sha256:a5e46b32ca009e6ace6bd121d386853b26308d27d102130232e8fe0f1d9b78a4",
      "bytes": 31849,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.consumer-check",
      "kind": "repository",
      "locator": "path:scripts/check-packed-consumer.mjs",
      "digest": "sha256:b99cce47eb9bcefeeca142c30451f8c1f1332c90d57072f4137f957fdf7246fe",
      "bytes": 43243,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.first-run-tests",
      "kind": "repository",
      "locator": "path:test/specialist-first-run.test.mjs",
      "digest": "sha256:6c06d25ad585b25b1305b8a06501df18c9c861b363a9481dcd0ef4b4a0f61ac0",
      "bytes": 8553,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "test/specialist-first-run.test.mjs"
    },
    {
      "sourceId": "context.npmrc",
      "kind": "repository",
      "locator": "path:.npmrc",
      "digest": "sha256:37fc8961e7e93e7c88c1c82e9176611208af2cbee71ff0023bbf809df0d7f5ee",
      "bytes": 23,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": ".npmrc"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:43414ace7e294a9a173ee78ab33baa5791959921f5da2a1c7b3b69d081938df2",
      "bytes": 2946,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.previous-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json",
      "digest": "sha256:e1d5c5e192499f1084752f5cff60ba846394899b2d637cc7dc7f53d087b88c08",
      "bytes": 642,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json"
    },
    {
      "sourceId": "context.previous-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json",
      "digest": "sha256:2a5c2b5cfff8a90d78fd61deb291652303f4347254279ff3c7bae5a104694283",
      "bytes": 5373,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json"
    },
    {
      "sourceId": "context.previous-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json",
      "digest": "sha256:78d34233ec98a9c685ee9bb0c6b582c0b3be77b25c4deec86a279ed682a29c42",
      "bytes": 108566,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json"
    },
    {
      "sourceId": "context.previous-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json",
      "digest": "sha256:c4da5dc7899ecca6dc57ad8f210b3e947e4bde8afb293dd3ce80cd761946a6e3",
      "bytes": 1327,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:271d7d03749b1eb28b9734545ddb957ae4bf551e0319226cc0282f908fbefc96",
      "bytes": 26471,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-gate.test.mjs",
      "digest": "sha256:36f2692c2e1244ecb2611760787b7a8544788913b1b55faa2b2c0778b2ff3284",
      "bytes": 8328,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/test-plan.md",
      "digest": "sha256:b944d08d612a50189717c86b6eaa8c4081fb66074481ecd7fd55b8c4f50f6e78",
      "bytes": 4401,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/test-plan.md"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/spec.md",
      "digest": "sha256:2600336d501006cf355953122067992de3ab452c43164fcd8154b56dd1efdb1a",
      "bytes": 5626,
      "purposes": [
        "Implement and verify fix.candidate-runtime-purity.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.candidate-runtime-purity.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.candidate-runtime-purity"
    ],
    "scope": {
      "read": [
        ".npmrc",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-5-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate.stdout.log",
        "package.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/run-v12-release-gate.mjs",
        "test/specialist-first-run.test.mjs",
        "test/v12-release-gate.test.mjs"
      ],
      "write": [
        "package.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/run-v12-release-gate.mjs",
        "test/specialist-first-run.test.mjs",
        "test/v12-release-gate.test.mjs"
      ],
      "conflictZones": [
        "package.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/run-v12-release-gate.mjs",
        "test/specialist-first-run.test.mjs",
        "test/v12-release-gate.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".npmrc",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-5-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate.stdout.log",
          "package.json",
          "scripts/check-packed-consumer.mjs",
          "scripts/run-v12-release-gate.mjs",
          "test/specialist-first-run.test.mjs",
          "test/v12-release-gate.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "package.json",
          "scripts/check-packed-consumer.mjs",
          "scripts/run-v12-release-gate.mjs",
          "test/specialist-first-run.test.mjs",
          "test/v12-release-gate.test.mjs"
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
      "Do not use network access, change Git state, launch other agents, write outside the exact scope, weaken exact materialization inspection, or claim that SWECircuit core performs host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.candidate-runtime-purity.r12",
      "criterion": "The complete canonical command uses external runtime cache supply and leaves the exact candidate materialization byte-identical with no undeclared paths.",
      "requirementId": "evidence.candidate-runtime-purity.r12",
      "kind": "review",
      "duty": "produce",
      "description": "Prove npm cache resolution is outside the materialization, test-owned temporary paths prune safely in every cleanup order, unrelated state is preserved, exact inspection remains strict, and focused verification passes.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "candidate-runtime-purity-r12.md"
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
    "If native apply_patch fails before mutation, use only an exact precondition-hash-guarded write and verify resulting bytes immediately.",
    "Never recursively delete shared .local or cache state; cleanup must be owned, bounded, and sentinel-preserving.",
    "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Run focused local verification and report every failing command truthfully.",
    "Stop if any declared source fails its exact raw digest and byte binding.",
    "Write only the declared scope; do not change Git state, use network access, or weaken post-command exact-tree inspection."
  ],
  "contentDigest": "sha256:fc9e263283ea524dbe0f33cbca2e9b45ab0c29d734b980d91537fa10280535c5"
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
    "revision": 12,
    "digest": "sha256:b697a255fbf77554e41847f958d401aa23ca5bb4035c0c4ee1e4c19a8f8ed822"
  },
  "agent": {
    "id": "agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6",
    "blueprintDigest": "sha256:fc9e263283ea524dbe0f33cbca2e9b45ab0c29d734b980d91537fa10280535c5"
  },
  "compilationDigest": "sha256:a22663c51b5477531f8dc8a08e17841cf52d7aa837507cc672dcae5f1ca8eb48",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.candidate-runtime-purity.r12"
  ],
  "artifacts": [
    {
      "name": "candidate-runtime-purity-r12.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.candidate-runtime-purity.r12",
      "requirementId": "evidence.candidate-runtime-purity.r12",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "candidate-runtime-purity-r12.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
