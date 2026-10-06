import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | The Daily Brief",
};

export default function NotFound() {
  return (
    <main className="bg-paper text-ink">
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div>
          <div className="grid items-center justify-center md:items-start gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
            {/* The memorable element: an oversized headline numeral */}
            <p
              aria-hidden="true"
              className="select-none font-serif text-[clamp(8rem,28vw,16rem)] font-medium leading-[0.8] tracking-tighter"
            >
              404
            </p>

            <div className="max-w-md">
              <p className="mb-3 text-sm font-medium text-accent">
                Page not found
              </p>
              <h1 className="font-serif text-4xl font-medium leading-tight sm:text-5xl">
                We couldn&apos;t find that story.
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted">
                The link may be broken, or the page may have been moved or
                removed. Head back to the front page to catch up on what&apos;s
                happening.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Go to the front page
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-line bg-white px-6 py-3 text-sm font-medium transition-colors hover:border-ink  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Report a broken link
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Correction note, styled like a printed newspaper correction */}
        <aside className="mt-14 border-t border-line pt-5 md:mt-20">
          <p className="max-w-2xl font-serif text-sm italic leading-relaxed text-muted">
            Correction: the page you asked for isn&apos;t in today&apos;s
            edition. The stories worth knowing are still on the front page.
          </p>
        </aside>
      </section>
    </main>
  );
}
