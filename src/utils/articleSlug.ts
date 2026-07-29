const ARTICLE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function normalizeArticleSlug(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidArticleSlug(value: string): boolean {
  return ARTICLE_SLUG_PATTERN.test(value);
}
