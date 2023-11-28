import { Header } from "components/Header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="h-full w-full">
      <Header />
      {children}
    </div>
  );
}
