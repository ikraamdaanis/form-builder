"use client";

import { Input } from "components/styled-ui/Input";
import { SelectItem } from "components/styled-ui/SelectItem";
import { SelectTrigger } from "components/styled-ui/SelectTrigger";
import { Select, SelectContent, SelectValue } from "components/ui/select";
import { Separator } from "components/ui/separator";
import {
  AttributeField,
  AttributeSectionTitle,
  AttributeTooltip
} from "features/editor/components/AttributeComponents";
import { useEditorStore } from "features/editor/hooks/useEditorStore";
import {
  ElementsType,
  FontWeights,
  FormElement,
  FormElementInstance,
  fontWeights
} from "features/editor/types";
import { Heading } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

const type: ElementsType = "Heading";

export const headingAttributes = {
  content: "Heading",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.5",
  padding: "0px 0px 0px 0px"
};

type PropertiesSchema = typeof headingAttributes & {
  weight: FontWeights;
};

export type HeadingElement = FormElementInstance<PropertiesSchema>;

export const HeadingElement: FormElement = {
  type,
  construct: (id: string, alias: string) => ({
    id,
    alias,
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

  const { content, fontSize, fontWeight, lineHeight, padding } =
    elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-white text-zinc-950 outline-0 ring-0 focus-visible:outline-none">
      <h1
        style={{
          fontSize: `${fontSize || "16px"}`,
          fontWeight: `${fontWeight || "400"}`,
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

  const { content, fontSize, fontWeight, lineHeight, padding } =
    elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-white text-zinc-950 outline-0 ring-0 selection:bg-blue-300 focus-visible:outline-none">
      <h1
        style={{
          fontSize: `${fontSize || "16px"}`,
          fontWeight: `${fontWeight || "400"}`,
          lineHeight: `${lineHeight || "1.5"}`,
          padding: `${padding || "0px 0px 0px 0px"}`
        }}
      >
        {content}
      </h1>
    </div>
  );
}

/**
 * Form to handle the properties of a heading.
 */
export function HeadingProperties() {
  const { activeElement, updateElement, elements } = useEditorStore(
    useShallow(state => ({
      activeElement: state.activeElement,
      updateElement: state.updateElement,
      elements: state.elements
    }))
  );

  const element = elements.find(
    element => element.id === activeElement?.id
  ) as HeadingElement;

  const values = {
    alias: element.alias,
    content: element.extraAttributes.content,
    fontSize: element.extraAttributes.fontSize,
    fontWeight: element.extraAttributes.fontWeight,
    lineHeight: element.extraAttributes.lineHeight,
    padding: element.extraAttributes.padding
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
          tooltipMessage="Enter what you want the heading to be."
          label="Content"
          htmlFor="content"
        />
        <Input
          value={values.content}
          id="content"
          name="content"
          onChange={({ target: { value } }) => {
            applyChanges({ content: value });
          }}
          onBlur={({ target: { value } }) => {
            if (!value.length) {
              applyChanges({ content: "Heading" });
            }
          }}
        />
      </AttributeField>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="The font-size CSS property sets the size of the font for the heading. Changing the font size also updates the sizes of the font size-relative units, such as em, ex, and so forth."
          label="Font Size"
          htmlFor="fontSize"
        />
        <Input
          value={values.fontSize}
          id="fontSize"
          name="fontSize"
          onChange={({ target: { value } }) => {
            applyChanges({ fontSize: value });
          }}
          onBlur={({ target: { value } }) => {
            if (!value.length) {
              applyChanges({ fontSize: headingAttributes.fontSize });
            }
          }}
        />
      </AttributeField>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="The font-weight CSS property sets the weight (or boldness) of the font."
          label="Font Weight"
          htmlFor="fontWeight"
        />
        <Select
          onValueChange={value => {
            applyChanges({ fontWeight: value });
          }}
          value={values.fontWeight}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="selector dark:bg-zinc-800">
            {fontWeights.map(weight => {
              return (
                <SelectItem value={weight} key={weight}>
                  {weight}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </AttributeField>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="The line-height CSS property sets the height of the heading. It's commonly used to set the distance between lines of text."
          label="Line Height"
          htmlFor="lineHeight"
        />
        <Input
          value={values.lineHeight}
          id="lineHeight"
          name="lineHeight"
          onChange={({ target: { value } }) => {
            applyChanges({ lineHeight: value });
          }}
          onBlur={({ target: { value } }) => {
            if (!value.length) {
              applyChanges({ lineHeight: headingAttributes.lineHeight });
            }
          }}
        />
      </AttributeField>
      <Separator className="bg-zinc-300 dark:bg-zinc-800" />
      <AttributeSectionTitle>Layout</AttributeSectionTitle>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="The padding CSS shorthand property sets the padding area on all four sides of the heading at once."
          label="Padding"
          htmlFor="padding"
        />
        <Input
          value={values.padding}
          id="padding"
          name="padding"
          onChange={({ target: { value } }) => {
            applyChanges({ padding: value });
          }}
          onBlur={({ target: { value } }) => {
            if (!value.length) {
              applyChanges({ padding: headingAttributes.padding });
            }
          }}
        />
      </AttributeField>
    </div>
  );
}
