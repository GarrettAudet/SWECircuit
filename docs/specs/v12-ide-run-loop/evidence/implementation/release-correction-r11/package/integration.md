# Specialist Integration Contract

Compilation: `sha256:f934262e856c37e1167698f07a48f38ae73427b38f6dacdeabddfd0d9ece1825`

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
  "compilationDigest": "sha256:f934262e856c37e1167698f07a48f38ae73427b38f6dacdeabddfd0d9ece1825",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 11,
  "assumptions": [
    {
      "id": "assumption.architecture-frozen",
      "statement": "ADR 0005 and the Specialist Run contract are the complete implementation authority.",
      "rationale": "Architecture fan-in passed and no blocking decision remains."
    },
    {
      "id": "assumption.candidate-four-evidence-immutable",
      "statement": "Candidate 4 and its failed canonical-gate receipt and raw logs are immutable historical evidence and must not be deleted, moved, renamed, overwritten, or treated as a passing candidate.",
      "rationale": "The failure proves the exact source materialization had no repository context and preserves the route into revision 11."
    },
    {
      "id": "assumption.disposable-git-view",
      "statement": "The canonical command may receive only a disposable Git metadata, ref, and index view whose worktree is the exact candidate materialization and whose immutable objects are read by object ID; the real repository metadata is never the command's Git directory.",
      "rationale": "Git-aware tests need commit and attribute operations without regaining access to mutable checkout bytes or writing live repository state."
    },
    {
      "id": "assumption.external-gate-evidence",
      "statement": "A candidate's receipt and raw logs are necessarily produced after that candidate commit and therefore enter R2 as exact host evidence captured into immutable candidate-addressed snapshots, never as self-referential candidate Git blobs.",
      "rationale": "Committed reviewer source and post-commit execution evidence require distinct provenance rules while remaining package- and approval-bound."
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
    "evaluationSetDigest": "sha256:aaf9c05e7e4406bfe5df6219c79fa336acd183a68db13e0e39039a1d79bfa92f"
  },
  "selectedCandidateId": "team.2fe259534237f558121c468fc7eff6c6868efd02b04610276df9b1f7fc717528",
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
    "selectedValue": "team.2fe259534237f558121c468fc7eff6c6868efd02b04610276df9b1f7fc717528",
    "serialValue": "team.2fe259534237f558121c468fc7eff6c6868efd02b04610276df9b1f7fc717528",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.2fe259534237f558121c468fc7eff6c6868efd02b04610276df9b1f7fc717528",
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
        "agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2",
      "digest": "sha256:70a4d7e671fb7891514ab15d4d118a9ad8c7253fe5851933837264a6d8a9560d"
    }
  ]
}
```
