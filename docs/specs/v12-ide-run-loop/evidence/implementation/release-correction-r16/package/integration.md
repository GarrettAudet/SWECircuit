# Specialist Integration Contract

Compilation: `sha256:064bb4a993c3ab3410f360684a29bf603c119059eccb62d87294456ecbcfe044`

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
  "compilationDigest": "sha256:064bb4a993c3ab3410f360684a29bf603c119059eccb62d87294456ecbcfe044",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 16,
  "assumptions": [
    {
      "id": "assumption.candidate-nine-immutable",
      "statement": "Candidate 9, its exact gate, approved R2 package, raw handoffs, and non-ready fan-in remain immutable.",
      "rationale": "A source correction requires a successor candidate and fresh review."
    },
    {
      "id": "assumption.history-preserved",
      "statement": "Historical candidate ordinals remain valid outside active status banners.",
      "rationale": "The correction removes future-stage drift without erasing attempt provenance."
    },
    {
      "id": "assumption.host-edit-fallback",
      "statement": "After native apply_patch fails before mutation, the host may use an exact precondition-hash-guarded write inside approved scope.",
      "rationale": "The authorized temporary worktree may not be writable through the native patch helper."
    },
    {
      "id": "assumption.integration-owned-release",
      "statement": "The integration owner retains full verification, successor freeze, exact gate, fresh R2, hosted CI, and merge authority.",
      "rationale": "The correction specialist cannot approve the release it modifies."
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
    "evaluationSetDigest": "sha256:3af7b78c721aa7e5d4426b935248e2ff239db29de4460ca5cd2c856d930a7469"
  },
  "selectedCandidateId": "team.d0b80f646a23eaef39efde51111986eb7027880f01ab2a076d0f4b8572d73382",
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
    "selectedValue": "team.d0b80f646a23eaef39efde51111986eb7027880f01ab2a076d0f4b8572d73382",
    "serialValue": "team.d0b80f646a23eaef39efde51111986eb7027880f01ab2a076d0f4b8572d73382",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.d0b80f646a23eaef39efde51111986eb7027880f01ab2a076d0f4b8572d73382",
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
        "agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826",
      "digest": "sha256:add8b8ff671f7c797e02852666586350e5c3d85accab384dca87f4777ea14d1a"
    }
  ]
}
```
