# V11 Dogfood Attempt 7

## Outcome

`FIX`

## Candidate

- Revision: 7.
- Compilation: `sha256:a53f5dc0f91267643de2a2aa38acfc39e7b6a8f36140864ab05d65abc4c6f66f`.
- Package: `sha256:83ab08aa6a50a9c7a5a912bcc982db56f88710d0b6d63b40c8297c96f7e62179`.
- Exact search: 203 candidates, 52 eligible, six selected specialists, projected 23 versus serial 40.

## Preparation

The read-only specialist matched 34/34 source tuples, the immutable `context.spec`, the manifest, both external approval digests, the derived package root, and all specialist contract bindings. Its raw handoff returned `PASS` but identified a material guard risk.

## Integration Decision

The integration owner promoted that risk to `FIX`: raw-equals-filtered does not prove checkout smudge identity. LF bytes under `eol=crlf` or an active custom smudge filter could still change a reviewed context in a clean checkout.

Revision 8 must inspect path attributes, reject unsupported transforms, enforce the declared line-ending form, add direct regressions, and repeat preparation before parallel reviews.
