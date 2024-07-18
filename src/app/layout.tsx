import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Provider from "@/components/context/Provider";
import Loading from "@/components/ui/Loading";
import GlobalModal from "@/components/modals/GlobalModal";
import "./globals.scss";

export const metadata: Metadata = {
  title: "youserstack's blogs",
  description: "youserstack's blogs",
  keywords: "youserstack",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
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
