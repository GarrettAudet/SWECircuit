# Failed Attempts

## Attempt Log

| Date | Context | Attempt | Result | Lesson | Source |
| --- | --- | --- | --- | --- | --- |
| 2026-07-08 | V2 workflow edits in this Windows workspace | Used `apply_patch` for a small `AGENTS.md` update after V1 implementation. | The patch helper failed with a Windows sandbox helper error before reading the file. | If `apply_patch` fails with the same sandbox error, use direct PowerShell writes inside the approved project root, then verify file contents and run the checker. | `docs/specs/v2-dogfood-parallel-agents/implementation-notes.md` |
