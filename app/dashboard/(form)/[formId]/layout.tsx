import { DashboardSidebar } from "app/dashboard/DashboardSidebar";
import { fetchForm } from "features/forms/actions/fetchForm";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: {
    formId: string;
  };
};

export default async function DashboardLayout({ children, params }: Props) {
  const form = await fetchForm(params.formId);

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <div className="h-full w-full">
      <DashboardSidebar form={form} />
      <div className="flex h-full w-full bg-backgroundLight2 pl-[280px] dark:bg-backgroundDark2">
        {children}
      </div>
    </div>
  );
}
