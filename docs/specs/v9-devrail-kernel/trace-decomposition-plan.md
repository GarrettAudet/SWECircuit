# V9 Trace Inspection Decomposition Plan

## Status

Preimplementation contract passed independent focused re-review; implementation in progress.

## Goal

Implement deterministic, read-only inspection of one caller-owned JSONL trace, then expose the same structured operation through a thin internal CLI without expanding V9 into trace writing, scheduling, evidence retrieval, or adapter execution.

## Review Gate

Ptolemy (`019f5d29-c67e-7b90-832f-c463149a210c`) returned `REVISE` before implementation. The revision closes seven findings:

- RunEvent metadata becomes ID-only; free-form reasons become closed codes; evidence references are reference-shaped.
- Event payloads become a discriminated, exact `oneOf` contract.
- Snapshot checks and JSONL byte/framing rules are explicit.
- `eventTypeVersion` gains exact dispatch, including a non-string diagnostic.
- Attempt identity, lineage, retry, links, and summary ordering are frozen.
- Evidence output is capped and secret warnings aggregate to one diagnostic.
- The internal CLI grammar and streams are frozen before implementation.

## Frozen Operation Contract

- Library API: `inspectTrace({ project?, trace })`.
- `trace` is required and repository-relative. `project` defaults to the current directory; neither option searches ancestors.
- The trace must be one local regular file contained lexically and canonically below the explicit project root. Links, junctions, URI/device/UNC/ADS forms, and resolved escapes fail closed.
- Trace inspection does not require or scan `swecircuit.json`; the root is a containment boundary, not an implicit project-validation request.
- Inspection is offline and read-only. It does not create directories, modify the trace, execute content, open evidence, or invoke an adapter.
- Expected user failures return structured diagnostics and never throw. Exit classes remain 0, 2, 3, 4, and 5.

## File And JSONL Contract

- The inspector opens one descriptor and verifies the pre-open path state, opened descriptor, post-read descriptor state, and post-read pathname state.
- The read buffer is sized from the verified opened descriptor size plus one growth-detection byte; the 64 MiB limit is a ceiling, not a per-call allocation.
- Device, inode, regular-file type, size, modification time, and change time must remain stable. Detectable replacement or mutation fails safely; same-inode/same-metadata races remain outside the pure Node guarantee.
- This is detectable-mutation protection, not an atomic-snapshot or tamper-proof claim.
- The 64 MiB trace limit counts every file byte, including line terminators. It is checked before parsing.
- Records are separated only by LF or CRLF. A lone CR is invalid.
- The 256 KiB line limit counts record bytes and excludes the LF or CRLF terminator.
- UTF-8 must be strict. A leading UTF-8 BOM is invalid JSONL.
- An empty file is a valid zero-event trace. A single optional final line terminator does not create a record.
- Every other empty or whitespace-only record is invalid, including repeated final line terminators.
- A final record may omit its line terminator.
- Event count is the number of records and is capped at 100,000 before per-record parsing.
- Limit precedence is trace bytes, line bytes, event count, then strict per-record parse.

## Event Schema Contract

- Every record must dispatch to `RunEvent`, pass the package-owned schema, and declare exact `eventTypeVersion` `1.0.0`.
- Missing, non-string, and unsupported event type versions emit dedicated dispatch diagnostics before schema validation.
- RunEvent metadata contains only `id`; descriptions are not event payload.
- `spec` is a discriminated `oneOf` keyed by `type`. Every branch has an exact allowed-property set.
- Common fields are `type`, `eventTypeVersion`, `runId`, `sequence`, `correlationId`, `actor`, and optional `time`, `causationId`, and `links`.
- `attempt.state` alone carries the full attempt declaration: `id`, `number`, `workPacket`, `state`, optional `retryOf` and `deadline`, and a state-specific closed `terminalCode` for terminal states.
- Heartbeat and cancellation-request events carry `attemptId`, not a repeated mutable attempt declaration.
- Cancellation uses a closed `reasonCode`; no free-form reason is accepted.
- Workflow outcomes carry `stage` and `outcome`, with optional `workPacket` and `attemptId`.
- Evidence-bearing events carry `evidence`, with optional `stage`, `workPacket`, and `attemptId`.
- Evidence is typed reference metadata. Its `ref` uses a kind-specific reference grammar, not arbitrary prose or captured content.
- The schema rejects state, retry, terminal, heartbeat, cancellation, outcome, stage, work-packet, attempt-reference, or evidence fields on event types that do not own them.

### Closed Codes

