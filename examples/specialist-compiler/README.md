# Specialist Compiler Example

This read-only example shows the V11 planning boundary without pretending to execute agents.

It verifies two repository sources, compares the serial baseline with every allowed two-work-unit partition, selects two focused specialists, renders their contracts, and verifies the exact compilation/package digest pair retained in `approval.json`.

The approval is bounded, duplicate-aware strict JSON with exact keys. Repository sources are read through the kernel's canonical contained-file boundary, so unsafe paths, links, junctions, non-files, stale bytes, and secret-bearing path text fail before compilation without being echoed.

```powershell
npm.cmd run build
node .\examples\specialist-compiler\run.mjs
```

Expected planning result:

```txt
goal
  | review.api      -> specialist A
  | review.contract -> specialist B
  v
approval-bound package (no runtime invoked)
```

The example performs no writes, launches no agents, and chooses no model or IDE. A real host is responsible for context delivery, workspace isolation, permissions, execution, raw handoff persistence, and merge.
