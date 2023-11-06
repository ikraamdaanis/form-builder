import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { SidebarButtonDragOverlay } from "features/builder/components/SidebarButton";
import { ElementsType, FormElements } from "features/types";
import { useState } from "react";

export const DragOverlayContainer = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: event => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    }
  });

  if (!draggedItem) return null;

  let node = <div>No drag</div>;
  const isSidebarButton = draggedItem.data?.current?.isEditorButton;

  if (isSidebarButton) {
    const type = draggedItem.data.current?.type as ElementsType;
    node = <SidebarButtonDragOverlay formElement={FormElements[type]} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
};
