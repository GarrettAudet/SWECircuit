# Specialist Integration Contract

Compilation: `sha256:177a6f185b2ef092a6bab4571b4ca774d8b3d36b4f9cfd2ceb6054db7cce1619`

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
  "compilationDigest": "sha256:177a6f185b2ef092a6bab4571b4ca774d8b3d36b4f9cfd2ceb6054db7cce1619",
  "goalId": "v12.ide-run-loop.review.release-candidate-r35",
  "goalRevision": 35,
  "assumptions": [
    {
      "id": "assumption.host-boundary-external",
      "statement": "Runtime selection, execution, isolation, enforcement, hosted CI, merge, and durable persistence remain external host duties.",
      "rationale": "The package can bind demands and evidence but cannot perform external effects."
    },
    {
      "id": "assumption.predecessor-retired",
      "statement": "Checkpoint a40d0d6b636d30b3280c37fa9f5fceb2ab64baa8 is immutable failed evidence and cannot be relaunched.",
      "rationale": "The review compares its exact failure with one new aggregate-tested source identity."
    },
    {
      "id": "assumption.snapshots-authoritative",
      "statement": "Declared immutable snapshots are the only semantic review inputs.",
      "rationale": "The reviewer must not depend on mutable live source, ignored output, or chat summaries."
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
    "evaluationSetDigest": "sha256:c02bfa5d2428ef6ebbccc8e26cf4e2d099511e3a609a1c0905dd8ea4a052f3f4"
  },
  "selectedCandidateId": "team.85efd06970cee0e9655305ee040805554145a69398d2d182b835342b08eb71c0",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 47,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 46,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.85efd06970cee0e9655305ee040805554145a69398d2d182b835342b08eb71c0",
    "serialValue": "team.85efd06970cee0e9655305ee040805554145a69398d2d182b835342b08eb71c0",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.85efd06970cee0e9655305ee040805554145a69398d2d182b835342b08eb71c0",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 47,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 46,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.948197b644133c9c685ae1a996d5ce2bce7c504496b039b6220c94427ffc5f2e"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.948197b644133c9c685ae1a996d5ce2bce7c504496b039b6220c94427ffc5f2e",
      "digest": "sha256:9e1b7d21f498d1511692ff893ee2fd1af0bd40fff20695c1077594e10afe0fb1"
    }
  ]
}
```
