import { Header } from "components/Header";

/**
 * The homepage for the application. Displays the product features and links to
 * sign up and login pages.
 */
const HomePage = async () => {
  return (
    <div className="h-full">
      <Header />
      <section className="h-full bg-zinc-50 pt-16 dark:bg-zinc-900">
        <h1>Home</h1>
      </section>
    </div>
  );
};

export default HomePage;
