# Specialist Contract: agent.a0779f841063f577cd855b902fd9aa3fb58b66ad7b68ae0ae83183c95b912d1b

Compilation: `sha256:002a7deab98a63b756e8f930cbcfd3927d64c0c262076a0ee9ccddfb29d01d45`
Blueprint: `sha256:5302919186841b5a6602a157551fbc474b10277360dce70e25a7b0fef6780a09`

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
  "id": "agent.a0779f841063f577cd855b902fd9aa3fb58b66ad7b68ae0ae83183c95b912d1b",
  "goalId": "v12.ide-run-loop.review.git-environment-and-exact-lifecycle-r26",
  "goalRevision": 1,
  "goalDigest": "sha256:7747fe7e03d23df5c94303d8b2142d173e1feebbb98b44018947f6632f7c8977",
  "candidateId": "team.269c5c20719b902c38032d136072118895919972eeb5bbcc2d50a4a39788b76a",
  "workUnitIds": [
    "review.git-environment-and-exact-lifecycle.r26"
  ],
  "objectives": [
    {
      "workUnitId": "review.git-environment-and-exact-lifecycle.r26",
      "objective": "Authenticate and independently audit exact Revision 26 against the closed contract and search for Git environment, toolchain, materialization, cleanup, trust, evidence, or test-quality defects."
    }
  ],
  "modules": [
    {
      "id": "review.git-environment-and-exact-lifecycle",
      "action": "Trace exact outer candidate inputs into every nested process, compare immutable source deltas, assess closure completeness and lifecycle proof, and return a bounded verdict.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "VerifiedCandidate12Revision25AndRevision26Evidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision26Verdict"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/agent-contract.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/agent-contract.md"
    },
    {
      "sourceId": "context.checkpoint",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/review-checkpoint.json",
      "digest": "sha256:20c67fce7740996258c3e370df5011b4a0b89e084e5ac1af8409dbf2834888a9",
      "bytes": 261,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/review-checkpoint.json"
    },
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-correction-contract.md",
      "digest": "sha256:7c3f32f4670fce1b16917d343abc90e687ea50919673ae6652a16881ee1ab5c6",
      "bytes": 2634,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-correction-contract.md"
    },
    {
      "sourceId": "context.delta",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/source-delta.json",
      "digest": "sha256:920775bb947776f2205b46da53ff1e4d30059cdb40c6d80b7186b37bfc727412",
      "bytes": 3960,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/source-delta.json"
    },
    {
      "sourceId": "context.diagnosis",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-diagnosis.md",
      "digest": "sha256:2e632ae4c9193f4a20b7d21ef1084fac9ef0518af25bc2bb886a9e8bb8d3f2c7",
      "bytes": 1934,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-diagnosis.md"
    },
    {
      "sourceId": "context.final-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-lifecycle-helper.mjs",
      "digest": "sha256:687e3cabea39e35126e3172ad28fa74cd9d49c73fdbd49e29b4d5bb5978b6217",
      "bytes": 59496,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.final-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-tests.mjs",
      "digest": "sha256:ecd6c8e3387a85c4a029ff0915906cee6351e8479622e9abb6900885c88e28ac",
      "bytes": 56064,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-tests.mjs"
    },
    {
      "sourceId": "context.gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-gate.mjs"
    },
    {
      "sourceId": "context.git-boundary-child",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/git-environment-boundary-child.mjs",
      "digest": "sha256:7a09f14fc57188ae3352738b714dac5d184f825ab0b62607ce145ce743abb2b5",
      "bytes": 3025,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/git-environment-boundary-child.mjs"
    },
    {
      "sourceId": "context.harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-harness.mjs",
      "digest": "sha256:b1314ea536bb367096decde5b28fad24e352d1a00fd383be0b4bf8d5545bcd73",
      "bytes": 127748,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-harness.mjs"
    },
    {
      "sourceId": "context.lifecycle-child",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/release-review-lifecycle-child.mjs",
      "digest": "sha256:1427df548e23cddbbe2fe1a397b37c9191a7e0e53968b7f75354dfaa0bc2b249",
      "bytes": 875,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/release-review-lifecycle-child.mjs"
    },
    {
      "sourceId": "context.lifecycle-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-complete-lifecycle-verification.md",
      "digest": "sha256:2a01e56f46b3bd9de7fd33887a6045f6ff60bcfa7ac98e12c5f1354a94a554c8",
      "bytes": 1937,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-complete-lifecycle-verification.md"
    },
    {
      "sourceId": "context.lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-package-lock.json"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-package.json",
      "digest": "sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2",
      "bytes": 3719,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-package.json"
    },
    {
      "sourceId": "context.parent",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-parent.mjs",
      "digest": "sha256:df78c40143137f505959389bb7fc6a6282603e431ccb5abd751ea1539ffac5e1",
      "bytes": 96946,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-parent.mjs"
    },
    {
      "sourceId": "context.pre-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/pre-lifecycle-helper.mjs",
      "digest": "sha256:c8d3e24ecc949351fa09a7e7ca4c11b333cade76db6656ce415e6a432b5c3b76",
      "bytes": 58700,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/pre-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.pre-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/pre-release-review-tests.mjs",
      "digest": "sha256:7ee1321e79e8252ed945939aac4f18d474b3a595bb0c43afda678c4b9298cfaa",
      "bytes": 52008,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/pre-release-review-tests.mjs"
    },
    {
      "sourceId": "context.prior-assessment",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-integration-assessment.md",
      "digest": "sha256:94a5af912974537c0f40edda20b766cf94c2eacbf018795b990d3cbaee7a0902",
      "bytes": 1090,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-integration-assessment.md"
    },
    {
      "sourceId": "context.prior-review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-review-handoff.json",
      "digest": "sha256:3ec88fb6484540f36cb37292719eb4355408eb560abe041b1ddde6774727a9d3",
      "bytes": 11293,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-review-handoff.json"
    },
    {
      "sourceId": "context.prior-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-handoff-verification.json",
      "digest": "sha256:5ce0e67a46a62e4b86ca8af4e50a4180b56fbf43fc9b14bd8bd862464388b8ae",
      "bytes": 1421,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-handoff-verification.json"
    },
    {
      "sourceId": "context.receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate-receipt.json",
      "digest": "sha256:f8d02f70e22177b608feaab5d62bf127076be210b4d2aa6d3c440ddb0f9e39aa",
      "bytes": 2294,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.retirement",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-retirement.md",
      "digest": "sha256:a0f78928bf115fe22bef0bebf9866f4a7c63a4f726026eae5ccdf3a483027208",
      "bytes": 1636,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-retirement.md"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/review-contract.md",
      "digest": "sha256:0ccf60af7931962386117bceadcddff5ef17ff5d268a978025f183166e1c198e",
      "bytes": 2308,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/review-contract.md"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/specialist-run-contract.md"
    },
    {
      "sourceId": "context.stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate.stderr.log",
      "digest": "sha256:b56200af44effdd399efe987862a1241bdd2054970cac157087dca1e86845c24",
      "bytes": 19354,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate.stdout.log",
      "digest": "sha256:6f24723686d68e4e26ffc8af2d42035f3612b5b3873f16a8163e0ed17b385e2b",
      "bytes": 34499,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-test-plan.md",
      "digest": "sha256:04f60136bf4fb6c5140f51310cb28be9cdecb39a26d9cafa26a45f2cdfcd795e",
      "bytes": 1523,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-test-plan.md"
    },
    {
      "sourceId": "context.verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-integration-owner-verification.md",
      "digest": "sha256:3b2aba66360f5e11e9f26711cfa899143a54c2f4336fba977397bed677561f21",
      "bytes": 2758,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-integration-owner-verification.md"
    },
    {
      "sourceId": "context.verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-verifier.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Authenticate and independently audit the exact Revision 26 Git-environment and materialized-lifecycle correction."
      ],
      "workUnitIds": [
        "review.git-environment-and-exact-lifecycle.r26"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-verifier.mjs"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/review-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/agent-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-diagnosis.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-harness.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-parent.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-verifier.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/git-environment-boundary-child.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/pre-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/pre-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-integration-assessment.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-review-handoff.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-complete-lifecycle-verification.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-integration-owner-verification.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/release-review-lifecycle-child.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/review-checkpoint.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/source-delta.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/specialist-run-contract.md"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/review-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/agent-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-canonical-gate.stdout.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-diagnosis.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/candidate-12-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-harness.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-parent.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/final-release-review-verifier.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/git-environment-boundary-child.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/pre-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/pre-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-integration-assessment.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r25-review-handoff.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-complete-lifecycle-verification.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-integration-owner-verification.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/r26-test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/release-review-lifecycle-child.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/review-checkpoint.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/source-delta.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r26/inputs/snapshots/specialist-run-contract.md"
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
      "Do not edit files, install packages, mutate Git state, use network access, launch descendants, rerun a candidate gate, alter Candidate 12 or Revision 25 evidence, claim release readiness, approve merge, or perform host enforcement."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.review.git-environment-and-exact-lifecycle.r26",
      "criterion": "Exact Revision 26 causally closes nested Git substitution and exact-materialization lifecycle gaps, preserves all release controls, and introduces no blocking test or trust defect.",
      "requirementId": "evidence.review.git-environment-and-exact-lifecycle.r26",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate all sources, resolve every review point, assess bypasses and tests, and return a concrete pass or correction route.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-revision-26-release-correction-review.md"
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
  "contentDigest": "sha256:5302919186841b5a6602a157551fbc474b10277360dce70e25a7b0fef6780a09"
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
    "id": "v12.ide-run-loop.review.git-environment-and-exact-lifecycle-r26",
    "revision": 1,
    "digest": "sha256:7747fe7e03d23df5c94303d8b2142d173e1feebbb98b44018947f6632f7c8977"
  },
  "agent": {
    "id": "agent.a0779f841063f577cd855b902fd9aa3fb58b66ad7b68ae0ae83183c95b912d1b",
    "blueprintDigest": "sha256:5302919186841b5a6602a157551fbc474b10277360dce70e25a7b0fef6780a09"
  },
  "compilationDigest": "sha256:002a7deab98a63b756e8f930cbcfd3927d64c0c262076a0ee9ccddfb29d01d45",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.git-environment-and-exact-lifecycle.r26"
  ],
  "artifacts": [
    {
      "name": "independent-revision-26-release-correction-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.git-environment-and-exact-lifecycle.r26",
      "requirementId": "evidence.review.git-environment-and-exact-lifecycle.r26",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-revision-26-release-correction-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
