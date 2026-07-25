# Revision 63 Root-Cause Analysis

## Reproduction

Against exact Revision 62 commit `d02b2bc590e04ec9496d9d04b7500e94adda9c04`:

```powershell
npm.cmd run dogfood:v11
```

The command exits 1 because `context.gitattributes` does not match its V11-approved identity.

## Evidence

- Raw stdout: 398 bytes,
  `sha256:5a5e240cf1ef1b4fde59b4087370a2fbe1ecb934b493b42275b788c4c4e65ced`.
- Raw stderr: 1,226 bytes,
  `sha256:deea0a908941d55e4e9d4a5dd18896881b4c205732434c1f1a0761ed5e10469c`.
- Both streams are preserved in normalization-safe Base64 envelopes under `inputs/`.
- R62 exact lifecycle passed, so the copied-gate timeout correction is not implicated.
- Hosted run 30154983964 independently failed all seven jobs.

## Classification

`verification identity drift`

## Hypotheses

1. The copied-gate timeout correction changed V11 behavior.
   Rejected: the exact copied lifecycle passes.
2. The added raw-evidence binary rule changed an authenticated repository source.
   Confirmed: removing that one line restores the exact 1,283-byte V11 identity.
3. Removing the binary rule would change the preserved R61 stdout bytes.
   Rejected: the blob is LF-only, remains 2,244 bytes, and retains its exact SHA-256.

## Root Cause

Revision 62 added a path-specific binary attribute to make the initial staged whitespace audit
ignore intentional trailing spaces in a raw evidence file. That changed `.gitattributes`, which
V11 correctly authenticates as part of repository source identity. The attribute was not needed
for byte preservation because the evidence already uses LF-only line endings and the repository
enforces `eol=lf`.

## Smallest Causal Fix

Remove only the R62-specific binary attribute, leave the evidence blob unchanged, and place the
identity regression in V12's release-boundary test rather than an authenticated V11 source.

## Regression Coverage

- Authenticate exact `.gitattributes` bytes and digest.
- Authenticate exact R61 rehearsal stdout bytes, digest, and absence of carriage returns.
- Decode and authenticate both R62 failure envelopes.
- Run strict V11 dogfood and the complete V12 release-boundary suite.
