"use client";

import { DragEndEvent, DragOverEvent, MeasuringStrategy } from "@dnd-kit/core";
import { SortableData, arrayMove } from "@dnd-kit/sortable";
import { EditorCanvas } from "features/builder/components/EditorCanvas";
import { EditorProperties } from "features/builder/components/EditorProperties";
import { SortableContainer } from "features/builder/components/SortableContainer";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { ElementsType, FormElements } from "features/types";
import { useShallow } from "zustand/react/shallow";

/**
 * The `FormBuilder` component is a higher-level container that orchestrates the
 * form-building process, integrating with the @dnd-kit library to handle
 * drag-and-drop interactions for form elements. It utilizes the `EditorCanvas`
 * component for the main form editor interface and `SortableContainer`
 * for managing the sortable behavior of form elements.
 */
export const FormBuilder = () => {
  const { elements, setElements, addElement } = useEditorStore(
    useShallow(state => ({
      elements: state.elements,
      setElements: state.setElements,
      addElement: state.addElement
    }))
  );

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
    >
      <div className="relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
        <EditorCanvas />
        <EditorProperties />
      </div>
    </SortableContainer>
  );
};
