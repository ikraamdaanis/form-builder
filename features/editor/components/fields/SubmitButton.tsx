"use client";

import { Input } from "components/styled-ui/Input";
import { SelectItem } from "components/styled-ui/SelectItem";
import { SelectTrigger } from "components/styled-ui/SelectTrigger";
import { Button } from "components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
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
import { Send } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { useShallow } from "zustand/react/shallow";

const type: ElementsType = "SubmitButton";

export const submitButtonAttributes = {
  background: "#000",
  color: "#fff",
  content: "Submit",
  fontSize: "14px",
  fontWeight: "500",
  margin: "0px 0px 0px 0px"
};

type PropertiesSchema = typeof submitButtonAttributes & {
  weight: FontWeights;
};

export type SubmitButtonElement = FormElementInstance<PropertiesSchema>;

export const SubmitButtonElement: FormElement = {
  type,
  construct: (id: string, name: string) => ({
    id,
    alias: name,
    type,
    extraAttributes: submitButtonAttributes
  }),
  editorComponent: SubmitButtonEditor,
  formComponent: SubmitButtonPreview,
  propertiesComponent: SubmitButtonProperties,
  designerButton: {
    icon: <Send className="h-4 w-4 cursor-grab text-primary" />,
    label: "Submit Button"
  }
};

type Props = {
  element: FormElementInstance;
  isOverlay?: boolean;
};

/** Submit button component displayed in the editor. */
function SubmitButtonEditor({ element }: Props) {
  const elementInstance = element as SubmitButtonElement;

  const { background, color, content, fontSize, fontWeight, margin } =
    elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col bg-white" style={{ margin }}>
      <Button type="submit" style={{ background, color, fontSize, fontWeight }}>
        {content}
      </Button>
    </div>
  );
}

/** Submit button component displayed in the editor. */
function SubmitButtonPreview({ element }: Props) {
  const elementInstance = element as SubmitButtonElement;

  const { background, color, content, fontSize, fontWeight, margin } =
    elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col bg-white" style={{ margin }}>
      <Button style={{ background, color, fontSize, fontWeight }}>
        {content}
      </Button>
    </div>
  );
}

/**
 * Form to handle the properties of a submit button.
 */
export function SubmitButtonProperties() {
  const { activeElement, updateElement, elements } = useEditorStore(
    useShallow(state => ({
      activeElement: state.activeElement,
      updateElement: state.updateElement,
      elements: state.elements
    }))
  );

  const element = elements.find(
    element => element.id === activeElement?.id
  ) as SubmitButtonElement;

  const values = {
    alias: element.alias,
    background: element.extraAttributes.background,
    color: element.extraAttributes.color,
    content: element.extraAttributes.content,
    fontSize: element.extraAttributes.fontSize,
    fontWeight: element.extraAttributes.fontWeight,
    margin: element.extraAttributes.margin
  };

  function applyChanges(values: Partial<PropertiesSchema>) {
    updateElement(element.id, {
      ...element,
      extraAttributes: { ...element.extraAttributes, ...values }
    });
  }

  return (
    <div className="mt-2 flex flex-col gap-4">
      <h2 className="text-sm font-semibold">{values.alias} Properties</h2>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="Enter what text should be in the button"
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
              applyChanges({ content: "Submit" });
            }
          }}
        />
      </AttributeField>
      <div className="flex flex-col">
        <AttributeField>
          <AttributeTooltip
            tooltipMessage="Set the font colour for the button."
            label="Font Colour"
            htmlFor="color"
          />
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative cursor-pointer">
                <div
                  className="absolute left-[6px] top-1/2 h-6 w-10 -translate-y-1/2 rounded-sm border border-zinc-300"
                  style={{ background: values.color }}
                />
                <Input
                  readOnly
                  id="color"
                  className="cursor-pointer pl-12"
                  value={values.color}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="relative -left-[300px] -top-[40px] z-10 w-[unset] rounded-md border border-zinc-300 bg-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-900">
              <HexColorPicker
                className="rounded-sm border border-zinc-300 dark:border-zinc-700"
                color={values.color}
                onChange={string => {
                  applyChanges({ color: string });
                }}
              />
            </PopoverContent>
          </Popover>
        </AttributeField>
      </div>
      <div className="flex flex-col">
        <AttributeField>
          <AttributeTooltip
            tooltipMessage="Set the background for the button."
            label="Background"
            htmlFor="background"
          />
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative cursor-pointer">
                <div
                  className="absolute left-[6px] top-1/2 h-6 w-10 -translate-y-1/2 rounded-sm border border-zinc-300"
                  style={{ background: values.background }}
                />
                <Input
                  readOnly
                  id="background"
                  className="cursor-pointer pl-12"
                  value={values.background}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="relative -left-[300px] -top-[40px] z-10 w-[unset] rounded-md border border-zinc-300 bg-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-900">
              <HexColorPicker
                className="rounded-sm border border-zinc-300 dark:border-zinc-700"
                color={values.background}
                onChange={string => {
                  applyChanges({ background: string });
                }}
              />
            </PopoverContent>
          </Popover>
        </AttributeField>
      </div>
      <AttributeField>
        <AttributeTooltip
          tooltipMessage="The font-size CSS property sets the size of the font for the button. Changing the font size also updates the sizes of the font size-relative units, such as em, ex, and so forth."
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
              applyChanges({ fontSize: submitButtonAttributes.fontSize });
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
      <Separator className="bg-zinc-300 dark:bg-zinc-800" />
      <AttributeSectionTitle>Layout</AttributeSectionTitle>
      <div className="flex flex-col">
        <AttributeField>
          <AttributeTooltip
            tooltipMessage="The margin CSS shorthand property sets the margin area on all four sides of the button."
            label="Margin"
            htmlFor="margin"
          />
          <Input
            value={values.margin}
            id="margin"
            name="margin"
            onChange={({ target: { value } }) => {
              applyChanges({ margin: value });
            }}
            onBlur={({ target: { value } }) => {
              if (!value.length) {
                applyChanges({ margin: submitButtonAttributes.margin });
              }
            }}
          />
        </AttributeField>
      </div>
    </div>
  );
}
