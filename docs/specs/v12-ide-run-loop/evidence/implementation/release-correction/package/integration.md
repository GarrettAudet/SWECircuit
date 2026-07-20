# Specialist Integration Contract

Compilation: `sha256:45fa97ffb1fdb7f95ae33203e9f727c0f66c27a1b2fa344f06a9569b165ae4c2`

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
  "compilationDigest": "sha256:45fa97ffb1fdb7f95ae33203e9f727c0f66c27a1b2fa344f06a9569b165ae4c2",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.architecture-frozen",
      "statement": "ADR 0005 and the Specialist Run contract are the complete implementation authority.",
      "rationale": "Architecture fan-in passed and no blocking decision remains."
    },
    {
      "id": "assumption.host-edit-fallback",
      "statement": "After native apply_patch fails before mutation, the host may perform an exact precondition-hash-guarded PowerShell write inside the approved scope.",
      "rationale": "Foundation Revision 1 proved the temporary worktree patch helper is unavailable while bounded escalated PowerShell writes remain auditable and fail closed."
    },
    {
      "id": "assumption.host-effects-external",
      "statement": "All runtime, persistence, Git, merge, and memory effects remain external to core.",
      "rationale": "V12 is a pure evidence session, not the deferred universal scheduler."
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
    "evaluationSetDigest": "sha256:04d4a20518d7417e4c650f9d2ede238b1b990837ae012b482449c73b628437bc"
  },
  "selectedCandidateId": "team.7f129b68e86f4588829f626a4ea14d4f204f16eee03d3a060c389b6433c475ed",
  "selectedMetrics": {
    "agentCount": 4,
    "projectedMakespan": 18,
    "peakConcurrency": 3,
    "conflictPairs": 2,
    "handoffCount": 0,
    "duplicatedContextBytes": 369643,
    "duplicatedPermissionScopes": 47,
    "totalWorkWeight": 28,
    "totalStartupCost": 4,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "lower_metric",
    "decisiveField": "projectedMakespan",
    "selectedValue": 18,
    "serialValue": 29,
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.cb7ba28cc5bb5676e5bcfda4a878f9ccacf7cb589cb0cb091d2e79cd0f4132a3",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 29,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 28,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664",
        "agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50",
        "agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666"
      ]
    },
    {
      "start": 9,
      "agentIds": [
        "agent.b73ee06f2af37577c9726f116f1c4741a7012982796300e06e11bb243e93eefe"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.072719a6c18f37975076f10e2c80244ac9d749f6f8d7a0545957d0fe68f20664",
      "digest": "sha256:a1bd224f72e44059217e2df9379f2201b348d52cb7cf6dc5796e85e08db3aef6"
    },
    {
      "agentId": "agent.454a957a304f11a629d1b8ce92a698e5e6d7ede7cf992880a458c6fd9e458e50",
      "digest": "sha256:64b807f9361e6955ad8c366f86882f101dc9be0fcabfe2b8c9fd0a20f5812af1"
    },
    {
      "agentId": "agent.b73ee06f2af37577c9726f116f1c4741a7012982796300e06e11bb243e93eefe",
      "digest": "sha256:c3aac0f6fa62c3b0fe995e92b831607634f48573479bd48359438df266d9c0bd"
    },
    {
      "agentId": "agent.c6eeaaa3dd451c11df643cdae215bd44003b4360835ab93102f21889c8cf9666",
      "digest": "sha256:a13b55a1f1516a9442639b821472fe16a6918850d4e0063ef84cb0df9aca27a1"
    }
  ]
}
```
