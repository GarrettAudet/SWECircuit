# Root-Cause Analysis

Use this file when a failure required diagnosis or when a fix should teach future work.

## Status

Complete.

## Trigger

The user reported that the GIFs remained unclear after V7, then reported that the first V8 concept PNG did not look professional. The user provided a simple linked-component reference as the desired level of clarity, while asking for a unique TraceRail version.

## Reproduction

The V7 README sequence required the reader to understand TraceRail vocabulary before the simple idea. The first V8 PNG explained more, but it looked like a custom generated diagram rather than a polished repo concept visual.

## Confirmed Root Cause

The visual work optimized for generated diagrams instead of a memorable public concept mark. TraceRail needed a simple metaphor that communicates the repo concept at a glance.

## Why It Was Missed

Validation focused on deterministic generation, text readability, and checker coverage. It did not include a public-facing taste gate: does this look like something a serious framework would use to explain itself?

## Fix

Create `docs/assets/tracerail-core-rail.svg` as a source-controlled linked-component visual showing:

```txt
goal | spec | rail | gates | evidence | memory
```

Update README, checker, asset docs, and memory to make the SVG the primary concept asset.

## Regression Coverage

- Checker requires `docs/assets/tracerail-core-rail.svg` and the supporting GIF generator.
- `docs/assets/README.md` now states that the primary README concept visual should be simple, memorable, and source-controlled as SVG.
- `docs/memory/patterns.md` records the repo-concept visual pattern.

## Follow-Up Work

- Consider a dedicated naming review because `TraceRail` may require more explanation than ideal.
- Reassess whether supporting GIFs should remain after GitHub README review.

## Memory Update

V8 updates memory with a durable rule: public README visuals should explain the repo concept through a simple memorable metaphor before showing internal framework detail.