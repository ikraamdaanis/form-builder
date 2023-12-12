"use client";

import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "components/ui/table";
import { Content, Form, FormSubmission } from "database/schema";
import { PublishFormButton } from "features/dashboard/components/PublishFormButton";
import { useEditorLinks } from "features/editor/hooks/useEditorLinks";
import { Brush } from "lucide-react";
import Link from "next/link";
import { cn } from "utils/cn";

type Props = {
  form: Form;
  formSubmissions: FormSubmission[];
};

/**
 * Dashboard for an individual form. Contains links to the editor and to view
 * form submissions and also displays recent submissions.
 */
export const FormDashboard = ({ form, formSubmissions }: Props) => {
  const { editorLink } = useEditorLinks();

  const content = JSON.parse(form.content || "") as Content;
  const formFields = content.formFields;

  return (
    <div className="mx-auto flex min-h-full w-full flex-col">
      <div className="flex items-center justify-between p-4">
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
          <Link href={`${editorLink}/${form.id}`}>
            <Button className="h-8 gap-2 rounded-sm border border-zinc-300 bg-brandColour px-2 text-xs font-semibold text-white transition hover:bg-brandColour hover:brightness-110 dark:border-zinc-700">
              <Brush className="h-4 w-4" /> Form Editor
            </Button>
          </Link>
          <PublishFormButton form={form} />
        </div>
      </div>
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Recent Submissions</h2>
        <div className="border-borderLight dark:border-borderDark overflow-hidden rounded-sm border">
          <Table>
            <TableHeader>
              <TableRow className="border-borderLight dark:border-borderDark hover:bg-backgroundLight dark:hover:bg-backgroundDark">
                <TableHead className="w-10">ID</TableHead>
                {formFields?.map(field => {
                  return <TableHead key={field}>{field}</TableHead>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {formSubmissions.map(submission => {
                const fields = JSON.parse(submission.content || "");

                return (
                  <TableRow
                    key={submission.id}
                    className="border-borderLight dark:border-borderDark hover:bg-backgroundLight dark:hover:bg-backgroundDark"
                  >
                    <TableCell>{submission.id.slice(0, 4)}</TableCell>
                    {formFields?.map(field => {
                      const fieldData = fields?.[field];

                      return <TableCell key={field}>{fieldData}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
