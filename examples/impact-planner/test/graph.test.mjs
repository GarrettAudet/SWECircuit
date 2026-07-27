import assert from "node:assert/strict";
import test from "node:test";
import {
  CRITICALITIES,
  analyzeImpact,
  removeComponent,
  upsertComponent,
  validateGraph
} from "../src/graph.js";

function component(overrides = {}) {
  return {
    id: "api",
    name: "Public API",
    owner: "Platform",
    criticality: "high",
    dependsOn: ["database"],
    ...overrides
  };
}

function graph(overrides = {}) {
  return {
    components: [
      component({ id: "database", name: "Database", owner: "Data", criticality: "high", dependsOn: [] }),
      component(),
      component({ id: "web", name: "Web", owner: "Product", criticality: "medium", dependsOn: ["api"] })
    ],
    changedIds: ["database"],
    ...overrides
  };
}

test("validateGraph normalizes, canonically sorts, and leaves caller data unchanged", () => {
  const source = graph({
    components: [
      component({ id: " web ", name: " Web ", owner: " Product ", criticality: " medium ", dependsOn: ["api"] }),
      component({ id: " database ", name: " Database ", owner: " Data ", criticality: " high ", dependsOn: [] }),
      component({ id: " api ", name: " Public API ", owner: " Platform ", criticality: " high ", dependsOn: ["database"] })
    ],
    changedIds: [" database "]
  });
  const result = validateGraph(source);

  assert.deepEqual(CRITICALITIES, ["low", "medium", "high"]);
  assert.equal(result.ok, true);
  assert.deepEqual(result.value.components.map((item) => item.id), ["api", "database", "web"]);
  assert.deepEqual(result.value.changedIds, ["database"]);
  assert.equal(source.components[0].id, " web ");
  assert.notEqual(result.value.components, source.components);
});

test("validateGraph reports closed deterministic structural, reference, and cycle errors", () => {
  assert.deepEqual(validateGraph({ components: [], changedIds: [], unexpected: true }).errors[0].code, "unknown-key");
  assert.equal(validateGraph({ components: [], changedIds: [] }).ok, true);
  assert.equal(validateGraph(graph({ components: [component({ id: "Bad" })], changedIds: [] })).errors[0].code, "invalid-id");
  assert.equal(validateGraph(graph({ components: [component(), component()], changedIds: [] })).errors[0].code, "duplicate-component");
  assert.equal(validateGraph(graph({ components: [component({ dependsOn: ["missing"] })], changedIds: [] })).errors[0].code, "unknown-dependency");
  assert.equal(validateGraph(graph({ components: [component({ dependsOn: ["api"] })], changedIds: [] })).errors[0].code, "self-dependency");
  assert.equal(validateGraph(graph({ components: [component({ id: "a", dependsOn: ["b"] }), component({ id: "b", dependsOn: ["a"] })], changedIds: [] })).errors[0].code, "dependency-cycle");
  assert.equal(validateGraph(graph({ changedIds: ["missing"] })).errors[0].code, "unknown-changed-id");
});

test("upsertComponent is immutable and revalidates graph references and cycles", () => {
  const components = graph().components;
  const result = upsertComponent(components, component({ id: "worker", name: "Worker", owner: "Platform", criticality: "low", dependsOn: ["api"] }));

  assert.equal(result.ok, true);
  assert.deepEqual(result.value.map((item) => item.id), ["api", "database", "web", "worker"]);
  assert.deepEqual(components, graph().components);
  assert.notEqual(result.value, components);
  assert.equal(upsertComponent(components, component({ dependsOn: ["web"] })).errors[0].code, "dependency-cycle");
  assert.equal(upsertComponent(components, component({ id: "worker", dependsOn: ["missing"] })).errors[0].code, "unknown-dependency");
});

test("removeComponent is immutable, removes remaining references, and rejects absent ids", () => {
  const components = graph().components;
  const result = removeComponent(components, "api");

  assert.equal(result.ok, true);
  assert.deepEqual(result.value, [
    component({ id: "database", name: "Database", owner: "Data", criticality: "high", dependsOn: [] }),
    component({ id: "web", name: "Web", owner: "Product", criticality: "medium", dependsOn: [] })
  ]);
  assert.deepEqual(components, graph().components);
  assert.equal(removeComponent(components, "missing").errors[0].code, "missing-component");
});

test("analyzeImpact reports deterministic transitive impact, risk, and lexicographic shortest paths", () => {
  const components = [
    component({ id: "a", name: "A", owner: "Team", criticality: "low", dependsOn: [] }),
    component({ id: "b", name: "B", owner: "Team", criticality: "medium", dependsOn: [] }),
    component({ id: "m", name: "M", owner: "Team", criticality: "high", dependsOn: ["a", "b"] }),
    component({ id: "z", name: "Z", owner: "Team", criticality: "low", dependsOn: ["m"] })
  ];
  const result = analyzeImpact(components, ["b", "a"]);

  assert.equal(result.ok, true);
  assert.deepEqual(result.value.changedIds, ["a", "b"]);
  assert.deepEqual(result.value.affected, [
    { id: "a", distance: 0, path: ["a"], criticality: "low", direct: true },
    { id: "b", distance: 0, path: ["b"], criticality: "medium", direct: true },
    { id: "m", distance: 1, path: ["a", "m"], criticality: "high", direct: false },
    { id: "z", distance: 2, path: ["a", "m", "z"], criticality: "low", direct: false }
  ]);
  assert.equal(result.value.score, 10);
  assert.equal(result.value.level, "high");
  assert.equal(result.value.summary, "4 components affected \u00b7 high risk");
});

test("analyzeImpact handles empty graphs and all risk-level boundaries", () => {
  assert.deepEqual(analyzeImpact([], []), {
    ok: true,
    value: { changedIds: [], affected: [], score: 0, level: "low", summary: "0 components affected \u00b7 low risk" }
  });
  assert.equal(analyzeImpact([component({ id: "a", dependsOn: [], criticality: "low" })], ["a"]).value.level, "low");
  assert.equal(analyzeImpact([component({ id: "a", dependsOn: [], criticality: "medium" })], ["a"]).value.level, "low");
  assert.equal(analyzeImpact([component({ id: "a", dependsOn: [], criticality: "high" }), component({ id: "b", dependsOn: ["a"], criticality: "low" })], ["a"]).value.level, "medium");
});
