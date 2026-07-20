# Specialist Integration Contract

Compilation: `sha256:ded9a26906a9a00a5f0b12dc3420e909a91e70ef9a3ee03905ac1676efb40638`

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
  "compilationDigest": "sha256:ded9a26906a9a00a5f0b12dc3420e909a91e70ef9a3ee03905ac1676efb40638",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 3,
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
    },
    {
      "id": "assumption.split-scope-expansion",
      "statement": "Revision 2 is a verified split: its partial V12 corrections are preserved, and revision 3 adds only the causally proven V11 handoff schema loader to authority.",
      "rationale": "The unprimed four-operation regression reached exactly one out-of-scope read of common.schema.json from recordSpecialistRunHandoff; priming the validator would hide the defect."
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
    "evaluationSetDigest": "sha256:06974e55850ea455fd9f9b3ffc0e6a82768a3d7528c60f4bf9e9a4f42907c199"
  },
  "selectedCandidateId": "team.7a694ac886767e9b79d30bbef23f2efa11e405ad513915c9ec3e53719b4e3df4",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 9,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 8,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.7a694ac886767e9b79d30bbef23f2efa11e405ad513915c9ec3e53719b4e3df4",
    "serialValue": "team.7a694ac886767e9b79d30bbef23f2efa11e405ad513915c9ec3e53719b4e3df4",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.7a694ac886767e9b79d30bbef23f2efa11e405ad513915c9ec3e53719b4e3df4",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 9,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 8,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.4ad07f1bbe6a0d5365c7ff1ecc1ea5a0da2e7cc084d41bf3c1dbda8c0f21339d",
      "digest": "sha256:382469632b31e57b2ef90c14425a1185be1517b27ba735cba0e9668d45bf4848"
    }
  ]
}
```
