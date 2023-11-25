import { ElementDropper } from "features/editor/components/ElementDropper";
import { FormElements } from "features/editor/types";

/**
 * Displays the drag and drop element buttons used to created elements in the
 * form editor canvas.
 */
export const EditorSidebar = () => {
  return (
    <aside className="flex h-full w-[280px] max-w-[280px] flex-grow flex-col gap-2 overflow-y-auto border-r border-muted border-r-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
      <ElementDropper formElement={FormElements.TextField} />
      <ElementDropper formElement={FormElements.Heading} />
      <ElementDropper formElement={FormElements.SubmitButton} />
    </aside>
  );
};
