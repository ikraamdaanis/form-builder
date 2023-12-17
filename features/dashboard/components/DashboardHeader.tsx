import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { PublishFormButton } from "features/dashboard/components/PublishFormButton";
import { fetchForm } from "features/forms/actions/fetchForm";
import { BookCheck, Brush } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cn } from "utils/cn";

type Props = {
  formId: string;
};

/**
 * Header for an individual form. Contains links to the editor and to view
 * form submissions and also displays recent submissions.
 */
export const DashboardHeader = async ({ formId }: Props) => {
  const form = await fetchForm(formId);

  if (!form) {
    return redirect("/not-found");
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex cursor-default items-center">
        <h1 className="flex items-center text-2xl font-bold">{form.name} </h1>
        <Badge
          className={cn(
            "ml-4 text-white transition hover:brightness-110",
            form.published
              ? "bg-green-500 hover:bg-green-500"
              : "bg-zinc-600 hover:bg-zinc-600"
          )}
        >
          {form.published ? "Live" : "Unpublished"}
        </Badge>
        <Link
          href={`/forms/${form.id}`}
          target="_blank"
          className="ml-2 text-sm text-blue-500"
        >
          {process.env.NEXT_PUBLIC_VERCEL_URL}/forms/{form.id}
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link href={`/editor/${form.id}`}>
          <Button className="h-8 gap-2 rounded-sm border border-zinc-300 bg-brandColour px-2 text-xs font-semibold text-white transition hover:bg-brandColour hover:brightness-110 dark:border-zinc-700">
            <Brush className="h-4 w-4" /> Form Editor
          </Button>
        </Link>
        <PublishFormButton form={form} />
      </div>
    </div>
  );
};

/** Loading for the dashboard header. */
export const DashboardHeaderLoader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex cursor-default items-center">
        <div className="h-8 w-[200px] animate-pulse rounded-sm bg-zinc-300 dark:bg-zinc-800" />
      </div>
      <div className="flex items-center gap-2">
        <Button
          className="h-8 gap-2 rounded-sm border border-zinc-300 bg-brandColour px-2 text-xs font-semibold text-white transition hover:bg-brandColour hover:brightness-110 dark:border-zinc-700"
          disabled
        >
          <Brush className="h-4 w-4" /> Form Editor
        </Button>
        <Button
          className={cn(
            "h-8 gap-2 rounded-sm border border-zinc-300 bg-blue-500 px-2 text-xs font-semibold text-white transition hover:bg-blue-500 hover:brightness-110 dark:border-zinc-700"
          )}
          disabled
        >
          <BookCheck className=" h-4 w-4" />
          Publish
        </Button>
      </div>
    </div>
  );
};
