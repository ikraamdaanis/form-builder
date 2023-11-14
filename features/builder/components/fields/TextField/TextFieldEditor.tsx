import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { TextFieldElement } from "features/builder/components/fields/TextField/TextField";
import { FormElementInstance } from "features/types";

type Props = {
  element: FormElementInstance;
};

/** Text field component displayed in the editor. */
export const TextFieldEditor = ({ element }: Props) => {
  const elementInstance = element as TextFieldElement;

  const { label, required, placeholder, helperText } =
    elementInstance.extraAttributes;

  return (
    <div className="flex w-full flex-col gap-2 bg-zinc-50 outline-0 ring-0 focus-visible:outline-none dark:bg-zinc-900">
      <div>
        <Label>
          {label}
          {required && "*"}
        </Label>
        <Input
          readOnly
          placeholder={placeholder}
          className="pointer-events-none cursor-default"
        />
        {helperText && (
          <p className="text-[0.8rem] text-muted-foreground">{helperText}</p>
        )}
      </div>
    </div>
  );
};
