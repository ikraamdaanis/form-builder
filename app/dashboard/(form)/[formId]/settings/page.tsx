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
    title: `${form?.name ? `${form.name} | ` : ""}Settings`
  };
}

export default async function SettingsPage({ params }: Props) {
  const form = await fetchForm(params.formId);

  if (!form) {
    throw new Error("We cannot find the requested Form.");
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-screen-2xl flex-col p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>
      <FormSettings form={form} />
    </div>
  );
}
