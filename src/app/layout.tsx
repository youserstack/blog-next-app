import type { Metadata } from "next";
import { Provider } from "@/components/context/Context";
import { cookies, headers } from "next/headers";
import Header from "@/components/layout/Header";
import dynamic from "next/dynamic";
import { WebVitals } from "@/_components/web-vitals";
import "./globals.scss";

const Footer = dynamic(() => import("@/components/layout/Footer"));
const GlobalModal = dynamic(() => import("@/components/modals/GlobalModal"));
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const metadata: Metadata = {
  title: "youserstack blog",
  description: "youserstack blog",
  keywords: "youserstack",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mode = cookies().get("mode")?.value as string;
  const user = JSON.parse(headers().get("user") as string);
  const { categories } = await fetcher(`${process.env.ROOT_URL}/api/categories`);

  return (
    <html lang="en">
      <body>
        <Provider mode={mode} user={user} categories={categories}>
          <WebVitals />

          <Header />
          {children}
          <Footer />

          {/* 지연로딩 */}
          <GlobalModal />
        </Provider>
      </body>
    </html>
  );
}
