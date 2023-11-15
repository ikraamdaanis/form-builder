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

/** Toggler for light/dark themes. */
export const ThemeToggler = () => {
  const { theme: currentTheme, setTheme, themes } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 dark:border-0 dark:bg-zinc-700"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
                "font-medium capitalize",
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
