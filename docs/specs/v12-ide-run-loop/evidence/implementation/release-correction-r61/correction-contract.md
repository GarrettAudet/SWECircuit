# Revision 61 Correction Contract

## Trigger

Revision 60 commit `d7f95dff6dc098dfcd38f64de4e21edfe4b587c3` passed local focused, core, lifecycle, full, hosted, and independent verification. Its canonical one-shot gate then failed in the isolated copied lifecycle after all 461 core tests passed.

## Objective

Make the copied lifecycle preserve the exact enclosing candidate Git authority when it creates its nested candidate, without weakening the canonical gate's closed environment or repository isolation.

## Required Behavior

1. Preserve the immutable Revision 60 gate receipt and logs.
2. Permanently retire Revision 60; never rerun its one-shot gate.
3. Pass one explicit enclosing Git runner to nested source materialization and disposable Git-context creation.
4. Preserve exact commit, tree, blob, closed-environment, and cleanup checks.
5. Add a regular core guard that fails if either explicit runner binding is removed.
6. Re-run focused, lifecycle, core, full, hosted, independent, and canonical verification on a new exact candidate.

## Scope Boundary

The correction is limited to the copied lifecycle test and its executable regression guard. It adds no runtime, model, provider, IDE, scheduler, spawning, permission, merge, or memory effect.

## Route

`verify -> diagnose -> fix -> verify -> review -> freeze`
