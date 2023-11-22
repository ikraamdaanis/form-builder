"use client";

import { useAuth } from "@clerk/nextjs";
import { Show } from "components/Show";
import { ThemeToggler } from "components/ThemeToggler";
import { Button } from "components/ui/button";
import { ProfileButton } from "features/auth/components/ProfileButton";
import Link from "next/link";

/** Header for the application */
export const Header = () => {
  const user = useAuth();

  return (
    <header className="fixed top-0 h-16 w-full border-b border-b-zinc-300 bg-primary bg-white dark:border-b-zinc-700 dark:bg-zinc-900">
      <nav className="mx-auto flex h-full w-full items-center justify-between px-4">
        <Link href="/">
          <h1 className="text-lg font-semibold text-black dark:text-white">
            Form Builder
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggler />
          <ProfileButton />
          <Show when={user.isLoaded && !user.isSignedIn}>
            <Link href="/login">
              <Button className="h-8 bg-zinc-700 text-xs font-semibold text-white transition hover:bg-zinc-700 hover:brightness-110">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-brandColour hover:bg-brandColour h-8 text-xs font-semibold text-white transition hover:brightness-110">
                Sign Up
              </Button>
            </Link>
          </Show>
        </div>
      </nav>
    </header>
  );
};
