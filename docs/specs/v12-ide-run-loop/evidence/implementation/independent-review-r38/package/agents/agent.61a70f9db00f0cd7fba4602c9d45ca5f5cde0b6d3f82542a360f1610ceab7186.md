# Specialist Contract: agent.61a70f9db00f0cd7fba4602c9d45ca5f5cde0b6d3f82542a360f1610ceab7186

Compilation: `sha256:6c671af037cabfdf9e97da3e97d141a67134e0a73e35d3b733ddd0c49c78a66b`
Blueprint: `sha256:c7785a9f27a55df61dd08c72f742cefd941c25766196301d3cb9c0d33113dc54`

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
  "id": "agent.61a70f9db00f0cd7fba4602c9d45ca5f5cde0b6d3f82542a360f1610ceab7186",
  "goalId": "v12.ide-run-loop.review.release-candidate-r38",
  "goalRevision": 38,
  "goalDigest": "sha256:b1cf1d058c6645bd7b2d6e0c4ffb3cce465368e1c714e3de6fb5bbc872632fb2",
  "candidateId": "team.68b7fb04ba1fab8cb03735c22e464da5b35810ef9886123edcd6e6e4184a9a84",
  "workUnitIds": [
    "review.release-candidate.r38"
  ],
  "objectives": [
    {
      "workUnitId": "review.release-candidate.r38",
      "objective": "Authenticate and independently audit exact Revision 38 and its aggregate against the closed review contract; trace the retained-Git-authority correction through the shared spawn path, delivered child environment, real fixture, and concurrent tests, search for bypasses, and return one bounded verdict."
    }
  ],
  "modules": [
    {
      "id": "review.release-candidate",
      "action": "Authenticate immutable inputs; trace source, package, closed Git environment, child delivery, process isolation, cleanup, evidence, and host boundaries; search adversarially; return one exact review handoff.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "AuthenticatedRevision38CandidateEvidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision38ReleaseVerdict"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.active-context",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s14-active-context.md",
      "digest": "sha256:103a2a11eb962be08746aa3c049cbe3e90851fb14475deb3a8f0fe1a8626978d",
      "bytes": 44754,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s14-active-context.md"
    },
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s01-agent-contract.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s01-agent-contract.md"
    },
    {
      "sourceId": "context.aggregate-receipt",
      "kind": "repository",
      "locator": "path:inputs/aggregate/aggregate-receipt.json",
      "digest": "sha256:d545bb396afd7bb841c5a10ced11b0e0a66e8a4b9b2bd9f536a6c3d35166fa1a",
      "bytes": 1227,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/aggregate/aggregate-receipt.json"
    },
    {
      "sourceId": "context.aggregate-stderr",
      "kind": "repository",
      "locator": "path:inputs/aggregate/npm-verify.stderr.log",
      "digest": "sha256:c620ad4eb01b894d5789b5f44fd9ad8397e84e0d7b3dea11a07e64c5eee567cd",
      "bytes": 26319,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/aggregate/npm-verify.stderr.log"
    },
    {
      "sourceId": "context.aggregate-stdout",
      "kind": "repository",
      "locator": "path:inputs/aggregate/npm-verify.stdout.log",
      "digest": "sha256:645802eda47edce27dcb6943e42c6a307e6674c5d794ba0908e0e33971482c6e",
      "bytes": 303719,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/aggregate/npm-verify.stdout.log"
    },
    {
      "sourceId": "context.attributes",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s16-gitattributes",
      "digest": "sha256:4626d1e064ae446e63b50a072443b874a9619c012ac283d7903d03cd028b53a3",
      "bytes": 1283,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s16-gitattributes"
    },
    {
      "sourceId": "context.audit-approval",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s35-audit-approval.json",
      "digest": "sha256:07427ef7b1b16e44d4b99ac71bdbea3009e1547ebc33ddc5215b5e8a5a6be758",
      "bytes": 195,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s35-audit-approval.json"
    },
    {
      "sourceId": "context.audit-binder",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s37-audit-binder.json",
      "digest": "sha256:7e916637385b4aeef470fe15da8689b9476c5707109d9bd67723021315314fcc",
      "bytes": 6366,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s37-audit-binder.json"
    },
    {
      "sourceId": "context.audit-compilation",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s33-audit-compilation.json",
      "digest": "sha256:1a9ad265525a7e8db0f78dcebb8e3d412d433dc5991ee53bc083e3d8d6ebc04f",
      "bytes": 170110,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s33-audit-compilation.json"
    },
    {
      "sourceId": "context.audit-goal",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s32-audit-goal.json",
      "digest": "sha256:c8488458e59db01897c203102522759c6f49b0b4a7e582ea237b8854df3eb12b",
      "bytes": 64546,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s32-audit-goal.json"
    },
    {
      "sourceId": "context.audit-receipt",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s36-audit-receipt.json",
      "digest": "sha256:72b341d8edeb06796d23bbd057041a8b18d94498efbe6aa3ffb4efe87568cc76",
      "bytes": 2255,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s36-audit-receipt.json"
    },
    {
      "sourceId": "context.audit-report",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s34-audit-report.json",
      "digest": "sha256:f86d3a98cbf718b4c686dd8691f0b7920066d03705d47e3d72eac1b0f8d1f578",
      "bytes": 20362,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s34-audit-report.json"
    },
    {
      "sourceId": "context.audit-semantic",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s38-audit-semantic.json",
      "digest": "sha256:3a53b4ba416dba1fb9aac2296bd2817863e61f2f913f2fb7bdb39cd4a31388fb",
      "bytes": 10233,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s38-audit-semantic.json"
    },
    {
      "sourceId": "context.candidate-manifest",
      "kind": "repository",
      "locator": "path:inputs/snapshots/candidate-manifest.json",
      "digest": "sha256:7b469eb2c9d1f847af11bf0b487e43c8183ee4ca0af1360fb0071ee8b3d2d3c1",
      "bytes": 20748,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/candidate-manifest.json"
    },
    {
      "sourceId": "context.checkpoint",
      "kind": "repository",
      "locator": "path:inputs/snapshots/checkpoint.json",
      "digest": "sha256:7e7919208dd99d5c921636ce45b4c7e15f80369d885b8f0a221e67808d62344c",
      "bytes": 741,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/checkpoint.json"
    },
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s02-compiler-contract.md",
      "digest": "sha256:ab2c0f09a38e5de51f14c6af1c912bbc37f5ec8c27bd589273202741c94297b9",
      "bytes": 36886,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s02-compiler-contract.md"
    },
    {
      "sourceId": "context.debug-notes",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s08-debug-notes.md",
      "digest": "sha256:08c8b7b034bad04be026ce1bd925e9888b4102858652f547ce656cecb0280f59",
      "bytes": 66724,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s08-debug-notes.md"
    },
    {
      "sourceId": "context.git-environment-child",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s51-git-environment-child.mjs",
      "digest": "sha256:83e0b59f3ce6a19df093ff1fb3061d078f533ae21980a7d264f198a21eb49e6e",
      "bytes": 1112,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s51-git-environment-child.mjs"
    },
    {
      "sourceId": "context.git-loader-fixture",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s21-git-loader-fixture.mjs",
      "digest": "sha256:3d2f38afc10104ba603f6a7e998ad4946a00b5ad3c0432b8d0004b7d6e4a69d5",
      "bytes": 4249,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s21-git-loader-fixture.mjs"
    },
    {
      "sourceId": "context.implementation-notes",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s10-implementation-notes.md",
      "digest": "sha256:9e606a51cc39d9bfeeac4a93bdd8a6fc1e84fc75b59707b64a44280b6948fd8d",
      "bytes": 45396,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s10-implementation-notes.md"
    },
    {
      "sourceId": "context.lifecycle-helper",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s22-lifecycle-helper.mjs",
      "digest": "sha256:b193a75b5bf9189177f7743c6d250648e3efab2cacb96bc51533cce65b327122",
      "bytes": 77159,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s22-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.lifecycle-test",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s25-lifecycle-test.mjs",
      "digest": "sha256:1062e00786f4fdaaf5aa61a93a7f7f0759e09b49c55532a26c91edfcd1270fa7",
      "bytes": 10294,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s25-lifecycle-test.mjs"
    },
    {
      "sourceId": "context.milestone",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s13-milestone.md",
      "digest": "sha256:b366b2f55716661d6fce4437e7fd4bb44e0e174527daac62b33416df1e09da58",
      "bytes": 14911,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s13-milestone.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s15-package.json",
      "digest": "sha256:9c8e1e3bde18439a6199f0752b7dad1e69fdf713ffac33597d5119d1c26a67fa",
      "bytes": 4043,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s15-package.json"
    },
    {
      "sourceId": "context.prior-independent-assessment",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s40-prior-independent-assessment.md",
      "digest": "sha256:55a52e533d612fa4e75d36374d6d5f1d4c83dcf419c6ecc889f55d9f4456e6a3",
      "bytes": 1005,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s40-prior-independent-assessment.md"
    },
    {
      "sourceId": "context.prior-independent-fix",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s39-prior-independent-fix.json",
      "digest": "sha256:975bce5edc9937a3b266e1e072dea09e607bf653f2b0f8e7bcc261bdcde95c15",
      "bytes": 10421,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s39-prior-independent-fix.json"
    },
    {
      "sourceId": "context.r32-correction",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s41-r32-correction.md",
      "digest": "sha256:e3aafa729191306119bd12ec03dc005156e6dff63e2c4077b3a07402cb75bbb8",
      "bytes": 2376,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s41-r32-correction.md"
    },
    {
      "sourceId": "context.r34-order-correction",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s42-r34-order-correction.md",
      "digest": "sha256:c188b951428e7a6fe2e7202b6eec5bf49cf3a9072186b8d42cf2dcfab483d6a7",
      "bytes": 2505,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s42-r34-order-correction.md"
    },
    {
      "sourceId": "context.r35-attempt",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s43-r35-attempt.md",
      "digest": "sha256:ddfb33a54c6c313cdf7f7502b029610d45f639f6dc18519724e496e7ce763ac4",
      "bytes": 2375,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s43-r35-attempt.md"
    },
    {
      "sourceId": "context.r35-review-completion",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s45-r35-review-completion.json",
      "digest": "sha256:3a79f21e5c16ac5b45837a8785ed3337e8a7614826c66ba1037483e45415905d",
      "bytes": 1432,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s45-r35-review-completion.json"
    },
    {
      "sourceId": "context.r35-review-verification",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s46-r35-review-verification.json",
      "digest": "sha256:8632ab22b069b74d6a09a0dfc4b4b53f26e267c7d0d801f8daf7af07af62e4be",
      "bytes": 1678,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s46-r35-review-verification.json"
    },
    {
      "sourceId": "context.r35-timeout",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s44-r35-timeout.md",
      "digest": "sha256:7a1f0304cdaef9a0ce3c7853d1ca1b3cf1e99f532fc3e63a95afa08fb15eceb0",
      "bytes": 1918,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s44-r35-timeout.md"
    },
    {
      "sourceId": "context.r36-gate-receipt",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s48-r36-gate-receipt.json",
      "digest": "sha256:27d7fe234f8b1201e0b0f2b8079dcfea439e6e0527822a7b11244a72927589d8",
      "bytes": 2296,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s48-r36-gate-receipt.json"
    },
    {
      "sourceId": "context.r36-gate-stderr",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s50-r36-gate-stderr.log",
      "digest": "sha256:00ce84e8736d7583a9716c2cc28900f92401a907f381c72e074578739408805e",
      "bytes": 19492,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s50-r36-gate-stderr.log"
    },
    {
      "sourceId": "context.r36-gate-stdout",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s49-r36-gate-stdout.log",
      "digest": "sha256:76b48df2f50ebed0921d55c0a2ada36abfb30362c5c3bfacc4a478dd521a6f81",
      "bytes": 37597,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s49-r36-gate-stdout.log"
    },
    {
      "sourceId": "context.r36-retirement",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s47-r36-retirement.md",
      "digest": "sha256:2312a6360350f8427cfb8bb637f432b1a886c76ccd753b45de48ac9f3d0e19ab",
      "bytes": 2118,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s47-r36-retirement.md"
    },
    {
      "sourceId": "context.r37-review-assessment",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s56-r37-review-assessment.md",
      "digest": "sha256:0635a96f74cff0576691b63ccde0e37f41e3c6e4f4cd5b02eefa1e7622a8d9a7",
      "bytes": 991,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s56-r37-review-assessment.md"
    },
    {
      "sourceId": "context.r37-review-bindings",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s55-r37-review-bindings.json",
      "digest": "sha256:90ece6a8be3688482a2872bbda4a63046ed9f8c56d603b2a9f40b9d1d14ad7ee",
      "bytes": 1744,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s55-r37-review-bindings.json"
    },
    {
      "sourceId": "context.r37-review-completion",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s53-r37-review-completion.json",
      "digest": "sha256:cc88b0fddf78230255308eff08b05d5965967f19de71497020b2ba7e7345e559",
      "bytes": 1573,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s53-r37-review-completion.json"
    },
    {
      "sourceId": "context.r37-review-handoff",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s57-r37-review-handoff.json.b64",
      "digest": "sha256:fbbe0fa42daf0f000e2a63ec2e1f648313c1d1ecb8e31fd502ab35a3ca640f48",
      "bytes": 13477,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s57-r37-review-handoff.json.b64"
    },
    {
      "sourceId": "context.r37-review-readme",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s52-r37-review-readme.md",
      "digest": "sha256:82f7db7c55cbd89126f31fe56ac3b33eb452f28c72e0613fc946a5668e4af43b",
      "bytes": 919,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s52-r37-review-readme.md"
    },
    {
      "sourceId": "context.r37-review-verification",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s54-r37-review-verification.json",
      "digest": "sha256:c66bad0e1f83f7c60e15ef3261f537b651a3415b2d8b02a9f428a40bb0c41942",
      "bytes": 1677,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s54-r37-review-verification.json"
    },
    {
      "sourceId": "context.r38-attempt-history",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s60-r38-attempt-history.md",
      "digest": "sha256:9c137ef81e751b423cea63a3168dc4c7f7e573f77208e4fa76731bc0434694fe",
      "bytes": 3088,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s60-r38-attempt-history.md"
    },
    {
      "sourceId": "context.r38-correction-contract",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s58-r38-correction-contract.md",
      "digest": "sha256:d84311a830828da86c2254bb9a62c862e92e9b0a105470dc0e2b23b1a383e63b",
      "bytes": 1705,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s58-r38-correction-contract.md"
    },
    {
      "sourceId": "context.r38-mutable-pass",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s62-r38-mutable-pass.json",
      "digest": "sha256:7f262085ef397ca016976dec82656be93980cb2423b4061992f366d0a45c04b9",
      "bytes": 1431,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s62-r38-mutable-pass.json"
    },
    {
      "sourceId": "context.r38-status-failure",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s61-r38-status-failure.json",
      "digest": "sha256:9a5af9299f3e239e18ed80446963676b0c632c54538d094dbd8e13a941d3a586",
      "bytes": 1321,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s61-r38-status-failure.json"
    },
    {
      "sourceId": "context.r38-test-plan",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s59-r38-test-plan.md",
      "digest": "sha256:de5db1ea4aa810864d6aa70b2b84afba7045ad8a9bee0ba3a893753b3638c318",
      "bytes": 1336,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s59-r38-test-plan.md"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s17-release-gate.mjs",
      "digest": "sha256:43ab705aea0000fcfbc73729bb5be91bd1bce948fd63c26e92d697ce97ca4cb6",
      "bytes": 33716,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s17-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s24-release-gate-tests.mjs",
      "digest": "sha256:6b592419f5ffecb7aa0c13f0776d3c9ac9d0b1b688658025ebad7d30577fd490",
      "bytes": 44542,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s24-release-gate-tests.mjs"
    },
    {
      "sourceId": "context.release-review-harness",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s19-release-review-harness.mjs",
      "digest": "sha256:d83400e93b23a324f6cf6067af887831bae1d5ea7c2043c08c8993cd1d9eb14d",
      "bytes": 130690,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s19-release-review-harness.mjs"
    },
    {
      "sourceId": "context.release-review-parent",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s18-release-review-parent.mjs",
      "digest": "sha256:433c8840bb18d377212400dbe32d3c2b479c09c1ab0bc0abf8c9752e6b8e8f62",
      "bytes": 102629,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s18-release-review-parent.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s23-release-review-tests.mjs",
      "digest": "sha256:70fa46f78afcc443d041c1d4a606150338d130e530e1f423d11988e9f02c816e",
      "bytes": 73101,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s23-release-review-tests.mjs"
    },
    {
      "sourceId": "context.release-review-verifier",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s20-release-review-verifier.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s20-release-review-verifier.mjs"
    },
    {
      "sourceId": "context.review",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s11-review.md",
      "digest": "sha256:11cd9e100f64478c6eda4156c7025d937966e45afc350467a0f4a05354b9fbd8",
      "bytes": 17878,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s11-review.md"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:inputs/review-contract.md",
      "digest": "sha256:49086dd3009b779cadfbf21563820248fbf7031ed1d4909e3c00ea4f6ac689cc",
      "bytes": 2685,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/review-contract.md"
    },
    {
      "sourceId": "context.root-cause",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s09-root-cause.md",
      "digest": "sha256:8969a1b50f098e3534caa85ec4a331eedc78abf364095139cb80d3feb2c2c93a",
      "bytes": 53012,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s09-root-cause.md"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s06-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s06-run-contract.md"
    },
    {
      "sourceId": "context.source-delta",
      "kind": "repository",
      "locator": "path:inputs/snapshots/r38-source.patch",
      "digest": "sha256:60eb81c126ea31ef1c6913380941bb73adee4c1763ea8c49e9ea065c6d55cae0",
      "bytes": 2262962,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/r38-source.patch"
    },
    {
      "sourceId": "context.tasks",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s12-tasks.md",
      "digest": "sha256:0ebe4ed36a356ca94cb6bd0b527508d6681ebd8e9742dff6b73cce5d61304241",
      "bytes": 3295,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s12-tasks.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s07-test-plan.md",
      "digest": "sha256:43cc4196201169840dcedeaceac85b44a28f98b57d11ccc79bc3c8c4322d36ba",
      "bytes": 17586,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s07-test-plan.md"
    },
    {
      "sourceId": "context.v11-approval",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s30-v11-approval.json",
      "digest": "sha256:590606176235d6ae249c0ece8598c77654aa045307a5484ce9a8636cabf5488d",
      "bytes": 195,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s30-v11-approval.json"
    },
    {
      "sourceId": "context.v11-authorization",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s31-v11-authorization.json",
      "digest": "sha256:f1c82e979257bc55022b4b63a2432d262ae61d83faf089d0feac275698d9054b",
      "bytes": 985,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s31-v11-authorization.json"
    },
    {
      "sourceId": "context.v11-compilation",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s28-v11-compilation.json",
      "digest": "sha256:f1585556e14c39a7717c2bbe25ab310a1fe6af3233a420313add2317662a5c44",
      "bytes": 319458,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s28-v11-compilation.json"
    },
    {
      "sourceId": "context.v11-goal",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s27-v11-goal.json",
      "digest": "sha256:9236d40553392c5f710acf117ded9f3b4af681557f24cf2a23d389fd8b58c675",
      "bytes": 103178,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s27-v11-goal.json"
    },
    {
      "sourceId": "context.v11-report",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s29-v11-report.json",
      "digest": "sha256:863b6dfa8063b27b52778fb71f1f155e541fc3ed4c21166e6dece631bd02b410",
      "bytes": 25926,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s29-v11-report.json"
    },
    {
      "sourceId": "context.v11-runner",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s26-v11-runner.mjs",
      "digest": "sha256:0b9079f93dd8efc79a1fd920d621a71520649c7b5749deef306b5dffd645a19e",
      "bytes": 58302,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s26-v11-runner.mjs"
    },
    {
      "sourceId": "context.v12-adr",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s04-v12-adr.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s04-v12-adr.md"
    },
    {
      "sourceId": "context.v12-architecture",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s05-v12-architecture.md",
      "digest": "sha256:861a5a5471ecf8463cd8fa9e4035acb3a5c9a16f7e0c65385ba29fa84509d3dc",
      "bytes": 26111,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s05-v12-architecture.md"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s03-v12-spec.md",
      "digest": "sha256:560d60663e144614ea9226a2cc15d2c5665772d12edf7a9756159827db632ac2",
      "bytes": 6031,
      "purposes": [
        "Authenticate and independently audit the exact Revision 38 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r38"
      ],
      "readScope": "inputs/snapshots/s03-v12-spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "inputs/aggregate/aggregate-receipt.json",
        "inputs/aggregate/npm-verify.stderr.log",
        "inputs/aggregate/npm-verify.stdout.log",
        "inputs/review-contract.md",
        "inputs/snapshots/candidate-manifest.json",
        "inputs/snapshots/checkpoint.json",
        "inputs/snapshots/r38-source.patch",
        "inputs/snapshots/s01-agent-contract.md",
        "inputs/snapshots/s02-compiler-contract.md",
        "inputs/snapshots/s03-v12-spec.md",
        "inputs/snapshots/s04-v12-adr.md",
        "inputs/snapshots/s05-v12-architecture.md",
        "inputs/snapshots/s06-run-contract.md",
        "inputs/snapshots/s07-test-plan.md",
        "inputs/snapshots/s08-debug-notes.md",
        "inputs/snapshots/s09-root-cause.md",
        "inputs/snapshots/s10-implementation-notes.md",
        "inputs/snapshots/s11-review.md",
        "inputs/snapshots/s12-tasks.md",
        "inputs/snapshots/s13-milestone.md",
        "inputs/snapshots/s14-active-context.md",
        "inputs/snapshots/s15-package.json",
        "inputs/snapshots/s16-gitattributes",
        "inputs/snapshots/s17-release-gate.mjs",
        "inputs/snapshots/s18-release-review-parent.mjs",
        "inputs/snapshots/s19-release-review-harness.mjs",
        "inputs/snapshots/s20-release-review-verifier.mjs",
        "inputs/snapshots/s21-git-loader-fixture.mjs",
        "inputs/snapshots/s22-lifecycle-helper.mjs",
        "inputs/snapshots/s23-release-review-tests.mjs",
        "inputs/snapshots/s24-release-gate-tests.mjs",
        "inputs/snapshots/s25-lifecycle-test.mjs",
        "inputs/snapshots/s26-v11-runner.mjs",
        "inputs/snapshots/s27-v11-goal.json",
        "inputs/snapshots/s28-v11-compilation.json",
        "inputs/snapshots/s29-v11-report.json",
        "inputs/snapshots/s30-v11-approval.json",
        "inputs/snapshots/s31-v11-authorization.json",
        "inputs/snapshots/s32-audit-goal.json",
        "inputs/snapshots/s33-audit-compilation.json",
        "inputs/snapshots/s34-audit-report.json",
        "inputs/snapshots/s35-audit-approval.json",
        "inputs/snapshots/s36-audit-receipt.json",
        "inputs/snapshots/s37-audit-binder.json",
        "inputs/snapshots/s38-audit-semantic.json",
        "inputs/snapshots/s39-prior-independent-fix.json",
        "inputs/snapshots/s40-prior-independent-assessment.md",
        "inputs/snapshots/s41-r32-correction.md",
        "inputs/snapshots/s42-r34-order-correction.md",
        "inputs/snapshots/s43-r35-attempt.md",
        "inputs/snapshots/s44-r35-timeout.md",
        "inputs/snapshots/s45-r35-review-completion.json",
        "inputs/snapshots/s46-r35-review-verification.json",
        "inputs/snapshots/s47-r36-retirement.md",
        "inputs/snapshots/s48-r36-gate-receipt.json",
        "inputs/snapshots/s49-r36-gate-stdout.log",
        "inputs/snapshots/s50-r36-gate-stderr.log",
        "inputs/snapshots/s51-git-environment-child.mjs",
        "inputs/snapshots/s52-r37-review-readme.md",
        "inputs/snapshots/s53-r37-review-completion.json",
        "inputs/snapshots/s54-r37-review-verification.json",
        "inputs/snapshots/s55-r37-review-bindings.json",
        "inputs/snapshots/s56-r37-review-assessment.md",
        "inputs/snapshots/s57-r37-review-handoff.json.b64",
        "inputs/snapshots/s58-r38-correction-contract.md",
        "inputs/snapshots/s59-r38-test-plan.md",
        "inputs/snapshots/s60-r38-attempt-history.md",
        "inputs/snapshots/s61-r38-status-failure.json",
        "inputs/snapshots/s62-r38-mutable-pass.json"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "inputs/aggregate/aggregate-receipt.json",
          "inputs/aggregate/npm-verify.stderr.log",
          "inputs/aggregate/npm-verify.stdout.log",
          "inputs/review-contract.md",
          "inputs/snapshots/candidate-manifest.json",
          "inputs/snapshots/checkpoint.json",
          "inputs/snapshots/r38-source.patch",
          "inputs/snapshots/s01-agent-contract.md",
          "inputs/snapshots/s02-compiler-contract.md",
          "inputs/snapshots/s03-v12-spec.md",
          "inputs/snapshots/s04-v12-adr.md",
          "inputs/snapshots/s05-v12-architecture.md",
          "inputs/snapshots/s06-run-contract.md",
          "inputs/snapshots/s07-test-plan.md",
          "inputs/snapshots/s08-debug-notes.md",
          "inputs/snapshots/s09-root-cause.md",
          "inputs/snapshots/s10-implementation-notes.md",
          "inputs/snapshots/s11-review.md",
          "inputs/snapshots/s12-tasks.md",
          "inputs/snapshots/s13-milestone.md",
          "inputs/snapshots/s14-active-context.md",
          "inputs/snapshots/s15-package.json",
          "inputs/snapshots/s16-gitattributes",
          "inputs/snapshots/s17-release-gate.mjs",
          "inputs/snapshots/s18-release-review-parent.mjs",
          "inputs/snapshots/s19-release-review-harness.mjs",
          "inputs/snapshots/s20-release-review-verifier.mjs",
          "inputs/snapshots/s21-git-loader-fixture.mjs",
          "inputs/snapshots/s22-lifecycle-helper.mjs",
          "inputs/snapshots/s23-release-review-tests.mjs",
          "inputs/snapshots/s24-release-gate-tests.mjs",
          "inputs/snapshots/s25-lifecycle-test.mjs",
          "inputs/snapshots/s26-v11-runner.mjs",
          "inputs/snapshots/s27-v11-goal.json",
          "inputs/snapshots/s28-v11-compilation.json",
          "inputs/snapshots/s29-v11-report.json",
          "inputs/snapshots/s30-v11-approval.json",
          "inputs/snapshots/s31-v11-authorization.json",
          "inputs/snapshots/s32-audit-goal.json",
          "inputs/snapshots/s33-audit-compilation.json",
          "inputs/snapshots/s34-audit-report.json",
          "inputs/snapshots/s35-audit-approval.json",
          "inputs/snapshots/s36-audit-receipt.json",
          "inputs/snapshots/s37-audit-binder.json",
          "inputs/snapshots/s38-audit-semantic.json",
          "inputs/snapshots/s39-prior-independent-fix.json",
          "inputs/snapshots/s40-prior-independent-assessment.md",
          "inputs/snapshots/s41-r32-correction.md",
          "inputs/snapshots/s42-r34-order-correction.md",
          "inputs/snapshots/s43-r35-attempt.md",
          "inputs/snapshots/s44-r35-timeout.md",
          "inputs/snapshots/s45-r35-review-completion.json",
          "inputs/snapshots/s46-r35-review-verification.json",
          "inputs/snapshots/s47-r36-retirement.md",
          "inputs/snapshots/s48-r36-gate-receipt.json",
          "inputs/snapshots/s49-r36-gate-stdout.log",
          "inputs/snapshots/s50-r36-gate-stderr.log",
          "inputs/snapshots/s51-git-environment-child.mjs",
          "inputs/snapshots/s52-r37-review-readme.md",
          "inputs/snapshots/s53-r37-review-completion.json",
          "inputs/snapshots/s54-r37-review-verification.json",
          "inputs/snapshots/s55-r37-review-bindings.json",
          "inputs/snapshots/s56-r37-review-assessment.md",
          "inputs/snapshots/s57-r37-review-handoff.json.b64",
          "inputs/snapshots/s58-r38-correction-contract.md",
          "inputs/snapshots/s59-r38-test-plan.md",
          "inputs/snapshots/s60-r38-attempt-history.md",
          "inputs/snapshots/s61-r38-status-failure.json",
          "inputs/snapshots/s62-r38-mutable-pass.json"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "node",
          "powershell",
          "rg"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not edit files, install packages, use network access, mutate Git state, launch descendants, rerun the aggregate or candidate gate, alter evidence, claim release readiness, approve merge, or perform host enforcement."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.review.release-candidate.r38",
      "criterion": "The Revision 37 retained-Git-authority finding is closed by exact Revision 38 source and evidence, and no release-blocking bypass remains in the bounded review scope.",
      "requirementId": "evidence.review.release-candidate.r38",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate every source, resolve every closed review point, search for bypasses, and return one exact pass or causal non-pass handoff.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-v12-r38-release-candidate-review.md"
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
    "Do not claim release readiness, hosted CI, merge approval, or host enforcement.",
    "Remain read-only and report every defect without changing source or evidence.",
    "Resolve every closed review point and search for bypasses before returning pass.",
    "Return only the exact generated SpecialistAgentHandoff JSON object.",
    "Stop before semantic review if any declared snapshot byte count or digest fails.",
    "Treat tests, receipts, prior reviews, and integration-owner statements as evidence only."
  ],
  "contentDigest": "sha256:c7785a9f27a55df61dd08c72f742cefd941c25766196301d3cb9c0d33113dc54"
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
    "id": "v12.ide-run-loop.review.release-candidate-r38",
    "revision": 38,
    "digest": "sha256:b1cf1d058c6645bd7b2d6e0c4ffb3cce465368e1c714e3de6fb5bbc872632fb2"
  },
  "agent": {
    "id": "agent.61a70f9db00f0cd7fba4602c9d45ca5f5cde0b6d3f82542a360f1610ceab7186",
    "blueprintDigest": "sha256:c7785a9f27a55df61dd08c72f742cefd941c25766196301d3cb9c0d33113dc54"
  },
  "compilationDigest": "sha256:6c671af037cabfdf9e97da3e97d141a67134e0a73e35d3b733ddd0c49c78a66b",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.release-candidate.r38"
  ],
  "artifacts": [
    {
      "name": "independent-v12-r38-release-candidate-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.release-candidate.r38",
      "requirementId": "evidence.review.release-candidate.r38",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-v12-r38-release-candidate-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
