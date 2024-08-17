import type { Metadata } from "next";
import { Provider } from "@/components/context/Context";
import { cookies, headers } from "next/headers";
import Header from "@/components/layout/Header";
import dynamic from "next/dynamic";
import { WebVitals } from "@/_components/web-vitals";
import "./globals.scss";

// client components
const GlobalModal = dynamic(() => import("@/components/modals/GlobalModal"));
const Footer = dynamic(() => import("@/components/layout/Footer"));

export const metadata: Metadata = {
  title: "youserstack blog",
  description: "youserstack blog",
  keywords: "youserstack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mode = cookies().get("mode")?.value as string;
  const user = JSON.parse(headers().get("user") as string);

  return (
    <html lang="en">
      <body>
        <Provider mode={mode} user={user}>
          <WebVitals />
          <GlobalModal />

          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
