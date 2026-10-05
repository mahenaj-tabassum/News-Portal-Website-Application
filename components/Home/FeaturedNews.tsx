import Image from "next/image";
import Link from "next/link";
import { NewsProps } from "@/types/News";

interface FeaturedNewsProps {
  news: NewsProps[];
}

const formatDate = (date: string | null | undefined) => {
  if (!date) return "";

  const d = new Date(date);

  return isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
};

const FeaturedNews = ({ news }: FeaturedNewsProps) => {
  if (!news?.length) return null;

  const [firstNews, ...otherNews] = news;
  const firstDate = formatDate(firstNews.lastPublished);

  console.log("First", firstNews);
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-0">
        {/* Lead story */}
        <article className="group lg:col-span-7 lg:pr-10">
          <Link href={`/article/${firstNews.id}`} className="block">
            <figure className="relative aspect-16/10 w-full overflow-hidden bg-line">
              <Image
                src={firstNews.imageUrl}
                alt={firstNews.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {firstNews.isLive && (
                <span className="label absolute left-4 top-4 flex items-center gap-2 bg-ink px-3 py-1 text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                  Live
                </span>
              )}
            </figure>

            <div className="mt-5">
              <p className="label text-accent">{firstNews.category}</p>

              <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
                <span className="ul group-hover:bg-size-[100%_1px]">
                  {firstNews.title}
                </span>
              </h2>

              <p className="mt-3 line-clamp-3 text-base leading-relaxed text-muted">
                {firstNews.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                <span className="font-medium text-ink">{firstNews.source}</span>

                {firstDate && (
                  <>
                    <span aria-hidden="true">·</span>
                    <time
                      dateTime={firstNews.lastPublished ?? undefined}
                      className="shrink-0"
                    >
                      {firstDate}
                    </time>
                  </>
                )}
              </div>
            </div>
          </Link>
        </article>

        {/* Side list */}
        <aside className="lg:col-span-5 lg:border-l lg:border-line pl-5 border border-line py-5 md:border-none">
          <div className="divide-y divide-line">
            {otherNews.slice(0, 4).map((item) => {
              const itemDate = formatDate(item.lastPublished);

              return (
                <article
                  key={item.id}
                  className="group py-5 first:pt-0 last:pb-0"
                >
                  <Link href={`/article/${item.id}`} className="block">
                    <h4 className="h-serif mt-1.5 font-semibold leading-snug!">
                      <span className="ul group-hover:bg-size-[100%_1px]">
                        {item.title}
                      </span>
                    </h4>

                    {itemDate && (
                      <time
                        dateTime={item.lastPublished ?? undefined}
                        className="mt-2 block text-xs text-muted"
                      >
                        {itemDate}
                      </time>
                    )}
                  </Link>
                </article>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default FeaturedNews;
