import { SidebarButton } from "features/builder/components/SidebarButton";
import { FormElements } from "features/types";

/**
 * Displays the drag and drop element buttons used to created elements in the
 * form builder.
 */
export const EditorSidebar = () => {
  return (
    <aside className="flex h-full w-[280px] max-w-[280px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-zinc-50 p-4 dark:bg-zinc-900">
      <SidebarButton formElement={FormElements.TextField} />
      <SidebarButton formElement={FormElements.Heading} />
    </aside>
  );
};
