import { Separator } from "components/ui/separator";
import { CreateFormButton } from "features/forms/components/CreateFormButton";
import { StatsCards } from "features/stats/components/StatsCards";
import { StatsCardsWrapper } from "features/stats/components/StatsCardsWrapper";
import { Suspense } from "react";

const HomePage = async () => {
  return (
    <div className="flex min-h-full w-full flex-col bg-white pt-16 dark:bg-zinc-900">
      <Suspense fallback={<StatsCards loading={true} />}>
        <StatsCardsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="col-span-2 px-4 text-4xl font-bold">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateFormButton />
        {/* 
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense> */}
      </div>
    </div>
  );
};

export default HomePage;
