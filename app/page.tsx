import { UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "components/ThemeToggler";

const HomePage = async () => {
  return (
    <div className="flex min-h-full flex-col">
      Home
      <ThemeToggler />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default HomePage;
