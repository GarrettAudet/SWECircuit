# Specialist Contract: agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2

Compilation: `sha256:e8edeba54363eaabea98a63a6ec9ae61d6ac24888720fd5c146950d9a00f67c6`
Blueprint: `sha256:1f29f2aa9252db72a9134f5a6b406d11ab337147abb6ec2589168bcfde00ed94`

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
  "id": "agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2",
  "goalId": "v12.ide-run-loop.review.closed-reconstruction-trust",
  "goalRevision": 1,
  "goalDigest": "sha256:8e8e49498ad1ba790e4e6247dfa51897b95e2788e975499d598ccdd4324cb2c7",
  "candidateId": "team.2740834f65356592a6f179f3865a64f34d592cfc6fe0585476b26a979d01612d",
  "workUnitIds": [
    "review.closed-reconstruction-trust.r19"
  ],
  "objectives": [
    {
      "workUnitId": "review.closed-reconstruction-trust.r19",
      "objective": "Authenticate and independently audit the exact Revision 19 implementation, resolving all seven Revision 18 findings and searching for new trust-boundary defects."
    }
  ],
  "modules": [
    {
      "id": "review.closed-reconstruction-trust",
      "action": "Trace every external input, private phase, process boundary, package identity, promotion path, trust claim, and adversarial test before returning an independent verdict.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "PackageVerifiedRevision19Implementation"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision19SecurityVerdict"
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
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:15124893f7d12f21b75681ef7b8744509860d3490c378014e9d5f63b0bb01d54",
      "bytes": 3609,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-gate-parent",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-gate.test.mjs",
      "digest": "sha256:31f323f50669a6cb0799c4b9bd32d71652dee14540ae91857cfde8c7ab1774cf",
      "bytes": 33280,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.release-review-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:6a2b0e28509b01255967b50a437eec9b761dab4cff6b18cd7644a51ff46420bc",
      "bytes": 117689,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-parent",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-review.mjs",
      "digest": "sha256:69d9888dd7d8584b5da1efe532f91ccf9e69d18d5b088055271c14e3d390664c",
      "bytes": 76900,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "scripts/run-v12-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-review.test.mjs",
      "digest": "sha256:10db954205fe53999baad30c401c8cdf3f659104b3f2c6ac3323ac83f6cb33fd",
      "bytes": 31450,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "test/v12-release-review.test.mjs"
    },
    {
      "sourceId": "context.release-review-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:dcd0fef854738bc163ac8c0c6213de8a63479d3edc8fc4ca22be2dc9f1d9f39b",
      "bytes": 27087,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/inputs/review-contract.md",
      "digest": "sha256:d4e0432c723e4a91e543addb30ce90828880ae2d412d0a07b67232a74102eb00",
      "bytes": 3943,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/inputs/review-contract.md"
    },
    {
      "sourceId": "context.revision-eighteen-review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md",
      "digest": "sha256:565324d05ac9f85c671c7ae23f6b0a3f0df43bff7b4a6ceb6e42aae693976561",
      "bytes": 4428,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md"
    },
    {
      "sourceId": "context.revision-nineteen-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md",
      "digest": "sha256:94e0a131ab1bc9a347e8ef6eb693501edda9b17b11ce16a336e622be9a74aec4",
      "bytes": 2623,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md"
    },
    {
      "sourceId": "context.revision-nineteen-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md",
      "digest": "sha256:d54ecc1b6e2f6b3079ea133a90066fa0a8b88e9f3a08c47924ec14eb1a3d55f1",
      "bytes": 8193,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.revision-nineteen-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json",
      "digest": "sha256:ee8665855792db9c241afadff4b300ad55bf71d25f6e930933d18b0931bba894",
      "bytes": 5918,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json"
    },
    {
      "sourceId": "context.revision-nineteen-test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/test-plan.md",
      "digest": "sha256:1851e0c218d3b9aad90f587e58f5de709bcc9b62a1124cf7fb275383b1fc5d93",
      "bytes": 3953,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/test-plan.md"
    },
    {
      "sourceId": "context.revision-nineteen-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json",
      "digest": "sha256:8c9e469f10f719394b086fa74d172fdfd2a2c40afdd3d0855df7a22589a47125",
      "bytes": 1322,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json"
    },
    {
      "sourceId": "context.specialist-run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Independently audit the exact Revision 19 bytes against every Revision 18 rejection cause and search for new release-evidence trust defects."
      ],
      "workUnitIds": [
        "review.closed-reconstruction-trust.r19"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/specialist-run-contract.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/inputs/review-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "package.json",
        "scripts/run-v12-release-gate.mjs",
        "scripts/run-v12-release-review.mjs",
        "test/v12-release-gate.test.mjs",
        "test/v12-release-review.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "AGENTS.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r19/inputs/review-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "package.json",
          "scripts/run-v12-release-gate.mjs",
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
          "powershell",
          "rg"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not edit files, run package installation, mutate Git state, launch descendants, use network access, refresh V11 evidence, run a candidate release gate or R2 phase, claim release readiness, approve merge, or alter prior evidence."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.review.closed-reconstruction-trust.r19",
      "criterion": "The exact Revision 19 bytes close all seven prior findings, fail closed at every declared trust boundary, retain behavioral adversarial coverage, and make no stronger host claim than they can establish.",
      "requirementId": "evidence.review.closed-reconstruction-trust.r19",
      "kind": "review",
      "duty": "produce",
      "description": "Provide source-authentication results, one disposition for each Revision 18 finding, new-bypass analysis, test-quality analysis, residual boundaries, and a concrete pass or correction route.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-revision-19-security-review.md"
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
    "Do not claim release readiness, hosted CI, merge, host isolation, cache provenance, or malicious-parent resistance.",
    "Remain read-only; report every defect without changing the reviewed source or evidence.",
    "Resolve all seven Revision 18 findings and search for new bypasses before returning pass.",
    "Return only the exact closed SpecialistAgentHandoff JSON object from the generated contract.",
    "Stop before semantic review if any declared context byte count or SHA-256 binding fails.",
    "Treat focused tests and the producer handoff as evidence only, never as the semantic verdict."
  ],
  "contentDigest": "sha256:1f29f2aa9252db72a9134f5a6b406d11ab337147abb6ec2589168bcfde00ed94"
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
    "id": "v12.ide-run-loop.review.closed-reconstruction-trust",
    "revision": 1,
    "digest": "sha256:8e8e49498ad1ba790e4e6247dfa51897b95e2788e975499d598ccdd4324cb2c7"
  },
  "agent": {
    "id": "agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2",
    "blueprintDigest": "sha256:1f29f2aa9252db72a9134f5a6b406d11ab337147abb6ec2589168bcfde00ed94"
  },
  "compilationDigest": "sha256:e8edeba54363eaabea98a63a6ec9ae61d6ac24888720fd5c146950d9a00f67c6",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.closed-reconstruction-trust.r19"
  ],
  "artifacts": [
    {
      "name": "independent-revision-19-security-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.closed-reconstruction-trust.r19",
      "requirementId": "evidence.review.closed-reconstruction-trust.r19",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-revision-19-security-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
