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
      <div className="flex h-full w-full p-4 pl-[280px]">
        <div className="border-borderLight dark:border-borderDark dark:bg-backgroundDark2 bg-backgroundLight2 h-full w-full rounded-md border">
          {children}
        </div>
      </div>
    </div>
  );
}
