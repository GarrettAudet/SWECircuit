# Specialist Integration Contract

Compilation: `sha256:256d6b31b1a6301240230a6a0ee606a30682caeb02e45e24c53edf334d283b82`

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
  "compilationDigest": "sha256:256d6b31b1a6301240230a6a0ee606a30682caeb02e45e24c53edf334d283b82",
  "goalId": "v13.dogfood.triage-board",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.chromium-local-storage",
      "statement": "A current Chromium browser and browser local storage are available.",
      "rationale": "The bounded dogfood target is a local desktop application."
    },
    {
      "id": "assumption.external-host",
      "statement": "The external host supplies native subagents and enforces the compiled boundaries.",
      "rationale": "Runtime supply and enforcement remain outside the V12 kernel."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 4,
    "evaluatedCandidates": 15,
    "eligibleCandidates": 5,
    "retainedAlternatives": 8,
    "evaluationSetDigest": "sha256:8bb99a0fa6cf720ad87c71ec29922b5e2a7d459efb6b0fdefbadd6f76686d978"
  },
  "selectedCandidateId": "team.b19b74e061af1d40f2da6dd491132d9c75b82f2594977c30fdf62ae59c481751",
  "selectedMetrics": {
    "agentCount": 4,
    "projectedMakespan": 22,
    "peakConcurrency": 2,
    "conflictPairs": 5,
    "handoffCount": 3,
    "duplicatedContextBytes": 19542,
    "duplicatedPermissionScopes": 14,
    "totalWorkWeight": 24,
    "totalStartupCost": 4,
    "totalHandoffCost": 3
  },
  "selectionReason": {
    "kind": "serial_ineligible",
    "decisiveField": "evidence_independence",
    "selectedValue": "eligible",
    "serialValue": "ineligible",
    "serialRejectionCodes": [
      "evidence_independence"
    ]
  },
  "serialBaseline": {
    "id": "team.8c173dbbb6cbb80d5b2b00155b933a2ee87c6d97345de38b333b1e58a3726a3d",
    "eligible": false,
    "rejectionCodes": [
      "evidence_independence"
    ],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 25,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 24,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.22fe8f425ee2ae8035b37fbe4de773031bb56a585b11a9e10ea72fe0da8ae106",
        "agent.9f4c01d80a88a276ef54c7736dfde8ccf028153881c90b8cb3a6c7d635867bb5"
      ]
    },
    {
      "start": 10,
      "agentIds": [
        "agent.3d688f99658a89b95473b010617ce56bbff4e5bafb0c9f2d9580f842a52496ef"
      ]
    },
    {
      "start": 17,
      "agentIds": [
        "agent.fe1abacce8e8c4dbed4fd9ee95a6f0c2be8ddaab69ee0ba25b7e1df7590cdbf3"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.22fe8f425ee2ae8035b37fbe4de773031bb56a585b11a9e10ea72fe0da8ae106",
      "digest": "sha256:5ef115b4d2171e62fe8cd3263e4e644f1e638f8c2518251b2b76b71db753c56c"
    },
    {
      "agentId": "agent.3d688f99658a89b95473b010617ce56bbff4e5bafb0c9f2d9580f842a52496ef",
      "digest": "sha256:a58ac2f1da1c9247b437ebed417510598a48370b456ed829f3d88f3162bb0b5d"
    },
    {
      "agentId": "agent.9f4c01d80a88a276ef54c7736dfde8ccf028153881c90b8cb3a6c7d635867bb5",
      "digest": "sha256:370d388153979d827db61294d736453bd717718cbcae4b6bfbaafb09ba6e91e2"
    },
    {
      "agentId": "agent.fe1abacce8e8c4dbed4fd9ee95a6f0c2be8ddaab69ee0ba25b7e1df7590cdbf3",
      "digest": "sha256:5455e7b69c4fb177b3ddc3d31f8acfbc3c33a6e62cea04a5191c58d3210699fa"
    }
  ]
}
```
