"use client";

import { Button } from "components/ui/button";
import { Form } from "database/schema";
import { FormProperties } from "features/editor/components/FormProperties";
import { useEditorStore } from "features/editor/hooks/useEditorStore";
import { ElementsType, FormElements } from "features/editor/types";
import { MoveLeft } from "lucide-react";
import { memo } from "react";
import { ChildrenProp } from "types";
import { useShallow } from "zustand/react/shallow";

type Props = {
  form: Form;
};

/**
 * Sidebar for the properties fields for elements in the form editor enabling
 * the user to change the attributes of an element.
 */
export const EditorProperties = memo(({ form }: Props) => {
  const { activeElement, setActiveElement } = useEditorStore(
    useShallow(state => ({
      elements: state.elements,
      activeElement: state.activeElement,
      setActiveElement: state.setActiveElement
    }))
  );

  const Wrapper = ({ children }: Partial<ChildrenProp>) => {
    return (
      <aside className="ml-auto flex h-full min-w-[280px] max-w-[280px] flex-grow flex-col gap-2 overflow-y-auto border-l border-muted border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
        {children}
      </aside>
    );
  };

  if (!activeElement)
    return (
      <Wrapper>
        <FormProperties form={form} />
      </Wrapper>
    );

  const elementType = activeElement?.type as ElementsType;

  const ElementPropertiesForm = FormElements[elementType]?.propertiesComponent;

  return (
    <Wrapper>
      <Button
        onClick={() => setActiveElement(null)}
        className="h-6 w-10 self-start justify-self-start border bg-zinc-100 p-0 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-700 hover:dark:bg-zinc-800"
      >
        <MoveLeft className="relative block h-4 w-5 text-zinc-800 dark:text-zinc-200" />
      </Button>
      <ElementPropertiesForm />
    </Wrapper>
  );
});
