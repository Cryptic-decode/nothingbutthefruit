export function getFormSubmissionError(fallback: string): string {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return 'You appear to be offline. Reconnect and try again.';
  }

  return fallback;
}
