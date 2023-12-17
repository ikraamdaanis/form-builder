import { useClerk, useUser } from "@clerk/nextjs";
import { ThemeToggler } from "components/ThemeToggler";
import { Button } from "components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { LogOut, Moon, Sun, User } from "lucide-react";
import Image from "next/image";
import { cn } from "utils/cn";

/**
 * Popover menu for the sidebar. Displays profile details such as name, email
 * and profile picture and allows the user to toggle the theme.
 */
export const SidebarMenu = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { openUserProfile, signOut } = useClerk();

  return (
    <Popover>
      <PopoverTrigger className="w-full rounded-md bg-backgroundLight p-2 outline-none transition hover:bg-backgroundLight hover:brightness-125 dark:bg-backgroundDark dark:hover:bg-backgroundDark">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-8 w-8 overflow-hidden rounded-lg border border-zinc-300 bg-zinc-400 p-0 transition hover:brightness-90 dark:border-zinc-700 dark:bg-zinc-700",
              !isSignedIn && "animate-pulse",
              isLoaded && !isSignedIn && "hidden"
            )}
          >
            {user?.imageUrl && (
              <Image
                src={user.imageUrl}
                alt="Profile image"
                height={36}
                width={36}
              />
            )}
          </div>
          <div className="flex flex-col items-start gap-0">
            <p className="text-sm">{user?.firstName}</p>
            <p className="text-xs text-zinc-400">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-2 flex flex-col bg-zinc-50 p-0 py-4 shadow-none dark:bg-backgroundDark">
        <Button
          className="flex w-full items-center justify-start gap-2 rounded-none bg-backgroundLight p-0 px-4 text-left text-zinc-900 transition hover:bg-backgroundLight hover:brightness-125 dark:bg-backgroundDark dark:text-zinc-50 dark:hover:bg-backgroundDark"
          onClick={() => openUserProfile()}
        >
          <User className="h-4 w-4" /> Manage Account
        </Button>
        <ThemeToggler
          trigger={
            <Button className="flex w-full items-center justify-start gap-2 rounded-none bg-backgroundLight p-0 px-4 text-left text-zinc-900 transition hover:bg-backgroundLight hover:brightness-125 dark:bg-backgroundDark dark:text-zinc-50 dark:hover:bg-backgroundDark">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>Toggle theme</span>
            </Button>
          }
        />
        <Button
          className="flex w-full items-center justify-start gap-2 rounded-none bg-backgroundLight p-0 px-4 text-left text-zinc-900 transition hover:bg-backgroundLight hover:brightness-125 dark:bg-backgroundDark dark:text-zinc-50 dark:hover:bg-backgroundDark"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};
