# Specialist Contract: agent.eb36feda6d3f7bacc6cf6eba6903d4906b334c22662b62e9b98d073967ef9709

Compilation: `sha256:0054a7b74496802027ecc9a5fd49aa18e7d17c6c7991734bd0883b4eb7ceb427`
Blueprint: `sha256:a406686baa4b4198ee99700c038b6918f70c8f4457e70430534a72874d7c0cab`

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
  "id": "agent.eb36feda6d3f7bacc6cf6eba6903d4906b334c22662b62e9b98d073967ef9709",
  "goalId": "v12.ide-run-loop.review.cache-supply-hermeticity-r24",
  "goalRevision": 1,
  "goalDigest": "sha256:25f554a9d2783200934981e32632357507fdcf1caab3b838bc9c0a46228f782f",
  "candidateId": "team.7479c6334e23c48ea3208efdb83c6eaa66650fa20954367406398952fac15ddf",
  "workUnitIds": [
    "review.cache-supply-hermeticity.r24"
  ],
  "objectives": [
    {
      "workUnitId": "review.cache-supply-hermeticity.r24",
      "objective": "Authenticate and independently audit exact Revision 24 against the closed review contract and search for new cache, path, cleanup, trust, evidence, or test-quality defects."
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
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/agent-contract.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/agent-contract.md"
    },
    {
      "sourceId": "context.candidate-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate-receipt.json",
      "digest": "sha256:b3a36ea43b5ac73c4568ba6c5542df4f66b29e7b3f1822a120cfdc38978721a6",
      "bytes": 2294,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.candidate-retirement",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-retirement.md",
      "digest": "sha256:05bd51326f9c27127820ffbe7ee5ed172e0b60d27def4ec2850a03a033efddbb",
      "bytes": 1701,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-retirement.md"
    },
    {
      "sourceId": "context.candidate-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate.stderr.log",
      "digest": "sha256:b56200af44effdd399efe987862a1241bdd2054970cac157087dca1e86845c24",
      "bytes": 19354,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.candidate-stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate.stdout.log",
      "digest": "sha256:ae258c7856783c6e2ade4e44a94057f331b62f7075199b1df1f3aea7b403a5c2",
      "bytes": 33978,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.final-host-cache-supply-child",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-host-cache-supply-child.mjs",
      "digest": "sha256:c1a808d50a709f04d54615cb25a6ec4cf4d0999c025035c8f1195c3ddae03abe",
      "bytes": 1680,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-host-cache-supply-child.mjs"
    },
    {
      "sourceId": "context.final-lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-lifecycle-helper.mjs",
      "digest": "sha256:b925ea0119289fbdd04fcca7180600d6dfabf8de51431f6cf2c50c712a61ef52",
      "bytes": 57585,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.final-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-package.json",
      "digest": "sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2",
      "bytes": 3719,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-package.json"
    },
    {
      "sourceId": "context.final-package-lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-package-lock.json"
    },
    {
      "sourceId": "context.final-release-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-gate.mjs"
    },
    {
      "sourceId": "context.final-release-review-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-harness.mjs",
      "digest": "sha256:b1314ea536bb367096decde5b28fad24e352d1a00fd383be0b4bf8d5545bcd73",
      "bytes": 127748,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-harness.mjs"
    },
    {
      "sourceId": "context.final-release-review-parent",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-parent.mjs",
      "digest": "sha256:df78c40143137f505959389bb7fc6a6282603e431ccb5abd751ea1539ffac5e1",
      "bytes": 96946,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-parent.mjs"
    },
    {
      "sourceId": "context.final-release-review-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-tests.mjs",
      "digest": "sha256:d85005ce8e44c7caca02eb967d4a3133d74fbf4815e1bcdd0c31e530f1bfa0e1",
      "bytes": 49419,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-tests.mjs"
    },
    {
      "sourceId": "context.final-release-review-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-verifier.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-verifier.mjs"
    },
    {
      "sourceId": "context.pre-lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-lifecycle-helper.mjs",
      "digest": "sha256:101c53a45cdc4edca820f1a8811b668ca8a9c88c777f2785dee3c82e914f53c5",
      "bytes": 54920,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.pre-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-package.json",
      "digest": "sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2",
      "bytes": 3719,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-package.json"
    },
    {
      "sourceId": "context.pre-package-lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-package-lock.json"
    },
    {
      "sourceId": "context.pre-release-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-gate.mjs"
    },
    {
      "sourceId": "context.pre-release-review-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-harness.mjs",
      "digest": "sha256:b1314ea536bb367096decde5b28fad24e352d1a00fd383be0b4bf8d5545bcd73",
      "bytes": 127748,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-harness.mjs"
    },
    {
      "sourceId": "context.pre-release-review-parent",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-parent.mjs",
      "digest": "sha256:df78c40143137f505959389bb7fc6a6282603e431ccb5abd751ea1539ffac5e1",
      "bytes": 96946,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-parent.mjs"
    },
    {
      "sourceId": "context.pre-release-review-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-tests.mjs",
      "digest": "sha256:1fd87295b69e1f81c41bf1681acf23712b8dd76e65029ac821b98f45c3b2d7c3",
      "bytes": 44155,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-tests.mjs"
    },
    {
      "sourceId": "context.pre-release-review-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-verifier.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-verifier.mjs"
    },
    {
      "sourceId": "context.r23-attempt-history",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-attempt-history.md",
      "digest": "sha256:5fba06c2e46b4c15f55af74f28c0a4c15e8335cfa689e5bd521cfc94e65680df",
      "bytes": 1601,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-attempt-history.md"
    },
    {
      "sourceId": "context.r23-fix-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-fix-handoff.json",
      "digest": "sha256:db8401027e1b81f77e2f1d4cc47d5eb69dbc37a1d65a1277101374cd30d7c1df",
      "bytes": 11475,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-fix-handoff.json"
    },
    {
      "sourceId": "context.r23-handoff-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-handoff-verification.json",
      "digest": "sha256:b5e703be0f988b88d6ee0e6dc2891de81fa0a1f1b7f5a8fc0f7a3fad9c7e8b14",
      "bytes": 1322,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-handoff-verification.json"
    },
    {
      "sourceId": "context.r23-reviewed-lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-reviewed-lifecycle-helper.mjs",
      "digest": "sha256:d3e9119b19f33d2a1e7d0c696262fd0da6d4d029724540c0f59c358eee29216f",
      "bytes": 56123,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-reviewed-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.r23-reviewed-release-review-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-reviewed-release-review-tests.mjs",
      "digest": "sha256:316d93374985fb7ca190ed2bb447745f15cfabc03b20a069710adb0f7b7ccac0",
      "bytes": 45603,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-reviewed-release-review-tests.mjs"
    },
    {
      "sourceId": "context.r23-to-r24-source-delta",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-to-r24-source-delta.json",
      "digest": "sha256:8aa019e79166ba0250325f4e50492baa43e2029c65b434953cf4c0a99274a27f",
      "bytes": 2618,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-to-r24-source-delta.json"
    },
    {
      "sourceId": "context.r24-correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-correction-contract.md",
      "digest": "sha256:78aa80a1c34562b62102a2558c670fbcef52b5770b9015eab70c30319db20e21",
      "bytes": 1705,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-correction-contract.md"
    },
    {
      "sourceId": "context.r24-fixture-sequence-diagnosis",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-fixture-sequence-diagnosis.md",
      "digest": "sha256:cde31b8a1e6768f19e0493a956f301295c12f5deaf4c53b1b2c99d0e617dbac1",
      "bytes": 1406,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-fixture-sequence-diagnosis.md"
    },
    {
      "sourceId": "context.r24-reproduction",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-integration-owner-reproduction.md",
      "digest": "sha256:9f4aa4ebd0cf0dd244f2350aa31fdb82bbd08aabc3f2fd6da8c87a7fe41b5cab",
      "bytes": 1802,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-integration-owner-reproduction.md"
    },
    {
      "sourceId": "context.r24-test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-test-plan.md",
      "digest": "sha256:70bbf82a008b95b2eda1b655e2a91e8ecfa39f440344e69c65ebdc953a238e29",
      "bytes": 1049,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-test-plan.md"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/review-contract.md",
      "digest": "sha256:9c5dffed79cf2c7b07af1e2341854258ea3c6976e7ac3e89287d2bd1ed5f283f",
      "bytes": 2504,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/review-contract.md"
    },
    {
      "sourceId": "context.source-delta",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/source-delta.json",
      "digest": "sha256:8411748ec3d524ee834e35a8b5e88c61d2f231b53fc04b569480afaac5104ebf",
      "bytes": 6776,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/source-delta.json"
    },
    {
      "sourceId": "context.specialist-run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Authenticate and independently audit the exact Revision 24 cache-supply correction and Candidate 11 failure evidence."
      ],
      "workUnitIds": [
        "review.cache-supply-hermeticity.r24"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/specialist-run-contract.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/review-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/agent-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-host-cache-supply-child.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-harness.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-parent.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-verifier.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-harness.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-parent.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-verifier.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-fix-handoff.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-reviewed-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-reviewed-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-to-r24-source-delta.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-fixture-sequence-diagnosis.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-integration-owner-reproduction.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/source-delta.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/specialist-run-contract.md"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/review-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/agent-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-canonical-gate.stdout.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/candidate-11-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-host-cache-supply-child.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-harness.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-parent.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/final-release-review-verifier.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-harness.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-parent.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/pre-release-review-verifier.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-fix-handoff.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-reviewed-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-reviewed-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r23-to-r24-source-delta.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-fixture-sequence-diagnosis.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-integration-owner-reproduction.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/r24-test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/source-delta.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r24/inputs/snapshots/specialist-run-contract.md"
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
      "criterionId": "criterion.review.cache-supply-hermeticity.r24",
      "criterion": "Exact Revision 24 is causal, hermetic across clean materialization, preserves every production control, and introduces no release-blocking trust or test-quality defect.",
      "requirementId": "evidence.review.cache-supply-hermeticity.r24",
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
  "contentDigest": "sha256:a406686baa4b4198ee99700c038b6918f70c8f4457e70430534a72874d7c0cab"
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
    "id": "v12.ide-run-loop.review.cache-supply-hermeticity-r24",
    "revision": 1,
    "digest": "sha256:25f554a9d2783200934981e32632357507fdcf1caab3b838bc9c0a46228f782f"
  },
  "agent": {
    "id": "agent.eb36feda6d3f7bacc6cf6eba6903d4906b334c22662b62e9b98d073967ef9709",
    "blueprintDigest": "sha256:a406686baa4b4198ee99700c038b6918f70c8f4457e70430534a72874d7c0cab"
  },
  "compilationDigest": "sha256:0054a7b74496802027ecc9a5fd49aa18e7d17c6c7991734bd0883b4eb7ceb427",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.cache-supply-hermeticity.r24"
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
      "criterionId": "criterion.review.cache-supply-hermeticity.r24",
      "requirementId": "evidence.review.cache-supply-hermeticity.r24",
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
