# Root-Cause Analysis

Use this file when a failure required diagnosis or when a fix should teach future work.

## Status

Complete.

## Trigger

The user reported that the GIFs remained wildly unclear after V7 and clarified that the real need was a clear concept visualization, not necessarily animation.

## Reproduction

The V7 README visual sequence required the reader to understand module, rail, gate, pack, adapter, and platform before it explained the simple user-facing TraceRail model.

## Confirmed Root Cause

V7 optimized visual polish and generated asset quality but did not validate conceptual comprehension. The README visual started with internal framework vocabulary instead of a simple core expression.

## Why It Was Missed

V7 verification checked layout, typography, deterministic generation, and frame quality. It did not include a first-reader comprehension gate.

## Fix

Create a primary static concept visual and update the README to lead with:

```txt
goal | module | gate | evidence | memory
```

The generated GIFs remain as supporting assets, but they no longer carry the first explanation.

## Regression Coverage

- Checker requires `docs/assets/tracerail-concept.png` and the generator.
- `docs/assets/README.md` now states comprehension before polish.
- `docs/memory/patterns.md` records the comprehension-first visual pattern.

## Follow-Up Work

- Consider renaming the generator to match its broader asset role.
- Reassess whether supporting GIFs should remain after GitHub README review.

## Memory Update

V8 updates memory with a durable rule: public visuals should teach the mental model before internal framework vocabulary, and animation should not be the primary explanation when a static concept visual is clearer.