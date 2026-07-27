import {
  addCheck,
  filterChecks,
  removeCheck,
  summarizeChecks,
  updateCheck
} from "./model.js";
import { parseChecks, serializeChecks, STORAGE_KEY } from "./storage.js";
import { commitAnnouncement, preferredScrollBehavior } from "./ui-policy.js";

const STATUS_LABELS = Object.freeze({
  pending: "Pending",
  passed: "Passed",
  blocked: "Blocked"
});

const CATEGORY_LABELS = Object.freeze({
  build: "Build",
  test: "Test",
  review: "Review",
  docs: "Docs"
});

const NEXT_STATUS = Object.freeze({
  pending: { status: "passed", label: "Mark passed" },
  passed: { status: "blocked", label: "Mark blocked" },
  blocked: { status: "pending", label: "Reset pending" }
});

const SEED_CHECKS = Object.freeze([
  {
    id: "seed-build",
    title: "Production build completes",
    owner: "Engineering",
    category: "build",
    status: "passed",
    evidence: "Canonical package built locally."
  },
  {
    id: "seed-tests",
    title: "Regression suite is green",
    owner: "Quality",
    category: "test",
    status: "pending",
    evidence: ""
  },
  {
    id: "seed-review",
    title: "Independent review has no blockers",
    owner: "Reviewer",
    category: "review",
    status: "blocked",
    evidence: "Awaiting review assignment."
  },
  {
    id: "seed-docs",
    title: "Release notes are current",
    owner: "Docs",
    category: "docs",
    status: "pending",
    evidence: ""
  }
]);

function requireElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Missing required application element: ${id}`);
  }
  return element;
}

const elements = {
  addButton: requireElement("add-check-button"),
  form: requireElement("check-form"),
  title: requireElement("check-title"),
  owner: requireElement("check-owner"),
  category: requireElement("check-category"),
  evidence: requireElement("check-evidence"),
  readiness: requireElement("readiness-summary"),
  readinessLabel: requireElement("readiness-label"),
  summary: {
    total: requireElement("summary-total"),
    pending: requireElement("summary-pending"),
    passed: requireElement("summary-passed"),
    blocked: requireElement("summary-blocked")
  },
  filters: [...document.querySelectorAll("[data-filter]")],
  list: requireElement("check-list"),
  empty: requireElement("empty-state"),
  emptyTitle: requireElement("empty-state-title"),
  emptyMessage: requireElement("empty-state-message"),
  emptyAction: requireElement("empty-state-action"),
  template: requireElement("check-row-template"),
  liveRegion: requireElement("app-live-region")
};

let storage = null;
let activeFilter = "all";
let idCounter = 0;

try {
  storage = window.localStorage;
} catch {
  storage = null;
}

function seededChecks() {
  return SEED_CHECKS.map((check) => ({ ...check }));
}

function loadChecks() {
  if (!storage) {
    return seededChecks();
  }
  try {
    const stored = storage.getItem(STORAGE_KEY);
    if (stored === null) {
      return seededChecks();
    }
    return parseChecks(stored) ?? seededChecks();
  } catch {
    return seededChecks();
  }
}

let checks = loadChecks();

function persist() {
  if (!storage) {
    return false;
  }
  try {
    storage.setItem(STORAGE_KEY, serializeChecks(checks));
    return true;
  } catch {
    return false;
  }
}

function announce(message) {
  elements.liveRegion.textContent = "";
  window.setTimeout(() => {
    elements.liveRegion.textContent = message;
  }, 0);
}

function createId() {
  if (typeof crypto.randomUUID === "function") {
    return `check-${crypto.randomUUID()}`;
  }
  idCounter += 1;
  return `check-${Date.now().toString(36)}-${idCounter.toString(36)}`;
}

function findAction(checkId, action) {
  return [...elements.list.querySelectorAll("[data-action]")].find(
    (button) =>
      button.closest("[data-check-id]")?.dataset.checkId === checkId &&
      button.dataset.action === action
  );
}

function renderCheck(check) {
  const fragment = elements.template.content.cloneNode(true);
  const row = fragment.querySelector("[data-check-id]");
  const title = fragment.querySelector("[data-check-title]");
  const status = fragment.querySelector("[data-check-status]");
  const owner = fragment.querySelector("[data-check-owner]");
  const category = fragment.querySelector("[data-check-category]");
  const evidence = fragment.querySelector("[data-check-evidence]");
  const statusButton = fragment.querySelector('[data-action="status"]');
  const deleteButton = fragment.querySelector('[data-action="delete"]');

  if (
    !row ||
    !title ||
    !status ||
    !owner ||
    !category ||
    !evidence ||
    !statusButton ||
    !deleteButton
  ) {
    throw new Error("Release Board row template is incomplete.");
  }

  row.dataset.checkId = check.id;
  row.dataset.status = check.status;
  title.textContent = check.title;
  status.textContent = STATUS_LABELS[check.status];
  status.dataset.status = check.status;
  owner.textContent = check.owner;
  category.textContent = CATEGORY_LABELS[check.category];
  evidence.textContent = check.evidence;
  evidence.hidden = check.evidence.length === 0;

  statusButton.textContent = NEXT_STATUS[check.status].label;
  statusButton.setAttribute(
    "aria-label",
    `${NEXT_STATUS[check.status].label}: ${check.title}`
  );
  deleteButton.setAttribute("aria-label", `Delete: ${check.title}`);
  return fragment;
}

function render() {
  const summary = summarizeChecks(checks);
  for (const key of ["total", "pending", "passed", "blocked"]) {
    elements.summary[key].textContent = String(summary[key]);
  }
  elements.readiness.dataset.ready = String(summary.ready);
  elements.readinessLabel.textContent = summary.ready ? "Ready to ship" : "Not ready";

  for (const button of elements.filters) {
    const active = button.dataset.filter === activeFilter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }

  const visible = filterChecks(checks, activeFilter);
  elements.list.replaceChildren(...visible.map(renderCheck));
  elements.empty.hidden = visible.length > 0;
  elements.emptyTitle.textContent =
    checks.length === 0 ? "No release checks yet" : "No checks match";
  elements.emptyMessage.textContent =
    checks.length === 0
      ? "Add the first check required for this release."
      : "Choose another filter or add a release check.";
}

function commit(nextChecks, message, focus = null) {
  checks = nextChecks;
  const persisted = persist();
  render();
  announce(commitAnnouncement(message, persisted));
  focus?.();
}

function focusForm() {
  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  elements.form.scrollIntoView({
    behavior: preferredScrollBehavior(prefersReducedMotion),
    block: "center"
  });
  elements.title.focus();
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!elements.form.reportValidity()) {
    return;
  }

  try {
    const check = {
      id: createId(),
      title: elements.title.value,
      owner: elements.owner.value,
      category: elements.category.value,
      status: "pending",
      evidence: elements.evidence.value
    };
    commit(addCheck(checks, check), `Added ${check.title}.`);
    elements.form.reset();
    elements.category.value = "test";
    elements.title.focus();
  } catch (error) {
    announce(error instanceof Error ? error.message : "Unable to add release check.");
  }
});

elements.list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  const row = button?.closest("[data-check-id]");
  if (!button || !row) {
    return;
  }
  const check = checks.find((entry) => entry.id === row.dataset.checkId);
  if (!check) {
    return;
  }

  try {
    if (button.dataset.action === "delete") {
      commit(removeCheck(checks, check.id), `Deleted ${check.title}.`, () => {
        elements.addButton.focus();
      });
      return;
    }
    if (button.dataset.action === "status") {
      const next = NEXT_STATUS[check.status];
      commit(
        updateCheck(checks, check.id, { status: next.status }),
        `${check.title} is now ${STATUS_LABELS[next.status].toLowerCase()}.`,
        () => findAction(check.id, "status")?.focus()
      );
    }
  } catch (error) {
    announce(error instanceof Error ? error.message : "Unable to update release check.");
  }
});

for (const button of elements.filters) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter ?? "all";
    render();
    announce(`Showing ${activeFilter} checks.`);
  });
}

elements.addButton.addEventListener("click", focusForm);
elements.emptyAction.addEventListener("click", focusForm);

persist();
render();
