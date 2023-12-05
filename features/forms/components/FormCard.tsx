"use client";

import { Badge } from "components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";
import { Form } from "database/schema";
import Link from "next/link";

type Props = {
  form: Form;
};

/**
 * A component that displays information about a form, including its name,
 * status, description, and actions.
 */
export const FormCard = ({ form }: Props) => {
  return (
    <div className="flex h-full w-full">
      <Link href={`/dashboard/${form.id}`} className="w-full">
        <Card className="flex flex-1 flex-col gap-4 rounded-sm border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center justify-between gap-2 p-0">
              <span className="truncate font-bold">{form.name}</span>
              <Badge
                variant={!form.published ? "destructive" : "default"}
                className="cursor-default"
              >
                {!form.published ? "Draft" : "Published"}
              </Badge>
            </CardTitle>
            <CardDescription className="line-clamp-2 flex h-12 p-0 text-sm text-muted-foreground">
              {form.description || "No description"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[20px] truncate p-0 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span>
                Views:{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {form.views.toLocaleString()}
                </span>
              </span>
              <span>
                Submissions:{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  {form.submissions.toLocaleString()}
                </span>
              </span>
            </span>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

/**
 * A component that displays a loading skeleton while waiting for form data.
 */
export const FormCardLoader = () => {
  return <Skeleton className="border-primary-/20 h-[148px] w-full border-2" />;
};
