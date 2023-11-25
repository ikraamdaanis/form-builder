import { ElementsType, FormElementInstance } from "features/editor/types";

/**
 * Generates a form element's name using its type and existing elements.
 * For example if the element is textfield and are are already 3 existing
 * textfields then the generate name will be `TextField_4`.
 */
export function generateElementName(
  elements: FormElementInstance[],
  type: ElementsType
) {
  const previousTypesLength = elements.filter(
    element => element.type === type
  ).length;

  return `${type}_${previousTypesLength}`;
}
