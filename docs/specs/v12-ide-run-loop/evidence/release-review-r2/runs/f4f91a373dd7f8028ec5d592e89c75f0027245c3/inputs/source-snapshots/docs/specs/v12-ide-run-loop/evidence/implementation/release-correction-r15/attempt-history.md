# Revision 15 Runtime Attempt History

## Attempt 1

The approved specialist runtime was interrupted after a bounded liveness window while the full release-gate test file was still active. Its truthful `block` response is preserved byte-for-byte at `handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48-block-attempt-1.json` (4,420 bytes, `sha256:9462e65c93a9d54c2b7dd0045286a11b3109ec89075d35e489ba013efcf06b9a`).

Core verification rejected that envelope with `SC4310:/evidence/0/status`: the handoff used `status: "fail"`, which is not a valid evidence status. The raw artifact remains immutable failed-attempt evidence and is not completion evidence.

## Attempt 2

The same approved package and specialist runtime resumed without any change to goal, authority, source bindings, work units, or write scope. It completed the remaining verification and returned `pass`.

The final raw handoff is preserved at `handoffs/agent.329aa25af5f3634c36532f84e7521e3945a46dd0686e41345c2110d11f7aea48.json` (5,129 bytes, `sha256:0e470fae36b543e2eb66b9695511fdf43ff77e1df23122bda31917de4b5c6fbb`). `handoff-verification.json` binds it to the approved compilation and package and records `phaseReady: true`.
