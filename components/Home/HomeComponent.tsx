import FeaturedNews from "@/components/Home/FeaturedNews";
import NewsSection from "./NewsSection";

const HomeComponent = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const json = await res.json();
  const sections = await json.data;
  const mainNews = sections[0].articles;
  const otherSections = sections.slice(1);

  return (
    <div className="grid  md:grid-cols-3 max-w-7xl mx-auto px-5 md:px-8">
      {/* news section */}
      <div className="col-span-2">
        <FeaturedNews news={mainNews} />
        <NewsSection news={otherSections} />
      </div>
      {/* Most read section */}
      <div className="col-span-1"></div>
    </div>
  );
};

export default HomeComponent;
