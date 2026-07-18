# Specialist Integration Contract

Compilation: `sha256:9e5d2f7304b9100b40c1d96ad59a23c8dce73161386d478b2dda249ec921b1e5`

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
  "compilationDigest": "sha256:9e5d2f7304b9100b40c1d96ad59a23c8dce73161386d478b2dda249ec921b1e5",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 12,
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
    "evaluationSetDigest": "sha256:488d8ae1f74905b6250661855aa8a8e7f5d22db5acc41e44c60cfcc9f7b83eaf"
  },
  "selectedCandidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "selectedMetrics": {
    "agentCount": 6,
    "projectedMakespan": 23,
    "peakConcurrency": 4,
    "conflictPairs": 0,
    "handoffCount": 8,
    "duplicatedContextBytes": 1083427,
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
      "digest": "sha256:a0b7335d5777e0858b91d5f4b7108fc71149d5b378fd4583d04ebfabb5fbdfb0"
    },
    {
      "agentId": "agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9",
      "digest": "sha256:f4e05ae0fe616d6a0778c2e0ec063ddc5c8fe74ba0c3860ccf052735e68585ac"
    },
    {
      "agentId": "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
      "digest": "sha256:00715b35b72df99b55955d639ede27c380d90eaea6dd256b45da699b3454fb13"
    },
    {
      "agentId": "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
      "digest": "sha256:83d50e6e90db1365c6ec0c169817d6de9c845371b46e3210fba73f00bc95ad80"
    },
    {
      "agentId": "agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc",
      "digest": "sha256:08f154d831d168f3053efd7b04ebef0aea821e9ad05b6d4934516714afdbd45a"
    },
    {
      "agentId": "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730",
      "digest": "sha256:b48793a89a13a565fd59e06bd63d54b1b41b5cd9623752eec9b9fa6a4d699157"
    }
  ]
}
```
