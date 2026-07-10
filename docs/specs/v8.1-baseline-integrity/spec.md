# Feature Spec

## Status

Complete.

## Problem

V8 presented TraceRail clearly, but a repository-wide audit found that the implementation was still a manual protocol and that several contracts, checks, and public claims drifted from that reality. The baseline needed to be internally consistent and honestly positioned before an executable kernel could be built.

## Goals

- Position TraceRail as a checked, file-based operating protocol and label the overview as the target operating model.
- Make the module authoring template match the declared module interface.
- Make every rail-local module expose input, action, output, gate, outcome, and artifacts.
- Keep workflow outcomes inside the canonical typed outcome set.
- Fix checker gaps for completed debug notes, decimal milestones, dynamic official packs, rail/module contracts, and memory provenance.
- Add source provenance to durable decisions and patterns.
- Dogfood V8 through bounded write-enabled parallel work with one integration owner.

## Non-Goals

- Build the V9 CLI, schema runtime, rail executor, or project initializer.
- Add an agent router, scheduler, worktree manager, or merge engine.
- Claim automatic retrieval, complete transcript capture, or self-improvement.
- Select a license without an explicit owner decision.
- Merge to main without approval.

## Requirements

- The README must distinguish current capabilities from the target operating model.
- The public module interface and authoring template must agree.
- Rail-local modules must use the same interface as catalog modules.
- Governance decisions such as deferred and rejected must not masquerade as workflow outcomes.
- The checker must discover official pack directories instead of validating only one named pack.
- A debug record marked Draft or Complete must require reproduction, evidence, classification, hypotheses, and experiments.
- Feature folders with decimal versions must map to decimal milestone files.
- Durable decision and pattern memory must expose source artifacts.
- The orchestration run must preserve worker contracts, handoffs, changed files, conflicts, verification, and residual risks.

## Acceptance Criteria

- [x] Given a new reader opens the README, when they scan the positioning and visual, then they can distinguish the current checked protocol from the target automated workflow.
- [x] Given a maintainer creates a module, when they use the authoring template, then every declared module-interface field is present and checker-enforced.
- [x] Given a rail defines an inline module, when validation runs, then input, action, output, gate, outcome, and artifacts are required.
- [x] Given any module emits a workflow outcome, when validation runs, then it belongs to the canonical outcome set.
- [x] Given a completed debug record omits diagnostic evidence, when validation runs, then the checker fails.
- [x] Given a second official pack is added, when validation runs, then it is discovered without editing a hard-coded pack list.
- [x] Given a v8.1 feature package exists, when validation runs, then docs/milestones/v8.1.md is required.
- [x] Given durable decisions and patterns are reviewed, when their provenance is inspected, then source artifacts are available.
- [x] Given write-enabled workers complete bounded scopes, when the integration owner reviews the run, then successful handoffs, failed attempts, changed files, conflicts, verification, and recovery are recorded.
- [x] Given the repository is validated, when CI and local checks finish, then all technical checks pass and the license remains an explicit approval item.

## Architecture Impact

This hardens the file-based protocol and checker without adding a runtime. It prepares stable contracts for the V9 machine-readable kernel.

## Risks

- The checker still validates text contracts rather than a machine-readable graph.
- Parallel worker status and cancellation remain controlled by the external IDE runtime.
- The repository remains non-licensed until the owner chooses terms.
- V8.1 is stacked on the unmerged V8 branch.

## Open Questions

- Which license should govern public reuse: MIT, Apache-2.0, or another owner-selected license?
- Whether V9 manifests should use YAML or JSON as the canonical machine-readable format.

## Assumptions

- V8 is an unmerged base, so V8.1 may be proposed with it as one stacked change.
- Inline rail modules are valid when they expose the complete interface; they do not all need standalone catalog files.
- Existing Markdown remains the source for V8.1 while V9 introduces machine-readable contracts.
