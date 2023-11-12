import { useDndMonitor } from "@dnd-kit/core";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { TextFieldElement } from "features/builder/components/fields/TextField/TextField";
import { FormElementInstance } from "features/types";
import { useState } from "react";
import { cn } from "utils/cn";

type Props = {
  element: FormElementInstance;
};

/** Text field component displayed in the editor. */
export const TextFieldEditor = ({ element }: Props) => {
  const elementInstance = element as TextFieldElement;

  const { label, required, placeholder, helperText } =
    elementInstance.extraAttributes;

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
        isDragging && "border border-dashed border-blue-300"
      )}
    >
      <div className={cn(isDragging && "opacity-0")}>
        <Label>
          {label}
          {required && "*"}
        </Label>
        <Input
          readOnly
          placeholder={placeholder}
          className="pointer-events-none cursor-default"
        />
        {helperText && (
          <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
        )}
      </div>
    </div>
  );
};
