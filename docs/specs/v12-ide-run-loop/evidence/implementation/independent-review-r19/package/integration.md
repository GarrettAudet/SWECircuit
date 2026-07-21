# Specialist Integration Contract

Compilation: `sha256:e8edeba54363eaabea98a63a6ec9ae61d6ac24888720fd5c146950d9a00f67c6`

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
  "compilationDigest": "sha256:e8edeba54363eaabea98a63a6ec9ae61d6ac24888720fd5c146950d9a00f67c6",
  "goalId": "v12.ide-run-loop.review.closed-reconstruction-trust",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.external-host-boundary",
      "statement": "Operating-system trust, executable trust, cache provenance, malicious parent code, and hostile same-user isolation remain external-host responsibilities.",
      "rationale": "The repository must describe but cannot manufacture those host guarantees."
    },
    {
      "id": "assumption.read-only-review",
      "statement": "The reviewer has no write authority and must report defects without repairing the reviewed bytes.",
      "rationale": "Review independence requires immutable producer output."
    },
    {
      "id": "assumption.untrusted-until-reviewed",
      "statement": "The passing implementation handoff and focused test result are authenticated evidence but do not supply this review's semantic verdict.",
      "rationale": "Producer evidence cannot replace independent semantic review."
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
    "evaluationSetDigest": "sha256:854668af2ed439b8e3ca889eb8f18ca5f1393dc1a5d4eb965da65aa94768a2eb"
  },
  "selectedCandidateId": "team.2740834f65356592a6f179f3865a64f34d592cfc6fe0585476b26a979d01612d",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 17,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 16,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.2740834f65356592a6f179f3865a64f34d592cfc6fe0585476b26a979d01612d",
    "serialValue": "team.2740834f65356592a6f179f3865a64f34d592cfc6fe0585476b26a979d01612d",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.2740834f65356592a6f179f3865a64f34d592cfc6fe0585476b26a979d01612d",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 17,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 16,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.a82cfc1740292f2e9b14f7a981a5bc1ec7358a0f8910bea718f16077b535b5c2",
      "digest": "sha256:1f29f2aa9252db72a9134f5a6b406d11ab337147abb6ec2589168bcfde00ed94"
    }
  ]
}
```
