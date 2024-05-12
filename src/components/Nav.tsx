import Link from "next/link";
import { navItems } from "@/data/navItems";
import CategoryCreateButton from "@/components/CategoryCreateButton";
import "../styles/Nav.scss";

async function getData() {
  const response = await fetch(`${process.env.ROOT_URL}/api/categories`);
  if (!response.ok) throw new Error("failed to fetch data");
  return response.json();
}

export default async function Nav() {
  const { categories } = await getData();

  return (
    <nav className="nav">
      <ul className="nav-items">
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

        {categories.map((category: any) => (
          <li key={category._id}>
            <Link href={""}>{category.name}</Link>
          </li>
        ))}

        <CategoryCreateButton />
      </ul>
    </nav>
  );
}
