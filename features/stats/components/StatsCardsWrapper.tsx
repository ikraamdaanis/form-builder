import { getFormStats } from "actions/forms";
import { StatsCards } from "features/stats/components/StatsCards";

/**
 * Asynchronous server components that fetches form statistics and renders the
 * `StatsCards` component.
 */
export const StatsCardsWrapper = async () => {
  const stats = await getFormStats();

  return <StatsCards loading={false} data={stats} />;
};
