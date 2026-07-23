# V11 Specialist Compiler Contract

## Status

Normative documentation for `swecircuit/specialist/v1alpha1`. Exact technical acceptance, branch, and merge status is maintained in `docs/milestones/v11.md`.

This contract describes `swecircuit/specialist/v1alpha1`. The JSON Schema and exported TypeScript types define closed data shapes; this file defines the human, compiler, and external-host obligations around those shapes. `MUST`, `MUST NOT`, `SHOULD`, and `MAY` are normative.

## Purpose

Turn one clarified software goal into a deterministic, reviewable team of exact task-shaped specialists without choosing or running an agent runtime.

```txt
one user message
  | IDE/human clarification, acceptance design, and atomic decomposition
  -> reviewed GoalContract
  | analyzeSpecialistCandidates + compileAgentBlueprints
  -> serial baseline + internally constructed candidate teams
  -> deterministic selection or explicit no-eligible analysis
  -> exact AgentBlueprintCompilation
  | human/IDE roster review
  | renderSpecialistPackage
  -> compilation.json + contracts + packageDigest
  | verifySpecialistPackage(expected compilationDigest + packageDigest)
  -> approval-bound provider-neutral launch package
  | external IDE or agent host
  -> execution + raw SpecialistAgentHandoffs
  | verifySpecialistHandoff + assessSpecialistHandoffs
  -> identity-bound evidence + dependency-complete fan-in
  | external integration, review, merge, and memory stages
```

## Responsibility Boundary

| Actor | Owns | Does Not Delegate To V11 Core |
| --- | --- | --- |
| IDE or human | Clarification, product intent, acceptance criteria, atomic semantic work decomposition, context declarations, owner ceilings, planning weights, digest-bound assumptions and decisions, and review | Inventing unresolved requirements or asking core to discover hidden work units |
| Specialist Compiler core | Closed-input validation, normalization, authority projection, legal grouping, candidate analysis, deterministic selection, exact blueprint compilation, package reconstruction, raw-handoff verification, dependency fan-in assessment, digesting, and returned values | Provider choice, model choice, prompt authoring, credentials, execution, runtime capacity, workspace isolation, permission enforcement, persistence, retry, merge, or memory mutation |
| External host and integration owner | Trusted approval of both package digests, package verification, runtime translation, context delivery, scheduling, isolation, preservation of exact raw handoff bytes, handoff verification, fan-in gating, integration, merge, and memory updates | Trusting digests only from a received package, accepting prose as evidence, or changing reviewed demand while claiming the approved digests |

Atomic semantic work decomposition is IDE/human work. A work unit is atomic when its objective, acceptance duties, authority, context, dependencies, handoff, and stop boundary are stable enough to review as one semantic responsibility. Core MAY group atomic work units into one specialist; core MUST NOT split a work unit or invent another one.

## Public Operations

All seven operations bound and detach untrusted data at their public boundaries, return `OperationResult<T>`, and report stable diagnostics. A caller MUST continue only when `ok` is true and `value` is non-null.

| Operation | Input | Successful Value | Effect Boundary |
| --- | --- | --- | --- |
| `deriveTaskAuthorityProjection` | One `GoalContract` | A normalized, supply-free `TaskAuthorityProjection` | Validates and computes only |
| `analyzeSpecialistCandidates` | One `SpecialistCompilationRequest` | One immutable `SpecialistCandidateAnalysis` | Evaluates the same candidate set and returns selected or no-eligible analysis without a launchable roster |
| `compileAgentBlueprints` | One `SpecialistCompilationRequest` | One immutable `AgentBlueprintCompilation` | Validates, constructs, evaluates, selects, and compiles only |
| `renderSpecialistPackage` | One complete `AgentBlueprintCompilation` | One `RenderedSpecialistPackage` containing file values and a root `packageDigest` | Recompiles for conformance and returns values only |
| `verifySpecialistPackage` | One rendered package plus one `SpecialistPackageExpectation` | The reconstructed immutable `RenderedSpecialistPackage` | Rerenders and compares exact package semantics and trusted expected digests only |
| `verifySpecialistHandoff` | One rendered package, trusted package expectation, and raw UTF-8 handoff bytes | One immutable `VerifiedSpecialistHandoff` | Verifies package approval, closed handoff semantics, identity, evidence, artifact names, deterministic media types, normalized controls, and raw bytes only |
| `assessSpecialistHandoffs` | One rendered package, trusted package expectation, target blueprint ID, and raw dependency handoff byte arrays | One immutable `SpecialistHandoffSetAssessment` | Computes exact transitive dependency completeness and `pass` readiness only |

