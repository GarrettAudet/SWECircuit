# Specialist Contract: agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73

Compilation: `sha256:fd9c21ca81ddcef94bc1da50faf721238145a9807eae7860a34583c8512c9ff5`
Blueprint: `sha256:b8ff878867be0b3ce8ade47cee92d90abda79ae38265f67d64d8fdc214a95d11`

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
  "id": "agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 5,
  "goalDigest": "sha256:a49c0bf81ea77606044c6f851e068b9e70d13c1d77330bae7d3314fb98a111d1",
  "candidateId": "team.bf712b91fe7b13ed4043c18e1a6589383011df3158d018a99bdf487fafddf410",
  "workUnitIds": [
    "fix.release-evidence.r5"
  ],
  "objectives": [
    {
      "workUnitId": "fix.release-evidence.r5",
      "objective": "Make the immutable R2 release-review harness verify and expose the complete partial, split, and pass correction lineage and include the release-gate wrapper in canonical format and lint coverage."
    }
  ],
  "modules": [
    {
      "id": "correction.release-evidence",
      "action": "Extend candidate snapshots and primary-evidence verification across revision 1's expected retired agent, revision 2 and 3 complete SPLIT routes, revision 4 PASS, and the eventual complete revision-5 package; fail closed on any unexpected roster or outcome, keep raw bytes direct, and add scripts/run-v12-release-gate.mjs to format, format-check, and lint without changing the gate's semantics.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "VerifiedCorrectionRevisionChain"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "LineageBoundReleaseEvidenceHarness"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:7af49d3d12d0f27fd71f785f886d0adfe660e664274e3b12e46423e39b7ad11c",
      "bytes": 2847,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-correction-aggregate-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
      "digest": "sha256:f74436e9e9a234cc8c41cba9a3b47ee84d8e0bff3ceba811252f008686c51677",
      "bytes": 6718,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json"
    },
    {
      "sourceId": "context.release-correction-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
      "digest": "sha256:dc177cddfeae16dcefe456581fcaed2e072a8fa84b4ad67204146062d4995ef2",
      "bytes": 641,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json"
    },
    {
      "sourceId": "context.release-correction-dogfood-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json",
      "digest": "sha256:23bbdd75d90ee42595b5f22f1ba2c9ba9f608866b049285b027ae579225b2e4b",
      "bytes": 6667,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json"
    },
    {
      "sourceId": "context.release-correction-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
      "digest": "sha256:3db78ce7e72fb6554df199d1ee3d9f8f6f88a2d9a0c15b5395b7fd3ed2bd82bd",
      "bytes": 313118,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json"
    },
    {
      "sourceId": "context.release-correction-r2-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json",
      "digest": "sha256:52f1a755dc039240fcfbbb4679382504f1470758a21df41007e1d67e8b4d138b",
      "bytes": 641,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json"
    },
    {
      "sourceId": "context.release-correction-r2-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json",
      "digest": "sha256:8db3fea6a6f47fba804f72d454660bafda7ab5d06691d729157e2f8f3aba66be",
      "bytes": 7254,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json"
    },
    {
      "sourceId": "context.release-correction-r2-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json",
      "digest": "sha256:b0ac5ef2c1131207ccee6a43ade45fd750307f1ab763c7b74d0308d3fe9960fd",
      "bytes": 126914,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json"
    },
    {
      "sourceId": "context.release-correction-r2-replan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json",
      "digest": "sha256:73fcd5841f739c4f353355ddba6b412d68c3b2d8233ccc371ef2de9a2477d282",
      "bytes": 3795,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json"
    },
    {
      "sourceId": "context.release-correction-r2-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json",
      "digest": "sha256:cc0fe31e1f2b4dfb903667056b83fffb5402afc6f4f8bf4a727c4178abae5afb",
      "bytes": 1308,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json"
    },
    {
      "sourceId": "context.release-correction-r3-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json",
      "digest": "sha256:615cc4bd3965a7344a53485a35c58bcada2217609760388d2a729beda4c574cc",
      "bytes": 641,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json"
    },
    {
      "sourceId": "context.release-correction-r3-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json",
      "digest": "sha256:89ab112ce3df0a97f64db2994fc792238955b7007a7ce0310b4af39b4340d3df",
      "bytes": 8095,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json"
    },
    {
      "sourceId": "context.release-correction-r3-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json",
      "digest": "sha256:26bf421f81127ecfe85f31b6d044a2a3accbaca788ab378a90e2db4733a887a6",
      "bytes": 141194,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json"
    },
    {
      "sourceId": "context.release-correction-r3-replan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json",
      "digest": "sha256:67eac872b0d88bbade9af9afda268178f57077b0abdc4f605444ead1da6c186c",
      "bytes": 2807,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json"
    },
    {
      "sourceId": "context.release-correction-r3-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json",
      "digest": "sha256:93ea426aadd18f7ff5b68bc779b247b2c68ab8c476fcd969941eb3b18332e3c1",
      "bytes": 1308,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json"
    },
    {
      "sourceId": "context.release-correction-r4-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json",
      "digest": "sha256:eab4c5b000fc984a662ba1870506243b6f3bdc56db01d4596bfedc5d208db26e",
      "bytes": 641,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json"
    },
    {
      "sourceId": "context.release-correction-r4-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json",
      "digest": "sha256:5afb33ee3c7f456ea0331d7d0735a0291cd69fb5d7a4c6c6d80982177d815090",
      "bytes": 9058,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json"
    },
    {
      "sourceId": "context.release-correction-r4-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json",
      "digest": "sha256:c34764e2e121af4634cb4aaaa6a46a13584a6b2999bb5650cc17f5ce944ddaa4",
      "bytes": 156278,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json"
    },
    {
      "sourceId": "context.release-correction-r4-replan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json",
      "digest": "sha256:64376261a673ebc7ec29222ee90569097915879521d8ea062a36a9d156e8b34d",
      "bytes": 2701,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json"
    },
    {
      "sourceId": "context.release-correction-r4-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json",
      "digest": "sha256:4679cd6145a4afa16adcd7e395a0cf7cfa7fd770cc2c0e328fcdf9189e71e06f",
      "bytes": 1306,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json"
    },
    {
      "sourceId": "context.release-correction-release-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json",
      "digest": "sha256:3510b98137b0cd8746d5440f4254bcfed8c493f714a57539a705eb12012c12fd",
      "bytes": 5693,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json"
    },
    {
      "sourceId": "context.release-correction-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json",
      "digest": "sha256:b33cc6312e2db6481ae9d634607a952a67c3fb09a2c6f42b40a0f7338251dd1e",
      "bytes": 2767,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:70c80d5c3c51e8abc566b26c12b1649675d2fc49268367b13383d0eaf0a0a301",
      "bytes": 6149,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-review-r2-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:34011532653b096f470d3aba9ccb91c587cdfcf301a8c53e1bec20460cd138ed",
      "bytes": 45984,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-r2-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:9b40e420b3330e810d92fee2d0afe5ab3b22700bf1e4bba4ce16cc7dd61df368",
      "bytes": 4483,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.review-handoff-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
      "digest": "sha256:8e910cf4d124f0611c23f4d6dfe3cc053d7a2ee826fcacca3f287cbce0459e8a",
      "bytes": 3044,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.review-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
      "digest": "sha256:fbce408c5009e88fa08ff33dd1a5ed5d8e9fe949afc6058fa90b5f6f01d595cd",
      "bytes": 24102,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs"
    },
    {
      "sourceId": "context.review-lifecycle",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
      "digest": "sha256:13e1b510607a4c23223b59a0190e3e490be3e95fc94e56dba45cd5e4bf3bdc84",
      "bytes": 5649,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-product",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
      "digest": "sha256:7fb4caf2142208d0735d17bc75610098e671113f1c7a1047cc29bb62ce0e2a26",
      "bytes": 5819,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-security",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
      "digest": "sha256:605a4e7065e1c4af2b3114129e919a810e430b584e31c718c0d78fa02fa027b7",
      "bytes": 7259,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
      "digest": "sha256:8e4f69aae43ae919b3ac71f3055ac80f9bcb30cec936629b64b6f142c3169d42",
      "bytes": 2558,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.specialist-handoff",
      "kind": "repository",
      "locator": "path:src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "src/specialist-handoff.ts"
    },
    {
      "sourceId": "context.specialist-render",
      "kind": "repository",
      "locator": "path:src/specialist-render.ts",
      "digest": "sha256:e8c2c73bf266b32ebee589497a5298435bb50f59e50d00d9d70ed3f65dc526e7",
      "bytes": 19184,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "src/specialist-render.ts"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/test-plan.md",
      "digest": "sha256:2dc1648ba64fec0573806bea455559a3ac4c678e50f60b99933a4529784fbea4",
      "bytes": 1998,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/test-plan.md"
    },
    {
      "sourceId": "context.v11-audit-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
      "digest": "sha256:9ececde079abbfdc6a37809714047c3a26f4966e2830582e2c53abdd638d9c9d",
      "bytes": 195,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/spec.md"
    },
    {
      "sourceId": "context.verification-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
      "digest": "sha256:e8b25ac1de45cee31aced60c4a811699d03b36121bb660d7e1c18a0f4c4c01a8",
      "bytes": 635,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json"
    },
    {
      "sourceId": "context.verification-handoff-a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
      "digest": "sha256:d2b3ea9c077345fecc78f504a5e376207c367706b9685da4485509fc5c048137",
      "bytes": 4356,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json"
    },
    {
      "sourceId": "context.verification-handoff-b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
      "digest": "sha256:1357ace5bbffef6194e17a43e12edcedd32aa29cc9967cdabd40aa21a004a4d2",
      "bytes": 6031,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json"
    },
    {
      "sourceId": "context.verification-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
      "digest": "sha256:74eefd84adae4a34c5220a9e1039d98f1b1fa651e7df3a3f8cfe27a338053777",
      "bytes": 137049,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json"
    },
    {
      "sourceId": "context.verification-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
      "digest": "sha256:985aac5600d600af68be12d6d8f258ce262a1f5ee0d0490d5e85c55dc0ebb103",
      "bytes": 1878,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r5 contract."
      ],
      "workUnitIds": [
        "fix.release-evidence.r5"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.release-evidence"
    ],
    "scope": {
      "read": [
        "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-gate.mjs",
        "src/specialist-handoff.ts",
        "src/specialist-render.ts"
      ],
      "write": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json"
      ],
      "conflictZones": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
          "package.json",
          "scripts/run-v12-release-gate.mjs",
          "src/specialist-handoff.ts",
          "src/specialist-render.ts"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "package.json"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "node",
          "npm",
          "powershell"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not use network access, change Git state, launch descendants, write outside the exact scope, or claim that core performs host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.release-evidence.r5",
      "criterion": "Make the immutable R2 release-review harness verify and expose the complete partial, split, and pass correction lineage and include the release-gate wrapper in canonical format and lint coverage.",
      "requirementId": "evidence.release-evidence.r5",
      "kind": "review",
      "duty": "produce",
      "description": "Provide syntax, strict lineage verification, immutable snapshot coverage, direct primary-source coverage, package-script coverage, format, and no-summary-only release evidence.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "release-evidence-correction-r5.md"
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
    "If native apply_patch fails before mutation because of the host sandbox, an exact precondition-hash-guarded PowerShell write is allowed within the declared write scope; verify the resulting file bytes immediately.",
    "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Run only local focused verification allowed by the contract and report every failing command truthfully.",
    "Stop if any declared source is unavailable or fails its exact digest and byte binding.",
    "Write only the exact declared write scope; do not change Git state, use the network, launch descendants, or widen the public contract."
  ],
  "contentDigest": "sha256:b8ff878867be0b3ce8ade47cee92d90abda79ae38265f67d64d8fdc214a95d11"
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
    "id": "v12.ide-run-loop.implementation.release-correction",
    "revision": 5,
    "digest": "sha256:a49c0bf81ea77606044c6f851e068b9e70d13c1d77330bae7d3314fb98a111d1"
  },
  "agent": {
    "id": "agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73",
    "blueprintDigest": "sha256:b8ff878867be0b3ce8ade47cee92d90abda79ae38265f67d64d8fdc214a95d11"
  },
  "compilationDigest": "sha256:fd9c21ca81ddcef94bc1da50faf721238145a9807eae7860a34583c8512c9ff5",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.release-evidence.r5"
  ],
  "artifacts": [
    {
      "name": "release-evidence-correction-r5.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.release-evidence.r5",
      "requirementId": "evidence.release-evidence.r5",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "release-evidence-correction-r5.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
