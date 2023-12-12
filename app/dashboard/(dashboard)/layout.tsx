import { DashboardNavbar } from "app/dashboard/DashboardNavbar";
import { DashboardSidebar } from "app/dashboard/DashboardSidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="h-full w-full">
      <DashboardNavbar />
      <DashboardSidebar />
      <div className="flex h-full w-full pl-[280px] pt-[50px]">{children}</div>
    </div>
  );
}
