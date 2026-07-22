# Specialist Integration Contract

Compilation: `sha256:ee3d26e46871a93bc8b76361ccedc8f61513b80b9c42f8b2f6b4ef737a4f55a6`

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
  "compilationDigest": "sha256:ee3d26e46871a93bc8b76361ccedc8f61513b80b9c42f8b2f6b4ef737a4f55a6",
  "goalId": "v12.ide-run-loop.review.cache-supply-hermeticity-r24",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption-release-owner-controlled",
      "statement": "Pre-freeze verification, V11 refresh, candidate gate, R2, hosted CI, and merge remain integration-owner work.",
      "rationale": "This reviewer provides a bounded semantic verdict only."
    },
    {
      "id": "assumption.host-boundary-external",
      "statement": "External host cache provenance and process isolation remain host duties.",
      "rationale": "Repository code validates supplied boundaries but cannot enforce the host runtime."
    },
    {
      "id": "assumption.snapshots-authoritative",
      "statement": "Declared immutable snapshots are the only semantic review inputs.",
      "rationale": "The reviewer must not depend on mutable live source or ignored runtime state."
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
    "evaluationSetDigest": "sha256:4492a722c0f260ee66df61891f32d7dae079538a1a7526748dc65c19bd3d92ff"
  },
  "selectedCandidateId": "team.7479c6334e23c48ea3208efdb83c6eaa66650fa20954367406398952fac15ddf",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 14,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 13,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.7479c6334e23c48ea3208efdb83c6eaa66650fa20954367406398952fac15ddf",
    "serialValue": "team.7479c6334e23c48ea3208efdb83c6eaa66650fa20954367406398952fac15ddf",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.7479c6334e23c48ea3208efdb83c6eaa66650fa20954367406398952fac15ddf",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 14,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 13,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.eb36feda6d3f7bacc6cf6eba6903d4906b334c22662b62e9b98d073967ef9709"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.eb36feda6d3f7bacc6cf6eba6903d4906b334c22662b62e9b98d073967ef9709",
      "digest": "sha256:417eb7c852b8a24a74a0d62b7df9be5349f6a7853ed11a7ba346ab46aa48976a"
    }
  ]
}
```
