"use client";

import { Show } from "components/Show";
import { ThemeToggler } from "components/ThemeToggler";
import { Button } from "components/ui/button";
import { Form } from "database/schema";
import { ProfileButton } from "features/auth/components/ProfileButton";
import { PreviewButton } from "features/builder/components/PreviewButton";
import { PublishFormButton } from "features/builder/components/PublishFormButton";
import { SaveFormButton } from "features/builder/components/SaveFormButton";
import { useBuilderLinks } from "features/builder/hooks/useBuilderLinks";
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
  const { isPreview } = useBuilderLinks();

  return (
    <nav className="flex items-center justify-between gap-3 border-b border-b-zinc-300 bg-primary bg-white px-4 py-2 dark:border-b-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <Show
          when={!isPreview}
          fallback={
            <>
              <Link href={`/builder/${form.id}`}>
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
          <Link href="/">
            <h1 className="text-lg font-semibold text-black dark:text-white">
              Form Builder
            </h1>
          </Link>
          <h2 className="truncate font-medium">
            <span className="mr-2 text-muted-foreground">Form:</span>
            {form.name}
          </h2>
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
