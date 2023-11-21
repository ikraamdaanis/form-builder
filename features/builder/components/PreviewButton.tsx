"use client";

import { Button } from "components/ui/button";
import { useBuilderLinks } from "features/builder/hooks/useBuilderLinks";
import { ScanEye } from "lucide-react";
import Link from "next/link";
import { cn } from "utils/cn";

/** Button to show the preview of a form. */
export const PreviewButton = () => {
  const { isPreview, formLink, previewLink } = useBuilderLinks();

  return (
    <Link href={isPreview ? formLink : previewLink}>
      <Button
        variant="outline"
        className={cn(
          "h-8 gap-2 px-2 text-xs font-semibold transition hover:brightness-90 dark:border-0 dark:bg-zinc-700",
          isPreview &&
            "outline outline-2 outline-blue-400 dark:outline-2 dark:outline-blue-400"
        )}
      >
        <ScanEye className="h-4 w-4" />
        Preview
      </Button>
    </Link>
  );
};
