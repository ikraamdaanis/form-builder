import { DashboardNavbar } from "app/dashboard/DashboardNavbar";
import { DashboardSidebar } from "app/dashboard/DashboardSidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: {
    formId: string;
  };
};

export default function DashboardLayout({ children, params }: Props) {
  console.log("hi", params.formId);
  return (
    <div className="h-full w-full bg-zinc-50 dark:bg-zinc-900">
      <DashboardNavbar />
      <DashboardSidebar />
      <div className="flex h-full w-full pl-[280px]">{children}</div>
    </div>
  );
}
