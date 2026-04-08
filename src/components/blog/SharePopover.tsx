"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DirectIcon } from "@/components/common/icons/DirectIcon";
import { TwitterIcon } from "@/components/common/icons/TwitterIcon";
import { LinkedInIcon } from "@/components/common/icons/LinkedInIcon";
import { CopyLinkIcon } from "@/components/common/icons/CopyLinkIcon";
import { useShareLinks } from "@/hooks/useShareLinks";
import { useClipboard } from "@/hooks/useClipboard";

interface SharePopoverProps {
  url: string;
  title: string;
  shareCount: number;
}

export function SharePopover({ url, title, shareCount }: SharePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const links = useShareLinks(url, title);
  const { copyToClipboard, error: copyError, buttonText } = useClipboard();

  const handleCopyLink = () => {
    copyToClipboard(url);
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
            {shareCount}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48" align="start" aria-label="Share options">
        <div className="flex flex-col gap-1">
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-grey-60 hover:bg-dark-15 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:text-white"
            aria-label="Share on Twitter"
          >
            <TwitterIcon className="h-4 w-4" />
            <span>Twitter / X</span>
          </a>
          <a
            href={links.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-grey-60 hover:bg-dark-15 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:text-white"
            aria-label="Share on LinkedIn"
          >
            <LinkedInIcon className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>
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
