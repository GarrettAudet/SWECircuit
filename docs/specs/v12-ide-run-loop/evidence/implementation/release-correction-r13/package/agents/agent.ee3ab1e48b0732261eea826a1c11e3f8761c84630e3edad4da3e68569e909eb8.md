# Specialist Contract: agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8

Compilation: `sha256:812c86d0f802dc5c0fe4c36a94e699a52dc2333a47780516c6e898bb89da6555`
Blueprint: `sha256:58733521eaec83ddf85b0f51b6c76b0e53c8b09eecfb0217ae445ca5804eb818`

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
  "id": "agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 13,
  "goalDigest": "sha256:96b6eaddcdd6242b9860f444ff6fb33e64919c8c9962e1ce584b815ba4a0dcf2",
  "candidateId": "team.a9a7a3c8007571debb74d715b6b76eeb75a15bbc37e876bf4bbeb0811993b344",
  "workUnitIds": [
    "fix.candidate-toolchain-supply.r13"
  ],
  "objectives": [
    {
      "workUnitId": "fix.candidate-toolchain-supply.r13",
      "objective": "Supply and consume one validated external TypeScript entrypoint for clean exact-candidate installed-consumer verification."
    }
  ],
  "modules": [
    {
      "id": "correction.candidate-toolchain-supply",
      "action": "Add a closed host TypeScript entrypoint supply, validate it as an absolute plain regular file outside the candidate when host-supplied, preserve the local default, and cover the exact canonical path.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "CandidateConsumerMissingHostToolchain"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "ExternallySuppliedCandidateConsumerToolchain"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.candidate-six-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7/canonical-gate-receipt.json",
      "digest": "sha256:2df9659f79756dfe26f659abaaabcdb31150d9275eebdac01bef55b369f85d9c",
      "bytes": 2295,
      "purposes": [
        "Implement and verify fix.candidate-toolchain-supply.r13 against the frozen Candidate 6 evidence and source."
      ],
      "workUnitIds": [
        "fix.candidate-toolchain-supply.r13"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.candidate-six-retirement",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-6-retirement.md",
      "digest": "sha256:5a6d3e8262856b5a0c3a4a78dd6ef42a8a0b77cee82db740c983add352a9498a",
      "bytes": 1292,
      "purposes": [
        "Implement and verify fix.candidate-toolchain-supply.r13 against the frozen Candidate 6 evidence and source."
      ],
      "workUnitIds": [
        "fix.candidate-toolchain-supply.r13"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-6-retirement.md"
    },
    {
      "sourceId": "context.candidate-six-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7/canonical-gate.stderr.log",
      "digest": "sha256:4cfd6815e2a9db4b05b103c8d3bcfcfbbce07ac56dfc167895307e96b0bb3262",
      "bytes": 27686,
      "purposes": [
        "Implement and verify fix.candidate-toolchain-supply.r13 against the frozen Candidate 6 evidence and source."
      ],
      "workUnitIds": [
        "fix.candidate-toolchain-supply.r13"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7/canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.consumer-check",
      "kind": "repository",
      "locator": "path:scripts/check-packed-consumer.mjs",
      "digest": "sha256:cf8010b081be0c1b64ffac4bce8de6219076fb011fdf5928106fa0c12bcd525a",
      "bytes": 44049,
      "purposes": [
        "Implement and verify fix.candidate-toolchain-supply.r13 against the frozen Candidate 6 evidence and source."
      ],
      "workUnitIds": [
        "fix.candidate-toolchain-supply.r13"
      ],
      "readScope": "scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/inputs/correction-contract.md",
      "digest": "sha256:90edff1aa01e209ce5011f9397cb45ec2def3b7ef8b22e925f5b996307ca8e5e",
      "bytes": 1861,
      "purposes": [
        "Implement and verify fix.candidate-toolchain-supply.r13 against the frozen Candidate 6 evidence and source."
      ],
      "workUnitIds": [
        "fix.candidate-toolchain-supply.r13"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.npmrc",
      "kind": "repository",
      "locator": "path:.npmrc",
      "digest": "sha256:37fc8961e7e93e7c88c1c82e9176611208af2cbee71ff0023bbf809df0d7f5ee",
      "bytes": 23,
      "purposes": [
        "Implement and verify fix.candidate-toolchain-supply.r13 against the frozen Candidate 6 evidence and source."
      ],
      "workUnitIds": [
        "fix.candidate-toolchain-supply.r13"
      ],
      "readScope": ".npmrc"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:63534d6bbc8b840de35cda3ad75f01f2da69f3798fdd85b9352506d13dba9368",
      "bytes": 2931,
      "purposes": [
        "Implement and verify fix.candidate-toolchain-supply.r13 against the frozen Candidate 6 evidence and source."
      ],
      "workUnitIds": [
        "fix.candidate-toolchain-supply.r13"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:5f69e29be75ad68b16a249b9bf58b3800c867a254d618aa6156151d2b84001d7",
      "bytes": 29597,
      "purposes": [
        "Implement and verify fix.candidate-toolchain-supply.r13 against the frozen Candidate 6 evidence and source."
      ],
      "workUnitIds": [
        "fix.candidate-toolchain-supply.r13"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-gate.test.mjs",
      "digest": "sha256:a41a4ceca55c78de46557e4248e1b066849c94c7caf9e33a62b2fd4f78a69314",
      "bytes": 11488,
      "purposes": [
        "Implement and verify fix.candidate-toolchain-supply.r13 against the frozen Candidate 6 evidence and source."
      ],
      "workUnitIds": [
        "fix.candidate-toolchain-supply.r13"
      ],
      "readScope": "test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/inputs/test-plan.md",
      "digest": "sha256:bef21b15ae2999faa5209421c4556e1e2e34e180796c50f39476d5883deeb16f",
      "bytes": 957,
      "purposes": [
        "Implement and verify fix.candidate-toolchain-supply.r13 against the frozen Candidate 6 evidence and source."
      ],
      "workUnitIds": [
        "fix.candidate-toolchain-supply.r13"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/inputs/test-plan.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.candidate-toolchain-supply"
    ],
    "scope": {
      "read": [
        ".npmrc",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-6-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7/canonical-gate.stderr.log",
        "package.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/run-v12-release-gate.mjs",
        "test/v12-release-gate.test.mjs"
      ],
      "write": [
        "scripts/check-packed-consumer.mjs",
        "scripts/run-v12-release-gate.mjs",
        "test/v12-release-gate.test.mjs"
      ],
      "conflictZones": [
        "scripts/check-packed-consumer.mjs",
        "scripts/run-v12-release-gate.mjs",
        "test/v12-release-gate.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".npmrc",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-6-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7/canonical-gate.stderr.log",
          "package.json",
          "scripts/check-packed-consumer.mjs",
          "scripts/run-v12-release-gate.mjs",
          "test/v12-release-gate.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "scripts/check-packed-consumer.mjs",
          "scripts/run-v12-release-gate.mjs",
          "test/v12-release-gate.test.mjs"
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
      "Do not use network access, change Git state, launch other agents, write outside the exact scope, create candidate-local dependency trees, weaken exact materialization inspection, or regenerate V11 trust evidence."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.candidate-toolchain-supply.r13",
      "criterion": "The canonical candidate child consumes a validated host-owned TypeScript entrypoint outside the materialization, while ordinary local consumer verification retains a safe repository-local default.",
      "requirementId": "evidence.candidate-toolchain-supply.r13",
      "kind": "review",
      "duty": "produce",
      "description": "Prove closed host supply, regular-file validation, outside-candidate containment, consumer usage, focused regressions, local consumer compatibility, and unchanged exact-source inspection.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "candidate-toolchain-supply-r13.md"
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
    "Do not use network access, change Git state, launch agents, weaken exact inspection, or regenerate V11 evidence.",
    "If native apply_patch fails before mutation, use only an exact precondition-hash-guarded write and verify resulting bytes immediately.",
    "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Run every focused command in the test plan and report failures truthfully.",
    "Stop if any declared source fails its exact raw digest and byte binding.",
    "Write only the declared scope and do not create or link node_modules inside candidate source."
  ],
  "contentDigest": "sha256:58733521eaec83ddf85b0f51b6c76b0e53c8b09eecfb0217ae445ca5804eb818"
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
    "revision": 13,
    "digest": "sha256:96b6eaddcdd6242b9860f444ff6fb33e64919c8c9962e1ce584b815ba4a0dcf2"
  },
  "agent": {
    "id": "agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8",
    "blueprintDigest": "sha256:58733521eaec83ddf85b0f51b6c76b0e53c8b09eecfb0217ae445ca5804eb818"
  },
  "compilationDigest": "sha256:812c86d0f802dc5c0fe4c36a94e699a52dc2333a47780516c6e898bb89da6555",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.candidate-toolchain-supply.r13"
  ],
  "artifacts": [
    {
      "name": "candidate-toolchain-supply-r13.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.candidate-toolchain-supply.r13",
      "requirementId": "evidence.candidate-toolchain-supply.r13",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "candidate-toolchain-supply-r13.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
