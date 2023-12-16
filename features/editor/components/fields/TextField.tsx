"use client";

import { Input } from "components/styled-ui/Input";
import { SelectItem } from "components/styled-ui/SelectItem";
import { SelectTrigger } from "components/styled-ui/SelectTrigger";
import { Input as ShadcnInput } from "components/ui/input";
import { Label } from "components/ui/label";
import { Select, SelectContent, SelectValue } from "components/ui/select";
import {
  AttributeField,
  AttributeTooltip
} from "features/editor/components/AttributeComponents";
import { useEditorStore } from "features/editor/hooks/useEditorStore";
import {
  ElementsType,
  FormElement,
  FormElementInstance
} from "features/editor/types";
import { Text } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

const type: ElementsType = "TextField";

export const textFieldAttributes = {
  fieldName: `TextField_${crypto.randomUUID().slice(0, 4)}`,
  label: "Text Field",
  helperText: "",
  required: false,
  placeholder: "Value here...."
};

type PropertiesSchema = typeof textFieldAttributes;

export type TextFieldElement = FormElementInstance<PropertiesSchema>;

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

  const { label, required, placeholder, helperText, fieldName } =
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
          name={fieldName}
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

/**
 * Form to handle the properties of a text field.
 */
export function TextFieldProperties() {
  const { activeElement, updateElement, elements } = useEditorStore(
    useShallow(state => ({
      activeElement: state.activeElement,
      updateElement: state.updateElement,
      elements: state.elements
    }))
  );

  const element = elements.find(
    element => element.id === activeElement?.id
  ) as TextFieldElement;

  const values = {
    alias: element.alias,
    fieldName: element.extraAttributes.fieldName,
    label: element.extraAttributes.label,
    helperText: element.extraAttributes.helperText,
    required: element.extraAttributes.required,
    placeholder: element.extraAttributes.placeholder
  };

  function applyChanges({
    alias,
    ...values
  }: Partial<PropertiesSchema> & { alias?: string }) {
    updateElement(element.id, {
      ...element,
      alias: alias || element.alias,
      extraAttributes: { ...element.extraAttributes, ...values }
    });
  }

  return (
    <div className="mt-2 flex flex-col gap-4">
      <h2 className="text-sm font-semibold">{values.alias} Properties</h2>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="Enter a custom alias for this element as it will be displayed within the editor interface."
          label="Alias"
          htmlFor="alias"
        />
        <Input
          value={values.alias}
          id="alias"
          name="alias"
          onChange={({ target: { value } }) => {
            applyChanges({ alias: value });
          }}
          onBlur={({ target: { value } }) => {
            if (!value.length) {
              applyChanges({ alias: activeElement?.alias });
            }
          }}
        />
      </AttributeField>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="Enter a unique field name to identify this form element. This name will be used as a column header in the submissions table, helping you organize and analyze the collected data."
          label="Field Name"
          htmlFor="fieldName"
        />
        <Input
          value={values.fieldName}
          id="fieldName"
          name="fieldName"
          onChange={({ target: { value } }) => {
            applyChanges({ fieldName: value });
          }}
          onBlur={({ target: { value } }) => {
            if (!value.length) {
              applyChanges({ fieldName: textFieldAttributes?.fieldName });
            }
          }}
        />
      </AttributeField>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="Enter a label for this input field. It will be displayed above the field"
          label="Label"
          htmlFor="label"
        />
        <Input
          value={values.label}
          id="label"
          name="label"
          onChange={({ target: { value } }) => {
            applyChanges({ label: value });
          }}
          onBlur={({ target: { value } }) => {
            if (!value.length) {
              applyChanges({ label: textFieldAttributes?.label });
            }
          }}
        />
      </AttributeField>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="The placeholder is the text in the input that will be displayed if the user hasn't typed anything."
          label="Placeholder"
          htmlFor="placeholder"
        />
        <Input
          value={values.placeholder}
          id="placeholder"
          name="placeholder"
          onChange={({ target: { value } }) => {
            applyChanges({ placeholder: value });
          }}
          onBlur={({ target: { value } }) => {
            if (!value.length) {
              applyChanges({ placeholder: textFieldAttributes?.placeholder });
            }
          }}
        />
      </AttributeField>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="Enter any helpful text for the user that will be below the text field."
          label="Helper Text"
          htmlFor="helperText"
        />
        <Input
          value={values.helperText}
          id="helperText"
          name="helperText"
          onChange={({ target: { value } }) => {
            applyChanges({ helperText: value });
          }}
          onBlur={({ target: { value } }) => {
            if (!value.length) {
              applyChanges({ helperText: textFieldAttributes?.helperText });
            }
          }}
        />
      </AttributeField>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="Choose whether this text field should be required or not."
          label="Required"
          htmlFor="required"
        />

        <Select
          onValueChange={value => {
            const isTrue = value === "true";
            applyChanges({ required: isTrue });
          }}
          value={String(values.required)}
        >
          <SelectTrigger>
            <SelectValue
              onChange={({ target }) => {
                const isTrue = (target as HTMLSelectElement).value === "true";

                applyChanges({ required: isTrue });
              }}
            />
          </SelectTrigger>
          <SelectContent className="selector dark:bg-zinc-800">
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </AttributeField>
    </div>
  );
}
