import { getFormById } from "features/editor/actions/getFormById";
import { fetchSubmissions } from "features/submissions/actions/fetchSubmissions";
import { SubmissionsTable } from "features/submissions/components/SubmissionsTable";
import { Metadata } from "next";

type Props = {
  params: {
    formId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await getFormById(params.formId);

  return {
    title: `${form?.name} | Submissions`
  };
}

const SubmissionsPage = async ({ params }: Props) => {
  const form = await getFormById(params.formId);
  const formSubmissions = await fetchSubmissions(params.formId, 10);

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col">
      <SubmissionsTable form={form} formSubmissions={formSubmissions} />
    </div>
  );
};

export default SubmissionsPage;
