import { Header } from "components/Header";

/**
 * The homepage for the application. Displays the product features and links to
 * sign up and login pages.
 */
const HomePage = async () => {
  return (
    <div className="h-full bg-zinc-50 dark:bg-zinc-900">
      <Header />
      <section className="h-full pt-16">
        <h1>Home</h1>
      </section>
    </div>
  );
};

export default HomePage;
