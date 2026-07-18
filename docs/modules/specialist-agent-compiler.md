# Specialist Agent Compiler

## Status

Core module contract for `swecircuit/specialist/v1alpha1`. Exact technical acceptance, branch, and merge status is maintained in `docs/milestones/v11.md`.

The property-level normative contract is `docs/specs/v11-specialist-compiler/specialist-compiler-contract.md`. The human entrypoint is `docs/ide/specialist-agent-kickoff.md`.

## Purpose

Turn one reviewed software `GoalContract` with atomic semantic work units into the best eligible partition in the evaluated candidate set under a fixed deterministic objective, then compile one exact `AgentBlueprint` per selected group.

```txt
reviewed GoalContract + optional proposed groupings
  | specialist_agent_compiler
  -> authority projection
  -> serial baseline + internally constructed candidate teams
  -> deterministic selection or no-eligible candidate analysis
  -> exact AgentBlueprintCompilation
  -> compilation.json + provider-neutral package values
  -> two-digest package verification
  -> closed raw handoff verification
  -> dependency-complete fan-in assessment
```

A blueprint is task demand. It is not a role label, persona, model preset, provider configuration, executable grant, or runtime assignment.

## When To Use

- A reviewed goal has two or more possible ownership groupings.
- Independent verification or review may require separate specialists.
- Parallel work must be compared with a strong serial baseline.
- An IDE or host needs exact portable agent contracts before choosing a runtime.
- Context, authority, evidence, handoff, and stop boundaries must be inspectable before launch.

## When Not To Use

- Product intent, acceptance criteria, or authority still needs a user decision.
- Atomic semantic work units have not been defined and reviewed.
- The caller wants core to choose a provider/model or run agents.
- A tiny task is already safely handled through the normal single-agent path and no compiled launch package is needed.

## Semantic Boundary

The IDE or human owns clarification and atomic semantic decomposition. Each work unit must already state its objective, Module action and ports, dependencies, context uses, scopes, capabilities, permissions, evidence duties, handoff artifacts, and stop conditions.

Core optimizes grouping only. It may combine fixed work units into a specialist; it never splits a work unit, invents a hidden requirement, changes acceptance policy, expands authority, or supplies runtime identity.

## Input

One closed `SpecialistCompilationRequest` containing:

- `apiVersion: swecircuit/specialist/v1alpha1`;
- `kind: SpecialistCompilationRequest`;
- one reviewed `GoalContract`; and
- optional proposed candidate partitions.

The goal supplies:

- stable objective, revision, integration owner, and acceptance criteria;
- digest-bound `assumptions` and `unresolvedDecisions`; any decision marked blocking fails clarification before candidate construction;
- globally unique evidence requirements with exact work-unit ownership;
- declared context source locators, expected SHA-256 digests, byte counts, allowed work units, and repository read scopes where applicable;
- owner-approved Modules and capabilities;
- permission, agent, and concurrency ceilings plus forbidden effects;
- relative work, agent-start, and handoff planning costs; and
- one to 64 atomic work units.

Repository locators are parsed after `path:` and before any fragment; leading, empty, `.`, and `..` path segments are rejected. `SpecialistPermissionKind` is the exact union `filesystem.read | filesystem.write | network.connect | process.spawn | secrets.read`. Filesystem permission scopes for each work unit must exactly equal its declared read/write scope sets, and all demand must remain under the owner ceiling. Permission data is declarative demand, not a grant or enforcement mechanism.

No input record accepts `role`, runtime profile, provider, model, prompt, executor, credential, grant, or host-capacity data.

## Action

1. Detach and bound the JSON input; reject malformed text, excess limits, control characters, lone surrogates, and high-confidence secrets.
2. Validate closed shapes, unique identities, references, assumptions, unresolved decisions, parsed repository locators, the work-unit DAG, Module consistency, context bindings, exact permission demand, authority ceilings, and complete evidence ownership. A blocking decision returns no candidate set.
3. Normalize semantically unordered arrays and proposed partitions.
4. Derive the supply-free `TaskAuthorityProjection` from the goal. The caller does not supply this projection to compilation.
5. Always construct and evaluate the one-agent serial baseline.
6. For eight or fewer work units, enumerate every canonical partition allowed by `maxAgents` and emit `search.claim: exhaustive_partition_search_fixed_scheduler`.
7. For nine or more work units, construct the deterministic bounded set and emit `search.claim: bounded_evaluated_set_no_global_optimum`; include weight-balanced counts, Module groups, dependency levels, evidence-duty classes, primary scope groups, and supplied proposals.
8. Reject candidate partitions with excess agents, missing/duplicate/unknown work units, a group-induced agent dependency cycle, or violated producer/checker independence.
9. Compute a deterministic conflict-aware projected schedule under `maxConcurrency`, exact scope intersections, startup cost, and cross-agent handoff cost.
10. Rank eligible candidates by the fixed comparator and select the first. If no candidate is eligible, compilation returns `SC4306`; `analyzeSpecialistCandidates` returns the bounded serial, proposal, rejection, search, and alternative evidence without creating a launchable roster.
11. Compile exact immutable blueprints, projected launch waves, search evidence, a machine-readable `selectionReason`, alternatives, and content digests.
12. Render `compilation.json` and deterministic package files; verify a received package only against trusted expected compilation and package digests.
13. Verify exact raw `SpecialistAgentHandoff` bytes against the approved package and blueprint, then assess the complete transitive dependency handoff set before integration.

