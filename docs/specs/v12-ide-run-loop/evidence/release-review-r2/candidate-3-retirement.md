# Candidate 3 Retirement

Candidate: `4ad12367cc0b36ea460ceabc48e5a41ca662e3df`

Outcome: `fix`

Candidate 3 passed the canonical command, but it is not release-ready. The exact
product/API/IDE reviewer handoff returned `fix` because the gate proved only
tracked cleanliness and did not exclude untracked verification inputs.

The security/trace reviewer independently returned `fix` because the approved
R2 context omitted these causal source files:

- `.gitattributes`
- `.gitignore`
- `src/specialist-handoff-schema-data.ts`
- `src/specialist-handoff-schema.ts`
- `src/specialist-schema-data.ts`
- `src/specialist-schema.ts`

The lifecycle/correctness reviewer returned `pass`. That scoped pass cannot
override either release-blocking `fix` route.

## Preserved Identity

- Gate receipt: 1,335 bytes,
  `sha256:cea0b22bca0bd5d6b98f6a679d5439ac39c1ff15d0b9e3334cd7d96a02a43023`.
- Gate stdout: 295,945 bytes,
  `sha256:62fb8db804151a00f2ad82d536ac833e805fe25f1e06f53ef0af910947c2d95c`.
- Gate stderr: 25,879 bytes,
  `sha256:f660f2d1f1e263ab7c3c3880f78d94af974e78671e7c41f303df3589079eafe8`.
- R2 compilation:
  `sha256:8dc8a4592e36ccc04d9873440ce9def42831ebd74d7615c1823ed7d199fae565`.
- R2 package:
  `sha256:f99dbaf4910039ed8238820bd269fefa60ecef34c4b26e19f668cfd4ee646d27`.
- Exact product/API/IDE handoff: 6,206 bytes,
  `sha256:3541eaf47cb61457b09dacc16e5c91dbda419a006472a427e3777c6eadb9ce5e`.

The security and lifecycle notifications remain in the source conversation, but
their raw agent handles expired before repository persistence. They are recorded
here as routing evidence, not represented as package-verified raw handoffs.

## Route

Revision 9 owns one bounded correction because both blockers converge on the
canonical-gate and R2 review harness. Candidate 3 is permanently retired. Freeze
a new candidate, regenerate its exact gate evidence and R2 package, and repeat
all three independent reviews.