The public compilation request is exactly:

```ts
const request: CompileAgentBlueprintsInput = {
  apiVersion: SPECIALIST_API_VERSION,
  kind: "SpecialistCompilationRequest",
  goal,
  proposedCandidates,
};
```

`proposedCandidates` is optional at input and normalized to an array in the compilation. There is no `options`, `role`, profile, provider, model, prompt, executor, grant, credential, or runtime field.

Package verification requires exactly two trusted expectations:

```ts
const verified = verifySpecialistPackage(renderedPackage, {
  compilationDigest: approvedCompilationDigest,
  packageDigest: approvedPackageDigest,
});
```

The expected values MUST come from the approval record or another trusted channel outside the received package. Reading both expectations from the package being verified does not establish trust.

## GoalContract

The IDE or human MUST construct and review one closed `GoalContract` before any external launch. The free-form user message and hidden model reasoning are not part of the canonical contract.

### Root Fields

| Field | Normative Meaning |
| --- | --- |
| `apiVersion` | MUST equal `swecircuit/specialist/v1alpha1`. |
| `kind` | MUST equal `GoalContract`. |
| `id` | Stable goal identifier. |
| `revision` | Positive integer revision. Any semantic change SHOULD increment it. |
| `objective` | Reviewed goal-level outcome. |
| `integrationOwner` | Stable identifier used as every blueprint handoff destination. |
| `assumptions` | Required array of reviewed low-risk assumptions; every item has `id`, `statement`, and `rationale`. |
| `unresolvedDecisions` | Required array of open decisions with `id`, `question`, `owner`, `blocking`, and `proceedRationale`. |
| `acceptanceCriteria` | Reviewed criteria with explicit evidence requirements. |
| `contextSources` | Declared context metadata; source content is not embedded or fetched by core. |
| `authority` | Owner ceilings and prohibited effects. These are demand bounds, not executable grants. |
| `optimization` | Relative integer startup and cross-agent handoff costs. |
| `workUnits` | One to 64 reviewed atomic semantic work units. |

Identifiers use `^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$` and are at most 128 characters. Input records are closed. Unknown fields fail schema validation rather than becoming advisory metadata.

### Assumptions And Decisions

`assumptions` and `unresolvedDecisions` are canonical GoalContract data, not chat-only notes. Both arrays are normalized by ID and included in `goalDigest`, every compilation digest, and `compilation.json`.

A decision with `blocking: true` fails semantic validation with `SC4302`; the IDE MUST emit `clarify` and MUST NOT construct candidates. A non-blocking decision MAY remain only when its owner and `proceedRationale` explain why bounded work can continue safely. Empty arrays are valid but both fields are required. Resolving or changing an assumption or decision changes canonical goal semantics and requires a revised contract, recompilation, rerendering, and new approval.

### Acceptance And Evidence

Each acceptance criterion MUST have a stable ID, description, and at least one evidence requirement. Each evidence requirement declares:

- a globally unique `id`;
- an evidence `kind` from the existing evidence-kind vocabulary;
- a `duty` of `produce`, `verify`, or `review`;
- a description; and
- `independentFromProducer`.

Every criterion MUST contain at least one `produce` duty. A producer duty MUST NOT mark itself independent. Every evidence requirement MUST be owned by exactly one work unit across the whole goal. If a `verify` or `review` requirement requests independence, a candidate is eligible only when that duty's work unit compiles into a different agent from every producer for the same criterion.

Evidence completeness and requested independence are hard gates. They are never traded for a shorter projected makespan.

### Context Sources And Uses

Each context source declares `id`, `kind`, `locator`, expected `sha256:` digest, byte count, description, and `allowedWorkUnits`.

