import NewsCard from "@/components/News/NewsCard";
import NewsDetails from "@/components/News/NewsDetails";
import { NewsProps } from "@/types/News";

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await fetch(`https://news-api-v2.vercel.app/api/article/${id}`);
  const json = await res.json();
  const data = json.data;
console.log(data);
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8">
        <NewsDetails newsDetails={data} />
      
    </div>
  );
};

export default CategoryNews;
