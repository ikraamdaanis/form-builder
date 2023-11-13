"use client";

import { Show } from "components/Show";
import { Form } from "database/schema";
import { PreviewDialogButton } from "features/builder/components/PreviewDialogButton";
import { PublishFormButton } from "features/builder/components/PublishFormButton";
import { SaveFormButton } from "features/builder/components/SaveFormButton";

type Props = {
  form: Form;
};

/** The `EditorNavbar` component represents the navigation bar for the form
 * editor, displaying essential controls and information such as the form
 * name, preview button, and form-saving options.
 */
export const EditorNavbar = ({ form }: Props) => {
  return (
    <nav className="flex items-center justify-between gap-3 border-b border-b-zinc-300 bg-primary bg-white px-4 py-2 dark:border-b-zinc-700 dark:bg-zinc-900">
      <h2 className="truncate font-medium">
        <span className="mr-2 text-muted-foreground">Form:</span>
        {form.name}
      </h2>
      <div className="flex items-center gap-2">
        <PreviewDialogButton />
        <Show when={!form.published}>
          <SaveFormButton formId={form.id} />
          <PublishFormButton formId={form.id} />
        </Show>
      </div>
    </nav>
  );
};
