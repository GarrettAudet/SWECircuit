# Specialist Contract: agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985

Compilation: `sha256:eaad4d35361dc41813b58a17aff340e757744ea32cfb1ae5b17a31b81230a998`
Blueprint: `sha256:b0bd0dd466b28e97da45a52154df49a867d9a6146d1aecce7d33bfaade10bbc2`

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
  "id": "agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 6,
  "goalDigest": "sha256:63c46ee6638477c065aff6253c1ded9c82f81f2c71588392edcf7c0639d98fab",
  "candidateId": "team.3004c1655868f13cabb8822f3740579a38e3367a8d81708211e06032135c1b60",
  "workUnitIds": [
    "fix.candidate-gate-identity.r6"
  ],
  "objectives": [
    {
      "workUnitId": "fix.candidate-gate-identity.r6",
      "objective": "Make canonical-gate evidence immutable per exact candidate and make R2 preparation resolve only the passing receipt and raw logs derived for its requested candidate."
    }
  ],
  "modules": [
    {
      "id": "correction.candidate-gate-identity",
      "action": "Preserve the candidate-1 failure at its original paths, change future gate output to a candidate-addressed directory, derive the same paths from the exact candidate in R2 preparation and revalidation, reject mismatched or failing receipts, and verify no existing evidence can be overwritten or mistaken for another candidate.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "ImmutableFailedCanonicalGate"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "CandidateScopedCanonicalGateEvidence"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.adr-0005",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/adr-0005.md",
      "digest": "sha256:bb585b88635787a7f835e5eb503f6e0053bed624db13b21e9a769d8a5e619b14",
      "bytes": 9031,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/adr-0005.md"
    },
    {
      "sourceId": "context.failed-gate-receipt",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
      "digest": "sha256:4c636e486f36c22b74f12fdd4b4470eb9056f63f64eca05058ae6923976bb15c",
      "bytes": 1221,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.failed-gate-stderr",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
      "digest": "sha256:4381d1a9ce1c36beb8723eadfb3619288935b9d095de672c450121c23dc0dfad",
      "bytes": 11763,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log"
    },
    {
      "sourceId": "context.failed-gate-stdout",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
      "digest": "sha256:afb6b266dd504cbf89d2cb55b6f9c5c6872fd5636acef8848e2105257aecef12",
      "bytes": 295768,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:f395932106ac25216ca753127f7b97b01497090a7c4115732de77784fff2c5ce",
      "bytes": 3723,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-correction-r5-approval",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json",
      "digest": "sha256:80e6d469e39542d424be462f2125832595ba1962a0a2afda71714446e9d980c0",
      "bytes": 641,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json"
    },
    {
      "sourceId": "context.release-correction-r5-dogfood-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json",
      "digest": "sha256:ce6cc26eee8eea92928381ee2b97da0e32397194369d09c7879f4c27e4d6d8af",
      "bytes": 12438,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json"
    },
    {
      "sourceId": "context.release-correction-r5-package",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json",
      "digest": "sha256:d45f4f598722ed86079d6b079cd078ef580f8a0c8e6e708ec1d9b0018d860621",
      "bytes": 316925,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json"
    },
    {
      "sourceId": "context.release-correction-r5-release-handoff",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json",
      "digest": "sha256:6342efa7f78f9a6bbfc531836e2853f26daeac32d382682ee663b378668eaec6",
      "bytes": 7056,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json"
    },
    {
      "sourceId": "context.release-correction-r5-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json",
      "digest": "sha256:08ceb9d6851f9907a97a9752c8010bb746abbcf7ad62c3dd403175bd0c2a6855",
      "bytes": 1999,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json"
    },
    {
      "sourceId": "context.release-gate",
      "kind": "repository",
      "locator": "path:scripts/run-v12-release-gate.mjs",
      "digest": "sha256:70c80d5c3c51e8abc566b26c12b1649675d2fc49268367b13383d0eaf0a0a301",
      "bytes": 6149,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "scripts/run-v12-release-gate.mjs"
    },
    {
      "sourceId": "context.release-review-r2-harness",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
      "digest": "sha256:89ff4340757a191e8789cd1ce7ee13a9cfc9d33a2c5dc0afc144e7124ec0e955",
      "bytes": 64128,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs"
    },
    {
      "sourceId": "context.release-review-r2-verifier",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
      "digest": "sha256:e30bbf7548d6481935d14db57630e4e5bdaa9aff2df56337b957d07acc83d2aa",
      "bytes": 6984,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/specialist-run-contract.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/test-plan.md",
      "digest": "sha256:ffa2102cbcf6d145d4f5b0ddbc26b9b02f86433a22b4b99b9f5cb084f605d7ec",
      "bytes": 2506,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/test-plan.md"
    },
    {
      "sourceId": "context.v12-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/spec.md",
      "digest": "sha256:b0a3610c935cacf032e9c142d9436b6f620227667c64c5bf0e296eaf4f571ab1",
      "bytes": 5478,
      "purposes": [
        "Implement or verify the exact frozen V12 release-correction-r6 contract."
      ],
      "workUnitIds": [
        "fix.candidate-gate-identity.r6"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.candidate-gate-identity"
    ],
    "scope": {
      "read": [
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/adr-0005.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/spec.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
        "package.json",
        "scripts/run-v12-release-gate.mjs"
      ],
      "write": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-gate.mjs"
      ],
      "conflictZones": [
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
        "scripts/run-v12-release-gate.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/approval.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.be9fff8fdc4fa4e2d916f2df8a8464e0393e4de6db799f6bd325450643ab5bc5.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/handoffs/agent.de2c323fce43a7aa17a15ba8f87bfb49433b6e5b44d08850af889dfa8dd92a73.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r5/package-envelope.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/adr-0005.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/spec.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r6/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stdout.log",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs",
          "package.json",
          "scripts/run-v12-release-gate.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs",
          "scripts/run-v12-release-gate.mjs"
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
      "criterionId": "criterion.fix.candidate-gate-identity.r6",
      "criterion": "Make canonical-gate evidence immutable per exact candidate and make R2 preparation resolve only the passing receipt and raw logs derived for its requested candidate.",
      "requirementId": "evidence.candidate-gate-identity.r6",
      "kind": "review",
      "duty": "produce",
      "description": "Provide immutable failure preservation, exact path-derivation parity, mismatch and overwrite rejection, syntax and format checks, and focused dry-run evidence without running a replacement canonical gate.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "candidate-gate-identity-correction-r6.md"
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
  "contentDigest": "sha256:b0bd0dd466b28e97da45a52154df49a867d9a6146d1aecce7d33bfaade10bbc2"
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
    "revision": 6,
    "digest": "sha256:63c46ee6638477c065aff6253c1ded9c82f81f2c71588392edcf7c0639d98fab"
  },
  "agent": {
    "id": "agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985",
    "blueprintDigest": "sha256:b0bd0dd466b28e97da45a52154df49a867d9a6146d1aecce7d33bfaade10bbc2"
  },
  "compilationDigest": "sha256:eaad4d35361dc41813b58a17aff340e757744ea32cfb1ae5b17a31b81230a998",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.candidate-gate-identity.r6"
  ],
  "artifacts": [
    {
      "name": "candidate-gate-identity-correction-r6.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.candidate-gate-identity.r6",
      "requirementId": "evidence.candidate-gate-identity.r6",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "candidate-gate-identity-correction-r6.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
