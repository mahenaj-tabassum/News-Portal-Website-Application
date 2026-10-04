import HomeComponent from "@/components/Home/HomeComponent";
import NewsTicker from "@/components/layout/NewsTicker";

export default function Home() {
  return (
    <div className="min-h-screen">
      <NewsTicker />
      <HomeComponent />
    </div>
  );
}
