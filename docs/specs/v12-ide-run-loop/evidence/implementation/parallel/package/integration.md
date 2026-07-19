# Specialist Integration Contract

Compilation: `sha256:7384e593d56913a2059673fb2c10e7778aa56627a7e98754cd0913f9c5ecf065`

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
  "compilationDigest": "sha256:7384e593d56913a2059673fb2c10e7778aa56627a7e98754cd0913f9c5ecf065",
  "goalId": "v12.ide-run-loop.implementation.parallel",
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
    "workUnitCount": 2,
    "evaluatedCandidates": 2,
    "eligibleCandidates": 2,
    "retainedAlternatives": 1,
    "evaluationSetDigest": "sha256:b89b22bed017f4d229e491fe3210aa2bb400ac2a8a9b47bf26e76127b1803d35"
  },
  "selectedCandidateId": "team.1211b491d3b076f55d1087a63ddf95c56084772491426cb56e49b8f9d2180cef",
  "selectedMetrics": {
    "agentCount": 2,
    "projectedMakespan": 8,
    "peakConcurrency": 2,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 150388,
    "duplicatedPermissionScopes": 17,
    "totalWorkWeight": 14,
    "totalStartupCost": 2,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "lower_metric",
    "decisiveField": "projectedMakespan",
    "selectedValue": 8,
    "serialValue": 15,
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.f37acde7ee426e6aa08655faf72bef1f449720d5ea51b84853db0f1e8394be09",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 15,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 14,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.926fabd8855b608197816dc16ee42b3e12e98196c057e77c53d07504e9b2f428",
        "agent.cb73b4a9eb8cd6278d0985fb4c22785bb5891dfdb6daef34dbe0248304c29e70"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.926fabd8855b608197816dc16ee42b3e12e98196c057e77c53d07504e9b2f428",
      "digest": "sha256:5ae8e3fb034a80b517d87d61da758bfc7a07bf8290804a536bcf5447465511a6"
    },
    {
      "agentId": "agent.cb73b4a9eb8cd6278d0985fb4c22785bb5891dfdb6daef34dbe0248304c29e70",
      "digest": "sha256:2c71092cda04f03b4fdebadd835267fb39a9ba6d41162419f2833cf89fdc1614"
    }
  ]
}
```
