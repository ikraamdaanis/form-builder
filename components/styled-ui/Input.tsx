import { Input as ShadcnInput } from "components/ui/input";
import * as React from "react";
import { cn } from "utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

/** Styled `shadcn/ui` Input. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <ShadcnInput
        type={type}
        className={cn(
          "ml-auto h-[unset] w-full rounded-sm border border-zinc-300 px-2 py-2 text-xs focus-visible:ring-1 focus-visible:ring-blue-400 focus-visible:ring-offset-0 dark:border-zinc-700 dark:bg-zinc-800 dark:focus-visible:ring-blue-500",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
