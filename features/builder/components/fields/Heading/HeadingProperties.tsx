import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "components/ui/form";
import { Select, SelectContent, SelectValue } from "components/ui/select";
import { Separator } from "components/ui/separator";
import { AttributeInput } from "features/builder/components/attributes/AttributeInput";
import { AttributeLabel } from "features/builder/components/attributes/AttributeLabel";
import { AttributeLabelTooltip } from "features/builder/components/attributes/AttributeLabelTooltip";
import { AttributeSelectItem } from "features/builder/components/attributes/AttributeSelectItem";
import { AttributeSelectTrigger } from "features/builder/components/attributes/AttributeSelectTrigger";
import {
  HeadingElement,
  fontWeights
} from "features/builder/components/fields/Heading/Heading";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

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
export const HeadingProperties = () => {
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
                <AttributeLabelTooltip message="Enter what you want the heading to be.">
                  <AttributeLabel>Content</AttributeLabel>
                </AttributeLabelTooltip>
                <FormControl>
                  <AttributeInput {...field} />
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
                <AttributeLabelTooltip message="The font-size CSS property sets the size of the font for the heading. Changing the font size also updates the sizes of the font size-relative units, such as em, ex, and so forth.">
                  <AttributeLabel>Font Size</AttributeLabel>
                </AttributeLabelTooltip>
                <FormControl>
                  <AttributeInput
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
              <AttributeLabelTooltip message="The font-weight CSS property sets the weight (or boldness) of the font.">
                <AttributeLabel>Font Weight</AttributeLabel>
              </AttributeLabelTooltip>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <AttributeSelectTrigger>
                    <SelectValue />
                  </AttributeSelectTrigger>
                </FormControl>
                <SelectContent className="selector dark:bg-zinc-800">
                  {fontWeights.map(weight => {
                    return (
                      <AttributeSelectItem value={weight} key={weight}>
                        {weight}
                      </AttributeSelectItem>
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
                <AttributeLabelTooltip message="The line-height CSS property sets the height of the heading. It's commonly used to set the distance between lines of text.">
                  <AttributeLabel>Line Height</AttributeLabel>
                </AttributeLabelTooltip>
                <FormControl>
                  <AttributeInput
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
                <AttributeLabelTooltip message="Padding">
                  <AttributeLabel>Padding</AttributeLabel>
                </AttributeLabelTooltip>
                <FormControl>
                  <AttributeInput
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
};
