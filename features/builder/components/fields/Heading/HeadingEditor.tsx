import { useDndMonitor } from "@dnd-kit/core";
import { HeadingElement } from "features/builder/components/fields/Heading/Heading";
import { FormElementInstance } from "features/types";
import { useState } from "react";
import { cn } from "utils/cn";

type Props = {
  element: FormElementInstance;
  isOverlay?: boolean;
};

/** Heading component displayed in the editor. */
export const HeadingEditor = ({ element, isOverlay }: Props) => {
  const elementInstance = element as HeadingElement;

  const { content, size, weight, lineHeight } = elementInstance.extraAttributes;

  const [isDragging, setIsDragging] = useState(false);

  useDndMonitor({
    onDragStart: event => {
      setIsDragging(event.active.id === element.id);
    },
    onDragEnd: () => {
      setIsDragging(false);
    }
  });

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 bg-zinc-50 outline-0 ring-0 focus-visible:outline-none dark:bg-zinc-900",
        isDragging && "border border-dashed border-blue-300",
        isOverlay && "border border-blue-200 dark:border-blue-300"
      )}
    >
      <h1
        className={cn("leading-normal", isDragging && "opacity-0")}
        style={{
          fontSize: `${size || "16px"}`,
          fontWeight: `${weight || "400"}`,
          lineHeight: `${lineHeight || "1.5"}`
        }}
      >
        {content}
      </h1>
    </div>
  );
};
