# Specialist Contract: agent.1e522d86b809d360e459b4afd630c2311033a972b455c615c7eca8bf09b3942d

Compilation: `sha256:eb3e7fd1341c45966f95a9a440685193b24206f9155de50e96aa4596e0b41998`
Blueprint: `sha256:52a49774429ef164d4fc15f354957cd14b99e9560cd051998ffc614218d551d2`

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
  "id": "agent.1e522d86b809d360e459b4afd630c2311033a972b455c615c7eca8bf09b3942d",
  "goalId": "v12.ide-run-loop.release-review-r2",
  "goalRevision": 1,
  "goalDigest": "sha256:a70553a6f4c2f00f243ca5eabeaf848d0988b4670279af555374312d498d60b3",
  "candidateId": "team.6c5b99128b2659b65498546ea6673dfa7069228e1dc9c92815d71f29f4a7de55",
  "workUnitIds": [
    "review.r2.security-trace-authority"
  ],
  "objectives": [
    {
      "workUnitId": "review.r2.security-trace-authority",
      "objective": "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
    }
  ],
  "modules": [
    {
      "id": "release-review-r2.security-trace-authority",
      "action": "Attack schema-loading effects, digest substitution, stale sessions and handoffs, authority confusion, unsafe controls, snapshot provenance, raw primary evidence, Audit-B approval binding, and canonical-gate receipt closure.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenV12ReleaseCandidateR2"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "SecurityTraceAuthorityReleaseReviewR2"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/architecture/decisions/0005-immutable-specialist-run-session.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/architecture/decisions/0005-immutable-specialist-run-session.md"
    },
    {
      "sourceId": "context.adversarial-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run.test.mjs",
      "digest": "sha256:3bf68e69a8193b996ac69d32cd01d8c43e71126c338efb8e532fa36d59626331",
      "bytes": 21858,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run.test.mjs"
    },
    {
      "sourceId": "context.architecture",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
      "digest": "sha256:861a5a5471ecf8463cd8fa9e4035acb3a5c9a16f7e0c65385ba29fa84509d3dc",
      "bytes": 26111,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md"
    },
    {
      "sourceId": "context.candidate-manifest",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/candidate.json",
      "digest": "sha256:28ef7cb5e60c2448ba19e18cd63c783fefb145c96934891852ff44ebf72d880e",
      "bytes": 305897,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/candidate.json"
    },
    {
      "sourceId": "context.canonical-gate-attempt-1-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
      "digest": "sha256:4c636e486f36c22b74f12fdd4b4470eb9056f63f64eca05058ae6923976bb15c",
      "bytes": 1221,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.canonical-gate-attempt-1-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
      "digest": "sha256:4381d1a9ce1c36beb8723eadfb3619288935b9d095de672c450121c23dc0dfad",
      "bytes": 11763,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.canonical-gate-attempt-1-stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
      "digest": "sha256:afb6b266dd504cbf89d2cb55b6f9c5c6872fd5636acef8848e2105257aecef12",
      "bytes": 295768,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.canonical-gate-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate-receipt.json",
      "digest": "sha256:ea54fede7025592c766ad42b271a596132d771e2077daaa2f46489ef0e590d4f",
      "bytes": 14225,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.canonical-gate-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate.stderr.log",
      "digest": "sha256:916ed20ef7b4f5bb27887bbfdf6eb2c7182eaf5313ead05a8acc4a98e7f7c791",
      "bytes": 25923,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.canonical-gate-stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate.stdout.log",
      "digest": "sha256:6c25582297ae4daa6a879f83b517fe507272396d5d11ff722d59221ac20544b4",
      "bytes": 306338,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/constants.ts",
      "digest": "sha256:2fded9c023b41dc58ad7b8471d9b3f7dbc5b4566c6fecbb6008829c1c5000b6a",
      "bytes": 2570,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/constants.ts"
    },
    {
      "sourceId": "context.debug-notes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/debug-notes.md",
      "digest": "sha256:b65d2c33eefe372f681f53b5ff7a7d9c54cafd6f3a2287ed38fffbbd7f504e05",
      "bytes": 74955,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/debug-notes.md"
    },
    {
      "sourceId": "context.diagnostic-catalog",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/diagnostic-catalog.json",
      "digest": "sha256:ca09d174600a7841dcab90b15fe1d95bc9a24f72411704fbe794d2f52dec84a2",
      "bytes": 13307,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/diagnostic-catalog.json"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/diagnostics.ts",
      "digest": "sha256:3d27fe071994a2a87a59ecadc52a788a6aaf85737b46371f5622bf10c50aede6",
      "bytes": 25190,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/diagnostics.ts"
    },
    {
      "sourceId": "context.enclosing-candidate-git-probe",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-enclosing-candidate-git-probe.mjs",
      "digest": "sha256:b0faba2306dfc00dec70d33e62f8173364d853a2b1a00beecea144dc6baea40d",
      "bytes": 3327,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-enclosing-candidate-git-probe.mjs"
    },
    {
      "sourceId": "context.foundation-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-foundation.test.mjs",
      "digest": "sha256:1ae524da0fbac2918749ba54c321259ecd3908a0db4290ab31b51ad0a6180df7",
      "bytes": 10219,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-foundation.test.mjs"
    },
    {
      "sourceId": "context.git-blob-loader-environment-child",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/git-blob-loader-environment-child.mjs",
      "digest": "sha256:83e0b59f3ce6a19df093ff1fb3061d078f533ae21980a7d264f198a21eb49e6e",
      "bytes": 1112,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/git-blob-loader-environment-child.mjs"
    },
    {
      "sourceId": "context.git-blob-loader-fixture",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/helpers/git-blob-loader-fixture.mjs",
      "digest": "sha256:3d2f38afc10104ba603f6a7e998ad4946a00b5ad3c0432b8d0004b7d6e4a69d5",
      "bytes": 4249,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/helpers/git-blob-loader-fixture.mjs"
    },
    {
      "sourceId": "context.git-environment-boundary-child",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-git-environment-boundary-child.mjs",
      "digest": "sha256:cc2cbf03be0f944f2b29ac5693bf6e65b1fee404b9074521bfe851ac4b1a122c",
      "bytes": 2948,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-git-environment-boundary-child.mjs"
    },
    {
      "sourceId": "context.gitattributes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/.gitattributes",
      "digest": "sha256:4626d1e064ae446e63b50a072443b874a9619c012ac283d7903d03cd028b53a3",
      "bytes": 1283,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/.gitattributes"
    },
    {
      "sourceId": "context.gitignore",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/.gitignore",
      "digest": "sha256:12591164671f8176d7aaf1e5ef679212cbddff15f8794a90cde55ba3d1c557cb",
      "bytes": 875,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/.gitignore"
    },
    {
      "sourceId": "context.handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff.ts"
    },
    {
      "sourceId": "context.host-cache-supply-child",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-host-cache-supply-child.mjs",
      "digest": "sha256:c1a808d50a709f04d54615cb25a6ec4cf4d0999c025035c8f1195c3ddae03abe",
      "bytes": 1680,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-host-cache-supply-child.mjs"
    },
    {
      "sourceId": "context.ide-guide",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:9c321b526902503f845d96e9b20291f41c03a04d5df0098af33388815c03402c",
      "bytes": 22016,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/ide/specialist-agent-kickoff.md"
    },
    {
      "sourceId": "context.implementation-notes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/implementation-notes.md",
      "digest": "sha256:189b86704844d7541c76393debf90cd655077931c048d02315d8634049de3ada",
      "bytes": 53398,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/implementation-notes.md"
    },
    {
      "sourceId": "context.index",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/index.ts",
      "digest": "sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f",
      "bytes": 5447,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/index.ts"
    },
    {
      "sourceId": "context.inspection-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-inspection.test.mjs",
      "digest": "sha256:9b78ef93fea4bfb7929a5061f57f6ab0b338d71052ba702b76dc86edef0ed271",
      "bytes": 18933,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-inspection.test.mjs"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/package.json",
      "digest": "sha256:9c8e1e3bde18439a6199f0752b7dad1e69fdf713ffac33597d5119d1c26a67fa",
      "bytes": 4043,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/package.json"
    },
    {
      "sourceId": "context.pre-integration-review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/pre-integration-review.md",
      "digest": "sha256:c7b439ccaf7d1ccc17fd49984d4cff53b727fa3d033bad4c5bbb17060d0b0eb3",
      "bytes": 21576,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/pre-integration-review.md"
    },
    {
      "sourceId": "context.release-gate-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-v12-release-gate.mjs",
      "digest": "sha256:66f8b49e81486d54ce7b0d55d09927ce17be84b78b30705f1103077009f6f7c3",
      "bytes": 70472,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/v12-release-gate.test.mjs",
      "digest": "sha256:2818f9c5ea474743a480eab5ed432ab8957ea8bccd60c213478e65b1e74f6aa4",
      "bytes": 82833,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.release-review-lifecycle-helper",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/helpers/v12-release-review-lifecycle.mjs",
      "digest": "sha256:efee87069ec0a7cab92064e320fa09d989dd20fce5c6f7ef943875b3224a1a68",
      "bytes": 85918,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/helpers/v12-release-review-lifecycle.mjs"
    },
    {
      "sourceId": "context.release-review-lifecycle-test",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/lifecycle/v12-release-review-lifecycle.test.mjs",
      "digest": "sha256:a2c928a9872c450a59f4df20ece1211b0f421f564f32e0b1eba08a91eb46255d",
      "bytes": 11679,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/lifecycle/v12-release-review-lifecycle.test.mjs"
    },
    {
      "sourceId": "context.release-review-parent",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-v12-release-review.mjs",
      "digest": "sha256:bd4deede7f50f8e38414787db5080650172263c97b3fa6c56c58640739cefdd6",
      "bytes": 107265,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-v12-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-r2-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/v12-release-review.test.mjs",
      "digest": "sha256:fc624e6b722b6eaf36355fe7d91395aba299daff9e5b9f6c4da0c5400de7b373",
      "bytes": 115822,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/v12-release-review.test.mjs"
    },
    {
      "sourceId": "context.render",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-render.ts",
      "digest": "sha256:e8c2c73bf266b32ebee589497a5298435bb50f59e50d00d9d70ed3f65dc526e7",
      "bytes": 19184,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-render.ts"
    },
    {
      "sourceId": "context.review-r1-lifecycle-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
      "digest": "sha256:13e1b510607a4c23223b59a0190e3e490be3e95fc94e56dba45cd5e4bf3bdc84",
      "bytes": 5649,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-r1-product-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
      "digest": "sha256:7fb4caf2142208d0735d17bc75610098e671113f1c7a1047cc29bb62ce0e2a26",
      "bytes": 5819,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-r1-security-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
      "digest": "sha256:605a4e7065e1c4af2b3114129e919a810e430b584e31c718c0d78fa02fa027b7",
      "bytes": 7259,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-r1-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
      "digest": "sha256:8e4f69aae43ae919b3ac71f3055ac80f9bcb30cec936629b64b6f142c3169d42",
      "bytes": 2558,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json"
    },
    {
      "sourceId": "context.review-r2-handoff-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:3a1181f907346c09fb09d5b68fb12f86746775bf606238766daef84a22b6b9e8",
      "bytes": 34263,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.review-r2-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:70963a394ee7395a0f62f6081d4cb852ab52a91cef23b92d2b57edb7355e9ae8",
      "bytes": 159360,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/specialist-run-contract.md"
    },
    {
      "sourceId": "context.run-inspection",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-inspection.ts",
      "digest": "sha256:83d46b99d0bd553e36566aa5551b14c945b6177122c2c73f69e41ad6367f30ac",
      "bytes": 14484,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-inspection.ts"
    },
    {
      "sourceId": "context.run-schema",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-schema.ts",
      "digest": "sha256:db55d52355ec661a12e8e5c50981af0658ad1f9ef678f1c729882fa70024691d",
      "bytes": 3180,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-schema.ts"
    },
    {
      "sourceId": "context.run-schema-json",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-run.schema.json",
      "digest": "sha256:8949156f35ab5c4e9efcc86c5509b6a0fb137ced45a0c4c6da3648621797bba5",
      "bytes": 17405,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-run.schema.json"
    },
    {
      "sourceId": "context.run-session",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-session.ts",
      "digest": "sha256:2a763993ef0d190ff81b8b234081d3dcd8c470faaa3a6c8ae76da114ecb43367",
      "bytes": 19225,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-session.ts"
    },
    {
      "sourceId": "context.run-transition",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-transition.ts",
      "digest": "sha256:64916178302c40741eb53780e42f74af3cba7c886956851a55d6b4582d0cc6c7",
      "bytes": 8015,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-transition.ts"
    },
    {
      "sourceId": "context.run-types",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-types.ts",
      "digest": "sha256:01c54b2fc3244f875a4c04e8624d570953e08a6ce1cbbadb8e766117e270a74c",
      "bytes": 4222,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-types.ts"
    },
    {
      "sourceId": "context.runtime-binding",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/runtime-binding.json",
      "digest": "sha256:860ac1032fc81ab0a93d278fa5d9771ace2245dcd2355bef2080b2c1ea689cbb",
      "bytes": 5632,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/runtime-binding.json"
    },
    {
      "sourceId": "context.schema-guide",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/README.md",
      "digest": "sha256:e2bd5e0ca5123873d07fe5bdaff4181b38c34a6cbea0220ecb02e78a62f18223",
      "bytes": 20795,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/README.md"
    },
    {
      "sourceId": "context.schema-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-schema.test.mjs",
      "digest": "sha256:6bed3f897fdf550e644c249c468eb3d3e5f0748e833675f4eb2638686a0b204a",
      "bytes": 12596,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-schema.test.mjs"
    },
    {
      "sourceId": "context.snapshot.00382718736032ce94864543",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/package-envelope.json",
      "digest": "sha256:271a0de9fdb4da4503297f00b2d11c15e2d83c1c4c24b6d493d7438616609c6e",
      "bytes": 67956,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.04ade6ced07690b028c45abf",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json",
      "digest": "sha256:bd5da675c08f9a4691fe9ea5c211c65d876044ad302ba02d7021ba4ce1e7d30c",
      "bytes": 106478,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.07966ede47780a276c15a689",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/attempt-history.md",
      "digest": "sha256:0f8baeb817c9a94ca7b1dd2b2f718293ea7c73d88f682ce142caa87663ec38a6",
      "bytes": 1531,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.085199e0a5523f4415dfa74f",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-fix-attempt-1.json",
      "digest": "sha256:7a58782a0ad22711ca4aa0a0d26cfb341e8e3710319eb0198195f480beb4cf3f",
      "bytes": 5259,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-fix-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.09a26a6ae9618b834072a2ab",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/approval.json",
      "digest": "sha256:0a30ba3dd3d1861979a878ccd5e166d04b3094c049ade4b2143a3c14fba4ba18",
      "bytes": 695,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/approval.json"
    },
    {
      "sourceId": "context.snapshot.09b41c9ae9359c70eba6d8fa",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json",
      "digest": "sha256:a8074ac4e6a476a42817be111dccd8cca67b43d3d93067a9ff2460989da2fa5a",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json"
    },
    {
      "sourceId": "context.snapshot.0a75224286405e4cdd7aad68",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/package-envelope.json",
      "digest": "sha256:572c54f6e3f86d28c5f4986442e3629907d3056f51e3751b2b09c4b000e78d57",
      "bytes": 114039,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.0ac43bb8bd480aae647abdec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/phase-metadata.json",
      "digest": "sha256:7c1fc42b484bbc6520bb0344ea92b0fb381e289799222cd2148849523678afcd",
      "bytes": 198,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/phase-metadata.json"
    },
    {
      "sourceId": "context.snapshot.0fab3123087a94a71c56eb74",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoffs/agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8.json",
      "digest": "sha256:539b591f70c9b5808e79f15d73bda7625b67555b10a36ff0cb9bfb75b4491943",
      "bytes": 5319,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoffs/agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8.json"
    },
    {
      "sourceId": "context.snapshot.10dcfe334412eca8138ec6f8",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-block-attempt-2.json",
      "digest": "sha256:d1f59ac8a04bf5a629bdff36b0268a02cc9e1a4c03222e40db39a9ea793bde8d",
      "bytes": 2592,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-block-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.11bc6067a678faeccbce860c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/package-envelope.json",
      "digest": "sha256:59794b8d9285f9f618a39124fc39c55e13101edf56df4cf7c012ca97a3ddee07",
      "bytes": 109869,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.12cf839ef954120eb7872f74",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json",
      "digest": "sha256:89687dae2a1a7a02f04db245666f74ed46d9226986ee60f14f7a97416a0d991d",
      "bytes": 1307,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.140eea6d0a61dc4dd4cfdb39",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/approval.json",
      "digest": "sha256:d85ed00dface969c58d8ff1eab80b16ac5ffcb665a128a947c11e75a788c2d6a",
      "bytes": 701,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/approval.json"
    },
    {
      "sourceId": "context.snapshot.1413b84c8e0a13722771b575",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-schema-data.ts",
      "digest": "sha256:a41ed770e2d250cde3fed83910ba0a099eb84ea1fc6f9142e91f6659a1cd0bc1",
      "bytes": 17463,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-schema-data.ts"
    },
    {
      "sourceId": "context.snapshot.18d77a1516294d32d8822633",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/runtime-purity-ordering-attempt-1.json",
      "digest": "sha256:8db3fea6a6f47fba804f72d454660bafda7ab5d06691d729157e2f8f3aba66be",
      "bytes": 7254,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/runtime-purity-ordering-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.191cba3268255c9e43bd2402",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/aggregate-resource-attempt-1.json",
      "digest": "sha256:f74436e9e9a234cc8c41cba9a3b47ee84d8e0bff3ceba811252f008686c51677",
      "bytes": 6718,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/aggregate-resource-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.198787998c11d2e6fb17977b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification.json",
      "digest": "sha256:5f4f55daf5bda31a2b66460c985d08ea4ca19d48bed4cf24bb82b38f30f71bf1",
      "bytes": 1322,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.19aa2fc6f7476053cefc6d7f",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json",
      "digest": "sha256:6342efa7f78f9a6bbfc531836e2853f26daeac32d382682ee663b378668eaec6",
      "bytes": 7056,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json"
    },
    {
      "sourceId": "context.snapshot.1f83e1900b8f7093e2687be4",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification.json",
      "digest": "sha256:d2feb5e60d4d6daa7b51259223f3eb6c1e8458ea8ec7ce954660e00953d0c411",
      "bytes": 1312,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.1f9a33f7f45030c87119f59c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json",
      "digest": "sha256:790bfbf9106963bbe22d4360d688ffbf6b0e608284099117fb3d37c8c99ef290",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json"
    },
    {
      "sourceId": "context.snapshot.1fd1fe173ad87aa25d4d2235",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
      "digest": "sha256:fbce408c5009e88fa08ff33dd1a5ed5d8e9fe949afc6058fa90b5f6f01d595cd",
      "bytes": 24102,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs"
    },
    {
      "sourceId": "context.snapshot.211dcdc733aab7109734903d",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json",
      "digest": "sha256:c34764e2e121af4634cb4aaaa6a46a13584a6b2999bb5650cc17f5ce944ddaa4",
      "bytes": 156278,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.22220a8f9954d8a53ac58c2c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json",
      "digest": "sha256:64376261a673ebc7ec29222ee90569097915879521d8ea062a36a9d156e8b34d",
      "bytes": 2701,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json"
    },
    {
      "sourceId": "context.snapshot.224c47f9d0c135b476296437",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json",
      "digest": "sha256:3c95ca87255613bdcb96f0a894a03ce012c4d5662a3379230c07166e56fcf33b",
      "bytes": 5061,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json"
    },
    {
      "sourceId": "context.snapshot.22894d9246628adb366725eb",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-pass-attempt-3.json",
      "digest": "sha256:8e144e26c3d3fd1938ce8244665508e77ccc8477b9b1a8a94519e968d007d5d5",
      "bytes": 6562,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-pass-attempt-3.json"
    },
    {
      "sourceId": "context.snapshot.228f3a6b4301d0257c435790",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoffs/agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5.json",
      "digest": "sha256:b678fcf1c85ec59304893b428fef0b09210d5b3eac45a51b49e3075a5003b064",
      "bytes": 4930,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoffs/agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5.json"
    },
    {
      "sourceId": "context.snapshot.2375c53f5df926b63dc7092d",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json",
      "digest": "sha256:f2dafdb21cf960295ea4d0e1390a60ca5962089037bd2a8bd79a080a270e807e",
      "bytes": 1307,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.24580092e36321cf20407ed6",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/approval.json",
      "digest": "sha256:b01043783688294b8af0b45b7d0b29ecbdbdac4b96965392e9c573e7b7f30534",
      "bytes": 686,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/approval.json"
    },
    {
      "sourceId": "context.snapshot.24b78d7b209e9e2da26a1851",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48-block-attempt-1.json",
      "digest": "sha256:9462e65c93a9d54c2b7dd0045286a11b3109ec89075d35e489ba013efcf06b9a",
      "bytes": 4420,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48-block-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.25f6a900e4f80fc1eb923faf",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-boundaries.test.mjs",
      "digest": "sha256:78e56386b3399f0303b64e1383b9bb1a8eb5090b55f0b05552ebea325b150485",
      "bytes": 2746,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-boundaries.test.mjs"
    },
    {
      "sourceId": "context.snapshot.262e6861315dd0730524c35f",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/package-envelope.json",
      "digest": "sha256:843275069feed73fc380c386c270c5fb3a9ef02d96a7ccfbc2f3849d677baa2e",
      "bytes": 171107,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.2919a10315aab340a44343b4",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/package-envelope.json",
      "digest": "sha256:69dc54908198e0a584bb93e4e9e8865d3de626b6f478ad0ae986b1a616c14093",
      "bytes": 102163,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.299fdf75ee510687cc27e28c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-diagnose-attempt-2.json",
      "digest": "sha256:2fdcd3326144911b11aa4ef2b7e72f0b8677db5de4b9cbad0507ea1b68a0ec6b",
      "bytes": 6954,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-diagnose-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.2d747167ec9260924a5179dc",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.snapshot.2e5ba07cb3e6ca7211c440fa",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/package-envelope.json",
      "digest": "sha256:cc6b9500228bd532e3f8558a607cc911b97ecb4d823d27579f039303b125bebf",
      "bytes": 101579,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.2e9212d40ce1411850490003",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/package-envelope.json",
      "digest": "sha256:b5340cf27096ae2c9d8df85c0356f6d135f4094b73fde0f1fc41d24bc9248c04",
      "bytes": 124762,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.31d7de9931001893c2d03420",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/approval.json",
      "digest": "sha256:e0c11c6ee92345c06e4015b63b9167580b9c8eb1c7cd060c014004a6ef9ef96e",
      "bytes": 665,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/approval.json"
    },
    {
      "sourceId": "context.snapshot.329633914caff062c242ff11",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json",
      "digest": "sha256:615cc4bd3965a7344a53485a35c58bcada2217609760388d2a729beda4c574cc",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json"
    },
    {
      "sourceId": "context.snapshot.32ac3609867b688f03fc051a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/implementation-dogfood-attempt-1.json",
      "digest": "sha256:ce6cc26eee8eea92928381ee2b97da0e32397194369d09c7879f4c27e4d6d8af",
      "bytes": 12438,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/implementation-dogfood-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.32d4a0f3cca1c55d1e7bff97",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-limits.test.mjs",
      "digest": "sha256:84bd3cedab2982a446d6db3ea0aa4d6048d3e09120b926a669036160e1400cca",
      "bytes": 5580,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-limits.test.mjs"
    },
    {
      "sourceId": "context.snapshot.3405b7de702294d9459869f3",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/package-envelope.json",
      "digest": "sha256:4c89982fe9a342be15a97951e6b25d30e44581300777aa884cf5a15dc51a8d16",
      "bytes": 130350,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.3698e5ebe956ac6d636d3a87",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-2.json",
      "digest": "sha256:b5745977bcd30a5da8ca02395bc28ab22ae252566282f5dd4f9a62b0ffdbb932",
      "bytes": 4052,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.36e34477e2ca7f630c06891c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json",
      "digest": "sha256:b0ac5ef2c1131207ccee6a43ade45fd750307f1ab763c7b74d0308d3fe9960fd",
      "bytes": 126914,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.39e4e95f061496c6f6fd9a28",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoff-verification.json",
      "digest": "sha256:ae5e7dc88346662c2c028064e83190ffe4d2fa3c23f61b69837c65b7d222eece",
      "bytes": 1361,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.3ead551fa571c6173aceede2",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification-attempt-1.json",
      "digest": "sha256:5db22394418e61af7621a36613f000bbb98703b6eb684fba777efb76582b9c8b",
      "bytes": 1321,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.42433a3ea4ad7c253acda545",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json",
      "digest": "sha256:edd2df13589f4b327ed303bb75992ea79f06d70f0ca1b53730bfa2cfb13e060c",
      "bytes": 1321,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.43c66cdd3255b64d008a53b6",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/phase-metadata.json",
      "digest": "sha256:9e13476303cd5d1894769eee76cc566be541f48c46a43948f47f4b256905b750",
      "bytes": 187,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/phase-metadata.json"
    },
    {
      "sourceId": "context.snapshot.44c841151e7304276644e870",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/approval.json",
      "digest": "sha256:58d9910586f5ef1b957a850dc9da5f52296d5aa98b2417d41b81321ee8cc9790",
      "bytes": 746,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/approval.json"
    },
    {
      "sourceId": "context.snapshot.45ce43bd6276fced25a16cdb",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json",
      "digest": "sha256:26bf421f81127ecfe85f31b6d044a2a3accbaca788ab378a90e2db4733a887a6",
      "bytes": 141194,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.47809f446dd4dec5cc41d016",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json",
      "digest": "sha256:eab4c5b000fc984a662ba1870506243b6f3bdc56db01d4596bfedc5d208db26e",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json"
    },
    {
      "sourceId": "context.snapshot.48bc358d082c372201cfd2cd",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/attempt-history.md",
      "digest": "sha256:fb10425172498dc1a3beec8a457955a7d8f8cb83947ad2d1b75503a15bb6cd72",
      "bytes": 2534,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.4a33d57a74840d02346e6278",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json",
      "digest": "sha256:3d3a406acd342a7c32d22e7cd3a92a0c7db89d74af50d9d394da9a93830c76fb",
      "bytes": 1998,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.4b3ffb47b8ae8902fde5d0e6",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json",
      "digest": "sha256:93ea426aadd18f7ff5b68bc779b247b2c68ab8c476fcd969941eb3b18332e3c1",
      "bytes": 1308,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.4dbee116a583d457cd0a219e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/attempt-history.md",
      "digest": "sha256:dad5a3055ee56d6295a151274e21c3d5170efd3d30f03e7ed75ca0c0b16c5577",
      "bytes": 2014,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.4dd1f5308796a5f160e99639",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json",
      "digest": "sha256:3c95e3f08bae727d0bf15066814a5a5a699b2dcd034c0b3acdf9b77174c95da9",
      "bytes": 642,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json"
    },
    {
      "sourceId": "context.snapshot.4df25c06fc4b0e669165e2d2",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json",
      "digest": "sha256:c82903b980ba72b47eadbd54e6c760040bd9f19525326428a4c108599dee95d0",
      "bytes": 1306,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.5087f0cd40e7f165fb01285b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
      "digest": "sha256:3db78ce7e72fb6554df199d1ee3d9f8f6f88a2d9a0c15b5395b7fd3ed2bd82bd",
      "bytes": 313118,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.5133279209d3099b8316dc9b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json",
      "digest": "sha256:52f1a755dc039240fcfbbb4679382504f1470758a21df41007e1d67e8b4d138b",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json"
    },
    {
      "sourceId": "context.snapshot.530ee538b647a08f7113c61e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json",
      "digest": "sha256:ce6cc26eee8eea92928381ee2b97da0e32397194369d09c7879f4c27e4d6d8af",
      "bytes": 12438,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json"
    },
    {
      "sourceId": "context.snapshot.5948440f61baf6e3c8ad1efd",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/attempt-history.md",
      "digest": "sha256:11cac5bd6790d9f0ace57c8529a3cfc72bc3d10cf5b93a7dd089c20f9d10a837",
      "bytes": 1142,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.596a8952b3a18d5d50cca57b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md",
      "digest": "sha256:94e0a131ab1bc9a347e8ef6eb693501edda9b17b11ce16a336e622be9a74aec4",
      "bytes": 2623,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.5b1c85c24f4fdc92966f1a12",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/independent-architecture-audit.md",
      "digest": "sha256:82725d4372ca647223a6163bf71bab638d9543b90fcab53c68e5009ab342ea49",
      "bytes": 2096,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/independent-architecture-audit.md"
    },
    {
      "sourceId": "context.snapshot.5c8cbac7c096caea56cb1bbe",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json",
      "digest": "sha256:8745eaa9c90a9c7f8cfc01bc9f668810a31fee3a84281dcdea229d0a26d48da3",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json"
    },
    {
      "sourceId": "context.snapshot.627313ea6b1a32991d5f9192",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/package-envelope.json",
      "digest": "sha256:be7a2bc7b1563a55a856a55563692a78488cf89b6b662599f186cc3033e32db7",
      "bytes": 119495,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.62802c89fdd3714f7d1e8cd3",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/approval.json",
      "digest": "sha256:4e37387f137db57d1eff391916d0d54793a9d2b320dd17f91352002ca6680ade",
      "bytes": 649,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/approval.json"
    },
    {
      "sourceId": "context.snapshot.68335368a44573cf7a40437a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoff-verification.json",
      "digest": "sha256:cd5389cb9c257b308776a3fdd7c6c34cf947762c5685910e5d013199f0837d94",
      "bytes": 2052,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.69bec1301e6d09fad9fd4271",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826.json",
      "digest": "sha256:e489069fc8afc46475e6a177bc4a3cce1602acfd81cac4938409917bd9377e3f",
      "bytes": 4491,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826.json"
    },
    {
      "sourceId": "context.snapshot.6f51f455ae0832fa6b6e103a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md",
      "digest": "sha256:565324d05ac9f85c671c7ae23f6b0a3f0df43bff7b4a6ceb6e42aae693976561",
      "bytes": 4428,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md"
    },
    {
      "sourceId": "context.snapshot.6fda699b4c0b04cdc085f047",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/package-envelope.json",
      "digest": "sha256:651c0ed6aa2923a2c367108636fe54afac247361d4a9887f98a875191f8e1adc",
      "bytes": 266324,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.72015689e270bccaca0e1194",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/request.json",
      "digest": "sha256:3fe6ed8149c2dd6738db13db5de07960871ac8f0eea1ca54b89af23381cfa335",
      "bytes": 60733,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/request.json"
    },
    {
      "sourceId": "context.snapshot.743690e92ae6eb62ad00f685",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md",
      "digest": "sha256:acbb09315f1e22a61a08b549ff7ba4142d61e9c04c859cf2e991690492caf3f3",
      "bytes": 1867,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md"
    },
    {
      "sourceId": "context.snapshot.763850fd55941c25505dc4f1",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json",
      "digest": "sha256:1432e2c7a6f7384583d5dc27e155a7148621f6f4cbddd17c3b6bd18dd3991a32",
      "bytes": 5812,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json"
    },
    {
      "sourceId": "context.snapshot.779e75de9f0569a73959391d",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-1.json",
      "digest": "sha256:2754915a7a9321d658fe4f6daa4e3892b69599f083bbb5d60e3c29dc41df4efc",
      "bytes": 4808,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.7aa9cfc35f2e73d5d813ff34",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/approval.json",
      "digest": "sha256:4b81c7b77f93ff6a9aebecc41680b94b8a34bf45fb551f90e72b97608ffded4a",
      "bytes": 681,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/approval.json"
    },
    {
      "sourceId": "context.snapshot.7b14d48e93f3219dcf81347b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json",
      "digest": "sha256:89ab112ce3df0a97f64db2994fc792238955b7007a7ce0310b4af39b4340d3df",
      "bytes": 8095,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json"
    },
    {
      "sourceId": "context.snapshot.7b5a54ec537d5bf96f7a800f",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json",
      "digest": "sha256:e1d5c5e192499f1084752f5cff60ba846394899b2d637cc7dc7f53d087b88c08",
      "bytes": 642,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json"
    },
    {
      "sourceId": "context.snapshot.7d245bf26850ca3af8b4e9d3",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json",
      "digest": "sha256:b33cc6312e2db6481ae9d634607a952a67c3fb09a2c6f42b40a0f7338251dd1e",
      "bytes": 2767,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.7f66a4f17bf4b0445ea079d1",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json",
      "digest": "sha256:08ceb9d6851f9907a97a9752c8010bb746abbcf7ad62c3dd403175bd0c2a6855",
      "bytes": 1999,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.81a05b77f5b741d9719c6fc2",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/compilation-summary.json",
      "digest": "sha256:8b39a23ed052cf68e88c8113a9942f675feb6c2a1da8142308540965ca6728c3",
      "bytes": 4940,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/compilation-summary.json"
    },
    {
      "sourceId": "context.snapshot.8299759f5062164630808e79",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json",
      "digest": "sha256:23bbdd75d90ee42595b5f22f1ba2c9ba9f608866b049285b027ae579225b2e4b",
      "bytes": 6667,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json"
    },
    {
      "sourceId": "context.snapshot.84aae0dbbf362752d1946977",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48.json",
      "digest": "sha256:0e470fae36b543e2eb66b9695511fdf43ff77e1df23122bda31917de4b5c6fbb",
      "bytes": 5129,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48.json"
    },
    {
      "sourceId": "context.snapshot.8513f85ec735ef2c31f31748",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json",
      "digest": "sha256:26a3827014dbc45134557ab57c065ce784bff5f0ddaf883198baa2e02eb79ec8",
      "bytes": 1322,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.85b17158154d223f052d8bb8",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-block-attempt-1.json",
      "digest": "sha256:262dd8db5dc2c55a59cf8b644beb51c24f8f2957b4a105a73064a3c5d5fc04d2",
      "bytes": 5560,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-block-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.8751e49cf34f3e9c8a0812c0",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
      "digest": "sha256:e8b25ac1de45cee31aced60c4a811699d03b36121bb660d7e1c18a0f4c4c01a8",
      "bytes": 635,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json"
    },
    {
      "sourceId": "context.snapshot.8869d73146d82188105965ae",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json",
      "digest": "sha256:8c9e469f10f719394b086fa74d172fdfd2a2c40afdd3d0855df7a22589a47125",
      "bytes": 1322,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.8a14ddefcb7e319c23347f08",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/package-envelope.json",
      "digest": "sha256:ea4abf903e792e2257dcefca21691b91281188a87c2e680f8249954ce69c826d",
      "bytes": 69377,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.8cb796dcf98e8c38778ceb48",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/approval.json",
      "digest": "sha256:0f3fda441050c8865e307d845640713cb496fd4c11292bbdaf51c77cb6ee25c3",
      "bytes": 658,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/approval.json"
    },
    {
      "sourceId": "context.snapshot.8d473271f4ec008e5f5b4634",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/runtime-purity-ordering-attempt-1.json",
      "digest": "sha256:89ab112ce3df0a97f64db2994fc792238955b7007a7ce0310b4af39b4340d3df",
      "bytes": 8095,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/runtime-purity-ordering-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.8f5bf458eba4d823d1ac3b82",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json",
      "digest": "sha256:939099add2852e3dfe14b307fc55e46c89b56a1dd0c735d15bf35e82f99a5a68",
      "bytes": 5291,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json"
    },
    {
      "sourceId": "context.snapshot.93d115e479289f98696e814c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/report.json",
      "digest": "sha256:f86d3a98cbf718b4c686dd8691f0b7920066d03705d47e3d72eac1b0f8d1f578",
      "bytes": 20362,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/report.json"
    },
    {
      "sourceId": "context.snapshot.9522c5158d75d744d2ebb86d",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json",
      "digest": "sha256:5afb33ee3c7f456ea0331d7d0735a0291cd69fb5d7a4c6c6d80982177d815090",
      "bytes": 9058,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json"
    },
    {
      "sourceId": "context.snapshot.9f7cdd9e1d1bba465d5183d5",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
      "digest": "sha256:8e910cf4d124f0611c23f4d6dfe3cc053d7a2ee826fcacca3f287cbce0459e8a",
      "bytes": 3044,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.snapshot.a0ec19f463c05feebe352a7e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json",
      "digest": "sha256:9788872c5ee79402dea890f36f36291eaf27c8b46f3d4f9802651f8176a15f73",
      "bytes": 98036,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.a200b096a556a58901826acd",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json",
      "digest": "sha256:3510b98137b0cd8746d5440f4254bcfed8c493f714a57539a705eb12012c12fd",
      "bytes": 5693,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json"
    },
    {
      "sourceId": "context.snapshot.a2545a04fbdb5efd96c62a17",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json",
      "digest": "sha256:08fba946e7d8fd47b112322a4f8ea954922d230de6d2b9fac234bdd297f6540f",
      "bytes": 152251,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.a2c5273bb9e0ee391fe03346",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/approval.json",
      "digest": "sha256:1afdf4abed9c1f52099d38cd7294af6daee44b62f2b2b38936b1f36811ff9fa3",
      "bytes": 724,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/approval.json"
    },
    {
      "sourceId": "context.snapshot.a5792502c3d13f60ed74b4cc",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md",
      "digest": "sha256:42f53ec000a3cfa69786b0895354ab1b9ab24322305b5ef9d7b33d9a46d13390",
      "bytes": 16223,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.snapshot.a5a7bcca4dc3dc0223c690dd",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/attempt-history.md",
      "digest": "sha256:0179494af79a883b1dd83ed00587b334c2c76b5349f350024b0392338780fe53",
      "bytes": 3278,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.a6b6104f7e40a75bc3372b4d",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json",
      "digest": "sha256:d45f4f598722ed86079d6b079cd078ef580f8a0c8e6e708ec1d9b0018d860621",
      "bytes": 316925,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.a905b4dc31515d7dc72ca8be",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/approval.json",
      "digest": "sha256:85c07a5f8d4c1fa96d9e1201682ab4f67311e043db6d129002cd2ae30c245daf",
      "bytes": 651,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/approval.json"
    },
    {
      "sourceId": "context.snapshot.a9d65c21107e7a3c9a9e033a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/goal-contract.json",
      "digest": "sha256:c8488458e59db01897c203102522759c6f49b0b4a7e582ea237b8854df3eb12b",
      "bytes": 64546,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/goal-contract.json"
    },
    {
      "sourceId": "context.snapshot.aa45bd3c9e109e76f1c7b059",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json",
      "digest": "sha256:2a5c2b5cfff8a90d78fd61deb291652303f4347254279ff3c7bae5a104694283",
      "bytes": 5373,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json"
    },
    {
      "sourceId": "context.snapshot.ababd43ba7c9ffde25397631",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json",
      "digest": "sha256:ee8665855792db9c241afadff4b300ad55bf71d25f6e930933d18b0931bba894",
      "bytes": 5918,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.abd3b7e2df224872fb02dca5",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json",
      "digest": "sha256:624577edaed5b154f3c4e90daff0dd06f17187c1fa4aa4128e75eb5914bb3df1",
      "bytes": 8035,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json"
    },
    {
      "sourceId": "context.snapshot.abe158fda4f26d88c8fc0bcb",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/release-evidence-attempt-1.json",
      "digest": "sha256:6342efa7f78f9a6bbfc531836e2853f26daeac32d382682ee663b378668eaec6",
      "bytes": 7056,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/release-evidence-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.abfe71337aa5517815c799eb",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/handoffs/agent.8f24670b544882730a1763ac030531997dba8400a9cc3c767eceeb1f7a96212d-pass-attempt-1.json",
      "digest": "sha256:0bfac8263bd0d209baf33f7cbfd29fc68482a52eef187f77fcf7ce66ebf28988",
      "bytes": 21143,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/handoffs/agent.8f24670b544882730a1763ac030531997dba8400a9cc3c767eceeb1f7a96212d-pass-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.afb0c0f6032bbef27ff15ef3",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json",
      "digest": "sha256:80e6d469e39542d424be462f2125832595ba1962a0a2afda71714446e9d980c0",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json"
    },
    {
      "sourceId": "context.snapshot.b06aed93059a686e23cbdebd",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/compilation.json",
      "digest": "sha256:1a9ad265525a7e8db0f78dcebb8e3d412d433dc5991ee53bc083e3d8d6ebc04f",
      "bytes": 170110,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/compilation.json"
    },
    {
      "sourceId": "context.snapshot.b19d7f0f2acf2ac9258ba239",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json",
      "digest": "sha256:b0a48bde829f601ec4d11abeb5c0f54dcb7123182d2c1fbdb405fc251b28a27c",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json"
    },
    {
      "sourceId": "context.snapshot.b2799242427c46a06f6f0329",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
      "digest": "sha256:af16ab6ce302a85451cd99198d9a8ab93c8b159c47d4a79345248d5c08759c3f",
      "bytes": 8162,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json"
    },
    {
      "sourceId": "context.snapshot.b4bb2694a3b29911a8fc7682",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/approval.json",
      "digest": "sha256:83b6b8f1a1596f2cf496e506a72747069302e82a1ab496ad1033e93a16ae2220",
      "bytes": 646,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/approval.json"
    },
    {
      "sourceId": "context.snapshot.b50d797b1057a4923637bbe4",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/attempt-history.md",
      "digest": "sha256:d0bbf786a9ccc41a7ad662b943a2fe54600627b1de8f545dc61c1068c0fa8cef",
      "bytes": 1835,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.b5c00f95413b2ef117430a61",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad.json",
      "digest": "sha256:8b1b8463255a74e921853694c5edae46bad51529cc12db88a0ebdc2455ce1ed4",
      "bytes": 5431,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad.json"
    },
    {
      "sourceId": "context.snapshot.b7f5e1770d6d868ad1c47746",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/handoff-verification.json",
      "digest": "sha256:f724bf4f6f03446e1835afc815e0da9fceb670075d62e98922494d9f7f9571d4",
      "bytes": 1323,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.b9ba1665b359feba6928d537",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoffs/agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880-pass-attempt-1.json",
      "digest": "sha256:2d00b74b48e3057d370334a60162c4bad4c8c45959f60dca1672f2db03e5c13c",
      "bytes": 10353,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoffs/agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880-pass-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.ba12603d278d41e4276d345c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json",
      "digest": "sha256:67eac872b0d88bbade9af9afda268178f57077b0abdc4f605444ead1da6c186c",
      "bytes": 2807,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json"
    },
    {
      "sourceId": "context.snapshot.bbd9fbcb0756a48f9be19b9a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826-pass-attempt-2.json",
      "digest": "sha256:51e123c6a202a58a0ea456729b84dbb4995cff2b26b27313c66133fa035ae4b9",
      "bytes": 6520,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826-pass-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.c1a8a52a8b18d0f580f2cd2b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json",
      "digest": "sha256:78d34233ec98a9c685ee9bb0c6b582c0b3be77b25c4deec86a279ed682a29c42",
      "bytes": 108566,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.c7c609eaccc14dbde7cf48c3",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/attempt-history.md",
      "digest": "sha256:9bb63ed1c81b9fc0e08957bb1cc0fefd9ff0c2d850d62531d36a5c2bb91e6478",
      "bytes": 3479,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.cad1970de130fee691067f4e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/attempt-history.md",
      "digest": "sha256:f8d6bf13c055c8ef4dca3c9573c97bcf10ebfe03d850e4f76cba93c816727dd4",
      "bytes": 1224,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.cc820ef22ee028edc89a510e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json",
      "digest": "sha256:f36ddf35492244b21248fe96a5363f1c7222fb206a4fe11f5d213427c37a4956",
      "bytes": 4584,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json"
    },
    {
      "sourceId": "context.snapshot.cca3a25261d6a645c682af52",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json",
      "digest": "sha256:b6a95ec5913a7b8a4a54946f3ffde43233de13109ae0ce89dafc74abfb27498b",
      "bytes": 1307,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.cdea461398c2b49c747166cc",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md"
    },
    {
      "sourceId": "context.snapshot.cee886d3f0330e16985768eb",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json",
      "digest": "sha256:cc0fe31e1f2b4dfb903667056b83fffb5402afc6f4f8bf4a727c4178abae5afb",
      "bytes": 1308,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.cfd416a341d633fc19dd1410",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/package-envelope.json",
      "digest": "sha256:f2ba734717a0b409b85e4015f7d0de61efcfb8faeb2eede39f3d0c304020e8d0",
      "bytes": 81846,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.d06b06a835d14f5777de4f4a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/handoffs/agent.cde961f7cd173b3f274a6ea75f4190aea5a7642200c5bf39c2ba642d72573127-block-attempt-2.json",
      "digest": "sha256:0224243c4325b298fb04d6af870f14d70e2b0fa95a5549906e809d5b386155c9",
      "bytes": 14865,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/handoffs/agent.cde961f7cd173b3f274a6ea75f4190aea5a7642200c5bf39c2ba642d72573127-block-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.d1b4fee620d988de5af353cc",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
      "digest": "sha256:f74436e9e9a234cc8c41cba9a3b47ee84d8e0bff3ceba811252f008686c51677",
      "bytes": 6718,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json"
    },
    {
      "sourceId": "context.snapshot.d216ba9343ee752bb2e169b6",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/implementation-dogfood-attempt-1.json",
      "digest": "sha256:23bbdd75d90ee42595b5f22f1ba2c9ba9f608866b049285b027ae579225b2e4b",
      "bytes": 6667,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/implementation-dogfood-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.d584753529cebb27b50c0cce",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/runtime-purity-ordering-attempt-1.json",
      "digest": "sha256:5afb33ee3c7f456ea0331d7d0735a0291cd69fb5d7a4c6c6d80982177d815090",
      "bytes": 9058,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/runtime-purity-ordering-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.d6c3f8f51d68cc0f20d65298",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json",
      "digest": "sha256:091169f4ca7592f8deb2b84b9930b5eb04361d3ffea3dd767b62ebddb809e53e",
      "bytes": 1306,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.da4dee445d4c158ab601bc69",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/release-evidence-attempt-1.json",
      "digest": "sha256:3510b98137b0cd8746d5440f4254bcfed8c493f714a57539a705eb12012c12fd",
      "bytes": 5693,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/release-evidence-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.de76f9026f76c3a76b85dcbe",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification-attempt-2.json",
      "digest": "sha256:206888304ca4db572b567c33f58447dd904de597afd5714978d9d129d88a4d14",
      "bytes": 1331,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.e0cb7378793dc4b829919228",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json",
      "digest": "sha256:8e5a9aae80688d577a554b460040adddb6c8b3988795ca72e97954109426a48c",
      "bytes": 96462,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.e1f445e6b8989f610cc3c814",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/compilation-summary.json",
      "digest": "sha256:a0bdb09ae7f7b49b09c4c80ba380f82de148b99eeed5cbe3568baa5a0375dc41",
      "bytes": 9358,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/compilation-summary.json"
    },
    {
      "sourceId": "context.snapshot.e3e771e23f0ba2c7a7b360d7",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md",
      "digest": "sha256:28fe1d280a76185cd0ffe7abd9eb53cc397c7f6b60c78a2b9d8bfbea73cdf1db",
      "bytes": 1175,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.e5b168b04add2b9b692f5f3c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json",
      "digest": "sha256:32472ecbb21d7547b4f4cab342db1f015f06f819f085fb6ed4fee29aecafac8a",
      "bytes": 90511,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.e62bc7204aa42bbce7ca7639",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json",
      "digest": "sha256:1fc164d225aa49f2d5192d9f3a35c05a7e31cc4297a7c8362a3fd096229b2c2d",
      "bytes": 1323,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.e6c7fe2a753efd6f3086a328",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/request.json",
      "digest": "sha256:470febe17c68447e8edcc19c67183df99096adcbc504a81d1b041e0eb8d94657",
      "bytes": 32075,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/request.json"
    },
    {
      "sourceId": "context.snapshot.e7ca8e130bdbe79512e3b52a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json",
      "digest": "sha256:4679cd6145a4afa16adcd7e395a0cf7cfa7fd770cc2c0e328fcdf9189e71e06f",
      "bytes": 1306,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.e80d9db7d4d45c7723369aad",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json",
      "digest": "sha256:c4da5dc7899ecca6dc57ad8f210b3e947e4bde8afb293dd3ce80cd761946a6e3",
      "bytes": 1327,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.e96374256850886a8792d924",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json",
      "digest": "sha256:3e58dddde82171b5090debc1ea76a29298fe7a7e0f9a27dd39fd1f826350e543",
      "bytes": 5595,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json"
    },
    {
      "sourceId": "context.snapshot.ecdd69913bcca53fe53e847a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
      "digest": "sha256:74eefd84adae4a34c5220a9e1039d98f1b1fa651e7df3a3f8cfe27a338053777",
      "bytes": 137049,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.f2a60dca442ed842f61046aa",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoffs/agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05-redesign-attempt-1.json",
      "digest": "sha256:79227fedf63534c9a71eabd6679c0b08fdcdb6bc94a49965d76c60975a996cb5",
      "bytes": 3206,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoffs/agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05-redesign-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.f419efd96b6815bfa705fdd3",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json",
      "digest": "sha256:73fcd5841f739c4f353355ddba6b412d68c3b2d8233ccc371ef2de9a2477d282",
      "bytes": 3795,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json"
    },
    {
      "sourceId": "context.snapshot.f7f40629ba319cd92f3285db",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json",
      "digest": "sha256:8db3fea6a6f47fba804f72d454660bafda7ab5d06691d729157e2f8f3aba66be",
      "bytes": 7254,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json"
    },
    {
      "sourceId": "context.snapshot.f95b4ffb0487e1637121c98e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json",
      "digest": "sha256:64e2b86a290900be5364f5ae060d78f9daee898b1e003a64b4a636531621212b",
      "bytes": 1497,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.f9f18bd0bde41ddadc9f87dc",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/handoff-verification.json",
      "digest": "sha256:6fbe4c128f305ef0fbd2d76ed01bf049a9d9a74a142e169907d65542fd1f8040",
      "bytes": 1326,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.fbb32bb1193039a4d045a176",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
      "digest": "sha256:dc177cddfeae16dcefe456581fcaed2e072a8fa84b4ad67204146062d4995ef2",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json"
    },
    {
      "sourceId": "context.snapshot.fc41091ce4c6662be609206e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6.json",
      "digest": "sha256:6f0d90bf4c883ba7d26a3970491810677da52c815d1e63048df4a7a4bad86a2e",
      "bytes": 6033,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6.json"
    },
    {
      "sourceId": "context.snapshot.fdd98ad9f3beaefbb3d32bb4",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/approval.json",
      "digest": "sha256:735855fca8e8195047a5317c7f2f81a01533bea28ce34189414c4f1430b59ffa",
      "bytes": 727,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/approval.json"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/spec.md",
      "digest": "sha256:1bf7fca037fb310b2342c4be1e27c030ac6588d00f17b52172b1d8663d580cdb",
      "bytes": 6573,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/spec.md"
    },
    {
      "sourceId": "context.specialist-compiler-schema-json",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-compiler.schema.json",
      "digest": "sha256:860cbe31f1b86676ea35df361e0d1b215aa92e8253bd5de266fded42fe6039cd",
      "bytes": 15392,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-compiler.schema.json"
    },
    {
      "sourceId": "context.specialist-compiler-schema-source",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-schema-data.ts",
      "digest": "sha256:1a126dc80a649a26eb984b39c3f33798fe76b957237a73f0800766eef2d10c55",
      "bytes": 26215,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-schema-data.ts"
    },
    {
      "sourceId": "context.specialist-compiler-schema-validator",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-schema.ts",
      "digest": "sha256:b651ab211e2551f1df678c7616713ba5c5729a47b1d463c82e3ca95dece349bc",
      "bytes": 2815,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-schema.ts"
    },
    {
      "sourceId": "context.specialist-handoff-schema-json",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-handoff.schema.json",
      "digest": "sha256:afade2b11be6db71a17aa35841d292b99e05c6a4c157505c3b649a3f145aa4e9",
      "bytes": 4287,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-handoff.schema.json"
    },
    {
      "sourceId": "context.specialist-handoff-schema-source",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff-schema-data.ts",
      "digest": "sha256:83f9df80b8d48e8ca4bbf2b92cad5b701b3b723aa8b5843d3adb829267c8603c",
      "bytes": 15109,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff-schema-data.ts"
    },
    {
      "sourceId": "context.specialist-handoff-schema-validator",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff-schema.ts",
      "digest": "sha256:b46e29306e5605092f8923a427fdad431b0d8e4d84d8693af90bdb2c275aa581",
      "bytes": 2275,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff-schema.ts"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/test-plan.md",
      "digest": "sha256:998c1927264cf36207b21781284c83831e840a4bf7893b5d16723c005f6ee767",
      "bytes": 18223,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/test-plan.md"
    },
    {
      "sourceId": "context.transition-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-transition.test.mjs",
      "digest": "sha256:bc140c1c1e02a02160c6a7b0ed8399b99dda99d418a6f6f9151039548eb39c28",
      "bytes": 9861,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-transition.test.mjs"
    },
    {
      "sourceId": "context.typescript-binding-runner",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-typescript.mjs",
      "digest": "sha256:3390a3bdea97140e8c02ad0f917dcb62bbaf2e12921ea5fd1a2255362475c25f",
      "bytes": 7064,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-typescript.mjs"
    },
    {
      "sourceId": "context.v11-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/approval.json",
      "digest": "sha256:590606176235d6ae249c0ece8598c77654aa045307a5484ce9a8636cabf5488d",
      "bytes": 195,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/approval.json"
    },
    {
      "sourceId": "context.v11-audit-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
      "digest": "sha256:07427ef7b1b16e44d4b99ac71bdbea3009e1547ebc33ddc5215b5e8a5a6be758",
      "bytes": 195,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json"
    },
    {
      "sourceId": "context.v11-audit-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass-attempt-44.json",
      "digest": "sha256:3a53b4ba416dba1fb9aac2296bd2817863e61f2f913f2fb7bdb39cd4a31388fb",
      "bytes": 10233,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass-attempt-44.json"
    },
    {
      "sourceId": "context.v11-audit-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json",
      "digest": "sha256:72b341d8edeb06796d23bbd057041a8b18d94498efbe6aa3ffb4efe87568cc76",
      "bytes": 2255,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json"
    },
    {
      "sourceId": "context.v11-compilation",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
      "digest": "sha256:f1585556e14c39a7717c2bbe25ab310a1fe6af3233a420313add2317662a5c44",
      "bytes": 319458,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json"
    },
    {
      "sourceId": "context.v11-goal",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json",
      "digest": "sha256:9236d40553392c5f710acf117ded9f3b4af681557f24cf2a23d389fd8b58c675",
      "bytes": 103178,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json"
    },
    {
      "sourceId": "context.v11-launch-authorization",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/launch-authorization.json",
      "digest": "sha256:f1c82e979257bc55022b4b63a2432d262ae61d83faf089d0feac275698d9054b",
      "bytes": 985,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/launch-authorization.json"
    },
    {
      "sourceId": "context.v11-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/report.json",
      "digest": "sha256:863b6dfa8063b27b52778fb71f1f155e541fc3ed4c21166e6dece631bd02b410",
      "bytes": 25926,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/report.json"
    },
    {
      "sourceId": "context.v12-dogfood-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
      "digest": "sha256:1357ace5bbffef6194e17a43e12edcedd32aa29cc9967cdabd40aa21a004a4d2",
      "bytes": 6031,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json"
    },
    {
      "sourceId": "context.v12-verification-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
      "digest": "sha256:d2b3ea9c077345fecc78f504a5e376207c367706b9685da4485509fc5c048137",
      "bytes": 4356,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json"
    },
    {
      "sourceId": "context.v12-verification-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
      "digest": "sha256:985aac5600d600af68be12d6d8f258ce262a1f5ee0d0490d5e85c55dc0ebb103",
      "bytes": 1878,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json"
    },
    {
      "sourceId": "context.worker-environment-boundary-child",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-worker-environment-boundary-child.mjs",
      "digest": "sha256:8897e16fbe7f7f223d10fa824b0904d1849a814e157e93d887f80dbf0840fd3f",
      "bytes": 877,
      "purposes": [
        "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries."
      ],
      "workUnitIds": [
        "review.r2.security-trace-authority"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-worker-environment-boundary-child.mjs"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "audit.r2.security-trace-authority"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/candidate.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/pre-integration-review.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/runtime-binding.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/.gitattributes",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/.gitignore",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/architecture/decisions/0005-immutable-specialist-run-session.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/ide/specialist-agent-kickoff.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass-attempt-44.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/launch-authorization.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/compilation.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/goal-contract.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/report.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/report.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/debug-notes.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-block-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoffs/agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoffs/agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48-block-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826-pass-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoffs/agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05-redesign-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/independent-architecture-audit.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-diagnose-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-pass-attempt-3.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-block-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/runtime-purity-ordering-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoffs/agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880-pass-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/handoffs/agent.cde961f7cd173b3f274a6ea75f4190aea5a7642200c5bf39c2ba642d72573127-block-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/handoffs/agent.8f24670b544882730a1763ac030531997dba8400a9cc3c767eceeb1f7a96212d-pass-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/runtime-purity-ordering-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/runtime-purity-ordering-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/implementation-dogfood-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/release-evidence-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/aggregate-resource-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/implementation-dogfood-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/release-evidence-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/compilation-summary.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/phase-metadata.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/request.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/compilation-summary.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/phase-metadata.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/request.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/implementation-notes.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/package.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/README.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/diagnostic-catalog.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-compiler.schema.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-handoff.schema.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-run.schema.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-typescript.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-v12-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-v12-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/constants.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/diagnostics.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/index.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff-schema-data.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff-schema.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-render.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-inspection.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-schema-data.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-schema.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-session.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-transition.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-types.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-schema-data.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-schema.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/git-blob-loader-environment-child.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-enclosing-candidate-git-probe.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-git-environment-boundary-child.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-host-cache-supply-child.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-worker-environment-boundary-child.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/helpers/git-blob-loader-fixture.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/helpers/v12-release-review-lifecycle.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/lifecycle/v12-release-review-lifecycle.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-boundaries.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-foundation.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-inspection.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-limits.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-schema.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-transition.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/v12-release-gate.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/v12-release-review.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/candidate.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/canonical-gate/canonical-gate.stdout.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/pre-integration-review.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/runtime-binding.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/.gitattributes",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/.gitignore",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/architecture/decisions/0005-immutable-specialist-run-session.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/ide/specialist-agent-kickoff.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/goal-contract.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass-attempt-44.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/launch-authorization.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/compilation.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/goal-contract.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/report.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v11-specialist-compiler/evidence/dogfood/report.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/debug-notes.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-block-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoffs/agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoffs/agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48-block-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826-pass-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/handoffs/agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05-redesign-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/independent-architecture-audit.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r17/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-diagnose-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/handoffs/agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264-pass-attempt-3.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/independent-review.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r18/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-block-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/handoffs/agent.d9f6ad5475ca9a33fefde0d78c584c6df37bf7f56f053365f4841c5566f9b012-pass-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r19/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/runtime-purity-ordering-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/handoffs/agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880-pass-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r20/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/handoffs/agent.cde961f7cd173b3f274a6ea75f4190aea5a7642200c5bf39c2ba642d72573127-block-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r21/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/handoffs/agent.8f24670b544882730a1763ac030531997dba8400a9cc3c767eceeb1f7a96212d-pass-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r22/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/runtime-purity-ordering-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/runtime-purity-ordering-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/implementation-dogfood-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/release-evidence-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/aggregate-resource-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/implementation-dogfood-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/release-evidence-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/compilation-summary.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/phase-metadata.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/request.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/compilation-summary.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/phase-metadata.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/request.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/implementation-notes.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/package.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/README.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/diagnostic-catalog.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-compiler.schema.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-handoff.schema.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/schemas/v1alpha1/specialist-run.schema.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-typescript.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-v12-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/scripts/run-v12-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/constants.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/diagnostics.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/index.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff-schema-data.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff-schema.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-handoff.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-render.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-inspection.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-schema-data.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-schema.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-session.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-transition.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-run-types.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-schema-data.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/src/specialist-schema.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/git-blob-loader-environment-child.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-enclosing-candidate-git-probe.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-git-environment-boundary-child.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-host-cache-supply-child.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/fixtures/v12-worker-environment-boundary-child.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/helpers/git-blob-loader-fixture.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/helpers/v12-release-review-lifecycle.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/lifecycle/v12-release-review-lifecycle.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-boundaries.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-foundation.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-inspection.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-limits.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-schema.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run-transition.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/specialist-run.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/v12-release-gate.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/606fc3585f19f4714e0e75c2387561ca03b8282c/inputs/source-snapshots/test/v12-release-review.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "git",
          "node",
          "npm"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not edit files, change Git state, access the network, launch descendants, repair findings, or claim that core performs external host effects."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.review.r2.security-trace-authority",
      "criterion": "Audit corrected V12 security, effect-free execution, source preservation, exact identity, authority closure, traceability, approval freshness, and external-host boundaries.",
      "requirementId": "evidence.r2.security-trace-authority-release-review",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve the exact independent SecurityTraceAuthorityReleaseReviewR2 evidence.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "security-trace-authority-release-review-r2.md"
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
    "Authenticate every declared immutable source against its exact byte count and SHA-256 binding before review.",
    "Do not edit files, change Git state, access the network, launch descendants, or repair a finding.",
    "Report findings first with severity and exact snapshot/original-path evidence; use pass only when this review domain is release-ready.",
    "Return only the concrete closed SpecialistAgentHandoff JSON shape from the generated contract.",
    "Treat exact raw gate logs, raw handoffs, approval bytes, and source snapshots as primary evidence; summaries are navigation only."
  ],
  "contentDigest": "sha256:52a49774429ef164d4fc15f354957cd14b99e9560cd051998ffc614218d551d2"
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
    "id": "v12.ide-run-loop.release-review-r2",
    "revision": 1,
    "digest": "sha256:a70553a6f4c2f00f243ca5eabeaf848d0988b4670279af555374312d498d60b3"
  },
  "agent": {
    "id": "agent.1e522d86b809d360e459b4afd630c2311033a972b455c615c7eca8bf09b3942d",
    "blueprintDigest": "sha256:52a49774429ef164d4fc15f354957cd14b99e9560cd051998ffc614218d551d2"
  },
  "compilationDigest": "sha256:eb3e7fd1341c45966f95a9a440685193b24206f9155de50e96aa4596e0b41998",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.r2.security-trace-authority"
  ],
  "artifacts": [
    {
      "name": "security-trace-authority-release-review-r2.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.r2.security-trace-authority",
      "requirementId": "evidence.r2.security-trace-authority-release-review",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "security-trace-authority-release-review-r2.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
