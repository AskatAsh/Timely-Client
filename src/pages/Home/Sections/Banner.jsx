import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import '../../../styles/hero-banner.css';

const Banner = () => {
  return (
    <section
      className="banner-container bg-background bg-cover bg-center min-h-screen"
    >
      <div className="py-8 px-4 max-w-3xl text-left lg:py-16 lg:px-12">
        <a
          href="#"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm bg-secondary-300 rounded-full"
          role="alert"
        >
          <Button className="text-xs bg-accent-800 text-text rounded-full px-4 py-1.5 mr-3" size="sm">
            New
          </Button>{" "}
          <span className="text-sm font-medium">
            Timely is out! See what&apos;s new
          </span>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-text md:text-5xl lg:text-6xl">
          The new standard for modern courier companies
        </h1>
        <p className="mb-8 text-lg font-normal text-text-600 lg:text-xl">
          Optimize delivery routes, boost efficiency, and scale easily with the
          world&apos;s most popular driver app and delivery software for
          couriers.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-start sm:space-y-0 sm:space-x-4">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="search here..."
              className="border-secondary"
            />
            <Button type="submit" className="bg-primary-900 text-text hover:bg-primary">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;