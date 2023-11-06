import { FormElementInstance, FormElements } from "features/types";

type Props = {
  element: FormElementInstance;
};

export const EditorElementWrapper = ({ element }: Props) => {
  const EditorElement = FormElements[element.type].designerComponent;
  return (
    <div>
      <EditorElement element={element} />
    </div>
  );
};
