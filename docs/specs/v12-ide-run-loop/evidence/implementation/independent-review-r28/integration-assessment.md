# Revision 28 Integration Assessment

## Semantic Result

The exact package and 9,384-byte raw handoff verify successfully. The reviewer authenticated all 42 declared inputs and returned `fix` for one release-blocking evidence gap: the copied-production lifecycle replaces the fixture's `verify` script with syntax-only `node --check` commands, so it never executes or receipts the supplied TypeScript compiler through the production launcher.

The integration owner accepts this finding. The helper forwards a TypeScript path to the canonical gate, but `FIXTURE_VERIFY_COMMAND` only parses `scripts/run-typescript.mjs`; the lifecycle then checks only that the syntax-only command appeared in the raw log. A materialized-process regression can therefore pass while the launcher remains merely syntactically valid.

## Accepted Controls

Revision 28's direct corrections remain accepted: the packed consumer preserves the complete binding through `executeTypeScript`, pre/post execution receipts bind path, bytes, digest, link count, and version, hostile PATH commands are platform-selectable, persistent mutation and alias tests exercise exported production paths, and the host boundary is stated accurately. The fully logged aggregate, installed consumer, and V11 Revision 42 replay also remain valid supporting evidence.

## Integration Result

- `semanticRouteAccepted: true`
- `correctionAccepted: false`
- `phaseReady: false`
- `candidate13Consumed: false`

## Route

Open Revision 29. Make the copied fixture invoke the production TypeScript launcher with a real distinguishable external compiler and bounded compilation input. Assert the complete version-bearing receipt and compiler sentinel from the canonical gate log. Add a copied-lifecycle negative route that persistently mutates the compiler during compilation and must fail after child return.

Repeat focused verification, the exact copied lifecycle, aggregate verification, and a fresh immutable package-bound review before Candidate 13 can be frozen.