- `repository` sources additionally MUST declare `readScope`. Parse the locator after `path:` and before any `#` fragment into slash-delimited segments. Reject a leading slash, empty segment, backslash, or any segment exactly equal to `.` or `..`; an optional fragment MAY identify a bounded region. The fragment-free locator path MUST be covered by `readScope` through an exact path or containing `/**` scope.
- `documentation`, `conversation`, `memory`, and `evidence` sources MUST NOT contain `readScope`.
- Every declared source MUST be used by at least one work unit.
- A work unit may use a source only when its ID appears in `allowedWorkUnits`.
- A repository use additionally requires the source `readScope` in the work unit's read scope and a covering `filesystem.read` permission.
- Within one work unit, a source ID may appear only once. Its `purpose` explains why the source is required.

Core validates declarations and bindings. It does not open the locator or prove that external bytes match the declaration. The external host MUST verify delivered context against the declared digest and byte count before use.

### Authority And Planning Costs

`authority` contains:

- `allowedModules` and `allowedCapabilities`;
- `permissionCeiling` whose `kind` is the exported `SpecialistPermissionKind` union: exactly `filesystem.read`, `filesystem.write`, `network.connect`, `process.spawn`, or `secrets.read`;
- non-empty `forbiddenEffects` text;
- `maxAgents`, from 1 through 16; and
- `maxConcurrency`, from 1 through 16 and not greater than `maxAgents`.

Permissions are requested demand bounded by the owner ceiling. `SpecialistPermission.kind` is not an open string; any other value fails schema and TypeScript conformance. Permission records are not grants, enforcement, or proof that the host can safely provide them. `forbiddenEffects` are preserved into every blueprint; V11 does not execute or enforce them.

`optimization.agentStartupCost` and `optimization.handoffCost` are non-negative integers. Work-unit `weight` is a positive integer. Each is capped at 1,000,000. These values are relative planning units, not elapsed-time estimates or performance promises.

### Atomic Work Units

Every work unit MUST contain all of the following:

| Field | Requirement |
| --- | --- |
| `id` | Stable atomic work-unit identifier. |
| `objective` | Exact semantic responsibility; a generic role label is insufficient. |
| `weight` | Relative positive planning weight. |
| `module` | One owner-approved Module ID, action, input ports, and output ports. Reuse of a Module ID MUST use the same complete definition. |
| `dependencies` | IDs of prerequisite work units; self, unknown, duplicate, and cyclic references fail. |
| `requiredCapabilities` | Non-empty demand fully contained by `authority.allowedCapabilities`. |
| `contextUses` | Non-empty, purpose-bound references to declared context sources. |
| `scope` | Exact normalized `read`, `write`, and `conflictZones` keys. |
| `permissions` | Demand fully covered by `authority.permissionCeiling`; filesystem read/write permission scopes MUST exactly equal the work unit's declared read/write scope sets. |
| `evidenceRequirementIds` | Non-empty exact ownership of declared evidence requirements. |
| `handoffArtifacts` | Non-empty artifact identifiers required at fan-in. |
| `stopConditions` | Non-empty conditions that return decisions or unsafe expansion to the integration owner. |

Scope keys are owner-reviewed exact keys. Core detects exact intersections; it does not prove arbitrary glob, alias, symlink, or semantic path overlap.

### Review Gate

Before treating a GoalContract as launchable, the IDE or human MUST review:

1. objective, assumptions, and unresolved decisions;
2. criterion and evidence ownership;
3. whether work units are semantically atomic and complete;
4. Module actions and ports;
5. dependencies and integration ownership;
6. context necessity, source declarations, and allowed uses;
7. scopes, capabilities, permission ceilings, and forbidden effects;
8. independence duties; and
9. planning weights and agent/concurrency ceilings.

Any launch-sensitive open question MUST be represented in `unresolvedDecisions`. If it can change product behavior, public API, architecture, authority, security, destructive effects, acceptance evidence, or verification, mark it blocking and route to `clarify` before compilation. Core enforces the blocking flag but is not a substitute for the human semantic review that sets it.

## Candidate Construction

Core constructs candidate teams from the reviewed work units. A proposed candidate is optional advisory grouping data with an ID and non-empty groups of work-unit IDs. Proposal IDs, proposal order, group order, and work-unit insertion order MUST NOT affect which partition wins.

