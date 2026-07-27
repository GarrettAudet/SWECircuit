import { spawnSync } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { closeSync, existsSync, openSync, readFileSync } from "node:fs";
import { mkdir, readdir, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RUNNER_PATH = fileURLToPath(import.meta.url);
const LAUNCHER_PATH = fileURLToPath(
  new URL("./v12-background-host-probe-launcher.ps1", import.meta.url),
);
const WORKER_PATH = fileURLToPath(
  new URL("./v12-background-host-probe-worker.mjs", import.meta.url),
);

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function sleep(milliseconds) {
  return new Promise((resolvePromise) => {
    setTimeout(resolvePromise, milliseconds);
  });
}

function parseArguments(argv) {
  const options = {
    outputDirectory: null,
    delayMilliseconds: 3_500,
    probeId: randomUUID(),
  };
  for (let index = 0; index < argv.length; index += 2) {
    const name = argv[index];
    const value = argv[index + 1];
    if (typeof value !== "string") {
      throw new Error(`Missing value for ${String(name)}.`);
    }
    if (name === "--output-dir") {
      options.outputDirectory = resolve(value);
    } else if (name === "--delay-ms") {
      options.delayMilliseconds = Number(value);
    } else if (name === "--probe-id") {
      options.probeId = value;
    } else {
      throw new Error(`Unknown option ${name}.`);
    }
  }
  if (options.outputDirectory === null) {
    throw new Error("--output-dir is required.");
  }
  if (
    !Number.isSafeInteger(options.delayMilliseconds) ||
    options.delayMilliseconds < 1_000 ||
    options.delayMilliseconds > 30_000
  ) {
    throw new Error("--delay-ms must be an integer from 1000 through 30000.");
  }
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u.test(options.probeId)
  ) {
    throw new Error("--probe-id must be a lowercase UUID v4.");
  }
  return options;
}

function sourceBinding(path) {
  const bytes = readFileSync(path);
  return {
    path,
    bytes: bytes.byteLength,
    digest: digest(bytes),
  };
}

async function writeJsonAtomic(path, value) {
  const temporaryPath = `${path}.${process.pid}.tmp`;
  const bytes = Buffer.from(`${JSON.stringify(value, null, 2)}\n`, "utf8");
  await writeFile(temporaryPath, bytes, { flag: "wx" });
  await rename(temporaryPath, path);
}

function readJsonBinding(path) {
  const bytes = readFileSync(path);
  return {
    bytes,
    digest: digest(bytes),
    value: JSON.parse(bytes.toString("utf8")),
  };
}

function processIsRunning(processId) {
  try {
    process.kill(processId, 0);
    return true;
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ESRCH") {
      return false;
    }
    throw error;
  }
}

function requireEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label} mismatch.`);
  }
}

async function main() {
  if (process.platform !== "win32") {
    throw new Error("The v0.1 transport probe requires Windows.");
  }
  const options = parseArguments(process.argv.slice(2));
  await mkdir(options.outputDirectory, { recursive: true });
  if ((await readdir(options.outputDirectory)).length !== 0) {
    throw new Error("Probe output directory must be empty.");
  }

  const output = {
    requestPath: resolve(options.outputDirectory, "request.json"),
    launchPath: resolve(options.outputDirectory, "launch.json"),
    launcherExitPath: resolve(options.outputDirectory, "launcher-exit.json"),
    launcherStdoutPath: resolve(options.outputDirectory, "launcher.stdout.log"),
    launcherStderrPath: resolve(options.outputDirectory, "launcher.stderr.log"),
    heartbeatPath: resolve(options.outputDirectory, "heartbeat.json"),
    pollsPath: resolve(options.outputDirectory, "polls.json"),
    receiptPath: resolve(options.outputDirectory, "receipt.json"),
    completionPath: resolve(options.outputDirectory, "completion.json"),
    workerStdoutPath: resolve(options.outputDirectory, "worker.stdout.log"),
    workerStderrPath: resolve(options.outputDirectory, "worker.stderr.log"),
  };
  const source = {
    runner: sourceBinding(RUNNER_PATH),
    launcher: sourceBinding(LAUNCHER_PATH),
    worker: sourceBinding(WORKER_PATH),
  };
  const request = {
    kind: "swecircuit.transport-probe-request.v1",
    probeId: options.probeId,
    createdAtUtc: new Date().toISOString(),
    delayMilliseconds: options.delayMilliseconds,
    platform: process.platform,
    architecture: process.arch,
    nodeExecutable: process.execPath,
    source,
    output,
  };
  await writeJsonAtomic(output.requestPath, request);
  const requestBinding = readJsonBinding(output.requestPath);

  const powershellPath = resolve(
    process.env.SYSTEMROOT ?? "C:\\Windows",
    "System32",
    "WindowsPowerShell",
    "v1.0",
    "powershell.exe",
  );
  const launcherArguments = [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    LAUNCHER_PATH,
    "-RequestPath",
    output.requestPath,
    "-NodePath",
    process.execPath,
    "-WorkerPath",
    WORKER_PATH,
  ];
  const launcherStartedAtUtc = new Date().toISOString();
  const launcherStdoutHandle = openSync(output.launcherStdoutPath, "wx");
  const launcherStderrHandle = openSync(output.launcherStderrPath, "wx");
  let launcherResult;
  try {
    launcherResult = spawnSync(powershellPath, launcherArguments, {
      stdio: ["ignore", launcherStdoutHandle, launcherStderrHandle],
      windowsHide: true,
      timeout: 10_000,
    });
  } finally {
    closeSync(launcherStdoutHandle);
    closeSync(launcherStderrHandle);
  }
  const launcherExitedAtUtc = new Date().toISOString();
  const launcherStdout = readFileSync(output.launcherStdoutPath);
  const launcherStderr = readFileSync(output.launcherStderrPath);
  const launchBinding = readJsonBinding(output.launchPath);
  const launch = launchBinding.value;
  requireEqual(launch.kind, "swecircuit.transport-probe-launch.v1", "launch kind");
  requireEqual(launch.probeId, options.probeId, "launch probe");
  requireEqual(launch.requestDigest, requestBinding.digest, "launch request digest");
  requireEqual(launch.waitRequested, false, "launch wait policy");
  requireEqual(launch.hidden, true, "launch visibility");
  const launcherExit = {
    kind: "swecircuit.transport-probe-launcher-exit.v1",
    probeId: options.probeId,
    requestDigest: requestBinding.digest,
    launchDigest: launchBinding.digest,
    processId: launch.processId,
    processStartTimeUtc: launch.processStartTimeUtc,
    startedAtUtc: launcherStartedAtUtc,
    exitedAtUtc: launcherExitedAtUtc,
    executable: powershellPath,
    arguments: launcherArguments,
    status: launcherResult.status,
    signal: launcherResult.signal,
    error: launcherResult.error?.message ?? null,
    receiptPresentAtExit: existsSync(output.receiptPath),
    stdout: {
      bytes: launcherStdout.byteLength,
      digest: digest(launcherStdout),
    },
    stderr: {
      bytes: launcherStderr.byteLength,
      digest: digest(launcherStderr),
    },
  };
  await writeJsonAtomic(output.launcherExitPath, launcherExit);
  requireEqual(launcherExit.status, 0, "launcher status");
  requireEqual(launcherExit.signal, null, "launcher signal");
  requireEqual(launcherExit.error, null, "launcher error");
  requireEqual(launcherExit.receiptPresentAtExit, false, "receipt-at-launcher-exit");

  const polls = [];
  let heartbeatDigest = null;
  let postExitHeartbeatObserved = false;
  let receiptBinding = null;
  const receiptDeadline = Date.now() + options.delayMilliseconds + 15_000;
  while (Date.now() < receiptDeadline) {
    if (existsSync(output.heartbeatPath)) {
      const heartbeatBinding = readJsonBinding(output.heartbeatPath);
      if (heartbeatBinding.digest !== heartbeatDigest) {
        const heartbeat = heartbeatBinding.value;
        requireEqual(heartbeat.kind, "swecircuit.transport-probe-heartbeat.v1", "heartbeat kind");
        requireEqual(heartbeat.probeId, options.probeId, "heartbeat probe");
        requireEqual(heartbeat.processId, launch.processId, "heartbeat process");
        requireEqual(
          heartbeat.processStartTimeUtc,
          launch.processStartTimeUtc,
          "heartbeat process start",
        );
        requireEqual(heartbeat.requestDigest, requestBinding.digest, "heartbeat request digest");
        requireEqual(heartbeat.launchDigest, launchBinding.digest, "heartbeat launch digest");
        const afterLauncherExit =
          Date.parse(heartbeat.observedAtUtc) > Date.parse(launcherExitedAtUtc);
        const receiptPresent = existsSync(output.receiptPath);
        polls.push({
          kind: "swecircuit.transport-probe-poll.v1",
          probeId: options.probeId,
          polledAtUtc: new Date().toISOString(),
          processId: heartbeat.processId,
          processStartTimeUtc: heartbeat.processStartTimeUtc,
          heartbeatSequence: heartbeat.sequence,
          heartbeatBytes: heartbeatBinding.bytes.byteLength,
          heartbeatDigest: heartbeatBinding.digest,
          heartbeatObservedAtUtc: heartbeat.observedAtUtc,
          afterLauncherExit,
          receiptPresent,
        });
        if (afterLauncherExit && !receiptPresent) {
          postExitHeartbeatObserved = true;
        }
        heartbeatDigest = heartbeatBinding.digest;
      }
    }
    if (existsSync(output.receiptPath) && postExitHeartbeatObserved) {
      receiptBinding = readJsonBinding(output.receiptPath);
      break;
    }
    await sleep(50);
  }
  if (receiptBinding === null) {
    throw new Error("Receipt was not observed after a post-launcher heartbeat.");
  }

  const receipt = receiptBinding.value;
  requireEqual(receipt.kind, "swecircuit.transport-probe-receipt.v1", "receipt kind");
  requireEqual(receipt.probeId, options.probeId, "receipt probe");
  requireEqual(receipt.processId, launch.processId, "receipt process");
  requireEqual(receipt.processStartTimeUtc, launch.processStartTimeUtc, "receipt process start");
  requireEqual(receipt.requestDigest, requestBinding.digest, "receipt request digest");
  requireEqual(receipt.launchDigest, launchBinding.digest, "receipt launch digest");
  requireEqual(receipt.workerDigest, source.worker.digest, "receipt worker digest");
  requireEqual(receipt.result, "pass", "receipt result");
  requireEqual(receipt.exitCode, 0, "receipt exit");

  let processRunningAfterReceipt = processIsRunning(launch.processId);
  const processExitDeadline = Date.now() + 10_000;
  while (processRunningAfterReceipt && Date.now() < processExitDeadline) {
    await sleep(50);
    processRunningAfterReceipt = processIsRunning(launch.processId);
  }
  await writeJsonAtomic(output.pollsPath, {
    kind: "swecircuit.transport-probe-polls.v1",
    probeId: options.probeId,
    requestDigest: requestBinding.digest,
    launchDigest: launchBinding.digest,
    polls,
  });
  const pollsBinding = readJsonBinding(output.pollsPath);
  const launcherExitBinding = readJsonBinding(output.launcherExitPath);
  const workerStdout = readFileSync(output.workerStdoutPath);
  const workerStderr = readFileSync(output.workerStderrPath);
  const completion = {
    kind: "swecircuit.transport-probe-completion.v1",
    probeId: options.probeId,
    outcome: "pass",
    processId: launch.processId,
    processStartTimeUtc: launch.processStartTimeUtc,
    requestDigest: requestBinding.digest,
    launchDigest: launchBinding.digest,
    launcherExitDigest: launcherExitBinding.digest,
    pollsDigest: pollsBinding.digest,
    receiptDigest: receiptBinding.digest,
    postExitHeartbeatObserved,
    processRunningAfterReceipt,
    workerStdout: {
      bytes: workerStdout.byteLength,
      digest: digest(workerStdout),
    },
    workerStderr: {
      bytes: workerStderr.byteLength,
      digest: digest(workerStderr),
    },
  };
  requireEqual(completion.postExitHeartbeatObserved, true, "post-exit heartbeat");
  requireEqual(completion.processRunningAfterReceipt, false, "process exit");
  requireEqual(completion.workerStderr.bytes, 0, "worker stderr");
  await writeJsonAtomic(output.completionPath, completion);

  process.stdout.write(
    `${JSON.stringify({
      outcome: completion.outcome,
      probeId: completion.probeId,
      processId: completion.processId,
      processStartTimeUtc: completion.processStartTimeUtc,
      requestDigest: completion.requestDigest,
      launchDigest: completion.launchDigest,
      receiptDigest: completion.receiptDigest,
      completionPath: output.completionPath,
    })}\n`,
  );
}

main().catch((error) => {
  const message =
    error instanceof Error ? (error.stack ?? error.message) : "Unknown probe failure.";
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
});
