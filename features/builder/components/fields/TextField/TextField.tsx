"use client";

import { EditorComponent } from "features/builder/components/fields/TextField/TextFieldEditor";
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
  editorComponent: EditorComponent,
  formComponent: () => <div>Form</div>,
  propertiesComponent: () => <div>Properties</div>,
  designerButton: {
    icon: <Text className="h-5 w-5 cursor-grab text-primary" />,
    label: "Text Field"
  }
};
