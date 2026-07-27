export function persistenceAnnouncement(successMessage, persisted) {
  return persisted
    ? successMessage
    : `${successMessage} The change is available for this session but could not be saved locally.`;
}

export function validationAnnouncement(action, errors) {
  const count = Array.isArray(errors) ? errors.length : 0;
  const suffix = count === 1 ? "1 issue needs attention." : `${count} issues need attention.`;
  return `${action} failed validation. ${suffix}`;
}

export function recoveryFocusId(components, removedIndex) {
  if (!Array.isArray(components) || components.length === 0) {
    return null;
  }
  const index = Math.min(Math.max(removedIndex, 0), components.length - 1);
  return components[index].id;
}
