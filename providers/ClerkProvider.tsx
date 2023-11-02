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
          card: "overflow-hidden tracking normal",
          navbarButton: "tracking-normal",
          userButtonPopoverActionButton: "tracking-normal px-4",
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
