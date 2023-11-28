import { Header } from "components/Header";
import { DashboardSidebar } from "features/dashboard/components/DashboardSidebar";
import { getFormById } from "features/editor/actions/getFormById";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: {
    formId: string;
  };
};

export default async function DashboardLayout({ children, params }: Props) {
  const form = await getFormById(params.formId);

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <div className="h-full w-full">
      <Header form={form} />
      <div className="flex h-full w-full bg-zinc-50 dark:bg-zinc-900">
        <DashboardSidebar form={form} />
        {children}
      </div>
    </div>
  );
}
