import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "components/ui/tooltip";
import { ReactNode } from "react";

type Props = {
  message: ReactNode;
  children: ReactNode;
};

/**
 * Styled tooltip which taken in a trigger component and message.
 */
export const Tooltip = ({ message, children }: Props) => {
  return (
    <TooltipProvider>
      <ShadcnTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="max-w-[200px] bg-zinc-50 dark:bg-zinc-900">
          <div className="text-zinc-900 dark:text-zinc-50">{message}</div>
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};
