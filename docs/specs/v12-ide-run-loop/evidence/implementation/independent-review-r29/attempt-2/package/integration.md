# Specialist Integration Contract

Compilation: `sha256:d2e25fd584a7319fe89af77ae47ab836cb9b6998c7aa2508ce3f960176a4b271`

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
  "compilationDigest": "sha256:d2e25fd584a7319fe89af77ae47ab836cb9b6998c7aa2508ce3f960176a4b271",
  "goalId": "v12.ide-run-loop.review.copied-typescript-execution-correction-r29-attempt2",
  "goalRevision": 2,
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
    "evaluationSetDigest": "sha256:6d2ffd7eb1bc654d7dcf2567922119322ed8c3873b0809d3ee76cded878ae085"
  },
  "selectedCandidateId": "team.2f09615b09df5105111f1e4f44469ba53fa036c9dc56c821ce8163ac5b0e4fdb",
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
    "selectedValue": "team.2f09615b09df5105111f1e4f44469ba53fa036c9dc56c821ce8163ac5b0e4fdb",
    "serialValue": "team.2f09615b09df5105111f1e4f44469ba53fa036c9dc56c821ce8163ac5b0e4fdb",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.2f09615b09df5105111f1e4f44469ba53fa036c9dc56c821ce8163ac5b0e4fdb",
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
        "agent.52af9aa982525b256b5c9819861f33d76f13536243eaf8bb382434763277e2ba"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.52af9aa982525b256b5c9819861f33d76f13536243eaf8bb382434763277e2ba",
      "digest": "sha256:e538dc9d0380b285648ac481938812c1463f497b7504548b5b8988c5c5f8e7f7"
    }
  ]
}
```
