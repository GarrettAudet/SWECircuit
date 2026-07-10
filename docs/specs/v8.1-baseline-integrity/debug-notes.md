# Debug Notes

## Status

Complete.

## Failure Summary

The contract-normalization work unit failed twice to produce a shared diff: the first worker stopped on the known apply_patch sandbox error, and the replacement exceeded the bounded handoff deadline despite explicit fallback authority.

The checker regression harness exposed two local bootstrap issues. Independent review then found that the rail-outcome parser had lost escape characters while crossing command-string layers, so the existing suite could pass without exercising rail outcome values. An initial regex-based repair expanded dollar-sign replacement tokens and corrupted the checker before parser validation rejected it.

The first pushed CI run passed the positive checker but failed the regression step under PowerShell Core. Public job metadata isolated the failing step; the harness had not explicitly insulated expected nonzero child-checker exits from edition-specific native-command error preferences.

## Reproduction

1. Assign Work Unit A with apply_patch as the required editor.
2. Observe the Windows sandbox helper fail before file access.
3. Retry with the documented PowerShell fallback authorized.
4. Observe no shared diff or handoff before the integration deadline.
5. Run the initial regression harness and observe parameter initialization and Start-Process environment failures.
6. Inspect the passing checker and observe that the rail parser contains a multiline split pattern and unescaped pipe expressions.
7. Attempt a regex replacement with a PowerShell source body and observe dollar-sign replacement expansion corrupt the script.
8. Restore the checker from the branch baseline, replay changes with literal boundary checks, and run the rail-specific negative fixture.
9. Push commit a3d94cc and observe GitHub Actions run 29068335104 pass the positive checker but fail the regression step.
10. Push the preference-only fix in commit d1d5e13 and observe run 29068699508 fail at the same step without reaching assertion annotations.

## Stable Evidence

- Lagrange handoff: no changed files; apply_patch helper_unknown_error.
- Kierkegaard run: no shared changes before integration-owner termination.
- Orchestration run records all worker ids, scopes, outcomes, and recovery.
- Regression harness outputs captured PSScriptRoot parameter timing and Path/PATH Start-Process collision.
- Review exposed malformed rail parser escapes despite a green nine-case suite.
- PowerShell parser rejected the unsafe regex-replacement result.
- Final positive checker and fifteen-case regression suite pass locally, including completed-criteria, dynamic-discovery, and rail-outcome rejection paths.
- GitHub Actions runs 29068335104 and 29068699508 isolate the remote failure to Run checker regression tests; the positive checker succeeded in both.
- Run 29068699508 disproves the preference-only repair because it failed before the new assertion annotations were emitted.
- The official actions/checkout release API identifies v7.0.0 as current, while the failed run warned that v4 was using a deprecated Node runtime.

## Failure Classification

- Tooling environment failure.
- Missing runtime heartbeat and deadline enforcement.
- Test-harness portability failure.
- Cross-layer string escaping failure.
- Negative-test coverage gap.
- Unsafe source transformation.
- Cross-edition native-process preference mismatch.
- Successful baseline restoration and centralized recovery.

## Context Retrieved

- docs/memory/failed-attempts.md
- docs/specs/v8.1-baseline-integrity/decomposition-plan.md
- Worker handoffs.
- scripts/check-template.ps1
- scripts/test-check-template.ps1
- PowerShell parser and replacement-string behavior in the current environment.
- .github/workflows/template-check.yml
- https://github.com/GarrettAudet/TraceRail/actions/runs/29068335104
- https://github.com/actions/checkout/releases/tag/v7.0.0

## Hypotheses

| Hypothesis | Evidence For | Evidence Against | Experiment |
| --- | --- | --- | --- |
| The patch helper failure is the original blocker. | First worker returned the exact known sandbox error. | Replacement had fallback authority. | Retry with fallback permission. |
| A fallback alone guarantees completion. | Direct writes work for the integration owner. | Replacement still missed the handoff deadline. | Timebox and interrupt replacement worker. |
| The current orchestration protocol can enforce liveness. | Contracts include stop conditions. | The external runtime provided no automatic heartbeat or deadline action. | Invoke manual deadline and cancellation. |
| Start-Process is portable in this host. | It works in ordinary Windows sessions. | Host environment exposed duplicate Path/PATH keys. | Replace it with direct child-process invocation. |
| A green module-outcome fixture also proves rail-outcome parsing. | Both use the same canonical value set. | Rails have a separate Markdown-table parser. | Add a non-canonical rail-outcome fixture. |
| Regex replacement is safe for PowerShell source bodies. | It can replace a bounded function in one operation. | Dollar-sign sequences have replacement semantics. | Parse the rewritten script, then restore and use literal substring splicing. |
| Expected child exit codes behave identically across PowerShell editions. | Local Windows PowerShell runs passed. | Both pwsh CI runs failed only in the regression step; a local preference override did not change the result. | Bypass the native invocation path with System.Diagnostics.Process and preserve the process exit code directly. |

## Experiments

| Experiment | Hypothesis | Result | Conclusion |
| --- | --- | --- | --- |
| Retry Work Unit A with fallback authority | Fallback guarantees completion | Failed | Editing recovery and orchestration liveness are separate concerns. |
| Interrupt and close replacement worker | Manual stop condition can recover | Passed | Central owner can recover, but the runtime should automate it. |
| Direct child PowerShell invocation | Avoid Start-Process environment collision | Passed | Regression harness is stable locally and in Windows CI shape. |
| Add non-canonical rail-outcome fixture | Shared canonical logic already proves rails | Failed before repair, passed after repair | Every parser path needs its own negative fixture. |
| Regex-based function replacement | Source body can be inserted as a replacement string | Failed | Source containing dollar signs must use literal splicing or a match evaluator. |
| Restore from HEAD and replay bounded edits | Baseline plus literal edits can recover safely | Passed | The checker returned to a parseable, reviewable state without touching other files. |
| Permanent malformed-repository fixtures | Checker rejects semantic contract failures | Passed | Fifteen positive/negative cases now protect the baseline. |
| Explicit native child-process preferences | Expected failing fixtures remain assertion data under pwsh | Failed in run 29068699508 | Preference assignment alone did not reach assertion handling in CI. |
| System.Diagnostics.Process child isolation | Bypass PowerShell native-command semantics while preserving process exit codes | Passed locally; remote retry required | The harness now reads exit code, stdout, and stderr directly and annotates top-level or cleanup failures. |
| Update actions/checkout from v4 to v7 | Remove the deprecated Node runtime warning | Pending remote retry | The workflow now references the current official major release. |

## Current Status

The integration owner completed Work Unit A, recovered the checker from its branch baseline, and all fifteen local regression cases pass. The preference-only CI repair was rejected; child checkers now run through System.Diagnostics.Process, and merge still requires a green branch CI retry. Worker, repair, and first-CI failures remain preserved as V9 and tooling requirements.

## Next Action

Complete final repository review, push V8.1, confirm CI, and request user approval plus a separate license decision before merge.
