# Memory Adapters Module

## Purpose

Connect source-preserving memory to optional external memory systems.

## Input

- Source artifacts.
- Durable lessons.
- Retrieval pointers.
- Memory policy.

## Action

Preserve source truth, distill durable summaries, evaluate the adapter, and keep future retrieval fast.

## Output

- Memory update.
- Retrieval pointer.
- Optional external memory record.
- Governance decision recorded as accepted, watch, deferred, or rejected.

## Gate

Memory remains inspectable, source-preserving, private enough, and reversible. If adoption should not continue, record the governance decision in the output and route with `learn`; use `block` when authority, privacy, or evidence is unresolved.

## Outcome

`pass`, `learn`, or `block`.

## Artifacts

- `docs/memory/`
- History ledger.
- Retrieval index.
- Adapter evaluation.
- Practice-register decision.

## Adapter

Basic Memory, Mem0, Zep, Graphiti, A-MEM, and similar systems are optional memory adapters.
