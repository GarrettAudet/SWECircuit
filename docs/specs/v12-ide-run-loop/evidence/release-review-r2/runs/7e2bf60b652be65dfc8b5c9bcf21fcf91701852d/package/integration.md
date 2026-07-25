# Specialist Integration Contract

Compilation: `sha256:b95b58cac6c313cc268fbf706014a14b33aefc81f5aad4315123cc62c8ecda07`

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
  "compilationDigest": "sha256:b95b58cac6c313cc268fbf706014a14b33aefc81f5aad4315123cc62c8ecda07",
  "goalId": "v12.ide-run-loop.release-review-r2",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.canonical-gate-primary-evidence",
      "statement": "The canonical gate passed from an authenticated materialization and disposable Git context for the exact committed candidate tree; immutable copies of its raw stdout, raw stderr, and closed receipt are direct reviewer sources.",
      "rationale": "The release-gate wrapper binds the candidate source and disposable Git identity, then the review harness captures the necessarily post-commit outputs outside the candidate and binds both their original and immutable snapshot paths to exact bytes."
    },
    {
      "id": "assumption.exact-candidate-snapshots",
      "statement": "Every tracked reviewer source is byte-identical to candidate 7e2bf60b652be65dfc8b5c9bcf21fcf91701852d and is reviewed only through its immutable R2 snapshot.",
      "rationale": "The harness authenticates each Git blob, writes snapshots once, and rechecks every snapshot before compilation and approval."
    },
    {
      "id": "assumption.external-host-boundary",
      "statement": "V12 core creates, restores, inspects, and records immutable evidence sessions but does not launch, persist, schedule, integrate, merge, or mutate memory.",
      "rationale": "The review judges the provider-neutral reducer, while all host effects remain external."
    },
    {
      "id": "assumption.external-producer",
      "statement": "The correction producer and integration owner are external to these three read-only review work units.",
      "rationale": "Immutable candidate snapshots, approved correction handoffs, and direct primary evidence form the producer boundary."
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
    "evaluationSetDigest": "sha256:3e6ac6e7a45dc4f62f907016be5a4b6e9d8b364fd1da4544690714721c8e583a"
  },
  "selectedCandidateId": "team.6c5b99128b2659b65498546ea6673dfa7069228e1dc9c92815d71f29f4a7de55",
  "selectedMetrics": {
    "agentCount": 3,
    "projectedMakespan": 9,
    "peakConcurrency": 3,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 11360697,
    "duplicatedPermissionScopes": 376,
    "totalWorkWeight": 24,
    "totalStartupCost": 3,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "lower_metric",
    "decisiveField": "projectedMakespan",
    "selectedValue": 9,
    "serialValue": 25,
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.e9ea865b6ee0007695c689f1ea0fc737125a1a673b338fe9bcd6f6b9406660e7",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 25,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 24,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.1e522d86b809d360e459b4afd630c2311033a972b455c615c7eca8bf09b3942d",
        "agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627",
        "agent.ecc4e48122daf47ceda2158ba1125b18174c331dddab51ab4bde4964718c2e87"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.1e522d86b809d360e459b4afd630c2311033a972b455c615c7eca8bf09b3942d",
      "digest": "sha256:2c306f71cd3a82ec7d130e12c2cc0e2f105f4f1bd67c3069a955c2dad345dd52"
    },
    {
      "agentId": "agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627",
      "digest": "sha256:f77178b3dbef6b8d7dc1fcd1d61a4d165b141486d6a4737cb73af9d635033f16"
    },
    {
      "agentId": "agent.ecc4e48122daf47ceda2158ba1125b18174c331dddab51ab4bde4964718c2e87",
      "digest": "sha256:b65ecab39de9500ac5f215dc49b26789cd15f49c539c17b7e7df7a8b49ed6c25"
    }
  ]
}
```
