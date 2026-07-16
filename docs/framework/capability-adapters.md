# Capability Adapters

## Purpose

Capability adapters let SWECircuit factor in useful external project patterns without installing the external project by default. They describe a capability class, when to use it, what evidence it must produce, and which optional tools could implement it later.

Use this file when a tool is more than a generic dependency but less than a required runtime. The capability becomes part of SWECircuit as a contract first; the tool remains optional until adapter evaluation and user approval.

Capability adapter is the umbrella term. A policy-compiler adapter may implement SWECircuit-owned planning by emitting portable contracts; an execution adapter connects assigned packets to an IDE, model, provider, worker, or process and owns only those provider-specific side effects.

## Capability Classes

| Capability Class | Purpose | Inspired By | SWECircuit Home |
| --- | --- | --- | --- |
| Skills-driven development transition | Move from idea to design to implementation through triggered skills and readable checkpoints. | Superpowers | Handbook stages, feature package, IDE interaction, standalone agent module |
| Specialist/orchestration compiler | Compare bounded decomposition candidates and synthesize task-specific AgentBlueprints, handoffs, critical path, and integration plan from repository context. | SWECircuit contract; Astraeus implementation option | `docs/modules/specialist-agent-compiler.md`, V11 Plan, decomposition and run records |
| Provider executor bridge | Map one frozen packet, invocation grant, and abort signal to a trusted host runtime. | Codex subagents, MCP Tasks, A2A, agent SDK hooks | Bounded executor boundary, AdapterManifest, ADR 0002 |

## Skills-Driven Development Transition

This capability helps the IDE agent avoid jumping from a vague idea straight into code. It turns the design-to-implementation bridge into a sequence of small readable checkpoints.

Use it when:

- The user has an idea but not a crisp spec.
- The agent needs to ask what the user is really trying to do.
- Design must be shown in chunks the user can review.
- Implementation needs a plan clear enough for another agent or junior engineer to follow.
- Test-first or red-green development would reduce risk.
- A subagent-driven implementation phase is ready after user approval.

SWECircuit contract:

1. Clarify the user goal before implementation.
2. Produce a readable spec with acceptance criteria.
3. Get approval or record assumptions before planning.
4. Produce an implementation plan with verification mapping.
5. Prefer small testable tasks and YAGNI scope control.
6. Start implementation only after the user or feature package gives the go-ahead.
7. Use subagents only after decomposition readiness is met.
8. Review and update memory before closing.

Failure routes:

- If the user cannot approve the design, emit `clarify`.
- If the plan reveals architectural mismatch, emit `redesign`.
- If implementation work can be split, emit `split`.
- If failures recur, emit `diagnose`.

## Orchestration Compiler

This capability implements SWECircuit-owned portable specialist compilation. The semantic layer compares a serial baseline with legal candidate decompositions; the core `compileAgentBlueprints` operation then validates standard AgentBlueprintIntent and emits exact supply-free AgentBlueprint, evidence-binding, structural-measurement, decomposition, handoff, gate, and integration contracts. A role label alone is never a specialist contract.

An orchestration compiler is a policy-compiler adapter, not an IDE, model, or provider execution adapter. It may propose or materialize a plan under SWECircuit's contracts, but it does not redefine workflow semantics. Execution adapters receive the resulting assigned packets and perform provider-specific side effects.

Use it when:

- The goal is too broad for one agent but can be decomposed.
- Several independently verifiable task-shaped specialists may be useful.
- Alternatives should be explored in parallel.
- A critic and synthesizer path would improve quality.
- Existing generic agents or skill packs need project-specific roles.
- The project needs a repeatable agent roster for a class of work.

SWECircuit contract:

1. Retrieve README, handbook, active spec, architecture notes, memory, and likely code areas.
2. Generate role-specific work units with objectives, scope boundaries, context bundles, permissions, and stop conditions.
3. Keep direct editing disabled by default unless explicitly approved.
4. Define branch, path, and commit policy before write access.
5. Add critic and synthesizer responsibilities before fan-in.
6. Require all workers to return evidence, risks, and handoff notes.
7. Let the integration owner merge results and run integrated verification.
8. Preserve the orchestration run record for future reuse.

Failure routes:

- If repository context is insufficient, emit `clarify` or `block`.
- If work units share conflict zones, emit `redesign` before fan-out.
- If worker findings conflict, route to critic and synthesizer before implementation.
- If tool permissions are unclear, emit `block`.

## Provider Executor Bridge

This capability connects SWECircuit's local execution port to a real IDE, agent runtime, remote protocol, container, or hosted worker without making that provider part of core.

Use it when:

- A host needs to execute a validated WorkPacket through a real specialized agent.
- The host can enforce permissions and isolate the worker.
- Provider lifecycle and cancellation can map honestly to the SWECircuit result states.
- Returned provider content can be reduced to a closed settlement and bounded evidence references.
- The adapter has passed evaluation and the user has approved installation or use.

SWECircuit contract:

1. Keep executable code host-injected; never load it from AdapterManifest content.
2. Check each invocation request against a closed ExecutionGrant and matching executor identity. Invocation-scoped describes checked identity and permission assertions only. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.
3. Enforce the grant in host-owned tools, credentials, workspace, and network controls.
4. After invocation, claim terminal cancellation or timeout only after in-window executor promise settlement when all activity capable of advancing the invocation or producing invocation effects has stopped; transfer of live work is not acknowledgment. Before invocation, preserve the kernel no-call terminal path.
5. Return only completed or failed settlement data; keep prompts, transcripts, logs, and raw exceptions out of the journal.
6. Treat abort_unconfirmed as potentially live work and prevent its output from entering integration.
7. Persist returned events only in caller-owned storage after privacy checks.
8. Keep retry, merge, and memory mutation in separate reviewed policies.

Failure routes:

- If required authority cannot be enforced, emit block before invocation.
- If provider cancellation is not observable, preserve abort_unconfirmed.
- If provider output cannot fit the closed settlement, emit failed with an invalid-result classification.
- If remote protocol state cannot map without losing meaning, redesign the adapter rather than weakening core states.

See the [bounded executor boundary](executor-boundary.md) for the executable contract.
## Safety Defaults

- File-based contracts come first.
- Read-only research and planning come before write access.
- Direct edits require explicit scope, allowed paths, branch policy, and verification.
- Every agent gets a stop condition.
- Every parallel run has one integration owner.
- Critic and synthesis happen before merge.
- Source evidence is preserved before memory summaries.

## Adapter Mapping

| External Project | Capability To Extract | Optional Runtime Role | Default SWECircuit Decision |
| --- | --- | --- | --- |
| Superpowers | Triggered skills for brainstorming, spec, planning, TDD, implementation, review, and branch completion. | Optional skills/plugin adapter. | Extract methodology now; install only after adapter evaluation. |
| Astraeus | Repository-aware agent synthesis, branching and parallel execution, critic and synthesizer chain, continuity, least-privilege permissions. | Optional policy-compiler implementation of SWECircuit's portable orchestration contracts. | Extract orchestration contract now; install only after adapter evaluation. |

## Promotion Path

```txt
source scan -> capability contract -> module registry -> practice register -> handbook link -> checker or review gate -> dogfood
```

## Review Questions

- Does the capability reduce a real failure mode?
- Can a new user understand when to use it?
- Does it preserve goal-to-evidence traceability?
- Does it keep the simple path simple?
- Does it improve single-agent work before scaling to many agents?
- Does it make multi-agent work safer through contracts and fan-in?
