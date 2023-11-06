"use client";

import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { ElementsType, FormElement, FormElementInstance } from "features/types";
import { Text } from "lucide-react";

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper Text",
  required: false,
  placeholder: "Value here...."
};

export const TextFieldElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes
  }),
  designerComponent: EditorComponent,
  formComponent: () => <div>Form</div>,
  propertiesComponent: () => <div>Properties</div>,
  designerButton: {
    icon: <Text className="h-5 w-5 cursor-grab text-primary" />,
    label: "Text Field"
  }
};

type CustomFormElementInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function EditorComponent({ element }: { element: FormElementInstance }) {
  const elementInstance = element as CustomFormElementInstance;
  const { label, required, placeholder, helperText } =
    elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && (
        <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
}
