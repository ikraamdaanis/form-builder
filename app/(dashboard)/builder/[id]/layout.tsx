import { Header } from "components/Header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BuilderLayout({ children }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-900">
      <Header />
      {children}
    </div>
  );
}
