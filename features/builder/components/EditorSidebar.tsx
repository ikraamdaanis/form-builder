"use client";

import { ELEMENT_WRAPPER_CLASSNAME } from "features/builder/components/EditorElementWrapper";
import { SidebarButton } from "features/builder/components/SidebarButton";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { FormElements } from "features/types";
import { useOnClickOutside } from "hooks/outOutsideClick";
import { useRef } from "react";

export const EditorSidebar = () => {
  const [setActiveElement] = useEditorStore(state => [state.setActiveElement]);

  const ref = useRef<HTMLElement>(null);
  useOnClickOutside(ref, event => {
    const target = event.target as HTMLElement;

    if (target?.parentElement?.className?.includes?.(ELEMENT_WRAPPER_CLASSNAME))
      return;

    setActiveElement(null);
  });

  return (
    <aside
      className="flex h-full w-[400px] max-w-[400px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-zinc-50 p-4 dark:bg-zinc-900"
      ref={ref}
    >
      Sidebar
      <SidebarButton formElement={FormElements.TextField} />
      <PropertiesForm />
    </aside>
  );
};

const PropertiesForm = () => {
  const [activeElement] = useEditorStore(state => [state.activeElement]);

  if (!activeElement) return null;

  const ElementPropertiesForm =
    FormElements[activeElement?.type]?.propertiesComponent;

  return <ElementPropertiesForm />;
};
