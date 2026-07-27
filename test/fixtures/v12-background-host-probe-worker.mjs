import { createHash, randomUUID } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { rename, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const WORKER_PATH = fileURLToPath(import.meta.url);

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function parseRequestPath(argv) {
  if (argv.length !== 1 || typeof argv[0] !== "string" || argv[0].length === 0) {
    throw new Error("Expected one request path.");
  }
  return argv[0];
}

async function writeJsonAtomic(path, value) {
  const temporaryPath = `${path}.${process.pid}.${randomUUID()}.tmp`;
  const bytes = Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8");
  await writeFile(temporaryPath, bytes, { flag: "wx" });
  await rename(temporaryPath, path);
}

async function waitForLaunch(path, timeoutMilliseconds) {
  const deadline = Date.now() + timeoutMilliseconds;
  while (Date.now() < deadline) {
    if (existsSync(path)) {
      return readFileSync(path);
    }
    await sleep(25);
  }
  throw new Error("Launch record was not published.");
}

async function main() {
  const requestPath = parseRequestPath(process.argv.slice(2));
  const requestBytes = readFileSync(requestPath);
  const request = JSON.parse(requestBytes.toString("utf8"));
  if (request.kind !== "swecircuit.transport-probe-request.v1") {
    throw new Error("Unexpected request kind.");
  }
  if (!Number.isSafeInteger(request.delayMilliseconds) || request.delayMilliseconds < 1_000) {
    throw new Error("Invalid probe delay.");
  }

  const launchBytes = await waitForLaunch(request.output.launchPath, 10_000);
  const launch = JSON.parse(launchBytes.toString("utf8"));
  if (launch.kind !== "swecircuit.transport-probe-launch.v1") {
    throw new Error("Unexpected launch kind.");
  }
  if (launch.probeId !== request.probeId || launch.processId !== process.pid) {
    throw new Error("Launch identity mismatch.");
  }

  const requestDigest = digest(requestBytes);
  const launchDigest = digest(launchBytes);
  const workerDigest = digest(readFileSync(WORKER_PATH));
  if (launch.requestDigest !== requestDigest || request.source.worker.digest !== workerDigest) {
    throw new Error("Launch source binding mismatch.");
  }

  const identity = {
    probeId: request.probeId,
    processId: process.pid,
    processStartTimeUtc: launch.processStartTimeUtc,
    requestDigest,
    launchDigest,
    workerDigest,
  };
  const startedAtUtc = new Date().toISOString();
  const deadline = Date.now() + request.delayMilliseconds;
  let sequence = 0;
  while (Date.now() < deadline) {
    sequence += 1;
    await writeJsonAtomic(request.output.heartbeatPath, {
      kind: "swecircuit.transport-probe-heartbeat.v1",
      ...identity,
      sequence,
      observedAtUtc: new Date().toISOString(),
    });
    await sleep(200);
  }

  sequence += 1;
  await writeJsonAtomic(request.output.heartbeatPath, {
    kind: "swecircuit.transport-probe-heartbeat.v1",
    ...identity,
    sequence,
    observedAtUtc: new Date().toISOString(),
  });
  await writeJsonAtomic(request.output.receiptPath, {
    kind: "swecircuit.transport-probe-receipt.v1",
    ...identity,
    startedAtUtc,
    completedAtUtc: new Date().toISOString(),
    heartbeatCount: sequence,
    result: "pass",
    exitCode: 0,
  });
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown worker failure.";
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
