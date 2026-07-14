# V9 Final Acceptance Decomposition Plan

## Status

Active.

## Goal

Close T011 by proving every V9 acceptance criterion from direct evidence, adding the missing packed-consumer gate, obtaining independent final review, updating the milestone and durable memory, and presenting an explicit owner merge decision without merging the branch.

## Source Artifacts

- Feature package: `docs/specs/v9-devrail-kernel/`
- Architecture: `docs/architecture/decisions/0001-executable-kernel-foundation.md`
- Dogfood evidence: `docs/specs/v9-devrail-kernel/evidence/`
- Relevant memory: `docs/memory/active-context.md`, `docs/memory/decisions.md`, `docs/memory/known-issues.md`, `docs/memory/history-ledger.md`, `docs/memory/retrieval-index.md`

## Branch And State

- Source branch: `codex/v9-devrail-kernel`
- Target branch: `main`
- Baseline commit: `35cadf3`
- Dirty state at freeze: clean and synchronized with `origin/codex/v9-devrail-kernel`
- Approval gate: T011 may prepare V9 for approval; only the owner may authorize merge.
- Merge target during this run: none.

## Module Selection

| Needed Capability | Module | Reason |
| --- | --- | --- |
| Acceptance audit | Spec and retrieval | Bind each criterion to direct source evidence. |
| Package verification | Verification | Prove the private packed artifact works from a clean consumer. |
| Independent challenge | Review | Detect unsupported completion or distribution claims. |
| Durable closure | Memory | Preserve the milestone, risks, provenance, and next state. |

## Decomposition Summary

The package check and acceptance audit share package metadata, CI, and feature-package conflict zones, so one integration owner performs all edits. One read-only reviewer independently challenges the completed diff and evidence. Final documentation waits for that verdict so review corrections are reflected before evidence is frozen.

## Dependency Graph

```txt
acceptance audit -> packed-consumer gate -> local verification
                                          -> independent review
local verification + review -> final docs and memory -> branch CI -> owner merge gate
```

## Work Units

### Work Unit A: Acceptance And Package Gate

Objective: map AC1 through AC8 to direct evidence and close the missing AC6 package boundary.

Scope boundary: package scripts, one repository-local package-consumer checker, CI execution through the canonical gate, and T011 verification records.

Likely files or docs: `package.json`, `biome.json`, `scripts/check-packed-consumer.mjs`, `.github/workflows/template-check.yml`, and the V9 feature package.

Dependencies: completed T001 through T010 and built `dist/` output.

Conflict zones: package scripts, CI, review, test plan, tasks, and milestone; integration owner only.

Context bundle: V9 spec, ADR 0001, package metadata, current CI matrix, T009 public boundary, T010 dogfood evidence, and active memory.

Agent role or capability: integration owner with package, test, and evidence-audit capability.

Allowed actions: pack the private artifact into a run-owned temporary directory, install it offline from the cache warmed by `npm ci`, execute packaged public-library exports, and clean only identity-rechecked owned paths.

Verification evidence: required package files, forbidden source files, no `bin`, clean consumer module resolution, clean initialization, validation, trace inspection, cleanup, and the full Node 22/24 platform matrix.

Handoff format: files, commands, criterion mapping, observed results, and residual risks.

Stop conditions: public publication, a registry namespace claim, a new dependency, network-dependent kernel behavior, unsafe cleanup, or an unsupported acceptance claim.

### Work Unit B: Independent Final Review

Objective: challenge correctness, package isolation, cleanup safety, evidence sufficiency, current-versus-target honesty, and merge readiness.

Scope boundary: the V9 diff from `main`, feature package, package gate, CI, milestone, and memory updates.

Likely files or docs: read-only review of all V9 current-state artifacts.

Dependencies: Work Unit A and local canonical verification.

Conflict zones: none; read-only.

Context bundle: this plan, AC1 through AC8, ADR 0001, package boundary, T010 trace evidence, and final diff summary.

Agent role or capability: independent senior engineering reviewer.

Allowed actions: inspect and report findings only; no edits, installs, commits, pushes, or merge actions.

Verification evidence: severity-ordered findings with file references and a strict `PASS` or `REVISE` verdict.

Handoff format: finding, impact, evidence, required correction, and verdict.

Stop conditions: scope outside V9 or any request to change repository state.

### Work Unit C: Closure And Approval Preparation

Objective: integrate review, freeze final evidence, update durable memory, complete the V9 milestone, and prepare the owner decision.

Scope boundary: V9 spec, tasks, test plan, implementation notes, review, milestone, changelog, and memory files.

Likely files or docs: `docs/specs/v9-devrail-kernel/`, `docs/milestones/v9.md`, `CHANGELOG.md`, and `docs/memory/`.

Dependencies: Work Units A and B passing with no unresolved high- or medium-severity finding.

Conflict zones: all closeout files; integration owner only.

Context bundle: final commands, exact CI run, review verdict, package evidence, and residual-risk inventory.

Agent role or capability: integration and memory owner.

Allowed actions: record only observed evidence, commit and push the version branch, and present the merge gate.

Verification evidence: all criteria and T011 checked, milestone complete, memory provenance current, clean branch, and exact green branch CI.

Handoff format: milestone overview, source and target branches, commits, CI URL, risks, and required owner decision.

Stop conditions: unresolved findings, red CI, incomplete evidence, branch drift, or any merge without owner approval.

## Fan-Out Plan

- Work Unit A starts immediately under the integration owner.
- Work Unit B starts only after the implementation and local evidence are stable.
- Work Unit C waits for the review verdict and any remediation.
- Only the integration owner may edit shared files.

## Fan-In Plan

- Integration owner: primary IDE agent.
- Merge order: package gate, review remediation, final evidence, memory, milestone.
- Conflict resolution: re-read current files and preserve unrelated user changes.
- Integrated verification: template checker, checker regressions, canonical kernel gate, package-consumer gate, and branch CI.
- Review owner: one independent read-only reviewer.

## Verification Matrix

| Work Unit | Local Evidence | Integrated Evidence |
| --- | --- | --- |
| A | Packed consumer executes init, validate, and inspect from isolated `node_modules` | `npm.cmd run verify` across six Node/platform jobs |
| B | Referenced `PASS` or remediated `REVISE` | Final review has no unresolved actionable finding |
| C | Feature package, milestone, and memory provenance agree | Exact branch commit has seven green CI jobs and remains unmerged |

## Stop Or Redesign Triggers

- A packed consumer resolves repository-local source instead of the installed artifact.
- Offline installation cannot use the dependency cache warmed by the canonical install.
- Cleanup ownership cannot be rechecked.
- An acceptance criterion lacks direct evidence.
- A reviewer finds an unresolved correctness or honesty issue.
- Branch CI differs from local evidence.

## Memory Updates

- History ledger: record V9 only after exact branch CI is green.
- Retrieval index: link the final plan, run, review, milestone, and package gate.
- Decisions: preserve private repo-only identity and distribution boundaries; add only a new durable decision.
- Known issues: retain license, single-observation timing, external liveness, and any surviving package limitation.
- Patterns: promote a clean-consumer gate only if the implementation proves reusable.
