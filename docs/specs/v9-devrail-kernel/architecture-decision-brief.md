# V9 Architecture Decision Brief

## Status

Approved by the owner on 2026-07-13 and incorporated into ADR 0001.

## Decision Requested

This architecture bundle is the approved basis for ADR 0001 and the V9 toolchain spike. It does not publish or reserve a package, domain, executable name, schema registry, or hosted service.

## Recommended Kernel

```txt
explicit project manifest
  | strict parser and version dispatch
  | JSON Schema validation
  | cross-reference and circuit semantics
  | deterministic diagnostics
  | read-only trace reconstruction
```

V9 implements initialization, validation, and trace inspection. It does not launch agents, enforce heartbeats, schedule retries, write traces, execute adapters, merge code, or claim tamper-proof history.

## Recommended Decisions

### 1. Runtime And Toolchain

- Node 24 is primary; Node 22 is the compatibility line; both are tested.
- TypeScript 7 compiles strict ESM and emits declarations.
- V9 does not import the TypeScript compiler API.
- Biome provides formatting and linting without a second TypeScript compiler.
- `node:test` and `util.parseArgs` remain the dependency-free test and CLI foundations.
- A clean toolchain spike must pass before schema work; failure returns the ADR to redesign rather than silently adding dual compilers.

### 2. Private Local Conventions

- The repository uses one private root package and lockfile; publishing stays disabled.
- Internal development invocation is `node dist/cli.js`; no public binary name or `npx` claim exists in V9.
- An initialized project has one explicit `swecircuit.json` root manifest plus `swecircuit/modules/` and `swecircuit/circuits/`.
- Project discovery checks only the explicit `--project` path or current directory; it never searches ancestors.
- Init is offline, non-interactive, non-overwriting, and immediately validates its output.
- These are repository and local file conventions, not external namespace acquisition.

### 3. Machine Contract

- Canonical input is strict UTF-8 JSON; YAML remains deferred.
- The first machine API is `swecircuit/v1alpha1` with kinds `Project`, `Module`, `Circuit`, `WorkPacket`, `RunEvent`, and `AdapterManifest`.
- Schema identifiers use stable URLs under `https://github.com/GarrettAudet/SWECircuit/` and do not require network retrieval.
- V9 supports exactly `v1alpha1`; unknown versions and kinds fail closed.
- Package, schema API, event type, and repository milestone versions remain separate.

### 4. Compatibility

- Existing Markdown contracts, `docs/rails/`, rail-named templates, `.tracerail/`, and `tracepack-*` remain historical or 0.x file compatibility artifacts under the PowerShell checker.
- They are not direct kernel inputs.
- V9 defines only canonical Circuit JSON and does not invent a JSON `rail` alias.
- Migration documentation explains how a maintainer creates canonical JSON from a legacy file without rewriting source history.

### 5. Library And CLI Boundary

- Pure library operations initialize a project, validate a project, and inspect a trace.
- The CLI is a thin renderer over the same structured results.
- Library results never throw for expected user input failures; they return diagnostics and success state.
- The library surface is a supported 0.x V9 API, versioned as unstable until 1.0.

### 6. Diagnostics

Each diagnostic has a stable project-owned code, severity, repository-relative artifact path, JSON Pointer, rule, human message, and optional recovery hint. Diagnostics are deduplicated and sorted by artifact, pointer, and code.

Exit classes are:

```txt
0 success
2 invalid project or trace
3 invalid command usage
4 safe I/O failure
5 internal failure
```

Human rendering uses stderr for failures. JSON rendering is machine-readable and never exposes raw Ajv ordering, absolute host paths, control characters, or secret values.

### 7. Trace Scope And State

- V9 reads a caller-supplied JSONL path; it creates no hidden trace directory.
- The producer owns persistence. V9 validates logical append order but does not claim to prove that a file was never rewritten.
- Sequence and causation are authoritative; timestamps are evidence only.
- Current worker state is derived from events, not duplicated as mutable summary fields.
- Completion, failure, cancellation, and timeout are terminal and immutable for one attempt.
- Timeout requires an explicit event; the inspector never infers it from the current clock.
- Retry creates a new linked attempt.
- Evidence references are not opened or fetched; durable evidence includes a digest or immutable Git reference when available.

### 8. Security And Privacy

- Core commands are offline and never execute manifest content or adapter code.
- Event schemas use typed allowlisted fields rather than an arbitrary payload bag.
- Full prompts, conversations, environment dumps, command output, credentials, and evidence content are excluded by default.
- Redaction occurs before producer persistence; the inspector also suppresses high-confidence secret patterns without echoing them.
- Inputs must be regular files contained lexically and after resolution within the project root. URI, device, UNC, ADS, traversal, symlink, junction, and path-altering reparse forms fail; opaque same-path Windows reparse metadata is deferred because the approved pure Node API cannot observe it.
- Resource ceilings apply before expensive parse or graph work; exact constants are public and fixture-tested.
- Only package-owned schemas compile in V9; remote references and custom third-party keywords never execute.

### 9. Adapter Boundary

- V9 validates adapter declaration structure only.
- Permissions are requests, not grants; missing or unknown permissions fail closed.
- Provenance is declared but unverified unless separately attested.
- Configuration schema references remain metadata and are not fetched or compiled.
- Health, timeout, cancellation, and error behavior are declarations, not enforced conformance.

### 10. Portability And Verification

- CI covers Node 22 and 24 on Ubuntu, Windows, and macOS.
- Format, lint, typecheck, unit, integration, fixture, build, package, clean-init, and clean-consumer checks are required.
- Every parser, resolver, graph rule, event transition, path boundary, resource ceiling, diagnostic class, and CLI error path receives a negative fixture.
- Core tests include network traps and prove no optional adapter is required.

## Why This Bundle

It keeps the public idea simple: one explicit project, one machine version, one diagnostic model, and three executable operations. It also preserves the longer-term platform direction because future IDE, agent, memory, verification, and merge adapters can call the same pure library boundary.

## Alternatives Rejected For V9

- Parsing historical Markdown directly.
- A second JSON `rail` vocabulary.
- Recursive project discovery or hidden local state.
- YAML as canonical input.
- A trace writer, scheduler, agent launcher, or adapter runtime.
- Public package publication or namespace acquisition.
- Dynamic third-party schemas or code.

## Approval Effect

The owner's approval authorizes the private toolchain spike and ADR revision. Production dependencies remain limited to the strict schema validator and a duplicate-aware JSON parser; package publication, license selection, and external naming remain separate decisions.
