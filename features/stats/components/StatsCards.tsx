import { getFormStats } from "features/stats/actions/getFormStats";
import { StatsCard } from "features/stats/components/StatsCard";
import { Eye, LogOut, Percent, Send } from "lucide-react";

type Props = {
  data?: Awaited<ReturnType<typeof getFormStats>>;
  loading: boolean;
};

/**
 * A component that displays statistics about forms, such as total views
 * submissions, submission rate, and bounce rate.
 */
export const StatsCards = ({ data, loading }: Props) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Views"
        icon={<Eye className="h-5 w-5 text-zinc-500" />}
        helperText="All time form views"
        value={data?.views.toLocaleString() || ""}
        loading={loading}
      />
      <StatsCard
        title="Total submissions"
        icon={<Send className="h-5 w-5 text-zinc-500" />}
        helperText="All time form submissions"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
      />
      <StatsCard
        title="Submission rate"
        icon={<Percent className="h-5 w-5 text-zinc-500" />}
        helperText="Views that result in form submission"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
      />
      <StatsCard
        title="Bounce rate"
        icon={<LogOut className="h-5 w-5 text-zinc-500" />}
        helperText="Views that leaves without interacting"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
      />
    </div>
  );
};
