import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form as FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "components/ui/form";
import { Content, Form } from "database/schema";
import { Input } from "components/styled-ui/Input";
import { FormLabel } from "components/styled-ui/FormLabel";
import { Tooltip } from "components/Tooltip";
import {
  formSettings,
  useEditorStore
} from "features/editor/hooks/useEditorStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

const propertiesSchema = z.object({
  maxWidth: z.string().max(200),
  gap: z.string().max(200)
});

type PropertiesSchema = z.infer<typeof propertiesSchema>;

type Props = {
  form: Form;
};

/**
 * Form to handle the properties of a form.
 */
export const FormProperties = ({ form }: Props) => {
  const formContent = JSON.parse(form.content || "") as Content;

  const { settings, updateSettings, hasLoaded } = useEditorStore(
    useShallow(state => ({
      settings: state.settings,
      updateSettings: state.updateSettings,
      hasLoaded: state.hasLoaded
    }))
  );

  const currentSettings = !hasLoaded ? formContent.settings : settings;

  const values = {
    maxWidth: currentSettings.maxWidth,
    gap: currentSettings.gap
  };

  const propertiesForm = useForm<PropertiesSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: "onChange",
    defaultValues: values,
    values
  });

  function applyChanges(values: PropertiesSchema) {
    updateSettings(prevSettings => ({ ...prevSettings, ...values }));
  }

  function updateField(fieldName: keyof typeof values, value: string) {
    updateSettings(prevSettings => ({
      ...prevSettings,
      [fieldName]: value
    }));
  }

  return (
    <FormProvider {...propertiesForm}>
      <h2 className="mb-2 text-sm font-semibold">Form Properties</h2>
      <form
        onChange={propertiesForm.handleSubmit(applyChanges)}
        onSubmit={e => {
          e.preventDefault();
        }}
        className="flex flex-col gap-4"
      >
        <FormField
          control={propertiesForm.control}
          name="maxWidth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
                <Tooltip message="The max-width CSS property sets the maximum width of the form.">
                  <FormLabel>Max Width</FormLabel>
                </Tooltip>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={({ target: { value } }) => {
                      if (!value.length) {
                        field.onChange(formSettings.maxWidth);
                        updateField("maxWidth", formSettings.maxWidth);
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
          control={propertiesForm.control}
          name="gap"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
                <Tooltip message="The gap CSS shorthand property sets the gaps between the elements.">
                  <FormLabel>Gap</FormLabel>
                </Tooltip>
                <FormControl>
                  <Input
                    {...field}
                    onBlur={({ target: { value } }) => {
                      if (!value.length) {
                        field.onChange(formSettings.gap);
                        updateField("gap", formSettings.gap);
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
    </FormProvider>
  );
};
