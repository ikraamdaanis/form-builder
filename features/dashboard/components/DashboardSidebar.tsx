import { Form } from "database/schema";
import Link from "next/link";
import { ComponentProps } from "react";

type Props = {
  form: Form;
};

/**
 * Sidebar for the Dashboard. Displays links for various pages within the form
 * dashboard including the published form link, form editor and submissions.
 */
export const DashboardSidebar = ({ form }: Props) => {
  return (
    <nav className="flex h-full w-[280px] max-w-[280px] flex-grow flex-col gap-2 overflow-y-auto border-r border-muted border-r-zinc-300 bg-zinc-50 pb-4 pt-[66px] dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex flex-col gap-1">
        <h2 className="mx-2 p-2 pt-0 text-xl font-semibold">{form.name}</h2>
        <NavbarLink href={`/forms/${form?.id}`} target="_blank">
          Published Form
        </NavbarLink>
        <NavbarLink href={`/editor/${form?.id}`}>Form Editor</NavbarLink>
        <NavbarLink href={`/editor/${form?.id}`}>Submissions</NavbarLink>
      </div>
    </nav>
  );
};

const NavbarLink = ({ children, ...props }: ComponentProps<typeof Link>) => {
  return (
    <Link
      className="hover:bg-zincHover mx-2 rounded-sm p-2 text-sm font-semibold transition hover:dark:bg-zinc-800"
      {...props}
      prefetch={false}
    >
      {children}
    </Link>
  );
};
