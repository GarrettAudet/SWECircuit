# Revision 28 Test Plan

## Focused

- Run the TypeScript toolchain suite and require declared/fallback execution, selectable PATH conflicts, version mutation, compilation mutation, path rejection, and shared consumer authority to pass.
- Run release-gate tests and require the packed consumer to call `executeTypeScript` with `TYPESCRIPT_BINDING`, retain the full receipt, and contain no direct binding-path spawn.
- Run the clean offline installed-consumer gate.

## Boundary

- Confirm the packaged executor-boundary document states pre/post entrypoint identity, external concurrent-writer isolation, and transitive toolchain trust without claiming atomic execution.
- Preserve the exact Revision 27 handoff and all retired candidate evidence.
- Record the Revision 41 attempt-41a digest-label annotation as current evidence only.

## Release Sequence

- Update copied-production identities after the causal source is stable.
- Run focused syntax, formatting, lint, typecheck, build, core, release-review, and consumer checks.
- Run the complete serialized lifecycle once for the new source revision.
- Replay V11 with fresh source identities.
- Run the full mutable-source aggregate gate and a fresh immutable package-bound independent review.
- Freeze Candidate 13 only after every preceding result is `pass`.
