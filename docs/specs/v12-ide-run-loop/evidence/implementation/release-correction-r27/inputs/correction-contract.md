# Revision 27 Correction Contract

## Trigger

Revision 26's verified independent review returned `fix`. It accepted the Git-environment correction but found that the declared external TypeScript entrypoint was validated without being bound to the bare `tsc` command selected by top-level npm scripts. It also found incomplete hard-link and path-alias closure.

## Objective

Make one authenticated TypeScript file the explicit compiler authority for build, typecheck, and packed-consumer compilation, independent of ambient `PATH`, candidate-local `.bin` entries, links, aliases, or conflicting commands.

## Scope

- Add one reusable Node-based TypeScript toolchain resolver and launcher.
- Route package build and typecheck scripts through direct `process.execPath` execution of the resolved TypeScript file rather than bare `tsc` command lookup.
- Reuse the same resolver in the canonical release gate and packed-consumer check.
- Require one case-insensitive supply, an absolute path, a plain regular final component, `nlink === 1`, and external containment when host supplied. A supplied path cannot traverse symbolic-link, junction, or alias components; a repository fallback may traverse a dependency-directory alias but must bind the canonical target before inspection or execution.
- Bind path, byte count, SHA-256 digest, link count, and an observed `--version` result to the exact file that is subsequently executed. Reauthenticate the binding before and after both version inspection and compilation.
- Preserve the ordinary repository-local fallback when no host supply is declared.
- Add hostile regressions with distinguishable external, fallback, ambient-`PATH`, and candidate-local compiler sentinels.

## Boundaries

- Preserve Candidate 12 and all Revision 25-26 evidence exactly.
- Do not rerun any retired candidate gate.
- Do not change specialist compiler behavior, schemas, runtime policy, release-review authority, or memory semantics.
- Package metadata may change only as required to route and include the launcher.
- Do not freeze a successor until focused verification, the complete exact-materialization lifecycle, mutable-source pre-freeze verification, and a new independent semantic review pass.

## Acceptance

- Build and typecheck cannot execute a compiler selected through ambient `PATH`.
- A conflicting checkout, candidate-local, or system `tsc` cannot override the declared or fallback binding.
- Supplied paths reject duplicate keys, empty or relative paths, missing paths, directories, final or ancestor links, hard links, and candidate-contained targets.
- Repository fallback paths reject invalid final targets and hard links, canonicalize dependency-directory aliases, and execute only the canonical target recorded in the binding receipt.
- The binding receipt identifies the same canonical path, digest, link count, and version as the file used for compilation.
- Mutation during version inspection or compilation is detected and blocks completion.
- Packed-consumer compilation uses the same closed resolver.
- Focused and complete lifecycle verification pass without weakening existing release guards.
