# Revision 47 Root Cause Analysis

## Reproduction

Run the copied-production lifecycle against exact Revision 46 commit `dbe690e74746b8a72202f8fa6146b056cf305813`.

## Evidence

- Receipt mismatch field: `npmScriptShell`.
- Effective path: `C:\WINDOWS\system32\cmd.exe`.
- Bound canonical path: `C:\Windows\System32\cmd.exe`.
- Filesystem identity: same file; exact string identity: different.

## Confirmed Cause

Node's regular synchronous realpath preserved input casing on Windows, while native synchronous and asynchronous realpath returned canonical filesystem casing.

## Fix

Use `realpathSync.native` for startup temp, executable, and dependency authority. Keep exact consumer comparison and add a field-name-only mismatch diagnostic plus exact producer regression.

## Regression

The release suite passes 53/53. A full direct copied-production lifecycle passes in 494 seconds with 11 negative routes, seven commands, complete fixture fan-in, cleanup, and unchanged source.