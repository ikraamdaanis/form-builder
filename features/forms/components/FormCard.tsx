import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";
import { Form } from "database/schema";
import { ArrowRight, Edit } from "lucide-react";
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
    <div className="flex h-full">
      <Card className="flex flex-1 flex-col bg-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <span className="truncate font-bold">{form.name}</span>
            <Badge
              variant={!form.published ? "destructive" : "default"}
              className="cursor-default"
            >
              {!form.published ? "Draft" : "Published"}
            </Badge>
          </CardTitle>
          <CardDescription className="flex items-center justify-between text-sm text-muted-foreground">
            {form.published && (
              <span className="flex items-center gap-2">
                <ArrowRight className="text-muted-foreground" />
                <span>{form.visits.toLocaleString()}</span>
                <ArrowRight className="text-muted-foreground" />
                <span>{form.submissions.toLocaleString()}</span>
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
          {form.description || "No description"}
        </CardContent>
        <CardFooter className="mt-auto justify-self-end">
          {form.published && (
            <Button asChild className="text-md mt-2 w-full gap-4">
              <Link href={`/forms/${form.id}`}>
                View submissions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {!form.published && (
            <Button
              asChild
              variant="secondary"
              className="text-md mt-2 w-full gap-4 bg-zinc-900 hover:bg-zinc-900 hover:brightness-110"
            >
              <Link href={`/builder/${form.id}`}>
                Edit form <Edit className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

/**
 * A component that displays a loading skeleton while waiting for form data.
 */
export const FormCardLoader = () => {
  return <Skeleton className="border-primary-/20 h-[148px] w-full border-2" />;
};
