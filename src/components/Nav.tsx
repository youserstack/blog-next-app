import Link from "next/link";
import { navItems } from "@/data/navItems";
import "../styles/Nav.scss";
import CategoryCreateButton from "@/components/CategoryCreateButton";

async function getData() {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/categories`);
  if (!response.ok) throw new Error("failed to fetch data");

  return response.json();
}

export default async function Nav() {
  // { children }: { children: React.ReactNode }

  const { categories } = await getData();

  return (
    <nav className="nav">
      <ul className="nav-items">
        {navItems.map((navItem: any) => (
          <li className="nav-item" key={navItem.label}>
            <Link href={`/category/${navItem.label}`}>{navItem.label}</Link>

            {/* drop */}
            <ul className="nav-drop-items">
              {navItem.dropItems?.map((dropItem: any) => (
                <li className="nav-drop-item" key={dropItem.label}>
                  <Link href={`/category/${navItem.label}/${dropItem.label}`}>
                    {dropItem.label}
                  </Link>

                  {/* popup */}
                  {dropItem.popupItems?.length && (
                    <ul className="nav-popup-items">
                      {dropItem.popupItems?.map((popupItem: any) => (
                        <li className="nav-popup-item" key={popupItem.label}>
                          <Link
                            href={`/category/${navItem.label}/${dropItem.label}/${popupItem.label}`}
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

        {categories.map((category: any) => (
          <li>
            <Link href={""}>{category.name}</Link>
          </li>
        ))}

        <CategoryCreateButton />
      </ul>
    </nav>
  );
}
