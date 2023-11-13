import { ReactNode } from "react";

interface Props {
  /** The condition determining whether to render the children. */
  when: boolean;
  /** Optional fallback content to be rendered when the condition is false */
  fallback?: ReactNode;
  /** The content to be rendered when the condition is true. */
  children: ReactNode;
}

/**
 * The `Show` component conditionally renders its children based on a boolean
 * condition. If the condition (`when`) is true, it renders the `children`;
 * otherwise, it renders the optional `fallback` content.
 */
export const Show = ({ when, fallback, children }: Props) => {
  if (!when) return <>{fallback}</> || null;

  return <>{children}</>;
};
