# Specialist Contract: agent.1095666c58c94736567b639a2506890d1b21728cf2bbafbbc8b6fefa9ecf7b4c

Compilation: `sha256:6bf6b7a203e71f17da856c9317bb455106f3b94762588088f3ac7a8e355aae12`
Blueprint: `sha256:f21f81124bf84d8079a2948c4f24f5deac9e370d8f02911864aba55b5f301f25`

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
  "id": "agent.1095666c58c94736567b639a2506890d1b21728cf2bbafbbc8b6fefa9ecf7b4c",
  "goalId": "v12.ide-run-loop.review.release-candidate-r37",
  "goalRevision": 37,
  "goalDigest": "sha256:3a21ffa1eb2c188d0d7d570a055b5f53355c72389c57ddf8132775b638cf9cc8",
  "candidateId": "team.7fb069d06b5d9b4a8fd7cf17b2d7391dbb5ae103114a6d952bdc9056940a24ca",
  "workUnitIds": [
    "review.release-candidate.r37"
  ],
  "objectives": [
    {
      "workUnitId": "review.release-candidate.r37",
      "objective": "Authenticate and independently audit exact Revision 37 and its aggregate against the closed review contract; trace the inherited-Git-context correction through the real fixture and concurrent tests, search for bypasses, and return one bounded verdict."
    }
  ],
  "modules": [
    {
      "id": "review.release-candidate",
      "action": "Authenticate immutable inputs; trace source, package, Git environment, process isolation, cleanup, evidence, and host boundaries; search adversarially; return one exact review handoff.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "AuthenticatedRevision37CandidateEvidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision37ReleaseVerdict"
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
      "digest": "sha256:72fb6627b42ed14a9b5e90c83c39c54ad4c1b10d5e536b8348f891dfe1e98676",
      "bytes": 43956,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s01-agent-contract.md"
    },
    {
      "sourceId": "context.aggregate-receipt",
      "kind": "repository",
      "locator": "path:inputs/aggregate/aggregate-receipt.json",
      "digest": "sha256:5a7af34bea582d1b58317c06044fb057ab394892c3ca0f2a2f323ac328c2064e",
      "bytes": 1227,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/aggregate/npm-verify.stderr.log"
    },
    {
      "sourceId": "context.aggregate-stdout",
      "kind": "repository",
      "locator": "path:inputs/aggregate/npm-verify.stdout.log",
      "digest": "sha256:eb31a442b34803536dfbff73308a9a343b32021e0cd8eeb342bb3c8cafaf42cc",
      "bytes": 303641,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s38-audit-semantic.json"
    },
    {
      "sourceId": "context.candidate-manifest",
      "kind": "repository",
      "locator": "path:inputs/snapshots/candidate-manifest.json",
      "digest": "sha256:3fa11de91be35c9aaab25aff4b5555f98a7bdcd8750e0d11ec15a1dc3212ac78",
      "bytes": 16356,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/candidate-manifest.json"
    },
    {
      "sourceId": "context.checkpoint",
      "kind": "repository",
      "locator": "path:inputs/snapshots/checkpoint.json",
      "digest": "sha256:c00b0696bcb1d57c19646b4188afc349dd36417d751aa22856e9e7ce354d2995",
      "bytes": 741,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s02-compiler-contract.md"
    },
    {
      "sourceId": "context.debug-notes",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s08-debug-notes.md",
      "digest": "sha256:7d77613d1130ceb1a2a797171dcbaa3e105a2691ccbfde2f9b0c67dae7bc2760",
      "bytes": 65456,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s08-debug-notes.md"
    },
    {
      "sourceId": "context.git-loader-fixture",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s21-git-loader-fixture.mjs",
      "digest": "sha256:dc93d68bce687b5cba96c5dd62be8e38042557ac985a9cff2e82a3c06f97dee7",
      "bytes": 4143,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s21-git-loader-fixture.mjs"
    },
    {
      "sourceId": "context.implementation-notes",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s10-implementation-notes.md",
      "digest": "sha256:ad0a1fc97fbb2ef977631fcc94411b3181428e552a7aa356b95bca75677d31bb",
      "bytes": 43885,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s25-lifecycle-test.mjs"
    },
    {
      "sourceId": "context.milestone",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s13-milestone.md",
      "digest": "sha256:0983f9633c8d0265ee742d4ca15f2fc1fa7281af57d8795678ec634bd491516e",
      "bytes": 14122,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s49-r36-gate-stdout.log"
    },
    {
      "sourceId": "context.r36-retirement",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s47-r36-retirement.md",
      "digest": "sha256:e90b2ab5329ec72df8c230501d85a6468923cea28f55b71972792d3e4efcc108",
      "bytes": 1934,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s47-r36-retirement.md"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s17-release-gate.mjs",
      "digest": "sha256:43ab705aea0000fcfbc73729bb5be91bd1bce948fd63c26e92d697ce97ca4cb6",
      "bytes": 33716,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s18-release-review-parent.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s23-release-review-tests.mjs",
      "digest": "sha256:3f6c103e6f4fe57ec7a9c59b70b29df4037d704d59c0066830d7113940d1f65e",
      "bytes": 70459,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s20-release-review-verifier.mjs"
    },
    {
      "sourceId": "context.review",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s11-review.md",
      "digest": "sha256:389dfa7c4258db5faad11ac82b624d5988a5da4536819ad812743d3d06aeb187",
      "bytes": 16703,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s11-review.md"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:inputs/review-contract.md",
      "digest": "sha256:9ddecfcdeca897f966618699556fd4eedeca78a6d938faf132079d45fc7837e6",
      "bytes": 2171,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/review-contract.md"
    },
    {
      "sourceId": "context.root-cause",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s09-root-cause.md",
      "digest": "sha256:9cb79023b2d65980120e75faf98097d94d180f91df1b83a96cfaf870226be3c7",
      "bytes": 52614,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s06-run-contract.md"
    },
    {
      "sourceId": "context.source-delta",
      "kind": "repository",
      "locator": "path:inputs/snapshots/r37-source.patch",
      "digest": "sha256:69c0ef1e836fa14f788cc32a5e448a7b3b4d9371cfca366726fad6e57deadad3",
      "bytes": 81923,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/r37-source.patch"
    },
    {
      "sourceId": "context.tasks",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s12-tasks.md",
      "digest": "sha256:68f60f59e048e94a86f2ae51bcce1027ab79a470ab69a9ebdc67f77ef73a67e8",
      "bytes": 2865,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
      ],
      "readScope": "inputs/snapshots/s12-tasks.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s07-test-plan.md",
      "digest": "sha256:e12a1625be147d8344f89ab7d81767c3d9d96424b83547ddd12085c080387cde",
      "bytes": 17088,
      "purposes": [
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "Authenticate and independently audit the exact Revision 37 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r37"
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
        "inputs/snapshots/r37-source.patch",
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
        "inputs/snapshots/s50-r36-gate-stderr.log"
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
          "inputs/snapshots/r37-source.patch",
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
          "inputs/snapshots/s50-r36-gate-stderr.log"
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
      "criterionId": "criterion.review.release-candidate.r37",
      "criterion": "The Revision 36 inherited-Git-context cause is closed by exact Revision 37 source and evidence, and no release-blocking bypass remains in the bounded review scope.",
      "requirementId": "evidence.review.release-candidate.r37",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate every source, resolve every closed review point, search for bypasses, and return one exact pass or causal non-pass handoff.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-v12-r37-release-candidate-review.md"
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
  "contentDigest": "sha256:f21f81124bf84d8079a2948c4f24f5deac9e370d8f02911864aba55b5f301f25"
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
    "id": "v12.ide-run-loop.review.release-candidate-r37",
    "revision": 37,
    "digest": "sha256:3a21ffa1eb2c188d0d7d570a055b5f53355c72389c57ddf8132775b638cf9cc8"
  },
  "agent": {
    "id": "agent.1095666c58c94736567b639a2506890d1b21728cf2bbafbbc8b6fefa9ecf7b4c",
    "blueprintDigest": "sha256:f21f81124bf84d8079a2948c4f24f5deac9e370d8f02911864aba55b5f301f25"
  },
  "compilationDigest": "sha256:6bf6b7a203e71f17da856c9317bb455106f3b94762588088f3ac7a8e355aae12",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.release-candidate.r37"
  ],
  "artifacts": [
    {
      "name": "independent-v12-r37-release-candidate-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.release-candidate.r37",
      "requirementId": "evidence.review.release-candidate.r37",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-v12-r37-release-candidate-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
