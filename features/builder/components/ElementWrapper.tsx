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
 * editor canvas.
 */
export const ElementWrapper = ({ element, isOverlay }: Props) => {
  const EditorElement = FormElements[element.type].editorComponent;
  const [setActiveElement] = useEditorStore(state => [state.setActiveElement]);

  const [activeElement] = useEditorStore(state => [state.activeElement]);
  const isActiveElement = activeElement?.id === element.id;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform)
  };

  return (
    <Item
      className={cn(
        "group relative cursor-pointer select-none border border-dashed border-transparent outline-none",
        !isDragging && "hover:border-blue-300",
        isActiveElement && !isDragging && "border-blue-300",
        (element.id.includes("space") || isDragging) &&
          "border border-dashed border-blue-300 py-10 opacity-50"
      )}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={e => {
        e.stopPropagation();
        setActiveElement(element);
      }}
    >
      <EditorElement element={element} isOverlay={isOverlay} />
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
