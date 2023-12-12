import { fetchForm } from "features/forms/actions/fetchForm";
import { FormSettings } from "features/forms/components/FormSettings";
import { Metadata } from "next";

type Props = {
  params: {
    formId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await fetchForm(params.formId);

  return {
    title: `${form?.name} | Settings`
  };
}

export default async function SettingsPage({ params }: Props) {
  const form = await fetchForm(params.formId);

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <div className="mx-auto flex min-h-full w-full flex-col">
      <FormSettings form={form} />
    </div>
  );
}
