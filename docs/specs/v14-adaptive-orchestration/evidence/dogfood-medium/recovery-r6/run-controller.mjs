import { Buffer } from "node:buffer";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  adaptiveMaterializationExpectedDigest,
  createAdaptiveRunSession,
  inspectAdaptiveRunSession,
  projectAdaptiveLaunchCommand,
  recordAdaptiveHostEvent,
  renderAdaptiveRunView,
  renderAdaptiveRunViewMarkdown,
  restoreAdaptiveRunSession,
} from "../../../../../../dist/index.js";

const API_VERSION = "swecircuit/adaptive-run/v1alpha1";
const ROOT = fileURLToPath(new URL("../../../../../../", import.meta.url));
const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const RUN = join(EVIDENCE, "run");
const encoder = new TextEncoder();

function sha256(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireValue(label, result) {
  if (!result.ok || result.value === null) {
    throw new Error(`${label}: ${JSON.stringify(result.diagnostics)}`);
  }
  return result.value;
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function rawJson(value) {
  return encoder.encode(JSON.stringify(value));
}

function workspaceBaselineDigest() {
  const head = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: ROOT,
    encoding: "utf8",
  });
  const diff = execFileSync("git", ["diff", "--binary", "HEAD"], {
    cwd: ROOT,
    encoding: null,
    maxBuffer: 64 * 1024 * 1024,
  });
  const untracked = execFileSync(
    "git",
    ["ls-files", "--others", "--exclude-standard", "-z"],
    { cwd: ROOT, encoding: null },
  );
  const hash = createHash("sha256");
  hash.update("swecircuit/v14/dogfood-workspace/v1alpha1\0");
  hash.update(head.trim());
  hash.update("\0");
  hash.update(diff);
  hash.update("\0");
  for (const relative of untracked.toString("utf8").split("\0").filter(Boolean).sort()) {
    hash.update(relative);
    hash.update("\0");
    hash.update(readFileSync(join(ROOT, relative)));
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}

function blueprintFor(compilation, agentId) {
  const blueprint = compilation.blueprints.find((entry) => entry.id === agentId);
  if (blueprint === undefined) throw new Error(`Missing blueprint ${agentId}.`);
  return blueprint;
}

function commandFor(session, expectation, agentId) {
  return requireValue(
    `project launch command ${agentId}`,
    projectAdaptiveLaunchCommand(session, expectation, agentId),
  );
}

function baseEvent(compilation, assignment, expectation, session, agentId, kind, fields) {
  const prior = session.hostEvents.at(-1);
  return {
    apiVersion: API_VERSION,
    kind,
    runId: expectation.runId,
    runRevision: expectation.runRevision,
    sequence: session.hostEvents.length + 1,
    priorEventDigest: prior?.rawDigest ?? null,
    agentId,
    blueprintDigest: blueprintFor(compilation, agentId).contentDigest,
    assignmentDigest: assignment.contentDigest,
    hostId: expectation.authorizedHostId,
    adapterId: expectation.authorizedAdapterId,
    adapterRevision: expectation.authorizedAdapterRevision,
    attestedBy: "adapter.codex-desktop.v14-alpha",
    ...fields,
  };
}

function appendEvent(session, expectation, event) {
  return requireValue(
    `record ${event.kind}`,
    recordAdaptiveHostEvent(session, expectation, rawJson(event)),
  );
}

function authorizationEvent(
  compilation,
  assignment,
  expectation,
  session,
  agentId,
) {
  return baseEvent(
    compilation,
    assignment,
    expectation,
    session,
    agentId,
    "HostLaunchAuthorization",
    {
      attestedBy: expectation.authorizationIssuerId,
      attemptId: `attempt.${agentId}`,
      authorizationId: `authorization.${agentId}`,
      workspaceBaselineDigest: expectation.workspaceBaselineDigest,
      command: commandFor(session, expectation, agentId),
    },
  );
}

function materializationEvent(
  compilation,
  assignment,
  expectation,
  session,
  agentId,
  nativeHandle,
) {
  const authorization = session.hostEvents.at(-1);
  if (authorization?.kind !== "HostLaunchAuthorization") {
    throw new Error("Materialization requires the immediately preceding authorization.");
  }
  const command = commandFor(session, expectation, agentId);
  const expected = {
    model: command.profileId,
    effort: command.effortId,
    tools: command.tools,
    skills: command.skills,
    isolation: command.isolationFeatures,
    permissions: command.permissions,
    workspace: expectation.workspaceBaselineDigest,
    context: command.contextSources,
  };
  return baseEvent(
    compilation,
    assignment,
    expectation,
    session,
    agentId,
    "HostMaterializationClaim",
    {
      attemptId: `attempt.${agentId}`,
      authorizationEventDigest: authorization.rawDigest,
      nativeHandle,
      fields: Object.entries(expected).map(([field, value]) => {
        const observedDigest = adaptiveMaterializationExpectedDigest(field, value);
        return {
          field,
          status: "observed",
          expectedDigest: observedDigest,
          observedDigest,
        };
      }),
    },
  );
}

function lifecycleEvent(
  compilation,
  assignment,
  expectation,
  session,
  agentId,
  nativeHandle,
  status,
) {
  const authorization = session.hostEvents.find(
    (event) => event.kind === "HostLaunchAuthorization" && event.agentId === agentId,
  );
  const materialization = session.hostEvents.find(
    (event) => event.kind === "HostMaterializationClaim" && event.agentId === agentId,
  );
  if (authorization === undefined || materialization === undefined) {
    throw new Error(`Lifecycle requires launch evidence for ${agentId}.`);
  }
  return baseEvent(
    compilation,
    assignment,
    expectation,
    session,
    agentId,
    "HostLifecycleObservation",
    {
      attemptId: `attempt.${agentId}`,
      authorizationEventDigest: authorization.rawDigest,
      materializationEventDigest: materialization.rawDigest,
      nativeHandle,
      status,
      evidence: [],
    },
  );
}

function resultEvent(
  compilation,
  assignment,
  expectation,
  session,
  agentId,
  rawHandoff,
) {
  const authorization = session.hostEvents.find(
    (event) => event.kind === "HostLaunchAuthorization" && event.agentId === agentId,
  );
  const materialization = session.hostEvents.find(
    (event) => event.kind === "HostMaterializationClaim" && event.agentId === agentId,
  );
  const terminal = [...session.hostEvents]
    .reverse()
    .find(
      (event) =>
        event.kind === "HostLifecycleObservation" &&
        event.agentId === agentId,
    );
  if (authorization === undefined || materialization === undefined || terminal === undefined) {
    throw new Error(`Result capture requires terminal launch evidence for ${agentId}.`);
  }
  return baseEvent(
    compilation,
    assignment,
    expectation,
    session,
    agentId,
    "HostResultCapture",
    {
      attemptId: `attempt.${agentId}`,
      authorizationEventDigest: authorization.rawDigest,
      materializationEventDigest: materialization.rawDigest,
      terminalLifecycleEventDigest: terminal.rawDigest,
      steeringEventDigests: session.hostEvents
        .filter(
          (event) => event.kind === "HostSteeringAuthorization" && event.agentId === agentId,
        )
        .map((event) => event.rawDigest),
      rawHandoffEncoding: "base64",
      rawHandoffBytes: rawHandoff.byteLength,
      rawHandoffDigest: sha256(rawHandoff),
      rawHandoffBase64: Buffer.from(rawHandoff).toString("base64"),
    },
  );
}

async function sources() {
  return {
    compilation: await readJson(join(EVIDENCE, "compilation.json")),
    specialistPackage: await readJson(join(EVIDENCE, "package-envelope.json")),
    assignment: await readJson(join(EVIDENCE, "routing", "compilation.json")),
  };
}

async function loadRun() {
  const { compilation, specialistPackage, assignment } = await sources();
  const expectation = await readJson(join(RUN, "expectation.json"));
  const rawSession = await readFile(join(RUN, "session.json"));
  const session = requireValue(
    "restore adaptive dogfood session",
    restoreAdaptiveRunSession(rawSession, expectation),
  );
  return { compilation, specialistPackage, assignment, expectation, session };
}

async function saveRun(session, expectation) {
  const inspection = requireValue(
    "inspect adaptive dogfood session",
    inspectAdaptiveRunSession(session, expectation),
  );
  const runView = requireValue("render adaptive RunView", renderAdaptiveRunView(inspection));
  const markdown = requireValue(
    "render adaptive RunView Markdown",
    renderAdaptiveRunViewMarkdown(runView),
  );
  await writeJson(join(RUN, "session.json"), session);
  await writeJson(join(RUN, "inspection.json"), inspection);
  await writeJson(join(RUN, "run-view.json"), runView);
  await writeFile(join(RUN, "run-view.md"), markdown, "utf8");
  return { inspection, runView, markdown };
}

async function start() {
  const { compilation, specialistPackage, assignment } = await sources();
  const predecessor = await readJson(join(EVIDENCE, "predecessor.json"));
  const expectation = {
    compilationDigest: assignment.compilationDigest,
    packageDigest: assignment.packageDigest,
    policyDigest: assignment.policyDigest,
    calibrationDigest: assignment.calibrationDigest,
    inventoryDigest: assignment.inventoryDigest,
    assignmentDigest: assignment.contentDigest,
    runId: "run.v14.impact-planner.medium.r6",
    runRevision: 6,
    predecessorRun: predecessor.predecessorRun,
    workspaceBaselineDigest: workspaceBaselineDigest(),
    authorizedHostId: assignment.inventory.hostId,
    authorizedAdapterId: assignment.inventory.adapterId,
    authorizedAdapterRevision: assignment.inventory.adapterRevision,
    authorizationIssuerId: "repository-owner-via-standing-release-authorization",
    maxHostEvents: 160,
    lineageDepth: 1,
    maxLineageDepth: 8,
  };
  const session = requireValue(
    "create adaptive dogfood session",
    createAdaptiveRunSession(assignment, specialistPackage, expectation),
  );
  await writeJson(join(RUN, "expectation.json"), expectation);
  const view = await saveRun(session, expectation);
  const commands = Object.fromEntries(
    compilation.blueprints.map((blueprint) => [
      blueprint.id,
      commandFor(session, expectation, blueprint.id),
    ]),
  );
  await writeJson(join(RUN, "launch-commands.json"), commands);
  return {
    outcome: "pass",
    sessionDigest: session.contentDigest,
    runViewDigest: view.runView.contentDigest,
    nextActions: view.inspection.nextActions,
    commands,
  };
}

async function launch(agentId, nativeHandle) {
  const state = await loadRun();
  let session = appendEvent(
    state.session,
    state.expectation,
    authorizationEvent(
      state.compilation,
      state.assignment,
      state.expectation,
      state.session,
      agentId,
    ),
  );
  session = appendEvent(
    session,
    state.expectation,
    materializationEvent(
      state.compilation,
      state.assignment,
      state.expectation,
      session,
      agentId,
      nativeHandle,
    ),
  );
  session = appendEvent(
    session,
    state.expectation,
    lifecycleEvent(
      state.compilation,
      state.assignment,
      state.expectation,
      session,
      agentId,
      nativeHandle,
      "running",
    ),
  );
  const view = await saveRun(session, state.expectation);
  return {
    outcome: "pass",
    sessionDigest: session.contentDigest,
    runViewDigest: view.runView.contentDigest,
    nativeHandle,
  };
}

async function authorize(agentId) {
  const state = await loadRun();
  const session = appendEvent(
    state.session,
    state.expectation,
    authorizationEvent(
      state.compilation,
      state.assignment,
      state.expectation,
      state.session,
      agentId,
    ),
  );
  const view = await saveRun(session, state.expectation);
  return {
    outcome: "pass",
    sessionDigest: session.contentDigest,
    runViewDigest: view.runView.contentDigest,
    authorizationEventDigest: session.hostEvents.at(-1)?.rawDigest,
  };
}

async function materialize(agentId, nativeHandle) {
  const state = await loadRun();
  let session = appendEvent(
    state.session,
    state.expectation,
    materializationEvent(
      state.compilation,
      state.assignment,
      state.expectation,
      state.session,
      agentId,
      nativeHandle,
    ),
  );
  session = appendEvent(
    session,
    state.expectation,
    lifecycleEvent(
      state.compilation,
      state.assignment,
      state.expectation,
      session,
      agentId,
      nativeHandle,
      "running",
    ),
  );
  const view = await saveRun(session, state.expectation);
  return {
    outcome: "pass",
    sessionDigest: session.contentDigest,
    runViewDigest: view.runView.contentDigest,
    nativeHandle,
  };
}
async function result(agentId, nativeHandle, handoffPath) {
  const state = await loadRun();
  let session = appendEvent(
    state.session,
    state.expectation,
    lifecycleEvent(
      state.compilation,
      state.assignment,
      state.expectation,
      state.session,
      agentId,
      nativeHandle,
      "completed",
    ),
  );
  const rawHandoff = await readFile(join(ROOT, handoffPath));
  session = appendEvent(
    session,
    state.expectation,
    resultEvent(
      state.compilation,
      state.assignment,
      state.expectation,
      session,
      agentId,
      rawHandoff,
    ),
  );
  const view = await saveRun(session, state.expectation);
  return {
    outcome: "pass",
    sessionDigest: session.contentDigest,
    runViewDigest: view.runView.contentDigest,
    integrationReady: view.inspection.integrationReady,
    route: view.inspection.routes,
  };
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (command === "start" && args.length === 0) return start();
  if (command === "authorize" && args.length === 1) return authorize(args[0]);
  if (command === "materialize" && args.length === 2) {
    return materialize(args[0], args[1]);
  }
  if (command === "launch" && args.length === 2) return launch(args[0], args[1]);
  if (command === "result" && args.length === 3) return result(args[0], args[1], args[2]);
  throw new Error(
    "Usage: run-controller.mjs start | authorize <agentId> | materialize <agentId> <nativeHandle> | launch <agentId> <nativeHandle> | result <agentId> <nativeHandle> <handoffPath>",
  );
}

process.stdout.write(`${JSON.stringify(await main(), null, 2)}\n`);
