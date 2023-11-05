import { getForms } from "features/forms/actions/getForms";
import { FormCard } from "features/forms/components/FormCard";

/**
 * Displays the forms for the account.
 */
export const FormsContainer = async () => {
  const forms = await getForms();

  return (
    <>
      {forms.map(form => {
        return <FormCard key={form.id} form={form} />;
      })}
    </>
  );
};
