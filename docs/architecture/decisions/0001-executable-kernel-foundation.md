# ADR 0001: Executable Kernel Foundation

## Status

Proposed. Technical choices are recommended; public identity and package namespace require owner clarification before implementation.

## Date

2026-07-09

## Context

The V8.1 baseline is a checked, file-based protocol. V9 creates the first executable surface for initialization, machine-readable validation, trace inspection, and adapter conformance. These choices establish long-lived public contracts and must remain simple, portable, inspectable, and provider-neutral.

V8.1 also proved that file contracts cannot enforce worker liveness. Two of four write-enabled attempts failed, including one missed handoff deadline. The kernel must model the evidence needed by a later runtime without claiming to provide scheduling or agent execution in V9.

## Decision Drivers

- Simple first-run experience.
- Windows, macOS, and Linux portability.
- Strong IDE and CI fit.
- Deterministic validation and actionable diagnostics.
- Versioned contracts that community modules can implement.
- Local and source-preserving traces.
- Explicit privacy, permissions, liveness, and failure state.
- Minimal core dependencies.
- Honest separation between the kernel and future runtime adapters.

## Proposed Decision

### Runtime

- Author in TypeScript 5.8 or newer.
- Compile to ESM JavaScript for distribution.
- Support Node 22.14 and Node 24 LTS.
- Use Node 24 as the primary development baseline.
- Use explicit package exports.
- Use built-in util.parseArgs for the first CLI surface.
- Use node:test for core unit and integration tests.

Node 26 is Current rather than LTS on the decision date and is not the production baseline.

### Package Shape

Start with one package exposing:

- A library entry point for schema loading and validation.
- A CLI binary with init, validate, and trace inspect commands.
- Published schema files as explicit package exports.

Keep publishing disabled until the owner resolves the product name, package namespace, and license. The unscoped devrail package is already taken.

### Canonical Data

- Canonical serialization: JSON encoded as UTF-8.
- Schema dialect: JSON Schema Draft 2020-12.
- Validator: Ajv 2020 in strict mode.
- Local event stream: one canonical JSON event per line.
- Optional YAML: deferred adapter that must normalize to canonical JSON before validation.

Every public artifact carries an API version and kind. Package, schema, event, and repository milestone versions remain separate.

### Validation Layers

Validation runs in this order:

1. File discovery and safe path handling.
2. JSON parse.
3. JSON Schema validation.
4. Cross-reference resolution.
5. Rail graph and state-machine semantics.
6. Policy and permission checks.
7. Deterministic normalized diagnostics.

A valid schema does not imply a valid rail. Every semantic resolver or parser path requires its own malformed fixture.

### Workflow And Execution Types

Workflow stage outcomes remain closed:

~~~txt
pass | fix | diagnose | clarify | redesign | split | block | learn
~~~

Worker execution status is a different type:

~~~txt
queued | running | input_required | completed | failed | cancelled | timed_out
~~~

Governance status is also separate:

~~~txt
accepted | optional | watch | deferred | rejected
~~~

These channels must never be merged into one enum.

### Event Model

The event envelope is inspired by CloudEvents and trace standards but remains a project-owned local format in V9.

Required event concepts:

- Event id, type, source, time, schema version, and subject.
- Run id, sequence, attempt, actor, work packet, and stage.
- Correlation id and causation id.
- Parent or link references for fan-out and fan-in.
- Structured data and evidence references.
- Redaction and omission metadata.
- Terminal reason for terminal execution events.

Run logs are append-only. The inspector reconstructs state from the event sequence and reports invalid transitions, missing causes, duplicate sequence numbers, orphaned attempts, and non-terminal active work.

### Liveness Model

The contract represents:

- Heartbeat expectation and last heartbeat.
- Deadline.
- Cancellation request, acknowledgement, reason, and actor.
- Retry policy, attempt count, backoff, and prior-attempt link.
- Terminal state, time, reason, and handoff or failure-evidence reference.

V9 validates these records but does not launch workers or enforce wall-clock actions. Runtime enforcement is an adapter responsibility in a later version.

### Adapter Model

V9 adapter manifests declare:

