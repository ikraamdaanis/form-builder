"use client";

import { Show } from "components/Show";
import { ThemeToggler } from "components/ThemeToggler";
import { Form } from "database/schema";
import { ProfileButton } from "features/auth/components/ProfileButton";
import { PreviewDialogButton } from "features/builder/components/PreviewDialogButton";
import { PublishFormButton } from "features/builder/components/PublishFormButton";
import { SaveFormButton } from "features/builder/components/SaveFormButton";
import Link from "next/link";

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
      <div className="flex items-center gap-2">
        <Link href="/">
          <h1 className="text-lg font-semibold text-black dark:text-white">
            Form Builder
          </h1>
        </Link>
        <h2 className="truncate font-medium">
          <span className="mr-2 text-muted-foreground">Form:</span>
          {form.name}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <ThemeToggler />
          <ProfileButton />
        </div>
        <PreviewDialogButton />
        <Show when={!form.published}>
          <SaveFormButton formId={form.id} />
          <PublishFormButton formId={form.id} />
        </Show>
      </div>
    </nav>
  );
};
