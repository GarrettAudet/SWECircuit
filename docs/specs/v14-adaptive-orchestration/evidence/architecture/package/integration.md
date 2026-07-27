# Specialist Integration Contract

Compilation: `sha256:2af08a1285008a1dacf199674fd8bc80f891c92e65b222d57fd2191873726a5a`

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
  "compilationDigest": "sha256:2af08a1285008a1dacf199674fd8bc80f891c92e65b222d57fd2191873726a5a",
  "goalId": "v14.adaptive-orchestration.architecture",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.calibrated-supply",
      "statement": "An owner-reviewed host inventory supplies calibrated capability tiers.",
      "rationale": "Core cannot establish volatile model quality from provider names."
    },
    {
      "id": "assumption.external-effects",
      "statement": "Core compiles and verifies; host adapters perform and observe native IDE effects.",
      "rationale": "This preserves the accepted V11 and V12 trust boundary."
    },
    {
      "id": "assumption.windows-first",
      "statement": "The first effectful reference adapter targets Windows Codex Desktop.",
      "rationale": "ADR 0006 limits the first release support boundary to Windows."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 4,
    "evaluatedCandidates": 15,
    "eligibleCandidates": 15,
    "retainedAlternatives": 8,
    "evaluationSetDigest": "sha256:390c590c83a8fce82f257e13ed028efa6bfcea0f560c4c44050ff614d69b379e"
  },
  "selectedCandidateId": "team.b99dfd1ff53d4e9ce9dc73381e0ea4641f00bdf736d32b566dd53c2fa3ed3df6",
  "selectedMetrics": {
    "agentCount": 4,
    "projectedMakespan": 10,
    "peakConcurrency": 4,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 169269,
    "duplicatedPermissionScopes": 25,
    "totalWorkWeight": 30,
    "totalStartupCost": 4,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "lower_metric",
    "decisiveField": "projectedMakespan",
    "selectedValue": 10,
    "serialValue": 31,
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.3b9e02460f3e4fe94b1df02bc723fb606c957f19bd483edd66c8701c6daf8ec3",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 31,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 30,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.33a6bc770db6c38d3e4caca84d87b2407f8115dc8b237686067ceaaef0a58f72",
        "agent.6fa8391587bf1e540419088fba5f4de3c3c3c39e81f2e1047fdcdc5b83c8e3bc",
        "agent.77cbd4624df552772df28ea44ecbcef421c0247e4dfcf21196b2870559246d8d",
        "agent.c36910129ffed3f72f14af4f97aecea0afff330758afa6687ac33180596630cc"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.33a6bc770db6c38d3e4caca84d87b2407f8115dc8b237686067ceaaef0a58f72",
      "digest": "sha256:b604e61746c0d9ac6cb6d6a7463565b3184f37bb0444f87ae9e9457657a5c214"
    },
    {
      "agentId": "agent.6fa8391587bf1e540419088fba5f4de3c3c3c39e81f2e1047fdcdc5b83c8e3bc",
      "digest": "sha256:74b45aea98e9d08aa636a59536b8ae130af680ee8613f6db788404740af2184e"
    },
    {
      "agentId": "agent.77cbd4624df552772df28ea44ecbcef421c0247e4dfcf21196b2870559246d8d",
      "digest": "sha256:ed9a77a6ced61a8f38f1aaef8df3c38a76200220f1319a552c93875456c30d75"
    },
    {
      "agentId": "agent.c36910129ffed3f72f14af4f97aecea0afff330758afa6687ac33180596630cc",
      "digest": "sha256:523e8c61e65c69b8236749506717e1f51f9399ce01ad63d39f8258e6a34270b0"
    }
  ]
}
```
