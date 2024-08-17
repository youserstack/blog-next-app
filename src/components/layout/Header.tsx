import MuiAppBar from "./MuiAppBar";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function Header() {
  const { categories } = await fetcher(`${process.env.ROOT_URL}/api/categories`);

  return <MuiAppBar categories={categories} />;
}
