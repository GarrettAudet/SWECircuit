# Revision 69 Platform Scope Decision

## Decision

On 2026-07-24, the owner narrowed the v0.1 release support contract to Windows only.
IDE and provider neutrality remain required; operating-system neutrality does not.

## Release Gate

The exact candidate must pass:

1. Template Check on `windows-latest`.
2. Kernel verification on Windows with Node 22.
3. Kernel verification on Windows with Node 24.
4. The existing local copied lifecycle, complete verifier, non-consuming rehearsal, one-shot
   canonical gate, and fresh three-domain R2 requirements.

macOS and Linux are unsupported and no longer participate in release approval.

## Provenance

Revision 68's seven-job run and exact macOS failure evidence remain preserved as historical source
evidence. Revision 69's bounded Darwin environment correction may remain as best-effort
compatibility work, but no macOS result is required or claimed for v0.1.

## Promotion Rule

A non-Windows platform becomes supported only through a later accepted ADR, an explicit maintainer,
and complete passing qualification on that platform.