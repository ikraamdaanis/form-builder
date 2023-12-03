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
import { ArrowRight } from "lucide-react";
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
        <Card className="flex flex-1 flex-col gap-4 border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
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
            <CardDescription className="flex items-center justify-between p-0 text-sm text-muted-foreground">
              {form.published && (
                <span className="flex items-center gap-2">
                  <ArrowRight className="text-muted-foreground" />
                  <span>{form.views.toLocaleString()}</span>
                  <ArrowRight className="text-muted-foreground" />
                  <span>{form.submissions.toLocaleString()}</span>
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[20px] truncate p-0 text-sm text-muted-foreground">
            {form.description || "No description"}
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
