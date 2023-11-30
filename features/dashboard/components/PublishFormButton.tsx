import { Button } from "components/ui/button";
import { toast } from "components/ui/use-toast";
import { Form } from "database/schema";
import { updateForm } from "features/forms/actions/updateForm";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { cn } from "utils/cn";

type Props = {
  form: Form;
};

/** Button for toggling whether a form is published or not. */
export const PublishFormButton = ({ form }: Props) => {
  const router = useRouter();
  const [loading, startTransition] = useTransition();

  const isPublished = form.published;

  async function handleClick() {
    startTransition(async () => {
      try {
        toast({
          title: `${isPublished ? "Unpublishing" : "Publishing"} form...`
        });
        await updateForm({
          id: form.id,
          published: !form.published,
          updatedAt: new Date()
        });

        toast({
          title: `Form ${isPublished ? "unpublished" : "published"}`
        });

        router.refresh();
      } catch (error) {
        toast({
          title: "Something went wrong",
          variant: "destructive"
        });
      }
    });
  }

  return (
    <Button
      className={cn(
        "h-8 bg-blue-500 font-semibold text-white transition hover:bg-blue-500 hover:brightness-110",
        isPublished && "bg-zinc-800 hover:bg-zinc-500"
      )}
      disabled={loading}
      onClick={handleClick}
    >
      {isPublished ? "Unpublish" : "Publish"}
    </Button>
  );
};
