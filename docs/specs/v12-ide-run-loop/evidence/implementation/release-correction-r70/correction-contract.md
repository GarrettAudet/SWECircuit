# Revision 70 Correction Contract

## Goal

Close the README trust-binding failure exposed by immutable Revision 69 without regenerating
unrelated V11 evidence or weakening Windows-only support, IDE/provider neutrality, or closed
release authority.

## Scope

- Restore `README.md` to its approved concise 3,843-byte identity.
- Keep v0.1 platform scope in linked `SUPPORT.md` and ADR 0006.
- Make the public-support regression verify the link and external host provider selection.
- Rebind the changed release-gate test identity in the copied lifecycle.
- Preserve the exact R69 verifier stream and unused canonical gate.

No V12 product API, runtime, scheduler, model, provider, IDE adapter, permission, merge, or memory
effect changes.

## Completion Evidence

- Exact R69 failure envelope authenticates and reproduces the V11 mismatch.
- README matches the approved byte count and digest.
- Windows-only support and IDE/provider neutrality remain executable public contracts.
- V11 and V12 dogfood, focused tests, full core, checker, static, and independent review pass.
- One immutable R70 source passes copied lifecycle, complete verifier, non-consuming rehearsal,
  Template Check, Windows Node 22/24, one canonical gate, and fresh three-domain R2.
