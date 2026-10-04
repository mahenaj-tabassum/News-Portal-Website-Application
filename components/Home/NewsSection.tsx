import { NewsSectionProps } from "@/types/News";
import NewsCard from "../News/NewsCard";

interface Props {
  news: NewsSectionProps[];
}

const NewsSection = ({ news }: Props) => {
  if (!news?.length) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      {news.map((item) => (
        <section key={item.curationId} className="mb-12 last:mb-0">
          {/* Section header */}
          <div className="flex items-center gap-4 border-b-2 border-accent pt-3">
            <span className="h-2 w-2 shrink-0 bg-accent" />

            <h3 className="h-serif text-2xl font-semibold md:text-3xl">
              {item.title}
            </h3>

            <hr className="hidden flex-1 border-t border-line sm:block" />
          </div>

          {/* News of this section */}
          <div className="mt-6 border-b border-line pb-8">
            <div className="grid gap-x-6 gap-y-10 grid-cols-2">
              {item.articles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default NewsSection;
