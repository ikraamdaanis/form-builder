import { SignIn } from "@clerk/nextjs";
import { dashboardLink } from "app/dashboard/(dashboard)/page";

export default function Page() {
  return (
    <SignIn afterSignInUrl={dashboardLink} afterSignUpUrl={dashboardLink} />
  );
}
