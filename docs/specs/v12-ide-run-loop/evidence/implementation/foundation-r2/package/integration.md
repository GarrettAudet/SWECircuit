# Specialist Integration Contract

Compilation: `sha256:3c76ddb9c2c25b510d7f6d36f701f7271db941f019d3615946afa58d2207b435`

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
  "compilationDigest": "sha256:3c76ddb9c2c25b510d7f6d36f701f7271db941f019d3615946afa58d2207b435",
  "goalId": "v12.ide-run-loop.implementation.foundation",
  "goalRevision": 2,
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
    "workUnitCount": 1,
    "evaluatedCandidates": 1,
    "eligibleCandidates": 1,
    "retainedAlternatives": 0,
    "evaluationSetDigest": "sha256:1f2ce10197b207c4ecc1b57fb182faed0624a65fb032641cd8e947bd4cdd9e8f"
  },
  "selectedCandidateId": "team.a4691fd24da0db98c4eb8a284182fb6445282dc26ab0cf093b9066e6a00fd7a8",
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
    "selectedValue": "team.a4691fd24da0db98c4eb8a284182fb6445282dc26ab0cf093b9066e6a00fd7a8",
    "serialValue": "team.a4691fd24da0db98c4eb8a284182fb6445282dc26ab0cf093b9066e6a00fd7a8",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.a4691fd24da0db98c4eb8a284182fb6445282dc26ab0cf093b9066e6a00fd7a8",
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
        "agent.d3c2ceb9fe1389bd70a7262a546249e2329e304fc371ce50e0bb3dd50d4c9cd2"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.d3c2ceb9fe1389bd70a7262a546249e2329e304fc371ce50e0bb3dd50d4c9cd2",
      "digest": "sha256:afd64d674b9af78d18ba159f7a06d5872e963dbab20c30345d941d904a86698f"
    }
  ]
}
```
