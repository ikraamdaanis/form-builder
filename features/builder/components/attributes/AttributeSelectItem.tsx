import * as SelectPrimitive from "@radix-ui/react-select";
import { SelectItem } from "components/ui/select";
import * as React from "react";
import { cn } from "utils/cn";

/**
 * Select item for the attributes panel.
 */
export const AttributeSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectItem
    ref={ref}
    className={cn(
      "selector cursor-pointer text-xs hover:dark:bg-zinc-900 aria-[selected=false]:dark:bg-transparent data-[highlighted]:dark:bg-zinc-900",
      className
    )}
    {...props}
  >
    {children}
  </SelectItem>
));

AttributeSelectItem.displayName = "AttributeSelectItem";
