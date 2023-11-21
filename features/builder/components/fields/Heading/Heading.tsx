"use client";

import { HeadingProperties } from "features/builder/components/fields/Heading/HeadingProperties";
import { ElementsType, FormElement, FormElementInstance } from "features/types";
import { Heading } from "lucide-react";

const type: ElementsType = "Heading";

export const fontWeights = ["300", "400", "500", "600", "700"] as const;

export const headingAttributes = {
  content: "Heading",
  fontSize: "16px",
  fontWeight: "400",
  lineHeight: "1.5",
  padding: "0px 0px 0px 0px"
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
  formComponent: HeadingPreview,
  propertiesComponent: HeadingProperties,
  designerButton: {
    icon: <Heading className="h-5 w-5 cursor-grab text-primary" />,
    label: "Heading"
  }
};

type Props = {
  element: FormElementInstance;
  isOverlay?: boolean;
};

/** Heading component displayed in the editor. */
function HeadingEditor({ element }: Props) {
  const elementInstance = element as HeadingElement;

  const {
    content,
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    padding
  } = elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-white text-zinc-950 outline-0 ring-0 focus-visible:outline-none">
      <h1
        style={{
          fontSize: `${size || "16px"}`,
          fontWeight: `${weight || "400"}`,
          lineHeight: `${lineHeight || "1.5"}`,
          padding: `${padding || "0px 0px 0px 0px"}`
        }}
      >
        {content}
      </h1>
    </div>
  );
}

/** Heading component displayed in the editor. */
function HeadingPreview({ element }: Props) {
  const elementInstance = element as HeadingElement;

  const {
    content,
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    padding
  } = elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-white text-zinc-950 outline-0 ring-0 selection:bg-blue-300 focus-visible:outline-none">
      <h1
        style={{
          fontSize: `${size || "16px"}`,
          fontWeight: `${weight || "400"}`,
          lineHeight: `${lineHeight || "1.5"}`,
          padding: `${padding || "0px 0px 0px 0px"}`
        }}
      >
        {content}
      </h1>
    </div>
  );
}
