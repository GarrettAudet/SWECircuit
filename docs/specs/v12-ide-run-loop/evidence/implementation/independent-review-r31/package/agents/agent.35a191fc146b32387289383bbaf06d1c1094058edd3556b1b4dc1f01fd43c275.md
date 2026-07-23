# Specialist Contract: agent.35a191fc146b32387289383bbaf06d1c1094058edd3556b1b4dc1f01fd43c275

Compilation: `sha256:9c65708c068cae09daae6e16b058f999989f423ba15327304f0eb7433f4d23fa`
Blueprint: `sha256:74909dec146248654bec4c554afe3e270501650bc1e9d4d046dfba13a09fd2bb`

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
  "id": "agent.35a191fc146b32387289383bbaf06d1c1094058edd3556b1b4dc1f01fd43c275",
  "goalId": "v12.ide-run-loop.review.release-harness-correction-r31",
  "goalRevision": 1,
  "goalDigest": "sha256:01f13ecdc77fec34bf2efdd30f28c9c823c75d07f73f3b45ca9b868af1405576",
  "candidateId": "team.8e66a12c0d5ee3385a7c17fae6a3b15e1089c2e1a07feac0bc265d71d8e6c075",
  "workUnitIds": [
    "review.release-harness-correction.r31"
  ],
  "objectives": [
    {
      "workUnitId": "review.release-harness-correction.r31",
      "objective": "Authenticate and independently audit exact Revision 31 against the closed review contract; reconstruct the failed predecessor, trace every correction through production and tests, validate aggregate attribution, search for bypasses, and return one bounded verdict."
    }
  ],
  "modules": [
    {
      "id": "review.release-harness-correction",
      "action": "Authenticate immutable inputs; trace release-harness identity, authority, Git, process, cleanup, and verification boundaries; test the evidence logic adversarially; return one exact review handoff.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "AuthenticatedCandidate14FailureAndRevision31Evidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision31ReleaseHarnessVerdict"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.active-context",
      "kind": "repository",
      "locator": "path:inputs/snapshots/active-context.md",
      "digest": "sha256:6126636050d9c07dc25a2afebd194308c314bcf369ddc747149d3e3f5ba85030",
      "bytes": 41282,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/active-context.md"
    },
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:inputs/snapshots/agent-contract.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/agent-contract.md"
    },
    {
      "sourceId": "context.aggregate-receipt",
      "kind": "repository",
      "locator": "path:inputs/snapshots/aggregate-receipt.json",
      "digest": "sha256:ef5bd550aa769705d3722b45d90b39ed6c4dc639ff4d1637ab54b844a22db3c0",
      "bytes": 1673,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/aggregate-receipt.json"
    },
    {
      "sourceId": "context.aggregate-stderr",
      "kind": "repository",
      "locator": "path:inputs/snapshots/npm-verify.stderr.log",
      "digest": "sha256:d19f01de430cfe2d806b7444d8b3fe8b2462b1ade4643113c2b0cbadf4e0740e",
      "bytes": 26181,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/npm-verify.stderr.log"
    },
    {
      "sourceId": "context.aggregate-stdout",
      "kind": "repository",
      "locator": "path:inputs/snapshots/npm-verify.stdout.log",
      "digest": "sha256:69fc4ea4484e11fa61edf989168799abf80cc7ea654d2b0a734a3915d7559ba0",
      "bytes": 303362,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/npm-verify.stdout.log"
    },
    {
      "sourceId": "context.candidate-14-gate-receipt",
      "kind": "repository",
      "locator": "path:inputs/snapshots/candidate-14-gate-receipt.json",
      "digest": "sha256:f9960ddb3cf3b15cbc03fbdb7d016b1eb520b833fb2183dcfdd67b984cc560c2",
      "bytes": 2296,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/candidate-14-gate-receipt.json"
    },
    {
      "sourceId": "context.candidate-14-gate-stderr",
      "kind": "repository",
      "locator": "path:inputs/snapshots/candidate-14-gate.stderr.log",
      "digest": "sha256:0d0f997717d3a289caa495f1426091e27604f6829fd49be9af82f472e9d60758",
      "bytes": 19354,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/candidate-14-gate.stderr.log"
    },
    {
      "sourceId": "context.candidate-14-gate-stdout",
      "kind": "repository",
      "locator": "path:inputs/snapshots/candidate-14-gate.stdout.log",
      "digest": "sha256:dfa57323ce8e81452cf51a5fe862b34e0b9019dd05eb09b90af55425f9393138",
      "bytes": 36810,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/candidate-14-gate.stdout.log"
    },
    {
      "sourceId": "context.candidate-14-retirement",
      "kind": "repository",
      "locator": "path:inputs/snapshots/candidate-14-retirement.md",
      "digest": "sha256:cb6fa937c358dafa770992da3559d1e5f52fcf56610168e84959003069a5c0ae",
      "bytes": 1806,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/candidate-14-retirement.md"
    },
    {
      "sourceId": "context.checkpoint",
      "kind": "repository",
      "locator": "path:inputs/snapshots/review-checkpoint.json",
      "digest": "sha256:79ad9d039e81f9ea96945ca4b6f62996a411f74fd56cb1e8fbbfd747695b75c4",
      "bytes": 413,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/review-checkpoint.json"
    },
    {
      "sourceId": "context.lifecycle-helper",
      "kind": "repository",
      "locator": "path:inputs/snapshots/final-lifecycle-helper.mjs",
      "digest": "sha256:29ab3a61711c71ed78e60dfd7684053e046fedea8ca3f75e1f2bbc7b7be009a0",
      "bytes": 76981,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/final-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.lifecycle-test",
      "kind": "repository",
      "locator": "path:inputs/snapshots/final-lifecycle-test.mjs",
      "digest": "sha256:1062e00786f4fdaaf5aa61a93a7f7f0759e09b49c55532a26c91edfcd1270fa7",
      "bytes": 10294,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/final-lifecycle-test.mjs"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:inputs/snapshots/final-package.json",
      "digest": "sha256:9c8e1e3bde18439a6199f0752b7dad1e69fdf713ffac33597d5119d1c26a67fa",
      "bytes": 4043,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/final-package.json"
    },
    {
      "sourceId": "context.prior-independent-assessment",
      "kind": "repository",
      "locator": "path:inputs/snapshots/prior-r29-integration-assessment.md",
      "digest": "sha256:7d6b72b225beef2370b7ebde7b420a05fa606c11ae96fffb20e3810c710f2d77",
      "bytes": 1436,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/prior-r29-integration-assessment.md"
    },
    {
      "sourceId": "context.prior-independent-pass",
      "kind": "repository",
      "locator": "path:inputs/snapshots/prior-r29-review-handoff.json",
      "digest": "sha256:713a3c52ef0a20ff2ece6f50444698f4f9ca5b2702dd63dd579ce37b93884920",
      "bytes": 11258,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/prior-r29-review-handoff.json"
    },
    {
      "sourceId": "context.prior-independent-verification",
      "kind": "repository",
      "locator": "path:inputs/snapshots/prior-r29-handoff-verification.json",
      "digest": "sha256:6e1f1aa747a896c6ea7d07ce532dccdb613124c9e320482dfbc9216bb85cbeff",
      "bytes": 541,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/prior-r29-handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:inputs/snapshots/final-release-gate.mjs",
      "digest": "sha256:b1451d644b2c003ccd19cf29a3cb92a964eec01e5281afbef7c878ccb1e57025",
      "bytes": 31070,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/final-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:inputs/snapshots/final-release-gate-tests.mjs",
      "digest": "sha256:34756d001cb73a268e83db7d61cb39fc5bbc4b21971e7afef359dff30c034f64",
      "bytes": 43488,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/final-release-gate-tests.mjs"
    },
    {
      "sourceId": "context.release-review-harness",
      "kind": "repository",
      "locator": "path:inputs/snapshots/final-release-review-harness.mjs",
      "digest": "sha256:a56a60b6704487e29d398362f884c34ff4850baac1315d3347e74e82c4241934",
      "bytes": 127937,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/final-release-review-harness.mjs"
    },
    {
      "sourceId": "context.release-review-parent",
      "kind": "repository",
      "locator": "path:inputs/snapshots/final-release-review-parent.mjs",
      "digest": "sha256:efbf5e96314e28a20b67e7f78067798ac398fadb1b25628f9e1d02082a8bb1e7",
      "bytes": 102513,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/final-release-review-parent.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:inputs/snapshots/final-release-review-tests.mjs",
      "digest": "sha256:199ffa609591cd7ac9cec210c20512d44b6e1948508e6e86085c77b759d7d505",
      "bytes": 66473,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/final-release-review-tests.mjs"
    },
    {
      "sourceId": "context.release-review-verifier",
      "kind": "repository",
      "locator": "path:inputs/snapshots/final-release-review-verifier.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/final-release-review-verifier.mjs"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:inputs/review-contract.md",
      "digest": "sha256:4fa3c2680d8ffaadde8edb0f765777ea9e174c3185299544d0e1f3b56291a7c5",
      "bytes": 3007,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/review-contract.md"
    },
    {
      "sourceId": "context.source-delta",
      "kind": "repository",
      "locator": "path:inputs/snapshots/revision-31-source.patch",
      "digest": "sha256:0345b88970f84400a96f1a40bedfc18649c5e117e304fb23f0595296dbb018cb",
      "bytes": 147201,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/revision-31-source.patch"
    },
    {
      "sourceId": "context.specialist-compiler-contract",
      "kind": "repository",
      "locator": "path:inputs/snapshots/specialist-compiler-contract.md",
      "digest": "sha256:ab2c0f09a38e5de51f14c6af1c912bbc37f5ec8c27bd589273202741c94297b9",
      "bytes": 36886,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.v12-debug",
      "kind": "repository",
      "locator": "path:inputs/snapshots/v12-debug-notes.md",
      "digest": "sha256:cb4c0e9ed80f6e2ca6d2be62c51293ad7d77185bb9b438b938c7f0d955c80d96",
      "bytes": 58257,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/v12-debug-notes.md"
    },
    {
      "sourceId": "context.v12-milestone",
      "kind": "repository",
      "locator": "path:inputs/snapshots/v12-milestone.md",
      "digest": "sha256:f2be0c25cdd123b26ba963a3697810f5f74be4ab8ace9c807201caa680d3dfa3",
      "bytes": 11555,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/v12-milestone.md"
    },
    {
      "sourceId": "context.v12-review",
      "kind": "repository",
      "locator": "path:inputs/snapshots/v12-review.md",
      "digest": "sha256:e067bc28bf6d665e3170821308b37506cfb4b71f906de168d52d4a5873ecb3d8",
      "bytes": 13101,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/v12-review.md"
    },
    {
      "sourceId": "context.v12-root-cause",
      "kind": "repository",
      "locator": "path:inputs/snapshots/v12-root-cause-analysis.md",
      "digest": "sha256:430a64c4d26c66fc8d59324cebafacf87195e33750308f7f1fa31426c8fecf3a",
      "bytes": 41773,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/v12-root-cause-analysis.md"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:inputs/snapshots/v12-spec.md",
      "digest": "sha256:560d60663e144614ea9226a2cc15d2c5665772d12edf7a9756159827db632ac2",
      "bytes": 6031,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/v12-spec.md"
    },
    {
      "sourceId": "context.v12-test-plan",
      "kind": "repository",
      "locator": "path:inputs/snapshots/v12-test-plan.md",
      "digest": "sha256:ce89b8d7d1eb67133f7e980a00be047d47e9afa6ac9acf869b4c6ebe0e1b0f2c",
      "bytes": 11216,
      "purposes": [
        "Authenticate and independently audit the exact Revision 31 release-harness correction and aggregate evidence."
      ],
      "workUnitIds": [
        "review.release-harness-correction.r31"
      ],
      "readScope": "inputs/snapshots/v12-test-plan.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "inputs/review-contract.md",
        "inputs/snapshots/active-context.md",
        "inputs/snapshots/agent-contract.md",
        "inputs/snapshots/aggregate-receipt.json",
        "inputs/snapshots/candidate-14-gate-receipt.json",
        "inputs/snapshots/candidate-14-gate.stderr.log",
        "inputs/snapshots/candidate-14-gate.stdout.log",
        "inputs/snapshots/candidate-14-retirement.md",
        "inputs/snapshots/final-lifecycle-helper.mjs",
        "inputs/snapshots/final-lifecycle-test.mjs",
        "inputs/snapshots/final-package.json",
        "inputs/snapshots/final-release-gate-tests.mjs",
        "inputs/snapshots/final-release-gate.mjs",
        "inputs/snapshots/final-release-review-harness.mjs",
        "inputs/snapshots/final-release-review-parent.mjs",
        "inputs/snapshots/final-release-review-tests.mjs",
        "inputs/snapshots/final-release-review-verifier.mjs",
        "inputs/snapshots/npm-verify.stderr.log",
        "inputs/snapshots/npm-verify.stdout.log",
        "inputs/snapshots/prior-r29-handoff-verification.json",
        "inputs/snapshots/prior-r29-integration-assessment.md",
        "inputs/snapshots/prior-r29-review-handoff.json",
        "inputs/snapshots/review-checkpoint.json",
        "inputs/snapshots/revision-31-source.patch",
        "inputs/snapshots/specialist-compiler-contract.md",
        "inputs/snapshots/v12-debug-notes.md",
        "inputs/snapshots/v12-milestone.md",
        "inputs/snapshots/v12-review.md",
        "inputs/snapshots/v12-root-cause-analysis.md",
        "inputs/snapshots/v12-spec.md",
        "inputs/snapshots/v12-test-plan.md"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "inputs/review-contract.md",
          "inputs/snapshots/active-context.md",
          "inputs/snapshots/agent-contract.md",
          "inputs/snapshots/aggregate-receipt.json",
          "inputs/snapshots/candidate-14-gate-receipt.json",
          "inputs/snapshots/candidate-14-gate.stderr.log",
          "inputs/snapshots/candidate-14-gate.stdout.log",
          "inputs/snapshots/candidate-14-retirement.md",
          "inputs/snapshots/final-lifecycle-helper.mjs",
          "inputs/snapshots/final-lifecycle-test.mjs",
          "inputs/snapshots/final-package.json",
          "inputs/snapshots/final-release-gate-tests.mjs",
          "inputs/snapshots/final-release-gate.mjs",
          "inputs/snapshots/final-release-review-harness.mjs",
          "inputs/snapshots/final-release-review-parent.mjs",
          "inputs/snapshots/final-release-review-tests.mjs",
          "inputs/snapshots/final-release-review-verifier.mjs",
          "inputs/snapshots/npm-verify.stderr.log",
          "inputs/snapshots/npm-verify.stdout.log",
          "inputs/snapshots/prior-r29-handoff-verification.json",
          "inputs/snapshots/prior-r29-integration-assessment.md",
          "inputs/snapshots/prior-r29-review-handoff.json",
          "inputs/snapshots/review-checkpoint.json",
          "inputs/snapshots/revision-31-source.patch",
          "inputs/snapshots/specialist-compiler-contract.md",
          "inputs/snapshots/v12-debug-notes.md",
          "inputs/snapshots/v12-milestone.md",
          "inputs/snapshots/v12-review.md",
          "inputs/snapshots/v12-root-cause-analysis.md",
          "inputs/snapshots/v12-spec.md",
          "inputs/snapshots/v12-test-plan.md"
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
      "criterionId": "criterion.review.release-harness-correction.r31",
      "criterion": "Every Revision 31 cause is closed by production-path code and causal tests, exact aggregate evidence is checkpoint-bound, and no release-blocking bypass remains in scope.",
      "requirementId": "evidence.review.release-harness-correction.r31",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate every source, resolve every closed review point, search for bypasses, and return one exact pass or causal non-pass handoff.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-revision-31-release-harness-review.md"
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
    "Resolve every closed review point and search for new bypasses before returning pass.",
    "Return only the exact generated SpecialistAgentHandoff JSON object.",
    "Stop before semantic review if any declared snapshot byte count or digest fails.",
    "Treat tests, receipts, prior reviews, and integration-owner statements as evidence only."
  ],
  "contentDigest": "sha256:74909dec146248654bec4c554afe3e270501650bc1e9d4d046dfba13a09fd2bb"
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
    "id": "v12.ide-run-loop.review.release-harness-correction-r31",
    "revision": 1,
    "digest": "sha256:01f13ecdc77fec34bf2efdd30f28c9c823c75d07f73f3b45ca9b868af1405576"
  },
  "agent": {
    "id": "agent.35a191fc146b32387289383bbaf06d1c1094058edd3556b1b4dc1f01fd43c275",
    "blueprintDigest": "sha256:74909dec146248654bec4c554afe3e270501650bc1e9d4d046dfba13a09fd2bb"
  },
  "compilationDigest": "sha256:9c65708c068cae09daae6e16b058f999989f423ba15327304f0eb7433f4d23fa",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.release-harness-correction.r31"
  ],
  "artifacts": [
    {
      "name": "independent-revision-31-release-harness-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.release-harness-correction.r31",
      "requirementId": "evidence.review.release-harness-correction.r31",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-revision-31-release-harness-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
