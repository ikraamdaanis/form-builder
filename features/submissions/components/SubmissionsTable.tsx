import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "components/ui/table";
import { Content } from "database/schema";
import { fetchForm } from "features/forms/actions/fetchForm";
import { fetchSubmissions } from "features/submissions/actions/fetchSubmissions";
import { redirect } from "next/navigation";

type Props = {
  formId: string;
  limit?: number;
};

/**
 * Table that displays the submissions for a form. Can control the number of
 * items displayed and other filters.
 */
export const SubmissionsTable = async ({ formId, limit }: Props) => {
  const form = await fetchForm(formId);

  if (!form) {
    return redirect("/not-found");
  }

  const formSubmissions = await fetchSubmissions(form.id, limit);

  const content = JSON.parse(form.content || "") as Content;
  const formFields = content.formFields;

  return (
    <div className="overflow-hidden rounded-sm border border-borderLight dark:border-borderDark">
      <Table>
        <TableHeader>
          <TableRow className="border-borderLight hover:bg-backgroundLight dark:border-borderDark dark:hover:bg-backgroundDark">
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
                className="border-borderLight hover:bg-backgroundLight dark:border-borderDark dark:hover:bg-backgroundDark"
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
  );
};

/**
 * Skeleton loader for the submissions table.
 */
export const SubmissionsTableLoader = () => {
  return (
    <div className="overflow-hidden rounded-sm border border-borderLight dark:border-borderDark">
      <Table>
        <TableHeader>
          <TableRow className="border-borderLight hover:bg-backgroundLight dark:border-borderDark dark:hover:bg-backgroundDark">
            <TableHead className="w-10">
              <div className="h-4 w-full animate-pulse rounded-sm bg-zinc-300 dark:bg-zinc-800" />
            </TableHead>
            {new Array(5).fill(crypto.randomUUID()).map(field => {
              return (
                <TableHead key={field}>
                  <div
                    className="h-4 animate-pulse rounded-sm bg-zinc-300 dark:bg-zinc-800"
                    style={{
                      width: `${Math.random() * 100}%`,
                      minWidth: "25%"
                    }}
                  />
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {new Array(10).fill(crypto.randomUUID()).map(field => {
            return (
              <TableRow key={field}>
                <TableCell key={field} className="w-16">
                  <div className="h-4 animate-pulse rounded-sm bg-zinc-300 dark:bg-zinc-800" />
                </TableCell>
                {new Array(5).fill(crypto.randomUUID()).map(field => {
                  return (
                    <TableCell key={field}>
                      <div
                        className="h-4 animate-pulse rounded-sm bg-zinc-300 dark:bg-zinc-800"
                        style={{
                          width: `${Math.random() * 100}%`,
                          minWidth: "25%"
                        }}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
