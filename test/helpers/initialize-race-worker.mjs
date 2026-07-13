import { existsSync, writeFileSync } from "node:fs";
import { initializeProjectWithHooks } from "../../dist/initialize.js";

const [root, startPath, readyPath] = process.argv.slice(2);

if (root === undefined || startPath === undefined || readyPath === undefined) {
  throw new Error("Expected root, start path, and ready path.");
}

const waitState = new Int32Array(new SharedArrayBuffer(4));
const result = initializeProjectWithHooks(
  { project: root },
  {
    checkpoint(current) {
      if (current !== "beforeCatalogCreate") {
        return;
      }
      writeFileSync(readyPath, "preflight-complete\n", "utf8");
      while (!existsSync(startPath)) {
        Atomics.wait(waitState, 0, 0, 5);
      }
    },
  },
);
process.stdout.write(
  JSON.stringify({
    ok: result.ok,
    exitCode: result.exitCode,
    diagnostics: result.diagnostics.map(({ artifact, code }) => ({ artifact, code })),
  }),
);
