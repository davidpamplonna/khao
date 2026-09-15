export const SCROLL_LOCK_EVENT = "khao:scroll-lock";

export function setScrollLocked(locked: boolean) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<boolean>(SCROLL_LOCK_EVENT, { detail: locked }),
  );
}
