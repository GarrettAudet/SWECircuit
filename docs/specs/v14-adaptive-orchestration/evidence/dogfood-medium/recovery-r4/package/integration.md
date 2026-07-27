# Specialist Integration Contract

Compilation: `sha256:95b42f6d89a7e882d917d8e15c00aef13cd8246b652647be5a6983ffea470494`

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
  "compilationDigest": "sha256:95b42f6d89a7e882d917d8e15c00aef13cd8246b652647be5a6983ffea470494",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 4,
  "assumptions": [],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 1,
    "evaluatedCandidates": 1,
    "eligibleCandidates": 1,
    "retainedAlternatives": 0,
    "evaluationSetDigest": "sha256:a41b69b3bb17adaa9bb6c0f164bc1039868a98d0077a690a9d041fd4db9d8408"
  },
  "selectedCandidateId": "team.925acbb1de6b014f4dca19b61305f2161591d3f263127b98412f3293e6340e88",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 3,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 2,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.925acbb1de6b014f4dca19b61305f2161591d3f263127b98412f3293e6340e88",
    "serialValue": "team.925acbb1de6b014f4dca19b61305f2161591d3f263127b98412f3293e6340e88",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.925acbb1de6b014f4dca19b61305f2161591d3f263127b98412f3293e6340e88",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 3,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 2,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.6ade2b5b3ca26785a1fc3eafb7ac86503669e018976b9555528aee6489341136"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.6ade2b5b3ca26785a1fc3eafb7ac86503669e018976b9555528aee6489341136",
      "digest": "sha256:356e0a4052827f82c89d2f34c4fda8d97036bdb1ce603a515b4d4a5715c1aaba"
    }
  ]
}
```
