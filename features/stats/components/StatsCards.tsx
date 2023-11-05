import { getFormStats } from "features/stats/actions/getFormStats";
import { StatsCard } from "features/stats/components/StatsCard";
import { PiIcon } from "lucide-react";

type Props = {
  data?: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
};

/**
 * A component that displays statistics about forms, such as total visits
 * submissions, submission rate, and bounce rate.
 */
export const StatsCards = ({ data, loading }: Props) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<PiIcon className="text-blue-600" />}
        helperText="All time form visits"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
      />
      <StatsCard
        title="Total submissions"
        icon={<PiIcon className="text-yellow-600" />}
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
      />
      <StatsCard
        title="Submission rate"
        icon={<PiIcon className="text-green-600" />}
        helperText="Visits that result in form submission"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
      />
      <StatsCard
        title="Bounce rate"
        icon={<PiIcon className="text-red-600" />}
        helperText="Visits that leaves without interacting"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
      />
    </div>
  );
};
