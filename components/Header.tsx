"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { ThemeToggler } from "components/ThemeToggler";
import { cn } from "utils/cn";

/** Header for the application */
export const Header = () => {
  const { isLoaded, isSignedIn } = useUser();
  return (
    <header className="fixed top-0 h-16 w-full border-b border-b-zinc-300 bg-primary bg-white dark:border-b-zinc-700 dark:bg-zinc-900">
      <nav className="mx-auto flex h-full w-full items-center justify-between px-4">
        <h1 className="text-lg font-semibold text-black dark:text-white">
          Form Builder
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggler />
          <div
            className={cn(
              "h-8 w-8 rounded-full bg-zinc-400",
              !isSignedIn && "animate-pulse",
              isLoaded && !isSignedIn && "hidden"
            )}
          >
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </header>
  );
};
