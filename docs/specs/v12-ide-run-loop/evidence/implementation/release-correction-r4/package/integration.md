# Specialist Integration Contract

Compilation: `sha256:aa13bb1f6a8ff21658b718ccd46e6a5a26dacd8d1c9baa990b92e37161627660`

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
  "compilationDigest": "sha256:aa13bb1f6a8ff21658b718ccd46e6a5a26dacd8d1c9baa990b92e37161627660",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 4,
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
      "id": "assumption.package-reconstruction-split",
      "statement": "Revision 3 is a verified split: its V12 and V11 handoff-loader corrections are preserved, and revision 4 adds only the causally reached Specialist Compiler schema loader.",
      "rationale": "Every truly cold operation produced the same single common.schema.json read while verifySpecialistPackage reconstructed the compilation through compileAgentBlueprints."
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
    "evaluationSetDigest": "sha256:fab2569bcd921a5422656fdbf86a313215a3c3d343987574239e8fbdd259f1ca"
  },
  "selectedCandidateId": "team.5068f46c9c846214f5aa25f6a194b93e0eba458915e217137eee6b0d29d15172",
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
    "selectedValue": "team.5068f46c9c846214f5aa25f6a194b93e0eba458915e217137eee6b0d29d15172",
    "serialValue": "team.5068f46c9c846214f5aa25f6a194b93e0eba458915e217137eee6b0d29d15172",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.5068f46c9c846214f5aa25f6a194b93e0eba458915e217137eee6b0d29d15172",
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
        "agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.dfba586fa1cfbbe3f1ad35b0509f48eeddba1e7f16b0c5ad6ce210d3214d59ba",
      "digest": "sha256:60ed65c721e9140a6fa0d917ff7b98d32319b12d58644f0518eb95b7792556d3"
    }
  ]
}
```
