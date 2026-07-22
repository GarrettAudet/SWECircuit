# Revision 27 Full Verify Attempt 2 Diagnosis

## Bound Input

- Checkpoint: `4a3437a`.
- Command: `npm.cmd run verify`.
- This was mutable-source pre-freeze verification, not a canonical candidate gate.

## Verified Before Stop

- Outcome: `fix`; total duration 2,766.7 seconds.
- Format passed for 102 files.
- Lint passed for 88 files with informational diagnostics only.
- Authenticated typecheck and build passed with the bound TypeScript 7.0.2 receipt.
- Core tests passed 435 of 435 in 460,709.572 ms.
- The serialized production lifecycle passed 1 of 1 in 2,237,591.634 ms.
- The specialist example and V10 dogfood passed.

## Failure Boundary

V11 dogfood stopped before compilation because its revision-40 `GoalContract` retained stale identities for three context sources changed by Revision 27 release hardening:

- `biome.json`: expected 814 bytes at `sha256:fb275f564aed63c6dc5da2bc7ff81364ec40359b964a3586946e45d2804a5d82`; observed 850 bytes at `sha256:46039f3c3c78511addc1b752193e1b795faaf4c227eae752cf32a29f3c2f866a`.
- `scripts/check-packed-consumer.mjs`: expected 45,720 bytes at `sha256:911e617037a4b9aab715a4bbe6b7f8afb6a48ac240b42c6d76e550165835b19b`; observed 44,564 bytes at `sha256:548b37682291ca3f93aedf44b15cd49fedfe3d655bcee39e73bcac797c65914c`.
- `package.json`: expected 3,719 bytes at `sha256:cdc519e0eb89402abb3031b82d72e2bd676457091e4a23ef83a17c2b0b223ac2`; observed 4,043 bytes at `sha256:9c8e1e3bde18439a6199f0752b7dad1e69fdf713ffac33597d5119d1c26a67fa`.

All other 55 declared V11 context sources matched their exact bytes and SHA-256 digests. The stop therefore demonstrates the intended source-authentication boundary; it is not a product or lifecycle regression.

## Route

Route: `learn -> fix`. Retire revision 40, compile revision 41 against the three measured identities, regenerate both approval-bound packages and the external audit chain, replay V11, then resume the remaining release gates.