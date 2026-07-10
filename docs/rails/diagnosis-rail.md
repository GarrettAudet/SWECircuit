# Diagnosis Rail

## Purpose

Use the diagnosis rail when a failure is unclear, recurring, flaky, surprising, or producing a cascade of bugs.

## Composition

```txt
failure | reproduce | evidence | classify | retrieve | hypotheses | experiment | root_cause | fix | regression | memory
```

## Modules

| Module | Input | Action | Output | Gate | Outcomes | Artifacts |
| --- | --- | --- | --- | --- | --- | --- |
| Reproduce | Failure report | Establish deterministic steps or document why reproduction is unavailable. | Reproduction steps or constraint | Failure is stable enough to inspect. | `pass`, `clarify`, `block` | Debug notes |
| Evidence | Reproduction | Capture commands, logs, screenshots, traces, and observed state. | Stable evidence bundle | Evidence is sufficient to classify. | `pass`, `clarify`, `block` | Logs, failing command |
| Classify | Evidence | Classify requirements, environment, integration, implementation, data, security, performance, or test failure. | Failure class | Classification is evidence-backed. | `pass`, `clarify`, `diagnose` | Debug classification |
| Retrieve | Failure class | Retrieve related code, docs, history, issues, and prior attempts. | Related context bundle | Context is enough to form hypotheses. | `pass`, `clarify`, `block` | Retrieval pointers |
| Hypotheses | Evidence and context | Generate competing causal explanations. | Ranked testable hypotheses | At least one safe discriminating test exists. | `pass`, `clarify`, `diagnose` | Hypothesis table |
| Experiment | One hypothesis | Run one controlled test and update belief. | Result and updated belief | Evidence advances or rejects the hypothesis. | `pass`, `diagnose`, `block` | Experiment record |
| Root cause | Experiment results | Confirm the causal mechanism and rule out patch-only explanations. | Confirmed cause | Cause is supported by stable evidence. | `pass`, `diagnose`, `clarify` | RCA |
| Fix | Root cause | Apply the smallest causal change. | Causal fix | Change addresses the confirmed cause. | `pass`, `fix`, `diagnose`, `redesign` | Diff, implementation notes |
| Regression | Fix | Add a test, guard, or explicit residual-risk record. | Regression coverage | Recurrence is detectable or accepted as risk. | `pass`, `fix`, `block` | Regression test |
| Memory | RCA and verification | Promote the durable cause, failed attempts, and retrieval pointers. | Durable learning | Future agents can retrieve the lesson. | `pass`, `learn`, `block` | Memory update |

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
