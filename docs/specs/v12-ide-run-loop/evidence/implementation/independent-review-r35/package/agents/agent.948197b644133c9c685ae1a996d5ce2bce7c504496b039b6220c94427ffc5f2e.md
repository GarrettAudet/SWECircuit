# Specialist Contract: agent.948197b644133c9c685ae1a996d5ce2bce7c504496b039b6220c94427ffc5f2e

Compilation: `sha256:177a6f185b2ef092a6bab4571b4ca774d8b3d36b4f9cfd2ceb6054db7cce1619`
Blueprint: `sha256:9e1b7d21f498d1511692ff893ee2fd1af0bd40fff20695c1077594e10afe0fb1`

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
  "id": "agent.948197b644133c9c685ae1a996d5ce2bce7c504496b039b6220c94427ffc5f2e",
  "goalId": "v12.ide-run-loop.review.release-candidate-r35",
  "goalRevision": 35,
  "goalDigest": "sha256:5f464ee14998b9656ca6341b6947ccdb45891563f6b78ce5ca0a46689f2e14d9",
  "candidateId": "team.85efd06970cee0e9655305ee040805554145a69398d2d182b835342b08eb71c0",
  "workUnitIds": [
    "review.release-candidate.r35"
  ],
  "objectives": [
    {
      "workUnitId": "review.release-candidate.r35",
      "objective": "Authenticate and independently audit exact Revision 35 and its aggregate against the closed review contract; trace every correction through production and tests, search for bypasses, and return one bounded verdict."
    }
  ],
  "modules": [
    {
      "id": "review.release-candidate",
      "action": "Authenticate immutable inputs; trace source, package, approval, Git, process, cleanup, evidence, and host boundaries; search adversarially; return one exact review handoff.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "AuthenticatedRevision35CandidateEvidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision35ReleaseVerdict"
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
      "digest": "sha256:eb93bc46381a2c7ae047ab09315e8c1da0cf3b3946aa490a08b36a4501551304",
      "bytes": 42575,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s01-agent-contract.md"
    },
    {
      "sourceId": "context.aggregate-receipt",
      "kind": "repository",
      "locator": "path:inputs/aggregate/aggregate-receipt.json",
      "digest": "sha256:e99689f67208109c1470a02f742d324aa288b0fa05978337cdfe60d65f8f3917",
      "bytes": 1227,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/aggregate/npm-verify.stderr.log"
    },
    {
      "sourceId": "context.aggregate-stdout",
      "kind": "repository",
      "locator": "path:inputs/aggregate/npm-verify.stdout.log",
      "digest": "sha256:596c2eb77cec5b594d6d3163c5bda1f2c2b6f45bfd46307c62d12236bbbd40f7",
      "bytes": 303537,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s38-audit-semantic.json"
    },
    {
      "sourceId": "context.candidate-manifest",
      "kind": "repository",
      "locator": "path:inputs/snapshots/candidate-manifest.json",
      "digest": "sha256:68d9e0cbfc1a722a519104d9312c3ab053d91511b557968455be417539625d5d",
      "bytes": 14081,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/candidate-manifest.json"
    },
    {
      "sourceId": "context.checkpoint",
      "kind": "repository",
      "locator": "path:inputs/snapshots/checkpoint.json",
      "digest": "sha256:d23dbdde2babba29d21ba98cf7c82ca504e48677f92be6f4a146653fb69f8f4e",
      "bytes": 741,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s02-compiler-contract.md"
    },
    {
      "sourceId": "context.debug-notes",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s08-debug-notes.md",
      "digest": "sha256:ab03e7786a3709d5208f930e6db6f5c9ce2c243e75e2df724a8a7f41886daf04",
      "bytes": 63176,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s08-debug-notes.md"
    },
    {
      "sourceId": "context.git-loader-fixture",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s21-git-loader-fixture.mjs",
      "digest": "sha256:1953b69d6819d09776d5aa990999a0ad912da994b64b19d006d3bd56096b7499",
      "bytes": 3541,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s21-git-loader-fixture.mjs"
    },
    {
      "sourceId": "context.implementation-notes",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s10-implementation-notes.md",
      "digest": "sha256:1ba539833de91659eb901a12098d34cb21645656677ff4a7bfac9e526243cd15",
      "bytes": 42249,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s25-lifecycle-test.mjs"
    },
    {
      "sourceId": "context.milestone",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s13-milestone.md",
      "digest": "sha256:b1ba3bd0988bbb9766267851e92535741db1a0cd8c538468c489e775712c4e04",
      "bytes": 12714,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s43-r35-attempt.md"
    },
    {
      "sourceId": "context.r35-timeout",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s44-r35-timeout.md",
      "digest": "sha256:7a1f0304cdaef9a0ce3c7853d1ca1b3cf1e99f532fc3e63a95afa08fb15eceb0",
      "bytes": 1918,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s44-r35-timeout.md"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s17-release-gate.mjs",
      "digest": "sha256:43ab705aea0000fcfbc73729bb5be91bd1bce948fd63c26e92d697ce97ca4cb6",
      "bytes": 33716,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s18-release-review-parent.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s23-release-review-tests.mjs",
      "digest": "sha256:5d26e526f40e4322242a9aa34cad778eb5758a79a7ae54ed99782b05279ed0cf",
      "bytes": 69173,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s20-release-review-verifier.mjs"
    },
    {
      "sourceId": "context.review",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s11-review.md",
      "digest": "sha256:04f8b2e8aaf5cd1be7ddff521b340352eb81fd96786fcbd7744d03bcbb7b1df5",
      "bytes": 14973,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s11-review.md"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:inputs/review-contract.md",
      "digest": "sha256:9277412dbc50f3dd45ab8e764fd716e38147e2a2d72282d689c708cd66e12529",
      "bytes": 1880,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/review-contract.md"
    },
    {
      "sourceId": "context.root-cause",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s09-root-cause.md",
      "digest": "sha256:33e7194c1eac4030430d7a7b627da661b417d5630b4833b481f020eb5cf1f201",
      "bytes": 50362,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s06-run-contract.md"
    },
    {
      "sourceId": "context.source-delta",
      "kind": "repository",
      "locator": "path:inputs/snapshots/r35-source.patch",
      "digest": "sha256:0029fed16b75e9de2288c36f9ceba5675b1ec59bf4949a0dc089ac25f6256384",
      "bytes": 57519,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/r35-source.patch"
    },
    {
      "sourceId": "context.tasks",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s12-tasks.md",
      "digest": "sha256:16394e2639e3f0db92279ea823ea6e4dc85bf098954a5cbdec90a136a2b0ea11",
      "bytes": 2700,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
      ],
      "readScope": "inputs/snapshots/s12-tasks.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:inputs/snapshots/s07-test-plan.md",
      "digest": "sha256:974ddd1af7444f9be8ddacf1797470c774a861f68cf52bc970697f9a5ae1cdd8",
      "bytes": 14197,
      "purposes": [
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "Authenticate and independently audit the exact Revision 35 candidate and aggregate."
      ],
      "workUnitIds": [
        "review.release-candidate.r35"
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
        "inputs/snapshots/r35-source.patch",
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
        "inputs/snapshots/s44-r35-timeout.md"
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
          "inputs/snapshots/r35-source.patch",
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
          "inputs/snapshots/s44-r35-timeout.md"
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
      "criterionId": "criterion.review.release-candidate.r35",
      "criterion": "Every current pre-freeze cause is closed by exact candidate source and evidence, and no release-blocking bypass remains in the bounded review scope.",
      "requirementId": "evidence.review.release-candidate.r35",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate every source, resolve every closed review point, search for bypasses, and return one exact pass or causal non-pass handoff.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-v12-r35-release-candidate-review.md"
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
  "contentDigest": "sha256:9e1b7d21f498d1511692ff893ee2fd1af0bd40fff20695c1077594e10afe0fb1"
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
    "id": "v12.ide-run-loop.review.release-candidate-r35",
    "revision": 35,
    "digest": "sha256:5f464ee14998b9656ca6341b6947ccdb45891563f6b78ce5ca0a46689f2e14d9"
  },
  "agent": {
    "id": "agent.948197b644133c9c685ae1a996d5ce2bce7c504496b039b6220c94427ffc5f2e",
    "blueprintDigest": "sha256:9e1b7d21f498d1511692ff893ee2fd1af0bd40fff20695c1077594e10afe0fb1"
  },
  "compilationDigest": "sha256:177a6f185b2ef092a6bab4571b4ca774d8b3d36b4f9cfd2ceb6054db7cce1619",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.release-candidate.r35"
  ],
  "artifacts": [
    {
      "name": "independent-v12-r35-release-candidate-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.release-candidate.r35",
      "requirementId": "evidence.review.release-candidate.r35",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-v12-r35-release-candidate-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
