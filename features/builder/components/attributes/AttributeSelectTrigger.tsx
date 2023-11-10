import * as SelectPrimitive from "@radix-ui/react-select";
import { SelectTrigger } from "components/ui/select";
import * as React from "react";
import { cn } from "utils/cn";

/**
 * Select item for the attributes panel.
 */
export const AttributeSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectTrigger
    ref={ref}
    className={cn(
      "ml-auto w-[200px] rounded-sm px-2 py-1 text-sm focus:ring-1 focus:ring-blue-300 focus:ring-offset-0 dark:bg-zinc-800 dark:focus:ring-blue-400",
      className
    )}
    {...props}
  >
    {children}
  </SelectTrigger>
));

AttributeSelectTrigger.displayName = "AttributeSelectTrigger";
