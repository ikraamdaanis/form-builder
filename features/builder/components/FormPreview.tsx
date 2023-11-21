"use client";

import { Form } from "database/schema";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { FormElementInstance, FormElements } from "features/types";
import { useShallow } from "zustand/react/shallow";

type Props = {
  form: Form;
};

/**
 * Displays a preview of the form, rendering the form elements based on the
 * provided configuration. It shows the admin how the form would look to their
 * users.
 */
export const FormPreview = ({ form }: Props) => {
  const { elements, settings } = useEditorStore(
    useShallow(state => ({
      elements: state.elements,
      settings: state.settings
    }))
  );

  const displayedElements = elements.length
    ? elements
    : (JSON.parse(form.content || "") as FormElementInstance[]);

  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex h-full w-full flex-grow flex-col items-center justify-start overflow-y-auto bg-zinc-50">
        <div
          className="flex h-full w-full flex-col p-4"
          style={{
            maxWidth: settings.maxWidth,
            gap: settings.gap
          }}
        >
          {displayedElements.map(element => {
            const EditorElement = FormElements[element.type].formComponent;

            return <EditorElement key={element.id} element={element} />;
          })}
        </div>
      </div>
    </section>
  );
};
