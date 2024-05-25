import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Provider from "@/components/context/Provider";
import ModalLayer from "@/components/layout/ModalLayer";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
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
          <ModalLayer />
        </Provider>
      </body>
    </html>
  );
}
