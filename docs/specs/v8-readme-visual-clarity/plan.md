# Implementation Plan

## Status

Complete.

## Summary

Replace the README's GIF-first visual explanation with a primary static concept visual. The visual should communicate TraceRail as a simple composable model before introducing module, rail, gate, and scaling vocabulary.

## Impacted Areas

- `README.md`
- `docs/assets/README.md`
- `docs/assets/source/generate-readme-demo-gifs.py`
- `docs/assets/tracerail-concept.png`
- Supporting generated GIFs under `docs/assets/`
- `scripts/check-template.ps1`
- `docs/specs/v8-readme-visual-clarity/`
- `docs/milestones/v8.md`
- `docs/memory/active-context.md`
- `docs/memory/history-ledger.md`
- `docs/memory/retrieval-index.md`
- `docs/memory/patterns.md`
- `docs/memory/known-issues.md`

## Approach

- Dogfood V7 by preserving deterministic source generation for text-heavy README assets.
- Treat the user's critique as a diagnosis trigger, not a superficial design tweak.
- Use `goal | module | gate | evidence | memory` as the first visual model.
- Generate `docs/assets/tracerail-concept.png` as the primary README asset.
- Keep the GIFs as generated support assets, but remove them from the first README explanation.
- Update the checker so the concept visual is required in README.
- Promote the durable lesson into asset docs and memory: comprehension before polish.

## Interfaces And Data

No public API, schema, command, data, or dependency changes. The README now embeds `docs/assets/tracerail-concept.png` as its primary visual asset.

## Architecture And ADR Impact

No ADR required. This is a reversible documentation asset and checker update.

## Security And Privacy

No authentication, authorization, secrets, privacy, retention, or destructive-action impact.

## Rollback Or Recovery

Revert the V8 branch or restore the V7 README GIF embeds if the static concept visual is rejected.

## Risks And Mitigations

- Risk: The static visual becomes too simple and undersells modularity.
  Mitigation: Keep module, rail, and scale panels inside the same visual and preserve deeper README text below it.
- Risk: Supporting GIF assets become confusing if they are no longer embedded.
  Mitigation: Document them as supporting generated assets in `docs/assets/README.md`.
- Risk: Automated checks cannot prove clarity.
  Mitigation: Preserve debug notes, manual visual inspection, and user critique as review evidence.