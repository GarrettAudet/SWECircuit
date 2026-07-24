# Candidate 17 Retirement

## Candidate

V12 Revision 40 commit `129b299d0626e370aab8819703f2a9bcc96ab6cc`, tree `a6509e433f2d76be051f8dfa536aebe00aee8464`.

## Canonical Gate

The candidate passed its one-shot gate with 447/447 core tests, copied lifecycle, package inspection, and offline installed-consumer verification. Preserve and never rerun:

- Receipt: 3,667 bytes, `sha256:e3d4aa0cda0621438d90192efe0e44d60fa907278e8d5d97d8ce0ca91b3dec9b`.
- Stdout: 303,723 bytes, `sha256:99dbdbf1ed68fb10bbcf0fdea22ff33f0749c665bf8a7864cd30e3d611836573`.
- Stderr: 26,531 bytes, `sha256:f361d55c369c310ffcefd5d8b9647d16431fe035a505b7419e697ab6cb50733d`.

## Fresh R2 Outcome

R2 authenticated 218 contexts, compiled an exact three-agent partition, and bound compilation/package digests `sha256:2180101082e8c7e967eba9b21b2e4434ff6753c2d7d61df09430cd53bc0e9c78` / `sha256:8f76e09e89345951dff4ed6c48f926e50bcfba3da240409cd278a0003e4ca805`.

- Product/API/IDE: verified `pass`.
- Lifecycle/correctness: verified `pass`.
- Security/trace/authority: verified `fix`.

Closed handoff verification returned `releaseReady: false`. The security finding requires closed, receipt-bound execution authority and six additional transitive review sources.

## Retirement

Candidate 17 is retired without rerun. Revision 41 is the bounded successor. A passing gate does not override a later authenticated review route.
