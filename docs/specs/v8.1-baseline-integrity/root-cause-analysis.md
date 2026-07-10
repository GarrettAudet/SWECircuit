# Root-Cause Analysis

## Status

Complete.

## Trigger

A write-enabled contract work unit failed once on the known patch helper and once on liveness, the first regression harness failed before testing repository behavior, and independent review found a rail-outcome validation path that the green suite had not exercised.

## Reproduction

Use the steps and evidence in debug-notes.md.

## Confirmed Root Cause

The failures had five causes:

1. The Windows sandbox patch helper can fail before file access.
2. The external subagent runtime does not enforce the file-based contract's heartbeat, deadline, cancellation, or retry semantics.
3. The first regression harness resolved PSScriptRoot too early and used Start-Process in an environment with duplicate case-insensitive Path keys.
4. Rail-parser source crossed multiple command-string escape layers without a rail-specific negative fixture, allowing malformed escapes to survive positive validation.
5. The first repair used a .NET regex replacement string for source containing dollar signs, which invoked replacement-token semantics instead of preserving the source literally.

## Why It Was Missed

The previous dogfood run was read-only and did not exercise worker editing, liveness, cancellation, or a subprocess-heavy negative fixture harness. The first V8.1 suite tested module outcome values and rail table columns but not rail outcome values, so it could not prove the separate table parser. Parser validation was initially run before, rather than after, the unsafe repair.

## Fix

- Preserve failed worker outcomes and retry state in the orchestration run.
- Recover bounded scope centrally instead of hiding or endlessly retrying it.
- Resolve script paths after param evaluation.
- Invoke checker child processes directly instead of Start-Process.
- Add permanent positive and negative regression tests for every semantic parser path.
- Restore corrupted generated scripts from a known branch baseline and replay edits with literal, boundary-checked transformations.
- Run parser validation after every source rewrite and before semantic tests.
- Promote heartbeat, deadline, cancellation, retry, raw-handoff, and source-safe editing requirements into follow-up work.

## Regression Coverage

The checker regression suite now proves the valid repository passes and rejects unchecked completed criteria; malformed debug, milestone, module, rail, decision, and pattern artifacts; and dynamically discovered invalid pack, module, and rail entries.

## Follow-Up Work

- Implement runtime liveness controls in the executable kernel.
- Capture raw worker handoffs, timing, and commit identities.
- Test isolated write workers on executable code and external repositories.
- Give every new parser or discovery path a dedicated malformed fixture.

## Memory Update

Record the failed worker attempts, central recovery pattern, checker negative-fixture pattern, literal replay pattern, and first write-enabled dogfood evidence in durable memory.
