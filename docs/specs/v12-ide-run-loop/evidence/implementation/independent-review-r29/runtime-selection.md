# Revision 29 Host Runtime Selection

## Assignment

- Contract: `agent.1af2a5d347fe3303174727dfdb41a35e4ce8e311bdf0b1ca0bb6078215fe9e45`.
- Compilation: `sha256:c82adbc88591fc68de85e0258935dcbd5b4044b55bff88e422fd65a1811512be`.
- Package: `sha256:8a76adf8d4b4d1808c985befe24ac93c8b96524fb7cc89997bebbb174ed5f1b4`.
- Model class: frontier coding and reasoning.
- Reasoning effort: highest available release-audit effort.
- Workspace authority: read-only by contract.

## Rationale

This is a release-blocking semantic audit over 40 authenticated sources, copied-production compiler execution, exact receipts, mutation windows, immutable lifecycle evidence, and V11 replay evidence. One frontier reviewer fits that coupled risk. Extra agents do not: the compiler evaluated the single atomic work unit and selected the one-agent serial baseline. Runtime selection is an external host decision and does not alter package identity.
