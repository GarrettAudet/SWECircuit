import {
  createIssue,
  createSeedIssues,
  filterIssues,
  groupIssues,
  parseIssueCollection,
  serializeIssueCollection,
  updateIssue
} from "./model.js";
import { loadIssues, saveIssues, STORAGE_KEY } from "./storage.js";

const STATUS_LABELS = Object.freeze({
  backlog: "Backlog",
  in_progress: "In progress",
  done: "Done"
});

const PRIORITY_LABELS = Object.freeze({
  low: "Low",
  medium: "Medium",
  high: "High"
});

const STATUS_MOVES = Object.freeze({
  backlog: [{ status: "in_progress", label: "Start" }],
  in_progress: [
    { status: "backlog", label: "Move to backlog" },
    { status: "done", label: "Mark done" }
  ],
  done: [{ status: "in_progress", label: "Reopen" }]
});

function requireElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Missing required application element: ${id}`);
  }
  return element;
}

const elements = {
  board: document.querySelector(".board"),
  createButton: requireElement("create-issue-button"),
  importInput: requireElement("import-file"),
  exportButton: requireElement("export-button"),
  searchInput: requireElement("issue-search"),
  statusFilter: requireElement("status-filter"),
  priorityFilter: requireElement("priority-filter"),
  clearFiltersButton: requireElement("clear-filters-button"),
  filterSummary: requireElement("filter-summary"),
  emptyState: requireElement("empty-state"),
  emptyStateTitle: requireElement("empty-state-title"),
  emptyStateMessage: requireElement("empty-state-message"),
  emptyStateAction: requireElement("empty-state-action"),
  dialog: requireElement("issue-dialog"),
  dialogTitle: requireElement("issue-dialog-title"),
  form: requireElement("issue-form"),
  formError: requireElement("issue-form-error"),
  issueId: requireElement("issue-id"),
  issueTitle: requireElement("issue-title"),
  issueDetails: requireElement("issue-details"),
  issuePriority: requireElement("issue-priority"),
  issueStatus: requireElement("issue-status"),
  deleteButton: requireElement("delete-issue-button"),
  cancelButton: requireElement("cancel-dialog-button"),
  closeButton: requireElement("close-dialog-button"),
  liveRegion: requireElement("app-live-region"),
  lists: {
    backlog: requireElement("backlog-list"),
    in_progress: requireElement("in-progress-list"),
    done: requireElement("done-list")
  },
  counts: {
    backlog: requireElement("backlog-count"),
    in_progress: requireElement("in-progress-count"),
    done: requireElement("done-count")
  }
};

if (!elements.board) {
  throw new Error("Missing required application board");
}

let issues = [];
let filters = { search: "", status: "", priority: "" };
let storage = null;
let returnFocusTarget = null;
let feedbackTimer = null;

try {
  storage = window.localStorage;
} catch {
  storage = null;
}

function errorMessage(error, fallback) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function hasActiveFilters() {
  return Boolean(filters.search.trim() || filters.status || filters.priority);
}

function announce(message, { visible = false } = {}) {
  elements.liveRegion.textContent = "";
  window.setTimeout(() => {
    elements.liveRegion.textContent = message;
  }, 0);

  if (!visible) {
    return;
  }

  window.clearTimeout(feedbackTimer);
  elements.filterSummary.textContent = message;
  feedbackTimer = window.setTimeout(() => {
    updateFilterSummary();
  }, 6000);
}

function updateFilterSummary(visibleCount = null) {
  const count =
    visibleCount ??
    filterIssues(issues, {
      search: filters.search,
      status: filters.status,
      priority: filters.priority
    }).length;
  const active = hasActiveFilters();
  elements.clearFiltersButton.disabled = !active;
  elements.filterSummary.textContent = active
    ? `Showing ${count} of ${issues.length} issues`
    : `Showing all ${issues.length} issues`;
}

function createButton(label, action, issue, targetStatus = "") {
  const button = document.createElement("button");
  button.className = action === "edit" ? "button button-secondary" : "button button-quiet";
  button.type = "button";
  button.textContent = label;
  button.dataset.action = action;
  button.dataset.issueId = issue.id;
  if (targetStatus) {
    button.dataset.targetStatus = targetStatus;
  }
  button.setAttribute("aria-label", `${label}: ${issue.title}`);
  return button;
}

function createIssueCard(issue) {
  const item = document.createElement("li");
  item.className = "issue-card";
  item.dataset.issueId = issue.id;

  const header = document.createElement("div");
  header.className = "issue-card-header";

  const title = document.createElement("h3");
  title.className = "issue-card-title";
  title.textContent = issue.title;

  const priority = document.createElement("span");
  priority.className = "priority-label";
  priority.dataset.priority = issue.priority;
  priority.textContent = PRIORITY_LABELS[issue.priority];

  header.append(title, priority);
  item.append(header);

  if (issue.details) {
    const details = document.createElement("p");
    details.className = "issue-card-details";
    details.textContent = issue.details;
    item.append(details);
  }

  const footer = document.createElement("div");
  footer.className = "issue-card-footer";

  const status = document.createElement("span");
  status.className = "visually-hidden";
  status.textContent = `Status: ${STATUS_LABELS[issue.status]}`;

  const actions = document.createElement("div");
  actions.className = "issue-card-actions";
  for (const move of STATUS_MOVES[issue.status]) {
    actions.append(createButton(move.label, "move", issue, move.status));
  }
  actions.append(createButton("Edit", "edit", issue));

  footer.append(status, actions);
  item.append(footer);
  return item;
}

function issueActionFocusTarget(issueId) {
  return { kind: "issue-action", issueId, action: "edit" };
}

function captureFocusTarget(element) {
  if (!(element instanceof HTMLElement)) {
    return null;
  }

  if (element.dataset.issueId && element.dataset.action) {
    return {
      kind: "issue-action",
      issueId: element.dataset.issueId,
      action: element.dataset.action
    };
  }

  return { kind: "element", element };
}

function findIssueAction(target) {
  return [...elements.board.querySelectorAll("button[data-action]")].find(
    (button) =>
      button.dataset.issueId === target.issueId && button.dataset.action === target.action
  );
}

function restoreFocus(target) {
  let element = null;
  if (target?.kind === "issue-action") {
    element = findIssueAction(target);
  } else if (target?.kind === "element") {
    element = target.element;
  }

  if (!(element instanceof HTMLElement) || !element.isConnected || element.disabled) {
    element =
      hasActiveFilters() && !elements.clearFiltersButton.disabled
        ? elements.clearFiltersButton
        : elements.createButton;
  }
  element.focus();
}

function focusTargetAfterDelete(issueId) {
  const editActions = [...elements.board.querySelectorAll("button[data-action]")].filter(
    (button) => button.dataset.action === "edit"
  );
  const deletedIndex = editActions.findIndex((button) => button.dataset.issueId === issueId);
  const nearbyAction =
    deletedIndex < 0 ? null : editActions[deletedIndex + 1] ?? editActions[deletedIndex - 1];

  return (
    captureFocusTarget(nearbyAction) ??
    captureFocusTarget(
      hasActiveFilters() ? elements.clearFiltersButton : elements.createButton
    )
  );
}

function render() {
  window.clearTimeout(feedbackTimer);
  const visibleIssues = filterIssues(issues, {
    search: filters.search,
    status: filters.status,
    priority: filters.priority
  });
  const groups = groupIssues(visibleIssues);

  for (const status of Object.keys(elements.lists)) {
    const list = elements.lists[status];
    list.replaceChildren(...groups[status].map(createIssueCard));
    elements.counts[status].textContent = String(groups[status].length);
    elements.counts[status].setAttribute(
      "aria-label",
      `${groups[status].length} ${STATUS_LABELS[status].toLocaleLowerCase()} issues`
    );
  }

  updateFilterSummary(visibleIssues.length);

  const isEmpty = visibleIssues.length === 0;
  elements.board.hidden = isEmpty;
  elements.emptyState.hidden = !isEmpty;

  if (isEmpty && hasActiveFilters()) {
    elements.emptyStateTitle.textContent = "No matching issues";
    elements.emptyStateMessage.textContent = "Adjust or clear the active filters.";
    elements.emptyStateAction.textContent = "Clear filters";
  } else if (isEmpty) {
    elements.emptyStateTitle.textContent = "No issues yet";
    elements.emptyStateMessage.textContent = "Create an issue to begin triage.";
    elements.emptyStateAction.textContent = "New issue";
  }
}

function applyValidCollection(nextIssues, successMessage) {
  serializeIssueCollection(nextIssues);
  issues = nextIssues;
  const saved = saveIssues(storage, issues);
  render();

  if (saved) {
    announce(successMessage);
  } else {
    announce(`${successMessage} Changes are available in this tab but could not be saved.`, {
      visible: true
    });
  }
}

function clearFormError() {
  elements.formError.hidden = true;
  elements.formError.textContent = "";
}

function showFormError(message) {
  elements.formError.textContent = message;
  elements.formError.hidden = false;
  elements.formError.focus();
  announce(message);
}

function openDialog() {
  returnFocusTarget = captureFocusTarget(document.activeElement);
  elements.dialog.showModal();
  window.requestAnimationFrame(() => elements.issueTitle.focus());
}

function openCreateDialog() {
  elements.form.reset();
  clearFormError();
  elements.issueId.value = "";
  elements.dialogTitle.textContent = "New issue";
  elements.deleteButton.hidden = true;
  openDialog();
}

function openEditDialog(issueId) {
  const issue = issues.find((candidate) => candidate.id === issueId);
  if (!issue) {
    announce("That issue is no longer available.", { visible: true });
    return;
  }

  elements.form.reset();
  clearFormError();
  elements.issueId.value = issue.id;
  elements.issueTitle.value = issue.title;
  elements.issueDetails.value = issue.details;
  elements.issuePriority.value = issue.priority;
  elements.issueStatus.value = issue.status;
  elements.dialogTitle.textContent = "Edit issue";
  elements.deleteButton.hidden = false;
  openDialog();
}

function closeDialog() {
  if (elements.dialog.open) {
    elements.dialog.close();
  }
}

function clearFilters() {
  filters = { search: "", status: "", priority: "" };
  elements.searchInput.value = "";
  elements.statusFilter.value = "";
  elements.priorityFilter.value = "";
  render();
  announce("Filters cleared.");
}

function handleFormSubmit(event) {
  event.preventDefault();
  clearFormError();

  if (!elements.form.reportValidity()) {
    announce("Correct the highlighted fields before saving.");
    return;
  }

  const input = {
    title: elements.issueTitle.value,
    details: elements.issueDetails.value,
    priority: elements.issuePriority.value,
    status: elements.issueStatus.value
  };

  try {
    const issueId = elements.issueId.value;
    let nextFocusTarget;
    if (issueId) {
      const current = issues.find((issue) => issue.id === issueId);
      if (!current) {
        throw new Error("This issue is no longer available.");
      }
      const updated = updateIssue(current, input);
      const nextIssues = issues.map((issue) => (issue.id === issueId ? updated : issue));
      applyValidCollection(nextIssues, `Updated "${updated.title}".`);
      nextFocusTarget = issueActionFocusTarget(updated.id);
    } else {
      const created = createIssue(input);
      applyValidCollection([...issues, created], `Created "${created.title}".`);
      nextFocusTarget = issueActionFocusTarget(created.id);
    }
    returnFocusTarget = nextFocusTarget;
    closeDialog();
  } catch (error) {
    showFormError(errorMessage(error, "The issue could not be saved."));
  }
}

function handleDelete() {
  const issueId = elements.issueId.value;
  const issue = issues.find((candidate) => candidate.id === issueId);
  if (!issue) {
    showFormError("This issue is no longer available.");
    return;
  }

  if (!window.confirm(`Delete "${issue.title}"? This action cannot be undone.`)) {
    announce("Delete cancelled.");
    return;
  }

  try {
    const nextFocusTarget = focusTargetAfterDelete(issue.id);
    applyValidCollection(
      issues.filter((candidate) => candidate.id !== issue.id),
      `Deleted "${issue.title}".`
    );
    returnFocusTarget = nextFocusTarget;
    closeDialog();
  } catch (error) {
    showFormError(errorMessage(error, "The issue could not be deleted."));
  }
}

function handleBoardClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button || !elements.board.contains(button)) {
    return;
  }

  const issue = issues.find((candidate) => candidate.id === button.dataset.issueId);
  if (!issue) {
    announce("That issue is no longer available.", { visible: true });
    return;
  }

  if (button.dataset.action === "edit") {
    openEditDialog(issue.id);
    return;
  }

  if (button.dataset.action === "move") {
    try {
      const moved = updateIssue(issue, { status: button.dataset.targetStatus });
      const nextIssues = issues.map((candidate) =>
        candidate.id === issue.id ? moved : candidate
      );
      applyValidCollection(
        nextIssues,
        `Moved "${moved.title}" to ${STATUS_LABELS[moved.status].toLocaleLowerCase()}.`
      );
      restoreFocus(issueActionFocusTarget(moved.id));
    } catch (error) {
      announce(errorMessage(error, "The issue could not be moved."), { visible: true });
    }
  }
}

async function handleImport() {
  const [file] = elements.importInput.files;
  if (!file) {
    return;
  }

  try {
    const imported = parseIssueCollection(await file.text());
    applyValidCollection(
      imported,
      `Imported ${imported.length} ${imported.length === 1 ? "issue" : "issues"}.`
    );
  } catch (error) {
    announce(`Import failed: ${errorMessage(error, "the file is not supported.")}`, {
      visible: true
    });
  } finally {
    elements.importInput.value = "";
  }
}

function handleExport() {
  let objectUrl = "";
  try {
    const serialized = `${serializeIssueCollection(issues)}\n`;
    const blob = new Blob([serialized], { type: "application/json" });
    objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `triage-board-${new Date().toISOString().slice(0, 10)}.json`;
    link.hidden = true;
    document.body.append(link);
    link.click();
    link.remove();

    announce(`Exported ${issues.length} ${issues.length === 1 ? "issue" : "issues"}.`);
  } catch (error) {
    announce(`Export failed: ${errorMessage(error, "the file could not be created.")}`, {
      visible: true
    });
  } finally {
    if (objectUrl) {
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    }
  }
}

function initializeIssues() {
  if (!storage) {
    issues = createSeedIssues();
    return "Browser storage is unavailable. Changes will remain only in this tab.";
  }

  let stored;
  try {
    stored = storage.getItem(STORAGE_KEY);
  } catch {
    storage = null;
    issues = createSeedIssues();
    return "Browser storage could not be read. Changes will remain only in this tab.";
  }

  if (stored === null || stored === "") {
    issues = createSeedIssues();
    if (!saveIssues(storage, issues)) {
      return "The starter issues loaded, but browser storage could not save them.";
    }
    return "";
  }

  try {
    parseIssueCollection(stored);
    issues = loadIssues(storage);
    return "";
  } catch {
    issues = [];
    return "Saved issue data was invalid and was not loaded or overwritten.";
  }
}

elements.searchInput.maxLength = 1000;
elements.createButton.addEventListener("click", openCreateDialog);
elements.emptyStateAction.addEventListener("click", () => {
  if (hasActiveFilters()) {
    clearFilters();
  } else {
    openCreateDialog();
  }
});
elements.clearFiltersButton.addEventListener("click", clearFilters);
elements.searchInput.addEventListener("input", () => {
  filters.search = elements.searchInput.value;
  render();
});
elements.statusFilter.addEventListener("change", () => {
  filters.status = elements.statusFilter.value;
  render();
});
elements.priorityFilter.addEventListener("change", () => {
  filters.priority = elements.priorityFilter.value;
  render();
});
elements.board.addEventListener("click", handleBoardClick);
elements.form.addEventListener("submit", handleFormSubmit);
elements.deleteButton.addEventListener("click", handleDelete);
elements.cancelButton.addEventListener("click", closeDialog);
elements.closeButton.addEventListener("click", closeDialog);
elements.dialog.addEventListener("click", (event) => {
  if (event.target === elements.dialog) {
    closeDialog();
  }
});
elements.dialog.addEventListener("close", () => {
  clearFormError();
  restoreFocus(returnFocusTarget);
  returnFocusTarget = null;
});
elements.importInput.addEventListener("change", handleImport);
elements.exportButton.addEventListener("click", handleExport);

const startupMessage = initializeIssues();
render();
if (startupMessage) {
  announce(startupMessage, { visible: true });
}
