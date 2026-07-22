# Specialist Integration Contract

Compilation: `sha256:002a7deab98a63b756e8f930cbcfd3927d64c0c262076a0ee9ccddfb29d01d45`

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
  "compilationDigest": "sha256:002a7deab98a63b756e8f930cbcfd3927d64c0c262076a0ee9ccddfb29d01d45",
  "goalId": "v12.ide-run-loop.review.git-environment-and-exact-lifecycle-r26",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.host-boundary-external",
      "statement": "Process isolation and actor authentication remain host duties.",
      "rationale": "Repository code closes inherited process inputs but does not enforce the host."
    },
    {
      "id": "assumption.release-owner-controlled",
      "statement": "Pre-freeze gates, successor freeze, R2, CI, and merge remain owner work.",
      "rationale": "This specialist returns one bounded semantic verdict only."
    },
    {
      "id": "assumption.snapshots-authoritative",
      "statement": "Declared immutable snapshots are the only semantic review inputs.",
      "rationale": "The reviewer must not depend on mutable live source or ignored state."
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
    "evaluationSetDigest": "sha256:918df107c3da5f3afc4954543e735a6dd32db182e300c2fd61af13fa9800e55f"
  },
  "selectedCandidateId": "team.269c5c20719b902c38032d136072118895919972eeb5bbcc2d50a4a39788b76a",
  "selectedMetrics": {
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
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.269c5c20719b902c38032d136072118895919972eeb5bbcc2d50a4a39788b76a",
    "serialValue": "team.269c5c20719b902c38032d136072118895919972eeb5bbcc2d50a4a39788b76a",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.269c5c20719b902c38032d136072118895919972eeb5bbcc2d50a4a39788b76a",
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
        "agent.a0779f841063f577cd855b902fd9aa3fb58b66ad7b68ae0ae83183c95b912d1b"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.a0779f841063f577cd855b902fd9aa3fb58b66ad7b68ae0ae83183c95b912d1b",
      "digest": "sha256:5302919186841b5a6602a157551fbc474b10277360dce70e25a7b0fef6780a09"
    }
  ]
}
```