| State or event | Allowed code |
| --- | --- |
| `completed` | `success` |
| `failed` | `execution_failed`, `verification_failed`, `review_failed`, `handoff_failed`, `integration_failed` |
| `cancelled` | `cancelled_by_user`, `cancelled_by_policy`, `cancelled_by_parent` |
| `timed_out` | `deadline_exceeded`, `heartbeat_expired` |
| cancellation request | `user_request`, `policy`, `superseded`, `dependency_failed`, `parent_cancelled`, `shutdown` |

A terminal state requires exactly one matching `terminalCode`. A non-terminal state forbids it.

### Evidence Reference Grammar

Every evidence reference is at most 1,286 characters and must match the form assigned to its `kind`:

| Evidence kind | Required `ref` form |
| --- | --- |
| `artifact`, `review`, `decision`, `handoff`, `memory` | `path:<repository-relative-path>[#<anchor>]`; exact ASCII grammar below |
| `command` | `command:<identifier>`; identifier uses the v1alpha1 identifier grammar and is at most 128 characters |
| `test` | `test:<identifier>`; identifier uses the v1alpha1 identifier grammar and is at most 128 characters |
| `commit` | `git:<7-to-64-lowercase-hex-characters>` |
| `digest` | `sha256:<64-lowercase-hex-characters>` |

The exact path-reference regular expression is:

```regex
^path:(?=[^#]{1,1024}(?:#|$))(?!\.{1,2}(?:/|#|$))(?![^#]*/\.{1,2}(?:/|#|$))[A-Za-z0-9._-]+(?:/[A-Za-z0-9._-]+)*(?:#[A-Za-z0-9][A-Za-z0-9._~/-]{0,255})?$
```

It permits dot-prefixed names such as `.github` but rejects empty, `.`, and `..` segments. The allowlist rejects whitespace, controls, non-ASCII text, backslashes, colons/URI schemes, query strings, and other unlisted characters. Command and test identifiers use exact v1alpha1 identifier grammar: `^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$`.

The optional evidence `digest` field remains exactly `sha256:<64-lowercase-hex-characters>`. Reference grammar is syntax validation only; the inspector never resolves or opens a target.

## Trace Semantics

- File order is logical append order. Sequence numbers are trace-global and strictly increasing; gaps are allowed.
- Event identities are trace-global and unique.
- A causation ID must resolve to an earlier unique event in the same run. A cross-run target is always cross-run; an unresolved target is missing; a later same-run target is forward.
- Duplicate event IDs are reported before causation reconstruction; ambiguous duplicate targets are not resolved arbitrarily.
- `links` are opaque, non-causal producer references. V9 does not require them to resolve locally and never opens them.
- Multiple runs may interleave. Run order follows first appearance, and correlation IDs are unique in first-appearance order.
- `run.started` and `run.completed` are literal producer events only. The summary uses `hasStartedEvent` and `hasCompletedEvent`; V9 does not infer lifecycle validity or wall-clock state from them.

### Attempt Identity And Lineage

- Attempt identity is `(runId, attempt.id)`.
- A new attempt's first `attempt.state` event must be `queued`.
- One non-retry attempt may start each run/work-packet lineage. It has `number: 1` and no `retryOf`.
- Every `attempt.state` event repeats the declaration's `id`, `number`, `workPacket`, and the original presence/value of `retryOf` and `deadline`. Only `state` changes, except that `terminalCode` is absent on every non-terminal event and appears exactly once on the terminal state event. Any other addition, omission, or value change is an identity conflict.
- Attempt numbers are unique within one run/work-packet lineage.
- A retry is a new attempt in the same run and work packet, starts queued, names the immediately prior failed/cancelled/timed-out attempt, and increments its number by exactly one.
- A completed attempt cannot be retried. One prior attempt can have at most one retry successor.
- Legal transitions are:

```txt
queued -> running | cancelled
running -> input_required | completed | failed | cancelled | timed_out
input_required -> running | cancelled | timed_out
```

- `completed`, `failed`, `cancelled`, and `timed_out` are immutable terminal states.
- Heartbeats require an earlier attempt in the same run whose current state is `running`.
- Cancellation requests require an earlier attempt in the same run whose current state is `queued`, `running`, or `input_required`; they do not change state.
- Optional attempt references on outcome/evidence events must resolve to an earlier attempt in the same run. Those records may follow terminal state because they describe proof, review, memory, or merge activity.
- Timeout is explicit. Timestamps and deadlines never cause inferred transitions.

## Diagnostic Mapping

Virtual JSONL pointers are zero-based. Event `N` uses root `/N`.

