import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "components/ui/table";
import { Content, Form, FormSubmission } from "database/schema";

type Props = {
  form: Form;
  formSubmissions: FormSubmission[];
};

/**
 * Table that displays the submissions for a form. Can control the number of
 * items displayed and other filters.
 */
export const SubmissionsTable = ({ form, formSubmissions }: Props) => {
  const content = JSON.parse(form.content || "") as Content;
  const formFields = content.formFields;

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Submissions</h2>
        <p className="rounded-sm bg-zinc-200 p-2 py-1 text-sm font-semibold dark:bg-zinc-800">
          Total Submissions:
          <span className="ml-2 inline-block text-right text-brandColour">
            {formSubmissions.length}
          </span>
        </p>
      </div>
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
  );
};
