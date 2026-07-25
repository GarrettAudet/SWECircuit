# Revision 64 Rehearsal Diagnosis Manifest

The adjacent `diagnosis.json` preserves:

- The exact Revision 64 commit, tree, materialized source identity, and disposition.
- The original rehearsal's known failure and explicit raw-stream limitation.
- Exact base64 replay stdout and stderr with byte counts and SHA-256 digests.
- The LF-normalized diagnostic wrapper is 81,954 bytes with digest
  `sha256:0aff6f98237be490ecdd0b50d92094d7ab84aabbd6c8844be7959b59d117b450`;
  normalization does not change either decoded raw stream.
- Exact replay, lifecycle, and failing-test durations.
- The copied canonical-gate timeout assertion.
- The observed nested candidate and dependency-path lengths.
- The bounded short-path counterfactual.
- The Revision 65 corrected path projection.

The replay is diagnostic evidence for a permanently retired source. It cannot restore Revision 64
eligibility and did not invoke the one-shot canonical gate.
