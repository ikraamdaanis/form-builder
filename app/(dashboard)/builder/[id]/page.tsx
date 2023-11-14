import { getFormById } from "features/builder/actions/getFormById";
import { EditorNavbar } from "features/builder/components/EditorNavbar";
import { EditorProperties } from "features/builder/components/EditorProperties";
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
      <div className="relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
        <FormBuilder />
        <EditorProperties />
      </div>
    </section>
  );
};

export default BuilderPage;
