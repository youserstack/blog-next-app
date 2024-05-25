import Link from "next/link";
import CategoryCreateButton from "@/components/category/CategoryCreateButton";
import CategoriesFetcher from "@/components/category/CategoriesFetcher";
import { getCategories } from "@/lib/utils/fetcher";
import "../../styles/Nav.scss";

export default async function Nav() {
  const { categories } = await getCategories();

  return (
    <nav className="nav">
      <ul className="categories">
        {categories.map((category: any) => (
          <li className="category" key={category._id}>
            <Link href={`/categories/${category.name}`}>{category.name}</Link>

            <ul className="sub1-categories">
              {category.sub1Categories?.map((sub1Category: any) => (
                <li className="sub1-category" key={sub1Category.name}>
                  <Link href={`/categories/${category.name}/${sub1Category.name}`}>
                    {sub1Category.name}
                  </Link>

                  <ul className="sub2-categories">
                    {sub1Category.sub2Categories?.map((sub2Category: any) => (
                      <li className="sub2-category" key={sub2Category.name}>
                        <Link
                          href={`/categories/${category.name}/${sub1Category.name}/${sub2Category.name}`}
                        >
                          {sub2Category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}

        <CategoryCreateButton parentCategories={[]} />
      </ul>

      <CategoriesFetcher categories={categories} />
    </nav>
  );
}
