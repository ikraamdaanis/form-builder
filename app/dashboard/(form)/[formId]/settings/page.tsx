import { getFormById } from "features/editor/actions/getFormById";
import { FormSettings } from "features/forms/components/FormSettings";
import { Metadata } from "next";

type Props = {
  params: {
    formId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await getFormById(params.formId);

  return {
    title: `${form?.name} | Settings`
  };
}

export default async function SettingsPage({ params }: Props) {
  const form = await getFormById(params.formId);

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col pt-[50px]">
      <FormSettings form={form} />
    </div>
  );
}
