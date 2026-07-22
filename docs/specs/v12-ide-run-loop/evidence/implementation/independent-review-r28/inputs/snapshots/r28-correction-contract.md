# Revision 28 Correction Contract

## Trigger

Revision 27's package-bound independent review returned `fix`. It found that the packed-consumer path discarded the authenticated binding before compilation and that the Revision 27 contract overclaimed what portable pre/post pathname checks prove against a concurrent same-authority writer.

## Objective

Close the packed-consumer execution gap, add the missing persistent-compilation-mutation and selectable-command regressions, and state the toolchain evidence boundary precisely. Preserve the host-isolation boundary instead of introducing a platform-fragile private loader that would leave TypeScript's transitive dependencies and native executable unbound.

## Scope

- Route packed-consumer TypeScript compilation through `executeTypeScript` with the complete approved binding.
- Require the consumer to retain and compare the complete version-bearing receipt.
- Preserve pre/version/pre-compile/post entrypoint authentication and add encoding support for captured compiler output.
- Add a real persistent mutation regression during compilation.
- Replace non-selectable `.mjs` PATH sentinels with platform-selectable `tsc` or `tsc.cmd` commands.
- Define entrypoint selection and pre/post identity as repository evidence; define concurrent writer isolation and transitive toolchain trust as external host duties.
- Add a current annotation for the non-authorizing Revision 41 attempt-41a digest-label inconsistency without changing its raw handoff.

## Boundaries

- Preserve Candidate 12 and Revision 25-27 evidence exactly.
- Do not run or freeze Candidate 13 until focused, lifecycle, aggregate, and package-bound independent review gates pass.
- Do not claim atomic execution, operating-system isolation, or authentication of transitive TypeScript files from one entrypoint digest.
- Do not add a private Node module loader, provider coupling, or platform-specific execution contract.

## Acceptance

- Packed-consumer compilation uses the same full binding, version observation, pre/post authentication, and receipt as build and typecheck.
- No packed-consumer code reduces the binding to a pathname for direct execution.
- A persistent mutation during compilation is detected after the compiler child returns.
- Ambient and candidate-local conflicting commands are actually selectable on the current platform and remain unused.
- Public contract text distinguishes stable-path evidence from host-enforced isolation and transitive dependency trust.
- Historical Revision 41 bytes remain unchanged while the current annotation names the incorrect attempt-41a label and the successful authoritative digest.
