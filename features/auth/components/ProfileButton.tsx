import { UserButton, useUser } from "@clerk/nextjs";
import { Button, ButtonProps } from "components/ui/button";
import React from "react";
import { cn } from "utils/cn";

/** Profile button for the user settings. */
export const ProfileButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const { isLoaded, isSignedIn } = useUser();

    return (
      <Button
        className={cn(
          "h-8 w-8 overflow-hidden rounded-lg border border-zinc-300 bg-zinc-400 p-0 transition hover:brightness-90 dark:border-zinc-700 dark:bg-zinc-700",
          !isSignedIn && "animate-pulse",
          isLoaded && !isSignedIn && "hidden",
          className
        )}
        {...props}
        ref={ref}
      >
        <UserButton afterSignOutUrl="/" />
      </Button>
    );
  }
);

Button.displayName = "ProfileButton";
