import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from "components/ui/alert-dialog";
import { Button } from "components/ui/button";
import { BookPlus, Loader } from "lucide-react";
import { useTransition } from "react";

type Props = {
  formId: string;
};

export const PublishFormButton = ({ formId }: Props) => {
  const [loading] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="h-8 gap-2 border border-zinc-300 bg-blue-500 px-2 text-xs font-semibold text-white hover:bg-blue-600 dark:border-zinc-700">
          <BookPlus className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will not be able
            to edit this form. <br />
            <br />
            <span className="font-medium">
              By publishing this form you will make it available to the public
              and you will be able to collect submissions.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={e => {
              e.preventDefault();
              console.log(formId);
            }}
          >
            Proceed {loading && <Loader className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
