# Revision 28 Host Runtime Selection

## Assignment

- Contract: `agent.47b1501d01443a341a3adbf58ffcf4bb810b4b38d0e1b08bacbb957dc429f926`.
- Compilation: `sha256:dfe188073e32ee626ef573020213f63576596094558b493dd48a4ed5d81f3dc2`.
- Package: `sha256:9db67c3732934b6dfce1ed4dc0fd89086e326b942377cea08a114e3a0f859203`.
- Model: `gpt-5.6-sol`.
- Reasoning effort: `ultra`.
- Service tier: `priority`.
- Workspace authority: read-only by contract.

## Rationale

This release-blocking semantic audit covered 42 authenticated sources, execution-binding authority, hostile PATH selection, mutation windows, copied lifecycle evidence, host-boundary claims, raw aggregate logs, and V11 replay evidence. The compiler exhaustively evaluated the single atomic work unit and selected the one-agent serial baseline; extra agents would add no independent work partition. Runtime selection was an external host decision and did not alter package identity.