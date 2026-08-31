"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CodeBlockProps = {
  children: string;
  copyValue?: string;
};

export function CodeBlock({ children, copyValue }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const textToCopy = copyValue ?? children;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      console.error("Failed to copy");
    }
  }

  return (
    <div className="relative overflow-hidden rounded-lg border bg-muted/30 font-mono text-sm">
      <pre className="overflow-x-auto p-4 pr-14 leading-6">
        <code>{children}</code>
      </pre>

      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Copy code"
        title="Copy code"
      >
        {copied ? (
          <Check className="size-4 text-emerald-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
    </div>
  );
}
