"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormLabel } from "components/styled-ui/FormLabel";
import { Input } from "components/styled-ui/Input";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "components/ui/form";
import { toast } from "components/ui/use-toast";
import { Form as FormType } from "database/schema";
import { updateForm } from "features/editor/actions/updateForm";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { z } from "zod";

export const updateFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string()
});

export type UpdateFormSchema = z.infer<typeof updateFormSchema>;

type Props = {
  form: FormType;
};

/**
 * Form to update the values of a form such as the name and description.
 */
export const FormSettings = ({ form }: Props) => {
  const router = useRouter();

  const values: Partial<UpdateFormSchema> = {
    id: form.id,
    name: form.name,
    description: form.description || ""
  };

  const formRef = useForm<UpdateFormSchema>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: values
  });

  async function handleSubmit(values: UpdateFormSchema) {
    toast({
      title: "Updating",
      description: "Updating the form..."
    });

    try {
      await updateForm({ ...values, updatedAt: new Date() });

      toast({
        title: "Success",
        description: "Form successfully updated."
      });

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
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>
      <Form {...formRef}>
        <form
          onSubmit={formRef.handleSubmit(handleSubmit)}
          className="flex w-full flex-col items-start gap-4"
        >
          <FormField
            control={formRef.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2 space-y-0">
                <FormLabel>Form name</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formRef.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2 space-y-0">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-8 bg-brandColour text-xs font-semibold text-white transition hover:bg-brandColour hover:brightness-110"
          >
            Save Settings
          </Button>
          <small className="text-xs text-zinc-400">
            Last updated at:{" "}
            {dayjs(form.updatedAt).format("HH:mm dddd DD MMMM YYYY")}
          </small>
        </form>
      </Form>
    </div>
  );
};
