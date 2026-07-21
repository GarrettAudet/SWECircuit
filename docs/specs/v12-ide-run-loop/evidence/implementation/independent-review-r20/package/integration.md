# Specialist Integration Contract

Compilation: `sha256:92c57726650787cdbf9af9dba9a2ee5c189df6939c6c299510b9c621ab99970f`

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
  "compilationDigest": "sha256:92c57726650787cdbf9af9dba9a2ee5c189df6939c6c299510b9c621ab99970f",
  "goalId": "v12.ide-run-loop.review.stable-reconstruction-authority-r20",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.host-boundary",
      "statement": "Operating-system and executable trust, cache provenance, parent pin enforcement, process isolation, and hostile same-user resistance remain external-host duties.",
      "rationale": "Repository checks may bind declarations without manufacturing host guarantees."
    },
    {
      "id": "assumption.producer-evidence-not-verdict",
      "statement": "The producer package, handoff, and test results are authenticated evidence but do not supply this review's semantic verdict.",
      "rationale": "Independent review must reason from exact source and primary evidence."
    },
    {
      "id": "assumption.read-only",
      "statement": "The reviewer has no write authority and reports defects without repairing bytes.",
      "rationale": "The reviewed source must remain immutable during semantic review."
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
    "evaluationSetDigest": "sha256:a337b425411a854bb448e389e6d6af034834ac3bd23bbb659ae27dd4c1d26c2f"
  },
  "selectedCandidateId": "team.bca21c918ae34dfd54d014b2201209c1c4a884fdcd1f98fae5ccb654ea4b89a2",
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
    "selectedValue": "team.bca21c918ae34dfd54d014b2201209c1c4a884fdcd1f98fae5ccb654ea4b89a2",
    "serialValue": "team.bca21c918ae34dfd54d014b2201209c1c4a884fdcd1f98fae5ccb654ea4b89a2",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.bca21c918ae34dfd54d014b2201209c1c4a884fdcd1f98fae5ccb654ea4b89a2",
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
        "agent.d0ed1cc274e25cc8c853efd842f293a8155e40437347d904675cdc0caf83d889"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.d0ed1cc274e25cc8c853efd842f293a8155e40437347d904675cdc0caf83d889",
      "digest": "sha256:963f1c246e72e2a9939060267f1995c2103ba92d498fd0f38f9934ee0428663d"
    }
  ]
}
```