Core normalizes every group and partition, deduplicates logically identical partitions, and records all origins and proposal IDs on the resulting candidate. `search.evaluatedCandidates` therefore counts unique evaluated partitions, not generation attempts.

Every evaluated candidate associated with any proposal is also returned in `proposalEvaluations`, sorted by candidate ID. This keeps supplied groupings inspectable even when they are ineligible or fall outside the retained alternatives.

Candidate IDs use `team.<64-lowercase-hex>` from the full domain-separated partition SHA-256 suffix. Agent IDs use `agent.<64-lowercase-hex>` from the full domain-separated work-group SHA-256 suffix. Neither identity is truncated.

### Serial Baseline

The partition containing every work unit in one group is always evaluated and returned as `serialBaseline`. It may be ineligible when requested producer/checker independence requires more than one agent. It remains visible even when another team is selected.

### Exact Search

Exact search applies only when the reviewed goal contains eight or fewer work units.

Core enumerates every canonical set partition whose group count is no greater than `min(authority.maxAgents, workUnitCount)`. Schema-valid supplied proposals are merged into that same canonical evaluation set. `search.mode` MUST be `exact` and `search.claim` MUST be `exhaustive_partition_search_fixed_scheduler`. The claim covers every allowed partition of those fixed work units under the owner agent ceiling, evaluated by the fixed deterministic scheduler. It is not a claim that the human decomposition or every possible schedule is globally optimal.

### Bounded Search

For nine through 64 work units, `search.mode` MUST be `bounded` and `search.claim` MUST be `bounded_evaluated_set_no_global_optimum`. Core evaluates a deterministic bounded structural set:

1. the serial baseline;
2. one weight-balanced partition for each group count from two through the owner agent ceiling;
3. grouping by Module ID;
4. grouping by dependency level;
5. grouping by evidence-duty class, using per-work-unit precedence `review`, `verify`, `produce`, then `other`;
6. grouping by the first normalized write scope, otherwise first conflict zone, otherwise Module-based read grouping; and
7. every supplied proposal that passes input-shape validation.

Structural candidates above `maxAgents` are omitted. Supplied partitions are evaluated under the same gates as constructed candidates. Bounded search MUST NOT be described as a global optimum; it can miss a better unconstructed partition.

## Candidate Eligibility And Analysis

Goal-level schema, reference, context, privacy, authority, permission, evidence-ownership, and work-unit DAG checks complete before candidate construction. Each candidate is then eligible only when:

- the group count does not exceed `maxAgents`;
- every known work unit appears exactly once;
- no unknown work unit appears;
- grouping does not create a cycle in the derived agent dependency graph; and
- every requested independent verifier or reviewer is outside the relevant producer agent.

Candidate rejection codes are `agent_limit`, `dependency_cycle`, `evidence_independence`, `missing_work_unit`, `duplicate_work_unit`, and `unknown_work_unit`.

For an eligible candidate, each agent's duration is the sum of its work-unit weights plus `agentStartupCost`. Cross-agent dependency edges incur `handoffCost`. The deterministic projected schedule:

- respects the work-unit-derived agent dependency graph;
- never exceeds `maxConcurrency`;
- prevents concurrent agents when exact keys show write/write, write/read, read/write, or shared conflict-zone intersection;
- allows read/read overlap; and
- chooses ready work by longer remaining critical path, then longer agent duration, then agent ID.

This schedule is a planning calculation. `launchWaves` group agents by projected start value; they are not dispatch receipts, capacity reservations, or proof of runtime isolation.

Candidate metrics are exact for the declared input model:

| Metric | Meaning |
| --- | --- |
| `projectedMakespan` | Maximum projected finish in relative planning units. |
| `peakConcurrency` | Maximum overlap in the projected schedule. |
| `conflictPairs` | Agent pairs with an exact write/read or conflict-zone intersection. |
| `handoffCount` | Distinct cross-agent dependency edges. |
| `duplicatedContextBytes` | Context bytes assigned across agents minus unique context bytes used by the candidate. |
| `duplicatedPermissionScopes` | Repeated `(permission kind, scope)` demand across agents. |
| `agentCount` | Number of specialist groups. |
| `totalWorkWeight` | Sum of all work-unit weights. |
| `totalStartupCost` | `agentCount * agentStartupCost`. |
| `totalHandoffCost` | `handoffCount * handoffCost`. |

