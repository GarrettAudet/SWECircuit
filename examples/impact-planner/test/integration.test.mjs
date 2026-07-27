import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  applyChangedToggle,
  applyComponentRemoval,
  applyComponentUpsert,
  createSeedWorkspace,
  validateIntegratedWorkspace
} from "../src/app.js";
import { parseWorkspace, serializeWorkspace } from "../src/codec.js";
import { analyzeImpact } from "../src/graph.js";
import { loadWorkspace, saveWorkspace } from "../src/storage.js";
import {
  persistenceAnnouncement,
  recoveryFocusId,
  validationAnnouncement
} from "../src/ui-policy.js";

test("seed workspace integrates codec, graph, impact analysis, and storage", () => {
  const seed = createSeedWorkspace();
  const integrated = validateIntegratedWorkspace(seed);
  assert.equal(integrated.ok, true);
  assert.deepEqual(integrated.value.changedIds, ["database"]);
  assert.deepEqual(integrated.value.components.map((component) => component.id), [
    "api",
    "dashboard",
    "database",
    "worker"
  ]);

  const impact = analyzeImpact(integrated.value.components, integrated.value.changedIds);
  assert.equal(impact.ok, true);
  assert.deepEqual(impact.value.affected.map((entry) => entry.id), [
    "database",
    "api",
    "worker",
    "dashboard"
  ]);

  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  };
  assert.equal(saveWorkspace(storage, integrated.value).ok, true);
  assert.deepEqual(loadWorkspace(storage), integrated);
});

test("component, change-set, and removal mutations are immutable and fully revalidated", () => {
  const original = createSeedWorkspace();
  const originalText = JSON.stringify(original);
  const added = applyComponentUpsert(original, {
    id: "gateway",
    name: "Gateway",
    owner: "Platform",
    criticality: "high",
    dependsOn: ["api"]
  });
  assert.equal(added.ok, true);
  assert.equal(JSON.stringify(original), originalText);

  const toggled = applyChangedToggle(added.value, "gateway", true);
  assert.equal(toggled.ok, true);
  assert.deepEqual(toggled.value.changedIds, ["database", "gateway"]);

  const removed = applyComponentRemoval(toggled.value, "api");
  assert.equal(removed.ok, true);
  assert.equal(removed.value.components.some((component) => component.id === "api"), false);
  assert.deepEqual(
    removed.value.components.find((component) => component.id === "gateway").dependsOn,
    []
  );
});

test("integration rejects codec-valid workspaces with invalid graph references", () => {
  const serialized = serializeWorkspace({
    schemaVersion: 1,
    components: [{
      id: "api",
      name: "API",
      owner: "Platform",
      criticality: "high",
      dependsOn: ["missing"]
    }],
    changedIds: []
  });
  assert.equal(serialized.ok, true);
  const parsed = parseWorkspace(serialized.value);
  assert.equal(parsed.ok, true);
  const integrated = validateIntegratedWorkspace(parsed.value);
  assert.equal(integrated.ok, false);
  assert.equal(integrated.errors[0].code, "unknown-dependency");
});

test("UI policy distinguishes persistence failure and chooses deterministic recovery focus", () => {
  assert.equal(
    persistenceAnnouncement("Saved API.", true),
    "Saved API."
  );
  assert.match(persistenceAnnouncement("Saved API.", false), /could not be saved locally/);
  assert.equal(validationAnnouncement("Import", [{}]), "Import failed validation. 1 issue needs attention.");
  assert.equal(recoveryFocusId([{ id: "a" }, { id: "c" }], 1), "c");
  assert.equal(recoveryFocusId([{ id: "a" }], 3), "a");
  assert.equal(recoveryFocusId([], 0), null);
});

test("application source wires every required offline workflow", async () => {
  const source = await readFile(new URL("../src/app.js", import.meta.url), "utf8");
  assert.match(source, /addEventListener\("submit"/);
  assert.match(source, /addEventListener\("change"/);
  assert.match(source, /parseWorkspace\(await file\.text\(\)\)/);
  assert.match(source, /new Blob\(\[serialized\.value\]/);
  assert.match(source, /impact-planner-workspace\.json/);
  assert.match(source, /window\.confirm\(/);
  assert.match(source, /preferredScrollBehavior\(reducedMotion\(\)\)/);
  assert.doesNotMatch(source, /https?:\/\//);
});

test("changed component rows bind to the accessible stylesheet selector", async () => {
  const [source, styles] = await Promise.all([
    readFile(new URL("../src/app.js", import.meta.url), "utf8"),
    readFile(new URL("../styles.css", import.meta.url), "utf8")
  ]);
  const match = source.match(
    /function renderChangedControls\(\) \{[\s\S]*?item\.className = "([^"]+)";/
  );
  assert.ok(match);
  assert.equal(match[1], "changed-item");
  assert.match(styles, new RegExp(`\\.${match[1]}\\s*\\{`));
  assert.match(
    styles,
    /\.changed-item label\s*\{[^}]*display:\s*flex;[^}]*min-height:\s*2\.75rem;[^}]*cursor:\s*pointer;/,
  );
  assert.doesNotMatch(styles, /\.changed-item\s*\{[^}]*padding:/);
});