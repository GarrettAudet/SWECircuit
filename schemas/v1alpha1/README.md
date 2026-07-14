# SWECircuit v1alpha1 Contract

## Scope

This directory defines the first package-owned machine contract for the private V10 kernel. The kernel initializes a project, validates explicit artifacts, inspects caller-owned traces, and can execute one host-selected WorkPacket through a caller-injected executor. It does not schedule work, dynamically load adapters, enforce granted permissions, write traces, fetch evidence, retry work, merge code, or update memory.

Canonical input is strict UTF-8 JSON. Every artifact is closed to unknown fields and carries apiVersion and kind. Only swecircuit/v1alpha1 and the six documented kinds are supported.

## Identity

Project, WorkPacket, and RunEvent are instances and use an id plus optional description.

Module, Circuit, and AdapterManifest are reusable definitions and also require their own semantic version.

RunEvent eventTypeVersion versions the event vocabulary independently from the schema API and repository milestone.

## Discovery

swecircuit.json is the only project discovery authority. Project.spec.artifacts is an explicit, unique list of repository-relative JSON files below the local swecircuit directory. The validator does not search ancestors or recursively scan directories.

The target artifact envelope is authoritative for kind. Historical Markdown and rail-named files remain checker-supported provenance and are not v1alpha1 inputs.

Explicit project roots reject remote, URI, device, alternate-stream, and control-character forms before filesystem access. Artifact paths are forward-slash repository-relative paths. Symlinks and junctions fail without target dereference; path-altering reparse behavior fails canonical containment. Opaque same-path Windows reparse metadata is outside the pure Node v1alpha1 inspection boundary, while regular-file and open-descriptor identity checks still apply.

## Initialization

The initializer targets one existing local directory and never searches ancestors. An explicit project ID is used unchanged and must pass the Project schema. Without one, the ID transform is exact:

1. Take the target directory basename and normalize it with NFKD.
2. Convert it to lowercase and remove combining characters in U+0300 through U+036F.
3. Replace each run outside `a-z` and `0-9` with one hyphen, then trim outer hyphens.
4. Fall back to `project` when nothing remains.
5. Prefix `project-` when the first character is not a letter.
6. Truncate to 128 characters, trim outer hyphens again, and fall back to `project` if needed.

Unrelated repository files are allowed. Existing `swecircuit.json` or `swecircuit` paths observed during preflight are exit-class-4 collisions and are not replaced or traversed. A successful call creates `swecircuit.json`, `swecircuit/`, `swecircuit/modules/`, and `swecircuit/circuits/` with exclusive filesystem operations. The manifest is UTF-8 without a BOM, two-space indented JSON with stable field order and one final LF.

The initializer journals the type, canonical path, and BigInt device/inode identity of every captured created entry. A successful create that cannot be captured is marked pending, preserved, and forces `SC1022 init.cleanup-incomplete`. It checks the root, parents, captured entries, open manifest descriptor, exact manifest bytes, generated project ID, and normal project-validation result before reporting success. Recovery walks the journal in reverse and attempts only non-recursive removal after identity checks. When missing, changed, linked, or non-empty state is detected, the entry is preserved and `SC1022` is emitted.

Pure Node does not expose descriptor-relative create and remove operations on every supported platform. V1alpha1 therefore checks identity and canonical containment at explicit boundaries, but cannot bind directory creation to its first identity capture or bind the final identity check to pathname removal atomically. A malicious replacement in either window can be indistinguishable from attempt-owned state; categorical protection against that adversary requires a reviewed native adapter. Outside those documented windows, a detected mismatch fails closed and is preserved during recovery.

## Permission Model

Permission kinds are closed:

- filesystem.read
- filesystem.write
- network.connect
- process.spawn
- secrets.read

Module.requiredPermissions declares what a reusable module needs.

WorkPacket.authority.permissionCeiling declares the maximum permission request an assigned work unit may make. It is a ceiling, not a runtime grant. For a Circuit node that names a WorkPacket, every Module requirement must fit within the packet ceiling.

AdapterManifest.requestedPermissions remains declaration metadata rather than authority. V10 requires a host-issued, invocation-scoped ExecutionGrant before calling an injected executor. Every manifest request must be covered by the grant, every grant entry must have been requested, and every grant entry must fit within WorkPacket.authority.permissionCeiling. These checks validate the declared boundary; the embedding host must enforce the grant in its own tools or sandbox.

