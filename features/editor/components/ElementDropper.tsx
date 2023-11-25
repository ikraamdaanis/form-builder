import { useDraggable } from "@dnd-kit/core";
import { Button } from "components/ui/button";
import { FormElement } from "features/editor/types";
import { cn } from "utils/cn";

type Props = {
  formElement: FormElement;
};

/** Used to drag and drop an element into the form editor canvas. */
export const ElementDropper = ({ formElement }: Props) => {
  const { icon, label } = formElement.designerButton;

  const draggable = useDraggable({
    id: `editor-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isEditorButton: true
    }
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      className={cn(
        "flex w-full cursor-grab justify-start gap-2",
        draggable.isDragging && "ring-2 ring-blue-400"
      )}
      variant="outline"
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <span className="min-w-[20px]">{icon}</span>
      <span>{label}</span>
    </Button>
  );
};

/** Overlay for when an Element Dropper is being dragged. */
export const ElementDropperOverlay = ({ formElement }: Props) => {
  const { icon, label } = formElement.designerButton;

  return (
    <div className="min-ws-[400px] min-h-[0px] border border-white">
      <Button
        className={cn("flex w-full cursor-grab justify-start gap-2")}
        variant="outline"
      >
        <span className="min-w-[20px]">{icon}</span>
        <span>{label}</span>
      </Button>
    </div>
  );
};
