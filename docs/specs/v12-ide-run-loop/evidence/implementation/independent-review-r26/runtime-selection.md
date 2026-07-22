# Revision 26 Host Runtime Selection

## Assignment

- Contract: `agent.a0779f841063f577cd855b902fd9aa3fb58b66ad7b68ae0ae83183c95b912d1b`.
- Compilation: `sha256:002a7deab98a63b756e8f930cbcfd3927d64c0c262076a0ee9ccddfb29d01d45`.
- Package: `sha256:5165a7e0bf261d60e915a416c4eb0ce230a979f89dac90a95970e15afcf8cd4f`.
- Model class: frontier coding and reasoning.
- Host model: `gpt-5.6-sol`.
- Reasoning effort: `ultra`.
- Workspace authority: read-only by contract.

## Rationale

This is a release-blocking semantic audit over 29 authenticated sources, security-sensitive process boundaries, exact materialization, toolchain authority, and a complete lifecycle proof. The frontier model and highest available audit effort fit that risk. Extra agents do not: the compiler exhaustively evaluated the single atomic work unit and selected the one-agent serial baseline. Runtime selection is an external host decision and does not alter package identity.
