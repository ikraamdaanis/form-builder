import { useClerk, useUser } from "@clerk/nextjs";
import { Button } from "components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { LogOut, User } from "lucide-react";
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
      <PopoverTrigger className="bg-backgroundLight dark:bg-backgroundDark hover:bg-backgroundLight dark:hover:bg-backgroundDark w-full rounded-md p-2 outline-none transition hover:brightness-125">
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
      <PopoverContent className="dark:bg-backgroundDark ml-2 flex flex-col bg-zinc-50 p-0 py-4 shadow-none">
        <Button
          className="bg-backgroundLight dark:bg-backgroundDark hover:bg-backgroundLight dark:hover:bg-backgroundDark flex w-full items-center justify-start gap-2 rounded-none p-0 px-4 text-left text-zinc-900 transition hover:brightness-125 dark:text-zinc-50"
          onClick={() => openUserProfile()}
        >
          <User className="h-4 w-4" /> Manage Account
        </Button>
        <Button
          className="bg-backgroundLight dark:hover:bg-backgroundDark dark:bg-backgroundDark hover:bg-backgroundLight flex w-full items-center justify-start gap-2 rounded-none p-0 px-4 text-left text-zinc-900 transition hover:brightness-125 dark:text-zinc-50"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" /> Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};
