# Specialist Integration Contract

Compilation: `sha256:6bf6b7a203e71f17da856c9317bb455106f3b94762588088f3ac7a8e355aae12`

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
  "compilationDigest": "sha256:6bf6b7a203e71f17da856c9317bb455106f3b94762588088f3ac7a8e355aae12",
  "goalId": "v12.ide-run-loop.review.release-candidate-r37",
  "goalRevision": 37,
  "assumptions": [
    {
      "id": "assumption.host-boundary-external",
      "statement": "Runtime selection, execution, isolation, enforcement, hosted CI, merge, and durable persistence remain external host duties.",
      "rationale": "The package can bind demands and evidence but cannot perform external effects."
    },
    {
      "id": "assumption.predecessor-retired",
      "statement": "Checkpoint ee297d8e11466763acc9b4c630de445eb57b00c3 is immutable failed evidence and cannot be relaunched.",
      "rationale": "The review compares its exact failure with one new aggregate-tested source identity."
    },
    {
      "id": "assumption.snapshots-authoritative",
      "statement": "Declared immutable snapshots are the only semantic review inputs.",
      "rationale": "The reviewer must not depend on mutable live source, ignored output, or chat summaries."
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
    "evaluationSetDigest": "sha256:ccf08f491e395c0009d24f7fa8d38464a4970859c0b68464acf5dd20227fdbb5"
  },
  "selectedCandidateId": "team.7fb069d06b5d9b4a8fd7cf17b2d7391dbb5ae103114a6d952bdc9056940a24ca",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 47,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 46,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.7fb069d06b5d9b4a8fd7cf17b2d7391dbb5ae103114a6d952bdc9056940a24ca",
    "serialValue": "team.7fb069d06b5d9b4a8fd7cf17b2d7391dbb5ae103114a6d952bdc9056940a24ca",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.7fb069d06b5d9b4a8fd7cf17b2d7391dbb5ae103114a6d952bdc9056940a24ca",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 47,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 46,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.1095666c58c94736567b639a2506890d1b21728cf2bbafbbc8b6fefa9ecf7b4c"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.1095666c58c94736567b639a2506890d1b21728cf2bbafbbc8b6fefa9ecf7b4c",
      "digest": "sha256:f21f81124bf84d8079a2948c4f24f5deac9e370d8f02911864aba55b5f301f25"
    }
  ]
}
```
