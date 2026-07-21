# Specialist Integration Contract

Compilation: `sha256:857c536099f5fd9d01b0981593bef6f2e8b40eba774db7fae21c501e3bd3e83f`

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
  "compilationDigest": "sha256:857c536099f5fd9d01b0981593bef6f2e8b40eba774db7fae21c501e3bd3e83f",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 15,
  "assumptions": [
    {
      "id": "assumption.candidate-eight-immutable",
      "statement": "Candidate 8, its passing gate, prepared R2 run, and compilation failure are immutable and cannot be reused after source correction.",
      "rationale": "The corrected harness requires a new candidate and run root."
    },
    {
      "id": "assumption.closed-limits",
      "statement": "Specialist Compiler context and scope limits remain unchanged.",
      "rationale": "The causal defect is redundant source selection, not insufficient safety limits."
    },
    {
      "id": "assumption.host-edit-fallback",
      "statement": "After native apply_patch fails before mutation, the host may use an exact precondition-hash-guarded write inside approved scope.",
      "rationale": "The active temporary worktree may not be writable through the native patch helper."
    },
    {
      "id": "assumption.integration-owned-release",
      "statement": "The integration owner retains full-suite verification, successor freeze, exact gate, fresh R2, CI, and merge authority.",
      "rationale": "The correction specialist cannot approve the release it modifies."
    },
    {
      "id": "assumption.primary-evidence-preserved",
      "statement": "Package envelopes, approvals, raw handoffs, handoff-verification reports, replans, and non-navigation correction evidence remain direct reviewer context.",
      "rationale": "Context reduction may remove duplicates but never authoritative evidence."
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
    "evaluationSetDigest": "sha256:8da2c044d06bac5e76181139a133d29efaf0640889b53eac8ac93f557725ff65"
  },
  "selectedCandidateId": "team.d5b34c0f752993afbbc2e27f904dd3fa1d9629bbdfaeaef86ee65f82cca6f22c",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 8,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 7,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.d5b34c0f752993afbbc2e27f904dd3fa1d9629bbdfaeaef86ee65f82cca6f22c",
    "serialValue": "team.d5b34c0f752993afbbc2e27f904dd3fa1d9629bbdfaeaef86ee65f82cca6f22c",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.d5b34c0f752993afbbc2e27f904dd3fa1d9629bbdfaeaef86ee65f82cca6f22c",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 8,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 7,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48",
      "digest": "sha256:fefa3e7beecc2fdb107caaf44b9a2adf3b51e1e64a06b76bf1ee5469360ecd81"
    }
  ]
}
```
