# Specialist Integration Contract

Compilation: `sha256:594a22bbe28ef6cc91dc1536510bad1e4a33a9e6211a4808555f3c53f35f3ea4`

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
  "compilationDigest": "sha256:594a22bbe28ef6cc91dc1536510bad1e4a33a9e6211a4808555f3c53f35f3ea4",
  "goalId": "v12.ide-run-loop.review.cache-supply-hermeticity-r23",
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
    "evaluationSetDigest": "sha256:0c2ad08dad850245bda085a67339dec7105e4c17fbd887c807042c3f8694620c"
  },
  "selectedCandidateId": "team.f8545c1d05d68e623da7a76ff3b0e7807631750d447386458dd6b75585b61399",
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
    "selectedValue": "team.f8545c1d05d68e623da7a76ff3b0e7807631750d447386458dd6b75585b61399",
    "serialValue": "team.f8545c1d05d68e623da7a76ff3b0e7807631750d447386458dd6b75585b61399",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.f8545c1d05d68e623da7a76ff3b0e7807631750d447386458dd6b75585b61399",
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
        "agent.576678a0316ba6b2a92ae4b631234843ea8c163f23422d4ea871bea8092e1157"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.576678a0316ba6b2a92ae4b631234843ea8c163f23422d4ea871bea8092e1157",
      "digest": "sha256:5a6f9f033ac9e0e0daafa77ae18009d21428eb349e63dbac5debf6fc4beaebf2"
    }
  ]
}
```
