import * as React from "react";
import { cn } from "utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Input for an attribute field in the attributes panel.
 */
export const AttributeInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ml-auto w-full rounded-sm px-2 py-2 text-xs focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0 dark:bg-zinc-800 dark:focus-visible:ring-blue-400",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
AttributeInput.displayName = "AttributeInput";
