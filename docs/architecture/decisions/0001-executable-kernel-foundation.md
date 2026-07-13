# ADR 0001: Executable Kernel Foundation

## Status

Accepted on 2026-07-13. The owner approved the reviewed architecture bundle for the private V9 kernel. This decision does not reserve or publish a package, domain, command name, schema registry, or hosted service; SWECircuit is the repository and project name.

## Date

2026-07-09; revised and accepted 2026-07-13.

## Context

The V8.2 baseline is a checked, file-based operating protocol. V9 creates the first executable surface for initializing a project, validating machine-readable workflow contracts, and inspecting caller-supplied execution traces.

The kernel must make the repository's modular model executable without implying that V9 launches agents, schedules work, writes traces, enforces heartbeats, executes adapters, merges code, or proves tamper-resistant history. It must also preserve historical Markdown and rail-named artifacts as source records without treating them as machine inputs.

## Decision Drivers

- One understandable first-run path.
- Deterministic behavior across Windows, macOS, and Linux.
- Pure library operations that IDEs, CI, and future adapters can embed.
- Strict version dispatch, validation, and actionable diagnostics.
- Offline operation and fail-closed security boundaries.
- Source-preserving, privacy-conscious trace inspection.
- Minimal production dependencies.
- Explicit separation between the V9 kernel and future orchestration runtimes.

## Decision

### Scope

V9 provides exactly three operations:

1. Initialize a minimal local project.
2. Validate a project and its canonical machine artifacts.
3. Validate and inspect a caller-supplied JSONL trace.

V9 does not launch agents, schedule retries, enforce liveness, write traces, execute adapters, fetch evidence, modify source control, or merge changes.

### Runtime And Toolchain

- Node 24 is the primary development runtime; Node 22 is the compatibility line.
- TypeScript 7 compiles strict ESM and emits declarations.
- V9 does not import the TypeScript compiler API.
- Biome provides formatting and linting.
- `node:test` provides the test runner.
- `util.parseArgs` provides CLI argument parsing.
- A clean toolchain spike must pass before schemas are frozen. Failure routes this ADR to redesign instead of adding a second compiler or formatter.

### Private Package And Local Project Shape

- The repository uses one private root package and lockfile with publishing disabled.
- Internal development invocation is `node dist/cli.js`; V9 makes no public binary or `npx` claim.
- An initialized project contains `swecircuit.json`, `swecircuit/modules/`, and `swecircuit/circuits/`.
- Project discovery uses only an explicit `--project` path or the current directory. It never searches ancestor directories.
- Initialization is offline, non-interactive, non-overwriting, and immediately validates its output.

These are local repository conventions, not external namespaces.

### Library And CLI Boundary

The library exposes pure operations for initialization, project validation, and trace inspection. Expected user-input failures return a success state plus structured diagnostics; they do not throw. Unexpected internal failures may throw and are mapped by the CLI to the internal-failure exit class.

The CLI is a thin renderer over the same structured results. The library surface is a supported but unstable 0.x API until a separate 1.0 decision.

### Canonical Machine Contract

- Canonical input is strict UTF-8 JSON. YAML is deferred.
- Schema dialect is JSON Schema Draft 2020-12.
- The first machine API version is `swecircuit/v1alpha1`.
- Supported kinds are `Project`, `Module`, `Circuit`, `WorkPacket`, `RunEvent`, and `AdapterManifest`.
- Unknown API versions and kinds fail closed.
- Schema identifiers are stable URLs below `https://github.com/GarrettAudet/SWECircuit/` and never require network retrieval.
- Package version, schema API version, event type version, and repository milestone version remain separate.

Only package-owned schemas are compiled. Remote schema references and custom third-party keywords are rejected.

### Compatibility Boundary

Existing Markdown contracts, `docs/rails/`, rail-named templates, `.tracerail/`, and `tracepack-*` remain historical or 0.x file compatibility artifacts checked by the PowerShell protocol checker. They are not V9 kernel inputs.

Canonical machine workflows use `Circuit`. V9 does not define a JSON `rail` alias. Migration guidance explains how maintainers create canonical JSON from legacy source without rewriting history.

### Parsing, Discovery, And Resource Limits

Inputs must be strict UTF-8 JSON with no comments, trailing commas, or duplicate object keys. Project artifacts are discovered only through explicit manifest references; the kernel does not recursively scan arbitrary directories.

The implementation must enforce public, fixture-tested ceilings before expensive parsing or graph work. V9 starts with these limits:

| Resource | Limit |
| --- | ---: |
| One JSON artifact | 1 MiB |
| JSON nesting depth | 64 |
| Referenced project artifacts | 10,000 |
| Circuit graph edges | 10,000 |
| One JSONL event line | 256 KiB |
| One inspected trace | 64 MiB |
| Events in one trace | 100,000 |

Changing a limit is a documented compatibility change with fixtures.

### Validation Order

Validation runs in this order:

1. Path containment, file type, size, and UTF-8 checks.
2. Duplicate-aware strict JSON parsing.
3. API version and kind dispatch.
4. Package-owned JSON Schema validation.
5. Cross-reference resolution.
6. Circuit graph or event-state semantics.
7. Permission and policy validation.
8. Diagnostic deduplication and deterministic sorting.

A schema-valid artifact is not necessarily a semantically valid project or trace.

### Diagnostics And Exit Classes

Every diagnostic has:

- A stable SWECircuit-owned code.
- Severity.
- Repository-relative artifact path.
- JSON Pointer.
- Rule identifier.
- Human-readable message.
- Optional recovery hint.

