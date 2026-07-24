# Revision 50 Correction Contract

## Trigger

The first complete copied lifecycle for Revision 49 exposed three causal-test defects after the focused boundary had passed.

## Objective

Make the copied production lifecycle distinguish successful null fields, accept the canonical compact TypeScript receipt, and count runtime execution rather than a command echo.

## Required Behavior

1. Preserve a successful `setupError: null` without rewriting it as unavailable.
2. Accept the exact one-line canonical JSON emitted by the TypeScript runner.
3. Count the fresh-process runtime sentinel exactly once and exclude command text.

## Scope

Copied-lifecycle parsing, assertions, and production identity bindings only. Product APIs and the canonical gate contract are unchanged.

## Route

`verify -> diagnose -> fix -> verify -> review`
