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
      <h2 className="mb-4 text-lg font-semibold">{form.name} Submissions</h2>
      <div className="overflow-hidden rounded-sm border border-zinc-300 dark:border-zinc-700">
        <Table>
          <TableHeader>
            <TableRow>
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
                <TableRow key={submission.id}>
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
