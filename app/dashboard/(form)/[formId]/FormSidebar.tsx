import { FormSidebarLinks } from "app/dashboard/(form)/[formId]/FormSidebarLinks";
import { fetchForm } from "features/forms/actions/fetchForm";

type Props = {
  formId: string;
};

/** Sidebar for the form dashboard. */
export const FormSidebar = async ({ formId }: Props) => {
  const form = await fetchForm(formId);

  return <FormSidebarLinks form={form} />;
};
