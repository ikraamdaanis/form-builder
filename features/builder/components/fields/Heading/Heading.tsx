"use client";

import { HeadingEditor } from "features/builder/components/fields/Heading/HeadingEditor";
import { ElementsType, FormElement, FormElementInstance } from "features/types";
import { Heading } from "lucide-react";

const type: ElementsType = "Heading";

export const headingAttributes = {
  text: "Heading"
};

export type HeadingElement = FormElementInstance<typeof headingAttributes>;

export const HeadingElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: headingAttributes
  }),
  editorComponent: HeadingEditor,
  propertiesComponent: () => <div>Properties</div>,
  formComponent: () => <div>Form</div>,
  designerButton: {
    icon: <Heading className="h-5 w-5 cursor-grab text-primary" />,
    label: "Heading"
  }
};
