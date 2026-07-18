# V11 Dogfood Attempt 22

## Status

Retired before integration. Audit B and Candidate A admission passed, preparation and three Wave 2 lanes returned `PASS`, and the independent security/trace lane returned `REVISE`. The integration specialist did not launch.

## Bound Identities

- Candidate compilation: `sha256:642ad0726e8019231d6e357a8602c387a47a637d2ce94fc0701efedaf1ae5869`.
- Candidate package: `sha256:8ddb1130c6af875f708fb347d46473d532dec0ff796834869ee644f6ee488bbc`.
- Audit B compilation: `sha256:0b9d61f44a25d5fc13eb5cfea82bd51c1417bc113fe52f0651f719e8293835ac`.
- Audit B package: `sha256:c6ec32f791ed698956d9b953596a9afae2636e65edb1cb069113fe4de62294e8`.

## Execution Results

- Audit B binder: `PASS`; all 10 immutable Candidate A artifacts authenticated.
- Audit B semantic reviewer: `PASS`; all 203 partitions, 52 eligible candidates, selection, fixed schedule, authority, evidence duties, canonical-record correction, and both package roots independently reproduced.
- Candidate preparation: `PASS`; all 36 source tuples authenticated.
- Product/API review: `PASS`.
- Algorithm/lifecycle review: `PASS`; ordinary JSON and rendered-package permutation invariance approved.
- Release verification: `PASS`; 353/353 tests and all canonical gates passed, including the 119-case matrix in 217.4 seconds.
- Security/trace review: `REVISE`; public diagnostic artifact sanitization preserved lone UTF-16 surrogates and high-confidence secret text, while pointer sanitization preserved lone surrogates.
- Integration: not launched.

## Blocking Finding

`src/diagnostics.ts` protected diagnostic artifacts against controls but not lone surrogates or high-confidence secrets, and protected diagnostic pointers against controls and secrets but not lone surrogates. The downstream semantic handoff was fail-closed, but exported `createDiagnostic` and `parseJsonBuffer` could still emit unsafe public diagnostic fields.

## Required Correction

- Apply `containsLoneSurrogate` to diagnostic artifact and pointer sanitization.
- Apply `containsHighConfidenceSecret` to diagnostic artifact sanitization.
- Add public-API and contained-read regressions for lone high/low surrogates and secret-bearing artifacts.
- Recompile revision 23 and repeat both packages, approvals, Audit B, Candidate A execution, and integration gates. No attempt-22 approval or PASS carries forward.
