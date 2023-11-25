import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { Show } from "components/Show";
import { Content, Form } from "database/schema";
import { EditorSidebar } from "features/editor/components/EditorToolbar";
import { ElementWrapper } from "features/editor/components/ElementWrapper";
import { useEditorStore } from "features/editor/hooks/useEditorStore";
import { cn } from "utils/cn";
import { useShallow } from "zustand/react/shallow";

type Props = {
  form: Form;
};

/**
 * The Editor Canvas serves as the main editor for forms, providing a canvas
 * where form elements can be manipulated and arranged using drag-and-drop
 * functionality. It integrates with the @dnd-kit library for handling
 * drag-and-drop operations.
 */
export const EditorCanvas = ({ form }: Props) => {
  const formContent = JSON.parse(form.content || "") as Content;

  return (
    <div className="flex h-full w-full">
      <EditorSidebar />
      <CanvasElements formContent={formContent} />
    </div>
  );
};

type CanvasElementsProps = {
  formContent: Content;
};

/**
 * Displays the elements in the form editor canvas.
 */
const CanvasElements = ({ formContent }: CanvasElementsProps) => {
  const { elements, setActiveElement, settings, hasLoaded } = useEditorStore(
    useShallow(state => ({
      elements: state.elements,
      setActiveElement: state.setActiveElement,
      settings: state.settings,
      hasLoaded: state.hasLoaded
    }))
  );

  const currentElements = !hasLoaded ? formContent?.elements || [] : elements;
  const currentSettings = !hasLoaded
    ? formContent.settings || settings
    : settings;

  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isEditorDropArea: true
    }
  });

  const isOverEditor =
    droppable.active?.data?.current?.isEditorButton && droppable.over;

  return (
    <div className="w-full p-4">
      <div
        ref={droppable.setNodeRef}
        className={cn(
          "m-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-y-auto bg-white",
          isOverEditor && "ring-2 ring-blue-400"
        )}
        onClick={e => {
          e.stopPropagation();
          setActiveElement(null);
        }}
      >
        <Show when={!droppable.isOver && currentElements.length === 0}>
          <p className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">
            Drop here
          </p>
        </Show>
        <Show when={currentElements.length > 0}>
          <SortableContext
            items={elements}
            strategy={verticalListSortingStrategy}
          >
            <div
              className="flex h-full w-full flex-col bg-white p-4"
              style={{
                maxWidth: currentSettings.maxWidth,
                gap: currentSettings.gap
              }}
            >
              {currentElements.map(element => {
                return <ElementWrapper key={element.id} element={element} />;
              })}
            </div>
          </SortableContext>
        </Show>
      </div>
    </div>
  );
};
