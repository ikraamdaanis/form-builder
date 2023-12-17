import Link from "next/link";
import { ComponentProps } from "react";
import { cn } from "utils/cn";

/** Styled link for the sidebar. */
export const NavbarLink = ({
  isActive,
  children,
  ...props
}: ComponentProps<typeof Link> & { isActive?: boolean }) => {
  return (
    <Link
      className={cn(
        "mx-2 flex items-center gap-2 rounded-sm p-2 text-sm font-semibold transition hover:bg-zincHover hover:dark:bg-zinc-800",
        isActive && "bg-zincHover dark:bg-zinc-800"
      )}
      {...props}
      prefetch={false}
    >
      {children}
    </Link>
  );
};