| Violation | Code and pointer |
| --- | --- |
| Missing `eventTypeVersion` | `SC1221` at `/N/spec/eventTypeVersion` |
| Unsupported string `eventTypeVersion` | `SC1222` at `/N/spec/eventTypeVersion` |
| Non-string `eventTypeVersion` | new `SC1223 dispatch.event-version.type` at `/N/spec/eventTypeVersion` |
| Duplicate/regressing sequence | `SC3001` or `SC3002` at `/N/spec/sequence` |
| Duplicate event ID | `SC3003` at `/N/metadata/id` |
| Missing/forward/cross-run cause | `SC3011`, `SC3012`, or `SC3013` at `/N/spec/causationId` |
| Disallowed state pair | `SC3021` at `/N/spec/attempt/state` |
| A later `attempt.state` targets a terminal attempt | `SC3022` at `/N/spec/attempt/state` |
| Retry number above one without `retryOf` | `SC3023` at `/N/spec/attempt/retryOf` |
| Retry's first state is not queued | `SC3024` at `/N/spec/attempt/state` |
| Heartbeat/cancellation request in the wrong current state | `SC3025` at `/N/spec/attemptId` |
| Attempt declaration changes or duplicates a run/work-packet number | new `SC3026 trace.attempt.identity-conflict` at `/N/spec/attempt` |
| Retry target, predecessor, work packet, number, terminal eligibility, or unique-successor rule is invalid | new `SC3027 trace.retry.lineage-invalid` at `/N/spec/attempt/retryOf` |
| Non-state `attemptId` does not resolve to an earlier same-run attempt | new `SC3028 trace.attempt.not-found` at `/N/spec/attemptId` |
| A new retry or non-retry attempt does not start queued | new `SC3029 trace.attempt.must-start-queued` at `/N/spec/attempt/state` |

`SC3024` remains the more specific retry-start diagnostic; `SC3029` handles a first non-retry state. A heartbeat or cancellation request after terminal state emits `SC3025`; outcome and evidence events may reference a terminal attempt. The new codes are added to the normative catalog and case matrix with compatibility notes and negative fixtures before implementation passes.

## Privacy And Output Bounds

- The result never returns raw events, metadata descriptions, cancellation text, prompt/chat content, environment data, command output, credentials, or dereferenced evidence.
- The inspector may return evidence `id`, `kind`, bounded `ref`, `digest`, and `immutable` metadata only.
- At most 10,000 evidence summaries are returned across the trace, allocated in logical order. Each run reports an exact `evidenceOmitted` count for later references.
- Secret detection applies to every string immediately before insertion into the summary. It does not recursively scan or return the source event.
- If any expression below matches any substring, the entire rendered string becomes `[suppressed]`.
- Any number of matches emits exactly one `SC4101` with `artifact: <traceArtifact>` and `pointer: ""`; no matched value enters the diagnostic.
- Suppression never changes exit class by itself and never echoes the matched value.

### Normative Secret Detector

Expressions use JavaScript regular-expression syntax. Only the listed `i` flags are enabled; there is no decoding, normalization, entropy heuristic, or implicit case folding.

| Class | Expression | Flags |
| --- | --- | --- |
| OpenAI-style key | `\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{20,}` | none |
| GitHub token | `\b(?:gh[pousr]_[A-Za-z0-9]{36,255}|github_pat_[A-Za-z0-9_]{82,255})` | none |
| AWS access-key ID | `\b(?:AKIA|ASIA)[A-Z0-9]{16}\b` | none |
| PEM private-key header | `-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----` | none |
| Bearer credential | `\bBearer[\t ]+[A-Za-z0-9._~+/=-]{20,}` | `i` |
| Credential assignment | `\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|password|passwd|secret)[\t ]*[:=][\t ]*[^\s]{8,}` | `i` |

These expressions contain only fixed alternatives, character classes, and bounded or single-pass repetition. Tests include one positive and near-miss negative per class, multiple matches aggregating to one warning, and a sentinel through every summary string slot.

## Summary Contract

The successful result returns:

- `traceArtifact`, `eventCount`, and ordered `runs`.
- Each run's ID, first/last sequence, event count, `hasStartedEvent`, `hasCompletedEvent`, and first-seen correlation IDs.
- Ordered `attempts[]` with ID, number, work packet, current state, retry link, last state-event sequence, and terminal code when present.
- Ordered workflow outcomes with sequence, stage, outcome, and optional work-packet/attempt references.
- Ordered bounded evidence metadata with source sequence/event type plus exact `evidenceOmitted`.

