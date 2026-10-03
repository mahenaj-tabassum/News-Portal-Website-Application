import type { Metadata } from "next";
import { Newsreader, Inter, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const notoSerif_Bengali = Noto_Serif_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["latin", "bengali"],
});

const newsReader = Newsreader({
  variable: "--font-newsReader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Daily Brief",
  description: "The stories worth knowing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsReader.variable} ${inter.variable} ${notoSerif_Bengali.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
