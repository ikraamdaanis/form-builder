import { SignUp } from "@clerk/nextjs";
import { dashboardLink } from "app/dashboard/(dashboard)/page";

export default function Page() {
  return (
    <SignUp afterSignInUrl={dashboardLink} afterSignUpUrl={dashboardLink} />
  );
}
