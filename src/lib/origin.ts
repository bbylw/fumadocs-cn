interface OriginStatic {
  from(value: unknown): {
    isSameOrigin(other: unknown): boolean;
  };
}

/**
 * Verifies that a `MessageEvent` comes cleanly from the same origin, using the modern `Origin` API
 * when supported and safely rejecting opaque `"null"` origins on older engines.
 */
export function isSameOriginEvent(event: MessageEvent): boolean {
  const { Origin } = globalThis as typeof globalThis & { Origin?: OriginStatic };
  if (Origin) {
    try {
      return Origin.from(event).isSameOrigin(Origin.from(globalThis));
    } catch {
      return false;
    }
  }
  return (
    typeof event.origin === 'string' &&
    event.origin !== 'null' &&
    globalThis.location.origin !== 'null' &&
    event.origin === globalThis.location.origin
  );
}
