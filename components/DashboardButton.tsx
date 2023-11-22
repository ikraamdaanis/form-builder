import { Button } from "components/ui/button";
import Link from "next/link";

/** Button that redirects to the dashboard. */
export const DashboardButton = () => {
  return (
    <Link href="/dashboard">
      <Button className="bg-brandColour hover:bg-brandColour h-8 text-xs font-semibold text-white transition hover:brightness-110">
        Dashboard
      </Button>
    </Link>
  );
};
