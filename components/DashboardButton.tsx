import { Button } from "components/ui/button";
import Link from "next/link";

type Props = {
  customHref?: string;
};

/** Button that redirects to the dashboard. */
export const DashboardButton = ({ customHref }: Props) => {
  return (
    <Link href={customHref || "/dashboard"}>
      <Button className="h-8 bg-brandColour text-xs font-semibold text-white transition hover:bg-brandColour hover:brightness-110">
        Dashboard
      </Button>
    </Link>
  );
};
