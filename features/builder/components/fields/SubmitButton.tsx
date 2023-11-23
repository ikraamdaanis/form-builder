"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@radix-ui/react-popover";
import { Tooltip } from "components/Tooltip";
import { FormLabel } from "components/styled-ui/FormLabel";
import { Input } from "components/styled-ui/Input";
import { SelectItem } from "components/styled-ui/SelectItem";
import { SelectTrigger } from "components/styled-ui/SelectTrigger";
import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "components/ui/form";
import { Select, SelectContent, SelectValue } from "components/ui/select";
import { Separator } from "components/ui/separator";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import {
  ElementsType,
  FontWeights,
  FormElement,
  FormElementInstance,
  fontWeights
} from "features/types";
import { Send } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

const type: ElementsType = "SubmitButton";

export const submitButtonAttributes = {
  background: "#000",
  content: "Submit",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0px 0px 0px 0px"
};

export type SubmitButtonElement = FormElementInstance<
  typeof submitButtonAttributes
> & { fontWeight: FontWeights };

export const SubmitButtonElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: submitButtonAttributes
  }),
  editorComponent: SubmitButtonEditor,
  formComponent: SubmitButtonPreview,
  propertiesComponent: SubmitButtonProperties,
  designerButton: {
    icon: <Send className="h-4 w-4 cursor-grab text-primary" />,
    label: "Submit Button"
  }
};

type Props = {
  element: FormElementInstance;
  isOverlay?: boolean;
};

/** Submit button component displayed in the editor. */
function SubmitButtonEditor({ element }: Props) {
  const elementInstance = element as SubmitButtonElement;

  const { background, content, fontSize, fontWeight, margin } =
    elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col bg-white" style={{ margin }}>
      <Button
        type="submit"
        style={{ background, color: "white", fontSize, fontWeight }}
      >
        {content}
      </Button>
    </div>
  );
}

/** Submit button component displayed in the editor. */
function SubmitButtonPreview({ element }: Props) {
  const elementInstance = element as SubmitButtonElement;

  const { background, content, fontSize, fontWeight, margin } =
    elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col bg-white" style={{ margin }}>
      <Button style={{ background, color: "white", fontSize, fontWeight }}>
        {content}
      </Button>
    </div>
  );
}

const propertiesSchema = z.object({
  background: z.string(),
  content: z.string().max(200),
  fontSize: z.string(),
  fontWeight: z.string(),
  margin: z.string()
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

/**
 * Form to handle the properties of a submit button.
 */
export function SubmitButtonProperties() {
  const { activeElement, updateElement } = useEditorStore(
    useShallow(state => ({
      activeElement: state.activeElement,
      updateElement: state.updateElement
    }))
  );

  const element = activeElement as SubmitButtonElement;

  const values = {
    background: element.extraAttributes.background,
    content: element.extraAttributes.content,
    fontSize: element.extraAttributes.fontSize,
    fontWeight: element.extraAttributes.fontWeight,
    margin: element.extraAttributes.margin
  };

  const form = useForm<PropertiesSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: "onChange",
    defaultValues: values,
    values
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
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
                <Tooltip message="Enter what text should be in the button">
                  <FormLabel>Content</FormLabel>
                </Tooltip>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="background"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
                <Tooltip message="Set the background colour for the button.">
                  <FormLabel>Background</FormLabel>
                </Tooltip>
                <FormControl>
                  <Popover
                    onOpenChange={() => {
                      form.handleSubmit(applyChanges);
                    }}
                  >
                    <PopoverTrigger asChild>
                      <div className="relative cursor-pointer">
                        <div
                          className="absolute left-[6px] top-1/2 h-6 w-10 -translate-y-1/2 rounded-sm"
                          style={{ background: field.value }}
                        />
                        <Input
                          readOnly
                          className="cursor-pointer pl-12"
                          {...field}
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="z-10 mr-[100%]">
                      <HexColorPicker
                        className="rounded-lg border border-zinc-300 dark:border-zinc-700"
                        color={field.value}
                        onChange={string => {
                          field.onChange(string);
                          applyChanges({
                            ...(activeElement?.extraAttributes as typeof submitButtonAttributes),
                            background: string
                          });
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fontSize"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
                <Tooltip message="The font-size CSS property sets the size of the font for the button. Changing the font size also updates the sizes of the font size-relative units, such as em, ex, and so forth.">
                  <FormLabel>Font Size</FormLabel>
                </Tooltip>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={({ target: { value } }) => {
                      if (!value.length) {
                        field.onChange(values.fontSize);
                      }
                    }}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fontWeight"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0 rounded-sm p-0">
              <Tooltip message="The font-weight CSS property sets the weight (or boldness) of the font.">
                <FormLabel>Font Weight</FormLabel>
              </Tooltip>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="selector dark:bg-zinc-800">
                  {fontWeights.map(weight => {
                    return (
                      <SelectItem value={weight} key={weight}>
                        {weight}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Separator className="bg-zinc-300 dark:bg-zinc-800" />
        <p className="text-sm font-semibold">Layout</p>
        <FormField
          control={form.control}
          name="margin"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
                <Tooltip message="The margin CSS shorthand property sets the margin area on all four sides of the button.">
                  <FormLabel>Margin</FormLabel>
                </Tooltip>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={({ target: { value } }) => {
                      if (!value.length) {
                        field.onChange(values.margin);
                      }
                    }}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
