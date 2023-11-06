import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { EditorElementWrapper } from "features/builder/components/EditorElementWrapper";
import { EditorSidebar } from "features/builder/components/EditorSidebar";
import { useEditor } from "features/builder/hooks/useEditor";
import { ElementsType, FormElements } from "features/types";
import { cn } from "utils/cn";

/** Editor for the forms. */
export const Editor = () => {
  const { elements, addElement } = useEditor();

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

      const isEditorButton = active.data.current?.isEditorButton;

      if (isEditorButton) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          crypto.randomUUID()
        );

        console.log(newElement);

        addElement(0, newElement);
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
            <div className="flex w-full flex-col gap-2 p-4">
              {elements.map(element => {
                return (
                  <EditorElementWrapper key={element.id} element={element} />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <EditorSidebar />
    </div>
  );
};
