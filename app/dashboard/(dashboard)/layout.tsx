import { DashboardSidebar } from "app/dashboard/DashboardSidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="h-full w-full">
      <DashboardSidebar />
      <div className="flex h-full w-full p-4 pl-[280px]">
        <div className="border-borderLight dark:border-borderDark dark:bg-backgroundDark2 bg-backgroundLight2 h-full w-full rounded-md border">
          {children}
        </div>
      </div>
    </div>
  );
}
