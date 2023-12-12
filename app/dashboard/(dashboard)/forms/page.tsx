import { getForms } from "features/forms/actions/getForms";
import { CreateFormButton } from "features/forms/components/CreateFormButton";
import { FormCard } from "features/forms/components/FormCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forms | Ignition"
};

export default async function FormsPage() {
  const forms = await getForms();

  return (
    <div className="mx-auto flex min-h-full w-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Your Forms</h2>
        <CreateFormButton />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {forms.map(form => {
          return <FormCard key={form.id} form={form} />;
        })}
      </div>
    </div>
  );
}
