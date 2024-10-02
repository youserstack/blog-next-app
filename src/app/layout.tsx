import type { Metadata } from "next";
import { Provider } from "@/components/context/Context";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import "./globals.scss";
import { Skeleton } from "@mui/material";

// server component
const Header = dynamic(() => import("@/components/layout/MuiHeader"), {
  loading: () => (
    <Skeleton
      component={"header"}
      variant="rectangular"
      animation="wave"
      width={"100%"}
      height={64}
      sx={{ position: "fixed", top: "0" }}
    />
  ),
});

// client components
const GlobalModal = dynamic(() => import("@/components/modals/GlobalModal"));
const Footer = dynamic(() => import("@/components/layout/Footer"));

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
  const { categories } = await fetcher(`${process.env.ROOT_URL}/api/categories`);
  // const user = JSON.parse(headers().get("user") as string);

  return (
    <html lang="en">
      <body>
        <Provider
          mode={mode}
          // user={user}
        >
          <GlobalModal />
          <Header categories={categories} />

          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
