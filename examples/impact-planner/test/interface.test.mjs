import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const view = fs.readFileSync(path.join(root, "src", "view.js"), "utf8");

test("interface exposes stable semantic hooks", () => {
  for (const id of ["component-form", "component-id", "component-name", "component-owner", "component-criticality", "component-dependencies", "component-list", "changed-list", "impact-summary", "impact-table-body", "import-file", "import-button", "export-button", "reset-button", "error-summary", "announcement"]) assert.match(html, new RegExp(`id=["']${id}["']`));
  assert.match(html, /<template id=["']component-template["']/);
  assert.match(html, /role=["']alert["']/);
  assert.match(html, /aria-live=["']polite["']/);
});

test("view exports the closed DOM projection API", () => {
  for (const name of ["readComponentDraft", "renderComponents", "renderImpact", "renderErrors", "announce", "preferredScrollBehavior"]) assert.match(view, new RegExp(`export function ${name}`));
  assert.match(view, /replaceChildren\(\)/);
  assert.match(view, /textContent/);
});

test("responsive and reduced-motion rules are present", () => {
  assert.match(css, /@media \(max-width: 30rem\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /min-height: 2\.75rem/);
  assert.match(css, /overflow-x: auto/);
});
