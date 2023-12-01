"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "components/ui/button";
import Link from "next/link";

/**
 * Get Started button Call to Action that links to the sign up page or the
 * dashboard page if the user is already signed in.
 */
export const GetStarted = () => {
  const { isSignedIn } = useAuth();

  return (
    <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
      <Button className="bg-brandColour font-semibold text-white transition hover:bg-brandColour hover:brightness-110">
        Get Started
      </Button>
    </Link>
  );
};
