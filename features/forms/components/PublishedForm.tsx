"use client";

import { Content } from "database/schema";
import { PublicForm } from "features/forms/types";
import { FormElements } from "features/types";

type Props = {
  form: PublicForm;
};

/**
 * Published form for public submission. Renders the form based on how the admin
 * created it in the form editor.
 */
export const PublishedForm = ({ form }: Props) => {
  const formContent = JSON.parse(form.content || "") as Content;

  const currentElements = formContent.elements;
  const currentSettings = formContent.settings;

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-start overflow-y-auto bg-white">
      <div
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
      </div>
    </div>
  );
};
