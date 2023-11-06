"use client";

import { ElementsType, FormElement } from "features/types";
import { Text } from "lucide-react";

const type: ElementsType = "TextField";

export const TextFieldElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper Text",
      required: false,
      placeholder: "Value here...."
    }
  }),
  designerComponent: () => <div>Designer</div>,
  formComponent: () => <div>Form</div>,
  propertiesComponent: () => <div>Properties</div>,
  designerButton: {
    icon: <Text className="h-5 w-5 cursor-grab text-primary" />,
    label: "Text Field"
  }
};
