import { getFormById } from "features/editor/actions/getFormById";
import { getRecentFormSubmissions } from "features/editor/actions/getFormSubmissions";
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
  const formSubmissions = await getRecentFormSubmissions(params.formId);

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col pt-[50px]">
      {form.name}
      {formSubmissions.length}
    </div>
  );
};

export default SubmissionsPage;
