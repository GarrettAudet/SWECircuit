# Revision 19 Independent Security Review Contract

## Objective

Independently determine whether the exact Revision 19 implementation closes every Revision 18 rejection cause and introduces no new release-evidence trust defect. This is a read-only semantic review of the final six implementation files and their exact package-verified evidence.

## Exact Implementation Identity

- Compilation: `sha256:f4834982911064d5a3c5f9fa1d2c350376da8bead9d7a036ec639a7b9a52beca`.
- Package: `sha256:1cdedbda0fd297f0e06c8bf58f162a7bccd099bc84e4c1935af8cb1ff433042b`.
- Passing raw handoff: 5,918 bytes; `sha256:ee8665855792db9c241afadff4b300ad55bf71d25f6e930933d18b0931bba894`.
- Handoff semantic digest: `sha256:9ee26438b4745dda8a4aa351dc6b97956a0573645deaab24daa4bb3e666bfa20`.
- Handoff content digest: `sha256:4cfcdd68963f8ce19e8cbb3bb88fe347da1f9514c4e8536ecc3853f76e04dac1`.
- Focused suite: 29 of 29 pass; 0 failed; process exit code 0.

## Required Review

Authenticate every declared source before semantic use. Then inspect data flow, path handling, process boundaries, trust claims, and behavioral tests. Explicitly resolve all seven Revision 18 findings:

1. Candidate source is revalidated after materialization, install, build, immediately before each child, and after each child; undeclared state cannot execute.
2. No live prior run-root package, compilation, approval, snapshot, binding, receipt, or phase output is trusted. Every invocation reconstructs its required phase prefix privately, and approval/verification compare against explicit owner compilation and package digests.
3. Promotion rejects links, aliases, hardlinked targets, conflicts, and escapes; the complete output set is preflighted; the deterministic completion receipt is promoted last; receipt-less partial output is never semantic input.
4. Repository, operation, candidate, cache, and output boundaries use realpath-aware containment; candidate ancestors cannot supply `node_modules`; declared production dependencies resolve only inside candidate-private supply.
5. The externally supplied parent digest is checked against candidate and live bytes, while documentation and receipts correctly leave malicious-parent authentication and process isolation to the host.
6. Offline cache, environment, npm lifecycle, Git configuration, executable observations, and toolchain claims are explicit and no stronger than the implementation can establish.
7. Critical controls have executable behavioral adversarial tests, not only source-text assertions.

Also search for new bypasses, inconsistent phase grammar, time-of-check/time-of-use errors within the stated hostile-process boundary, mutable or self-derived authority, package substitution, external-input substitution, unclosed private state, unsafe Unicode/path aliases, output-set ambiguity, and claims that exceed repository behavior.

## Verdict

Return `pass` only if the exact reviewed bytes satisfy the contract with no release-blocking finding. Return `fix`, `diagnose`, `redesign`, or `block` with concrete file/line evidence for any defect. A passing focused suite is evidence, not a substitute for semantic review.

## Authority

- Read only the declared exact context bundle.
- Use only read-only `git`, `node`, `rg`, and PowerShell inspection commands.
- Do not edit files, run package installation, mutate Git state, launch descendants, use network access, refresh V11 evidence, run a candidate release gate or R2 phase, claim release readiness, approve merge, or alter any prior evidence.
- Return only the generated contract's closed `SpecialistAgentHandoff` JSON object.

## Residual Host Boundary

The operating system, host executables, offline-cache provenance, malicious parent code, and hostile same-user process isolation remain external-host responsibilities. This review must verify that the repository states that boundary accurately; it must not claim to establish those external facts.
