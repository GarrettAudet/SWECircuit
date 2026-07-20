# Specialist Integration Contract

Compilation: `sha256:8dc8a4592e36ccc04d9873440ce9def42831ebd74d7615c1823ed7d199fae565`

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
  "compilationDigest": "sha256:8dc8a4592e36ccc04d9873440ce9def42831ebd74d7615c1823ed7d199fae565",
  "goalId": "v12.ide-run-loop.release-review-r2",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.canonical-gate-primary-evidence",
      "statement": "The canonical gate passed for the exact clean candidate and its raw stdout, raw stderr, and closed receipt are direct reviewer sources.",
      "rationale": "The release-gate wrapper binds exact output bytes, command, exit status, pre/post HEAD, and tracked cleanliness without a timestamp or summary-only claim."
    },
    {
      "id": "assumption.exact-candidate-snapshots",
      "statement": "Every tracked reviewer source is byte-identical to candidate 4ad12367cc0b36ea460ceabc48e5a41ca662e3df and is reviewed only through its immutable R2 snapshot.",
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
    "evaluationSetDigest": "sha256:1dda8152c8bcf45ee68dd379fbcf52dc31fac5605891a94eac6692b77e76bee3"
  },
  "selectedCandidateId": "team.6c5b99128b2659b65498546ea6673dfa7069228e1dc9c92815d71f29f4a7de55",
  "selectedMetrics": {
    "agentCount": 3,
    "projectedMakespan": 9,
    "peakConcurrency": 3,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 8098520,
    "duplicatedPermissionScopes": 319,
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
      "digest": "sha256:865db0959f23e60ba223b02f10edfa773c5f4a93371ee6cc3d54abbb9f9f82fc"
    },
    {
      "agentId": "agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627",
      "digest": "sha256:0f3dcfa0b403f5426a8f46ce673c73a2cebd241e2c562e8b08a4fadfd1ba312e"
    },
    {
      "agentId": "agent.ecc4e48122daf47ceda2158ba1125b18174c331dddab51ab4bde4964718c2e87",
      "digest": "sha256:8dbc9b9d3dfe4d4984351c5685e7a316fb9300c988b06a4bbd034e771a228590"
    }
  ]
}
```
