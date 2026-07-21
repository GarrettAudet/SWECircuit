# Specialist Integration Contract

Compilation: `sha256:aac7f8e5f78c540bc1d3cf3286fc7f7ae834d446dce903382bf49636f260f407`

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
  "compilationDigest": "sha256:aac7f8e5f78c540bc1d3cf3286fc7f7ae834d446dce903382bf49636f260f407",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 21,
  "assumptions": [
    {
      "id": "assumption.external-host-boundary",
      "statement": "Executable trust, cache provenance, process isolation, and hostile same-user resistance remain external-host duties.",
      "rationale": "The behavioral fixture proves repository routing without overstating host guarantees."
    },
    {
      "id": "assumption.fixture-only-command",
      "statement": "The isolated fixture may replace only its copied aggregate verify command with a bounded deterministic command before committing the fixture candidate.",
      "rationale": "The test targets the gate-to-review lifecycle, while the real repository aggregate gate is verified separately."
    },
    {
      "id": "assumption.integration-owned-release",
      "statement": "Independent successor review, V11 refresh, candidate gate, R2, hosted CI, and merge remain integration-owner work.",
      "rationale": "The test producer cannot approve its own release."
    },
    {
      "id": "assumption.production-frozen",
      "statement": "Revision 20 production source is semantically accepted and must remain byte-identical; Revision 21 changes tests only.",
      "rationale": "The independent review found a proof defect, not a source-level identity defect."
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
    "evaluationSetDigest": "sha256:690896b08aa762562420f5c7d76930822b432854a03ab93982fdcec0b284bf11"
  },
  "selectedCandidateId": "team.29f48979e245af2f94c46e9c49f6ed5c79d88f14e8247f83af663ce92a83e780",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 21,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 20,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.29f48979e245af2f94c46e9c49f6ed5c79d88f14e8247f83af663ce92a83e780",
    "serialValue": "team.29f48979e245af2f94c46e9c49f6ed5c79d88f14e8247f83af663ce92a83e780",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.29f48979e245af2f94c46e9c49f6ed5c79d88f14e8247f83af663ce92a83e780",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 21,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 20,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.cde961f7cd173b3f274a6ea75f4190aea5a7642200c5bf39c2ba642d72573127"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.cde961f7cd173b3f274a6ea75f4190aea5a7642200c5bf39c2ba642d72573127",
      "digest": "sha256:22ca5ce6c7eeecae50dd4aeebbfecd4078b2d6ce644d1d7dd089c2bef6c0900b"
    }
  ]
}
```
