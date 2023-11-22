/** Profile button for the user settings. */
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "components/ui/button";
import { RefAttributes } from "react";
import { cn } from "utils/cn";

export const ProfileButton = (props: RefAttributes<HTMLButtonElement>) => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <Button
      className={cn(
        "h-8 w-8 overflow-hidden rounded-lg border border-zinc-300 bg-zinc-400 p-0 transition hover:brightness-90 dark:border-zinc-700 dark:bg-zinc-700",
        !isSignedIn && "animate-pulse",
        isLoaded && !isSignedIn && "hidden"
      )}
      {...props}
    >
      <UserButton afterSignOutUrl="/" />
    </Button>
  );
};
