import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BuilderLayout({ children }: Props) {
  return <main className="h-full w-full bg-zinc-900 pt-16">{children}</main>;
}
