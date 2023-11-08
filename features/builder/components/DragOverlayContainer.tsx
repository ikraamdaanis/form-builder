import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { SidebarButtonDragOverlay } from "features/builder/components/SidebarButton";
import { EditorComponent } from "features/builder/components/fields/TextField";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { ElementsType, FormElements } from "features/types";
import { useState } from "react";

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
    node = <EditorComponent element={element} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
};
