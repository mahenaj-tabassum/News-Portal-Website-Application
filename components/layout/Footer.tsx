import Link from "next/link";
import { categories } from "@/lib/data";
const Footer = () => {
  const col = (t: string, items: string[]) => (
    <div>
      <h4 className="label mb-4 text-white/50">{t}</h4>
      <ul className="space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i}>
            <Link
              href={
                categories.includes(i) ? `/category/${i.toLowerCase()}` : "#"
              }
              className="text-white/80 transition-colors hover:text-white"
            >
              {i}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="h-serif text-4xl font-semibold">
            THE DAILY BRIEF<span className="text-accent">.</span>
          </p>
          <p className="mt-3 text-white/60">The stories worth knowing.</p>
          <h4 className="h-serif mt-10 text-2xl">Stay in the know.</h4>
          <p className="mt-2 max-w-sm text-sm text-white/60">
            A concise briefing of the stories worth your attention, delivered to
            your inbox.
          </p>
          <form className="mt-5 flex max-w-sm border-b border-white/30 focus-within:border-white">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/40"
            />
            <button className="label cursor-pointer px-2 text-white transition-colors hover:text-accent">
              Subscribe
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          {col("Explore", categories)}
          {col("Company", ["About", "Editorial Team", "Careers", "Contact"])}
          {col("Legal", ["Privacy Policy", "Terms of Use", "Cookie Policy"])}
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © 2026 The Daily Brief. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
