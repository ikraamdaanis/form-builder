import { DashboardNavbar } from "app/dashboard/DashboardNavbar";
import { DashboardSidebar } from "app/dashboard/DashboardSidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-zinc-900">
      <DashboardNavbar />
      <DashboardSidebar />
      <div className="flex h-full w-full pl-[280px]">{children}</div>
    </div>
  );
}
