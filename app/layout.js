import "./globals.css";
import { Noto_Sans } from "next/font/google";
import { LocationAndPostsProvider } from "@/app/providers/locationAndPosts";
import { MapProvider } from "@/app/providers/mapProvider";
import Header from "./components/header";
import { SessionProvider } from "@/app/providers/sessionProvider";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const noto = Noto_Sans({
  subsets: ["latin"],
  variants: ["regular", "bold"],
  weights: [400, 700],
});

export const metadata = {
  title: "Location Pics",
  description: "A simple app to share pictures based on location",
};

export default async function RootLayout({ children }) {
  console.count("RootLayout");
  const session = await getServerSession({ ...authOptions });
  return (
    <html
      lang="en"
      className={`${noto.className} h-full w-full text-slate-300 bg-slate-800 max-w-full overflow-hidden`}
    >
      <SessionProvider session={session}>
        <body className="flex flex-col w-full h-full overflow-x-hidden">
          <Header />
          <MapProvider>
            <LocationAndPostsProvider>
              <div className="bg-slate-800 h-full w-full overflow-y-hidden">
                <main className="h-[calc(100%-16px)] overflow-scroll bg-transparent rounded-md m-2">
                  {children}
                </main>
              </div>
            </LocationAndPostsProvider>
          </MapProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
