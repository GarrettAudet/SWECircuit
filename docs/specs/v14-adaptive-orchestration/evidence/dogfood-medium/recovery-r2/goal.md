# Impact Planner Successor Goal: Recovery Revision 2

## Predecessor

Run `run.v14.impact-planner.medium` terminated with verified outcome `fix`. Codec/storage and
interface handoffs passed. Graph tests passed 5 of 6 and exposed a closed-validation defect:
`validateGraph` accumulated an `unknown-key` error but did not return it before canonical graph
validation. The first non-pass handoff was also rejected because evidence status used an open
value; the corrected `fix` envelope was verified and routed.

Exact predecessor identities are bound in `predecessor.json`.

## Objective

Apply and verify the smallest causal graph correction, reuse the predecessor's exact passing
codec and interface outputs, integrate the complete Impact Planner, and independently review the
result.

## Acceptance Criteria

- `validateGraph` returns the accumulated exact-key errors before canonical validation.
- All graph tests pass without weakening or deleting the unknown-key assertion.
- Predecessor codec and interface outputs remain byte-preserved until integration.
- The integration specialist starts only after the graph-correction handoff verifies and its
  exact transitive dependency assessment is integration-ready.
- The complete application passes its graph, codec, storage, interface, integration, and server
  test suites.
- Browser smoke observation uses the routed browser skill and records only behavior actually
  observed.
- A runtime-independent read-only reviewer checks the final application and all four successor
  evidence duties.
- The successor adaptive expectation binds predecessor run ID, terminal session digest, `fix`
  outcome, route-evidence digest, and lineage depth `1`.

## Authority

The correction specialist may modify only graph.js and graph.test.mjs. The integration specialist
may modify only its seven declared integration files. The reviewer is read-only. No specialist
may access the network, install dependencies, mutate Git, merge, or update memory.
