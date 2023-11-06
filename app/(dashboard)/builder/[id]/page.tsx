import { getFormById } from "features/builder/actions/getFormById";
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
    <section className="h-full">
      <FormBuilder form={form} />
    </section>
  );
};

export default BuilderPage;
