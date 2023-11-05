import { getFormById } from "features/builder/actions/getFormById";

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

  return <div className="">{form?.name}</div>;
};

export default BuilderPage;
