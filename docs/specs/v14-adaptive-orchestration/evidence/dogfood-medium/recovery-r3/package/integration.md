# Specialist Integration Contract

Compilation: `sha256:4071f52ea4d8eb81c53265668f2fecbbd8be123918ac860f96bd1ad4059c3828`

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
  "compilationDigest": "sha256:4071f52ea4d8eb81c53265668f2fecbbd8be123918ac860f96bd1ad4059c3828",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 3,
  "assumptions": [
    {
      "id": "assumption.no-product-change",
      "statement": "The revision-3 candidate is the exact current Impact Planner state reviewed in revision 2; recovery changes only package identity and verification.",
      "rationale": "The revision-2 reviewer found no functional defect and required a fresh package bound to corrected graph bytes."
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
    "evaluationSetDigest": "sha256:f6a5498748a378110bff7ce81e2022701bf2bc0c70d3c0d55753d869018207d6"
  },
  "selectedCandidateId": "team.78db9d90bf954c572f1cc69e77dbe85f8294308f54bc39c633909eb5bc0b57cc",
  "selectedMetrics": {
    "agentCount": 2,
    "projectedMakespan": 14,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 1,
    "duplicatedContextBytes": 112843,
    "duplicatedPermissionScopes": 29,
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
      "digest": "sha256:3876140aa8becf234de4edd1569a9064c51f134e285c80b3daa674170fef5761"
    },
    {
      "agentId": "agent.fab1780533167118ec8ed511ca19837e69a7c0dc4f67876a2180941c670c3449",
      "digest": "sha256:44c65782144b62af4c6a44c367195924a65bcc06d7c9256eb13ccaa34e3b0eac"
    }
  ]
}
```
