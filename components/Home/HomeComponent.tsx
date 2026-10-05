import FeaturedNews from "@/components/Home/FeaturedNews";
import NewsSection from "./NewsSection";
import MostReadNews from "./MostReadNews";
import { NewsSectionProps } from "@/types/News";

const HomeComponent = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const json = await res.json();
  const sections = await json.data;
  const mainNews = sections[0].articles;
  const otherSections = sections.slice(1);
  const filtered = otherSections.filter((item: NewsSectionProps) => {
    return (
      item.title !== "বিবিসি বাংলা এখন হোয়াটসঅ্যাপে!" &&
      item.title !== "বিবিসি বাংলা এখন ইন্সটাগ্রামে!" &&
      item.title !== "সামাজিক মাধ্যমে বিবিসি বাংলা"
    );
  });

  return (
    <div className="grid  lg:grid-cols-3 max-w-7xl mx-auto px-5 md:px-8">
      {/* news section */}
      <div className="col-span-2">
        <FeaturedNews news={mainNews} />
        <NewsSection news={filtered} />
      </div>

      {/* Most read section */}
      <div className="col-span-1 hidden lg:block">
        <MostReadNews />
      </div>
    </div>
  );
};

export default HomeComponent;
