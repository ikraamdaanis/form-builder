/** Profile button for the user settings. */
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "utils/cn";

export const ProfileButton = (props: JSX.IntrinsicElements["div"]) => {
  const { isLoaded, isSignedIn } = useUser();
  return (
    <div
      className={cn(
        "h-10 w-10 overflow-hidden rounded-sm bg-zinc-400",
        !isSignedIn && "animate-pulse",
        isLoaded && !isSignedIn && "hidden"
      )}
      {...props}
    >
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
