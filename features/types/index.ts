import { HeadingElement } from "features/builder/components/fields/Heading/Heading";
import { TextFieldElement } from "features/builder/components/fields/TextField/TextField";
import { ReactNode } from "react";

export type ElementsType = "TextField" | "Heading";
// | "TitleField"
// | "SubTitleField"
// | "ParagraphField"
// | "SeparatorField"
// | "SpacerField"
// | "NumberField"
// | "TextAreaField"
// | "DateField"
// | "SelectField"
// | "CheckboxField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerButton: {
    icon: ReactNode;
    label: string;
  };
  editorComponent: (props: {
    element: FormElementInstance;
    isOverlay?: boolean;
  }) => JSX.Element;
  formComponent: () => JSX.Element;
  propertiesComponent: () => JSX.Element;
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldElement,
  Heading: HeadingElement
};

export type FormElementInstance<T = Record<string, any>> = {
  id: string;
  type: ElementsType;
  extraAttributes: T;
};
