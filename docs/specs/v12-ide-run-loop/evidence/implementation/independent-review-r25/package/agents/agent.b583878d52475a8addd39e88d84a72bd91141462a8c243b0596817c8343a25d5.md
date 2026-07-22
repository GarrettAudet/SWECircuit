# Specialist Contract: agent.b583878d52475a8addd39e88d84a72bd91141462a8c243b0596817c8343a25d5

Compilation: `sha256:6f301893b1a620d9699d853e33e0e1c0716416caf87652c408d0d7766e43156d`
Blueprint: `sha256:895e3f5b182dc649937a7c8ff40ad2230c413273c3cf20fec36463182bb32cdb`

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
  "id": "agent.b583878d52475a8addd39e88d84a72bd91141462a8c243b0596817c8343a25d5",
  "goalId": "v12.ide-run-loop.review.git-environment-hermeticity-r25",
  "goalRevision": 1,
  "goalDigest": "sha256:bba0e78a853168e894f6d1e83899b4068665be98d0205d71924dc9be9e0e739f",
  "candidateId": "team.06156f684891a1c3861e5043d7ed8967e72dd1ae5a0a151eb0cbd327ff546eb3",
  "workUnitIds": [
    "review.git-environment-hermeticity.r25"
  ],
  "objectives": [
    {
      "workUnitId": "review.git-environment-hermeticity.r25",
      "objective": "Authenticate and independently audit exact Revision 25 against the closed contract and search for Git environment, path, cleanup, trust, evidence, or test-quality defects."
    }
  ],
  "modules": [
    {
      "id": "review.git-environment-hermeticity",
      "action": "Trace outer candidate Git routing into nested fixture processes, compare exact deltas, assess sanitization completeness and tests, and return a bounded verdict.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "VerifiedCandidate12FailureAndRevision25Evidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision25Verdict"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/agent-contract.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/agent-contract.md"
    },
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-correction-contract.md",
      "digest": "sha256:e553891c75d42a045912fc341fcf9d180c4b5348f85173d348142816e04dcc2e",
      "bytes": 2306,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-correction-contract.md"
    },
    {
      "sourceId": "context.delta",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/source-delta.json",
      "digest": "sha256:5d7acf5538c27edb612c27a96abcae5f4dafacb2247886771ef7bfeec88d7065",
      "bytes": 3091,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/source-delta.json"
    },
    {
      "sourceId": "context.diagnosis",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-diagnosis.md",
      "digest": "sha256:2e632ae4c9193f4a20b7d21ef1084fac9ef0518af25bc2bb886a9e8bb8d3f2c7",
      "bytes": 1934,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-diagnosis.md"
    },
    {
      "sourceId": "context.final-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-lifecycle-helper.mjs",
      "digest": "sha256:c8d3e24ecc949351fa09a7e7ca4c11b333cade76db6656ce415e6a432b5c3b76",
      "bytes": 58700,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.final-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-tests.mjs",
      "digest": "sha256:7ee1321e79e8252ed945939aac4f18d474b3a595bb0c43afda678c4b9298cfaa",
      "bytes": 52008,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-tests.mjs"
    },
    {
      "sourceId": "context.gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-gate.mjs"
    },
    {
      "sourceId": "context.harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-harness.mjs",
      "digest": "sha256:b1314ea536bb367096decde5b28fad24e352d1a00fd383be0b4bf8d5545bcd73",
      "bytes": 127748,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-harness.mjs"
    },
    {
      "sourceId": "context.lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-package-lock.json"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-package.json",
      "digest": "sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2",
      "bytes": 3719,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-package.json"
    },
    {
      "sourceId": "context.parent",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-parent.mjs",
      "digest": "sha256:df78c40143137f505959389bb7fc6a6282603e431ccb5abd751ea1539ffac5e1",
      "bytes": 96946,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-parent.mjs"
    },
    {
      "sourceId": "context.pre-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/pre-lifecycle-helper.mjs",
      "digest": "sha256:b925ea0119289fbdd04fcca7180600d6dfabf8de51431f6cf2c50c712a61ef52",
      "bytes": 57585,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/pre-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.pre-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/pre-release-review-tests.mjs",
      "digest": "sha256:d85005ce8e44c7caca02eb967d4a3133d74fbf4815e1bcdd0c31e530f1bfa0e1",
      "bytes": 49419,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/pre-release-review-tests.mjs"
    },
    {
      "sourceId": "context.prior-review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r24-final-review-handoff.json",
      "digest": "sha256:f88c08303de25f66a61dae6f0ca6e508b0357923c9c4bbe0d45e2e82a72c6497",
      "bytes": 18311,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r24-final-review-handoff.json"
    },
    {
      "sourceId": "context.prior-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r24-final-handoff-verification.json",
      "digest": "sha256:a31003f31c5cf40b5ff6fb6bcb500b7506f2fc8b2606e572627f56bc95253acd",
      "bytes": 1329,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r24-final-handoff-verification.json"
    },
    {
      "sourceId": "context.receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate-receipt.json",
      "digest": "sha256:f8d02f70e22177b608feaab5d62bf127076be210b4d2aa6d3c440ddb0f9e39aa",
      "bytes": 2294,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.retirement",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-retirement.md",
      "digest": "sha256:a0f78928bf115fe22bef0bebf9866f4a7c63a4f726026eae5ccdf3a483027208",
      "bytes": 1636,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-retirement.md"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/review-contract.md",
      "digest": "sha256:2f07e45da862d8ccc841a3ec58bdd7322ec483a852536a7d906284754dc371d8",
      "bytes": 2596,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/review-contract.md"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/specialist-run-contract.md"
    },
    {
      "sourceId": "context.stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate.stderr.log",
      "digest": "sha256:b56200af44effdd399efe987862a1241bdd2054970cac157087dca1e86845c24",
      "bytes": 19354,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate.stdout.log",
      "digest": "sha256:6f24723686d68e4e26ffc8af2d42035f3612b5b3873f16a8163e0ed17b385e2b",
      "bytes": 34499,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-test-plan.md",
      "digest": "sha256:1dfcb05e8733ecf3836442360865d3113c20d6b952c98c24f16180b9e6e31ad4",
      "bytes": 1205,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-test-plan.md"
    },
    {
      "sourceId": "context.verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-integration-owner-verification.md",
      "digest": "sha256:81f9d877840794f9af942116937e849671f8760a5fcdff2846fe2634eb5a99c5",
      "bytes": 1518,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-integration-owner-verification.md"
    },
    {
      "sourceId": "context.verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-verifier.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Authenticate and independently audit the exact Revision 25 Git-environment correction and Candidate 12 evidence."
      ],
      "workUnitIds": [
        "review.git-environment-hermeticity.r25"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-verifier.mjs"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/review-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/agent-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-diagnosis.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-harness.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-parent.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-verifier.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/pre-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/pre-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r24-final-handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r24-final-review-handoff.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-integration-owner-verification.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/source-delta.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/specialist-run-contract.md"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/review-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/agent-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-canonical-gate.stdout.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-diagnosis.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/candidate-12-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-harness.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-parent.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/final-release-review-verifier.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/pre-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/pre-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r24-final-handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r24-final-review-handoff.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-integration-owner-verification.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/r25-test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/source-delta.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r25/inputs/snapshots/specialist-run-contract.md"
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
      "Do not edit files, install packages, mutate Git state, use network access, launch descendants, rerun a candidate gate, alter Candidate 12 evidence, claim release readiness, approve merge, or perform host enforcement."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.review.git-environment-hermeticity.r25",
      "criterion": "Exact Revision 25 causally closes nested repository substitution, preserves all release controls, and introduces no blocking test or trust defect.",
      "requirementId": "evidence.review.git-environment-hermeticity.r25",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate all sources, resolve every review point, assess bypasses and tests, and return a concrete pass or correction route.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-revision-25-git-environment-review.md"
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
    "Do not claim release readiness, hosted CI, merge approval, or host isolation.",
    "Remain read-only and report every defect without changing source or evidence.",
    "Resolve every closed review point and search for new bypasses before returning pass.",
    "Return only the exact generated SpecialistAgentHandoff JSON object.",
    "Stop before semantic review if any declared snapshot byte count or digest fails.",
    "Treat integration-owner tests and prose as evidence only, never as the verdict."
  ],
  "contentDigest": "sha256:895e3f5b182dc649937a7c8ff40ad2230c413273c3cf20fec36463182bb32cdb"
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
    "id": "v12.ide-run-loop.review.git-environment-hermeticity-r25",
    "revision": 1,
    "digest": "sha256:bba0e78a853168e894f6d1e83899b4068665be98d0205d71924dc9be9e0e739f"
  },
  "agent": {
    "id": "agent.b583878d52475a8addd39e88d84a72bd91141462a8c243b0596817c8343a25d5",
    "blueprintDigest": "sha256:895e3f5b182dc649937a7c8ff40ad2230c413273c3cf20fec36463182bb32cdb"
  },
  "compilationDigest": "sha256:6f301893b1a620d9699d853e33e0e1c0716416caf87652c408d0d7766e43156d",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.git-environment-hermeticity.r25"
  ],
  "artifacts": [
    {
      "name": "independent-revision-25-git-environment-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.git-environment-hermeticity.r25",
      "requirementId": "evidence.review.git-environment-hermeticity.r25",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-revision-25-git-environment-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
