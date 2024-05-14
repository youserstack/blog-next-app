import Link from "next/link";
import { navItems } from "@/data/navItems";
import CategoryCreateButton from "@/components/CategoryCreateButton";
import "../styles/Nav.scss";
import CategoriesFetcher from "@/components/CategoriesFetcher";

async function getData() {
  const response = await fetch(`${process.env.ROOT_URL}/api/categories`);
  if (!response.ok) throw new Error("failed to fetch data");
  return response.json();
}

export default async function Nav() {
  const { categories } = await getData();
  // console.log({ categories });

  return (
    <nav className="nav">
      <ul className="nav-items">
        {/* root */}
        {navItems.map((navItem: any) => (
          <li className="nav-item" key={navItem.label}>
            <Link href={`/categories/${navItem.label}`}>{navItem.label}</Link>

            {/* drop */}
            <ul className="nav-drop-items">
              {navItem.dropItems?.map((dropItem: any) => (
                <li className="nav-drop-item" key={dropItem.label}>
                  <Link href={`/categories/${navItem.label}/${dropItem.label}`}>
                    {dropItem.label}
                  </Link>

                  {/* popup */}
                  {dropItem.popupItems?.length && (
                    <ul className="nav-popup-items">
                      {dropItem.popupItems?.map((popupItem: any) => (
                        <li className="nav-popup-item" key={popupItem.label}>
                          <Link
                            href={`/categories/${navItem.label}/${dropItem.label}/${popupItem.label}`}
                          >
                            {popupItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}

        {/* root */}
        {categories.map((category: any) => (
          <li
            className="nav-item"
            key={category._id}
            // accessKey={category._id}
          >
            <Link href={`/categories/${category.name}`}>{category.name}</Link>

            {/* sub1 */}
            <ul className="nav-drop-items">
              {category.sub1Categories?.map((sub1Category: any) => (
                <li className="nav-drop-item" key={sub1Category.name}>
                  <Link href={`/categories/${category.name}/${sub1Category.name}`}>
                    {sub1Category.name}
                  </Link>

                  {/* sub2 */}
                  {sub1Category.sub2Categories?.length > 0 && (
                    <ul className="nav-popup-items">
                      {sub1Category.sub2Categories?.map((sub2Category: any) => (
                        <li className="nav-popup-item" key={sub2Category.name}>
                          <Link
                            href={`/categories/${category.name}/${sub1Category.name}/${sub2Category.name}`}
                          >
                            {sub2Category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
