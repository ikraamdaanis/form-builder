import { Button } from "components/ui/button";
import { FormUpdateSchema } from "database/schema";
import { updateForm } from "features/builder/actions/updateForm";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { Loader, SaveIcon } from "lucide-react";
import { useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

type Props = {
  formId: string;
};

/**
 * Button to save a form to the database.
 */
export const SaveFormButton = ({ formId }: Props) => {
  const [loading, startTransition] = useTransition();
  const { elements } = useEditorStore(
    useShallow(state => ({ elements: state.elements }))
  );

  async function handleFormButton() {
    try {
      const data: FormUpdateSchema = {
        id: formId,
        content: JSON.stringify(elements),
        updatedAt: new Date()
      };

      await updateForm(data);
    } catch (error) {
      console.error("Error updating the form: ", error);
    }
  }

  return (
    <Button
      variant="outline"
      className="h-10 gap-2 transition hover:brightness-90 dark:border-0 dark:bg-zinc-700"
      disabled={loading}
      onClick={() => startTransition(handleFormButton)}
    >
      <SaveIcon className="h-4 w-4" />
      Save
      {loading && <Loader className="animate-spin" />}
    </Button>
  );
};
