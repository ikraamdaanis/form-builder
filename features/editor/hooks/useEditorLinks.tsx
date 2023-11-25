import { useParams, useSearchParams } from "next/navigation";

type UseEditorLinks = {
  /** /editor */
  editorLink: string;
  /** `/editor/${formId}` */
  formLink: string;
  /** `/editor/${formId}?preview=true` */
  previewLink: string;
  /** `?preview=true` */
  isPreview: boolean;
};

/** Links for Form Editor pages. */
export const useEditorLinks = (): UseEditorLinks => {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const formId = params?.id;

  const editorLink = `/editor`;
  const formLink = `${editorLink}/${formId}`;
  const previewLink = `${formLink}?preview=true`;
  const isPreview = searchParams.get("preview") === "true";

  return { editorLink, formLink, previewLink, isPreview };
};
