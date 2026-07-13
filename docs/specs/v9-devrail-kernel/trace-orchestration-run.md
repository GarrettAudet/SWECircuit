# V9 Trace Inspection Orchestration Run

## Status

Implementation complete; independent review returned `PASS`, canonical local gates pass, and branch CI is pending.

## Pattern

Single implementation owner plus one independent read-only reviewer, followed by a thin CLI slice after the library contract passes.

## Branch And State

- Branch: `codex/v9-devrail-kernel`
- Frozen input baseline: `b2a14ac`
- Active task: T008 event-trace validation and inspection
- Integration owner: primary IDE agent
- Merge target: none for reviewer handoffs

## Roster

| Role | Work Unit | Authority | Stop Condition |
| --- | --- | --- | --- |
| Primary IDE agent | A and C: library, integration, CLI, verification | Own bounded source, tests, synthesis, and memory. | Stop on persistence, execution, public naming, or unresolved security contract. |
| Ptolemy (`019f5d29-c67e-7b90-832f-c463149a210c`) | B: trace contract review | Read and recommend only. | Stop outside T008. |
| Huygens (`019f5d57-ec41-78e1-9e0e-8c946580d2fa`) | B: implementation review | Read and recommend only. | Stop outside T008. |

## Integration Notes

- The reviewer has no write authority, so implementation and review ownership remain explicit.
- Kepler (`019f5d27-6c77-7fe3-9761-144b2c72df03`) failed before starting because the inherited model was at capacity; it produced no review work and was closed.
- Findings map to fixed, deferred, or rejected-with-rationale before T008 passes.
- CLI work starts only after the library result and diagnostics stabilize.
- RunEvent schema, diagnostic-catalog, and case-matrix revisions require compatibility notes and fixtures.

## Review Fan-In

Initial Ptolemy verdict: `REVISE`.

| Severity | Finding | Resolution In Revised Contract |
| --- | --- | --- |
| Critical | Free-form event content could leak through the summary. | RunEvent metadata is ID-only; reasons are closed codes; evidence refs use a reference grammar; no raw event content is returned. |
| Critical | Event-specific payload closure was not real. | RunEvent `spec` becomes an exact discriminated `oneOf`; heartbeat/cancellation use `attemptId`. |
| Critical | Snapshot and JSONL byte semantics were unspecified. | Pre/open/post identity and metadata checks, detectable-mutation limits, delimiter accounting, BOM/blank/CR rules, and precedence are frozen. |
| High | Event type version was not exactly dispatched. | Missing, non-string, and unsupported forms receive dedicated pre-schema diagnostics; current version is exactly `1.0.0`. |
| High | Attempt lineage and summary shape were ambiguous. | Per-run attempt identity, immutable metadata, linear retry lineage, opaque links, and ordered `attempts[]` are explicit. |
| High | Evidence and privacy warnings could amplify output. | Evidence summaries cap at 10,000 with omission counts; all secret matches aggregate to one warning. |
| Medium | CLI behavior was not executable as a contract. | Exact grammar, JSON envelope, human streams, help, usage errors, and internal-failure handling are frozen. |

Focused re-review 1 verdict: `REVISE`.

| Severity | Finding | Resolution In Revision 2 |
| --- | --- | --- |
| High | Closed codes and evidence reference grammar were unnamed. | The plan enumerates every state-specific terminal code, cancellation code, maximum length, and evidence kind-to-reference form. |
| High | Non-string event version had no stable diagnostic. | `SC1223 dispatch.event-version.type` and its exact virtual pointer are frozen for catalog/case-matrix implementation. |
| Medium | New attempt invariants lacked deterministic mappings. | `SC3026` through `SC3029` map identity, lineage, missing-reference, and must-start-queued failures; repeated declaration semantics are exact. |

Focused re-review 2 verdict: `REVISE`.

| Severity | Finding | Resolution In Revision 3 |
| --- | --- | --- |
| High | Terminal diagnostics contradicted permitted post-terminal evidence. | `SC3022` now applies only to a later state event; `SC3025` covers heartbeat/cancellation, while outcome/evidence references remain permitted. |
| High | Repeated attempt wording contradicted terminal-code addition. | Every immutable field repeats; `terminalCode` is explicitly absent while non-terminal and present exactly once on the terminal state event. |
| High | Path references lacked an exact character grammar. | The plan freezes one bounded ASCII regex that rejects whitespace, controls, URI syntax, backslashes, and current/parent/empty segments. |

Focused re-review 3 verdict: `REVISE`.

| Severity | Finding | Resolution In Revision 4 |
| --- | --- | --- |
| Medium | Secret suppression still allowed implementation drift. | Six exact JavaScript expressions, flags, whole-value suppression, one root `SC4101`, and positive/negative/aggregate/slot fixtures are normative. |

Focused re-review 4 verdict: `PASS`, with no actionable findings. The reviewer confirmed that the schema/catalog/case-matrix implementation can now proceed directly from the contract and retained only the documented pure-Node mutation and unlisted-secret boundaries.

No finding is deferred or rejected. Source implementation may begin.

## Implementation Review Fan-In

Initial Huygens verdict: `REVISE`.

| Severity | Finding | Resolution |
| --- | --- | --- |
| Critical | Event-count validation retained every framed record before enforcing the 100,000-event ceiling, allowing dense short records to amplify memory. | Framing now scans all bytes for line-limit precedence but retains at most 100,001 records. Dense-record and line-before-event-count regressions bind the behavior to L01. |
| High | A sole LF or CRLF was treated as an invalid empty record despite the zero-event contract. | Empty, sole-LF, and sole-CRLF traces return zero events; repeated final terminators remain invalid under bound T12 cases. |
| Medium | Command and test evidence identifiers lacked their frozen 128-character suffix ceiling. | Kind-specific schema limits and at-limit/over-limit T13 cases enforce the boundary. |
| Medium | Public trace input, summary, and constituent types were not re-exported from the library index. | The public type export list now includes the complete trace surface and its enums. |
| Medium | Matrix claims exceeded direct regression evidence. | D03 and T04-T14/L01/PR03 now name and bind exhaustive transition, terminal, retry, missing-reference, newline, limit, evidence, and privacy cases. |

The remediation also adds a final post-read canonical-path recheck.

Focused implementation re-review 1 verdict: `REVISE`.

| Severity | Finding | Resolution |
| --- | --- | --- |
| Medium | Every trace read allocated the full 64 MiB ceiling, even for an empty or tiny file. | The bounded reader now allocates the verified descriptor size plus one growth-detection byte. Bound L02 coverage rejects a return to ceiling-sized allocation. |

The canonical local gate passes format, lint, typecheck, build, all 202 tests with zero skips, and dry-run package inspection.

Final focused implementation re-review verdict: `PASS`, with no actionable findings.

## Handoff

Preimplementation contract review completed `REVISE -> REVISE -> REVISE -> REVISE -> PASS` with Ptolemy (`019f5d29-c67e-7b90-832f-c463149a210c`). Independent implementation review completed `REVISE -> REVISE -> PASS` with Huygens (`019f5d57-ec41-78e1-9e0e-8c946580d2fa`); all six findings are fixed.

## Verification

Preimplementation and implementation reviewer `PASS` verdicts are recorded. The canonical gate passes 202 tests with zero skips after both remediation rounds. Commit and remote matrix remain pending.