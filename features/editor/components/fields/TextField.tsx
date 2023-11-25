"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip } from "components/Tooltip";
import { FormLabel } from "components/styled-ui/FormLabel";
import { Input } from "components/styled-ui/Input";
import { SelectItem } from "components/styled-ui/SelectItem";
import { SelectTrigger } from "components/styled-ui/SelectTrigger";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "components/ui/form";
import { Input as ShadcnInput } from "components/ui/input";
import { Label } from "components/ui/label";
import { Select, SelectContent, SelectValue } from "components/ui/select";
import { useEditorStore } from "features/editor/hooks/useEditorStore";
import {
  ElementsType,
  FormElement,
  FormElementInstance
} from "features/editor/types";
import { Text } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const type: ElementsType = "TextField";

export const textFieldAttributes = {
  label: "Text field",
  helperText: "",
  required: false,
  placeholder: "Value here...."
};

export type TextFieldElement = FormElementInstance<typeof textFieldAttributes>;

export const TextFieldElement: FormElement = {
  type,
  construct: (id: string, name: string) => ({
    id,
    type,
    alias: name,
    extraAttributes: textFieldAttributes
  }),
  editorComponent: TextFieldEditor,
  formComponent: TextFieldForm,
  propertiesComponent: TextFieldProperties,
  designerButton: {
    icon: <Text className="h-5 w-5 cursor-grab text-primary" />,
    label: "Text Field"
  }
};

type Props = {
  element: FormElementInstance;
  isOverlay?: boolean;
};

function TextFieldForm({ element }: Omit<Props, "isOverlay">) {
  const elementInstance = element as TextFieldElement;

  const { label, required, placeholder, helperText } =
    elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-white outline-0 ring-0 selection:bg-blue-300 selection:text-zinc-950 focus-visible:outline-none">
      <div>
        <Label className="text-zinc-950">
          {label}
          {required && " *"}
        </Label>
        <ShadcnInput
          placeholder={placeholder}
          name={label}
          className="border-zinc-300 bg-zinc-50 text-zinc-950 outline-0 ring-0 placeholder:text-zinc-400 focus-visible:ring-blue-400 focus-visible:ring-offset-0 dark:focus-visible:ring-blue-400"
        />
        {helperText && (
          <p className="mt-1 text-[0.8rem] text-zinc-600">{helperText}</p>
        )}
      </div>
    </div>
  );
}

/** Text field component displayed in the editor. */
export function TextFieldEditor({ element }: Omit<Props, "isOverlay">) {
  const elementInstance = element as TextFieldElement;

  const { label, required, placeholder, helperText } =
    elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-white outline-0 ring-0 focus-visible:outline-none">
      <div>
        <Label className="text-zinc-950">
          {label}
          {required && " *"}
        </Label>
        <ShadcnInput
          readOnly
          placeholder={placeholder}
          className="pointer-events-none cursor-default border-zinc-300 bg-zinc-50 placeholder:text-zinc-400"
        />
        {helperText && (
          <p className="mt-1 text-[0.8rem] text-zinc-600">{helperText}</p>
        )}
      </div>
    </div>
  );
}

const propertiesSchema = z.object({
  name: z.string(),
  label: z.string().max(200),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50)
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

/**
 * Form to handle the properties of a text field.
 */
export function TextFieldProperties() {
  const [activeElement, updateElement] = useEditorStore(state => [
    state.activeElement,
    state.updateElement
  ]);
  const element = activeElement as TextFieldElement;

  const form = useForm<PropertiesSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: "onChange",
    defaultValues: {
      name: element.alias,
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeholder: element.extraAttributes.placeholder
    },
    values: {
      name: element.alias,
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
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0 rounded-sm p-0">
              <Tooltip message="The label of the field. It will be displayed above the field">
                <FormLabel>Name</FormLabel>
              </Tooltip>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0 rounded-sm p-0">
              <Tooltip message="The label of the field. It will be displayed above the field">
                <FormLabel>Label</FormLabel>
              </Tooltip>
              <FormControl>
                <Input {...field} />
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
              <Tooltip message="The placeholder is the text in the input that will be displayed if the user hasn't typed anything.">
                <FormLabel>Placeholder</FormLabel>
              </Tooltip>
              <FormControl>
                <Input {...field} />
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
              <Tooltip message="Any helpful text for the user that will be below the text field.">
                <FormLabel>Helper Text</FormLabel>
              </Tooltip>
              <FormControl>
                <Input {...field} />
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
              <Tooltip message="Choose whether this text field should be required or not.">
                <FormLabel>Required</FormLabel>
              </Tooltip>
              <Select
                onValueChange={value => {
                  const isTrue = value === "true";
                  return field.onChange(isTrue);
                }}
                value={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
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
                <SelectContent className="selector dark:bg-zinc-800">
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
