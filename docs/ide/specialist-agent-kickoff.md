# Specialist Agent Kickoff

## Status

V11 reference IDE capability for `swecircuit/specialist/v1alpha1`. The pure compiler, renderer, and package verifier exist; V11 acceptance, dogfood, repeat independent review, and owner approval remain open.

The normative machine and responsibility contract is `docs/specs/v11-specialist-compiler/specialist-compiler-contract.md`.

## Purpose

Make one user message visibly become a reviewed `GoalContract`, an internally constructed and deterministically selected specialist team, exact `AgentBlueprints`, and a digest-bound package that an external host can launch.

```txt
user message + repository context
  | IDE/human clarify and decompose
  -> reviewed GoalContract with atomic work units
  | compileAgentBlueprints
  -> serial baseline + constructed candidates + deterministic selection
  -> exact AgentBlueprintCompilation
  | visible roster review
  | renderSpecialistPackage
  -> compilation.json + contracts + packageDigest
  | verifySpecialistPackage(expected digests)
  -> two-digest launch approval
  | external IDE or agent host
  -> actual agent execution and later workflow stages
```

The free-form message is semantic input, not canonical compiler input. The IDE constructs the closed JSON contract and keeps product judgment visible. Core optimizes only how reviewed atomic work units are grouped.

## One-Message Rule

A clear, bounded request MAY complete synthesis and compilation from the original message without ceremonial questions. The IDE MUST still put assumptions and unresolved decisions into the reviewed `GoalContract`, show the search claim and selection reason, render and verify the package, and obtain any launch approval required by repository policy.

Ask one focused question when a decision could change product behavior, public API, architecture, authority, security, destructive effects, acceptance evidence, or verification. Record it with `blocking: true`, emit `clarify`, and do not compile. A low-risk open decision may use `blocking: false` only with a named owner and explicit proceed rationale.

## Inputs

- The user's goal in the active conversation.
- Repository instructions, README, handbook, active feature package, relevant ADRs, and durable memory.
- Owner-approved Module definitions and the applicable Circuit shape.
- Exact context-source metadata and expected digests.
- Owner authority, capability, agent, and concurrency ceilings.
- A host policy stating who may approve an external launch.

Runtime availability, provider identity, model identity, prompts, credentials, and workspace mechanisms are not compiler inputs.

## Visible Kickoff

### 1. Announce The Workflow

Start with the normal IDE banner:

```txt
Workflow: V11 Specialist Compiler
Branch: <active branch>
Stage: intake -> clarify
Active artifact: <feature package>/goal-synthesis.md
Next: synthesize and review the GoalContract
Assumptions: <none or concise recorded assumptions>
```

### 2. Synthesize Atomic Semantic Work

The IDE or human MUST:

1. restate one goal and stable acceptance criteria;
2. define explicit produce, verify, and review evidence requirements;
3. choose existing owner-approved Modules and exact actions and ports;
4. decompose the work into atomic semantic work units;
5. declare dependencies, context uses, scopes, capabilities, permissions, evidence ownership, handoff artifacts, and stop conditions for every unit;
6. declare the integration owner, forbidden effects, agent and concurrency ceilings, and relative planning costs;
7. encode every low-risk assumption as `{ id, statement, rationale }`; and
8. encode every open decision as `{ id, question, owner, blocking, proceedRationale }`.

Atomic decomposition is not a compiler heuristic. Core may combine work units into one specialist, but it never discovers hidden requirements, creates work units, or splits one semantic responsibility into smaller tasks.

For repository context, parse the portion after `path:` and before `#` into slash-delimited segments. Reject leading or empty segments, backslashes, and any segment exactly `.` or `..`. Permission demand uses only `filesystem.read`, `filesystem.write`, `network.connect`, `process.spawn`, and `secrets.read`.

### 3. Review The GoalContract

Show a compact review before compilation:

```txt
GoalContract review: pass | clarify | redesign | block
Goal: <id>@<revision> - <objective>
Criteria: <count>; evidence duties: <produce>/<verify>/<review>
Atomic work units: <count>; dependency roots: <ids>
Context: <source count and declared bytes>
Authority: modules=<count>, capabilities=<count>, maxAgents=<n>, maxConcurrency=<n>
Assumptions: <ids and concise statements, or none>
Open decisions: <ids, owners, blocking flags, and proceed rationales, or none>
```

