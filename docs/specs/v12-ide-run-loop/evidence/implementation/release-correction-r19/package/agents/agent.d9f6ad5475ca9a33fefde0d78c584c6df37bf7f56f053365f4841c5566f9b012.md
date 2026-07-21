# Specialist Contract: agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012

Compilation: `sha256:f4834982911064d5a3c5f9fa1d2c350376da8bead9d7a036ec639a7b9a52beca`
Blueprint: `sha256:7bf0a41867de47422a1fa329d509abeda50a50955a5ecfb74aed92d496cde2f1`

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
  "id": "agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 19,
  "goalDigest": "sha256:fb4947a71f4969c3ec54e3c70d2764a93d68dfd5ed43013c3ba2cbff6f575385",
  "candidateId": "team.132d13c072f67aabdc5748a45f256ede1321b56a68a7e5ab311b0f814eba46cb",
  "workUnitIds": [
    "fix.closed-reconstruction-trust.r19"
  ],
  "objectives": [
    {
      "workUnitId": "fix.closed-reconstruction-trust.r19",
      "objective": "Implement and behaviorally verify cumulative private phase reconstruction, exact external inputs, closed pre-execution state, resolver confinement, owner-bound package equality, and receipt-last immutable promotion."
    }
  ],
  "modules": [
    {
      "id": "correction.closed-reconstruction-trust",
      "action": "Reconstruct every required phase from the exact candidate, reject undeclared state before execution, compare explicit owner identity, confine runtime supply, and commit only a preflighted immutable output set with a final receipt.",
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
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md",
      "digest": "sha256:d54ecc1b6e2f6b3079ea133a90066fa0a8b88e9f3a08c47924ec14eb1a3d55f1",
      "bytes": 8193,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.ignore-policy",
      "kind": "repository",
      "locator": "path:.gitignore",
      "digest": "sha256:790a8c26a42342f3b5143df2e56b9c43145c2faa5758f443b63cb52b85d9b8a8",
      "bytes": 732,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
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
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
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
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/offline-cache-probe.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:15124893f7d12f21b75681ef7b8744509860d3490c378014e9d5f63b0bb01d54",
      "bytes": 3609,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
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
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-gate.test.mjs",
      "digest": "sha256:28b65258b73bba0d4b993a428bdce94e1742df112925090e7571b955e1055fbb",
      "bytes": 30116,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.release-review-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:f3a2a70e92719f755c0a32a02768dba945ad305fb9d2eb079188e91c48cbdc2d",
      "bytes": 102835,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-parent",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-review.mjs",
      "digest": "sha256:3ab7470de94b63d0ae03dad8d36e290bdcf8eb29453afae84efde519b5f56cdb",
      "bytes": 53756,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "scripts/run-v12-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-review.test.mjs",
      "digest": "sha256:8e5676dadaa7bfe3715653a77629729c4e9cd3714dc04150782125bd8131faf2",
      "bytes": 19050,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "test/v12-release-review.test.mjs"
    },
    {
      "sourceId": "context.release-review-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:6274d4b324d367308517c0567dec1f9923d3fea8eadf30b9c9736f76e3ffd223",
      "bytes": 20182,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.revision-eighteen-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/attempt-history.md",
      "digest": "sha256:9bb63ed1c81b9fc0e08957bb1cc0fefd9ff0c2d850d62531d36a5c2bb91e6478",
      "bytes": 3479,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/attempt-history.md"
    },
    {
      "sourceId": "context.revision-eighteen-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-pass-attempt-3.json",
      "digest": "sha256:8e144e26c3d3fd1938ce8244665508e77ccc8477b9b1a8a94519e968d007d5d5",
      "bytes": 6562,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-pass-attempt-3.json"
    },
    {
      "sourceId": "context.revision-eighteen-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/package-envelope.json",
      "digest": "sha256:be7a2bc7b1563a55a856a55563692a78488cf89b6b662599f186cc3033e32db7",
      "bytes": 119495,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/package-envelope.json"
    },
    {
      "sourceId": "context.revision-eighteen-review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md",
      "digest": "sha256:565324d05ac9f85c671c7ae23f6b0a3f0df43bff7b4a6ceb6e42aae693976561",
      "bytes": 4428,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md"
    },
    {
      "sourceId": "context.revision-eighteen-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification.json",
      "digest": "sha256:5f4f55daf5bda31a2b66460c985d08ea4ca19d48bed4cf24bb82b38f30f71bf1",
      "bytes": 1322,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification.json"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
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
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "src/schema.ts"
    },
    {
      "sourceId": "context.specialist-entrypoint",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f",
      "bytes": 5447,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/test-plan.md",
      "digest": "sha256:1851e0c218d3b9aad90f587e58f5de709bcc9b62a1124cf7fb275383b1fc5d93",
      "bytes": 3953,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/test-plan.md"
    },
    {
      "sourceId": "context.typescript",
      "kind": "repository",
      "locator": "path:tsconfig.json",
      "digest": "sha256:962f5730cee225eec5a5c731835eca40fe39034d2ba253bb8ddc7237c0b04cc6",
      "bytes": 689,
      "purposes": [
        "Implement and verify the Revision 19 closed reconstruction trust correction from exact source and rejection evidence."
      ],
      "workUnitIds": [
        "fix.closed-reconstruction-trust.r19"
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
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-pass-attempt-3.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/offline-cache-probe.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "package-lock.json",
        "package.json",
        "scripts/run-v12-release-gate.mjs",
        "scripts/run-v12-release-review.mjs",
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
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-pass-attempt-3.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/inputs/offline-cache-probe.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "package-lock.json",
          "package.json",
          "scripts/run-v12-release-gate.mjs",
          "scripts/run-v12-release-review.mjs",
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
      "Do not edit outside declared write scope, mutate prior evidence, change compiler or schemas, change dependencies or lockfile, change Git state, use network access, run lifecycle scripts, launch descendants, run a candidate gate or R2 phase, refresh V11 approvals, claim release readiness, or merge."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.closed-reconstruction-trust.r19",
      "criterion": "Every phase is reconstructed from one exact candidate and explicit external inputs; undeclared private state cannot execute; owner and package identity are independently compared; receipt-less partial output is inert.",
      "requirementId": "evidence.fix.closed-reconstruction-trust.r19",
      "kind": "test",
      "duty": "produce",
      "description": "Provide exact changed-file, reconstruction, external-input, pre/post inventory, resolver, package equality, promotion failure/retry, focused-test, full-check, and residual-host evidence.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "closed-reconstruction-trust-correction-r19.md"
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
    "Approval and verification must match the explicit owner compilation/package pair and every reconstructed package file.",
    "Dependency fallback, linked promotion paths, conflicting output preflight, partial completion receipts, network access, and lifecycle hooks must fail closed.",
    "Do not claim parent self-authentication, hostile-process isolation, release readiness, hosted CI, merge, memory closeout, or external-host effects.",
    "Edit only declared files and preserve every immutable candidate and correction artifact.",
    "Generated runtime must not execute before post-install, post-build, and immediate pre-spawn closed-state verification.",
    "No live prior-phase run output may remain semantic input to compile, approve, or verify.",
    "Run every frozen check and return only the exact closed SpecialistAgentHandoff JSON object from the generated contract.",
    "Stop before editing if any declared context byte count or SHA-256 binding fails."
  ],
  "contentDigest": "sha256:7bf0a41867de47422a1fa329d509abeda50a50955a5ecfb74aed92d496cde2f1"
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
    "revision": 19,
    "digest": "sha256:fb4947a71f4969c3ec54e3c70d2764a93d68dfd5ed43013c3ba2cbff6f575385"
  },
  "agent": {
    "id": "agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012",
    "blueprintDigest": "sha256:7bf0a41867de47422a1fa329d509abeda50a50955a5ecfb74aed92d496cde2f1"
  },
  "compilationDigest": "sha256:f4834982911064d5a3c5f9fa1d2c350376da8bead9d7a036ec639a7b9a52beca",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.closed-reconstruction-trust.r19"
  ],
  "artifacts": [
    {
      "name": "closed-reconstruction-trust-correction-r19.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.closed-reconstruction-trust.r19",
      "requirementId": "evidence.fix.closed-reconstruction-trust.r19",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "closed-reconstruction-trust-correction-r19.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
