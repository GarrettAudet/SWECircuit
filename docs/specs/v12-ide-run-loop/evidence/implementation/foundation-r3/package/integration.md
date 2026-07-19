# Specialist Integration Contract

Compilation: `sha256:2a7a3f2e6a2c591b89eb5304be6662488e15561df4add9750a189ce426f43707`

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
  "compilationDigest": "sha256:2a7a3f2e6a2c591b89eb5304be6662488e15561df4add9750a189ce426f43707",
  "goalId": "v12.ide-run-loop.implementation.foundation",
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
    "evaluationSetDigest": "sha256:5b336646798ec06071e983360e6366cf708c89b4771b4289992feceb4253fabe"
  },
  "selectedCandidateId": "team.22379a95adb0c540f7262468d9bc9bb2b3ab50736eed5699923e390e6cdc2c19",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 4,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 3,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.22379a95adb0c540f7262468d9bc9bb2b3ab50736eed5699923e390e6cdc2c19",
    "serialValue": "team.22379a95adb0c540f7262468d9bc9bb2b3ab50736eed5699923e390e6cdc2c19",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.22379a95adb0c540f7262468d9bc9bb2b3ab50736eed5699923e390e6cdc2c19",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 4,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 3,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.9fd755787fd56ff15ec922d15077146bfb9dad79040dcd47538bc71cfe35bb3f"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.9fd755787fd56ff15ec922d15077146bfb9dad79040dcd47538bc71cfe35bb3f",
      "digest": "sha256:7b6a342e48785d39857ba5f5ee8115119290cdef74226c25566163947f0d7f9c"
    }
  ]
}
```
