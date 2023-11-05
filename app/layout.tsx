import "app/globals.css";
import { Toaster } from "components/ui/toaster";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "providers/ClerkProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <ThemeProvider>
          <Toaster />
          <ClerkProvider>{children}</ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
