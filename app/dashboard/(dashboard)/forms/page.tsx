import { getForms } from "features/forms/actions/getForms";
import { CreateFormButton } from "features/forms/components/CreateFormButton";
import { FormCard, FormCardLoader } from "features/forms/components/FormCard";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Forms | Ignition"
};

export const dynamic = "force-dynamic";

export default async function FormsPage() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-screen-2xl flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Your Forms</h2>
        <CreateFormButton />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={
            <>
              {new Array(5).fill(crypto.randomUUID()).map(form => {
                return <FormCardLoader key={form.id} />;
              })}
            </>
          }
        >
          <Forms />
        </Suspense>
      </div>
    </div>
  );
}

const Forms = async () => {
  const forms = await getForms();

  return (
    <>
      {forms.map(form => {
        return <FormCard key={form.id} form={form} />;
      })}
    </>
  );
};
