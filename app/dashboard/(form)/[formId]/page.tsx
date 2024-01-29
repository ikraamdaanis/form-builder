import {
  DashboardHeader,
  DashboardHeaderLoader
} from "features/dashboard/components/DashboardHeader";
import { fetchForm } from "features/forms/actions/fetchForm";
import {
  SubmissionsTable,
  SubmissionsTableLoader
} from "features/submissions/components/SubmissionsTable";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: {
    formId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await fetchForm(params.formId);

  return {
    title: `${form?.name ? `${form.name} | ` : ""}Dashboard`
  };
}

const FormPage = async ({ params }: Props) => {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-screen-2xl flex-col gap-8 p-4">
      <Suspense fallback={<DashboardHeaderLoader />}>
        <DashboardHeader formId={params.formId} />
      </Suspense>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Submissions</h2>
        </div>
        <Suspense fallback={<SubmissionsTableLoader />}>
          <SubmissionsTable formId={params.formId} />
        </Suspense>
      </div>
    </div>
  );
};

export default FormPage;
