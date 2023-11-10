import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { EditorElementWrapper } from "features/builder/components/EditorElementWrapper";
import { SidebarButtonDragOverlay } from "features/builder/components/SidebarButton";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { ElementsType, FormElements } from "features/types";
import { useState } from "react";

/**
 * Overlay container that displays components that are being dragged.
 */
export const DragOverlayContainer = () => {
  const [elements] = useEditorStore(state => [state.elements]);
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

  const element = elements.find(element => element.id === draggedItem.id);

  if (element) {
    node = <EditorElementWrapper element={element} isOverlay />;
  }

  return <DragOverlay>{node}</DragOverlay>;
};
