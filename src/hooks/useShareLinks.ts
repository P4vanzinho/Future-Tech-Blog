import { useMemo } from "react";
import type { ShareLinks } from "@/types/share";
import { createShareLinks } from "@/utils/shareLinks";

export function useShareLinks(
  url: string,
  title: string,
  description = ""
): ShareLinks {
  return useMemo(
    () => createShareLinks(url, title, description),
    [description, title, url]
  );
}