Exact search applies only through eight work units. Larger search is bounded and must never be described as globally optimal. Exact mode proves exhaustive grouping only for the reviewed fixed work units under `maxAgents`; it does not prove that the human decomposition is semantically optimal.

## Hard Gates

Before selection, the module requires:

- closed valid input with no launch-sensitive unknown fields;
- one acyclic, semantically reviewed work-unit graph;
- complete criterion producer coverage and exactly one owner for every evidence requirement;
- all Modules, capabilities, context uses, scopes, and permissions within owner declarations;
- exact context-use authorization and repository read-scope coverage;
- every work unit owned exactly once in an eligible candidate;
- an acyclic derived agent graph; and
- every requested independent verifier or reviewer outside the corresponding producer agent.

Correctness, authority, evidence coverage, and independence are eligibility gates, not optimization scores.

## Deterministic Objective

Eligible candidates are compared lexicographically by:

1. lower projected makespan;
2. fewer conflict pairs;
3. fewer cross-agent dependency handoffs;
4. fewer duplicated context bytes;
5. fewer duplicated permission scopes;
6. fewer agents; and
7. canonical partition identity.

The projected schedule uses relative planning units. Exact write/write, write/read, read/write, and shared conflict-zone intersections prevent overlap; read/read overlap is allowed. Scope keys are owner-reviewed exact keys, not inferred path or glob semantics.

More agents win only through an earlier comparator or required evidence independence. The serial baseline remains visible even when ineligible. At most eight ranked alternatives are retained.

## Output

A successful `AgentBlueprintCompilation` contains:

- the normalized GoalContract, including assumptions and unresolved decisions, and its goal digest;
- normalized supplied proposals;
- every proposal-associated evaluation, including rejected supplied groupings;
- derived `TaskAuthorityProjection`;
- exact or bounded search mode, exact `search.claim`, counts, retained count, and evaluation-set digest;
- serial baseline, selected candidate, machine-readable `selectionReason`, and retained alternatives;
- selected candidate metrics and projected schedule;
- one exact `AgentBlueprint` per selected group;
- projected launch waves; and
- one compilation content digest.

Each blueprint binds:

- goal and selected-candidate identity;
- exact work-unit ownership and objectives;
- exact Module actions and ports;
- cross-agent dependencies;
- purpose-bound context locators, expected digests, bytes, and work-unit uses;
- the union of only its work units' capabilities, scopes, permissions, and all goal forbidden effects;
- exact evidence duties and requested independence;
- handoff destination, artifacts, and required fields; and
- stop conditions plus blueprint digest.

`analyzeSpecialistCandidates` returns either a selected candidate analysis or `selectionStatus: no_eligible_candidate` with null selection fields. Analysis output is evidence for correction and cannot be rendered or launched.

`renderSpecialistPackage` returns `compilation.json`, `manifest.json`, `integration.md`, one Markdown contract per blueprint, exact file metadata, and a root `packageDigest`. Each agent contract includes the complete blueprint plus a concrete closed `SpecialistAgentHandoff` example with exact bindings and verifier-valid nested shapes. Artifact content remains a string even for JSON, and evidence entries include the required `status` and artifact name. The manifest binds the compilation, agent, and integration files by path, digest, and byte count. `verifySpecialistPackage` reconstructs and rerenders the package, requires canonical equality, and checks trusted expected `compilationDigest` and `packageDigest` values. Those expectations must be preserved outside the package.

`verifySpecialistHandoff` binds exact raw bytes to the approved package, goal, blueprint, work, artifact set, deterministic artifact media, normalized-LF control policy, and evidence duties. It rejects media substitution plus TAB, CR, CRLF, and other unsafe controls before returning verified evidence. `assessSpecialistHandoffs` derives a target blueprint's transitive dependency closure and returns `integrationReady: true` only for one valid `pass` handoff from every exact dependency. Neither operation performs I/O, launches work, persists evidence, or merges changes.

## Gate

Emit `pass` only when:

- GoalContract semantic review is recorded;
- compilation returns `ok: true` with a non-null value;
- search mode and optimization limitations are presented honestly;
- the serial baseline and selected roster are reviewable;
- every selected blueprint is complete and task-shaped;
- rendering includes `compilation.json` and returns a root package digest;
- approval outside the package binds the exact compilation and package digests;
- `verifySpecialistPackage` passes against both trusted expectations; and
- any external launcher accepts the host responsibilities below, including exact raw-handoff preservation, approval-bound verification, and dependency fan-in gating.

