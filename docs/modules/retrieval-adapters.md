# Retrieval Adapters Module

## Purpose

Connect stage-aware retrieval to optional external tools.

## Input

- Active rail.
- Stage.
- Context need.
- Existing retrieval index.

## Action

Retrieve the smallest useful context from docs, code, memory, source snapshots, official docs, or optional retrieval tools.

## Output

- Context bundle.
- Source links.
- Retrieval notes.

## Gate

Context is sufficient for the next module, or work routes to `clarify` or `block`.

## Outcome

`pass`, `clarify`, or `block`.

## Artifacts

- Retrieval index.
- Context bundle.
- Source snapshot.

## Adapter

Serena, Repomix, Context7, official docs MCPs, and similar tools are optional retrieval adapters.