## Deterministic Selection

Correctness, authority, evidence coverage, and requested independence are hard gates. Eligible candidates are compared lexicographically in exactly this order:

1. lower `projectedMakespan`;
2. fewer `conflictPairs`;
3. fewer `handoffCount`;
4. fewer `duplicatedContextBytes`;
5. fewer `duplicatedPermissionScopes`;
6. fewer agents; and
7. canonical partition identity.

The first eligible candidate wins. More agents win only when an earlier comparator field or an independence gate justifies them. If no candidate is eligible, compilation fails with `SC4306` and returns no roster. The same reviewed request MAY be passed to `analyzeSpecialistCandidates` to obtain bounded rejected-candidate evidence without weakening that fail-closed compilation behavior.

The compilation retains at most eight ranked alternatives after the selected candidate. The `evaluationSetDigest` binds the ordered unique evaluation set by candidate ID and candidate content digest.

### Candidate Analysis Without A Launchable Roster

`analyzeSpecialistCandidates` evaluates the same normalized goal, proposals, scheduler, hard gates, comparator, and bounded alternative policy as compilation. A successful result has `kind: SpecialistCandidateAnalysis` and one closed discriminant:

- `selectionStatus: selected` with the exact selected evaluation and `selectionReason`; or
- `selectionStatus: no_eligible_candidate` with `selected: null` and `selectionReason: null`.

Both forms preserve the serial baseline, proposal evaluations, search summary, bounded alternatives, evaluation-set digest, goal identity, and a domain-separated analysis digest. A no-eligible analysis is diagnostic evidence, never a roster, package, or launch authorization. Correct the GoalContract and compile a new revision rather than launching from analysis output.

### Machine-Readable Selection Reason

Every successful compilation includes `selectionReason`; prose is optional and MUST NOT replace it. Its closed fields are:

- `kind`: `serial_selected`, `serial_ineligible`, `lower_metric`, or `canonical_tiebreak`;
- `decisiveField`: `serial_baseline`, the first serial rejection code, one comparator field, or `canonicalPartitionIdentity`;
- `selectedValue` and `serialValue`: the exact compared values, or null where the closed type permits it; and
- `serialRejectionCodes`: the complete stable rejection list for the serial baseline.

The value explains selection relative to the mandatory serial baseline. It does not claim causal runtime speed or summarize comparisons against every retained alternative.

## AgentBlueprintCompilation

A successful compilation contains:

- the normalized reviewed `goal` and its `goalDigest`;
- normalized `proposedCandidates`;
- every proposal-associated candidate in `proposalEvaluations`, including rejected proposals;
- the derived supply-free `TaskAuthorityProjection` and its digest;
- `search.mode`, exact `search.claim`, counts, retained count, and `evaluationSetDigest`;
- the always-visible `serialBaseline`;
- the exact `selected` evaluation;
- the closed machine-readable `selectionReason` relative to the serial baseline;
- retained `alternatives`;
- one immutable `AgentBlueprint` per selected group;
- projected `launchWaves`; and
- the domain-separated canonical `contentDigest` for the whole compilation.

The authority projection carries the owner ceilings and declared context. It is derived from the goal; callers do not supply it to `compileAgentBlueprints`.

## Exact AgentBlueprints

An `AgentBlueprint` is exact task demand, not a persona or runtime configuration. For one selected group, core derives:

- stable agent ID, goal ID/revision/digest, selected candidate ID, and blueprint digest;
- exact `workUnitIds` and each unit objective;
- unique Module definitions with actions and ports;
- cross-agent dependencies as agent IDs;
- aggregated context sources with locator, digest, bytes, purposes, owning work units, and repository read scope when applicable;
- the union of required capabilities, read/write/conflict scopes, and permissions for only the owned work units;
- every owner-declared forbidden effect;
- exact criterion and evidence duties;
- handoff destination equal to `goal.integrationOwner`;
- the union of declared handoff artifacts;
- required handoff fields exactly `apiVersion`, `kind`, `outcome`, `destination`, `goal`, `agent`, `compilationDigest`, `summary`, `workUnitsCompleted`, `artifacts`, `evidence`, `assumptions`, `risks`, and `followUps`; and
- the union of work-unit stop conditions.

