import { navItems } from "@/data/navItems";
import "../styles/ScrollNav.scss";
import Link from "next/link";

export default function ScrollNav() {
  return (
    <nav className="scroll-nav">
      <ul className="nav-items">
        {navItems.map((navItem: any) => (
          <li className="nav-item" key={"scroll-" + navItem.label}>
            <Link href={`/categories/${navItem.label}`}>{navItem.label}</Link>

            {/* drop */}
            <ul className="nav-drop-items">
              {navItem.dropItems?.map((dropItem: any) => (
                <li className="nav-drop-item" key={"scroll-" + dropItem.label}>
                  <Link href={`/categories/${navItem.label}/${dropItem.label}`}>
                    {dropItem.label}
                  </Link>

                  {/* popup */}
                  <ul className="nav-popup-items">
                    {dropItem.popupItems?.map((popupItem: any) => (
                      <li className="nav-popup-item" key={"scroll-" + popupItem.label}>
                        <Link
                          href={`/categories/${navItem.label}/${dropItem.label}/${popupItem.label}`}
                        >
                          {popupItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}

        {/* {Array.from({ length: 30 }, (v: any, i: number) => (
          <li key={i}>menu {i + 1}</li>
        ))} */}
      </ul>
    </nav>
  );
}
