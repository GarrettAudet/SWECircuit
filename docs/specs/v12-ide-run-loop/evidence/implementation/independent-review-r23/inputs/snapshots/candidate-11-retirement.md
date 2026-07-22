# Candidate 11 Retirement

## Candidate

- Commit: `e541393bfe9f6656177ea3bba2cf92940cf4b7b9`
- Tree: `d0d9ea1d0c66142acdb6c7470332147dac61f6cf`
- Candidate-source digest: `sha256:e6ac08bab10fa311ab5351a9546072093cbfb72a03bc65312bdbd91dc58e3102`

## Canonical Gate

The exact one-shot gate failed with 423 of 424 tests passing. The candidate materialization contained 2,915 files and 90,531,850 bytes; its source digest remained identical before and after execution, and both disposable Git and outer repository state stayed clean.

- Receipt: `inputs/canonical-gates/e541393bfe9f6656177ea3bba2cf92940cf4b7b9/canonical-gate-receipt.json`
- Receipt digest: `sha256:b3a36ea43b5ac73c4568ba6c5542df4f66b29e7b3f1822a120cfdc38978721a6`
- Stdout digest: `sha256:ae258c7856783c6e2ade4e44a94057f331b62f7075199b1df1f3aea7b403a5c2`
- Stderr digest: `sha256:b56200af44effdd399efe987862a1241bdd2054970cac157087dca1e86845c24`

## Retirement Cause

The copied-production lifecycle helper seeded its owned offline cache from the hard-coded checkout path `.local/npm-cache`. That ignored directory existed during pre-freeze verification but was correctly absent from exact Git-blob materialization. The release gate had already supplied the real host cache outside candidate source through `npm_config_cache`; the helper bypassed that boundary and failed before the nested lifecycle began.

## Route

Candidate 11 is permanently retired with outcome `fix`. Preserve its exact receipt and raw logs. Revision 23 must consume the release gate's resolved host-cache supply, reject source/destination overlap before copying, prove the clean-materialization regression, and freeze a new commit before another one-shot gate.
