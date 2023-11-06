import { EditorProvider } from "providers/EditorProvider";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BuilderLayout({ children }: Props) {
  return (
    <EditorProvider>
      <main className="h-full w-full bg-zinc-50 pt-16 dark:bg-zinc-900">
        {children}
      </main>
    </EditorProvider>
  );
}
