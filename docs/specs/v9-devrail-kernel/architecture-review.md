# V9 Architecture Review

## Status

Complete.

## Review Target

- Branch: `codex/v9-devrail-kernel`
- Baseline: `35f96d2`
- Primary artifact: `docs/architecture/decisions/0001-executable-kernel-foundation.md`
- Pattern: three bounded read-only specialist reviews with centralized integration

## Overall Outcome

All three reviewers returned `REVISE`. None recommended replacing the Node, JSON, JSON Schema, local trace, or provider-neutral direction. The architecture is viable, but its public contracts are not precise enough to freeze.

## Converged Findings

| Priority | Finding | Reviewers | Required Resolution |
| --- | --- | --- | --- |
| Blocker | 0.x compatibility has no executable definition. | Architecture, developer experience | Keep legacy Markdown under the existing checker; do not create an undocumented JSON `rail` alias. Define canonical Circuit JSON only. |
| Blocker | First-run discovery and local machine conventions are undefined. | Architecture, developer experience | Define explicit project manifest, generated layout, internal invocation, project-root behavior, and collision rules. |
| High | Diagnostics are not a stable contract. | All | Define codes, structured fields, deterministic ordering, JSON Pointer paths, renderers, streams, and exit codes independent of Ajv wording. |
| High | Versioning and embedding are incomplete. | Architecture, developer experience | Define exact API version and kinds, schema identifiers, unsupported-version behavior, and pure library operations used by the CLI. |
| High | Trace authority and append-only claims are ambiguous. | Architecture, security | Make producer-owned JSONL authoritative, derive state during inspection, and narrow V9 to logical validation rather than writer or tamper-proof claims. |
| High | Liveness lacks a normative event/state model. | Security | Define legal transitions, sequence authority, terminal immutability, explicit timeout events, retry links, and cancellation races. |
| High | Privacy defaults are too permissive and retention is unresolved. | Security | Use typed allowlisted event fields, pre-persistence redaction obligations, bounded content, non-dereferenced evidence references, and no core retention claim. |
| High | Path containment and untrusted-input limits are incomplete. | Security | Define lexical and resolved containment, link rejection, regular-file rules, safe diagnostics, byte/depth/graph/event ceilings, and offline schema resolution. |
| High | Toolchain and platform support are not concrete. | Developer experience | Choose TypeScript 6 or 7, formatter/linter, compiler-API policy, locked dependencies, and a truthful Windows/macOS/Linux CI matrix. |
| Medium | Adapter declarations could be mistaken for enforcement. | Architecture, security | Limit V9 to structural adapter-manifest validation; treat permissions as requested, provenance as unverified, and behavior as unenforced. |

## Work Unit A: Architecture And API Coherence

Reviewer: Gibbs (`019f5c46-89a1-7443-a7f0-584a8bfbf1ca`).

Verdict: `REVISE`, architecture outcome `clarify`.

Key findings:

- Compatibility dispatch, version behavior, and canonical output were undefined.
- Private packaging still requires concrete source layout, manifest location, schema export path, and local invocation.
- Diagnostics risked exposing Ajv-specific wording and ordering as public behavior.
- The trace model mixed producer responsibilities, mutable summaries, and inspector-derived state.
- Adapter declarations overstated behavioral conformance that V9 cannot enforce.

Validated choices:

- Node LTS, compiled TypeScript ESM, explicit exports, `util.parseArgs`, and `node:test`.
- One unpublished package with library, CLI, and schema surfaces.
- JSON, JSON Schema 2020-12, Ajv strict mode, and no canonical YAML.
- Separate workflow, execution, and governance state types.
- Metadata-only adapters and historical Markdown preservation.

## Work Unit B: Security, Privacy, And Trace Safety

Reviewer: Aristotle (`019f5c46-bf97-7f80-9f91-ce97089bacff`).

Verdict: `REVISE`; do not begin schema freeze.

Threats identified:

- Secret or personal-data persistence through arbitrary event fields or diagnostics.
- Repository escape through path forms, links, reparse points, URIs, or evidence dereferencing.
- Resource exhaustion through oversized, deeply nested, or pathological input.
- Corrupted or misleading trace reconstruction through partial writes, duplicate identity, illegal transitions, or wall-clock inference.
- Self-asserted adapter permissions or provenance being treated as authorization or trust.

Required invariants:

- Core commands remain offline; validate and inspect are read-only; init never overwrites, follows links, spawns processes, or reads credentials.
- Sequence is authoritative; timestamps are evidence only.
- Every attempt has one immutable terminal state; timeout requires an event.
- Unknown versions, fields, permissions, and capture classes fail closed.
- Redaction occurs before persistence and output; diagnostics never echo secret values or absolute host paths.
- Numeric limits apply before parsing and graph construction.
- Adapter validity means structural declaration validity only.

Required fixture families:

- Secret sentinels in every string-bearing field and output path.
- POSIX, Windows, UNC, device, ADS, URI, symlink, and reparse escapes.
- Invalid encoding, duplicate keys, oversized or deeply nested input, partial JSONL, and event-count exhaustion.
- Duplicate identity, cross-run causes, events after terminal state, illegal heartbeat/cancellation/retry transitions, and wall-clock-only timeouts.
- Unknown permissions, inline secrets, remote schema references, control-character injection, absolute-path leakage, and network traps.

## Work Unit C: Developer Experience And Evolution

Reviewer: Kierkegaard (`019f5c46-f89c-7da3-8284-c9bcf9902a44`).

Verdict: `REVISE`, architecture outcome `redesign` limited to the contract.

Key findings:

- Acquisition and invocation, project-root discovery, generated files, collision behavior, and trace input were undefined.
- Human and machine diagnostics need one structured result model.
- Legacy Markdown and current rail paths should remain checker-supported provenance rather than become a second machine vocabulary.
- Pure initialization, validation, and trace reconstruction should be library operations with a thin CLI renderer.
- TypeScript and format/lint choices must be concrete, and macOS support must be tested or narrowed.

Recommended simplifications:

- One explicit root manifest; no recursive discovery or ancestor-directory search.
- Canonical JSON only; YAML deferred.
- Explicit JSONL path for inspection; no hidden state directory.
- No `npx` or public package claim while publishing remains disabled.
- Non-interactive, offline, non-overwriting initialization followed by immediate validation.

## Integrated Disposition

Retain the proposed kernel boundary and revise ADR 0001. T005 remains gated until the owner approves the concrete architecture bundle in `architecture-decision-brief.md` and the ADR records it normatively.

## Limitations

- Reviewers were read-only and did not install dependencies or execute a toolchain spike.
- No schemas or runtime exist yet, so findings are contract-level rather than code-level.
- The refresh used current primary sources, but TypeScript 7.0 tooling compatibility still needs a local spike.
