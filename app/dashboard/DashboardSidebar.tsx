"use client";

import { SidebarMenu } from "app/dashboard/SidebarMenu";
import { Show } from "components/Show";
import { Separator } from "components/ui/separator";
import { Form } from "database/schema";
import { Cog, GanttChartSquare, Home, Mails } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { cn } from "utils/cn";

type Props = {
  form?: Form;
};

/**
 * Sidebar for the Dashboard. Displays links for various pages within the form
 * dashboard including the published form link, form editor and submissions.
 */
export const DashboardSidebar = ({ form }: Props) => {
  const pathname = usePathname();

  const HomeSidebar = () => {
    const isHome = pathname === `/dashboard`;
    const isForms = pathname === `/dashboard/forms`;

    return (
      <>
        <NavbarLink href="/dashboard" isActive={isHome}>
          <Home className="h-4 w-4" /> Home
        </NavbarLink>
        <NavbarLink href="/dashboard/forms" isActive={isForms}>
          <Mails className="h-4 w-4" /> Forms
        </NavbarLink>
      </>
    );
  };

  const FormSidebar = () => {
    const isOverview = pathname === `/dashboard/${form?.id}`;
    const isSubmissions = pathname.includes("submissions");
    const isSettings = pathname.includes("settings");

    return (
      <>
        <Separator className="mx-auto w-[90%]" />
        <NavbarLink href={`/dashboard/${form?.id}`} isActive={isOverview}>
          <GanttChartSquare className="h-4 w-4" />
          Form Overview
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
      </>
    );
  };

  return (
    <nav className="fixed left-0 top-0 z-10 flex h-full w-[280px] max-w-[280px] flex-grow flex-col gap-2 overflow-y-auto border-r border-r-borderLight bg-backgroundLight dark:border-r-borderDark dark:bg-backgroundDark">
      <div className="flex h-[50px] items-center gap-4 px-4 py-2">
        <Link href="/dashboard">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Ignition
          </h2>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <HomeSidebar />
        <Show when={!!form}>
          <FormSidebar />
        </Show>
      </div>
      <div className="mt-auto p-2">
        <Separator className="mb-2" />
        <SidebarMenu />
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
