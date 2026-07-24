# Revision 48 Attempt History

## R47 Gate

The exact gate consumed Revision 47 once and failed at missing candidate dependency resolution. It is preserved under its candidate-addressed evidence root and will not be rerun.

## First Draft

A candidate-local mirror of the authenticated host closure was drafted. Independent pre-freeze review identified that the mirror solved resolution but did not establish exact-lock provenance. The draft was restored before formatting, testing, commit, or gate consumption.

## Exact-Lock Correction

Revision 48 now uses offline, script-disabled `npm ci` from the candidate lock, validates the installed supply, binds raw provisioning evidence and the private closure, and proves cleanup. The focused suite passes 54/54.
## Independent Pre-Freeze Review

The read-only review returned `fix`, not `pass`. It found that the gate still selected host TypeScript, did not reject ancestor `node_modules`, ignored lockfile `libc` constraints, lost evidence when `npm ci` failed, and did not reproduce the real TypeScript or ESM resolution failures in the copied lifecycle. Revision 48 was not committed or gate-consumed. Revision 49 is the bounded successor.
