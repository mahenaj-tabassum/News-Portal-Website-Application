import Image from "next/image";
import Link from "next/link";
import { NewsDetailsProps } from "@/types/News";

interface Props {
  newsDetails: NewsDetailsProps;
}

const formatDate = (iso: string | null | undefined) => {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const isPromo = (text: string) => text.includes("হোয়াটসঅ্যাপ চ্যানেল");

const NewsDetails = ({ newsDetails }: Props) => {
  const {
    title,
    link,
    imageUrl,
    imageAlt,
    category,
    isLive,
    firstPublished,
    lastPublished,
    source,
    sourceUrl,
    tags,
    topics,
    byline,
    body,
    wordCount,
  } = newsDetails;

  const categoryLabel = category?.trim() || topics?.[0]?.name || null;

  const safeLink = link || sourceUrl || "";
  const shareUrl = encodeURIComponent(safeLink);
  const shareTitle = encodeURIComponent(title ?? "");

  const published = formatDate(firstPublished);
  const updated = formatDate(lastPublished);
  const readingTime = Math.max(1, Math.round((wordCount || 0) / 225));
  const sourceName = source?.trim() || "Unknown source";

  const authors = (byline ?? []).filter((a) => a?.name);
  const authorLine = authors.length
    ? authors.map((a) => a.name).join(", ")
    : sourceName;
  const authorRole = authors[0]?.role || null;

  const blocks = body ?? [];
  const firstImage = blocks[0]?.type === "image" ? blocks[0] : null;
  const bodyBlocks = firstImage ? blocks.slice(1) : blocks;

  const heroSrc = firstImage?.url || imageUrl;
  const heroAlt = firstImage?.altText || imageAlt || title || "";
  const heroCaption = firstImage?.caption || null;
  const heroCredit = firstImage?.copyrightHolder || null;

  const cleanTags = (tags ?? []).map((t) => t.trim()).filter(Boolean);

  const shareLinks = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareTitle}%20${shareUrl}`,
    },
  ];

  return (
    <article className="bg-white font-sans text-ink">
      <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        {/* Badges */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {categoryLabel && (
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {categoryLabel}
            </span>
          )}
          {isLive && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Live
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {/* Author / meta */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
            {authorLine.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">
            <p className="font-semibold">{authorLine}</p>
            <p className="text-muted">
              {authorRole && `${authorRole} · `}
              {sourceName}
              {published && ` · ${published}`}
              {` · ${readingTime} min read`}
              {updated && updated !== published && ` · Updated ${updated}`}
            </p>
          </div>
        </div>

        {/* Hero image */}
        {heroSrc && (
          <figure className="mt-8">
            <div className="relative aspect-video  w-full overflow-hidden rounded-2xl bg-[#F1F1EF]">
              <Image
                src={heroSrc}
                alt={heroAlt}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
            {(heroCaption || heroCredit) && (
              <figcaption className="mt-3 text-sm leading-6 text-muted">
                {heroCaption}
                {heroCredit && (
                  <span className="ml-1 text-xs text-muted/70">
                    ({heroCredit})
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Share row */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-y border-line py-4">
          <span className="mr-2 text-sm font-medium text-muted">Share</span>
          {shareLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-4 py-1.5 text-sm font-medium transition hover:border-ink hover:bg-ink hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Body: text + inline images, in original order */}
        <div className="mt-8 space-y-6 text-[17px] leading-8 text-ink/85 sm:text-lg sm:leading-9">
          {bodyBlocks.length > 0 ? (
            bodyBlocks.map((block, i) => {
              if (block.type === "image") {
                return (
                  <figure key={`img-${i}`} className="py-2 md:-mx-8">
                    <Image
                      src={block.url}
                      alt={block.altText || ""}
                      width={block.width || 1200}
                      height={block.height || 675}
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 832px"
                      className="h-auto w-full rounded-2xl bg-[#F1F1EF]"
                    />
                    {(block.caption || block.copyrightHolder) && (
                      <figcaption className="mt-3 px-1 text-sm leading-6 text-muted md:px-0">
                        {block.caption}
                        {block.copyrightHolder && (
                          <span className="ml-1 text-xs text-muted/70">
                            ({block.copyrightHolder})
                          </span>
                        )}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              return block.text
                .split(/\n+/)
                .map((p) => p.trim())
                .filter((p) => p && !isPromo(p))
                .map((p, j) => <p key={`p-${i}-${j}`}>{p}</p>);
            })
          ) : (
            <p className="text-muted">
              The full story isn&apos;t available here. You can read it at the
              original source below.
            </p>
          )}
        </div>

        {/* Tags */}
        {cleanTags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {cleanTags.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="rounded-full bg-[#F4F4F2] px-4 py-1.5 text-sm text-ink transition hover:bg-accent hover:text-white"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Source card */}
        {(sourceUrl || safeLink) && (
          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Originally published by
              </p>
              <p className="mt-1 text-lg font-semibold">{sourceName}</p>
            </div>
            <a
              href={sourceUrl || safeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1b45d6]"
            >
              Read original →
            </a>
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/"
            className="text-sm font-medium text-muted transition hover:text-ink"
          >
            ← Back to all stories
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsDetails;
