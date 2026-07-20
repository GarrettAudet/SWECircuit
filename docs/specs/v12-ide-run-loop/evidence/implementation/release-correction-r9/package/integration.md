# Specialist Integration Contract

Compilation: `sha256:ca0488cd362c3757183da85238001ff1e14e9dee702bf58af27347684a4cdc6d`

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
  "compilationDigest": "sha256:ca0488cd362c3757183da85238001ff1e14e9dee702bf58af27347684a4cdc6d",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 9,
  "assumptions": [
    {
      "id": "assumption.architecture-frozen",
      "statement": "ADR 0005 and the Specialist Run contract are the complete implementation authority.",
      "rationale": "Architecture fan-in passed and no blocking decision remains."
    },
    {
      "id": "assumption.candidate-three-retired",
      "statement": "Candidate 3 is retired because its tracked-only gate receipt cannot prove that untracked verification inputs were absent.",
      "rationale": "The exact product/API/IDE R2 handoff returned fix even though the functional gate passed."
    },
    {
      "id": "assumption.committed-source-materialization",
      "statement": "The canonical command must execute repository inputs materialized exclusively from the requested candidate Git tree; installed dependencies remain external runtime supply and must not be represented as candidate source.",
      "rationale": "A committed-source materialization closes the finding without maintaining an incomplete allowlist of potentially influential untracked paths."
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
      "id": "assumption.security-context-completeness",
      "statement": "R2 security review must bind .gitattributes, .gitignore, src/specialist-handoff-schema-data.ts, src/specialist-handoff-schema.ts, src/specialist-schema-data.ts, and src/specialist-schema.ts as exact candidate snapshots.",
      "rationale": "The independent security review identified those six causal correction files as missing from its approved context."
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
    "evaluationSetDigest": "sha256:c6dfbbe3866e8702c429433fac5334a9d067b6feed3a45189488cd5dae4d4d5d"
  },
  "selectedCandidateId": "team.59b948ad11fb237a562e51576c451f14544a12a7a9ee91e63f9d26c778f74b36",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 10,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 9,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.59b948ad11fb237a562e51576c451f14544a12a7a9ee91e63f9d26c778f74b36",
    "serialValue": "team.59b948ad11fb237a562e51576c451f14544a12a7a9ee91e63f9d26c778f74b36",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.59b948ad11fb237a562e51576c451f14544a12a7a9ee91e63f9d26c778f74b36",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 10,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 9,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.f135c6a031895dbe7733367c2e1729fa86815ec89a935f13f00cb079d5c60ae5",
      "digest": "sha256:2f8c267ce00799d1224eb91b4071fd7f834411cedc4845cacc09a727b4c17c34"
    }
  ]
}
```
