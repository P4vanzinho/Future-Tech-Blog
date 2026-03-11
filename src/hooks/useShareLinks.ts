import { useMemo } from "react";
import { isBrowser } from "@/utils/browser";

interface ShareLinks {
  twitter: string;
  linkedIn: string;
}

interface UseShareLinksReturn {
  links: ShareLinks;
  canNativeShare: boolean;
  nativeShare: () => Promise<boolean>;
}

export function useShareLinks(url: string, title: string): UseShareLinksReturn {
  const links = useMemo(() => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    return {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    };
  }, [url, title]);

  const canNativeShare = isBrowser() && "share" in navigator;

  const nativeShare = async (): Promise<boolean> => {
    if (!canNativeShare) return false;

    try {
      await navigator.share({ title, url });
      return true;
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Native share failed:", err);
      }
      return false;
    }
  };

  return { links, canNativeShare, nativeShare };
}
