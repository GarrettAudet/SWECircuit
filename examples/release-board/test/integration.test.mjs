import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { after, before, test } from "node:test";

import { createReleaseBoardServer } from "../server.mjs";

const ROOT = new URL("../", import.meta.url);
let server;
let baseUrl;

before(async () => {
  server = createReleaseBoardServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test("static shell exposes every integration hook without remote assets", async () => {
  const [html, css, app] = await Promise.all([
    readFile(new URL("index.html", ROOT), "utf8"),
    readFile(new URL("styles.css", ROOT), "utf8"),
    readFile(new URL("src/app.js", ROOT), "utf8")
  ]);
  for (const id of [
    "readiness-summary",
    "summary-total",
    "summary-pending",
    "summary-passed",
    "summary-blocked",
    "check-form",
    "check-list",
    "empty-state",
    "check-row-template",
    "app-live-region"
  ]) {
    assert.match(html, new RegExp(`id=\"${id}\"`));
  }
  assert.match(html, /<script type="module" src="\.\/src\/app\.js"><\/script>/);
  assert.doesNotMatch(html, /https?:\/\//);
  assert.doesNotMatch(html, /\son[a-z]+=/i);
  assert.match(css, /@media \(max-width: 30rem\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(app, /commitAnnouncement\(message, persisted\)/);
  assert.match(app, /preferredScrollBehavior\(prefersReducedMotion\)/);
});

test("local server publishes the app with a closed network policy", async () => {
  const response = await fetch(`${baseUrl}/`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /^text\/html/);
  assert.match(response.headers.get("content-security-policy"), /connect-src 'none'/);
  assert.match(await response.text(), /<title>Release Board<\/title>/);

  const app = await fetch(`${baseUrl}/src/app.js`);
  assert.equal(app.status, 200);
  assert.match(await app.text(), /serializeChecks/);

  const uiPolicy = await fetch(`${baseUrl}/src/ui-policy.js`);
  assert.equal(uiPolicy.status, 200);
  assert.match(await uiPolicy.text(), /preferredScrollBehavior/);

  const missing = await fetch(`${baseUrl}/missing`);
  assert.equal(missing.status, 404);
});
