# Prepare Candidate PASS - Attempt 5

- Outcome: `PASS`.
- Compilation: `sha256:20adea92233a3d6a6d5a852e940a959f37e0b570333999dd784b450d0509687d`.
- Package: `sha256:5824f61dedfa82e479b412eb4a091c25c5a1d43b59ce94a9ec8ee47e61757f07`.
- Manifest-resolved contract: 23,050 bytes and domain-separated digest `sha256:bc6e6ba7b69419e53840efe6d710dcca4117441de4e0c269fff6b162e2e06eeb`.
- Evidence: 34/34 authorized repository sources matched exact byte counts and raw SHA-256 digests; package and contract bindings passed 13/13.
- Full source ledger: `review-candidate-digests-attempt-5.json`.
- Boundary: candidate identity only; substantive independent reviews remain required.
- Friction: an initial in-memory PowerShell package check mishandled empty JSON arrays; the binder corrected the verifier without filesystem writes and the complete rerun passed.
