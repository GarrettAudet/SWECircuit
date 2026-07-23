# Specialist Integration Contract

Compilation: `sha256:6c671af037cabfdf9e97da3e97d141a67134e0a73e35d3b733ddd0c49c78a66b`

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
  "compilationDigest": "sha256:6c671af037cabfdf9e97da3e97d141a67134e0a73e35d3b733ddd0c49c78a66b",
  "goalId": "v12.ide-run-loop.review.release-candidate-r38",
  "goalRevision": 38,
  "assumptions": [
    {
      "id": "assumption.host-boundary-external",
      "statement": "Runtime selection, execution, isolation, enforcement, hosted CI, merge, and durable persistence remain external host duties.",
      "rationale": "The package can bind demands and evidence but cannot perform external effects."
    },
    {
      "id": "assumption.predecessor-retired",
      "statement": "Checkpoint 148f546cba4c3c9ceecd2bbca07d47fe94878afa is immutable failed evidence and cannot be relaunched.",
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
    "evaluationSetDigest": "sha256:87f61c21cf0282a8aa699e0b65d8f02bb19cd6eca4a666764fe0065b2520c62e"
  },
  "selectedCandidateId": "team.68b7fb04ba1fab8cb03735c22e464da5b35810ef9886123edcd6e6e4184a9a84",
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
    "selectedValue": "team.68b7fb04ba1fab8cb03735c22e464da5b35810ef9886123edcd6e6e4184a9a84",
    "serialValue": "team.68b7fb04ba1fab8cb03735c22e464da5b35810ef9886123edcd6e6e4184a9a84",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.68b7fb04ba1fab8cb03735c22e464da5b35810ef9886123edcd6e6e4184a9a84",
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
        "agent.61a70f9db00f0cd7fba4602c9d45ca5f5cde0b6d3f82542a360f1610ceab7186"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.61a70f9db00f0cd7fba4602c9d45ca5f5cde0b6d3f82542a360f1610ceab7186",
      "digest": "sha256:c7785a9f27a55df61dd08c72f742cefd941c25766196301d3cb9c0d33113dc54"
    }
  ]
}
```
