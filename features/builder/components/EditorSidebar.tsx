import { SidebarButton } from "features/builder/components/SidebarButton";
import { FormElements } from "features/types";

export const EditorSidebar = () => {
  return (
    <aside className="flex h-full w-[400px] max-w-[400px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-zinc-50 p-4 dark:bg-zinc-900">
      Sidebar
      <SidebarButton formElement={FormElements.TextField} />
    </aside>
  );
};
