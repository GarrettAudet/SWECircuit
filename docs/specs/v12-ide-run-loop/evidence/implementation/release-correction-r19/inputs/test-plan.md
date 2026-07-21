# Revision 19 Test Plan

## Behavioral Trust Tests

1. A source mutation or new file after install, after build, or immediately before spawn fails before dynamic runtime import.
2. A later phase reconstructs all earlier outputs without reading any live prior run-root file.
3. Approval and verification fail when the explicit owner compilation or package digest differs from the privately reconstructed package.
4. Approval and verification compare every package-directory file to the reconstructed package envelope and reject missing, extra, or substituted files.
5. Gate evidence with the wrong explicit receipt digest fails before child launch.
6. A handoff with the wrong explicit raw digest fails before verifier launch.

## Filesystem And Supply Tests

1. Operation and candidate roots are realpath-disjoint from the repository.
2. A `node_modules` directory in any candidate-root ancestor fails before runtime import.
3. Links, junctions, reparse aliases, realpath escapes, hardlinked files, unsafe Windows names, ADS syntax, and case aliases fail closed where observable.
4. Missing SRI, non-registry supply, absent explicit cache, relative cache, or network fallback fails closed.
5. npm user/global configuration is explicitly disabled or bound; `NODE_PATH` and `NODE_OPTIONS` remain absent.
6. Declared production dependencies resolve only beneath private `node_modules`.

## Promotion Tests

1. Linked or escaping destination ancestors and linked/hardlinked targets fail preflight before any output write.
2. A conflicting destination fails during full-set preflight, before promotion begins.
3. Injected mid-promotion failure leaves no completion receipt.
4. An exact retry accepts exact immutable files, completes the remaining set, reverifies all bytes, and writes the receipt last.
5. No later phase reads the partial or completed live output set as semantic input.

## Runtime And Evidence Tests

1. Every child is a fresh process with an exact role, phase, candidate, invocation, runtime, and external-input binding.
2. Runtime binding remains deterministic across random materialization roots and includes only truthful observed facts and external declarations.
3. Candidate manifest, phase metadata, compilation summary, approval, child output, final handoff report, and parent receipt compare the same direct runtime digest.
4. A verified non-`pass` reviewer outcome remains a non-success route.
5. Source-text checks may supplement but cannot replace behavioral checks for mutation, reconstruction, resolver confinement, package equality, promotion preflight, failure, retry, and receipt ordering.

## Required Commands

1. `node --check` for the parent, harness, verifier, and focused tests.
2. Each focused test file independently, then the combined pair under a measured bound above the known serial materialization floor.
3. `npm.cmd run format:check`, `npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd run build`.
4. `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
5. `git diff --check` and exact six-file scope inspection.
6. One disposable offline-cache success proof and one missing-cache failure proof without network fallback.

## Success

Every semantic phase is reconstructed from the candidate under exact external inputs; no undeclared private state executes; no live prior package can authorize itself; resolver fallback and promotion paths fail closed; receipt-less partial output remains inert; focused and repository checks pass.

## Stop

Return `fix`, `diagnose`, `redesign`, or `block` if cumulative reconstruction cannot preserve the owner approval pause, any live prior-phase output remains semantic input, private state can change before execution without detection, a dependency can resolve through an ancestor, promotion can follow a link or emit a completion receipt after partial failure, or the design requires authority outside the declared six-file scope.
