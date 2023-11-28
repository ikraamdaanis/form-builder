import { FormDashboard } from "features/dashboard/components/FormDashboard";
import { getFormById } from "features/editor/actions/getFormById";
import { fetchRecentSubmissions } from "features/submissions/actions/fetchRecentSubmissions";
import { Metadata } from "next";

type Props = {
  params: {
    formId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await getFormById(params.formId);

  return {
    title: `${form?.name} | Dashboard`
  };
}

const FormPage = async ({ params }: Props) => {
  const form = await getFormById(params.formId);
  const formSubmissions = await fetchRecentSubmissions(params.formId);

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormDashboard form={form} formSubmissions={formSubmissions} />;
};

export default FormPage;
