# Astraeus Orchestration Compiler Module

## Purpose

Synthesize project-specific agent roles, work units, critic path, synthesis path, permissions, and integration order from repository context.

## Input

- Goal.
- Repository context.
- Spec.
- Architecture constraints.
- Memory and history.

## Action

Compile an orchestration plan with specialized roles, scopes, dependencies, conflict zones, context bundles, allowed actions, verification evidence, handoff format, stop conditions, critic responsibilities, synthesizer responsibilities, and integration ownership.

## Output

- Decomposition plan.
- Work-unit contracts.
- Orchestration run record.
- Permission boundaries.
- Conflict zones, dependencies, allowed actions, verification evidence, and handoff format.

## Gate

Work units are scoped, safe, and integratable, or work routes to `redesign`, `clarify`, or `block`.

## Outcome

`pass`, `redesign`, `clarify`, or `block`.

## Artifacts

- Decomposition plan.
- Orchestration run record.
- Worker handoff format.

## Adapter

Astraeus is an optional policy-compiler implementation of SWECircuit's portable orchestration contracts. It may synthesize a plan but does not own workflow semantics and is not an IDE, model, or provider execution adapter. SWECircuit extracts the contract by default and installs nothing.
