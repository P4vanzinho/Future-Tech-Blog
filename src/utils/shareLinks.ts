import type { ShareLinks } from "@/types/share";

export function createShareLinks(
  url: string,
  title: string,
  description = ""
): ShareLinks {
  const text = [title, description].filter(Boolean).join(" — ");
  const x = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  return {
    x,
    twitter: x,
    linkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };
}