Closed shapes prevent a blueprint from carrying provider, model, profile, prompt, executor, credential, runtime grant, or generic `role` data.

## Rendered Launch Package

`renderSpecialistPackage` accepts only a complete reproducible compilation. It reruns `compileAgentBlueprints` over the embedded goal and proposals, then requires the same compilation digest and canonical semantics. A changed, incomplete, or substituted compilation fails with `SC4307`.

On success the returned `RenderedSpecialistPackage` contains these file values:

| Path | Contents |
| --- | --- |
| `compilation.json` | The complete normalized `AgentBlueprintCompilation`, including assumptions, unresolved decisions, search claim, selection reason, blueprints, and compilation digest. |
| `manifest.json` | Goal/revision, compilation binding, selected candidate, waves, compilation-file metadata, agent/blueprint contract metadata, integration metadata, and manifest content digest. |
| `integration.md` | Integration gates plus assumptions, decisions, search summary, selection reason, serial baseline, selected metrics, waves, and blueprint digest summary. |
| `agents/<agent-id>.md` | Operating rules, the complete JSON `AgentBlueprint`, and a concrete closed `SpecialistAgentHandoff` example bound to the compilation and blueprint digests. |

Every `RenderedSpecialistFile` carries `path`, `mediaType`, UTF-8 byte count, standard SHA-256 over the exact file bytes, and exact `content`. The manifest declares `fileDigestAlgorithm: sha256` and `fileDigestScope: raw-file-bytes`, binds `compilation.json` through `compilationFile`, `compilationFileDigest`, and `compilationFileBytes`, and binds agent and integration payloads the same way. Canonical compilation, blueprint, manifest, and package identities remain domain-separated; the package envelope returns `compilationDigest` and a domain-separated root `packageDigest` over the compilation digest, manifest digest, and complete ordered file metadata.

The generated handoff example is executable contract guidance, not illustrative pseudocode. Artifact `content` is always a string, including for `application/json`; each evidence entry contains exactly `criterionId`, `requirementId`, `kind`, `duty`, `status`, and `artifact`; and the example carries the exact goal, agent, compilation, work-unit, artifact, and evidence bindings for that blueprint. A host that requires a stricter custom envelope MUST provide its closed schema separately and retain these standard bindings.

The package cannot make its own root digest trustworthy. The integration owner MUST preserve the expected `compilationDigest` and `packageDigest` in an approval record or trusted channel outside the package.

### Package Verification

Before launch, pass the received package and both trusted expectations to:

```ts
const verified = verifySpecialistPackage(receivedPackage, {
  compilationDigest: approvedCompilationDigest,
  packageDigest: approvedPackageDigest,
});
```

Verification extracts and parses the single `compilation.json`, reconstructs the compilation, rerenders the complete package, requires canonical equality with the received package, and compares both expected digests. Any payload, manifest, envelope, compilation, or coordinated rewrite that does not reproduce the approved package returns `SC4307` with no value.

### Raw Handoff Verification And Fan-In

An external host MUST preserve each agent result as exact raw UTF-8 bytes and verify it against the already approved package:

```ts
const verifiedHandoff = verifySpecialistHandoff(
  receivedPackage,
  approvedExpectation,
  rawHandoffBytes,
);

const fanIn = assessSpecialistHandoffs(
  receivedPackage,
  approvedExpectation,
  targetAgentId,
  rawDependencyHandoffBytes,
);
```

`SpecialistAgentHandoff` is a closed envelope. It binds API version, canonical workflow outcome, destination, goal ID/revision/digest, agent ID/blueprint digest, compilation digest, summary, completed work units, the exact declared artifact set with inline content, every exact evidence duty, assumptions, risks, and follow-ups. Unknown fields, duplicate JSON keys, invalid UTF-8, controls outside artifact formatting whitespace, lone surrogates, high-confidence secrets, stale identity, substituted artifacts, and incomplete evidence fail closed.

