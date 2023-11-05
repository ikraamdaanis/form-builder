import { Button } from "components/ui/button";
import { Loader, SaveIcon } from "lucide-react";
import { useTransition } from "react";

type Props = {
  formId: string;
};

export const SaveFormButton = ({ formId }: Props) => {
  const [loading] = useTransition();

  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => {}}
    >
      <SaveIcon className="h-4 w-4" />
      Save
      {loading && <Loader className="animate-spin" />}
    </Button>
  );
};
