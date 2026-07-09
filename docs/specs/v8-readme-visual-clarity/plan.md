# Implementation Plan

## Status

Complete.

## Summary

Replace the README's GIF-first and generated-PNG visual explanation with a primary static SVG concept visual. The visual should communicate TraceRail as a simple set of linked repo components before introducing deeper module, rail, gate, and scaling detail.

## Impacted Areas

- `README.md`
- `docs/assets/README.md`
- `docs/assets/tracerail-core-rail.svg`
- `docs/assets/source/generate-readme-demo-gifs.py`
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

- Treat the user's critique as a diagnosis trigger, not a superficial design tweak.
- Replace the generated PNG concept diagram with a source-controlled SVG.
- Use a linked-component metaphor to show `goal | spec | rail | gates | evidence | memory`.
- Keep the visual unique to TraceRail: traceability, rails, gates, evidence, and durable memory.
- Keep the GIFs as generated support assets, but remove them from the first README explanation.
- Update the checker so the SVG concept visual is required in README.
- Promote the durable lesson into asset docs and memory: use a simple repo concept visual before custom diagrams.

## Interfaces And Data

No public API, schema, command, data, or dependency changes. The README now embeds `docs/assets/tracerail-core-rail.svg` as its primary visual asset.

## Architecture And ADR Impact

No ADR required. This is a reversible documentation asset and checker update.

## Security And Privacy

No authentication, authorization, secrets, privacy, retention, or destructive-action impact.

## Rollback Or Recovery

Revert the V8 branch or restore the V7 README GIF embeds if the SVG concept visual is rejected.

## Risks And Mitigations

- Risk: The SVG metaphor is too close to existing chain-style examples.
  Mitigation: Use TraceRail-specific components, labels, color treatment, tagline, and rail/evidence/memory framing.
- Risk: The repository name still needs more explanation than ideal.
  Mitigation: Preserve a naming open question and make the tagline explicit: traceable rails for AI software work.
- Risk: Automated checks cannot prove clarity or taste.
  Mitigation: Preserve debug notes, visual preview, and user critique as review evidence.