- Identity and version.
- Adapter kind.
- Core and schema compatibility.
- Capabilities.
- Permissions and network requirements.
- Configuration schema.
- Input and output artifact kinds.
- Timeout, cancellation, health, and error behavior.
- Source, maintainer, and provenance.

V9 does not dynamically execute third-party adapters. Future MCP, subprocess, IDE, model-provider, memory, retrieval, verification, and merge adapters implement this metadata contract.

### Security And Privacy

- Init and validate are offline.
- Manifests are data and are never executed.
- Traces store references and bounded structured data by default.
- Secrets, tokens, passwords, keys, connection strings, session identifiers, and sensitive personal data are excluded or redacted.
- Paths are repository-relative, normalized, and traversal-checked.
- Evidence capture, retention, and deletion are explicit.
- Optional adapters declare permissions before use.

### Verification

CI will run:

- Existing PowerShell protocol checker and regression suite.
- Format, lint, typecheck, unit, integration, fixture, build, and package checks.
- Node 22 and 24.
- Windows and Ubuntu for path and process portability.
- Clean initializer and clean consumer installation.
- npm pack inspection without publishing.

## Public Identity Blocker

The user selected DevRail, but the scan found:

- devrail.dev is an active adjacent framework for AI-agent development standards.
- It already uses AGENTS.md-style shims, .devrail.yml, devrail init, and CI gates.
- The unscoped npm package devrail is already owned.
- TraceRail is also used by an agentic automation product.

No public identity token is frozen in package names, binary names, schema identifiers, directories, or domains until the owner chooses to reopen naming or explicitly accepts the collision.

## Consequences

### Positive

- Small core with a direct path from files to executable validation.
- Typed contracts are portable across IDEs and future runtimes.
- Strict schemas plus semantic fixtures prevent false confidence.
- Local traces stay inspectable without a hosted backend.
- Adapter capabilities and permissions are explicit.
- Runtime liveness requirements are represented without overclaiming execution.

### Negative

- JSON is more verbose for humans than YAML.
- Ajv is a production dependency.
- Node 22 support constrains use of Node 24-only APIs.
- A local event format still requires maintenance and compatibility tests.
- One package may need splitting after the adapter ecosystem grows.
- Implementation cannot begin until the public identity question is resolved.

## Alternatives Considered

### Python

Rejected for V9 because the target distribution is an IDE-facing cross-platform CLI and TypeScript contracts integrate more directly with Node tooling and JSON Schema consumers. A Python adapter remains possible.

### Rust

Deferred because a native binary offers strong distribution and performance but raises contributor and build complexity before performance is a proven constraint.

### Runtime TypeScript Without Compilation

Rejected for distribution. Node's type stripping is useful for local execution but intentionally supports only erasable syntax and should not become a consumer requirement.

### YAML As Canonical

Deferred. It adds parser, typing, duplicate-key, anchor, and normalization choices before need is proven.

### Zod As Canonical Schema

Rejected as the wire-contract source. TypeScript inference is attractive, but JSON Schema is language-neutral and can be consumed by IDEs, CI, and non-TypeScript adapters. Runtime types may be generated or wrapped from the canonical schemas later.

### Full CloudEvents Or OpenTelemetry Core Dependency

Deferred. Their identity, causality, link, and privacy practices are useful, but V9 must remain a local, file-based kernel with optional telemetry export.

### MCP Tasks As The Core Runtime Contract

Deferred. Capability negotiation and task-state concepts are valuable, but Tasks is experimental and the next MCP revision is not final on the decision date.

### Monorepo With Core, CLI, SDK, And Adapter Packages

Deferred. One package is easier to understand and release before extension pressure exists.

## Source Evidence

- docs/research/snapshots/2026-07-09-v9-kernel-architecture-scan.md
- docs/specs/v9-devrail-kernel/
- docs/specs/v8.1-baseline-integrity/orchestration-run.md
- docs/specs/v8.1-baseline-integrity/root-cause-analysis.md

## Review Trigger

Revisit when:

- The owner resolves the public identity and package namespace.
- A second package is justified by a real adapter or embedding use case.
- Node 22 leaves support.
- JSON Schema publishes a newer stable dialect that ecosystem validators broadly support.
- MCP Tasks becomes stable and an adapter needs compatibility.
- A hosted trace service or execution runtime is approved.