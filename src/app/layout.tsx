import type { Metadata } from "next";
import { Provider } from "@/components/context/Context";
import { cookies, headers } from "next/headers";
// import Header from "@/components/layout/Header";
import dynamic from "next/dynamic";
import { WebVitals } from "@/_components/web-vitals";
import "./globals.scss";

// server component
const Header = dynamic(() => import("@/components/layout/Header"), {
  // loading: () => (
  //   <div
  //     style={{
  //       position: "fixed",
  //       top: "0",
  //       left: "0",
  //       right: "0",
  //       height: "300px",
  //       backgroundColor: "green",
  //     }}
  //   ></div>
  // ),
});

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
