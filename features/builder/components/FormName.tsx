"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "components/styled-ui/Input";
import { Form, FormControl, FormField, FormItem } from "components/ui/form";
import { toast } from "components/ui/use-toast";
import { Form as FormType } from "database/schema";
import { updateForm } from "features/builder/actions/updateForm";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const updateNameSchema = z.object({
  id: z.string(),
  name: z.string(),
  updatedAt: z.date()
});

export type UpdateNameSchema = z.infer<typeof updateNameSchema>;

type Props = {
  form: FormType;
};

/**
 * Form to edit the form's name. The name is updated when the user clicks off
 * the form name input or if the form is submitted.
 */
export const FormName = ({ form }: Props) => {
  const router = useRouter();

  const values: UpdateNameSchema = {
    id: form.id,
    name: form.name,
    updatedAt: new Date()
  };

  const formRef = useForm<UpdateNameSchema>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: values
  });

  async function updateName(values: UpdateNameSchema) {
    if (values.name === form.name) return;

    const name = !values.name.length ? "United" : values.name;

    try {
      const formId = await updateForm({
        ...values,
        name
      });

      toast({
        title: "Success",
        description: `Form name updated to "${name}"`
      });

      console.log(formId);

      router.refresh();
    } catch (error) {
      const errorMessage = error as Error;

      console.error("Error updating the form name: ", errorMessage.message);

      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive"
      });
    }
  }

  return (
    <Form {...formRef}>
      <form
        onSubmit={formRef.handleSubmit(updateName)}
        className="flex items-center gap-2"
        onBlur={formRef.handleSubmit(updateName)}
      >
        <FormField
          control={formRef.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <Input
                  {...field}
                  className="relative top-[1px] h-8 w-[min-content] truncate rounded-none border-0 border-b-[1px] border-b-transparent bg-transparent pl-0 text-base font-medium outline-none focus-visible:border-b-blue-400 focus-visible:ring-0 dark:border-b-[1px] dark:border-b-transparent dark:bg-transparent dark:focus-visible:border-b-blue-500"
                  onBlur={({ target: { value } }) => {
                    if (!value.length) {
                      field.onChange("United");
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
