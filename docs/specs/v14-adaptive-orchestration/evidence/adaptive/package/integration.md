# Specialist Integration Contract

Compilation: `sha256:05bd6bb76d8c7d0f9a3df274a7294ac3615026cb211f76bd24a21d45f6b4d3c8`

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
  "compilationDigest": "sha256:05bd6bb76d8c7d0f9a3df274a7294ac3615026cb211f76bd24a21d45f6b4d3c8",
  "goalId": "v14.adaptive-orchestration.adaptive-wave",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.additive",
      "statement": "Adaptive APIs remain additive to the released V11 and V12 public behavior.",
      "rationale": "V14 must preserve existing compilation and immutable session contracts."
    },
    {
      "id": "assumption.successor-review",
      "statement": "This package produces disjoint implementation and test artifacts; executable integration verification and independent review use a successor package over the assembled commit.",
      "rationale": "A parallel test author cannot truthfully certify implementation bytes that do not exist at launch."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 3,
    "evaluatedCandidates": 5,
    "eligibleCandidates": 5,
    "retainedAlternatives": 4,
    "evaluationSetDigest": "sha256:54fb382ced5ce8ef5ce402f0ce273ddc4e646cc4738d33dfe0282b5a056abc07"
  },
  "selectedCandidateId": "team.cbe7b6efbbd0a2b36f01330f4b4b258f8b15faf9392f8107f593560756afb4c6",
  "selectedMetrics": {
    "agentCount": 3,
    "projectedMakespan": 13,
    "peakConcurrency": 3,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 305374,
    "duplicatedPermissionScopes": 29,
    "totalWorkWeight": 27,
    "totalStartupCost": 3,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "lower_metric",
    "decisiveField": "projectedMakespan",
    "selectedValue": 13,
    "serialValue": 28,
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.40739c4d62f431e2fbb2c85cf5091857712e132194275d0fe82c92057bdd1b9d",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 28,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 27,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.95953cd44c0575970b3b29064d34f109e06d3d164888386446d532ba2a4201db",
        "agent.c4f622940194362296821ae5839d1de09edb0b694ad4d97773f7e20cb6e053d4",
        "agent.c9de80c185381c0faa0ce5c442028eb1f88aba92ec6aaae0e5abbbe926e02467"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.95953cd44c0575970b3b29064d34f109e06d3d164888386446d532ba2a4201db",
      "digest": "sha256:52e29224d7cc8d3fc96400a7503e36c980a14056a38edc8c705393ada2903138"
    },
    {
      "agentId": "agent.c4f622940194362296821ae5839d1de09edb0b694ad4d97773f7e20cb6e053d4",
      "digest": "sha256:22401a0cc61861fa504b90e6fe1df1d1377255811f2c2267d9cd6536ecb79f21"
    },
    {
      "agentId": "agent.c9de80c185381c0faa0ce5c442028eb1f88aba92ec6aaae0e5abbbe926e02467",
      "digest": "sha256:aa14fe5aa8df0e90e4c124bd44e9fb1b89655a3d285f6af624930be18d6e3be8"
    }
  ]
}
```
