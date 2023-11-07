import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";
import { EditorElementWrapper } from "features/builder/components/EditorElementWrapper";
import { EditorSidebar } from "features/builder/components/EditorSidebar";
import { useEditor } from "features/builder/hooks/useEditor";
import { ElementsType, FormElements } from "features/types";
import { cn } from "utils/cn";

/** Editor for the forms. */
export const Editor = () => {
  const { elements, setElements, addElement } = useEditor();

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isEditorDropArea: true
    }
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const activeElement = active.data.current;
      const isEditorButton = activeElement?.isEditorButton;
      const isSortable = activeElement?.sortable;

      if (isEditorButton) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          crypto.randomUUID()
        );

        // Find the existing element it's currently above.
        const overElement = over.data.current;
        const overElementIndex = elements.findIndex(
          element => element.id === overElement?.elementId
        );

        // Check if it's on the top or bottom half of that element.
        const isTopHalf = overElement?.isTopHalf;
        const isBottomHalf = overElement?.isBottomHalf;

        // If it's on the top half, put the new element above, if not, then below.
        const indexChange = isTopHalf ? -1 : isBottomHalf ? 1 : 0;

        // If it's not above an existing element, put it at the bottom.
        const finalIndex =
          overElementIndex < 0
            ? elements.length
            : (indexChange < 0 ? 0 : indexChange) + overElementIndex;

        addElement(finalIndex, newElement);

        return;
      }

      if (isSortable) {
        setElements(items => {
          const oldIndex = items.findIndex(element => element.id === active.id);
          const newIndex = items.findIndex(element => element.id === over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
      }
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
