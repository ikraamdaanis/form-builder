"use client";

import { DashboardButton } from "components/DashboardButton";
import { Show } from "components/Show";
import { ThemeToggler } from "components/ThemeToggler";
import { Button } from "components/ui/button";
import { Form } from "database/schema";
import { ProfileButton } from "features/auth/components/ProfileButton";
import { FormName } from "features/editor/components/FormName";
import { PreviewButton } from "features/editor/components/PreviewButton";
import { PublishFormButton } from "features/editor/components/PublishFormButton";
import { SaveFormButton } from "features/editor/components/SaveFormButton";
import { useEditorLinks } from "features/editor/hooks/useEditorLinks";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  form: Form;
};

/**
 * The `EditorNavbar` component represents the navigation bar for the form
 * editor, displaying essential controls and information such as the form
 * name, preview button, and form-saving options.
 */
export const EditorNavbar = ({ form }: Props) => {
  const { formLink, isPreview } = useEditorLinks();

  return (
    <nav className="flex items-center justify-between gap-3 border-b border-b-zinc-300 bg-primary bg-white px-4 py-2 dark:border-b-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <Show
          when={!isPreview}
          fallback={
            <>
              <Link href={`${formLink}/${form.id}`}>
                <Button className="h-6 w-10 self-start justify-self-start border bg-zinc-100 p-0 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-700 hover:dark:bg-zinc-800">
                  <MoveLeft className="relative block h-4 w-5 text-zinc-800 dark:text-zinc-200" />
                </Button>
              </Link>
              <p className="text-lg font-bold text-black dark:text-white">
                Form Preview
              </p>
            </>
          }
        >
          <DashboardButton />
          <FormName form={form} />
        </Show>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <ThemeToggler />
          <ProfileButton />
        </div>
        <PreviewButton />
        <Show when={!form.published}>
          <SaveFormButton formId={form.id} />
          <PublishFormButton formId={form.id} />
        </Show>
      </div>
    </nav>
  );
};
