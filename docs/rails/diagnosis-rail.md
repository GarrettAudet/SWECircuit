# Diagnosis Rail

## Purpose

Use the diagnosis rail when a failure is unclear, recurring, flaky, surprising, or producing a cascade of bugs.

## Composition

```txt
failure | reproduce | evidence | classify | retrieve | hypotheses | experiment | root_cause | fix | regression | memory
```

## Modules

| Module | Input | Output | Gate |
| --- | --- | --- | --- |
| Reproduce | Failure report | Reproduction steps or reason reproduction is impossible | Failure is stable enough to inspect or route to `block`. |
| Evidence | Reproduction | Logs, screenshots, traces, failing commands | Evidence is captured or route to `block`. |
| Classify | Evidence | Failure class | Class is plausible or route to `clarify`. |
| Retrieve | Failure class | Related code, docs, history, memory | Context is enough or route to `block`. |
| Hypotheses | Evidence and context | Competing hypotheses | Hypotheses are testable or route to `clarify`. |
| Experiment | Hypothesis | Result and updated belief | One hypothesis advances or route to next hypothesis. |
| Root cause | Experiment results | Confirmed cause | Cause is supported by evidence or continue diagnosis. |
| Fix | Root cause | Small causal fix | Fix addresses cause or route to `diagnose`. |
| Regression | Fix | Test or guard | Regression coverage exists or risk is recorded. |
| Memory | RCA | Durable learning | Learning is recorded or explicitly unnecessary. |

## Artifacts

- Debug notes.
- Root-cause analysis.
- Failing command.
- Evidence.
- Regression test.
- Memory update.

## Stop Conditions

- Reproduction cannot be established.
- Evidence contradicts the current hypothesis.
- Fix scope expands beyond the ticket.
- Safety or data risk appears.
