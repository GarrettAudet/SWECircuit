# Specialist Integration Contract

Compilation: `sha256:8843d3af923c5fc16327ab9face168bc4f175314ab778ee71cd6d8e520567880`

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
  "compilationDigest": "sha256:8843d3af923c5fc16327ab9face168bc4f175314ab778ee71cd6d8e520567880",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 2,
  "assumptions": [
    {
      "id": "assumption.causal-fix",
      "statement": "The graph defect is localized to returning accumulated top-level exact-key errors before canonical validation.",
      "rationale": "The failing test and verified FIX handoff identify one reproducible causal condition."
    },
    {
      "id": "assumption.predecessor-pass-reuse",
      "statement": "Codec and interface source files remain the exact outputs described by their verified predecessor PASS handoffs.",
      "rationale": "The successor binds both handoffs and source files and avoids rerunning successful work."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 3,
    "evaluatedCandidates": 5,
    "eligibleCandidates": 1,
    "retainedAlternatives": 4,
    "evaluationSetDigest": "sha256:7f4cf4f8777b7c2c79f8c32e366e2444180a6e1ad4caeebdbd535ad823291c43"
  },
  "selectedCandidateId": "team.eb0acfad4810198a1e55eceed8c8370599a1ed10cc8c30f67be9ff7c81ba1d79",
  "selectedMetrics": {
    "agentCount": 3,
    "projectedMakespan": 18,
    "peakConcurrency": 1,
    "conflictPairs": 3,
    "handoffCount": 2,
    "duplicatedContextBytes": 94162,
    "duplicatedPermissionScopes": 31,
    "totalWorkWeight": 13,
    "totalStartupCost": 3,
    "totalHandoffCost": 2
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
    "id": "team.672c8d2d95c4a87ed33fa840b0067d2e9261b20959a54c27c58afdc604d6bd43",
    "eligible": false,
    "rejectionCodes": [
      "evidence_independence"
    ],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 14,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 13,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.5dac52676545c6525a7a600380bfd9d5af9c09ccfa6f57b381897212bbb96f0e"
      ]
    },
    {
      "start": 4,
      "agentIds": [
        "agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a"
      ]
    },
    {
      "start": 13,
      "agentIds": [
        "agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a",
      "digest": "sha256:b3653a26444139f73caabd1939175149674a9d48bd2a3f356fc46ded29c811cc"
    },
    {
      "agentId": "agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf",
      "digest": "sha256:83986bc64bf4d8db91d5133e3e9e4b08c306fcfcb15a682020bf41ca0ca4a1cb"
    },
    {
      "agentId": "agent.5dac52676545c6525a7a600380bfd9d5af9c09ccfa6f57b381897212bbb96f0e",
      "digest": "sha256:1b12710386ad0bea720de6fe7a3cdc16e21130b3cd5a5220ff4e5896be627a7a"
    }
  ]
}
```
