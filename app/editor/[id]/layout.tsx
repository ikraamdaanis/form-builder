import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function EditorLayout({ children }: Props) {
  return (
    <main className="h-full w-full bg-zinc-50 dark:bg-zinc-900">
      {children}
    </main>
  );
}
