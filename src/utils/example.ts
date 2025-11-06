export function add(a: number, b: number): number {
  return a + b;
}

export function formatTitle(text: string): string {
  return text.trim().toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

