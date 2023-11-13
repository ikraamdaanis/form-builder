import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectValue } from "components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "components/ui/form";
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

const propertiesSchema = z.object({
  text: z.string().max(200),
  size: z.string().max(200),
  weight: z.string()
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

/**
 * Form to handle the properties of a heading.
 */
export const HeadingProperties = () => {
  const [activeElement, updateElement] = useEditorStore(state => [
    state.activeElement,
    state.updateElement
  ]);
  const element = activeElement as HeadingElement;

  const form = useForm<PropertiesSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: "onChange",
    defaultValues: {
      text: element.extraAttributes.text,
      size: element.extraAttributes.size,
      weight: element.extraAttributes.weight
    },
    values: {
      text: element.extraAttributes.text,
      size: element.extraAttributes.size,
      weight: element.extraAttributes.weight
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
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
                <AttributeLabelTooltip message="The text of the heading.">
                  <AttributeLabel>Text</AttributeLabel>
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
          name="size"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
                <AttributeLabelTooltip message="How big the heading should be.">
                  <AttributeLabel>Size</AttributeLabel>
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
          name="weight"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 space-y-0 rounded-sm p-0">
              <AttributeLabelTooltip message="The weight of the font.">
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
      </form>
    </Form>
  );
};
