# Specialist Integration Contract

Compilation: `sha256:bc3ae4a8e7acbb24f2eb3d628413390c4e9b71da0b3e8030e8117a7935af4755`

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
  "compilationDigest": "sha256:bc3ae4a8e7acbb24f2eb3d628413390c4e9b71da0b3e8030e8117a7935af4755",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 18,
  "assumptions": [
    {
      "id": "assumption.cache-provisioned",
      "statement": "The external host has provisioned the explicit content-addressed npm cache; release execution itself remains offline and fails closed if supply is incomplete.",
      "rationale": "The observed probe proved both ENOTCACHED failure and a subsequent network-free exact-lock success."
    },
    {
      "id": "assumption.host-isolation-boundary",
      "statement": "The bootstrap binds observed bytes and isolates ordinary repository effects but does not defend against a compromised OS, executable, IDE, or hostile same-user process.",
      "rationale": "Strong process and filesystem isolation remains an external host responsibility."
    },
    {
      "id": "assumption.integration-owned-release",
      "statement": "The integration owner retains full verification, successor freeze, one-shot gate, fresh R2, hosted CI, and merge authority.",
      "rationale": "The correction producer cannot approve its own release."
    },
    {
      "id": "assumption.prior-evidence-immutable",
      "statement": "Candidate 10, Revision 17, and every prior gate, package, approval, and handoff remain immutable.",
      "rationale": "The replacement must create a new successor rather than rewrite failed evidence."
    },
    {
      "id": "assumption.single-owner",
      "statement": "One specialist owns the coupled parent, child workers, package wiring, and tests; the integration owner independently reviews and runs release gates.",
      "rationale": "The files share one trust protocol and require one coherent output-promotion boundary."
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
    "evaluationSetDigest": "sha256:6ad0bcbe3a0ab09731419db75d829f32cd0b64ec3d21975d41ea2c1485d980e7"
  },
  "selectedCandidateId": "team.141ef9a41506c241e0cf24465fd86dcf92672bb7922d7f4ea9efea7ff08bc0ba",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 15,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 14,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.141ef9a41506c241e0cf24465fd86dcf92672bb7922d7f4ea9efea7ff08bc0ba",
    "serialValue": "team.141ef9a41506c241e0cf24465fd86dcf92672bb7922d7f4ea9efea7ff08bc0ba",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.141ef9a41506c241e0cf24465fd86dcf92672bb7922d7f4ea9efea7ff08bc0ba",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 15,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 14,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.579b971343195c283e09c62db402bbd1bcd8f64803c27da0b33a877370e72264",
      "digest": "sha256:afed29d3600ff495c391ef3753a01e07a39d6c006ccd2a84bd515c3d59dc4f81"
    }
  ]
}
```
