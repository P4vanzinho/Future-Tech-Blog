export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getOrigin(): string {
  return isBrowser() ? window.location.origin : "";
}
