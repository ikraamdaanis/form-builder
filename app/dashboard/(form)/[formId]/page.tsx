import { FormDashboard } from "features/dashboard/components/FormDashboard";
import { fetchForm } from "features/forms/actions/fetchForm";
import { fetchRecentSubmissions } from "features/submissions/actions/fetchRecentSubmissions";
import { Metadata } from "next";

type Props = {
  params: {
    formId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await fetchForm(params.formId);

  return {
    title: `${form?.name} | Dashboard`
  };
}

const FormPage = async ({ params }: Props) => {
  const form = await fetchForm(params.formId);
  const formSubmissions = await fetchRecentSubmissions(params.formId);

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-screen-2xl flex-col">
      <FormDashboard form={form} formSubmissions={formSubmissions} />
    </div>
  );
};

export default FormPage;
