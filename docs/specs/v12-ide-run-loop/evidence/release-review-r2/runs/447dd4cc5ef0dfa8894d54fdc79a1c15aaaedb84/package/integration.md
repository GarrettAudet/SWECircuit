# Specialist Integration Contract

Compilation: `sha256:be40c9ff219b8f544bb51cb44d2a0151c93334fcda056fb4026dd9f49b4e487b`

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
  "compilationDigest": "sha256:be40c9ff219b8f544bb51cb44d2a0151c93334fcda056fb4026dd9f49b4e487b",
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
      "statement": "Every tracked reviewer source is byte-identical to candidate 447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84 and is reviewed only through its immutable R2 snapshot.",
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
    "evaluationSetDigest": "sha256:5da956212b4e4ed32aed9b9572b1d272c0f4f1e7f27ff9e5cd3664579f571ae0"
  },
  "selectedCandidateId": "team.6c5b99128b2659b65498546ea6673dfa7069228e1dc9c92815d71f29f4a7de55",
  "selectedMetrics": {
    "agentCount": 3,
    "projectedMakespan": 9,
    "peakConcurrency": 3,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 8636931,
    "duplicatedPermissionScopes": 281,
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
      "digest": "sha256:ba3a4fa63f660b87e5c6c092b365785e54cb9452a26d0b3d30c14f55968c1a43"
    },
    {
      "agentId": "agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627",
      "digest": "sha256:66d6c6f91e24a28ceecffa65a3afd79a1f594fa8cbdbbe89018a73d393f0a70b"
    },
    {
      "agentId": "agent.ecc4e48122daf47ceda2158ba1125b18174c331dddab51ab4bde4964718c2e87",
      "digest": "sha256:5a10fee68b9147b9a7c2f8c7489b66c9ea82e9840a5116d45e691669c03225b5"
    }
  ]
}
```