No field claims that a producer event is truthful, that persistence is append-only, that a timestamp is authoritative, or that referenced evidence exists.

## Internal CLI Contract

```txt
node dist/cli.js init [--project PATH] [--project-id ID] [--json]
node dist/cli.js validate [--project PATH] [--json]
node dist/cli.js inspect --trace PATH [--project PATH] [--json]
node dist/cli.js --help
```

- Commands and options are exact, non-interactive, and parsed with `util.parseArgs`; unknown commands/options, duplicate scalar options, missing values, extra positionals, or missing `--trace` emit `SC0001` and exit 3.
- `--project-id` is valid only for `init`; `--trace` is valid only for `inspect`.
- JSON mode writes exactly one compact `OperationResult` JSON object plus LF to stdout for success, warning, expected failure, and mapped internal failure; stderr stays empty.
- Human success summaries write to stdout. Human warnings and errors write to stderr; an error result writes no success summary.
- `--help` writes fixed usage text to stdout and exits 0.
- Unexpected throws are converted at the CLI boundary to one sanitized `SC9001` result without a stack trace.
- The CLI imports and calls the three library operations. It contains no parsing, path, schema, trace, privacy, or state semantics.
- V9 exposes no package `bin`, public executable name, `npx` claim, or external namespace.

## Work Unit A: Integrated Library Implementation

- Objective: add safe bounded trace reading, JSONL parsing, exact event dispatch/schema, semantic reconstruction, bounded redaction, public result types, and adversarial tests.
- Scope: `src/path.ts`, new trace source, root exports/types/constants, RunEvent/common schemas, diagnostic catalog/case matrix, trace tests/fixtures, v1alpha1 contract, and T008 evidence.
- Dependencies: T006 validation commit `a364bf6` and T007 closeout commit `b2a14ac`.
- Authority: edit bounded kernel and T008 artifacts, run local checks, and integrate reviewer findings.
- Stop conditions: trace writing, evidence dereference, project discovery, adapter execution, public package/CLI naming, or unverifiable security claims.

## Work Unit B: Independent Contract Review

- Objective: challenge JSONL framing, path/snapshot safety, event versioning, causation, attempt/retry semantics, privacy, limits, summary honesty, and missing tests.
- Scope: ADR 0001, RunEvent/common schemas, diagnostics/case matrix, this plan, current trace implementation, and tests.
- Authority: read and recommend only; no edits, installs, commits, pushes, or external actions.
- Handoff: severity-ordered findings with exact evidence and strict `PASS` or `REVISE`.
- Stop conditions: agent execution, trace persistence, adapters, README branding, licensing, and public distribution are out of scope.

## Work Unit C: Thin Internal CLI

- Objective: expose `init`, `validate`, and `inspect` through `node dist/cli.js` using the same operation results.
- Scope: exact argument grammar, stable human/JSON rendering, stdout/stderr behavior, exit codes, and CLI tests.
- Dependency: Work Unit A result shape and diagnostics must be stable first.
- Stop conditions: public binary/package claims, interactive prompts, network behavior, or operation-specific business logic in the renderer.

## Verification

- Success traces: empty file, single run, parallel attempts, workflow outcomes, bounded evidence, and interleaved multiple runs.
- State traces: retry, timeout, cancellation, failed handoff, every legal/disallowed transition, terminal immutability, metadata mutation, lineage forks, heartbeat, and cancellation request.
- Structure: invalid UTF-8, BOM, LF/CRLF, lone CR, blank/truncated lines, duplicate keys, wrong kind, missing/non-string/unsupported event version, payload smuggling, duplicate/regressing sequence, duplicate event ID, and missing/forward/cross-run cause.
- Limits: exactly-at and over line bytes, trace bytes, event count, JSON depth, returned evidence, and aggregated privacy warnings.
- Safety: lexical and resolved path rejection, native links, detectable concurrent same-file mutation, no evidence dereference, secret sentinels in every rendered free-string slot, network/process traps, and no optional adapters.
- CLI: fixed help, valid human/JSON output, warnings, invalid usage, missing files, stderr/stdout separation, internal-failure sanitization, and exact exit classes.
- Gates: canonical local verification, template checker and seventeen regressions, independent reviewer `PASS`, encoding/diff checks, and the seven-job GitHub Actions matrix.

## Fan-In Gate

T008 can pass only after the revised contract receives independent `PASS`, the operation and CLI share one result contract, every review finding is fixed/deferred/rejected with rationale, caller-owned traces remain read-only, and local plus remote matrices pass.