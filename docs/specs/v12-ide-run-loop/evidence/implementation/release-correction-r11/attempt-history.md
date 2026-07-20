# R11 Host Attempt History

## Approved Contract

- Compilation: `sha256:f934262e856c37e1167698f07a48f38ae73427b38f6dacdeabddfd0d9ece1825`.
- Package: `sha256:2820e692dfdfdfef0000aeeeddfbce3712510e60a222f4819eef6fb7820120b7`.
- Blueprint: `sha256:70a4d7e671fb7891514ab15d4d118a9ad8c7253fe5851933837264a6d8a9560d`.
- Agent contract: `agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2`.
- Source checkpoint: `ab1563642a1d59fc41582237d0577e3373d1eeed`.

## Attempt 1

- Host handle: `019f80be-c550-7b71-b1cf-75d0b806a154`.
- Runtime assignment: `gpt-5.6-sol`, `high` reasoning.
- Delivery: exact contract path, digest pair, source checkpoint, worktree, write boundary, and closed-handoff requirement.
- Observation: no edits and no handoff across the bounded wait; an interrupt checkpoint requesting immediate continuation or a closed `block` handoff also produced no response.
- Closure: host reported previous status `running`; runtime was shut down. No raw handoff existed to preserve.

## Attempt 2

- Host handle: `019f80c9-face-72b0-b325-8f5ab9b8dadc`.
- Runtime assignment: `gpt-5.6-sol`, `high` reasoning.
- Delivery: same exact approved contract plus the confirmed isolated-Git and external-evidence implementation checkpoint.
- Observation: no edits and no handoff across the bounded wait.
- Closure: host reported previous status `running`; runtime was shut down. No raw handoff existed to preserve.

## Attempt 3

- Host handle: `019f80d0-82f1-7160-b87a-628d7847cb33`.
- Runtime assignment: `gpt-5.6-terra`, `high` reasoning.
- Delivery: same exact approved contract, concise implementation checkpoint, and one-pass authentication instruction.
- Observation: no edits and no handoff; an interrupt checkpoint requiring a worktree-access test or exact `block` handoff also produced no response.
- Closure: host reported previous status `running`; runtime was shut down. No raw handoff existed to preserve.

## Route

The three repeated liveness failures establish a host-coordination exception rather than a product or contract outcome. The standalone integration agent resumes the exact R11 contract without changing package identity, authority, write scope, or evidence duties. R11 cannot be marked ready until the resulting raw handoff verifies against the approved package and independent focused and canonical gates pass.

The owner fallback completed the four-file correction and produced:

- Raw handoff: `handoffs/agent.fc51d7897f1fcd89e4867726e6b59af3fad4142bec43943ddaa17cfe54d9d3b2-pass-owner-fallback.json`, 5,373 bytes, `sha256:2a5c2b5cfff8a90d78fd61deb291652303f4347254279ff3c7bae5a104694283`.
- Package-bound verification: `handoff-verification.json`, complete roster, verified `pass`, `phaseReady: true`.
- Focused verification: six R2 harness tests and five release-gate tests passed; the permitted full-tree gate-test run completed in 188.8 seconds.

R11 is integration-ready. Candidate 5 freeze, the exact committed-tree canonical gate, and independent R2 release review remain separate release gates.

This trace is direct input to the post-V12 Host layer: assignment state must distinguish launched, progressing, unresponsive, cancelled, and completed; bounded liveness policy and retry receipts must be explicit and reviewable.
