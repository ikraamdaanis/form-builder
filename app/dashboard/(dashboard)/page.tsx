import { RedirectToSignIn, currentUser } from "@clerk/nextjs";
import { Button } from "components/ui/button";
import { Separator } from "components/ui/separator";
import { FormCardLoader } from "features/forms/components/FormCard";
import { FormsContainer } from "features/forms/components/FormsContainer";
import { StatsCards } from "features/stats/components/StatsCards";
import { StatsCardsWrapper } from "features/stats/components/StatsCardsWrapper";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const dashboardLink = "/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Ignition"
};

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-screen-2xl flex-col">
      <Suspense fallback={<StatsCards loading={true} />}>
        <StatsCardsWrapper />
      </Suspense>
      <Separator className="my-4" />
      <div className="flex items-center justify-between px-4">
        <h2 className="text-4xl font-bold">Recent Forms</h2>
        <Link href="/dashboard/forms">
          <Button className="h-8 font-semibold">View all Forms</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={[1, 2, 3, 4].map(el => (
            <FormCardLoader key={el} />
          ))}
        >
          <FormsContainer />
        </Suspense>
      </div>
    </div>
  );
}
