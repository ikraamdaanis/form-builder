"use client";

import { Button } from "components/ui/button";
import { SidebarButton } from "features/builder/components/SidebarButton";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { FormElements } from "features/types";
import { MoveLeft } from "lucide-react";

/**
 * Displays the drag and drop element buttons or the element properties form if
 * there is an active element.
 */
export const EditorSidebar = () => {
  const [activeElement] = useEditorStore(state => [state.activeElement]);

  return (
    <aside className="flex h-full w-[260px] max-w-[260px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-zinc-50 p-4 dark:bg-zinc-900">
      {!activeElement && <SidebarButton formElement={FormElements.TextField} />}
      <PropertiesForm />
    </aside>
  );
};

/**
 * Displays the form for changing the attributes of an element.
 */
const PropertiesForm = () => {
  const [activeElement, setActiveElement] = useEditorStore(state => [
    state.activeElement,
    state.setActiveElement
  ]);

  if (!activeElement) return null;

  const ElementPropertiesForm =
    FormElements[activeElement?.type]?.propertiesComponent;

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => setActiveElement(null)}
        className="h-6 w-10 self-start justify-self-start border bg-zinc-100 p-0 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-700 hover:dark:bg-zinc-800"
      >
        <MoveLeft className="relative block h-4 w-5 text-zinc-800 dark:text-zinc-200" />
      </Button>
      <ElementPropertiesForm />
    </div>
  );
};
