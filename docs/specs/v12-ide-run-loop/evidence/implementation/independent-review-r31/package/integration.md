# Specialist Integration Contract

Compilation: `sha256:9c65708c068cae09daae6e16b058f999989f423ba15327304f0eb7433f4d23fa`

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
  "compilationDigest": "sha256:9c65708c068cae09daae6e16b058f999989f423ba15327304f0eb7433f4d23fa",
  "goalId": "v12.ide-run-loop.review.release-harness-correction-r31",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.host-boundary-external",
      "statement": "Runtime supply, isolation, enforcement, actor authentication, hosted CI, and merge remain external host duties.",
      "rationale": "The provider-neutral package can bind demands and evidence but cannot perform host effects."
    },
    {
      "id": "assumption.predecessor-retired",
      "statement": "Checkpoint 74397e30be5d185a14ecef1a838aa7767ffdf60f is immutable failed evidence and cannot be relaunched.",
      "rationale": "The review compares its exact failure with a new aggregate-tested correction lineage only."
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
    "evaluationSetDigest": "sha256:7cb0950abf525d55d4b906232d4f94abb00b0c63ef2adb3d090b733d755f7800"
  },
  "selectedCandidateId": "team.8e66a12c0d5ee3385a7c17fae6a3b15e1089c2e1a07feac0bc265d71d8e6c075",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 35,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 34,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.8e66a12c0d5ee3385a7c17fae6a3b15e1089c2e1a07feac0bc265d71d8e6c075",
    "serialValue": "team.8e66a12c0d5ee3385a7c17fae6a3b15e1089c2e1a07feac0bc265d71d8e6c075",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.8e66a12c0d5ee3385a7c17fae6a3b15e1089c2e1a07feac0bc265d71d8e6c075",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 35,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 34,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.35a191fc146b32387289383bbaf06d1c1094058edd3556b1b4dc1f01fd43c275"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.35a191fc146b32387289383bbaf06d1c1094058edd3556b1b4dc1f01fd43c275",
      "digest": "sha256:74909dec146248654bec4c554afe3e270501650bc1e9d4d046dfba13a09fd2bb"
    }
  ]
}
```
