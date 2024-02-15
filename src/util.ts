interface MatchKeyOptions {
  shift?: boolean;
  ctrl?: boolean;
  alt?: boolean;
  meta?: boolean;
  key?: string;
  code?: string;
}

export function matchKeyEvent(
  event: KeyboardEvent,
  options: MatchKeyOptions
): boolean {
  return (
    (!options.key || event.key === options.key) &&
    (!options.code || event.code === options.code) &&
    event.shiftKey === !!options.shift &&
    event.ctrlKey === !!options.ctrl &&
    event.altKey === !!options.alt &&
    event.metaKey === !!options.meta
  );
}
