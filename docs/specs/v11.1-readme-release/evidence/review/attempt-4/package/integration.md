# Specialist Integration Contract

Compilation: `sha256:d835edb8382a904d54012caa0641193007b8b46ba79960ba21640ee7a2e0f086`

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
  "compilationDigest": "sha256:d835edb8382a904d54012caa0641193007b8b46ba79960ba21640ee7a2e0f086",
  "goalId": "v11.1.readme-release-review",
  "goalRevision": 4,
  "assumptions": [],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 2,
    "evaluatedCandidates": 2,
    "eligibleCandidates": 2,
    "retainedAlternatives": 1,
    "evaluationSetDigest": "sha256:aeae09c58b3e3aa6b5f53e39f3a82cdefd34aac5e0d45de65e98069222d1393b"
  },
  "selectedCandidateId": "team.2077ab2a9679e183beebc81946f8640a8f31a8fa2ce3613775c5729d54195571",
  "selectedMetrics": {
    "agentCount": 2,
    "projectedMakespan": 6,
    "peakConcurrency": 2,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 2897,
    "duplicatedPermissionScopes": 1,
    "totalWorkWeight": 9,
    "totalStartupCost": 2,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "lower_metric",
    "decisiveField": "projectedMakespan",
    "selectedValue": 6,
    "serialValue": 10,
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.5191d0bc7ed7c0332f151f3819ab721e8b51790395a328680390ca4ce366eb91",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 10,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 9,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.4a46f9924c1597feda7441bbb503b7c8445330fedf0bab277cd9784397d09437",
        "agent.6a94d5401d38c780124bfeaba9f9b4f2096eb15f921cbad595ce13f030788c5d"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.4a46f9924c1597feda7441bbb503b7c8445330fedf0bab277cd9784397d09437",
      "digest": "sha256:00d98d44347afa82dcc7cb97e618a4dfeb75b8dd7fdf7757d48e6c93367de16d"
    },
    {
      "agentId": "agent.6a94d5401d38c780124bfeaba9f9b4f2096eb15f921cbad595ce13f030788c5d",
      "digest": "sha256:2e0ccd6146121b1ccdb8b5b2d618750e747f07df4d0a368f20adfd57c7eb7d20"
    }
  ]
}
```
