# Offline Exact-Lock Feasibility Probe

## Environment

- Candidate package manifest and lockfile: exact bytes from the active worktree at `f4f91a373dd7f8028ec5d592e89c75f0027245c3` plus untracked correction evidence only.
- Disposable root: `C:\tmp\swecircuit-r2-offline-probe`, outside repository ancestry.
- Explicit cache: `C:\tmp\swecircuit-identity-main\.local\npm-cache`.
- Lifecycle policy: `--ignore-scripts`.

## Attempt 1

Command:

```powershell
npm.cmd ci --offline --ignore-scripts --no-audit --no-fund --cache C:\tmp\swecircuit-identity-main\.local\npm-cache
```

Result: fail closed with `ENOTCACHED` for the exact locked tarball `undici-types-7.18.2.tgz`. No network fallback occurred.

## Explicit Cache Provisioning

The external host ran the same exact-lock install once without `--offline`, with scripts, audit, and funding disabled, solely to populate the named content-addressed cache. Twelve packages installed.

## Attempt 2

The original offline command was rerun unchanged. It passed and installed twelve exact-lock packages in two seconds without network access or lifecycle scripts.

## Cleanup

The host resolved the disposable root to exactly `C:\tmp\swecircuit-r2-offline-probe`, removed that verified directory recursively, and retained only the ignored explicit cache for later network-free release review.

## Conclusion

Offline exact-lock installation is feasible and fails closed when cache supply is incomplete. Cache provisioning is an explicit external host precondition; the release-review parent must never silently enable network access.
