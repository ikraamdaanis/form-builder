import {
  DndContext,
  DndContextProps,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { DragOverlay } from "features/builder/components/DragOverlay";
import { useEffect, useState } from "react";

/**
 * Sortable container for the form editor. Allows for form elements to be
 * dragged and dropped into the canvas.
 */
export const SortableContainer = (props: DndContextProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Allows for items to have a click event if it's not being dragged.
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DndContext sensors={sensors} {...props}>
      {props.children}
      <DragOverlay />
    </DndContext>
  );
};
