"use client";

import { SidebarButton } from "features/builder/components/SidebarButton";
import { CustomFormElementInstance } from "features/builder/components/fields/TextField";
import { useEditor } from "features/builder/hooks/useEditor";
import { FormElements } from "features/types";
import { useOnClickOutside } from "hooks/outOutsideClick";
import { useRef } from "react";

export const EditorSidebar = () => {
  const { activeElement, setActiveElement } = useEditor();

  const attributes = activeElement as CustomFormElementInstance;

  const ref = useRef<HTMLElement>(null);
  useOnClickOutside(ref, () => setActiveElement(null));

  return (
    <aside
      className="flex h-full w-[400px] max-w-[400px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-zinc-50 p-4 dark:bg-zinc-900"
      ref={ref}
    >
      Sidebar
      <SidebarButton formElement={FormElements.TextField} />
      {activeElement && <div>{attributes.extraAttributes.placeholder}</div>}
    </aside>
  );
};
