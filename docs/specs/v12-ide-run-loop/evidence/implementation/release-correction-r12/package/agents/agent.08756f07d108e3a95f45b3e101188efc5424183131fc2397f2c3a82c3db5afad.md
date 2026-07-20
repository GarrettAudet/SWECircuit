# Specialist Contract: agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad

Compilation: `sha256:a22663c51b5477531f8dc8a08e17841cf52d7aa837507cc672dcae5f1ca8eb48`
Blueprint: `sha256:aef70ab0ebb59ee457af0e09473be4d859a0db512f6f5da64f0f0ff5cb4d7f67`

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
  "id": "agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 12,
  "goalDigest": "sha256:b697a255fbf77554e41847f958d401aa23ca5bb4035c0c4ee1e4c19a8f8ed822",
  "candidateId": "team.7fc42093732183df6e09291e3ab97e5296ece22fcc2cb10717a261ae95bd2c84",
  "workUnitIds": [
    "fix.v11-source-byte-portability.r12"
  ],
  "objectives": [
    {
      "workUnitId": "fix.v11-source-byte-portability.r12",
      "objective": "Make V11 context identity exactly equal to committed Git bytes on every supported checkout and provide focused whole-context regressions."
    }
  ],
  "modules": [
    {
      "id": "correction.v11-source-byte-portability",
      "action": "Remove checkout-only CRLF identity, require LF clean-filter invariance with no unsupported transforms, bind .gitattributes as causal context, normalize the two PowerShell worktree sources, and add focused regressions over every active V11 source.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "CheckoutDependentV11EvidenceBindings"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "CommittedByteStableV11EvidenceBindings"
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
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
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
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
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
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
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
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/62e51278904b3036971f6fcd40577313f1168e2a/canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.gitattributes",
      "kind": "repository",
      "locator": "path:.gitattributes",
      "digest": "sha256:33be9cf5ffcd64e0027b3e11e453d4ae9ec527c665c39afeaf30c3058b7bef37",
      "bytes": 521,
      "purposes": [
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
      ],
      "readScope": ".gitattributes"
    },
    {
      "sourceId": "context.previous-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json",
      "digest": "sha256:e1d5c5e192499f1084752f5cff60ba846394899b2d637cc7dc7f53d087b88c08",
      "bytes": 642,
      "purposes": [
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
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
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
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
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
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
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.template-checker",
      "kind": "repository",
      "locator": "path:scripts/check-template.ps1",
      "digest": "sha256:f0d14d1cf7d61f338c588d57b28415cbd045b05ac7b81fa80432373fa1bbf81e",
      "bytes": 80766,
      "purposes": [
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
      ],
      "readScope": "scripts/check-template.ps1"
    },
    {
      "sourceId": "context.template-checker-tests",
      "kind": "repository",
      "locator": "path:scripts/test-check-template.ps1",
      "digest": "sha256:1cec6a958b7eb40f1a8a60d3dc81f6c4b464c68c310e815c9339857dcca767f6",
      "bytes": 102789,
      "purposes": [
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
      ],
      "readScope": "scripts/test-check-template.ps1"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/test-plan.md",
      "digest": "sha256:b944d08d612a50189717c86b6eaa8c4081fb66074481ecd7fd55b8c4f50f6e78",
      "bytes": 4401,
      "purposes": [
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/test-plan.md"
    },
    {
      "sourceId": "context.v11-goal",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json",
      "digest": "sha256:46d9e871b8eb3656d285f50ac3e9f46e9cb2311bce321ba7a63dc3254382a6f9",
      "bytes": 101231,
      "purposes": [
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json"
    },
    {
      "sourceId": "context.v11-runner",
      "kind": "repository",
      "locator": "path:scripts/run-v11-dogfood.mjs",
      "digest": "sha256:7531f31271b4992de449af47d15b5c250fac47836abca6c2db665a6771875eda",
      "bytes": 58524,
      "purposes": [
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
      ],
      "readScope": "scripts/run-v11-dogfood.mjs"
    },
    {
      "sourceId": "context.v11-runner-tests",
      "kind": "repository",
      "locator": "path:test/v11-dogfood-runner.test.mjs",
      "digest": "sha256:bbb524e5d5b07357b232cde1f5cca10c7c83924280c1da5c6e338b16e40f4f5d",
      "bytes": 41879,
      "purposes": [
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
      ],
      "readScope": "test/v11-dogfood-runner.test.mjs"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/spec.md",
      "digest": "sha256:2600336d501006cf355953122067992de3ab452c43164fcd8154b56dd1efdb1a",
      "bytes": 5626,
      "purposes": [
        "Implement and verify fix.v11-source-byte-portability.r12 against the exact frozen source and failure evidence."
      ],
      "workUnitIds": [
        "fix.v11-source-byte-portability.r12"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.v11-source-byte-portability"
    ],
    "scope": {
      "read": [
        ".gitattributes",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json",
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
        "scripts/check-template.ps1",
        "scripts/run-v11-dogfood.mjs",
        "scripts/test-check-template.ps1",
        "test/v11-dogfood-runner.test.mjs"
      ],
      "write": [
        ".gitattributes",
        "scripts/check-template.ps1",
        "scripts/run-v11-dogfood.mjs",
        "scripts/test-check-template.ps1",
        "test/v11-dogfood-runner.test.mjs"
      ],
      "conflictZones": [
        ".gitattributes",
        "scripts/check-template.ps1",
        "scripts/run-v11-dogfood.mjs",
        "scripts/test-check-template.ps1",
        "test/v11-dogfood-runner.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".gitattributes",
          "docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json",
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
          "scripts/check-template.ps1",
          "scripts/run-v11-dogfood.mjs",
          "scripts/test-check-template.ps1",
          "test/v11-dogfood-runner.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          ".gitattributes",
          "scripts/check-template.ps1",
          "scripts/run-v11-dogfood.mjs",
          "scripts/test-check-template.ps1",
          "test/v11-dogfood-runner.test.mjs"
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
      "criterionId": "criterion.fix.v11-source-byte-portability.r12",
      "criterion": "Every active V11 context binding has one checkout-independent identity equal to the exact committed source bytes.",
      "requirementId": "evidence.v11-source-byte-portability.r12",
      "kind": "review",
      "duty": "produce",
      "description": "Prove LF and clean-filter stability, reject CRLF or other transforms, bind the attribute policy, cover all active V11 sources, and pass focused V11 verification without changing V12 core behavior.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "v11-source-byte-portability-r12.md"
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
    "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Run focused local verification and report every failing command truthfully.",
    "Stop if any declared source fails its exact raw digest and byte binding.",
    "Write only the declared scope; do not change Git state, use network access, or regenerate V11 approval/audit evidence."
  ],
  "contentDigest": "sha256:aef70ab0ebb59ee457af0e09473be4d859a0db512f6f5da64f0f0ff5cb4d7f67"
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
    "id": "agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad",
    "blueprintDigest": "sha256:aef70ab0ebb59ee457af0e09473be4d859a0db512f6f5da64f0f0ff5cb4d7f67"
  },
  "compilationDigest": "sha256:a22663c51b5477531f8dc8a08e17841cf52d7aa837507cc672dcae5f1ca8eb48",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.v11-source-byte-portability.r12"
  ],
  "artifacts": [
    {
      "name": "v11-source-byte-portability-r12.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.v11-source-byte-portability.r12",
      "requirementId": "evidence.v11-source-byte-portability.r12",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "v11-source-byte-portability-r12.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
