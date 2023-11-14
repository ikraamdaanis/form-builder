import { HeadingElement } from "features/builder/components/fields/Heading/Heading";
import { FormElementInstance } from "features/types";

type Props = {
  element: FormElementInstance;
  isOverlay?: boolean;
};

/** Heading component displayed in the editor. */
export const HeadingEditor = ({ element }: Props) => {
  const elementInstance = element as HeadingElement;

  const {
    content,
    fontSize: size,
    fontWeight: weight,
    lineHeight,
    padding
  } = elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-zinc-50 outline-0 ring-0 focus-visible:outline-none dark:bg-zinc-900">
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
};
