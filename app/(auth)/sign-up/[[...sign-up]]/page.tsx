import { SignUp } from "@clerk/nextjs";
import { dashboardLink } from "app/dashboard/page";

export default function Page() {
  return (
    <SignUp afterSignInUrl={dashboardLink} afterSignUpUrl={dashboardLink} />
  );
}
