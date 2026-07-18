# V11 Dogfood Attempt 6

## Outcome

`FIX`

## Candidate

- Revision: 6.
- Compilation: `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161`.
- Package: `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`.
- Technical candidate commit: `191d9339da383a2133377dcca564d7202b7ad66d`.
- Approval handoff commit: `d46e82b70251047fb8cf244dd74c04e0e2d47ae0`.
- Hosted run: `29491421454`.

## Failure

All six Node 22/24 kernel jobs failed during `npm run verify` from clean Windows, macOS, and Linux checkouts. Local verification had passed because four bound context files contained five isolated carriage-return bytes that remained in the local working tree but were removed by the repository's `* text=auto eol=lf` Git clean rule when the candidate was committed.

The approved source ledger therefore described working-tree bytes rather than commit-canonical bytes. A clean checkout could not reconstruct the approved compilation and package pair.

## Mismatched Contexts

- `README.md`: one filtered byte.
- `docs/ide/specialist-agent-kickoff.md`: one filtered byte.
- `docs/specs/v11-specialist-compiler/specialist-compiler-contract.md`: two filtered bytes.
- `docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md`: one filtered byte.

## Recovery

Revision 7 normalizes the affected inputs and makes candidate construction compare raw context bytes with `git hash-object --path=<path> --stdin`. Any clean filter that would alter reviewed bytes now fails locally before compilation. Revision 6 remains preserved here and is retired from merge consideration.
