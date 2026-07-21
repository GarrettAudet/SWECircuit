# Specialist Integration Contract

Compilation: `sha256:812c86d0f802dc5c0fe4c36a94e699a52dc2333a47780516c6e898bb89da6555`

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
  "compilationDigest": "sha256:812c86d0f802dc5c0fe4c36a94e699a52dc2333a47780516c6e898bb89da6555",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 13,
  "assumptions": [
    {
      "id": "assumption.candidate-six-immutable",
      "statement": "Candidate 6 and its failed receipt and logs are immutable historical evidence and can never authorize release.",
      "rationale": "The correction changes source and requires a new candidate identity."
    },
    {
      "id": "assumption.external-toolchain-supply",
      "statement": "Installed development tools are host runtime supply and do not belong in exact candidate source.",
      "rationale": "Git materialization intentionally contains committed source only."
    },
    {
      "id": "assumption.host-edit-fallback",
      "statement": "After native apply_patch fails before mutation, the host may use an exact precondition-hash-guarded write inside approved scope.",
      "rationale": "The active temporary worktree is not writable through the native patch helper."
    },
    {
      "id": "assumption.local-default",
      "statement": "Ordinary repository verification may default to its repository-local TypeScript installation when no explicit host supply exists.",
      "rationale": "Local developer ergonomics remain unchanged outside exact release materialization."
    },
    {
      "id": "assumption.v11-rebuild",
      "statement": "The integration owner will independently rebuild affected V11 evidence as Revision 38 after source integration.",
      "rationale": "The implementing specialist cannot authorize its own source changes."
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
    "evaluationSetDigest": "sha256:051af88be86ec6092f5e1df4c364d1797bc5483d8c045facd43228cb09b8d6e5"
  },
  "selectedCandidateId": "team.a9a7a3c8007571debb74d715b6b76eeb75a15bbc37e876bf4bbeb0811993b344",
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
    "selectedValue": "team.a9a7a3c8007571debb74d715b6b76eeb75a15bbc37e876bf4bbeb0811993b344",
    "serialValue": "team.a9a7a3c8007571debb74d715b6b76eeb75a15bbc37e876bf4bbeb0811993b344",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.a9a7a3c8007571debb74d715b6b76eeb75a15bbc37e876bf4bbeb0811993b344",
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
        "agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.ee3ab1e48b0732261eea826a1c11e3f8761c84630e3edad4da3e68569e909eb8",
      "digest": "sha256:58733521eaec83ddf85b0f51b6c76b0e53c8b09eecfb0217ae445ca5804eb818"
    }
  ]
}
```
