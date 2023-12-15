import { DashboardSidebar } from "app/dashboard/DashboardSidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="h-full w-full">
      <DashboardSidebar />
      <div className="flex h-full w-full bg-backgroundLight2 pl-[280px] dark:bg-backgroundDark2">
        {children}
      </div>
    </div>
  );
}
