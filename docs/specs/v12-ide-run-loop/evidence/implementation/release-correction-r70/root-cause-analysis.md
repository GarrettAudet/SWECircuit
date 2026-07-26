# Revision 70 Root Cause Analysis

## Reproduction

Run `npm.cmd run verify` at exact Revision 69 commit
`c6b35f057049382cb68cfbd71a96604b6fbfd325`.

## Stable Evidence

The canonical raw-evidence envelope under `inputs/r69-full-verify/` binds the complete UTF-16LE
PowerShell combined stream. Core passes 476/476 and copied lifecycle passes 2/2. V11 dogfood then
reports:

- Expected: 3,843 bytes,
  `sha256:d37b90c342a1a46a2b9c374ae660c998d2c63d047267fc72c865b68d0bb3a9fc`.
- Received: 3,998 bytes,
  `sha256:659423200b3c2745e782e22e956f724cbbac8607b7db5109beeffb71599c3e3e`.

## Classification

Approval-bound context identity drift. This is not a V12 runtime or Windows compatibility defect.

## Confirmed Cause

The Windows support note duplicated `SUPPORT.md` inside an approval-bound README after the last
V11/V12 dogfood replay. The immutable complete verifier correctly rejected the changed bytes.

## Causal Fix

Restore the exact approved README, retain Windows scope in its linked support document, change the
public-support regression to verify that composition, refresh the copied-lifecycle test identity,
and require dogfood in mutable qualification for future approval-bound context edits.
