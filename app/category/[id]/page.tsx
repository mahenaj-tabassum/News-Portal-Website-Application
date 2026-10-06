import NewsCard from "@/components/News/NewsCard";
import { NewsProps } from "@/types/News";
import { notFound } from "next/navigation";

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(`https://news-api-v2.vercel.app/api/category/${id}`);
  const json = await res.json();
  const data = json.data;
  if(!data) notFound()
  console.log(data);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8">
      {/* Section header */}
      <div className="flex items-center my-10 gap-4 border-b-2 border-accent pt-3">
        <span className="h-2 w-2 shrink-0 bg-accent" />

        <h3 className="h-serif text-2xl font-semibold md:text-3xl">
          {json.title}
        </h3>

        <hr className="hidden flex-1 border-t border-line sm:block" />
      </div>
      <div className="grid md:grid-cols-3 sm: grid-cols-2 gap-7">
        {data.map((article: NewsProps) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;
