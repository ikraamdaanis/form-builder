"use client";

import { Button } from "components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  error: Error;
};

const BuilderPageError = ({ error }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="mb-2 text-4xl font-medium">
        Something went wrong! {error.message}
      </h2>
      <Button asChild>
        <Link href={"/"}>Go back to home</Link>
      </Button>
    </div>
  );
};

export default BuilderPageError;
