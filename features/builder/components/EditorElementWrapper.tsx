import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { FormElementInstance, FormElements } from "features/types";
import { forwardRef } from "react";
import { cn } from "utils/cn";

type Props = {
  element: FormElementInstance;
  isOverlay?: boolean;
};

/**
 * Wrapper for an element in the editor which allows it to be dragged in the
 * editor. If an element button overs over it, it would show a border at the
 * top or bottom depending on the position of the element drag button.
 */
export const EditorElementWrapper = ({ element, isOverlay }: Props) => {
  const EditorElement = FormElements[element.type].editorComponent;
  const [setActiveElement] = useEditorStore(state => [state.setActiveElement]);

  const [activeElement] = useEditorStore(state => [state.activeElement]);
  const isActiveElement = activeElement?.id === element.id;

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalf: true
    }
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalf: true
    }
  });

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform)
  };

  const isEditorButton = topHalf.active?.id
    .toString()
    .includes("editor-button");

  return (
    <Item
      className={cn(
        "group relative cursor-pointer border border-transparent outline-none group-hover:border-blue-300",
        isActiveElement && !isDragging && "border-blue-300"
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={e => {
        e.stopPropagation();
        setActiveElement(element);
      }}
      data-item="true"
    >
      <div />
      {isEditorButton && (
        <>
          <div
            ref={topHalf.setNodeRef}
            className="absolute top-0 h-1/2 w-full rounded-t-md"
          />
          <div
            ref={bottomHalf.setNodeRef}
            className="absolute bottom-0 h-1/2 w-full rounded-b-md"
          />
        </>
      )}
      {isEditorButton && topHalf.isOver && (
        <div className="absolute top-0 h-0.5 w-full bg-primary" />
      )}
      <div
        className={cn(
          isEditorButton && topHalf.isOver && "mt-2",
          isEditorButton && bottomHalf.isOver && "mb-2"
        )}
      >
        <EditorElement element={element} isOverlay={isOverlay} />
      </div>
      {isEditorButton && bottomHalf.isOver && (
        <div className="absolute bottom-0 h-0.5 w-full bg-primary" />
      )}
    </Item>
  );
};

export const Item = forwardRef<HTMLDivElement, JSX.IntrinsicElements["div"]>(
  function Item(props, ref) {
    return (
      <div {...props} ref={ref}>
        {props.children}
      </div>
    );
  }
);
