import { useParams, useSearchParams } from "next/navigation";

type UseBuilderLinks = {
  /** `?preview=true` */
  isPreview: boolean;
  /** `/builder/${formId}` */
  formLink: string;
  /** `/builder/${formId}?preview=true` */
  previewLink: string;
};

/** Links for Form Builder pages. */
export const useBuilderLinks = (): UseBuilderLinks => {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const formId = params?.id;
  const isPreview = searchParams.get("preview") === "true";

  const formLink = `/builder/${formId}`;
  const previewLink = `${formLink}?preview=true`;

  return { isPreview, formLink, previewLink };
};
