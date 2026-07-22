# Specialist Contract: agent.576678a0316ba6b2a92ae4b631234843ea8c163f23422d4ea871bea8092e1157

Compilation: `sha256:594a22bbe28ef6cc91dc1536510bad1e4a33a9e6211a4808555f3c53f35f3ea4`
Blueprint: `sha256:5a6f9f033ac9e0e0daafa77ae18009d21428eb349e63dbac5debf6fc4beaebf2`

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
  "id": "agent.576678a0316ba6b2a92ae4b631234843ea8c163f23422d4ea871bea8092e1157",
  "goalId": "v12.ide-run-loop.review.cache-supply-hermeticity-r23",
  "goalRevision": 1,
  "goalDigest": "sha256:e0367a1a138174e616b09ede5812a5d822bb14fe7aef0c9235e9871bc8e54ad0",
  "candidateId": "team.f8545c1d05d68e623da7a76ff3b0e7807631750d447386458dd6b75585b61399",
  "workUnitIds": [
    "review.cache-supply-hermeticity.r23"
  ],
  "objectives": [
    {
      "workUnitId": "review.cache-supply-hermeticity.r23",
      "objective": "Authenticate and independently audit exact Revision 23 against the closed review contract and search for new cache, path, cleanup, trust, evidence, or test-quality defects."
    }
  ],
  "modules": [
    {
      "id": "review.cache-supply-hermeticity",
      "action": "Trace exact source deltas, release-gate cache resolution, lifecycle ownership, copy guards, cleanup, regression behavior, and immutable failure evidence before returning a verdict.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "VerifiedCandidate11FailureAndRevision23"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision23Verdict"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/agent-contract.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/agent-contract.md"
    },
    {
      "sourceId": "context.candidate-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate-receipt.json",
      "digest": "sha256:b3a36ea43b5ac73c4568ba6c5542df4f66b29e7b3f1822a120cfdc38978721a6",
      "bytes": 2294,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.candidate-retirement",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-retirement.md",
      "digest": "sha256:05bd51326f9c27127820ffbe7ee5ed172e0b60d27def4ec2850a03a033efddbb",
      "bytes": 1701,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-retirement.md"
    },
    {
      "sourceId": "context.candidate-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate.stderr.log",
      "digest": "sha256:b56200af44effdd399efe987862a1241bdd2054970cac157087dca1e86845c24",
      "bytes": 19354,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.candidate-stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate.stdout.log",
      "digest": "sha256:ae258c7856783c6e2ade4e44a94057f331b62f7075199b1df1f3aea7b403a5c2",
      "bytes": 33978,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.final-lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-lifecycle-helper.mjs",
      "digest": "sha256:d3e9119b19f33d2a1e7d0c696262fd0da6d4d029724540c0f59c358eee29216f",
      "bytes": 56123,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.final-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-package.json",
      "digest": "sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2",
      "bytes": 3719,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-package.json"
    },
    {
      "sourceId": "context.final-package-lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-package-lock.json"
    },
    {
      "sourceId": "context.final-release-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-gate.mjs"
    },
    {
      "sourceId": "context.final-release-review-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-harness.mjs",
      "digest": "sha256:b1314ea536bb367096decde5b28fad24e352d1a00fd383be0b4bf8d5545bcd73",
      "bytes": 127748,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-harness.mjs"
    },
    {
      "sourceId": "context.final-release-review-parent",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-parent.mjs",
      "digest": "sha256:df78c40143137f505959389bb7fc6a6282603e431ccb5abd751ea1539ffac5e1",
      "bytes": 96946,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-parent.mjs"
    },
    {
      "sourceId": "context.final-release-review-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-tests.mjs",
      "digest": "sha256:316d93374985fb7ca190ed2bb447745f15cfabc03b20a069710adb0f7b7ccac0",
      "bytes": 45603,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-tests.mjs"
    },
    {
      "sourceId": "context.final-release-review-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-verifier.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-verifier.mjs"
    },
    {
      "sourceId": "context.pre-lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-lifecycle-helper.mjs",
      "digest": "sha256:101c53a45cdc4edca820f1a8811b668ca8a9c88c777f2785dee3c82e914f53c5",
      "bytes": 54920,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.pre-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-package.json",
      "digest": "sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2",
      "bytes": 3719,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-package.json"
    },
    {
      "sourceId": "context.pre-package-lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-package-lock.json"
    },
    {
      "sourceId": "context.pre-release-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-gate.mjs"
    },
    {
      "sourceId": "context.pre-release-review-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-harness.mjs",
      "digest": "sha256:b1314ea536bb367096decde5b28fad24e352d1a00fd383be0b4bf8d5545bcd73",
      "bytes": 127748,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-harness.mjs"
    },
    {
      "sourceId": "context.pre-release-review-parent",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-parent.mjs",
      "digest": "sha256:df78c40143137f505959389bb7fc6a6282603e431ccb5abd751ea1539ffac5e1",
      "bytes": 96946,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-parent.mjs"
    },
    {
      "sourceId": "context.pre-release-review-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-tests.mjs",
      "digest": "sha256:1fd87295b69e1f81c41bf1681acf23712b8dd76e65029ac821b98f45c3b2d7c3",
      "bytes": 44155,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-tests.mjs"
    },
    {
      "sourceId": "context.pre-release-review-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-verifier.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-verifier.mjs"
    },
    {
      "sourceId": "context.r23-correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-correction-contract.md",
      "digest": "sha256:1b531ac4b1206bc8da413b643f758fccc2854b13bb1bf9e10f0ef1aa0d2e02c7",
      "bytes": 1852,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-correction-contract.md"
    },
    {
      "sourceId": "context.r23-reproduction",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-integration-owner-reproduction.md",
      "digest": "sha256:26c4c46291e61d69b1f920ad38786a72099bfb035b58e5477353f2b482cece38",
      "bytes": 1194,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-integration-owner-reproduction.md"
    },
    {
      "sourceId": "context.r23-test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-test-plan.md",
      "digest": "sha256:9620f3308b2a0e1d5ecace2c535a827fbf0298818041428dfbf22fbeb6a7b538",
      "bytes": 1322,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-test-plan.md"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/review-contract.md",
      "digest": "sha256:332c86dbd553e9b17417aba3e26b8e739eefb5ba360b6b3d6889f5f93cdb0781",
      "bytes": 2032,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/review-contract.md"
    },
    {
      "sourceId": "context.source-delta",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/source-delta.json",
      "digest": "sha256:ca15df9ba16d2c96ab281d6a8b7261d1f9a9e15a50cdc56d426ee24a00df540e",
      "bytes": 6182,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/source-delta.json"
    },
    {
      "sourceId": "context.specialist-run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Authenticate and independently audit the exact Revision 23 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r23"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/specialist-run-contract.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/review-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/agent-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-harness.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-parent.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-verifier.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-harness.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-parent.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-verifier.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-integration-owner-reproduction.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/source-delta.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/specialist-run-contract.md"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/review-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/agent-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-canonical-gate.stdout.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/candidate-11-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-harness.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-parent.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/final-release-review-verifier.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-harness.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-parent.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/pre-release-review-verifier.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-integration-owner-reproduction.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/r23-test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/source-delta.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r23/inputs/snapshots/specialist-run-contract.md"
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
      "Do not edit files, install packages, mutate Git state, use network access, launch descendants, rerun a candidate gate, alter Candidate 11 evidence, claim release readiness, approve merge, or perform host enforcement."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.review.cache-supply-hermeticity.r23",
      "criterion": "Exact Revision 23 is causal, hermetic across clean materialization, preserves every production control, and introduces no release-blocking trust or test-quality defect.",
      "requirementId": "evidence.review.cache-supply-hermeticity.r23",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate all sources, resolve every review point, compare exact pre/final bytes, assess tests and bypasses, and return a concrete pass or correction route.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-revision-23-cache-supply-review.md"
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
    "Do not claim release readiness, hosted CI, merge approval, external cache provenance, or host isolation.",
    "Remain read-only and report every defect without changing source or evidence.",
    "Resolve every closed review point and search for new bypasses before returning pass.",
    "Return only the exact generated SpecialistAgentHandoff JSON object.",
    "Stop before semantic review if any declared snapshot byte count or SHA-256 binding fails.",
    "Treat integration-owner tests and prose as evidence only, never as the semantic verdict."
  ],
  "contentDigest": "sha256:5a6f9f033ac9e0e0daafa77ae18009d21428eb349e63dbac5debf6fc4beaebf2"
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
    "id": "v12.ide-run-loop.review.cache-supply-hermeticity-r23",
    "revision": 1,
    "digest": "sha256:e0367a1a138174e616b09ede5812a5d822bb14fe7aef0c9235e9871bc8e54ad0"
  },
  "agent": {
    "id": "agent.576678a0316ba6b2a92ae4b631234843ea8c163f23422d4ea871bea8092e1157",
    "blueprintDigest": "sha256:5a6f9f033ac9e0e0daafa77ae18009d21428eb349e63dbac5debf6fc4beaebf2"
  },
  "compilationDigest": "sha256:594a22bbe28ef6cc91dc1536510bad1e4a33a9e6211a4808555f3c53f35f3ea4",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.cache-supply-hermeticity.r23"
  ],
  "artifacts": [
    {
      "name": "independent-revision-23-cache-supply-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.cache-supply-hermeticity.r23",
      "requirementId": "evidence.review.cache-supply-hermeticity.r23",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-revision-23-cache-supply-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
