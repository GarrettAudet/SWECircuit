# V11 Dogfood Attempt 1

This directory preserves the first complete Specialist Compiler dogfood input, compilation, report, and rendered package.

- Compilation: `sha256:32f615017d7f5b0f7648a6818420857c0ffb258aa6a721d94c685da08b8c6254`.
- Search: exact, 203 unique partitions, 52 eligible.
- Selected roster: six exact agents, four-agent review wave, projected makespan 23 versus serial 40.
- Verification: first returned `FIX` for newly covered formatting drift, then passed the complete warning-free gate after the narrow correction.
- Reviews: algorithm/lifecycle `PASS`; product/API and security/trace `REVISE`.

The raw handoffs remain under `../../handoffs/`. This attempt is intentionally superseded, not rewritten. Its findings drive the next content-addressed correction run.
