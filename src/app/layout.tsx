import type { Metadata } from "next";
import { Provider } from "@/components/context/Context";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import "./globals.scss";
import { Skeleton } from "@mui/material";
import { Suspense } from "react";
import Header from "@/components/layout/Header";

const GlobalModal = dynamic(() => import("@/components/modals/GlobalModal"));
const Footer = dynamic(() => import("@/components/layout/Footer"));

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
          <GlobalModal />

          <Suspense
            fallback={
              <Skeleton
                component={"header"}
                variant="rectangular"
                animation="wave"
                width={"100%"}
                height={64}
                sx={{ position: "fixed", top: "0" }}
              />
            }
          >
            <Header />
          </Suspense>

          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