Review semantic completeness, not just schema validity. Every evidence requirement needs exactly one work-unit owner. Requested independent verification or review must be separable from its producer. Assumptions and decisions are digest-bound canonical data, not side notes.

If any decision is blocking, emit `clarify` and stop before compilation. Record the reviewed JSON in active feature evidence. Resolving an assumption or decision changes the contract and requires a revised goal, recompilation, rerendering, and new approval.

### 4. Compile

Use the public request exactly as implemented:

```ts
const result = compileAgentBlueprints({
  apiVersion: SPECIALIST_API_VERSION,
  kind: "SpecialistCompilationRequest",
  goal,
  proposedCandidates,
});
```

`proposedCandidates` is optional. It may express human- or IDE-suggested groupings, but labels and ordering do not influence selection. Do not add an `options`, `role`, profile, provider, model, prompt, executor, grant, credential, or runtime field.

When `result.ok` is false or `result.value` is null, show the stable diagnostics and route to `fix`, `clarify`, `redesign`, `split`, `block`, or `diagnose`. Do not launch from a partial or failed result.

### 5. Present The Deterministic Roster

Show:

- `search.mode`, exact `search.claim`, work-unit count, candidate counts, and evaluation-set digest;
- every supplied proposal evaluation and rejection code;
- serial baseline eligibility, partition, metrics, and rejection codes;
- selected partition, projected schedule, and metrics;
- the complete machine-readable `selectionReason`;
- each blueprint's exact work, Modules, dependencies, context, authority, evidence, handoff, and stop conditions; and
- the compilation `contentDigest`.

Use this compact shape:

```txt
Specialist compilation: pass
Search: mode=<exact|bounded>; claim=<exact claim>; workUnits=<n>; evaluated=<n>; eligible=<n>
Serial: agents=<n>; makespan=<n>; conflicts=<n>; handoffs=<n>; eligible=<bool>
Selected: <candidate id>; agents=<n>; makespan=<n>; conflicts=<n>; handoffs=<n>
Decision: kind=<kind>; field=<decisiveField>; selected=<value>; serial=<value>
Alternatives retained: <n>
Compilation: sha256:<digest>
Next: review the exact compilation, then render and verify the package
```

Through eight work units the claim is `exhaustive_partition_search_fixed_scheduler`: every partition allowed by `maxAgents` is evaluated under the fixed scheduler. Above eight it is `bounded_evaluated_set_no_global_optimum`; never imply a global optimum. Planning weights and projected waves are deterministic relative values, not wall-clock durations, capacity reservations, or dispatch evidence.

### 6. Review The Compilation

Before rendering, review:

- goal ID, revision, `goalDigest`, assumptions, and unresolved decisions;
- `search.mode`, `search.claim`, serial baseline, selected candidate, and `selectionReason`;
- every blueprint ID, digest, work boundary, context, authority, evidence, handoff, and stop condition; and
- compilation `contentDigest`.

This is roster review, not yet launch approval. Any changed goal, proposal, candidate, or blueprint requires recompilation and a new review.

### 7. Render, Verify, Approve, And Hand Off

Render the reviewed compilation:

```ts
const rendered = renderSpecialistPackage(compilation);
```

Continue only when the result succeeds with a non-null value. The package contains:

- `compilation.json`;
- `manifest.json`;
- `integration.md`; and
- one agent contract referenced by each `manifest.agents[].contractFile` binding.

Present the returned `compilationDigest`, root `packageDigest`, and file metadata. The manifest binds `compilation.json`, every agent contract, and the integration contract by path, digest, and byte count.

Record launch approval outside the package with both exact digests. Then verify the package against those trusted expectations:

```ts
const verified = verifySpecialistPackage(rendered.value, {
  compilationDigest: approvedCompilationDigest,
  packageDigest: approvedPackageDigest,
});
```

Continue only when verification succeeds with a non-null value. Verification reconstructs the compilation from `compilation.json`, rerenders the package, requires canonical equality, and checks both expected digests. Copying expectations only from the package being checked is not approval.

