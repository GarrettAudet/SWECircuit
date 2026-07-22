# Specialist Integration Contract

Compilation: `sha256:6f301893b1a620d9699d853e33e0e1c0716416caf87652c408d0d7766e43156d`

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
  "compilationDigest": "sha256:6f301893b1a620d9699d853e33e0e1c0716416caf87652c408d0d7766e43156d",
  "goalId": "v12.ide-run-loop.review.git-environment-hermeticity-r25",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.host-boundary-external",
      "statement": "Process isolation and actor authentication remain host duties.",
      "rationale": "Repository code closes inherited process inputs but does not enforce the host."
    },
    {
      "id": "assumption.release-owner-controlled",
      "statement": "Pre-freeze gates, successor freeze, R2, CI, and merge remain owner work.",
      "rationale": "This specialist returns one bounded semantic verdict only."
    },
    {
      "id": "assumption.snapshots-authoritative",
      "statement": "Declared immutable snapshots are the only semantic review inputs.",
      "rationale": "The reviewer must not depend on mutable live source or ignored state."
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
    "evaluationSetDigest": "sha256:6a82e0cef253c612c0fe0976d69daaa8a613155399cfaf4e5a20eff894ac1a40"
  },
  "selectedCandidateId": "team.06156f684891a1c3861e5043d7ed8967e72dd1ae5a0a151eb0cbd327ff546eb3",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 16,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 15,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.06156f684891a1c3861e5043d7ed8967e72dd1ae5a0a151eb0cbd327ff546eb3",
    "serialValue": "team.06156f684891a1c3861e5043d7ed8967e72dd1ae5a0a151eb0cbd327ff546eb3",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.06156f684891a1c3861e5043d7ed8967e72dd1ae5a0a151eb0cbd327ff546eb3",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 16,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 15,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.b583878d52475a8addd39e88d84a72bd91141462a8c243b0596817c8343a25d5"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.b583878d52475a8addd39e88d84a72bd91141462a8c243b0596817c8343a25d5",
      "digest": "sha256:895e3f5b182dc649937a7c8ff40ad2230c413273c3cf20fec36463182bb32cdb"
    }
  ]
}
```
