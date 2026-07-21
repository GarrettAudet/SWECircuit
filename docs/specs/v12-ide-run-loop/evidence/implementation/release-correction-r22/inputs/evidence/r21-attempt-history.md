# Revision 21 Attempt History

## Compilation

- Search: `exhaustive_partition_search_fixed_scheduler`.
- Evaluated: 1; eligible: 1; retained alternatives: 0.
- Selected shape: one specialist because the lifecycle fixture and assertions form one atomic behavioral proof.
- Compilation: `sha256:aac7f8e5f78c540bc1d3cf3286fc7f7ae834d446dce903382bf49636f260f407`.
- Package: `sha256:15fac9863537be07151719617e0c1f7777974d8072a92562b6f97694d7d66929`.
- Package reconstruction: `pass`.

## Attempt 1

- Status: `interrupted`.
- The implementation bytes remained in the worktree, but the runtime session became unavailable across the host continuation before returning a raw handoff.
- No outcome is inferred from the edits or from the missing runtime result.

## Attempt 2

- Status: `block`.
- Specialist: `agent.cde961f7cd173b3f274a6ea75f4190aea5a7642200c5bf39c2ba642d72573127`.
- Exact raw handoff: 14,865 bytes at `sha256:0224243c4325b298fb04d6af870f14d70e2b0fa95a5549906e809d5b386155c9`.
- Semantic digest: `sha256:c2012bc2261f12ac5fb1d42ac49dce1dcb2fc06adfd53eaa42e0778b08db952d`.
- Content digest: `sha256:625486f9d3c1b20dd09bb6c9ff050a16a7bc299058dda48feddb0789ba459646`.
- Complete-package verification: `pass`; `phaseReady: false` because the verified outcome is `block`.
- Behavioral verification: 32 of 32 focused tests passed, including the actual copied production lifecycle and all ten negative routes.
- Blocking evidence: checkpoint `f4f91a373dd7f8028ec5d592e89c75f0027245c3` contains `test/v12-release-review.test.mjs` at 12,922 bytes and `sha256:1abb654e346f0a6f98aa2fbab69901e0a0f8a5eebef9c9fecfa98375fe38f6e3`; the approved package instead declares an unavailable 47,904-byte input at `sha256:5a6fd60a28d2d5ea9bb7ad3c8cbf5ee8212e2da6eafa91d2cba9f002215613ab`.
- Route: compile a successor against reconstructable source bytes, preserve the current behavioral output as authenticated context, and include the independently reproduced npm 11 closed-environment defect before any release progression.
