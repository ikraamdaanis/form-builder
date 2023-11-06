import { useDraggable } from "@dnd-kit/core";
import { Button } from "components/ui/button";
import { FormElement } from "features/types";
import { cn } from "utils/cn";

type Props = {
  formElement: FormElement;
};

export const SidebarButton = ({ formElement }: Props) => {
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
        "flex h-[120px] w-[120px] cursor-grab flex-col gap-2",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      variant="outline"
      {...draggable.listeners}
      {...draggable.attributes}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

export const SidebarButtonDragOverlay = ({ formElement }: Props) => {
  const { icon, label } = formElement.designerButton;

  return (
    <Button
      className="flex h-[120px] w-[120px] cursor-grab flex-col gap-2"
      variant="outline"
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};
