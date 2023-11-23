"use client";

import { Tooltip } from "components/Tooltip";
import { Input } from "components/styled-ui/Input";
import { SelectItem } from "components/styled-ui/SelectItem";
import { SelectTrigger } from "components/styled-ui/SelectTrigger";
import { Button } from "components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Select, SelectContent, SelectValue } from "components/ui/select";
import { Separator } from "components/ui/separator";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  fontWeights
} from "features/types";
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

type PropertiesSchema = typeof submitButtonAttributes;

export type SubmitButtonElement = FormElementInstance<PropertiesSchema>;

export const SubmitButtonElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
        <Tooltip message="Enter what text should be in the button">
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
              applyChanges({ content: "Submit" });
            }
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
          <Tooltip message="Set the font colour for the button.">
            <label className="w-20 min-w-[80px] text-xs font-semibold opacity-80">
              Font Colour
            </label>
          </Tooltip>
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative cursor-pointer">
                <div
                  className="absolute left-[6px] top-1/2 h-6 w-10 -translate-y-1/2 rounded-sm border border-zinc-300"
                  style={{ background: values.color }}
                />
                <Input
                  readOnly
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
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
          <Tooltip message="Set the background for the button.">
            <label className="w-20 min-w-[80px] text-xs font-semibold opacity-80">
              Background
            </label>
          </Tooltip>
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative cursor-pointer">
                <div
                  className="absolute left-[6px] top-1/2 h-6 w-10 -translate-y-1/2 rounded-sm border border-zinc-300"
                  style={{ background: values.background }}
                />
                <Input
                  readOnly
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
        </div>
      </div>
      <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
        <Tooltip message="The font-size CSS property sets the size of the font for the button. Changing the font size also updates the sizes of the font size-relative units, such as em, ex, and so forth.">
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
              applyChanges({ fontSize: submitButtonAttributes.fontSize });
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
      <Separator className="bg-zinc-300 dark:bg-zinc-800" />
      <p className="text-sm font-semibold">Layout</p>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
          <Tooltip message="The margin CSS shorthand property sets the margin area on all four sides of the button.">
            <label
              className="w-20 min-w-[80px] cursor-pointer text-xs font-semibold opacity-80"
              htmlFor="margin"
            >
              Margin
            </label>
          </Tooltip>
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
        </div>
      </div>
    </div>
  );
}
