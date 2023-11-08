"use client";

import { FormElementInstance } from "features/types";
import { create } from "zustand";

type EditorStore = {
  elements: FormElementInstance[];
  setElements: (elements: FormElementInstance[]) => void;
  addElement: (index: number, element: FormElementInstance) => void;
  activeElement: FormElementInstance | null;
  setActiveElement: (element: FormElementInstance | null) => void;
};

/** Store for the editor to handle state. */
export const useEditorStore = create<EditorStore>(set => ({
  elements: [],
  setElements: (elements: FormElementInstance[]) => {
    set({ elements });
  },
  addElement: (index: number, element: FormElementInstance) => {
    set(state => {
      const newElements = [...state.elements];
      newElements.splice(index, 0, element);
      return { elements: newElements };
    });
  },
  activeElement: null,
  setActiveElement: (element: FormElementInstance | null) => {
    set({ activeElement: element });
  }
}));
