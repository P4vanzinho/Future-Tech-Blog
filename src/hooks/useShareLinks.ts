import { useMemo } from "react";

interface ShareLinks {
  twitter: string;
  linkedIn: string;
}

export function useShareLinks(url: string, title: string): ShareLinks {
  return useMemo(() => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };
  }, [url, title]);
}
