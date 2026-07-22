# Specialist Integration Contract

Compilation: `sha256:8af9bdab4b384419310def12a09c0ebea455e86607ebee5274312709f5e7d5ac`

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
  "compilationDigest": "sha256:8af9bdab4b384419310def12a09c0ebea455e86607ebee5274312709f5e7d5ac",
  "goalId": "v12.ide-run-loop.review.authenticated-typescript-release-correction-r27",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.host-boundary-external",
      "statement": "Process isolation, runtime supply, and actor authentication remain host duties.",
      "rationale": "Repository code authenticates declared files but cannot enforce the external host."
    },
    {
      "id": "assumption.release-owner-controlled",
      "statement": "Successor freeze, one-shot candidate gate, R2, hosted CI, and merge remain owner work.",
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
    "evaluationSetDigest": "sha256:d11acf86f04823db55340487d2e83c2c3e579155ad6b85751731625d89aa5170"
  },
  "selectedCandidateId": "team.72270f55194b979783747beceb85501b145c1246df2582dbeee19befc6cf76f7",
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
    "selectedValue": "team.72270f55194b979783747beceb85501b145c1246df2582dbeee19befc6cf76f7",
    "serialValue": "team.72270f55194b979783747beceb85501b145c1246df2582dbeee19befc6cf76f7",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.72270f55194b979783747beceb85501b145c1246df2582dbeee19befc6cf76f7",
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
        "agent.891676aa1baff1a9af2122a78d92f30aa47d5d9fec2f470a53f2e076f43a1a98"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.891676aa1baff1a9af2122a78d92f30aa47d5d9fec2f470a53f2e076f43a1a98",
      "digest": "sha256:e785c65f70036af6eb852d1cff2c1758f8bf9e80aa5e01a042cc9f38bf011279"
    }
  ]
}
```
