"use client";

import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
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
  formComponent: TextFieldPreview,
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

function TextFieldPreview({ element }: Omit<Props, "isOverlay">) {
  const elementInstance = element as TextFieldElement;

  const { label, required, placeholder, helperText } =
    elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-zinc-50 outline-0 ring-0 selection:bg-blue-300 selection:text-zinc-950 focus-visible:outline-none">
      <div>
        <Label className="text-zinc-950">
          {label}
          {required && "*"}
        </Label>
        <Input
          placeholder={placeholder}
          className="border-zinc-300 bg-zinc-50 text-zinc-950 outline-0 ring-0 placeholder:text-zinc-400 focus-visible:ring-blue-400 focus-visible:ring-offset-0 dark:focus-visible:ring-blue-400"
        />
        {helperText && (
          <p className="mt-1 text-[0.8rem] text-zinc-600">{helperText}</p>
        )}
      </div>
    </div>
  );
}
