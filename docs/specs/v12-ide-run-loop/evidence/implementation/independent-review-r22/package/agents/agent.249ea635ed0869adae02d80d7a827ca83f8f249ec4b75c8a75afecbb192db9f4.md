# Specialist Contract: agent.249ea635ed0869adae02d80d7a827ca83f8f249ec4b75c8a75afecbb192db9f4

Compilation: `sha256:fd2e58b00bdba106bb708477e3254e8c49bd463cf30b6fe73cd16cf66a927503`
Blueprint: `sha256:3fb8cc64ef56dfc8bc6f93c3a732f1af7ff1fdc3d87fed72a38bf04cabb4f0c3`

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
  "id": "agent.249ea635ed0869adae02d80d7a827ca83f8f249ec4b75c8a75afecbb192db9f4",
  "goalId": "v12.ide-run-loop.review.closed-npm-provenance-r22",
  "goalRevision": 1,
  "goalDigest": "sha256:6a9042ff0fb382491e60f92a8554c2e5b0d46a773a32f8db11e1baadb300ca7a",
  "candidateId": "team.96eead27b6c410446aa7dcd2ed59703e278e91a0469aca50457d6aa6ff1dc22f",
  "workUnitIds": [
    "review.closed-npm-provenance.r22"
  ],
  "objectives": [
    {
      "workUnitId": "review.closed-npm-provenance.r22",
      "objective": "Authenticate and independently audit exact Revision 22 against the closed review contract and search for new trust-boundary, provenance, cleanup, or test-quality defects."
    }
  ],
  "modules": [
    {
      "id": "review.closed-npm-provenance",
      "action": "Trace source provenance, private npm configuration identity, stable reconstruction, child enforcement, receipts, cleanup, package-bound fan-in, real lifecycle execution, and fail-closed coverage before returning an independent verdict.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "PackageVerifiedRevision22Implementation"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentRevision22TrustVerdict"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/agent-contract.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/agent-contract.md"
    },
    {
      "sourceId": "context.final-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-gate.mjs"
    },
    {
      "sourceId": "context.final-gate-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-gate-tests.mjs",
      "digest": "sha256:92c72bb85bbcfd6cfafefbede78ccb7cf753d232e068032367c1e0a7828d42b6",
      "bytes": 42125,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-gate-tests.mjs"
    },
    {
      "sourceId": "context.final-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-harness.mjs",
      "digest": "sha256:b1314ea536bb367096decde5b28fad24e352d1a00fd383be0b4bf8d5545bcd73",
      "bytes": 127748,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-harness.mjs"
    },
    {
      "sourceId": "context.final-lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-lifecycle-helper.mjs",
      "digest": "sha256:101c53a45cdc4edca820f1a8811b668ca8a9c88c777f2785dee3c82e914f53c5",
      "bytes": 54920,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.final-lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-package-lock.json"
    },
    {
      "sourceId": "context.final-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-package.json",
      "digest": "sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2",
      "bytes": 3719,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-package.json"
    },
    {
      "sourceId": "context.final-parent",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-parent.mjs",
      "digest": "sha256:df78c40143137f505959389bb7fc6a6282603e431ccb5abd751ea1539ffac5e1",
      "bytes": 96946,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-parent.mjs"
    },
    {
      "sourceId": "context.final-review-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-review-tests.mjs",
      "digest": "sha256:1fd87295b69e1f81c41bf1681acf23712b8dd76e65029ac821b98f45c3b2d7c3",
      "bytes": 44155,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-review-tests.mjs"
    },
    {
      "sourceId": "context.final-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-verifier.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-verifier.mjs"
    },
    {
      "sourceId": "context.pre-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-gate.mjs"
    },
    {
      "sourceId": "context.pre-gate-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-gate-tests.mjs",
      "digest": "sha256:07733f1e6db96753a0a4c7a2d8e80a6978a43216d766a98d05a8147b074059e1",
      "bytes": 33983,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-gate-tests.mjs"
    },
    {
      "sourceId": "context.pre-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-harness.mjs",
      "digest": "sha256:962be0fe8055a62b4d8f4d38994c4a8560d880acf4b6b903a0d59e80eeb25dbd",
      "bytes": 122299,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-harness.mjs"
    },
    {
      "sourceId": "context.pre-lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-lifecycle-helper.mjs",
      "digest": "sha256:56f5ecc17bd19a0647fb8b835a62e7e5dc28644a16046f4fd9f213970240abde",
      "bytes": 49557,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-lifecycle-helper.mjs"
    },
    {
      "sourceId": "context.pre-lock",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-package-lock.json",
      "digest": "sha256:e93281b52c1e9e8ef7c40406f2955f9e782a7567a10875654f19c2eb7046aa27",
      "bytes": 21014,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-package-lock.json"
    },
    {
      "sourceId": "context.pre-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-package.json",
      "digest": "sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2",
      "bytes": 3719,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-package.json"
    },
    {
      "sourceId": "context.pre-parent",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-parent.mjs",
      "digest": "sha256:65f6e19e89d345b114219e24228327ca5f8803b2c51b3c47809ca1fc56a90e4e",
      "bytes": 83371,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-parent.mjs"
    },
    {
      "sourceId": "context.pre-review-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-review-tests.mjs",
      "digest": "sha256:2903c1b6d7a41f5d9af7c62146155941392b2645f205eee003c9ae0730ce9fcb",
      "bytes": 42687,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-review-tests.mjs"
    },
    {
      "sourceId": "context.pre-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-verifier.mjs",
      "digest": "sha256:ee5698570b9122255256f6020ea2415a75af06113b44f4048cb0c70fcc7082ff",
      "bytes": 30840,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-verifier.mjs"
    },
    {
      "sourceId": "context.r20-review-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-attempt-history.md",
      "digest": "sha256:93ad7851321af78560736fbb40c9a5019b4c786be4d79104520072b66b78501c",
      "bytes": 1284,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-attempt-history.md"
    },
    {
      "sourceId": "context.r20-review-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-fix-handoff.json",
      "digest": "sha256:c9799090bd054dca1cb299a39fc4e159dc2be6b7f70d27ec290e6d4c6b10c161",
      "bytes": 15245,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-fix-handoff.json"
    },
    {
      "sourceId": "context.r20-review-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-verification.json",
      "digest": "sha256:7fb46adc270b8770de52f019dd62fbd902966276e8346c0750d08c8602480d47",
      "bytes": 1322,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-verification.json"
    },
    {
      "sourceId": "context.r21-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-attempt-history.md",
      "digest": "sha256:dad5a3055ee56d6295a151274e21c3d5170efd3d30f03e7ed75ca0c0b16c5577",
      "bytes": 2014,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-attempt-history.md"
    },
    {
      "sourceId": "context.r21-block-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-block-handoff.json",
      "digest": "sha256:0224243c4325b298fb04d6af870f14d70e2b0fa95a5549906e809d5b386155c9",
      "bytes": 14865,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-block-handoff.json"
    },
    {
      "sourceId": "context.r21-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-handoff-verification.json",
      "digest": "sha256:6fbe4c128f305ef0fbd2d76ed01bf049a9d9a74a142e169907d65542fd1f8040",
      "bytes": 1326,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-handoff-verification.json"
    },
    {
      "sourceId": "context.r22-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-approval.json",
      "digest": "sha256:b01043783688294b8af0b45b7d0b29ecbdbdac4b96965392e9c573e7b7f30534",
      "bytes": 686,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-approval.json"
    },
    {
      "sourceId": "context.r22-attempts",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-attempt-history.md",
      "digest": "sha256:d0bbf786a9ccc41a7ad662b943a2fe54600627b1de8f545dc61c1068c0fa8cef",
      "bytes": 1835,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-attempt-history.md"
    },
    {
      "sourceId": "context.r22-compilation-summary",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-compilation-summary.json",
      "digest": "sha256:a47db34028c71f4d077074aca6a04f7b32f283d3679e211894c931ce976a4f4d",
      "bytes": 3448,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-compilation-summary.json"
    },
    {
      "sourceId": "context.r22-correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-correction-contract.md",
      "digest": "sha256:e21440b34ded2ee1cf1454aee5d003eeeca888a65382356a1f75cf92b7ab9530",
      "bytes": 4598,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-correction-contract.md"
    },
    {
      "sourceId": "context.r22-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-pass-handoff.json",
      "digest": "sha256:0bfac8263bd0d209baf33f7cbfd29fc68482a52eef187f77fcf7ce66ebf28988",
      "bytes": 21143,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-pass-handoff.json"
    },
    {
      "sourceId": "context.r22-handoff-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-handoff-verification.json",
      "digest": "sha256:f724bf4f6f03446e1835afc815e0da9fceb670075d62e98922494d9f7f9571d4",
      "bytes": 1323,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-handoff-verification.json"
    },
    {
      "sourceId": "context.r22-package-envelope",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-package-envelope.json",
      "digest": "sha256:59794b8d9285f9f618a39124fc39c55e13101edf56df4cf7c012ca97a3ddee07",
      "bytes": 109869,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-package-envelope.json"
    },
    {
      "sourceId": "context.r22-reproductions",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-reproductions.md",
      "digest": "sha256:481d79b780504b74971ce4e28f0f8aefd9fbe7c253e346995344c2c3eedff467",
      "bytes": 1621,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-reproductions.md"
    },
    {
      "sourceId": "context.r22-request",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-request.json",
      "digest": "sha256:470bacad3fcfe60cf5ac37c5a58095e2f99114bc59d4c2807d88ac1c6d629a8b",
      "bytes": 29472,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-request.json"
    },
    {
      "sourceId": "context.r22-test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-test-plan.md",
      "digest": "sha256:0673e28bfb4c68823daec68bd192d3587bb8f4e47b093fad5e4e3d595cf03992",
      "bytes": 2428,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-test-plan.md"
    },
    {
      "sourceId": "context.review-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/review-contract.md",
      "digest": "sha256:3f912072ede9e9e3982837bfffb2f4bf8bc4283de87aed679cccef8f316b7710",
      "bytes": 3278,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/review-contract.md"
    },
    {
      "sourceId": "context.specialist-run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Authenticate and independently audit the exact Revision 22 source, producer package, runtime evidence, and prior rejection chain."
      ],
      "workUnitIds": [
        "review.closed-npm-provenance.r22"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/specialist-run-contract.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.release-evidence-security"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/review-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/agent-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-gate-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-harness.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-parent.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-verifier.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-gate-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-harness.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-lifecycle-helper.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-package-lock.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-package.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-parent.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-review-tests.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-verifier.mjs",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-fix-handoff.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-block-handoff.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-compilation-summary.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-pass-handoff.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-reproductions.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-request.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/specialist-run-contract.md"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/review-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/agent-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-gate-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-harness.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-parent.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/final-verifier.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-gate-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-harness.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-lifecycle-helper.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-package-lock.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-package.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-parent.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-review-tests.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/pre-verifier.mjs",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-fix-handoff.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r20-review-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-block-handoff.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r21-handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-compilation-summary.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-pass-handoff.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-reproductions.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-request.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/r22-test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/independent-review-r22/inputs/snapshots/specialist-run-contract.md"
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
      "Do not edit files, install packages, mutate Git state, use network access, launch descendants, refresh V11, run a candidate gate or R2 phase, claim release readiness, approve merge, or alter evidence."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.review.closed-npm-provenance.r22",
      "criterion": "Exact Revision 22 satisfies every closed review point, is fully reconstructable, preserves all valid controls, and introduces no release-blocking trust or test-quality finding.",
      "requirementId": "evidence.review.closed-npm-provenance.r22",
      "kind": "review",
      "duty": "produce",
      "description": "Provide package and source authentication, disposition of every required review point, bypass analysis, test-quality analysis, residual host boundaries, and a concrete pass or correction route.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "independent-revision-22-trust-review.md"
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
    "Do not claim release readiness, hosted CI, merge approval, host isolation, cache provenance, or authenticated human identity.",
    "Remain read-only; report every defect without changing reviewed source or evidence.",
    "Resolve every closed review-contract point and search for new bypasses before returning pass.",
    "Return only the exact closed SpecialistAgentHandoff JSON object from the generated contract.",
    "Stop before semantic review if any declared snapshot byte count or SHA-256 binding fails.",
    "Treat producer tests and handoff as evidence only, never as the semantic verdict."
  ],
  "contentDigest": "sha256:3fb8cc64ef56dfc8bc6f93c3a732f1af7ff1fdc3d87fed72a38bf04cabb4f0c3"
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
    "id": "v12.ide-run-loop.review.closed-npm-provenance-r22",
    "revision": 1,
    "digest": "sha256:6a9042ff0fb382491e60f92a8554c2e5b0d46a773a32f8db11e1baadb300ca7a"
  },
  "agent": {
    "id": "agent.249ea635ed0869adae02d80d7a827ca83f8f249ec4b75c8a75afecbb192db9f4",
    "blueprintDigest": "sha256:3fb8cc64ef56dfc8bc6f93c3a732f1af7ff1fdc3d87fed72a38bf04cabb4f0c3"
  },
  "compilationDigest": "sha256:fd2e58b00bdba106bb708477e3254e8c49bd463cf30b6fe73cd16cf66a927503",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.closed-npm-provenance.r22"
  ],
  "artifacts": [
    {
      "name": "independent-revision-22-trust-review.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.closed-npm-provenance.r22",
      "requirementId": "evidence.review.closed-npm-provenance.r22",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "independent-revision-22-trust-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
