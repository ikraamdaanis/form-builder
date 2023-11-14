import { Button } from "components/ui/button";
import { useEditorStore } from "features/builder/hooks/useEditorStore";
import { ElementsType, FormElements } from "features/types";
import { MoveLeft } from "lucide-react";
import { ChildrenProp } from "types";
import { useShallow } from "zustand/react/shallow";

/**
 * Sidebar for the properties fields for elements in the form builder enabling
 * the user to change the attributes of an element.
 */
export const EditorProperties = () => {
  const { activeElement, setActiveElement } = useEditorStore(
    useShallow(state => ({
      activeElement: state.activeElement,
      setActiveElement: state.setActiveElement
    }))
  );

  const Wrapper = ({ children }: Partial<ChildrenProp>) => {
    return (
      <aside className="flex h-full w-[280px] max-w-[280px] flex-grow flex-col gap-2 overflow-y-auto border-l border-muted border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
        {children}
      </aside>
    );
  };

  if (!activeElement) return <Wrapper />;

  const elementType = activeElement?.type as ElementsType;

  const ElementPropertiesForm = FormElements[elementType]?.propertiesComponent;

  return (
    <Wrapper>
      <Button
        onClick={() => setActiveElement(null)}
        className="h-6 w-10 self-start justify-self-start border bg-zinc-100 p-0 hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-700 hover:dark:bg-zinc-800"
      >
        <MoveLeft className="relative block h-4 w-5 text-zinc-800 dark:text-zinc-200" />
      </Button>
      <ElementPropertiesForm />
    </Wrapper>
  );
};
