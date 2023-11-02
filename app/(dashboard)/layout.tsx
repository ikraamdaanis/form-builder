import { Header } from "components/Header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-full items-center justify-center">
      <Header />
      {children}
    </div>
  );
}
