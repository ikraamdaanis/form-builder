import { useDroppable } from "@dnd-kit/core";
import { EditorSidebar } from "features/builder/components/EditorSidebar";
import { FormElementInstance } from "features/types";
import { useState } from "react";
import { cn } from "utils/cn";

/** Editor for the forms. */
export const Editor = () => {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isEditorDropArea: true
    }
  });

  return (
    <div className="flex h-full w-full">
      <div className="w-full p-4">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "m-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-zinc-50 dark:bg-zinc-900",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && (
            <p className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">
              Drop here
            </p>
          )}
          {droppable.isOver && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
        </div>
      </div>
      <EditorSidebar />
    </div>
  );
};
