import * as SelectPrimitive from "@radix-ui/react-select";
import { SelectTrigger as ShadcnSelectTrigger } from "components/ui/select";
import * as React from "react";
import { cn } from "utils/cn";

/** Styled `shadcn/ui` SelectTrigger. */
export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <ShadcnSelectTrigger
    ref={ref}
    className={cn(
      "bg-red ml-auto h-[unset] w-[200px] rounded-sm border border-zinc-300 bg-white px-2 py-2 text-xs focus:ring-1 focus:ring-blue-300 focus:ring-offset-0 dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-blue-500",
      className
    )}
    {...props}
  >
    {children}
  </ShadcnSelectTrigger>
));

SelectTrigger.displayName = "SelectTrigger";
