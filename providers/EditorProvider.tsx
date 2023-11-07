"use client";

import { FormElementInstance } from "features/types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState
} from "react";

type EditorContextType = {
  elements: FormElementInstance[];
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
  addElement: (index: number, element: FormElementInstance) => void;
  activeElement: FormElementInstance | null;
  setActiveElement: Dispatch<SetStateAction<FormElementInstance | null>>;
};

export const EditorContext = createContext<EditorContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const EditorProvider = ({ children }: Props) => {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [activeElement, setActiveElement] =
    useState<FormElementInstance | null>(null);

  function addElement(index: number, element: FormElementInstance) {
    setElements(prev => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  }

  return (
    <EditorContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        activeElement,
        setActiveElement
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
