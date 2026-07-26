# Revision 17 Independent Architecture Audit

## Runtime

- External host agent: `019f8331-6fb0-7761-bc5e-ca4bf217b201` (`Archimedes`).
- Host-selected model policy: `gpt-5.6-sol`, xhigh reasoning.
- Authority: read-only; no files changed.
- Verdict: `redesign`.

## Findings

1. A live harness cannot establish its own integrity after execution begins; a separately trusted parent must launch exact candidate worker bytes.
2. Copying installed package directories and matching versions does not prove correspondence with lockfile SRI metadata.
3. A materialization below the repository can resolve missing bare dependencies through ancestor `node_modules`.
4. Pre-import hashing alone does not close same-user TOCTOU; use a fresh child, post-run rehash, and an explicit external host isolation boundary.
5. Materialize the complete committed tree rather than a fragile source allowlist.
6. Reject Windows ADS, aliases, reserved names, trailing dot/space segments, links, reparse points, and unsafe containment.
7. Use one fresh child per phase so ESM cache and module lifetime cannot cross phase boundaries.
8. Sanitize environment input and bind Node, npm, Git, TypeScript, platform, architecture, candidate source, installed dependency supply, and generated output.
9. Put a direct `runtimeBindingDigest` in the candidate manifest, compilation summary, approval, phase metadata, and handoff-verification report.

## Required Design

```txt
trusted parent bootstrap
  -> materialize the complete exact candidate outside repository ancestry
  -> npm ci --offline --ignore-scripts from the exact lock and explicit cache
  -> bind source, installed supply, toolchain, and generated dist
  -> launch the exact candidate worker in one fresh child process
  -> stage outputs away from the live repository
  -> rehash protected closures and remove the materialization
  -> promote outputs only after parent-side verification succeeds
```

The parent must never import candidate runtime modules. Strong hostile-process isolation remains an external host responsibility and must not be claimed by core.
