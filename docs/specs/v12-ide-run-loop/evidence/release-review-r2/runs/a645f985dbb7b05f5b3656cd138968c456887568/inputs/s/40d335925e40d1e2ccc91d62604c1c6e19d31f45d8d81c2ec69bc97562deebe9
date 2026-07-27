import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { test } from "node:test";
import { TextEncoder } from "node:util";

import {
  recordSpecialistRunHandoff,
  restoreSpecialistRunSession,
  SPECIALIST_RUN_LIMITS,
  verifySpecialistHandoff,
} from "swecircuit";

import {
  assertOk,
  assertRejected,
  makeFixture,
  maximumRawHandoff,
} from "./helpers/specialist-run-fixture.mjs";

const encoder = new TextEncoder();
test("raw handoff and run input boundaries reject one-unit excess without truncation", () => {
  const fixture = makeFixture(
    [
      {
        id: "unit.a",
        dependencies: [],
        handoffArtifacts: Array.from(
          { length: 65 },
          (_, index) => `artifact.boundary.${index + 1}.md`,
        ),
      },
      { id: "unit.b", dependencies: ["unit.a"] },
    ],
    "boundary",
  );
  const exactRaw = maximumRawHandoff(fixture, "unit.a");

  assertOk(
    verifySpecialistHandoff(fixture.specialistPackage, fixture.expectation, exactRaw),
    "maximum raw handoff verification",
  );
  const recorded = assertOk(
    recordSpecialistRunHandoff(fixture.initialSession, fixture.expectation, exactRaw),
    "maximum raw handoff recording",
  );
  assert.equal(recorded.acceptedHandoffs[0].rawBytes, SPECIALIST_RUN_LIMITS.rawHandoffBytes);
  assert.equal(
    recorded.acceptedHandoffs[0].rawBase64.length,
    SPECIALIST_RUN_LIMITS.rawHandoffBase64Chars,
  );
  assert.equal(
    recorded.acceptedHandoffs[0].rawDigest,
    `sha256:${createHash("sha256").update(exactRaw).digest("hex")}`,
  );
  assertOk(
    restoreSpecialistRunSession(encoder.encode(JSON.stringify(recorded)), fixture.expectation),
    "session with maximum raw handoff",
  );

  const canonicalRawSession = encoder.encode(JSON.stringify(fixture.initialSession));
  const atLimitRawSession = new Uint8Array(SPECIALIST_RUN_LIMITS.rawSessionInputBytes);
  atLimitRawSession.set(canonicalRawSession);
  atLimitRawSession.fill(0x20, canonicalRawSession.byteLength);
  assertOk(
    restoreSpecialistRunSession(atLimitRawSession, fixture.expectation),
    "raw session at exact input boundary",
  );

  const oneByteOverHandoff = new Uint8Array(SPECIALIST_RUN_LIMITS.rawHandoffBytes + 1);
  oneByteOverHandoff.set(exactRaw);
  oneByteOverHandoff[oneByteOverHandoff.length - 1] = 0x20;
  assertRejected(
    recordSpecialistRunHandoff(fixture.initialSession, fixture.expectation, oneByteOverHandoff),
    "SC4308",
    "raw handoff one byte over",
  );

  const oneByteOverSession = new Uint8Array(SPECIALIST_RUN_LIMITS.rawSessionInputBytes + 1);
  assertRejected(
    restoreSpecialistRunSession(oneByteOverSession, fixture.expectation),
    "SC4402",
    "raw session one byte over",
  );
});
