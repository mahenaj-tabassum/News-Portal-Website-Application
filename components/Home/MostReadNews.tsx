import Link from "next/link";
import { NewsProps } from "@/types/News";

export const getMostReadNews = async (): Promise<NewsProps[]> => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  if (!res.ok) {
    throw new Error("Failed to fetch most read news");
  }
  const json = await res.json();
  return json.data;
};

const MostReadNews = async () => {
  const news = await getMostReadNews();

  if (!news?.length) return null;

  return (
    <aside className="py-5 mt-5 md:sticky md:top-32 bg-white border border-line rounded-xl md:pl-8">
      {/* Heading */}
      <div className="flex items-center gap-3 pt-3">
        <span className="h-2 w-2 shrink-0 bg-accent" />
        <h2 className="h-serif text-xl font-semibold">Most Read</h2>
      </div>

      {/* List */}
      <ol className="mt-2 divide-y divide-line">
        {news.slice(0, 5).map((item, index) => (
          <li key={item.id} className="group">
            <Link
              href={`/article/${item.id}`}
              className="flex items-start gap-4 py-5 outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span
                className={`h-serif w-9 shrink-0 text-3xl font-semibold leading-none transition-colors duration-300 group-hover:text-accent ${
                  index === 0 ? "text-accent" : "text-line"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h3 className="h-serif text-[14px] text-balance font-semibold leading-snug!">
                  <span className="ul  group-hover:bg-size-[100%_1px]">
                    {item.title}
                  </span>
                </h3>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
};

export default MostReadNews;
