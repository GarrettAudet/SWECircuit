# Dogfood Integration Inputs

These are byte-exact snapshots of mutable repository inputs captured before the V11 dogfood integration stage.

- `active-context-before-integration.md` preserves the memory state read by integration before that stage updates live memory.
- `spec-before-integration.md` preserves the acceptance contract read before integration records final criterion status.

The final dogfood GoalContract points its integration-only context uses here. Product, algorithm, security, and verification specialists continue to bind the live implementation candidate. This keeps the run reproducible without making an integration output pretend to be its own input.
