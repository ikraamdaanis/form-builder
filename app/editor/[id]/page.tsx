import { Show } from "components/Show";
import { getFormById } from "features/editor/actions/getFormById";
import { FormEditor } from "features/editor/components";
import { EditorNavbar } from "features/editor/components/EditorNavbar";
import { EditorProperties } from "features/editor/components/EditorProperties";
import { FormPreview } from "features/forms/components/FormPreview";
import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    preview: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await getFormById(params.id);

  return {
    title: `${form?.name} | Editor`
  };
}

const EditorPage = async ({ params, searchParams }: Props) => {
  const form = await getFormById(params.id);
  const isPreview = searchParams.preview === "true";

  if (!form) {
    throw new Error("Form not found");
  }

  return (
    <section className="flex h-full w-full flex-col">
      <EditorNavbar form={form} />
      <div className="relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-zinc-200 dark:bg-zinc-800">
        <Show when={!isPreview} fallback={<FormPreview form={form} />}>
          <FormEditor form={form} />
          <EditorProperties form={form} />
        </Show>
      </div>
    </section>
  );
};

export default EditorPage;
