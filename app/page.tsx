import { SignUp, UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "components/ThemeToggler";

const HomePage = async () => {
  return (
    <div className="flex min-h-full flex-col">
      Home
      <ThemeToggler />
      <UserButton afterSignOutUrl="/" />
      <SignUp />
    </div>
  );
};

export default HomePage;
