# Specialist Integration Contract

Compilation: `sha256:383a9ee2d20773c8608f7da195f9e7ea5212838dc7d82f0865bc1cefd38e2400`

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
  "compilationDigest": "sha256:383a9ee2d20773c8608f7da195f9e7ea5212838dc7d82f0865bc1cefd38e2400",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 10,
  "assumptions": [
    {
      "id": "assumption.architecture-frozen",
      "statement": "ADR 0005 and the Specialist Run contract are the complete implementation authority.",
      "rationale": "Architecture fan-in passed and no blocking decision remains."
    },
    {
      "id": "assumption.candidate-addressed-review-runs",
      "statement": "Each new R2 run owns a closed root under docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/<candidate>/; the already candidate-addressed canonical-gate evidence remains outside that root and is referenced by exact binding.",
      "rationale": "Candidate identity must separate snapshots, packages, approvals, handoffs, and reports while preserving shared immutable gate evidence."
    },
    {
      "id": "assumption.candidate-git-source-truth",
      "statement": "Reviewer source discovery and snapshot bytes come from the exact candidate Git tree and blobs, not a mutable working-tree enumeration or a verify-then-read sequence.",
      "rationale": "This removes untracked discovery and time-of-check/time-of-use ambiguity from the release-review context boundary."
    },
    {
      "id": "assumption.candidate-three-evidence-immutable",
      "statement": "Every existing Candidate 3 R2 artifact is immutable historical evidence and must not be deleted, moved, renamed, or overwritten.",
      "rationale": "Candidate 3 is retired, but its exact review package and findings remain part of the release trace."
    },
    {
      "id": "assumption.data-driven-correction-lineage",
      "statement": "Release-correction evidence is discovered from exact candidate paths, must form a contiguous revision sequence beginning at one, and is package-, approval-, report-, and raw-handoff-verified without a hardcoded terminal revision.",
      "rationale": "Adding a release correction must not require another source edit merely to increment a lineage count."
    },
    {
      "id": "assumption.host-edit-fallback",
      "statement": "After native apply_patch fails before mutation, the host may perform an exact precondition-hash-guarded PowerShell write inside the approved scope.",
      "rationale": "Foundation Revision 1 proved the temporary worktree patch helper is unavailable while bounded escalated PowerShell writes remain auditable and fail closed."
    },
    {
      "id": "assumption.host-effects-external",
      "statement": "All runtime, persistence, Git, merge, and memory effects remain external to core.",
      "rationale": "V12 is a pure evidence session, not the deferred universal scheduler."
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
    "evaluationSetDigest": "sha256:2253be350259453a03eff9f141e6f10f1f793e1a9a067ed09da9a93cf0ed94a7"
  },
  "selectedCandidateId": "team.d4c7dbaebe0263c3b08ab6abb8cfb045c572f0f92053a9dc8c91608e1309b7f2",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 11,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 10,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.d4c7dbaebe0263c3b08ab6abb8cfb045c572f0f92053a9dc8c91608e1309b7f2",
    "serialValue": "team.d4c7dbaebe0263c3b08ab6abb8cfb045c572f0f92053a9dc8c91608e1309b7f2",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.d4c7dbaebe0263c3b08ab6abb8cfb045c572f0f92053a9dc8c91608e1309b7f2",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 11,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 10,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f",
      "digest": "sha256:1a13f8154a516a19881955976e4613d3a532718c661dd98fb582c5cac91e6831"
    }
  ]
}
```
