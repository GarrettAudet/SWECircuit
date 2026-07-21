# Specialist Contract: agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5

Compilation: `sha256:250a3faad6dfebe5baad3f541187cc7b30e4a3a11bf5638edb9a41a669fef861`
Blueprint: `sha256:4b963a6676895dad6a2c694ba4a3b3cf25c5c68de40cf53dc91c87db95b2e37b`

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
  "id": "agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 14,
  "goalDigest": "sha256:397b7e2763120543f705b12cf135db7ce69e200e62c35dc2a72762751bc6c896",
  "candidateId": "team.331249f9902b907d318bf45f1d009f87ccb824243cf715c437511bbdfc5cdaab",
  "workUnitIds": [
    "verify.candidate-isolation-test.r14"
  ],
  "objectives": [
    {
      "workUnitId": "verify.candidate-isolation-test.r14",
      "objective": "Independently verify the deterministic Candidate 7 isolation-test correction and its security properties."
    }
  ],
  "modules": [
    {
      "id": "verification.candidate-isolation-test",
      "action": "Authenticate the frozen failure and corrected source, inspect production and test call paths, run focused tests, and report whether the causal defect is closed without weakened containment.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "CandidateIsolationTestFailureAndCorrection"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "VerifiedIsolationTestCorrection"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.candidate-seven-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate-receipt.json",
      "digest": "sha256:8dfc1033ce467727e8603a11a417b57164f1569a463c2b12c7b1d1efe74de880",
      "bytes": 2294,
      "purposes": [
        "Independently verify the exact Candidate 7 failure and Revision 14 correction without editing source."
      ],
      "workUnitIds": [
        "verify.candidate-isolation-test.r14"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.candidate-seven-retirement",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-7-retirement.md",
      "digest": "sha256:4404bbabec3e13fa15a9469503e1a417710d1cf0b433ffded93fa0e2bf52e7c5",
      "bytes": 1924,
      "purposes": [
        "Independently verify the exact Candidate 7 failure and Revision 14 correction without editing source."
      ],
      "workUnitIds": [
        "verify.candidate-isolation-test.r14"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-7-retirement.md"
    },
    {
      "sourceId": "context.candidate-seven-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate.stderr.log",
      "digest": "sha256:f1c19d541b010155bd5ed0af4babbe81534106ea1cf3258c758efc36113c95d0",
      "bytes": 19354,
      "purposes": [
        "Independently verify the exact Candidate 7 failure and Revision 14 correction without editing source."
      ],
      "workUnitIds": [
        "verify.candidate-isolation-test.r14"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.candidate-seven-stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate.stdout.log",
      "digest": "sha256:13cc6b063a0d0283f5ece6053a822cf1af5cb9553b5c474e83e1126120ea2830",
      "bytes": 31949,
      "purposes": [
        "Independently verify the exact Candidate 7 failure and Revision 14 correction without editing source."
      ],
      "workUnitIds": [
        "verify.candidate-isolation-test.r14"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/inputs/correction-contract.md",
      "digest": "sha256:8623cbc29adbd4dc29ea373a4ab9f80cef45763d9117dd41d23fef11c0429477",
      "bytes": 1867,
      "purposes": [
        "Independently verify the exact Candidate 7 failure and Revision 14 correction without editing source."
      ],
      "workUnitIds": [
        "verify.candidate-isolation-test.r14"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:63534d6bbc8b840de35cda3ad75f01f2da69f3798fdd85b9352506d13dba9368",
      "bytes": 2931,
      "purposes": [
        "Independently verify the exact Candidate 7 failure and Revision 14 correction without editing source."
      ],
      "workUnitIds": [
        "verify.candidate-isolation-test.r14"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Independently verify the exact Candidate 7 failure and Revision 14 correction without editing source."
      ],
      "workUnitIds": [
        "verify.candidate-isolation-test.r14"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-gate.test.mjs",
      "digest": "sha256:681df384c0080e097426274fe66c6c5f440ed82601f0f55baa1cac84e23d0e64",
      "bytes": 16402,
      "purposes": [
        "Independently verify the exact Candidate 7 failure and Revision 14 correction without editing source."
      ],
      "workUnitIds": [
        "verify.candidate-isolation-test.r14"
      ],
      "readScope": "test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.revision-thirteen-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json",
      "digest": "sha256:b6a95ec5913a7b8a4a54946f3ffde43233de13109ae0ce89dafc74abfb27498b",
      "bytes": 1307,
      "purposes": [
        "Independently verify the exact Candidate 7 failure and Revision 14 correction without editing source."
      ],
      "workUnitIds": [
        "verify.candidate-isolation-test.r14"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/inputs/test-plan.md",
      "digest": "sha256:494a8c2515354d37db18d9f795d51daa625e99d1819bfe4f835f7d907caae837",
      "bytes": 1025,
      "purposes": [
        "Independently verify the exact Candidate 7 failure and Revision 14 correction without editing source."
      ],
      "workUnitIds": [
        "verify.candidate-isolation-test.r14"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/inputs/test-plan.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "verify.candidate-isolation-test"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-7-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate.stdout.log",
        "package.json",
        "scripts/run-v12-release-gate.mjs",
        "test/v12-release-gate.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-7-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/canonical-gate.stdout.log",
          "package.json",
          "scripts/run-v12-release-gate.mjs",
          "test/v12-release-gate.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "node",
          "npm"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not edit files, change Git state, use network access, launch descendants, create candidate-local dependencies, rerun Candidate 7, or claim release approval."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.verify.candidate-isolation-test.r14",
      "criterion": "The exact Candidate 7 failure is causally closed by a deterministic external test default while production host-supply enforcement remains unchanged and fail-closed.",
      "requirementId": "evidence.candidate-isolation-test.r14",
      "kind": "test",
      "duty": "produce",
      "description": "Prove exact failure correspondence, unchanged production invocation, shared path validation, focused regression success, immutable evidence, and no authority expansion.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "candidate-isolation-test-r14.md"
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
    "Do not edit source, write repository artifacts, alter Git state, use network access, launch descendants, or rerun Candidate 7.",
    "Return only the exact closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Run the focused commands in the frozen test plan and report every failure truthfully.",
    "Stop if any declared source fails its exact raw digest and byte binding."
  ],
  "contentDigest": "sha256:4b963a6676895dad6a2c694ba4a3b3cf25c5c68de40cf53dc91c87db95b2e37b"
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
    "revision": 14,
    "digest": "sha256:397b7e2763120543f705b12cf135db7ce69e200e62c35dc2a72762751bc6c896"
  },
  "agent": {
    "id": "agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5",
    "blueprintDigest": "sha256:4b963a6676895dad6a2c694ba4a3b3cf25c5c68de40cf53dc91c87db95b2e37b"
  },
  "compilationDigest": "sha256:250a3faad6dfebe5baad3f541187cc7b30e4a3a11bf5638edb9a41a669fef861",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "verify.candidate-isolation-test.r14"
  ],
  "artifacts": [
    {
      "name": "candidate-isolation-test-r14.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.verify.candidate-isolation-test.r14",
      "requirementId": "evidence.candidate-isolation-test.r14",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "candidate-isolation-test-r14.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
