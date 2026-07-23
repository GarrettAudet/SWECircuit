# Specialist Contract: agent.52af9aa982525b256b5c9819861f33d76f13536243eaf8bb382434763277e2ba

Compilation: `sha256:d2e25fd584a7319fe89af77ae47ab836cb9b6998c7aa2508ce3f960176a4b271`
Blueprint: `sha256:e538dc9d0380b285648ac481938812c1463f497b7504548b5b8988c5c5f8e7f7`

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
  "id": "agent.52af9aa982525b256b5c9819861f33d76f13536243eaf8bb382434763277e2ba",
  "goalId": "v12.ide-run-loop.review.copied-typescript-execution-correction-r29-attempt2",
  "goalRevision": 2,
  "goalDigest": "sha256:c87d3ba8a8a2fae45b07b4080b5dddb9139fcedd155eecb789b0f81038cd150d",
  "candidateId": "team.2f09615b09df5105111f1e4f44469ba53fa036c9dc56c821ce8163ac5b0e4fdb",
  "workUnitIds": [
    "review.copied-typescript-execution-correction.r29.attempt2"
  ],
  "objectives": [
    {
      "workUnitId": "review.copied-typescript-execution-correction.r29.attempt2",
      "objective": "Authenticate and independently audit the fresh exact-checkpoint aggregate correction, verify Attempt 1 is causally closed, and search for compiler-execution, receipt, mutation, package, lifecycle, host-boundary, evidence, or test-quality defects."
    }
  ],
  "modules": [
    {
      "id": "review.copied-typescript-execution-correction",
      "action": "Authenticate the fresh aggregate against f1454b6, distinguish it from historical evidence, recheck the accepted compiler path and release boundaries, search for bypasses, and return one bounded verdict.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "AuthenticatedRevision29Attempt1FindingAndCorrectedEvidence"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision29Attempt2Verdict"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/agent-contract.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/agent-contract.md"
    },
    {
      "sourceId": "context.aggregate-raw-log",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification.log",
      "digest": "sha256:1635092c047e9a8a2fe6cb42b6a07fecf1b865fd52eab3a50d38c4f72944c399",
      "bytes": 657576,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification.log"
    },
    {
      "sourceId": "context.aggregate-record",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-aggregate-verification.md",
      "digest": "sha256:c3ba2477977ab542733e16def45063fabe49d4d89f76f13e169e35d3380d047f",
      "bytes": 1415,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-aggregate-verification.md"
    },
    {
      "sourceId": "context.aggregate-run-metadata",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification-run-metadata.txt",
      "digest": "sha256:8b882b539e878999c8c6f9fe5563f9faeac4418e5c5c880c0d8fccfd87f0d071",
      "bytes": 376,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification-run-metadata.txt"
    },
    {
      "sourceId": "context.aggregate-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification-receipt.json",
      "digest": "sha256:9e2fa5d9ba182a15aa24577c946d7030ec86f446e6f88017e9e6ec8d8ad721c3",
      "bytes": 1119,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification-receipt.json"
    },
    {
      "sourceId": "context.attributes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-gitattributes",
      "digest": "sha256:8d0ac86b6407f4e8fd439c964560ad76b62c8506b2d218894a938e5b9c02da3a",
      "bytes": 749,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-gitattributes"
    },
    {
      "sourceId": "context.biome",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-biome.json",
      "digest": "sha256:46039f3c3c78511addc1b752193e1b795faaf4c227eae752cf32a29f3c2f866a",
      "bytes": 850,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-biome.json"
    },
    {
      "sourceId": "context.checkpoint",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/review-checkpoint.json",
      "digest": "sha256:27aeaac418cceeb31a3075fc919c9379b41f16fed11fc3d59f61bd42dd57e9f5",
      "bytes": 354,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/review-checkpoint.json"
    },
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-correction-contract.md",
      "digest": "sha256:d4bd3627674a904cb138f8a4e390ab8284b393a9db8728e8ab09f12d97e12955",
      "bytes": 2926,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-correction-contract.md"
    },
    {
      "sourceId": "context.executor-boundary",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-executor-boundary.md",
      "digest": "sha256:ce63d8df753291aae4b20d33fbd790b5a96ff63807107de87ab0a28ed3a71596",
      "bytes": 6526,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-executor-boundary.md"
    },
    {
      "sourceId": "context.git-boundary-child",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-git-environment-boundary-child.mjs",
      "digest": "sha256:7a09f14fc57188ae3352738b714dac5d184f825ab0b62607ce145ce743abb2b5",
      "bytes": 3025,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-git-environment-boundary-child.mjs"
    },
    {
      "sourceId": "context.hosted-workflow",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-hosted-workflow.yml",
      "digest": "sha256:e6b095cb009ca3db286b9b5177bb8374ec3ed6bc41adce7d6b1f18f724778240",
      "bytes": 1997,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-hosted-workflow.yml"
    },
    {
      "sourceId": "context.lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-helper.mjs",
      "digest": "sha256:6f7f94e71fa5ae29f52613664a109f34212c92ec4a430d61aea8b22ce1b81f3b",
      "bytes": 71803,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.lifecycle-test",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-test.mjs",
      "digest": "sha256:8698cb29e6b0c7a70a4b6909a949185d2efea3e6bce9d6a6ee770537ae3b74bd",
      "bytes": 9248,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-test.mjs"
    },
    {
      "sourceId": "context.lifecycle-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-complete-lifecycle-verification.md",
      "digest": "sha256:f10b11f09815bc8d5c8a1503cfe40625defcfde6a1184bfe4775c0e91f92f4cf",
      "bytes": 1489,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-complete-lifecycle-verification.md"
    },
    {
      "sourceId": "context.owner-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-integration-owner-verification.md",
      "digest": "sha256:860d462843f6762266f77e531b3e3a3102ae09e202eaf23580cb83879d3b81ed",
      "bytes": 3480,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-integration-owner-verification.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-package.json",
      "digest": "sha256:9c8e1e3bde18439a6199f0752b7dad1e69fdf713ffac33597d5119d1c26a67fa",
      "bytes": 4043,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-package.json"
    },
    {
      "sourceId": "context.package-lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-package-lock.json"
    },
    {
      "sourceId": "context.packed-consumer",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-packed-consumer.mjs",
      "digest": "sha256:48d5ff057865f8c599e6a17055787ca21946f9624a09495abb3e451b43b13099",
      "bytes": 45585,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-packed-consumer.mjs"
    },
    {
      "sourceId": "context.packed-consumer-host",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-packed-consumer-host.ts",
      "digest": "sha256:90633af96b2afaa66dfaddd66e27f2e050dfd0ac5c052f8c1e2413d21db74d00",
      "bytes": 23434,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-packed-consumer-host.ts"
    },
    {
      "sourceId": "context.prior-assessment",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-integration-assessment.md",
      "digest": "sha256:c7e2d043286943f9552dc34fde7dc709c94138b94ed9475eb15969ad8f0ea32f",
      "bytes": 2018,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-integration-assessment.md"
    },
    {
      "sourceId": "context.prior-attempt-1-assessment",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-assessment.md",
      "digest": "sha256:428b6277fdb814ccb17650ed6f30f997eb79a7cb5fe5d484f41eb5e603260d11",
      "bytes": 1050,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-assessment.md"
    },
    {
      "sourceId": "context.prior-attempt-1-fix",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-fix.json",
      "digest": "sha256:0aae32b770869cf74ce556540026852d18a3f133386e78bdae8a68baee30fea8",
      "bytes": 7643,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-fix.json"
    },
    {
      "sourceId": "context.prior-attempt-1-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-verification.json",
      "digest": "sha256:beb6610f2b8f67508260c0284f2e98e6ce50ab6fa83912e70f34835c431b3798",
      "bytes": 731,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-verification.json"
    },
    {
      "sourceId": "context.prior-review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-review-handoff.json",
      "digest": "sha256:5d6a6ca39024a50d3c662364417ff11ac48cf20c3f4edf4cd3bfe9ab6a62a460",
      "bytes": 9384,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-review-handoff.json"
    },
    {
      "sourceId": "context.prior-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-handoff-verification.json",
      "digest": "sha256:a25efdc81edade84b81a446615e8e186aa1064f85ba9885b4069c7c071cbcde1",
      "bytes": 1607,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-gate.mjs",
      "digest": "sha256:6e1e398c7d15a0b5ac3562ccb90913ecb6480f700a9e53cb1aaf076f2f704b21",
      "bytes": 30623,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-gate-tests.mjs",
      "digest": "sha256:1995a9baa4c6c5f6b1beb2b14888a9cfc05bb872dfd98995edb6104552d8b0e1",
      "bytes": 42123,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-gate-tests.mjs"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-review-tests.mjs",
      "digest": "sha256:8807d877066f4e5a6b950eff06cfe497756bf2f53a062caffff2bc4f3d841d85",
      "bytes": 57779,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-review-tests.mjs"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/review-contract.md",
      "digest": "sha256:a4baafe5c14769d4780bfaa43090fbc52aafa255242222e450f86ccab513cc5a",
      "bytes": 2917,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/review-contract.md"
    },
    {
      "sourceId": "context.root-cause",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-root-cause-analysis.md",
      "digest": "sha256:210b79f12754ff1c85b329cc9eeb85017ba48f797558f91d36698f4a3fc404d7",
      "bytes": 2144,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-root-cause-analysis.md"
    },
    {
      "sourceId": "context.source-delta",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/revision-29-source.patch",
      "digest": "sha256:6f9d2261e0b277b27fbf2d8b3bd9144fec6c795e6929855b8ee5decb4725a80e",
      "bytes": 32307,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/revision-29-source.patch"
    },
    {
      "sourceId": "context.specialist-run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/specialist-run-contract.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-test-plan.md",
      "digest": "sha256:f024fcb38f6064f84db816d993fc4c6388a3679175e594c1f219a3c7d9269393",
      "bytes": 1837,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-test-plan.md"
    },
    {
      "sourceId": "context.typescript-launcher",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-run-typescript.mjs",
      "digest": "sha256:3390a3bdea97140e8c02ad0f917dcb62bbaf2e12921ea5fd1a2255362475c25f",
      "bytes": 7064,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-run-typescript.mjs"
    },
    {
      "sourceId": "context.typescript-smoke",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-typescript-smoke.ts",
      "digest": "sha256:2bd37583948fb1aee98dc67f3c3cacbf4437eb9296c4b90f83bb7eacbe0332b5",
      "bytes": 87,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-typescript-smoke.ts"
    },
    {
      "sourceId": "context.typescript-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-typescript-toolchain-tests.mjs",
      "digest": "sha256:ba8459297e1a44c26a918f32a3232ed6584c27ec1bf15248503ff66b7442110d",
      "bytes": 13202,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-typescript-toolchain-tests.mjs"
    },
    {
      "sourceId": "context.v11-audit-pass",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-audit-pass.json",
      "digest": "sha256:c311266621d73fae30ea83399434117402bbb35b6641d601e7ab85349843a2c0",
      "bytes": 8713,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-audit-pass.json"
    },
    {
      "sourceId": "context.v11-audit-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-audit-report.json",
      "digest": "sha256:3930273abf60765480672f94e719c15b298f9a28a9fd71eeabd2169661924ef1",
      "bytes": 20361,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-audit-report.json"
    },
    {
      "sourceId": "context.v11-authorization",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-launch-authorization.json",
      "digest": "sha256:9635eba70581ddd334f03bb6b1c739e4f6bdc6fc2ac32ccde791bef340516ec1",
      "bytes": 985,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-launch-authorization.json"
    },
    {
      "sourceId": "context.v11-bind-pass",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-bind-pass.json",
      "digest": "sha256:4f55e937cef60e38819a3764258b48b3998391d481d8efac6432842d191bce89",
      "bytes": 6600,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-bind-pass.json"
    },
    {
      "sourceId": "context.v11-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-prelaunch-receipt.json",
      "digest": "sha256:8b5f2dcf8fbd8d4c9435ba2c56439ea4d547b606964c56fa1a14e265566944c4",
      "bytes": 2255,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-prelaunch-receipt.json"
    },
    {
      "sourceId": "context.v11-replay",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-v11-revision-43-replay.md",
      "digest": "sha256:77b15bca6814b39f620c330ac8c4803d1053b526cfbeca5bc026925f20e4737f",
      "bytes": 3279,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-v11-revision-43-replay.md"
    },
    {
      "sourceId": "context.v11-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-report.json",
      "digest": "sha256:443494fef3dc73812301f7071e461702c5528dace8856ac710872429ded0c7e0",
      "bytes": 25925,
      "purposes": [
        "Authenticate and independently audit Revision 29 Attempt 2 fresh aggregate binding, compiler execution, and release evidence."
      ],
      "workUnitIds": [
        "review.copied-typescript-execution-correction.r29.attempt2"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-report.json"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/review-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/agent-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification-run-metadata.txt",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification.log",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-biome.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-executor-boundary.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-git-environment-boundary-child.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-gitattributes",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-hosted-workflow.yml",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-typescript-smoke.ts",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-packed-consumer-host.ts",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-packed-consumer.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-gate-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-run-typescript.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-typescript-toolchain-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-assessment.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-fix.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-integration-assessment.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-review-handoff.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-aggregate-verification.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-complete-lifecycle-verification.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-integration-owner-verification.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-root-cause-analysis.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-v11-revision-43-replay.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/review-checkpoint.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/revision-29-source.patch",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-audit-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-audit-report.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-bind-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-launch-authorization.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-prelaunch-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-report.json"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/review-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/agent-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification-run-metadata.txt",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/aggregate-verification.log",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-biome.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-executor-boundary.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-git-environment-boundary-child.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-gitattributes",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-hosted-workflow.yml",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-lifecycle-typescript-smoke.ts",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-packed-consumer-host.ts",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-packed-consumer.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-gate-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-release-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-run-typescript.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/final-typescript-toolchain-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-assessment.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-fix.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/prior-attempt-1-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-integration-assessment.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r28-review-handoff.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-aggregate-verification.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-complete-lifecycle-verification.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-integration-owner-verification.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-root-cause-analysis.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/r29-v11-revision-43-replay.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/review-checkpoint.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/revision-29-source.patch",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-audit-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-audit-report.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-bind-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-launch-authorization.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-prelaunch-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r29/attempt-2/inputs/snapshots/v11-revision-43-report.json"
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
      "criterionId": "criterion.review.copied-typescript-execution-correction.r29.attempt2",
      "criterion": "Fresh exact-checkpoint aggregate evidence closes Attempt 1 without relabeling history, while Revision 29's accepted compiler execution correction and all prior release controls remain valid.",
      "requirementId": "evidence.review.copied-typescript-execution-correction.r29.attempt2",
      "kind": "review",
      "duty": "produce",
      "description": "Authenticate all sources, resolve every closed Attempt 2 point, search for bypasses, and return a concrete pass or causal correction route.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-revision-29-release-correction-review-attempt-2.md"
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
  "contentDigest": "sha256:e538dc9d0380b285648ac481938812c1463f497b7504548b5b8988c5c5f8e7f7"
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
    "id": "v12.ide-run-loop.review.copied-typescript-execution-correction-r29-attempt2",
    "revision": 2,
    "digest": "sha256:c87d3ba8a8a2fae45b07b4080b5dddb9139fcedd155eecb789b0f81038cd150d"
  },
  "agent": {
    "id": "agent.52af9aa982525b256b5c9819861f33d76f13536243eaf8bb382434763277e2ba",
    "blueprintDigest": "sha256:e538dc9d0380b285648ac481938812c1463f497b7504548b5b8988c5c5f8e7f7"
  },
  "compilationDigest": "sha256:d2e25fd584a7319fe89af77ae47ab836cb9b6998c7aa2508ce3f960176a4b271",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.copied-typescript-execution-correction.r29.attempt2"
  ],
  "artifacts": [
    {
      "name": "independent-revision-29-release-correction-review-attempt-2.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.copied-typescript-execution-correction.r29.attempt2",
      "requirementId": "evidence.review.copied-typescript-execution-correction.r29.attempt2",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-revision-29-release-correction-review-attempt-2.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
