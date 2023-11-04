import { getFormStats } from "actions/forms";

const HomePage = async () => {
  const stats = await getFormStats();

  console.log(stats);

  return (
    <div className="flex min-h-full w-full flex-col bg-white pt-16 dark:bg-zinc-900">
      {/* <StatsCard loading={false} data={stats} /> */}
    </div>
  );
};

export default HomePage;
