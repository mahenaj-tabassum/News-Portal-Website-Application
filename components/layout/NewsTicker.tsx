import Link from "next/link";

type DataType = {
  title: string;
  id: string;
};

const NewsTicker = async () => {
  let data: DataType[] = [];

  try {
    const response = await fetch(
      "https://news-api-v2.vercel.app/api/news?limit=10",
      { next: { revalidate: 300 } },
    );
    const json = await response.json();
    data = json.data ?? [];
  } catch {
    return null;
  }

  if (data.length === 0) return null;

  const group = (hidden: boolean) => (
    <div
      aria-hidden={hidden}
      className="flex shrink-0 gap-12 pr-12 whitespace-nowrap"
    >
      {data.map((item) => (
        <span
          key={item.id}
          className="font-noto-bengali flex items-center gap-2 text-[15px]"
        >
          <i
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-white"
            aria-hidden
          />
          <Link
            href={`/article/${item.id}`}
            tabIndex={hidden ? -1 : undefined}
            className="hover:underline"
          >
            {item.title}
          </Link>
        </span>
      ))}
    </div>
  );

  return (
    <div className="border-y border-line bg-accent text-white">
      <div className="mx-auto flex max-w-7xl items-center">
        <span className="label z-10 flex shrink-0 items-center gap-2 bg-blue-800 text-white py-3 pl-5 pr-4  md:pl-8">
          <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          Latest
        </span>

        <div className="marquee-viewport min-w-0 flex-1 overflow-hidden">
          <div className="marquee flex w-max">
            {group(false)}
            {group(true)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
