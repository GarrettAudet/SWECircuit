# Specialist Integration Contract

Compilation: `sha256:eaad4d35361dc41813b58a17aff340e757744ea32cfb1ae5b17a31b81230a998`

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
  "compilationDigest": "sha256:eaad4d35361dc41813b58a17aff340e757744ea32cfb1ae5b17a31b81230a998",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 6,
  "assumptions": [
    {
      "id": "assumption.architecture-frozen",
      "statement": "ADR 0005 and the Specialist Run contract are the complete implementation authority.",
      "rationale": "Architecture fan-in passed and no blocking decision remains."
    },
    {
      "id": "assumption.candidate-one-failed-closed",
      "statement": "Candidate 989e6ea6da754ecddcf06507567647bd9d84be02 is retired after its exact canonical gate returned fail while HEAD and tracked state remained unchanged.",
      "rationale": "The immutable receipt and raw logs bind the stale packed-consumer expectation to the exact failed candidate without authorizing review launch."
    },
    {
      "id": "assumption.failed-gate-evidence-immutable",
      "statement": "The candidate-1 receipt and raw logs remain preserved at their original paths and must not be overwritten, deleted, or reclassified as passing evidence.",
      "rationale": "A corrected commit needs a new candidate-scoped evidence directory so each gate result retains one unambiguous identity."
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
    "workUnitCount": 2,
    "evaluatedCandidates": 2,
    "eligibleCandidates": 2,
    "retainedAlternatives": 1,
    "evaluationSetDigest": "sha256:f2627dae224c64901b8c47c2ec3ac830079ef69b93adf04d03b3082eee02ed2b"
  },
  "selectedCandidateId": "team.3004c1655868f13cabb8822f3740579a38e3367a8d81708211e06032135c1b60",
  "selectedMetrics": {
    "agentCount": 2,
    "projectedMakespan": 7,
    "peakConcurrency": 2,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 666188,
    "duplicatedPermissionScopes": 14,
    "totalWorkWeight": 11,
    "totalStartupCost": 2,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "lower_metric",
    "decisiveField": "projectedMakespan",
    "selectedValue": 7,
    "serialValue": 12,
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.df5e84a68053fdc4c427ca09e5c344a1afdf84d391c8c6074c7cc2232b01a9f7",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 12,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 11,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985",
        "agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.4a4cca8bce6a03e1f36dfd28b9505ff33920a045636f8715b10110fdbd408985",
      "digest": "sha256:b0bd0dd466b28e97da45a52154df49a867d9a6146d1aecce7d33bfaade10bbc2"
    },
    {
      "agentId": "agent.9579818ca2843121c26d1c38b48b0f78421bcba0ed39783ced3bfd842a45904e",
      "digest": "sha256:34e03e0a7ae677492b76b42096c7583c5999b609d24fe7230bf014b944429731"
    }
  ]
}
```
