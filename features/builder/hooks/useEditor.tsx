"use client";

import { EditorContext } from "providers/EditorProvider";
import { useContext } from "react";

export const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used within an Editor Context");
  }

  return context;
};
