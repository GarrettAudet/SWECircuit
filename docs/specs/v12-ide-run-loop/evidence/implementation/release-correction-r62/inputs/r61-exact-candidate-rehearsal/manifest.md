# R61 Exact-Candidate Rehearsal Evidence

## Binding

| File | Bytes | SHA-256 |
|---|---:|---|
| `r61-lifecycle-build.stderr.txt` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `r61-lifecycle-build.stdout.txt` | 316 | `7d8c1876d70aa7a0fcdc40a6ce986e4a772de3687d6b7f525b5ca64f8ba4a2e0` |
| `r61-lifecycle-diagnose.mjs` | 3,244 | `98407435de84cf48666d58fbbd347354654ab1ea84a283b7e478039885ec8506` |
| `r61-lifecycle-diagnosis.json` | 453 | `f88f6a096136328efc313078fbb30679f8d30751f4a41a641d3ab856a219dca0` |
| `r61-lifecycle-test.stderr.txt` | 0 | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| `r61-lifecycle-test.stdout.log` | 2,244 | `2b7149346d0d201d32d9ec2d9f7beff3f217d4853892dd660bcf951665d5820b` |

## Interpretation Boundary

The exact output proves that the outer lifecycle failed because the copied canonical gate
reported `timedOut: true` through its assertion after the fixed bound elapsed. Revision 61
did not preserve the nested gate's complete `runProcess` result or timeout termination object
before asserting, so this evidence does not prove which internal subcommand was active or that
the operation would have passed with more time. Revision 62 must establish that counterfactual
through its exact-candidate rehearsal.

The preserved runner was executed from `.local/r61-lifecycle-diagnose.mjs`; its relative import
reflects that original location. The committed copy is evidence, not a relocated executable.