Every generated agent contract contains one concrete schema-valid envelope that can be parsed and passed directly to `verifySpecialistHandoff` after replacing its summary and artifact contents. Agents and hosts MUST use that envelope rather than copying the different nested shape of blueprint evidence duties. Artifact media is deterministic: `.json` uses `application/json`, `.md` uses `text/markdown`, and every other name uses `text/plain`. Hosts MUST preserve that value. Artifact content may contain normalized LF; TAB, CR, CRLF, other controls, malformed Unicode, and high-confidence secrets fail verification.

A `pass` handoff MUST complete every blueprint work unit, provide every declared artifact exactly once, provide every exact evidence duty exactly once, and mark every duty `pass`. Verification returns raw byte count and SHA-256, a domain-separated semantic digest, per-artifact raw bindings, and a content digest.

`assessSpecialistHandoffs` derives the target blueprint's complete transitive dependency closure. Missing or valid non-`pass` handoffs return `integrationReady: false`; duplicate, unknown, substituted, malformed, or outside-closure handoffs fail. Only one verified `pass` handoff from every exact dependency returns `integrationReady: true`. The target's own result is not part of its prerequisite fan-in.

Both operations verify the approval-bound package first, reject proxy/accessor byte containers without invoking caller code, return immutable values, and perform no I/O, execution, persistence, or merge.

Compilation, candidate analysis, rendering, package verification, handoff verification, and fan-in assessment return values and perform no caller-directed I/O. They do not follow context locators, create directories, read materialized packages, write files, start agents, contact a provider, or enforce runtime authority. Schema validation may lazily read only the immutable schemas shipped inside the SWECircuit package. A materializing adapter MUST preserve file bytes and SHOULD verify them again at its own storage or transport boundary.

### Agent-Based Review Of An Exact Compilation

A blueprint inside compilation A cannot independently review the complete semantics of compilation A: adding A's bytes to that blueprint changes A and its digest. When acceptance requires an agent to audit the exact selected partition, schedule, authority projection, evidence coverage, or rendered contracts, the host MUST use two phases:

1. compile, render, and freeze candidate A without launch approval;
2. compile a separate read-only audit B whose authenticated context contains A's complete compilation and every rendered package file;
3. have the owner review, separately approve, and verify B;
4. run B's binder and independent compilation reviewer; and
5. only after B returns `PASS`, separately approve and verify A for launch.

B is the explicit human-approved trust root and does not recursively review itself. It cannot approve, launch, integrate, or mutate A. Any change to A changes B's authenticated context and requires a new B compilation, package, approval, and audit. After reconstructing A and verifying B against B's owner-approved digest pair, the external host MUST create and preserve a closed `PrelaunchPackageVerificationReceipt` outside both packages before B launches. The receipt binds both digest pairs and verification outcomes and MUST retain `candidateLaunchApproved: false`. Before launching A, the host MUST preserve a cross-package authorization that binds both digest pairs, the receipt's exact path, raw digest, byte count, and outcome, and B's exact semantic `PASS` handoff path, raw digest, byte count, and outcome. This conditional protocol is defined in [`two-phase-prelaunch-review.md`](two-phase-prelaunch-review.md). Human roster review does not require a second compilation unless repository policy requires agent-based independent evidence.

## Review And External Launch Gate

Compilation success is not launch approval. The IDE and integration owner MUST complete this sequence:

1. review the GoalContract revision, digest-bound assumptions, and every unresolved decision;
2. require no blocking unresolved decision;
3. present `search.mode`, exact `search.claim`, the serial baseline, selected roster, and machine-readable `selectionReason`;
4. expose each blueprint's work, dependencies, context, authority, evidence, handoff, and stop boundary;
5. render that exact compilation, producing `compilation.json` and `packageDigest`;
6. when agent-based acceptance must semantically audit this exact compilation, complete the separate prelaunch audit above;
7. preserve trusted expected `compilationDigest` and `packageDigest` outside the package;
8. run `verifySpecialistPackage` against both expected digests; and
9. bind launch approval to both digests before an external host receives or materializes only the listed contracts.

