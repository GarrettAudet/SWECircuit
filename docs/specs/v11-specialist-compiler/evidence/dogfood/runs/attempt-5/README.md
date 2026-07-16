# V11 Dogfood Attempt 5

Attempt 5 passed candidate preparation, three independent reviews, and the canonical release gate against:

- Compilation: `sha256:20adea92233a3d6a6d5a852e940a959f37e0b570333999dd784b450d0509687d`.
- Package: `sha256:5824f61dedfa82e479b412eb4a091c25c5a1d43b59ce94a9ec8ee47e61757f07`.

Post-integration replay then returned `FIX`: `context.spec` referenced the live feature spec, while the integration work unit correctly updated that file to record acceptance. The reviewed bytes remain preserved in `../../inputs/spec-before-integration.md`, but the approved package could no longer reconstruct from its declared live locator.

Attempt 5 is therefore not the final release candidate. Revision 6 must bind every reviewer and preparation use of the spec to the immutable pre-integration snapshot, keep the live spec as an integration output, generate a new digest pair, and repeat the exact review wave.
