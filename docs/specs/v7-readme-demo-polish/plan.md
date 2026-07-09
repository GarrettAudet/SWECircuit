# Implementation Plan

## Status

Complete.

## Summary

Regenerate the three README demo GIFs with a cleaner visual language, stable dimensions, larger typography, stronger contrast, and simpler animation steps. Keep the public README structure and asset filenames stable while recording V7 source evidence in the feature package, memory, and milestone.

## Impacted Areas

- `docs/assets/tracerail-module-contract.gif`
- `docs/assets/tracerail-rail-flow.gif`
- `docs/assets/tracerail-platform-composition.gif`
- `docs/assets/source/generate-readme-demo-gifs.py`
- `docs/assets/README.md`
- `README.md`
- `scripts/check-template.ps1`
- `docs/specs/v7-readme-demo-polish/`
- `docs/milestones/v7.md`
- `docs/memory/active-context.md`
- `docs/memory/history-ledger.md`
- `docs/memory/retrieval-index.md`
- `docs/memory/patterns.md`

## Approach

- Use the imagegen skill decision tree to keep this as deterministic project-bound visual work.
- Generate GIFs with the bundled Codex Python runtime and Pillow.
- Commit the source generator so future visual edits are inspectable.
- Use a restrained visual system: dark README-friendly frame, off-white content panel, deep ink text, slate borders, teal and blue accents, amber for optional extension, and crimson only for routing emphasis.
- Reduce each GIF to a small number of clear animation beats.
- Keep labels short and large enough to survive GitHub rendering.
- Preserve the existing asset filenames and README embed paths.

## Interfaces And Data

No public API, schema, file format, data migration, or command changes. Existing README GIF asset paths remain unchanged.

## Architecture And ADR Impact

No ADR is required. This is a reversible documentation asset update inside the existing docs asset structure.

## Security And Privacy

No authentication, authorization, secrets, privacy, retention, destructive action, or external service impact.

## Rollback Or Recovery

Revert the V7 commit or restore the previous GIF files from V6 if the new visuals are rejected.

## Risks And Mitigations

- Risk: GIF compression makes text fuzzy.
  Mitigation: Use larger type, fewer labels, high contrast, and metadata inspection.
- Risk: The visuals become decorative rather than explanatory.
  Mitigation: Keep the three-part module -> rail -> platform structure and short captions.
- Risk: Future agents cannot reproduce the exact assets.
  Mitigation: Commit the deterministic source generator and record the design constraints in implementation notes.
