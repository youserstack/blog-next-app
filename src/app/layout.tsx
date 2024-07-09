import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Provider from "@/components/context/Provider";
import Loading from "@/components/ui/Loading";
// import dynamic from "next/dynamic";
import "./globals.scss";
import GlobalModal from "@/components/modals/GlobalModal";

// Lazy Loading (지연 로딩)
// const GlobalModal = dynamic(() => import("@/components/modals/GlobalModal"), {
//   ssr: false, // 서버에서 렌더링하지 않고, 클라이언트에서 렌더링
// });

export const metadata: Metadata = {
  title: "youserstack's blogs",
  description: "youserstack's blogs",
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
          {/* server components */}
          <Header />
          {children}
          <Footer />

          {/* client components */}
          <GlobalModal />
          <Loading />
        </Provider>
      </body>
    </html>
  );
}
