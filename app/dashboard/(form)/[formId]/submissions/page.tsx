import { fetchForm } from "features/forms/actions/fetchForm";
import { fetchSubmissions } from "features/submissions/actions/fetchSubmissions";
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
    title: `${form?.name ? `${form.name} | ` : ""}Submissions`
  };
}

const SubmissionsCount = async ({ formId }: { formId: string }) => {
  const formSubmissions = await fetchSubmissions(formId);

  return (
    <span className="ml-2 inline-block text-right text-brandColour">
      {formSubmissions.length}
    </span>
  );
};

const SubmissionsPage = async ({ params }: Props) => {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-screen-2xl flex-col p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Submissions</h2>
        <p className="flex items-center rounded-sm bg-zinc-200 p-2 py-1 text-sm font-semibold dark:bg-zinc-800">
          Total Submissions:
          <Suspense
            fallback={
              <span className="ml-2 inline-block h-4 w-4 animate-pulse rounded-sm bg-zinc-400 dark:bg-zinc-500"></span>
            }
          >
            <SubmissionsCount formId={params.formId} />
          </Suspense>
        </p>
      </div>
      <Suspense fallback={<SubmissionsTableLoader />}>
        <SubmissionsTable formId={params.formId} />
      </Suspense>
    </div>
  );
};

export default SubmissionsPage;
