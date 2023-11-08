import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { FormElementInstance, FormElements } from "features/types";
import { forwardRef } from "react";
import { cn } from "utils/cn";

type Props = {
  element: FormElementInstance;
};

export const ELEMENT_WRAPPER_CLASSNAME = "element-wrapper-classname";

export const EditorElementWrapper = ({ element }: Props) => {
  const EditorElement = FormElements[element.type].designerComponent;
  const [setActiveElement] = useEditorStore(state => [state.setActiveElement]);

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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const isEditorButton = topHalf.active?.id
    .toString()
    .includes("editor-button");

  return (
    <Item
      className={cn(
        "group relative cursor-pointer rounded-sm outline-none",
        ELEMENT_WRAPPER_CLASSNAME
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
      <div className="absolute left-1/2 top-1/2 h-[calc(100%+20px)] w-[calc(100%+20px)] -translate-x-1/2 -translate-y-1/2 rounded-sm border border-transparent group-hover:border-blue-300" />
      <div
        ref={topHalf.setNodeRef}
        className="absolute top-0 h-1/2 w-full rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 h-1/2 w-full rounded-b-md"
      />
      {isEditorButton && topHalf.isOver && (
        <div className="absolute top-0 h-1 w-full bg-primary" />
      )}
      <div
        className={cn(
          isEditorButton && topHalf.isOver && "mt-2",
          isEditorButton && bottomHalf.isOver && "mb-2"
        )}
      >
        <EditorElement element={element} />
      </div>
      {isEditorButton && bottomHalf.isOver && (
        <div className="absolute bottom-0 h-1 w-full bg-primary" />
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
