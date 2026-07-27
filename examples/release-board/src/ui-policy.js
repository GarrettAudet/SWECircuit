export function commitAnnouncement(successMessage, persisted) {
  if (typeof successMessage !== "string" || successMessage.trim().length === 0) {
    throw new TypeError("successMessage must be a non-empty string");
  }
  return persisted
    ? successMessage
    : `${successMessage} Progress is available for this session but could not be saved.`;
}

export function preferredScrollBehavior(prefersReducedMotion) {
  return prefersReducedMotion ? "auto" : "smooth";
}
