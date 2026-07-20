# Specialist Integration Contract

Compilation: `sha256:a22663c51b5477531f8dc8a08e17841cf52d7aa837507cc672dcae5f1ca8eb48`

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
  "compilationDigest": "sha256:a22663c51b5477531f8dc8a08e17841cf52d7aa837507cc672dcae5f1ca8eb48",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 12,
  "assumptions": [
    {
      "id": "assumption.architecture-frozen",
      "statement": "ADR 0005 and the Specialist Run contract remain the complete implementation authority.",
      "rationale": "Candidate 5 exposed release-environment defects, not a change to the V12 core contract."
    },
    {
      "id": "assumption.candidate-five-immutable",
      "statement": "Candidate 5 and its failed receipt and raw logs are immutable historical evidence and can never become release-authorizing evidence.",
      "rationale": "Both corrections change source identity and require a newly frozen candidate."
    },
    {
      "id": "assumption.exact-blob-source",
      "statement": "Exact Git-blob materialization remains the canonical candidate source representation.",
      "rationale": "Applying checkout transforms inside the release gate would weaken reviewed-byte identity."
    },
    {
      "id": "assumption.external-runtime-supply",
      "statement": "Toolchain and npm cache supply are host runtime inputs and must remain outside the candidate materialization.",
      "rationale": "The candidate tree contains authenticated source, not mutable dependency cache or process logs."
    },
    {
      "id": "assumption.host-edit-fallback",
      "statement": "After native apply_patch fails before mutation, the host may use an exact precondition-hash-guarded write inside approved scope.",
      "rationale": "The active C:/tmp worktree is read-only to the native patch helper in this desktop sandbox."
    },
    {
      "id": "assumption.v11-trust-rebuild",
      "statement": "The integration owner will rebuild V11 as Revision 37 after the source correction lands and before Candidate 6 freezes.",
      "rationale": "A specialist must not rewrite the approval and audit evidence that independently authorizes its own causal source changes."
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
    "evaluationSetDigest": "sha256:5743072e7a5c6658ab48383278f1b10ee6e3a9be6401ec17e088a18691e66560"
  },
  "selectedCandidateId": "team.7fc42093732183df6e09291e3ab97e5296ece22fcc2cb10717a261ae95bd2c84",
  "selectedMetrics": {
    "agentCount": 2,
    "projectedMakespan": 11,
    "peakConcurrency": 2,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 176916,
    "duplicatedPermissionScopes": 15,
    "totalWorkWeight": 18,
    "totalStartupCost": 2,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "lower_metric",
    "decisiveField": "projectedMakespan",
    "selectedValue": 11,
    "serialValue": 19,
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.61a2efca70bdc2df80445a6cf46dc1c96deba7d902d581381f4193368a44abc0",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 19,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 18,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad",
        "agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.08756f07d108e3a95f45b3e101188efc5424183131fc2397f2c3a82c3db5afad",
      "digest": "sha256:aef70ab0ebb59ee457af0e09473be4d859a0db512f6f5da64f0f0ff5cb4d7f67"
    },
    {
      "agentId": "agent.5e3d0971d9dfb8df24441208aade1de4518d137dd6c90c77b28de04c3b2ae3c6",
      "digest": "sha256:fc9e263283ea524dbe0f33cbca2e9b45ab0c29d734b980d91537fa10280535c5"
    }
  ]
}
```
