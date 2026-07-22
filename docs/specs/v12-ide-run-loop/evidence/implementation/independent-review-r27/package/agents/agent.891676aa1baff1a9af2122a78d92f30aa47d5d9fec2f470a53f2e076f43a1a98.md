# Specialist Contract: agent.891676aa1baff1a9af2122a78d92f30aa47d5d9fec2f470a53f2e076f43a1a98

Compilation: `sha256:8af9bdab4b384419310def12a09c0ebea455e86607ebee5274312709f5e7d5ac`
Blueprint: `sha256:e785c65f70036af6eb852d1cff2c1758f8bf9e80aa5e01a042cc9f38bf011279`

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
  "id": "agent.891676aa1baff1a9af2122a78d92f30aa47d5d9fec2f470a53f2e076f43a1a98",
  "goalId": "v12.ide-run-loop.review.authenticated-typescript-release-correction-r27",
  "goalRevision": 1,
  "goalDigest": "sha256:c9de7f414930297ffda5c85b524499deb022a39c9aa2895e341896eb0eb31080",
  "candidateId": "team.72270f55194b979783747beceb85501b145c1246df2582dbeee19befc6cf76f7",
  "workUnitIds": [
    "review.authenticated-typescript-release-correction.r27"
  ],
  "objectives": [
    {
      "workUnitId": "review.authenticated-typescript-release-correction.r27",
      "objective": "Authenticate and independently audit exact Revision 27 against the closed contract and search for TypeScript authority, path, alias, hard-link, mutation, package, lifecycle, evidence, or test-quality defects."
    }
  ],
  "modules": [
    {
      "id": "review.authenticated-typescript-release-correction",
      "action": "Trace the exact compiler binding through build, typecheck, candidate gate, installed consumer, tests, lifecycle, and evidence; search for bypasses; return one bounded verdict.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "AuthenticatedRevision26FindingAndRevision27Evidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision27Verdict"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/agent-contract.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/agent-contract.md"
    },
    {
      "sourceId": "context.aggregate-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/aggregate-verification-receipt.json",
      "digest": "sha256:5e8db7e1c1bd279918b06c1df572c0d8ef765492cb48df672e7b88dae54b3aa2",
      "bytes": 1145,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/aggregate-verification-receipt.json"
    },
    {
      "sourceId": "context.biome",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-biome.json",
      "digest": "sha256:46039f3c3c78511addc1b752193e1b795faaf4c227eae752cf32a29f3c2f866a",
      "bytes": 850,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-biome.json"
    },
    {
      "sourceId": "context.checkpoint",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/review-checkpoint.json",
      "digest": "sha256:161b6d1f0f124dc3eefb88ccb8801c622d119a7cb108951f4d3b4b019fa20280",
      "bytes": 354,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/review-checkpoint.json"
    },
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-correction-contract.md",
      "digest": "sha256:6fb79ac323d72f00e765c6ccd418f4e15402d968d3e7dd956c969d754ae4d016",
      "bytes": 3152,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-correction-contract.md"
    },
    {
      "sourceId": "context.git-boundary-child",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-git-environment-boundary-child.mjs",
      "digest": "sha256:7a09f14fc57188ae3352738b714dac5d184f825ab0b62607ce145ce743abb2b5",
      "bytes": 3025,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-git-environment-boundary-child.mjs"
    },
    {
      "sourceId": "context.lifecycle-diagnosis",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-lifecycle-attempt-1-diagnosis.md",
      "digest": "sha256:75b6ab770304a7f17d7a114ed02faebb2ed864e45aad7d5f9cc068201fc64a23",
      "bytes": 1664,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-lifecycle-attempt-1-diagnosis.md"
    },
    {
      "sourceId": "context.lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-lifecycle-helper.mjs",
      "digest": "sha256:0c4cd94cfff04a74ac5d270e3596fcd51d5e9556aabf8834273ac651228309c1",
      "bytes": 59358,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.lifecycle-test",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-lifecycle-test.mjs",
      "digest": "sha256:5047e3e43fefcf9f817c79a28aab67b0a80674ca8f295622f3cbba92377557dd",
      "bytes": 7892,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-lifecycle-test.mjs"
    },
    {
      "sourceId": "context.lifecycle-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-complete-lifecycle-verification.md",
      "digest": "sha256:c6fb1bd41ff7526c34d1d5433fafc8fddbedea99d59ffd29a31d0082b01d30b1",
      "bytes": 2095,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-complete-lifecycle-verification.md"
    },
    {
      "sourceId": "context.owner-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-integration-owner-verification.md",
      "digest": "sha256:eb853541afa984acafd3b206f1477ba77954731a4f266b310759dd11662c90d3",
      "bytes": 3287,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-integration-owner-verification.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-package.json",
      "digest": "sha256:9c8e1e3bde18439a6199f0752b7dad1e69fdf713ffac33597d5119d1c26a67fa",
      "bytes": 4043,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-package.json"
    },
    {
      "sourceId": "context.package-lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-package-lock.json"
    },
    {
      "sourceId": "context.packed-consumer",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-packed-consumer.mjs",
      "digest": "sha256:548b37682291ca3f93aedf44b15cd49fedfe3d655bcee39e73bcac797c65914c",
      "bytes": 44564,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-packed-consumer.mjs"
    },
    {
      "sourceId": "context.packed-consumer-host",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-packed-consumer-host.ts",
      "digest": "sha256:90633af96b2afaa66dfaddd66e27f2e050dfd0ac5c052f8c1e2413d21db74d00",
      "bytes": 23434,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-packed-consumer-host.ts"
    },
    {
      "sourceId": "context.prior-assessment",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-integration-assessment.md",
      "digest": "sha256:c8d331a3b3085e0e0c45c7f568b4770e239df0c19cfd4353ea90573b9c8c35c1",
      "bytes": 1246,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-integration-assessment.md"
    },
    {
      "sourceId": "context.prior-review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-review-handoff.json",
      "digest": "sha256:266a17d15aacaf1b437e79489d653ebefb085cd5df5537f206c534b99338068b",
      "bytes": 10752,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-review-handoff.json"
    },
    {
      "sourceId": "context.prior-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-handoff-verification.json",
      "digest": "sha256:56addee3ccb523c2496a357f04fe46b13ae8c9921eb77ca0d7a8ac177d5877db",
      "bytes": 1324,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-gate.mjs",
      "digest": "sha256:6e1e398c7d15a0b5ac3562ccb90913ecb6480f700a9e53cb1aaf076f2f704b21",
      "bytes": 30623,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-gate-tests.mjs",
      "digest": "sha256:bf686f62e2ef61c0ad012680321c2497b5532084eefcc759a882c6b10cf4f010",
      "bytes": 41945,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-gate-tests.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-review-tests.mjs",
      "digest": "sha256:bdf63828b96e505d0bd7f19caa60cafcebf57c5d9ed13784a66e46fb69238921",
      "bytes": 50183,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-review-tests.mjs"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/review-contract.md",
      "digest": "sha256:fe1df4b044196571e42e1612558a63946c5b9fdc08aa637303de72b7269cf8da",
      "bytes": 2238,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/review-contract.md"
    },
    {
      "sourceId": "context.source-delta",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/revision-27-source.patch",
      "digest": "sha256:59b1776894ddad8203157130998ac0a71f39b4cb7b88c5a021b5084b6e56740a",
      "bytes": 59451,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/revision-27-source.patch"
    },
    {
      "sourceId": "context.specialist-run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/specialist-run-contract.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-test-plan.md",
      "digest": "sha256:c1588ef5f9bbc49c0f352bdf92f4b0313aaa4211edbe3f4e3a93098284c9e209",
      "bytes": 1908,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-test-plan.md"
    },
    {
      "sourceId": "context.typescript-launcher",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-run-typescript.mjs",
      "digest": "sha256:fcb20a8c6b97ba017ba75e33383edcc1469b7ca44a93809987004c863b39c873",
      "bytes": 7033,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-run-typescript.mjs"
    },
    {
      "sourceId": "context.typescript-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-typescript-toolchain-tests.mjs",
      "digest": "sha256:7346929a4f757b25abebbdec34f3204cad53c5e4188349cc68e7612076dec4d2",
      "bytes": 10623,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-typescript-toolchain-tests.mjs"
    },
    {
      "sourceId": "context.v11-audit-pass",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-audit-pass.json",
      "digest": "sha256:fe44783daa4071bdd56b107c53cb2015ab741e1596ae42ae410a6b3f7873e260",
      "bytes": 7691,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-audit-pass.json"
    },
    {
      "sourceId": "context.v11-audit-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-audit-report.json",
      "digest": "sha256:e222a150ea436ea43e71e285430924f57866b89428ca4ab25f25adbd40a5f374",
      "bytes": 20361,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-audit-report.json"
    },
    {
      "sourceId": "context.v11-authorization",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-launch-authorization.json",
      "digest": "sha256:b8c744cd8f05feefcb4da77b6d29ea54e6372cbeeb2e59adc979f92c70eb8bc1",
      "bytes": 984,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-launch-authorization.json"
    },
    {
      "sourceId": "context.v11-bind-block",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-bind-block.json",
      "digest": "sha256:bad7f92bb5f2ac9f2437507cfcaffa187298a174367f4758bbc52532ed58edae",
      "bytes": 5295,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-bind-block.json"
    },
    {
      "sourceId": "context.v11-bind-pass",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-bind-pass.json",
      "digest": "sha256:0726e1f8314fa71cdfe25c4a72f95db01a7a8e601d0234a7792f896f98abc5e1",
      "bytes": 6862,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-bind-pass.json"
    },
    {
      "sourceId": "context.v11-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-prelaunch-receipt.json",
      "digest": "sha256:f11d31906da0cd16a2130426a18a542037ea08c675e4f5cbd36281361dadc6db",
      "bytes": 2255,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-prelaunch-receipt.json"
    },
    {
      "sourceId": "context.v11-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-report.json",
      "digest": "sha256:00552eb3086d63b5edf52f74bfe8d2cbbb8128bac423a584924e44251ae4c3bb",
      "bytes": 25925,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-report.json"
    },
    {
      "sourceId": "context.verify-diagnosis-one",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-full-verify-attempt-1-diagnosis.md",
      "digest": "sha256:163432057d9f13ccd7e5ab02f2026661fbcc3f3f2b9b589af711bf2a0f50dec7",
      "bytes": 2682,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-full-verify-attempt-1-diagnosis.md"
    },
    {
      "sourceId": "context.verify-diagnosis-two",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-full-verify-attempt-2-diagnosis.md",
      "digest": "sha256:7244314b6766723beb969e4d92755c5cc478bb33f0687efa8690d76b99fb4ea3",
      "bytes": 1938,
      "purposes": [
        "Authenticate and independently audit the exact Revision 27 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r27"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-full-verify-attempt-2-diagnosis.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/review-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/agent-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/aggregate-verification-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-biome.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-git-environment-boundary-child.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-lifecycle-test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-packed-consumer-host.ts",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-packed-consumer.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-gate-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-run-typescript.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-typescript-toolchain-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-integration-assessment.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-review-handoff.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-complete-lifecycle-verification.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-full-verify-attempt-1-diagnosis.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-full-verify-attempt-2-diagnosis.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-integration-owner-verification.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-lifecycle-attempt-1-diagnosis.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/review-checkpoint.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/revision-27-source.patch",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-audit-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-audit-report.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-bind-block.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-bind-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-launch-authorization.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-prelaunch-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-report.json"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/review-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/agent-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/aggregate-verification-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-biome.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-git-environment-boundary-child.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-lifecycle-test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-packed-consumer-host.ts",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-packed-consumer.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-gate-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-run-typescript.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/final-typescript-toolchain-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-integration-assessment.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r26-review-handoff.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-complete-lifecycle-verification.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-full-verify-attempt-1-diagnosis.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-full-verify-attempt-2-diagnosis.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-integration-owner-verification.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-lifecycle-attempt-1-diagnosis.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/r27-test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/review-checkpoint.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/revision-27-source.patch",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-audit-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-audit-report.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-bind-block.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-bind-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-launch-authorization.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-prelaunch-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r27/inputs/snapshots/v11-revision-41-report.json"
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
      "Do not edit files, install packages, mutate Git state, use network access, launch descendants, rerun a candidate gate, alter historical evidence, claim release readiness, approve merge, or perform host enforcement."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.review.authenticated-typescript-release-correction.r27",
      "criterion": "Exact Revision 27 causally closes TypeScript command, path, alias, hard-link, mutation, consumer, and lifecycle gaps while preserving all prior release controls.",
      "requirementId": "evidence.review.authenticated-typescript-release-correction.r27",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate all sources, resolve every closed review point, search for bypasses, and return a concrete pass or causal correction route.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-revision-27-release-correction-review.md"
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
    "Treat integration-owner tests and receipts as evidence only, never as the verdict."
  ],
  "contentDigest": "sha256:e785c65f70036af6eb852d1cff2c1758f8bf9e80aa5e01a042cc9f38bf011279"
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
    "id": "v12.ide-run-loop.review.authenticated-typescript-release-correction-r27",
    "revision": 1,
    "digest": "sha256:c9de7f414930297ffda5c85b524499deb022a39c9aa2895e341896eb0eb31080"
  },
  "agent": {
    "id": "agent.891676aa1baff1a9af2122a78d92f30aa47d5d9fec2f470a53f2e076f43a1a98",
    "blueprintDigest": "sha256:e785c65f70036af6eb852d1cff2c1758f8bf9e80aa5e01a042cc9f38bf011279"
  },
  "compilationDigest": "sha256:8af9bdab4b384419310def12a09c0ebea455e86607ebee5274312709f5e7d5ac",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.authenticated-typescript-release-correction.r27"
  ],
  "artifacts": [
    {
      "name": "independent-revision-27-release-correction-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.authenticated-typescript-release-correction.r27",
      "requirementId": "evidence.review.authenticated-typescript-release-correction.r27",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-revision-27-release-correction-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
