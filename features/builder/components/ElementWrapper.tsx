import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "components/ui/button";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { FormElementInstance, FormElements } from "features/types";
import { Trash } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "utils/cn";
import { useShallow } from "zustand/react/shallow";

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
      <div className="absolute right-0 top-0 hidden group-hover:flex">
        <RemoveElement elementId={element.id} />
      </div>
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

/** Button for remove an element in the canvas. */
const RemoveElement = ({ elementId }: { elementId: string }) => {
  const { removeElement } = useEditorStore(
    useShallow(state => ({
      removeElement: state.removeElement
    }))
  );

  return (
    <Button
      className="h-5 w-5 rounded-sm bg-red-600 p-0 hover:bg-red-500"
      onClick={event => {
        event.stopPropagation();
        removeElement(elementId);
      }}
    >
      <Trash className="h-3 w-3 text-white" />
    </Button>
  );
};
