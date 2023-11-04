import { Test } from "components/Test";

const HomePage = async () => {
  return (
    <div className="flex min-h-full w-full flex-col bg-white pt-16 dark:bg-zinc-900">
      Home
      <Test />
    </div>
  );
};

export default HomePage;
