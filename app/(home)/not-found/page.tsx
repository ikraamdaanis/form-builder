import { HomeHeader } from "app/(home)/HomeHeader";
import { Button } from "components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="h-full bg-zinc-50 dark:bg-zinc-900">
      <HomeHeader />
      <section className="mx-auto h-full max-w-screen-xl p-4 pt-[66px]">
        <div className="flex flex-col items-center justify-center gap-4 px-4 py-40">
          <h1 className="text-center text-4xl font-bold md:text-4xl lg:text-6xl xl:text-8xl">
            404
          </h1>
          <p className="font-semibold">
            We can&#39;t find what you&#39;re looking for.
          </p>
          <Link href="/">
            <Button className="mt-4 bg-brandColour font-semibold text-white transition hover:bg-brandColour hover:brightness-110">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