Scope rules are deterministic:

- Filesystem scopes are repository-relative literal paths or directory prefixes ending in /**. No other wildcard syntax is supported.
- Network scopes are lowercase host names with an optional numeric port. Core commands never use them.
- Process scopes are executable basenames without arguments.
- Secret scopes are logical identifiers, never values.
- Kind matching is exact. A filesystem requirement is covered by an exact ceiling scope or a matching directory prefix ending in /**. Other scopes require exact equality.

## Composition Semantics

Module owns its ports, action, gate, allowed outcomes, evidence requirements, and permission requirements. Circuit owns routing.

Every route names source and target nodes, one workflow outcome, and at least one output-to-input port transfer. The source output and target input names must exist and their artifact types must match exactly. V1alpha1 has no subtype or coercion system.

IDs are unique within kind. All references resolve to the expected kind.

A route that participates in a directed cycle must declare maxTraversals. Every cyclic route is bounded; one bounded edge does not make an otherwise unbounded cycle safe.

Conditional branching uses distinct outcomes. Parallel fan-out is explicit in fanOuts:

- The declared from, outcome, and branch nodes must match routes.
- Every branch root names both owner and workPacket.
- The declared join exists and has exactly one matching joins entry.
- The join sources equal its actual inbound predecessors.
- all waits for every source declaration; any accepts one source declaration.
- Every join names an integration owner.

Any node with multiple inbound predecessors requires exactly one joins entry. A node with no matching declaration is ambiguous and invalid.

## Work Packet Authority

A WorkPacket is a bounded, static handoff contract. It defines goal, completion evidence, non-goals, source baseline, scope and conflict zones, owner capability, dependencies, context references, authority ceiling, verification, handoff fields, and stop conditions.

The WorkPacket does not represent mutable worker state. Runtime state is derived only from RunEvent sequence.

## Execution Boundary

ExecutionGrant is a closed runtime object, not a seventh artifact kind and not self-authorizing. It binds one issuer, grant ID, run ID, attempt ID, work-packet ID, executor identity, and bounded permission set to one call.

The host must select a dependency-ready WorkPacket and inject trusted executable code whose identity matches both the manifest and grant. The manifest must declare an agent_runtime adapter, launch_agent capability, current API compatibility, WorkPacket input, no adapter-owned output artifact, structured errors, finite timeout support, and acknowledged cancellation. Manifest references are never imported, fetched, or executed.

Preflight snapshots direct inputs into bounded, accessor-free, detached JSON values. Invalid artifacts, identities, grants, permissions, policies, or privacy canaries return stable SC4201 through SC4210 diagnostics and make zero executor calls.

Once invocation begins, API processing success and work outcome are distinct. A valid call returns a frozen ExecutionSummary with completed, failed, cancelled, timed_out, or abort_unconfirmed disposition. Throws and malformed or secret-bearing settlements become fixed failure classes without copying raw provider values.

The effective deadline is the earlier of the invocation timeout and packet deadline. Cancellation is cooperative. Terminal cancellation or timeout means executor settlement was observed within the acknowledgment bound. abort_unconfirmed preserves a running attempt and omits run.completed because work may still be live.

Each call creates one timestamp-free, V9-compatible in-memory journal with contiguous sequence numbers, deterministic event IDs, fixed kernel actor, linear causation, and a link to the grant. The kernel validates the whole journal before returning it but never persists it.
## Trace Semantics

The producer owns JSONL persistence. The kernel validates and inspects one explicit caller-owned file without claiming that it was never rewritten. The reader checks lexical and canonical containment, one open descriptor, regular-file identity, size, modification time, and change time before and after reading. Detectable mutation fails safely; same-inode/same-metadata races remain outside the pure Node guarantee. Its buffer is the verified descriptor size plus one growth-detection byte, so the 64 MiB resource limit is a ceiling rather than a fixed allocation.

The whole-file limit includes delimiters. Line limits exclude LF or CRLF. A final delimiter is optional; internal blank records, repeated final delimiters, lone CR, BOM, invalid UTF-8, comments, trailing commas, duplicate keys, unsafe numbers, and excess depth fail. An empty file is a valid zero-event trace.

Every line is exactly one `RunEvent` with event type version `1.0.0`. Its `spec` is a closed discriminated union: only `attempt.state` carries a full attempt declaration; heartbeat and cancellation events carry an `attemptId`; workflow outcomes carry stage/outcome; and evidence events carry typed references. RunEvent metadata is ID-only. Terminal and cancellation reasons use closed codes.

Sequence and causation are authoritative. `time` is optional evidence and never determines order. Event IDs and sequences are trace-global; runs may interleave. Causes resolve to an earlier unique same-run event. Links are opaque non-causal identifiers and are not resolved.

Attempt identity is `(runId, attempt.id)`. A lineage starts with one non-retry queued attempt numbered one. Repeated state events preserve work packet, number, retry link, and deadline exactly. A retry is a new queued attempt that names the immediately prior failed, cancelled, or timed-out attempt in the same work packet and increments its number by one. Lineages do not fork.

Attempt transitions are:

    queued -> running | cancelled
    running -> input_required | completed | failed | cancelled | timed_out
    input_required -> running | cancelled | timed_out

`completed`, `failed`, `cancelled`, and `timed_out` are immutable terminal states. Timeout requires an explicit state event. Heartbeat and cancellation requests are state-gated but do not change state. Outcome and evidence events may reference a terminal attempt.

Evidence fields contain bounded, kind-specific references only; command and test identifiers are capped at 128 characters. The inspector never opens or fetches them. Summaries return at most 10,000 evidence references in logical order and report exact omissions. Every rendered string is checked against the normative high-confidence detector; a match suppresses the whole value and all matches aggregate to one root `SC4101` warning.

## Compatibility

v1alpha1 compatibility is exact: compatibility.apiVersions contains swecircuit/v1alpha1. Package-version range grammar is deferred until public package compatibility exists.

Changing a schema, semantic rule, permission vocabulary, resource ceiling, diagnostic code, or event transition requires fixtures and a documented compatibility note.

Unreleased T007 adds exit-class-4 `SC1021 init.path-exists` for owned-path collisions and `SC1022 init.cleanup-incomplete` when recovery cannot prove that a journaled entry is still safe to remove. It also broadens the stable `SC1001 io.safe-failure` wording from read-only input failures to filesystem operations. The diagnostic catalog advances to 1.1.0; the machine API remains `swecircuit/v1alpha1`.

Unreleased T008 closes the RunEvent union, changes event metadata to ID-only, replaces free-form terminal/cancellation reasons with closed codes, and gives evidence references kind-specific grammars. It adds `SC1223` for non-string event versions and `SC3026` through `SC3029` for attempt identity, retry lineage, missing attempt references, and non-retry start state. It also publishes the 10,000-reference summary cap and exact secret detector. The diagnostic catalog advances to 1.2.0; event type version remains `1.0.0`, and the machine API remains `swecircuit/v1alpha1`.

Unreleased V10 adds the provider-neutral executeWorkPacket library boundary without adding an artifact kind or changing an artifact schema. It adds SC4201 through SC4210 for execution input, compatibility, identity, grant, permission, policy, privacy-canary, and snapshot-limit failures. The diagnostic catalog advances to 1.3.0; event type version remains 1.0.0, and the machine API remains swecircuit/v1alpha1.
## Diagnostics

diagnostic-catalog.json is normative. Codes, rules, severities, and exit classes are stable for v1alpha1.

JSONL is inspected as a zero-based virtual array. The first event root uses pointer /0, and its type field uses /0/spec/type. File-level failures use an empty pointer. Candidate paths that cannot be accepted safely use artifact . so absolute host paths are never rendered.

Diagnostics are deduplicated and sorted by artifact, pointer, and code. Messages and hints never echo rejected secret values, control characters, or absolute host paths.

High-confidence secret-pattern detection emits warning SC4101, replaces the rendered value with a fixed suppression marker, and does not by itself change exit class 0. Forbidden capture fields remain schema errors.

## Security Boundary

Schemas use typed allowlisted fields and no arbitrary payload bag. Full prompts, chats, environment dumps, command output, credentials, secret values, and evidence content do not belong in these artifacts.

Only package-owned schemas compile. Remote references, custom third-party keywords, and adapter configuration schemas are not fetched or executed.
