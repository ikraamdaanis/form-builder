"use client";

import { FormElementInstance } from "features/types";
import { ReactNode, createContext, useState } from "react";

type EditorContextType = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
};

export const EditorContext = createContext<EditorContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const EditorProvider = ({ children }: Props) => {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  function addElement(index: number, element: FormElementInstance) {
    setElements(prev => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  }

  return (
    <EditorContext.Provider value={{ elements, addElement }}>
      {children}
    </EditorContext.Provider>
  );
};
