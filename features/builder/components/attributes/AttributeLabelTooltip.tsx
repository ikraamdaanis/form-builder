import { FormDescription } from "components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "components/ui/tooltip";
import { ReactNode } from "react";

type Props = {
  message: string;
  children: ReactNode;
};

/**
 * Tooltip used for a label in an attribute field in the attributes panel.
 */
export const AttributeLabelTooltip = ({ message, children }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="max-w-[200px] bg-zinc-50 dark:bg-zinc-900">
          <FormDescription className="text-zinc-900 dark:text-zinc-50">
            {message}
          </FormDescription>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
