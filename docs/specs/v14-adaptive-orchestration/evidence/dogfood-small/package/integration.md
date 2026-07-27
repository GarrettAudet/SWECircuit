# Specialist Integration Contract

Compilation: `sha256:f4f4e91fc1fc8ea2b4cf52256395fa4e15b109cc5ebd4f8bc690c408c4b5eb7e`

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
  "compilationDigest": "sha256:f4f4e91fc1fc8ea2b4cf52256395fa4e15b109cc5ebd4f8bc690c408c4b5eb7e",
  "goalId": "v14.dogfood.release-board",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.integration-owner",
      "statement": "The main IDE agent owns event wiring, final verification, browser inspection, and review routing after both roots pass.",
      "rationale": "The two roots have disjoint writes and the small goal does not justify another implementation specialist."
    },
    {
      "id": "assumption.product-choice",
      "statement": "Release Board is the low-risk small application chosen to validate the V14 orchestration alpha.",
      "rationale": "The owner requested a small application dogfood but did not prescribe a product."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 2,
    "evaluatedCandidates": 2,
    "eligibleCandidates": 2,
    "retainedAlternatives": 1,
    "evaluationSetDigest": "sha256:aa8a46ec3f147fcc373dc969d9933cdea51768d641c934925205284a782f4d44"
  },
  "selectedCandidateId": "team.c773f72cc9ded5b29f24db957e26f65e4f24ed5c56ec9c24e1ee89f7d5c6c13a",
  "selectedMetrics": {
    "agentCount": 2,
    "projectedMakespan": 7,
    "peakConcurrency": 2,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 20742,
    "duplicatedPermissionScopes": 3,
    "totalWorkWeight": 11,
    "totalStartupCost": 2,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "lower_metric",
    "decisiveField": "projectedMakespan",
    "selectedValue": 7,
    "serialValue": 12,
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.9b0ef6211dc14d9f95126f70e5ca9c35029589f697a3dae1cbe883b5ad46e97c",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 12,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 11,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.712f06d08aac6fc693f821f2da168519dc1cd9a9634ebfa71a0982a90fef7228",
        "agent.d63c2e4b6b5fdb8e38be291aa333911568baf0153af172581562c967a0bd2063"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.712f06d08aac6fc693f821f2da168519dc1cd9a9634ebfa71a0982a90fef7228",
      "digest": "sha256:c7651a7bae7183610fe411cb06dfc24c0c0e91edbb6fe9da553bb55f08d3bf76"
    },
    {
      "agentId": "agent.d63c2e4b6b5fdb8e38be291aa333911568baf0153af172581562c967a0bd2063",
      "digest": "sha256:c059ddece9a7b8b583f21b0b54c2a12a93d26a36225533f98c738fd5d6fb24e6"
    }
  ]
}
```
