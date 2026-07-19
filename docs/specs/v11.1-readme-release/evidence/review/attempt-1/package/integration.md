# Specialist Integration Contract

Compilation: `sha256:834690f6c366371e2bd450d121d27be4f82964d98ee84e39b6e82da70c3ad511`

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
  "compilationDigest": "sha256:834690f6c366371e2bd450d121d27be4f82964d98ee84e39b6e82da70c3ad511",
  "goalId": "v11.1.readme-release-review",
  "goalRevision": 1,
  "assumptions": [],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 2,
    "evaluatedCandidates": 2,
    "eligibleCandidates": 2,
    "retainedAlternatives": 1,
    "evaluationSetDigest": "sha256:51b8767a0a37c30951511f7208338fee078ebb06e1d6b7f1f8d3b65e686d49f3"
  },
  "selectedCandidateId": "team.2077ab2a9679e183beebc81946f8640a8f31a8fa2ce3613775c5729d54195571",
  "selectedMetrics": {
    "agentCount": 2,
    "projectedMakespan": 6,
    "peakConcurrency": 2,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 2591,
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
      "digest": "sha256:1173e7e8858d669c20b7d4a1a29dc30b85e9d60e7d95822232ced16ade755249"
    },
    {
      "agentId": "agent.6a94d5401d38c780124bfeaba9f9b4f2096eb15f921cbad595ce13f030788c5d",
      "digest": "sha256:9094d24d34ec1ba3774388bee3f474935c6dac58f42f6ad9b2a88b77009eb048"
    }
  ]
}
```
