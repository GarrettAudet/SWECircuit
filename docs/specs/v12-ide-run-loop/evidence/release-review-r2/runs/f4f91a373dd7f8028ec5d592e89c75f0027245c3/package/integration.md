# Specialist Integration Contract

Compilation: `sha256:289348ac15dc05d3c7920c7f2118190094fd7bbdf103deb3c229c68f2ebbc37c`

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
  "compilationDigest": "sha256:289348ac15dc05d3c7920c7f2118190094fd7bbdf103deb3c229c68f2ebbc37c",
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
      "statement": "Every tracked reviewer source is byte-identical to candidate f4f91a373dd7f8028ec5d592e89c75f0027245c3 and is reviewed only through its immutable R2 snapshot.",
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
    "evaluationSetDigest": "sha256:05856c48e8eb381dfe8169b8bfb00b378c4beea803ffcf83c0f9a3b8f544c1c9"
  },
  "selectedCandidateId": "team.6c5b99128b2659b65498546ea6673dfa7069228e1dc9c92815d71f29f4a7de55",
  "selectedMetrics": {
    "agentCount": 3,
    "projectedMakespan": 9,
    "peakConcurrency": 3,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 8909260,
    "duplicatedPermissionScopes": 295,
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
      "digest": "sha256:d8b0588de3509fc6e7d8efcc899a6d8780054ae3dd5cb8d04930788ece1854ea"
    },
    {
      "agentId": "agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627",
      "digest": "sha256:7758409ade5831bd0a8613d33d6356872011f72b5e5676c46789e435badca773"
    },
    {
      "agentId": "agent.ecc4e48122daf47ceda2158ba1125b18174c331dddab51ab4bde4964718c2e87",
      "digest": "sha256:957bf0322f6b2f5222f70b416f81dc01c2d27a7286c52cf45febedf36785154e"
    }
  ]
}
```
