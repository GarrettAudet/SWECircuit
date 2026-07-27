# Specialist Integration Contract

Compilation: `sha256:e30109cf039cbda24cd000f58168458bf26ac76834035758d385be37d51740ab`

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
  "compilationDigest": "sha256:e30109cf039cbda24cd000f58168458bf26ac76834035758d385be37d51740ab",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 5,
  "assumptions": [
    {
      "id": "assumption.no-product-change",
      "statement": "The revision-5 candidate is the exact current Impact Planner state produced by the verified revision-4 accessibility fix; final verification changes only package identity and evidence.",
      "rationale": "The revision-4 specialist changed only the reviewed runtime class and focused regression test, then passed 23 tests."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 2,
    "evaluatedCandidates": 2,
    "eligibleCandidates": 1,
    "retainedAlternatives": 1,
    "evaluationSetDigest": "sha256:b0b63956b42946d468648f89cab1768d35d7abd8dae4cf554d749fece36a48d5"
  },
  "selectedCandidateId": "team.78db9d90bf954c572f1cc69e77dbe85f8294308f54bc39c633909eb5bc0b57cc",
  "selectedMetrics": {
    "agentCount": 2,
    "projectedMakespan": 14,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 1,
    "duplicatedContextBytes": 114868,
    "duplicatedPermissionScopes": 30,
    "totalWorkWeight": 11,
    "totalStartupCost": 2,
    "totalHandoffCost": 1
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
    "id": "team.6a31c2693a76c78a280fda3c1df8c84fd741fa8a7c66ae40154e93577da23f91",
    "eligible": false,
    "rejectionCodes": [
      "evidence_independence"
    ],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 12,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 11,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.fab1780533167118ec8ed511ca19837e69a7c0dc4f67876a2180941c670c3449"
      ]
    },
    {
      "start": 8,
      "agentIds": [
        "agent.7f2dd382095753b9cd6f754faaa9fd41ec9f916a3aa841c4d6aa5fec1ff23f15"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.7f2dd382095753b9cd6f754faaa9fd41ec9f916a3aa841c4d6aa5fec1ff23f15",
      "digest": "sha256:01046c82bd97fc3c16e5f68700f838404c8ce57738a3555f782d640159f520be"
    },
    {
      "agentId": "agent.fab1780533167118ec8ed511ca19837e69a7c0dc4f67876a2180941c670c3449",
      "digest": "sha256:dcc5fec3ae5aa7a38b59e1539b22a9682756f567219052583f36a98ae4bcc9cb"
    }
  ]
}
```
