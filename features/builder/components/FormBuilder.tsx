"use client";

import { DragEndEvent, DragOverEvent, MeasuringStrategy } from "@dnd-kit/core";
import { SortableData, arrayMove } from "@dnd-kit/sortable";
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
  const [elements, setElements, addElement] = useEditorStore(state => [
    state.elements,
    state.setElements,
    state.addElement
  ]);

  function onDragStart() {}

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    const activeElement = active.data.current;

    const isSortableElement = !!activeElement?.sortable;
    const isEditorButton = !!activeElement?.isEditorButton;

    const overSortable = over.data.current
      ?.sortable as SortableData["sortable"];
    const overCanvas = over.id === "editor-drop-area";

    if (isEditorButton) {
      const type = active.data?.current?.type as ElementsType;
      const newElement = FormElements[type].construct("spacer");

      // If an element is being dropped in and is hovering another element, insert
      // it at the same index.
      if (overSortable) {
        const nextIndex =
          overSortable.index > -1 ? overSortable.index : elements.length;

        setElements(elements.filter(element => !element.id.includes("spacer")));
        return addElement(nextIndex, newElement);
      }

      // If an element is being dropped in and isn't above an existing element,
      // put it right at the bottom.
      if (overCanvas) {
        const nextIndex = elements.length;

        setElements(elements.filter(element => !element.id.includes("spacer")));
        return addElement(nextIndex, newElement);
      }
    }

    // If an element is being re-ordered but it's not over any other element,
    // put it right at the bottom.
    if (isSortableElement && overCanvas) {
      const activeIndex = elements.findIndex(
        element => element.id === active.id
      );

      const newArray = arrayMove([...elements], activeIndex, elements.length);

      setElements(newArray);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setElements(elements.filter(element => !element.id.includes("spacer")));

    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    const activeElement = active.data.current;
    const isEditorButton = activeElement?.isEditorButton;
    const isSortable = activeElement?.sortable;

    if (isEditorButton) {
      const type = active.data?.current?.type as ElementsType;
      const newElement = FormElements[type].construct(crypto.randomUUID());

      const spaceElementIndex = elements.findIndex(
        element => element.id === "spacer"
      );

      if (spaceElementIndex > -1) {
        const updatedElements = [...elements];
        updatedElements[spaceElementIndex] = newElement;

        return setElements(updatedElements);
      }

      return addElement(spaceElementIndex, newElement);
    }

    if (isSortable) {
      const oldIndex = elements.findIndex(element => element.id === active.id);
      const newIndex = elements.findIndex(element => element.id === over.id);
      setElements(arrayMove(elements, oldIndex, newIndex));
    }
  }

  function onDragCancel() {
    setElements(elements.filter(element => !element.id.includes("spacer")));
  }

  return (
    <SortableContainer
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
      // collisionDetection={collisionDetectionStrategy}
    >
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
