"use client";

import { Show } from "components/Show";
import { Content } from "database/schema";
import { FormElements } from "features/editor/types";
import { PublicForm } from "features/forms/types";
import { createSubmission } from "features/submissions/actions/createSubmission";
import { useCookies } from "next-client-cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  form: PublicForm;
};

/**
 * Published form for public submission. Renders the form based on how the admin
 * created it in the form editor.
 */
export const PublishedForm = ({ form }: Props) => {
  const router = useRouter();

  const formContent = JSON.parse(form.content || "") as Content;

  const cookies = useCookies();
  const formCookie = cookies.get(form.id);

  useEffect(() => {
    if (!formCookie) {
      cookies.set(form.id, "Hello");
    }
  }, [cookies, form.id, formCookie]);

  const currentElements = formContent.elements;
  const currentSettings = formContent.settings;

  async function handleSubmit(e: FormData) {
    const data = Object.fromEntries(e);
    console.log("DATA: ", data);

    const response = await createSubmission({
      formId: form.id,
      content: JSON.stringify(data)
    });

    console.log("RESPONSE: ", response);
    router.refresh();
  }

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-start overflow-y-auto bg-white">
      <Show when={!form.published}>
        <div className="flex h-10 w-full items-center justify-center bg-brandColour">
          <p className="font-medium text-white">
            This form is not published. Please go to the{" "}
            <Link
              href={`/dashboard/${form.id}`}
              target="_blank"
              className="font-semibold underline transition hover:text-blue-100"
            >
              form settings
            </Link>{" "}
            to publish it.
          </p>
        </div>
      </Show>
      <form
        action={handleSubmit}
        className="flex h-full w-full flex-col p-4"
        style={{
          maxWidth: currentSettings.maxWidth,
          gap: currentSettings.gap
        }}
      >
        {currentElements.map(element => {
          const EditorElement = FormElements[element.type].formComponent;

          return <EditorElement key={element.id} element={element} />;
        })}
      </form>
    </div>
  );
};
