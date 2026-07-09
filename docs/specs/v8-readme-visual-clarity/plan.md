# Implementation Plan

## Status

Complete.

## Summary

Replace the rejected V8 SVG direction with the user-approved overview PNG and rebuild the README around one product definition, one visual, one short operating explanation, and direct entry points.

## Impacted Areas

- `README.md`
- `docs/assets/tracerail-overview.png`
- `docs/assets/README.md`
- `scripts/check-template.ps1`
- `docs/specs/v8-readme-visual-clarity/`
- `docs/milestones/v8.md`
- `docs/memory/`
- `CHANGELOG.md`

## Approach

1. Track the exact approved visual under a stable repository filename.
2. Put the positioning and visual at the top of the README.
3. Explain the workflow as define, decompose, route, merge and verify, then learn.
4. Keep only core contracts, start instructions, repository links, principles, and honest status.
5. Remove rejected SVG assets from the final branch.
6. Update checker and trace artifacts to match the accepted result.
7. Validate structure, links, image properties, diff quality, and rendered readability.

## Interfaces And Data

No public runtime interface or data changes. The public documentation interface changes from `docs/assets/tracerail-core-rail.svg` to `docs/assets/tracerail-overview.png`.

## Architecture And ADR Impact

No ADR required. The change is reversible and limited to documentation, assets, validation, and traceability records.

## Security And Privacy

The image contains no secrets, personal data, or external tracking. The README badge loads from GitHub's own Actions endpoint.

## Rollback Or Recovery

Restore the prior README and SVG embed from branch history. Keep the approved PNG in the feature branch until user approval and merge.

## Risks And Mitigations

- Risk: Raster labels are small on mobile.
  Mitigation: Keep the image full width, provide complete alt text, and repeat the workflow in concise text.
- Risk: README becomes another handbook.
  Mitigation: Limit it to the public product story and route detail to canonical docs.
- Risk: Trace artifacts retain rejected claims.
  Mitigation: Search for stale SVG references and update V8, checker, milestone, and memory together.
