"use client";

import { ThemeToggler } from "components/ThemeToggler";
import { ProfileButton } from "features/auth/components/ProfileButton";
import Link from "next/link";

/** Header for the application */
export const Header = () => {
  return (
    <header className="fixed top-0 h-16 w-full border-b border-b-zinc-300 bg-primary bg-white dark:border-b-zinc-700 dark:bg-zinc-900">
      <nav className="mx-auto flex h-full w-full items-center justify-between px-4">
        <Link href="/">
          <h1 className="text-lg font-semibold text-black dark:text-white">
            Form Builder
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggler />
          <ProfileButton />
        </div>
      </nav>
    </header>
  );
};
