# Specialist Integration Contract

Compilation: `sha256:c82adbc88591fc68de85e0258935dcbd5b4044b55bff88e422fd65a1811512be`

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
  "compilationDigest": "sha256:c82adbc88591fc68de85e0258935dcbd5b4044b55bff88e422fd65a1811512be",
  "goalId": "v12.ide-run-loop.review.copied-typescript-execution-correction-r29",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.host-boundary-external",
      "statement": "Process isolation, runtime supply, and actor authentication remain host duties.",
      "rationale": "Repository code authenticates declared files but cannot enforce the external host."
    },
    {
      "id": "assumption.release-owner-controlled",
      "statement": "Candidate 13 freeze, one-shot gate, R2, hosted CI, and merge remain owner work.",
      "rationale": "This specialist returns one bounded semantic verdict only."
    },
    {
      "id": "assumption.snapshots-authoritative",
      "statement": "Declared immutable snapshots are the only semantic review inputs.",
      "rationale": "The reviewer must not depend on mutable live source, ignored build output, or chat summaries."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 1,
    "evaluatedCandidates": 1,
    "eligibleCandidates": 1,
    "retainedAlternatives": 0,
    "evaluationSetDigest": "sha256:eaedea1391158ea3ca2a9afe9f663e78362dfb660e7815124bf3fd77a103d727"
  },
  "selectedCandidateId": "team.4fe640c2b22340ab63ca96eab86f77d90342307a164ca4a403069f0fceb30b18",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 22,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 21,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.4fe640c2b22340ab63ca96eab86f77d90342307a164ca4a403069f0fceb30b18",
    "serialValue": "team.4fe640c2b22340ab63ca96eab86f77d90342307a164ca4a403069f0fceb30b18",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.4fe640c2b22340ab63ca96eab86f77d90342307a164ca4a403069f0fceb30b18",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 22,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 21,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.1af2a5d347fe3303174727dfdb41a35e4ce8e311bdf0b1ca0bb6078215fe9e45"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.1af2a5d347fe3303174727dfdb41a35e4ce8e311bdf0b1ca0bb6078215fe9e45",
      "digest": "sha256:6e5125cedb575d3cc924f938a75b802575b40eec928c54c4f7555f4aed0b4adf"
    }
  ]
}
```
