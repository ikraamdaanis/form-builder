import * as LabelPrimitive from "@radix-ui/react-label";
import { FormLabel as ShadcnFormLabel } from "components/ui/form";
import * as React from "react";
import { cn } from "utils/cn";

/** Styled `shadcn/ui` FormLabel. */
export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <ShadcnFormLabel
      ref={ref}
      className={cn(
        "w-20 min-w-[80px] cursor-pointer text-xs font-semibold opacity-80",
        className
      )}
      {...props}
    />
  );
});

FormLabel.displayName = "FormLabel";
