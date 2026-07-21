# Specialist Contract: agent.ecc4e48122daf47ceda2158ba1125b18174c331dddab51ab4bde4964718c2e87

Compilation: `sha256:289348ac15dc05d3c7920c7f2118190094fd7bbdf103deb3c229c68f2ebbc37c`
Blueprint: `sha256:957bf0322f6b2f5222f70b416f81dc01c2d27a7286c52cf45febedf36785154e`

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
  "id": "agent.ecc4e48122daf47ceda2158ba1125b18174c331dddab51ab4bde4964718c2e87",
  "goalId": "v12.ide-run-loop.release-review-r2",
  "goalRevision": 1,
  "goalDigest": "sha256:512a626e9be08a1bd6552eb832abd94d961704cc49f194c170670c0a0e940874",
  "candidateId": "team.6c5b99128b2659b65498546ea6673dfa7069228e1dc9c92815d71f29f4a7de55",
  "workUnitIds": [
    "review.r2.lifecycle-correctness"
  ],
  "objectives": [
    {
      "workUnitId": "review.r2.lifecycle-correctness",
      "objective": "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
    }
  ],
  "modules": [
    {
      "id": "release-review-r2.lifecycle-correctness",
      "action": "Trace all four operations and every route; inspect canonical ordering, aggregate limits, replay, restoration, tests, dogfood, and the exact canonical-gate evidence without repairing production.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "FrozenV12ReleaseCandidateR2"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "LifecycleCorrectnessReleaseReviewR2"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/architecture/decisions/0005-immutable-specialist-run-session.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/architecture/decisions/0005-immutable-specialist-run-session.md"
    },
    {
      "sourceId": "context.adversarial-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run.test.mjs",
      "digest": "sha256:01e1be93c9957399b261698addf0c3a60d68d0cf69072a202f57a81dad1ba1ae",
      "bytes": 38850,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run.test.mjs"
    },
    {
      "sourceId": "context.architecture",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
      "digest": "sha256:861a5a5471ecf8463cd8fa9e4035acb3a5c9a16f7e0c65385ba29fa84509d3dc",
      "bytes": 26111,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md"
    },
    {
      "sourceId": "context.candidate-manifest",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/candidate.json",
      "digest": "sha256:6e34aca48467b0477bbc8404e5dbbf039e481b372a43438cd8c34a0a3f55eeb8",
      "bytes": 237021,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/candidate.json"
    },
    {
      "sourceId": "context.canonical-gate-attempt-1-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
      "digest": "sha256:4c636e486f36c22b74f12fdd4b4470eb9056f63f64eca05058ae6923976bb15c",
      "bytes": 1221,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.canonical-gate-attempt-1-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
      "digest": "sha256:4381d1a9ce1c36beb8723eadfb3619288935b9d095de672c450121c23dc0dfad",
      "bytes": 11763,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.canonical-gate-attempt-1-stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
      "digest": "sha256:afb6b266dd504cbf89d2cb55b6f9c5c6872fd5636acef8848e2105257aecef12",
      "bytes": 295768,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.canonical-gate-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate-receipt.json",
      "digest": "sha256:9d07c1eaa9bf0a22cfbc5c0d33e6fd60cf340a84d7da238d7cb9b21df8f8c65a",
      "bytes": 2295,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.canonical-gate-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate.stderr.log",
      "digest": "sha256:2e53f9074811c48085665956206c5d73525bdba26d25c07cb805d31df9b0c948",
      "bytes": 26137,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.canonical-gate-stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate.stdout.log",
      "digest": "sha256:d7ced99d89044870bc0ecfcaede455c5e88619fb1ac51c2f4c18c9c160528f5d",
      "bytes": 297738,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/constants.ts",
      "digest": "sha256:2fded9c023b41dc58ad7b8471d9b3f7dbc5b4566c6fecbb6008829c1c5000b6a",
      "bytes": 2570,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/constants.ts"
    },
    {
      "sourceId": "context.consumer-check",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/check-packed-consumer.mjs",
      "digest": "sha256:911e617037a4b9aab715a4bbe6b7f8afb6a48ac240b42c6d76e550165835b19b",
      "bytes": 45720,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/check-packed-consumer.mjs"
    },
    {
      "sourceId": "context.debug-notes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/debug-notes.md",
      "digest": "sha256:94e39f6804f031a18632ed4d634b49e8128cd67ed17934f0fe4a0e1bf9c31e2b",
      "bytes": 40444,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/debug-notes.md"
    },
    {
      "sourceId": "context.diagnostic-catalog",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/schemas/v1alpha1/diagnostic-catalog.json",
      "digest": "sha256:ca09d174600a7841dcab90b15fe1d95bc9a24f72411704fbe794d2f52dec84a2",
      "bytes": 13307,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/schemas/v1alpha1/diagnostic-catalog.json"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/diagnostics.ts",
      "digest": "sha256:3d27fe071994a2a87a59ecadc52a788a6aaf85737b46371f5622bf10c50aede6",
      "bytes": 25190,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/diagnostics.ts"
    },
    {
      "sourceId": "context.dogfood",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/run-v12-dogfood.mjs",
      "digest": "sha256:90ef90e8a6692485f64a2f6d688833bcba3934f5ba8941c32caff658fc303a53",
      "bytes": 50919,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/run-v12-dogfood.mjs"
    },
    {
      "sourceId": "context.foundation-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-foundation.test.mjs",
      "digest": "sha256:1ae524da0fbac2918749ba54c321259ecd3908a0db4290ab31b51ad0a6180df7",
      "bytes": 10219,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-foundation.test.mjs"
    },
    {
      "sourceId": "context.handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-handoff.ts",
      "digest": "sha256:069d3886402095f9a0df166aee45d22722da1e175ae2d4f6f0e87a2c736e658a",
      "bytes": 17810,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-handoff.ts"
    },
    {
      "sourceId": "context.implementation-notes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/implementation-notes.md",
      "digest": "sha256:6477ddc5de95e470ddcbc1327a687a51a70b49a151da48339b12005dab644a81",
      "bytes": 32187,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/implementation-notes.md"
    },
    {
      "sourceId": "context.inspection-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-inspection.test.mjs",
      "digest": "sha256:9b78ef93fea4bfb7929a5061f57f6ab0b338d71052ba702b76dc86edef0ed271",
      "bytes": 18933,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-inspection.test.mjs"
    },
    {
      "sourceId": "context.pre-integration-review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/pre-integration-review.md",
      "digest": "sha256:a63e9e2b836b96aa871913bf8e9bd635055474084a23d325daa98c5b1b9c5526",
      "bytes": 11618,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/pre-integration-review.md"
    },
    {
      "sourceId": "context.release-gate-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/run-v12-release-gate.mjs",
      "digest": "sha256:2888ca9ae2a19dbf2b56c4acb39e934e6c9194f9709906a4f17d1e958578e1c0",
      "bytes": 31791,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-gate-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/v12-release-gate.test.mjs",
      "digest": "sha256:9842abebe89689e3465579d662e70ea541722236d64b986bce222d4ce9996c47",
      "bytes": 22072,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/v12-release-gate.test.mjs"
    },
    {
      "sourceId": "context.release-review-r2-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/v12-release-review.test.mjs",
      "digest": "sha256:1abb654e346f0a6f98aa2fbab69901e0a0f8a5eebef9c9fecfa98375fe38f6e3",
      "bytes": 12922,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/v12-release-review.test.mjs"
    },
    {
      "sourceId": "context.render",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-render.ts",
      "digest": "sha256:e8c2c73bf266b32ebee589497a5298435bb50f59e50d00d9d70ed3f65dc526e7",
      "bytes": 19184,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-render.ts"
    },
    {
      "sourceId": "context.review-r1-lifecycle-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
      "digest": "sha256:13e1b510607a4c23223b59a0190e3e490be3e95fc94e56dba45cd5e4bf3bdc84",
      "bytes": 5649,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-r1-product-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
      "digest": "sha256:7fb4caf2142208d0735d17bc75610098e671113f1c7a1047cc29bb62ce0e2a26",
      "bytes": 5819,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-r1-security-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
      "digest": "sha256:605a4e7065e1c4af2b3114129e919a810e430b584e31c718c0d78fa02fa027b7",
      "bytes": 7259,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json"
    },
    {
      "sourceId": "context.review-r1-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
      "digest": "sha256:8e4f69aae43ae919b3ac71f3055ac80f9bcb30cec936629b64b6f142c3169d42",
      "bytes": 2558,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json"
    },
    {
      "sourceId": "context.review-r2-handoff-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:9daa5bc7fde24a8d70d7e68cb8faed7327f9ae4f0b3ed180f00cb8facb48d9ae",
      "bytes": 11990,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.review-r2-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:f019b39dc555afd3663519fb427cf73c9eee2b14cc9b5e769b5a1ebc733ffc7e",
      "bytes": 86706,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/specialist-run-contract.md"
    },
    {
      "sourceId": "context.run-inspection",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-inspection.ts",
      "digest": "sha256:83d46b99d0bd553e36566aa5551b14c945b6177122c2c73f69e41ad6367f30ac",
      "bytes": 14484,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-inspection.ts"
    },
    {
      "sourceId": "context.run-schema",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-schema.ts",
      "digest": "sha256:db55d52355ec661a12e8e5c50981af0658ad1f9ef678f1c729882fa70024691d",
      "bytes": 3180,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-schema.ts"
    },
    {
      "sourceId": "context.run-schema-json",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/schemas/v1alpha1/specialist-run.schema.json",
      "digest": "sha256:8949156f35ab5c4e9efcc86c5509b6a0fb137ced45a0c4c6da3648621797bba5",
      "bytes": 17405,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/schemas/v1alpha1/specialist-run.schema.json"
    },
    {
      "sourceId": "context.run-session",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-session.ts",
      "digest": "sha256:0ae9bff6b1727c8e3a5540bb7714288592b93b31de0dc6721a84fd73a6e9a03e",
      "bytes": 18723,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-session.ts"
    },
    {
      "sourceId": "context.run-transition",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-transition.ts",
      "digest": "sha256:64916178302c40741eb53780e42f74af3cba7c886956851a55d6b4582d0cc6c7",
      "bytes": 8015,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-transition.ts"
    },
    {
      "sourceId": "context.run-types",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-types.ts",
      "digest": "sha256:01c54b2fc3244f875a4c04e8624d570953e08a6ce1cbbadb8e766117e270a74c",
      "bytes": 4222,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-types.ts"
    },
    {
      "sourceId": "context.schema-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-schema.test.mjs",
      "digest": "sha256:6bed3f897fdf550e644c249c468eb3d3e5f0748e833675f4eb2638686a0b204a",
      "bytes": 12596,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-schema.test.mjs"
    },
    {
      "sourceId": "context.snapshot.00382718736032ce94864543",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/package-envelope.json",
      "digest": "sha256:271a0de9fdb4da4503297f00b2d11c15e2d83c1c4c24b6d493d7438616609c6e",
      "bytes": 67956,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.04ade6ced07690b028c45abf",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json",
      "digest": "sha256:bd5da675c08f9a4691fe9ea5c211c65d876044ad302ba02d7021ba4ce1e7d30c",
      "bytes": 106478,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.07966ede47780a276c15a689",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/attempt-history.md",
      "digest": "sha256:0f8baeb817c9a94ca7b1dd2b2f718293ea7c73d88f682ce142caa87663ec38a6",
      "bytes": 1531,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.09a26a6ae9618b834072a2ab",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/approval.json",
      "digest": "sha256:0a30ba3dd3d1861979a878ccd5e166d04b3094c049ade4b2143a3c14fba4ba18",
      "bytes": 695,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/approval.json"
    },
    {
      "sourceId": "context.snapshot.09b41c9ae9359c70eba6d8fa",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json",
      "digest": "sha256:a8074ac4e6a476a42817be111dccd8cca67b43d3d93067a9ff2460989da2fa5a",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json"
    },
    {
      "sourceId": "context.snapshot.0ac43bb8bd480aae647abdec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/phase-metadata.json",
      "digest": "sha256:7c1fc42b484bbc6520bb0344ea92b0fb381e289799222cd2148849523678afcd",
      "bytes": 198,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/phase-metadata.json"
    },
    {
      "sourceId": "context.snapshot.0fab3123087a94a71c56eb74",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoffs/agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8.json",
      "digest": "sha256:539b591f70c9b5808e79f15d73bda7625b67555b10a36ff0cb9bfb75b4491943",
      "bytes": 5319,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoffs/agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8.json"
    },
    {
      "sourceId": "context.snapshot.10dcfe334412eca8138ec6f8",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-block-attempt-2.json",
      "digest": "sha256:d1f59ac8a04bf5a629bdff36b0268a02cc9e1a4c03222e40db39a9ea793bde8d",
      "bytes": 2592,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-block-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.12cf839ef954120eb7872f74",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json",
      "digest": "sha256:89687dae2a1a7a02f04db245666f74ed46d9226986ee60f14f7a97416a0d991d",
      "bytes": 1307,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.1413b84c8e0a13722771b575",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-schema-data.ts",
      "digest": "sha256:a41ed770e2d250cde3fed83910ba0a099eb84ea1fc6f9142e91f6659a1cd0bc1",
      "bytes": 17463,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-schema-data.ts"
    },
    {
      "sourceId": "context.snapshot.18d77a1516294d32d8822633",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/runtime-purity-ordering-attempt-1.json",
      "digest": "sha256:8db3fea6a6f47fba804f72d454660bafda7ab5d06691d729157e2f8f3aba66be",
      "bytes": 7254,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/runtime-purity-ordering-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.191cba3268255c9e43bd2402",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/aggregate-resource-attempt-1.json",
      "digest": "sha256:f74436e9e9a234cc8c41cba9a3b47ee84d8e0bff3ceba811252f008686c51677",
      "bytes": 6718,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/aggregate-resource-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.19aa2fc6f7476053cefc6d7f",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json",
      "digest": "sha256:6342efa7f78f9a6bbfc531836e2853f26daeac32d382682ee663b378668eaec6",
      "bytes": 7056,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json"
    },
    {
      "sourceId": "context.snapshot.1f83e1900b8f7093e2687be4",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification.json",
      "digest": "sha256:d2feb5e60d4d6daa7b51259223f3eb6c1e8458ea8ec7ce954660e00953d0c411",
      "bytes": 1312,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.1f9a33f7f45030c87119f59c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json",
      "digest": "sha256:790bfbf9106963bbe22d4360d688ffbf6b0e608284099117fb3d37c8c99ef290",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json"
    },
    {
      "sourceId": "context.snapshot.1fd1fe173ad87aa25d4d2235",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
      "digest": "sha256:fbce408c5009e88fa08ff33dd1a5ed5d8e9fe949afc6058fa90b5f6f01d595cd",
      "bytes": 24102,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs"
    },
    {
      "sourceId": "context.snapshot.211dcdc733aab7109734903d",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json",
      "digest": "sha256:c34764e2e121af4634cb4aaaa6a46a13584a6b2999bb5650cc17f5ce944ddaa4",
      "bytes": 156278,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.22220a8f9954d8a53ac58c2c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json",
      "digest": "sha256:64376261a673ebc7ec29222ee90569097915879521d8ea062a36a9d156e8b34d",
      "bytes": 2701,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json"
    },
    {
      "sourceId": "context.snapshot.224c47f9d0c135b476296437",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json",
      "digest": "sha256:3c95ca87255613bdcb96f0a894a03ce012c4d5662a3379230c07166e56fcf33b",
      "bytes": 5061,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json"
    },
    {
      "sourceId": "context.snapshot.228f3a6b4301d0257c435790",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoffs/agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5.json",
      "digest": "sha256:b678fcf1c85ec59304893b428fef0b09210d5b3eac45a51b49e3075a5003b064",
      "bytes": 4930,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoffs/agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5.json"
    },
    {
      "sourceId": "context.snapshot.2375c53f5df926b63dc7092d",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json",
      "digest": "sha256:f2dafdb21cf960295ea4d0e1390a60ca5962089037bd2a8bd79a080a270e807e",
      "bytes": 1307,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.24b78d7b209e9e2da26a1851",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48-block-attempt-1.json",
      "digest": "sha256:9462e65c93a9d54c2b7dd0045286a11b3109ec89075d35e489ba013efcf06b9a",
      "bytes": 4420,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48-block-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.262e6861315dd0730524c35f",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/package-envelope.json",
      "digest": "sha256:843275069feed73fc380c386c270c5fb3a9ef02d96a7ccfbc2f3849d677baa2e",
      "bytes": 171107,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.2919a10315aab340a44343b4",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/package-envelope.json",
      "digest": "sha256:69dc54908198e0a584bb93e4e9e8865d3de626b6f478ad0ae986b1a616c14093",
      "bytes": 102163,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.2d747167ec9260924a5179dc",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.snapshot.31d7de9931001893c2d03420",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/approval.json",
      "digest": "sha256:e0c11c6ee92345c06e4015b63b9167580b9c8eb1c7cd060c014004a6ef9ef96e",
      "bytes": 665,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/approval.json"
    },
    {
      "sourceId": "context.snapshot.329633914caff062c242ff11",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json",
      "digest": "sha256:615cc4bd3965a7344a53485a35c58bcada2217609760388d2a729beda4c574cc",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json"
    },
    {
      "sourceId": "context.snapshot.32ac3609867b688f03fc051a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/implementation-dogfood-attempt-1.json",
      "digest": "sha256:ce6cc26eee8eea92928381ee2b97da0e32397194369d09c7879f4c27e4d6d8af",
      "bytes": 12438,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/implementation-dogfood-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.3698e5ebe956ac6d636d3a87",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-2.json",
      "digest": "sha256:b5745977bcd30a5da8ca02395bc28ab22ae252566282f5dd4f9a62b0ffdbb932",
      "bytes": 4052,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.36e34477e2ca7f630c06891c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json",
      "digest": "sha256:b0ac5ef2c1131207ccee6a43ade45fd750307f1ab763c7b74d0308d3fe9960fd",
      "bytes": 126914,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.42433a3ea4ad7c253acda545",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json",
      "digest": "sha256:edd2df13589f4b327ed303bb75992ea79f06d70f0ca1b53730bfa2cfb13e060c",
      "bytes": 1321,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.43c66cdd3255b64d008a53b6",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/phase-metadata.json",
      "digest": "sha256:9e13476303cd5d1894769eee76cc566be541f48c46a43948f47f4b256905b750",
      "bytes": 187,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/phase-metadata.json"
    },
    {
      "sourceId": "context.snapshot.45ce43bd6276fced25a16cdb",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json",
      "digest": "sha256:26bf421f81127ecfe85f31b6d044a2a3accbaca788ab378a90e2db4733a887a6",
      "bytes": 141194,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.47809f446dd4dec5cc41d016",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json",
      "digest": "sha256:eab4c5b000fc984a662ba1870506243b6f3bdc56db01d4596bfedc5d208db26e",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json"
    },
    {
      "sourceId": "context.snapshot.48bc358d082c372201cfd2cd",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/attempt-history.md",
      "digest": "sha256:fb10425172498dc1a3beec8a457955a7d8f8cb83947ad2d1b75503a15bb6cd72",
      "bytes": 2534,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.4a33d57a74840d02346e6278",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json",
      "digest": "sha256:3d3a406acd342a7c32d22e7cd3a92a0c7db89d74af50d9d394da9a93830c76fb",
      "bytes": 1998,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.4b3ffb47b8ae8902fde5d0e6",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json",
      "digest": "sha256:93ea426aadd18f7ff5b68bc779b247b2c68ab8c476fcd969941eb3b18332e3c1",
      "bytes": 1308,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.4dd1f5308796a5f160e99639",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json",
      "digest": "sha256:3c95e3f08bae727d0bf15066814a5a5a699b2dcd034c0b3acdf9b77174c95da9",
      "bytes": 642,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json"
    },
    {
      "sourceId": "context.snapshot.4df25c06fc4b0e669165e2d2",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json",
      "digest": "sha256:c82903b980ba72b47eadbd54e6c760040bd9f19525326428a4c108599dee95d0",
      "bytes": 1306,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.5087f0cd40e7f165fb01285b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
      "digest": "sha256:3db78ce7e72fb6554df199d1ee3d9f8f6f88a2d9a0c15b5395b7fd3ed2bd82bd",
      "bytes": 313118,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.5133279209d3099b8316dc9b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json",
      "digest": "sha256:52f1a755dc039240fcfbbb4679382504f1470758a21df41007e1d67e8b4d138b",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json"
    },
    {
      "sourceId": "context.snapshot.530ee538b647a08f7113c61e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json",
      "digest": "sha256:ce6cc26eee8eea92928381ee2b97da0e32397194369d09c7879f4c27e4d6d8af",
      "bytes": 12438,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json"
    },
    {
      "sourceId": "context.snapshot.5c8cbac7c096caea56cb1bbe",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json",
      "digest": "sha256:8745eaa9c90a9c7f8cfc01bc9f668810a31fee3a84281dcdea229d0a26d48da3",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json"
    },
    {
      "sourceId": "context.snapshot.68335368a44573cf7a40437a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoff-verification.json",
      "digest": "sha256:cd5389cb9c257b308776a3fdd7c6c34cf947762c5685910e5d013199f0837d94",
      "bytes": 2052,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.69bec1301e6d09fad9fd4271",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826.json",
      "digest": "sha256:e489069fc8afc46475e6a177bc4a3cce1602acfd81cac4938409917bd9377e3f",
      "bytes": 4491,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826.json"
    },
    {
      "sourceId": "context.snapshot.6fda699b4c0b04cdc085f047",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/package-envelope.json",
      "digest": "sha256:651c0ed6aa2923a2c367108636fe54afac247361d4a9887f98a875191f8e1adc",
      "bytes": 266324,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.72015689e270bccaca0e1194",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/request.json",
      "digest": "sha256:3fe6ed8149c2dd6738db13db5de07960871ac8f0eea1ca54b89af23381cfa335",
      "bytes": 60733,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/request.json"
    },
    {
      "sourceId": "context.snapshot.743690e92ae6eb62ad00f685",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md",
      "digest": "sha256:acbb09315f1e22a61a08b549ff7ba4142d61e9c04c859cf2e991690492caf3f3",
      "bytes": 1867,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md"
    },
    {
      "sourceId": "context.snapshot.763850fd55941c25505dc4f1",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json",
      "digest": "sha256:1432e2c7a6f7384583d5dc27e155a7148621f6f4cbddd17c3b6bd18dd3991a32",
      "bytes": 5812,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json"
    },
    {
      "sourceId": "context.snapshot.779e75de9f0569a73959391d",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-1.json",
      "digest": "sha256:2754915a7a9321d658fe4f6daa4e3892b69599f083bbb5d60e3c29dc41df4efc",
      "bytes": 4808,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.7b14d48e93f3219dcf81347b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json",
      "digest": "sha256:89ab112ce3df0a97f64db2994fc792238955b7007a7ce0310b4af39b4340d3df",
      "bytes": 8095,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json"
    },
    {
      "sourceId": "context.snapshot.7b5a54ec537d5bf96f7a800f",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json",
      "digest": "sha256:e1d5c5e192499f1084752f5cff60ba846394899b2d637cc7dc7f53d087b88c08",
      "bytes": 642,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json"
    },
    {
      "sourceId": "context.snapshot.7d245bf26850ca3af8b4e9d3",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json",
      "digest": "sha256:b33cc6312e2db6481ae9d634607a952a67c3fb09a2c6f42b40a0f7338251dd1e",
      "bytes": 2767,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.7f66a4f17bf4b0445ea079d1",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json",
      "digest": "sha256:08ceb9d6851f9907a97a9752c8010bb746abbcf7ad62c3dd403175bd0c2a6855",
      "bytes": 1999,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.81a05b77f5b741d9719c6fc2",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/compilation-summary.json",
      "digest": "sha256:8b39a23ed052cf68e88c8113a9942f675feb6c2a1da8142308540965ca6728c3",
      "bytes": 4940,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/compilation-summary.json"
    },
    {
      "sourceId": "context.snapshot.8299759f5062164630808e79",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json",
      "digest": "sha256:23bbdd75d90ee42595b5f22f1ba2c9ba9f608866b049285b027ae579225b2e4b",
      "bytes": 6667,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json"
    },
    {
      "sourceId": "context.snapshot.84aae0dbbf362752d1946977",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48.json",
      "digest": "sha256:0e470fae36b543e2eb66b9695511fdf43ff77e1df23122bda31917de4b5c6fbb",
      "bytes": 5129,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48.json"
    },
    {
      "sourceId": "context.snapshot.8513f85ec735ef2c31f31748",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json",
      "digest": "sha256:26a3827014dbc45134557ab57c065ce784bff5f0ddaf883198baa2e02eb79ec8",
      "bytes": 1322,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.8751e49cf34f3e9c8a0812c0",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
      "digest": "sha256:e8b25ac1de45cee31aced60c4a811699d03b36121bb660d7e1c18a0f4c4c01a8",
      "bytes": 635,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json"
    },
    {
      "sourceId": "context.snapshot.8a14ddefcb7e319c23347f08",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/package-envelope.json",
      "digest": "sha256:ea4abf903e792e2257dcefca21691b91281188a87c2e680f8249954ce69c826d",
      "bytes": 69377,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.8cb796dcf98e8c38778ceb48",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/approval.json",
      "digest": "sha256:0f3fda441050c8865e307d845640713cb496fd4c11292bbdaf51c77cb6ee25c3",
      "bytes": 658,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/approval.json"
    },
    {
      "sourceId": "context.snapshot.8d473271f4ec008e5f5b4634",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/runtime-purity-ordering-attempt-1.json",
      "digest": "sha256:89ab112ce3df0a97f64db2994fc792238955b7007a7ce0310b4af39b4340d3df",
      "bytes": 8095,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/runtime-purity-ordering-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.8f5bf458eba4d823d1ac3b82",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json",
      "digest": "sha256:939099add2852e3dfe14b307fc55e46c89b56a1dd0c735d15bf35e82f99a5a68",
      "bytes": 5291,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json"
    },
    {
      "sourceId": "context.snapshot.9522c5158d75d744d2ebb86d",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json",
      "digest": "sha256:5afb33ee3c7f456ea0331d7d0735a0291cd69fb5d7a4c6c6d80982177d815090",
      "bytes": 9058,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json"
    },
    {
      "sourceId": "context.snapshot.9f7cdd9e1d1bba465d5183d5",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
      "digest": "sha256:8e910cf4d124f0611c23f4d6dfe3cc053d7a2ee826fcacca3f287cbce0459e8a",
      "bytes": 3044,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.snapshot.a0ec19f463c05feebe352a7e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json",
      "digest": "sha256:9788872c5ee79402dea890f36f36291eaf27c8b46f3d4f9802651f8176a15f73",
      "bytes": 98036,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.a200b096a556a58901826acd",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json",
      "digest": "sha256:3510b98137b0cd8746d5440f4254bcfed8c493f714a57539a705eb12012c12fd",
      "bytes": 5693,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json"
    },
    {
      "sourceId": "context.snapshot.a2545a04fbdb5efd96c62a17",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json",
      "digest": "sha256:08fba946e7d8fd47b112322a4f8ea954922d230de6d2b9fac234bdd297f6540f",
      "bytes": 152251,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.a2c5273bb9e0ee391fe03346",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/approval.json",
      "digest": "sha256:1afdf4abed9c1f52099d38cd7294af6daee44b62f2b2b38936b1f36811ff9fa3",
      "bytes": 724,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/approval.json"
    },
    {
      "sourceId": "context.snapshot.a5792502c3d13f60ed74b4cc",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md",
      "digest": "sha256:42f53ec000a3cfa69786b0895354ab1b9ab24322305b5ef9d7b33d9a46d13390",
      "bytes": 16223,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.snapshot.a5a7bcca4dc3dc0223c690dd",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/attempt-history.md",
      "digest": "sha256:0179494af79a883b1dd83ed00587b334c2c76b5349f350024b0392338780fe53",
      "bytes": 3278,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.a6b6104f7e40a75bc3372b4d",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json",
      "digest": "sha256:d45f4f598722ed86079d6b079cd078ef580f8a0c8e6e708ec1d9b0018d860621",
      "bytes": 316925,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.a905b4dc31515d7dc72ca8be",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/approval.json",
      "digest": "sha256:85c07a5f8d4c1fa96d9e1201682ab4f67311e043db6d129002cd2ae30c245daf",
      "bytes": 651,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/approval.json"
    },
    {
      "sourceId": "context.snapshot.aa45bd3c9e109e76f1c7b059",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json",
      "digest": "sha256:2a5c2b5cfff8a90d78fd61deb291652303f4347254279ff3c7bae5a104694283",
      "bytes": 5373,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json"
    },
    {
      "sourceId": "context.snapshot.abd3b7e2df224872fb02dca5",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json",
      "digest": "sha256:624577edaed5b154f3c4e90daff0dd06f17187c1fa4aa4128e75eb5914bb3df1",
      "bytes": 8035,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json"
    },
    {
      "sourceId": "context.snapshot.abe158fda4f26d88c8fc0bcb",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/release-evidence-attempt-1.json",
      "digest": "sha256:6342efa7f78f9a6bbfc531836e2853f26daeac32d382682ee663b378668eaec6",
      "bytes": 7056,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/release-evidence-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.afb0c0f6032bbef27ff15ef3",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json",
      "digest": "sha256:80e6d469e39542d424be462f2125832595ba1962a0a2afda71714446e9d980c0",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json"
    },
    {
      "sourceId": "context.snapshot.b19d7f0f2acf2ac9258ba239",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json",
      "digest": "sha256:b0a48bde829f601ec4d11abeb5c0f54dcb7123182d2c1fbdb405fc251b28a27c",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json"
    },
    {
      "sourceId": "context.snapshot.b2799242427c46a06f6f0329",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
      "digest": "sha256:af16ab6ce302a85451cd99198d9a8ab93c8b159c47d4a79345248d5c08759c3f",
      "bytes": 8162,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json"
    },
    {
      "sourceId": "context.snapshot.b4bb2694a3b29911a8fc7682",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/approval.json",
      "digest": "sha256:83b6b8f1a1596f2cf496e506a72747069302e82a1ab496ad1033e93a16ae2220",
      "bytes": 646,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/approval.json"
    },
    {
      "sourceId": "context.snapshot.b5c00f95413b2ef117430a61",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad.json",
      "digest": "sha256:8b1b8463255a74e921853694c5edae46bad51529cc12db88a0ebdc2455ce1ed4",
      "bytes": 5431,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad.json"
    },
    {
      "sourceId": "context.snapshot.ba12603d278d41e4276d345c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json",
      "digest": "sha256:67eac872b0d88bbade9af9afda268178f57077b0abdc4f605444ead1da6c186c",
      "bytes": 2807,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json"
    },
    {
      "sourceId": "context.snapshot.bbd9fbcb0756a48f9be19b9a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826-pass-attempt-2.json",
      "digest": "sha256:51e123c6a202a58a0ea456729b84dbb4995cff2b26b27313c66133fa035ae4b9",
      "bytes": 6520,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826-pass-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.c1a8a52a8b18d0f580f2cd2b",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json",
      "digest": "sha256:78d34233ec98a9c685ee9bb0c6b582c0b3be77b25c4deec86a279ed682a29c42",
      "bytes": 108566,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.cad1970de130fee691067f4e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/attempt-history.md",
      "digest": "sha256:f8d6bf13c055c8ef4dca3c9573c97bcf10ebfe03d850e4f76cba93c816727dd4",
      "bytes": 1224,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/attempt-history.md"
    },
    {
      "sourceId": "context.snapshot.cc820ef22ee028edc89a510e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json",
      "digest": "sha256:f36ddf35492244b21248fe96a5363f1c7222fb206a4fe11f5d213427c37a4956",
      "bytes": 4584,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json"
    },
    {
      "sourceId": "context.snapshot.cca3a25261d6a645c682af52",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json",
      "digest": "sha256:b6a95ec5913a7b8a4a54946f3ffde43233de13109ae0ce89dafc74abfb27498b",
      "bytes": 1307,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.cdea461398c2b49c747166cc",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md"
    },
    {
      "sourceId": "context.snapshot.cee886d3f0330e16985768eb",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json",
      "digest": "sha256:cc0fe31e1f2b4dfb903667056b83fffb5402afc6f4f8bf4a727c4178abae5afb",
      "bytes": 1308,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.cfd416a341d633fc19dd1410",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/package-envelope.json",
      "digest": "sha256:f2ba734717a0b409b85e4015f7d0de61efcfb8faeb2eede39f3d0c304020e8d0",
      "bytes": 81846,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.d1b4fee620d988de5af353cc",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
      "digest": "sha256:f74436e9e9a234cc8c41cba9a3b47ee84d8e0bff3ceba811252f008686c51677",
      "bytes": 6718,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json"
    },
    {
      "sourceId": "context.snapshot.d216ba9343ee752bb2e169b6",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/implementation-dogfood-attempt-1.json",
      "digest": "sha256:23bbdd75d90ee42595b5f22f1ba2c9ba9f608866b049285b027ae579225b2e4b",
      "bytes": 6667,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/implementation-dogfood-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.d584753529cebb27b50c0cce",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/runtime-purity-ordering-attempt-1.json",
      "digest": "sha256:5afb33ee3c7f456ea0331d7d0735a0291cd69fb5d7a4c6c6d80982177d815090",
      "bytes": 9058,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/runtime-purity-ordering-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.d6c3f8f51d68cc0f20d65298",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json",
      "digest": "sha256:091169f4ca7592f8deb2b84b9930b5eb04361d3ffea3dd767b62ebddb809e53e",
      "bytes": 1306,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.da4dee445d4c158ab601bc69",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/release-evidence-attempt-1.json",
      "digest": "sha256:3510b98137b0cd8746d5440f4254bcfed8c493f714a57539a705eb12012c12fd",
      "bytes": 5693,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/release-evidence-attempt-1.json"
    },
    {
      "sourceId": "context.snapshot.e0cb7378793dc4b829919228",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json",
      "digest": "sha256:8e5a9aae80688d577a554b460040adddb6c8b3988795ca72e97954109426a48c",
      "bytes": 96462,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.e1f445e6b8989f610cc3c814",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/compilation-summary.json",
      "digest": "sha256:a0bdb09ae7f7b49b09c4c80ba380f82de148b99eeed5cbe3568baa5a0375dc41",
      "bytes": 9358,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/compilation-summary.json"
    },
    {
      "sourceId": "context.snapshot.e5b168b04add2b9b692f5f3c",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json",
      "digest": "sha256:32472ecbb21d7547b4f4cab342db1f015f06f819f085fb6ed4fee29aecafac8a",
      "bytes": 90511,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.e6c7fe2a753efd6f3086a328",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/request.json",
      "digest": "sha256:470febe17c68447e8edcc19c67183df99096adcbc504a81d1b041e0eb8d94657",
      "bytes": 32075,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/request.json"
    },
    {
      "sourceId": "context.snapshot.e7ca8e130bdbe79512e3b52a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json",
      "digest": "sha256:4679cd6145a4afa16adcd7e395a0cf7cfa7fd770cc2c0e328fcdf9189e71e06f",
      "bytes": 1306,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.e80d9db7d4d45c7723369aad",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json",
      "digest": "sha256:c4da5dc7899ecca6dc57ad8f210b3e947e4bde8afb293dd3ce80cd761946a6e3",
      "bytes": 1327,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json"
    },
    {
      "sourceId": "context.snapshot.e96374256850886a8792d924",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json",
      "digest": "sha256:3e58dddde82171b5090debc1ea76a29298fe7a7e0f9a27dd39fd1f826350e543",
      "bytes": 5595,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json"
    },
    {
      "sourceId": "context.snapshot.ecdd69913bcca53fe53e847a",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
      "digest": "sha256:74eefd84adae4a34c5220a9e1039d98f1b1fa651e7df3a3f8cfe27a338053777",
      "bytes": 137049,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json"
    },
    {
      "sourceId": "context.snapshot.f419efd96b6815bfa705fdd3",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json",
      "digest": "sha256:73fcd5841f739c4f353355ddba6b412d68c3b2d8233ccc371ef2de9a2477d282",
      "bytes": 3795,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json"
    },
    {
      "sourceId": "context.snapshot.f7f40629ba319cd92f3285db",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json",
      "digest": "sha256:8db3fea6a6f47fba804f72d454660bafda7ab5d06691d729157e2f8f3aba66be",
      "bytes": 7254,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json"
    },
    {
      "sourceId": "context.snapshot.f95b4ffb0487e1637121c98e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json",
      "digest": "sha256:64e2b86a290900be5364f5ae060d78f9daee898b1e003a64b4a636531621212b",
      "bytes": 1497,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json"
    },
    {
      "sourceId": "context.snapshot.fbb32bb1193039a4d045a176",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
      "digest": "sha256:dc177cddfeae16dcefe456581fcaed2e072a8fa84b4ad67204146062d4995ef2",
      "bytes": 641,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json"
    },
    {
      "sourceId": "context.snapshot.fc41091ce4c6662be609206e",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6.json",
      "digest": "sha256:6f0d90bf4c883ba7d26a3970491810677da52c815d1e63048df4a7a4bad86a2e",
      "bytes": 6033,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6.json"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/spec.md",
      "digest": "sha256:e537613dda836bd387f7bac02febc655804440e3763787cf079d616295a7404d",
      "bytes": 5874,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/spec.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/test-plan.md",
      "digest": "sha256:3df94a538452e2c6a6e9ce7ab2d91bebf9adb450593aa8932ae85cf34e7d8c4e",
      "bytes": 5801,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/test-plan.md"
    },
    {
      "sourceId": "context.transition-tests",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-transition.test.mjs",
      "digest": "sha256:bc140c1c1e02a02160c6a7b0ed8399b99dda99d418a6f6f9151039548eb39c28",
      "bytes": 9861,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-transition.test.mjs"
    },
    {
      "sourceId": "context.v12-dogfood-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
      "digest": "sha256:1357ace5bbffef6194e17a43e12edcedd32aa29cc9967cdabd40aa21a004a4d2",
      "bytes": 6031,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json"
    },
    {
      "sourceId": "context.v12-verification-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
      "digest": "sha256:d2b3ea9c077345fecc78f504a5e376207c367706b9685da4485509fc5c048137",
      "bytes": 4356,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json"
    },
    {
      "sourceId": "context.v12-verification-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
      "digest": "sha256:985aac5600d600af68be12d6d8f258ce262a1f5ee0d0490d5e85c55dc0ebb103",
      "bytes": 1878,
      "purposes": [
        "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability."
      ],
      "workUnitIds": [
        "review.r2.lifecycle-correctness"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "audit.r2.lifecycle-correctness-recovery"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/candidate.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/pre-integration-review.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/architecture/decisions/0005-immutable-specialist-run-session.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/debug-notes.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-block-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoffs/agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoffs/agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48-block-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/attempt-history.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826-pass-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/runtime-purity-ordering-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/runtime-purity-ordering-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/runtime-purity-ordering-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/implementation-dogfood-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/release-evidence-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-2.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/aggregate-resource-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/implementation-dogfood-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/release-evidence-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/compilation-summary.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/phase-metadata.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/request.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/compilation-summary.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/phase-metadata.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/request.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/implementation-notes.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/schemas/v1alpha1/diagnostic-catalog.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/schemas/v1alpha1/specialist-run.schema.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/check-packed-consumer.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/run-v12-dogfood.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/run-v12-release-gate.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/constants.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/diagnostics.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-handoff.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-render.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-inspection.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-schema-data.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-schema.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-session.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-transition.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-types.ts",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-foundation.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-inspection.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-schema.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-transition.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/v12-release-gate.test.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/v12-release-review.test.mjs"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/candidate.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/canonical-gate/canonical-gate.stdout.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/pre-integration-review.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/architecture/decisions/0005-immutable-specialist-run-session.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/debug-notes.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-block-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/handoffs/agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f-pass-attempt-4.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r10/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r11/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/handoffs/agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r12/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/handoffs/agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r13/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/handoffs/agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r14/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48-block-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/attempt-history.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826-pass-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/handoffs/agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/handoffs/runtime-purity-ordering-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r2/replan.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/handoffs/runtime-purity-ordering-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r3/replan.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/handoffs/runtime-purity-ordering-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r4/replan.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/implementation-dogfood-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/release-evidence-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/handoffs/agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/handoffs/agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r7/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/handoffs/agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r8/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-fix-attempt-2.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/handoffs/agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5-pass-attempt-3.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r9/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/aggregate-resource-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/implementation-dogfood-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/handoffs/release-evidence-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/release-correction/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/compilation-summary.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/dogfood-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/handoffs/verification-pass.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/phase-metadata.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/implementation/verification/request.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/compilation-summary.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/lifecycle-correctness-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/product-api-ide-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/handoffs/security-trace-authority-fix-attempt-1.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/inputs/candidate.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/phase-metadata.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/request.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/evidence/release-review/verify-release-review-handoffs.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/implementation-notes.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/schemas/v1alpha1/diagnostic-catalog.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/schemas/v1alpha1/specialist-run.schema.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/check-packed-consumer.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/run-v12-dogfood.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/scripts/run-v12-release-gate.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/constants.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/diagnostics.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-handoff.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-render.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-inspection.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-schema-data.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-schema.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-session.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-transition.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/src/specialist-run-types.ts",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-foundation.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-inspection.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-schema.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run-transition.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/specialist-run.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/v12-release-gate.test.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/inputs/source-snapshots/test/v12-release-review.test.mjs"
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
      "criterionId": "criterion.review.r2.lifecycle-correctness",
      "criterion": "Audit corrected V12 lifecycle correctness, deterministic recovery, canonical evidence ordering, aggregate resource proof, dependency eligibility, exact fan-in, routing, and immutability.",
      "requirementId": "evidence.r2.lifecycle-correctness-release-review",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve the exact independent LifecycleCorrectnessReleaseReviewR2 evidence.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "lifecycle-correctness-release-review-r2.md"
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
  "contentDigest": "sha256:957bf0322f6b2f5222f70b416f81dc01c2d27a7286c52cf45febedf36785154e"
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
    "digest": "sha256:512a626e9be08a1bd6552eb832abd94d961704cc49f194c170670c0a0e940874"
  },
  "agent": {
    "id": "agent.ecc4e48122daf47ceda2158ba1125b18174c331dddab51ab4bde4964718c2e87",
    "blueprintDigest": "sha256:957bf0322f6b2f5222f70b416f81dc01c2d27a7286c52cf45febedf36785154e"
  },
  "compilationDigest": "sha256:289348ac15dc05d3c7920c7f2118190094fd7bbdf103deb3c229c68f2ebbc37c",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.r2.lifecycle-correctness"
  ],
  "artifacts": [
    {
      "name": "lifecycle-correctness-release-review-r2.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.review.r2.lifecycle-correctness",
      "requirementId": "evidence.r2.lifecycle-correctness-release-review",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "lifecycle-correctness-release-review-r2.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
