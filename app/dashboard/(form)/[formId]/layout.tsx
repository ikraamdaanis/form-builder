import { FormSidebar } from "app/dashboard/(form)/[formId]/FormSidebar";
import { FormSidebarLinksLoader } from "app/dashboard/(form)/[formId]/FormSidebarLinks";
import { DashboardSidebar } from "app/dashboard/DashboardSidebar";
import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
  params: {
    formId: string;
  };
};

export default async function DashboardLayout({ children, params }: Props) {
  return (
    <div className="h-full w-full">
      <DashboardSidebar>
        <Suspense fallback={<FormSidebarLinksLoader />}>
          <FormSidebar formId={params.formId} />
        </Suspense>
      </DashboardSidebar>
      <div className="flex h-full w-full bg-backgroundLight2 pl-[280px] dark:bg-backgroundDark2">
        {children}
      </div>
    </div>
  );
}
