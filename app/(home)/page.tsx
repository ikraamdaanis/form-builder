import { GetStarted } from "app/(home)/GetStarted";
import { HomeHeader } from "app/(home)/HomeHeader";

/**
 * The homepage for the application. Displays the product features and links to
 * sign up, login pages and a call to action in the hero.
 */
export default async function HomePage() {
  return (
    <div className="h-full bg-zinc-50 dark:bg-zinc-900">
      <HomeHeader />
      <section className="mx-auto h-full max-w-screen-xl p-4 pt-[66px]">
        <div className="flex flex-col gap-16 px-4 py-40">
          <h1 className="text-center text-4xl font-bold md:text-4xl lg:text-6xl xl:text-8xl">
            Effortless Form Creation for Every Purpose
          </h1>
          <div className="flex items-center justify-center gap-2">
            <GetStarted />
          </div>
        </div>
      </section>
    </div>
  );
}
