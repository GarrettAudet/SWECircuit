# Revision 68 Hosted Run Manifest

Primary evidence in this directory:

- `run.json`: 12,855 bytes,
  `sha256:6ef085edbc20285bd341764cd75fc7642b120025f92d6f93689921265e0944df`.
- `jobs.json`: 16,514 bytes,
  `sha256:4133d67caf709e4036caa6f20dd26083bb89077b1e6531af00097fe282fa467c`.
- `macos-node22.log.base64.json`: 303,999 stored bytes,
  `sha256:1f4d0dd8859b79279384763a9bb8da2a1b97c0db064c0cb134eb79df473916a0`;
  227,765 decoded bytes,
  `sha256:aea2df15cf4d2ffdf80f46c0902287bbfb782168d5f72e1736d019a0d3ec8072`.
- `macos-node24.log.base64.json`: 143,195 stored bytes,
  `sha256:00f34601e9937ce6ad0bd54ef4a04c722cd4a2d678fddce520f75ff0ee819307`;
  107,163 decoded bytes,
  `sha256:42029bc7a783f589b1d34e15508866105649f00edab35a021fc87f74a8df859f`.

The exact run targets commit `78f8c99645bb7c505e7e95682c6ab69a13915891`. Five of seven
jobs pass. Both macOS jobs fail `Verify kernel` on the same fresh worker-environment assertion.
The R68 one-shot canonical gate was not invoked.

Both canonical envelopes are tracked and equal to their staged Git blobs. Their base64 payloads
recover the exact LF-only log bytes and hashes. Raw `.log` files are absent from the candidate, so
the V11-approved `.gitattributes` identity remains unchanged and the staged whitespace gate stays
clean.
