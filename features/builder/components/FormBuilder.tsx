"use client";

import { DndContext } from "@dnd-kit/core";
import { Form } from "database/schema";
import { Editor } from "features/builder/components/Editor";
import { PreviewDialogButton } from "features/builder/components/PreviewDialogButton";
import { PublishFormButton } from "features/builder/components/PublishFormButton";
import { SaveFormButton } from "features/builder/components/SaveFormButton";

type Props = {
  form: Form;
};

export const FormBuilder = ({ form }: Props) => {
  return (
    <DndContext>
      <div className="flex h-full w-full flex-col">
        <nav className="flex items-center justify-between gap-3 border-b-2 bg-zinc-50 p-4 dark:bg-zinc-800">
          <h2 className="truncate font-medium">
            <span className="mr-2 text-muted-foreground">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton formId={form.id} />
                <PublishFormButton formId={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="relative flex h-[200px] w-full flex-grow items-center justify-center overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Editor />
        </div>
      </div>
    </DndContext>
  );
};
