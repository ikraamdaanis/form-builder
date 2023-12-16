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
import { cn } from "utils/cn";

/** Toggler for light/dark themes. Can choose between dark, light and system. */
export const ThemeToggler = () => {
  const { theme: currentTheme, setTheme, themes } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex w-full items-center justify-start gap-2 rounded-none bg-backgroundLight p-0 px-4 text-left text-zinc-900 transition hover:bg-backgroundLight hover:brightness-125 dark:bg-backgroundDark dark:text-zinc-50 dark:hover:bg-backgroundDark">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span>Toggle theme</span>
        </Button>
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
                }, 200);
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
