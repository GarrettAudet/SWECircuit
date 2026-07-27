# Specialist Integration Contract

Compilation: `sha256:4e0be7083c27a00fdf7daab7f77f8617023a6224f39bbd07c857773d2e093e30`

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
  "compilationDigest": "sha256:4e0be7083c27a00fdf7daab7f77f8617023a6224f39bbd07c857773d2e093e30",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 6,
  "assumptions": [
    {
      "id": "assumption.bounded-pointer-target-repair",
      "statement": "The revision-6 candidate changes only the changed-component label styling and its focused regression assertion after the verified revision-5 review finding.",
      "rationale": "The full 44px label now owns checkbox activation, and the local suite, syntax checks, desktop/mobile geometry, padding click, overflow, and console checks passed before freezing the package."
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
    "evaluationSetDigest": "sha256:208c8a5b7fb54496b283b9313cf4deaa7c351b480b15913cc6d6faa3c06ad745"
  },
  "selectedCandidateId": "team.78db9d90bf954c572f1cc69e77dbe85f8294308f54bc39c633909eb5bc0b57cc",
  "selectedMetrics": {
    "agentCount": 2,
    "projectedMakespan": 14,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 1,
    "duplicatedContextBytes": 126465,
    "duplicatedPermissionScopes": 32,
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
      "digest": "sha256:db0206a0b5c7029a632e3f6bb603d6b9a5f1ab10e7820c387768ea62db9815fd"
    },
    {
      "agentId": "agent.fab1780533167118ec8ed511ca19837e69a7c0dc4f67876a2180941c670c3449",
      "digest": "sha256:5c6c5cf1fec3acc916af27dcf6809e70f300ec88be239048b34ab51dcf34373b"
    }
  ]
}
```
