import { getFormById } from "features/builder/actions/getFormById";
import { EditorNavbar } from "features/builder/components/EditorNavbar";
import { FormBuilder } from "features/builder/components/FormBuilder";

type Props = {
  params: {
    id: string;
  };
};

const BuilderPage = async ({ params }: Props) => {
  const form = await getFormById(params.id);

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <section className="flex h-full w-full flex-col">
      <EditorNavbar form={form} />
      <FormBuilder />
    </section>
  );
};

export default BuilderPage;
