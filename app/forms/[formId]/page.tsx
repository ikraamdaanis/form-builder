import { getPublicFormById } from "features/builder/actions/getFormById";
import { FormPublic } from "features/forms/components/FormPublic";
import { Metadata } from "next";

type Props = {
  params: {
    formId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await getPublicFormById(params.formId);

  return {
    title: form?.name
  };
}

const FormPage = async ({ params }: Props) => {
  const form = await getPublicFormById(params.formId);

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-start overflow-y-auto bg-white">
      <FormPublic form={form} />
    </div>
  );
};

export default FormPage;
