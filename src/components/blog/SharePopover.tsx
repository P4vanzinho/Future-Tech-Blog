"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DirectIcon } from "@/components/common/icons/DirectIcon";
import { TwitterIcon } from "@/components/common/icons/TwitterIcon";
import { LinkedInIcon } from "@/components/common/icons/LinkedInIcon";
import { CopyLinkIcon } from "@/components/common/icons/CopyLinkIcon";
import { useClipboard } from "@/hooks/useClipboard";
import type { SharePopoverProps } from "@/types/share";
import type { ShareProvider } from "@/types/articleEngagement";
import { createShareLinks } from "@/utils/shareLinks";
import { getArticleUrl } from "@/utils/articles";
import { useArticleEngagement } from "@/hooks/useArticleEngagement";
import { formatNumber } from "@/utils/formatter";

export function SharePopover({ article }: SharePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { copyToClipboard, error: copyError, buttonText } = useClipboard();
  const { state, recordShare } = useArticleEngagement(article);

  const getAbsoluteArticleUrl = () =>
    getArticleUrl(article.slug, window.location.origin);

  const persistShare = async (provider: ShareProvider) => {
    try {
      await recordShare({ articleId: article.id, provider });
    } catch {
      toast.error("Nao foi possivel contabilizar o compartilhamento.");
    }
  };

  const handleExternalShare = (provider: "x" | "linkedin") => {
    const url = getAbsoluteArticleUrl();
    const links = createShareLinks(url, article.title, article.description);
    const target = provider === "x" ? links.x : links.linkedIn;
    const popup = window.open(target, "_blank");
    if (!popup) {
      toast.error("O navegador bloqueou a janela de compartilhamento.");
      return;
    }
    popup.opener = null;
    void persistShare(provider);
  };

  const handleNativeShare = async () => {
    if (!navigator.share) {
      toast.error("Compartilhamento nativo indisponivel neste navegador.");
      return;
    }

    try {
      await navigator.share({
        title: article.title,
        text: article.description,
        url: getAbsoluteArticleUrl(),
      });
      await persistShare("native");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error("Nao foi possivel compartilhar o artigo.");
    }
  };

  const handleCopyLink = async () => {
    const copied = await copyToClipboard(getAbsoluteArticleUrl());
    if (copied) await persistShare("copy");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="border-dark-15 bg-dark-10 flex cursor-pointer items-center gap-1 rounded-full border px-[0.875rem] py-[0.375rem] transition-opacity hover:opacity-80 2xl:px-[1rem] 2xl:py-[0.5rem]"
          aria-label="Share this article"
        >
          <DirectIcon className="text-grey-60 h-5 w-5 2xl:h-6 2xl:w-6" />
          <span className="text-grey-60 font-display text-[0.875rem] leading-[150%] xl:text-[1.125rem]">
            {formatNumber(state.shares)}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-52" align="start" aria-label="Share options">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => handleExternalShare("x")}
            className="text-grey-60 hover:bg-dark-15 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:text-white"
            aria-label="Share on X"
          >
            <TwitterIcon className="h-4 w-4" />
            <span>X</span>
          </button>
          <button
            type="button"
            onClick={() => handleExternalShare("linkedin")}
            className="text-grey-60 hover:bg-dark-15 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:text-white"
            aria-label="Share on LinkedIn"
          >
            <LinkedInIcon className="h-4 w-4" />
            <span>LinkedIn</span>
          </button>
          <button
            type="button"
            onClick={handleNativeShare}
            className="text-grey-60 hover:bg-dark-15 flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:text-white"
            aria-label="Share with another app"
          >
            <DirectIcon className="h-4 w-4" />
            <span>Share with app</span>
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:text-white ${
              copyError
                ? "text-red-400 hover:bg-red-900/20"
                : "text-grey-60 hover:bg-dark-15"
            }`}
            aria-label="Copy link to clipboard"
          >
            <CopyLinkIcon className="h-4 w-4" />
            <span aria-live="polite">{buttonText}</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
