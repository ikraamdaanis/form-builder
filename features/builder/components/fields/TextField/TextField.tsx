"use client";

import { TextFieldEditor } from "features/builder/components/fields/TextField/TextFieldEditor";
import { TextFieldProperties } from "features/builder/components/fields/TextField/TextFieldProperties";
import { ElementsType, FormElement, FormElementInstance } from "features/types";
import { Text } from "lucide-react";

const type: ElementsType = "TextField";

export const textFieldAttributes = {
  label: "Text field",
  helperText: "Helper Text",
  required: false,
  placeholder: "Value here...."
};

export type TextFieldElement = FormElementInstance<typeof textFieldAttributes>;

export const TextFieldElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: textFieldAttributes
  }),
  editorComponent: TextFieldEditor,
  propertiesComponent: TextFieldProperties,
  formComponent: () => <div>Form</div>,
  designerButton: {
    icon: <Text className="h-5 w-5 cursor-grab text-primary" />,
    label: "Text Field"
  }
};
