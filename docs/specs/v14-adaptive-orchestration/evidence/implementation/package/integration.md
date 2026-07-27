# Specialist Integration Contract

Compilation: `sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614`

The integration owner launches only the contracts bound to this compilation, preserves each raw handoff, verifies required evidence, resolves declared dependencies in order, and returns to clarification or redesign when a specialist crosses its boundary.

## Integration Gates

1. Confirm every emitted file matches its manifest-listed raw SHA-256 digest and byte count, and every agent contract carries this compilation digest and its manifest-listed blueprint digest.
2. Launch agents only when their dependency wave is ready and external workspace isolation is adequate.
3. Reject undeclared files, authority, context, decisions, or evidence substitutions.
4. Fan in handoffs through the declared integration owner; do not let one specialist silently approve its own independent duty.
5. Run feature-level verification and review before merge, then promote only source-linked durable learning.

## Compiled Plan

```json
{
  "compilationDigest": "sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614",
  "goalId": "v14.adaptive-orchestration.vertical-slice",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.additive-api",
      "statement": "V14 APIs are additive and V11/V12 behavior remains unchanged.",
      "rationale": "The vertical slice must not destabilize the released baseline."
    },
    {
      "id": "assumption.bootstrap-routing",
      "statement": "This first implementation wave uses a recorded manual bootstrap runtime plan because the router it implements is not yet executable.",
      "rationale": "The resulting router must choose later waves deterministically and replace manual selection."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 4,
    "evaluatedCandidates": 15,
    "eligibleCandidates": 7,
    "retainedAlternatives": 8,
    "evaluationSetDigest": "sha256:41ab97a9ef8463569aee75e610033dab8ccff7de38983de79c1e54e140edce2f"
  },
  "selectedCandidateId": "team.43ca2714bb81573a11b7ed5e7b3d63c128bae774b17bb174483986576bebee67",
  "selectedMetrics": {
    "agentCount": 4,
    "projectedMakespan": 17,
    "peakConcurrency": 3,
    "conflictPairs": 3,
    "handoffCount": 3,
    "duplicatedContextBytes": 461106,
    "duplicatedPermissionScopes": 31,
    "totalWorkWeight": 27,
    "totalStartupCost": 4,
    "totalHandoffCost": 3
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
    "id": "team.4b3f33a37ebe1438934dd0fcd522ed7f4a3d930fbc69dda26e22e6096f403091",
    "eligible": false,
    "rejectionCodes": [
      "evidence_independence"
    ],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 28,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 27,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.40a1f03c545884055177cf4a6326f71f064dbbed0a4bcf90f6299ebb21242547",
        "agent.73bec6d8f92dc546631e028dfe3d1f26c5dc5f37ff16200a77f024652265d8dd",
        "agent.90b00f68efb412fccdfc402cea99f2161b7516f85a48bbabee453f4bc814288c"
      ]
    },
    {
      "start": 12,
      "agentIds": [
        "agent.a744a1750e4790c43bf5b1e5a700ea3bdf89964af1db7e29bf23483354b928fa"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.40a1f03c545884055177cf4a6326f71f064dbbed0a4bcf90f6299ebb21242547",
      "digest": "sha256:b63e68eb472da944096425062eda7ad7e65c9a5983a53be74de5d7ea6626e487"
    },
    {
      "agentId": "agent.73bec6d8f92dc546631e028dfe3d1f26c5dc5f37ff16200a77f024652265d8dd",
      "digest": "sha256:53a863154b733ff2118aaf5e87282c064d8a5335f865f78953729c4b65a5db8c"
    },
    {
      "agentId": "agent.90b00f68efb412fccdfc402cea99f2161b7516f85a48bbabee453f4bc814288c",
      "digest": "sha256:3f96a365a04460cb754034e9f30e8ab80f8b814a163c9444003d366da9125149"
    },
    {
      "agentId": "agent.a744a1750e4790c43bf5b1e5a700ea3bdf89964af1db7e29bf23483354b928fa",
      "digest": "sha256:ef2ce676a6596499a53255163c4aa02a4c273af8696e6bce3f1a1dd87c22b3f8"
    }
  ]
}
```
