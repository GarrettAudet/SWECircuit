# Specialist Integration Contract

Compilation: `sha256:250a3faad6dfebe5baad3f541187cc7b30e4a3a11bf5638edb9a41a669fef861`

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
  "compilationDigest": "sha256:250a3faad6dfebe5baad3f541187cc7b30e4a3a11bf5638edb9a41a669fef861",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 14,
  "assumptions": [
    {
      "id": "assumption.candidate-seven-immutable",
      "statement": "Candidate 7 and its exact failed gate evidence are immutable and cannot authorize release.",
      "rationale": "The source correction requires a new candidate identity."
    },
    {
      "id": "assumption.integration-owned-release",
      "statement": "The integration owner retains full-suite verification, successor freeze, exact gate, R2 review, CI, and merge authority.",
      "rationale": "A bounded correction specialist cannot approve the release it helps verify."
    },
    {
      "id": "assumption.production-default-unchanged",
      "statement": "The injectable resolver default is an internal test seam; production continues to omit it and use either explicit normalized host supply or the repository-local development default.",
      "rationale": "The correction must isolate test setup without weakening runtime enforcement."
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
    "evaluationSetDigest": "sha256:b309984d63a2540585284fba0f9ec83ab7a15db6e6f79bf556e9d18b3bafe8dd"
  },
  "selectedCandidateId": "team.331249f9902b907d318bf45f1d009f87ccb824243cf715c437511bbdfc5cdaab",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 5,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 4,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.331249f9902b907d318bf45f1d009f87ccb824243cf715c437511bbdfc5cdaab",
    "serialValue": "team.331249f9902b907d318bf45f1d009f87ccb824243cf715c437511bbdfc5cdaab",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.331249f9902b907d318bf45f1d009f87ccb824243cf715c437511bbdfc5cdaab",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 5,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 4,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.09923d8b81ad68e16348138fa636ace06654fb86f630020e0ac862d2d81f6df5",
      "digest": "sha256:4b963a6676895dad6a2c694ba4a3b3cf25c5c68de40cf53dc91c87db95b2e37b"
    }
  ]
}
```
