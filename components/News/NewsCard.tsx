import Image from "next/image";
import Link from "next/link";
import { NewsProps } from "@/types/News";

interface Props {
  article: NewsProps;
}

const formatDate = (date: string | null) => {
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

const NewsCard = ({ article }: Props) => {
  const date = formatDate(article.lastPublished);

  return (
    <article className="group h-full">
      <Link
        href={`/article/${article.id}`}
        className="flex h-full flex-col overflow-hidden border border-line bg-white transition-all duration-300 rounded-xl ease-out hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_18px_40px_-18px_rgba(17,17,17,0.25)]"
      >
        {/* Image */}
        <figure className="relative aspect-16/10 w-full overflow-hidden bg-line">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt || article.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />

          {/* Soft gradient on hover */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Live badge */}
          {article.isLive && (
            <span className="label absolute left-3 top-3 flex items-center gap-2 bg-ink px-3 py-1.5 text-white shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Live
            </span>
          )}
        </figure>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          {/* Title */}
          <h3 className=" mt-3 text-xl font-semibold leading-snug! md:text-[1rem]">
            <span className="ul group-hover:bg-size-[100%_1px]">
              {article.title}
            </span>
          </h3>

          {/* Description */}
          {article.description && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
              {article.description}
            </p>
          )}

          {/* Meta */}
          <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
            <div className="mt-5 flex min-w-0 items-center gap-2">
              <span className="truncate font-medium text-ink">
                {article.source}
              </span>

              {date && (
                <>
                  <span aria-hidden="true">·</span>
                  <time
                    dateTime={article.lastPublished ?? undefined}
                    className="shrink-0"
                  >
                    {date}
                  </time>
                </>
              )}
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="mt-5 h-4 w-4 shrink-0 -translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default NewsCard;
