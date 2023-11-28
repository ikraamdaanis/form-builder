import { DashboardSidebar } from "features/dashboard/components/DashboardSidebar";
import { FormDashboard } from "features/dashboard/components/FormDashboard";
import { getFormById } from "features/editor/actions/getFormById";
import { getRecentFormSubmissions } from "features/editor/actions/getFormSubmissions";
import { Metadata } from "next";

type Props = {
  params: {
    formId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await getFormById(params.formId);

  return {
    title: `${form?.name} | Editor`
  };
}

const FormPage = async ({ params }: Props) => {
  const form = await getFormById(params.formId);
  const formSubmissions = await getRecentFormSubmissions(params.formId);

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <div className="flex h-full w-full bg-zinc-50 dark:bg-zinc-900">
      <DashboardSidebar form={form} />
      <FormDashboard form={form} formSubmissions={formSubmissions} />
    </div>
  );
};

export default FormPage;
