"use client";

import { HeadingEditor } from "features/builder/components/fields/Heading/HeadingEditor";
import { HeadingProperties } from "features/builder/components/fields/Heading/HeadingProperties";
import { ElementsType, FormElement, FormElementInstance } from "features/types";
import { Heading } from "lucide-react";

const type: ElementsType = "Heading";

export const fontWeights = ["300", "400", "500", "600", "700"] as const;

export const headingAttributes = {
  content: "Heading",
  size: "16px",
  weight: "400",
  lineHeight: "1.5"
};

export type HeadingElement = FormElementInstance<typeof headingAttributes> & {
  weight: typeof fontWeights;
};

export const HeadingElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: headingAttributes
  }),
  editorComponent: HeadingEditor,
  propertiesComponent: HeadingProperties,
  formComponent: () => <div>Form</div>,
  designerButton: {
    icon: <Heading className="h-5 w-5 cursor-grab text-primary" />,
    label: "Heading"
  }
};
