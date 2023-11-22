import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex h-full items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      {children}
    </div>
  );
}