Any changed assumption, decision, goal field, work unit, proposal, selected team, blueprint, manifest, or package file requires recompilation, rerendering, reverification, and new approval. A host MAY translate a blueprint into transient provider-specific instructions, but it MUST NOT widen authority, add work, omit evidence, weaken stop conditions, or substitute handoff requirements while retaining either approved digest.

Actual dependency readiness, context delivery and byte verification, permission enforcement, isolation, process scheduling, retries, persistence, and integration remain host responsibilities. A host that cannot satisfy a blueprint MUST stop or narrow and recompile; it must not silently alter the contract.

After execution, the host MUST preserve the exact raw handoff bytes, call `verifySpecialistHandoff` for each received result, and call `assessSpecialistHandoffs` before starting any dependent integration blueprint. Verification success is not equivalent to `pass`; the canonical outcome remains explicit. Integration MUST stop unless the target assessment is successful, non-null, and `integrationReady: true`.

## Diagnostics And Routing

| Code | Meaning | Workflow Route |
| --- | --- | --- |
| `SC4301` | Invalid closed input or text | `fix` or `clarify` |
| `SC4302` | Invalid goal references, uniqueness, Module consistency, DAG, or a blocking unresolved decision | `clarify`, `fix`, or `redesign` |
| `SC4303` | Invalid authority, context-use, scope, capability, or permission relationship | `clarify` or `redesign` |
| `SC4304` | Invalid evidence definition, ownership, or coverage | `fix` or `clarify` |
| `SC4305` | Invalid candidate proposal identity | `fix` |
| `SC4306` | No eligible candidate | `redesign` or `split` |
| `SC4307` | Compilation/package digest mismatch | `block` and recompile from reviewed input |
| `SC4308` | Resource limit exceeded | `split` or narrow context |
| `SC4309` | High-confidence secret pattern | `block` and remove the secret |
| `SC4310` | Malformed or unsafe closed handoff | `fix` or `block` |
| `SC4311` | Handoff goal, compilation, blueprint, or destination mismatch | `block` and recover the exact approved result |
| `SC4312` | Handoff work, artifact, or evidence mismatch | `fix` or rerun the exact specialist |
| `SC4313` | Invalid, duplicate, unknown, outside-closure, or malformed fan-in set | `fix` or `block` |
| `SC9001` | Internal failure | `diagnose` |

Input is limited to 1,048,576 JSON bytes. Compilations and the aggregate rendered file contents are independently limited to 4,194,304 bytes. Text is bounded; malformed Unicode, C0/C1 controls, DEL, and Unicode bidirectional formatting controls are rejected; and high-confidence secret patterns fail before a launchable value is returned.

## Explicit V11 Exclusions

V11 does not:

- execute or dispatch agents;
- select a provider, model, prompt, profile, executor, or credential;
- reserve runtime capacity or guarantee the projected launch waves;
- create or enforce sandboxes, worktrees, filesystem boundaries, permissions, or process limits;
- persist state, events, prompts, traces, results, or handoffs;
- retry, cancel, resume, or recover runtime work;
- merge branches or decide merge readiness; or
- update durable memory automatically.

Those effects belong to an external IDE/agent host and later reviewed workflow stages. The universal runtime control plane preserved under `docs/specs/v11-orchestration-planner/` is deferred and is not part of this contract.

## Source Map

- Architecture boundary: `docs/architecture/decisions/0004-specialist-compiler-first.md`
- Feature requirements: `docs/specs/v11-specialist-compiler/spec.md`
- Input schemas: `schemas/v1alpha1/specialist-compiler.schema.json` and `schemas/v1alpha1/specialist-handoff.schema.json`
- Public types: `src/specialist-types.ts`
- Validation, construction, analysis, and selection: `src/specialist-compiler.ts`
- Package reconstruction, rendering, root digesting, and verification: `src/specialist-render.ts`
- Closed handoff validation, raw binding, and fan-in assessment: `src/specialist-handoff.ts`
- Truthful read-only first run: `examples/specialist-compiler/`
- IDE flow: `docs/ide/specialist-agent-kickoff.md`
- Reusable module guidance: `docs/modules/specialist-agent-compiler.md`
