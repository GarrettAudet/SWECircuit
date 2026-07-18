# Specialist Integration Contract

Compilation: `sha256:4bb8eae6b779ebf666f8c9f156fb444dd0631a6e4b5c667dec53ee3327d5e89f`

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
  "compilationDigest": "sha256:4bb8eae6b779ebf666f8c9f156fb444dd0631a6e4b5c667dec53ee3327d5e89f",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 11,
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
    "evaluationSetDigest": "sha256:4a0e859162251ab36b1229b885120aa69578fc4b0c3c1bc9d45ac9c71c82da55"
  },
  "selectedCandidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "selectedMetrics": {
    "agentCount": 6,
    "projectedMakespan": 23,
    "peakConcurrency": 4,
    "conflictPairs": 0,
    "handoffCount": 8,
    "duplicatedContextBytes": 1083471,
    "duplicatedPermissionScopes": 88,
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
      "digest": "sha256:5ce3d8688d613b5884894a5beb44b0de0a5a3818d0186085ce59d6f438e36ca5"
    },
    {
      "agentId": "agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9",
      "digest": "sha256:814982a59749746d3ea197144c7ce53e6bd9ae067d4bc07913c923ebc6af6a46"
    },
    {
      "agentId": "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
      "digest": "sha256:c01d54143c808b2db1072603456266407fba064365811b5ce802fe3bf488290f"
    },
    {
      "agentId": "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
      "digest": "sha256:5af6da323cde65683b75730ab10c3262dc85b9c168ccf24a4cf020dd5ad17516"
    },
    {
      "agentId": "agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc",
      "digest": "sha256:69b18a766979c93dea0f5465d5abf973b4cfc5b2a83748fb5b981a47bf32ca12"
    },
    {
      "agentId": "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730",
      "digest": "sha256:96c86b53ee5586c398308818b5e3889fb1928114903f336da06d62e78260c24b"
    }
  ]
}
```
