# Specialist Contract: agent.47b1501d01443a341a3adbf58ffcf4bb810b4b38d0e1b08bacbb957dc429f926

Compilation: `sha256:dfe188073e32ee626ef573020213f63576596094558b493dd48a4ed5d81f3dc2`
Blueprint: `sha256:00e8186f6005b52e10a5d6338f54a630c573f84b5ba3b2f17f8151527bcfb0df`

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
  "id": "agent.47b1501d01443a341a3adbf58ffcf4bb810b4b38d0e1b08bacbb957dc429f926",
  "goalId": "v12.ide-run-loop.review.authenticated-typescript-release-correction-r28",
  "goalRevision": 1,
  "goalDigest": "sha256:da7ee2fc2e8a99f9ba8b8cd9d8f87c8c44303e362a608957c5c48254ae9c03f6",
  "candidateId": "team.3ffe1f06a74a52674ed44983cbb704bcd503b25fe9db4c69d80cfd609a703c68",
  "workUnitIds": [
    "review.authenticated-typescript-release-correction.r28"
  ],
  "objectives": [
    {
      "workUnitId": "review.authenticated-typescript-release-correction.r28",
      "objective": "Authenticate and independently audit exact Revision 28 against the closed contract and search for execution-binding, PATH-selection, mutation, package, lifecycle, host-boundary, evidence, or test-quality defects."
    }
  ],
  "modules": [
    {
      "id": "review.authenticated-typescript-release-correction",
      "action": "Trace the complete compiler binding through build, typecheck, candidate gate, installed consumer, hostile tests, lifecycle, and evidence; audit the external-host boundary; search for bypasses; return one bounded verdict.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "AuthenticatedRevision27FindingAndRevision28Evidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision28Verdict"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/agent-contract.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/agent-contract.md"
    },
    {
      "sourceId": "context.aggregate-core-replay",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-core-replay.log",
      "digest": "sha256:89cd2d8817e9f57c69607bf8e8e1c1734235609beeff4e64579cee2efd505f32",
      "bytes": 63498,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-core-replay.log"
    },
    {
      "sourceId": "context.aggregate-diagnosis",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-attempt-1-diagnosis.md",
      "digest": "sha256:6f1520720bed27f6c17922ef7dfffbf616d798393dcd0a2bcaab1cc7e06f12b4",
      "bytes": 1157,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-attempt-1-diagnosis.md"
    },
    {
      "sourceId": "context.aggregate-lifecycle-replay",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-lifecycle-replay.log",
      "digest": "sha256:f2ff20c0142f623c2731365c388d7e79f9fe665a1d7e434b879fca2daf891022",
      "bytes": 592,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-lifecycle-replay.log"
    },
    {
      "sourceId": "context.aggregate-raw-log",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-verification.log",
      "digest": "sha256:3f1e230ba78a15fe9e4f77d0155861e49ee6af52c7afff833fb0f46d7b5de42a",
      "bytes": 656892,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-verification.log"
    },
    {
      "sourceId": "context.aggregate-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-verification-receipt.json",
      "digest": "sha256:a12a46002982000445c114e1a5eef4a1987837a8f62d3f15dc2905aff011e0d1",
      "bytes": 1799,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-verification-receipt.json"
    },
    {
      "sourceId": "context.attributes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-gitattributes",
      "digest": "sha256:f125118db8c3313b2591ca18f56d7595ba5c9c915af15324f730c2b179a881e8",
      "bytes": 625,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-gitattributes"
    },
    {
      "sourceId": "context.biome",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-biome.json",
      "digest": "sha256:46039f3c3c78511addc1b752193e1b795faaf4c227eae752cf32a29f3c2f866a",
      "bytes": 850,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-biome.json"
    },
    {
      "sourceId": "context.checkpoint",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/review-checkpoint.json",
      "digest": "sha256:12ceb5e076538a56b2413c848b21ae0df2733f0baafdb41a342045d683644488",
      "bytes": 354,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/review-checkpoint.json"
    },
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-correction-contract.md",
      "digest": "sha256:0e9f14d8c635f73890623ef0917d35da41fe3ee6960377901d337d3772d11e02",
      "bytes": 2666,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-correction-contract.md"
    },
    {
      "sourceId": "context.executor-boundary",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-executor-boundary.md",
      "digest": "sha256:ce63d8df753291aae4b20d33fbd790b5a96ff63807107de87ab0a28ed3a71596",
      "bytes": 6526,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-executor-boundary.md"
    },
    {
      "sourceId": "context.git-boundary-child",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-git-environment-boundary-child.mjs",
      "digest": "sha256:7a09f14fc57188ae3352738b714dac5d184f825ab0b62607ce145ce743abb2b5",
      "bytes": 3025,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-git-environment-boundary-child.mjs"
    },
    {
      "sourceId": "context.hosted-workflow",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-hosted-workflow.yml",
      "digest": "sha256:e6b095cb009ca3db286b9b5177bb8374ec3ed6bc41adce7d6b1f18f724778240",
      "bytes": 1997,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-hosted-workflow.yml"
    },
    {
      "sourceId": "context.lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-lifecycle-helper.mjs",
      "digest": "sha256:2e8afdcc300c9eb96cae19d3e650ee5c207111de9fa8e33a3664f0a892f02343",
      "bytes": 59358,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.lifecycle-test",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-lifecycle-test.mjs",
      "digest": "sha256:5047e3e43fefcf9f817c79a28aab67b0a80674ca8f295622f3cbba92377557dd",
      "bytes": 7892,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-lifecycle-test.mjs"
    },
    {
      "sourceId": "context.lifecycle-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-complete-lifecycle-verification.md",
      "digest": "sha256:734f3c7d655f6b4e4e86ef0bba4e69d5f5472315b1c6f10a7e84553715fb6d00",
      "bytes": 1301,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-complete-lifecycle-verification.md"
    },
    {
      "sourceId": "context.owner-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-integration-owner-verification.md",
      "digest": "sha256:e0451d58f78e2fb779ad86b0c569ba0a8fe376b57c481e04a94218a8bf0e3585",
      "bytes": 3060,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-integration-owner-verification.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-package.json",
      "digest": "sha256:9c8e1e3bde18439a6199f0752b7dad1e69fdf713ffac33597d5119d1c26a67fa",
      "bytes": 4043,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-package.json"
    },
    {
      "sourceId": "context.package-lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-package-lock.json"
    },
    {
      "sourceId": "context.packed-consumer",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-packed-consumer.mjs",
      "digest": "sha256:48d5ff057865f8c599e6a17055787ca21946f9624a09495abb3e451b43b13099",
      "bytes": 45585,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-packed-consumer.mjs"
    },
    {
      "sourceId": "context.packed-consumer-host",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-packed-consumer-host.ts",
      "digest": "sha256:90633af96b2afaa66dfaddd66e27f2e050dfd0ac5c052f8c1e2413d21db74d00",
      "bytes": 23434,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-packed-consumer-host.ts"
    },
    {
      "sourceId": "context.prior-assessment",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-integration-assessment.md",
      "digest": "sha256:011f938cb4628a9e8b00ba4571acf280e96e23b8a0031d1721452c0cf168777c",
      "bytes": 2161,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-integration-assessment.md"
    },
    {
      "sourceId": "context.prior-review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-review-handoff.json",
      "digest": "sha256:2a1893aaf6c5018b74a65a2b83ebf6390a93631727d68c414ad01a91e14e5f85",
      "bytes": 13404,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-review-handoff.json"
    },
    {
      "sourceId": "context.prior-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-handoff-verification.json",
      "digest": "sha256:07869c117714f8fc2cdecc0fb68b2861be2ef2385b747159c2ba536572d50471",
      "bytes": 1595,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-gate.mjs",
      "digest": "sha256:6e1e398c7d15a0b5ac3562ccb90913ecb6480f700a9e53cb1aaf076f2f704b21",
      "bytes": 30623,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-gate-tests.mjs",
      "digest": "sha256:1995a9baa4c6c5f6b1beb2b14888a9cfc05bb872dfd98995edb6104552d8b0e1",
      "bytes": 42123,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-gate-tests.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-review-tests.mjs",
      "digest": "sha256:bdf63828b96e505d0bd7f19caa60cafcebf57c5d9ed13784a66e46fb69238921",
      "bytes": 50183,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-review-tests.mjs"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/review-contract.md",
      "digest": "sha256:226c789c2b1f2c4a96b87d3120f7f496c429ea6030bc157d449303a5ec2a9e74",
      "bytes": 2552,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/review-contract.md"
    },
    {
      "sourceId": "context.root-cause",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-root-cause-analysis.md",
      "digest": "sha256:4110d07248340b71c75a6e9aa0b19b3b1806faa023db5e8e178e46eceff5cb96",
      "bytes": 1322,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-root-cause-analysis.md"
    },
    {
      "sourceId": "context.source-delta",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/revision-28-source.patch",
      "digest": "sha256:f9db45fcd9e3f77c5578254204bdf410fd4fc14ee730db3268a50644e934cdad",
      "bytes": 18067,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/revision-28-source.patch"
    },
    {
      "sourceId": "context.specialist-run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/specialist-run-contract.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-test-plan.md",
      "digest": "sha256:b12ee91c614e74e7e303041b15177cd32da7a73d3d9a83faad60cc0739ae60bb",
      "bytes": 1315,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-test-plan.md"
    },
    {
      "sourceId": "context.typescript-launcher",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-run-typescript.mjs",
      "digest": "sha256:3390a3bdea97140e8c02ad0f917dcb62bbaf2e12921ea5fd1a2255362475c25f",
      "bytes": 7064,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-run-typescript.mjs"
    },
    {
      "sourceId": "context.typescript-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-typescript-toolchain-tests.mjs",
      "digest": "sha256:ba8459297e1a44c26a918f32a3232ed6584c27ec1bf15248503ff66b7442110d",
      "bytes": 13202,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-typescript-toolchain-tests.mjs"
    },
    {
      "sourceId": "context.v11-attempt-41-annotation",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-v11-attempt-41a-annotation.md",
      "digest": "sha256:cc51cc771c889b4e021db8277e99a76f2251f12eb3238898be5cf65f3117c333",
      "bytes": 609,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-v11-attempt-41a-annotation.md"
    },
    {
      "sourceId": "context.v11-audit-pass",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-audit-pass.json",
      "digest": "sha256:689c32918c3d9d2a0f28ddeb21157dea66e5617b44647e0fdc37e581c0f225c6",
      "bytes": 7938,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-audit-pass.json"
    },
    {
      "sourceId": "context.v11-audit-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-audit-report.json",
      "digest": "sha256:5bd9e524d3d4b67ddf2bc79e48f6557cc76287368479652f610ca7954a32dc7d",
      "bytes": 20361,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-audit-report.json"
    },
    {
      "sourceId": "context.v11-authorization",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-launch-authorization.json",
      "digest": "sha256:5688da52749875200508c890a894f62c3184f5b1efc6012d7a7182287ab88543",
      "bytes": 984,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-launch-authorization.json"
    },
    {
      "sourceId": "context.v11-bind-pass",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-bind-pass.json",
      "digest": "sha256:8d042f2dc8e732e2cdb9209ccc1ee45bc8d52a53d0d94f5c888766460a890a84",
      "bytes": 4742,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-bind-pass.json"
    },
    {
      "sourceId": "context.v11-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-prelaunch-receipt.json",
      "digest": "sha256:052a88c5e461731b9b5e5b96719c8c15c5c36727831f1f0e542e560303bfd3d2",
      "bytes": 2255,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-prelaunch-receipt.json"
    },
    {
      "sourceId": "context.v11-replay",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-v11-revision-42-replay.md",
      "digest": "sha256:8fa7b5da42236cd032d0d079449cc22bb5c049e1fb5565c2fdb1c56a2d911979",
      "bytes": 2390,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-v11-revision-42-replay.md"
    },
    {
      "sourceId": "context.v11-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-report.json",
      "digest": "sha256:3106c49ab46a95f6ea8c08008796b77c08379bc08f2fa6b7c079b7b6395ad2b5",
      "bytes": 25925,
      "purposes": [
        "Authenticate and independently audit the exact Revision 28 TypeScript authority and release correction."
      ],
      "workUnitIds": [
        "review.authenticated-typescript-release-correction.r28"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-report.json"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/review-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/agent-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-attempt-1-diagnosis.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-core-replay.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-lifecycle-replay.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-verification-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-verification.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-biome.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-executor-boundary.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-git-environment-boundary-child.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-gitattributes",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-hosted-workflow.yml",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-lifecycle-test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-packed-consumer-host.ts",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-packed-consumer.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-gate-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-run-typescript.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-typescript-toolchain-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-integration-assessment.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-review-handoff.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-complete-lifecycle-verification.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-integration-owner-verification.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-root-cause-analysis.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-v11-attempt-41a-annotation.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-v11-revision-42-replay.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/review-checkpoint.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/revision-28-source.patch",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-audit-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-audit-report.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-bind-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-launch-authorization.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-prelaunch-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-report.json"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/review-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/agent-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-attempt-1-diagnosis.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-core-replay.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-lifecycle-replay.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-verification-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/aggregate-verification.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-biome.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-executor-boundary.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-git-environment-boundary-child.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-gitattributes",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-hosted-workflow.yml",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-lifecycle-test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-packed-consumer-host.ts",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-packed-consumer.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-gate-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-run-typescript.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/final-typescript-toolchain-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-integration-assessment.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r27-review-handoff.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-complete-lifecycle-verification.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-integration-owner-verification.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-root-cause-analysis.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-v11-attempt-41a-annotation.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/r28-v11-revision-42-replay.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/review-checkpoint.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/revision-28-source.patch",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-audit-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-audit-report.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-bind-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-launch-authorization.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-prelaunch-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r28/inputs/snapshots/v11-revision-42-report.json"
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
      "criterionId": "criterion.review.authenticated-typescript-release-correction.r28",
      "criterion": "Exact Revision 28 preserves and executes the complete authenticated TypeScript binding, uses selectable hostile PATH tests, proves persistent mutation detection, and states the host boundary while preserving all prior release controls.",
      "requirementId": "evidence.review.authenticated-typescript-release-correction.r28",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate all sources, resolve every closed review point, search for bypasses, and return a concrete pass or causal correction route.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-revision-28-release-correction-review.md"
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
  "contentDigest": "sha256:00e8186f6005b52e10a5d6338f54a630c573f84b5ba3b2f17f8151527bcfb0df"
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
    "id": "v12.ide-run-loop.review.authenticated-typescript-release-correction-r28",
    "revision": 1,
    "digest": "sha256:da7ee2fc2e8a99f9ba8b8cd9d8f87c8c44303e362a608957c5c48254ae9c03f6"
  },
  "agent": {
    "id": "agent.47b1501d01443a341a3adbf58ffcf4bb810b4b38d0e1b08bacbb957dc429f926",
    "blueprintDigest": "sha256:00e8186f6005b52e10a5d6338f54a630c573f84b5ba3b2f17f8151527bcfb0df"
  },
  "compilationDigest": "sha256:dfe188073e32ee626ef573020213f63576596094558b493dd48a4ed5d81f3dc2",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.authenticated-typescript-release-correction.r28"
  ],
  "artifacts": [
    {
      "name": "independent-revision-28-release-correction-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.authenticated-typescript-release-correction.r28",
      "requirementId": "evidence.review.authenticated-typescript-release-correction.r28",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-revision-28-release-correction-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
