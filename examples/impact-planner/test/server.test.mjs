import assert from "node:assert/strict";
import { after, before, test } from "node:test";

import {
  createImpactPlannerServer,
  SECURITY_HEADERS,
  startImpactPlannerServer
} from "../server.mjs";

let server;
let baseUrl;

before(async () => {
  server = createImpactPlannerServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test("server publishes only declared local application assets", async () => {
  const expected = [
    "/",
    "/index.html",
    "/styles.css",
    "/src/app.js",
    "/src/codec.js",
    "/src/graph.js",
    "/src/storage.js",
    "/src/ui-policy.js",
    "/src/view.js"
  ];
  for (const route of expected) {
    const response = await fetch(`${baseUrl}${route}`);
    assert.equal(response.status, 200, route);
  }
  assert.equal((await fetch(`${baseUrl}/README.md`)).status, 404);
  assert.equal((await fetch(`${baseUrl}/package.json`)).status, 404);
  assert.equal((await fetch(`${baseUrl}/src/missing.js`)).status, 404);
});

test("server applies the closed content policy and request boundaries", async () => {
  const response = await fetch(`${baseUrl}/`);
  assert.equal(
    response.headers.get("content-security-policy"),
    SECURITY_HEADERS["Content-Security-Policy"]
  );
  assert.match(await response.text(), /<title>Impact Planner<\/title>/);

  const head = await fetch(`${baseUrl}/src/app.js`, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");

  const post = await fetch(`${baseUrl}/`, { method: "POST" });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get("allow"), "GET, HEAD");

  const traversal = await fetch(`${baseUrl}/%2e%2e/package.json`);
  assert.equal(traversal.status, 404);
});

test("start helper rejects invalid ports before binding", () => {
  assert.throws(() => startImpactPlannerServer(0), /PORT/);
  assert.throws(() => startImpactPlannerServer(65536), /PORT/);
});
