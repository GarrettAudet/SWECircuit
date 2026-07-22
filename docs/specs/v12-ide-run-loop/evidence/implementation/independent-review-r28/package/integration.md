# Specialist Integration Contract

Compilation: `sha256:dfe188073e32ee626ef573020213f63576596094558b493dd48a4ed5d81f3dc2`

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
  "compilationDigest": "sha256:dfe188073e32ee626ef573020213f63576596094558b493dd48a4ed5d81f3dc2",
  "goalId": "v12.ide-run-loop.review.authenticated-typescript-release-correction-r28",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.host-boundary-external",
      "statement": "Process isolation, runtime supply, and actor authentication remain host duties.",
      "rationale": "Repository code authenticates declared files but cannot enforce the external host."
    },
    {
      "id": "assumption.release-owner-controlled",
      "statement": "Successor freeze, one-shot candidate gate, R2, hosted CI, and merge remain owner work.",
      "rationale": "This specialist returns one bounded semantic verdict only."
    },
    {
      "id": "assumption.snapshots-authoritative",
      "statement": "Declared immutable snapshots are the only semantic review inputs.",
      "rationale": "The reviewer must not depend on mutable live source, ignored build output, or chat summaries."
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
    "evaluationSetDigest": "sha256:af0fb40f72c9191c80eec630ab63efbc627562c3021a94b7833f55246ba3a8b2"
  },
  "selectedCandidateId": "team.3ffe1f06a74a52674ed44983cbb704bcd503b25fe9db4c69d80cfd609a703c68",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 22,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 21,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.3ffe1f06a74a52674ed44983cbb704bcd503b25fe9db4c69d80cfd609a703c68",
    "serialValue": "team.3ffe1f06a74a52674ed44983cbb704bcd503b25fe9db4c69d80cfd609a703c68",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.3ffe1f06a74a52674ed44983cbb704bcd503b25fe9db4c69d80cfd609a703c68",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 22,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 21,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.47b1501d01443a341a3adbf58ffcf4bb810b4b38d0e1b08bacbb957dc429f926"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.47b1501d01443a341a3adbf58ffcf4bb810b4b38d0e1b08bacbb957dc429f926",
      "digest": "sha256:00e8186f6005b52e10a5d6338f54a630c573f84b5ba3b2f17f8151527bcfb0df"
    }
  ]
}
```
