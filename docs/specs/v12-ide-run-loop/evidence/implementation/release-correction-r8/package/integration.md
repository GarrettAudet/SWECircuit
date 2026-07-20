# Specialist Integration Contract

Compilation: `sha256:526cb3c687c60ebc99fc1856b2d3ef7b017dfd14fd9772711669d59d34b18fef`

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
  "compilationDigest": "sha256:526cb3c687c60ebc99fc1856b2d3ef7b017dfd14fd9772711669d59d34b18fef",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 8,
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
      "id": "assumption.raw-evidence-needs-explicit-binary-policy",
      "statement": "A matching local index blob is insufficient unless canonical raw logs are explicitly exempt from text normalization for every clone and platform.",
      "rationale": "The repository applies text=auto and LF checkout globally, while Candidate 1 stderr contains mixed raw process output and triggers text whitespace diagnostics."
    },
    {
      "id": "assumption.revision-seven-remains-source-evidence",
      "statement": "Revision 7 remains a valid pass for ignore-policy retention, but Candidate 2 cannot freeze until byte-preserving Git attributes are independently enforced.",
      "rationale": "Visibility and byte identity are distinct durable-evidence properties."
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
    "evaluationSetDigest": "sha256:665b0588c06745b644acf7bca19588e62ac9ce547d4b01537a770972d2c0face"
  },
  "selectedCandidateId": "team.bdd681c5d3c5362f4a6952d9b240345a6f96d32757856a1402d08d53450f8913",
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
    "selectedValue": "team.bdd681c5d3c5362f4a6952d9b240345a6f96d32757856a1402d08d53450f8913",
    "serialValue": "team.bdd681c5d3c5362f4a6952d9b240345a6f96d32757856a1402d08d53450f8913",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.bdd681c5d3c5362f4a6952d9b240345a6f96d32757856a1402d08d53450f8913",
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
        "agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.bfd8eac4d28210315485602103cca93bb3b7a534be1ddcd493b9ff8bea94921d",
      "digest": "sha256:19975ccdad35ac6506112366a046f1d3c373b560d6e9842f7df6fee73fdd4eaa"
    }
  ]
}
```
