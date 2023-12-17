"use client";

import { NavbarLink } from "app/dashboard/NavbarLink";
import { Separator } from "components/ui/separator";
import { Form } from "database/schema";
import { Cog, GanttChartSquare, Mails } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
  form?: Form;
};

/** Links for the Form's sidebar. */
export const FormSidebarLinks = ({ form }: Props) => {
  const pathname = usePathname();

  const isOverview = pathname === `/dashboard/${form?.id}`;
  const isSubmissions = pathname.includes("submissions");
  const isSettings = pathname.includes("settings");

  return (
    <>
      <Separator className="mx-auto w-[90%]" />
      <NavbarLink href={`/dashboard/${form?.id}`} isActive={isOverview}>
        <GanttChartSquare className="h-4 w-4" />
        Form Overview
      </NavbarLink>
      <NavbarLink
        href={`/dashboard/${form?.id}/submissions`}
        isActive={isSubmissions}
      >
        <Mails className="h-4 w-4" /> Submissions
      </NavbarLink>
      <NavbarLink
        href={`/dashboard/${form?.id}/settings`}
        isActive={isSettings}
      >
        <Cog className="h-4 w-4" /> Settings
      </NavbarLink>
    </>
  );
};

export const FormSidebarLinksLoader = () => {
  return (
    <>
      <Separator className="mx-auto w-[90%]" />
      <NavbarLink href={`/dashboard/`} isActive>
        <GanttChartSquare className="h-4 w-4" />
        Form Overview
      </NavbarLink>
      <NavbarLink href={`/dashboard/`}>
        <Mails className="h-4 w-4" /> Submissions
      </NavbarLink>
      <NavbarLink href={`/dashboard/`}>
        <Cog className="h-4 w-4" /> Settings
      </NavbarLink>
    </>
  );
};
