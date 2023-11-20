"use client";

import { Button } from "components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "components/ui/dialog";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { FormElements } from "features/types";
import { ScanEye } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

/** Button to show the preview of a form. */
export const PreviewButton = () => {
  const { elements, settings } = useEditorStore(
    useShallow(state => ({
      elements: state.elements,
      settings: state.settings
    }))
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-8 gap-2 px-2 text-xs font-semibold transition hover:brightness-90 dark:border-0 dark:bg-zinc-700"
        >
          <ScanEye className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-screen max-h-screen w-screen max-w-full flex-grow flex-col gap-0 p-0 outline-none">
        <div className="border border-b border-b-zinc-300 bg-zinc-50 px-4 py-2 dark:border-b-zinc-700 dark:bg-zinc-900">
          <p className="text-lg font-bold text-black dark:text-white">
            Form preview
          </p>
        </div>
        <div className="flex flex-grow flex-col items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] p-4 dark:bg-[url(/paper-dark.svg)]">
          <div className="flex h-full w-full max-w-[620px] flex-grow flex-col overflow-y-auto bg-zinc-50">
            <div
              className="flex h-full w-full flex-col p-4"
              style={{
                maxWidth: settings.maxWidth,
                gap: settings.gap
              }}
            >
              {elements.map(element => {
                const EditorElement =
                  FormElements[element.type].editorComponent;

                return <EditorElement key={element.id} element={element} />;
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
