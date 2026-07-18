# V11 Dogfood Attempt 17

Revision 17 completed the full two-phase prelaunch audit and launched the approved Candidate A specialist waves, then retired Candidate A after independent security review.

- Candidate compilation: `sha256:3677db46ecd2a387239887ecff6d131f1d0616a2dba972ffbe63bdc0ee6b9984`.
- Candidate package: `sha256:1cc61cead6a953633c8369e29270c92318e9c58381e2389a971bad5e1ecc72b0`.
- Audit B compilation: `sha256:a832ba62027737d4ea804d64e47fbd3cd53b78c4756524586d147dca0a0722ff`.
- Audit B package: `sha256:b5aa9a0db063fd06d1302842e7994d0ed6695182815520d7adbb3d0d612331eb`.
- Audit B Wave 1 passed. Wave 2 attempt 17A self-invalidated after a shell search widened read scope; fresh literal-path-only attempt 17B independently reproduced the candidate and passed.
- Candidate preparation, algorithm/lifecycle review, and product/API review passed.
- Security/trace returned `REVISE` for three defects: repository locator/read-scope misalignment, semantically unauthenticated Audit B handoff bytes, and accepted bidirectional Unicode controls.
- Release verification passed six standalone gates, including 340 canonical tests, then was stopped after the template-checker regression harness timed out and the candidate had already been retired.

The archived files preserve both approved packages and the cross-package launch authorization. Raw specialist handoffs remain in `../../handoffs/`. Revision 17 is historical evidence only and must not be launched or integrated.
