"use client";

import { NavbarLink } from "app/dashboard/NavbarLink";
import { Home, Mails } from "lucide-react";
import { usePathname } from "next/navigation";

/** Links for the dashboard home sidebar. */
export const HomeSidebarLinks = () => {
  const pathname = usePathname();

  const isHome = pathname === `/dashboard`;
  const isForms = pathname === `/dashboard/forms`;

  return (
    <>
      <NavbarLink href="/dashboard" isActive={isHome}>
        <Home className="h-4 w-4" /> Home
      </NavbarLink>
      <NavbarLink href="/dashboard/forms" isActive={isForms}>
        <Mails className="h-4 w-4" /> Forms
      </NavbarLink>
    </>
  );
};
