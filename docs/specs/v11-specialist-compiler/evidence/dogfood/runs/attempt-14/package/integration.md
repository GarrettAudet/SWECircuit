# Specialist Integration Contract

Compilation: `sha256:7b75efba6021c181740bb85362e0e497ef7c8644d87e5beab6bf74a7ccd9e6d3`

The integration owner launches only the contracts bound to this compilation, preserves each raw handoff, verifies required evidence, resolves declared dependencies in order, and returns to clarification or redesign when a specialist crosses its boundary.

## Integration Gates

1. Confirm every agent contract carries this compilation digest and its manifest-listed blueprint digest.
2. Launch agents only when their dependency wave is ready and external workspace isolation is adequate.
3. Reject undeclared files, authority, context, decisions, or evidence substitutions.
4. Fan in handoffs through the declared integration owner; do not let one specialist silently approve its own independent duty.
5. Run feature-level verification and review before merge, then promote only source-linked durable learning.

## Compiled Plan

```json
{
  "compilationDigest": "sha256:7b75efba6021c181740bb85362e0e497ef7c8644d87e5beab6bf74a7ccd9e6d3",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 14,
  "assumptions": [
    {
      "id": "assumption.atomic-work-reviewed",
      "statement": "The six work units are stable atomic responsibilities for this release review.",
      "rationale": "They were derived from the accepted V11 spec and have disjoint review or integration ownership."
    },
    {
      "id": "assumption.checkout-canonical-context",
      "statement": "Every repository context source is byte-identical under the declared Git checkout rules, with no custom filter or working-tree encoding.",
      "rationale": "A reviewed launch package must reconstruct from a clean checkout, not only the integration owner working tree."
    },
    {
      "id": "assumption.external-approval-root",
      "statement": "The integration owner retains the approved compilation and package digests outside the rendered package.",
      "rationale": "Package verification is trustworthy only when the expected digest pair comes from an independent approval record."
    },
    {
      "id": "assumption.external-host-enforcement",
      "statement": "The external IDE host enforces actual context, permission, workspace, and process boundaries.",
      "rationale": "The V11 compiler emits provider-neutral task demand and performs no runtime effects."
    },
    {
      "id": "assumption.immutable-review-inputs",
      "statement": "Any release document that integration may update is reviewed through an immutable pre-integration snapshot rather than its live output path.",
      "rationale": "Authorized integration must not invalidate the exact candidate it consumes."
    },
    {
      "id": "assumption.relative-planning-weights",
      "statement": "Work, startup, and handoff values are relative planning units rather than elapsed-time forecasts.",
      "rationale": "V11 compares deterministic candidate structure and does not claim runtime benchmarking."
    }
  ],
  "unresolvedDecisions": [
    {
      "id": "decision.runtime-supply",
      "question": "Which IDE, models, and workspace isolation strategy should execute a future production roster?",
      "owner": "v11.integration-owner",
      "blocking": false,
      "proceedRationale": "Runtime supply is explicitly outside the V11 compiler acceptance boundary and requires a later adapter decision."
    }
  ],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 6,
    "evaluatedCandidates": 203,
    "eligibleCandidates": 52,
    "retainedAlternatives": 8,
    "evaluationSetDigest": "sha256:6bf2eadb8a5177dc24e2e04f6092596d876d6f7d1d96ba7001fc36c86b360d9c"
  },
  "selectedCandidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "selectedMetrics": {
    "agentCount": 6,
    "projectedMakespan": 23,
    "peakConcurrency": 4,
    "conflictPairs": 0,
    "handoffCount": 8,
    "duplicatedContextBytes": 1099751,
    "duplicatedPermissionScopes": 89,
    "totalWorkWeight": 38,
    "totalStartupCost": 12,
    "totalHandoffCost": 8
  },
  "selectionReason": {
    "kind": "serial_ineligible",
    "decisiveField": "evidence_independence",
    "selectedValue": "eligible",
    "serialValue": "ineligible",
    "serialRejectionCodes": [
      "evidence_independence"
    ]
  },
  "serialBaseline": {
    "id": "team.3048358537136cc8c5604b2b52e5180772663dc0cc3b0798e32bf99a67ce9696",
    "eligible": false,
    "rejectionCodes": [
      "evidence_independence"
    ],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 40,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 38,
      "totalStartupCost": 2,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730"
      ]
    },
    {
      "start": 4,
      "agentIds": [
        "agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972",
        "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
        "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
        "agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc"
      ]
    },
    {
      "start": 17,
      "agentIds": [
        "agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972",
      "digest": "sha256:740336199298534ccd759256d31a9b25f49abc0743aa6281e3dbd65a5db04b0b"
    },
    {
      "agentId": "agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9",
      "digest": "sha256:0dc1f7de1daaedabfaec668c7ad39e1f9ed5c0cf127daa8de365c646c1b5a051"
    },
    {
      "agentId": "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
      "digest": "sha256:39dcd3fd5120f7b16b21a1df0cafd5e9e83a164fc9fafc6f686d846d40c6825f"
    },
    {
      "agentId": "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
      "digest": "sha256:f7c35c780542e8605cc4aac559b9a740467c818a7835d2b6f9450128cb2711e2"
    },
    {
      "agentId": "agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc",
      "digest": "sha256:55976475e5dabdfef3e0b4dbd87edc4d1bd19789ced8af07c56fbe788a0f9eb5"
    },
    {
      "agentId": "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730",
      "digest": "sha256:b3ffafdbf9fd0d346a2110917eeffb594d8ccb4cfb56ef25d3d7c69a7d7bfb36"
    }
  ]
}
```
