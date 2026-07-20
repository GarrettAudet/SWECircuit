# Specialist Integration Contract

Compilation: `sha256:ce22dcd5bc7b96d7399fa792ab9ab35c0b10af9a0a4c437fd3d184dfe3eec672`

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
  "compilationDigest": "sha256:ce22dcd5bc7b96d7399fa792ab9ab35c0b10af9a0a4c437fd3d184dfe3eec672",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
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
    },
    {
      "id": "assumption.source-bound-replan",
      "statement": "The original runtime-purity specialist contract is retired and must not launch because verified upstream work changed its bound run contract and constants sources.",
      "rationale": "A source-bound contract cannot authenticate or safely act on bytes that differ from its approved package; revision 2 recompiles the remaining work against the exact integrated sources."
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
    "evaluationSetDigest": "sha256:e9fdb39998393cabd46cbc78f164a3b0596e8c0c4161d73cfc76c2e3c189a2d8"
  },
  "selectedCandidateId": "team.4c92669eb680ad05be5bd3c5feef150f1a5fdde8d315201e095ba7fe28db9144",
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
    "selectedValue": "team.4c92669eb680ad05be5bd3c5feef150f1a5fdde8d315201e095ba7fe28db9144",
    "serialValue": "team.4c92669eb680ad05be5bd3c5feef150f1a5fdde8d315201e095ba7fe28db9144",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.4c92669eb680ad05be5bd3c5feef150f1a5fdde8d315201e095ba7fe28db9144",
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
        "agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.19b35908f9c3322b40e9b0992c277862c5cb9782588d3e8c7b19083f9a102efe",
      "digest": "sha256:bbad5e70232c83f513fb2d9efb4bd9bc209b224d7ed3b1e79cec9b2bffadd869"
    }
  ]
}
```
