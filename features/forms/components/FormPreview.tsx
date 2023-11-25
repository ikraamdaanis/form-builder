"use client";

import { Content, Form } from "database/schema";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { FormElements } from "features/builder/types";
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
  const { elements, settings, hasLoaded } = useEditorStore(
    useShallow(state => ({
      elements: state.elements,
      settings: state.settings,
      hasLoaded: state.hasLoaded
    }))
  );

  const formContent = JSON.parse(form.content || "") as Content;

  const currentElements = elements.length ? elements : formContent.elements;
  const currentSettings = hasLoaded ? settings : formContent.settings;

  return (
    <section className="flex h-full w-full flex-col">
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
    </section>
  );
};
