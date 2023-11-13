import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { Show } from "components/Show";
import { EditorSidebar } from "features/builder/components/EditorSidebar";
import { ElementWrapper } from "features/builder/components/ElementWrapper";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { cn } from "utils/cn";
import { useShallow } from "zustand/react/shallow";

/**
 * The Editor Canvas serves as the main editor for forms, providing a canvas
 * where form elements can be manipulated and arranged using drag-and-drop
 * functionality. It integrates with the @dnd-kit library for handling
 * drag-and-drop operations.
 */
export const EditorCanvas = () => {
  const { elements, setActiveElement } = useEditorStore(
    useShallow(state => ({
      elements: state.elements,
      setActiveElement: state.setActiveElement
    }))
  );

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isEditorDropArea: true
    }
  });

  const isOverEditor =
    droppable.active?.data?.current?.isEditorButton && droppable.over;

  return (
    <div className="flex h-full w-full">
      <div className="w-full p-4">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "m-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-zinc-50 dark:bg-zinc-900",
            isOverEditor && "ring-2 ring-blue-400"
          )}
          onClick={e => {
            e.stopPropagation();
            setActiveElement(null);
          }}
        >
          <Show when={!droppable.isOver && elements.length === 0}>
            <p className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">
              Drop here
            </p>
          </Show>
          <Show when={elements.length > 0}>
            <SortableContext
              items={elements}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex h-full w-full flex-col gap-2 space-y-2 p-4">
                {elements.map(element => {
                  return <ElementWrapper key={element.id} element={element} />;
                })}
              </div>
            </SortableContext>
          </Show>
        </div>
      </div>
      <EditorSidebar />
    </div>
  );
};