Resolve each exact agent contract through the verified manifest before handing it to a host:

```ts
const packageValue = verified.value;
const contractsByWave = packageValue.manifest.launchWaves.map((wave) => ({
  start: wave.start,
  contracts: wave.agentIds.map((agentId) => {
    const binding = packageValue.manifest.agents.find((agent) => agent.agentId === agentId);
    const file = binding
      ? packageValue.files.find((candidate) => candidate.path === binding.contractFile)
      : undefined;
    if (!binding || !file || file.digest !== binding.contractDigest || file.bytes !== binding.contractBytes) {
      throw new Error(`Unresolved agent contract: ${agentId}`);
    }
    return file;
  }),
}));
```

Treat `launchWaves[].agentIds`, `manifest.agents[].agentId`, and `contractFile` as opaque manifest data. Never construct a filename such as `agents/${agentId}.md`, manually copy an agent ID or filename from displayed compilation output, or infer either value from naming conventions. A missing or mismatched manifest binding emits `block`; it is not repaired by guesswork.

Hand the verified package to an external IDE or agent host. The host chooses provider, model, transient prompt translation, credentials, isolation, actual scheduling, and persistence. It may not add work, widen authority, omit evidence, weaken stop conditions, or change handoffs while claiming either approved digest.

### 8. Integrate Through The External Workflow

The external host and integration owner MUST:

1. verify delivered context bytes against each declared digest and byte count;
2. enforce actual dependency readiness, permissions, and workspace isolation;
3. preserve each raw handoff and all required fields;
4. ensure independent evidence is not approved by its producer agent;
5. run integrated feature verification and review; and
6. perform merge and durable memory updates only through their separately governed stages.

These are host/workflow duties. A successful V11 compilation or render does not prove that any agent ran, any sandbox held, any change merged, or any memory was updated.

## Gate

The kickoff emits `pass` only when:

- the GoalContract passes semantic and machine validation with no blocking unresolved decision;
- assumptions and non-blocking decisions are visible and digest-bound;
- serial baseline, selected roster, exact `search.claim`, and `selectionReason` are visible;
- every blueprint is exact and task-shaped;
- the rendered package includes `compilation.json`;
- launch approval outside the package binds both `compilationDigest` and `packageDigest`;
- `verifySpecialistPackage` passes against those trusted expectations; and
- the external host accepts responsibility for all runtime effects.

Route to:

| Condition | Outcome |
| --- | --- |
| A blocking product, API, architecture, authority, security, destructive, acceptance, or verification decision remains | `clarify` |
| Work units, Modules, dependencies, or integration cannot form a sound goal | `redesign` |
| The goal exceeds a coherent contract or resource limit | `split` |
| A secret, unsafe authority request, digest mismatch, untrusted expectation, or unavailable required approval exists | `block` |
| A repeated or internal compiler failure lacks a known cause | `diagnose` |
| Contract, compilation, two-digest approval, package verification, and external handoff are complete | `pass` |

## Evidence

- Reviewed GoalContract with digest-bound assumptions and unresolved decisions.
- Compiler diagnostics or successful `AgentBlueprintCompilation`.
- Exact `search.claim`, serial-versus-selected comparison, and `selectionReason`.
- `compilation.json`, manifest, integration contract, and agent contracts.
- Approval record outside the package containing trusted expected `compilationDigest` and `packageDigest`.
- Successful `verifySpecialistPackage` result against both expectations.
- Later launch, handoff, integration, verification, review, merge, and memory evidence owned by the external workflow.

## V11 Boundary

V11 constructs and renders exact task demand. It does not execute agents, enforce a sandbox, merge changes, or update memory. It also does not select providers/models, manage credentials, reserve runtime capacity, dispatch projected waves, retry work, persist traces, or recover processes. Do not describe the V11 kickoff as a universal runtime.

## Adapter Boundary

Codex, Claude Code, Cursor, Copilot, CI systems, local runtimes, and other hosts MAY implement this kickoff. An adapter is conforming only when it preserves the reviewed GoalContract, exact compiler result, `compilation.json`, blueprint boundaries, both approved digests, and package verification. Runtime translation remains external and cannot redefine compiler semantics.