Diagnostics are deduplicated and sorted by artifact, pointer, and code. JSON output never exposes raw validator ordering, absolute host paths, control characters, or secret values.

CLI exit classes are:

```txt
0 success
2 invalid project or trace
3 invalid command usage
4 safe I/O failure
5 internal failure
```

Human-readable failures go to stderr.

### Separate State Channels

Workflow outcomes remain:

```txt
pass | fix | diagnose | clarify | redesign | split | block | learn
```

Worker execution states are separate:

```txt
queued | running | input_required | completed | failed | cancelled | timed_out
```

Governance states are also separate:

```txt
accepted | optional | watch | deferred | rejected
```

These channels must not be collapsed into one enum.

### Trace And Liveness Model

The inspector reads one caller-supplied JSONL file and creates no hidden trace directory. The producer owns persistence. V9 validates logical sequence and causation but does not claim to prove that a file was never rewritten.

Sequence and causation are authoritative; timestamps are evidence only. Current worker state is derived from events rather than duplicated in mutable summary fields. Evidence references are validated as references and are never opened or fetched.

Allowed attempt-state transitions are:

```txt
queued -> running | cancelled
running -> input_required | completed | failed | cancelled | timed_out
input_required -> running | cancelled | timed_out
```

`completed`, `failed`, `cancelled`, and `timed_out` are immutable terminal states for one attempt. Timeout requires an explicit event and is never inferred from the current clock. Retry creates a new linked attempt in `queued` state.

### Security And Privacy

- Core commands are offline and never execute manifest content or adapter code.
- Event schemas use typed allowlisted fields rather than arbitrary payload bags.
- Full prompts, conversations, environment dumps, command output, credentials, and evidence contents are excluded by default.
- Trace producers must redact before persistence. The inspector also suppresses high-confidence secret patterns without echoing them.
- Inputs must be regular files contained both lexically and after resolution within the project root.
- Explicit project roots reject URIs, device paths, UNC paths, alternate data streams, and control characters before filesystem access.
- Symlinks and junctions in artifact paths fail closed without target dereference. Path-altering reparse behavior also fails when canonical resolution diverges from the expected path.
- Opaque same-path Windows reparse attributes are not exposed by the approved pure Node API and are deferred until a native mechanism is justified; regular-file, containment, and open-descriptor identity checks still apply.
- Evidence references are not dereferenced.

### Adapter Boundary

V9 validates adapter declaration structure only. Permissions are requests, not grants; missing or unknown permissions fail closed. Provenance is declared but unverified unless separately attested. Configuration schema references are metadata and are not fetched or compiled. Health, timeout, cancellation, and error behavior are declarations, not enforced conformance.

### Dependencies

Production dependencies are limited to:

- Ajv in strict Draft 2020-12 mode.
- One duplicate-aware JSON parser selected and proven by the toolchain spike.

Development dependencies are limited initially to TypeScript 7, Biome, and Node type declarations. Any additional dependency requires a recorded justification.

### Verification

CI covers Node 22 and 24 on Ubuntu, Windows, and macOS. Required checks are format, lint, typecheck, unit, integration, fixtures, build, package inspection, clean initialization, and clean consumer use.

Every parser, resolver, graph rule, event transition, path boundary, resource ceiling, diagnostic class, and CLI error path receives a negative fixture. Core tests include network traps and prove no optional adapter is required.

## Consequences

### Positive

- The executable surface remains small: one project, one machine API, one diagnostic model, and three operations.
- IDEs, CI, and future adapters can share the same pure library boundary.
- Strict dispatch and deterministic errors make failures traceable.
- Historical source records remain intact without creating a second machine vocabulary.
- Privacy, path safety, and resource limits are part of the contract rather than later hardening.

### Negative

- JSON is more verbose for humans than YAML.
- Ajv and a duplicate-aware parser become production dependencies.
- Node 22 compatibility constrains use of Node 24-only APIs.
- Rejecting symlinks and external evidence paths is intentionally conservative.
- The 0.x library API and resource limits require explicit migration notes when changed.

## Alternatives Considered

- **Python or Rust:** deferred because Node and TypeScript best match the initial IDE-facing, JSON-based surface with lower contributor friction.
- **Runtime TypeScript without compilation:** rejected as a consumer requirement.
- **YAML as canonical input:** deferred because it adds parser and normalization ambiguity before need is proven.
- **Zod as the wire-contract source:** rejected because JSON Schema is language-neutral.
- **Historical Markdown parsing or a JSON rail alias:** rejected because it would turn provenance into an ambiguous machine contract.
- **A writer, scheduler, launcher, or adapter runtime:** deferred beyond the bounded V9 kernel.
- **Dynamic third-party schemas:** rejected from core because they expand the execution and supply-chain boundary.
- **A public package or command namespace:** deferred until public distribution is explicitly approved.

## Source Evidence

- `docs/research/snapshots/2026-07-09-v9-kernel-architecture-scan.md`
- `docs/research/snapshots/2026-07-13-v9-architecture-refresh.md`
- `docs/specs/v9-devrail-kernel/architecture-review.md`
- `docs/specs/v9-devrail-kernel/architecture-decision-brief.md`
- `docs/specs/v9-devrail-kernel/orchestration-run.md`
- `docs/specs/v8.1-baseline-integrity/root-cause-analysis.md`

## Review Triggers

Revisit this decision when:

- Public package distribution, a domain, or another external namespace becomes a real requirement.
- The V9 spike cannot pass with the selected toolchain.
- A second package is justified by a real adapter or embedding use case.
- Node 22 leaves support.
- JSON Schema publishes a newer stable dialect with broad validator support.
- A hosted trace service, trace writer, scheduler, or execution runtime is approved.
