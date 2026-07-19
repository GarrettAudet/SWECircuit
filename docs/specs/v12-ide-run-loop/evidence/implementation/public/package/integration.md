# Specialist Integration Contract

Compilation: `sha256:e0f60f3dc69bfbcc8b0d6b37c5fc048b39d5d1ccae123849961ee5f2548646cb`

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
  "compilationDigest": "sha256:e0f60f3dc69bfbcc8b0d6b37c5fc048b39d5d1ccae123849961ee5f2548646cb",
  "goalId": "v12.ide-run-loop.implementation.public",
  "goalRevision": 1,
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
    "evaluationSetDigest": "sha256:76651ec22b5bfcb95808802f18bfadc69e225e78ec567ed3aeb750cf9dc59801"
  },
  "selectedCandidateId": "team.1188e52efea8241e53a452397083ee7f0a9c6b48f3d4034833a96f5621a828e7",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 7,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 6,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.1188e52efea8241e53a452397083ee7f0a9c6b48f3d4034833a96f5621a828e7",
    "serialValue": "team.1188e52efea8241e53a452397083ee7f0a9c6b48f3d4034833a96f5621a828e7",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.1188e52efea8241e53a452397083ee7f0a9c6b48f3d4034833a96f5621a828e7",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 7,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 6,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.7420e1ee8bbc7fbf7c4ea1a7d6d7fd1e546e7704b329c15d5f29078f9f380b16"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.7420e1ee8bbc7fbf7c4ea1a7d6d7fd1e546e7704b329c15d5f29078f9f380b16",
      "digest": "sha256:e485f54685142b60e94004ecd9e35bb33da7d969967a666252674e7e25fc8a78"
    }
  ]
}
```
