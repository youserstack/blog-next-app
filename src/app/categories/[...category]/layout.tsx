import { Box } from "@mui/material";
import dynamic from "next/dynamic";

// const ExpandableNav = dynamic(() => import("@/components/ui/ExpandableNav"));
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function CategoryLayout({ children }: { children: React.ReactNode }) {
  // const { categories } = await fetcher(`${process.env.ROOT_URL}/api/categories`);

  return (
    <main className="category-layout">
      <section style={{ display: "flex" }}>
        <Box
          sx={{
            "& > ul": { width: "300px" },
            display: { xs: "none", md: "block" },
          }}
        >
          {/* <ExpandableNav categories={categories} /> */}
        </Box>

        {children}
      </section>
      <section></section>
    </main>
  );
}
