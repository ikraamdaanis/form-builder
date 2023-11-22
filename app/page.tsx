import { SignOutButton, currentUser } from "@clerk/nextjs";
import { Header } from "components/Header";
import { Button } from "components/ui/button";
import Link from "next/link";

/**
 * The homepage for the application. Displays the product features and links to
 * sign up and login pages.
 */
const HomePage = async () => {
  const user = await currentUser();
  return (
    <div className="">
      <Header />
      <section className="pt-16">
        <h1>Home</h1>
        {user ? (
          <SignOutButton />
        ) : (
          <>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;
