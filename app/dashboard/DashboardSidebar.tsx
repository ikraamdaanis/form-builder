import { HomeSidebarLinks } from "app/dashboard/HomeSidebarLinks";
import { SidebarMenu } from "app/dashboard/SidebarMenu";
import { Separator } from "components/ui/separator";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

/**
 * Sidebar for the Dashboard. Displays links for various pages within the form
 * dashboard including the published form link, form editor and submissions.
 */
export const DashboardSidebar = ({ children }: Props) => {
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
        <HomeSidebarLinks />
        {children}
      </div>
      <div className="mt-auto p-2">
        <Separator className="mb-2" />
        <SidebarMenu />
      </div>
    </nav>
  );
};
