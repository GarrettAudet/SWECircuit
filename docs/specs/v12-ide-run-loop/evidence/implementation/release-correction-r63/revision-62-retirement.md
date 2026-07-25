# Revision 62 Retirement

## Candidate

- Commit: `d02b2bc590e04ec9496d9d04b7500e94adda9c04`.
- Tree: `8d59a40ad37aaf8f700bc375a38fac2558ce1dac`.
- One-shot canonical gate: never invoked.

## Exact Results

- Copied-production lifecycle: 2/2 `pass` in 562,108 ms.
- Complete exact verifier: `fail` at strict V11 dogfood after earlier stages passed.
- Focused reproduction: `npm.cmd run dogfood:v11` exits 1 with an exact
  `context.gitattributes` identity mismatch.
- Hosted run
  [30154983964](https://github.com/GarrettAudet/SWECircuit/actions/runs/30154983964):
  all seven jobs `fail`.

## Failure

V11 expected `.gitattributes` at 1,283 bytes and
`sha256:4626d1e064ae446e63b50a072443b874a9619c012ac283d7903d03cd028b53a3`.
Revision 62 supplied 1,418 bytes and
`sha256:09f198d9107e5b156912afbf66e7494d7f0f8c3765db9db2547de2362196b130`.

## Disposition

Revision 62 is permanently retired. Its passing lifecycle does not override the failed exact
aggregate or hosted matrix, and its unused one-shot gate must never be invoked.
