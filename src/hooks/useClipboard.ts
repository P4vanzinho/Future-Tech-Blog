import { useState, useCallback } from "react";

interface UseClipboardReturn {
  copied: boolean;
  copyToClipboard: (text: string) => Promise<boolean>;
  error: string | null;
  buttonText: string;
}

export function useClipboard(resetDelay = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        setTimeout(() => setCopied(false), resetDelay);
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to copy to clipboard";
        setError(message);
        console.error("Failed to copy:", err);
        return false;
      }
    },
    [resetDelay]
  );

  const buttonText = error ? "Failed!" : copied ? "Copied!" : "Copy Link";

  return { copied, copyToClipboard, error, buttonText };
}
