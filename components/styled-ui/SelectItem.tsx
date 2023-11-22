import * as SelectPrimitive from "@radix-ui/react-select";
import { SelectItem as ShadcnSelectItem } from "components/ui/select";
import * as React from "react";
import { cn } from "utils/cn";

/** Styled `shadcn/ui` SelectTrigger. */
export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <ShadcnSelectItem
    ref={ref}
    className={cn(
      "selector cursor-pointer text-xs hover:dark:bg-zinc-900 aria-[selected=false]:dark:bg-transparent data-[highlighted]:dark:bg-zinc-900",
      className
    )}
    {...props}
  >
    {children}
  </ShadcnSelectItem>
));

SelectItem.displayName = "SelectItem";
