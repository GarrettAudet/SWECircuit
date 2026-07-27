# Revision 72 Invalid Replay

## Purpose

Preserve an accidental exact-R72 canonical replay without allowing its successful mechanical
result to qualify a retired candidate or the corrected host transport.

## Classification

- Candidate commit: `5bc547eab6b22b862e798ad72df0d35aaa64771f`.
- Mechanical outcome: `pass`.
- Release qualification valid: `false`.
- Violation: `commit-level-one-shot-replay`.
- Route: `learn -> reject-as-qualification`.

R72 had already consumed its only protected invocation and was permanently retired after the real
host interruption. Cloning the same commit did not create a new candidate identity. Invoking the
same canonical command again therefore contradicted the no-retry invariant.

## Preserved Mechanical Observation

A short-lived PowerShell launcher started hidden process `14396` in an exact-R72 clone. The shell
returned in about 4.4 seconds, and a later poll observed the process still live and receipt-free.
The same process later published one pass receipt with clean Git state and identical source
digests.

Those facts are retained only as failed-attempt evidence. They do not prove candidate eligibility
or authorize any release action.

## Exact Bytes

- Candidate source: 4,658 files, 160,485,628 bytes,
  `sha256:bd4a623b4114dd84182f640340d3e0a62c1babdd42cb4bd7f898bd00707b9827`.
- Canonical stdout: 306,820 bytes,
  `sha256:972f7e96057721d544d3c1b11a3840553e62616621804339d6a78dd0131ff639`.
- Canonical stderr: 25,923 bytes,
  `sha256:916ed20ef7b4f5bb27887bbfdf6eb2c7182eaf5313ead05a8acc4a98e7f7c791`.
- Receipt: 14,195 bytes,
  `sha256:459480c108e49c493c9d49b4e1026edbec55eef7166d2b9e8ea5721fda1a2562`.
- Launcher stdout: 13,722 bytes,
  `sha256:af8a8f76960894bddaf38669374f9a5757bbf13f946305477ac4f95b41b09d77`.
- Launcher stderr: zero bytes,
  `sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.

## Preserved Inputs

`inputs/r72-invalid-replay/` contains an authenticated Base64 envelope for the exact launch
record, the receipt, authenticated Base64 envelopes for all four raw streams, the transport
observation, and a closed classification. Executable tests authenticate the bytes and require the
invalid-qualification classification.

## Outcome

`learn -> reject-as-qualification`.

`releaseReady: false`.
