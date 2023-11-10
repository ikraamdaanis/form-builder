import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";
import { cn } from "utils/cn";
import { FormLabel } from "components/ui/form";

/**
 * Label for an attribute field in the attributes panel.
 */
export const AttributeLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <FormLabel
      ref={ref}
      className={cn(
        "w-20 min-w-[80px] cursor-pointer text-xs font-semibold opacity-80",
        className
      )}
      {...props}
    />
  );
});

AttributeLabel.displayName = "AttributeLabel";
