"use client";

import { Button } from "components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ReactNode } from "react";
import { cn } from "utils/cn";

type Props = {
  /** Optional trigger component to overwrite the current one. */
  trigger?: ReactNode;
};

/** Toggler for light/dark themes. Can choose between dark, light and system. */
export const ThemeToggler = ({ trigger }: Props) => {
  const { theme: currentTheme, setTheme, themes } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 transition hover:brightness-90 dark:border-0 dark:bg-zinc-700"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="border-borderLight dark:border-borderDark dark:bg-zinc-900"
      >
        {themes.map(theme => {
          return (
            <DropdownMenuItem
              key={theme}
              onClick={() => {
                setTimeout(() => {
                  setTheme(theme);
                }, 1);
              }}
              className={cn(
                "font-medium capitalize transition hover:brightness-125 data-[highlighted]:brightness-125 aria-[selected=false]:dark:bg-transparent",
                theme === currentTheme && "font-bold"
              )}
            >
              <Check
                className={cn(
                  "mr-2 h-5 w-5 opacity-0 transition",
                  theme === currentTheme && "opacity-100"
                )}
              />{" "}
              {theme}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
