"use client";

import { Form } from "database/schema";
import { PreviewDialogButton } from "features/builder/components/PreviewDialogButton";
import { PublishFormButton } from "features/builder/components/PublishFormButton";
import { SaveFormButton } from "features/builder/components/SaveFormButton";

type Props = {
  form: Form;
};

export const FormBuilder = ({ form }: Props) => {
  return (
    <div className="flex items-center justify-between gap-3 border-b-2 p-4">
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
    </div>
  );
};
