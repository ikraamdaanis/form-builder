import { Tooltip } from "components/Tooltip";
import { ChildrenProp } from "types";

/**
 * Container for an attribute field in the form elements attributes panel.
 */
export const AttributeField = (props: ChildrenProp) => {
  return (
    <div className="flex items-center gap-2 space-y-0 rounded-sm p-0">
      {props.children}
    </div>
  );
};

type AttributeTooltipProps = {
  tooltipMessage: string;
  label: string;
  htmlFor: string;
};

/**
 * Tooltip with label for the attributes panel. Allows for the user to add a
 * message for the tooltip and also the label and htmlFor for the field.
 */
export const AttributeTooltip = ({
  tooltipMessage,
  label,
  htmlFor
}: AttributeTooltipProps) => {
  return (
    <Tooltip message={tooltipMessage}>
      <label
        className="w-20 min-w-[80px] cursor-pointer text-xs font-semibold opacity-80"
        htmlFor={htmlFor}
      >
        {label}
      </label>
    </Tooltip>
  );
};
