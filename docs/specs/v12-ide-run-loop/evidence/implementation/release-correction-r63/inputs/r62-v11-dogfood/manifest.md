# R62 V11 Dogfood Failure Evidence

## Command

- Candidate: `d02b2bc590e04ec9496d9d04b7500e94adda9c04`.
- Command: `npm.cmd run dogfood:v11`.
- Exit code: 1.

## Stored Envelopes

| File | Stored bytes | Stored SHA-256 | Raw bytes | Raw SHA-256 |
|---|---:|---|---:|---|
| `r62-dogfood-v11.stdout.base64.json` | 815 | `sha256:ab1e1bcd6c3950dc268d0898a0c03b7fe0ddece3a048a2fae4f1ae1f964ea2b1` | 398 | `sha256:5a5e240cf1ef1b4fde59b4087370a2fbe1ecb934b493b42275b788c4c4e65ced` |
| `r62-dogfood-v11.stderr.base64.json` | 1,920 | `sha256:bf82664b99c9a6aa04bf0c4cced70656de660ed1ad95b4384f6901fa3b7756c0` | 1,226 | `sha256:deea0a908941d55e4e9d4a5dd18896881b4c205732434c1f1a0761ed5e10469c` |

Each compact JSON envelope binds the candidate, command, stream, encoding, raw byte count,
raw SHA-256, and Base64 data. V12 regression coverage decodes and authenticates both streams.

## Interpretation

The stderr proves the exact V11 context mismatch. It does not implicate the copied-gate timeout
correction, which passed its separate exact lifecycle before the aggregate reached dogfood.
