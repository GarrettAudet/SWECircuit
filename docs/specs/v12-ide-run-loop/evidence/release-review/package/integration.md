# Specialist Integration Contract

Compilation: `sha256:cd70618e14b23dfae4538c41b6709791238684192b5c000f4e577f0edd6b5fd3`

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
  "compilationDigest": "sha256:cd70618e14b23dfae4538c41b6709791238684192b5c000f4e577f0edd6b5fd3",
  "goalId": "v12.ide-run-loop.release-review",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.exact-candidate",
      "statement": "Every reviewed tracked source is byte-identical to candidate d914b273ba619e3cfa42206c8d9f136be73075e3.",
      "rationale": "The review harness checks HEAD and every reviewed path before compiling digest-bound contracts."
    },
    {
      "id": "assumption.external-producer",
      "statement": "The candidate producer is external to this audit goal; every compiled work unit is a read-only reviewer with no candidate write authority.",
      "rationale": "Compiler-level producer/checker separation applies only when both duties are represented inside one goal. Here the immutable commit and digest-bound source manifest are the producer boundary."
    },
    {
      "id": "assumption.host-boundary",
      "statement": "V12 core creates, restores, inspects, and records immutable evidence sessions but does not launch, persist, schedule, integrate, merge, or mutate memory.",
      "rationale": "Review must judge the implemented provider-neutral contract rather than the deferred runtime layer."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 3,
    "evaluatedCandidates": 5,
    "eligibleCandidates": 5,
    "retainedAlternatives": 4,
    "evaluationSetDigest": "sha256:bf90cf8e3b542acd0142b9d46eaa8894c06cad03c75c8eb1936ff4ad743a437d"
  },
  "selectedCandidateId": "team.c59afff49b8af248cdf6c9b5bcfbb94595856ddd6b4a84fd9331e0858a1505ec",
  "selectedMetrics": {
    "agentCount": 3,
    "projectedMakespan": 9,
    "peakConcurrency": 3,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 501510,
    "duplicatedPermissionScopes": 46,
    "totalWorkWeight": 24,
    "totalStartupCost": 3,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "lower_metric",
    "decisiveField": "projectedMakespan",
    "selectedValue": 9,
    "serialValue": 25,
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.ba9100672b51e597af4d8fd8555ed979a699d79e9d7a97fba01c393f34cb6fbc",
    "eligible": true,
    "rejectionCodes": [],
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
        "agent.05a41e9299905b099d84cec047f01dea6bd6662f418e8d0280b8c5463d7968bd",
        "agent.30201e58e8e1ff0a39a7ce80868e2a9ed86703849286b41ef59dcf22c875ed04",
        "agent.b4e5d94b2bdecdbf284add38ccaef6584491d69d9cb535668dd36a69a014af34"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.05a41e9299905b099d84cec047f01dea6bd6662f418e8d0280b8c5463d7968bd",
      "digest": "sha256:4a21400e89107a1646123fb7ba55379dd5979ec01056b8202f629766347bcc07"
    },
    {
      "agentId": "agent.30201e58e8e1ff0a39a7ce80868e2a9ed86703849286b41ef59dcf22c875ed04",
      "digest": "sha256:c755c5e5e1474d06fe6bbae940fcc67a27dfc0b7f0be2181670f09816a2bf80f"
    },
    {
      "agentId": "agent.b4e5d94b2bdecdbf284add38ccaef6584491d69d9cb535668dd36a69a014af34",
      "digest": "sha256:c480f8e421ddac1a2e960174ea59b3185137835abcd5125f32e80eef518c2cd5"
    }
  ]
}
```
