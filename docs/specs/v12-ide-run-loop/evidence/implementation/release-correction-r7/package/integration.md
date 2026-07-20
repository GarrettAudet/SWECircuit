# Specialist Integration Contract

Compilation: `sha256:e7f6a2d27f613ea1a898b781584039dff8704d88a940965814d45b04a5537920`

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
  "compilationDigest": "sha256:e7f6a2d27f613ea1a898b781584039dff8704d88a940965814d45b04a5537920",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 7,
  "assumptions": [
    {
      "id": "assumption.architecture-frozen",
      "statement": "ADR 0005 and the Specialist Run contract are the complete implementation authority.",
      "rationale": "Architecture fan-in passed and no blocking decision remains."
    },
    {
      "id": "assumption.candidate-one-bytes-remain-immutable",
      "statement": "Revision 7 may make the candidate-1 raw logs visible to Git but must not change their bytes, paths, receipt bindings, or failed outcome.",
      "rationale": "The failed attempt remains primary source evidence and cannot be rewritten to simplify retention."
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
      "id": "assumption.raw-gate-logs-must-be-versionable",
      "statement": "The canonical receipt is not durable release evidence unless its exact stdout and stderr source bytes can be committed and recovered from a fresh clone.",
      "rationale": "The repository currently ignores every .log file, including both exact candidate-1 gate logs and future candidate-addressed gate logs."
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
    "evaluationSetDigest": "sha256:2e0b8eb5d4b9f9df75b71e3419222e94574d904823f6154d2626c5839705fe2f"
  },
  "selectedCandidateId": "team.95637f6ac2bb74c533055e0666c20a7824db48103f5998e8831bdfedc23284e9",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 6,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 5,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.95637f6ac2bb74c533055e0666c20a7824db48103f5998e8831bdfedc23284e9",
    "serialValue": "team.95637f6ac2bb74c533055e0666c20a7824db48103f5998e8831bdfedc23284e9",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.95637f6ac2bb74c533055e0666c20a7824db48103f5998e8831bdfedc23284e9",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 6,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 5,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.5f16c5677b283cd8f5c13655b4b07216731fd3fdb5dfba7c6112471d5bd55c7c",
      "digest": "sha256:374f0c75a2a31a2d0fb7aa2462c8e30573b1bd64a91909a9daf0191d95b3e5cd"
    }
  ]
}
```
