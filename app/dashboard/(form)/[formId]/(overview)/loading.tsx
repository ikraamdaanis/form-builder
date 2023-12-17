import { DashboardHeaderLoader } from "features/dashboard/components/DashboardHeader";
import { SubmissionsTableLoader } from "features/submissions/components/SubmissionsTable";

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-full w-full max-w-screen-2xl flex-col gap-4 p-4">
      <DashboardHeaderLoader />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Submissions</h2>
        </div>
        <SubmissionsTableLoader />
      </div>
    </div>
  );
}
