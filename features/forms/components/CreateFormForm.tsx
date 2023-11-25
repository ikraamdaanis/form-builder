"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "components/styled-ui/Input";
import { Textarea } from "components/styled-ui/TextArea";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "components/ui/form";
import { toast } from "components/ui/use-toast";
import { createForm } from "features/forms/actions/createForm";
import { CreateFormSchema, createFormSchema } from "features/forms/types";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
  closeModal: () => void;
};

/**
 * Form to create a form which then redirects to the form editor so the admin
 * can start visually editing the form.
 */
export const CreateFormForm = ({ closeModal }: Props) => {
  const router = useRouter();

  const form = useForm<CreateFormSchema>({
    resolver: zodResolver(createFormSchema),
    values: {
      name: "",
      description: ""
    }
  });

  async function onSubmit(values: CreateFormSchema) {
    try {
      const formId = await createForm(values);

      toast({
        title: "Success",
        description: "Form created successfully"
      });

      console.log(formId);

      closeModal();
      router.refresh();
    } catch (error) {
      const errorMessage = error as Error;

      console.error("Error creating the form: ", errorMessage.message);

      toast({
        title: "Error",
        description: errorMessage.message.includes("forms_user_id_name_unique")
          ? `You already have a form with the name ${values.name}.`
          : "Something went wrong, please try again later",
        variant: "destructive"
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={5} className="max-h-[200px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          onClick={form.handleSubmit(onSubmit)}
          disabled={form.formState.isSubmitting}
          className="mt-4 w-full bg-brandColour transition hover:bg-brandColour hover:brightness-110"
        >
          {!form.formState.isSubmitting && <span>Save</span>}
          {form.formState.isSubmitting && <Loader className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};
