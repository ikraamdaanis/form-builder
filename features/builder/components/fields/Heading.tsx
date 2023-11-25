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
import { Select, SelectContent, SelectValue } from "components/ui/select";
import { Separator } from "components/ui/separator";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import {
  ElementsType,
  FontWeights,
  FormElement,
  FormElementInstance,
  fontWeights
} from "features/builder/types";
import { Heading } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

const type: ElementsType = "Heading";

export const headingAttributes = {
  content: "Heading",
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "1.5",
  padding: "0px 0px 0px 0px"
};

export type HeadingElement = FormElementInstance<typeof headingAttributes> & {
  weight: FontWeights;
};

export const HeadingElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: headingAttributes
  }),
  editorComponent: HeadingEditor,
  formComponent: HeadingPreview,
  propertiesComponent: HeadingProperties,
  designerButton: {
    icon: <Heading className="h-5 w-5 cursor-grab text-primary" />,
    label: "Heading"
  }
};

type Props = {
  element: FormElementInstance;
  isOverlay?: boolean;
};

/** Heading component displayed in the editor. */
function HeadingEditor({ element }: Props) {
  const elementInstance = element as HeadingElement;

  const {
    content,
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    padding
  } = elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-white text-zinc-950 outline-0 ring-0 focus-visible:outline-none">
      <h1
        style={{
          fontSize: `${size || "16px"}`,
          fontWeight: `${weight || "400"}`,
          lineHeight: `${lineHeight || "1.5"}`,
          padding: `${padding || "0px 0px 0px 0px"}`
        }}
      >
        {content}
      </h1>
    </div>
  );
}

/** Heading component displayed in the editor. */
function HeadingPreview({ element }: Props) {
  const elementInstance = element as HeadingElement;

  const {
    content,
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    padding
  } = elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-white text-zinc-950 outline-0 ring-0 selection:bg-blue-300 focus-visible:outline-none">
      <h1
        style={{
          fontSize: `${size || "16px"}`,
          fontWeight: `${weight || "400"}`,
          lineHeight: `${lineHeight || "1.5"}`,
          padding: `${padding || "0px 0px 0px 0px"}`
        }}
      >
        {content}
      </h1>
    </div>
  );
}

const propertiesSchema = z.object({
  content: z.string().max(200),
  fontSize: z.string(),
  fontWeight: z.string(),
  lineHeight: z.string(),
  padding: z.string()
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

/**
 * Form to handle the properties of a heading.
 */
export function HeadingProperties() {
  const { activeElement, updateElement } = useEditorStore(
    useShallow(state => ({
      activeElement: state.activeElement,
      updateElement: state.updateElement
    }))
  );

  const element = activeElement as HeadingElement;

  const values = {
    content: element.extraAttributes.content,
    fontSize: element.extraAttributes.fontSize,
    fontWeight: element.extraAttributes.fontWeight,
    lineHeight: element.extraAttributes.lineHeight,
    padding: element.extraAttributes.padding
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
                <Tooltip message="Enter what you want the heading to be.">
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
          name="fontSize"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
                <Tooltip message="The font-size CSS property sets the size of the font for the heading. Changing the font size also updates the sizes of the font size-relative units, such as em, ex, and so forth.">
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
        <FormField
          control={form.control}
          name="lineHeight"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
                <Tooltip message="The line-height CSS property sets the height of the heading. It's commonly used to set the distance between lines of text.">
                  <FormLabel>Line Height</FormLabel>
                </Tooltip>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={({ target: { value } }) => {
                      if (!value.length) {
                        field.onChange(values.lineHeight);
                      }
                    }}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="bg-zinc-300 dark:bg-zinc-800" />
        <p className="text-sm font-semibold">Layout</p>
        <FormField
          control={form.control}
          name="padding"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
                <Tooltip message="Padding">
                  <FormLabel>Padding</FormLabel>
                </Tooltip>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={({ target: { value } }) => {
                      if (!value.length) {
                        field.onChange(values.padding);
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
