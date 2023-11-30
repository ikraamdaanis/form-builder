"use client";

import { useAuth } from "@clerk/nextjs";
import { DashboardButton } from "components/DashboardButton";
import { Show } from "components/Show";
import { ThemeToggler } from "components/ThemeToggler";
import { Button } from "components/ui/button";
import { Form } from "database/schema";
import { ProfileButton } from "features/auth/components/ProfileButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  form?: Form;
};

/**
 * Header for the application, displays the logo, theme toggler, and auth
 * buttons for users to sign in, login or check their profile. Used in
 * the home page of the website and the admin dashboard.
 */
export const Header = ({ form }: Props) => {
  const { isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname();
  const isDashboard = pathname.includes("dashboard");

  return (
    <header className="fixed top-0 w-full border-b border-b-zinc-300 bg-primary bg-white py-2 dark:border-b-zinc-700 dark:bg-zinc-900">
      <nav className="mx-auto flex h-full w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <h2 className="text-lg font-semibold text-black dark:text-white">
              Ignition
            </h2>
          </Link>
          <Show when={!!form}>
            <Link href={`/dashboard/${form?.id}`}>
              <p className="text-sm font-semibold text-black dark:text-white">
                {form?.name}
              </p>
            </Link>
          </Show>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggler />
          <Show
            when={isDashboard}
            fallback={
              <Show when={!!isSignedIn}>
                <DashboardButton />
              </Show>
            }
          >
            <ProfileButton />
          </Show>
          <Show when={isLoaded && !isSignedIn}>
            <Link href="/login">
              <Button className="h-8 bg-zinc-700 text-xs font-semibold text-white transition hover:bg-zinc-700 hover:brightness-110">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="h-8 bg-brandColour text-xs font-semibold text-white transition hover:bg-brandColour hover:brightness-110">
                Sign Up
              </Button>
            </Link>
          </Show>
        </div>
      </nav>
    </header>
  );
};
