import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function BuilderLayout({ children }: Props) {
  return <div className="h-full w-full">{children}</div>;
}
