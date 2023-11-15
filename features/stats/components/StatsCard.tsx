import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";
import { ReactNode } from "react";
import { cn } from "utils/cn";

type Props = {
  title: string;
  value: string;
  helperText: string;
  className?: string;
  loading: boolean;
  icon: ReactNode;
};

/**
 * A reusable card component for displaying statistics, including a title,
 * numeric value, icon, helper text, and optional loading indicator.
 */
export function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className
}: Props) {
  return (
    <Card
      className={cn(
        "border border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-semibold text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="pt-1 text-sm font-medium text-muted-foreground">
          {helperText}
        </p>
      </CardContent>
    </Card>
  );
}
