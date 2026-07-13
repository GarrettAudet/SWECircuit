# SWECircuit v1alpha1 Contract

## Scope

This directory defines the first package-owned machine contract for the private V9 kernel. The kernel initializes a project, validates explicit artifacts, and inspects caller-owned traces. It does not launch agents, grant permissions, write traces, execute adapters, fetch evidence, or merge code.

Canonical input is strict UTF-8 JSON. Every artifact is closed to unknown fields and carries apiVersion and kind. Only swecircuit/v1alpha1 and the six documented kinds are supported.

## Identity

Project, WorkPacket, and RunEvent are instances and use an id plus optional description.

Module, Circuit, and AdapterManifest are reusable definitions and also require their own semantic version.

RunEvent eventTypeVersion versions the event vocabulary independently from the schema API and repository milestone.

## Discovery

swecircuit.json is the only project discovery authority. Project.spec.artifacts is an explicit, unique list of repository-relative JSON files below the local swecircuit directory. The validator does not search ancestors or recursively scan directories.

The target artifact envelope is authoritative for kind. Historical Markdown and rail-named files remain checker-supported provenance and are not v1alpha1 inputs.

Explicit project roots reject remote, URI, device, alternate-stream, and control-character forms before filesystem access. Artifact paths are forward-slash repository-relative paths. Symlinks and junctions fail without target dereference; path-altering reparse behavior fails canonical containment. Opaque same-path Windows reparse metadata is outside the pure Node v1alpha1 inspection boundary, while regular-file and open-descriptor identity checks still apply.

## Permission Model

Permission kinds are closed:

- filesystem.read
- filesystem.write
- network.connect
- process.spawn
- secrets.read

Module.requiredPermissions declares what a reusable module needs.

WorkPacket.authority.permissionCeiling declares the maximum permission request an assigned work unit may make. It is a ceiling, not a runtime grant. For a Circuit node that names a WorkPacket, every Module requirement must fit within the packet ceiling.

AdapterManifest.requestedPermissions is declaration metadata only. V9 validates its shape and never grants or exercises it.

Scope rules are deterministic:

- Filesystem scopes are repository-relative literal paths or directory prefixes ending in /**. No other wildcard syntax is supported.
- Network scopes are lowercase host names with an optional numeric port. Core V9 commands never use them.
- Process scopes are executable basenames without arguments.
- Secret scopes are logical identifiers, never values.
- Kind matching is exact. A filesystem requirement is covered by an exact ceiling scope or a matching directory prefix ending in /**. Other scopes require exact equality.

## Composition Semantics

Module owns its ports, action, gate, allowed outcomes, evidence requirements, and permission requirements. Circuit owns routing.

Every route names source and target nodes, one workflow outcome, and at least one output-to-input port transfer. The source output and target input names must exist and their artifact types must match exactly. V9 has no subtype or coercion system.

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

## Trace Semantics

The producer owns JSONL persistence. V9 validates and inspects the supplied file without claiming it was never rewritten.

Sequence and causation are authoritative. time is optional evidence and never determines order.

Attempt transitions are:

    queued -> running | cancelled
    running -> input_required | completed | failed | cancelled | timed_out
    input_required -> running | cancelled | timed_out

completed, failed, cancelled, and timed_out are immutable terminal states for one attempt. Timeout requires an explicit attempt.state event. A retry starts a new queued attempt with retryOf set to the prior attempt id.

Evidence fields contain references only. The inspector never opens or fetches them.

## Compatibility

v1alpha1 compatibility is exact: compatibility.apiVersions contains swecircuit/v1alpha1. Package-version range grammar is deferred until public package compatibility exists.

Changing a schema, semantic rule, permission vocabulary, resource ceiling, diagnostic code, or event transition requires fixtures and a documented compatibility note.

## Diagnostics

diagnostic-catalog.json is normative. Codes, rules, severities, and exit classes are stable for v1alpha1.

JSONL is inspected as a zero-based virtual array. The first event root uses pointer /0, and its type field uses /0/spec/type. File-level failures use an empty pointer. Candidate paths that cannot be accepted safely use artifact . so absolute host paths are never rendered.

Diagnostics are deduplicated and sorted by artifact, pointer, and code. Messages and hints never echo rejected secret values, control characters, or absolute host paths.

High-confidence secret-pattern detection emits warning SC4101, replaces the rendered value with a fixed suppression marker, and does not by itself change exit class 0. Forbidden capture fields remain schema errors.

## Security Boundary

Schemas use typed allowlisted fields and no arbitrary payload bag. Full prompts, chats, environment dumps, command output, credentials, secret values, and evidence content do not belong in these artifacts.

Only package-owned schemas compile. Remote references, custom third-party keywords, and adapter configuration schemas are not fetched or executed.
