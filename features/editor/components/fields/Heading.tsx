"use client";

import { Tooltip } from "components/Tooltip";
import { Input } from "components/styled-ui/Input";
import { SelectItem } from "components/styled-ui/SelectItem";
import { SelectTrigger } from "components/styled-ui/SelectTrigger";
import { Select, SelectContent, SelectValue } from "components/ui/select";
import { Separator } from "components/ui/separator";
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
  fontSize: "16px",
  fontWeight: "400",
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
      <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
        <Tooltip message="Enter a custom alias for this element as it will be displayed within the editor interface.">
          <label
            className="w-20 min-w-[80px] cursor-pointer text-xs font-semibold opacity-80"
            htmlFor="alias"
          >
            Alias
          </label>
        </Tooltip>
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
      </div>
      <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
        <Tooltip message="Enter what you want the heading to be.">
          <label
            className="w-20 min-w-[80px] cursor-pointer text-xs font-semibold opacity-80"
            htmlFor="content"
          >
            Content
          </label>
        </Tooltip>
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
      </div>
      <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
        <Tooltip message="The font-size CSS property sets the size of the font for the heading. Changing the font size also updates the sizes of the font size-relative units, such as em, ex, and so forth.">
          <label
            className="w-20 min-w-[80px] cursor-pointer text-xs font-semibold opacity-80"
            htmlFor="fontSize"
          >
            Font Size
          </label>
        </Tooltip>
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
      </div>
      <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
        <Tooltip message="The font-weight CSS property sets the weight (or boldness) of the font.">
          <label
            className="w-20 min-w-[80px] cursor-pointer text-xs font-semibold opacity-80"
            htmlFor="fontWeight"
          >
            Font Weight
          </label>
        </Tooltip>
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
      </div>
      <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
        <Tooltip message="The line-height CSS property sets the height of the heading. It's commonly used to set the distance between lines of text.">
          <label
            className="w-20 min-w-[80px] cursor-pointer text-xs font-semibold opacity-80"
            htmlFor="lineHeight"
          >
            Line Height
          </label>
        </Tooltip>
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
      </div>
      <Separator className="bg-zinc-300 dark:bg-zinc-800" />
      <p className="text-sm font-semibold">Layout</p>
      <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
        <Tooltip message="The padding CSS shorthand property sets the padding area on all four sides of the heading at once.">
          <label
            className="w-20 min-w-[80px] cursor-pointer text-xs font-semibold opacity-80"
            htmlFor="padding"
          >
            Padding
          </label>
        </Tooltip>
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
      </div>
    </div>
  );
}
