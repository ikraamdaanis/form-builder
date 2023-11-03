import { Test } from "components/Test";

const HomePage = async () => {
  return (
    <div className="mt-32 flex min-h-full w-full flex-col bg-white dark:bg-zinc-900">
      Home
      <Test />
    </div>
  );
};

export default HomePage;
