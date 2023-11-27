import { FormDashboard } from "features/dashboard/components/FormDashboard";
import { getFormById } from "features/editor/actions/getFormById";
import { getFormSubmissions } from "features/editor/actions/getFormSubmissions";
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
  const formSubmissions = await getFormSubmissions(params.formId);

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormDashboard form={form} formSubmissions={formSubmissions} />;
};

export default FormPage;
