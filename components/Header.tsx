import { UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "components/ThemeToggler";

/** Header for the application */
export const Header = () => {
  return (
    <header className="fixed top-0 h-16 w-full border-b border-b-zinc-300 bg-primary bg-white dark:border-b-zinc-600 dark:bg-zinc-800">
      <nav className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between">
        <h1 className="text-lg font-semibold text-black dark:text-white">
          Form Builder
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggler />
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </header>
  );
};
