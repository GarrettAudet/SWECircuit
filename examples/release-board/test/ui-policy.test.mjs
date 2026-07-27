import assert from "node:assert/strict";
import test from "node:test";

import {
  commitAnnouncement,
  preferredScrollBehavior
} from "../src/ui-policy.js";

test("commit announcements preserve success while exposing persistence failure", () => {
  assert.equal(commitAnnouncement("Added Release notes.", true), "Added Release notes.");
  assert.equal(
    commitAnnouncement("Added Release notes.", false),
    "Added Release notes. Progress is available for this session but could not be saved."
  );
  assert.throws(() => commitAnnouncement("", true), /non-empty/);
});

test("scroll behavior honors reduced-motion preference", () => {
  assert.equal(preferredScrollBehavior(false), "smooth");
  assert.equal(preferredScrollBehavior(true), "auto");
});
