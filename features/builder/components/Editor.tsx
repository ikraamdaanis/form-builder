import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { EditorElementWrapper } from "features/builder/components/EditorElementWrapper";
import { EditorSidebar } from "features/builder/components/EditorSidebar";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { cn } from "utils/cn";

/** Editor for the forms. */
export const Editor = () => {
  const [elements, setActiveElement] = useEditorStore(state => [
    state.elements,
    state.setActiveElement
  ]);

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
          onClick={e => {
            e.stopPropagation();
            setActiveElement(null);
          }}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex w-full flex-col gap-2 space-y-2 p-4">
              <SortableContext
                items={elements}
                strategy={verticalListSortingStrategy}
              >
                {elements.map(element => {
                  return (
                    <EditorElementWrapper key={element.id} element={element} />
                  );
                })}
              </SortableContext>
            </div>
          )}
        </div>
      </div>
      <EditorSidebar />
    </div>
  );
};
