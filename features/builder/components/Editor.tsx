import { useDroppable } from "@dnd-kit/core";
import { EditorSidebar } from "features/builder/components/EditorSidebar";

export const Editor = () => {
  const droppable = useDroppable({
    id: "editor-drop-area",
    data: {
      isEditorDropArea: true
    }
  });

  return (
    <div className="flex h-full w-full ">
      <div className="w-full p-4 ">
        <div className="m-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-zinc-50 dark:bg-zinc-900">
          <p className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">
            Drop here
          </p>
        </div>
      </div>
      <EditorSidebar />
    </div>
  );
};
