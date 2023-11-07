import { useDroppable } from "@dnd-kit/core";
import { FormElementInstance, FormElements } from "features/types";
import { cn } from "utils/cn";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEditor } from "features/builder/hooks/useEditor";
import { forwardRef } from "react";

type Props = {
  element: FormElementInstance;
};

export const EditorElementWrapper = ({ element }: Props) => {
  const EditorElement = FormElements[element.type].designerComponent;
  const { setActiveElement } = useEditor();

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

  return (
    <Item
      className="relative cursor-pointer"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => setActiveElement(element)}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute top-0 h-1/2 w-full rounded-t-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 h-1/2 w-full rounded-b-md"
      />
      {topHalf.isOver && (
        <div className="absolute top-0 h-1 w-full bg-primary" />
      )}
      <div
        className={cn(topHalf.isOver && "mt-2", bottomHalf.isOver && "mb-2")}
      >
        <EditorElement element={element} />
      </div>
      {bottomHalf.isOver && (
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
