"use client";

import { Form } from "database/schema";
import { Cog, Home, Mails } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { cn } from "utils/cn";

type Props = {
  form: Form;
};

/**
 * Sidebar for the Dashboard. Displays links for various pages within the form
 * dashboard including the published form link, form editor and submissions.
 */
export const DashboardSidebar = ({ form }: Props) => {
  const pathname = usePathname();

  const isOverview = pathname === `/dashboard/${form.id}`;
  const isSubmissions = pathname.includes("submissions");
  const isSettings = pathname.includes("settings");

  return (
    <nav className="z-10 flex h-full w-[280px] max-w-[280px] flex-grow flex-col gap-2 overflow-y-auto border-r border-muted border-r-zinc-300 bg-zinc-50 py-4 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex flex-col gap-4">
        <NavbarLink href={`/dashboard/${form?.id}`} isActive={isOverview}>
          <Home className="h-4 w-4" /> Overview
        </NavbarLink>
        <NavbarLink
          href={`/dashboard/${form?.id}/submissions`}
          isActive={isSubmissions}
        >
          <Mails className="h-4 w-4" /> Submissions
        </NavbarLink>
        <NavbarLink
          href={`/dashboard/${form?.id}/settings`}
          isActive={isSettings}
        >
          <Cog className="h-4 w-4" /> Settings
        </NavbarLink>
      </div>
    </nav>
  );
};

const NavbarLink = ({
  isActive,
  children,
  ...props
}: ComponentProps<typeof Link> & { isActive?: boolean }) => {
  return (
    <Link
      className={cn(
        "mx-2 flex items-center gap-2 rounded-sm p-2 text-sm font-semibold transition hover:bg-zincHover hover:dark:bg-zinc-800",
        isActive && "bg-zincHover dark:bg-zinc-800"
      )}
      {...props}
      prefetch={false}
    >
      {children}
    </Link>
  );
};
