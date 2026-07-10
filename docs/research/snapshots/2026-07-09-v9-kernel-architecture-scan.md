# 2026-07-09 V9 Kernel Architecture Scan

## Purpose

Evaluate current primary standards and production practices before TraceRail becomes an executable kernel and before the user-directed DevRail identity is frozen into schemas, package names, commands, or repository paths.

## Questions

- Which runtime gives IDE reach, portability, type safety, and low installation friction?
- Which manifest and schema formats should be canonical?
- Which event and trace conventions should be adopted rather than invented?
- How should heartbeat, deadline, cancellation, retry, and terminal state be represented?
- How should adapters remain optional and capability-aware?
- Which privacy and supply-chain controls belong in the production baseline?
- Is DevRail sufficiently distinct and available as a public product and package identity?

## Primary Sources Reviewed

| Source | Relevant Evidence |
| --- | --- |
| [Node.js release policy](https://nodejs.org/en/about/previous-releases) | Production applications should use Active or Maintenance LTS. Node 24 is LTS; Node 26 is Current on the scan date. |
| [Node.js TypeScript support](https://nodejs.org/dist/latest/docs/api/typescript.html) | Node can strip erasable TypeScript syntax and recommends TypeScript 5.8 or newer, but the supported subset is intentionally constrained. |
| [Node util.parseArgs](https://nodejs.org/api/util.html) | The built-in structured CLI parser has been stable since Node 20. |
| [Node test runner](https://nodejs.org/api/test.html) | The built-in test runner is stable and avoids a core runtime dependency. |
| [Node package entry points](https://nodejs.org/api/packages.html) | New packages should use explicit exports to define and encapsulate the public interface. |
| [JSON Schema Draft 2020-12](https://json-schema.org/draft/2020-12) | Current published JSON Schema dialect with vocabularies, dynamic references, and defined output schemas. |
| [JSON Schema core](https://json-schema.org/draft/2020-12/json-schema-core) | Root schemas should identify their dialect and use stable absolute identifiers. |
| [Ajv strict mode](https://ajv.js.org/strict-mode) | Strict mode is recommended to reject ignored or ambiguous schema constructs. |
| [Ajv JSON Schema support](https://ajv.js.org/json-schema.html) | Draft 2020-12 requires the corresponding Ajv instance and should not be mixed with older dialects in one instance. |
| [Semantic Versioning 2.0.0](https://semver.org/) | SemVer requires a declared public API and reserves 0.y.z for initial development. |
| [CloudEvents 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md) | Portable event envelopes require unique identity, source, type, spec version, and optional time, subject, data schema, and data content type. |
| [W3C Trace Context](https://www.w3.org/TR/trace-context/) | Standard trace and parent identifiers support cross-system correlation; trace state must not contain PII or secrets. |
| [OpenTelemetry tracing API](https://opentelemetry.io/docs/specs/otel/trace/api/) | Operations use spans, parent-child causality, links for non-tree relationships, immutable events, explicit end state, and predictable error status. |
| [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) | Lifecycle negotiation, declared capabilities, JSON-RPC messages, progress, and cancellation are portable agent-integration concepts. |
| [MCP tasks 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/tasks) | Experimental durable tasks define status, timestamps, TTL, polling, cancellation, authorization binding, resource limits, and audit events. |
| [MCP 2026 release candidate](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) | A newer specification is still a release candidate on the scan date and must not become a V9 compatibility claim. |
| [Temporal protocol documentation](https://api-docs.temporal.io/) | Durable activity APIs model heartbeat timeout, retry policy, cancellation, and terminal failure separately. |
| [OWASP logging guidance](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) | Tokens, passwords, keys, connection strings, sensitive personal data, and other secrets should not be recorded directly. |
| [npm scopes](https://docs.npmjs.com/using-npm/scope.html/) | Owner-controlled scopes prevent unrelated publishers from taking package names within that namespace. |
| [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) | OIDC publishing removes long-lived tokens and automatically generates provenance for eligible public packages. |
| [GitHub Node CI](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs) | setup-node, npm ci, and matrix jobs are the documented Node package CI path. |
| [Existing DevRail agent guidance](https://devrail.dev/docs/getting-started/agents/) | An active adjacent project already uses DevRail for AI-agent development standards, AGENTS.md shims, initialization, and CI gates. |
| [Existing DevRail initializer](https://devrail.dev/docs/getting-started/) | The adjacent project already advertises devrail init and .devrail.yml generation. |
| [Existing TraceRail product](https://tracerail.io/) | The previous TraceRail identity is also used by an agentic automation product. |

## Registry And Name Evidence

The public registry query run on 2026-07-09 returned:

~~~txt
npm view devrail name version description repository.url --json
name: devrail
version: 0.1.0
description: Security & Quality Guardrails - Adoption-first developer discipline.
repository: https://github.com/lmelane/devrail.git
~~~

The unscoped devrail package is unavailable. More importantly, devrail.dev occupies a closely adjacent product category and already uses the same initializer and agent-standard language this project planned to adopt. This is a comprehension, discoverability, package, and likely trademark-clearance risk, not merely a package-name inconvenience.

## Findings

### Runtime

Node is the strongest V9 default because the target users work in IDEs and CI across Windows, macOS, and Linux, and Node provides stable built-in CLI parsing and testing. Use a supported LTS line in production. Compile TypeScript to JavaScript for package consumers instead of requiring consumers to rely on runtime type stripping.

Recommended baseline:

- TypeScript 5.8 or newer.
- ESM source and compiled ESM output.
- Minimum Node 22.14.
- Primary development baseline Node 24 LTS.
- CI on Node 22 and 24, with Windows and Ubuntu coverage.
- Explicit package exports and binary entry point.
- Built-in util.parseArgs and node:test for the first small command surface.

### Manifest And Schema

Canonical JSON is the smallest deterministic choice:

- Native parsing requires no YAML dependency.
- JSON Schema validates the wire format directly.
- JSON avoids YAML tag, merge, anchor, implicit typing, and parser-consistency decisions.
- Optional YAML input can be added later as an adapter that converts to canonical JSON before validation.

Use JSON Schema Draft 2020-12 with explicit $schema and $id. Use Ajv's 2020 instance in strict mode, allErrors mode, and deterministic error normalization. Keep semantic graph validation separate from schema validation.

### Versioning

Use separate version channels:

- Package version: SemVer 0.y.z until the public API is stable.
- Schema API version: explicit version in every manifest and event.
- Artifact kind: project, module, rail, work packet, adapter, or run event.
- Event type version: version breaking semantic changes in the event type or schema identifier.
- Compatibility ranges: adapters declare which core and schema versions they support.

Do not treat repository milestones such as V9 as package or schema versions.

### Events And Traces

Use newline-delimited canonical JSON as the local append-only run log. Adopt CloudEvents' portable envelope ideas without claiming CloudEvents conformance in V9.

Every event should include:

- Event identifier, source, type, schema version, timestamp, and subject.
- Run identifier, sequence, attempt, actor, and work-packet reference.
- Correlation and causation identifiers.
- Previous event reference where ordered replay needs it.
- Structured data plus evidence references.
- Redaction metadata when content was omitted or transformed.

Use parent-child causality for ordinary flow and explicit links for fan-in, fan-out, retry, and cross-run relationships. Keep an OpenTelemetry adapter optional. Do not make telemetry export a core requirement.

### Execution State And Liveness

Keep workflow outcomes and worker execution status separate.

Workflow outcomes remain:

~~~txt
pass | fix | diagnose | clarify | redesign | split | block | learn
~~~

Proposed execution states are:

~~~txt
queued | running | input_required | completed | failed | cancelled | timed_out
~~~

A work attempt should include:

- Created, started, last-updated, deadline, and terminal timestamps.
- Heartbeat interval and last heartbeat when liveness is expected.
- Cancellation requested, acknowledged, reason, and actor.
- Retry policy, current attempt, maximum attempts, backoff, and prior-attempt reference.
- Terminal reason and raw handoff or failure-evidence reference.

MCP Tasks is useful evidence for capability negotiation and task lifecycle, but it remains experimental. V9 should borrow stable concepts without advertising MCP Tasks compatibility.

### Adapter Boundary

V9 should define metadata and conformance, not load arbitrary third-party code.

An adapter declaration should include:

- Identifier and version.
- Adapter kind.
- Core and schema compatibility.
- Declared capabilities.
- Required permissions and network access.
- Configuration schema.
- Input and output artifact kinds.
- Health, timeout, cancellation, and error behavior.
- Maintainer and source provenance.

Executable adapter transports remain future work. MCP, local process, and hosted APIs can later implement the same contract.

### Security And Privacy

Core traces should store references and structured summaries by default, not full chats, prompts, environment dumps, or arbitrary command output.

Required controls:

- Explicit evidence capture policy.
- Secret and PII redaction before persistence.
- No access tokens, passwords, keys, connection strings, session identifiers, or sensitive personal data in traces.
- Repository-local path normalization and traversal rejection.
- Bounded event and artifact sizes.
- Adapter permission declarations.
- No network access during init or validate.
- No dynamic execution of manifest content.
- Retention and deletion policy before any hosted trace store.

### Packaging And Supply Chain

Start with one package that exposes both library and CLI surfaces. Split packages only after real adapter or embedding pressure appears.

Before public publishing:

- Resolve product and package identity.
- Select a license.
- Use an owner-controlled npm scope.
- Use npm trusted publishing with OIDC and provenance.
- Restrict package exports.
- Run npm pack and inspect the tarball.
- Test a clean consumer install.
- Keep the lockfile and use npm ci in CI.

## Proposed V9 Decisions

| Practice | Proposed Status | Reason |
| --- | --- | --- |
| Node plus compiled TypeScript | accept | Strong IDE reach, supported LTS portability, stable built-ins, typed public contracts. |
| Node 22.14 minimum and Node 24 primary | accept | Both are supported LTS lines; Node 24 is the current production baseline. |
| Canonical JSON | accept | Deterministic, native, directly schema-validatable, and dependency-light. |
| YAML input | defer | Human-friendly but adds parser and normalization semantics before need is proven. |
| JSON Schema 2020-12 plus Ajv strict | accept | Published schema standard with mature strict validation. |
| One package with explicit exports and a bin | accept | Smallest coherent public surface; split only with evidence. |
| Unscoped devrail npm package | reject | Already owned by another project. |
| DevRail public identity | block pending owner decision | Active adjacent product uses the same name and product vocabulary. |
| Append-only JSONL event log | accept | Local, inspectable, streamable, and source-preserving. |
| CloudEvents-inspired envelope | accept as design input | Standard identity and routing fields without transport dependency. |
| Mandatory CloudEvents conformance | defer | V9 is a local SWE trace, not a general event transport. |
| W3C trace identifiers | optional interoperability | Useful for adapters; no PII or secrets in trace state. |
| OpenTelemetry dependency | defer | Define an adapter later; core evidence must remain local and inspectable. |
| MCP Tasks compatibility | watch | Concepts are useful but the task extension is experimental and a newer spec is not final. |
| Capability-declared adapter manifests | accept | Keeps extensions explicit and core provider-neutral. |
| Dynamic third-party adapter execution | defer | Requires stronger permission, isolation, and trust design. |
| OIDC trusted publishing and provenance | accept before publish | Removes long-lived publish tokens and makes source/build provenance auditable. |

## Architecture Recommendation

Proceed with the technical kernel architecture, but do not freeze a public brand token, npm package name, binary name, schema namespace, hidden directory, or hosted domain until the owner resolves the naming collision.

The recommended V9 implementation boundary is:

~~~txt
canonical schemas | validator | initializer | trace validator/inspector | adapter metadata
~~~

The following remain later runtime work:

~~~txt
agent launch | workspace isolation | heartbeat enforcement | cancellation delivery | retry scheduler | merge engine | hosted trace backend
~~~

## Decision Gate

The user must choose one of these before T003 can pass:

1. Reopen public naming and select a distinctive identity before implementation.
2. Keep DevRail despite the collision, use an owner-controlled package scope, and accept ongoing discoverability and confusion risk.

No license or public publish action is implied by either choice.