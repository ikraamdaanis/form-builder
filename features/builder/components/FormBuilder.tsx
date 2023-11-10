"use client";

import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Form } from "database/schema";
import { Editor } from "features/builder/components/Editor";
import { PreviewDialogButton } from "features/builder/components/PreviewDialogButton";
import { PublishFormButton } from "features/builder/components/PublishFormButton";
import { SaveFormButton } from "features/builder/components/SaveFormButton";
import { SortableContainer } from "features/builder/components/SortableContainer";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { ElementsType, FormElements } from "features/types";

type Props = {
  form: Form;
};

export const FormBuilder = ({ form }: Props) => {
  const [elements, setElements, addElement, setActiveElement] = useEditorStore(
    state => [
      state.elements,
      state.setElements,
      state.addElement,
      state.setActiveElement
    ]
  );

  function onDragStart(event: DragStartEvent) {
    // If an element is being dragged set it to the active element.
    const element =
      elements.find(element => element.id === event.active.id) || null;
    setActiveElement(element);
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

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

      return addElement(finalIndex, newElement);
    }

    if (isSortable) {
      const oldIndex = elements.findIndex(element => element.id === active.id);
      const newIndex = elements.findIndex(element => element.id === over.id);
      setElements(arrayMove(elements, oldIndex, newIndex));
    }
  }
  return (
    <SortableContainer onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <section className="flex h-full w-full flex-col">
        <nav className="flex items-center justify-between gap-3 border-b border-b-zinc-300 bg-primary bg-white px-4 py-2 dark:border-b-zinc-700 dark:bg-zinc-900">
          <h2 className="truncate font-medium">
            <span className="mr-2 text-muted-foreground">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton formId={form.id} />
                <PublishFormButton formId={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Editor />
        </div>
      </section>
    </SortableContainer>
  );
};
