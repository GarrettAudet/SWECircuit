# Specialist Integration Contract

Compilation: `sha256:eb3e7fd1341c45966f95a9a440685193b24206f9155de50e96aa4596e0b41998`

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
  "compilationDigest": "sha256:eb3e7fd1341c45966f95a9a440685193b24206f9155de50e96aa4596e0b41998",
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
      "statement": "Every tracked reviewer source is byte-identical to candidate 606fc3585f19f4714e0e75c2387561ca03b8282c and is reviewed only through its immutable R2 snapshot.",
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
    "evaluationSetDigest": "sha256:563a75889cb8f1b9bb4a4b276d8c48afd42626b8e13c1a683b4f5dd0dfdb3d69"
  },
  "selectedCandidateId": "team.6c5b99128b2659b65498546ea6673dfa7069228e1dc9c92815d71f29f4a7de55",
  "selectedMetrics": {
    "agentCount": 3,
    "projectedMakespan": 9,
    "peakConcurrency": 3,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 11408174,
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
      "digest": "sha256:52a49774429ef164d4fc15f354957cd14b99e9560cd051998ffc614218d551d2"
    },
    {
      "agentId": "agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627",
      "digest": "sha256:35d1d57e016483e114a474f438c2267ea887d543af964f6adbdb10e879afe1c2"
    },
    {
      "agentId": "agent.ecc4e48122daf47ceda2158ba1125b18174c331dddab51ab4bde4964718c2e87",
      "digest": "sha256:1ed57420b295ffbf21cfe693a515624e39ab1e7dde31a55fbcb1ec5107fb526a"
    }
  ]
}
```
