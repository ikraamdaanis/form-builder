import "app/globals.css";
import { Toaster } from "components/ui/toaster";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "providers/ClerkProvider";
import { ThemeProvider } from "providers/ThemeProvider";
import { ReactNode } from "react";
import { cn } from "utils/cn";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ignition",
  description:
    "Ignition is a versatile form creation tool that allows users to effortlessly design and customize forms for various purposes."
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <CookiesProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("bg-zinc-50 dark:bg-zinc-900", manrope.className)}>
          <ThemeProvider>
            <Toaster />
            <ClerkProvider>{children}</ClerkProvider>
          </ThemeProvider>
        </body>
      </html>
    </CookiesProvider>
  );
}
