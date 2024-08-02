import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Provider } from "@/components/context/Context";
import Loading from "@/components/ui/Loading";
import GlobalModal from "@/components/modals/GlobalModal";
import "./globals.scss";
import { cookies } from "next/headers";

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

  return (
    <html lang="en">
      <body>
        <Provider mode={mode}>
          <Header />
          {children}
          <Footer />

          {/* Layers */}
          <Loading />
          <GlobalModal />
        </Provider>
      </body>
    </html>
  );
}
