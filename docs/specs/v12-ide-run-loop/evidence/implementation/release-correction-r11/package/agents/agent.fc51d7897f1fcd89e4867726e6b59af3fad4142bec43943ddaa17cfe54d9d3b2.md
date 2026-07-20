# Specialist Contract: agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2

Compilation: `sha256:f934262e856c37e1167698f07a48f38ae73427b38f6dacdeabddfd0d9ece1825`
Blueprint: `sha256:70a4d7e671fb7891514ab15d4d118a9ad8c7253fe5851933837264a6d8a9560d`

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
  "id": "agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 11,
  "goalDigest": "sha256:08dfc0dd162b0b53ec73e8b3f4476aae3fd2f7b91b87037a968bcd80e633f201",
  "candidateId": "team.2fe259534237f558121c468fc7eff6c6868efd02b04610276df9b1f7fc717528",
  "workUnitIds": [
    "fix.release-gate-git-context.r11"
  ],
  "objectives": [
    {
      "workUnitId": "fix.release-gate-git-context.r11",
      "objective": "Run the canonical suite from exact candidate bytes with an isolated disposable Git view, and capture its necessarily post-commit evidence into immutable R2 snapshots without weakening candidate-source provenance."
    }
  ],
  "modules": [
    {
      "id": "correction.release-gate-git-context",
      "action": "Construct and clean a candidate-bound temporary Git metadata/ref/index context backed by immutable object lookup, authenticate pre/post HEAD and source bytes, keep the live repository metadata outside the child command, classify gate receipt and logs as exact external evidence, snapshot them once into the candidate-addressed R2 root, bind them into compilation and approval, and add focused nested-materialization and substitution regressions.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "ExactCandidateWithoutGitContextAndSelfReferentialGateEvidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IsolatedGitAwareGateAndBoundExternalEvidence"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.candidate-four-gate-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate-receipt.json",
      "digest": "sha256:36dc7043e382f822b281c00a61f8b4f01fbc5a4823b46f56c4486668c7e6af51",
      "bytes": 1969,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.candidate-four-gate-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate.stderr.log",
      "digest": "sha256:8912ab560a432c5506e410ed9c211d08fea5e744173866fb45122cdaf8611788",
      "bytes": 19558,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.candidate-four-gate-stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate.stdout.log",
      "digest": "sha256:cb06d7e143573d3082acabeb8a37777761bdb9d29f624515da405200c6acba9c",
      "bytes": 37410,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.gitattributes",
      "kind": "repository",
      "locator": "path:.gitattributes",
      "digest": "sha256:33be9cf5ffcd64e0027b3e11e453d4ae9ec527c665c39afeaf30c3058b7bef37",
      "bytes": 521,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": ".gitattributes"
    },
    {
      "sourceId": "context.gitignore",
      "kind": "repository",
      "locator": "path:.gitignore",
      "digest": "sha256:790a8c26a42342f3b5143df2e56b9c43145c2faa5758f443b63cb52b85d9b8a8",
      "bytes": 732,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": ".gitignore"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:43414ace7e294a9a173ee78ab33baa5791959921f5da2a1c7b3b69d081938df2",
      "bytes": 2946,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-correction-r10-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json",
      "digest": "sha256:3c95e3f08bae727d0bf15066814a5a5a699b2dcd034c0b3acdf9b77174c95da9",
      "bytes": 642,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json"
    },
    {
      "sourceId": "context.release-correction-r10-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json",
      "digest": "sha256:3e58dddde82171b5090debc1ea76a29298fe7a7e0f9a27dd39fd1f826350e543",
      "bytes": 5595,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json"
    },
    {
      "sourceId": "context.release-correction-r10-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json",
      "digest": "sha256:32472ecbb21d7547b4f4cab342db1f015f06f819f085fb6ed4fee29aecafac8a",
      "bytes": 90511,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json"
    },
    {
      "sourceId": "context.release-correction-r10-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json",
      "digest": "sha256:26a3827014dbc45134557ab57c065ce784bff5f0ddaf883198baa2e02eb79ec8",
      "bytes": 1322,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:4358570c4375eb6ed5da902bd83220cfd042051cb96c4171734ea067dcfab4b6",
      "bytes": 20319,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-gate.test.mjs",
      "digest": "sha256:ff86bdfd6986498bd1944bdfedd15fd862beca1c90dd58c208b7ba0b2e92ff2a",
      "bytes": 6070,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.release-review-r2-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:8eed0f4b9f5e0a97e5816fb3e36eb671c2c88f07269d4baeed59dab6bc95345e",
      "bytes": 82656,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-r2-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:9daa5bc7fde24a8d70d7e68cb8faed7327f9ae4f0b3ed180f00cb8facb48d9ae",
      "bytes": 11990,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-review.test.mjs",
      "digest": "sha256:473646bfdbf8a84781cd9dd0bf95d3d05341117882721fb2a85b9b3330ad7dba",
      "bytes": 8390,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "test/v12-release-review.test.mjs"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/test-plan.md",
      "digest": "sha256:b6b1391cc790bec6718cd6d0da374ff2dd87e0feffd7e2e8fcd0dd36d136c5d4",
      "bytes": 3959,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/test-plan.md"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/spec.md",
      "digest": "sha256:8466f5f1b9d97f83cf2243d489c9a76acd2459489181d7042fe8d912dde8e73b",
      "bytes": 5563,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r11 contract."
      ],
      "workUnitIds": [
        "fix.release-gate-git-context.r11"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.release-gate-git-context"
    ],
    "scope": {
      "read": [
        ".gitattributes",
        ".gitignore",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-gate.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "write": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-gate.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "conflictZones": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-gate.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          ".gitattributes",
          ".gitignore",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/canonical-gate.stdout.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "package.json",
          "scripts/run-v12-release-gate.mjs",
          "test/v12-release-gate.test.mjs",
          "test/v12-release-review.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "scripts/run-v12-release-gate.mjs",
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
      "Do not use network access, change Git state, launch descendants, write outside the exact scope, or claim that core performs host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.release-gate-git-context.r11",
      "criterion": "Run the canonical suite from exact candidate bytes with an isolated disposable Git view, and capture its necessarily post-commit evidence into immutable R2 snapshots without weakening candidate-source provenance.",
      "requirementId": "evidence.release-gate-git-context.r11",
      "kind": "review",
      "duty": "produce",
      "description": "Prove Git-aware release tests pass inside exact blob materialization; the child Git directory, ref, and index are disposable and candidate-bound; nested materialization retains object access; candidate source and live repository state remain unchanged; temporary Git state is cleaned; only the three exact gate outputs are accepted as working-tree external evidence; R2 snapshots and package-binds their exact bytes; self-referential candidate-blob evidence is rejected; and focused syntax, format, lint, test, and diff checks pass.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "release-gate-git-context-correction-r11.md"
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
  "contentDigest": "sha256:70a4d7e671fb7891514ab15d4d118a9ad8c7253fe5851933837264a6d8a9560d"
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
    "revision": 11,
    "digest": "sha256:08dfc0dd162b0b53ec73e8b3f4476aae3fd2f7b91b87037a968bcd80e633f201"
  },
  "agent": {
    "id": "agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2",
    "blueprintDigest": "sha256:70a4d7e671fb7891514ab15d4d118a9ad8c7253fe5851933837264a6d8a9560d"
  },
  "compilationDigest": "sha256:f934262e856c37e1167698f07a48f38ae73427b38f6dacdeabddfd0d9ece1825",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.release-gate-git-context.r11"
  ],
  "artifacts": [
    {
      "name": "release-gate-git-context-correction-r11.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.release-gate-git-context.r11",
      "requirementId": "evidence.release-gate-git-context.r11",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "release-gate-git-context-correction-r11.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
