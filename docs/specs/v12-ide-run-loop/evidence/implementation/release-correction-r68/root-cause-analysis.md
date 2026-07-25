# Revision 68 Root-Cause Analysis

## Status

Root cause confirmed. The bounded correction is implemented and under independent re-review.

## Reproduction

Run fresh source-bound R2 against Revision 67 after its canonical pass. Preserve and verify all
three exact reviewer handoffs, then perform the parent fan-in.

## Stable Evidence

- Security handoff outcome: `fix`.
- Security handoff: 6,660 bytes,
  `sha256:ad5c8d3c8a69f4d732dede03b7b869c3e57765a67b58edf316b626f1a717637d`.
- Product handoff: `pass`, 9,335 bytes,
  `sha256:ddcb966a168d4d55dd76337ff2a80bc8b2ec931684637ef61c9f4e46e9b18927`.
- Lifecycle handoff: `pass`, 6,434 bytes,
  `sha256:3e0aea82ba1e2a782a907b2045a2acfa0461906aaf45a6a639a6173eefae0ae0`.
- The verifier authenticated the complete roster and retained `releaseReady: false`.

## Confirmed Causes

The worker rejected selected Node and npm controls and validated selected Git values, but did not
prove the complete effective key/value environment. Added Git object/configuration variables,
proxy settings, credentials, or future runtime controls could therefore remain outside preserved
identity while authority-relevant child operations used `process.env`.

The independent security package identified the parent by digest but omitted its semantic source
snapshot. That parent constructs the worker environment and runtime binding, supplies phase
authority, and launches the workers, so the reviewer could not inspect the complete authority
decision.

The first correction also exposed a verifier-specific sequencing gap: the verifier's closed
context keys lacked `effectiveEnvironment`, and it imported the shared harness only after reading
candidate runtime inputs. A helper-only regression did not exercise that real entrypoint order.

## Causal Correction

The parent binds every effective child key and raw UTF-8 value through a case-insensitive, sorted,
domain-separated identity. Harness and verifier independently reconstruct and compare the exact
binding before candidate operations. The verifier repeats validation through the authenticated
shared initializer before using the generated runtime.

The Windows child-process baseline explicitly includes observed account variables and `TEMP`;
their exact values remain bound. Arbitrary SWECircuit, Git configuration/object, proxy, Node, and
npm additions still change the complete binding and are rejected.

The parent source and fresh-process causal fixture are security-owned R2 sources.

## Regression Strategy

1. Compare parent, harness, and verifier bindings for one exact environment.
2. Reject added arbitrary, Git configuration, Git object, and proxy keys in both validators.
3. Repeat those attacks in fresh harness and verifier processes.
4. Assert verifier validation precedes reconstruction, reads, policy use, tooling, and import.
5. Run the real four-phase copied lifecycle only from one committed candidate.
6. Require all hosted jobs, one fresh one-shot gate, and fresh three-domain R2.
