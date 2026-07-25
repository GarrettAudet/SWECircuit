import assert from "node:assert/strict";
import { test } from "node:test";
import { TextEncoder } from "node:util";

import {
  inspectSpecialistRunSession,
  recordSpecialistRunHandoff,
  restoreSpecialistRunSession,
  SPECIALIST_LIMITS,
  SPECIALIST_RUN_LIMITS,
  verifySpecialistHandoff,
  verifySpecialistPackage,
} from "swecircuit";

import {
  assertOk,
  jsonByteLength,
  makeFixture,
  maximumRawHandoff,
} from "./helpers/specialist-run-fixture.mjs";

const encoder = new TextEncoder();
test("the 16-agent maximum-handoff aggregate converges below conservative run safeguards", () => {
  const definitions = Array.from({ length: SPECIALIST_RUN_LIMITS.acceptedHandoffs }, (_, index) => {
    const unit = String(index + 1).padStart(2, "0");
    return {
      id: `unit.aggregate.${unit}`,
      dependencies: [],
      handoffArtifacts: Array.from(
        { length: 65 },
        (_, artifactIndex) =>
          `artifact.aggregate.${unit}.${String(artifactIndex + 1).padStart(3, "0")}.md`,
      ),
    };
  });
  const fixture = makeFixture(definitions, "aggregate-boundary");
  assert.equal(fixture.compilation.blueprints.length, SPECIALIST_LIMITS.agents);
  assertOk(
    verifySpecialistPackage(fixture.specialistPackage, fixture.expectation),
    "16-agent aggregate package verification",
  );

  const initialInspection = assertOk(
    inspectSpecialistRunSession(fixture.initialSession, fixture.expectation),
    "16-agent initial inspection",
  );
  assert.equal(
    initialInspection.dependencyEligibleContracts.length,
    SPECIALIST_RUN_LIMITS.acceptedHandoffs,
  );

  const rawByUnit = new Map(
    definitions.map((definition) => [definition.id, maximumRawHandoff(fixture, definition.id)]),
  );
  for (const [unitId, raw] of rawByUnit) {
    assertOk(
      verifySpecialistHandoff(fixture.specialistPackage, fixture.expectation, raw),
      `${unitId} maximum handoff verification`,
    );
  }

  const recordAll = (order, label) => {
    let session = fixture.initialSession;
    for (const unitId of order) {
      session = assertOk(
        recordSpecialistRunHandoff(session, fixture.expectation, rawByUnit.get(unitId)),
        `${label} record ${unitId}`,
      );
    }
    return session;
  };
  const forwardOrder = definitions.map((definition) => definition.id);
  const forward = recordAll(forwardOrder, "forward aggregate");
  assert.equal(forward.acceptedHandoffs.length, SPECIALIST_RUN_LIMITS.acceptedHandoffs);
  assert.equal(
    forward.acceptedHandoffs.every(
      (row) =>
        row.rawBytes === SPECIALIST_RUN_LIMITS.rawHandoffBytes &&
        row.rawBase64.length === SPECIALIST_RUN_LIMITS.rawHandoffBase64Chars,
    ),
    true,
  );

  const restored = assertOk(
    restoreSpecialistRunSession(encoder.encode(JSON.stringify(forward)), fixture.expectation),
    "16-agent maximum-handoff restore",
  );
  assert.deepEqual(restored, forward);
  const forwardInspection = assertOk(
    inspectSpecialistRunSession(forward, fixture.expectation),
    "16-agent maximum-handoff inspection",
  );
  const restoredInspection = assertOk(
    inspectSpecialistRunSession(restored, fixture.expectation),
    "restored maximum-handoff inspection",
  );
  assert.deepEqual(restoredInspection, forwardInspection);
  assert.equal(forwardInspection.stage, "integration_ready");
  assert.equal(forwardInspection.integrationReady, true);
  assert.equal(forwardInspection.acceptedEvidence.length, SPECIALIST_RUN_LIMITS.acceptedHandoffs);

  // The V11 verifier bounds the complete package envelope at eight output budgets.
  const packageEnvelopeCeiling = SPECIALIST_LIMITS.outputBytes * 8;
  assert.ok(jsonByteLength(fixture.specialistPackage) <= packageEnvelopeCeiling);
  const acceptedRowsAtCeiling = jsonByteLength(forward.acceptedHandoffs);
  const sessionRootReserve =
    SPECIALIST_LIMITS.textBytes + 2 * SPECIALIST_LIMITS.identifierBytes + 4_096;
  const sessionConstituentCeiling =
    packageEnvelopeCeiling + acceptedRowsAtCeiling + sessionRootReserve;
  assert.ok(jsonByteLength(forward) <= sessionConstituentCeiling);
  assert.ok(
    sessionConstituentCeiling < SPECIALIST_RUN_LIMITS.rawSessionInputBytes,
    "the maximum canonical session must fit the raw restore boundary",
  );
  assert.ok(
    sessionConstituentCeiling < SPECIALIST_RUN_LIMITS.canonicalSessionBytes,
    `${sessionConstituentCeiling} must remain below the session safeguard`,
  );

  // Inspection replaces artifact content with bindings. The only possible growth over each
  // raw handoff is bounded binding metadata, while eligible contract content is already inside
  // the package envelope ceiling. This deliberately counts both maxima at once.
  const acceptedEvidenceCeiling =
    SPECIALIST_RUN_LIMITS.acceptedHandoffs *
    (SPECIALIST_RUN_LIMITS.rawHandoffBytes + SPECIALIST_LIMITS.handoffArtifacts * 128 + 1_024);
  const statusAndRootReserve =
    SPECIALIST_RUN_LIMITS.acceptedHandoffs *
      (SPECIALIST_RUN_LIMITS.acceptedHandoffs * ("agent.".length + 64 + 3) * 2 + 4_096) +
    SPECIALIST_RUN_LIMITS.acceptedHandoffs * 512 +
    SPECIALIST_LIMITS.textBytes +
    65_536;
  const inspectionConstituentCeiling =
    packageEnvelopeCeiling + acceptedEvidenceCeiling + statusAndRootReserve;
  assert.ok(jsonByteLength(initialInspection) <= inspectionConstituentCeiling);
  assert.ok(jsonByteLength(forwardInspection) <= inspectionConstituentCeiling);
  assert.ok(
    inspectionConstituentCeiling < SPECIALIST_RUN_LIMITS.canonicalInspectionBytes,
    `${inspectionConstituentCeiling} must remain below the inspection safeguard`,
  );
});
