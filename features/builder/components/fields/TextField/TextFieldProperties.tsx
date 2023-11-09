import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "components/ui/form";
import { Input } from "components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "components/ui/tooltip";
import { TextFieldElement } from "features/builder/components/fields/TextField/TextField";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { useForm } from "react-hook-form";
import { z } from "zod";

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50)
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

/**
 * Form to handle the properties of a text field.
 */
export const TextFieldProperties = () => {
  const [activeElement, updateElement] = useEditorStore(state => [
    state.activeElement,
    state.updateElement
  ]);
  const element = activeElement as TextFieldElement;

  const form = useForm<PropertiesSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: "onChange",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder
    },
    values: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder
    }
  });

  function applyChanges(values: PropertiesSchema) {
    updateElement(element.id, {
      ...element,
      extraAttributes: { ...values }
    });
  }

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(applyChanges)}
        onSubmit={e => {
          e.preventDefault();
        }}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0 rounded-sm p-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormLabel className="w-20 cursor-pointer font-semibold opacity-90">
                      Label
                    </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px]">
                    <FormDescription>
                      The label of the field. It will be displayed above the
                      field
                    </FormDescription>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <FormControl>
                <Input
                  {...field}
                  className="ml-auto w-[200px] rounded-sm px-2 py-1 text-sm focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0 rounded-sm p-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormLabel className="w-20 cursor-pointer font-semibold opacity-90">
                      Placeholder
                    </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px]">
                    <FormDescription>
                      The placeholder is the text in the input that will be
                      displayed if the user hasn&#39;t typed anything.
                    </FormDescription>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <FormControl>
                <Input
                  {...field}
                  className="ml-auto w-[200px] rounded-sm px-2 py-1 text-sm focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0 rounded-sm p-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormLabel className="w-20 cursor-pointer font-semibold opacity-90">
                      Helper Text
                    </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px]">
                    <FormDescription>
                      Any helpful text for the user that will be below the text
                      field.
                    </FormDescription>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <FormControl>
                <Input
                  {...field}
                  className="ml-auto w-[200px] rounded-sm px-2 py-1 text-sm focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0 rounded-sm p-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FormLabel className="w-20 cursor-pointer font-semibold opacity-90">
                      Required
                    </FormLabel>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[200px]">
                    <FormDescription>
                      Choose whether this text field should be required or not.
                    </FormDescription>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Select
                onValueChange={value => {
                  const isTrue = value === "true";
                  return field.onChange(isTrue);
                }}
                value={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="ml-auto w-[200px] rounded-sm px-2 py-1 text-sm focus:ring-1 focus:ring-blue-300 focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:ring-offset-0">
                    <SelectValue
                      onChange={({ target }) => {
                        const isTrue =
                          (target as HTMLSelectElement).value === "true";
                        console.log(isTrue);

                        field.onChange(isTrue);
                      }}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="selector">
                  <SelectItem value="true" className="selector">
                    Yes
                  </SelectItem>
                  <SelectItem value="false" className="selector">
                    No
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
