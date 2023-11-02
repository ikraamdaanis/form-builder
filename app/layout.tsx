import { ClerkProvider } from "@clerk/nextjs";
import "app/globals.css";
import type { Metadata } from "next";
import { Inter as Manrope } from "next/font/google";
import { ThemeProvider } from "providers/ThemeProvider";
import { ReactNode } from "react";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Form Builder",
  description: "Form Builder"
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#F6565F"
        },
        elements: {
          userButtonPopoverActionButton: "tracking-normal",
          userButtonPopoverFooter: "hidden",
          navbarButton: "tracking-normal",
          card: "overflow-hidden tracking normal"
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={manrope.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="form-builder-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
