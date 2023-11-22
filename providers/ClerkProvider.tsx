"use client";

import { ClerkProvider as Provider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "app/globals.css";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ClerkProvider = ({ children }: Props) => {
  const { resolvedTheme } = useTheme();

  return (
    <Provider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        variables: {
          colorPrimary: "#F6565F"
        },
        elements: {
          avatarBox: "rounded-none h-full w-full",
          card: "overflow-hidden tracking normal shadow-none border border-zinc-200 dark:border-zinc-800",
          navbarButton: "tracking-normal",
          userPreviewAvatarContainer: "h-10 w-10 rounded-sm overflow-hidden",
          userButtonPopoverActionButton: "tracking-normal px-4",
          userButtonPopoverActionButtonIcon: "h-4 w-4",
          userButtonPopoverCard:
            "rounded-md shadow-none py-4  border border-zinc-300 dark:border-zinc-800",
          userButtonPopoverFooter: "hidden",
          userPreview: "px-4"
        }
      }}
    >
      {children}
    </Provider>
  );
};