## Outcome

| Outcome | Condition |
| --- | --- |
| `pass` | A reviewed compilation or rendered package is ready for an external host. |
| `fix` | Closed input, reference, evidence ownership, or candidate proposal has a known correction. |
| `clarify` | Product intent, acceptance, context, authority, or verification remains unresolved. |
| `redesign` | Work units, Modules, dependencies, independence, or integration cannot form an eligible sound team. |
| `split` | The goal or declared context exceeds a coherent or resource-bounded contract. |
| `block` | A secret, unsafe authority request, digest mismatch, or required approval prevents launch. |
| `diagnose` | An internal or recurring deterministic failure lacks a confirmed cause. |

## External Host Boundary

The V11 module constructs demand and package values, verifies closed raw handoffs, and assesses dependency fan-in. An external IDE or agent host chooses provider, model, prompts, credentials, actual scheduling, process control, workspace isolation, and persistence. It must verify delivered context, enforce actual permissions and dependency readiness, preserve exact raw handoff bytes, run `verifySpecialistHandoff` and `assessSpecialistHandoffs`, and own integrated verification and review.

Handoff verification proves identity and closure, not success. A valid handoff may route `fix`, `diagnose`, `clarify`, `redesign`, `split`, `block`, or `learn`; only a complete dependency set whose canonical outcomes are all `pass` is integration-ready.

The host may translate a blueprint into transient runtime instructions. It must verify the package against both approved digests before launch. It must not widen authority, add work, omit evidence, weaken stop conditions, or change handoffs while claiming either digest. Any semantic or package change requires recompilation, rerendering, reverification, and new approval.

Projected `launchWaves` are deterministic planning output, not dispatch, reservation, isolation, or completion evidence.

## V11 Non-Capabilities

V11 does not execute agents, enforce a sandbox, merge changes, or update memory. It also does not select providers/models, manage credentials, reserve capacity, dispatch work, retry or recover processes, persist a trace, or decide merge readiness.

The deferred universal runtime artifacts under `docs/specs/v11-orchestration-planner/` are historical and future design evidence. They are not active inputs, outputs, or guarantees of this module.

## Artifacts

- Reviewed GoalContract and assumption record.
- Optional proposed candidate partitions.
- TaskAuthorityProjection.
- AgentBlueprintCompilation with serial, selected, alternatives, search evidence, and digests.
- RenderedSpecialistPackage file values.
- External approval record containing trusted expected compilation and package digests, plus successful package-verification evidence.
- Exact raw `SpecialistAgentHandoff` bytes plus `VerifiedSpecialistHandoff` and `SpecialistHandoffSetAssessment` values when external execution runs.
- External integration, verification, review, merge, and memory evidence when later stages run.

## Adapter

This module is built into SWECircuit and requires no external orchestration framework. IDE and runtime adapters may implement the human synthesis and external launch sides. Adapters cannot redefine the compiler schema, comparator, authority, evidence, handoff, digest, or host boundary.

## Stage Hooks

| Workflow Stage | Module Behavior |
| --- | --- |
| Clarify | Resolve decisions that would change the GoalContract. |
| Spec | Define acceptance criteria and evidence requirements. |
| Architecture check | Confirm Module, authority, provider-neutral, and external-host boundaries. |
| Task plan | Create and review atomic work units; then compile candidate groupings. |
| Implement | External hosts materialize only the reviewed blueprints. |
| Verify | Check compiler determinism, package bindings, specialist evidence, and integrated behavior. |
| Review | Compare serial and selected candidates, blueprint closure, bounded-search honesty, and exact digest bindings. |
| Memory update | External workflow records durable learning after review; the compiler does not mutate memory. |

## Verification

- Small-goal canonical partition counts and logical permutation invariance.
- Above-eight bounded candidate-source and no-global-optimum checks.
- One-agent-optimal, genuinely parallel, under-split, over-split, conflict-heavy, and generic-role golden cases.
- Closed-shape, authority, context, permission, evidence, cycle, limit, privacy, and digest-substitution failures.
- Candidate-analysis selected/no-eligible equivalence, strict handoff schema, stale identity, incomplete evidence, raw-byte binding, proxy/accessor rejection, and transitive fan-in failures.
- Blueprint completeness and absence of runtime/provider fields.
- Renderer reconstruction, `compilation.json`, stable bytes, dynamic-fence containment, package-root binding, coordinated-tamper rejection, and two-digest verification.
- Template checker, canonical kernel verification, packed-consumer validation, dogfood, and independent review before V11 acceptance.

## Rollback

The compiler family is additive. If V11 fails its acceptance gate, remove the specialist-specific exports and implementation while preserving ADR 0004, the feature package, failed runtime-review evidence, and this contract as source history. No runtime state, merge, or memory data requires migration because V11 creates none.
